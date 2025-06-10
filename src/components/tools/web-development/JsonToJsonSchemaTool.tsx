import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { toJsonSchema } from 'to-json-schema';
const JsonToJsonSchemaTool = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonSchema, setJsonSchema] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const json = JSON.parse(jsonInput);
      const schema = toJsonSchema(json);
      setJsonSchema(JSON.stringify(schema, null, 2));
    } catch {
      setJsonSchema('Invalid JSON input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Paste your JSON here..."
          className="h-48 text-base"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="JSON Schema will appear here..."
            className="h-48 text-base"
            value={jsonSchema}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!jsonSchema}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleConvert} disabled={!jsonInput}>
        Convert to JSON Schema
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is JSON to JSON Schema?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JSON to JSON Schema converter is a tool that automatically generates a JSON Schema from a given JSON object. JSON Schema is a powerful tool for validating the structure of JSON data. It allows you to define the expected data types, formats, and constraints for each field in a JSON object. This is incredibly useful for ensuring the quality and consistency of your data, especially when working with APIs or other data sources.</p>
            <p>By generating a JSON Schema, you can create a blueprint for your JSON data, which can then be used to validate new data, generate documentation, and more.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JSON to JSON Schema Converter?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JSON to JSON Schema converter useful in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Data Validation:</strong> Use the generated schema to validate that incoming JSON data conforms to the expected structure.</li>
              <li><strong>API Documentation:</strong> A JSON Schema can serve as a clear and concise documentation for your API, making it easier for other developers to understand and use.</li>
              <li><strong>Code Generation:</strong> Some tools can use a JSON Schema to generate code for processing the corresponding JSON data.</li>
              <li><strong>Data Migration:</strong> When migrating data from one system to another, a JSON Schema can help to ensure that the data is transformed correctly.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JSON Schema</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JSON Schema is a JSON object that defines the structure of other JSON objects. Some of the key components of a JSON Schema include:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>`type`</strong>: The data type of a field (e.g., "string", "number", "boolean", "object", "array").</li>
              <li><strong>`properties`</strong>: The fields that are expected to be present in an object.</li>
              <li><strong>`required`</strong>: An array of the fields that are required to be present in an object.</li>
              <li><strong>`items`</strong>: The schema for the items in an array.</li>
            </ul>
            <p>Our tool intelligently generates a JSON Schema that accurately reflects the structure of your JSON data.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JSON to JSON Schema Converter</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes converting your JSON to a JSON Schema simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JSON:</strong> Copy your JSON data and paste it into the input text area.</li>
              <li><strong>Click the Convert Button:</strong> Press the "Convert to JSON Schema" button. The tool will instantly generate a JSON Schema based on your input.</li>
              <li><strong>Copy the JSON Schema:</strong> The generated JSON Schema will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What is the difference between JSON and JSON Schema?</h3>
              <p className="text-muted-foreground mt-1">JSON is a data format, while JSON Schema is a language for defining the structure of JSON data. You can think of JSON Schema as a blueprint for your JSON data.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I use this tool to validate my JSON data?</h3>
              <p className="text-muted-foreground mt-1">This tool is for generating a JSON Schema from your JSON data. To validate your JSON data against a schema, you can use our JSON Validator tool.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>JSON Schema was first created in 2009 by a group of developers who were working on a project called "JS-Class". The project was intended to be a way to define classes in JavaScript, but it eventually evolved into a more general-purpose language for defining the structure of JSON data.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JsonToJsonSchemaTool;
