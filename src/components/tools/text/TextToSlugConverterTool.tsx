import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, Link2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const TextToSlugConverterTool = () => {
  const [text, setText] = useState('');
  const [slug, setSlug] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const newSlug = text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
    setSlug(newSlug);
  };

  const handleCopy = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopied(true);
    toast.success('Slug copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Text to Slug Converter</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Create clean, SEO-friendly, and human-readable URL slugs from any text or title. Our tool instantly converts your string into a web-safe format, perfect for blog posts, product pages, and any web content.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>URL Slug Generator</CardTitle>
          <CardDescription>Enter your title or text to generate a clean URL slug.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text-input">Your Text</Label>
            <Input
              id="text-input"
              placeholder="e.g., My Awesome Blog Post! (2025 Edition)"
              className="text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="text-center">
            <Button onClick={handleConvert} disabled={!text}>
              <Link2 className="mr-2 h-4 w-4" />
              Convert to Slug
            </Button>
          </div>
          {slug && (
            <div className="space-y-2">
              <Label htmlFor="slug-output">Generated Slug</Label>
              <div className="relative">
                <Input
                  id="slug-output"
                  className="text-base bg-muted"
                  value={slug}
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={handleCopy}
                  title="Copy to clipboard"
                >
                  {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">What is a URL Slug and Why is it Important?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A URL slug is the part of a URL that comes after the domain name and identifies a specific page on a website. It's written in a URL-friendly format, meaning it's typically all lowercase, with words separated by hyphens, and stripped of any special characters. For example, in the URL `https://www.example.com/my-first-blog-post`, the slug is `my-first-blog-post`.</p>
                <p>Slugs are critically important for two main reasons: <strong>Search Engine Optimization (SEO)</strong> and <strong>User Experience (UX)</strong>. For SEO, a well-crafted slug that includes relevant keywords helps search engines like Google understand the content of the page, which can improve your ranking. For users, a clean, readable slug provides clear context about the page they are about to visit, making the link more trustworthy and easier to understand than a URL filled with random characters or database IDs (e.g., `?p=123`).</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How Our Slug Converter Works</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool transforms any string of text into an optimized slug by applying a series of standard rules used by most modern Content Management Systems (CMS):</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>Converts to Lowercase:</strong> All characters are converted to lowercase to ensure consistency, as URLs are case-sensitive on some servers.</li>
                    <li><strong>Handles Special Characters:</strong> It transliterates special characters (like `é`, `ü`, `ñ`) into their basic Latin equivalents (`e`, `u`, `n`).</li>
                    <li><strong>Removes Punctuation:</strong> All punctuation and symbols that are not URL-safe (e.g., `!`, `?`, `,`, `&`) are completely removed.</li>
                    <li><strong>Replaces Spaces with Hyphens:</strong> All spaces are replaced with a single hyphen (`-`), which is the standard word separator for URLs.</li>
                    <li><strong>Cleans Up Hyphens:</strong> It removes any leading or trailing hyphens and collapses any instances of multiple hyphens into a single one, ensuring a clean final output.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Best Practices for Creating SEO-Friendly Slugs</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Generating a slug is easy, but creating an effective one requires a bit of strategy:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Include Keywords:</strong> Your slug should contain the primary keyword(s) for your page. If your article is about "blue widget reviews," your slug should reflect that.</li>
                    <li><strong>Keep it Short and Descriptive:</strong> A good slug is concise. It should accurately describe the page's content without being overly long. Aim for 3-5 relevant words.</li>
                    <li><strong>Remove "Stop Words":</strong> To keep slugs short, it's common practice to remove "stop words"—common words like 'a', 'an', 'the', 'in', 'on', 'and'—that don't add significant meaning or SEO value. For example, "how-to-make-a-great-slug" could be shortened to "how-make-great-slug".</li>
                    <li><strong>Use Hyphens, Not Underscores:</strong> Google's official recommendation is to use hyphens (`-`) to separate words in a URL. While it can read underscores (`_`), it treats a hyphen as a word separator and an underscore as a word joiner. This means `blue-widget` is seen as "blue widget," while `blue_widget` is seen as "bluewidget," which is less effective for SEO.</li>
                    <li><strong>Be Consistent:</strong> Establish a clear and consistent URL structure across your entire website. This helps both users and search engines navigate and understand your site's hierarchy.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Can I change a slug after I've published a page?</h3>
                    <p className="text-muted-foreground mt-1">You can, but you should do so with caution. Changing a URL will break all existing links to that page from other websites and social media, and you will lose any SEO authority that page has accumulated. If you must change a slug, it is crucial to set up a permanent (301) redirect from the old URL to the new one to preserve your link equity and ensure users don't hit a "404 Not Found" error.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Does the slug have to match my page title exactly?</h3>
                    <p className="text-muted-foreground mt-1">No, and it often shouldn't. Page titles can be long and conversational, while slugs should be short and keyword-focused. It's best practice to create a shorter, more concise version of your title for the slug.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What characters are allowed in a slug?</h3>
                    <p className="text-muted-foreground mt-1">The safest characters to use in a slug are lowercase letters (a-z), numbers (0-9), and hyphens (-). While other characters are sometimes technically possible, using this limited set ensures maximum compatibility across all browsers and web servers.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How do content management systems like WordPress handle slugs?</h3>
                    <p className="text-muted-foreground mt-1">Most modern CMS platforms, like WordPress, automatically generate a slug for you based on your post's title. They typically follow the same rules as our converter. However, they always give you the option to edit the slug manually before publishing, which is highly recommended to ensure it is optimized according to the best practices mentioned above.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default TextToSlugConverterTool;
