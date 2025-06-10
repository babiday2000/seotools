import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OctalToTextConverterTool = () => {
  const [octalInput, setOctalInput] = useState('');
  const [textResult, setTextResult] = useState('');

  const convertOctalToText = () => {
    const text = octalInput
      .split(' ')
      .map(octalCode => String.fromCharCode(parseInt(octalCode, 8)))
      .join('');
    setTextResult(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Octal to Text Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter octal codes here..."
            value={octalInput}
            onChange={e => setOctalInput(e.target.value)}
          />
          <Button onClick={convertOctalToText}>Convert</Button>
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

export default OctalToTextConverterTool;
