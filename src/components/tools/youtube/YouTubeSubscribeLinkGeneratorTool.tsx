import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Link, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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

const YouTubeSubscribeLinkGeneratorTool = () => {
  const [url, setUrl] = useState('');
  const [channelId, setChannelId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const generatedLink = useMemo(() => {
    if (!channelId) return '';
    return `https://www.youtube.com/channel/${channelId}?sub_confirmation=1`;
  }, [channelId]);

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError('Please enter a channel URL, ID, or handle.');
      return;
    }
    if (!apiKey) {
      setError('API key is not configured.');
      return;
    }

    setIsLoading(true);
    setError('');
    setChannelId(null);

    const identifier = getChannelIdentifier(url);

    if (identifier.type === 'invalid') {
      setError(identifier.value);
      setIsLoading(false);
      return;
    }

    try {
      let id = '';
      if (identifier.type === 'id') {
        id = identifier.value;
      } else {
        let searchParam = '';
        if (identifier.type === 'handle') searchParam = `&forHandle=@${identifier.value}`;
        else if (identifier.type === 'custom') searchParam = `&forUsername=${identifier.value}`;
        
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id${searchParam}&key=${apiKey}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          id = data.items[0].id;
        } else {
          throw new Error('Channel not found.');
        }
      }
      setChannelId(id);
      toast.success('Subscribe link generated!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Subscribe Link Generator</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Boost your subscriber growth by creating a direct link that prompts users to subscribe to your YouTube channel. This simple but powerful tool removes friction, making it easier for your audience to join your community with a single click.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Subscribe Link</CardTitle>
          <CardDescription>Enter your channel URL, ID, or @handle.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="e.g., https://www.youtube.com/@MrBeast"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleGenerate} disabled={isLoading || !url.trim()}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate Link'}
            </Button>
          </div>
          {error && <p className="text-destructive text-center">{error}</p>}
        </CardContent>
      </Card>

      {generatedLink && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Your Subscription Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 bg-muted p-4 rounded-md">
              <Link className="h-5 w-5 text-muted-foreground" />
              <Input readOnly value={generatedLink} className="flex-grow" />
              <Button onClick={handleCopy} size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 text-center">
                <Button asChild>
                    <a href={generatedLink} target="_blank" rel="noopener noreferrer">Test the Link</a>
                </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a YouTube Subscribe Link?</h2>
          <p className="text-muted-foreground">
            A YouTube Subscribe Link is a special URL that, when clicked, automatically opens a subscription confirmation pop-up for a specific channel. Instead of just landing on the channel page and having to find and click the subscribe button, this link streamlines the process. By adding `?sub_confirmation=1` to the end of a channel's URL, you create a direct call-to-action that has been proven to increase subscriber conversion rates. It's a simple trick that professional marketers and content creators use to grow their audience more effectively.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Use a Subscribe Link Generator?</h2>
          <p className="text-muted-foreground">
            While you can create these links manually, our generator offers several advantages:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Error-Free Links:</strong> Ensures the link is formatted correctly every time, avoiding broken URLs that can cost you subscribers.</li>
            <li><strong>Handles All URL Types:</strong> YouTube channels can have different URL formats (e.g., @handle, /channel/ID, custom /c/ URLs). Our tool automatically finds the correct Channel ID to create a reliable link, no matter which URL format you provide.</li>
            <li><strong>Saves Time:</strong> Instantly generates the link without you needing to find the channel ID or manually edit the URL.</li>
            <li><strong>Ease of Use:</strong> A simple, user-friendly interface that anyone can use, regardless of their technical skill level.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Where to Use Your Subscribe Link for Maximum Impact</h2>
          <p className="text-muted-foreground">
            Once you've generated your link, you should use it in as many places as possible to maximize your subscriber growth:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Social Media Profiles:</strong> Add it to your Twitter, Instagram, Facebook, and LinkedIn bios.</li>
            <li><strong>Email Signatures:</strong> Include it in your email signature to promote your channel with every message you send.</li>
            <li><strong>Website and Blog:</strong> Place it on your website's homepage, in blog post CTAs, and on your "About Us" page.</li>
            <li><strong>Video Descriptions:</strong> Add it to the top of your YouTube video descriptions for easy access.</li>
            <li><strong>Pinned Comments:</strong> Pin a comment with the subscribe link on your most popular videos.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Subscribe Link Generator</h2>
          <p className="text-muted-foreground">
            Creating your direct subscribe link is a quick and easy process:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Enter Your Channel URL:</strong> Paste the URL of your YouTube channel into the input field. It can be any format.</li>
            <li><strong>Click "Generate Link":</strong> Our tool will fetch the necessary Channel ID and create your unique subscribe link.</li>
            <li><strong>Copy and Share:</strong> Copy the generated link and start sharing it across all your platforms. You can also test it to see the subscription pop-up in action.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Is this tool safe to use?</h3>
              <p className="text-muted-foreground">Absolutely. The tool simply appends a standard, YouTube-approved parameter to a channel URL. It does not require any access to your account and is completely safe.</p>
            </div>
            <div>
              <h3 className="font-semibold">Will this get my channel in trouble?</h3>
              <p className="text-muted-foreground">No, using a `?sub_confirmation=1` link is a widely accepted and legitimate marketing practice used by many of the largest channels on the platform.</p>
            </div>
            <div>
              <h3 className="font-semibold">Does this work on mobile devices?</h3>
              <p className="text-muted-foreground">Yes, the generated link works on both desktop and mobile browsers, providing a seamless experience for all users.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The idea of a "call to action" (CTA) has been a marketing staple for over a century, long before the internet existed. The `?sub_confirmation=1` parameter is the digital evolution of this classic principle, creating a direct and compelling CTA that has been proven to be highly effective in the unique context of the YouTube platform.
          </p>
        </section>
      </div>
    </div>
  );
};

export default YouTubeSubscribeLinkGeneratorTool;
