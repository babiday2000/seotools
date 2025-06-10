import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const DecimalToOctalConverterTool = () => {
    const [decimalInput, setDecimalInput] = useState('');
    const [octalResult, setOctalResult] = useState('');
    const convertDecimalToOctal = () => {
        const decimal = parseInt(decimalInput, 10);
        if (!isNaN(decimal)) {
            setOctalResult(decimal.toString(8));
        }
        else {
            setOctalResult('Invalid decimal input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Decimal to Octal Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter decimal here...", value: decimalInput, onChange: e => setDecimalInput(e.target.value), type: "number" }), _jsx(Button, { onClick: convertDecimalToOctal, children: "Convert" }), _jsx(Input, { placeholder: "Octal result...", value: octalResult, readOnly: true })] }) })] }));
};
export default DecimalToOctalConverterTool;
