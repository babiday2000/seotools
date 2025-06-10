import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { AlertCircle, Users, Video, BarChart, Globe, Calendar, Search, CheckSquare } from 'lucide-react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

interface ChannelInfo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  bannerUrl: string | null;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  country: string | null;
}

const getChannelIdentifier = (url: string): { type: 'id' | 'handle' | 'custom' | 'invalid' | 'search', value: string } => {
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
    
    return { type: 'search', value: url };
  } catch {
      if (url.startsWith('@')) return { type: 'handle', value: url.substring(1) };
      if (url.startsWith('UC') || url.startsWith('HC')) return { type: 'id', value: url };
      if (url.match(/^[a-zA-Z0-9_.-]+$/)) return { type: 'search', value: url };
      return { type: 'invalid', value: 'Invalid input format.' };
  }
};


const YouTubeChannelStatisticsTool = () => {
  const [query, setQuery] = useState('');
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleFetchStats = async () => {
    if (!query.trim()) {
      setError('Please enter a YouTube Channel URL, ID, or name.');
      return;
    }
    
    if (!apiKey) {
      setError('YouTube API key is not configured. Please contact support.');
      return;
    }

    setError('');
    setIsLoading(true);
    setChannelInfo(null);

    try {
      let channelId: string | null = null;
      const identifier = getChannelIdentifier(query);

      if (identifier.type === 'invalid') {
        throw new Error(identifier.value);
      }
      
      if (identifier.type === 'id') {
        channelId = identifier.value;
      } else {
        let searchParam = '';
        if (identifier.type === 'handle') searchParam = `&forHandle=@${identifier.value}`;
        else if (identifier.type === 'custom') searchParam = `&forUsername=${identifier.value}`;
        else searchParam = `&q=${encodeURIComponent(identifier.value)}`;

        const searchUrl = identifier.type === 'search' 
          ? `https://www.googleapis.com/youtube/v3/search?part=id&type=channel&q=${encodeURIComponent(identifier.value)}&key=${apiKey}`
          : `https://www.googleapis.com/youtube/v3/channels?part=id${searchParam}&key=${apiKey}`;

        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) {
            const errorData = await searchResponse.json();
            throw new Error(errorData.error?.message || 'Failed to search for channel.');
        }
        const searchData = await searchResponse.json();

        if (searchData.items && searchData.items.length > 0) {
          channelId = searchData.items[0].id.channelId || searchData.items[0].id;
        } else {
          throw new Error(`Channel not found for "${identifier.value}". Please check the URL or name.`);
        }
      }

      if (!channelId) {
        throw new Error('Could not resolve Channel ID.');
      }

      // Fetch channel details using the resolved ID
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${apiKey}`
      );

      if (!detailsResponse.ok) {
        const errorData = await detailsResponse.json();
        throw new Error(errorData.error?.message || 'Failed to fetch channel data.');
      }

      const detailsData = await detailsResponse.json();

      if (detailsData.items && detailsData.items.length > 0) {
        const { snippet, statistics, brandingSettings } = detailsData.items[0];
        setChannelInfo({
          id: detailsData.items[0].id,
          title: snippet.title,
          description: snippet.description,
          publishedAt: snippet.publishedAt,
          thumbnailUrl: snippet.thumbnails.high.url,
          bannerUrl: brandingSettings.image?.bannerExternalUrl || null,
          subscriberCount: statistics.hiddenSubscriberCount ? 'Hidden' : statistics.subscriberCount,
          viewCount: statistics.viewCount,
          videoCount: statistics.videoCount,
          country: snippet.country || null,
        });
        toast.success("Channel statistics loaded successfully!");
      } else {
        throw new Error('Channel data not found after resolving ID.');
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

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Channel Statistics</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Get a bird's-eye view of any YouTube channel's performance. Research competitors, track your favorite creators, or audit your own channel's health with key statistics.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Channel Finder</CardTitle>
          <CardDescription>Enter a channel URL, ID, handle (@name), or name to fetch its stats.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter YouTube Channel URL, ID, or Name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow text-base"
              />
              <Button onClick={handleFetchStats} disabled={isLoading || !query.trim()} className="text-base px-6">
                {isLoading ? 'Fetching...' : 'Get Channel Stats'}
              </Button>
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            {channelInfo && (
              <Card className="animate-fade-in overflow-hidden mt-6">
                {channelInfo.bannerUrl && (
                  <div className="h-32 md:h-48 bg-cover bg-center" style={{ backgroundImage: `url(${channelInfo.bannerUrl})` }}></div>
                )}
                <CardHeader className={`flex flex-col sm:flex-row items-center gap-4 z-10 relative p-6 bg-card/80 backdrop-blur-sm ${channelInfo.bannerUrl ? '-mt-12 sm:-mt-16' : ''}`}>
                  <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                    <AvatarImage src={channelInfo.thumbnailUrl} alt={channelInfo.title} />
                    <AvatarFallback>{channelInfo.title.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <CardTitle className="text-2xl font-bold">{channelInfo.title}</CardTitle>
                    <a 
                      href={`https://www.youtube.com/channel/${channelInfo.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      youtube.com/channel/{channelInfo.id}
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-card border p-4 rounded-lg">
                      <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{channelInfo.subscriberCount === 'Hidden' ? 'Hidden' : Number(channelInfo.subscriberCount).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Subscribers</p>
                    </div>
                    <div className="bg-card border p-4 rounded-lg">
                      <BarChart className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{Number(channelInfo.viewCount).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                    </div>
                    <div className="bg-card border p-4 rounded-lg">
                      <Video className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{Number(channelInfo.videoCount).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Videos</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Calendar className="h-5 w-5" /> Channel Age</h3>
                          <p className="text-muted-foreground">
                              Created on {format(parseISO(channelInfo.publishedAt), 'MMMM d, yyyy')} ({formatDistanceToNow(parseISO(channelInfo.publishedAt))} ago)
                          </p>
                      </div>
                      {channelInfo.country && (
                          <div>
                              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Globe className="h-5 w-5" /> Country</h3>
                              <p className="text-muted-foreground">{channelInfo.country}</p>
                          </div>
                      )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap text-sm max-h-60 overflow-y-auto p-3 bg-muted/50 rounded-md">
                      {channelInfo.description || "No description provided."}
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
            <CardTitle className="flex items-center gap-2"><Search className="h-6 w-6 text-primary" /> How to Analyze Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>A successful YouTube channel is more than just a collection of videos; it's a brand. Analyzing channel-level statistics helps you understand its overall authority, audience size, and content consistency. This high-level view is essential for spotting trends and setting realistic growth goals.</p>
            <p>Use this tool to study channels in your niche. Look at their subscriber-to-view ratio to gauge audience loyalty. Note their video upload frequency to understand their content strategy. This competitive analysis is a powerful way to find inspiration and refine your own path to success.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CheckSquare className="h-6 w-6 text-primary" /> What the Stats Mean</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Subscribers:</strong> The number of users who have subscribed to the channel. A primary indicator of a channel's reach and community size.</li>
              <li><strong>Total Views:</strong> The cumulative number of views across all videos on the channel. This reflects the channel's overall viewership and historical performance.</li>
              <li><strong>Total Videos:</strong> The number of public videos on the channel. This shows the channel's content output and consistency.</li>
              <li><strong>Channel Age:</strong> The date the channel was created. This provides context for its growth; a channel with a million subscribers in one year is different from one that took ten years.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Channel Statistics Tool</h2>
          <p className="text-muted-foreground">
            Getting insights into a YouTube channel is easy with our tool:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Enter a Channel Identifier:</strong> You can paste the full URL of the channel, its @handle (e.g., @MrBeast), its Channel ID (e.g., UCX6OQ3DkcsbYNE6H8uQQuVA), or simply type the channel's name.</li>
            <li><strong>Fetch the Stats:</strong> Click the "Get Channel Stats" button to retrieve the latest data from the YouTube API.</li>
            <li><strong>Analyze the Results:</strong> The tool will display a comprehensive overview of the channel, including its subscriber count, total views, number of videos, creation date, and description.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How accurate are the statistics?</h3>
              <p className="text-muted-foreground">The data is fetched directly from the official YouTube API, so it is as accurate as the information YouTube provides publicly. Statistics are updated in near real-time.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I see stats for a private channel?</h3>
              <p className="text-muted-foreground">No, the tool can only retrieve statistics for public channels. If a channel has hidden its subscriber count, that specific metric will be marked as "Hidden."</p>
            </div>
            <div>
              <h3 className="font-semibold">Why is channel analysis important?</h3>
              <p className="text-muted-foreground">Analyzing channel statistics is crucial for competitive research, identifying trends in your niche, finding potential collaborators, and tracking your own growth against others. It provides a data-driven foundation for your content strategy.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The first channel to hit 100 million subscribers was T-Series, an Indian music label, which achieved the milestone on May 29, 2019. This event was the culmination of a months-long, highly publicized subscriber race with the creator PewDiePie, which captured the attention of millions worldwide and became a significant cultural moment for the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/tools/youtube-tools/youtube-video-statistics" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Video Statistics</h3>
              <p className="text-sm text-muted-foreground">Get detailed analytics for a single YouTube video.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-channel-finder" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Channel Finder</h3>
              <p className="text-sm text-muted-foreground">Discover new channels based on keywords and topics.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-money-calculator" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Money Calculator</h3>
              <p className="text-sm text-muted-foreground">Estimate the potential ad revenue of a channel.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default YouTubeChannelStatisticsTool;
