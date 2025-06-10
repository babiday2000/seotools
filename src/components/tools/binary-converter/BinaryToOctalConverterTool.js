import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const BinaryToOctalConverterTool = () => {
    const [binaryInput, setBinaryInput] = useState('');
    const [octalResult, setOctalResult] = useState('');
    const convertBinaryToOctal = () => {
        if (/^[01]+$/.test(binaryInput)) {
            let paddedBinary = binaryInput;
            while (paddedBinary.length % 3 !== 0) {
                paddedBinary = '0' + paddedBinary;
            }
            const octal = paddedBinary
                .match(/.{1,3}/g)
                ?.map(group => parseInt(group, 2).toString(8))
                .join('');
            setOctalResult(octal || '');
        }
        else {
            setOctalResult('Invalid binary input');
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Binary to Octal Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { placeholder: "Enter binary here...", value: binaryInput, onChange: e => setBinaryInput(e.target.value) }), _jsx(Button, { onClick: convertBinaryToOctal, children: "Convert" }), _jsx(Input, { placeholder: "Octal result...", value: octalResult, readOnly: true })] }) })] }));
};
export default BinaryToOctalConverterTool;
