import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
const JsonViewerTool = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      const json = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(json, null, 2));
    } catch {
      setFormattedJson('Invalid JSON input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Textarea
          placeholder="Paste your JSON here..."
          className="h-96 text-base"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Formatted JSON will appear here..."
            className="h-96 text-base"
            value={formattedJson}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!formattedJson}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleFormat} disabled={!jsonInput}>
        Format JSON
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JSON Viewer?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JSON Viewer is a tool that allows you to view JSON data in a readable, structured format. It takes raw JSON data and formats it with proper indentation and line breaks, making it easy to read and understand. This is essential for developers, data analysts, and anyone who works with JSON data, as it can be difficult to read in its raw, unformatted state.</p>
            <p>By using a JSON Viewer, you can quickly identify the structure of your JSON data, find errors, and make modifications with confidence.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JSON Viewer?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JSON Viewer invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Improving Readability:</strong> Convert a long, single line of JSON into a structured format that clearly shows the hierarchy of objects and arrays.</li>
              <li><strong>Debugging:</strong> It's much easier to spot syntax errors, typos, or missing commas in formatted JSON.</li>
              <li><strong>Learning and Understanding:</strong> If you're analyzing a JSON data source, viewing it in a structured format can help you understand its structure and how different elements are related.</li>
              <li><strong>Data Analysis:</strong> A JSON Viewer can help you to quickly identify the data you need and understand its context.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JSON Viewing</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The viewing process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Indentation:</strong> Nested objects and arrays are indented with a consistent number of spaces, visually representing the document's tree structure.</li>
              <li><strong>Line Breaks:</strong> Keys and values are placed on new lines to prevent long, unreadable lines of code.</li>
              <li><strong>Syntax Highlighting:</strong> Different parts of the JSON data (keys, values, strings, numbers, etc.) are colored differently to improve readability.</li>
            </ul>
            <p>Our tool intelligently applies these rules to transform even the most chaotic JSON into a clean and professional format.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JSON Viewer</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes viewing your JSON data effortless:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JSON:</strong> Copy your JSON data and paste it into the input text area.</li>
              <li><strong>Click the Format Button:</strong> Press the "Format JSON" button. The tool will instantly reformat your code according to best practices.</li>
              <li><strong>Copy the Formatted JSON:</strong> The clean, well-structured JSON will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Is this tool the same as a JSON validator?</h3>
              <p className="text-muted-foreground mt-1">No. A JSON Viewer formats your code to make it readable, but it does not check for errors. A JSON validator checks your code against the JSON specification to ensure it is syntactically correct. It's a good practice to use both tools.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I customize the formatting rules?</h3>
              <p className="text-muted-foreground mt-1">Our online tool uses a standard set of widely-accepted formatting rules for simplicity and consistency. Many code editors (like VS Code) have extensions that allow you to customize formatting rules to a high degree.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>JSON was originally created by Douglas Crockford in the early 2000s as a lightweight alternative to XML. It was designed to be easy for humans to read and write and for machines to parse and generate. It has since become the de facto standard for data interchange on the web.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JsonViewerTool;
