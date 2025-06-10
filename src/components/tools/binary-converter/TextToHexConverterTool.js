import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const TextToHexConverterTool = () => {
    const [textInput, setTextInput] = useState('');
    const [hexResult, setHexResult] = useState('');
    const convertTextToHex = () => {
        const hex = textInput
            .split('')
            .map(char => char.charCodeAt(0).toString(16).toUpperCase())
            .join(' ');
        setHexResult(hex);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Text to HEX Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Textarea, { placeholder: "Enter text here...", value: textInput, onChange: e => setTextInput(e.target.value) }), _jsx(Button, { onClick: convertTextToHex, children: "Convert" }), _jsx(Textarea, { placeholder: "HEX result...", value: hexResult, readOnly: true })] }) })] }));
};
export default TextToHexConverterTool;
