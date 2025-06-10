import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const RotateImageTool = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [rotatedImageUrl, setRotatedImageUrl] = useState(null);
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setRotatedImageUrl(null);
            setRotation(0);
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = new Image();
                image.src = e.target?.result;
                image.onload = () => {
                    const canvas = canvasRef.current;
                    if (canvas) {
                        canvas.width = image.width;
                        canvas.height = image.height;
                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(image, 0, 0);
                        setRotatedImageUrl(canvas.toDataURL());
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };
    const handleRotationChange = (value) => {
        setRotation(value[0]);
        rotateImage(value[0]);
    };
    const rotateImage = (angle) => {
        const canvas = canvasRef.current;
        if (!canvas || !selectedFile) {
            toast.error('Please select an image first.');
            return;
        }
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const image = new Image();
            image.src = URL.createObjectURL(selectedFile);
            image.onload = () => {
                const rad = (angle * Math.PI) / 180;
                const newWidth = Math.abs(image.width * Math.cos(rad)) + Math.abs(image.height * Math.sin(rad));
                const newHeight = Math.abs(image.width * Math.sin(rad)) + Math.abs(image.height * Math.cos(rad));
                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.translate(newWidth / 2, newHeight / 2);
                ctx.rotate(rad);
                ctx.drawImage(image, -image.width / 2, -image.height / 2);
                setRotatedImageUrl(canvas.toDataURL());
            };
        }
    };
    const handleDownload = () => {
        if (rotatedImageUrl) {
            const link = document.createElement('a');
            link.href = rotatedImageUrl;
            link.download = `rotated_image.png`;
            link.click();
        }
    };
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer", onClick: triggerFileSelect, children: [_jsx(Input, { type: "file", ref: fileInputRef, onChange: handleFileChange, className: "hidden", accept: "image/*" }), selectedFile ? (_jsxs("p", { children: ["Selected file: ", selectedFile.name] })) : (_jsx("p", { children: "Click to select an image" }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "rotation-slider", children: ["Rotation: ", rotation, "\u00B0"] }), _jsx(Slider, { id: "rotation-slider", min: -180, max: 180, step: 1, value: [rotation], onValueChange: handleRotationChange, disabled: !selectedFile })] }), _jsx("canvas", { ref: canvasRef, className: "max-w-full h-auto mt-4 border", style: { display: selectedFile ? 'block' : 'none' } }), rotatedImageUrl && (_jsx("div", { className: "mt-4", children: _jsx(Button, { onClick: handleDownload, children: "Download Rotated Image" }) })), _jsx(ContentDisplay, { title: "What is a Rotate Image Tool?", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "A Rotate Image tool is a utility that allows you to rotate an image to a specific angle. This is a common image manipulation technique used for a variety of creative and practical purposes. Whether you are a graphic designer, a photographer, or just someone who wants to have some fun with their photos, this tool provides a simple and efficient way to rotate your images." }), _jsx("p", { children: "The primary purpose of this tool is to make it easy to correct the orientation of an image or to create interesting visual effects. By providing a user-friendly interface, this tool makes it easy for anyone to rotate their images without needing to install any software." })] }) }), _jsx(ContentDisplay, { title: "Key Components of a Rotate Image Tool", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "To perform the rotation, the tool relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool." }), _jsxs("ul", { className: "list-disc space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Input File:" }), " This is the image file you want to rotate. You can select a file from your computer using the file selector."] }), _jsxs("li", { children: [_jsx("strong", { children: "Rotation Angle:" }), " This is the angle you want to rotate the image by. You can choose any angle between -180 and 180 degrees using the slider."] }), _jsxs("li", { children: [_jsx("strong", { children: "Conversion Logic:" }), " The core of the converter is its ability to read the input image data and apply a transformation to rotate it. This is done using the browser's built-in canvas API, which provides a powerful and efficient way to manipulate image data."] })] }), _jsx("p", { children: "These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the rotation without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant." })] }) }), _jsx(ContentDisplay, { title: "How to Use the Rotate Image Tool", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "Using the Rotate Image tool is a simple and straightforward process. Follow these steps to get your result:" }), _jsxs("ol", { className: "list-decimal space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Select an Image:" }), " Click the \"Click to select an image\" button to choose an image file from your computer."] }), _jsxs("li", { children: [_jsx("strong", { children: "Choose a Rotation Angle:" }), " Use the slider to choose the angle you want to rotate the image by."] }), _jsxs("li", { children: [_jsx("strong", { children: "Download the Rotated Image:" }), " Click the \"Download Rotated Image\" button to save the rotated image to your computer."] })] }), _jsx("p", { children: "This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your image rotation needs." })] }) }), _jsx(ContentDisplay, { title: "Frequently Asked Questions (FAQ)", content: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "What is the difference between rotating and flipping an image?" }), _jsx("p", { children: "Rotating an image turns it around a central point, while flipping an image creates a mirror image of the original. Rotating is like turning a photo on a turntable, while flipping is like looking at it in a mirror." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Can I rotate an image to any angle?" }), _jsx("p", { children: "Yes, you can rotate an image to any angle between -180 and 180 degrees using the slider." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Does rotating an image reduce its quality?" }), _jsx("p", { children: "Rotating an image can sometimes result in a small loss of quality, especially if you are rotating it by an angle that is not a multiple of 90 degrees. This is because the pixels in the image have to be rearranged to create the rotated image. However, the tool uses a high-quality algorithm to minimize any loss of quality." })] })] }) }), _jsx(ContentDisplay, { title: "Fun Fact", content: _jsx("p", { children: "Did you know that the concept of rotating an image is closely related to the mathematical concept of rotation? In geometry, a rotation is a transformation that turns a figure about a fixed point, called the center of rotation. This is exactly what happens when you rotate an image." }) })] }));
};
export default RotateImageTool;
