import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
const WordToNumberConverterTool = () => {
    const [words, setWords] = useState('');
    const [number, setNumber] = useState('');
    const handleConvert = () => {
        setNumber(wordsToNumbers(words).toString());
    };
    // A simple implementation of words to numbers converter
    const wordsToNumbers = (text) => {
        const a = {
            'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
            'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15, 'sixteen': 16,
            'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
            'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90
        };
        const m = { 'hundred': 100, 'thousand': 1000, 'lakh': 100000, 'crore': 10000000 };
        let n = 0, g = 0;
        text.split(/[\s-]+/).forEach((w) => {
            const x = a[w.toLowerCase()];
            if (x != null) {
                g += x;
            }
            else if (w.toLowerCase() !== 'and') {
                const y = m[w.toLowerCase()];
                if (y != null) {
                    g *= y;
                    n += g;
                    g = 0;
                }
            }
        });
        return n + g;
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Label, { htmlFor: "words", children: "Words:" }), _jsx(Input, { id: "words", value: words, onChange: (e) => setWords(e.target.value), className: "w-full" }), _jsx(Button, { onClick: handleConvert, disabled: !words, children: "Convert" })] }), number && (_jsx("div", { className: "p-4 bg-muted rounded-lg", children: _jsx("p", { className: "text-lg font-semibold", children: number }) })), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-2xl font-bold", children: "About the Word to Number Converter" }), _jsx("p", { children: "The Word to Number Converter is the perfect companion to our Number to Word tool. It allows you to take a number written out in words (e.g., \"one hundred and twenty-three\") and convert it back into its numerical form (123)." }), _jsx("h3", { className: "text-xl font-semibold", children: "How Does It Work?" }), _jsx("p", { children: "Simply type or paste the number in word form into the input field and click \"Convert.\" The tool will parse the words and output the corresponding numerical value. It's designed to understand standard English number words." }), _jsx("h3", { className: "text-xl font-semibold", children: "Use Cases and Benefits" }), _jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Data Entry:" }), " Quickly convert numbers from written documents into a numerical format for spreadsheets or databases."] }), _jsxs("li", { children: [_jsx("strong", { children: "Financial Analysis:" }), " Convert numbers from reports or articles into a format that can be used in calculations."] }), _jsxs("li", { children: [_jsx("strong", { children: "General Convenience:" }), " A quick and easy way to convert any number in word form without having to do it manually."] }), _jsxs("li", { children: [_jsx("strong", { children: "Educational Tool:" }), " Helps students practice reading numbers in word form and understanding their numerical value."] })] }), _jsx("h3", { className: "text-xl font-semibold", children: "Example in Action" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Words:" }), " one thousand two hundred thirty-four"] }), _jsxs("p", { children: [_jsx("strong", { children: "Number:" }), " 1234"] })] }), _jsx("h3", { className: "text-xl font-semibold", children: "Limitations" }), _jsx("p", { children: "This tool is designed to work with standard English number words. It may not correctly interpret very large numbers, complex phrasing, or regional variations. For best results, use clear and standard number words." })] })] }));
};
export default WordToNumberConverterTool;
