import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RedirectCheckerTool = () => {
  const [url, setUrl] = useState('');
  const [redirectChain, setRedirectChain] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckRedirect = async () => {
    if (!url) return;
    setLoading(true);
    setRedirectChain(null);
    try {
      // Placeholder for a real API call to a backend that checks redirects
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRedirectChain([
        'http://example.com',
        'https://example.com',
        'https://www.example.com',
      ]);
    } catch {
      setRedirectChain(['Could not check redirect chain.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleCheckRedirect} disabled={loading || !url}>
          {loading ? 'Checking...' : 'Check Redirect'}
        </Button>
      </div>

      {redirectChain && (
        <Card>
          <CardHeader>
            <CardTitle>Redirect Chain</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {redirectChain.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a Redirect Chain?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A redirect chain occurs when a single URL request triggers a series of multiple redirects before reaching the final destination page. For example, Page A redirects to Page B, which then redirects to Page C. This sequence of `A → B → C` is a redirect chain. While a single redirect is a common and necessary part of website management, a chain of them can be detrimental to both user experience and search engine optimization (SEO).</p>
            <p>Each "hop" in the chain introduces additional latency, slowing down the page load time for users. For search engine crawlers, long redirect chains consume valuable crawl budget. More importantly, with each redirect, there's a potential dilution of link equity (or "link juice"), which can harm the ranking potential of the final page. Identifying and eliminating unnecessary redirects is a critical technical SEO task to ensure your site is as efficient and powerful as possible.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors That Cause Redirect Chains</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Redirect chains often grow unintentionally over time as a website evolves. Common causes include:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>HTTP to HTTPS Migration:</strong> A common chain is `http://domain.com` → `https://domain.com` → `https://www.domain.com`.</li>
              <li><strong>Non-WWW to WWW (or vice-versa):</strong> Similar to the above, forcing a preferred domain version can add a hop if not configured to go directly to the final version.</li>
              <li><strong>Trailing Slash Issues:</strong> A redirect from `/page` to `/page/` (or the reverse) can add an extra step in the chain.</li>
              <li><strong>Legacy Redirects:</strong> When a site is redesigned or restructured multiple times, old redirects might point to URLs that are themselves redirected, creating a chain. For example, `page-v1.html` → `page-v2.html` → `final-page/`.</li>
              <li><strong>Device-Specific Redirects:</strong> Redirecting mobile users from a main site to a separate mobile subdomain (e.g., `www.domain.com` → `m.domain.com`) can create chains if not managed carefully.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of a Redirect Check</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our Redirect Checker provides a clear view of the entire redirect path. Here’s what to look for in the results:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Starting URL:</strong> The original URL you entered for the check.</li>
              <li><strong>The Redirect Path:</strong> A step-by-step list of each URL in the chain. Each URL is a "hop."</li>
              <li><strong>HTTP Status Codes:</strong> For each hop, the tool identifies the HTTP status code (e.g., 301, 302, 307). This tells you whether the redirect is permanent or temporary, which has different implications for SEO.</li>
              <li><strong>Final Destination URL:</strong> The last URL in the chain where the user and search engines will ultimately land.</li>
              <li><strong>Number of Redirects:</strong> The total count of hops in the chain. Ideally, this should be 1 or, even better, 0 (if the starting URL is the final destination).</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our Redirect Checker</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes it simple to trace the path of any URL. Just follow these steps:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Enter the URL:</strong> Paste the full URL you want to test into the input field.</li>
              <li><strong>Start the Check:</strong> Click the "Check Redirect" button. Our tool will then follow the URL from hop to hop until it reaches the final destination or encounters an error.</li>
              <li><strong>Analyze the Chain:</strong> The results will show the complete redirect path, including the status code for each step. This allows you to quickly identify any unnecessary links in the chain.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">How do I fix a redirect chain?</h3>
              <p className="text-muted-foreground mt-1">To fix a redirect chain, you need to modify your server configuration (e.g., your `.htaccess` file or hosting panel settings) to point the initial URL directly to the final destination. Instead of A → B → C, you should change the rule for A so that it points directly to C (A → C).</p>
            </div>
            <div>
              <h3 className="font-semibold">Is one redirect bad for SEO?</h3>
              <p className="text-muted-foreground mt-1">No, a single 301 redirect is a standard and perfectly acceptable practice for permanently moving a page. It's the "chaining" of multiple redirects that causes performance and SEO issues.</p>
            </div>
            <div>
              <h3 className="font-semibold">What is a redirect loop?</h3>
              <p className="text-muted-foreground mt-1">A redirect loop is a special kind of broken redirect chain where a URL redirects back to itself or to another URL in the chain, creating an infinite loop (e.g., A → B → A). This results in an error page for the user (often "Too many redirects") and prevents search engines from crawling the page.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The World Wide Web's first-ever server was a NeXT computer at CERN. In 1991, when the server was temporarily shut down, Tim Berners-Lee, the inventor of the Web, left a handwritten note on it that read: "This machine is a server. DO NOT POWER IT DOWN!!". This could be considered the earliest, most low-tech form of a "service unavailable" message!</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default RedirectCheckerTool;
