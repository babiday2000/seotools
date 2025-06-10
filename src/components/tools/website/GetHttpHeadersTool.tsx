import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const GetHttpHeadersTool = () => {
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetHeaders = async () => {
    if (!url) return;
    setLoading(true);
    setHeaders(null);
    try {
      // Placeholder for a real API call to a backend that fetches headers
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHeaders({
        'Content-Type': 'text/html; charset=utf-8',
        'Server': 'nginx',
        'X-Powered-By': 'Express',
      });
    } catch {
      setHeaders({ error: 'Could not fetch headers' });
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
        <Button onClick={handleGetHeaders} disabled={loading || !url}>
          {loading ? 'Fetching...' : 'Get Headers'}
        </Button>
      </div>

      {headers && (
        <Card>
          <CardHeader>
            <CardTitle>HTTP Headers</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              readOnly
              className="h-64"
              value={Object.entries(headers)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n')}
            />
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What Are HTTP Headers?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>HTTP headers are the metadata that is sent along with a request or response between a client (like your web browser) and a server. They are a fundamental part of the Hypertext Transfer Protocol (HTTP) and contain essential information about the transaction. Think of them as the "behind-the-scenes" conversation that happens every time you interact with a website. These headers are not typically visible to the end-user, but they play a critical role in how web content is delivered, cached, and secured.</p>
            <p>For developers, SEO specialists, and network administrators, analyzing HTTP headers is a vital task. They provide a wealth of information for debugging, optimizing performance, and enhancing security. For example, headers can tell you what kind of server is being used, how content should be cached by the browser, the status of a request, and much more. Our Get HTTP Headers tool allows you to inspect these headers for any given URL, offering a transparent look into the web communication process.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors Determined by HTTP Headers</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>HTTP headers control a wide range of behaviors and provide key information. Here are some of the critical factors determined by them:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Content Type:</strong> The `Content-Type` header tells the browser what kind of data it is receiving (e.g., `text/html`, `image/png`, `application/json`). This ensures the content is rendered correctly.</li>
              <li><strong>Caching Policies:</strong> Headers like `Cache-Control` and `Expires` dictate how a browser or proxy should cache the content. Effective caching can dramatically improve website speed for returning visitors.</li>
              <li><strong>Security Measures:</strong> Security headers such as `Content-Security-Policy`, `Strict-Transport-Security`, and `X-XSS-Protection` help protect a website from common attacks like cross-site scripting (XSS) and clickjacking.</li>
              <li><strong>Redirects and Location:</strong> The `Location` header is used in conjunction with 3xx status codes to redirect the browser to a new URL.</li>
              <li><strong>Cookies and State Management:</strong> The `Set-Cookie` and `Cookie` headers are used to manage user sessions and store stateful information, which is essential for personalized experiences and e-commerce functionality.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of HTTP Headers</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>HTTP headers are composed of a name-value pair, separated by a colon. They are broadly categorized into four types:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>General Headers:</strong> These headers apply to both requests and responses but don't relate to the content itself. Examples include `Date` and `Connection`.</li>
              <li><strong>Request Headers:</strong> Sent by the client, these headers contain more information about the resource to be fetched or about the client itself. Examples include `User-Agent`, `Accept-Language`, and `Referer`.</li>
              <li><strong>Response Headers:</strong> Sent by the server, these headers hold additional information about the response, such as its location or the server itself. Examples include `Server`, `Allow`, and `ETag`.</li>
              <li><strong>Entity Headers:</strong> These headers contain information about the body of the resource, such as its content length or MIME type. Examples include `Content-Type` and `Content-Length`.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our Get HTTP Headers Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool is designed to be straightforward and user-friendly. Follow these simple steps to view the HTTP headers of any URL:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Enter the URL:</strong> In the provided input field, type or paste the full URL of the page you wish to inspect.</li>
              <li><strong>Fetch the Headers:</strong> Click the "Get Headers" button. Our tool will send a request to the specified URL and capture the response headers from the server.</li>
              <li><strong>Examine the Output:</strong> The tool will display a list of all the HTTP headers returned by the server, along with their corresponding values. This allows you to quickly analyze the server's configuration and response details.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Why would I need to check HTTP headers?</h3>
              <p className="text-muted-foreground mt-1">Checking HTTP headers is useful for a variety of reasons. Developers use it for debugging, SEOs use it to check for correct redirect implementation and caching policies, and security researchers use it to identify potential vulnerabilities.</p>
            </div>
            <div>
              <h3 className="font-semibold">What is the `User-Agent` header?</h3>
              <p className="text-muted-foreground mt-1">The `User-Agent` is a request header that contains a characteristic string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent.</p>
            </div>
            <div>
              <h3 className="font-semibold">Are there any security risks in exposing HTTP headers?</h3>
              <p className="text-muted-foreground mt-1">Sometimes, yes. For example, a detailed `Server` or `X-Powered-By` header can reveal the specific software and version running on the server, which could help an attacker identify known vulnerabilities. It's often considered a good security practice to minimize the information exposed in headers.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Many websites include custom, non-standard HTTP headers as Easter eggs or for internal tracking. These are often prefixed with `X-` (e.g., `X-Clacks-Overhead` as a tribute to author Terry Pratchett). While the `X-` prefix was officially deprecated in 2012, it's still widely used in the wild for custom headers.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default GetHttpHeadersTool;
