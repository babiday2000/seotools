import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DecimalToOctalConverterTool = () => {
  const [decimalInput, setDecimalInput] = useState('');
  const [octalResult, setOctalResult] = useState('');

  const convertDecimalToOctal = () => {
    const decimal = parseInt(decimalInput, 10);
    if (!isNaN(decimal)) {
      setOctalResult(decimal.toString(8));
    } else {
      setOctalResult('Invalid decimal input');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decimal to Octal Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter decimal here..."
            value={decimalInput}
            onChange={e => setDecimalInput(e.target.value)}
            type="number"
          />
          <Button onClick={convertDecimalToOctal}>Convert</Button>
          <Input
            placeholder="Octal result..."
            value={octalResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DecimalToOctalConverterTool;
