import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const NumberToRomanConverterTool = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const toRoman = (num) => {
        if (num < 1 || num > 3999) {
            toast.error('Please enter a number between 1 and 3999.');
            return '';
        }
        const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const rom = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        let result = '';
        for (let i = 0; i < val.length; i++) {
            while (num >= val[i]) {
                result += rom[i];
                num -= val[i];
            }
        }
        return result;
    };
    const handleConvert = () => {
        const numValue = parseInt(inputValue);
        if (isNaN(numValue)) {
            toast.error('Please enter a valid number.');
            return;
        }
        const roman = toRoman(numValue);
        setResult(roman);
        if (roman) {
            toast.success('Conversion successful!');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Number to Roman Numerals" }), _jsx(CardDescription, { children: "Convert a number to Roman numerals." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [_jsx(Input, { type: "number", placeholder: "Enter a number", value: inputValue, onChange: (e) => setInputValue(e.target.value) }), _jsx(Button, { onClick: handleConvert, children: "Convert" })] }), result !== null && (_jsxs("div", { className: "pt-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Result:" }), _jsx("p", { className: "text-2xl font-bold", children: result })] }))] })] }), _jsx(ContentDisplay, { title: "What is a Number to Roman Numerals Converter?", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "A Number to Roman Numerals Converter is a practical tool designed to help you convert standard Arabic numbers into their Roman numeral equivalents. This is essential for a variety of applications, from academic and historical research to creative and decorative purposes. Whether you are a student learning about ancient Rome, a designer looking for a classic touch, or a history enthusiast, this tool provides a quick and accurate way to perform the conversion." }), _jsx("p", { children: "The primary purpose of this converter is to simplify the process of converting numbers into Roman numerals, which can be a complex and error-prone task when done manually. By providing a user-friendly interface, it allows you to get the information you need without having to memorize the rules of the Roman numeral system. This is particularly useful for large numbers, where the conversion can be quite challenging. The tool is designed to be intuitive, making it accessible to both professionals and hobbyists." })] }) }), _jsx(ContentDisplay, { title: "Key Components of a Number to Roman Numerals Converter", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "To perform accurate conversions, the Number to Roman Numerals Converter relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool." }), _jsxs("ul", { className: "list-disc space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Input Value:" }), " This is the numerical value you want to convert. You enter this number into the designated field."] }), _jsxs("li", { children: [_jsx("strong", { children: "Conversion Logic:" }), " The core of the converter is its algorithm, which is based on the rules of the Roman numeral system. The algorithm breaks down the input number into its constituent parts and then maps them to the corresponding Roman numerals. For example, the number 1994 is broken down into 1000, 900, 90, and 4, which are then converted to M, CM, XC, and IV, respectively."] })] }), _jsx("p", { children: "These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the conversion without needing to memorize the rules. The tool is designed for efficiency, providing you with the information you need in an instant." })] }) }), _jsx(ContentDisplay, { title: "How to Use the Number to Roman Numerals Converter", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "Using the Number to Roman Numerals Converter is a simple and straightforward process. Follow these steps to get your result:" }), _jsxs("ol", { className: "list-decimal space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Enter the Number:" }), " In the input field, type the number you want to convert."] }), _jsxs("li", { children: [_jsx("strong", { children: "Click \"Convert\":" }), " Press the \"Convert\" button. The tool will instantly display the Roman numeral equivalent in the result section."] })] }), _jsx("p", { children: "This tool is perfect for a wide range of applications, from academic and professional work to everyday tasks. It's a reliable and efficient way to handle all your number to Roman numeral conversion needs." })] }) }), _jsx(ContentDisplay, { title: "Frequently Asked Questions (FAQ)", content: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "What is the largest number I can convert?" }), _jsx("p", { children: "This converter is designed to handle numbers up to 3999, which is the largest number that can be represented by standard Roman numerals. For larger numbers, a different notation system would be required." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Can I convert decimal numbers?" }), _jsx("p", { children: "No, the Roman numeral system does not have a standard way of representing decimal numbers. This converter is designed to work only with positive integers." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "How accurate are the conversions?" }), _jsx("p", { children: "The conversions are based on the standard rules of the Roman numeral system, ensuring a high degree of accuracy." })] })] }) }), _jsx(ContentDisplay, { title: "Fun Fact", content: _jsx("p", { children: "Did you know that the Roman numeral system does not have a symbol for zero? The concept of zero as a number was not developed until the 7th century in India, long after the fall of the Roman Empire. The Romans had a complex system of counting and arithmetic, but they managed to do it all without the number zero. This is one of the reasons why Roman numerals are not well-suited for modern mathematics." }) })] }));
};
export default NumberToRomanConverterTool;
