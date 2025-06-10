import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { json2csv } from 'json-2-csv';

const JsonToTsvTool = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [tsvOutput, setTsvOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const json = JSON.parse(jsonInput);
      const tsv = json2csv(json, {
        delimiter: {
          field: '\t',
        },
      });
      setTsvOutput(tsv);
    } catch {
      setTsvOutput('Invalid JSON input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tsvOutput);
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
            placeholder="TSV output will appear here..."
            className="h-96 text-base"
            value={tsvOutput}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!tsvOutput}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleConvert} disabled={!jsonInput}>
        Convert to TSV
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JSON to TSV Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JSON to TSV Converter is a tool that transforms data from JSON (JavaScript Object Notation) format to TSV (Tab-Separated Values) format. While JSON is often preferred in modern web development, TSV is still widely used in many other contexts, such as data analysis and spreadsheets. This tool is essential for developers who need to work with data from different sources that use different formats.</p>
            <p>By using a JSON to TSV Converter, you can quickly and easily convert data from the more modern and lightweight JSON format to the more traditional and widely supported TSV format.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JSON to TSV Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JSON to TSV converter invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Data Analysis:</strong> Many data analysis tools, such as Microsoft Excel and Google Sheets, work best with data in TSV format. If you have data in JSON format that you want to analyze with one of these tools, you'll need to convert it to TSV first.</li>
              <li><strong>Data Migration:</strong> When migrating data from a new system that uses JSON to a legacy system that uses TSV, a converter can save you a lot of time and effort.</li>
              <li><strong>Reporting:</strong> If you need to generate a report from data that is stored in JSON format, converting it to TSV can make it easier to work with in a spreadsheet application.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JSON to TSV Conversion</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The conversion process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Objects to Rows:</strong> Each object in the JSON array is converted to a row in the TSV.</li>
              <li><strong>Properties to Columns:</strong> The keys in the JSON objects are converted to columns in the TSV.</li>
              <li><strong>Values to Values:</strong> The values in the JSON objects are converted to values in the TSV.</li>
            </ul>
            <p>Our tool intelligently handles these and other complexities to ensure that your data is converted accurately.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JSON to TSV Converter</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes converting your JSON to TSV simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JSON:</strong> Copy your JSON data and paste it into the input text area.</li>
              <li><strong>Click the Convert Button:</strong> Press the "Convert to TSV" button. The tool will instantly generate a TSV object based on your input.</li>
              <li><strong>Copy the TSV:</strong> The generated TSV will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What is the difference between JSON and TSV?</h3>
              <p className="text-muted-foreground mt-1">JSON is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. TSV is a simple, text-based format for storing tabular data, where each record is on a new line and the fields are separated by tabs. JSON is generally preferred for web applications because it is more concise and easier to work with in JavaScript.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I convert TSV back to JSON?</h3>
              <p className="text-muted-foreground mt-1">Yes, you can use our TSV to JSON Converter to convert your TSV data back to JSON format.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The TSV format is a variation of the CSV format, where the fields are separated by tabs instead of commas. This can be useful in situations where the data itself may contain commas, as it avoids the need for complex escaping rules.</p>
          </div>
        </section>

        <section>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          </div>
        </section>
      </div>
    </div>
  );
};

export default JsonToTsvTool;
