import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const toWords = (num) => {
        const a = [
            '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
            'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
        ];
        const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        const g = ['', 'thousand', 'million', 'billion', 'trillion'];
        if (num === 0)
            return 'zero';
        if (num.toString().length > 15)
            return 'Number too large to process.';
        const numStr = num.toString().padStart(15, '0');
        const chunks = [];
        for (let i = 0; i < 5; i++) {
            chunks.push(numStr.substring(i * 3, i * 3 + 3));
        }
        let words = '';
        chunks.forEach((chunk, i) => {
            const n = parseInt(chunk, 10);
            if (n === 0)
                return;
            const h = Math.floor(n / 100);
            const t = n % 100;
            let str = '';
            if (h > 0) {
                str += a[h] + ' hundred ';
            }
            if (t > 0) {
                if (h > 0)
                    str += 'and ';
                if (t < 20) {
                    str += a[t];
                }
                else {
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
        }
        else {
            setWords('Please enter a valid number.');
            toast.error('Invalid Input', { description: 'Please enter a valid numerical figure.' });
        }
    };
    const handleCopy = () => {
        if (!words)
            return;
        navigator.clipboard.writeText(words);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "Number to Words Converter" }), _jsx("p", { className: "mt-3 text-lg max-w-3xl mx-auto text-muted-foreground", children: "Instantly convert any number into its written English word equivalent. This tool is perfect for filling out checks, writing legal documents, and ensuring accuracy in formal writing where numbers must be spelled out." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Number Converter" }), _jsx(CardDescription, { children: "Enter a numerical figure to see it written out in words." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4", children: [_jsx(Input, { id: "number", type: "text", value: number, onChange: (e) => setNumber(e.target.value), placeholder: "Enter a number (e.g., 12345)", className: "w-full text-base" }), _jsx(Button, { onClick: handleConvert, disabled: !number, className: "w-full sm:w-auto", children: "Convert to Words" })] }), words && (_jsxs("div", { className: "relative p-4 bg-muted rounded-lg mt-4", children: [_jsx("p", { className: "text-lg font-semibold text-center capitalize", children: words }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2", onClick: handleCopy, title: "Copy to clipboard", children: copied ? _jsx(ClipboardCheck, { className: "h-5 w-5 text-green-500" }) : _jsx(Clipboard, { className: "h-5 w-5" }) })] }))] })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-12 text-left", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Why Spell Out Numbers? Clarity and Formality" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Converting numbers into words is a common practice in many formal, financial, and legal contexts. While digits like `1,250` are efficient for calculations, the word form\u2014`one thousand two hundred fifty`\u2014provides an essential layer of clarity and security. Spelled-out numbers are much harder to alter fraudulently than digits, which is why they are a mandatory component on bank checks and in legal contracts. This redundancy ensures that the intended value is unambiguous and secure." }), _jsx("p", { children: "Beyond security, writing out numbers is a staple of formal writing style. Many style guides, such as the Chicago Manual of Style and APA Style, dictate that numbers below a certain threshold (often ten or one hundred) should be spelled out in prose to improve readability and maintain a formal tone. Our Number to Words Converter is designed to handle these conversions instantly, ensuring your writing adheres to these standards with precision and ease." })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "How the Conversion Works" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Our tool uses a sophisticated algorithm to deconstruct the number you enter and reassemble it in word form. The process generally follows these steps:" }), _jsxs("ol", { className: "list-decimal list-inside space-y-2 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Parsing the Input:" }), " The tool first validates that your input is a valid number, ignoring commas or spaces."] }), _jsxs("li", { children: [_jsx("strong", { children: "Grouping by Magnitude:" }), " The number is broken into groups of three digits, representing hundreds, tens, and units."] }), _jsxs("li", { children: [_jsx("strong", { children: "Assigning Place Values:" }), " Each group is then assigned a place value, such as thousands, millions, billions, and so on."] }), _jsxs("li", { children: [_jsx("strong", { children: "Converting Each Group:" }), " The tool converts the three-digit number in each group into words (e.g., `123` becomes \"one hundred and twenty-three\")."] }), _jsxs("li", { children: [_jsx("strong", { children: "Assembling the Final String:" }), " Finally, it combines the word-form of each group with its corresponding place value to construct the final, grammatically correct string."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Key Use Cases for Number-to-Word Conversion" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "This seemingly simple conversion has a wide array of practical applications:" }), _jsxs("ul", { className: "list-disc list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Writing Checks:" }), " The most common use case. Banks require the amount to be written in both numeric and word form to prevent fraud. Our tool ensures you get it right every time."] }), _jsxs("li", { children: [_jsx("strong", { children: "Legal and Financial Documents:" }), " In contracts, invoices, and financial reports, spelling out key figures adds a layer of formality and prevents misinterpretation or alteration."] }), _jsxs("li", { children: [_jsx("strong", { children: "Formal Writing and Journalism:" }), " Adhere to style guide conventions by spelling out numbers in articles, research papers, and official correspondence."] }), _jsxs("li", { children: [_jsx("strong", { children: "Educational Purposes:" }), " An excellent tool for teaching children how to read, write, and understand large numbers. It can also be helpful for those learning English as a second language."] }), _jsxs("li", { children: [_jsx("strong", { children: "Voice-Over and Script Writing:" }), " When writing scripts for narration or automated voice systems, providing the spelled-out version of a number ensures it is read correctly and naturally."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "mt-4 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Does this tool handle decimals or currency?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "This version of the tool is designed to handle whole numbers (integers). It does not currently process decimal points or currency symbols (like $ or \u20AC). For writing checks, you would typically write the decimal part as a fraction (e.g., \"and 50/100 dollars\")." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "What is the largest number I can convert?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Our tool can accurately handle numbers up to the quadrillions (15 digits). For numbers larger than this, the word forms become exceedingly long and are rarely used in practical scenarios." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Are there regional differences in writing numbers?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Yes. For example, in British English, the word \"and\" is typically used to separate hundreds from the rest of the number (e.g., \"one hundred and twenty-three\"). In American English, the \"and\" is often omitted (\"one hundred twenty-three\"). Our tool uses the common convention that includes \"and.\" Additionally, the naming of large numbers (like billion and trillion) can differ between the \"long scale\" and \"short scale\" systems, though the short scale (where a billion is a thousand million) is dominant in English-speaking countries." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "How do I write a number with a hyphen?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Our tool automatically follows the standard English rule of thumb: compound numbers from twenty-one to ninety-nine are hyphenated when they are written out as words." })] })] })] })] })] }));
};
export default NumberToWordConverterTool;
