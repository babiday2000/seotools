import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import convert from 'color-convert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const HexToRgbConverterTool = () => {
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');

  const handleConvert = () => {
    try {
      const rgbValue = convert.hex.rgb(hex);
      setRgb(`rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]})`);
    } catch {
      setRgb('Invalid HEX color');
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>HEX to RGB Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              type="text"
              placeholder="Enter HEX color (e.g., #ffffff)"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
            />
            <Button onClick={handleConvert}>Convert</Button>
          </div>
          {rgb && (
            <div className="text-lg">
              <p>RGB Color: {rgb}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a HEX to RGB Converter?</h2>
        <p className="text-lg">
          A HEX to RGB Converter is a tool that translates a hexadecimal (HEX) color code into its equivalent Red, Green, and Blue (RGB) values. HEX codes are commonly used in web design and development, while RGB values are used in a wide range of applications, including digital photography and graphic design software. This tool is essential for designers and developers who need to work with both color systems and ensure color consistency across different platforms.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in Color Conversion (HEX vs. RGB)</h3>
          <p>
            The conversion from HEX to RGB is a straightforward mathematical process.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>HEX Code Structure:</strong> A HEX color code is a six-digit hexadecimal number, often preceded by a hash (`#`). The six digits are divided into three pairs, with each pair representing the intensity of Red, Green, and Blue, respectively. For example, in the HEX code `#FF5733`, `FF` is Red, `57` is Green, and `33` is Blue.</li>
            <li><strong>RGB Value Structure:</strong> An RGB color is represented by three numbers, each ranging from 0 to 255. These numbers correspond to the intensity of Red, Green, and Blue. For example, `rgb(255, 87, 51)`.</li>
            <li><strong>Conversion Process:</strong> To convert from HEX to RGB, each pair of hexadecimal digits is converted into its decimal equivalent. For example, `FF` in hexadecimal is `255` in decimal, `57` is `87`, and `33` is `51`.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our HEX to RGB Converter</h3>
          <p>
            Our tool is designed for simplicity and accuracy.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>HEX Input Field:</strong> A text box where you can enter the HEX color code.</li>
            <li><strong>Convert Button:</strong> This button initiates the conversion.</li>
            <li><strong>RGB Output:</strong> The resulting RGB value is displayed clearly.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the HEX to RGB Converter</h3>
          <p>
            Converting your color code is easy.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Enter HEX Code:</strong> Type or paste your HEX color code into the input field. You can include the leading `#` or omit it.</li>
            <li><strong>Click Convert:</strong> Press the "Convert" button.</li>
            <li><strong>Get RGB Value:</strong> The tool will instantly display the corresponding RGB value.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a valid HEX code?</AccordionTrigger>
              <AccordionContent>
                A valid HEX code consists of three or six hexadecimal characters. A three-character code (e.g., `#F0C`) is a shorthand for the six-character version (e.g., `#FF00CC`). Our tool supports both formats.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why are there two different color systems?</AccordionTrigger>
              <AccordionContent>
                HEX codes are popular in web development because they are a concise way to represent a color in a single string. RGB values are more common in programming and design software, where colors are often manipulated as separate red, green, and blue components.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What does "Invalid HEX color" mean?</AccordionTrigger>
              <AccordionContent>
                This error indicates that the text you entered is not a valid hexadecimal color code. Please ensure that your input contains only valid hexadecimal characters (0-9 and A-F) and is either three or six characters long.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The concept of representing colors with numbers dates back to the 19th century, but the specific HEX and RGB systems we use today were standardized with the advent of personal computers and the World Wide Web. The 16,777,216 possible colors in the 24-bit RGB system (`256 * 256 * 256`) became the standard for "true color" displays.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HexToRgbConverterTool;
