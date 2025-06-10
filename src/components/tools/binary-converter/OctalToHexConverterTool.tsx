import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OctalToHexConverterTool = () => {
  const [octalInput, setOctalInput] = useState('');
  const [hexResult, setHexResult] = useState('');

  const convertOctalToHex = () => {
    if (/^[0-7]+$/.test(octalInput)) {
      const decimal = parseInt(octalInput, 8);
      setHexResult(decimal.toString(16).toUpperCase());
    } else {
      setHexResult('Invalid octal input');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Octal to HEX Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter octal here..."
            value={octalInput}
            onChange={e => setOctalInput(e.target.value)}
          />
          <Button onClick={convertOctalToHex}>Convert</Button>
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

export default OctalToHexConverterTool;
