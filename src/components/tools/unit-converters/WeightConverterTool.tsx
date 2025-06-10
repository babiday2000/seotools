import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const units = {
  grams: 1,
  kilograms: 1000,
  milligrams: 0.001,
  pounds: 453.592,
  ounces: 28.3495,
};

const WeightConverterTool = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('grams');
  const [toUnit, setToUnit] = useState('kilograms');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      toast.error('Please enter a valid number.');
      return;
    }

    const valueInGrams = numValue * units[fromUnit as keyof typeof units];
    const convertedValue = valueInGrams / units[toUnit as keyof typeof units];
    setResult(convertedValue);
    toast.success('Conversion successful!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Weight Converter</CardTitle>
          <CardDescription>Convert between different units of weight.</CardDescription>
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
        title="What is a Weight Converter?"
        content={
          <div className="space-y-4">
            <p>A Weight Converter is a practical tool designed to help you convert between different units of weight. This is essential in numerous fields, including cooking, shipping, and science. Whether you are converting kitchen measurements from grams to ounces, calculating shipping weights from pounds to kilograms, or working on a scientific experiment, this tool provides a quick and accurate way to switch between units.</p>
            <p>The primary purpose of a Weight Converter is to simplify complex calculations and eliminate the potential for manual errors. By providing a user-friendly interface, it allows you to get the information you need without having to memorize conversion factors. This is particularly useful when dealing with international standards or when working on projects that require a high degree of precision. The tool is designed to be intuitive, making it accessible to both professionals and hobbyists.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Weight Converter"
        content={
          <div className="space-y-4">
            <p>To perform accurate conversions, the Weight Converter relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input Value:</strong> This is the numerical value of the weight you want to convert. You enter this number into the designated field.</li>
              <li><strong>From Unit:</strong> This is the unit of the original measurement. You select this from a dropdown menu that includes a comprehensive list of weight units.</li>
              <li><strong>To Unit:</strong> This is the unit you want to convert the measurement to. You also select this from a dropdown menu.</li>
              <li><strong>Conversion Factor:</strong> The core of the converter is its database of conversion factors. Each unit is defined by its relationship to a base unit (e.g., the gram). The tool uses these factors to perform the mathematical calculation required for the conversion.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform weight conversions without needing to memorize conversion formulas. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Weight Converter"
        content={
          <div className="space-y-4">
            <p>Using the Weight Converter is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Value:</strong> In the input field, type the numerical value of the weight you want to convert.</li>
              <li><strong>Select the "From" Unit:</strong> Choose the unit of your original measurement from the first dropdown menu.</li>
              <li><strong>Select the "To" Unit:</strong> Choose the unit you want to convert to from the second dropdown menu.</li>
              <li><strong>Click "Convert":</strong> Press the "Convert" button. The tool will instantly display the converted weight in the result section.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your weight conversion needs.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the base unit for the conversions?</h4>
              <p>The conversions are based on the gram as the standard SI unit for mass. All other units are converted to grams first and then to the target unit to ensure accuracy.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Can I use this for precious metals?</h4>
              <p>While this converter is accurate for general-purpose weight conversions, precious metals are often measured in troy ounces, which are slightly heavier than standard (avoirdupois) ounces. For financial transactions involving precious metals, it is best to use a specialized calculator.</p>
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
          <p>Did you know that the pound as a unit of weight has a history that dates back to the Roman Empire? The word "pound" comes from the Latin "pondo," which means "weight." The original Roman pound was lighter than the modern pound, and its value has changed many times over the centuries. The current international avoirdupois pound, which is used in the United States and other countries, was standardized in 1959 to be exactly 0.45359237 kilograms.</p>
        }
      />

    </>
  );
};

export default WeightConverterTool;
