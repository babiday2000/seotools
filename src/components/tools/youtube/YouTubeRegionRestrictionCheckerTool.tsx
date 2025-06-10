import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe, Lock, Loader2, HelpCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

interface RestrictionInfo {
  type: 'allowed' | 'blocked' | 'none';
  countries: string[];
}

const YouTubeRegionRestrictionCheckerTool = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<{ title: string; thumbnail: string } | null>(null);
  const [restrictionInfo, setRestrictionInfo] = useState<RestrictionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleCheck = async () => {
    if (!apiKey) {
      setError('YouTube API key is not configured. This tool is currently disabled.');
      toast.error("API Key Missing", { description: "The site administrator needs to configure the YouTube API key." });
      return;
    }

    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
      setError('Please enter a valid YouTube video URL.');
      toast.error("Invalid URL", { description: "Make sure the URL points to a valid YouTube video." });
      return;
    }

    setError('');
    setIsLoading(true);
    setRestrictionInfo(null);
    setVideoInfo(null);

    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        const snippet = item.snippet;
        const contentDetails = item.contentDetails;

        setVideoInfo({
          title: snippet.title,
          thumbnail: snippet.thumbnails.medium.url,
        });

        const regionRestriction = contentDetails.regionRestriction;
        if (regionRestriction) {
          if (regionRestriction.allowed) {
            setRestrictionInfo({ type: 'allowed', countries: regionRestriction.allowed });
          } else if (regionRestriction.blocked) {
            setRestrictionInfo({ type: 'blocked', countries: regionRestriction.blocked });
          } else {
            setRestrictionInfo({ type: 'none', countries: [] });
          }
        } else {
          setRestrictionInfo({ type: 'none', countries: [] });
        }
        toast.success("Restriction check complete!");
      } else {
        setError('Video not found. Please check the URL.');
        toast.error("Video Not Found", { description: "The video might be private or the URL incorrect." });
      }
    } catch (err) {
      setError('An API error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRestrictionResult = () => {
    if (!restrictionInfo) return null;

    if (restrictionInfo.type === 'none') {
      return (
        <div className="flex items-center gap-4 p-4 border rounded-md bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700">
          <Globe className="h-8 w-8 text-green-500" />
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-300">Available Worldwide</h4>
            <p className="text-sm text-green-600 dark:text-green-400">This video has no region restrictions and can be viewed from any country.</p>
          </div>
        </div>
      );
    }

    const isAllowed = restrictionInfo.type === 'allowed';
    const title = isAllowed ? `Allowed only in ${restrictionInfo.countries.length} countries` : `Blocked in ${restrictionInfo.countries.length} countries`;
    const description = isAllowed ? 'This video can only be viewed in the following countries:' : 'This video is not available in the following countries:';

    return (
      <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700">
        <div className="flex items-center gap-4 mb-4">
          <Lock className="h-8 w-8 text-yellow-500" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">{title}</h4>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">{description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto bg-background p-2 rounded">
          {restrictionInfo.countries.map(countryCode => (
            <Badge key={countryCode} variant="secondary">{countryCode}</Badge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Region Restriction Checker</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Find out if a YouTube video is blocked or unavailable in certain countries. Our tool checks the global availability of any video, helping creators, marketers, and viewers understand its reach.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Region Checker</CardTitle>
          <CardDescription>Paste a YouTube video URL to check for regional restrictions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter YouTube Video URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleCheck} disabled={isLoading || !url.trim()}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Check Restrictions'
                )}
              </Button>
            </div>
            {error && <p className="text-destructive text-center sm:text-left">{error}</p>}
            
            {videoInfo && (
              <Card>
                <CardHeader>
                  <div className="flex gap-4 items-center">
                    <img src={videoInfo.thumbnail} alt="Video thumbnail" className="w-32 h-18 rounded-md object-cover" />
                    <div className="flex-grow">
                      <CardTitle className="text-lg">{videoInfo.title}</CardTitle>
                      <CardDescription>Restriction status below.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderRestrictionResult()}
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-primary" /> What is Region Restriction?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Region restriction, also known as geoblocking, is a practice where access to content is limited based on the user's geographical location. On YouTube, this means a video might be fully available in one country but completely blocked in another.</p>
            <p>This is enforced by content owners (the creators or rights holders) and is a common feature on the platform, primarily used to comply with legal and licensing agreements.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HelpCircle className="h-6 w-6 text-primary" /> Why Are Videos Restricted?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>There are several common reasons why a video might be geoblocked:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Music Licensing:</strong> The most frequent cause. A record label may only own the rights to distribute a song in specific countries.</li>
              <li><strong>Content Licensing:</strong> TV networks or movie studios often upload clips or full episodes, but their license only permits them to show this content in their home country.</li>
              <li><strong>Local Laws & Regulations:</strong> A video might be blocked in a specific country to comply with local laws regarding sensitive or controversial topics.</li>
              <li><strong>Creator's Choice:</strong> A creator might intentionally restrict a video to a specific market if the content is only relevant to that audience (e.g., a local promotion).</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-primary" /> Navigating Restrictions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <h4 className="font-semibold text-foreground">For Viewers</h4>
            <p className="text-muted-foreground">If you encounter a blocked video, the message "This video is not available in your country" will appear. While tools like VPNs (Virtual Private Networks) or proxies can sometimes bypass these restrictions by making it seem like you're browsing from another country, be aware that using them may violate YouTube's terms of service. Always proceed with caution and respect the creator's licensing choices.</p>
            <h4 className="font-semibold text-foreground mt-4">For Creators</h4>
            <p className="text-muted-foreground">As a creator, you can manage region restrictions in the YouTube Studio. When uploading a video, you have the option to block or allow specific countries. This is crucial if you're using licensed content (like music) that has geographical limitations. Failing to set these restrictions correctly can lead to copyright claims or strikes against your channel. Always check the terms of any licensed assets you use.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeRegionRestrictionCheckerTool;
