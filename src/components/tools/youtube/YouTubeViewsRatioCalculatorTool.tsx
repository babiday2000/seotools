import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { AlertCircle, Loader2, Users, Eye, Percent } from 'lucide-react';
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

interface ChannelMetrics {
  title: string;
  thumbnailUrl: string;
  subscriberCount: string;
  viewCount: string;
  ratio: number;
}

const YouTubeViewsRatioCalculatorTool = () => {
  const [url, setUrl] = useState('');
  const [metrics, setMetrics] = useState<ChannelMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleCalculate = async () => {
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
    setMetrics(null);

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
        const subs = parseInt(statistics.subscriberCount);
        const views = parseInt(statistics.viewCount);
        const ratio = subs > 0 ? (views / subs) : 0;

        setMetrics({
          title: snippet.title,
          thumbnailUrl: snippet.thumbnails.default.url,
          subscriberCount: statistics.subscriberCount,
          viewCount: statistics.viewCount,
          ratio: ratio,
        });
        toast.success("Ratio calculated successfully!");
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
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Views to Subscriber Ratio Calculator</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Analyze the engagement of any YouTube channel by calculating its views-to-subscriber ratio. This powerful metric helps you understand how well a channel's content resonates with its audience.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Calculate Ratio</CardTitle>
          <CardDescription>Enter a channel URL, ID, or @handle to calculate its views-to-subscriber ratio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="e.g., https://www.youtube.com/c/MrBeast"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleCalculate} disabled={isLoading || !url.trim()}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Calculate'}
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

      {metrics && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={metrics.thumbnailUrl} alt={metrics.title} />
                <AvatarFallback>{metrics.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{metrics.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2"><Users className="h-4 w-4" /> Subscribers</p>
              <p className="text-3xl font-bold">{Number(metrics.subscriberCount).toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2"><Eye className="h-4 w-4" /> Total Views</p>
              <p className="text-3xl font-bold">{Number(metrics.viewCount).toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary text-primary-foreground">
              <p className="text-sm flex items-center justify-center gap-2"><Percent className="h-4 w-4" /> Views per Subscriber</p>
              <p className="text-3xl font-bold">{metrics.ratio.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is the Views-to-Subscriber Ratio?</h2>
          <p className="text-muted-foreground">
            The Views-to-Subscriber Ratio is a key performance indicator (KPI) that measures the average number of views a channel receives per subscriber. It's calculated by dividing the total number of views by the total number of subscribers. This metric provides a deeper understanding of audience engagement than subscriber count alone. A high ratio suggests that a channel's content is actively being watched by its subscriber base and is also reaching a wider audience through recommendations and search. Conversely, a low ratio might indicate that a channel has many inactive subscribers or that its content is not engaging enough to retain viewership.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Factors That Influence the Ratio</h2>
          <p className="text-muted-foreground">
            Several factors can impact a channel's views-to-subscriber ratio:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Content Quality and Relevance:</strong> High-quality, engaging content that resonates with the target audience will naturally lead to more views per subscriber.</li>
            <li><strong>Posting Frequency:</strong> Channels that upload content consistently tend to have a more active and engaged subscriber base.</li>
            <li><strong>Video Virality:</strong> A single viral video can dramatically increase the total view count, temporarily inflating the ratio.</li>
            <li><strong>Subscriber Age:</strong> Channels with a large number of old, inactive subscribers may have a lower ratio.</li>
            <li><strong>Niche and Content Type:</strong> Some niches, like news or tutorials, may attract more non-subscriber views from search, leading to a higher ratio.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Key Components of Our Ratio Calculator</h2>
          <p className="text-muted-foreground">
            Our tool is built to provide a quick and accurate analysis of any public YouTube channel.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Accurate Data:</strong> Fetches real-time statistics directly from the YouTube API.</li>
            <li><strong>Clear Visualization:</strong> Presents subscribers, views, and the final ratio in an easy-to-read format.</li>
            <li><strong>Universal Input:</strong> Accepts channel URLs, IDs, and @handles.</li>
            <li><strong>Fast and Secure:</strong> Calculates the ratio instantly without storing any user data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Views-to-Subscriber Ratio Calculator</h2>
          <p className="text-muted-foreground">
            Analyzing a channel's engagement is simple with our tool:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Enter Channel Identifier:</strong> Paste the YouTube channel's URL, ID, or @handle into the input box.</li>
            <li><strong>Click "Calculate":</strong> Press the button to fetch the channel's data.</li>
            <li><strong>Analyze the Results:</strong> The tool will display the total subscribers, total views, and the calculated views-per-subscriber ratio.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">What is a good views-to-subscriber ratio?</h3>
              <p className="text-muted-foreground">There's no single "good" ratio, as it varies widely by niche and channel size. However, a ratio significantly above 1.0 often indicates a highly engaged audience. The best approach is to compare the ratio with other channels in the same niche.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I calculate the ratio for a private video or channel?</h3>
              <p className="text-muted-foreground">No, our tool uses the public data provided by the YouTube API and cannot access private videos or channels.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is this tool free to use?</h3>
              <p className="text-muted-foreground">Yes, our YouTube Views-to-Subscriber Ratio Calculator is completely free to use without any limitations.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The concept of a "subscriber" was added to YouTube in October 2005, just a few months after the platform launched. It was a revolutionary feature at the time, allowing viewers to create a personalized feed of content, which laid the groundwork for the creator-centric ecosystem we know today.
          </p>
        </section>
      </div>
    </div>
  );
};

export default YouTubeViewsRatioCalculatorTool;
