import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OctalToBinaryConverterTool = () => {
  const [octalInput, setOctalInput] = useState('');
  const [binaryResult, setBinaryResult] = useState('');

  const convertOctalToBinary = () => {
    if (/^[0-7]+$/.test(octalInput)) {
      const binary = octalInput
        .split('')
        .map(octalChar => {
          const decimal = parseInt(octalChar, 8);
          const binaryChar = decimal.toString(2);
          return '0'.repeat(3 - binaryChar.length) + binaryChar;
        })
        .join(' ');
      setBinaryResult(binary);
    } else {
      setBinaryResult('Invalid octal input');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Octal to Binary Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter octal here..."
            value={octalInput}
            onChange={e => setOctalInput(e.target.value)}
          />
          <Button onClick={convertOctalToBinary}>Convert</Button>
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

export default OctalToBinaryConverterTool;
