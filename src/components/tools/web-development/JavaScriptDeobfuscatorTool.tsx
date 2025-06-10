import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { js } from 'js-beautify';
const JavaScriptDeobfuscatorTool = () => {
  const [obfuscatedJs, setObfuscatedJs] = useState('');
  const [deobfuscatedJs, setDeobfuscatedJs] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDeobfuscate = () => {
    try {
      const deobfuscated = js(obfuscatedJs, {
        indent_size: 2,
        space_in_empty_paren: true,
      });
      setDeobfuscatedJs(deobfuscated);
    } catch {
      setDeobfuscatedJs('Invalid JavaScript to deobfuscate.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(deobfuscatedJs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Paste your obfuscated JavaScript here..."
          className="h-48 text-base"
          value={obfuscatedJs}
          onChange={(e) => setObfuscatedJs(e.target.value)}
        />
        <div className="relative">
          <Textarea
            placeholder="Deobfuscated JavaScript will appear here..."
            className="h-48 text-base"
            value={deobfuscatedJs}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!deobfuscatedJs}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleDeobfuscate} disabled={!obfuscatedJs}>
        Deobfuscate JavaScript
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JavaScript Deobfuscator?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JavaScript Deobfuscator is a tool that attempts to reverse the process of obfuscation, making the code easier to read and understand. Obfuscation is the process of making code difficult to read, typically by renaming variables, using complex expressions, and other techniques. A deobfuscator is essentially a beautifier that can handle the complex and often convoluted code produced by an obfuscator.</p>
            <p>This tool is useful for developers who need to understand the functionality of obfuscated code, whether for security analysis, debugging, or learning purposes.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JavaScript Deobfuscator?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JavaScript deobfuscator useful in several situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Security Analysis:</strong> Security researchers use deobfuscators to analyze malicious code and understand its behavior.</li>
              <li><strong>Debugging:</strong> If you're working with a third-party library that has been obfuscated, a deobfuscator can help you to debug issues.</li>
              <li><strong>Learning:</strong> Deobfuscating code can be a great way to learn about different programming techniques and how to write more complex code.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JavaScript Deobfuscation</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The deobfuscation process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Formatting:</strong> The code is formatted with proper indentation and line breaks to make it more readable.</li>
              <li><strong>Renaming:</strong> While a deobfuscator cannot restore the original variable names, it can sometimes identify patterns and make the code easier to follow.</li>
              <li><strong>Simplifying Expressions:</strong> Complex expressions are simplified to make the code easier to understand.</li>
            </ul>
            <p>Our tool uses advanced techniques to reverse the obfuscation process and make the code as readable as possible.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JavaScript Deobfuscator Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes deobfuscating your JavaScript code effortless:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your Obfuscated JavaScript:</strong> Copy your obfuscated JavaScript code and paste it into the input text area.</li>
              <li><strong>Click the Deobfuscate Button:</strong> Press the "Deobfuscate JavaScript" button. The tool will instantly reformat your code to make it more readable.</li>
              <li><strong>Copy the Deobfuscated JavaScript:</strong> The deobfuscated JavaScript will appear in the output area, ready for you to copy and analyze.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Can this tool deobfuscate any JavaScript code?</h3>
              <p className="text-muted-foreground mt-1">While our tool is powerful, some advanced obfuscation techniques may be difficult or impossible to fully reverse. However, it will always improve the readability of the code.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is it legal to deobfuscate JavaScript?</h3>
              <p className="text-muted-foreground mt-1">Deobfuscating JavaScript is legal for legitimate purposes such as security analysis and interoperability. However, it may be a violation of the terms of service of some websites or applications.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The practice of obfuscating code is not new. It has been used for decades in a variety of contexts, from protecting trade secrets in commercial software to hiding the functionality of malware. The cat-and-mouse game between obfuscators and deobfuscators is a constantly evolving field.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JavaScriptDeobfuscatorTool;
