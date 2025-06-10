import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { Download, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
    
    const parts = pathname.split('/').filter(p => p);
    if (parts.length === 1) {
        if (parts[0].startsWith('@')) return { type: 'handle', value: parts[0].substring(1) };
        if (parts[0].startsWith('UC') || parts[0].startsWith('HC')) return { type: 'id', value: parts[0] };
        return { type: 'custom', value: parts[0] };
    }

    return { type: 'invalid', value: 'No valid identifier found in URL.' };
  } catch {
      if (url.startsWith('@')) return { type: 'handle', value: url.substring(1) };
      if (url.startsWith('UC') || url.startsWith('HC')) return { type: 'id', value: url };
      if (url.match(/^[a-zA-Z0-9_.-]+$/)) return { type: 'custom', value: url };
      return { type: 'invalid', value: 'Invalid input format.' };
  }
};

interface ChannelInfo {
  id: string;
  title: string;
  logoUrl: string;
}

const YouTubeChannelLogoDownloaderTool = () => {
  const [url, setUrl] = useState('');
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleFetchLogo = async () => {
    if (!apiKey) {
      setError('YouTube API key is not configured.');
      toast.error("API Key Missing");
      return;
    }

    setError('');
    setIsLoading(true);
    setChannelInfo(null);

    const identifier = getChannelIdentifier(url);

    if (identifier.type === 'invalid') {
      setError(`Invalid YouTube Channel URL or identifier. ${identifier.value}`);
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
        
        const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet${searchParam}&key=${apiKey}`);
        const searchData = await searchResponse.json();
        if (searchData.items && searchData.items.length > 0) {
          channelId = searchData.items[0].id;
        } else {
          throw new Error('Channel not found with the provided URL/handle.');
        }
      }

      const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`);
      const detailsData = await detailsResponse.json();

      if (detailsData.items && detailsData.items.length > 0) {
        const { id, snippet } = detailsData.items[0];
        setChannelInfo({
          id,
          title: snippet.title,
          logoUrl: snippet.thumbnails.high.url,
        });
        toast.success("Logo fetched successfully!");
      } else {
        throw new Error('Could not retrieve channel details.');
      }
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
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Channel Logo Downloader</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Easily download the high-quality profile picture of any YouTube channel. Perfect for designers, fans, or anyone needing a channel's logo.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Download Channel Logo</CardTitle>
          <CardDescription>Enter a YouTube channel URL, @handle, or ID to get its logo.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="e.g., https://www.youtube.com/@MrBeast"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFetchLogo()}
                className="flex-grow"
              />
              <Button onClick={handleFetchLogo} disabled={isLoading || !url.trim()}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Logo'}
              </Button>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {channelInfo && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Logo for {channelInfo.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="w-48 h-48">
              <AvatarImage src={channelInfo.logoUrl} alt={channelInfo.title} />
              <AvatarFallback>{channelInfo.title.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button asChild>
              <a href={channelInfo.logoUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download High-Resolution Logo
              </a>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a YouTube Channel Logo?</h2>
          <p className="text-muted-foreground">
            A YouTube channel logo, also known as a profile picture, is the primary visual identifier for a creator on the platform. It appears next to every video, comment, and channel name, making it a crucial element of a channel's brand identity. A strong, recognizable logo helps viewers quickly identify your content in crowded subscription feeds and search results. It's the face of the channel, and our downloader tool allows you to easily save a high-quality version of this important asset.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Download a Channel Logo?</h2>
          <p className="text-muted-foreground">
            There are many legitimate reasons why you might need to download a channel's logo:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Design and Branding Analysis:</strong> Marketers and designers often study the logos of successful channels to understand branding trends and gather inspiration.</li>
            <li><strong>Content Creation:</strong> If you are creating a video or blog post that reviews, discusses, or features another channel, using their logo is essential for context (always follow fair use guidelines).</li>
            <li><strong>Personal Use:</strong> Fans may want to download a logo for use as a profile picture on other platforms or for personal creative projects.</li>
            <li><strong>Archiving:</strong> Creators can use this tool to save a high-quality copy of their own logo for their portfolio or brand kit.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Logo Downloader</h2>
          <p className="text-muted-foreground">
            Getting a channel's logo is a simple, three-step process:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Enter the Channel Identifier:</strong> Paste the channel's URL, @handle, or ID into the input field.</li>
            <li><strong>Fetch the Logo:</strong> Click the "Get Logo" button. Our tool will find the channel and display its profile picture.</li>
            <li><strong>Download:</strong> Click the "Download High-Resolution Logo" button to save the image to your device.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">What resolution will the logo be?</h3>
              <p className="text-muted-foreground">The tool downloads the highest resolution version of the logo that the channel has uploaded, ensuring the best possible quality.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is it legal to use a downloaded logo?</h3>
              <p className="text-muted-foreground">You must respect the copyright and trademark of the channel owner. Downloading for personal use or for commentary/criticism under fair use is generally acceptable. However, you should not use a channel's logo for commercial purposes or in a way that implies endorsement without permission.</p>
            </div>
            <div>
              <h3 className="font-semibold">Does this tool work for any channel?</h3>
              <p className="text-muted-foreground">Yes, you can download the logo from any public YouTube channel. The tool cannot access logos from private or terminated channels.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            YouTube's original logo, used from 2005 to 2011, featured the slogan "Broadcast Yourself" inside a classic television-shaped screen. This reflected the platform's initial vision of being a personal broadcasting service for everyone, a mission that has remained at its core even as it has evolved into a global entertainment powerhouse.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/tools/youtube-tools/youtube-channel-banner-downloader" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Channel Banner Downloader</h3>
              <p className="text-sm text-muted-foreground">Download a channel's banner image in high resolution.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-channel-id-extractor" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Channel ID Extractor</h3>
              <p className="text-sm text-muted-foreground">Quickly find the unique ID of any channel.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-channel-finder" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Channel Finder</h3>
              <p className="text-sm text-muted-foreground">Discover new channels by keyword or topic.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default YouTubeChannelLogoDownloaderTool;
