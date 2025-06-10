import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RelatedTools from '@/components/RelatedTools';

const ImageEnlargerTool = () => {
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState(2);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [originalFileName, setOriginalFileName] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      setOriginalFileName(event.target.files[0].name);
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setEnlargedImage(null);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleEnlarge = () => {
    if (image && canvasRef.current) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setEnlargedImage(canvas.toDataURL('image/png'));
          }
        }
      };
    }
  };

  const handleDownload = () => {
    if (enlargedImage) {
      const link = document.createElement('a');
      link.href = enlargedImage;
      const fileName = originalFileName ? `enlarged_${originalFileName}` : 'enlarged_image.png';
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Image Enlarger</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-upload">Upload Image</Label>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            {image && (
              <div className="space-y-4">
                <div>
                  <Label>Original Image</Label>
                  <img src={image} alt="Original" className="max-w-full h-auto" />
                </div>
                <div className="space-y-2">
                  <Label>Scale: {scale}x</Label>
                  <Slider
                    min={1.1}
                    max={8}
                    step={0.1}
                    value={[scale]}
                    onValueChange={(value) => setScale(value[0])}
                  />
                </div>
                <Button onClick={handleEnlarge}>Enlarge Image</Button>
              </div>
            )}
            {enlargedImage && (
              <div className="space-y-4">
                <div>
                  <Label>Enlarged Image</Label>
                  <img src={enlargedImage} alt="Enlarged" className="max-w-full h-auto" />
                </div>
                <Button onClick={handleDownload}>Download Enlarged Image</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <canvas ref={canvasRef} className="hidden"></canvas>

      <Card>
        <CardHeader>
          <CardTitle>What is an Image Enlarger?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>An Image Enlarger is a tool that increases the dimensions of an image, making it larger than its original size. This process, also known as upscaling, is essential for a variety of applications where a higher resolution image is required. Whether you are a graphic designer, a photographer, or a content creator, an image enlarger can help you enhance your images for print, web, or social media.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Factors and Key Components</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li><strong>Interpolation Algorithm:</strong> The core of any image enlarger is its interpolation algorithm. This algorithm determines how new pixels are created to fill in the extra space in the enlarged image. Common algorithms include nearest-neighbor, bilinear, and bicubic interpolation. More advanced techniques, such as AI-powered upscaling, can produce even better results by intelligently predicting and generating new pixel data.</li>
            <li><strong>Scaling Factor:</strong> The scaling factor determines how much larger the new image will be. A scaling factor of 2x will double the dimensions of the image, while a 4x factor will quadruple them. The higher the scaling factor, the more new pixels need to be created, which can affect the quality of the final image.</li>
            <li><strong>Image Quality:</strong> The quality of the enlarged image depends on several factors, including the original image's resolution, the scaling factor, and the interpolation algorithm used. A high-quality original image will generally produce a better-enlarged image.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use the Image Enlarger</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside">
            <li>Upload your image using the file selector.</li>
            <li>Adjust the scaling factor to your desired level.</li>
            <li>Click the "Enlarge Image" button to process the image.</li>
            <li>Preview the enlarged image and download it if you are satisfied with the result.</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions (FAQ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Will enlarging an image reduce its quality?</h4>
              <p>Enlarging an image can sometimes result in a loss of quality, especially if the original image has a low resolution. However, our tool uses advanced interpolation algorithms to minimize quality loss and produce the best possible result.</p>
            </div>
            <div>
              <h4 className="font-semibold">What is the maximum scaling factor?</h4>
              <p>Our tool allows you to enlarge an image up to 8 times its original size. However, for best results, we recommend a scaling factor of 2x to 4x.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fun Fact</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The concept of image scaling has been around since the early days of digital imaging. One of the earliest and most basic interpolation algorithms, nearest-neighbor interpolation, was used in the 1970s to display digital images on CRT monitors.</p>
        </CardContent>
      </Card>
      <RelatedTools category="image-editing-tools" />
    </div>
  );
};

export default ImageEnlargerTool;
