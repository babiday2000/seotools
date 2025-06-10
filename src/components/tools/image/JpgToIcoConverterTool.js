import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
const JpgToIcoConverterTool = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [icoSize, setIcoSize] = useState(32);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            setSelectedFile(file);
        }
        else {
            toast.error('Please select a valid .jpg or .jpeg file.');
        }
    };
    const handleConvert = () => {
        if (!selectedFile) {
            toast.error('Please select a file to convert.');
            return;
        }
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target?.result;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = icoSize;
                canvas.height = icoSize;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(image, 0, 0, icoSize, icoSize);
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/x-icon');
                    link.download = 'favicon.ico';
                    link.click();
                }
                setIsLoading(false);
            };
        };
        reader.readAsDataURL(selectedFile);
    };
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer", onClick: triggerFileSelect, children: [_jsx(Input, { type: "file", ref: fileInputRef, onChange: handleFileChange, className: "hidden", accept: "image/jpeg,image/jpg" }), selectedFile ? (_jsxs("p", { children: ["Selected file: ", selectedFile.name] })) : (_jsx("p", { children: "Click to select a .jpg or .jpeg file" }))] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Label, { htmlFor: "ico-size-select", children: "ICO Size:" }), _jsxs(Select, { value: String(icoSize), onValueChange: (value) => setIcoSize(Number(value)), children: [_jsx(SelectTrigger, { id: "ico-size-select", className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select size" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "16", children: "16x16" }), _jsx(SelectItem, { value: "32", children: "32x32" }), _jsx(SelectItem, { value: "48", children: "48x48" }), _jsx(SelectItem, { value: "64", children: "64x64" }), _jsx(SelectItem, { value: "128", children: "128x128" })] })] })] }), _jsx(Button, { onClick: handleConvert, disabled: !selectedFile || isLoading, children: isLoading ? 'Converting...' : 'Convert and Download' })] }));
};
export default JpgToIcoConverterTool;
