import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AsciiToTextConverterTool = () => {
  const [asciiInput, setAsciiInput] = useState('');
  const [textResult, setTextResult] = useState('');

  const convertAsciiToText = () => {
    const text = asciiInput
      .split(' ')
      .map(asciiCode => String.fromCharCode(parseInt(asciiCode, 10)))
      .join('');
    setTextResult(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ASCII to Text Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter ASCII codes here..."
            value={asciiInput}
            onChange={e => setAsciiInput(e.target.value)}
          />
          <Button onClick={convertAsciiToText}>Convert</Button>
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

export default AsciiToTextConverterTool;
