import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import QRCode from 'qrcode';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fetchQrCode = async (text: string, color: string, errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H') => {
  if (!text) return null;
  return await QRCode.toDataURL(text, {
    width: 300,
    color: {
      dark: color,
    },
    errorCorrectionLevel,
  });
};

const QrCodeGeneratorTool = () => {
  const [text, setText] = useState('');
  const [qrText, setQrText] = useState('');
  const [color, setColor] = useState('#000000');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  const { data: qrCodeUrl, isLoading, isError, refetch } = useQuery({
    queryKey: ['qrcode', qrText, color, errorCorrectionLevel],
    queryFn: () => fetchQrCode(qrText, color, errorCorrectionLevel),
    enabled: false,
  });

  const handleGenerate = () => {
    setQrText(text);
    refetch();
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>QR Code Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex-grow">
              <Label htmlFor="qr-text">Text or URL</Label>
              <Input
                id="qr-text"
                type="text"
                placeholder="Enter text or URL to encode"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <Label htmlFor="qr-color">Color</Label>
                <Input
                  id="qr-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="qr-ecc">Error Correction</Label>
                <Select value={errorCorrectionLevel} onValueChange={(value) => setErrorCorrectionLevel(value as 'L' | 'M' | 'Q' | 'H')}>
                  <SelectTrigger id="qr-ecc">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low</SelectItem>
                    <SelectItem value="M">Medium</SelectItem>
                    <SelectItem value="Q">Quartile</SelectItem>
                    <SelectItem value="H">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleGenerate} disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
          {isLoading && <div className="text-center mt-4"><p>Loading...</p></div>}
          {isError && <div className="text-center text-red-500"><p>Failed to generate QR code.</p></div>}
          {qrCodeUrl && (
            <div className="flex flex-col items-center justify-center mt-4">
              <img src={qrCodeUrl} alt="Generated QR Code" className="border-4 border-white shadow-lg" />
              <Button asChild className="mt-4">
                <a href={qrCodeUrl} download="qrcode.png">Download QR Code</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a QR Code Generator?</h2>
        <p className="text-lg">
          A QR Code Generator is a tool that converts text-based information into a Quick Response (QR) code. A QR code is a two-dimensional barcode that can be scanned by smartphones and other devices to quickly access the encoded information. This information can be anything from a website URL, a piece of text, contact details (vCard), or Wi-Fi login credentials. Our generator makes it incredibly easy to create your own QR codes for business cards, event posters, product packaging, or any other purpose where you want to provide a quick and easy way for people to access digital information from a physical object.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in QR Code Generation</h3>
          <p>
            Creating a functional QR code involves several important factors:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Input Data:</strong> The information you want to encode. This can be any string of text. The more data you include, the more complex and dense the QR code will become.</li>
            <li><strong>Encoding Mode:</strong> QR codes can encode data in different modes (numeric, alphanumeric, byte/binary, and kanji). The generator automatically selects the most efficient mode based on the input data.</li>
            <li><strong>Error Correction Level:</strong> This is a crucial feature of QR codes. It adds redundant data to the code, allowing it to be read even if it's partially damaged or obscured. There are four levels: Low (L), Medium (M), Quartile (Q), and High (H). A higher level of error correction means the code is more robust, but it also increases the density of the QR code.</li>
            <li><strong>Version (Size):</strong> The "version" of a QR code determines its size and data capacity. There are 40 versions, from 21x21 pixels (Version 1) to 177x177 pixels (Version 40). The generator selects the smallest possible version that can accommodate your data and the chosen error correction level.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our Generator</h3>
          <p>
            Our tool is designed for simplicity and power.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Text Input:</strong> A simple text field where you enter the data you want to encode.</li>
            <li><strong>Generate Button:</strong> A single button to start the QR code creation process.</li>
            <li><strong>QR Code Display:</strong> An area where the generated QR code image appears instantly.</li>
            <li><strong>Download Button:</strong> A convenient button that lets you save the generated QR code as a high-quality PNG image file.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the QR Code Generator</h3>
          <p>
            Creating your own QR code is a breeze with our tool.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Enter Your Data:</strong> Type or paste the text, URL, or other information you want to encode into the input field.</li>
            <li><strong>Click Generate:</strong> Press the "Generate" button.</li>
            <li><strong>View and Download:</strong> Your custom QR code will appear on the screen. You can then click the "Download QR Code" button to save it to your device.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What can I put in a QR code?</AccordionTrigger>
              <AccordionContent>
                You can encode almost any text-based information. Common uses include website URLs, email addresses, phone numbers, plain text messages, Wi-Fi network details, and contact information (vCards). The more text you add, the more complex the QR code will be.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Do the generated QR codes expire?</AccordionTrigger>
              <AccordionContent>
                No, the QR codes you generate with our tool will never expire. They are static images that contain the data you entered. As long as the data itself is valid (e.g., the website URL still works), the QR code will function indefinitely.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I customize the design of my QR code?</AccordionTrigger>
              <AccordionContent>
                This basic generator creates standard black and white QR codes. While it is possible to add logos or change the colors of QR codes, this requires more advanced tools and can sometimes affect scannability if not done correctly. For most applications, a standard QR code is the most reliable option.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>How can I track how many people scan my QR code?</AccordionTrigger>
              <AccordionContent>
                To track scans, you need to encode a URL that is trackable. You can use a URL shortening service like Bitly or a custom solution that redirects to your final destination. When users scan the QR code, they will visit the trackable link first, allowing you to count the "clicks" before they are sent to the final page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            While QR codes were invented in 1994, they saw a massive surge in popularity during the COVID-19 pandemic. Restaurants replaced physical menus with QR codes to provide a touchless experience, and businesses used them for contact tracing and contactless payments. This global event transformed the QR code from a niche technology into an everyday tool for millions of people.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QrCodeGeneratorTool;
