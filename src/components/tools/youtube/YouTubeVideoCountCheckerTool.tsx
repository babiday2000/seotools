import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const getChannelIdentifier = (url: string): { type: 'id' | 'handle' | 'custom' | 'invalid', value: string } => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split('/').filter(p => p);

    if (parts[0] === 'channel' && parts[1]) return { type: 'id', value: parts[1] };
    if (parts[0] === '@' && parts[1]) return { type: 'handle', value: parts[1] };
    if (parts[0] === 'c' && parts[1]) return { type: 'custom', value: parts[1] };
    if (parts[0] === 'user' && parts[1]) return { type: 'custom', value: parts[1] };
    if (parts.length === 1) {
        if (parts[0].startsWith('@')) return { type: 'handle', value: parts[0].substring(1) };
        if (parts[0].startsWith('UC') || parts[0].startsWith('HC')) return { type: 'id', value: parts[0] };
        return { type: 'custom', value: parts[0] };
    }
    return { type: 'invalid', value: 'Could not parse URL.' };
  } catch {
    if (url.startsWith('@')) return { type: 'handle', value: url.substring(1) };
    if (url.startsWith('UC') || url.startsWith('HC')) return { type: 'id', value: url };
    if (url.match(/^[a-zA-Z0-9_.-]+$/)) return { type: 'custom', value: url };
    return { type: 'invalid', value: 'Invalid input.' };
  }
};

interface ChannelStats {
  title: string;
  thumbnailUrl: string;
  videoCount: string;
}

const YouTubeVideoCountCheckerTool = () => {
  const [url, setUrl] = useState('');
  const [stats, setStats] = useState<ChannelStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleCheck = async () => {
    if (!apiKey) {
      setError('API key is not configured.');
      return;
    }
    if (!url.trim()) {
      setError('Please enter a channel URL, ID, or handle.');
      return;
    }

    setIsLoading(true);
    setError('');
    setStats(null);

    const identifier = getChannelIdentifier(url);
    if (identifier.type === 'invalid') {
      setError(identifier.value);
      setIsLoading(false);
      return;
    }

    try {
      let channelId = '';
      if (identifier.type === 'id') {
        channelId = identifier.value;
      } else {
        let searchParam = '';
        if (identifier.type === 'handle') searchParam = `&forHandle=@${identifier.value}`;
        else if (identifier.type === 'custom') searchParam = `&forUsername=${identifier.value}`;
        
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id${searchParam}&key=${apiKey}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          channelId = data.items[0].id;
        } else {
          throw new Error('Channel not found.');
        }
      }

      const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
      const detailsData = await detailsResponse.json();

      if (detailsData.items && detailsData.items.length > 0) {
        const { snippet, statistics } = detailsData.items[0];
        setStats({
          title: snippet.title,
          thumbnailUrl: snippet.thumbnails.default.url,
          videoCount: statistics.videoCount,
        });
        toast.success("Video count fetched!");
      } else {
        throw new Error('Could not retrieve channel statistics.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Video Count Checker</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Quickly find out the total number of public videos on any YouTube channel.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Video Count Checker</CardTitle>
          <CardDescription>Enter a channel URL, ID, or @handle to see its total video count.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="e.g., https://www.youtube.com/c/Google"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleCheck} disabled={isLoading || !url.trim()}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Check Count'}
            </Button>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {stats && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={stats.thumbnailUrl} alt={stats.title} />
                <AvatarFallback>{stats.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{stats.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">Total Public Videos</p>
            <p className="text-6xl font-bold">{Number(stats.videoCount).toLocaleString()}</p>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a YouTube Video Count Checker?</h2>
          <p className="text-muted-foreground">
            A YouTube Video Count Checker is an online tool designed to provide the exact number of public videos uploaded to a specific YouTube channel. For content creators, marketers, and analysts, this metric is more than just a number—it's a reflection of a channel's content strategy, consistency, and overall growth trajectory. Manually counting videos, especially for channels with extensive libraries, is impractical. This tool automates the process, delivering precise data in seconds. By simply entering a channel's URL, ID, or handle, users can get an instant snapshot of its content volume, which is crucial for competitive analysis, content planning, and performance tracking.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Factors Affecting Video Count Accuracy</h2>
          <p className="text-muted-foreground">
            The accuracy of the video count is primarily dependent on the YouTube API. Our tool queries the API for the most up-to-date information. However, several factors can influence the number you see:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Public vs. Private/Unlisted Videos:</strong> The tool only counts public videos. Private and unlisted videos are not included in the total provided by the API.</li>
            <li><strong>Deleted Videos:</strong> If a creator deletes videos, the total count will decrease accordingly.</li>
            <li><strong>API Caching:</strong> YouTube's API may have a slight delay in updating statistics. While generally minimal, this can sometimes cause a minor discrepancy.</li>
            <li><strong>Channel Permissions:</strong> In rare cases, channel settings might restrict full data access, although this is uncommon for public channels.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Key Components of Our Tool</h2>
          <p className="text-muted-foreground">
            Our YouTube Video Count Checker is built with simplicity and power in mind. Here are its key features:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Multiple Input Formats:</strong> Accepts channel URLs, IDs, and @handles for maximum flexibility.</li>
            <li><strong>Real-Time Data:</strong> Fetches live data directly from the YouTube API for the most current count.</li>
            <li><strong>User-Friendly Interface:</strong> A clean, intuitive design that makes it easy for anyone to use.</li>
            <li><strong>Fast and Efficient:</strong> Optimized for speed, delivering results almost instantly.</li>
            <li><strong>Secure and Private:</strong> We do not store any of the data you enter. Your searches are completely private.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the YouTube Video Count Checker</h2>
          <p className="text-muted-foreground">
            Finding the video count of a channel is a straightforward process with our tool:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Enter the Channel Identifier:</strong> Copy and paste the YouTube channel's URL, ID, or @handle into the input field.</li>
            <li><strong>Click "Check Count":</strong> Hit the button to initiate the search.</li>
            <li><strong>View the Results:</strong> The tool will display the channel's name, thumbnail, and the total number of public videos.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Is this tool free to use?</h3>
              <p className="text-muted-foreground">Yes, our YouTube Video Count Checker is completely free. There are no hidden charges or subscription fees.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I check the video count for any YouTube channel?</h3>
              <p className="text-muted-foreground">You can check the video count for any public YouTube channel. Private channels or those with specific restrictions may not be accessible.</p>
            </div>
            <div>
              <h3 className="font-semibold">How accurate is the video count?</h3>
              <p className="text-muted-foreground">The count is highly accurate as it is fetched directly from the official YouTube API. It reflects the total number of public videos at the time of your query.</p>
            </div>
            <div>
              <h3 className="font-semibold">Do I need a YouTube API key to use this tool?</h3>
              <p className="text-muted-foreground">No, you do not need your own API key. Our tool handles all the API interactions for you.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The first video ever uploaded to YouTube was titled "Me at the zoo," posted on April 23, 2005, by co-founder Jawed Karim. As of 2024, the platform has grown to host billions of videos, with over 500 hours of content uploaded every single minute!
          </p>
        </section>
      </div>
    </div>
  );
};

export default YouTubeVideoCountCheckerTool;
