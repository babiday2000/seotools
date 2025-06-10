import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, FileText, HelpCircle, CheckCircle, Lightbulb, Loader2 } from 'lucide-react';
import { toast } from "sonner";

// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const YouTubeTitleExtractorTool = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleExtract = async () => {
    const videoId = getYouTubeVideoId(url);

    if (!videoId) {
      setError('Please enter a valid YouTube video URL.');
      setTitle('');
      return;
    }

    if (!apiKey) {
        setError('YouTube API key is not configured. Please contact support.');
        setIsLoading(false);
        return;
    }

    setError('');
    setIsLoading(true);
    setTitle('');

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch video data from YouTube API.');
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const videoTitle = data.items[0].snippet.title;
        setTitle(videoTitle);
        toast.success("Title extracted successfully!");
      } else {
        setError('Video not found. Please check the URL.');
        toast.error("Video not found.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch video data.';
      console.error(err);
      setError(errorMessage);
      toast.error("Extraction Failed", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!title) return;
    navigator.clipboard.writeText(title);
    toast.success("Title Copied!", {
      description: "The video title has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Title Extractor</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Instantly grab the exact title from any YouTube video. A simple tool for content creators and marketers to analyze what makes a title clickable and successful.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Title Extractor Tool</CardTitle>
          <CardDescription>Paste a video URL to extract its title.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter YouTube Video URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow text-base"
              />
              <Button onClick={handleExtract} disabled={isLoading || !url.trim()} className="text-base px-6">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4 mr-2" />}
                {isLoading ? 'Extracting...' : 'Extract Title'}
              </Button>
            </div>
            {error && <p className="text-destructive text-center sm:text-left">{error}</p>}
            
            {title && (
              <Card>
                <CardHeader>
                  <CardTitle>Extracted Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/50">
                    <p className="text-lg font-semibold flex-grow">{title}</p>
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                      <Copy className="h-5 w-5" />
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
            <CardTitle className="flex items-center gap-2"><Lightbulb className="h-6 w-6 text-primary" /> The Power of a Great Title</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>A video's title is arguably the most important piece of its metadata. Along with the thumbnail, it's the primary driver of clicks. A great title grabs attention, creates curiosity, and clearly communicates the video's value proposition to a potential viewer.</p>
            <p>It's a crucial element for both human psychology and search engine optimization (SEO), as it tells YouTube's algorithm what your video is about, helping it rank in search results.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HelpCircle className="h-6 w-6 text-primary" /> Why Analyze Video Titles?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>By extracting and analyzing the titles of popular videos in your niche, you can identify patterns and strategies that lead to success. This research helps you:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Understand Keyword Strategy:</strong> See which keywords top creators are targeting.</li>
              <li><strong>Get Inspiration:</strong> Brainstorm ideas and formats for your own titles.</li>
              <li><strong>Identify Trends:</strong> Spot popular title formats (e.g., "X vs Y", "My Top 5...", "The Ultimate Guide to...").</li>
              <li><strong>Improve Your Own Titles:</strong> Learn how to write more compelling and clickable titles to increase your video's performance.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6 text-primary" /> Elements of a High-Performing Title</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-3 text-muted-foreground">
            <li><strong>Include Your Target Keyword:</strong> Place your main keyword naturally within the title, preferably near the beginning.</li>
            <li><strong>Keep it Concise:</strong> Aim for under 60-70 characters to prevent the title from being cut off in search results and suggestion feeds.</li>
            <li><strong>Use Numbers and Lists:</strong> Titles with numbers (e.g., "7 Tips for...") often have higher click-through rates because they set clear expectations.</li>
            <li><strong>Create Curiosity or Urgency:</strong> Use powerful words that evoke emotion or a sense of urgency (e.g., "Warning," "Secret," "Finally").</li>
            <li><strong>Be Accurate:</strong> Your title must accurately reflect the content of your video. Misleading titles (clickbait) lead to low watch time and can harm your channel's reputation.</li>
            <li><strong>Consider Adding a Brand:</strong> For series or recognizable content, adding your brand or show name can be effective (e.g., "React Crash Course | MyChannel").</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeTitleExtractorTool;
