import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const WordToNumberConverterTool = () => {
  const [words, setWords] = useState('');
  const [number, setNumber] = useState('');

  const handleConvert = () => {
    setNumber(wordsToNumbers(words).toString());
  };

  // A simple implementation of words to numbers converter
  const wordsToNumbers = (text: string): number => {
    const a: { [key: string]: number } = {
      'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
      'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15, 'sixteen': 16,
      'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
      'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90
    };
    const m: { [key: string]: number } = { 'hundred': 100, 'thousand': 1000, 'lakh': 100000, 'crore': 10000000 };
    let n = 0, g = 0;
    text.split(/[\s-]+/).forEach((w) => {
      const x = a[w.toLowerCase()];
      if (x != null) {
        g += x;
      } else if (w.toLowerCase() !== 'and') {
        const y = m[w.toLowerCase()];
        if (y != null) {
          g *= y;
          n += g;
          g = 0;
        }
      }
    });
    return n + g;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="words">Words:</Label>
        <Input
          id="words"
          value={words}
          onChange={(e) => setWords(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleConvert} disabled={!words}>Convert</Button>
      </div>
      {number && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-lg font-semibold">{number}</p>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">About the Word to Number Converter</h2>
        <p>
          The Word to Number Converter is the perfect companion to our Number to Word tool. It allows you to take a number written out in words (e.g., "one hundred and twenty-three") and convert it back into its numerical form (123).
        </p>

        <h3 className="text-xl font-semibold">How Does It Work?</h3>
        <p>
          Simply type or paste the number in word form into the input field and click "Convert." The tool will parse the words and output the corresponding numerical value. It's designed to understand standard English number words.
        </p>

        <h3 className="text-xl font-semibold">Use Cases and Benefits</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Data Entry:</strong> Quickly convert numbers from written documents into a numerical format for spreadsheets or databases.
          </li>
          <li>
            <strong>Financial Analysis:</strong> Convert numbers from reports or articles into a format that can be used in calculations.
          </li>
          <li>
            <strong>General Convenience:</strong> A quick and easy way to convert any number in word form without having to do it manually.
          </li>
          <li>
            <strong>Educational Tool:</strong> Helps students practice reading numbers in word form and understanding their numerical value.
          </li>
        </ul>

        <h3 className="text-xl font-semibold">Example in Action</h3>
        <div className="space-y-2">
          <p><strong>Words:</strong> one thousand two hundred thirty-four</p>
          <p><strong>Number:</strong> 1234</p>
        </div>

        <h3 className="text-xl font-semibold">Limitations</h3>
        <p>
          This tool is designed to work with standard English number words. It may not correctly interpret very large numbers, complex phrasing, or regional variations. For best results, use clear and standard number words.
        </p>
      </div>
    </div>
  );
};

export default WordToNumberConverterTool;
