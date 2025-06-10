import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const DecimalToTextConverterTool = () => {
    const [decimalInput, setDecimalInput] = useState('');
    const [textResult, setTextResult] = useState('');
    const convertDecimalToText = () => {
        try {
            const text = decimalInput
                .split(' ')
                .filter(code => code.trim() !== '')
                .map(code => String.fromCharCode(parseInt(code, 10)))
                .join('');
            setTextResult(text);
        }
        catch {
            setTextResult('Invalid decimal input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Decimal to Text Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Textarea, { placeholder: "Enter decimal codes here...", value: decimalInput, onChange: e => setDecimalInput(e.target.value) }), _jsx(Button, { onClick: convertDecimalToText, children: "Convert" }), _jsx(Textarea, { placeholder: "Text result...", value: textResult, readOnly: true })] }) })] }));
};
export default DecimalToTextConverterTool;
