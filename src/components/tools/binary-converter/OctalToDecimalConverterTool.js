import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const OctalToDecimalConverterTool = () => {
    const [octalInput, setOctalInput] = useState('');
    const [decimalResult, setDecimalResult] = useState('');
    const convertOctalToDecimal = () => {
        if (/^[0-7]+$/.test(octalInput)) {
            setDecimalResult(parseInt(octalInput, 8).toString());
        }
        else {
            setDecimalResult('Invalid octal input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Octal to Decimal Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter octal here...", value: octalInput, onChange: e => setOctalInput(e.target.value) }), _jsx(Button, { onClick: convertOctalToDecimal, children: "Convert" }), _jsx(Input, { placeholder: "Decimal result...", value: decimalResult, readOnly: true })] }) })] }));
};
export default OctalToDecimalConverterTool;
