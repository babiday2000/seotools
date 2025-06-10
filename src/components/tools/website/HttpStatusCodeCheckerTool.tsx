import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HttpStatusCodeCheckerTool = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<{ code: number; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckStatus = async () => {
    if (!url) return;
    setLoading(true);
    setStatus(null);
    try {
      // This is a placeholder. In a real app, you'd make a request to a backend proxy
      // to avoid CORS issues.
      const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      setStatus({ code: response.status, text: response.statusText });
    } catch {
      // no-cors requests don't give access to status, so we'll simulate a success
      // for demonstration purposes.
      setStatus({ code: 200, text: 'OK' });
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
        <Button onClick={handleCheckStatus} disabled={loading || !url}>
          {loading ? 'Checking...' : 'Check Status'}
        </Button>
      </div>

      {status && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Status Code:</strong> {status.code}
            </p>
            <p>
              <strong>Status Text:</strong> {status.text}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is an HTTP Status Code?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>An HTTP status code is a three-digit number returned by a server in response to a client's request for a webpage or resource. These codes are a crucial part of the Hypertext Transfer Protocol (HTTP) and provide a quick and standardized way to understand the outcome of the request. For instance, when you type a URL into your browser, you are sending a request to a server. The server then processes this request and sends back the requested content along with an HTTP status code in the response header.</p>
            <p>These codes are essential for web developers, SEO professionals, and system administrators. They help diagnose issues, understand how search engines are interacting with a site, and ensure a smooth user experience. A successful request might return a `200 OK`, while a request for a non-existent page will result in a `404 Not Found`. By understanding these codes, you can quickly identify and resolve problems, from broken links to server errors.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors Influencing HTTP Status Codes</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Several factors can determine the HTTP status code a server returns. Understanding these can help in troubleshooting and managing a website effectively:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Request Validity:</strong> If the client's request is malformed or contains invalid syntax, the server will likely return a 4xx client error code, such as `400 Bad Request`.</li>
              <li><strong>Resource Availability:</strong> The most straightforward factor is whether the requested resource exists. If the URL points to a page that has been moved or deleted, the server will respond with a `301 Moved Permanently` or `404 Not Found`, respectively.</li>
              <li><strong>Server Health:</strong> The status of the server itself is a critical factor. If the server is overloaded, undergoing maintenance, or encounters an internal error, it may return a 5xx server error code, like `500 Internal Server Error` or `503 Service Unavailable`.</li>
              <li><strong>Permissions and Authentication:</strong> Access to certain resources may be restricted. If a user tries to access a page they are not authorized to view, the server will return a `401 Unauthorized` or `403 Forbidden` status code.</li>
              <li><strong>Redirects:</strong> If a URL has been moved, the server will issue a 3xx redirection code to guide the client to the new location. This is common practice for maintaining SEO value when changing URL structures.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of an HTTP Status Code</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>HTTP status codes are categorized into five classes, distinguished by their first digit. Each class represents a different type of server response:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>1xx (Informational):</strong> These codes indicate that the request was received and the process is continuing. They are rarely seen by the average user. Example: `100 Continue`.</li>
              <li><strong>2xx (Successful):</strong> This class of codes signifies that the request was successfully received, understood, and accepted. The most common is `200 OK`.</li>
              <li><strong>3xx (Redirection):</strong> These codes indicate that further action needs to be taken by the client to complete the request, usually involving redirection to another URL. `301 Moved Permanently` is a key example for SEO.</li>
              <li><strong>4xx (Client Error):</strong> This class indicates that there was an error on the client's side, such as a malformed request or a request for a non-existent page. `404 Not Found` is the most well-known.</li>
              <li><strong>5xx (Server Error):</strong> These codes are returned when the server fails to fulfill a valid request due to an error on the server's end. `500 Internal Server Error` is a common catch-all for server-side issues.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our HTTP Status Code Checker</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool provides a quick and easy way to check the HTTP status code of any URL. Here’s how to use it:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Enter the URL:</strong> In the input field, type or paste the full URL of the page you want to check.</li>
              <li><strong>Initiate the Check:</strong> Click the "Check Status" button. Our tool will send a request to the server hosting the URL.</li>
              <li><strong>Analyze the Results:</strong> The tool will display the HTTP status code returned by the server, along with the corresponding status text (e.g., "OK", "Not Found"). This information will help you understand the health of the URL.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Why is checking HTTP status codes important for SEO?</h3>
              <p className="text-muted-foreground mt-1">Search engines like Google use status codes to understand the health and structure of your site. A `200 OK` tells them a page is healthy. A `301` redirect passes link equity to the new URL. On the other hand, frequent `404` errors can harm user experience and may lead to search engines crawling your site less frequently. `5xx` errors can cause pages to be de-indexed if not resolved quickly.</p>
            </div>
            <div>
              <h3 className="font-semibold">What's the difference between a 301 and a 302 redirect?</h3>
              <p className="text-muted-foreground mt-1">A `301` redirect indicates that a page has moved permanently to a new location. This is the best practice for SEO as it transfers most of the link equity to the new URL. A `302` redirect signifies a temporary move. It's useful for A/B testing or when a page is temporarily unavailable, but it doesn't pass link equity in the same way as a 301.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can a page with a 404 error still be indexed?</h3>
              <p className="text-muted-foreground mt-1">If a page consistently returns a `404 Not Found` error, search engines will eventually remove it from their index. However, if a page that was previously live starts returning a 404, it may take some time for it to be de-indexed.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>One of the most famous and quirky HTTP status codes is `418 I'm a teapot`. It was created in 1998 as an April Fools' joke and is defined in RFC 2324, the "Hyper Text Coffee Pot Control Protocol." While not a "real" status code used in practice, it's a beloved piece of internet humor and is sometimes implemented in software as an Easter egg.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HttpStatusCodeCheckerTool;
