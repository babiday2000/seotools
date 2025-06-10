import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const FlipImageTool = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                setImagePreview(result);
                setOriginalImage(result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleFlip = useCallback((direction) => {
        if (!imagePreview) {
            toast.error('Please select an image first.');
            return;
        }
        setIsLoading(true);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            const image = new Image();
            image.src = imagePreview;
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                if (direction === 'horizontal') {
                    ctx.translate(canvas.width, 0);
                    ctx.scale(-1, 1);
                }
                else {
                    ctx.translate(0, canvas.height);
                    ctx.scale(1, -1);
                }
                ctx.drawImage(image, 0, 0);
                ctx.restore();
                setImagePreview(canvas.toDataURL());
                setIsLoading(false);
            };
        }
    }, [imagePreview]);
    const handleReset = () => {
        if (originalImage) {
            setImagePreview(originalImage);
        }
    };
    const handleDownload = () => {
        if (imagePreview) {
            const link = document.createElement('a');
            link.href = imagePreview;
            const fileName = selectedFile?.name.split('.').slice(0, -1).join('.') || 'flipped_image';
            link.download = `${fileName}_flipped.png`;
            link.click();
        }
    };
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer", onClick: triggerFileSelect, children: [_jsx(Input, { type: "file", ref: fileInputRef, onChange: handleFileChange, className: "hidden", accept: "image/*" }), selectedFile ? (_jsxs("p", { children: ["Selected file: ", selectedFile.name] })) : (_jsx("p", { children: "Click to select an image" }))] }), imagePreview && (_jsx("div", { className: "mt-4 text-center", children: _jsx("img", { src: imagePreview, alt: "Preview", className: "max-w-full h-auto mx-auto border" }) })), _jsxs("div", { className: "flex justify-center space-x-4", children: [_jsx(Button, { onClick: () => handleFlip('horizontal'), disabled: !selectedFile || isLoading, children: "Flip Horizontal" }), _jsx(Button, { onClick: () => handleFlip('vertical'), disabled: !selectedFile || isLoading, children: "Flip Vertical" }), _jsx(Button, { onClick: handleReset, disabled: !originalImage || isLoading, children: "Reset" }), _jsx(Button, { onClick: handleDownload, disabled: !imagePreview || isLoading, children: "Download Flipped Image" })] }), _jsx("canvas", { ref: canvasRef, className: "hidden" }), _jsx(ContentDisplay, { title: "What is a Flip Image Tool?", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "A Flip Image tool is a utility that allows you to mirror an image either horizontally or vertically. This is a common image manipulation technique used for a variety of creative and practical purposes. Whether you are a graphic designer, a photographer, or just someone who wants to have some fun with their photos, this tool provides a simple and efficient way to flip your images." }), _jsx("p", { children: "The primary purpose of this tool is to make it easy to create a mirror image of your photos. This can be useful for creating interesting visual effects, correcting the orientation of an image, or preparing an image for a specific layout. By providing a user-friendly interface, this tool makes it easy for anyone to flip their images without needing to install any software." })] }) }), _jsx(ContentDisplay, { title: "Key Components of a Flip Image Tool", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "To perform the flip, the tool relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool." }), _jsxs("ul", { className: "list-disc space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Input File:" }), " This is the image file you want to flip. You can select a file from your computer using the file selector."] }), _jsxs("li", { children: [_jsx("strong", { children: "Flip Direction:" }), " This is the direction you want to flip the image. You can choose to flip the image horizontally or vertically."] }), _jsxs("li", { children: [_jsx("strong", { children: "Conversion Logic:" }), " The core of the converter is its ability to read the input image data and apply a transformation to flip it. This is done using the browser's built-in canvas API, which provides a powerful and efficient way to manipulate image data."] })] }), _jsx("p", { children: "These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the flip without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant." })] }) }), _jsx(ContentDisplay, { title: "How to Use the Flip Image Tool", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "Using the Flip Image tool is a simple and straightforward process. Follow these steps to get your result:" }), _jsxs("ol", { className: "list-decimal space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Select an Image:" }), " Click the \"Click to select an image\" button to choose an image file from your computer."] }), _jsxs("li", { children: [_jsx("strong", { children: "Choose a Flip Direction:" }), " Click either the \"Flip Horizontal\" or \"Flip Vertical\" button to flip the image in the desired direction."] }), _jsxs("li", { children: [_jsx("strong", { children: "Download the Flipped Image:" }), " Click the \"Download Flipped Image\" button to save the flipped image to your computer."] })] }), _jsx("p", { children: "This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your image flipping needs." })] }) }), _jsx(ContentDisplay, { title: "Frequently Asked Questions (FAQ)", content: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "What is the difference between flipping and rotating an image?" }), _jsx("p", { children: "Flipping an image creates a mirror image of the original, while rotating an image turns it around a central point. Flipping is like looking at the image in a mirror, while rotating is like turning it on a turntable." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Can I flip an image multiple times?" }), _jsx("p", { children: "Yes, you can flip an image as many times as you like. Each time you click one of the flip buttons, the image will be flipped again from its current state." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Does flipping an image reduce its quality?" }), _jsx("p", { children: "No, flipping an image does not reduce its quality. The tool uses a lossless process to flip the image, so the quality of the flipped image will be the same as the original." })] })] }) }), _jsx(ContentDisplay, { title: "Fun Fact", content: _jsx("p", { children: "Did you know that the concept of flipping an image is closely related to the mathematical concept of reflection? In geometry, a reflection is a transformation that flips a figure over a line, creating a mirror image. This is exactly what happens when you flip an image horizontally or vertically." }) })] }));
};
export default FlipImageTool;
