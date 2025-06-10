import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
const JsonToTextTool = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const json = JSON.parse(jsonInput);
      setTextOutput(JSON.stringify(json, null, 2));
    } catch {
      setTextOutput('Invalid JSON input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(textOutput);
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
            placeholder="Text output will appear here..."
            className="h-96 text-base"
            value={textOutput}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!textOutput}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleConvert} disabled={!jsonInput}>
        Convert to Text
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JSON to Text Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JSON to Text Converter is a tool that transforms data from JSON (JavaScript Object Notation) format to a plain text format. This can be useful in a variety of situations where you need to extract the data from a JSON object and present it in a more human-readable format.</p>
            <p>By using a JSON to Text Converter, you can quickly and easily extract the data from a JSON object and present it in a more human-readable format.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JSON to Text Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JSON to Text converter invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Data Extraction:</strong> If you have a JSON object and you only need the values, a converter can help you to quickly extract them.</li>
              <li><strong>Reporting:</strong> If you need to generate a report from data that is stored in JSON format, converting it to text can make it easier to work with.</li>
              <li><strong>Data Analysis:</strong> If you have data in JSON format that you want to analyze with a tool that only supports plain text, a converter can help you to get the data into the right format.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JSON to Text Conversion</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The conversion process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Objects to Text:</strong> The key-value pairs in a JSON object are converted to a plain text format.</li>
              <li><strong>Arrays to Text:</strong> The elements in a JSON array are converted to a plain text format.</li>
            </ul>
            <p>Our tool intelligently handles these and other complexities to ensure that your data is converted accurately.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JSON to Text Converter</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes converting your JSON to text simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JSON:</strong> Copy your JSON data and paste it into the input text area.</li>
              <li><strong>Click the Convert Button:</strong> Press the "Convert to Text" button. The tool will instantly generate a text representation of your JSON data.</li>
              <li><strong>Copy the Text:</strong> The generated text will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What is the difference between JSON and plain text?</h3>
              <p className="text-muted-foreground mt-1">JSON is a structured data format, while plain text is not. JSON has a strict syntax that must be followed, while plain text can be in any format.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The JSON format was inspired by the object literals in JavaScript, and it has become the de facto standard for data interchange on the web. However, it is not the only data format that is based on a programming language. YAML, for example, is a data format that was inspired by the data structures in Python.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JsonToTextTool;
