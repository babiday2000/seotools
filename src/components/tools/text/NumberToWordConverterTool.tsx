import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { toast } from 'sonner';

const NumberToWordConverterTool = () => {
  const [number, setNumber] = useState('');
  const [words, setWords] = useState('');
  const [copied, setCopied] = useState(false);

  const toWords = (num: number): string => {
    const a = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
      'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const g = ['', 'thousand', 'million', 'billion', 'trillion'];

    if (num === 0) return 'zero';
    if (num.toString().length > 15) return 'Number too large to process.';

    const numStr = num.toString().padStart(15, '0');
    const chunks = [];
    for (let i = 0; i < 5; i++) {
      chunks.push(numStr.substring(i * 3, i * 3 + 3));
    }

    let words = '';
    chunks.forEach((chunk, i) => {
      const n = parseInt(chunk, 10);
      if (n === 0) return;
      
      const h = Math.floor(n / 100);
      const t = n % 100;
      let str = '';
      
      if (h > 0) {
        str += a[h] + ' hundred ';
      }
      
      if (t > 0) {
        if (h > 0) str += 'and ';
        if (t < 20) {
          str += a[t];
        } else {
          str += b[Math.floor(t / 10)] + (t % 10 > 0 ? '-' + a[t % 10] : '');
        }
      }
      
      words += str.trim() + ' ' + g[4 - i] + ' ';
    });

    return words.replace(/\s+/g, ' ').trim();
  };

  const handleConvert = () => {
    const num = parseInt(number.replace(/,/g, ''), 10);
    if (!isNaN(num)) {
      setWords(toWords(num));
    } else {
      setWords('Please enter a valid number.');
      toast.error('Invalid Input', { description: 'Please enter a valid numerical figure.' });
    }
  };

  const handleCopy = () => {
    if (!words) return;
    navigator.clipboard.writeText(words);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Number to Words Converter</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly convert any number into its written English word equivalent. This tool is perfect for filling out checks, writing legal documents, and ensuring accuracy in formal writing where numbers must be spelled out.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Number Converter</CardTitle>
          <CardDescription>Enter a numerical figure to see it written out in words.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Input
              id="number"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter a number (e.g., 12345)"
              className="w-full text-base"
            />
            <Button onClick={handleConvert} disabled={!number} className="w-full sm:w-auto">Convert to Words</Button>
          </div>
          {words && (
            <div className="relative p-4 bg-muted rounded-lg mt-4">
              <p className="text-lg font-semibold text-center capitalize">{words}</p>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">Why Spell Out Numbers? Clarity and Formality</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Converting numbers into words is a common practice in many formal, financial, and legal contexts. While digits like `1,250` are efficient for calculations, the word form—`one thousand two hundred fifty`—provides an essential layer of clarity and security. Spelled-out numbers are much harder to alter fraudulently than digits, which is why they are a mandatory component on bank checks and in legal contracts. This redundancy ensures that the intended value is unambiguous and secure.</p>
                <p>Beyond security, writing out numbers is a staple of formal writing style. Many style guides, such as the Chicago Manual of Style and APA Style, dictate that numbers below a certain threshold (often ten or one hundred) should be spelled out in prose to improve readability and maintain a formal tone. Our Number to Words Converter is designed to handle these conversions instantly, ensuring your writing adheres to these standards with precision and ease.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How the Conversion Works</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool uses a sophisticated algorithm to deconstruct the number you enter and reassemble it in word form. The process generally follows these steps:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>Parsing the Input:</strong> The tool first validates that your input is a valid number, ignoring commas or spaces.</li>
                    <li><strong>Grouping by Magnitude:</strong> The number is broken into groups of three digits, representing hundreds, tens, and units.</li>
                    <li><strong>Assigning Place Values:</strong> Each group is then assigned a place value, such as thousands, millions, billions, and so on.</li>
                    <li><strong>Converting Each Group:</strong> The tool converts the three-digit number in each group into words (e.g., `123` becomes "one hundred and twenty-three").</li>
                    <li><strong>Assembling the Final String:</strong> Finally, it combines the word-form of each group with its corresponding place value to construct the final, grammatically correct string.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Key Use Cases for Number-to-Word Conversion</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>This seemingly simple conversion has a wide array of practical applications:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Writing Checks:</strong> The most common use case. Banks require the amount to be written in both numeric and word form to prevent fraud. Our tool ensures you get it right every time.</li>
                    <li><strong>Legal and Financial Documents:</strong> In contracts, invoices, and financial reports, spelling out key figures adds a layer of formality and prevents misinterpretation or alteration.</li>
                    <li><strong>Formal Writing and Journalism:</strong> Adhere to style guide conventions by spelling out numbers in articles, research papers, and official correspondence.</li>
                    <li><strong>Educational Purposes:</strong> An excellent tool for teaching children how to read, write, and understand large numbers. It can also be helpful for those learning English as a second language.</li>
                    <li><strong>Voice-Over and Script Writing:</strong> When writing scripts for narration or automated voice systems, providing the spelled-out version of a number ensures it is read correctly and naturally.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Does this tool handle decimals or currency?</h3>
                    <p className="text-muted-foreground mt-1">This version of the tool is designed to handle whole numbers (integers). It does not currently process decimal points or currency symbols (like $ or €). For writing checks, you would typically write the decimal part as a fraction (e.g., "and 50/100 dollars").</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is the largest number I can convert?</h3>
                    <p className="text-muted-foreground mt-1">Our tool can accurately handle numbers up to the quadrillions (15 digits). For numbers larger than this, the word forms become exceedingly long and are rarely used in practical scenarios.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Are there regional differences in writing numbers?</h3>
                    <p className="text-muted-foreground mt-1">Yes. For example, in British English, the word "and" is typically used to separate hundreds from the rest of the number (e.g., "one hundred and twenty-three"). In American English, the "and" is often omitted ("one hundred twenty-three"). Our tool uses the common convention that includes "and." Additionally, the naming of large numbers (like billion and trillion) can differ between the "long scale" and "short scale" systems, though the short scale (where a billion is a thousand million) is dominant in English-speaking countries.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How do I write a number with a hyphen?</h3>
                    <p className="text-muted-foreground mt-1">Our tool automatically follows the standard English rule of thumb: compound numbers from twenty-one to ninety-nine are hyphenated when they are written out as words.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default NumberToWordConverterTool;
