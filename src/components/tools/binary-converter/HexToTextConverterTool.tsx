import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HexToTextConverterTool = () => {
  const [hexInput, setHexInput] = useState('');
  const [textResult, setTextResult] = useState('');

  const convertHexToText = () => {
    const text = hexInput
      .split(' ')
      .map(hexCode => String.fromCharCode(parseInt(hexCode, 16)))
      .join('');
    setTextResult(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>HEX to Text Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter HEX codes here..."
            value={hexInput}
            onChange={e => setHexInput(e.target.value)}
          />
          <Button onClick={convertHexToText}>Convert</Button>
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

export default HexToTextConverterTool;
