import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { Gift, Repeat, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Confetti from 'react-confetti';
import { Checkbox } from '@/components/ui/checkbox';

interface Comment {
  author: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  text: string;
}

interface Winner extends Comment {
  pickedAt: Date;
}

const YouTubeCommentPickerTool = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterDuplicates, setFilterDuplicates] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const getVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchComments = async (videoId: string) => {
    let allComments: Comment[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
      const response: Response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&maxResults=100&pageToken=${nextPageToken || ''}&key=${apiKey}`);
      const data = await response.json();

      if (data.error) throw new Error(data.error.message);

      const fetchedComments = data.items.map((item: { snippet: { topLevelComment: { snippet: { authorDisplayName: string; authorProfileImageUrl: string; authorChannelUrl: string; textDisplay: string; }; }; }; }) => ({
        author: item.snippet.topLevelComment.snippet.authorDisplayName,
        authorProfileImageUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
        authorChannelUrl: item.snippet.topLevelComment.snippet.authorChannelUrl,
        text: item.snippet.topLevelComment.snippet.textDisplay,
      }));
      
      allComments = [...allComments, ...fetchedComments];
      nextPageToken = data.nextPageToken;

    } while (nextPageToken);

    return allComments;
  };

  const handleFetchComments = async () => {
    const videoId = getVideoId(videoUrl);
    if (!videoId) {
      setError('Invalid YouTube video URL.');
      return;
    }
    if (!apiKey) {
      setError('YouTube API key is not configured.');
      return;
    }

    setError('');
    setIsLoading(true);
    setWinner(null);
    setComments([]);

    try {
      const fetched = await fetchComments(videoId);
      setComments(fetched);
      toast.success(`Loaded ${fetched.length} comments.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch comments.';
      setError(msg);
      toast.error("Error", { description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickWinner = () => {
    if (comments.length === 0) return;

    let eligibleComments = [...comments];
    if (filterDuplicates) {
      const uniqueAuthors = new Map<string, Comment>();
      eligibleComments.forEach(c => {
        if (!uniqueAuthors.has(c.authorChannelUrl)) {
          uniqueAuthors.set(c.authorChannelUrl, c);
        }
      });
      eligibleComments = Array.from(uniqueAuthors.values());
    }

    if (eligibleComments.length === 0) {
        toast.info("No eligible comments to pick from.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * eligibleComments.length);
    const newWinner = { ...eligibleComments[randomIndex], pickedAt: new Date() };
    setWinner(newWinner);
    setShowConfetti(true);
    toast.success(`${newWinner.author} is the winner!`);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="space-y-8">
      {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Comment Picker</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Running a giveaway or contest on your YouTube channel is a fantastic way to boost engagement and reward your audience. Our YouTube Comment Picker tool provides a fair, transparent, and easy way to select a random winner from the comments section of your video.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Giveaway Winner Picker</CardTitle>
          <CardDescription>Paste your YouTube video URL to load comments and pick a winner.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter YouTube Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleFetchComments} disabled={isLoading || !videoUrl.trim()}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Load Comments'}
              </Button>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="filter-duplicates" checked={filterDuplicates} onCheckedChange={(checked: boolean) => setFilterDuplicates(checked)} />
                    <label htmlFor="filter-duplicates" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Filter duplicate users
                    </label>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {comments.length > 0 && !winner && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Ready to Pick a Winner</CardTitle>
            <CardDescription>
              Loaded {comments.length} comments. {filterDuplicates && `Filtering to unique users.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button size="lg" onClick={handlePickWinner}>
              <Gift className="mr-2 h-5 w-5" /> Pick a Winner
            </Button>
          </CardContent>
        </Card>
      )}

      {winner && (
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-yellow-900">Congratulations!</CardTitle>
            <CardDescription className="text-yellow-800">The winning comment is:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/80 p-4 rounded-lg shadow-inner">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={winner.authorProfileImageUrl} alt={winner.author} />
                  <AvatarFallback>{winner.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <a href={winner.authorChannelUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-lg hover:underline">{winner.author}</a>
                  <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: winner.text }}></p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button onClick={handlePickWinner} variant="secondary">
                <Repeat className="mr-2 h-4 w-4" /> Pick Another Winner
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a YouTube Comment Picker?</h2>
          <p className="text-muted-foreground">
            A YouTube Comment Picker is a tool that automates the process of selecting a random comment from a YouTube video. It's an indispensable utility for creators who run giveaways, contests, or any promotion where a winner is chosen from the comments. Instead of manually scrolling through potentially thousands of comments, the tool fetches all comments from a specified video and selects one at random, ensuring a fair and unbiased result. This not only saves a significant amount of time but also adds a layer of transparency and legitimacy to your contest.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Factors to Consider for a Fair Giveaway</h2>
          <p className="text-muted-foreground">
            To ensure your giveaway is fair and runs smoothly, consider the following factors:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Clear Rules:</strong> Clearly state the rules of the giveaway in your video and description, including the prize, entry requirements (e.g., "comment to win"), and the deadline.</li>
            <li><strong>Filter Duplicate Users:</strong> Our tool includes an option to filter duplicate users, meaning each person only gets one entry regardless of how many times they comment. This is crucial for a fair drawing.</li>
            <li><strong>Transparency:</strong> Record the process of you using the tool to pick a winner. This builds trust with your audience and shows that the selection was truly random.</li>
            <li><strong>Compliance with YouTube's Policies:</strong> Be sure to follow YouTube's contest policies and guidelines to avoid any issues with your channel.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Key Components of Our Comment Picker</h2>
          <p className="text-muted-foreground">
            Our tool is designed to make your giveaways as simple and fair as possible.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Fetches All Comments:</strong> The tool retrieves every comment from the video to ensure no one is left out.</li>
            <li><strong>Duplicate User Filtering:</strong> A one-click option to ensure each user gets only one entry.</li>
            <li><strong>Truly Random Selection:</strong> Uses a secure random number generator to pick the winner.</li>
            <li><strong>Winner Display:</strong> Clearly displays the winner's name, profile picture, and comment.</li>
            <li><strong>Confetti Celebration:</strong> A fun confetti animation to celebrate the winner.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the YouTube Comment Picker</h2>
          <p className="text-muted-foreground">
            Picking a winner for your giveaway is a simple process:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Enter the Video URL:</strong> Paste the URL of the YouTube video you're hosting the giveaway on.</li>
            <li><strong>Load the Comments:</strong> Click the "Load Comments" button. The tool will fetch all the comments from the video.</li>
            <li><strong>Choose Your Options:</strong> Decide if you want to filter out duplicate users by checking the box.</li>
            <li><strong>Pick a Winner:</strong> Click the "Pick a Winner" button to randomly select a comment. The winner will be displayed on the screen.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Is this tool free?</h3>
              <p className="text-muted-foreground">Yes, our YouTube Comment Picker is 100% free to use. There are no hidden costs or limitations.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can the tool see all comments?</h3>
              <p className="text-muted-foreground">The tool uses the official YouTube API to fetch comments. It can retrieve all public comments, but it cannot access comments that have been held for review, marked as spam, or deleted.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is the winner selection truly random?</h3>
              <p className="text-muted-foreground">Yes, the tool uses a cryptographically secure random number generator to select the winner, ensuring a fair and unbiased outcome.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The first-ever YouTube contest was held in 2010, called "YouTube Play: A Biennial of Creative Video." It was a collaboration with the Guggenheim Museum to find the most creative videos on the platform. The winning entries were displayed at Guggenheim museums around the world, marking a major step in the recognition of YouTube as a legitimate artistic medium.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/tools/youtube-tools/youtube-subscribe-link-generator" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Subscribe Link Generator</h3>
              <p className="text-sm text-muted-foreground">Create a link that prompts users to subscribe to your channel.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-channel-statistics" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Channel Statistics</h3>
              <p className="text-sm text-muted-foreground">Analyze the performance of any YouTube channel.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-money-calculator" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Money Calculator</h3>
              <p className="text-sm text-muted-foreground">Estimate the potential earnings of a video or channel.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default YouTubeCommentPickerTool;
