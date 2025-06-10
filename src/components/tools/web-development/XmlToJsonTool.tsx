import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { XMLParser } from 'fast-xml-parser';
const XmlToJsonTool = () => {
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const parser = new XMLParser();
      const jsonObj = parser.parse(xmlInput);
      setJsonOutput(JSON.stringify(jsonObj, null, 2));
    } catch {
      setJsonOutput('Invalid XML input.');
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
          placeholder="Paste your XML here..."
          className="h-96 text-base"
          value={xmlInput}
          onChange={(e) => setXmlInput(e.target.value)}
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
      <Button onClick={handleConvert} disabled={!xmlInput}>
        Convert to JSON
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is an XML to JSON Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>An XML to JSON Converter is a tool that transforms data from XML (eXtensible Markup Language) format to JSON (JavaScript Object Notation) format. While both are used for storing and transporting data, JSON is often preferred in modern web development for its simplicity and ease of use with JavaScript. This tool is essential for developers who need to work with data from different sources that use different formats.</p>
            <p>By using an XML to JSON Converter, you can quickly and easily convert data from legacy systems or APIs that use XML to the more modern and lightweight JSON format.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use an XML to JSON Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find an XML to JSON converter invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Web Development:</strong> Most modern web applications use JSON for data interchange. If you're working with an older API that returns data in XML format, you'll need to convert it to JSON before you can use it in your application.</li>
              <li><strong>Data Migration:</strong> When migrating data from a legacy system that uses XML to a new system that uses JSON, a converter can save you a lot of time and effort.</li>
              <li><strong>Data Analysis:</strong> If you have data in XML format that you want to analyze with a tool that only supports JSON, a converter can help you to get the data into the right format.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of XML to JSON Conversion</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The conversion process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Tags to Keys:</strong> XML tags are converted to JSON keys.</li>
              <li><strong>Attributes to Properties:</strong> XML attributes are converted to JSON properties.</li>
              <li><strong>Text Content to Values:</strong> The text content of an XML element is converted to a JSON value.</li>
            </ul>
            <p>Our tool intelligently handles these and other complexities to ensure that your data is converted accurately.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our XML to JSON Converter</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes converting your XML to JSON simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your XML:</strong> Copy your XML data and paste it into the input text area.</li>
              <li><strong>Click the Convert Button:</strong> Press the "Convert to JSON" button. The tool will instantly generate a JSON object based on your input.</li>
              <li><strong>Copy the JSON:</strong> The generated JSON will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What is the difference between XML and JSON?</h3>
              <p className="text-muted-foreground mt-1">XML is a markup language that is designed to be both human- and machine-readable. JSON is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. JSON is generally preferred for web applications because it is more concise and easier to work with in JavaScript.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I convert JSON back to XML?</h3>
              <p className="text-muted-foreground mt-1">Yes, you can use our JSON to XML Converter to convert your JSON data back to XML format.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>XML was first developed in the late 1990s as a way to store and transport data. It was designed to be a simpler and more flexible alternative to SGML (Standard Generalized Markup Language), which was the standard for creating markup languages at the time. While XML is still used in many legacy systems, it has been largely replaced by JSON in modern web development.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default XmlToJsonTool;
