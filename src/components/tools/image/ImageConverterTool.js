import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const ImageConverterTool = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [targetFormat, setTargetFormat] = useState('png');
    const [convertedImageUrl, setConvertedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setConvertedImageUrl(null);
        }
    };
    const handleConvert = () => {
        if (!selectedFile) {
            toast.error('Please select a file to convert.');
            return;
        }
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = () => {
            const image = new Image();
            image.src = reader.result;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(image, 0, 0);
                    const convertedUrl = canvas.toDataURL(`image/${targetFormat}`);
                    setConvertedImageUrl(convertedUrl);
                }
                setIsLoading(false);
            };
        };
        reader.readAsDataURL(selectedFile);
    };
    const handleDownload = () => {
        if (convertedImageUrl) {
            const link = document.createElement('a');
            link.href = convertedImageUrl;
            link.download = `converted_image.${targetFormat}`;
            link.click();
        }
    };
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer", onClick: triggerFileSelect, children: [_jsx(Input, { type: "file", ref: fileInputRef, onChange: handleFileChange, className: "hidden", accept: "image/*" }), selectedFile ? (_jsxs("p", { children: ["Selected file: ", selectedFile.name] })) : (_jsx("p", { children: "Click to select an image" }))] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Label, { htmlFor: "format-select", children: "Convert to:" }), _jsxs(Select, { value: targetFormat, onValueChange: setTargetFormat, children: [_jsx(SelectTrigger, { id: "format-select", className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select format" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "png", children: "PNG" }), _jsx(SelectItem, { value: "jpeg", children: "JPEG" }), _jsx(SelectItem, { value: "webp", children: "WEBP" }), _jsx(SelectItem, { value: "gif", children: "GIF" }), _jsx(SelectItem, { value: "bmp", children: "BMP" })] })] })] }), _jsx(Button, { onClick: handleConvert, disabled: isLoading, children: isLoading ? 'Converting...' : 'Convert' }), convertedImageUrl && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Converted Image:" }), _jsx("img", { src: convertedImageUrl, alt: "Converted", className: "max-w-full h-auto mt-2" }), _jsx(Button, { onClick: handleDownload, className: "mt-2", children: "Download Image" })] })), _jsx(ContentDisplay, { title: "What is an Image Converter?", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "An Image Converter is a tool that allows you to change the format of an image file. Different image formats have different characteristics, such as file size, quality, and support for transparency. This tool is essential for web developers, graphic designers, and anyone who works with digital images, as it allows you to choose the best format for your specific needs." }), _jsx("p", { children: "The primary purpose of an Image Converter is to provide a simple and efficient way to switch between different image formats. Whether you need to convert a PNG to a JPEG for a smaller file size, or a JPEG to a WEBP for better web performance, this tool makes the process quick and easy." })] }) }), _jsx(ContentDisplay, { title: "Key Components of an Image Converter", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "To perform accurate conversions, the Image Converter relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool." }), _jsxs("ul", { className: "list-disc space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Input File:" }), " This is the image file you want to convert. You can select a file from your computer using the file selector."] }), _jsxs("li", { children: [_jsx("strong", { children: "Target Format:" }), " This is the format you want to convert the image to. You can choose from a variety of formats, such as PNG, JPEG, WEBP, GIF, and BMP."] }), _jsxs("li", { children: [_jsx("strong", { children: "Conversion Logic:" }), " The core of the converter is its ability to read the input image data and re-encode it in the target format. This is done using the browser's built-in canvas API, which provides a powerful and efficient way to manipulate image data."] })] }), _jsx("p", { children: "These components are integrated into a simple and intuitive interface, making it easy for anyone to perform image conversions without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant." })] }) }), _jsx(ContentDisplay, { title: "How to Use the Image Converter", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "Using the Image Converter is a simple and straightforward process. Follow these steps to get your result:" }), _jsxs("ol", { className: "list-decimal space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Select an Image:" }), " Click the \"Click to select an image\" button to choose an image file from your computer."] }), _jsxs("li", { children: [_jsx("strong", { children: "Select the Target Format:" }), " Choose the format you want to convert the image to from the dropdown menu."] }), _jsxs("li", { children: [_jsx("strong", { children: "Click \"Convert\":" }), " Press the \"Convert\" button. The tool will instantly display the converted image in the result section."] }), _jsxs("li", { children: [_jsx("strong", { children: "Download the Image:" }), " Click the \"Download Image\" button to save the converted image to your computer."] })] }), _jsx("p", { children: "This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your image conversion needs." })] }) }), _jsx(ContentDisplay, { title: "Frequently Asked Questions (FAQ)", content: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "What is the difference between PNG and JPEG?" }), _jsx("p", { children: "PNG is a lossless compression format, which means that it does not lose any quality when it is compressed. It also supports transparency, which makes it ideal for web graphics. JPEG is a lossy compression format, which means that it does lose some quality when it is compressed. However, it can achieve much smaller file sizes than PNG, which makes it ideal for photographs." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "What is WEBP?" }), _jsx("p", { children: "WEBP is a modern image format that provides superior lossless and lossy compression for images on the web. It was developed by Google and is designed to create smaller, richer images that make the web faster." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "How accurate are the conversions?" }), _jsx("p", { children: "The conversions are performed using the browser's built-in canvas API, which provides a high degree of accuracy. However, some quality may be lost when converting from a lossless format (like PNG) to a lossy format (like JPEG)." })] })] }) }), _jsx(ContentDisplay, { title: "Fun Fact", content: _jsx("p", { children: "Did you know that the first digital image was created in 1957 by Russell Kirsch? It was a 176x176 pixel scan of his three-month-old son, and it was the beginning of a revolution in digital imaging that has transformed the way we create, share, and consume visual information." }) })] }));
};
export default ImageConverterTool;
