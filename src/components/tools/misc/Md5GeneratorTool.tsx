import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CryptoJS from 'crypto-js';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const Md5GeneratorTool = () => {
  const [text, setText] = useState('');
  const [md5Hash, setMd5Hash] = useState('');

  const handleGenerate = () => {
    setMd5Hash(CryptoJS.MD5(text).toString());
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>MD5 Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              type="text"
              placeholder="Enter text to hash"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleGenerate}>Generate</Button>
          </div>
          {md5Hash && (
            <div className="text-lg bg-muted/20 p-4 rounded-lg">
              <p className="font-bold text-center">MD5 Hash: <span className="font-mono break-all">{md5Hash}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is an MD5 Generator?</h2>
        <p className="text-lg">
          An MD5 Generator is a tool that creates a unique 128-bit "fingerprint" or "hash" for any given piece of text or data. MD5 stands for Message-Digest Algorithm 5. It's a cryptographic hash function that takes an input of any length and produces a fixed-length 32-character hexadecimal number. A key property of a hash function is that the same input will always produce the same output. However, even a tiny change in the input (like adding a single space) will result in a completely different output hash. Our MD5 Generator allows you to quickly create these hashes for various purposes, most commonly for verifying data integrity.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in MD5 Hash Generation</h3>
          <p>
            The generation of an MD5 hash is a complex mathematical process, but it's governed by a few core principles:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>One-Way Function:</strong> MD5 is a one-way hash function. This means that it's easy to compute a hash from an input, but it is computationally infeasible to reverse the process and find the original input just from the hash.</li>
            <li><strong>Deterministic:</strong> The process is deterministic, meaning the same input will always produce the exact same MD5 hash. This is crucial for its use in data verification.</li>
            <li><strong>Avalanche Effect:</strong> A small change in the input data will produce a drastically different hash. This property ensures that any tampering with the data will be immediately obvious.</li>
            <li><strong>Fixed-Length Output:</strong> Regardless of the size of the input data (whether it's a single word or an entire book), the output of the MD5 algorithm is always a 128-bit hash, which is typically represented as a 32-character hexadecimal string.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our MD5 Generator</h3>
          <p>
            Our tool is designed for ease of use and reliability.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Text Input:</strong> A field where you can type or paste the string of text you want to hash.</li>
            <li><strong>Generate Button:</strong> This button triggers the hashing algorithm.</li>
            <li><strong>Result Display:</strong> The generated 32-character MD5 hash is displayed here, ready for you to copy.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the MD5 Generator</h3>
          <p>
            Creating an MD5 hash is a simple process.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Enter Text:</strong> Type or paste the text you want to hash into the input field.</li>
            <li><strong>Click Generate:</strong> Press the "Generate" button.</li>
            <li><strong>Copy the Hash:</strong> The tool will instantly display the MD5 hash. You can then copy it for your needs.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is MD5 used for?</AccordionTrigger>
              <AccordionContent>
                The most common use is for verifying file integrity. When you download a file, a website might provide an MD5 hash of the original file. You can then generate a hash of the file you downloaded. If the two hashes match, you know your file is identical to the original and wasn't corrupted during download. It's also used in some older systems for password storage, though this is no longer recommended.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is MD5 secure?</AccordionTrigger>
              <AccordionContent>
                For data integrity checks, MD5 is generally fine. However, for security-sensitive applications like password storage or digital signatures, MD5 is considered broken and should not be used. Vulnerabilities have been found that allow for "collisions," where two different inputs can produce the same hash. For security, modern and stronger hash functions like SHA-256 are recommended.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I get the original text back from an MD5 hash?</AccordionTrigger>
              <AccordionContent>
                No, you cannot reverse the MD5 hash to get the original text. It is a one-way function. While you can't reverse it, it is possible to find the original text if it's simple enough by using a "rainbow table," which is a precomputed list of hashes for common words and passwords. This is another reason why MD5 is not secure for passwords.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>Is the MD5 hash case-sensitive?</AccordionTrigger>
              <AccordionContent>
                Yes, the input is case-sensitive. For example, "Hello" and "hello" will produce two completely different MD5 hashes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            MD5 was designed by Professor Ronald Rivest at MIT in 1991 to replace an earlier hash function, MD4. It was widely used in the 1990s and early 2000s and was even part of the digital signature standard for a time. Despite its known vulnerabilities, its legacy continues, and it remains a popular tool for its original purpose: as a fast and simple way to check for unintentional data corruption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Md5GeneratorTool;
