import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DecimalToBinaryConverterTool = () => {
  const [decimalInput, setDecimalInput] = useState('');
  const [binaryResult, setBinaryResult] = useState('');

  const convertDecimalToBinary = () => {
    const decimal = parseInt(decimalInput, 10);
    if (!isNaN(decimal)) {
      setBinaryResult(decimal.toString(2));
    } else {
      setBinaryResult('Invalid decimal input');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decimal to Binary Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter decimal here..."
            value={decimalInput}
            onChange={e => setDecimalInput(e.target.value)}
            type="number"
          />
          <Button onClick={convertDecimalToBinary}>Convert</Button>
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

export default DecimalToBinaryConverterTool;
