import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { AlertCircle, ThumbsUp, MessageSquare, Eye, Clock, Tag, Calendar, BarChart2, TrendingUp, Loader2 } from 'lucide-react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

interface VideoInfo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  channelTitle: string;
  channelId: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  tags: string[] | null;
}

// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Helper to format ISO 8601 duration
const formatDuration = (isoDuration: string): string => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  if (!matches) return "0:00";

  const hours = matches[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
  const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

  let formatted = '';
  if (hours > 0) {
    formatted += `${hours}:`;
    formatted += `${String(minutes).padStart(2, '0')}:`;
  } else {
    formatted += `${minutes}:`;
  }
  formatted += String(seconds).padStart(2, '0');
  return formatted;
};

const YouTubeVideoStatisticsTool = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleFetchStats = async () => {
    const videoId = getYouTubeVideoId(url);

    if (!videoId) {
      setError('Please enter a valid YouTube video URL.');
      setVideoInfo(null);
      return;
    }

    if (!apiKey) {
      setError('YouTube API key is not configured. Please contact support.');
      setIsLoading(false);
      return;
    }

    setError('');
    setIsLoading(true);
    setVideoInfo(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch video data.');
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const { snippet, statistics, contentDetails } = data.items[0];
        setVideoInfo({
          id: data.items[0].id,
          title: snippet.title,
          description: snippet.description,
          publishedAt: snippet.publishedAt,
          thumbnailUrl: snippet.thumbnails.maxres?.url || snippet.thumbnails.high.url,
          channelTitle: snippet.channelTitle,
          channelId: snippet.channelId,
          duration: formatDuration(contentDetails.duration),
          viewCount: statistics.viewCount,
          likeCount: statistics.likeCount,
          commentCount: statistics.commentCount,
          tags: snippet.tags || null,
        });
        toast.success("Statistics loaded successfully!");
      } else {
        throw new Error('Video not found. Please check the URL and ensure it is public.');
      }
    } catch (err: unknown) {
      console.error(err);
      let errorMessage = 'An unexpected error occurred.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      toast.error("Error", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
       <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Video Statistics</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Go beyond the surface and dive deep into the performance of any YouTube video. Get a comprehensive overview of key metrics to understand what makes content successful.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Statistics Tool</CardTitle>
          <CardDescription>Enter a video URL to fetch its detailed performance data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter YouTube Video URL (e.g., https://www.youtube.com/watch?v=...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow text-base"
              />
              <Button onClick={handleFetchStats} disabled={isLoading || !url.trim()} className="text-base px-6">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Fetching...' : 'Get Video Stats'}
              </Button>
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            {videoInfo && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <img src={videoInfo.thumbnailUrl} alt={videoInfo.title} className="rounded-lg mb-4 w-full aspect-video object-cover" />
                  <CardTitle className="text-2xl font-bold">{videoInfo.title}</CardTitle>
                  <a 
                    href={`https://www.youtube.com/channel/${videoInfo.channelId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    by {videoInfo.channelTitle}
                  </a>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-card border p-4 rounded-lg">
                      <Eye className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{Number(videoInfo.viewCount).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Views</p>
                    </div>
                    <div className="bg-card border p-4 rounded-lg">
                      <ThumbsUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{Number(videoInfo.likeCount).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Likes</p>
                    </div>
                    <div className="bg-card border p-4 rounded-lg">
                      <MessageSquare className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{Number(videoInfo.commentCount).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Comments</p>
                    </div>
                    <div className="bg-card border p-4 rounded-lg">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{videoInfo.duration}</p>
                      <p className="text-sm text-muted-foreground">Duration</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Calendar className="h-5 w-5" /> Published</h3>
                    <p className="text-muted-foreground">
                      {format(parseISO(videoInfo.publishedAt), 'EEEE, MMMM d, yyyy')} ({formatDistanceToNow(parseISO(videoInfo.publishedAt))} ago)
                    </p>
                  </div>

                  {videoInfo.tags && videoInfo.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Tag className="h-5 w-5" /> Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {videoInfo.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap text-sm max-h-60 overflow-y-auto p-3 bg-muted/50 rounded-md">
                      {videoInfo.description || "No description provided."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart2 className="h-6 w-6 text-primary" /> Understanding Video Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Analyzing video statistics is essential for any creator aiming for growth. These numbers tell a story about how your content is received by your audience and discovered by new viewers. Key metrics like views, likes, and comments are direct indicators of engagement and appeal.</p>
            <p>By tracking these metrics over time, you can make data-driven decisions. This tool provides a public snapshot, but for your own content, you should dive deeper into YouTube Analytics to study audience retention, click-through rate (CTR), and traffic sources to get the full picture of what drives your channel's success.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary" /> Leveraging Analytics for Growth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Use the insights from this tool to benchmark your content against popular videos in your niche. Don't just look at the numbers; look for the patterns behind them. Ask critical questions:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Engagement Ratio:</strong> What is the like-to-view ratio? A high ratio often signals strong audience approval. How does your content compare?</li>
              <li><strong>Content Strategy:</strong> Are the top-performing videos longer, more in-depth tutorials, or shorter, snappier clips? This can inform your own content length and format.</li>
              <li><strong>Velocity:</strong> How quickly did the video accumulate its views? A video with a million views in a week tells a different story than one that took five years. This indicates trendiness and viral potential.</li>
              <li><strong>Keyword Insights:</strong> What keywords are used in the title, description, and tags of successful videos? This is a goldmine for your own SEO strategy.</li>
            </ul>
            <p>Answering these questions can reveal powerful opportunities to refine your content and accelerate your channel's growth.</p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Video Statistics Tool</h2>
          <p className="text-muted-foreground">
            Getting detailed statistics for any YouTube video is easy:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Enter the Video URL:</strong> Paste the full URL of the YouTube video you want to analyze.</li>
            <li><strong>Fetch the Stats:</strong> Click the "Get Video Stats" button to retrieve the latest data from the YouTube API.</li>
            <li><strong>Analyze the Results:</strong> The tool will display a comprehensive overview of the video, including its view, like, and comment counts, duration, publication date, and any associated tags.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Can I see statistics for private or unlisted videos?</h3>
              <p className="text-muted-foreground">No, the tool can only retrieve statistics for public videos. Private and unlisted videos are not accessible via the YouTube API.</p>
            </div>
            <div>
              <h3 className="font-semibold">Why are the like or comment counts sometimes disabled?</h3>
              <p className="text-muted-foreground">A creator can choose to disable the like/dislike count or the comment section for their video. If they have done so, the API cannot retrieve this data, and it will be reflected in our tool.</p>
            </div>
            <div>
              <h3 className="font-semibold">How can I use video tags for my own content?</h3>
              <p className="text-muted-foreground">Analyzing the tags of successful videos in your niche can provide valuable keyword ideas for your own content. It helps you understand how top creators are positioning their videos for YouTube's search and discovery algorithms.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The most viewed video on YouTube is "Baby Shark Dance," which has amassed over 14 billion views as of 2024. Its incredible virality demonstrates the power of catchy music and content that appeals to a young, global audience, making it a phenomenon that has far surpassed the reach of traditional media.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/tools/youtube-tools/youtube-channel-statistics" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Channel Statistics</h3>
              <p className="text-sm text-muted-foreground">Get a high-level overview of any YouTube channel.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-tag-extractor" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Tag Extractor</h3>
              <p className="text-sm text-muted-foreground">Extract all the tags from a YouTube video.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-thumbnail-downloader" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Thumbnail Downloader</h3>
              <p className="text-sm text-muted-foreground">Download the thumbnail of any YouTube video.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default YouTubeVideoStatisticsTool;
