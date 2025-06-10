import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const HexToTextConverterTool = () => {
    const [hexInput, setHexInput] = useState('');
    const [textResult, setTextResult] = useState('');
    const convertHexToText = () => {
        const text = hexInput
            .split(' ')
            .map(hexCode => String.fromCharCode(parseInt(hexCode, 16)))
            .join('');
        setTextResult(text);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "HEX to Text Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Textarea, { placeholder: "Enter HEX codes here...", value: hexInput, onChange: e => setHexInput(e.target.value) }), _jsx(Button, { onClick: convertHexToText, children: "Convert" }), _jsx(Textarea, { placeholder: "Text result...", value: textResult, readOnly: true })] }) })] }));
};
export default HexToTextConverterTool;
