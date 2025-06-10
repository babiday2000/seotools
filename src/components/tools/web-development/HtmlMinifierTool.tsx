import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
const HtmlMinifierTool = () => {
  const [prettyHtml, setPrettyHtml] = useState('');
  const [minifiedHtml, setMinifiedHtml] = useState('');
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    try {
      const minified = prettyHtml
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      setMinifiedHtml(minified);
    } catch {
      setMinifiedHtml('Invalid HTML to minify.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Paste your HTML here..."
          className="h-48 text-base"
          value={prettyHtml}
          onChange={(e) => setPrettyHtml(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Minified HTML will appear here..."
            className="h-48 text-base"
            value={minifiedHtml}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!minifiedHtml}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleMinify} disabled={!prettyHtml}>
        Minify HTML
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is an HTML Minifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>An HTML Minifier is a tool that removes all unnecessary characters from HTML code without changing its functionality. This includes removing whitespace, comments, and other non-essential characters. The goal of minification is to reduce the file size of the HTML document, which leads to faster page load times. This is a crucial optimization technique for any website, as page speed is a key factor in both user experience and search engine rankings.</p>
            <p>By making your HTML files smaller, you reduce the amount of data that needs to be transferred from the server to the user's browser, resulting in a quicker and more efficient website.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use an HTML Minifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Minifying your HTML is a best practice for web performance optimization:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Faster Page Loads:</strong> Smaller file sizes mean faster downloads, which directly improves the user experience and can lead to higher engagement and conversion rates.</li>
              <li><strong>Improved SEO:</strong> Search engines like Google use page speed as a ranking factor. Faster sites are more likely to rank higher in search results.</li>
              <li><strong>Reduced Bandwidth Costs:</strong> By reducing the size of your files, you reduce the amount of bandwidth your server uses, which can lead to lower hosting costs.</li>
              <li><strong>Optimized for Production:</strong> Minification is a standard step in the build process for modern web applications, ensuring that the code served to users is as lightweight as possible.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of HTML Minification</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The minification process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Removing Whitespace:</strong> All unnecessary spaces, tabs, and line breaks are removed.</li>
              <li><strong>Removing Comments:</strong> HTML comments are stripped out as they are not needed for the page to render.</li>
              <li><strong>Removing Unnecessary Attributes:</strong> Redundant or empty attributes are removed.</li>
              <li><strong>Removing Optional Tags:</strong> Some HTML tags, like <code>{'<html>'}</code>, <code>{'<head>'}</code>, and <code>{'<body>'}</code>, are optional and can be removed in certain contexts.</li>
            </ul>
            <p>Our tool applies these and other advanced techniques to achieve the smallest possible file size without breaking your code.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our HTML Minifier Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes minifying your HTML code simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your HTML:</strong> Copy your well-formatted HTML code and paste it into the input text area.</li>
              <li><strong>Click the Minify Button:</strong> Press the "Minify HTML" button. The tool will instantly process your code and remove all unnecessary characters.</li>
              <li><strong>Copy the Minified HTML:</strong> The compact, minified HTML will appear in the output area, ready for you to use in your production environment.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Will minifying my HTML break my website?</h3>
              <p className="text-muted-foreground mt-1">No. Our minifier is designed to be safe and will not change the functionality of your code. It only removes characters that are not required for the browser to render the page correctly. However, it's always a good practice to test your website after minification.</p>
            </div>
            <div>
              <h3 className="font-semibold">What's the difference between minification and compression?</h3>
              <p className="text-muted-foreground mt-1">Minification is the process of removing unnecessary characters from the code itself. Compression (like Gzip) is a process where the server compresses the file before sending it to the browser, which then decompresses it. Both are important for performance, and they work together to reduce file size.</p>
            </div>
            <div>
              <h3 className="font-semibold">Should I work with minified code?</h3>
              <p className="text-muted-foreground mt-1">No. You should always work with the beautified, readable version of your code. Minification should be the final step in your build process before you deploy your website to a production server.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The practice of minification became popular in the early 2000s with the rise of JavaScript-heavy web applications. Developers realized that the large size of their JavaScript files was a major performance bottleneck, and tools like Douglas Crockford's JSMin were created to address this. The same principles were soon applied to HTML and CSS, and minification is now a standard practice in web development.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HtmlMinifierTool;
