import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TextToHexConverterTool = () => {
  const [textInput, setTextInput] = useState('');
  const [hexResult, setHexResult] = useState('');

  const convertTextToHex = () => {
    const hex = textInput
      .split('')
      .map(char => char.charCodeAt(0).toString(16).toUpperCase())
      .join(' ');
    setHexResult(hex);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text to HEX Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter text here..."
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
          />
          <Button onClick={convertTextToHex}>Convert</Button>
          <Textarea
            placeholder="HEX result..."
            value={hexResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToHexConverterTool;
