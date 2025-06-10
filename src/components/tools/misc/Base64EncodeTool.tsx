import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Base64 } from 'js-base64';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const Base64EncodeTool = () => {
  const [text, setText] = useState('');
  const [encodedText, setEncodedText] = useState('');

  const handleEncode = () => {
    if (!text) return;
    setEncodedText(Base64.encode(text));
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Base64 Encode</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter text to encode"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
          />
          <Button onClick={handleEncode} className="mt-4">Encode</Button>
          {encodedText && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Encoded Text:</h3>
              <pre className="p-4 bg-muted/20 rounded-lg font-mono break-words whitespace-pre-wrap">{encodedText}</pre>
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is Base64 Encode?</h2>
        <p className="text-lg">
          Base64 Encode is the process of converting binary data into a text-based format using a specific set of 64 ASCII characters. This is necessary because many systems, particularly older internet protocols, are designed to handle only text and cannot process raw binary data (like images or executable files). By encoding binary data into Base64, it can be safely transmitted over these text-only channels without the risk of data corruption. Our Base64 Encode tool allows you to easily convert any piece of text into its Base64 representation.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in Base64 Encoding</h3>
          <p>
            The encoding process is standardized and follows a precise set of rules:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Grouping by 3 Bytes:</strong> The core of the process involves taking the input data and breaking it down into groups of 3 bytes (a total of 24 bits).</li>
            <li><strong>Conversion to 6-Bit Chunks:</strong> Each 24-bit group is then divided into four 6-bit chunks.</li>
            <li><strong>Mapping to ASCII Characters:</strong> Each 6-bit chunk corresponds to a number between 0 and 63. This number is used as an index to look up a character in the Base64 character set. This set consists of A-Z, a-z, 0-9, '+', and '/'.</li>
            <li><strong>Padding:</strong> If the last group of input data has fewer than 3 bytes, padding is required. One or two '=' characters are added to the end of the output string to indicate how many bytes were missing from the final group.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our Base64 Encoder</h3>
          <p>
            Our tool is designed for simplicity and ease of use.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Text Input Area:</strong> A space where you can type or paste the text you want to encode.</li>
            <li><strong>Encode Button:</strong> This button initiates the encoding process.</li>
            <li><strong>Result Display:</strong> The Base64 encoded string is displayed here, ready for you to copy and use.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the Base64 Encode Tool</h3>
          <p>
            Encoding a string into Base64 is a simple process.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Enter Text:</strong> Type or paste the text you want to encode into the input text area.</li>
            <li><strong>Click Encode:</strong> Press the "Encode" button.</li>
            <li><strong>Copy the Result:</strong> The tool will instantly display the Base64 encoded string in the results area.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What are the common uses for Base64 encoding?</AccordionTrigger>
              <AccordionContent>
                The most common use is embedding binary data in text-based files. For example, small images or fonts can be Base64 encoded and embedded directly into a CSS or HTML file, which can sometimes improve website performance by reducing the number of HTTP requests. It's also used in email protocols (MIME) to handle attachments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Does Base64 make my data secure?</AccordionTrigger>
              <AccordionContent>
                No. It is very important to understand that Base64 is an encoding scheme, not an encryption scheme. It provides no security or confidentiality. It is easily reversible by anyone. To secure data, you must use a proper encryption algorithm like AES.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Why does the encoded string have '=' at the end sometimes?</AccordionTrigger>
              <AccordionContent>
                The '=' characters are padding. The Base64 algorithm processes data in chunks of 3 bytes. If the input data is not a perfect multiple of 3, the final chunk will be shorter. The padding characters are added to the output to ensure that the total length of the encoded string is a multiple of 4, which is necessary for the decoding process to work correctly.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>Can I encode files with this tool?</AccordionTrigger>
              <AccordionContent>
                This tool is designed for encoding plain text. While it is possible to Base64 encode files, that requires reading the file's binary data, which is a feature we plan to add in the future. For now, you can use this tool for any text-based data.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            Base64 is one of the encoding schemes used in "data URLs," which allow you to embed files directly into a web page as if they were external resources. A data URL for a small red dot image might start with `data:image/png;base64,iVBORw0KGgo...`, where the long string of characters is the Base64 representation of the image file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Base64EncodeTool;
