import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { js } from 'js-beautify';
const JavaScriptBeautifierTool = () => {
  const [uglyJs, setUglyJs] = useState('');
  const [prettyJs, setPrettyJs] = useState('');
  const [copied, setCopied] = useState(false);

  const handleBeautify = () => {
    try {
      const beautifiedJs = js(uglyJs, {
        indent_size: 2,
        space_in_empty_paren: true,
      });
      setPrettyJs(beautifiedJs);
    } catch {
      setPrettyJs('Invalid JavaScript to beautify.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prettyJs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Paste your ugly JavaScript here..."
          className="h-48 text-base"
          value={uglyJs}
          onChange={(e) => setUglyJs(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Beautified JavaScript will appear here..."
            className="h-48 text-base"
            value={prettyJs}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!prettyJs}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleBeautify} disabled={!uglyJs}>
        Beautify JavaScript
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JavaScript Beautifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JavaScript Beautifier, also known as a code formatter or pretty printer, is a tool that automatically formats messy, unindented, or minified JavaScript code into a clean, readable, and well-structured format. It adds consistent indentation, line breaks, and spacing, making the code easier for humans to read, understand, and debug. This is essential for maintaining code quality, especially when working in teams or on complex projects.</p>
            <p>For developers, clean code is not just about aesthetics; it's about efficiency. Well-formatted JavaScript significantly reduces the time it takes to find errors, understand the logic, and make modifications. Our JavaScript Beautifier helps you achieve this with a single click.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JavaScript Beautifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JavaScript beautifier invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Improving Readability:</strong> Convert a long, single line of JavaScript into a structured format that clearly shows the logic and flow of the code.</li>
              <li><strong>Debugging:</strong> It's much easier to spot syntax errors, typos, or missing brackets in beautified code.</li>
              <li><strong>Learning and Understanding:</strong> If you're analyzing a website's source code, beautifying it first can help you understand its functionality.</li>
              <li><strong>Standardizing Code:</strong> When multiple developers are working on a project, a beautifier ensures that all the code follows the same formatting standards, improving consistency and collaboration.</li>
              <li><strong>After Minification or Obfuscation:</strong> To analyze or edit a JavaScript file that has been minified or obfuscated, you first need to beautify it to make it readable again.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JavaScript Beautification</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The beautification process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Indentation:</strong> Code blocks within functions, loops, and conditional statements are indented to represent their scope.</li>
              <li><strong>Line Breaks:</strong> Statements are placed on new lines to prevent long, unreadable lines of code.</li>
              <li><strong>Spacing:</strong> Consistent spacing is applied around operators, commas, and other tokens to improve clarity.</li>
            </ul>
            <p>Our tool intelligently applies these rules to transform even the most chaotic code into a clean and professional format.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JavaScript Beautifier Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes beautifying your JavaScript code effortless:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JavaScript:</strong> Copy your messy or minified JavaScript code and paste it into the input text area.</li>
              <li><strong>Click the Beautify Button:</strong> Press the "Beautify JavaScript" button. The tool will instantly reformat your code according to best practices.</li>
              <li><strong>Copy the Beautified JavaScript:</strong> The clean, well-structured JavaScript will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Does beautifying JavaScript affect its functionality?</h3>
              <p className="text-muted-foreground mt-1">No. Beautifying your code only affects its appearance in a text editor; the functionality of the code will remain exactly the same.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is this tool the same as a JavaScript linter?</h3>
              <p className="text-muted-foreground mt-1">No. A beautifier formats your code to make it readable, but it does not check for errors or enforce coding standards. A linter (like ESLint) analyzes your code for potential errors, bugs, and stylistic issues. It's a good practice to use both tools.</p>
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
            <p>JavaScript was created by Brendan Eich at Netscape in just 10 days in 1995. It was originally going to be called "Mocha," then "LiveScript," before it was finally named "JavaScript" as a marketing ploy to capitalize on the popularity of Java.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JavaScriptBeautifierTool;
