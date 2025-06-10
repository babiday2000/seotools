import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
const ImageResizerTool = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [resizedImageUrl, setResizedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const originalImageRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setResizedImageUrl(null);
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = new Image();
                image.src = e.target?.result;
                image.onload = () => {
                    originalImageRef.current = image;
                    setWidth(image.width);
                    setHeight(image.height);
                };
            };
            reader.readAsDataURL(file);
        }
    };
    const handleResize = () => {
        if (!originalImageRef.current) {
            toast.error('Please select an image first.');
            return;
        }
        setIsLoading(true);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(originalImageRef.current, 0, 0, width, height);
            setResizedImageUrl(canvas.toDataURL());
        }
        setIsLoading(false);
    };
    const handleDownload = () => {
        if (resizedImageUrl) {
            const link = document.createElement('a');
            link.href = resizedImageUrl;
            link.download = `resized_image.png`;
            link.click();
        }
    };
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: "p-4 space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "Image Resizer" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Quickly resize any image to your desired dimensions. Our tool makes it easy to adjust the width and height of your images for social media, websites, or any other project, all within your browser." })] }), _jsxs("div", { className: "border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer max-w-4xl mx-auto", onClick: triggerFileSelect, children: [_jsx(Input, { type: "file", ref: fileInputRef, onChange: handleFileChange, className: "hidden", accept: "image/*" }), selectedFile ? (_jsxs("p", { children: ["Selected file: ", selectedFile.name] })) : (_jsx("p", { children: "Click to select an image" }))] }), selectedFile && (_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "width-input", children: "Width:" }), _jsx(Input, { id: "width-input", type: "number", value: width, onChange: (e) => setWidth(Number(e.target.value)) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "height-input", children: "Height:" }), _jsx(Input, { id: "height-input", type: "number", value: height, onChange: (e) => setHeight(Number(e.target.value)) })] })] })), _jsx(Button, { onClick: handleResize, disabled: !selectedFile || isLoading, children: isLoading ? 'Resizing...' : 'Resize Image' }), resizedImageUrl && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Resized Image:" }), _jsx("img", { src: resizedImageUrl, alt: "Resized", className: "max-w-full h-auto mt-2" }), _jsx(Button, { onClick: handleDownload, className: "mt-2", children: "Download Resized Image" })] })), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is an Image Resizer?" }), _jsx("p", { className: "text-muted-foreground", children: "An Image Resizer is a tool that allows you to change the dimensions (width and height) of a digital image. This is a fundamental task in digital image editing, essential for adapting images to various platforms and use cases. Whether you need to shrink a large photo to reduce its file size for a website or enlarge a small image for a presentation, a resizer tool provides the necessary controls. Our browser-based tool eliminates the need for complex software like Photoshop, offering a quick and straightforward way to get your images to the perfect size." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Why Resizing Images is Important" }), _jsx("p", { className: "text-muted-foreground", children: "Properly sized images are crucial for a variety of reasons, particularly in web development and digital marketing:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Website Performance:" }), " Large, unoptimized images are one of the biggest causes of slow-loading websites. Resizing images to the exact dimensions needed for your layout significantly reduces file size and improves page speed, which is a key factor for both user experience and SEO."] }), _jsxs("li", { children: [_jsx("strong", { children: "Social Media Compliance:" }), " Each social media platform has its own recommended image dimensions for profile pictures, headers, and posts. Using a resizer ensures your images look their best and aren't awkwardly cropped."] }), _jsxs("li", { children: [_jsx("strong", { children: "Email Marketing:" }), " Oversized images in emails can lead to slow loading times and may even trigger spam filters. Resizing images is essential for creating professional and effective email campaigns."] }), _jsxs("li", { children: [_jsx("strong", { children: "Consistency:" }), " Maintaining consistent image sizes across your website or project creates a more professional and visually appealing look."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the Image Resizer" }), _jsx("p", { className: "text-muted-foreground", children: "Resizing your image is a simple process with our tool:" }), _jsxs("ol", { className: "list-decimal list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Select Your Image:" }), " Click the designated area to upload an image from your computer."] }), _jsxs("li", { children: [_jsx("strong", { children: "Enter New Dimensions:" }), " Once the image is loaded, its current width and height will be displayed. Enter your desired new dimensions in the input fields."] }), _jsxs("li", { children: [_jsx("strong", { children: "Resize the Image:" }), " Click the \"Resize Image\" button. The tool will process the image and display a preview of the resized version."] }), _jsxs("li", { children: [_jsx("strong", { children: "Download:" }), " If you are satisfied with the result, click the \"Download Resized Image\" button to save it to your device."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Will resizing the image reduce its quality?" }), _jsx("p", { className: "text-muted-foreground", children: "Shrinking an image generally does not result in a noticeable loss of quality. However, significantly enlarging an image can cause it to become blurry or pixelated, as the software has to create new pixel data. For best results, always start with the highest quality image possible." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "What image formats are supported?" }), _jsx("p", { className: "text-muted-foreground", children: "Our tool supports all major image formats, including JPG, PNG, GIF, and WebP." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is my data secure?" }), _jsx("p", { className: "text-muted-foreground", children: "Yes, all image processing is done directly in your browser. Your images are never uploaded to our servers, ensuring your data remains private and secure." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "The term \"pixel\" is short for \"picture element.\" It's the smallest controllable element of a picture represented on a screen. When you resize an image, you are essentially changing the number of pixels that make up that image. The first digital image was created in 1957 by Russell Kirsch, and it was a 176x176 pixel scan of his infant son." })] })] })] }));
};
export default ImageResizerTool;
