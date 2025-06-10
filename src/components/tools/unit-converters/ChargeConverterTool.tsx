import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const units = {
  coulombs: 1,
  millicoulombs: 0.001,
  microcoulombs: 0.000001,
  nanocoulombs: 0.000000001,
  picocoulombs: 0.000000000001,
};

const ChargeConverterTool = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('coulombs');
  const [toUnit, setToUnit] = useState('millicoulombs');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      toast.error('Please enter a valid number.');
      return;
    }

    const valueInCoulombs = numValue * units[fromUnit as keyof typeof units];
    const convertedValue = valueInCoulombs / units[toUnit as keyof typeof units];
    setResult(convertedValue);
    toast.success('Conversion successful!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Charge Converter</CardTitle>
          <CardDescription>Convert between different units of electric charge.</CardDescription>
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
              <p className="text-2xl font-bold">{result.toExponential(4)}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a Charge Converter?"
        content={
          <div className="space-y-4">
            <p>A Charge Converter is a practical tool designed to help you convert between different units of electric charge. This is essential in numerous fields, including physics, electronics, and chemistry. Whether you are working on an electronics project, studying electromagnetism, or dealing with chemical reactions, this tool provides a quick and accurate way to switch between units like coulombs, millicoulombs, and microcoulombs.</p>
            <p>The primary purpose of a Charge Converter is to simplify complex calculations and eliminate the potential for manual errors. By providing a user-friendly interface, it allows you to get the information you need without having to memorize conversion factors. This is particularly useful when dealing with very large or very small quantities of charge, where the use of scientific notation can be cumbersome. The tool is designed to be intuitive, making it accessible to both professionals and students.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Charge Converter"
        content={
          <div className="space-y-4">
            <p>To perform accurate conversions, the Charge Converter relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input Value:</strong> This is the numerical value of the charge you want to convert. You enter this number into the designated field.</li>
              <li><strong>From Unit:</strong> This is the unit of the original measurement. You select this from a dropdown menu that includes a comprehensive list of charge units.</li>
              <li><strong>To Unit:</strong> This is the unit you want to convert the measurement to. You also select this from a dropdown menu.</li>
              <li><strong>Conversion Factor:</strong> The core of the converter is its database of conversion factors. Each unit is defined by its relationship to a base unit (e.g., the coulomb). The tool uses these factors to perform the mathematical calculation required for the conversion.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform charge conversions without needing to memorize conversion formulas. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Charge Converter"
        content={
          <div className="space-y-4">
            <p>Using the Charge Converter is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Value:</strong> In the input field, type the numerical value of the charge you want to convert.</li>
              <li><strong>Select the "From" Unit:</strong> Choose the unit of your original measurement from the first dropdown menu.</li>
              <li><strong>Select the "To" Unit:</strong> Choose the unit you want to convert to from the second dropdown menu.</li>
              <li><strong>Click "Convert":</strong> Press the "Convert" button. The tool will instantly display the converted charge in the result section.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your charge conversion needs.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the base unit for the conversions?</h4>
              <p>The conversions are based on the coulomb as the standard SI unit for electric charge. All other units are converted to coulombs first and then to the target unit to ensure accuracy.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">What is a coulomb?</h4>
              <p>A coulomb is the standard unit of electric charge in the International System of Units (SI). It is defined as the amount of electric charge transported by a current of one ampere in one second. It is named after the French physicist Charles-Augustin de Coulomb.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How accurate are the conversions?</h4>
              <p>The conversions are based on internationally recognized standards for unit conversions, ensuring a high degree of accuracy. The results are typically displayed in scientific notation for very large or very small numbers.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the concept of electric charge was first discovered by the ancient Greeks? They found that rubbing amber with fur would cause it to attract light objects, like feathers. The Greek word for amber is "elektron," which is the origin of the word "electricity." It wasn't until the 18th century that scientists like Benjamin Franklin began to understand the nature of electric charge and its properties, paving the way for the development of modern electronics.</p>
        }
      />

    </>
  );
};

export default ChargeConverterTool;
