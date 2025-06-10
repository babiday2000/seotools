import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TextToAsciiConverterTool = () => {
  const [textInput, setTextInput] = useState('');
  const [asciiResult, setAsciiResult] = useState('');

  const convertTextToAscii = () => {
    const ascii = textInput
      .split('')
      .map(char => char.charCodeAt(0))
      .join(' ');
    setAsciiResult(ascii);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text to ASCII Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter text here..."
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
          />
          <Button onClick={convertTextToAscii}>Convert</Button>
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

export default TextToAsciiConverterTool;
