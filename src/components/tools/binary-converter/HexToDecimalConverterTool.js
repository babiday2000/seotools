import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const HexToDecimalConverterTool = () => {
    const [hexInput, setHexInput] = useState('');
    const [decimalResult, setDecimalResult] = useState('');
    const convertHexToDecimal = () => {
        if (/^[0-9A-Fa-f]+$/.test(hexInput)) {
            setDecimalResult(parseInt(hexInput, 16).toString());
        }
        else {
            setDecimalResult('Invalid HEX input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "HEX to Decimal Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter HEX here...", value: hexInput, onChange: e => setHexInput(e.target.value) }), _jsx(Button, { onClick: convertHexToDecimal, children: "Convert" }), _jsx(Input, { placeholder: "Decimal result...", value: decimalResult, readOnly: true })] }) })] }));
};
export default HexToDecimalConverterTool;
