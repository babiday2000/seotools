import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const RotateImageTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [rotatedImageUrl, setRotatedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setRotatedImageUrl(null);
      setRotation(0);
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target?.result as string;
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

  const handleRotationChange = (value: number[]) => {
    setRotation(value[0]);
    rotateImage(value[0]);
  };

  const rotateImage = (angle: number) => {
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

      <div className="space-y-2">
        <Label htmlFor="rotation-slider">Rotation: {rotation}°</Label>
        <Slider
          id="rotation-slider"
          min={-180}
          max={180}
          step={1}
          value={[rotation]}
          onValueChange={handleRotationChange}
          disabled={!selectedFile}
        />
      </div>

      <canvas ref={canvasRef} className="max-w-full h-auto mt-4 border" style={{ display: selectedFile ? 'block' : 'none' }}></canvas>

      {rotatedImageUrl && (
        <div className="mt-4">
          <Button onClick={handleDownload}>
            Download Rotated Image
          </Button>
        </div>
      )}

      <ContentDisplay
        title="What is a Rotate Image Tool?"
        content={
          <div className="space-y-4">
            <p>A Rotate Image tool is a utility that allows you to rotate an image to a specific angle. This is a common image manipulation technique used for a variety of creative and practical purposes. Whether you are a graphic designer, a photographer, or just someone who wants to have some fun with their photos, this tool provides a simple and efficient way to rotate your images.</p>
            <p>The primary purpose of this tool is to make it easy to correct the orientation of an image or to create interesting visual effects. By providing a user-friendly interface, this tool makes it easy for anyone to rotate their images without needing to install any software.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Key Components of a Rotate Image Tool"
        content={
          <div className="space-y-4">
            <p>To perform the rotation, the tool relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input File:</strong> This is the image file you want to rotate. You can select a file from your computer using the file selector.</li>
              <li><strong>Rotation Angle:</strong> This is the angle you want to rotate the image by. You can choose any angle between -180 and 180 degrees using the slider.</li>
              <li><strong>Conversion Logic:</strong> The core of the converter is its ability to read the input image data and apply a transformation to rotate it. This is done using the browser's built-in canvas API, which provides a powerful and efficient way to manipulate image data.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the rotation without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />

      <ContentDisplay
        title="How to Use the Rotate Image Tool"
        content={
          <div className="space-y-4">
            <p>Using the Rotate Image tool is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Select an Image:</strong> Click the "Click to select an image" button to choose an image file from your computer.</li>
              <li><strong>Choose a Rotation Angle:</strong> Use the slider to choose the angle you want to rotate the image by.</li>
              <li><strong>Download the Rotated Image:</strong> Click the "Download Rotated Image" button to save the rotated image to your computer.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your image rotation needs.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the difference between rotating and flipping an image?</h4>
              <p>Rotating an image turns it around a central point, while flipping an image creates a mirror image of the original. Rotating is like turning a photo on a turntable, while flipping is like looking at it in a mirror.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Can I rotate an image to any angle?</h4>
              <p>Yes, you can rotate an image to any angle between -180 and 180 degrees using the slider.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Does rotating an image reduce its quality?</h4>
              <p>Rotating an image can sometimes result in a small loss of quality, especially if you are rotating it by an angle that is not a multiple of 90 degrees. This is because the pixels in the image have to be rearranged to create the rotated image. However, the tool uses a high-quality algorithm to minimize any loss of quality.</p>
            </div>
          </div>
        }
      />

      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the concept of rotating an image is closely related to the mathematical concept of rotation? In geometry, a rotation is a transformation that turns a figure about a fixed point, called the center of rotation. This is exactly what happens when you rotate an image.</p>
        }
      />

    </div>
  );
};

export default RotateImageTool;
