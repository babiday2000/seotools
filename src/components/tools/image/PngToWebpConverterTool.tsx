import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const PngToWebpConverterTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [webpImageUrl, setWebpImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'image/png') {
      setSelectedFile(file);
      setWebpImageUrl(null);
    } else {
      toast.error('Please select a valid .png file.');
    }
  };

  const handleConvert = () => {
    if (!selectedFile) {
      toast.error('Please select a file to convert.');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target?.result as string;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0);
          setWebpImageUrl(canvas.toDataURL('image/webp'));
        }
        setIsLoading(false);
      };
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = () => {
    if (webpImageUrl) {
      const link = document.createElement('a');
      link.href = webpImageUrl;
      link.download = 'converted_image.webp';
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
          accept="image/png"
        />
        {selectedFile ? (
          <p>Selected file: {selectedFile.name}</p>
        ) : (
          <p>Click to select a .png file</p>
        )}
      </div>

      <Button onClick={handleConvert} disabled={!selectedFile || isLoading}>
        {isLoading ? 'Converting...' : 'Convert to WebP'}
      </Button>

      {webpImageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Converted WebP Image:</h3>
          <img src={webpImageUrl} alt="Converted" className="max-w-full h-auto mt-2" />
          <Button onClick={handleDownload} className="mt-2">
            Download WebP
          </Button>
        </div>
      )}
    </div>
  );
};

export default PngToWebpConverterTool;
