import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const OctalToTextConverterTool = () => {
    const [octalInput, setOctalInput] = useState('');
    const [textResult, setTextResult] = useState('');
    const convertOctalToText = () => {
        const text = octalInput
            .split(' ')
            .map(octalCode => String.fromCharCode(parseInt(octalCode, 8)))
            .join('');
        setTextResult(text);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Octal to Text Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Textarea, { placeholder: "Enter octal codes here...", value: octalInput, onChange: e => setOctalInput(e.target.value) }), _jsx(Button, { onClick: convertOctalToText, children: "Convert" }), _jsx(Textarea, { placeholder: "Text result...", value: textResult, readOnly: true })] }) })] }));
};
export default OctalToTextConverterTool;
