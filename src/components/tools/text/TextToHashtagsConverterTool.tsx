import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, Hash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const TextToHashtagsConverterTool = () => {
  const [text, setText] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [copied, setCopied] = useState(false);
  const [toLowerCase, setToLowerCase] = useState(true);
  const [removePunctuation, setRemovePunctuation] = useState(true);

  const handleConvert = () => {
    let processedText = text;
    if (toLowerCase) {
      processedText = processedText.toLowerCase();
    }
    if (removePunctuation) {
      processedText = processedText.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    }
    const words = processedText.split(/\s+/).filter(Boolean);
    const generatedHashtags = words.map((word) => `#${word}`).join(' ');
    setHashtags(generatedHashtags);
  };

  const handleCopy = () => {
    if (!hashtags) return;
    navigator.clipboard.writeText(hashtags);
    setCopied(true);
    toast.success('Hashtags copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Text to Hashtags Converter</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly convert your keywords, phrases, or sentences into a clean, ready-to-use list of social media hashtags. Save time and boost the discoverability of your content on platforms like Instagram, Twitter, and LinkedIn.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Hashtag Generator</CardTitle>
          <CardDescription>Paste your text, choose your options, and instantly generate your hashtags.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Textarea
              placeholder="Enter keywords or a sentence here..."
              className="h-64 text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="relative">
              <Textarea
                placeholder="Your generated hashtags will appear here..."
                className="h-64 text-base bg-muted"
                value={hashtags}
                readOnly
              />
              {hashtags && (
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
              <Switch id="remove-punctuation" checked={removePunctuation} onCheckedChange={setRemovePunctuation} />
              <Label htmlFor="remove-punctuation">Remove Punctuation</Label>
            </div>
            <Button onClick={handleConvert} disabled={!text} size="lg">
              <Hash className="mr-2 h-5 w-5" />
              Convert to Hashtags
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Power of the Hashtag: More Than Just a Symbol</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The hashtag (#) has evolved from a simple pound symbol to one of the most powerful tools for content discovery and community building on the internet. At its core, a hashtag is a metadata tag that groups content together. When you add a hashtag to your post, you are essentially filing it under a specific topic, making it discoverable to anyone interested in that topic, even if they don't follow you directly.</p>
                <p>Using relevant, targeted hashtags is a fundamental strategy for increasing the reach and engagement of your social media posts. It connects your content with ongoing conversations, trends, and communities, amplifying your message far beyond your immediate circle of followers. Our Text to Hashtags Converter is designed to streamline this process, allowing you to quickly generate a clean list of hashtags from your core keywords or post topic, saving you time and effort.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How It Works: From Plain Text to Powerful Tags</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool simplifies the conversion process with intelligent formatting options:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Input Your Text:</strong> Start by pasting a sentence, a list of keywords, or any text that describes your content.</li>
                    <li><strong>Smart Processing:</strong> The tool first cleans your text based on your selected options. It can automatically convert everything to lowercase for consistency (as hashtags are not case-sensitive on most platforms) and strip out common punctuation to ensure valid, clickable tags.</li>
                    <li><strong>Word Separation:</strong> It then splits your processed text into individual words, treating each one as a potential hashtag.</li>
                    <li><strong>Hashtag Creation:</strong> Finally, it prepends the '#' symbol to each word and joins them together with a space, creating a perfectly formatted block of hashtags ready to be copied and pasted.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Strategic Hashtagging for Maximum Impact</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Generating hashtags is easy, but using them effectively requires a strategy. Here’s how to make the most of your generated tags:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Mix Broad and Niche Tags:</strong> Don't just use popular, broad hashtags like `#marketing`. While they have a large audience, your content can get lost in the noise. Mix them with more specific, niche hashtags like `#smallbusinesscontentstrategy` to reach a more targeted and engaged audience.</li>
                    <li><strong>Use Branded Hashtags:</strong> Create a unique hashtag for your brand or campaign (e.g., `#SEOToolerTips`). Encourage your audience to use it to build a community and easily track user-generated content related to your brand.</li>
                    <li><strong>Research Trending Hashtags:</strong> Keep an eye on what's trending in your industry and incorporate relevant hashtags into your posts to join larger conversations and increase visibility.</li>
                    <li><strong>Check Platform Guidelines:</strong> Different platforms have different "best practices" for the number of hashtags. Instagram allows up to 30, but many experts recommend using a smaller, more targeted set. Twitter is best with just 1-3 highly relevant tags.</li>
                    <li><strong>Don't Use Punctuation or Spaces:</strong> A hashtag must be a single, unbroken string of characters. Our tool's "Remove Punctuation" option helps ensure your tags are valid.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Are hashtags case-sensitive?</h3>
                    <p className="text-muted-foreground mt-1">On most major platforms, including Instagram, Facebook, and LinkedIn, hashtags are not case-sensitive. This means `#MarketingTips` and `#marketingtips` will lead to the same search results. However, using "CamelCase" (capitalizing the first letter of each word) can improve readability for your human audience. Our "Convert to Lowercase" option is provided for those who prefer a uniform look.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How many hashtags should I use?</h3>
                    <p className="text-muted-foreground mt-1">This depends on the platform. <strong>Instagram:</strong> Up to 30, but 5-15 is often a good range. <strong>Twitter:</strong> 1-2 is ideal. <strong>LinkedIn:</strong> 3-5 is recommended. <strong>Facebook:</strong> 1-3 can help with discovery. Using too many can look spammy.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Should I put hashtags in the caption or the first comment (on Instagram)?</h3>
                    <p className="text-muted-foreground mt-1">This is a long-standing debate. Functionally, it makes no difference to the algorithm; your post will appear in searches either way. Placing them in the first comment can create a cleaner look for your caption. It's a matter of personal aesthetic preference.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is "shadowbanning"?</h3>
                    <p className="text-muted-foreground mt-1">Shadowbanning is a term used to describe a situation where a platform limits the visibility of your posts without officially notifying you. This can sometimes be caused by repeatedly using the same large block of hashtags on every post, or by using banned or broken hashtags. It's important to vary your hashtags and ensure they are highly relevant to each specific post to avoid this.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default TextToHashtagsConverterTool;
