import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CaseConverterTool = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
  };

  const toLowerCase = () => setText(text.toLowerCase());
  const toUpperCase = () => setText(text.toUpperCase());

  const toTitleCase = () => {
    setText(text.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase()));
  };

  const toAlternatingCase = () => {
    setText(
      text
        .toLowerCase()
        .split('')
        .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
        .join('')
    );
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Case Converter Tool</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Effortlessly change the text case of your content. Whether you need to format a title, shout in uppercase, or clean up data, our tool provides instant conversions. Fix capitalization errors and standardize your text with a single click.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Text Case Converter</CardTitle>
          <CardDescription>Paste your text below and choose a conversion style.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Type or paste your text here. The conversion will happen in place."
              className="h-64 text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text && (
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            <Button onClick={toSentenceCase} variant="outline">Sentence case</Button>
            <Button onClick={toLowerCase} variant="outline">lower case</Button>
            <Button onClick={toUpperCase} variant="outline">UPPER CASE</Button>
            <Button onClick={toTitleCase} variant="outline">Title Case</Button>
            <Button onClick={toAlternatingCase} variant="outline">aLtErNaTiNg cAsE</Button>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Importance of Text Case in Communication</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Text case—the distinction between uppercase (CAPITAL) and lowercase (small) letters—is a fundamental aspect of written language that conveys tone, emphasis, and grammatical correctness. Proper capitalization is crucial for readability and professionalism. It guides the reader, structures sentences, and adheres to the established conventions of writing. An email written entirely in lowercase can seem unprofessional, while one in all uppercase can come across as aggressive or shouting.</p>
                <p>In the digital age, the need to manipulate text case is more common than ever. From formatting headlines for a blog post and standardizing data for analysis to crafting the perfect social media update, controlling the capitalization of your text is a daily task for many. Our Case Converter tool is designed to make these transformations effortless, saving you the time and tedium of retyping and allowing you to focus on your message.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">A Deep Dive into Each Case Conversion</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool offers several distinct conversion modes, each with its own specific rules and uses:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Sentence case:</strong> This is the standard capitalization for most prose. The tool capitalizes the first letter of the first word in each sentence, and it recognizes sentence endings marked by a period (.), question mark (?), or exclamation mark (!). All other letters are converted to lowercase, providing a clean, grammatically correct starting point for your paragraphs.</li>
                    <li><strong>lower case:</strong> This mode converts every single letter in your text to its lowercase form. It's incredibly useful for standardizing data before analysis or for creating a soft, unassuming tone in your writing.</li>
                    <li><strong>UPPER CASE:</strong> The opposite of lowercase, this converts every letter to its uppercase equivalent. It's used to convey strong emphasis, create impactful headlines, or format acronyms. Use it sparingly in prose, as it can be perceived as shouting.</li>
                    <li><strong>Title Case (or Capitalized Case):</strong> This mode capitalizes the first letter of every word. It's commonly used for titles of articles, books, and blog posts. Note that style guides have different rules for Title Case (e.g., not capitalizing small words like 'a', 'an', 'the', 'or'), so while our tool provides a great starting point, manual refinement for your specific style guide may be needed.</li>
                    <li><strong>aLtErNaTiNg cAsE:</strong> Also known as "sPoNgEcAsE," this mode alternates between lowercase and uppercase letters. It has no grammatical function and is used purely for stylistic effect, often to convey a mocking or playful tone in social media and online forums.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Practical, Everyday Use Cases</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>This tool is a workhorse for a wide range of daily tasks:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Content Creation:</strong> Quickly format your blog post titles, YouTube video titles, and email subject lines to be consistent and professional. Ensure your headings follow a uniform style (e.g., all Title Case).</li>
                    <li><strong>Data Cleaning and Processing:</strong> If you have a spreadsheet of user-submitted data (like names or cities) with inconsistent capitalization, you can paste the entire column here, convert it to Title Case, and paste it back for a clean, standardized dataset.</li>
                    <li><strong>Academic Writing:</strong> Students and researchers can use this tool to format references, titles, and headings according to the specific citation style required (e.g., APA, MLA), which often have strict rules about capitalization.</li>
                    <li><strong>Social Media Management:</strong> Create eye-catching posts by using UPPER CASE for emphasis or aLtErNaTiNg cAsE for a meme-worthy, humorous effect.</li>
                    <li><strong>Correcting Mistakes:</strong> Accidentally typed a whole paragraph with Caps Lock on? No need to retype. Just paste the text, convert it to Sentence case, and you're done in seconds.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Which case should I use for my headlines?</h3>
                    <p className="text-muted-foreground mt-1">Both Sentence case and Title Case are popular for headlines. Title Case ("This Is a Great Headline") can feel more formal and traditional. Sentence case ("This is a great headline") is often seen as more modern, clean, and conversational. The best choice depends on the style and tone of your brand or publication.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Does the "Sentence case" converter handle names and proper nouns?</h3>
                    <p className="text-muted-foreground mt-1">No. The tool's Sentence case function is based on grammatical rules (capitalizing after a period) and will convert all other letters to lowercase. It cannot recognize proper nouns like names (John Smith) or places (New York). You will need to manually re-capitalize any proper nouns after using the Sentence case conversion.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Why doesn't the Title Case converter ignore small words like "a" or "the"?</h3>
                    <p className="text-muted-foreground mt-1">Different style guides have different rules about which words to leave lowercase in a title. For example, APA style has a long list of conjunctions, articles, and prepositions that should be lowercase. To keep the tool simple and universal, it capitalizes the first letter of every word. This provides a consistent base that you can easily edit to match your specific style guide.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can this tool fix all my capitalization errors?</h3>
                    <p className="text-muted-foreground mt-1">It can fix a wide range of common errors, especially those related to consistency (all caps or all lowercase) and sentence starts. However, as mentioned, it does not handle the nuances of proper nouns, so a final manual review is always recommended for important documents.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default CaseConverterTool;
