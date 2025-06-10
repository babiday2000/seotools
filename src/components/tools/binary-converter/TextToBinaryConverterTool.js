import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const TextToBinaryConverterTool = () => {
    const [inputText, setInputText] = useState('');
    const [binaryResult, setBinaryResult] = useState('');
    const convertTextToBinary = () => {
        const binary = inputText
            .split('')
            .map(char => {
            const binaryChar = char.charCodeAt(0).toString(2);
            return '0'.repeat(8 - binaryChar.length) + binaryChar;
        })
            .join(' ');
        setBinaryResult(binary);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Text to Binary Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Textarea, { placeholder: "Enter text here...", value: inputText, onChange: e => setInputText(e.target.value) }), _jsx(Button, { onClick: convertTextToBinary, children: "Convert" }), _jsx(Textarea, { placeholder: "Binary result...", value: binaryResult, readOnly: true })] }) })] }));
};
export default TextToBinaryConverterTool;
