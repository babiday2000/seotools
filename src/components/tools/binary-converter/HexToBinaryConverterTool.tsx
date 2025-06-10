import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HexToBinaryConverterTool = () => {
  const [hexInput, setHexInput] = useState('');
  const [binaryResult, setBinaryResult] = useState('');

  const convertHexToBinary = () => {
    const binary = hexInput
      .split('')
      .map(hexChar => {
        const decimal = parseInt(hexChar, 16);
        const binaryChar = decimal.toString(2);
        return '0'.repeat(4 - binaryChar.length) + binaryChar;
      })
      .join(' ');
    setBinaryResult(binary);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>HEX to Binary Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter HEX here..."
            value={hexInput}
            onChange={e => setHexInput(e.target.value)}
          />
          <Button onClick={convertHexToBinary}>Convert</Button>
          <Input
            placeholder="Binary result..."
            value={binaryResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HexToBinaryConverterTool;
