import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const BinaryToTextConverterTool = () => {
    const [binaryInput, setBinaryInput] = useState('');
    const [textResult, setTextResult] = useState('');
    const convertBinaryToText = () => {
        const text = binaryInput
            .split(' ')
            .map(binaryChar => String.fromCharCode(parseInt(binaryChar, 2)))
            .join('');
        setTextResult(text);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Binary to Text Converter" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsx(Textarea, { placeholder: "Enter binary here...", value: binaryInput, onChange: e => setBinaryInput(e.target.value) }), _jsx(Button, { onClick: convertBinaryToText, children: "Convert" }), _jsx(Textarea, { placeholder: "Text result...", value: textResult, readOnly: true })] }) })] }));
};
export default BinaryToTextConverterTool;
