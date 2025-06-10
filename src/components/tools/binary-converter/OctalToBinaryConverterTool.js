import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const OctalToBinaryConverterTool = () => {
    const [octalInput, setOctalInput] = useState('');
    const [binaryResult, setBinaryResult] = useState('');
    const convertOctalToBinary = () => {
        if (/^[0-7]+$/.test(octalInput)) {
            const binary = octalInput
                .split('')
                .map(octalChar => {
                const decimal = parseInt(octalChar, 8);
                const binaryChar = decimal.toString(2);
                return '0'.repeat(3 - binaryChar.length) + binaryChar;
            })
                .join(' ');
            setBinaryResult(binary);
        }
        else {
            setBinaryResult('Invalid octal input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Octal to Binary Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter octal here...", value: octalInput, onChange: e => setOctalInput(e.target.value) }), _jsx(Button, { onClick: convertOctalToBinary, children: "Convert" }), _jsx(Input, { placeholder: "Binary result...", value: binaryResult, readOnly: true })] }) })] }));
};
export default OctalToBinaryConverterTool;
