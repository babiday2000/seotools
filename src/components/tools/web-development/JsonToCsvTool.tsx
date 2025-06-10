import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { json2csv } from 'json-2-csv';
const JsonToCsvTool = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const json = JSON.parse(jsonInput);
      const csv = json2csv(json);
      setCsvOutput(csv);
    } catch {
      setCsvOutput('Invalid JSON input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csvOutput);
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
            placeholder="CSV output will appear here..."
            className="h-96 text-base"
            value={csvOutput}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!csvOutput}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleConvert} disabled={!jsonInput}>
        Convert to CSV
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JSON to CSV Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JSON to CSV Converter is a tool that transforms data from JSON (JavaScript Object Notation) format to CSV (Comma-Separated Values) format. While JSON is often preferred in modern web development, CSV is still widely used in many other contexts, such as data analysis and spreadsheets. This tool is essential for developers who need to work with data from different sources that use different formats.</p>
            <p>By using a JSON to CSV Converter, you can quickly and easily convert data from the more modern and lightweight JSON format to the more traditional and widely supported CSV format.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JSON to CSV Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JSON to CSV converter invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Data Analysis:</strong> Many data analysis tools, such as Microsoft Excel and Google Sheets, work best with data in CSV format. If you have data in JSON format that you want to analyze with one of these tools, you'll need to convert it to CSV first.</li>
              <li><strong>Data Migration:</strong> When migrating data from a new system that uses JSON to a legacy system that uses CSV, a converter can save you a lot of time and effort.</li>
              <li><strong>Reporting:</strong> If you need to generate a report from data that is stored in JSON format, converting it to CSV can make it easier to work with in a spreadsheet application.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JSON to CSV Conversion</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The conversion process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Objects to Rows:</strong> Each object in the JSON array is converted to a row in the CSV.</li>
              <li><strong>Properties to Columns:</strong> The keys in the JSON objects are converted to columns in the CSV.</li>
              <li><strong>Values to Values:</strong> The values in the JSON objects are converted to values in the CSV.</li>
            </ul>
            <p>Our tool intelligently handles these and other complexities to ensure that your data is converted accurately.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JSON to CSV Converter</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes converting your JSON to CSV simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JSON:</strong> Copy your JSON data and paste it into the input text area.</li>
              <li><strong>Click the Convert Button:</strong> Press the "Convert to CSV" button. The tool will instantly generate a CSV object based on your input.</li>
              <li><strong>Copy the CSV:</strong> The generated CSV will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What is the difference between JSON and CSV?</h3>
              <p className="text-muted-foreground mt-1">JSON is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. CSV is a simple, text-based format for storing tabular data. JSON is generally preferred for web applications because it is more concise and easier to work with in JavaScript.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I convert CSV back to JSON?</h3>
              <p className="text-muted-foreground mt-1">Yes, you can use our CSV to JSON Converter to convert your CSV data back to JSON format.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The CSV format has been around for decades, and it is still one of the most popular formats for storing and exchanging data. It is supported by a wide variety of applications, including spreadsheets, databases, and data analysis tools.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JsonToCsvTool;
