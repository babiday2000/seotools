import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { XMLBuilder } from 'fast-xml-parser';

const JsonToXmlTool = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [xmlOutput, setXmlOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const json = JSON.parse(jsonInput);
      const builder = new XMLBuilder({});
      const xml = builder.build(json);
      setXmlOutput(xml);
    } catch {
      setXmlOutput('Invalid JSON input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlOutput);
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
            placeholder="XML output will appear here..."
            className="h-96 text-base"
            value={xmlOutput}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!xmlOutput}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleConvert} disabled={!jsonInput}>
        Convert to XML
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JSON to XML Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JSON to XML Converter is a tool that transforms data from JSON (JavaScript Object Notation) format to XML (eXtensible Markup Language) format. While JSON is often preferred in modern web development, XML is still widely used in many legacy systems and enterprise applications. This tool is essential for developers who need to work with data from different sources that use different formats.</p>
            <p>By using a JSON to XML Converter, you can quickly and easily convert data from the more modern and lightweight JSON format to the more verbose and structured XML format.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JSON to XML Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JSON to XML converter invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Interacting with Legacy Systems:</strong> Many older systems and APIs still use XML for data interchange. If you're working with one of these systems, you'll need to convert your JSON data to XML before you can send it.</li>
              <li><strong>Data Migration:</strong> When migrating data from a new system that uses JSON to a legacy system that uses XML, a converter can save you a lot of time and effort.</li>
              <li><strong>Data Analysis:</strong> If you have data in JSON format that you want to analyze with a tool that only supports XML, a converter can help you to get the data into the right format.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JSON to XML Conversion</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The conversion process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Keys to Tags:</strong> JSON keys are converted to XML tags.</li>
              <li><strong>Properties to Attributes:</strong> JSON properties are converted to XML attributes.</li>
              <li><strong>Values to Text Content:</strong> JSON values are converted to the text content of an XML element.</li>
            </ul>
            <p>Our tool intelligently handles these and other complexities to ensure that your data is converted accurately.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JSON to XML Converter</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes converting your JSON to XML simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JSON:</strong> Copy your JSON data and paste it into the input text area.</li>
              <li><strong>Click the Convert Button:</strong> Press the "Convert to XML" button. The tool will instantly generate an XML object based on your input.</li>
              <li><strong>Copy the XML:</strong> The generated XML will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What is the difference between JSON and XML?</h3>
              <p className="text-muted-foreground mt-1">JSON is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. XML is a markup language that is designed to be both human- and machine-readable. JSON is generally preferred for web applications because it is more concise and easier to work with in JavaScript.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I convert XML back to JSON?</h3>
              <p className="text-muted-foreground mt-1">Yes, you can use our XML to JSON Converter to convert your XML data back to JSON format.</p>
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

export default JsonToXmlTool;
