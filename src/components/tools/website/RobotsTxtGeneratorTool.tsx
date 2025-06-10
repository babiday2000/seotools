import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';

const RobotsTxtGeneratorTool = () => {
  const [rules, setRules] = useState('');
  const [generatedTxt, setGeneratedTxt] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    // This is a placeholder for the actual generation logic.
    // In a real application, this would involve more complex rule generation.
    const generated = `User-agent: *\n${rules}`;
    setGeneratedTxt(generated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTxt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Enter your rules here, one per line (e.g., Disallow: /private/)"
          className="h-64 text-base"
          value={rules}
          onChange={(e) => setRules(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Generated robots.txt will appear here..."
            className="h-64 text-base"
            value={generatedTxt}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!generatedTxt}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleGenerate} disabled={!rules}>
        Generate robots.txt
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">What is a Robots.txt File?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A `robots.txt` file is a simple text file that resides in the root directory of a website. Its primary purpose is to communicate with web crawlers, also known as bots or spiders, which are automated scripts used by search engines like Google, Bing, and others to index the web. This file instructs these crawlers on which pages or sections of a website should not be crawled or indexed. It's a fundamental part of the Robots Exclusion Protocol (REP), a standard that provides a way for webmasters to control how their sites are accessed by automated clients.</p>
                <p>Think of it as a doorman for your website, guiding friendly bots to the right places and keeping them out of areas you'd prefer to remain private or unindexed. While it's not a security measure—malicious bots will likely ignore it—it's an essential tool for search engine optimization (SEO) and for managing how your content appears in search results. By effectively managing crawl traffic, you can ensure that search engines prioritize the most important content on your site, leading to better crawl efficiency and potentially improved rankings.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Factors to Consider When Creating a Robots.txt File</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Creating a `robots.txt` file isn't just about listing a few directories to disallow. A thoughtful approach considers several factors to maximize its benefits for SEO and site management:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Website Structure:</strong> Understand your site's architecture. Identify directories that contain sensitive information, admin pages, scripts, or duplicate content that shouldn't be indexed.</li>
                    <li><strong>Crawl Budget:</strong> For large websites, crawl budget—the number of pages a search engine bot will crawl on any given day—is a critical concern. A well-configured `robots.txt` can guide bots to your most valuable pages, ensuring your crawl budget is spent efficiently.</li>
                    <li><strong>SEO Strategy:</strong> Your `robots.txt` file should align with your overall SEO goals. For instance, you might want to block faceted navigation URLs that create duplicate content, or prevent indexing of internal search result pages.</li>
                    <li><strong>Sitemaps:</strong> Including a link to your XML sitemap in the `robots.txt` file is a best practice. It helps search engines discover all the important pages on your site, even if they are not well-linked internally.</li>
                    <li><strong>Subdomains:</strong> If your site uses subdomains, remember that each subdomain requires its own `robots.txt` file. The rules in a `robots.txt` file on `www.example.com` will not apply to `blog.example.com`.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Key Components of a Robots.txt File</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A `robots.txt` file is composed of directives, which are commands that the web crawlers follow. The basic syntax is straightforward, consisting of a user-agent and one or more rules:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>User-agent:</strong> This directive specifies the bot to which the rules apply. For example, `User-agent: Googlebot` targets Google's main crawler. You can use an asterisk (`User-agent: *`) to apply the rules to all bots.</li>
                    <li><strong>Disallow:</strong> This is the most common directive. It tells the specified user-agent not to crawl a particular URL path. For example, `Disallow: /admin/` will block all bots from crawling the content in the `/admin/` directory.</li>
                    <li><strong>Allow:</strong> This directive, supported by major search engines like Google, allows you to permit crawling of a specific URL within a disallowed directory. For instance, if you've disallowed `/media/`, but want to allow access to one file, you could use `Allow: /media/press-release.pdf`.</li>
                    <li><strong>Sitemap:</strong> This directive points to the location of your XML sitemap. It's an effective way to ensure search engines can find your sitemap. Example: `Sitemap: https://www.example.com/sitemap.xml`.</li>
                    <li><strong>Crawl-delay:</strong> This directive specifies a waiting period in seconds between successive crawl requests to your server. It can be useful for preventing server overload on sites with heavy crawl traffic. However, Googlebot does not follow this directive; for Google, you should set your crawl rate in Google Search Console.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How to Use Our Robots.txt Generator</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool simplifies the process of creating a `robots.txt` file. Follow these steps to generate a custom file for your website:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Specify Rules:</strong> In the input area, enter the directives you want to include. For each rule, specify the user-agent and the paths to allow or disallow. You can add multiple rules for different bots.</li>
                    <li><strong>Generate the File:</strong> Click the "Generate robots.txt" button. The tool will compile your rules into a correctly formatted `robots.txt` file in the output area.</li>
                    <li><strong>Review and Customize:</strong> Carefully examine the generated text. Ensure it accurately reflects your intentions. You can manually edit the output if needed.</li>
                    <li><strong>Test Your File:</strong> Before deploying, it's crucial to test your `robots.txt` file. Use a tool like Google's robots.txt Tester (available in Google Search Console) to verify that your rules work as expected and don't block important content.</li>
                    <li><strong>Deploy to Your Website:</strong> Once you're confident in your `robots.txt` file, upload it to the root directory of your domain. It must be accessible at `https://www.yourdomain.com/robots.txt`.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">What happens if I don't have a `robots.txt` file?</h3>
                    <p className="text-muted-foreground mt-1">If a website does not have a `robots.txt` file, search engine crawlers will assume they have permission to crawl the entire site. This can be problematic if you have pages that you do not want to appear in search results.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can `robots.txt` be used to hide a page from Google?</h3>
                    <p className="text-muted-foreground mt-1">While `robots.txt` can prevent a page from being crawled, it does not guarantee that it will not be indexed. If other pages on the web link to the blocked page, Google may still index it without visiting it. To reliably prevent a page from appearing in search results, you should use the `noindex` meta tag or the `X-Robots-Tag` HTTP header.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How do I block all bots from my site?</h3>
                    <p className="text-muted-foreground mt-1">To block all compliant bots, you can use the following `robots.txt` file:</p>
                    <pre className="p-4 bg-gray-800 text-white rounded-md text-sm mt-2"><code>User-agent: *<br/>Disallow: /</code></pre>
                </div>
                <div>
                    <h3 className="font-semibold">What is the difference between `Disallow: /` and `Disallow:`?</h3>
                    <p className="text-muted-foreground mt-1">`Disallow: /` blocks all pages on your site. `Disallow:` (with nothing after it) means nothing is disallowed, so crawlers are free to access everything. It's equivalent to not having a `Disallow` directive at all.</p>
                </div>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The `robots.txt` standard was born out of a real-world problem in the early days of the web. In 1994, Martijn Koster, a webmaster, noticed that his server was being overwhelmed by aggressive web crawlers. To solve this, he proposed the Robots Exclusion Protocol, which quickly became a de facto standard. It's a great example of the web community coming together to solve a common problem.</p>
            </div>
        </section>

      </div>
    </div>
  );
};

export default RobotsTxtGeneratorTool;
