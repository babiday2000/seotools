import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import convert from 'color-convert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const RgbToHexConverterTool = () => {
  const [rgb, setRgb] = useState('');
  const [hex, setHex] = useState('');

  const handleConvert = () => {
    try {
      const hexValue = convert.rgb.hex(JSON.parse(`[${rgb}]`));
      setHex(`#${hexValue}`);
    } catch {
      setHex('Invalid RGB color');
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>RGB to HEX Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              type="text"
              placeholder="Enter RGB color (e.g., 255,255,255)"
              value={rgb}
              onChange={(e) => setRgb(e.target.value)}
            />
            <Button onClick={handleConvert}>Convert</Button>
          </div>
          {hex && (
            <div className="text-lg">
              <p>HEX Color: {hex}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is an RGB to HEX Converter?</h2>
        <p className="text-lg">
          An RGB to HEX Converter is a utility that translates a color from its Red, Green, and Blue (RGB) format to its equivalent hexadecimal (HEX) code. This tool is invaluable for web developers, graphic designers, and anyone working in digital media who needs to ensure color consistency between different applications and platforms. While design software often uses RGB values, web development typically relies on the more compact HEX codes.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in Color Conversion (RGB vs. HEX)</h3>
          <p>
            The conversion from RGB to HEX is a straightforward mathematical process, reversing the HEX to RGB conversion.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>RGB Value Structure:</strong> An RGB color is defined by three numbers, each ranging from 0 to 255, representing the intensity of Red, Green, and Blue. For example, `rgb(255, 87, 51)`.</li>
            <li><strong>HEX Code Structure:</strong> A HEX color code is a six-digit hexadecimal number, often preceded by a hash (`#`). The six digits are divided into three pairs, representing Red, Green, and Blue.</li>
            <li><strong>Conversion Process:</strong> To convert from RGB to HEX, each of the three decimal values (from 0 to 255) is converted into its two-digit hexadecimal equivalent. For example, `255` in decimal is `FF` in hexadecimal, `87` is `57`, and `51` is `33`. These are then concatenated to form the HEX code: `#FF5733`.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our RGB to HEX Converter</h3>
          <p>
            Our tool is designed for ease of use and precision.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>RGB Input Field:</strong> A text box where you can enter the RGB color values, separated by commas.</li>
            <li><strong>Convert Button:</strong> This button initiates the conversion.</li>
            <li><strong>HEX Output:</strong> The resulting HEX code is displayed clearly.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the RGB to HEX Converter</h3>
          <p>
            Converting your color code is simple.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Enter RGB Value:</strong> Type or paste your RGB color values into the input field, separated by commas (e.g., `255, 87, 51`).</li>
            <li><strong>Click Convert:</strong> Press the "Convert" button.</li>
            <li><strong>Get HEX Code:</strong> The tool will instantly display the corresponding HEX code, complete with the leading `#`.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a valid RGB value?</AccordionTrigger>
              <AccordionContent>
                A valid RGB value consists of three numbers, each between 0 and 255, separated by commas. For example, `0, 0, 0` is black, and `255, 255, 255` is white.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is there a difference between `#ff0000` and `#FF0000`?</AccordionTrigger>
              <AccordionContent>
                No, HEX color codes are not case-sensitive. Both `#ff0000` and `#FF0000` represent the same color (pure red). Our converter will output the standard uppercase format.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What does "Invalid RGB color" mean?</AccordionTrigger>
              <AccordionContent>
                This error indicates that the text you entered is not a valid RGB color value. Please ensure that you have entered three numbers, each between 0 and 255, and that they are separated by commas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The hexadecimal system is a base-16 system, which means it uses 16 distinct symbols. It uses the numbers 0-9 to represent values zero to nine, and the letters A, B, C, D, E, F to represent values ten to fifteen. This system is very convenient for computer scientists and programmers because it can represent a byte (8 bits) with just two hexadecimal digits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RgbToHexConverterTool;
