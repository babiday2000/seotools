import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TextToDecimalConverterTool = () => {
  const [textInput, setTextInput] = useState('');
  const [decimalResult, setDecimalResult] = useState('');

  const convertTextToDecimal = () => {
    const decimal = textInput
      .split('')
      .map(char => char.charCodeAt(0))
      .join(' ');
    setDecimalResult(decimal);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text to Decimal Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter text here..."
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
          />
          <Button onClick={convertTextToDecimal}>Convert</Button>
          <Textarea
            placeholder="Decimal result..."
            value={decimalResult}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToDecimalConverterTool;
