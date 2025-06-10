import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TextToBinaryConverterTool = () => {
  const [inputText, setInputText] = useState('');
  const [binaryResult, setBinaryResult] = useState('');

  const convertTextToBinary = () => {
    const binary = inputText
      .split('')
      .map(char => {
        const binaryChar = char.charCodeAt(0).toString(2);
        return '0'.repeat(8 - binaryChar.length) + binaryChar;
      })
      .join(' ');
    setBinaryResult(binary);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text to Binary Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter text here..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
          <Button onClick={convertTextToBinary}>Convert</Button>
          <Textarea
            placeholder="Binary result..."
            value={binaryResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToBinaryConverterTool;
