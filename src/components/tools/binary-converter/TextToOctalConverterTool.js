import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const TextToOctalConverterTool = () => {
    const [textInput, setTextInput] = useState('');
    const [octalResult, setOctalResult] = useState('');
    const convertTextToOctal = () => {
        const octal = textInput
            .split('')
            .map(char => char.charCodeAt(0).toString(8))
            .join(' ');
        setOctalResult(octal);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Text to Octal Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Textarea, { placeholder: "Enter text here...", value: textInput, onChange: e => setTextInput(e.target.value) }), _jsx(Button, { onClick: convertTextToOctal, children: "Convert" }), _jsx(Textarea, { placeholder: "Octal result...", value: octalResult, readOnly: true })] }) })] }));
};
export default TextToOctalConverterTool;
