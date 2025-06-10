import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Base64 } from 'js-base64';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const Base64DecodeTool = () => {
  const [text, setText] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [error, setError] = useState('');

  const handleDecode = () => {
    setError('');
    setDecodedText('');
    if (!text) return;

    try {
      const decoded = Base64.decode(text);
      setDecodedText(decoded);
    } catch {
      setError('Invalid Base64 string. Please check your input.');
      setDecodedText('');
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Base64 Decode</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter Base64 string to decode"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
          />
          <Button onClick={handleDecode} className="mt-4">Decode</Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {decodedText && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Decoded Text:</h3>
              <pre className="p-4 bg-muted/20 rounded-lg font-mono break-words whitespace-pre-wrap">{decodedText}</pre>
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is Base64 Decode?</h2>
        <p className="text-lg">
          Base64 Decode is the process of converting a Base64 encoded string back into its original data format. Base64 is an encoding scheme that transforms binary data (like images, files, or plain text) into a sequence of ASCII characters. This is done to ensure that the data remains intact without modification during transport through text-based channels, such as email or HTML. Our Base64 Decode tool provides a simple way to reverse this process, allowing you to see the original data that was encoded in the Base64 string.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in Base64 Decoding</h3>
          <p>
            The decoding process is the direct reverse of the encoding process and depends on a few key factors:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Character Set:</strong> A valid Base64 string only contains characters from a specific 64-character set. This set includes A-Z, a-z, 0-9, and two other characters, typically '+' and '/'. Our decoder will return an error if it encounters any characters outside of this set.</li>
            <li><strong>Padding:</strong> The Base64 encoding process works on groups of 3 bytes (24 bits). If the original data is not a multiple of 3 bytes, padding is added to the end of the encoded string in the form of one or two '=' characters. The decoder uses this padding to correctly reconstruct the original binary data.</li>
            <li><strong>Data Integrity:</strong> The decoding process assumes that the Base64 string has not been corrupted or modified. Any change to the encoded string will result in an incorrect or failed decoding.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our Base64 Decoder</h3>
          <p>
            Our tool is designed for simplicity and accuracy.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Input Text Area:</strong> A space for you to paste the Base64 encoded string.</li>
            <li><strong>Decode Button:</strong> This button initiates the decoding process.</li>
            <li><strong>Result Display:</strong> The original, decoded data is displayed here. If the input was not a valid Base64 string, an error message will be shown instead.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the Base64 Decode Tool</h3>
          <p>
            Decoding a Base64 string is a straightforward process.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Enter Base64 String:</strong> Paste the Base64 data you want to decode into the input text area.</li>
            <li><strong>Click Decode:</strong> Press the "Decode" button.</li>
            <li><strong>View the Result:</strong> The tool will display the original, decoded text in the results area.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Why is Base64 used?</AccordionTrigger>
              <AccordionContent>
                Base64 is used to transmit binary data over systems that are designed to handle only text. For example, you can't just paste the raw bytes of an image into an email or an HTML file. By encoding the image into Base64 (which is all text characters), it can be safely embedded and transported. The receiving end then decodes it back into the original image.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is Base64 a form of encryption?</AccordionTrigger>
              <AccordionContent>
                No, Base64 is an encoding scheme, not an encryption algorithm. It does not secure data; it only transforms it into a different representation. Anyone can decode a Base64 string, so it should never be used to protect sensitive information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Why does my decoded text look like gibberish?</AccordionTrigger>
              <AccordionContent>
                If the decoded text is unreadable, it's likely that the original data was not plain text. For example, if you decode the Base64 string of a PNG image, the output will be the raw binary data of that image file, which will not be human-readable. The tool decodes the data correctly, but your browser can only display it as text.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>Why am I getting an "Invalid Base64 string" error?</AccordionTrigger>
              <AccordionContent>
                This error occurs if the text you entered is not a valid Base64 string. This could be because it contains characters that are not part of the Base64 character set, or because the padding is incorrect. Double-check the string you copied for any missing or extra characters.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            Base64 encoding increases the size of the data by approximately 33%. This is because it represents 3 bytes of binary data (24 bits) using 4 ASCII characters (32 bits). This overhead is a trade-off for the ability to safely transmit binary data over text-only systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Base64DecodeTool;
