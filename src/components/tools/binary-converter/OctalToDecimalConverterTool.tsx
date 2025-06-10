import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OctalToDecimalConverterTool = () => {
  const [octalInput, setOctalInput] = useState('');
  const [decimalResult, setDecimalResult] = useState('');

  const convertOctalToDecimal = () => {
    if (/^[0-7]+$/.test(octalInput)) {
      setDecimalResult(parseInt(octalInput, 8).toString());
    } else {
      setDecimalResult('Invalid octal input');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Octal to Decimal Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter octal here..."
            value={octalInput}
            onChange={e => setOctalInput(e.target.value)}
          />
          <Button onClick={convertOctalToDecimal}>Convert</Button>
          <Input
            placeholder="Decimal result..."
            value={decimalResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OctalToDecimalConverterTool;
