import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const ConvertToIcoTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [icoSize, setIcoSize] = useState<number>(32);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
        canvas.width = icoSize;
        canvas.height = icoSize;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0, icoSize, icoSize);
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/x-icon');
          link.download = 'favicon.ico';
          link.click();
        }
        setIsLoading(false);
      };
    };
    reader.readAsDataURL(selectedFile);
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
        <Label htmlFor="ico-size-select">ICO Size:</Label>
        <Select value={String(icoSize)} onValueChange={(value) => setIcoSize(Number(value))}>
          <SelectTrigger id="ico-size-select" className="w-[180px]">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="16">16x16</SelectItem>
            <SelectItem value="32">32x32</SelectItem>
            <SelectItem value="48">48x48</SelectItem>
            <SelectItem value="64">64x64</SelectItem>
            <SelectItem value="128">128x128</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleConvert} disabled={isLoading}>
        {isLoading ? 'Converting...' : 'Convert and Download'}
      </Button>

      <ContentDisplay
        title="What is a Convert to ICO Tool?"
        content={
          <div className="space-y-4">
            <p>A Convert to ICO tool is a utility that allows you to convert any image file into the ICO format. The ICO format is a special image format used for icons, especially for website favicons. This tool is essential for web developers and designers who want to create a custom favicon for their website, as it provides a simple and efficient way to generate an ICO file from any image.</p>
            <p>The primary purpose of this tool is to make it easy to create a favicon for your website. A favicon is the small icon that appears in the browser tab, bookmarks, and other places, and it is an important part of your website's branding. By using this tool, you can create a professional-looking favicon that will help your website stand out.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Key Components of a Convert to ICO Tool"
        content={
          <div className="space-y-4">
            <p>To perform the conversion, the tool relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input File:</strong> This is the image file you want to convert. You can select a file from your computer using the file selector.</li>
              <li><strong>ICO Size:</strong> This is the size of the ICO file you want to create. You can choose from a variety of standard sizes, such as 16x16, 32x32, and 48x48.</li>
              <li><strong>Conversion Logic:</strong> The core of the converter is its ability to read the input image data and re-encode it in the ICO format. This is done using the browser's built-in canvas API, which provides a powerful and efficient way to manipulate image data.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the conversion without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />

      <ContentDisplay
        title="How to Use the Convert to ICO Tool"
        content={
          <div className="space-y-4">
            <p>Using the Convert to ICO tool is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Select an Image:</strong> Click the "Click to select an image" button to choose an image file from your computer.</li>
              <li><strong>Select the ICO Size:</strong> Choose the size of the ICO file you want to create from the dropdown menu.</li>
              <li><strong>Click "Convert and Download":</strong> Press the "Convert and Download" button. The tool will instantly convert the image and download the ICO file to your computer.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your ICO conversion needs.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is a favicon?</h4>
              <p>A favicon is a small icon that represents a website. It is displayed in the browser tab, bookmarks, and other places, and it is an important part of a website's branding.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">What is the best size for a favicon?</h4>
              <p>The most common size for a favicon is 16x16 pixels, but it is also a good idea to provide a 32x32 pixel version for high-resolution displays. This tool allows you to choose from a variety of standard sizes.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How do I add a favicon to my website?</h4>
              <p>To add a favicon to your website, you need to upload the ICO file to your website's root directory and then add a link to it in the head section of your HTML file. The link should look like this: <link rel="icon" href="/favicon.ico" type="image/x-icon" />.</p>
            </div>
          </div>
        }
      />

      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the first favicon was created by Microsoft for Internet Explorer 5 in 1999? It was a small, 16x16 pixel icon that was displayed in the browser's address bar. The idea was so popular that it was quickly adopted by other browsers, and it has since become a standard feature of the web.</p>
        }
      />

    </div>
  );
};

export default ConvertToIcoTool;
