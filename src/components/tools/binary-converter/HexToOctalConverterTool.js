import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const HexToOctalConverterTool = () => {
    const [hexInput, setHexInput] = useState('');
    const [octalResult, setOctalResult] = useState('');
    const convertHexToOctal = () => {
        if (/^[0-9A-Fa-f]+$/.test(hexInput)) {
            const decimal = parseInt(hexInput, 16);
            setOctalResult(decimal.toString(8));
        }
        else {
            setOctalResult('Invalid HEX input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "HEX to Octal Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter HEX here...", value: hexInput, onChange: e => setHexInput(e.target.value) }), _jsx(Button, { onClick: convertHexToOctal, children: "Convert" }), _jsx(Input, { placeholder: "Octal result...", value: octalResult, readOnly: true })] }) })] }));
};
export default HexToOctalConverterTool;
