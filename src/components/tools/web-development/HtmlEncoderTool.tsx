import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
const HtmlEncoderTool = () => {
  const [decodedHtml, setDecodedHtml] = useState('');
  const [encodedHtml, setEncodedHtml] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      const encoded = decodedHtml.replace(/[\u00A0-\u9999<>&"']/g, (i) => {
        return '&#' + i.charCodeAt(0) + ';';
      });
      setEncodedHtml(encoded);
    } catch {
      setEncodedHtml('Invalid HTML to encode.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(encodedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Enter HTML here..."
          className="h-48 text-base"
          value={decodedHtml}
          onChange={(e) => setDecodedHtml(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Encoded HTML will appear here..."
            className="h-48 text-base"
            value={encodedHtml}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!encodedHtml}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleEncode} disabled={!decodedHtml}>
        Encode HTML
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is HTML Encoding?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>HTML encoding is the process of converting special characters into their respective HTML entities. This ensures that these characters are displayed as literal text in a web browser, rather than being interpreted as HTML code. For example, the less-than symbol (<code>{'<'}</code>) is a fundamental part of HTML syntax, used to open tags. If you want to display this symbol on a webpage as text, you must encode it as <code>{'<'}</code>. HTML encoding is a critical security practice to prevent Cross-Site Scripting (XSS) attacks and to ensure that content is rendered correctly.</p>
            <p>This process is essential for web developers, content creators, and anyone who handles user-generated content. By encoding potentially harmful characters, you can safely embed text within an HTML document without risking unintended code execution or broken layouts.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors Requiring HTML Encoding</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You need to encode HTML in various situations to maintain security and content integrity:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Displaying Code Snippets:</strong> To show HTML, CSS, or JavaScript code examples on a webpage, you must encode the special characters so the browser displays the code as text instead of executing it.</li>
              <li><strong>Handling User-Generated Content:</strong> Any input from users, such as comments, forum posts, or profile information, should be HTML-encoded before being displayed on a page. This prevents malicious users from injecting scripts that could harm other visitors.</li>
              <li><strong>Storing Data in Databases:</strong> When storing text that might contain special HTML characters in a database, encoding it first can prevent issues when that data is later retrieved and displayed on a web page.</li>
              <li><strong>Generating Content Dynamically:</strong> When creating HTML content on the server-side (e.g., from an API response or a database query), it's crucial to encode any dynamic text values to ensure they are rendered safely.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of HTML Encoding</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>HTML encoding involves replacing a specific set of characters with their corresponding HTML entities. The most important characters to encode are:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong><code>{'&'}</code> (Ampersand)</strong> becomes <code>{'&'}</code></li>
              <li><strong><code>{'<'}</code> (Less-than)</strong> becomes <code>{'<'}</code></li>
              <li><strong><code>{'>'}</code> (Greater-than)</strong> becomes <code>{'>'}</code></li>
              <li><strong><code>{'"'}</code> (Double quote)</strong> becomes <code>{'"'}</code></li>
              <li><strong><code>{"'"}</code> (Single quote)</strong> becomes <code>{"'"}</code> or <code>{'&#39;'}</code></li>
            </ul>
            <p>The encoding process involves finding these characters in a string and replacing them with their entity equivalents, making the text safe for display within an HTML context.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our HTML Encoder Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool simplifies the process of HTML encoding:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Enter Your Text:</strong> Paste the plain text or code you want to encode into the input text area.</li>
              <li><strong>Click the Encode Button:</strong> Press the "Encode HTML" button. The tool will process your input and convert all special characters into their safe HTML entity equivalents.</li>
              <li><strong>Copy the Encoded HTML:</strong> The resulting encoded string will appear in the output area, ready for you to copy and paste into your HTML document.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Why can't I just type <code>{'<'}</code> on my webpage?</h3>
              <p className="text-muted-foreground mt-1">Because the browser will interpret it as the start of an HTML tag. This can break your page layout or, in a worst-case scenario, create a security vulnerability. Encoding it as <code>{'<'}</code> tells the browser to treat it as a literal character.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is HTML encoding the same as URL encoding?</h3>
              <p className="text-muted-foreground mt-1">No. HTML encoding is for making text safe to display on a webpage. URL encoding is for making text safe to include in a URL. They encode different characters and are used for different purposes.</p>
            </div>
            <div>
              <h3 className="font-semibold">Does this tool prevent all XSS attacks?</h3>
              <p className="text-muted-foreground mt-1">HTML encoding is a primary defense against Cross-Site Scripting (XSS), but it should be part of a comprehensive security strategy. Always follow best practices for web security, including input validation and using modern frameworks that handle sanitization automatically.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The concept of "escaping" characters to prevent them from being interpreted as code is not unique to HTML. It's a fundamental principle in almost every programming language and data format. For example, in many languages, you use a backslash (`\`) to escape quotes within a string, like `"He said, \"Hello!\""`. HTML's entity system is just its own unique way of solving this common problem.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HtmlEncoderTool;
