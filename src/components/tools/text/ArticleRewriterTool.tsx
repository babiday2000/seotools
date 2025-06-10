import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ArticleRewriterTool = () => {
  const [text, setText] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRewrite = () => {
    setLoading(true);
    // This is a placeholder for a real rewriting API call.
    // A real implementation would use a sophisticated NLP model.
    setTimeout(() => {
      const words = text.split(/\s+/);
      // Simple synonym replacement and shuffling for demonstration
      const synonymMap: { [key: string]: string[] } = {
        'important': ['crucial', 'vital', 'essential'],
        'tool': ['utility', 'instrument', 'resource'],
        'help': ['assist', 'aid', 'support'],
        'create': ['generate', 'produce', 'make'],
      };
      const rewrittenWords = words.map(word => {
        const lowerWord = word.toLowerCase();
        if (synonymMap[lowerWord] && Math.random() > 0.5) {
          return synonymMap[lowerWord][Math.floor(Math.random() * synonymMap[lowerWord].length)];
        }
        return word;
      });
      setRewrittenText(rewrittenWords.join(' '));
      setLoading(false);
    }, 1000);
  };

  const handleCopy = () => {
    if (!rewrittenText) return;
    navigator.clipboard.writeText(rewrittenText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Article Rewriter & Paraphrasing Tool</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Breathe new life into your content. Our Article Rewriter helps you paraphrase and rephrase sentences and full articles, providing inspiration for creating unique and engaging text. Use it to brainstorm new ways to express your ideas and avoid repetitive language.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Paraphrasing Tool</CardTitle>
          <CardDescription>Paste your text below, and our tool will provide a rewritten version to inspire your work.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Textarea
              placeholder="Paste your original article, paragraph, or sentence here..."
              className="h-72 text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="relative">
              <Textarea
                placeholder="The rewritten version will appear here. Use it as a creative starting point."
                className="h-72 text-base bg-muted"
                value={rewrittenText}
                readOnly
              />
              {rewrittenText && (
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
          <div className="text-center">
            <Button onClick={handleRewrite} disabled={!text || loading} size="lg">
              {loading ? 'Rewriting...' : <><Wand2 className="mr-2 h-5 w-5" />Rewrite Article</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Art of Paraphrasing: More Than Just Changing Words</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>An article rewriter, or paraphrasing tool, is designed to take a piece of text and rephrase it, creating a new version that conveys the same information but with different wording and sentence structure. The goal is not simply to swap out words for synonyms, but to reformulate the original ideas in a fresh and distinct way. This can be an incredibly useful process for writers, students, marketers, and content creators who need to overcome writer's block, simplify complex topics, or ensure their content is unique.</p>
                <p>It's crucial to view these tools as a creative partner rather than a one-click solution. The best paraphrasing tools, powered by advanced Natural Language Processing (NLP) and Artificial Intelligence (AI), can understand the context and nuance of the original text. They can then generate a version that is grammatically correct, coherent, and maintains the original meaning. Our tool aims to provide a starting point for this creative process, giving you a foundation that you can then refine and perfect with your own voice and expertise.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Ethical and Effective Use of a Rewriter Tool</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Using an article rewriter comes with an important responsibility: to create content that is both unique and ethical. The primary goal should be to enhance your own writing process, not to circumvent it.</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Brainstorming and Overcoming Writer's Block:</strong> If you're stuck on how to phrase a particular idea, pasting it into the rewriter can give you several alternative options, sparking new creative directions.</li>
                    <li><strong>Simplifying Complex Language:</strong> You can use the tool to take a dense, technical paragraph and rephrase it into simpler terms that are easier for a general audience to understand.</li>
                    <li><strong>Varying Sentence Structure:</strong> If you notice your writing has become monotonous, a rewriter can help you see how to restructure your sentences for better flow and engagement.</li>
                    <li><strong>Avoiding Plagiarism:</strong> The most critical use case is ensuring your work is original. After paraphrasing, you must always compare the new text to the source material and add your own insights. The final piece should be substantially different and properly attribute any unique ideas or data to the original source. Never present rewritten text as entirely your own without significant modification and citation.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">From Rewritten Text to Polished Content: The Human Touch</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>No automated tool can fully replace the critical thinking and nuanced understanding of a human writer. The output of any article rewriter should be considered a first draft, not a final product. Here’s how to refine the generated text:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Review for Accuracy:</strong> Read through the rewritten text carefully. Did the tool preserve the original meaning accurately? Sometimes, synonym changes can alter the intended message. Correct any inaccuracies.</li>
                    <li><strong>Check for Tone and Voice:</strong> The rewritten text will be generic in tone. Edit it to match your personal or brand voice. Is your style formal, casual, humorous, or technical? Inject your personality into the text.</li>
                    <li><strong>Improve Flow and Readability:</strong> Check the transitions between sentences and paragraphs. Ensure the text flows logically and is easy for your audience to read.</li>
                    <li><strong>Add Your Own Value:</strong> This is the most important step. What unique insights, examples, or personal experiences can you add to the text? This is what transforms a piece of rewritten content into a valuable, original article that belongs to you.</li>
                    <li><strong>Run a Plagiarism Check:</strong> Before publishing, it's always a good practice to run the final text through a plagiarism checker to ensure its originality and avoid any potential issues.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Is using an article rewriter considered plagiarism?</h3>
                    <p className="text-muted-foreground mt-1">It can be, if used improperly. If you simply take someone else's article, rewrite it with a tool, and publish it as your own, you are plagiarizing the original author's ideas and structure. To use it ethically, you must significantly alter, add to, and improve the text, and always cite the original source for any unique concepts or data.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can Google detect rewritten content?</h3>
                    <p className="text-muted-foreground mt-1">Yes, Google's algorithms are extremely sophisticated. They can easily detect low-quality, spun content that lacks originality and value. Simply rewriting an article without adding substantial new insights will likely be flagged as thin or duplicate content, which can harm your website's SEO rankings.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is the difference between rewriting and summarizing?</h3>
                    <p className="text-muted-foreground mt-1">Rewriting or paraphrasing aims to rephrase the original content while maintaining its length and level of detail. Summarizing, on the other hand, aims to condense the original content into a much shorter version, capturing only the main points and key takeaways.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How can I get the best results from this tool?</h3>
                    <p className="text-muted-foreground mt-1">For the best results, work with smaller chunks of text, such as a paragraph at a time. This allows the tool to better understand the context and provides you with more manageable pieces to review and edit. Using the tool as an assistant to your writing process, rather than a replacement for it, will always yield the highest quality content.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default ArticleRewriterTool;
