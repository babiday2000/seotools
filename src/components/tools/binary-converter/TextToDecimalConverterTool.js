import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const TextToDecimalConverterTool = () => {
    const [textInput, setTextInput] = useState('');
    const [decimalResult, setDecimalResult] = useState('');
    const convertTextToDecimal = () => {
        const decimal = textInput
            .split('')
            .map(char => char.charCodeAt(0))
            .join(' ');
        setDecimalResult(decimal);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Text to Decimal Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Textarea, { placeholder: "Enter text here...", value: textInput, onChange: e => setTextInput(e.target.value) }), _jsx(Button, { onClick: convertTextToDecimal, children: "Convert" }), _jsx(Textarea, { placeholder: "Decimal result...", value: decimalResult, readOnly: true })] }) })] }));
};
export default TextToDecimalConverterTool;
