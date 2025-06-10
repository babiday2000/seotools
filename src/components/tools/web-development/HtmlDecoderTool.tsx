import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
const HtmlDecoderTool = () => {
  const [encodedHtml, setEncodedHtml] = useState('');
  const [decodedHtml, setDecodedHtml] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDecode = () => {
    try {
      const txt = document.createElement("textarea");
      txt.innerHTML = encodedHtml;
      setDecodedHtml(txt.value);
    } catch {
      setDecodedHtml('Invalid HTML to decode.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(decodedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Enter HTML-encoded string here..."
          className="h-48 text-base"
          value={encodedHtml}
          onChange={(e) => setEncodedHtml(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Decoded HTML will appear here..."
            className="h-48 text-base"
            value={decodedHtml}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!decodedHtml}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleDecode} disabled={!encodedHtml}>
        Decode HTML
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is HTML Decoding?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>HTML decoding is the process of converting HTML entities back into their original characters. HTML entities are used to represent special characters (like <code>{'<'}</code>, <code>{'>'}</code>, <code>{'&'}</code>) and reserved characters in an HTML document to ensure they are displayed as text rather than being interpreted as HTML code. For example, to display the less-than symbol (<code>{'<'}</code>) as text on a webpage, it is encoded as <code>{'<'}</code>. HTML decoding reverses this process, converting <code>{'<'}</code> back into <code>{'<'}</code>.</p>
            <p>This process is crucial for developers when they need to process or display user-generated content that has been sanitized for security, or when working with data from databases or APIs where HTML has been encoded to prevent Cross-Site Scripting (XSS) attacks. Decoding allows the raw text to be retrieved and manipulated correctly.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors Requiring HTML Decoding</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You might need to decode HTML in several scenarios:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Processing User Input:</strong> When a user submits text through a form, it's often HTML-encoded on the server for safe storage. To edit or analyze this text, you must first decode it.</li>
              <li><strong>Working with APIs:</strong> APIs often return data with HTML entities to prevent rendering issues or security vulnerabilities. Your application needs to decode this data to display it correctly as plain text.</li>
              <li><strong>Content Management Systems (CMS):</strong> When retrieving content from a CMS database, you may find that the text contains HTML entities that need to be decoded before being displayed in a non-HTML context (like a mobile app's native UI).</li>
              <li><strong>Web Scraping:</strong> When scraping websites, the extracted text content may contain HTML entities. Decoding is necessary to get the clean, readable text.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of HTML Decoding</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>HTML decoding focuses on identifying and replacing HTML entities. These entities come in two main forms:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Named Entities:</strong> These are memorable, case-sensitive names that start with an ampersand (<code>&</code>) and end with a semicolon (<code>;</code>). For example, <code>&amp;</code> for the ampersand, <code>&quot;</code> for double quotes, and <code>&copy;</code> for the copyright symbol.</li>
              <li><strong>Numeric Entities:</strong> These represent characters by their numeric code point in the Unicode character set. They can be in decimal (<code>&#60;</code> for <code>{'<'}</code>) or hexadecimal (<code>&#x3C;</code> for <code>{'<'}</code>).</li>
            </ul>
            <p>The decoding process involves parsing the string, finding these entity patterns, and replacing them with the actual characters they represent.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our HTML Decoder Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes decoding HTML entities simple and instantaneous. Here’s how to use it:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your Encoded HTML:</strong> In the input text area, paste the string containing the HTML entities you want to decode.</li>
              <li><strong>Click the Decode Button:</strong> Press the "Decode HTML" button. Our tool will process the input and convert all HTML entities to their corresponding characters.</li>
              <li><strong>Copy the Decoded Text:</strong> The resulting plain text will appear in the output area, ready for you to copy and use.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Is HTML decoding the same as URL decoding?</h3>
              <p className="text-muted-foreground mt-1">No, they are different. HTML decoding converts HTML entities (like <code>{'<'}</code>) into characters, while URL decoding converts percent-encoded strings (like <code>%20</code>) into characters. They are used in different contexts—HTML for webpage content and URL encoding for URLs.</p>
            </div>
            <div>
              <h3 className="font-semibold">When should I not decode HTML?</h3>
              <p className="text-muted-foreground mt-1">You should not decode HTML if you are about to render it directly into a webpage. Keeping special characters encoded prevents them from being interpreted as HTML tags, which is a critical security measure to prevent XSS attacks. Only decode when you need to process the raw text in a safe environment.</p>
            </div>
            <div>
              <h3 className="font-semibold">Does this tool handle all HTML entities?</h3>
              <p className="text-muted-foreground mt-1">Yes, our tool is designed to recognize and convert all standard named and numeric HTML entities into their proper characters, ensuring a complete and accurate decoding process.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>One of the most famous named HTML entities is `&nbsp;`, which stands for "non-breaking space." Unlike a regular space, a non-breaking space prevents an automatic line break from occurring at its position. It's an old but still very useful trick for web designers to control text layout without resorting to more complex CSS.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HtmlDecoderTool;
