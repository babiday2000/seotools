import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clipboard, ClipboardCheck, Repeat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const TextRepeaterTool = () => {
  const [text, setText] = useState('');
  const [times, setTimes] = useState(10);
  const [separator, setSeparator] = useState(' ');
  const [repeatedText, setRepeatedText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRepeat = () => {
    if (!text || times <= 0) return;
    const result = Array(times).fill(text).join(separator);
    setRepeatedText(result);
  };

  const handleCopy = () => {
    if (!repeatedText) return;
    navigator.clipboard.writeText(repeatedText);
    setCopied(true);
    toast.success('Repeated text copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Text Repeater Tool</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Easily duplicate any text, word, or character multiple times. Our tool is perfect for software testing, data generation, or creating unique text patterns for social media and design.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Text Duplicator</CardTitle>
          <CardDescription>Enter your text, specify the number of repetitions, choose a separator, and generate.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="text-to-repeat">Text to Repeat</Label>
              <Textarea
                id="text-to-repeat"
                placeholder="Enter text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="times">Number of Repetitions</Label>
              <Input
                id="times"
                type="number"
                value={times}
                onChange={(e) => setTimes(Math.max(1, parseInt(e.target.value, 10)))}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
              <Label htmlFor="separator">Separator</Label>
              <Select value={separator} onValueChange={setSeparator}>
                <SelectTrigger id="separator" className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Space</SelectItem>
                  <SelectItem value="\n">New Line</SelectItem>
                  <SelectItem value="">Nothing</SelectItem>
                  <SelectItem value=", ">, (Comma + Space)</SelectItem>
                  <SelectItem value=" | ">| (Pipe + Space)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          <div className="text-center">
            <Button onClick={handleRepeat} disabled={!text}>
              <Repeat className="mr-2 h-4 w-4" />
              Repeat Text
            </Button>
          </div>
          {repeatedText && (
            <div className="relative mt-4">
              <Textarea
                placeholder="Repeated text will appear here..."
                className="h-48 text-base bg-muted"
                value={repeatedText}
                readOnly
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Principle of Repetition: A Fundamental Tool</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Repetition is a fundamental concept in both human language and computer science. In writing, it's used for emphasis and rhythm. In computing, it's the basis of loops and iterations that perform tasks thousands of times over. Our Text Repeater tool harnesses this simple but powerful principle, allowing you to take any string of text—a single character, a word, or an entire sentence—and duplicate it as many times as you wish.</p>
                <p>This utility serves a wide range of practical and creative purposes. For developers and testers, it's an invaluable tool for generating large volumes of predictable data to stress-test applications. For designers and social media users, it's a way to create eye-catching patterns and visual effects. At its core, the tool automates a tedious manual task, saving you time and ensuring perfect accuracy, whether you need a word repeated ten times or ten thousand times.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How It Works and Customization Options</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Using the tool is a simple, three-step process with options for customization:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Enter Your Text:</strong> Type or paste the exact string of text you want to duplicate into the input field.</li>
                    <li><strong>Set the Repetition Count:</strong> Specify the exact number of times you want the text to be repeated.</li>
                    <li><strong>Choose a Separator:</strong> This is a key feature that controls how the repeated items are joined together. You can choose:
                        <ul className="list-disc list-inside space-y-1 pl-6 mt-2">
                            <li><strong>Space:</strong> Separates each instance with a single space (e.g., `word word word`).</li>
                            <li><strong>New Line:</strong> Places each instance on its own line, creating a vertical list.</li>
                            <li><strong>Nothing:</strong> Joins all instances together with no separator, creating one continuous string (e.g., `wordwordword`).</li>
                            <li><strong>Other Characters:</strong> You can also choose common delimiters like a comma or a pipe for specific data formatting needs.</li>
                        </ul>
                    </li>
                </ol>
                <p>Once you click "Repeat Text," the tool programmatically constructs the final string and displays it, ready for you to copy and use.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Practical Applications Across Different Fields</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The ability to quickly generate repetitive text is surprisingly useful in many domains:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Software and QA Testing:</strong> A primary use case. Testers need to check how applications handle large amounts of data. You can use this tool to generate a 5,000-character string to test the limits of a database field or to create a long list of items to see how a user interface performs with extensive content.</li>
                    <li><strong>Data Generation and Mockups:</strong> Create placeholder data for design mockups or populate a development database with thousands of sample records quickly.</li>
                    <li><strong>Art and Design:</strong> Create text-based patterns (ASCII art) or visual backgrounds for graphic design projects. The "New Line" separator is particularly useful for this.</li>
                    <li><strong>Social Media and Marketing:</strong> Create fun, eye-catching posts that use repetition for emphasis or humor. For example, repeating an emoji multiple times.</li>
                    <li><strong>Education:</strong> Teachers can use the tool to create practice sheets for handwriting or to demonstrate the concept of loops in programming classes (e.g., "repeat this action 10 times").</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Is there a limit to how many times I can repeat the text?</h3>
                    <p className="text-muted-foreground mt-1">While the tool can handle very high numbers, generating an extremely large amount of text (e.g., repeating a long sentence millions of times) can consume significant browser memory and may cause the page to become slow or unresponsive. We recommend using it within reasonable limits for the best experience.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Does the tool repeat the spaces in my original text?</h3>
                    <p className="text-muted-foreground mt-1">Yes. The tool duplicates the exact text you enter in the input box, including any leading or trailing spaces. If you enter " word ", it will repeat " word " with the spaces included.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How is this different from copy and paste?</h3>
                    <p className="text-muted-foreground mt-1">While you could copy and paste text 10 times, this tool makes it effortless to do it 100 or 1,000 times. It's about automating a tedious, manual task to save you time and effort, especially for a large number of repetitions.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I use this to "spam" or overload a system?</h3>
                    <p className="text-muted-foreground mt-1">This tool is intended for legitimate testing, creative, and educational purposes. While it can be used to generate large amounts of text for stress testing your own applications, using it to intentionally overload or spam third-party services is against their terms of service and is strongly discouraged.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default TextRepeaterTool;
