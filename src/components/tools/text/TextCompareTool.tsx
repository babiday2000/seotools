import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { diffChars } from 'diff';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const TextCompareTool = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState<ReturnType<typeof diffChars> | null>(null);
  const [isCaseSensitive, setIsCaseSensitive] = useState(true);

  const handleCompare = () => {
    const t1 = isCaseSensitive ? text1 : text1.toLowerCase();
    const t2 = isCaseSensitive ? text2 : text2.toLowerCase();
    const differences = diffChars(t1, t2);
    setDiffResult(differences);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Text Compare Tool</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly find the differences between two pieces of text. Our tool highlights every addition and deletion, making it easy to spot changes. Perfect for developers, editors, and anyone needing to compare documents with precision.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Online Text Difference Checker</CardTitle>
          <CardDescription>Paste your two texts below to see a visual comparison.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Textarea
              placeholder="Paste the first version of your text here..."
              className="h-72 text-base font-mono"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
            />
            <Textarea
              placeholder="Paste the second version of your text here..."
              className="h-72 text-base font-mono"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="case-sensitive"
                checked={isCaseSensitive}
                onCheckedChange={setIsCaseSensitive}
              />
              <Label htmlFor="case-sensitive">Case Sensitive</Label>
            </div>
            <Button onClick={handleCompare} disabled={!text1 && !text2} size="lg">
              Compare Texts
            </Button>
          </div>
          {diffResult && (
            <Card>
              <CardHeader>
                <CardTitle>Comparison Result</CardTitle>
              </CardHeader>
              <CardContent className="p-4 bg-muted rounded-lg text-lg font-mono whitespace-pre-wrap break-all">
                {diffResult.length === 1 && !diffResult[0].added && !diffResult[0].removed ? (
                  <span className="text-green-600 font-semibold">The texts are identical.</span>
                ) : (
                  diffResult.map((part, index) => {
                    const style = part.added ? 'bg-green-200 text-green-800' :
                                  part.removed ? 'bg-red-200 text-red-800 line-through' :
                                  'text-muted-foreground';
                    return <span key={index} className={style}>{part.value}</span>;
                  })
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">Visualizing Change: The Power of "Diffing"</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A Text Compare tool, often called a "diff tool" (short for difference), is a utility that analyzes two pieces of text and highlights the precise changes between them. It's an indispensable resource for anyone who works with evolving documents, code, or data. Instead of manually scanning two long texts for tiny alterations—a tedious and error-prone task—a diff tool automates the process, presenting the changes in a clear, visual format.</p>
                <p>Our tool uses a well-established algorithm to perform this comparison at the character level. It identifies parts of the text that have been added, parts that have been removed, and parts that have remained the same. By color-coding these changes (typically green for additions and red for deletions), it provides an immediate and intuitive understanding of how one version of the text was transformed into the other.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Key Features and How to Use Them</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our Text Compare tool is designed for both simplicity and power:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Side-by-Side Input:</strong> Simply paste your original text in the left box and the revised text in the right box for a clear, organized workspace.</li>
                    <li><strong>Visual Highlighting:</strong> The results aren't just a "yes" or "no" answer. The tool displays the full text with additions highlighted in green and deletions struck through in red, so you can see every single change in context.</li>
                    <li><strong>Case Sensitivity Toggle:</strong> By default, the comparison is case-sensitive (`Hello` and `hello` are considered different). However, you can easily toggle this off to perform a case-insensitive comparison, which is useful when you only care about the content of the words, not their capitalization.</li>
                    <li><strong>Whitespace Awareness:</strong> The tool meticulously tracks every character, including spaces, tabs, and line breaks. This precision is crucial for comparing computer code or structured data where whitespace can be significant.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Who Needs a Text Compare Tool?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The need to compare text is widespread across many professions and tasks:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Developers and Programmers:</strong> Before committing code, developers often use a diff tool to review their changes, ensuring they haven't introduced any accidental errors. It's also vital for merging code from different branches or collaborating with team members.</li>
                    <li><strong>Writers, Editors, and Translators:</strong> When reviewing an edited document, this tool makes it easy to see exactly what changes your editor or collaborator has made, saving hours of manual review. Translators can use it to compare different versions of a translation for consistency.</li>
                    <li><strong>Legal and Business Professionals:</strong> Compare different versions of a contract or legal document to ensure that only the intended changes were made during negotiation and review.</li>
                    <li><strong>Students and Educators:</strong> Teachers can use it to see the evolution of a student's draft or to check for similarities between student submissions. Students can use it to track their own revisions.</li>
                    <li><strong>Data Analysts:</strong> When working with datasets, you can compare two versions of a file to quickly identify any data that has been added, removed, or altered.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">What algorithm is used for the comparison?</h3>
                    <p className="text-muted-foreground mt-1">Our tool uses a variation of the Eugene W. Myers diff algorithm, which is a highly efficient algorithm for finding the "shortest edit script" to transform one string into another. It's the same foundational logic that powers many professional version control systems like Git.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I compare entire files?</h3>
                    <p className="text-muted-foreground mt-1">You can compare the text content of any two files by copying the text from each file and pasting it into the respective input boxes. The tool does not support direct file uploads, but the copy-paste method works for any text-based file format (.txt, .html, .css, .js, etc.).</p>
                </div>
                <div>
                    <h3 className="font-semibold">Is there a limit to the amount of text I can compare?</h3>
                    <p className="text-muted-foreground mt-1">While the tool is designed to handle large amounts of text, extremely large inputs (e.g., entire books) may experience performance slowdowns depending on your browser and computer's memory. For most common use cases, like comparing articles, code files, or documents, it works instantly.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What does it mean if the whole text is highlighted?</h3>
                    <p className="text-muted-foreground mt-1">If the entire first text is red and the entire second text is green, it means the two texts are so different that the algorithm could not find any common parts between them. This usually happens when comparing two completely unrelated documents.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default TextCompareTool;
