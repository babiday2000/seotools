import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const Base64ToImageConverterTool: React.FC = () => {
  const [base64String, setBase64String] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConvert = () => {
    if (!base64String) {
      toast.error('Please enter a Base64 string.');
      return;
    }

    setIsLoading(true);
    try {
      // Basic validation for base64 string
      const isBase64 = /^data:image\/[a-zA-Z]+;base64,/.test(base64String);
      if (!isBase64) {
        toast.error('Invalid Base64 image string.');
        setIsLoading(false);
        return;
      }
      setImageUrl(base64String);
    } catch {
      toast.error('Failed to convert Base64 to image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      const extension = imageUrl.split(';')[0].split('/')[1];
      link.download = `converted_image.${extension || 'png'}`;
      link.click();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Base64 String:</h3>
      <Textarea
        value={base64String}
        onChange={(e) => setBase64String(e.target.value)}
        placeholder="Paste your Base64 string here..."
        className="min-h-[150px]"
      />

      <Button onClick={handleConvert} disabled={isLoading}>
        {isLoading ? 'Converting...' : 'Convert to Image'}
      </Button>

      {imageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Converted Image:</h3>
          <img src={imageUrl} alt="Converted from Base64" className="max-w-full h-auto mt-2" />
          <Button onClick={handleDownload} className="mt-2">
            Download Image
          </Button>
        </div>
      )}

      <ContentDisplay
        title="What is a Base64 to Image Converter?"
        content={
          <div className="space-y-4">
            <p>A Base64 to Image Converter is a tool that allows you to convert a Base64 string back into an image file. This is particularly useful for web developers and designers who work with Base64-encoded images and need to view or edit them. By providing a simple and efficient way to decode Base64 strings, this tool makes it easy to work with embedded images.</p>
            <p>The primary purpose of this tool is to provide a simple and efficient way to convert Base64 strings to images. This is essential for web developers and designers who want to work with embedded images and need a quick way to view or edit them.</p>
          </div>
        }
      />

      <ContentDisplay
        title="Key Components of a Base64 to Image Converter"
        content={
          <div className="space-y-4">
            <p>To perform the conversion, the tool relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input String:</strong> This is the Base64 string you want to convert. You can paste the string into the text area.</li>
              <li><strong>Conversion Logic:</strong> The core of the converter is its ability to read the Base64 string and decode it into an image. This is done using the browser's built-in support for data URLs, which allows you to display images directly from a Base64 string.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the conversion without needing to install any software. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />

      <ContentDisplay
        title="How to Use the Base64 to Image Converter"
        content={
          <div className="space-y-4">
            <p>Using the Base64 to Image Converter is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Paste the Base64 String:</strong> Paste the Base64 string into the text area.</li>
              <li><strong>Click "Convert to Image":</strong> Press the "Convert to Image" button. The tool will instantly display the image in the result section.</li>
              <li><strong>Download the Image:</strong> Click the "Download Image" button to save the image to your computer.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your Base64 to image conversion needs.</p>
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
              <h4 className="font-semibold">Why would I want to convert a Base64 string to an image?</h4>
              <p>Converting a Base64 string to an image allows you to view or edit an embedded image. It can also be useful for debugging purposes, as it allows you to see the image that is represented by a Base64 string.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Is there a limit to the size of the Base64 string I can convert?</h4>
              <p>While there is no hard limit, converting very long Base64 strings can impact performance. It is generally recommended to use this technique for small images, such as icons and logos.</p>
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

export default Base64ToImageConverterTool;
