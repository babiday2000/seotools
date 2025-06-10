import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BackwardsTextGeneratorTool = () => {
  const [text, setText] = useState('');
  const [backwardsText, setBackwardsText] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState('reverse');

  const handleGenerate = () => {
    if (!text) return;
    let result = '';
    switch (mode) {
      case 'reverse':
        result = text.split('').reverse().join('');
        break;
      case 'flip':
        result = text.split('').reverse().join('').split(' ').reverse().join(' ');
        break;
      case 'reverse_words':
        result = text.split(' ').map(word => word.split('').reverse().join('')).join(' ');
        break;
      default:
        result = text.split('').reverse().join('');
    }
    setBackwardsText(result);
  };

  const handleCopy = () => {
    if (!backwardsText) return;
    navigator.clipboard.writeText(backwardsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Backwards Text Generator</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly reverse, flip, or scramble any text with our versatile Backwards Text Generator. Perfect for creating fun social media posts, unique usernames, or simple coded messages. Explore different ways to transform your text and see language from a new, intriguing perspective.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Text Reversal Tool</CardTitle>
          <CardDescription>Enter your text, choose a reversal mode, and see the transformation instantly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Textarea
              placeholder="Enter your text here..."
              className="h-64 text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="relative">
              <Textarea
                placeholder="Reversed text will appear here."
                className="h-64 text-base bg-muted"
                value={backwardsText}
                readOnly
              />
              {backwardsText && (
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
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reverse">Reverse Text</SelectItem>
                <SelectItem value="flip">Flip Text</SelectItem>
                <SelectItem value="reverse_words">Reverse Word Lettering</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerate} disabled={!text} size="lg">
              <RefreshCw className="mr-2 h-5 w-5" />
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">A New Perspective: The World of Reversed Text</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The Backwards Text Generator is a simple yet surprisingly versatile tool that manipulates text strings to create reversed or "flipped" versions of your original content. At its core, it deconstructs your text into its basic components—characters or words—and reassembles them in a new order. This process can create amusing, puzzling, or artistically interesting results that can be used in a wide variety of creative contexts.</p>
                <p>While it may seem like a simple novelty, the concept of reversing text touches upon ideas of symmetry, coding, and perspective. It forces us to look at familiar words and sentences not for their meaning, but for their structure. This can be a fun mental exercise and a source of endless creative possibilities, from crafting secret notes to designing visually striking text-based art.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Understanding the Reversal Modes</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool offers several ways to transform your text, each with a unique outcome:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Reverse Text:</strong> This is the classic mode. It reverses the order of every single character in your text, including spaces and punctuation. For example, `Hello World` becomes `dlroW olleH`.</li>
                    <li><strong>Flip Text:</strong> This mode performs two reversals. It first reverses the entire text string (like the mode above) and then reverses the order of the resulting words. This creates a "flipped" effect where the words themselves are backwards, but their order is maintained. For example, `Hello World` becomes `olleH dlroW`.</li>
                    <li><strong>Reverse Word Lettering:</strong> This mode keeps the order of the words the same but reverses the lettering within each individual word. For example, `Hello World` becomes `olleH dlroW`. This is the same result as Flip Text, but achieved differently, and can be useful for specific coding or puzzle-making scenarios.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Creative and Practical Applications</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Why would you want to reverse text? The reasons range from playful to practical.</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Social Media Fun:</strong> Stand out on platforms like Twitter, Facebook, or Instagram by posting status updates, comments, or bios in reverse. It's a simple way to make your followers pause and engage with your content.</li>
                    <li><strong>Lightweight "Encryption":</strong> Create simple secret messages for friends. While not secure, it's a fun way to share a message that isn't immediately readable, perfect for online games or forums.</li>
                    <li><strong>Design and Typography:</strong> Graphic designers can use reversed text as a creative element in logos, posters, and digital art. It can create a sense of mystery, mirror imagery, or simply an interesting visual texture.</li>
                    <li><strong>Data Processing:</strong> In some specific programming and data processing scenarios, reversing a string of characters is a necessary step in an algorithm, for example, when checking for palindromes or manipulating certain data formats.</li>
                    <li><strong>Educational Puzzles:</strong> Teachers and parents can use the tool to create fun worksheets and games for children, helping them with spelling and letter recognition by challenging them to decode reversed words.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Does this work with all languages and special characters?</h3>
                    <p className="text-muted-foreground mt-1">Yes, the tool works at a character level, so it will reverse any character you input, including letters from different alphabets (e.g., Cyrillic, Greek), numbers, punctuation marks, and even emojis. The result will be a perfect mirror of the input string.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is a palindrome?</h3>
                    <p className="text-muted-foreground mt-1">A palindrome is a word, phrase, number, or other sequence of characters that reads the same backward as forward. Famous examples include "madam," "racecar," and the phrase "A man, a plan, a canal: Panama." You can use our tool to test if a word is a palindrome: if the "Reverse Text" output is identical to your input (ignoring case and punctuation), you've found one!</p>
                </div>
                <div>
                    <h3 className="font-semibold">Is this a form of encryption?</h3>
                    <p className="text-muted-foreground mt-1">Not in a secure sense. While it does make the text unreadable at a glance, it's a very simple "substitution cipher" that can be reversed just as easily. It should only be used for fun and not for protecting any sensitive or private information.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can this tool help with SEO?</h3>
                    <p className="text-muted-foreground mt-1">No, using backwards text on your website has no SEO benefit. Search engines like Google read and index text for its meaning and relevance. Reversed text is nonsensical to them and would not help you rank for any keywords. This tool is purely for creativity, fun, and specific design or data tasks.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default BackwardsTextGeneratorTool;
