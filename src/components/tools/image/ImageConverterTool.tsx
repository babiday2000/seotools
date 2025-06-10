import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const ImageConverterTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('png');
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setConvertedImageUrl(null);
    }
  };

  const handleConvert = () => {
    if (!selectedFile) {
      toast.error('Please select a file to convert.');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0);
          const convertedUrl = canvas.toDataURL(`image/${targetFormat}`);
          setConvertedImageUrl(convertedUrl);
        }
        setIsLoading(false);
      };
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = () => {
    if (convertedImageUrl) {
      const link = document.createElement('a');
      link.href = convertedImageUrl;
      link.download = `converted_image.${targetFormat}`;
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

      <div className="flex items-center space-x-4">
        <Label htmlFor="format-select">Convert to:</Label>
        <Select value={targetFormat} onValueChange={setTargetFormat}>
          <SelectTrigger id="format-select" className="w-[180px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="webp">WEBP</SelectItem>
            <SelectItem value="gif">GIF</SelectItem>
            <SelectItem value="bmp">BMP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleConvert} disabled={isLoading}>
        {isLoading ? 'Converting...' : 'Convert'}
      </Button>

      {convertedImageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Converted Image:</h3>
          <img src={convertedImageUrl} alt="Converted" className="max-w-full h-auto mt-2" />
          <Button onClick={handleDownload} className="mt-2">
            Download Image
          </Button>
        </div>
      )}

      <ContentDisplay
        title="What is an Image Converter?"
        content={
          <div className="space-y-4">
            <p>An Image Converter is a tool that allows you to change the format of an image file. Different image formats have different characteristics, such as file size, quality, and support for transparency. This tool is essential for web developers, graphic designers, and anyone who works with digital images, as it allows you to choose the best format for your specific needs.</p>
            <p>The primary purpose of an Image Converter is to provide a simple and efficient way to switch between different image formats. Whether you need to convert a PNG to a JPEG for a smaller file size, or a JPEG to a WEBP for better web performance, this tool makes the process quick and easy.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Key Components of an Image Converter"
        content={
          <div className="space-y-4">
            <p>To perform accurate conversions, the Image Converter relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input File:</strong> This is the image file you want to convert. You can select a file from your computer using the file selector.</li>
              <li><strong>Target Format:</strong> This is the format you want to convert the image to. You can choose from a variety of formats, such as PNG, JPEG, WEBP, GIF, and BMP.</li>
              <li><strong>Conversion Logic:</strong> The core of the converter is its ability to read the input image data and re-encode it in the target format. This is done using the browser's built-in canvas API, which provides a powerful and efficient way to manipulate image data.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform image conversions without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />

      <ContentDisplay
        title="How to Use the Image Converter"
        content={
          <div className="space-y-4">
            <p>Using the Image Converter is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Select an Image:</strong> Click the "Click to select an image" button to choose an image file from your computer.</li>
              <li><strong>Select the Target Format:</strong> Choose the format you want to convert the image to from the dropdown menu.</li>
              <li><strong>Click "Convert":</strong> Press the "Convert" button. The tool will instantly display the converted image in the result section.</li>
              <li><strong>Download the Image:</strong> Click the "Download Image" button to save the converted image to your computer.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your image conversion needs.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the difference between PNG and JPEG?</h4>
              <p>PNG is a lossless compression format, which means that it does not lose any quality when it is compressed. It also supports transparency, which makes it ideal for web graphics. JPEG is a lossy compression format, which means that it does lose some quality when it is compressed. However, it can achieve much smaller file sizes than PNG, which makes it ideal for photographs.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">What is WEBP?</h4>
              <p>WEBP is a modern image format that provides superior lossless and lossy compression for images on the web. It was developed by Google and is designed to create smaller, richer images that make the web faster.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How accurate are the conversions?</h4>
              <p>The conversions are performed using the browser's built-in canvas API, which provides a high degree of accuracy. However, some quality may be lost when converting from a lossless format (like PNG) to a lossy format (like JPEG).</p>
            </div>
          </div>
        }
      />

      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the first digital image was created in 1957 by Russell Kirsch? It was a 176x176 pixel scan of his three-month-old son, and it was the beginning of a revolution in digital imaging that has transformed the way we create, share, and consume visual information.</p>
        }
      />

    </div>
  );
};

export default ImageConverterTool;
