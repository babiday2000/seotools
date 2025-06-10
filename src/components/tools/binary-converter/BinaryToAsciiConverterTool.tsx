import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BinaryToAsciiConverterTool = () => {
  const [binaryInput, setBinaryInput] = useState('');
  const [asciiResult, setAsciiResult] = useState('');

  const convertBinaryToAscii = () => {
    const ascii = binaryInput
      .split(' ')
      .map(binaryChar => String.fromCharCode(parseInt(binaryChar, 2)))
      .join('');
    setAsciiResult(ascii);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Binary to ASCII Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter binary here..."
            value={binaryInput}
            onChange={e => setBinaryInput(e.target.value)}
          />
          <Button onClick={convertBinaryToAscii}>Convert</Button>
          <Textarea
            placeholder="ASCII result..."
            value={asciiResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BinaryToAsciiConverterTool;
