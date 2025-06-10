import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const BinaryToHexConverterTool = () => {
    const [binaryInput, setBinaryInput] = useState('');
    const [hexResult, setHexResult] = useState('');
    const convertBinaryToHex = () => {
        const hex = binaryInput
            .split(' ')
            .map(binaryChar => {
            const decimal = parseInt(binaryChar, 2);
            const hexChar = decimal.toString(16).toUpperCase();
            return hexChar;
        })
            .join('');
        setHexResult(hex);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Binary to HEX Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter binary here...", value: binaryInput, onChange: e => setBinaryInput(e.target.value) }), _jsx(Button, { onClick: convertBinaryToHex, children: "Convert" }), _jsx(Input, { placeholder: "HEX result...", value: hexResult, readOnly: true })] }) })] }));
};
export default BinaryToHexConverterTool;
