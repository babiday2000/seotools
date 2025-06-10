import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';

const RandomUuidGeneratorTool = () => {
  const [uuid, setUuid] = useState('');
  const [copied, setCopied] = useState(false);

  const generateUuid = () => {
    setUuid(crypto.randomUUID());
  };

  const handleCopy = () => {
    if (!uuid) return;
    navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input readOnly value={uuid} placeholder="Your new UUID will appear here" />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          disabled={!uuid}
        >
          {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
        </Button>
      </div>
      <Button onClick={generateUuid}>
        Generate UUID
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">What is a UUID and Why is it Important?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems. It is a standard that is used in software development to create unique identifiers for objects, such as database records, files, and more.</p>
                <p>UUIDs are designed to be unique across both space and time, which means that the same UUID will not be generated twice. This makes them ideal for use in distributed systems, where it is important to have a unique identifier for each object.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Key Components of a UUID</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A UUID is a 128-bit number that is typically represented as a sequence of 32 hexadecimal digits, separated by hyphens. For example, a UUID might look like this: `123e4567-e89b-12d3-a456-426614174000`.</p>
                <p>There are several versions of UUIDs, each of which is generated in a different way. The most common version is version 4, which is generated using random numbers.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How to Use the Random UUID Generator</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool makes it easy to generate a random UUID. Here’s how:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Click "Generate UUID":</strong> Click the "Generate UUID" button to generate a new random UUID.</li>
                    <li><strong>Copy the UUID:</strong> Click the copy button to copy the generated UUID to your clipboard.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Are UUIDs truly unique?</h3>
                    <p className="text-muted-foreground mt-1">While it is theoretically possible for two UUIDs to be the same, the probability of this happening is extremely low. For example, the probability of two version 4 UUIDs being the same is 1 in 2^122, which is a very small number.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is a fun fact about UUIDs?</h3>
                    <p className="text-muted-foreground mt-1">The first version of UUIDs was created in the 1980s by the Apollo Computer company. It was used to identify objects in the company's network computing system.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default RandomUuidGeneratorTool;
