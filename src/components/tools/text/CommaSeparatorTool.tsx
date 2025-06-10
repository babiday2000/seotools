import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, Settings2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const CommaSeparatorTool = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [separator, setSeparator] = useState(', ');
  const [splitBy, setSplitBy] = useState('space');

  const handleSeparate = () => {
    if (!text) return;
    let items: string[];
    switch (splitBy) {
      case 'space':
        items = text.split(/\s+/).filter(Boolean);
        break;
      case 'newline':
        items = text.split(/\r?\n/).filter(Boolean);
        break;
      case 'comma':
        items = text.split(',').map(s => s.trim()).filter(Boolean);
        break;
      default:
        items = text.split(/\s+/).filter(Boolean);
    }
    setResult(items.join(separator));
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
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">List to Comma Separator Tool</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Quickly and easily convert any list of items into a clean, comma-separated string. Ideal for developers, data analysts, and content creators who need to format data for code, spreadsheets, or tag fields.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>List Formatter</CardTitle>
          <CardDescription>Paste your list, choose your options, and generate a perfectly formatted string.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Textarea
              placeholder="Paste your list here. Items can be separated by spaces, new lines, or commas."
              className="h-64 text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="relative">
              <Textarea
                placeholder="Your formatted, comma-separated list will appear here."
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Label htmlFor="split-by">Split Items By</Label>
              <Select value={splitBy} onValueChange={setSplitBy}>
                <SelectTrigger id="split-by" className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="space">Space</SelectItem>
                  <SelectItem value="newline">New Line</SelectItem>
                  <SelectItem value="comma">Comma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="separator">Join With</Label>
              <Select value={separator} onValueChange={setSeparator}>
                <SelectTrigger id="separator" className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=", ">, (Comma + Space)</SelectItem>
                  <SelectItem value=",">, (Comma)</SelectItem>
                  <SelectItem value="; ">; (Semicolon + Space)</SelectItem>
                  <SelectItem value=" | ">| (Pipe + Space)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSeparate} disabled={!text} size="lg">
              <Settings2 className="mr-2 h-5 w-5" />
              Format List
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Power of the Delimiter: Structuring Your Data</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>In the world of data, a "delimiter" is a character that marks the beginning or end of a unit of data. The comma is the most famous delimiter, forming the backbone of the widely used Comma-Separated Values (CSV) format. This simple character allows us to take a chaotic list of items and give it a clean, universally understood structure. Our Comma Separator tool is a specialized utility designed to make this formatting process instant and effortless.</p>
                <p>Whether you have a list of words separated by spaces, a column of items copied from a spreadsheet separated by new lines, or a jumble of text, this tool can intelligently parse it. It identifies the individual items based on your chosen delimiter and then joins them back together into a single, clean string, separated by the delimiter of your choice. This is an essential, time-saving task for anyone who works with lists of data.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How It Works: A Look Under the Hood</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool gives you precise control over the formatting process:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Input Your List:</strong> You begin by pasting your list into the input text area. The list can be in almost any common format.</li>
                    <li><strong>Choose Your "Split By" Delimiter:</strong> This is the crucial first step. You tell the tool how the items in your original list are separated.
                        <ul className="list-disc list-inside space-y-1 pl-6 mt-2">
                            <li><strong>Space:</strong> For lists like `item1 item2 item3`.</li>
                            <li><strong>New Line:</strong> For lists copied from a column in a document or spreadsheet.</li>
                            <li><strong>Comma:</strong> For cleaning up lists that are already comma-separated but may have inconsistent spacing.</li>
                        </ul>
                    </li>
                    <li><strong>Choose Your "Join With" Separator:</strong> Next, you select the character(s) you want to place between each item in the final output. While a comma followed by a space is the most common, we also provide options for just a comma, a semicolon, or a pipe, covering a wide range of formatting requirements.</li>
                    <li><strong>Generate and Copy:</strong> With a click of the "Format List" button, the tool performs the conversion. The clean, perfectly formatted string appears in the output box, ready to be copied and used wherever you need it.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Everyday Uses for List Formatting</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>This tool is a simple utility with a surprisingly broad range of applications:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Creating SEO Tags:</strong> Take a list of keywords for a blog post or YouTube video and instantly format them into a comma-separated string ready to be pasted into a tag field.</li>
                    <li><strong>Programming and Development:</strong> Quickly format a list of values to be used in a programming array, list, or enumeration. For example, converting a list of names into `["Alice", "Bob", "Charlie"]`.</li>
                    <li><strong>Data Entry and Spreadsheets:</strong> Prepare data for import into applications that require CSV format. Convert a column of data from a Word document into a single cell in Excel or Google Sheets.</li>
                    <li><strong>Database Queries:</strong> Format a list of IDs or search terms to be used in a SQL `IN` clause, such as `WHERE user_id IN (101, 203, 405)`.</li>
                    <li><strong>General Writing:</strong> Quickly turn a bulleted or multi-line list into a standard in-sentence list for a paragraph in an article or report.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">What happens to extra spaces or empty lines?</h3>
                    <p className="text-muted-foreground mt-1">Our tool is designed to be smart about whitespace. It automatically trims any leading or trailing spaces from each item and filters out any empty items that might result from extra line breaks or spaces. This ensures your final output is clean and free of unwanted gaps or empty commas.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is the best format for CSV files?</h3>
                    <p className="text-muted-foreground mt-1">A standard CSV (Comma-Separated Values) file uses a comma (`,`) with no space as the delimiter. If you are creating data for a CSV file, you should choose the single comma as your "Join With" separator.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I use a custom separator?</h3>
                    <p className="text-muted-foreground mt-1">Currently, our tool offers the most common separators (comma, semicolon, pipe) for simplicity and to cover the vast majority of use cases. We may add custom separator options in the future based on user feedback.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How does this handle items that already contain commas?</h3>
                    <p className="text-muted-foreground mt-1">If you choose to split by "Space" or "New Line," any commas within your items will be preserved as part of the item itself. If you choose to split by "Comma," it will break the items at each comma, so be mindful of your input format. For complex CSV data with quoted strings, a more specialized CSV parsing tool is recommended.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default CommaSeparatorTool;
