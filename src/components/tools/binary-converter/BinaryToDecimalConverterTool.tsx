import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BinaryToDecimalConverterTool = () => {
  const [binaryInput, setBinaryInput] = useState('');
  const [decimalResult, setDecimalResult] = useState('');

  const convertBinaryToDecimal = () => {
    if (/^[01]+$/.test(binaryInput)) {
      setDecimalResult(parseInt(binaryInput, 2).toString());
    } else {
      setDecimalResult('Invalid binary input');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Binary to Decimal Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            placeholder="Enter binary here..."
            value={binaryInput}
            onChange={e => setBinaryInput(e.target.value)}
          />
          <Button onClick={convertBinaryToDecimal}>Convert</Button>
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

export default BinaryToDecimalConverterTool;
