import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
const JpgConverterTool = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [jpgImageUrl, setJpgImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setJpgImageUrl(null);
        }
        else {
            toast.error('Please select a valid image file.');
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
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(image, 0, 0);
                    setJpgImageUrl(canvas.toDataURL('image/jpeg'));
                }
                setIsLoading(false);
            };
        };
        reader.readAsDataURL(selectedFile);
    };
    const handleDownload = () => {
        if (jpgImageUrl) {
            const link = document.createElement('a');
            link.href = jpgImageUrl;
            link.download = 'converted_image.jpg';
            link.click();
        }
    };
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer", onClick: triggerFileSelect, children: [_jsx(Input, { type: "file", ref: fileInputRef, onChange: handleFileChange, className: "hidden", accept: "image/*" }), selectedFile ? (_jsxs("p", { children: ["Selected file: ", selectedFile.name] })) : (_jsx("p", { children: "Click to select an image" }))] }), _jsx(Button, { onClick: handleConvert, disabled: !selectedFile || isLoading, children: isLoading ? 'Converting...' : 'Convert to JPG' }), jpgImageUrl && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Converted JPG Image:" }), _jsx("img", { src: jpgImageUrl, alt: "Converted", className: "max-w-full h-auto mt-2" }), _jsx(Button, { onClick: handleDownload, className: "mt-2", children: "Download JPG" })] }))] }));
};
export default JpgConverterTool;
