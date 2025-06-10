import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Hash, HelpCircle, Loader2, CheckCircle } from 'lucide-react';
import { toast } from "sonner";

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

    // If no specific pattern matches, it might be a raw handle or ID
    const parts = pathname.split('/').filter(p => p);
    if (parts.length === 1) {
        if (parts[0].startsWith('@')) return { type: 'handle', value: parts[0].substring(1) };
        if (parts[0].startsWith('UC') || parts[0].startsWith('HC')) return { type: 'id', value: parts[0] };
        return { type: 'custom', value: parts[0] }; // Assume legacy username
    }

    return { type: 'invalid', value: 'No valid identifier found in URL.' };
  } catch {
     // Not a valid URL, maybe it's just a username or handle
      if (url.startsWith('@')) return { type: 'handle', value: url.substring(1) };
      if (url.startsWith('UC') || url.startsWith('HC')) return { type: 'id', value: url };
      if (url.match(/^[a-zA-Z0-9_.-]+$/)) return { type: 'custom', value: url }; // Assume legacy username
      return { type: 'invalid', value: 'Invalid input format.' };
  }
};

const YouTubeChannelIDExtractorTool = () => {
  const [url, setUrl] = useState('');
  const [channelInfo, setChannelInfo] = useState<{ id: string; title: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleExtract = async () => {
    if (!apiKey) {
      setError('YouTube API key is not configured on this site. This tool is currently disabled.');
      toast.error("API Key Missing", { description: "The site administrator needs to configure the YouTube API key." });
      return;
    }

    setError('');
    setIsLoading(true);
    setChannelInfo(null);

    const identifier = getChannelIdentifier(url);

    if (identifier.type === 'invalid') {
      setError(`Invalid YouTube Channel URL, handle, or ID. ${identifier.value}`);
      setIsLoading(false);
      return;
    }

    let apiUrl = 'https://www.googleapis.com/youtube/v3/channels?part=snippet';
    
    let searchParam = '';
    if (identifier.type === 'id') searchParam = `&id=${identifier.value}`;
    else if (identifier.type === 'handle') searchParam = `&forHandle=@${identifier.value}`;
    else if (identifier.type === 'custom') searchParam = `&forUsername=${identifier.value}`;

    if (!searchParam) {
        setError("Could not determine a valid search parameter from the input.");
        setIsLoading(false);
        return;
    }

    apiUrl += `${searchParam}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const { id, snippet } = data.items[0];
        setChannelInfo({ id, title: snippet.title });
        toast.success("Channel ID found successfully!");
      } else {
        setError('Channel not found. Please double-check the URL, handle, or username. It may be incorrect or the channel may be private.');
        toast.error("Channel Not Found", { description: "Verify the input and try again." });
      }
    } catch (err) {
      setError('An API error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Channel ID Extractor</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Find the unique, permanent Channel ID for any YouTube channel. This is an essential tool for developers, marketers, and anyone needing a stable identifier for a channel that never changes.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Channel ID Finder</CardTitle>
          <CardDescription>Paste a channel URL, @handle, or legacy username to find its official Channel ID.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="e.g., https://www.youtube.com/@mkbhd or MKBHD"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow text-base"
              />
              <Button onClick={handleExtract} disabled={isLoading || !url.trim()} className="text-base px-6">
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : 'Find Channel ID'}
              </Button>
            </div>
            {error && <p className="text-destructive text-center sm:text-left">{error}</p>}
            
            {channelInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Channel Name</p>
                      <p className="font-semibold text-lg">{channelInfo.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex-grow">
                      <p className="text-sm text-muted-foreground">Channel ID</p>
                      <p className="font-mono text-sm bg-muted p-2 rounded">{channelInfo.id}</p>
                    </div>
                    <Button variant="outline" size="icon" className="ml-4 flex-shrink-0" onClick={() => handleCopy(channelInfo.id)}>
                      <Copy className="h-4 w-4" />
                    </Button>
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
            <CardTitle className="flex items-center gap-2"><Hash className="h-6 w-6 text-primary" /> What is a Channel ID?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>A YouTube Channel ID is a unique identifier assigned to every channel upon creation. It's a 24-character alphanumeric string that typically starts with "UC".</p>
            <p>Unlike a channel's name or its vanity URL (@handle), which can be changed by the owner, the Channel ID is permanent and unchangeable. This makes it the most reliable and stable way to reference a specific channel for technical purposes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HelpCircle className="h-6 w-6 text-primary" /> Why Do You Need It?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>While casual viewers rarely see it, the Channel ID is crucial for many advanced YouTube interactions:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Third-Party Apps:</strong> Tools like SocialBlade, TubeBuddy, and other analytics platforms require the Channel ID to access your data via the API.</li>
              <li><strong>API Development:</strong> It's the primary key used in YouTube Data API calls to fetch channel-specific data, playlists, and videos.</li>
              <li><strong>Subscription Links:</strong> Creating a direct, foolproof subscription link that won't break if the channel's handle changes.</li>
              <li><strong>Content Management:</strong> Correctly identifying a channel for whitelisting or blacklisting purposes in content systems.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6 text-primary" /> Pro Tips for Finding IDs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-3 text-muted-foreground">
            <li><strong>Use the @handle:</strong> The most reliable modern method is to use the channel's handle (e.g., `@mkbhd`). It's unique and directly linked to the channel.</li>
            <li><strong>From a Video URL:</strong> If you have a URL to any video from the channel, you can find the Channel ID in the source code of the video page (search for `channelId`).</li>
            <li><strong>Check the "About" Page:</strong> Sometimes, the direct channel URL containing the ID is available on the channel's "About" tab under the "More information" section.</li>
            <li><strong>Legacy Usernames:</strong> For very old channels, you might only have a legacy username (e.g., `PewDiePie`). Our tool can still find the ID for these.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeChannelIDExtractorTool;
