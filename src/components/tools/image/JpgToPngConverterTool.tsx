import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const JpgToPngConverterTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pngImageUrl, setPngImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setSelectedFile(file);
      setPngImageUrl(null);
    } else {
      toast.error('Please select a valid .jpg or .jpeg file.');
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
          setPngImageUrl(canvas.toDataURL('image/png'));
        }
        setIsLoading(false);
      };
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = () => {
    if (pngImageUrl) {
      const link = document.createElement('a');
      link.href = pngImageUrl;
      link.download = 'converted_image.png';
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
          accept="image/jpeg,image/jpg"
        />
        {selectedFile ? (
          <p>Selected file: {selectedFile.name}</p>
        ) : (
          <p>Click to select a .jpg or .jpeg file</p>
        )}
      </div>

      <Button onClick={handleConvert} disabled={!selectedFile || isLoading}>
        {isLoading ? 'Converting...' : 'Convert to PNG'}
      </Button>

      {pngImageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Converted PNG Image:</h3>
          <img src={pngImageUrl} alt="Converted" className="max-w-full h-auto mt-2" />
          <Button onClick={handleDownload} className="mt-2">
            Download PNG
          </Button>
        </div>
      )}
    </div>
  );
};

export default JpgToPngConverterTool;
