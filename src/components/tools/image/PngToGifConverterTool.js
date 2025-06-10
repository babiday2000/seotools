import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
const PngToGifConverterTool = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [gifImageUrl, setGifImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'image/png') {
            setSelectedFile(file);
            setGifImageUrl(null);
        }
        else {
            toast.error('Please select a valid .png file.');
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
                    ctx.drawImage(image, 0, 0);
                    setGifImageUrl(canvas.toDataURL('image/gif'));
                }
                setIsLoading(false);
            };
        };
        reader.readAsDataURL(selectedFile);
    };
    const handleDownload = () => {
        if (gifImageUrl) {
            const link = document.createElement('a');
            link.href = gifImageUrl;
            link.download = 'converted_image.gif';
            link.click();
        }
    };
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer", onClick: triggerFileSelect, children: [_jsx(Input, { type: "file", ref: fileInputRef, onChange: handleFileChange, className: "hidden", accept: "image/png" }), selectedFile ? (_jsxs("p", { children: ["Selected file: ", selectedFile.name] })) : (_jsx("p", { children: "Click to select a .png file" }))] }), _jsx(Button, { onClick: handleConvert, disabled: !selectedFile || isLoading, children: isLoading ? 'Converting...' : 'Convert to GIF' }), gifImageUrl && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Converted GIF Image:" }), _jsx("img", { src: gifImageUrl, alt: "Converted", className: "max-w-full h-auto mt-2" }), _jsx(Button, { onClick: handleDownload, className: "mt-2", children: "Download GIF" })] }))] }));
};
export default PngToGifConverterTool;
