import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HexToDecimalConverterTool = () => {
  const [hexInput, setHexInput] = useState('');
  const [decimalResult, setDecimalResult] = useState('');

  const convertHexToDecimal = () => {
    if (/^[0-9A-Fa-f]+$/.test(hexInput)) {
      setDecimalResult(parseInt(hexInput, 16).toString());
    } else {
      setDecimalResult('Invalid HEX input');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>HEX to Decimal Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter HEX here..."
            value={hexInput}
            onChange={e => setHexInput(e.target.value)}
          />
          <Button onClick={convertHexToDecimal}>Convert</Button>
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

export default HexToDecimalConverterTool;
