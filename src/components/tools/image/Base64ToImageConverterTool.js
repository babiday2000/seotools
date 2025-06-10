import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const Base64ToImageConverterTool = () => {
    const [base64String, setBase64String] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleConvert = () => {
        if (!base64String) {
            toast.error('Please enter a Base64 string.');
            return;
        }
        setIsLoading(true);
        try {
            // Basic validation for base64 string
            const isBase64 = /^data:image\/[a-zA-Z]+;base64,/.test(base64String);
            if (!isBase64) {
                toast.error('Invalid Base64 image string.');
                setIsLoading(false);
                return;
            }
            setImageUrl(base64String);
        }
        catch {
            toast.error('Failed to convert Base64 to image.');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleDownload = () => {
        if (imageUrl) {
            const link = document.createElement('a');
            link.href = imageUrl;
            const extension = imageUrl.split(';')[0].split('/')[1];
            link.download = `converted_image.${extension || 'png'}`;
            link.click();
        }
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Base64 String:" }), _jsx(Textarea, { value: base64String, onChange: (e) => setBase64String(e.target.value), placeholder: "Paste your Base64 string here...", className: "min-h-[150px]" }), _jsx(Button, { onClick: handleConvert, disabled: isLoading, children: isLoading ? 'Converting...' : 'Convert to Image' }), imageUrl && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Converted Image:" }), _jsx("img", { src: imageUrl, alt: "Converted from Base64", className: "max-w-full h-auto mt-2" }), _jsx(Button, { onClick: handleDownload, className: "mt-2", children: "Download Image" })] })), _jsx(ContentDisplay, { title: "What is a Base64 to Image Converter?", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "A Base64 to Image Converter is a tool that allows you to convert a Base64 string back into an image file. This is particularly useful for web developers and designers who work with Base64-encoded images and need to view or edit them. By providing a simple and efficient way to decode Base64 strings, this tool makes it easy to work with embedded images." }), _jsx("p", { children: "The primary purpose of this tool is to provide a simple and efficient way to convert Base64 strings to images. This is essential for web developers and designers who want to work with embedded images and need a quick way to view or edit them." })] }) }), _jsx(ContentDisplay, { title: "Key Components of a Base64 to Image Converter", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "To perform the conversion, the tool relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool." }), _jsxs("ul", { className: "list-disc space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Input String:" }), " This is the Base64 string you want to convert. You can paste the string into the text area."] }), _jsxs("li", { children: [_jsx("strong", { children: "Conversion Logic:" }), " The core of the converter is its ability to read the Base64 string and decode it into an image. This is done using the browser's built-in support for data URLs, which allows you to display images directly from a Base64 string."] })] }), _jsx("p", { children: "These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the conversion without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant." })] }) }), _jsx(ContentDisplay, { title: "How to Use the Base64 to Image Converter", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "Using the Base64 to Image Converter is a simple and straightforward process. Follow these steps to get your result:" }), _jsxs("ol", { className: "list-decimal space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Paste the Base64 String:" }), " Paste the Base64 string into the text area."] }), _jsxs("li", { children: [_jsx("strong", { children: "Click \"Convert to Image\":" }), " Press the \"Convert to Image\" button. The tool will instantly display the image in the result section."] }), _jsxs("li", { children: [_jsx("strong", { children: "Download the Image:" }), " Click the \"Download Image\" button to save the image to your computer."] })] }), _jsx("p", { children: "This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your Base64 to image conversion needs." })] }) }), _jsx(ContentDisplay, { title: "Frequently Asked Questions (FAQ)", content: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "What is Base64?" }), _jsx("p", { children: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is commonly used to embed binary data, such as images, in text-based formats like HTML, CSS, and JSON." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Why would I want to convert a Base64 string to an image?" }), _jsx("p", { children: "Converting a Base64 string to an image allows you to view or edit an embedded image. It can also be useful for debugging purposes, as it allows you to see the image that is represented by a Base64 string." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Is there a limit to the size of the Base64 string I can convert?" }), _jsx("p", { children: "While there is no hard limit, converting very long Base64 strings can impact performance. It is generally recommended to use this technique for small images, such as icons and logos." })] })] }) }), _jsx(ContentDisplay, { title: "Fun Fact", content: _jsx("p", { children: "Did you know that Base64 encoding is not a form of encryption? It is simply a way to represent binary data in a text-based format. While it can make the data unreadable to humans, it can be easily decoded back to its original form. For this reason, it should not be used to protect sensitive information." }) })] }));
};
export default Base64ToImageConverterTool;
