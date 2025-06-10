import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const PngToIcoConverterTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [icoSize, setIcoSize] = useState<number>(32);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'image/png') {
      setSelectedFile(file);
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
          accept="image/png"
        />
        {selectedFile ? (
          <p>Selected file: {selectedFile.name}</p>
        ) : (
          <p>Click to select a .png file</p>
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

      <Button onClick={handleConvert} disabled={!selectedFile || isLoading}>
        {isLoading ? 'Converting...' : 'Convert and Download'}
      </Button>
    </div>
  );
};

export default PngToIcoConverterTool;
