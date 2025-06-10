import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { css } from 'js-beautify';
const CssBeautifierTool = () => {
  const [uglyCss, setUglyCss] = useState('');
  const [prettyCss, setPrettyCss] = useState('');
  const [copied, setCopied] = useState(false);

  const handleBeautify = () => {
    try {
      const beautifiedCss = css(uglyCss, {
        indent_size: 2,
      });
      setPrettyCss(beautifiedCss);
    } catch {
      setPrettyCss('Invalid CSS to beautify.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prettyCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Paste your ugly CSS here..."
          className="h-48 text-base"
          value={uglyCss}
          onChange={(e) => setUglyCss(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Beautified CSS will appear here..."
            className="h-48 text-base"
            value={prettyCss}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!prettyCss}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleBeautify} disabled={!uglyCss}>
        Beautify CSS
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a CSS Beautifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A CSS Beautifier, also known as a CSS formatter or pretty printer, is a tool that transforms messy, unindented, or minified CSS code into a clean, readable, and well-structured format. It adds consistent indentation, line breaks, and spacing to make the code easier for developers to read, understand, and maintain. This is crucial for ensuring code quality and improving developer productivity, especially when working on large or collaborative projects.</p>
            <p>Well-formatted CSS is not just about aesthetics; it's about clarity. By organizing your CSS rules in a structured way, you can quickly identify styles, debug layout issues, and make changes with confidence. Our CSS Beautifier helps you achieve this with a single click.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a CSS Beautifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a CSS beautifier invaluable in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Improving Readability:</strong> Convert a long, single line of CSS into a structured format that clearly shows selectors, properties, and values.</li>
              <li><strong>Debugging:</strong> It's much easier to spot syntax errors, typos, or missing semicolons in beautified code.</li>
              <li><strong>Learning and Understanding:</strong> If you're analyzing a website's stylesheet, beautifying it first can help you understand its structure and how different styles are applied.</li>
              <li><strong>Standardizing Code:</strong> When multiple developers are working on a project, a beautifier ensures that all the code follows the same formatting standards, improving consistency and collaboration.</li>
              <li><strong>After Minification:</strong> To analyze or edit a CSS file that has been minified, you first need to beautify it to make it readable again.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of CSS Beautification</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The beautification process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Indentation:</strong> Rules within media queries and other nested structures are indented to represent their hierarchy.</li>
              <li><strong>Line Breaks:</strong> Each CSS rule is placed on a new line, with each property-value pair on its own line.</li>
              <li><strong>Spacing:</strong> Consistent spacing is applied around selectors, braces, properties, and values to improve clarity.</li>
            </ul>
            <p>Our tool intelligently applies these rules to transform even the most disorganized stylesheets into a clean and professional format.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our CSS Beautifier Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes beautifying your CSS code effortless:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your CSS:</strong> Copy your messy or minified CSS code and paste it into the input text area.</li>
              <li><strong>Click the Beautify Button:</strong> Press the "Beautify CSS" button. The tool will instantly reformat your code according to best practices.</li>
              <li><strong>Copy the Beautified CSS:</strong> The clean, well-structured CSS will appear in the output area, ready for you to copy and use in your project.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Does beautifying CSS affect how my website looks?</h3>
              <p className="text-muted-foreground mt-1">No. Just like with HTML, browsers ignore whitespace when parsing CSS. Beautifying your code only affects its appearance in a text editor; the final styling of your webpage will look exactly the same.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is this tool the same as a CSS validator?</h3>
              <p className="text-muted-foreground mt-1">No. A beautifier formats your code to make it readable, but it does not check for errors. A CSS validator checks your code against W3C standards to ensure it is syntactically correct. It's a good practice to use both tools.</p>
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
            <p>The first version of CSS, published in 1996, was much simpler than the CSS we use today. It didn't even have a concept of "selectors" in the way we think of them now. The language has evolved enormously over the years, and the need for tools like beautifiers has grown along with its complexity.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CssBeautifierTool;
