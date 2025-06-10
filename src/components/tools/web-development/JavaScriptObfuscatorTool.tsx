import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import JavaScriptObfuscator from 'javascript-obfuscator';
const JavaScriptObfuscatorTool = () => {
  const [prettyJs, setPrettyJs] = useState('');
  const [obfuscatedJs, setObfuscatedJs] = useState('');
  const [copied, setCopied] = useState(false);

  const handleObfuscate = () => {
    try {
      const obfuscationResult = JavaScriptObfuscator.obfuscate(prettyJs, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
        debugProtection: true,
        debugProtectionInterval: 4000,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: true,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayEncoding: ['rc4'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 5,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 5,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 1,
        transformObjectKeys: true,
        unicodeEscapeSequence: true,
      });
      setObfuscatedJs(obfuscationResult.getObfuscatedCode());
    } catch {
      setObfuscatedJs('Invalid JavaScript to obfuscate.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(obfuscatedJs);
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
            placeholder="Obfuscated JavaScript will appear here..."
            className="h-48 text-base"
            value={obfuscatedJs}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!obfuscatedJs}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleObfuscate} disabled={!prettyJs}>
        Obfuscate JavaScript
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a JavaScript Obfuscator?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A JavaScript Obfuscator is a tool that transforms your readable JavaScript code into a garbled, unreadable version that is extremely difficult for humans to understand. While the obfuscated code functions identically to the original, its logic is hidden, protecting your intellectual property from theft and reverse engineering. This is a crucial security measure for any web application that contains proprietary algorithms or sensitive business logic.</p>
            <p>By making your code a tangled mess, you can deter would-be attackers and prevent them from easily understanding and exploiting your application's inner workings.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why Use a JavaScript Obfuscator?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>You'll find a JavaScript obfuscator essential in many situations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Protecting Intellectual Property:</strong> If your JavaScript code contains proprietary algorithms or business logic, obfuscation can prevent competitors from stealing your work.</li>
              <li><strong>Preventing Piracy:</strong> For web-based games or applications, obfuscation can make it more difficult for users to cheat or create unauthorized copies.</li>
              <li><strong>Enhancing Security:</strong> By hiding the logic of your code, you can make it more difficult for attackers to find and exploit vulnerabilities.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of JavaScript Obfuscation</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The obfuscation process involves several key transformations:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Renaming Variables:</strong> Variable and function names are replaced with meaningless, short names.</li>
              <li><strong>Control Flow Flattening:</strong> The logical flow of the code is obscured by breaking it up into a series of dispatched blocks, making it difficult to follow.</li>
              <li><strong>String Encryption:</strong> Strings are encrypted and stored in an array, and are only decrypted at runtime when they are needed.</li>
              <li><strong>Dead Code Injection:</strong> Useless code is added to the program to confuse anyone trying to understand it.</li>
            </ul>
            <p>Our tool uses a powerful combination of these and other techniques to provide a high level of protection for your code.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our JavaScript Obfuscator Tool</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes obfuscating your JavaScript code simple:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Paste Your JavaScript:</strong> Copy your JavaScript code and paste it into the input text area.</li>
              <li><strong>Click the Obfuscate Button:</strong> Press the "Obfuscate JavaScript" button. The tool will instantly transform your code into a highly protected version.</li>
              <li><strong>Copy the Obfuscated JavaScript:</strong> The obfuscated JavaScript will appear in the output area, ready for you to use in your production environment.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Will obfuscating my JavaScript slow down my website?</h3>
              <p className="text-muted-foreground mt-1">Obfuscation can sometimes increase the size of your code and add a small amount of overhead, but the impact on performance is usually negligible. In some cases, it can even improve performance by making the code more difficult for the browser to parse.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is obfuscation the same as encryption?</h3>
              <p className="text-muted-foreground mt-1">No. Encryption is a two-way process that requires a key to decrypt the data. Obfuscation is a one-way process that makes the code difficult to understand, but it does not require a key to be executed.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can obfuscated code be deobfuscated?</h3>
              <p className="text-muted-foreground mt-1">While it is possible to deobfuscate code, it is a difficult and time-consuming process. A good obfuscator will make the code so complex that it is not worth the effort for most attackers to try to reverse engineer it.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The first known use of the term "obfuscate" in a computing context was in a 1986 paper by the computer scientist, David S. Touretzky. He used the term to describe a technique for making Lisp code more difficult to understand.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JavaScriptObfuscatorTool;
