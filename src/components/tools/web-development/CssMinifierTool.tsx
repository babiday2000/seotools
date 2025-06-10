import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
const CssMinifierTool = () => {
  const [prettyCss, setPrettyCss] = useState('');
  const [minifiedCss, setMinifiedCss] = useState('');
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    try {
      const minified = prettyCss.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([:;{}])\s*/g, '$1')
        .trim();
      setMinifiedCss(minified);
    } catch {
      setMinifiedCss('Invalid CSS to minify.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Paste your CSS here..."
          className="h-48 text-base"
          value={prettyCss}
          onChange={(e) => setPrettyCss(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Minified CSS will appear here..."
            className="h-48 text-base"
            value={minifiedCss}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!minifiedCss}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleMinify} disabled={!prettyCss}>
        Minify CSS
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a CSS Minifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A CSS Minifier is a tool that removes all unnecessary characters from CSS code without affecting its functionality. This includes removing whitespace, comments, and other non-essential characters. The goal of minification is to reduce the file size of the CSS document, which leads to faster page load times. This is a crucial optimization technique for any website, as page speed is a key factor in both user experience and search engine rankings.</p>
            <p>By making your CSS files smaller, you reduce the amount of data that needs to be transferred from the server to the user's browser, resulting in a quicker and more efficient website.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a CSS Minifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Minifying your CSS is a best practice for web performance optimization:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Faster Page Loads:</strong> Smaller file sizes mean faster downloads, which directly improves the user experience and can lead to higher engagement and conversion rates.</li>
              <li><strong>Improved SEO:</strong> Search engines like Google use page speed as a ranking factor. Faster sites are more likely to rank higher in search results.</li>
              <li><strong>Reduced Bandwidth Costs:</strong> By reducing the size of your files, you reduce the amount of bandwidth your server uses, which can lead to lower hosting costs.</li>
              <li><strong>Optimized for Production:</strong> Minification is a standard step in the build process for modern web applications, ensuring that the code served to users is as lightweight as possible.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of CSS Minification</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The minification process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Removing Whitespace:</strong> All unnecessary spaces, tabs, and line breaks are removed.</li>
              <li><strong>Removing Comments:</strong> CSS comments are stripped out as they are not needed for the page to render.</li>
              <li><strong>Removing Unnecessary Semicolons:</strong> The last semicolon in a declaration block is removed.</li>
              <li><strong>Optimizing Values:</strong> Shorthand properties are used where possible, and color values are converted to their shortest form.</li>
            </ul>
            <p>Our tool applies these and other advanced techniques to achieve the smallest possible file size without breaking your code.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our CSS Minifier Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes minifying your CSS code simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your CSS:</strong> Copy your well-formatted CSS code and paste it into the input text area.</li>
              <li><strong>Click the Minify Button:</strong> Press the "Minify CSS" button. The tool will instantly process your code and remove all unnecessary characters.</li>
              <li><strong>Copy the Minified CSS:</strong> The compact, minified CSS will appear in the output area, ready for you to use in your production environment.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Will minifying my CSS break my website?</h3>
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
            <p>The first version of CSS was proposed by Håkon Wium Lie in 1994. At the time, he was working with Tim Berners-Lee at CERN. The proposal was intended to provide a way to separate the presentation of a document from its content, a principle that is still fundamental to web development today.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CssMinifierTool;
