import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
const ImageResizerTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResizedImageUrl(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target?.result as string;
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

  return (
    <div className="p-4 space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Image Resizer</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Quickly resize any image to your desired dimensions. Our tool makes it easy to adjust the width and height of your images for social media, websites, or any other project, all within your browser.
        </p>
      </div>
      <div
        className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer max-w-4xl mx-auto"
        onClick={triggerFileSelect}
      >
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        {selectedFile ? (
          <p>Selected file: {selectedFile.name}</p>
        ) : (
          <p>Click to select an image</p>
        )}
      </div>

      {selectedFile && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width-input">Width:</Label>
            <Input
              id="width-input"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="height-input">Height:</Label>
            <Input
              id="height-input"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
        </div>
      )}

      <Button onClick={handleResize} disabled={!selectedFile || isLoading}>
        {isLoading ? 'Resizing...' : 'Resize Image'}
      </Button>

      {resizedImageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Resized Image:</h3>
          <img src={resizedImageUrl} alt="Resized" className="max-w-full h-auto mt-2" />
          <Button onClick={handleDownload} className="mt-2">
            Download Resized Image
          </Button>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is an Image Resizer?</h2>
          <p className="text-muted-foreground">
            An Image Resizer is a tool that allows you to change the dimensions (width and height) of a digital image. This is a fundamental task in digital image editing, essential for adapting images to various platforms and use cases. Whether you need to shrink a large photo to reduce its file size for a website or enlarge a small image for a presentation, a resizer tool provides the necessary controls. Our browser-based tool eliminates the need for complex software like Photoshop, offering a quick and straightforward way to get your images to the perfect size.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Resizing Images is Important</h2>
          <p className="text-muted-foreground">
            Properly sized images are crucial for a variety of reasons, particularly in web development and digital marketing:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Website Performance:</strong> Large, unoptimized images are one of the biggest causes of slow-loading websites. Resizing images to the exact dimensions needed for your layout significantly reduces file size and improves page speed, which is a key factor for both user experience and SEO.</li>
            <li><strong>Social Media Compliance:</strong> Each social media platform has its own recommended image dimensions for profile pictures, headers, and posts. Using a resizer ensures your images look their best and aren't awkwardly cropped.</li>
            <li><strong>Email Marketing:</strong> Oversized images in emails can lead to slow loading times and may even trigger spam filters. Resizing images is essential for creating professional and effective email campaigns.</li>
            <li><strong>Consistency:</strong> Maintaining consistent image sizes across your website or project creates a more professional and visually appealing look.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Image Resizer</h2>
          <p className="text-muted-foreground">
            Resizing your image is a simple process with our tool:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Select Your Image:</strong> Click the designated area to upload an image from your computer.</li>
            <li><strong>Enter New Dimensions:</strong> Once the image is loaded, its current width and height will be displayed. Enter your desired new dimensions in the input fields.</li>
            <li><strong>Resize the Image:</strong> Click the "Resize Image" button. The tool will process the image and display a preview of the resized version.</li>
            <li><strong>Download:</strong> If you are satisfied with the result, click the "Download Resized Image" button to save it to your device.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Will resizing the image reduce its quality?</h3>
              <p className="text-muted-foreground">Shrinking an image generally does not result in a noticeable loss of quality. However, significantly enlarging an image can cause it to become blurry or pixelated, as the software has to create new pixel data. For best results, always start with the highest quality image possible.</p>
            </div>
            <div>
              <h3 className="font-semibold">What image formats are supported?</h3>
              <p className="text-muted-foreground">Our tool supports all major image formats, including JPG, PNG, GIF, and WebP.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is my data secure?</h3>
              <p className="text-muted-foreground">Yes, all image processing is done directly in your browser. Your images are never uploaded to our servers, ensuring your data remains private and secure.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The term "pixel" is short for "picture element." It's the smallest controllable element of a picture represented on a screen. When you resize an image, you are essentially changing the number of pixels that make up that image. The first digital image was created in 1957 by Russell Kirsch, and it was a 176x176 pixel scan of his infant son.
          </p>
        </section>

      </div>
    </div>
  );
};

export default ImageResizerTool;
