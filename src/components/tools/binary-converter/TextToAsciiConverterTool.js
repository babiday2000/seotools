import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const TextToAsciiConverterTool = () => {
    const [textInput, setTextInput] = useState('');
    const [asciiResult, setAsciiResult] = useState('');
    const convertTextToAscii = () => {
        const ascii = textInput
            .split('')
            .map(char => char.charCodeAt(0))
            .join(' ');
        setAsciiResult(ascii);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Text to ASCII Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Textarea, { placeholder: "Enter text here...", value: textInput, onChange: e => setTextInput(e.target.value) }), _jsx(Button, { onClick: convertTextToAscii, children: "Convert" }), _jsx(Textarea, { placeholder: "ASCII result...", value: asciiResult, readOnly: true })] }) })] }));
};
export default TextToAsciiConverterTool;
