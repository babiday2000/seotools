import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const DecimalToHexConverterTool = () => {
    const [decimalInput, setDecimalInput] = useState('');
    const [hexResult, setHexResult] = useState('');
    const convertDecimalToHex = () => {
        const decimal = parseInt(decimalInput, 10);
        if (!isNaN(decimal)) {
            setHexResult(decimal.toString(16).toUpperCase());
        }
        else {
            setHexResult('Invalid decimal input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Decimal to HEX Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter decimal here...", value: decimalInput, onChange: e => setDecimalInput(e.target.value), type: "number" }), _jsx(Button, { onClick: convertDecimalToHex, children: "Convert" }), _jsx(Input, { placeholder: "HEX result...", value: hexResult, readOnly: true })] }) })] }));
};
export default DecimalToHexConverterTool;
