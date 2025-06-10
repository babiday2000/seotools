import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PageSizeCheckerTool = () => {
  const [url, setUrl] = useState('');
  const [pageSize, setPageSize] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckPageSize = async () => {
    if (!url) return;
    setLoading(true);
    setPageSize(null);
    try {
      // Placeholder for a real API call to a backend that gets page size
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPageSize(123456); // Simulated size in bytes
    } catch {
      setPageSize(null);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
        <Button onClick={handleCheckPageSize} disabled={loading || !url}>
          {loading ? 'Checking...' : 'Check Size'}
        </Button>
      </div>

      {pageSize !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Page Size</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The size of the page is approximately <strong>{formatBytes(pageSize)}</strong>.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is Page Size?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Page size, often referred to as page weight, is the total size of all the resources required to load a specific webpage. This includes the HTML document itself, as well as all referenced files such as stylesheets (CSS), scripts (JavaScript), images, fonts, and other media. When you visit a URL, your browser downloads all of these files from the web server. The combined size of these files determines how long it takes for the page to become visible and interactive for the user.</p>
            <p>In an era of increasing user expectations and the rise of mobile browsing, page size has become a critical factor in web performance and user experience. A smaller, lighter page will load faster, leading to higher user engagement, lower bounce rates, and better conversion rates. For search engine optimization (SEO), page speed is a confirmed ranking factor for both desktop and mobile searches. Therefore, monitoring and optimizing your page size is not just a technical task—it's a crucial business practice.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors That Contribute to Page Size</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A webpage's total size is the sum of its parts. Understanding these components is the first step toward optimization:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Images:</strong> High-resolution images are often the biggest contributors to page weight. Unoptimized images in formats like PNG or JPEG can significantly slow down a page.</li>
              <li><strong>Scripts:</strong> JavaScript files, especially those from third-party services like analytics, advertising, or social media widgets, can add substantial weight and complexity to a page.</li>
              <li><strong>CSS:</strong> While essential for styling, large and inefficient CSS files can increase load times. Unused CSS rules also contribute to unnecessary bloat.</li>
              <li><strong>HTML:</strong> The structure of the page itself has a size. While typically smaller than other resources, poorly written or overly complex HTML can add to the total weight.</li>
              <li><strong>Videos and Fonts:</strong> Embedded videos and custom web fonts are other common sources of large file sizes. Each font style (e.g., regular, bold, italic) requires a separate file to be downloaded.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of Page Size Analysis</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>When you use a page size checker, you're getting a snapshot of the page's performance. Here are the key components to look for in the analysis:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Total Page Size:</strong> This is the primary metric, usually measured in kilobytes (KB) or megabytes (MB). It gives you an overall sense of how "heavy" the page is.</li>
              <li><strong>Number of Requests:</strong> This is the total number of individual files the browser has to download. A high number of requests can slow down a page, even if the total size is small, due to the overhead of each HTTP request.</li>
              <li><strong>Breakdown by Content Type:</strong> A good analysis will show you how much of the total size is coming from images, scripts, CSS, and other resources. This helps you identify the biggest areas for improvement.</li>
              <li><strong>Load Time:</strong> While our tool focuses on size, the ultimate goal is to improve load time. Page size is one of the most significant factors influencing how quickly a page loads.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our Page Size Checker</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our Page Size Checker is a simple yet powerful tool for quickly assessing the weight of your webpages. Here’s how to use it:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Enter the URL:</strong> In the input field, paste the full URL of the webpage you want to analyze.</li>
              <li><strong>Initiate the Check:</strong> Click the "Check Size" button. Our tool will then crawl the provided URL and calculate the total size of all its resources.</li>
              <li><strong>Review the Results:</strong> The tool will display the total page size in a human-readable format (e.g., KB or MB). This gives you a clear and immediate understanding of your page's weight.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What is a good target page size?</h3>
              <p className="text-muted-foreground mt-1">While there's no magic number, a common recommendation is to keep your total page size under 2 MB. For mobile users on slower connections, aiming for under 1 MB is even better. The key is to be as lean as possible without sacrificing user experience.</p>
            </div>
            <div>
              <h3 className="font-semibold">How can I reduce my page size?</h3>
              <p className="text-muted-foreground mt-1">The most effective methods include compressing images, minifying CSS and JavaScript (removing unnecessary characters from the code), enabling Gzip compression on your server, and leveraging browser caching. Also, be critical of any third-party scripts you add to your site.</p>
            </div>
            <div>
              <h3 className="font-semibold">Does page size affect my Google ranking?</h3>
              <p className="text-muted-foreground mt-1">Yes, absolutely. Google has used page speed as a ranking signal for desktop searches since 2010 and for mobile searches since 2018. Since page size is a major component of page speed, a smaller page size can positively impact your SEO.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The very first website, created by Tim Berners-Lee at CERN in 1991, was incredibly lightweight by today's standards. The entire page, which explained the World Wide Web project, was just a few kilobytes. It's a stark contrast to the multi-megabyte pages that are common today!</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PageSizeCheckerTool;
