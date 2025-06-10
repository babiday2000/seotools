import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';

const FlipImageTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setOriginalImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFlip = useCallback(
    (direction: 'horizontal' | 'vertical') => {
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
          } else {
            ctx.translate(0, canvas.height);
            ctx.scale(1, -1);
          }

          ctx.drawImage(image, 0, 0);
          ctx.restore();

          setImagePreview(canvas.toDataURL());
          setIsLoading(false);
        };
      }
    },
    [imagePreview]
  );

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

  return (
    <div className="p-4 space-y-4">
      <div
        className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer"
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

      {imagePreview && (
        <div className="mt-4 text-center">
          <img src={imagePreview} alt="Preview" className="max-w-full h-auto mx-auto border" />
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <Button onClick={() => handleFlip('horizontal')} disabled={!selectedFile || isLoading}>
          Flip Horizontal
        </Button>
        <Button onClick={() => handleFlip('vertical')} disabled={!selectedFile || isLoading}>
          Flip Vertical
        </Button>
        <Button onClick={handleReset} disabled={!originalImage || isLoading}>
          Reset
        </Button>
        <Button onClick={handleDownload} disabled={!imagePreview || isLoading}>
          Download Flipped Image
        </Button>
      </div>

      <canvas ref={canvasRef} className="hidden"></canvas>

      <ContentDisplay
        title="What is a Flip Image Tool?"
        content={
          <div className="space-y-4">
            <p>A Flip Image tool is a utility that allows you to mirror an image either horizontally or vertically. This is a common image manipulation technique used for a variety of creative and practical purposes. Whether you are a graphic designer, a photographer, or just someone who wants to have some fun with their photos, this tool provides a simple and efficient way to flip your images.</p>
            <p>The primary purpose of this tool is to make it easy to create a mirror image of your photos. This can be useful for creating interesting visual effects, correcting the orientation of an image, or preparing an image for a specific layout. By providing a user-friendly interface, this tool makes it easy for anyone to flip their images without needing to install any software.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Key Components of a Flip Image Tool"
        content={
          <div className="space-y-4">
            <p>To perform the flip, the tool relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input File:</strong> This is the image file you want to flip. You can select a file from your computer using the file selector.</li>
              <li><strong>Flip Direction:</strong> This is the direction you want to flip the image. You can choose to flip the image horizontally or vertically.</li>
              <li><strong>Conversion Logic:</strong> The core of the converter is its ability to read the input image data and apply a transformation to flip it. This is done using the browser's built-in canvas API, which provides a powerful and efficient way to manipulate image data.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the flip without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />

      <ContentDisplay
        title="How to Use the Flip Image Tool"
        content={
          <div className="space-y-4">
            <p>Using the Flip Image tool is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Select an Image:</strong> Click the "Click to select an image" button to choose an image file from your computer.</li>
              <li><strong>Choose a Flip Direction:</strong> Click either the "Flip Horizontal" or "Flip Vertical" button to flip the image in the desired direction.</li>
              <li><strong>Download the Flipped Image:</strong> Click the "Download Flipped Image" button to save the flipped image to your computer.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your image flipping needs.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the difference between flipping and rotating an image?</h4>
              <p>Flipping an image creates a mirror image of the original, while rotating an image turns it around a central point. Flipping is like looking at the image in a mirror, while rotating is like turning it on a turntable.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Can I flip an image multiple times?</h4>
              <p>Yes, you can flip an image as many times as you like. Each time you click one of the flip buttons, the image will be flipped again from its current state.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Does flipping an image reduce its quality?</h4>
              <p>No, flipping an image does not reduce its quality. The tool uses a lossless process to flip the image, so the quality of the flipped image will be the same as the original.</p>
            </div>
          </div>
        }
      />

      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the concept of flipping an image is closely related to the mathematical concept of reflection? In geometry, a reflection is a transformation that flips a figure over a line, creating a mirror image. This is exactly what happens when you flip an image horizontally or vertically.</p>
        }
      />

    </div>
  );
};

export default FlipImageTool;
