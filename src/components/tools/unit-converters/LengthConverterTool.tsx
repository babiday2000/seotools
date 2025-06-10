import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const units = {
  meters: 1,
  kilometers: 1000,
  centimeters: 0.01,
  millimeters: 0.001,
  miles: 1609.34,
  yards: 0.9144,
  feet: 0.3048,
  inches: 0.0254,
};

const LengthConverterTool = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('kilometers');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      toast.error('Please enter a valid number.');
      return;
    }

    const valueInMeters = numValue * units[fromUnit as keyof typeof units];
    const convertedValue = valueInMeters / units[toUnit as keyof typeof units];
    setResult(convertedValue);
    toast.success('Conversion successful!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Length Converter</CardTitle>
          <CardDescription>Convert between different units of length.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              type="number"
              placeholder="Value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <select
              title="From Unit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {Object.keys(units).map((unit) => (
                <option key={unit} value={unit} className="text-black">
                  {unit}
                </option>
              ))}
            </select>
            <select
              title="To Unit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {Object.keys(units).map((unit) => (
                <option key={unit} value={unit} className="text-black">
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={handleConvert}>Convert</Button>
          {result !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Result:</h3>
              <p className="text-2xl font-bold">{result.toFixed(4)}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a Length Converter?"
        content={
          <div className="space-y-4">
            <p>A Length Converter is a versatile tool designed to simplify the process of converting between different units of length. Whether you are a student working on a math problem, a contractor planning a construction project, or a traveler trying to understand distances in a foreign country, this tool provides a quick and accurate way to perform conversions. It eliminates the need for manual calculations and complex formulas, making it an essential utility for a wide range of applications.</p>
            <p>The primary purpose of a Length Converter is to provide a user-friendly interface for converting between various units of length, such as meters, kilometers, feet, inches, and miles. By simply entering a value in one unit, you can instantly see its equivalent in another. This is particularly useful in fields like engineering, construction, and science, where precise measurements are crucial. For everyday use, it can help with tasks like converting recipe measurements, understanding road signs, or planning home improvement projects.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Length Converter"
        content={
          <div className="space-y-4">
            <p>To perform accurate conversions, the Length Converter relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input Value:</strong> This is the numerical value of the length you want to convert. You enter this number into the designated field.</li>
              <li><strong>From Unit:</strong> This is the unit of the original measurement. You select this from a dropdown menu that includes a comprehensive list of length units.</li>
              <li><strong>To Unit:</strong> This is the unit you want to convert the measurement to. You also select this from a dropdown menu.</li>
              <li><strong>Conversion Factor:</strong> The core of the converter is its database of conversion factors. Each unit is defined by its relationship to a base unit (e.g., the meter). The tool uses these factors to perform the mathematical calculation required for the conversion.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform length conversions without needing to memorize conversion formulas. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Length Converter"
        content={
          <div className="space-y-4">
            <p>Using the Length Converter is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Value:</strong> In the input field, type the numerical value of the length you want to convert.</li>
              <li><strong>Select the "From" Unit:</strong> Choose the unit of your original measurement from the first dropdown menu.</li>
              <li><strong>Select the "To" Unit:</strong> Choose the unit you want to convert to from the second dropdown menu.</li>
              <li><strong>Click "Convert":</strong> Press the "Convert" button. The tool will instantly display the converted length in the result section.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from academic and professional work to everyday tasks. It's a reliable and efficient way to handle all your length conversion needs.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the base unit for the conversions?</h4>
              <p>The conversions are based on the meter as the standard SI unit for length. All other units are converted to meters first and then to the target unit to ensure accuracy.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Can I convert to and from fractional inches?</h4>
              <p>This calculator is designed to work with decimal values. If you have a measurement in fractional inches, you will need to convert it to a decimal first before using the tool.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How accurate are the conversions?</h4>
              <p>The conversions are based on internationally recognized standards for unit conversions, ensuring a high degree of accuracy. The results are typically rounded to a few decimal places for practical use.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the "foot" as a unit of measurement has been used for over 2,000 years and was originally based on the length of a human foot? Of course, this led to a lot of variation, as everyone's feet are different sizes. It wasn't until the 20th century that the international foot was standardized to be exactly 0.3048 meters, providing a consistent and reliable unit for modern use.</p>
        }
      />

    </>
  );
};

export default LengthConverterTool;
