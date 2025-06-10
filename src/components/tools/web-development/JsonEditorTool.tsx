import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
const JsonEditorTool = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="Paste or type your JSON here..."
          className="h-96 text-base"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleCopy}
          disabled={!jsonInput}
        >
          {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JSON Editor?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JSON Editor is a tool that allows you to create, edit, and format JSON data in a user-friendly interface. It provides a structured view of the data, making it easy to navigate and modify complex JSON objects and arrays. This is essential for developers, data analysts, and anyone who works with JSON data, as it can be difficult to edit in its raw, unformatted state.</p>
            <p>By using a JSON Editor, you can quickly create and modify JSON data, find errors, and ensure that your data is well-structured and valid.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JSON Editor?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JSON Editor invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Creating JSON Data:</strong> A JSON Editor makes it easy to create well-structured JSON data from scratch.</li>
              <li><strong>Editing JSON Data:</strong> It's much easier to edit JSON data in a structured view than in a raw text editor.</li>
              <li><strong>Debugging:</strong> A JSON Editor can help you to quickly identify and fix syntax errors in your JSON data.</li>
              <li><strong>Data Analysis:</strong> A JSON Editor can help you to quickly identify the data you need and understand its context.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JSON Editing</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The editing process involves several key features:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Structured View:</strong> The data is displayed in a tree-like structure, making it easy to navigate and understand.</li>
              <li><strong>Syntax Highlighting:</strong> Different parts of the JSON data (keys, values, strings, numbers, etc.) are colored differently to improve readability.</li>
              <li><strong>Validation:</strong> The editor will often validate your JSON data as you type, helping you to avoid syntax errors.</li>
            </ul>
            <p>Our tool provides a simple and intuitive interface for editing your JSON data.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JSON Editor</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes editing your JSON data effortless:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste or Type Your JSON:</strong> Paste your JSON data into the input text area, or type it in from scratch.</li>
              <li><strong>Edit Your JSON:</strong> Make any changes you need to your JSON data.</li>
              <li><strong>Copy the JSON:</strong> The JSON data is ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Is this tool the same as a JSON validator?</h3>
              <p className="text-muted-foreground mt-1">While a JSON editor often includes validation features, its primary purpose is to help you create and edit JSON data. A JSON validator is a tool that is specifically designed to check your code for errors.</p>
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

export default JsonEditorTool;
