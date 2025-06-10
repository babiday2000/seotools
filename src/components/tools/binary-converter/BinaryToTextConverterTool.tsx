import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BinaryToTextConverterTool = () => {
  const [binaryInput, setBinaryInput] = useState('');
  const [textResult, setTextResult] = useState('');

  const convertBinaryToText = () => {
    const text = binaryInput
      .split(' ')
      .map(binaryChar => String.fromCharCode(parseInt(binaryChar, 2)))
      .join('');
    setTextResult(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Binary to Text Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter binary here..."
            value={binaryInput}
            onChange={e => setBinaryInput(e.target.value)}
          />
          <Button onClick={convertBinaryToText}>Convert</Button>
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

export default BinaryToTextConverterTool;
