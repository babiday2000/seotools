import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const TemperatureConverterTool = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      toast.error('Please enter a valid number.');
      return;
    }

    let convertedValue;
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      convertedValue = (numValue * 9/5) + 32;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
      convertedValue = (numValue - 32) * 5/9;
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
      convertedValue = numValue + 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
      convertedValue = numValue - 273.15;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
      convertedValue = (numValue - 32) * 5/9 + 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
      convertedValue = (numValue - 273.15) * 9/5 + 32;
    } else {
      convertedValue = numValue;
    }

    setResult(convertedValue);
    toast.success('Conversion successful!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Temperature Converter</CardTitle>
          <CardDescription>Convert between different units of temperature.</CardDescription>
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
              <option value="celsius" className="text-black">Celsius</option>
              <option value="fahrenheit" className="text-black">Fahrenheit</option>
              <option value="kelvin" className="text-black">Kelvin</option>
            </select>
            <select
              title="To Unit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="celsius" className="text-black">Celsius</option>
              <option value="fahrenheit" className="text-black">Fahrenheit</option>
              <option value="kelvin" className="text-black">Kelvin</option>
            </select>
          </div>
          <Button onClick={handleConvert}>Convert</Button>
          {result !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Result:</h3>
              <p className="text-2xl font-bold">{result.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a Temperature Converter?"
        content={
          <div className="space-y-4">
            <p>A Temperature Converter is a practical tool designed to help you convert between different units of temperature. This is essential in numerous fields, including science, engineering, and everyday life. Whether you are converting a recipe from Celsius to Fahrenheit, checking the weather in a different country, or working on a scientific experiment, this tool provides a quick and accurate way to switch between units.</p>
            <p>The primary purpose of a Temperature Converter is to simplify complex calculations and eliminate the potential for manual errors. By providing a user-friendly interface, it allows you to get the information you need without having to memorize conversion formulas. This is particularly useful when dealing with international standards or when working on projects that require a high degree of precision. The tool is designed to be intuitive, making it accessible to both professionals and hobbyists.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Temperature Converter"
        content={
          <div className="space-y-4">
            <p>To perform accurate conversions, the Temperature Converter relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input Value:</strong> This is the numerical value of the temperature you want to convert. You enter this number into the designated field.</li>
              <li><strong>From Unit:</strong> This is the unit of the original measurement. You select this from a dropdown menu that includes Celsius, Fahrenheit, and Kelvin.</li>
              <li><strong>To Unit:</strong> This is the unit you want to convert the measurement to. You also select this from a dropdown menu.</li>
              <li><strong>Conversion Formula:</strong> The core of the converter is its set of conversion formulas. Unlike other unit converters, temperature conversions are not based on a simple multiplication factor. Instead, they use specific formulas to convert between scales. For example, to convert from Celsius to Fahrenheit, the formula is (°C * 9/5) + 32.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform temperature conversions without needing to memorize the formulas. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Temperature Converter"
        content={
          <div className="space-y-4">
            <p>Using the Temperature Converter is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Value:</strong> In the input field, type the numerical value of the temperature you want to convert.</li>
              <li><strong>Select the "From" Unit:</strong> Choose the unit of your original measurement from the first dropdown menu.</li>
              <li><strong>Select the "To" Unit:</strong> Choose the unit you want to convert to from the second dropdown menu.</li>
              <li><strong>Click "Convert":</strong> Press the "Convert" button. The tool will instantly display the converted temperature in the result section.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from professional and academic work to everyday tasks. It's a reliable and efficient way to handle all your temperature conversion needs.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the difference between Celsius and Fahrenheit?</h4>
              <p>Celsius and Fahrenheit are two different scales for measuring temperature. The Celsius scale is based on the freezing and boiling points of water, with 0°C being the freezing point and 100°C being the boiling point. The Fahrenheit scale is based on the work of Daniel Gabriel Fahrenheit, who used a different set of reference points. In the Fahrenheit scale, water freezes at 32°F and boils at 212°F.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">What is Kelvin?</h4>
              <p>Kelvin is the base unit of temperature in the International System of Units (SI). It is an absolute temperature scale, meaning that 0 K is absolute zero, the point at which all thermal motion ceases. The Kelvin scale is often used in scientific applications.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How accurate are the conversions?</h4>
              <p>The conversions are based on the standard formulas for converting between temperature scales, ensuring a high degree of accuracy. The results are typically rounded to a few decimal places for practical use.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the Fahrenheit scale was invented by Daniel Gabriel Fahrenheit in 1724? He based the scale on three fixed points: the temperature of a brine solution of ice, water, and salt (0°F), the freezing point of water (32°F), and the average human body temperature (96°F, though this was later revised). The Celsius scale, on the other hand, was developed by Anders Celsius in 1742 and is based on the freezing and boiling points of water, making it a more intuitive system for scientific use.</p>
        }
      />

    </>
  );
};

export default TemperatureConverterTool;
