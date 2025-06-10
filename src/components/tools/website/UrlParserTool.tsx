import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UrlParserTool = () => {
  const [url, setUrl] = useState('');
  const [parsedUrl, setParsedUrl] = useState<URL | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParseUrl = () => {
    setError(null);
    setParsedUrl(null);
    try {
      const parsed = new URL(url);
      setParsedUrl(parsed);
    } catch {
      setError('Invalid URL provided.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="https://example.com:8080/path/to/page?query=string#hash"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleParseUrl} disabled={!url}>
          Parse URL
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {parsedUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Parsed URL Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <strong>Protocol:</strong> {parsedUrl.protocol}
            </div>
            <div>
              <strong>Hostname:</strong> {parsedUrl.hostname}
            </div>
            <div>
              <strong>Port:</strong> {parsedUrl.port}
            </div>
            <div>
              <strong>Pathname:</strong> {parsedUrl.pathname}
            </div>
            <div>
              <strong>Search:</strong> {parsedUrl.search}
            </div>
            <div>
              <strong>Hash:</strong> {parsedUrl.hash}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">What is a URL Parser and Why is it Important?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A URL parser is a tool that breaks down a URL into its individual components, such as the protocol, hostname, path, and query parameters. This can be useful for developers and SEO analysts who need to understand the structure of a URL.</p>
                <p>By using a URL parser, you can easily extract specific information from a URL, such as the domain name, the path to a specific page, or the values of any query parameters. This can be helpful for a variety of tasks, such as analyzing your website's traffic, tracking the performance of your marketing campaigns, and more.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Key Components of a URL</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A URL is made up of several components, each of which provides information about the requested resource. Here are the key components of a URL:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Protocol:</strong> This is the method that is used to access the resource, such as `http` or `https`.</li>
                    <li><strong>Hostname:</strong> This is the domain name of the server that is hosting the resource.</li>
                    <li><strong>Port:</strong> This is the port number that is used to access the resource.</li>
                    <li><strong>Pathname:</strong> This is the path to the resource on the server.</li>
                    <li><strong>Search:</strong> This is a query string that contains additional parameters for the resource.</li>
                    <li><strong>Hash:</strong> This is a fragment identifier that points to a specific part of the resource.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How to Use the URL Parser Tool</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool makes it easy to parse any URL. Here’s how:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Enter a URL:</strong> Enter the URL you want to parse in the input field above.</li>
                    <li><strong>Click "Parse URL":</strong> Click the "Parse URL" button to parse the specified URL.</li>
                    <li><strong>View the Results:</strong> The parsed URL components will be displayed in the text area below.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">What is the difference between a URL and a URI?</h3>
                    <p className="text-muted-foreground mt-1">A URL (Uniform Resource Locator) is a type of URI (Uniform Resource Identifier) that specifies the location of a resource on the internet. A URI is a more general term that can be used to identify any resource, whether it is on the internet or not.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is a fun fact about URLs?</h3>
                    <p className="text-muted-foreground mt-1">The first URL was created in 1991 by Tim Berners-Lee. It was used to point to the first website ever created, which was hosted at CERN.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default UrlParserTool;
