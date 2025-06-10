import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const ImageToBase64ConverterTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64String, setBase64String] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setBase64String('');
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
      setBase64String(reader.result as string);
      setIsLoading(false);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleCopy = () => {
    if (base64String) {
      navigator.clipboard.writeText(base64String);
      toast.success('Base64 string copied to clipboard.');
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

      <Button onClick={handleConvert} disabled={isLoading}>
        {isLoading ? 'Converting...' : 'Convert to Base64'}
      </Button>

      {base64String && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Base64 String:</h3>
          <Textarea
            value={base64String}
            readOnly
            className="mt-2 min-h-[150px]"
          />
          <Button onClick={handleCopy} className="mt-2">
            Copy to Clipboard
          </Button>
        </div>
      )}

      <ContentDisplay
        title="What is an Image to Base64 Converter?"
        content={
          <div className="space-y-4">
            <p>An Image to Base64 Converter is a tool that allows you to convert an image file into a Base64 string. Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. This is particularly useful for embedding images directly into HTML, CSS, or JSON files, as it eliminates the need for separate image files and can improve website performance by reducing the number of HTTP requests.</p>
            <p>The primary purpose of this tool is to provide a simple and efficient way to convert images to Base64 strings. This is essential for web developers and designers who want to optimize their websites and create more efficient and self-contained web pages.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Key Components of an Image to Base64 Converter"
        content={
          <div className="space-y-4">
            <p>To perform the conversion, the tool relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input File:</strong> This is the image file you want to convert. You can select a file from your computer using the file selector.</li>
              <li><strong>Conversion Logic:</strong> The core of the converter is its ability to read the binary data of the input image and encode it into a Base64 string. This is done using the browser's built-in FileReader API, which provides a powerful and efficient way to read file data.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the conversion without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />

      <ContentDisplay
        title="How to Use the Image to Base64 Converter"
        content={
          <div className="space-y-4">
            <p>Using the Image to Base64 Converter is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Select an Image:</strong> Click the "Click to select an image" button to choose an image file from your computer.</li>
              <li><strong>Click "Convert to Base64":</strong> Press the "Convert to Base64" button. The tool will instantly display the Base64 string in the result section.</li>
              <li><strong>Copy the Base64 String:</strong> Click the "Copy to Clipboard" button to copy the Base64 string to your clipboard.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your image to Base64 conversion needs.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is Base64?</h4>
              <p>Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is commonly used to embed binary data, such as images, in text-based formats like HTML, CSS, and JSON.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Why would I want to convert an image to Base64?</h4>
              <p>Converting an image to a Base64 string allows you to embed the image directly into a web page, which can improve performance by reducing the number of HTTP requests. It can also be useful for storing images in a database or for sending images in a JSON payload.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Is there a limit to the size of the image I can convert?</h4>
              <p>While there is no hard limit, converting very large images can result in a very long Base64 string, which can impact performance. It is generally recommended to use this technique for small images, such as icons and logos.</p>
            </div>
          </div>
        }
      />

      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that Base64 encoding is not a form of encryption? It is simply a way to represent binary data in a text-based format. While it can make the data unreadable to humans, it can be easily decoded back to its original form. For this reason, it should not be used to protect sensitive information.</p>
        }
      />

    </div>
  );
};

export default ImageToBase64ConverterTool;
