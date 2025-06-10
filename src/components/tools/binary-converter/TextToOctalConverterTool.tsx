import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TextToOctalConverterTool = () => {
  const [textInput, setTextInput] = useState('');
  const [octalResult, setOctalResult] = useState('');

  const convertTextToOctal = () => {
    const octal = textInput
      .split('')
      .map(char => char.charCodeAt(0).toString(8))
      .join(' ');
    setOctalResult(octal);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text to Octal Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter text here..."
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
          />
          <Button onClick={convertTextToOctal}>Convert</Button>
          <Textarea
            placeholder="Octal result..."
            value={octalResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToOctalConverterTool;
