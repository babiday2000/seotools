import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';

const UrlDecodeTool = () => {
  const [encodedUrl, setEncodedUrl] = useState('');
  const [decodedUrl, setDecodedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDecode = () => {
    try {
      setDecodedUrl(decodeURIComponent(encodedUrl));
    } catch {
      setDecodedUrl('Invalid URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(decodedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Enter encoded URL here..."
          className="h-48 text-base"
          value={encodedUrl}
          onChange={(e) => setEncodedUrl(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Decoded URL will appear here..."
            className="h-48 text-base"
            value={decodedUrl}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!decodedUrl}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleDecode} disabled={!encodedUrl}>
        Decode URL
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is URL Decoding?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>URL decoding, also known as Percent-decoding, is the process of translating a URL-encoded string back into its original, human-readable format. URL encoding is a mechanism for representing characters in a URL that are not in the "safe" character set. This set is limited to a small range of alphanumeric characters and a few special symbols (`-`, `_`, `.`, `~`). Any other character, such as spaces, slashes, or non-ASCII characters, must be converted into a special format to be transmitted correctly over the internet.</p>
            <p>This conversion process, known as URL encoding, replaces unsafe characters with a `%` symbol followed by a two-digit hexadecimal code. For example, a space character is encoded as `%20`. URL decoding reverses this process, taking the encoded string and converting it back to its original form. This is essential for developers, data analysts, and SEOs who need to read and interpret data passed in URLs, such as parameters from a web form or values in an analytics report.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors Requiring URL Decoding</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll encounter URL-encoded strings in various situations. Understanding when and why decoding is necessary is key:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Web Analytics:</strong> When analyzing traffic sources or campaign data, you'll often find that URLs in your analytics platform are encoded, especially if they contain query parameters with special characters.</li>
              <li><strong>API Responses:</strong> Many APIs transmit data in URLs, which requires encoding. To use this data in your application, you must first decode it.</li>
              <li><strong>Log File Analysis:</strong> Server logs often store the requested URLs in their raw, encoded format. Decoding these URLs is necessary to understand user behavior and troubleshoot issues.</li>
              <li><strong>Debugging:</strong> When debugging web applications, developers frequently need to inspect the data being passed between the client and server. Decoding URLs is a common step in this process.</li>
              <li><strong>Copying and Pasting URLs:</strong> Sometimes, when you copy a URL from your browser's address bar, it may be partially or fully encoded. Decoding it can make it more readable and easier to share.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of URL Decoding</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The process of URL decoding is based on a simple substitution mechanism defined by the URL specification (RFC 3986). The key components are:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>The Percent Sign (`%`):</strong> This character acts as an escape character, signaling that the following two characters are a hexadecimal representation of a character code.</li>
              <li><strong>Hexadecimal Digits:</strong> The two characters immediately following the percent sign represent a number in base-16. These digits can range from `00` to `FF`.</li>
              <li><strong>Character Mapping:</strong> The decoding process involves taking each percent-encoded sequence (e.g., `%20`), converting the hexadecimal value to its corresponding ASCII or UTF-8 character (a space in this case), and replacing the sequence with that character.</li>
            </ul>
            <p>For example, the encoded string `Hello%20World%21` would be decoded to `Hello World!`.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our URL Decode Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool provides a quick and hassle-free way to decode any URL-encoded string. Here’s how it works:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste the Encoded URL:</strong> In the first text area, paste the full URL or string that you want to decode.</li>
              <li><strong>Click to Decode:</strong> Press the "Decode URL" button. Our tool will instantly process the string and apply the decoding logic.</li>
              <li><strong>Get the Decoded Result:</strong> The decoded, human-readable URL or string will appear in the second text area, ready for you to copy and use.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Why do URLs need to be encoded in the first place?</h3>
              <p className="text-muted-foreground mt-1">URLs can only be transmitted over the internet using a limited set of characters. Characters like spaces, question marks, and ampersands have special meanings in a URL's structure. Encoding ensures that these characters are transmitted as data rather than being misinterpreted as part of the URL's structure, which would break the link.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is there a difference between `decodeURI()` and `decodeURIComponent()`?</h3>
              <p className="text-muted-foreground mt-1">Yes. In JavaScript, `decodeURI()` is used to decode a full URI and will not decode characters that have a special meaning in a URL (like `&`, `=`, `?`). `decodeURIComponent()`, which our tool uses, is designed to decode a component of a URI (like a query parameter) and will decode all encoded characters. `decodeURIComponent()` is generally what you need when decoding a specific piece of data.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can decoding a URL be a security risk?</h3>
              <p className="text-muted-foreground mt-1">Yes, in some contexts. Attackers can use URL encoding to obfuscate malicious code in a URL. When a server-side script decodes and uses this data without proper validation, it can lead to vulnerabilities like Cross-Site Scripting (XSS). Always sanitize and validate any decoded data before using it in your application.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The space character is one of the most commonly encoded characters (`%20`). However, in the context of HTML form submissions, a space is sometimes encoded as a plus sign (`+`). This is a holdover from a very early version of the URL encoding specification. Modern standards use `%20`, but you'll still see the `+` sign for spaces in the wild, especially in query strings.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default UrlDecodeTool;
