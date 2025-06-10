import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DecimalToTextConverterTool = () => {
  const [decimalInput, setDecimalInput] = useState('');
  const [textResult, setTextResult] = useState('');

  const convertDecimalToText = () => {
    try {
      const text = decimalInput
        .split(' ')
        .filter(code => code.trim() !== '')
        .map(code => String.fromCharCode(parseInt(code, 10)))
        .join('');
      setTextResult(text);
    } catch {
      setTextResult('Invalid decimal input');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decimal to Text Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter decimal codes here..."
            value={decimalInput}
            onChange={e => setDecimalInput(e.target.value)}
          />
          <Button onClick={convertDecimalToText}>Convert</Button>
          <Textarea
            placeholder="Text result..."
            value={textResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DecimalToTextConverterTool;
