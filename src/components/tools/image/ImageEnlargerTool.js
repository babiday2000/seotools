import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RelatedTools from '@/components/RelatedTools';
const ImageEnlargerTool = () => {
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(2);
    const [enlargedImage, setEnlargedImage] = useState(null);
    const canvasRef = useRef(null);
    const [originalFileName, setOriginalFileName] = useState(null);
    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            setOriginalFileName(event.target.files[0].name);
            reader.onload = (e) => {
                setImage(e.target?.result);
                setEnlargedImage(null);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    const handleEnlarge = () => {
        if (image && canvasRef.current) {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                const canvas = canvasRef.current;
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        canvas.width = img.width * scale;
                        canvas.height = img.height * scale;
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        setEnlargedImage(canvas.toDataURL('image/png'));
                    }
                }
            };
        }
    };
    const handleDownload = () => {
        if (enlargedImage) {
            const link = document.createElement('a');
            link.href = enlargedImage;
            const fileName = originalFileName ? `enlarged_${originalFileName}` : 'enlarged_image.png';
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Image Enlarger" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "image-upload", children: "Upload Image" }), _jsx(Input, { id: "image-upload", type: "file", accept: "image/*", onChange: handleImageUpload })] }), image && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Original Image" }), _jsx("img", { src: image, alt: "Original", className: "max-w-full h-auto" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { children: ["Scale: ", scale, "x"] }), _jsx(Slider, { min: 1.1, max: 8, step: 0.1, value: [scale], onValueChange: (value) => setScale(value[0]) })] }), _jsx(Button, { onClick: handleEnlarge, children: "Enlarge Image" })] })), enlargedImage && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Enlarged Image" }), _jsx("img", { src: enlargedImage, alt: "Enlarged", className: "max-w-full h-auto" })] }), _jsx(Button, { onClick: handleDownload, children: "Download Enlarged Image" })] }))] }) })] }), _jsx("canvas", { ref: canvasRef, className: "hidden" }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "What is an Image Enlarger?" }) }), _jsx(CardContent, { children: _jsx("p", { children: "An Image Enlarger is a tool that increases the dimensions of an image, making it larger than its original size. This process, also known as upscaling, is essential for a variety of applications where a higher resolution image is required. Whether you are a graphic designer, a photographer, or a content creator, an image enlarger can help you enhance your images for print, web, or social media." }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Factors and Key Components" }) }), _jsx(CardContent, { children: _jsxs("ul", { className: "list-disc list-inside", children: [_jsxs("li", { children: [_jsx("strong", { children: "Interpolation Algorithm:" }), " The core of any image enlarger is its interpolation algorithm. This algorithm determines how new pixels are created to fill in the extra space in the enlarged image. Common algorithms include nearest-neighbor, bilinear, and bicubic interpolation. More advanced techniques, such as AI-powered upscaling, can produce even better results by intelligently predicting and generating new pixel data."] }), _jsxs("li", { children: [_jsx("strong", { children: "Scaling Factor:" }), " The scaling factor determines how much larger the new image will be. A scaling factor of 2x will double the dimensions of the image, while a 4x factor will quadruple them. The higher the scaling factor, the more new pixels need to be created, which can affect the quality of the final image."] }), _jsxs("li", { children: [_jsx("strong", { children: "Image Quality:" }), " The quality of the enlarged image depends on several factors, including the original image's resolution, the scaling factor, and the interpolation algorithm used. A high-quality original image will generally produce a better-enlarged image."] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "How to Use the Image Enlarger" }) }), _jsx(CardContent, { children: _jsxs("ol", { className: "list-decimal list-inside", children: [_jsx("li", { children: "Upload your image using the file selector." }), _jsx("li", { children: "Adjust the scaling factor to your desired level." }), _jsx("li", { children: "Click the \"Enlarge Image\" button to process the image." }), _jsx("li", { children: "Preview the enlarged image and download it if you are satisfied with the result." })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Frequently Asked Questions (FAQ)" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Will enlarging an image reduce its quality?" }), _jsx("p", { children: "Enlarging an image can sometimes result in a loss of quality, especially if the original image has a low resolution. However, our tool uses advanced interpolation algorithms to minimize quality loss and produce the best possible result." })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "What is the maximum scaling factor?" }), _jsx("p", { children: "Our tool allows you to enlarge an image up to 8 times its original size. However, for best results, we recommend a scaling factor of 2x to 4x." })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Fun Fact" }) }), _jsx(CardContent, { children: _jsx("p", { children: "The concept of image scaling has been around since the early days of digital imaging. One of the earliest and most basic interpolation algorithms, nearest-neighbor interpolation, was used in the 1970s to display digital images on CRT monitors." }) })] }), _jsx(RelatedTools, { category: "image-editing-tools", currentToolName: "image-enlarger" })] }));
};
export default ImageEnlargerTool;
