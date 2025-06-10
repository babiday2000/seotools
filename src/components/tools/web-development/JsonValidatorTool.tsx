import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
const JsonValidatorTool = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleValidate = () => {
    try {
      JSON.parse(jsonInput);
      setIsValid(true);
    } catch {
      setIsValid(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste your JSON here..."
        className="h-96 text-base"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <Button onClick={handleValidate} disabled={!jsonInput}>
        Validate JSON
      </Button>

      {isValid !== null && (
        <Alert variant={isValid ? 'default' : 'destructive'}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>{isValid ? 'Valid JSON' : 'Invalid JSON'}</AlertTitle>
          <AlertDescription>
            {isValid
              ? 'The JSON you entered is valid.'
              : 'The JSON you entered is not valid. Please check the syntax and try again.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JSON Validator?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JSON Validator is a tool that checks whether a given piece of text is valid JSON. JSON (JavaScript Object Notation) has a strict syntax, and any deviation from this syntax will cause parsing errors. A validator ensures that your JSON data adheres to these rules, which is crucial for data interchange between different systems and applications.</p>
            <p>By using a JSON Validator, you can quickly identify and fix syntax errors in your JSON data, ensuring that it can be correctly parsed and processed by any application that consumes it.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JSON Validator?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JSON Validator essential in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Debugging:</strong> Quickly find and fix syntax errors in your JSON data.</li>
              <li><strong>API Development:</strong> Ensure that the JSON data you are sending and receiving from an API is valid.</li>
              <li><strong>Data Integration:</strong> When integrating data from different sources, a validator can help to ensure that the data is in the correct format.</li>
              <li><strong>Configuration Files:</strong> Many applications use JSON for configuration files. A validator can help to ensure that these files are correctly formatted.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JSON Validation</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The validation process involves checking for several key aspects of the JSON syntax:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Properly-formed objects and arrays:</strong> Objects must be enclosed in curly braces, and arrays must be enclosed in square brackets.</li>
              <li><strong>Correct use of commas:</strong> Commas must be used to separate key-value pairs in objects and elements in arrays.</li>
              <li><strong>Correct use of quotes:</strong> Keys and string values must be enclosed in double quotes.</li>
            </ul>
            <p>Our tool intelligently checks for these and other rules to ensure that your JSON data is valid.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JSON Validator</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes validating your JSON data simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JSON:</strong> Copy your JSON data and paste it into the input text area.</li>
              <li><strong>Click the Validate Button:</strong> Press the "Validate JSON" button. The tool will instantly check your code for syntax errors.</li>
              <li><strong>View the Result:</strong> The tool will tell you whether your JSON is valid or not. If it is not valid, it will provide a helpful error message to help you find and fix the problem.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What is the difference between a validator and a formatter?</h3>
              <p className="text-muted-foreground mt-1">A validator checks your code for errors, while a formatter makes it more readable. It's a good practice to use both tools.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I use this tool to validate my JSON data against a schema?</h3>
              <p className="text-muted-foreground mt-1">This tool is for validating the syntax of your JSON data. To validate your JSON data against a schema, you can use our JSON to JSON Schema tool to generate a schema, and then use a JSON Schema validator.</p>
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

export default JsonValidatorTool;
