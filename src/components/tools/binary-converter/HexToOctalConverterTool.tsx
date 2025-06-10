import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HexToOctalConverterTool = () => {
  const [hexInput, setHexInput] = useState('');
  const [octalResult, setOctalResult] = useState('');

  const convertHexToOctal = () => {
    if (/^[0-9A-Fa-f]+$/.test(hexInput)) {
      const decimal = parseInt(hexInput, 16);
      setOctalResult(decimal.toString(8));
    } else {
      setOctalResult('Invalid HEX input');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>HEX to Octal Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter HEX here..."
            value={hexInput}
            onChange={e => setHexInput(e.target.value)}
          />
          <Button onClick={convertHexToOctal}>Convert</Button>
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

export default HexToOctalConverterTool;
