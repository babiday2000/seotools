import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const DecimalToBinaryConverterTool = () => {
    const [decimalInput, setDecimalInput] = useState('');
    const [binaryResult, setBinaryResult] = useState('');
    const convertDecimalToBinary = () => {
        const decimal = parseInt(decimalInput, 10);
        if (!isNaN(decimal)) {
            setBinaryResult(decimal.toString(2));
        }
        else {
            setBinaryResult('Invalid decimal input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Decimal to Binary Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter decimal here...", value: decimalInput, onChange: e => setDecimalInput(e.target.value), type: "number" }), _jsx(Button, { onClick: convertDecimalToBinary, children: "Convert" }), _jsx(Input, { placeholder: "Binary result...", value: binaryResult, readOnly: true })] }) })] }));
};
export default DecimalToBinaryConverterTool;
