import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Loader2, BookText, HelpCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const YouTubeDescriptionExtractorTool = () => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<{ title: string; thumbnail: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleExtract = async () => {
    if (!apiKey) {
      setError('YouTube API key is not configured on this site. This tool is currently disabled.');
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
    setDescription(null);
    setVideoInfo(null);

    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const snippet = data.items[0].snippet;
        setDescription(snippet.description);
        setVideoInfo({
          title: snippet.title,
          thumbnail: snippet.thumbnails.medium.url,
        });
        toast.success("Description extracted successfully!");
      } else {
        setError('Video not found or description is unavailable. Please check the URL.');
        toast.error("Video Not Found", { description: "The video might be private or the URL incorrect." });
      }
    } catch (err) {
      setError('An API error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (description) {
      navigator.clipboard.writeText(description);
      toast.success('Description copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Description Extractor</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Instantly pull the full text description from any YouTube video. This tool is perfect for competitor analysis, content research, or simply grabbing important links and information from a video's description box without manual copy-pasting.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Description Extractor</CardTitle>
          <CardDescription>Paste any YouTube video URL below to get its full description.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter YouTube Video URL (e.g., https://www.youtube.com/watch?v=...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleExtract} disabled={isLoading || !url.trim()}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  'Extract Description'
                )}
              </Button>
            </div>
            {error && <p className="text-destructive text-center sm:text-left">{error}</p>}
            
            {description !== null && videoInfo && (
              <Card>
                <CardHeader>
                  <div className="flex gap-4">
                    <img src={videoInfo.thumbnail} alt="Video thumbnail" className="w-32 h-18 rounded-md object-cover" />
                    <div className="flex-grow">
                      <CardTitle className="text-lg">{videoInfo.title}</CardTitle>
                      <CardDescription>Full video description below.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="text-sm whitespace-pre-wrap font-sans bg-muted p-4 rounded-md max-h-96 overflow-y-auto">
                      {description || <span className="text-muted-foreground">This video has no description.</span>}
                    </pre>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopyToClipboard}>
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
            <CardTitle className="flex items-center gap-2"><BookText className="h-6 w-6 text-primary" /> What is a YouTube Description?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>The YouTube description is a text field beneath every video where creators can provide context, add links, and include other relevant information. It's a critical piece of metadata that helps both viewers and the YouTube algorithm understand what a video is about.</p>
            <p>While only the first few lines are visible without clicking "Show more," the full description can contain up to 5,000 characters of text, making it a powerful tool for communication and optimization.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HelpCircle className="h-6 w-6 text-primary" /> Why is the Description Important?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>A well-crafted description is vital for a video's success. It serves multiple key functions:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>SEO & Discovery:</strong> It provides keywords and context that help YouTube's algorithm rank your video in search results and recommend it to relevant audiences.</li>
              <li><strong>Viewer Context:</strong> It gives viewers more information, clarifies points made in the video, and provides sources or credits.</li>
              <li><strong>Calls to Action (CTAs):</strong> It's the primary place to drive traffic to your website, social media profiles, affiliate products, or mailing list.</li>
              <li><strong>Navigation:</strong> Using timestamps, you can create a "table of contents" that allows viewers to jump to specific sections of your video, improving user experience.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6 text-primary" /> Best Practices for Writing Descriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-3 text-muted-foreground">
            <li><strong>Front-Load the Important Info:</strong> The first 2-3 lines are most critical as they are visible before the "Show more" click. Summarize the video and include your main call-to-action here.</li>
            <li><strong>Write for Humans, Optimize for Bots:</strong> Write a natural, compelling paragraph (150-250 words) that accurately describes your video. Naturally weave in your main and secondary keywords throughout this text.</li>
            <li><strong>Use Timestamps:</strong> For longer videos, add timestamps (e.g., 0:00 Intro, 1:23 Main Topic) to help viewers navigate. This also creates key moments on the video timeline.</li>
            <li><strong>Include Relevant Links:</strong> Add links to your website, social profiles, related videos, and any products or resources mentioned. Always use the full `https://` prefix.</li>
            <li><strong>Use Hashtags Strategically:</strong> Add 3-5 relevant hashtags at the very end of your description. This can help with discovery, but don't overdo it.</li>
            <li><strong>Structure for Readability:</strong> Use short paragraphs, bullet points, and emojis to break up the text and make it easy to scan. A giant wall of text is intimidating and rarely read.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeDescriptionExtractorTool;
