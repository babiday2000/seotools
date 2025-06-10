import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const AsciiToTextConverterTool = () => {
    const [asciiInput, setAsciiInput] = useState('');
    const [textResult, setTextResult] = useState('');
    const convertAsciiToText = () => {
        const text = asciiInput
            .split(' ')
            .map(asciiCode => String.fromCharCode(parseInt(asciiCode, 10)))
            .join('');
        setTextResult(text);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "ASCII to Text Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Textarea, { placeholder: "Enter ASCII codes here...", value: asciiInput, onChange: e => setAsciiInput(e.target.value) }), _jsx(Button, { onClick: convertAsciiToText, children: "Convert" }), _jsx(Textarea, { placeholder: "Text result...", value: textResult, readOnly: true })] }) })] }));
};
export default AsciiToTextConverterTool;
