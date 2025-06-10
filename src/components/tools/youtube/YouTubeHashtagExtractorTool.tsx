import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Hash, HelpCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from "sonner";

// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const YouTubeHashtagExtractorTool = () => {
  const [url, setUrl] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleExtract = async () => {
    const videoId = getYouTubeVideoId(url);

    if (!videoId) {
      setError('Please enter a valid YouTube video URL.');
      setHashtags([]);
      return;
    }

    if (!apiKey) {
        setError('YouTube API key is not configured. Please contact support.');
        setIsLoading(false);
        return;
    }

    setError('');
    setIsLoading(true);
    setHashtags([]);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch video data from YouTube API.');
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const snippet = data.items[0].snippet;
        const description = snippet.description || '';
        const title = snippet.title || '';
        const videoTags = snippet.tags || [];

        // Extract from description and title
        const combinedText = `${title} ${description}`;
        const foundHashtags = combinedText.match(/#[\w\d]+/g) || [];

        // Extract from the video's actual tags
        const tagBasedHashtags = videoTags.map((tag: string) => `#${tag.replace(/\s+/g, '')}`);

        const uniqueHashtags = [...new Set([...foundHashtags, ...tagBasedHashtags])];

        if (uniqueHashtags.length > 0) {
          setHashtags(uniqueHashtags);
          toast.success("Hashtags extracted successfully!");
        } else {
          setError('No hashtags found in the video\'s title, description, or tags.');
          toast.info("No hashtags found for this video.");
        }
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

  const handleCopy = (tag: string) => {
    navigator.clipboard.writeText(tag);
    toast.success("Copied!", {
      description: `Hashtag "${tag}" copied to clipboard.`,
    });
  };
  
  const handleCopyAll = () => {
    if (hashtags.length === 0) return;
    const allTags = hashtags.join(' ');
    navigator.clipboard.writeText(allTags);
    toast.success("All Copied!", {
      description: "All hashtags copied to clipboard.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Hashtag Extractor</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Discover the hashtags successful creators are using to boost their video's reach. Paste any YouTube video URL to instantly extract all hashtags from its title, description, and tags.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Hashtag Extractor Tool</CardTitle>
          <CardDescription>Paste a video URL below to get started.</CardDescription>
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
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Hash className="h-4 w-4 mr-2" />}
                {isLoading ? 'Extracting...' : 'Extract Hashtags'}
              </Button>
            </div>
            {error && <p className="text-destructive text-center sm:text-left">{error}</p>}
            
            {hashtags.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Extracted Hashtags ({hashtags.length})</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleCopyAll}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-base font-medium p-2 cursor-pointer hover:bg-primary/10 group" onClick={() => handleCopy(tag)}>
                        {tag}
                        <Copy className="h-3 w-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </Badge>
                    ))}
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
            <CardTitle className="flex items-center gap-2"><Hash className="h-6 w-6 text-primary" /> Where to Find Hashtags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>YouTube hashtags are clickable labels that creators can add to their videos to help viewers find content on a specific topic. They are most commonly found in two places:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Above the Title:</strong> YouTube prominently displays up to three hashtags from the video's description right above the title.</li>
              <li><strong>In the Description:</strong> Creators can include a larger list of hashtags within the video description box, often at the very end.</li>
              <li><strong>In the Video Tags:</strong> Creators can add tags to their videos, and these can also be used as hashtags.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HelpCircle className="h-6 w-6 text-primary" /> Why Extract Hashtags?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Analyzing the hashtags used by top-performing videos in your niche is a powerful form of competitor research. It gives you direct insight into:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Content Strategy:</strong> The topics and trends your competitors are targeting.</li>
              <li><strong>Keyword Opportunities:</strong> Relevant keywords you may have overlooked.</li>
              <li><strong>Community Trends:</strong> Popular hashtags that a specific community is following.</li>
            </ul>
            <p>This information helps you position your own videos more effectively to reach a similar audience.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6 text-primary" /> Using Extracted Hashtags Effectively</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-3 text-muted-foreground">
            <li><strong>Don't Just Copy:</strong> Never blindly copy all hashtags from another video. Select only the ones that are highly relevant to your specific content.</li>
            <li><strong>Prioritize Relevance:</strong> Your primary goal is to accurately describe your video for both viewers and the algorithm. Irrelevant hashtags can harm your video's performance.</li>
            <li><strong>Combine with Your Own:</strong> Mix relevant extracted hashtags with your own unique branded hashtag (e.g., #YourChannelName) and other keywords you've researched.</li>
            <li><strong>Understand the Context:</strong> Look at the video the hashtag came from. Is it part of a series? A response to a trend? Understanding the context helps you use it more strategically.</li>
            <li><strong>Follow the Rules:</strong> YouTube's official limit is 15 hashtags. Using more than that will cause YouTube to ignore all of them. Focus on 3-5 highly effective ones for the best results.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeHashtagExtractorTool;
