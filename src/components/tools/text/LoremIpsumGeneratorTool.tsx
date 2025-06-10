import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clipboard, ClipboardCheck, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const loremIpsumParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
];

const LoremIpsumGeneratorTool = () => {
  const [count, setCount] = useState(5);
  const [unit, setUnit] = useState('paragraphs');
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    let text = '';
    const fullText = loremIpsumParagraphs.join(' ');
    const words = fullText.split(' ');

    if (unit === 'paragraphs') {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(loremIpsumParagraphs[i % loremIpsumParagraphs.length]);
      }
      text = result.join('\n\n');
    } else if (unit === 'sentences') {
        const sentences = fullText.split('. ').map(s => s.trim() + '.');
        text = sentences.slice(0, count).join(' ');
    } else if (unit === 'words') {
        text = words.slice(0, count).join(' ');
    }
    setGeneratedText(text);
  };
  
  useEffect(() => {
    handleGenerate();
  }, []);


  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Lorem Ipsum Generator</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Quickly generate placeholder text for your designs, mockups, and prototypes. Our tool provides clean, standard "Lorem Ipsum" text in paragraphs, sentences, or words, allowing you to focus on layout and design without being distracted by content.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Placeholder Text</CardTitle>
          <CardDescription>Specify the amount and type of text you need, then generate and copy.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Label htmlFor="count">Generate</Label>
              <Input
                id="count"
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10)))}
                className="w-24"
              />
            </div>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraphs">Paragraphs</SelectItem>
                <SelectItem value="sentences">Sentences</SelectItem>
                <SelectItem value="words">Words</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerate}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
          <div className="relative">
            <Textarea
              placeholder="Generated Lorem Ipsum text will appear here."
              className="h-64 text-base"
              value={generatedText}
              readOnly
            />
            {generatedText && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleCopy}
                  title="Copy to clipboard"
                >
                  {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
                </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Designer's Best Friend: What is Lorem Ipsum?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Lorem Ipsum is the industry-standard dummy or placeholder text used in the design and publishing industries. It's a block of scrambled Latin text that has been used since the 16th century as a way to fill space in a design layout before the final, meaningful content is available. The primary purpose of Lorem Ipsum is to allow designers to focus on the visual elements of a layout—such as typography, font size, and spacing—without being distracted by the readability or meaning of the text itself.</p>
                <p>When people read comprehensible text, their focus naturally shifts to the content. If a designer uses "Your content here" as placeholder text, a client reviewing the design might get distracted by that phrase. By using the semi-random, Latin-esque Lorem Ipsum, the text fades into the background, serving as a neutral visual block that effectively simulates real content. This allows for a more objective evaluation of the design's layout and aesthetic appeal.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Surprising History of a Scrambled Text</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Contrary to popular belief, Lorem Ipsum is not simply random gibberish. It has its roots in a piece of classical Latin literature from 45 BC. Dr. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, traced its origin to sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (On the Ends of Good and Evil), a treatise on the theory of ethics written by the Roman statesman and orator Cicero.</p>
                <p>The standard Lorem Ipsum passage we use today is a scrambled version of excerpts from this text. It's believed that an unknown printer in the 1500s took a galley of type and scrambled it to make a type specimen book. This historical connection is why the text has a natural-sounding distribution of letters and word lengths, making it a much better placeholder than randomly generated text.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Practical Uses in Modern Workflows</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The need for high-quality placeholder text is more relevant than ever in today's digital-first world.</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Web and App Design:</strong> UI/UX designers use Lorem Ipsum to populate wireframes, mockups, and interactive prototypes. This helps stakeholders visualize the final product and make decisions about layout and user flow before a single line of real content is written.</li>
                    <li><strong>Theme and Template Development:</strong> When creating WordPress themes, Shopify templates, or other web templates, developers use Lorem Ipsum to demonstrate how different content modules will look, ensuring the design is robust and looks good with varying amounts of text.</li>
                    <li><strong>Print Layout and Typesetting:</strong> In graphic design for magazines, brochures, and books, Lorem Ipsum is used to test font choices, leading (line spacing), and kerning (letter spacing) to ensure maximum readability and aesthetic appeal.</li>
                    <li><strong>Client Presentations:</strong> Presenting a design concept is much more effective with placeholder text. It gives the design a finished, professional look and prevents clients from getting hung up on "temporary" text, allowing them to focus on the design itself.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">What does "Lorem Ipsum" actually mean?</h3>
                    <p className="text-muted-foreground mt-1">It doesn't mean anything. The most common passage starts with "Lorem ipsum dolor sit amet..." which is a corruption of a Latin phrase "dolorem ipsum quia dolor sit amet," meaning "pain itself, because it is pain." Because the text is scrambled and words are cut off, it has no coherent meaning in Latin, which is precisely why it works so well as a placeholder.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Is it okay to leave Lorem Ipsum text on a live website?</h3>
                    <p className="text-muted-foreground mt-1">Absolutely not. This is a common mistake that looks highly unprofessional. Always ensure that all placeholder text is replaced with final, meaningful content before a website is launched to the public. Leaving Lorem Ipsum in place can confuse users and harm your site's credibility and SEO.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Are there other types of placeholder text?</h3>
                    <p className="text-muted-foreground mt-1">Yes, while Lorem Ipsum is the most famous, many fun alternatives exist, such as "Cupcake Ipsum," "Bacon Ipsum," or "Cat Ipsum," which generate paragraphs of themed, humorous text. However, for professional design work, the classic Lorem Ipsum is often preferred because its neutrality prevents the placeholder text itself from becoming a distraction.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Why not just use repeating text like "text here text here"?</h3>
                    <p className="text-muted-foreground mt-1">Using simple repeating text creates an unnatural visual pattern that doesn't accurately reflect how real paragraphs look. Lorem Ipsum uses varied word lengths and sentence structures, providing a much more realistic simulation of final content and allowing for a better assessment of the design's typography and layout.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default LoremIpsumGeneratorTool;
