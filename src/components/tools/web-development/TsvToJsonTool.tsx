import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { csv2json } from 'json-2-csv';
const TsvToJsonTool = () => {
  const [tsvInput, setTsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const jsonObj = csv2json(tsvInput, {
        delimiter: {
          field: '\t',
        },
      });
      setJsonOutput(JSON.stringify(jsonObj, null, 2));
    } catch {
      setJsonOutput('Invalid TSV input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Paste your TSV here..."
          className="h-96 text-base"
          value={tsvInput}
          onChange={(e) => setTsvInput(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="JSON output will appear here..."
            className="h-96 text-base"
            value={jsonOutput}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!jsonOutput}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleConvert} disabled={!tsvInput}>
        Convert to JSON
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a TSV to JSON Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A TSV to JSON Converter is a tool that transforms data from TSV (Tab-Separated Values) format to JSON (JavaScript Object Notation) format. While both are used for storing and transporting data, JSON is often preferred in modern web development for its simplicity and ease of use with JavaScript. This tool is essential for developers who need to work with data from different sources that use different formats.</p>
            <p>By using a TSV to JSON Converter, you can quickly and easily convert data from spreadsheets or other sources that use TSV to the more modern and lightweight JSON format.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a TSV to JSON Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a TSV to JSON converter invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Web Development:</strong> Most modern web applications use JSON for data interchange. If you're working with data from a spreadsheet or a legacy system that exports data in TSV format, you'll need to convert it to JSON before you can use it in your application.</li>
              <li><strong>Data Migration:</strong> When migrating data from a system that uses TSV to a new system that uses JSON, a converter can save you a lot of time and effort.</li>
              <li><strong>Data Analysis:</strong> If you have data in TSV format that you want to analyze with a tool that only supports JSON, a converter can help you to get the data into the right format.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of TSV to JSON Conversion</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The conversion process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Rows to Objects:</strong> Each row in the TSV is converted to a JSON object.</li>
              <li><strong>Columns to Properties:</strong> The columns in the TSV are converted to JSON properties.</li>
              <li><strong>Values to Values:</strong> The values in the TSV are converted to JSON values.</li>
            </ul>
            <p>Our tool intelligently handles these and other complexities to ensure that your data is converted accurately.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our TSV to JSON Converter</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes converting your TSV to JSON simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your TSV:</strong> Copy your TSV data and paste it into the input text area.</li>
              <li><strong>Click the Convert Button:</strong> Press the "Convert to JSON" button. The tool will instantly generate a JSON object based on your input.</li>
              <li><strong>Copy the JSON:</strong> The generated JSON will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What is the difference between TSV and JSON?</h3>
              <p className="text-muted-foreground mt-1">TSV is a simple, text-based format for storing tabular data, where each record is on a new line and the fields are separated by tabs. JSON is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. JSON is generally preferred for web applications because it is more concise and easier to work with in JavaScript.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I convert JSON back to TSV?</h3>
              <p className="text-muted-foreground mt-1">Yes, you can use our JSON to TSV Converter to convert your JSON data back to TSV format.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The TSV format is a variation of the CSV format, where the fields are separated by tabs instead of commas. This can be useful in situations where the data itself may contain commas, as it avoids the need for complex escaping rules.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TsvToJsonTool;
