import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { minify } from 'terser';
const JavaScriptMinifierTool = () => {
  const [prettyJs, setPrettyJs] = useState('');
  const [minifiedJs, setMinifiedJs] = useState('');
  const [copied, setCopied] = useState(false);

  const handleMinify = async () => {
    try {
      const result = await minify(prettyJs, {
        mangle: {
          toplevel: true,
        },
        compress: {
          drop_console: true,
        },
      });
      setMinifiedJs(result.code || '');
    } catch {
      setMinifiedJs('Invalid JavaScript to minify.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedJs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Paste your JavaScript here..."
          className="h-48 text-base"
          value={prettyJs}
          onChange={(e) => setPrettyJs(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Minified JavaScript will appear here..."
            className="h-48 text-base"
            value={minifiedJs}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!minifiedJs}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleMinify} disabled={!prettyJs}>
        Minify JavaScript
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JavaScript Minifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JavaScript Minifier is a tool that removes all unnecessary characters from JavaScript code without changing its functionality. This includes removing whitespace, comments, and other non-essential characters, as well as shortening variable and function names. The goal of minification is to reduce the file size of the JavaScript document, which leads to faster page load times. This is a crucial optimization technique for any website, as page speed is a key factor in both user experience and search engine rankings.</p>
            <p>By making your JavaScript files smaller, you reduce the amount of data that needs to be transferred from the server to the user's browser, resulting in a quicker and more efficient website.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JavaScript Minifier?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Minifying your JavaScript is a best practice for web performance optimization:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Faster Page Loads:</strong> Smaller file sizes mean faster downloads, which directly improves the user experience and can lead to higher engagement and conversion rates.</li>
              <li><strong>Improved SEO:</strong> Search engines like Google use page speed as a ranking factor. Faster sites are more likely to rank higher in search results.</li>
              <li><strong>Reduced Bandwidth Costs:</strong> By reducing the size of your files, you reduce the amount of bandwidth your server uses, which can lead to lower hosting costs.</li>
              <li><strong>Optimized for Production:</strong> Minification is a standard step in the build process for modern web applications, ensuring that the code served to users is as lightweight as possible.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JavaScript Minification</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The minification process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Removing Whitespace:</strong> All unnecessary spaces, tabs, and line breaks are removed.</li>
              <li><strong>Removing Comments:</strong> JavaScript comments are stripped out as they are not needed for the page to render.</li>
              <li><strong>Shortening Variable Names:</strong> Variable and function names are shortened to single characters where possible.</li>
              <li><strong>Removing Dead Code:</strong> Unreachable code is removed.</li>
            </ul>
            <p>Our tool applies these and other advanced techniques to achieve the smallest possible file size without breaking your code.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JavaScript Minifier Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes minifying your JavaScript code simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JavaScript:</strong> Copy your well-formatted JavaScript code and paste it into the input text area.</li>
              <li><strong>Click the Minify Button:</strong> Press the "Minify JavaScript" button. The tool will instantly process your code and remove all unnecessary characters.</li>
              <li><strong>Copy the Minified JavaScript:</strong> The compact, minified JavaScript will appear in the output area, ready for you to use in your production environment.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Will minifying my JavaScript break my website?</h3>
              <p className="text-muted-foreground mt-1">No. Our minifier is designed to be safe and will not change the functionality of your code. It only removes characters that are not required for the browser to render the page correctly. However, it's always a good practice to test your website after minification.</p>
            </div>
            <div>
              <h3 className="font-semibold">What's the difference between minification and obfuscation?</h3>
              <p className="text-muted-foreground mt-1">Minification is the process of removing unnecessary characters from the code itself. Obfuscation is the process of making the code difficult to understand, which can help to protect it from theft and reverse engineering. Minification is a side effect of obfuscation, but the primary goal of obfuscation is to make the code unreadable, not just smaller.</p>
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
            <p>The term "minification" was popularized by Douglas Crockford, a key figure in the development of JavaScript. He created the JSMin tool in 2001, which was one of the first widely used JavaScript minifiers. The tool was so effective that it became a standard part of the web development workflow for many developers.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JavaScriptMinifierTool;
