import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const BinaryToDecimalConverterTool = () => {
    const [binaryInput, setBinaryInput] = useState('');
    const [decimalResult, setDecimalResult] = useState('');
    const convertBinaryToDecimal = () => {
        if (/^[01]+$/.test(binaryInput)) {
            setDecimalResult(parseInt(binaryInput, 2).toString());
        }
        else {
            setDecimalResult('Invalid binary input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Binary to Decimal Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter binary here...", value: binaryInput, onChange: e => setBinaryInput(e.target.value) }), _jsx(Button, { onClick: convertBinaryToDecimal, children: "Convert" }), _jsx(Input, { placeholder: "Decimal result...", value: decimalResult, readOnly: true })] }) })] }));
};
export default BinaryToDecimalConverterTool;
