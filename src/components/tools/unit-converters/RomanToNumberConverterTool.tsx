import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from '../online-calculators/ContentDisplay';
const RomanToNumberConverterTool = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const fromRoman = (roman: string) => {
    const romanMap: { [key: string]: number } = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };
    let num = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = romanMap[roman[i]];
      const next = romanMap[roman[i + 1]];
      if (next && current < next) {
        num -= current;
      } else {
        num += current;
      }
    }
    return num;
  };

  const handleConvert = () => {
    const number = fromRoman(inputValue.toUpperCase());
    setResult(number);
    toast.success('Conversion successful!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Roman Numerals to Number</CardTitle>
          <CardDescription>Convert Roman numerals to a number.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              placeholder="Enter Roman numerals"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={handleConvert}>Convert</Button>
          </div>
          {result !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Result:</h3>
              <p className="text-2xl font-bold">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a Roman Numerals to Number Converter?"
        content={
          <div className="space-y-4">
            <p>A Roman Numerals to Number Converter is a practical tool designed to help you convert Roman numerals into their standard Arabic number equivalents. This is essential for a variety of applications, from academic and historical research to creative and decorative purposes. Whether you are a student learning about ancient Rome, a designer looking for a classic touch, or a history enthusiast, this tool provides a quick and accurate way to perform the conversion.</p>
            <p>The primary purpose of this converter is to simplify the process of converting Roman numerals into numbers, which can be a complex and error-prone task when done manually. By providing a user-friendly interface, it allows you to get the information you need without having to memorize the rules of the Roman numeral system. This is particularly useful for large or complex Roman numerals, where the conversion can be quite challenging. The tool is designed to be intuitive, making it accessible to both professionals and hobbyists.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Roman Numerals to Number Converter"
        content={
          <div className="space-y-4">
            <p>To perform accurate conversions, the Roman Numerals to Number Converter relies on a few key components that work together to process your input and deliver the result. Understanding these components will help you appreciate the logic behind the tool.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input Value:</strong> This is the Roman numeral you want to convert. You enter this string of characters into the designated field.</li>
              <li><strong>Conversion Logic:</strong> The core of the converter is its algorithm, which is based on the rules of the Roman numeral system. The algorithm iterates through the Roman numeral string, assigning the appropriate value to each character and taking into account the subtractive notation (e.g., IV = 4, IX = 9).</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, making it easy for anyone to perform the conversion without needing to memorize the rules. The tool is designed for efficiency, providing you with the information you need in an instant.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Roman Numerals to Number Converter"
        content={
          <div className="space-y-4">
            <p>Using the Roman Numerals to Number Converter is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Roman Numeral:</strong> In the input field, type the Roman numeral you want to convert.</li>
              <li><strong>Click "Convert":</strong> Press the "Convert" button. The tool will instantly display the Arabic number equivalent in the result section.</li>
            </ol>
            <p>This tool is perfect for a wide range of applications, from academic and professional work to everyday tasks. It's a reliable and efficient way to handle all your Roman numeral to number conversion needs.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the largest Roman numeral I can convert?</h4>
              <p>This converter is designed to handle standard Roman numerals, which can represent numbers up to 3999. For larger numbers, a different notation system would be required.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Is the input case-sensitive?</h4>
              <p>No, the converter is not case-sensitive. You can enter Roman numerals in either uppercase or lowercase, and the tool will correctly interpret them.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How accurate are the conversions?</h4>
              <p>The conversions are based on the standard rules of the Roman numeral system, ensuring a high degree of accuracy.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the Roman numeral system does not have a symbol for zero? The concept of zero as a number was not developed until the 7th century in India, long after the fall of the Roman Empire. The Romans had a complex system of counting and arithmetic, but they managed to do it all without the number zero. This is one of the reasons why Roman numerals are not well-suited for modern mathematics.</p>
        }
      />

    </>
  );
};

export default RomanToNumberConverterTool;
