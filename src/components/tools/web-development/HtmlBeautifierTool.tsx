import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { html } from 'js-beautify';
const HtmlBeautifierTool = () => {
  const [uglyHtml, setUglyHtml] = useState('');
  const [prettyHtml, setPrettyHtml] = useState('');
  const [copied, setCopied] = useState(false);

  const handleBeautify = () => {
    try {
      const beautifiedHtml = html(uglyHtml, {
        indent_size: 2,
      });
      setPrettyHtml(beautifiedHtml);
    } catch {
      setPrettyHtml('Invalid HTML to beautify.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prettyHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Paste your ugly HTML here..."
          className="h-48 text-base"
          value={uglyHtml}
          onChange={(e) => setUglyHtml(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Beautified HTML will appear here..."
            className="h-48 text-base"
            value={prettyHtml}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!prettyHtml}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleBeautify} disabled={!uglyHtml}>
        Beautify HTML
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is an HTML Beautifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>An HTML Beautifier, also known as a code formatter or pretty printer, is a tool that automatically formats messy, unindented, or minified HTML code into a clean, readable, and well-structured format. It adds consistent indentation, line breaks, and spacing, making the code easier for humans to read, understand, and debug. This is essential for maintaining code quality, especially when working in teams or on complex projects.</p>
            <p>For developers, clean code is not just about aesthetics; it's about efficiency. Well-formatted HTML significantly reduces the time it takes to find errors, understand the document's structure, and make modifications. Our HTML Beautifier helps you achieve this with a single click.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use an HTML Beautifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find an HTML beautifier invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Improving Readability:</strong> Convert a long, single line of HTML into a structured format that clearly shows the hierarchy of elements.</li>
              <li><strong>Debugging:</strong> It's much easier to spot missing closing tags, incorrect nesting, or other syntax errors in beautified code.</li>
              <li><strong>Learning and Understanding:</strong> If you're analyzing a website's source code, beautifying it first can help you understand its structure and how different elements are related.</li>
              <li><strong>Standardizing Code:</strong> When multiple developers are working on a project, a beautifier ensures that all the code follows the same formatting standards, improving consistency and collaboration.</li>
              <li><strong>After Minification:</strong> To analyze or edit an HTML file that has been minified (a process that removes all unnecessary characters to reduce file size), you first need to beautify it to make it readable again.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of HTML Beautification</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The beautification process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Indentation:</strong> Nested elements are indented with a consistent number of spaces (usually 2 or 4), visually representing the document's tree structure.</li>
              <li><strong>Line Breaks:</strong> Tags are placed on new lines to prevent long, unreadable lines of code. For example, a closing tag will be placed on a new line after its content.</li>
              <li><strong>Spacing:</strong> Consistent spacing is applied around attributes and within tags to improve clarity.</li>
            </ul>
            <p>Our tool intelligently applies these rules to transform even the most chaotic code into a clean and professional format.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our HTML Beautifier Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes beautifying your HTML code effortless:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your HTML:</strong> Copy your messy or minified HTML code and paste it into the input text area.</li>
              <li><strong>Click the Beautify Button:</strong> Press the "Beautify HTML" button. The tool will instantly reformat your code according to best practices.</li>
              <li><strong>Copy the Beautified HTML:</strong> The clean, well-structured HTML will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Does beautifying HTML affect how it's displayed on a webpage?</h3>
              <p className="text-muted-foreground mt-1">No. Browsers ignore whitespace like spaces, tabs, and newlines when rendering HTML. Beautifying your code only affects its appearance in a text editor; the final webpage will look exactly the same.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is this tool the same as an HTML validator?</h3>
              <p className="text-muted-foreground mt-1">No. A beautifier formats your code to make it readable, but it does not check for errors. An HTML validator checks your code against W3C standards to ensure it is syntactically correct. It's a good practice to use both tools.</p>
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
            <p>The concept of "pretty-printing" code has been around since the 1960s. Early programmers realized that structured code was easier to debug, and the first automatic code formatters were developed to help with this. The term "beautifier" became popular with the rise of web development and the need to format languages like HTML, CSS, and JavaScript.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HtmlBeautifierTool;
