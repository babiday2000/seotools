import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const OctalToHexConverterTool = () => {
    const [octalInput, setOctalInput] = useState('');
    const [hexResult, setHexResult] = useState('');
    const convertOctalToHex = () => {
        if (/^[0-7]+$/.test(octalInput)) {
            const decimal = parseInt(octalInput, 8);
            setHexResult(decimal.toString(16).toUpperCase());
        }
        else {
            setHexResult('Invalid octal input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Octal to HEX Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter octal here...", value: octalInput, onChange: e => setOctalInput(e.target.value) }), _jsx(Button, { onClick: convertOctalToHex, children: "Convert" }), _jsx(Input, { placeholder: "HEX result...", value: hexResult, readOnly: true })] }) })] }));
};
export default OctalToHexConverterTool;
