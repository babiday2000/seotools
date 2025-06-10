import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Tags, HelpCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from "sonner";

// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  return null;
};

const YouTubeTagExtractorTool = () => {
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleExtract = async () => {
    const videoId = getYouTubeVideoId(url);

    if (!videoId) {
      setError('Please enter a valid YouTube video URL.');
      setTags([]);
      return;
    }

    if (!apiKey) {
        setError('YouTube API key is not configured. Please contact support.');
        setIsLoading(false);
        return;
    }

    setError('');
    setIsLoading(true);
    setTags([]);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error?.message || 'An unknown error occurred with the YouTube API.';
        throw new Error(`API Error: ${errorMessage}`);
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const videoTags = data.items[0].snippet.tags;
        if (videoTags && videoTags.length > 0) {
          setTags(videoTags);
          toast.success("Tags extracted successfully!");
        } else {
          setError('No tags found for this video.');
          toast.info("No tags found", {
            description: "This video doesn't have any public tags.",
          });
        }
      } else {
        setError('Video not found. Please check the URL.');
        toast.error("Video not found", {
          description: "Please ensure the YouTube URL is correct and the video is public.",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch video data. Please try again later.';
      console.error(err);
      setError(errorMessage);
      toast.error("Extraction Failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (tag: string) => {
    navigator.clipboard.writeText(tag);
    toast.success("Copied!", {
      description: `Tag "${tag}" copied to clipboard.`,
    });
  };
  
  const handleCopyAll = () => {
    if (tags.length === 0) return;
    const allTags = tags.join(', ');
    navigator.clipboard.writeText(allTags);
    toast.success("All Copied!", {
      description: "All tags copied to clipboard.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Tag Extractor</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly reveal the SEO strategy behind any successful YouTube video. Our YouTube Tag Extractor allows you to see the exact tags a creator is using, providing a powerful competitive advantage. By analyzing the keywords that top-ranking videos use, you can gain deep insights to refine your own content, boost your video's discoverability in search results and recommendations, and ultimately grow your channel faster. Stop guessing and start making data-driven decisions to optimize your YouTube SEO.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Extractor Tool</CardTitle>
          <CardDescription>Paste a video URL below to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter YouTube Video URL (e.g., https://www.youtube.com/watch?v=...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow text-base"
              />
              <Button onClick={handleExtract} disabled={isLoading || !url.trim()} className="text-base px-6">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Extract Tags'}
              </Button>
            </div>
            {error && <p className="text-destructive text-center sm:text-left">{error}</p>}
            
            {tags.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Extracted Tags ({tags.length})</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleCopyAll}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
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

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2"><Tags className="h-7 w-7 text-primary" />Unveiling the Power of YouTube Tags</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>YouTube tags, often referred to as 'video tags', are a fundamental component of your video's metadata. They are essentially descriptive keywords and phrases that you can associate with your video. Their primary purpose is to provide YouTube's complex algorithm with crucial context about your content, its subject matter, its category, and even its target audience. While not prominently displayed to viewers like the title or thumbnail, these tags operate behind the scenes as a powerful tool for search engine optimization (SEO) within the YouTube ecosystem.</p>
                <p>Think of them as digital signposts. They guide the YouTube algorithm, helping it understand what your video is about and who might be interested in watching it. When a user types a query into the YouTube search bar, the algorithm scans through titles, descriptions, and tags to find the most relevant results. A well-optimized set of tags dramatically increases the likelihood that your video will appear for relevant searches, connecting you with a new audience actively looking for content like yours.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2"><HelpCircle className="h-7 w-7 text-primary" />Why Tagging is a Non-Negotiable for Growth</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>In the competitive landscape of YouTube, discoverability is everything. While YouTube's algorithm has become incredibly sophisticated, relying heavily on user engagement metrics like watch time, click-through rate (CTR), and audience retention, tags remain a foundational pillar of YouTube SEO. They are your direct line of communication with the algorithm, giving you a measure of control over how your content is categorized and recommended.</p>
                <p>Here’s why strategic tagging is crucial:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Improved Search Rankings:</strong> The most direct benefit. The right tags help your video rank higher in YouTube's search results for your target keywords. This is especially vital for educational, informational, or "how-to" content where users are actively searching for solutions.</li>
                    <li><strong>Enhanced "Recommended Videos" Placement:</strong> Have you ever noticed the "Up Next" sidebar or the recommended videos on your homepage? Tags play a significant role here. By using relevant tags, you tell YouTube which other videos are similar to yours. This increases the chance of your video being recommended to viewers who are watching content in the same niche, a powerful driver of organic views.</li>
                    <li><strong>Clarifying Content for the Algorithm:</strong> Sometimes your title needs to be catchy and creative, which might make it slightly ambiguous. Tags allow you to be specific. For example, a video titled "The Ultimate Baking Fail" can use tags like "sourdough bread recipe," "kitchen disaster," and "how not to bake" to give the algorithm precise details.</li>
                    <li><strong>Targeting Long-Tail Keywords:</strong> Viewers often search for very specific phrases (e.g., "how to fix a leaky faucet under the sink"). These are long-tail keywords. While they have lower search volume, they have incredibly high intent. Tags are the perfect place to include these specific phrases, capturing a highly motivated audience.</li>
                    <li><strong>Correcting Common Misspellings:</strong> If your topic involves words that are commonly misspelled (e.g., "Arnold Schwarzenegger" or "Matcha vs. Maccha"), you can include these variations in your tags to capture that search traffic without cluttering your title or description.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2"><CheckCircle className="h-7 w-7 text-primary" />Mastering the Art of Tagging: Best Practices</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Effective tagging is both an art and a science. It's not about stuffing the tag box with as many keywords as possible. It's about relevance, precision, and strategy. Our YouTube Tag Extractor is your secret weapon, allowing you to see what works for top creators. Here’s how to apply those insights and craft the perfect tag strategy:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Lead with Your Primary Keyword:</strong> Your very first tag should be your main target keyword—the exact phrase you want your video to rank for. For example, if your video is a review of the iPhone 15, your first tag should be "iPhone 15 review". YouTube pays more attention to the first few tags, so make them count.</li>
                    <li><strong>Employ a Mix of Broad and Specific Tags:</strong> Create a balanced portfolio of tags. Start with broad, general tags that describe your video's category (e.g., "digital photography," "street photography"). Then, get more specific with long-tail tags that describe the video's content in detail (e.g., "night street photography with Sony A7IV," "best camera settings for low light photos"). This combination helps you compete in both broad categories and specific search queries.</li>
                    <li><strong>Analyze, Don't Just Copy Competitors:</strong> Use our extractor tool to analyze the tags of several top-ranking videos for your target keyword. Look for common patterns and recurring keywords. However, never blindly copy-paste their entire tag list. Their brand name or irrelevant tags won't help you. Instead, extract the relevant, high-performing keywords and adapt them to your unique video.</li>
                    <li><strong>Think Like a Viewer:</strong> Put yourself in the shoes of your target audience. What words and phrases would they use to find your video? Brainstorm synonyms, related topics, and questions they might ask. If your video is a "vegan lasagna recipe," consider tags like "plant-based lasagna," "dairy-free pasta recipe," and "how to make vegan cheese sauce."</li>
                    <li><strong>Include Your Brand Tag:</strong> Create a unique tag for your channel (e.g., your channel name or a variation of it) and include it as one of the last tags in all your videos. This helps YouTube's algorithm associate all of your content, increasing the chances that your other videos will be recommended to someone watching one of yours. It builds a content ecosystem.</li>
                    <li><strong>Keep it Relevant and Focused:</strong> While YouTube allows up to 500 characters for tags, quality trumps quantity. Aim for 15-30 highly relevant tags. Using misleading or irrelevant tags (e.g., tagging a gaming video with "Justin Bieber" to get views) is a violation of YouTube's policy and can harm your channel's standing.</li>
                    <li><strong>Order Tags by Importance:</strong> After your primary keyword, list your other important keywords. Follow those with the more specific, long-tail keywords. While the exact weight YouTube gives to tag order is debated, it's a logical best practice to front-load the most critical terms.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Is it illegal or against YouTube's rules to extract tags from other videos?</h3>
                    <p className="text-muted-foreground mt-1">Absolutely not. The tags on a public video are considered public information. Our tool simply accesses this data through YouTube's official API in a structured way. It's a standard and legitimate SEO research practice, similar to how website owners use tools to analyze competitor keywords for Google search.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How many tags should I use for my video?</h3>
                    <p className="text-muted-foreground mt-1">There's no magic number, but a best practice is to aim for a focused list of 15 to 30 tags. This is enough to provide plenty of context to the algorithm without appearing spammy. The total character limit is 500, but it's rare that you'll need to use all of it. Relevance is always more important than volume.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Will adding more tags guarantee more views?</h3>
                    <p className="text-muted-foreground mt-1">Not necessarily. Tags are just one piece of the puzzle. They increase your video's *potential* to be discovered. However, getting the click and keeping the viewer watching depends on your thumbnail, title, and the quality of your content itself. Great tags can't save a bad video, but they can significantly amplify a great one.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What's the difference between tags and hashtags in the description?</h3>
                    <p className="text-muted-foreground mt-1">They serve different functions. <strong>Tags</strong> (in the dedicated tag box) are backend metadata primarily for the YouTube algorithm. <strong>Hashtags</strong> (in the video description or title) are clickable, frontend elements that allow viewers to discover other videos using the same hashtag. You can use up to 15 hashtags, and they are a great way to join trending topics or create a series playlist.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default YouTubeTagExtractorTool;
