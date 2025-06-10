import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const units = {
  liters: 1,
  milliliters: 0.001,
  'cubic-meters': 1000,
  'cubic-centimeters': 0.001,
  gallons: 3.78541,
  quarts: 0.946353,
  pints: 0.473176,
  cups: 0.24,
  'fluid-ounces': 0.0295735,
};

const VolumeConverterTool = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('liters');
  const [toUnit, setToUnit] = useState('gallons');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      toast.error('Please enter a valid number.');
      return;
    }

    const valueInLiters = numValue * units[fromUnit as keyof typeof units];
    const convertedValue = valueInLiters / units[toUnit as keyof typeof units];
    setResult(convertedValue);
    toast.success('Conversion successful!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Volume Converter</CardTitle>
          <CardDescription>Convert between different units of volume.</CardDescription>
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
        title="What is a Volume Converter?"
        content={
          <div className="space-y-4">
            <p>A Volume Converter is a practical tool designed to help you convert between different units of volume. This is essential in numerous fields, including cooking, chemistry, and engineering. Whether you are converting recipes from milliliters to cups, calculating the capacity of a container, or working on a project that requires precise volume measurements, this tool provides a quick and accurate way to switch between units.</p>
            <p>The primary purpose of a Volume Converter is to simplify complex calculations and eliminate the potential for manual errors. By providing a user-friendly interface, it allows you to get the information you need without having to memorize conversion factors. This is particularly useful when dealing with international standards or when working on projects that require a high degree of precision. The tool is designed to be intuitive, making it accessible to both professionals and hobbyists.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Volume Converter"
        content={
          <div className="space-y-4">
            <p>To perform accurate conversions, the Volume Converter relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input Value:</strong> This is the numerical value of the volume you want to convert. You enter this number into the designated field.</li>
              <li><strong>From Unit:</strong> This is the unit of the original measurement. You select this from a dropdown menu that includes a comprehensive list of volume units.</li>
              <li><strong>To Unit:</strong> This is the unit you want to convert the measurement to. You also select this from a dropdown menu.</li>
              <li><strong>Conversion Factor:</strong> The core of the converter is its database of conversion factors. Each unit is defined by its relationship to a base unit (e.g., the liter). The tool uses these factors to perform the mathematical calculation required for the conversion.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform volume conversions without needing to memorize conversion formulas. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Volume Converter"
        content={
          <div className="space-y-4">
            <p>Using the Volume Converter is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Value:</strong> In the input field, type the numerical value of the volume you want to convert.</li>
              <li><strong>Select the "From" Unit:</strong> Choose the unit of your original measurement from the first dropdown menu.</li>
              <li><strong>Select the "To" Unit:</strong> Choose the unit you want to convert to from the second dropdown menu.</li>
              <li><strong>Click "Convert":</strong> Press the "Convert" button. The tool will instantly display the converted volume in the result section.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your volume conversion needs.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the base unit for the conversions?</h4>
              <p>The conversions are based on the liter as the standard SI unit for volume. All other units are converted to liters first and then to the target unit to ensure accuracy.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">What is the difference between a US gallon and an imperial gallon?</h4>
              <p>A US gallon is smaller than an imperial gallon. A US gallon is defined as 3.78541 liters, while an imperial gallon is about 4.54609 liters. This calculator uses the US gallon for its conversions.</p>
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
          <p>Did you know that the gallon, a common unit of volume, has different definitions in the United States and the United Kingdom? The U.S. gallon is based on the wine gallon, which was standardized in the 18th century and is equal to 231 cubic inches. The imperial gallon, used in the UK, is slightly larger and is based on the volume of 10 pounds of water at a specific temperature. This is why it's always important to specify which gallon you are using when dealing with international measurements.</p>
        }
      />

    </>
  );
};

export default VolumeConverterTool;
