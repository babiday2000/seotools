import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const ImageCropperTool = () => {
    const [upImg, setUpImg] = useState(null);
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const imgRef = useRef(null);
    const fileInputRef = useRef(null);
    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const onImageLoad = (e) => {
        imgRef.current = e.currentTarget;
    };
    const handleCropImage = () => {
        if (!completedCrop || !imgRef.current) {
            toast.error('Please select a crop area.');
            return;
        }
        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(image, completedCrop.x * scaleX, completedCrop.y * scaleY, completedCrop.width * scaleX, completedCrop.height * scaleY, 0, 0, completedCrop.width, completedCrop.height);
            setCroppedImageUrl(canvas.toDataURL('image/png'));
        }
    };
    const handleDownload = () => {
        if (croppedImageUrl) {
            const link = document.createElement('a');
            link.href = croppedImageUrl;
            link.download = 'cropped_image.png';
            link.click();
        }
    };
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer", onClick: triggerFileSelect, children: [_jsx(Input, { type: "file", ref: fileInputRef, onChange: onSelectFile, className: "hidden", accept: "image/*" }), !upImg && _jsx("p", { children: "Click to select an image" })] }), upImg && (_jsx(ReactCrop, { crop: crop, onChange: (c) => setCrop(c), onComplete: (c) => setCompletedCrop(c), children: _jsx("img", { ref: imgRef, src: upImg, onLoad: onImageLoad, alt: "Crop" }) })), upImg && (_jsx(Button, { onClick: handleCropImage, children: "Crop Image" })), croppedImageUrl && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Cropped Image:" }), _jsx("img", { src: croppedImageUrl, alt: "Cropped", className: "max-w-full h-auto mt-2" }), _jsx(Button, { onClick: handleDownload, className: "mt-2", children: "Download Cropped Image" })] })), _jsx(ContentDisplay, { title: "What is an Image Cropper?", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "An Image Cropper is a tool that allows you to select a specific area of an image and remove the unwanted parts. This is a fundamental image editing technique used to improve the composition of a photo, focus on a particular subject, or change the aspect ratio of an image. Whether you are a photographer, a graphic designer, or just someone who wants to improve their photos, this tool provides a simple and efficient way to crop your images." }), _jsx("p", { children: "The primary purpose of this tool is to make it easy to remove unwanted parts of an image and focus on the main subject. This can be useful for a variety of creative and practical purposes, such as creating a close-up of a person's face, removing distracting background elements, or preparing an image for a specific layout. By providing a user-friendly interface, this tool makes it easy for anyone to crop their images without needing to install any software." })] }) }), _jsx(ContentDisplay, { title: "Key Components of an Image Cropper", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "To perform the crop, the tool relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool." }), _jsxs("ul", { className: "list-disc space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Input File:" }), " This is the image file you want to crop. You can select a file from your computer using the file selector."] }), _jsxs("li", { children: [_jsx("strong", { children: "Crop Area:" }), " This is the area of the image you want to keep. You can select the crop area by dragging a rectangle over the image."] }), _jsxs("li", { children: [_jsx("strong", { children: "Conversion Logic:" }), " The core of the converter is its ability to read the input image data and create a new image that contains only the selected crop area. This is done using the browser's built-in canvas API, which provides a powerful and efficient way to manipulate image data."] })] }), _jsx("p", { children: "These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the crop without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant." })] }) }), _jsx(ContentDisplay, { title: "How to Use the Image Cropper", content: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "Using the Image Cropper is a simple and straightforward process. Follow these steps to get your result:" }), _jsxs("ol", { className: "list-decimal space-y-2 pl-6", children: [_jsxs("li", { children: [_jsx("strong", { children: "Select an Image:" }), " Click the \"Click to select an image\" button to choose an image file from your computer."] }), _jsxs("li", { children: [_jsx("strong", { children: "Select a Crop Area:" }), " Drag a rectangle over the image to select the area you want to keep."] }), _jsxs("li", { children: [_jsx("strong", { children: "Click \"Crop Image\":" }), " Press the \"Crop Image\" button. The tool will instantly display the cropped image in the result section."] }), _jsxs("li", { children: [_jsx("strong", { children: "Download the Cropped Image:" }), " Click the \"Download Cropped Image\" button to save the cropped image to your computer."] })] }), _jsx("p", { children: "This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your image cropping needs." })] }) }), _jsx(ContentDisplay, { title: "Frequently Asked Questions (FAQ)", content: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "What is the difference between cropping and resizing an image?" }), _jsx("p", { children: "Cropping an image removes unwanted parts of the image, while resizing an image changes its dimensions. Cropping is like cutting out a part of a photo, while resizing is like shrinking or enlarging the entire photo." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Can I crop an image to a specific size?" }), _jsx("p", { children: "This tool allows you to select a crop area of any size. If you need to resize the cropped image to a specific size, you can use our Image Resizer tool." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Does cropping an image reduce its quality?" }), _jsx("p", { children: "No, cropping an image does not reduce its quality. The tool simply removes the unwanted parts of the image, leaving the cropped area at its original quality." })] })] }) }), _jsx(ContentDisplay, { title: "Fun Fact", content: _jsx("p", { children: "Did you know that the concept of cropping an image is as old as photography itself? In the early days of photography, photographers would often crop their images in the darkroom by enlarging only a portion of the negative. This allowed them to improve the composition of their photos and focus on the main subject, a technique that is still widely used today." }) })] }));
};
export default ImageCropperTool;
