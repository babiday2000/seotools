import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';

const UrlEncodeTool = () => {
  const [decodedUrl, setDecodedUrl] = useState('');
  const [encodedUrl, setEncodedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    setEncodedUrl(encodeURIComponent(decodedUrl));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(encodedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Enter URL to encode here..."
          className="h-48 text-base"
          value={decodedUrl}
          onChange={(e) => setDecodedUrl(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Encoded URL will appear here..."
            className="h-48 text-base"
            value={encodedUrl}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!encodedUrl}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleEncode} disabled={!decodedUrl}>
        Encode URL
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is URL Encoding?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>URL encoding, also known as Percent-encoding, is a fundamental mechanism for translating special characters in a Uniform Resource Identifier (URI) into a universally accepted format that can be safely transmitted over the internet. The URI specification (RFC 3986) defines a set of "unreserved" characters that can be used in a URL without modification. These include uppercase and lowercase letters, numbers, and a few special characters like hyphen (`-`), underscore (`_`), period (`.`), and tilde (`~`).</p>
            <p>Any character that is not in this unreserved set—such as spaces, question marks, ampersands, or non-ASCII characters (like `é` or `ü`)—must be encoded. The encoding process replaces the unsafe character with a percent sign (`%`) followed by its two-digit hexadecimal representation. For example, a space is encoded as `%20`. This ensures that web servers, browsers, and other web technologies can correctly interpret the URL without misinterpreting special characters as part of the URL's structure.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors Requiring URL Encoding</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>URL encoding is necessary in many common web development scenarios. Here are some key factors and situations where it's crucial:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Query Strings:</strong> When passing data through a URL's query string (the part after the `?`), values must be encoded. For example, to pass the search term "blue shoes" as a parameter, it must be encoded as `q=blue%20shoes`.</li>
              <li><strong>Special Characters in Filenames:</strong> If a filename or path segment contains spaces or other special characters, they must be encoded to form a valid URL.</li>
              <li><strong>Non-ASCII Characters:</strong> To represent international characters in a URL, they must be percent-encoded based on their UTF-8 byte representation.</li>
              <li><strong>Reserved Characters:</strong> Characters like `/`, `?`, `#`, `&`, and `=` have special meanings in a URL's structure. If you need to use these characters literally within a URL component (e.g., as part of a parameter's value), they must be encoded.</li>
              <li><strong>Form Submissions:</strong> When you submit an HTML form using the `GET` method, the browser automatically URL-encodes the form data before appending it to the URL.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of URL Encoding</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The process of URL encoding is governed by a clear set of rules. The key components are:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Unreserved Characters:</strong> `A-Z`, `a-z`, `0-9`, `-`, `_`, `.`, `~`. These characters are never encoded.</li>
              <li><strong>Reserved Characters:</strong> `!`, `#`, `$`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `/`, `:`, `;`, `=`, `?`, `@`, `[`, `]`. These characters have special meaning and must be encoded if used in a context where they are not serving their reserved purpose.</li>
              <li><strong>The Percent Sign (`%`):</strong> This is the escape character. When a character needs to be encoded, it is replaced by a `%` followed by its two-digit hexadecimal value.</li>
              <li><strong>Hexadecimal Representation:</strong> The two digits following the percent sign represent the byte value of the character in hexadecimal format (e.g., `%20` for a space, `%3F` for a question mark).</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our URL Encode Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes it easy to correctly encode any string or URL for safe use. Here’s how:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Enter the String:</strong> In the first text area, type or paste the URL, URL component, or any string you need to encode.</li>
              <li><strong>Click to Encode:</strong> Press the "Encode URL" button. Our tool will process the string and apply percent-encoding to all non-safe characters.</li>
              <li><strong>Get the Encoded Result:</strong> The fully encoded, URL-safe string will appear in the second text area, ready for you to copy and use in your links, scripts, or applications.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What's the difference between `encodeURI()` and `encodeURIComponent()`?</h3>
              <p className="text-muted-foreground mt-1">In JavaScript, `encodeURI()` is intended to encode a full URI and will not encode reserved characters that are necessary for the URL's structure (like `/`, `?`, `&`). `encodeURIComponent()`, which our tool uses, is designed to encode a component of a URI (like a search term or parameter value) and will encode those reserved characters. For most cases of encoding a piece of data to be put *inside* a URL, `encodeURIComponent()` is the correct choice.</p>
            </div>
            <div>
              <h3 className="font-semibold">Should I encode the entire URL?</h3>
              <p className="text-muted-foreground mt-1">No, you should not encode the entire URL. Encoding the protocol (`http://`) or the domain name will break the link. You should only encode the components of the URL that contain special characters, such as the query parameters or specific path segments.</p>
            </div>
            <div>
              <h3 className="font-semibold">Why is a space sometimes a `+` sign?</h3>
              <p className="text-muted-foreground mt-1">The use of a `+` to represent a space comes from an older standard used for `application/x-www-form-urlencoded` content type, which is how browsers submit form data. While the modern URI standard (RFC 3986) specifies `%20` for a space, both are still widely understood by web servers when decoding query strings.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The tilde (`~`) character was not always considered "safe." In the original URI specification (RFC 1738 from 1994), it was listed as an "unsafe" character that should be encoded as `%7E`. This was later changed in RFC 3986 (2005), which now classifies the tilde as an unreserved character that does not need to be encoded. This change reflects the evolving standards of the web.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default UrlEncodeTool;
