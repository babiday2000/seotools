import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BinaryToHexConverterTool = () => {
  const [binaryInput, setBinaryInput] = useState('');
  const [hexResult, setHexResult] = useState('');

  const convertBinaryToHex = () => {
    const hex = binaryInput
      .split(' ')
      .map(binaryChar => {
        const decimal = parseInt(binaryChar, 2);
        const hexChar = decimal.toString(16).toUpperCase();
        return hexChar;
      })
      .join('');
    setHexResult(hex);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Binary to HEX Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter binary here..."
            value={binaryInput}
            onChange={e => setBinaryInput(e.target.value)}
          />
          <Button onClick={convertBinaryToHex}>Convert</Button>
          <Input
            placeholder="HEX result..."
            value={hexResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BinaryToHexConverterTool;
