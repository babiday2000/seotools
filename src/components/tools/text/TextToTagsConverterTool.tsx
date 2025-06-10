import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, Tags } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their']);

const TextToTagsConverterTool = () => {
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [copied, setCopied] = useState(false);
  const [toLowerCase, setToLowerCase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(true);

  const handleConvert = () => {
    let processedText = text;
    if (toLowerCase) {
      processedText = processedText.toLowerCase();
    }
    let words = processedText.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').split(/\s+/).filter(Boolean);
    if (removeStopWords) {
      words = words.filter(word => !stopWords.has(word));
    }
    const generatedTags = words.join(', ');
    setTags(generatedTags);
  };

  const handleCopy = () => {
    if (!tags) return;
    navigator.clipboard.writeText(tags);
    setCopied(true);
    toast.success('Tags copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Text to Tags Converter</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly extract keywords from your text and convert them into a clean, comma-separated list of tags. Perfect for bloggers, YouTubers, and e-commerce managers who need to optimize their content for better discovery and SEO.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Keyword to Tags Generator</CardTitle>
          <CardDescription>Paste your text to generate a list of relevant tags for your content.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Textarea
              placeholder="Paste your article title or keywords here..."
              className="h-64 text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="relative">
              <Textarea
                placeholder="Your comma-separated tags will appear here..."
                className="h-64 text-base bg-muted"
                value={tags}
                readOnly
              />
              {tags && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleCopy}
                  title="Copy to clipboard"
                >
                  {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Switch id="to-lowercase" checked={toLowerCase} onCheckedChange={setToLowerCase} />
              <Label htmlFor="to-lowercase">Convert to Lowercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="remove-stop-words" checked={removeStopWords} onCheckedChange={setRemoveStopWords} />
              <Label htmlFor="remove-stop-words">Remove Stop Words</Label>
            </div>
            <Button onClick={handleConvert} disabled={!text} size="lg">
              <Tags className="mr-2 h-5 w-5" />
              Convert to Tags
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Role of Tags in Content Organization</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Tags are a form of metadata—a set of keywords that describe a piece of content and relate it to other similar content. Unlike hashtags, which are primarily for social media discovery, tags are used within a specific website or platform (like a blog, a YouTube channel, or an e-commerce store) to create a taxonomy. This system of classification helps both users and search engines understand what your content is about and how it connects to other content on your site.</p>
                <p>For example, on a blog, clicking on the tag "digital-marketing" would show a user all the articles you've written on that topic. This improves user experience by making your content more navigable and encourages visitors to spend more time on your site. For SEO, a logical tag structure helps search engines understand the topical authority of your website, which can contribute to better rankings. Our Text to Tags Converter helps you quickly generate a foundational list of these crucial keywords.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How It Works: Intelligent Keyword Extraction</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool intelligently processes your input text to create a clean and relevant list of tags:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Input Text:</strong> You can paste anything from a single sentence (like a blog title) to a full paragraph.</li>
                    <li><strong>Clean and Normalize:</strong> The tool first removes common punctuation to avoid creating invalid tags. With the "Convert to Lowercase" option, it standardizes the case for consistency, which is a best practice for most tagging systems.</li>
                    <li><strong>Filter Stop Words:</strong> When enabled, this powerful feature removes common, low-value words (like 'a', 'the', 'in', 'of'). This filters out the noise and ensures your tag list is focused on the most meaningful keywords.</li>
                    <li><strong>Generate Tag List:</strong> The remaining words are then joined together into a single string, separated by a comma and a space, creating a perfectly formatted list ready to be pasted into your CMS or video platform.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Best Practices for Effective Tagging</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Generating tags is just the first step. Using them effectively is key to unlocking their benefits.</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Be Consistent:</strong> Use the same tag for the same topic across all your content. For example, always use "digital-marketing," not "digital marketing" or "digitalmarketing."</li>
                    <li><strong>Mix Broad and Specific:</strong> Use a few broad tags to define the general category (e.g., `marketing`, `seo`) and several more specific tags to describe the content's niche (e.g., `local-seo`, `link-building-strategies`).</li>
                    <li><strong>Don't Overdo It:</strong> More is not always better. Aim for a reasonable number of highly relevant tags (typically 5-10 per piece of content) rather than a huge list of loosely related ones. This keeps your content focused.</li>
                    <li><strong>Think About User Intent:</strong> What terms would a user search for to find your content? Include these in your tags.</li>
                    <li><strong>Review and Refine:</strong> Always review the generated list. Our tool provides a great starting point, but your human expertise is needed to remove any irrelevant words and perhaps add more specific, long-tail keywords that the tool might have missed.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">What's the difference between tags and categories?</h3>
                    <p className="text-muted-foreground mt-1">Think of categories as the table of contents for your site, while tags are the index. Categories are broad, hierarchical groupings (e.g., a blog might have categories like "Marketing," "Sales," and "Technology"). Tags are more specific, non-hierarchical descriptors that can apply across categories (e.g., a post in "Marketing" could be tagged with `seo`, `content-creation`, and `email-marketing`).</p>
                </div>
                <div>
                    <h3 className="font-semibold">What are "stop words" and why should I remove them?</h3>
                    <p className="text-muted-foreground mt-1">Stop words are common words that search engines and tagging systems often ignore because they don't carry significant meaning on their own (e.g., 'the', 'is', 'a', 'in'). Removing them from your tag list helps you focus on the keywords that truly define your content, resulting in a cleaner and more effective set of tags.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How many tags should I use on a blog post or YouTube video?</h3>
                    <p className="text-muted-foreground mt-1">There's no single magic number, but a general best practice is quality over quantity. For a blog post, 5-10 highly relevant tags are usually sufficient. For YouTube, you have more space, and using 15-30 focused tags (a mix of broad and specific) is a common and effective strategy.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Should my tags be single words or multiple words?</h3>
                    <p className="text-muted-foreground mt-1">Both! Single-word tags (`marketing`) are good for broad categories. Multi-word tags, often called "long-tail keywords" (`content marketing strategy`), are excellent for targeting specific user intent. Most tagging systems handle multi-word tags by enclosing them in quotes or using hyphens. Our tool generates single-word tags, but you can easily combine them (e.g., copy `digital, marketing` and manually change it to `digital-marketing`).</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default TextToTagsConverterTool;
