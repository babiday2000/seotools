import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
const JsonMinifyTool = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [minifiedJson, setMinifiedJson] = useState('');
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    try {
      const json = JSON.parse(jsonInput);
      setMinifiedJson(JSON.stringify(json));
    } catch {
      setMinifiedJson('Invalid JSON input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Paste your JSON here..."
          className="h-96 text-base"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Minified JSON will appear here..."
            className="h-96 text-base"
            value={minifiedJson}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!minifiedJson}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleMinify} disabled={!jsonInput}>
        Minify JSON
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JSON Minifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JSON Minifier is a tool that removes all unnecessary characters from JSON data without changing its functionality. This includes removing whitespace, comments, and other non-essential characters. The goal of minification is to reduce the file size of the JSON document, which leads to faster page load times. This is a crucial optimization technique for any website, as page speed is a key factor in both user experience and search engine rankings.</p>
            <p>By making your JSON files smaller, you reduce the amount of data that needs to be transferred from the server to the user's browser, resulting in a quicker and more efficient website.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JSON Minifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Minifying your JSON is a best practice for web performance optimization:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Faster Page Loads:</strong> Smaller file sizes mean faster downloads, which directly improves the user experience and can lead to higher engagement and conversion rates.</li>
              <li><strong>Improved SEO:</strong> Search engines like Google use page speed as a ranking factor. Faster sites are more likely to rank higher in search results.</li>
              <li><strong>Reduced Bandwidth Costs:</strong> By reducing the size of your files, you reduce the amount of bandwidth your server uses, which can lead to lower hosting costs.</li>
              <li><strong>Optimized for Production:</strong> Minification is a standard step in the build process for modern web applications, ensuring that the code served to users is as lightweight as possible.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JSON Minification</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The minification process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Removing Whitespace:</strong> All unnecessary spaces, tabs, and line breaks are removed.</li>
              <li><strong>Removing Comments:</strong> JSON does not officially support comments, but some parsers do. A minifier will remove them.</li>
            </ul>
            <p>Our tool applies these techniques to achieve the smallest possible file size without breaking your code.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JSON Minifier Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes minifying your JSON data simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JSON:</strong> Copy your well-formatted JSON data and paste it into the input text area.</li>
              <li><strong>Click the Minify Button:</strong> Press the "Minify JSON" button. The tool will instantly process your code and remove all unnecessary characters.</li>
              <li><strong>Copy the Minified JSON:</strong> The compact, minified JSON will appear in the output area, ready for you to use in your production environment.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Will minifying my JSON break my application?</h3>
              <p className="text-muted-foreground mt-1">No. Our minifier is designed to be safe and will not change the functionality of your code. It only removes characters that are not required for the JSON parser to understand the data. However, it's always a good practice to test your application after minification.</p>
            </div>
            <div>
              <h3 className="font-semibold">What's the difference between minification and compression?</h3>
              <p className="text-muted-foreground mt-1">Minification is the process of removing unnecessary characters from the code itself. Compression (like Gzip) is a process where the server compresses the file before sending it to the browser, which then decompresses it. Both are important for performance, and they work together to reduce file size.</p>
            </div>
            <div>
              <h3 className="font-semibold">Should I work with minified code?</h3>
              <p className="text-muted-foreground mt-1">No. You should always work with the beautified, readable version of your code. Minification should be the final step in your build process before you deploy your application to a production server.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The JSON specification is surprisingly short and simple. The official JSON website, json.org, displays the entire syntax on a single page. This simplicity is one of the reasons why JSON has become so popular.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JsonMinifyTool;
