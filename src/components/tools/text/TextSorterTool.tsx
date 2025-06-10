import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, ArrowDownUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const TextSorterTool = () => {
  const [text, setText] = useState('');
  const [sortedText, setSortedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isCaseSensitive, setIsCaseSensitive] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);

  const handleSort = () => {
    let lines = text.split('\n').filter(Boolean);

    if (removeDuplicates) {
      lines = [...new Set(lines)];
    }

    lines.sort((a, b) => {
      const valA = isCaseSensitive ? a : a.toLowerCase();
      const valB = isCaseSensitive ? b : b.toLowerCase();
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedText(lines.join('\n'));
  };

  const handleCopy = () => {
    if (!sortedText) return;
    navigator.clipboard.writeText(sortedText);
    setCopied(true);
    toast.success('Sorted text copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Alphabetical Text Sorter</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly organize any list of text into alphabetical or reverse-alphabetical order. Our tool handles case sensitivity and can remove duplicate entries, making it perfect for cleaning and preparing lists for any purpose.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>List Sorting Tool</CardTitle>
          <CardDescription>Paste your list (one item per line) and choose your sorting options.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Textarea
              placeholder="Paste your list here, with each item on a new line..."
              className="h-72 text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="relative">
              <Textarea
                placeholder="Your sorted list will appear here."
                className="h-72 text-base bg-muted"
                value={sortedText}
                readOnly
              />
              {sortedText && (
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
          <div className="flex flex-wrap items-center justify-center gap-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Label htmlFor="sort-order">Order</Label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger id="sort-order" className="w-[150px]">
                  <SelectValue placeholder="Select order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending (A-Z)</SelectItem>
                  <SelectItem value="desc">Descending (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="case-sensitive" checked={isCaseSensitive} onCheckedChange={setIsCaseSensitive} />
              <Label htmlFor="case-sensitive">Case Sensitive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="remove-duplicates" checked={removeDuplicates} onCheckedChange={setRemoveDuplicates} />
              <Label htmlFor="remove-duplicates">Remove Duplicates</Label>
            </div>
          </div>
          <div className="text-center">
            <Button onClick={handleSort} disabled={!text} size="lg">
              <ArrowDownUp className="mr-2 h-5 w-5" />
              Sort List
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">Bringing Order to Chaos: The Power of Sorting</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Sorting is one of the most fundamental operations in data processing and information management. It's the process of arranging items in a sequence according to a specific criterion. For text, this usually means alphabetical order. A sorted list is inherently easier for the human brain to scan and process than an unordered one. It allows us to quickly find items, identify duplicates, and understand the structure of the data at a glance.</p>
                <p>Our Text Sorter tool is designed to be a simple, fast, and powerful utility for this exact purpose. It takes a list of items—whether they are names, email addresses, keywords, or lines from a log file—and instantly arranges them alphabetically. With added controls for sort order, case sensitivity, and duplicate removal, it's a versatile tool for anyone who needs to bring a sense of order to their textual data.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Understanding the Sorting Options</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>To give you full control over your list, our tool provides several key options:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Ascending vs. Descending:</strong> You can sort your list in standard alphabetical order (A to Z) or in reverse-alphabetical order (Z to A).</li>
                    <li><strong>Case Sensitive Sorting:</strong> This is a crucial distinction. When "Case Sensitive" is on, the sort algorithm treats uppercase and lowercase letters as different characters. In most systems, all uppercase letters come before all lowercase letters (e.g., 'Z' comes before 'a'). When turned off, the tool treats 'A' and 'a' as the same letter, resulting in a more natural alphabetical sort that ignores capitalization.</li>
                    <li><strong>Remove Duplicates:</strong> With a single click, you can filter your list to show only the unique items. The tool will remove all duplicate entries, leaving you with a clean list of distinct values. This is incredibly useful for data cleaning tasks.</li>
                </ul>
                <p>The tool works by treating each new line in your input as a separate item in the list, which is the most common format for lists of text.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Who Can Benefit from a Text Sorter?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The need to sort lists is universal, making this tool valuable for many different people:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Data Analysts:</strong> Before processing a dataset, sorting it can be a key step in the data cleaning (or "data wrangling") process. It can help you spot inconsistencies and makes it easier to compare with other datasets.</li>
                    <li><strong>SEO Specialists and Marketers:</strong> Organize long lists of keywords alphabetically to make them easier to manage, review, and group into categories for your campaigns.</li>
                    <li><strong>Developers:</strong> Sort lists of CSS properties, function names, or configuration items to maintain a clean and standardized codebase that is easier for team members to read.</li>
                    <li><strong>Teachers and Students:</strong> Alphabetize lists of names for class rosters, sort bibliographies, or organize research notes quickly and easily.</li>
                    <li><strong>Anyone with a List:</strong> From a grocery list to a list of movies you want to watch, sorting makes any list more organized and manageable.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">How does the tool handle numbers in the list?</h3>
                    <p className="text-muted-foreground mt-1">The tool performs a lexicographical (dictionary-style) sort, not a numerical sort. This means it sorts based on the characters from left to right. As a result, "10" will come before "2" because the character '1' comes before '2'. For sorting numerical data, a spreadsheet program is more appropriate.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What happens to empty lines in my input?</h3>
                    <p className="text-muted-foreground mt-1">Our tool automatically filters out any empty lines from your input text, so you don't have to worry about them appearing at the top or bottom of your sorted list. It also trims whitespace from the beginning and end of each line.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is the difference between case-sensitive and case-insensitive sorting?</h3>
                    <p className="text-muted-foreground mt-1">In a case-sensitive sort, "Apple", "apple", and "APPLE" are treated as three different words. In a case-insensitive sort, they are all treated as the same word. For most general-purpose list sorting, a case-insensitive sort is what people expect.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How does "Remove Duplicates" work with case sensitivity?</h3>
                    <p className="text-muted-foreground mt-1">The duplicate removal process respects your case-sensitivity setting. If case sensitivity is on, "Apple" and "apple" are considered unique and neither will be removed. If case sensitivity is off, they are considered duplicates, and only the first occurrence in the original list will be kept.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default TextSorterTool;
