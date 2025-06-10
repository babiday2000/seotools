import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AsciiToBinaryConverterTool = () => {
  const [asciiInput, setAsciiInput] = useState('');
  const [binaryResult, setBinaryResult] = useState('');

  const convertAsciiToBinary = () => {
    const binary = asciiInput
      .split('')
      .map(char => {
        const binaryChar = char.charCodeAt(0).toString(2);
        return '0'.repeat(8 - binaryChar.length) + binaryChar;
      })
      .join(' ');
    setBinaryResult(binary);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ASCII to Binary Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter ASCII text here..."
            value={asciiInput}
            onChange={e => setAsciiInput(e.target.value)}
          />
          <Button onClick={convertAsciiToBinary}>Convert</Button>
          <Textarea
            placeholder="Binary result..."
            value={binaryResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AsciiToBinaryConverterTool;
