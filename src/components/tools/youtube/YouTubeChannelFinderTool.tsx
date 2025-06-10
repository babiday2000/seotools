import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { Search, AlertCircle, Users, Video, Eye } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Channel {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

const YouTubeChannelFinderTool = () => {
  const [query, setQuery] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleSearch = async () => {
    if (!apiKey) {
      setError('YouTube API key is not configured. Please contact support.');
      toast.error("API Key Missing");
      return;
    }
    if (!query.trim()) {
      setError('Please enter a search query.');
      toast.error("Query is empty");
      return;
    }

    setError('');
    setIsLoading(true);
    setChannels([]);

    try {
      const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=channel&maxResults=12&key=${apiKey}`);
      const searchData = await searchResponse.json();

      if (searchData.error) {
        throw new Error(searchData.error.message);
      }

      if (!searchData.items || searchData.items.length === 0) {
        setChannels([]);
        toast.info("No channels found for this query.");
        return;
      }

      const channelIds = searchData.items.map((item: { snippet: { channelId: string; }; }) => item.snippet.channelId).join(',');

      const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${apiKey}`);
      const detailsData = await detailsResponse.json();

      if (detailsData.error) {
        throw new Error(detailsData.error.message);
      }

      const fetchedChannels = detailsData.items.map((item: { id: string; snippet: { title: string; description: string; thumbnails: { default: { url: string; }; }; }; statistics: { subscriberCount: string; videoCount: string; viewCount: string; }; }) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        subscriberCount: item.statistics.subscriberCount,
        videoCount: item.statistics.videoCount,
        viewCount: item.statistics.viewCount,
      }));

      setChannels(fetchedChannels);
      toast.success(`Found ${fetchedChannels.length} channels.`);

    } catch (err) {
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
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Channel Finder</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Discover new channels or find specific ones with our powerful search tool. Enter any keyword, topic, or name to get a list of relevant YouTube channels along with their key statistics.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Find YouTube Channels</CardTitle>
          <CardDescription>Enter a query to search for channels.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="e.g., 'Web Development Tutorials', 'Gordon Ramsay'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-grow"
            />
            <Button onClick={handleSearch} disabled={isLoading || !query.trim()}>
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? 'Searching...' : 'Search'}
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

      {channels.length > 0 && (
        <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <Card key={channel.id}>
              <CardHeader className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={channel.thumbnailUrl} alt={channel.title} />
                  <AvatarFallback>{channel.title.charAt(0)}</AvatarFallback>
                </Avatar>
                <a href={`https://youtube.com/channel/${channel.id}`} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">{channel.title}</a>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-3">{channel.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {Number(channel.subscriberCount).toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Video className="h-4 w-4" /> {Number(channel.videoCount).toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {Number(channel.viewCount).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a YouTube Channel Finder?</h2>
          <p className="text-muted-foreground">
            A YouTube Channel Finder is a search tool designed specifically to discover channels rather than individual videos. While YouTube's native search is powerful, it often prioritizes videos in its results. Our tool filters the search to return only channels, making it an ideal utility for users who want to find new creators in a specific niche, research competitors, or identify potential collaborators. By providing key statistics at a glance—such as subscriber, view, and video counts—it offers a comprehensive overview of each channel, helping you make informed decisions about who to watch, follow, or partner with.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Channel Finder Effectively</h2>
          <p className="text-muted-foreground">
            To get the most out of our Channel Finder, consider these tips:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Use Specific Keywords:</strong> Instead of a broad term like "cooking," try a more specific query like "vegan Italian recipes" to find channels in a focused niche.</li>
            <li><strong>Search by Creator Name:</strong> If you know the name of a creator but can't remember their exact channel name or handle, this tool can help you find them quickly.</li>
            <li><strong>Analyze the Statistics:</strong> Use the subscriber, view, and video counts to gauge a channel's size and activity level. A high view count with a moderate number of subscribers can indicate highly engaging content.</li>
            <li><strong>Explore Different Niches:</strong> Use the tool to explore topics you're interested in and discover up-and-coming creators who might not yet be appearing in your recommended feeds.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Key Components of Our Channel Finder</h2>
          <p className="text-muted-foreground">
            Our tool is built to provide a seamless and informative search experience.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Keyword-Based Search:</strong> Find channels by topic, niche, or creator name.</li>
            <li><strong>At-a-Glance Statistics:</strong> Each result includes subscriber, video, and total view counts.</li>
            <li><strong>Direct Links to Channels:</strong> Easily navigate to any channel's page with a single click.</li>
            <li><strong>Clean, Ad-Friendly Interface:</strong> A user-friendly layout that is free of clutter and intrusive ads.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How does the search work?</h3>
              <p className="text-muted-foreground">The tool uses the official YouTube API to search for channels that match your query. It then fetches detailed statistics for the top results to provide you with a comprehensive overview.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I find private or hidden channels?</h3>
              <p className="text-muted-foreground">No, the tool can only find public YouTube channels that are indexed by YouTube's search algorithm.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is this tool free to use?</h3>
              <p className="text-muted-foreground">Yes, our YouTube Channel Finder is completely free to use with no limitations on the number of searches.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The YouTube search algorithm processes billions of queries every day, making it the second-largest search engine in the world after Google. Unlike Google, which primarily indexes text, YouTube's algorithm has the complex task of understanding the content of videos to match them with user queries, a process that involves analyzing titles, descriptions, tags, and even the video's transcript.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/tools/youtube-tools/youtube-channel-statistics" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Channel Statistics</h3>
              <p className="text-sm text-muted-foreground">Get a detailed performance analysis of any channel.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-channel-id-extractor" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Channel ID Extractor</h3>
              <p className="text-sm text-muted-foreground">Quickly find the unique ID of any channel.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-tag-generator" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Tag Generator</h3>
              <p className="text-sm text-muted-foreground">Generate SEO-optimized tags for your videos.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default YouTubeChannelFinderTool;
