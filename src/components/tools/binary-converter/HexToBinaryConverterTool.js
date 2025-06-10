import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const HexToBinaryConverterTool = () => {
    const [hexInput, setHexInput] = useState('');
    const [binaryResult, setBinaryResult] = useState('');
    const convertHexToBinary = () => {
        const binary = hexInput
            .split('')
            .map(hexChar => {
            const decimal = parseInt(hexChar, 16);
            const binaryChar = decimal.toString(2);
            return '0'.repeat(4 - binaryChar.length) + binaryChar;
        })
            .join(' ');
        setBinaryResult(binary);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "HEX to Binary Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter HEX here...", value: hexInput, onChange: e => setHexInput(e.target.value) }), _jsx(Button, { onClick: convertHexToBinary, children: "Convert" }), _jsx(Input, { placeholder: "Binary result...", value: binaryResult, readOnly: true })] }) })] }));
};
export default HexToBinaryConverterTool;
