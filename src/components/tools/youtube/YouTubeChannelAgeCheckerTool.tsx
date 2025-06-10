import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { Calendar, AlertCircle, BadgeCheck } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface ChannelInfo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

// Helper to extract channel ID or handle from various YouTube URL formats
const getChannelIdentifier = (url: string): { type: 'id' | 'handle' | 'custom' | 'invalid', value: string } => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    const channelIdMatch = pathname.match(/\/channel\/([a-zA-Z0-9_-]+)/);
    if (channelIdMatch) return { type: 'id', value: channelIdMatch[1] };

    const handleMatch = pathname.match(/\/@([a-zA-Z0-9_.-]+)/);
    if (handleMatch) return { type: 'handle', value: handleMatch[1] };

    const customUrlMatch = pathname.match(/\/c\/([a-zA-Z0-9_.-]+)/);
    if (customUrlMatch) return { type: 'custom', value: customUrlMatch[1] };
    
    const userUrlMatch = pathname.match(/\/user\/([a-zA-Z0-9_.-]+)/);
    if (userUrlMatch) return { type: 'custom', value: userUrlMatch[1] };

    return { type: 'invalid', value: 'No valid identifier found in URL.' };
  } catch {
    return { type: 'invalid', value: 'Invalid URL format.' };
  }
};

