import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Html5Qrcode } from 'html5-qrcode';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';
import { Input } from '@/components/ui/input';
const QrCodeDecoderTool = () => {
    const [decodedText, setDecodedText] = useState('');
    const [error, setError] = useState('');
    const scannerRef = useRef(null);
    const fileInputRef = useRef(null);
    useEffect(() => {
        const scanner = new Html5Qrcode('qr-reader');
        scannerRef.current = scanner;
        const qrCodeSuccessCallback = (decodedText) => {
            setDecodedText(decodedText);
            setError('');
            scanner.stop().catch(err => console.error("Failed to stop scanner", err));
        };
        const qrCodeErrorCallback = () => {
            // Errors are frequent, so we'll only log them for debugging
        };
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        Html5Qrcode.getCameras().then(cameras => {
            if (cameras && cameras.length) {
                const cameraId = cameras[0].id;
                scanner.start(cameraId, config, qrCodeSuccessCallback, qrCodeErrorCallback).catch(() => {
                    setError("Unable to start scanning. Please ensure you have a camera connected and have granted permission.");
                });
            }
        }).catch(() => {
            setError("Could not get camera permissions. Please grant access to use the scanner.");
        });
        return () => {
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(err => console.error("Failed to stop scanner on cleanup", err));
            }
        };
    }, []);
    const handleFileChange = async (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (scannerRef.current) {
                try {
                    const decodedText = await scannerRef.current.scanFile(file, true);
                    setDecodedText(decodedText);
                    setError('');
                }
                catch {
                    setError('Could not decode QR code from the image. Please try a different image.');
                    setDecodedText('');
                }
            }
        }
    };
    return (_jsxs("div", { children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "QR Code Decoder" }) }), _jsxs(CardContent, { children: [_jsx("div", { id: "qr-reader", style: { width: '100%', maxWidth: '500px', margin: '0 auto' } }), _jsx("div", { className: "my-4 text-center", children: _jsx("p", { children: "OR" }) }), _jsx("div", { className: "flex items-center justify-center w-full", children: _jsx(Input, { type: "file", accept: "image/*", ref: fileInputRef, onChange: handleFileChange, className: "w-full max-w-xs" }) }), error && _jsx("p", { className: "text-red-500 mt-4 text-center", children: error }), decodedText && (_jsxs("div", { className: "mt-4 text-lg bg-muted/20 p-4 rounded-lg", children: [_jsx("p", { className: "font-bold", children: "Decoded Text:" }), _jsx("p", { className: "font-mono break-words", children: decodedText })] }))] })] }), _jsx(AdsensePlaceholder, { className: "my-4" }), _jsxs("div", { className: "mt-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is a QR Code Decoder?" }), _jsx("p", { className: "text-lg", children: "A QR Code Decoder, also known as a QR Code Scanner or Reader, is a tool designed to interpret the data stored within a Quick Response (QR) code. QR codes are two-dimensional barcodes that can store various types of information, such as website URLs, text, contact information, or Wi-Fi network credentials. Our online decoder uses your device's camera to scan a QR code and instantly reveals the information it contains. This tool is perfect for anyone who needs to quickly access the data hidden within a QR code without needing to install a dedicated app on their smartphone." }), _jsxs("div", { className: "my-4", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Factors in QR Code Decoding" }), _jsx("p", { children: "The process of decoding a QR code is a fascinating intersection of image processing and data recovery. Several factors are involved:" }), _jsxs("ul", { className: "list-disc list-inside ml-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Image Quality:" }), " The clarity of the QR code is paramount. The decoder needs a clear image to work with. Factors like camera focus, lighting, and the physical condition of the QR code (e.g., if it's printed on a crumpled piece of paper) can affect the decoding success."] }), _jsxs("li", { children: [_jsx("strong", { children: "Finder Patterns:" }), " QR codes have three distinctive squares at their corners. These are called finder patterns. The decoder uses these patterns to determine the orientation and alignment of the QR code, so it can be read correctly even if it's tilted or upside down."] }), _jsxs("li", { children: [_jsx("strong", { children: "Error Correction:" }), " QR codes have a built-in error correction capability. This means that even if a part of the code is damaged or obscured, the decoder can often still recover all of the original data. There are four levels of error correction (L, M, Q, H), with H providing the highest level of data recovery."] }), _jsxs("li", { children: [_jsx("strong", { children: "Data Encoding:" }), " The data within a QR code is encoded in a specific format. The decoder must recognize this format to correctly interpret the binary data and convert it back into a readable format, such as text or a URL."] })] })] }), _jsx(AdsensePlaceholder, { className: "my-4" }), _jsxs("div", { className: "my-4", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Key Components of Our QR Code Decoder" }), _jsx("p", { children: "Our tool is built to be simple and effective." }), _jsxs("ul", { className: "list-disc list-inside ml-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Camera Viewfinder:" }), " The main part of the tool is the live feed from your camera, displayed on the page. This is where you will align the QR code for scanning."] }), _jsxs("li", { children: [_jsx("strong", { children: "Scanning Library:" }), " We use a powerful JavaScript library that handles the complex task of finding the QR code in the camera's video stream and decoding the data it contains."] }), _jsxs("li", { children: [_jsx("strong", { children: "Result Display:" }), " Once a QR code is successfully decoded, the information is displayed clearly below the viewfinder, ready for you to read or copy."] })] })] }), _jsxs("div", { className: "my-4", children: [_jsx("h3", { className: "text-xl font-semibold", children: "How to Use the QR Code Decoder" }), _jsx("p", { children: "Decoding a QR code is incredibly simple with our tool." }), _jsxs("ol", { className: "list-decimal list-inside ml-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Grant Camera Access:" }), " When you load the page, your browser will ask for permission to use your camera. You must grant access for the tool to work."] }), _jsxs("li", { children: [_jsx("strong", { children: "Point Your Camera:" }), " Position your device's camera so that the QR code is clearly visible within the viewfinder box on the screen."] }), _jsxs("li", { children: [_jsx("strong", { children: "Automatic Decoding:" }), " The tool will automatically detect and decode the QR code. The decoded text or link will appear below the camera view as soon as it's read."] })] })] }), _jsxs("div", { className: "my-4", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Frequently Asked Questions (FAQ)" }), _jsxs(Accordion, { type: "single", collapsible: true, children: [_jsxs(AccordionItem, { value: "item-1", children: [_jsx(AccordionTrigger, { children: "Do I need to install any software to use this?" }), _jsx(AccordionContent, { children: "No, our QR Code Decoder works entirely within your web browser. As long as you are using a modern browser that supports the necessary web standards (like Chrome, Firefox, or Safari) and have a camera, you don't need to install anything." })] }), _jsxs(AccordionItem, { value: "item-2", children: [_jsx(AccordionTrigger, { children: "Is it safe to use an online QR code decoder?" }), _jsx(AccordionContent, { children: "Yes, our tool is safe. All the processing is done directly in your browser. The camera feed is not sent to our servers. However, you should always be cautious about the content of the QR codes you scan. Do not open links or download files from QR codes unless you trust the source." })] }), _jsxs(AccordionItem, { value: "item-3", children: [_jsx(AccordionTrigger, { children: "Why isn't the scanner detecting my QR code?" }), _jsx(AccordionContent, { children: "There could be several reasons. Ensure the QR code is well-lit and not in shadow. Make sure your camera is focused and the QR code is not blurry. The entire QR code, including the quiet zone (the white border around it), should be visible in the viewfinder. Also, check if the QR code itself is damaged." })] }), _jsxs(AccordionItem, { value: "item-4", children: [_jsx(AccordionTrigger, { children: "Can this tool decode QR codes from an image file?" }), _jsx(AccordionContent, { children: "Yes! Our tool now supports decoding from both a live camera feed and an uploaded image file. Simply use the file selector to choose an image from your device." })] })] })] }), _jsxs("div", { className: "my-4", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Fun Fact" }), _jsx("p", { children: "QR codes were invented in 1994 by a Japanese company called Denso Wave, a subsidiary of Toyota. They were originally designed to track vehicle parts during the manufacturing process. The \"QR\" stands for \"Quick Response,\" as the creator intended the code to be decoded at high speed. It wasn't until the rise of smartphones with cameras that they became the ubiquitous marketing and information-sharing tool we know today." })] })] })] }));
};
export default QrCodeDecoderTool;
