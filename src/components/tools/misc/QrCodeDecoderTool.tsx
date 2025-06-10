import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Html5Qrcode } from 'html5-qrcode';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';
import { Input } from '@/components/ui/input';

const QrCodeDecoderTool = () => {
  const [decodedText, setDecodedText] = useState('');
  const [error, setError] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-reader');
    scannerRef.current = scanner;

    const qrCodeSuccessCallback = (decodedText: string) => {
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
            scanner.start(
              cameraId, 
              config, 
              qrCodeSuccessCallback, 
              qrCodeErrorCallback
            ).catch(() => {
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (scannerRef.current) {
        try {
          const decodedText = await scannerRef.current.scanFile(file, true);
          setDecodedText(decodedText);
          setError('');
        } catch {
          setError('Could not decode QR code from the image. Please try a different image.');
          setDecodedText('');
        }
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>QR Code Decoder</CardTitle>
        </CardHeader>
        <CardContent>
          <div id="qr-reader" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}></div>
          <div className="my-4 text-center">
            <p>OR</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full max-w-xs"
            />
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {decodedText && (
            <div className="mt-4 text-lg bg-muted/20 p-4 rounded-lg">
              <p className="font-bold">Decoded Text:</p>
              <p className="font-mono break-words">{decodedText}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a QR Code Decoder?</h2>
        <p className="text-lg">
          A QR Code Decoder, also known as a QR Code Scanner or Reader, is a tool designed to interpret the data stored within a Quick Response (QR) code. QR codes are two-dimensional barcodes that can store various types of information, such as website URLs, text, contact information, or Wi-Fi network credentials. Our online decoder uses your device's camera to scan a QR code and instantly reveals the information it contains. This tool is perfect for anyone who needs to quickly access the data hidden within a QR code without needing to install a dedicated app on their smartphone.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in QR Code Decoding</h3>
          <p>
            The process of decoding a QR code is a fascinating intersection of image processing and data recovery. Several factors are involved:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Image Quality:</strong> The clarity of the QR code is paramount. The decoder needs a clear image to work with. Factors like camera focus, lighting, and the physical condition of the QR code (e.g., if it's printed on a crumpled piece of paper) can affect the decoding success.</li>
            <li><strong>Finder Patterns:</strong> QR codes have three distinctive squares at their corners. These are called finder patterns. The decoder uses these patterns to determine the orientation and alignment of the QR code, so it can be read correctly even if it's tilted or upside down.</li>
            <li><strong>Error Correction:</strong> QR codes have a built-in error correction capability. This means that even if a part of the code is damaged or obscured, the decoder can often still recover all of the original data. There are four levels of error correction (L, M, Q, H), with H providing the highest level of data recovery.</li>
            <li><strong>Data Encoding:</strong> The data within a QR code is encoded in a specific format. The decoder must recognize this format to correctly interpret the binary data and convert it back into a readable format, such as text or a URL.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our QR Code Decoder</h3>
          <p>
            Our tool is built to be simple and effective.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Camera Viewfinder:</strong> The main part of the tool is the live feed from your camera, displayed on the page. This is where you will align the QR code for scanning.</li>
            <li><strong>Scanning Library:</strong> We use a powerful JavaScript library that handles the complex task of finding the QR code in the camera's video stream and decoding the data it contains.</li>
            <li><strong>Result Display:</strong> Once a QR code is successfully decoded, the information is displayed clearly below the viewfinder, ready for you to read or copy.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the QR Code Decoder</h3>
          <p>
            Decoding a QR code is incredibly simple with our tool.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Grant Camera Access:</strong> When you load the page, your browser will ask for permission to use your camera. You must grant access for the tool to work.</li>
            <li><strong>Point Your Camera:</strong> Position your device's camera so that the QR code is clearly visible within the viewfinder box on the screen.</li>
            <li><strong>Automatic Decoding:</strong> The tool will automatically detect and decode the QR code. The decoded text or link will appear below the camera view as soon as it's read.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Do I need to install any software to use this?</AccordionTrigger>
              <AccordionContent>
                No, our QR Code Decoder works entirely within your web browser. As long as you are using a modern browser that supports the necessary web standards (like Chrome, Firefox, or Safari) and have a camera, you don't need to install anything.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it safe to use an online QR code decoder?</AccordionTrigger>
              <AccordionContent>
                Yes, our tool is safe. All the processing is done directly in your browser. The camera feed is not sent to our servers. However, you should always be cautious about the content of the QR codes you scan. Do not open links or download files from QR codes unless you trust the source.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Why isn't the scanner detecting my QR code?</AccordionTrigger>
              <AccordionContent>
                There could be several reasons. Ensure the QR code is well-lit and not in shadow. Make sure your camera is focused and the QR code is not blurry. The entire QR code, including the quiet zone (the white border around it), should be visible in the viewfinder. Also, check if the QR code itself is damaged.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>Can this tool decode QR codes from an image file?</AccordionTrigger>
              <AccordionContent>
                Yes! Our tool now supports decoding from both a live camera feed and an uploaded image file. Simply use the file selector to choose an image from your device.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            QR codes were invented in 1994 by a Japanese company called Denso Wave, a subsidiary of Toyota. They were originally designed to track vehicle parts during the manufacturing process. The "QR" stands for "Quick Response," as the creator intended the code to be decoded at high speed. It wasn't until the rise of smartphones with cameras that they became the ubiquitous marketing and information-sharing tool we know today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QrCodeDecoderTool;
