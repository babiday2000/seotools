import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DecimalToHexConverterTool = () => {
  const [decimalInput, setDecimalInput] = useState('');
  const [hexResult, setHexResult] = useState('');

  const convertDecimalToHex = () => {
    const decimal = parseInt(decimalInput, 10);
    if (!isNaN(decimal)) {
      setHexResult(decimal.toString(16).toUpperCase());
    } else {
      setHexResult('Invalid decimal input');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decimal to HEX Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter decimal here..."
            value={decimalInput}
            onChange={e => setDecimalInput(e.target.value)}
            type="number"
          />
          <Button onClick={convertDecimalToHex}>Convert</Button>
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

export default DecimalToHexConverterTool;
