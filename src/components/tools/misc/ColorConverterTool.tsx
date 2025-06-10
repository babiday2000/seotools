import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import convert from 'color-convert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const ColorConverterTool = () => {
  const [color, setColor] = useState('');
  const [converted, setConverted] = useState<{ format: string; value: string; display: string } | null>(null);
  const [error, setError] = useState('');

  const handleConvert = () => {
    setError('');
    setConverted(null);
    if (!color) return;

    try {
      let result;
      const input = color.toLowerCase().trim();
      if (input.startsWith('#')) {
        const rgb = convert.hex.rgb(input);
        result = { format: 'RGB', value: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`, display: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` };
      } else if (input.startsWith('rgb')) {
        const rgbValues = input.replace(/rgb\(|\)/g, '').split(',').map(Number);
        const hex = convert.rgb.hex(rgbValues as [number, number, number]);
        result = { format: 'HEX', value: `#${hex}`, display: `#${hex}` };
      } else {
        throw new Error('Invalid format');
      }
      setConverted(result);
    } catch {
      setError('Invalid color format. Please use #RRGGBB or rgb(r,g,b).');
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Color Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              type="text"
              placeholder="Enter color (e.g., #ffffff or rgb(255,255,255))"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleConvert}>Convert</Button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {converted && (
            <div className="text-lg bg-muted/20 p-4 rounded-lg mt-4">
              <p className="font-bold text-center">Converted Color: <span className="font-mono" style={{ color: converted.value }}>{converted.display}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a Color Converter?</h2>
        <p className="text-lg">
          A Color Converter is a utility that translates color values from one format to another. In web design and development, colors are represented in various formats, most commonly HEX (hexadecimal), RGB (Red, Green, Blue), and HSL (Hue, Saturation, Lightness). Each format has its own use case, and developers often need to switch between them. For example, a designer might provide a color in a HEX code from a design tool like Photoshop, but a developer might need it in RGBa format to add transparency in CSS. Our tool simplifies this process, allowing for quick and accurate conversion between the most popular color codes.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in Color Representation</h3>
          <p>
            Different color models represent colors in different ways:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>HEX (Hexadecimal):</strong> This is a six-digit, three-byte hexadecimal number used in HTML, CSS, and other computing applications. The bytes represent the red, green, and blue components of the color. For example, `#FFFFFF` is white and `#000000` is black.</li>
            <li><strong>RGB (Red, Green, Blue):</strong> This is an additive color model where red, green, and blue light are added together in various ways to reproduce a broad array of colors. Each component can have a value from 0 to 255. For example, `rgb(255, 255, 255)` is white.</li>
            <li><strong>HSL (Hue, Saturation, Lightness):</strong> This model represents colors in a way that is more intuitive to humans. Hue is the type of color (like red or blue), saturation is the intensity of the color, and lightness is how light or dark the color is.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our Color Converter</h3>
          <p>
            Our tool is designed for efficiency and ease of use.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Color Input:</strong> A single field where you can enter a color value in a supported format (e.g., HEX or RGB).</li>
            <li><strong>Convert Button:</strong> This button initiates the conversion process.</li>
            <li><strong>Result Display:</strong> The tool displays the converted color value, along with a preview of the color itself.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the Color Converter</h3>
          <p>
            Converting a color is a simple two-step process.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Enter the Color:</strong> Type or paste the color value you want to convert into the input field. Be sure to use a valid format like `#RRGGBB` or `rgb(r,g,b)`.</li>
            <li><strong>Click Convert:</strong> Press the "Convert" button. The tool will automatically detect the input format and convert it to the alternative format.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What color formats does this tool support?</AccordionTrigger>
              <AccordionContent>
                Currently, this tool supports conversion between HEX and RGB formats, which are the most commonly used formats in web development. We plan to add support for other formats like HSL and CMYK in the future.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why are there different formats for colors?</AccordionTrigger>
              <AccordionContent>
                Different color models are useful for different purposes. RGB is based on how computer screens physically create color with red, green, and blue lights. HEX is just a more compact way of writing RGB values. HSL is often more intuitive for humans to work with when they want to adjust the shade or intensity of a color.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is the difference between RGB and RGBa?</AccordionTrigger>
              <AccordionContent>
                RGBa is an extension of the RGB model that includes an "alpha" channel, which specifies the opacity of the color. An alpha value of 1 is fully opaque, while a value of 0 is fully transparent.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>Can I use 3-digit HEX codes?</AccordionTrigger>
              <AccordionContent>
                Yes, the tool should be able to handle 3-digit HEX codes (e.g., `#fff`). This is a shorthand for colors where the red, green, and blue components have repeating digits (e.g., `#ffffff`). However, for the most accurate results, we recommend using the full 6-digit code.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The concept of representing colors with numbers dates back to the 19th century with the development of the Munsell color system. However, the RGB model we use on our screens was standardized for color television in the 1950s. The first web colors used in the early 1990s were limited to a "web-safe" palette of just 216 colors that were guaranteed to look the same on all 8-bit computer monitors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorConverterTool;
