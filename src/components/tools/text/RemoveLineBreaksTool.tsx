import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const RemoveLineBreaksTool = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [removeParagraphBreaks, setRemoveParagraphBreaks] = useState(false);

  const handleRemoveLineBreaks = () => {
    let newText = text.replace(/(\r\n|\n|\r)/g, ' ');
    if (removeParagraphBreaks) {
      newText = newText.replace(/\s{2,}/g, ' ');
    }
    setResult(newText.trim());
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Remove Line Breaks</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly clean up your text by removing unwanted line breaks and paragraph spacing. This tool is perfect for formatting text copied from PDFs, emails, and websites, ensuring it flows as a clean, continuous block.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Line Break Removal Tool</CardTitle>
          <CardDescription>Paste your text below to strip out all line and paragraph breaks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Textarea
              placeholder="Paste your text with unwanted line breaks here..."
              className="h-64 text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="relative">
              <Textarea
                placeholder="Your cleaned-up text will appear here."
                className="h-64 text-base bg-muted"
                value={result}
                readOnly
              />
              {result && (
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Switch
                id="paragraph-breaks"
                checked={removeParagraphBreaks}
                onCheckedChange={setRemoveParagraphBreaks}
              />
              <Label htmlFor="paragraph-breaks">Also remove paragraph breaks (multiple spaces)</Label>
            </div>
            <Button onClick={handleRemoveLineBreaks} disabled={!text} size="lg">
              <Trash2 className="mr-2 h-5 w-5" />
              Remove Line Breaks
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Problem of Unwanted Line Breaks</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>In the digital world, text is not always as it seems. When you copy text from a source like a PDF document, an email client, or a poorly formatted website, you often inadvertently copy hidden formatting characters, most notably line breaks. These characters, which are invisible to the naked eye, force the text to wrap to the next line, often in the middle of a sentence. When you paste this text into a different editor, a document, or a form field, the result is a jagged, hard-to-read block of text with awkward and unnatural breaks.</p>
                <p>This tool is designed to solve that exact problem. It normalizes your text by intelligently identifying and removing these disruptive line break characters, seamlessly stitching your text back together into smooth, readable paragraphs. It's an essential utility for anyone who regularly works with text from multiple sources.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Understanding Line Break Characters (CRLF vs. LF)</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The reason this problem is so common is that different operating systems have historically used different invisible characters to signify the end of a line:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>CRLF (`\r\n`):</strong> Stands for "Carriage Return" and "Line Feed." This two-character sequence is the standard for Windows operating systems. It's a holdover from the days of typewriters, where one action returned the carriage to the start of the line and another advanced the paper.</li>
                    <li><strong>LF (`\n`):</strong> Stands for "Line Feed." This single character is the standard for modern Unix-based systems, including macOS and Linux.</li>
                </ul>
                <p>When you copy text that moves between these systems, or from formats like PDF that have their own internal structure, you can end up with a mix of these characters. Our tool is built to recognize and eliminate all of them (`\r\n`, `\n`, and `\r`), ensuring a clean result regardless of the source.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Practical Applications for Clean Text</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A quick clean-up of your text can save time and frustration in many scenarios:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Content Curation:</strong> When gathering research or quotes from various online sources (especially PDFs), this tool is indispensable for cleaning up the text before incorporating it into your own articles or documents.</li>
                    <li><strong>Data Entry:</strong> Ensure data pasted into spreadsheet cells or database fields is clean and free of formatting issues that could corrupt your dataset or cause errors.</li>
                    <li><strong>Email and Communication:</strong> Fix a forwarded email chain where each reply has added another layer of awkward line breaks, making the final message clean and professional.</li>
                    <li><strong>Development and Coding:</strong> Clean up log files, error messages, or code snippets that have been copied with inconsistent line endings, making them easier to read and debug.</li>
                    <li><strong>Preparing Social Media Posts:</strong> When you paste text into a social media scheduler or platform, unwanted line breaks can ruin your formatting. This tool ensures your message appears exactly as intended.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">What are paragraph breaks and why would I remove them?</h3>
                    <p className="text-muted-foreground mt-1">When line breaks are removed, they are replaced with a space. Sometimes, text copied from a source might have a double line break to separate paragraphs. This results in two spaces next to each other in the cleaned text. Our optional "Also remove paragraph breaks" feature uses a regular expression to find and replace any instances of two or more spaces with a single space, ensuring the entire text becomes one seamless block with no extra gaps.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Will this tool remove the space at the start or end of my text?</h3>
                    <p className="text-muted-foreground mt-1">Yes. After all line breaks are removed and replaced, the tool performs a final "trim" operation, which automatically removes any leading or trailing whitespace from the entire block of text, giving you the cleanest possible output.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I replace line breaks with something other than a space?</h3>
                    <p className="text-muted-foreground mt-1">This tool is specifically designed to replace line breaks with a single space, as this is the most common requirement for creating readable paragraphs. For more complex find-and-replace operations, a dedicated text editor with regular expression support would be more suitable.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Is there a character limit?</h3>
                    <p className="text-muted-foreground mt-1">Our tool is designed to handle very large blocks of text, suitable for cleaning up entire articles or documents. While there is always a technical limit based on browser performance, it is high enough not to be a concern for the vast majority of use cases.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default RemoveLineBreaksTool;