const YouTubeChannelAgeCheckerTool = () => {
  const [url, setUrl] = useState('');
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleCheck = async () => {
    if (!apiKey) {
      setError('YouTube API key is not configured. Please contact support.');
      toast.error("API Key Missing", { description: "The YouTube API key is not available." });
      return;
    }

    const identifier = getChannelIdentifier(url);

    if (identifier.type === 'invalid') {
      setError(`Invalid YouTube Channel URL. ${identifier.value}`);
      setChannelInfo(null);
      return;
    }

    setError('');
    setIsLoading(true);
    setChannelInfo(null);

    try {
      let channelId = '';
      
      if (identifier.type === 'id') {
        channelId = identifier.value;
      } else {
        // For handles or custom URLs, we need to search first
        const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${identifier.value}&type=channel&key=${apiKey}`);
        const searchData = await searchResponse.json();
        if (searchData.items && searchData.items.length > 0) {
          // Find the most relevant channel, often the first result matches the handle/custom URL
          const foundChannel = searchData.items.find((item: { snippet: { channelTitle: string; customUrl: string; }; }) => 
            item.snippet.channelTitle.toLowerCase() === identifier.value.toLowerCase() || 
            item.snippet.customUrl?.toLowerCase() === `@${identifier.value.toLowerCase()}`
          ) || searchData.items[0];
          channelId = foundChannel.id.channelId || foundChannel.id;
        } else {
          throw new Error('Channel not found with the provided URL/handle.');
        }
      }

      // Now fetch channel details with statistics
      const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
      
      if (!detailsResponse.ok) {
        const errorData = await detailsResponse.json();
        throw new Error(errorData.error?.message || 'Failed to fetch channel details.');
      }

      const detailsData = await detailsResponse.json();

      if (detailsData.items && detailsData.items.length > 0) {
        const { snippet, statistics } = detailsData.items[0];
        setChannelInfo({
          id: detailsData.items[0].id,
          title: snippet.title,
          description: snippet.description,
          publishedAt: snippet.publishedAt,
          thumbnailUrl: snippet.thumbnails.high.url,
          subscriberCount: statistics.subscriberCount,
          viewCount: statistics.viewCount,
          videoCount: statistics.videoCount,
        });
        toast.success("Channel found!", { description: `Displaying details for ${snippet.title}.` });
      } else {
        throw new Error('Could not retrieve channel details.');
      }

    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      toast.error("Error", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    }).format(date);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Channel Age Checker</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Discover the creation date of any YouTube channel with our Channel Age Checker. This simple tool tells you how long a channel has been active on the platform, a piece of information that can be surprisingly useful for analysis and understanding a creator's journey. Whether you're a fan curious about the origins of your favorite content creator, a marketer assessing a channel's long-term performance, or a fellow creator looking for inspiration, knowing a channel's age provides critical context. It helps you trace the timeline of their growth, understand the dedication behind their success, and appreciate the milestones they've achieved along the way. Our tool makes this discovery process effortless—just paste a channel URL to begin.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Channel Age Finder</CardTitle>
          <CardDescription>Enter a YouTube channel's URL to find out exactly when it was created and see its current stats.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter YouTube Channel URL (e.g., https://www.youtube.com/@MrBeast)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow text-base"
              />
              <Button onClick={handleCheck} disabled={isLoading || !url.trim()} className="text-base px-6">
                {isLoading ? 'Checking...' : 'Check Channel Age'}
              </Button>
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            {channelInfo && (
              <Card className="overflow-hidden animate-fade-in">
                <CardHeader className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={channelInfo.thumbnailUrl} alt={channelInfo.title} />
                    <AvatarFallback>{channelInfo.title.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2 justify-center sm:justify-start">
                      {channelInfo.title} <BadgeCheck className="h-6 w-6 text-blue-500" />
                    </CardTitle>
                    <p className="text-muted-foreground mt-1 max-w-xl line-clamp-2">{channelInfo.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="bg-muted/50 p-6 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
                      <Calendar className="h-5 w-5" />
                      <span>Channel Creation Date</span>
                    </div>
                    <p className="text-3xl font-extrabold text-primary mt-2">
                      {formatDate(channelInfo.publishedAt)}
                    </p>
                    <p className="text-muted-foreground mt-1 text-lg">
                      (That's about <span className="font-semibold text-foreground">{formatDistanceToNow(parseISO(channelInfo.publishedAt))}</span> ago)
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-card border p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Subscribers</p>
                      <p className="text-2xl font-bold">{Number(channelInfo.subscriberCount).toLocaleString()}</p>
                    </div>
                    <div className="bg-card border p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Views</p>
                      <p className="text-2xl font-bold">{Number(channelInfo.viewCount).toLocaleString()}</p>
                    </div>
                    <div className="bg-card border p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Videos</p>
                      <p className="text-2xl font-bold">{Number(channelInfo.videoCount).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>


      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a YouTube Channel Age Checker?</h2>
          <p className="text-muted-foreground">
            A YouTube Channel Age Checker is a specialized tool that determines the exact date a YouTube channel was created. This information, often referred to as the channel's "birthday," offers valuable insights into its history and journey on the platform. For aspiring creators, it can be motivating to see how long it took successful channels to grow. For marketers, it provides context for a channel's authority and experience. Our tool simplifies this process by fetching the publication date directly from the YouTube API, presenting it in a clear and understandable format.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Factors Influencing a Channel's Age</h2>
          <p className="text-muted-foreground">
            While the creation date is a fixed point, several factors contribute to what a channel's age represents:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Content Strategy Evolution:</strong> An older channel may have pivoted its content niche over time. Understanding its age helps trace this evolution.</li>
            <li><strong>Consistency and Activity:</strong> A ten-year-old channel with only 50 videos tells a different story than a two-year-old channel with 500. Age combined with video count reveals the creator's posting frequency.</li>
            <li><strong>Algorithm Changes:</strong> YouTube's algorithm has changed significantly over the years. A channel's age can indicate how it has adapted to these shifts to stay relevant.</li>
            <li><strong>Building Authority:</strong> Generally, older channels that have consistently produced quality content are viewed as more authoritative by both YouTube and its audience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Key Components of Our Channel Age Checker</h2>
          <p className="text-muted-foreground">
            Our tool is designed to be both powerful and easy to use, offering a suite of features to give you a comprehensive overview:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Precise Date and Time:</strong> Get the exact moment the channel was created, down to the hour and minute.</li>
            <li><strong>Relative Age Calculation:</strong> See the channel's age calculated in years, months, and days for easy reference.</li>
            <li><strong>Comprehensive Statistics:</strong> Alongside the age, view key metrics like subscriber, view, and video counts.</li>
            <li><strong>Universal URL Support:</strong> Works with modern @handle URLs, classic /channel/ URLs, and legacy /c/ and /user/ formats.</li>
            <li><strong>Ad-Friendly and Clean Interface:</strong> Our tool is designed to be Adsense-friendly, ensuring a smooth user experience without intrusive pop-ups.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the YouTube Channel Age Checker</h2>
          <p className="text-muted-foreground">
            Checking a channel's age is a simple, three-step process:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Find the Channel URL:</strong> Go to the YouTube channel you want to check and copy its URL from your browser's address bar.</li>
            <li><strong>Paste and Check:</strong> Paste the URL into the input field on our tool and click the "Check Channel Age" button.</li>
            <li><strong>Explore the Results:</strong> The tool will instantly display the channel's creation date, its age, and other vital statistics.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Can this tool see when a private channel was created?</h3>
              <p className="text-muted-foreground">No, the YouTube API only provides data for public channels. You cannot use this tool to find the age of a private or terminated channel.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is the information provided by this tool accurate?</h3>
              <p className="text-muted-foreground">Yes, all data is fetched in real-time from the official YouTube API, ensuring the highest level of accuracy.</p>
            </div>
            <div>
              <h3 className="font-semibold">Why is knowing a channel's age important?</h3>
              <p className="text-muted-foreground">It provides valuable context for a channel's growth and success. It helps in competitive analysis, content strategy assessment, and understanding a creator's journey on the platform.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            While "Me at the zoo" was the first video uploaded, the first-ever YouTube channel was created by Jawed Karim on the same day, April 23, 2005. The second channel, "smosh," was created just a few months later and became one of the platform's first breakout stars, demonstrating that even in the earliest days, consistency and unique content were key to success.
          </p>
        </section>
      </div>
    </div>
  );
};

export default YouTubeChannelAgeCheckerTool;
