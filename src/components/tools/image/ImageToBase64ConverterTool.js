import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const ImageToBase64ConverterTool = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [base64String, setBase64String] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setBase64String('');
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
            setBase64String(reader.result);
            setIsLoading(false);
        };
        reader.readAsDataURL(selectedFile);
    };
    const handleCopy = () => {
        if (base64String) {
            navigator.clipboard.writeText(base64String);
            toast.success('Base64 string copied to clipboard.');
        }
    };
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer", onClick: triggerFileSelect, children: [_jsx(Input, { type: "file", ref: fileInputRef, onChange: handleFileChange, className: "hidden", accept: "image/*" }), selectedFile ? (_jsxs("p", { children: ["Selected file: ", selectedFile.name] })) : (_jsx("p", { children: "Click to select an image" }))] }), _jsx(Button, { onClick: handleConvert, disabled: isLoading, children: isLoading ? 'Converting...' : 'Convert to Base64' }), base64String && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Base64 String:" }), _jsx(Textarea, { value: base64String, readOnly: true, className: "mt-2 min-h-[150px]" }), _jsx(Button, { onClick: handleCopy, className: "mt-2", children: "Copy to Clipboard" })] })), _jsx(ContentDisplay, { title: "What is an Image to Base64 Converter?", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "An Image to Base64 Converter is a tool that allows you to convert an image file into a Base64 string. Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. This is particularly useful for embedding images directly into HTML, CSS, or JSON files, as it eliminates the need for separate image files and can improve website performance by reducing the number of HTTP requests." }), _jsx("p", { children: "The primary purpose of this tool is to provide a simple and efficient way to convert images to Base64 strings. This is essential for web developers and designers who want to optimize their websites and create more efficient and self-contained web pages." })] }) }), _jsx(ContentDisplay, { title: "Key Components of an Image to Base64 Converter", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "To perform the conversion, the tool relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool." }), _jsxs("ul", { className: "list-disc space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Input File:" }), " This is the image file you want to convert. You can select a file from your computer using the file selector."] }), _jsxs("li", { children: [_jsx("strong", { children: "Conversion Logic:" }), " The core of the converter is its ability to read the binary data of the input image and encode it into a Base64 string. This is done using the browser's built-in FileReader API, which provides a powerful and efficient way to read file data."] })] }), _jsx("p", { children: "These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the conversion without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant." })] }) }), _jsx(ContentDisplay, { title: "How to Use the Image to Base64 Converter", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "Using the Image to Base64 Converter is a simple and straightforward process. Follow these steps to get your result:" }), _jsxs("ol", { className: "list-decimal space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Select an Image:" }), " Click the \"Click to select an image\" button to choose an image file from your computer."] }), _jsxs("li", { children: [_jsx("strong", { children: "Click \"Convert to Base64\":" }), " Press the \"Convert to Base64\" button. The tool will instantly display the Base64 string in the result section."] }), _jsxs("li", { children: [_jsx("strong", { children: "Copy the Base64 String:" }), " Click the \"Copy to Clipboard\" button to copy the Base64 string to your clipboard."] })] }), _jsx("p", { children: "This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your image to Base64 conversion needs." })] }) }), _jsx(ContentDisplay, { title: "Frequently Asked Questions (FAQ)", content: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "What is Base64?" }), _jsx("p", { children: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is commonly used to embed binary data, such as images, in text-based formats like HTML, CSS, and JSON." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Why would I want to convert an image to Base64?" }), _jsx("p", { children: "Converting an image to a Base64 string allows you to embed the image directly into a web page, which can improve performance by reducing the number of HTTP requests. It can also be useful for storing images in a database or for sending images in a JSON payload." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Is there a limit to the size of the image I can convert?" }), _jsx("p", { children: "While there is no hard limit, converting very large images can result in a very long Base64 string, which can impact performance. It is generally recommended to use this technique for small images, such as icons and logos." })] })] }) }), _jsx(ContentDisplay, { title: "Fun Fact", content: _jsx("p", { children: "Did you know that Base64 encoding is not a form of encryption? It is simply a way to represent binary data in a text-based format. While it can make the data unreadable to humans, it can be easily decoded back to its original form. For this reason, it should not be used to protect sensitive information." }) })] }));
};
export default ImageToBase64ConverterTool;
