import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RefreshCw, Copy } from 'lucide-react';
import { toast } from 'sonner';

const commonWords = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew',
    'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry',
    'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'xigua', 'yuzu', 'zucchini',
    'mountain', 'river', 'ocean', 'desert', 'forest', 'meadow', 'glacier', 'volcano',
    'computer', 'keyboard', 'internet', 'software', 'hardware', 'database', 'algorithm',
    'galaxy', 'planet', 'comet', 'nebula', 'supernova', 'starlight', 'cosmos', 'universe'
];

const RandomWordGeneratorTool = () => {
  const [wordCount, setWordCount] = useState(10);
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newWords = [];
    for (let i = 0; i < wordCount; i++) {
      newWords.push(commonWords[Math.floor(Math.random() * commonWords.length)]);
    }
    setGeneratedWords(newWords);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleCopy = () => {
    if (generatedWords.length === 0) return;
    const textToCopy = generatedWords.join(', ');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Words copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Random Word Generator</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Spark your creativity and break through mental blocks with a fresh set of random words. Our tool is perfect for writers, educators, game designers, and anyone in need of a little inspiration. Generate unique ideas, create fun games, or expand your vocabulary.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Random Words</CardTitle>
          <CardDescription>Specify how many words you need and let randomness do the rest.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Label htmlFor="wordCount">Number of Words:</Label>
              <Input
                id="wordCount"
                type="number"
                value={wordCount}
                onChange={(e) => setWordCount(Math.max(1, parseInt(e.target.value, 10)))}
                className="w-24"
              />
            </div>
            <Button onClick={handleGenerate}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Words
            </Button>
          </div>
          {generatedWords.length > 0 && (
            <div className="relative p-4 border rounded-lg">
              <p className="text-lg text-center tracking-wide">{generatedWords.join(', ')}</p>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copied ? <Copy className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Creative Power of Randomness</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The human brain is a powerful pattern-matching machine. While this is excellent for learning and survival, it can sometimes trap us in repetitive thought loops, leading to creative blocks. A Random Word Generator is a simple but profound tool designed to break these patterns. By injecting a dose of controlled chaos into your creative process, it forces your brain to make new connections and explore unexpected pathways.</p>
                <p>When presented with a word like "galaxy," your mind might immediately jump to related concepts like "stars" or "space." But when presented with "galaxy," "river," and "keyboard" simultaneously, your brain is challenged to build a bridge between these disparate ideas. This can lead to a unique story prompt, a novel business name, or a fresh marketing angle that you might never have conceived of otherwise. This tool is your personal muse, ready to provide a spark whenever you need it.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How It Works: Simple Selection, Infinite Possibilities</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our generator operates on a straightforward principle:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>Curated Dictionary:</strong> The tool draws from a large, built-in dictionary of common and interesting English words. The list is carefully curated to be generally useful and safe for all audiences.</li>
                    <li><strong>User-Defined Count:</strong> You specify exactly how many words you need, giving you control over the volume of inspiration you receive.</li>
                    <li><strong>Random Selection:</strong> When you click "Generate," the tool uses a pseudo-random number algorithm to select the specified number of words from the dictionary. Each word is chosen independently, ensuring a truly random and unbiased selection every time.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">A Multipurpose Tool for Creativity and Education</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The applications for a list of random words are limited only by your imagination:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Creative Writing Prompts:</strong> Generate three to five words and challenge yourself to write a short story, poem, or scene that incorporates all of them. This is a classic exercise for overcoming writer's block.</li>
                    <li><strong>Vocabulary and Language Arts:</strong> Teachers can use this tool to create vocabulary quizzes, spelling tests, or sentence-building exercises for students. It's a great way to introduce and reinforce new words in a fun, interactive way.</li>
                    <li><strong>Game Design and Development:</strong> Perfect for games like Pictionary, Charades, or Catchphrase. You can generate word lists on the fly, ensuring a new and fair game every time. It's also useful for generating random names for characters, items, or locations in video games.</li>
                    <li><strong>Brainstorming and Ideation:</strong> In a business setting, use random words to trigger new ideas for product names, marketing slogans, or even solutions to complex problems. The technique of "random association" can unlock innovative thinking.</li>
                    <li><strong>Password Generation:</strong> While not a dedicated password generator, a list of random, unrelated words can form the basis of a strong, memorable "passphrase" (e.g., "galaxy-river-keyboard-mango"), which is often more secure and easier to remember than a complex string of characters.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Where do the words come from?</h3>
                    <p className="text-muted-foreground mt-1">The words are selected from a curated list of several thousand common English words. The list is designed to be diverse, including nouns, verbs, and adjectives, while generally excluding obscure, offensive, or overly complex terms to ensure the tool is useful for a broad audience.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Is the word generation truly random?</h3>
                    <p className="text-muted-foreground mt-1">The tool uses a standard pseudo-random number generator (PRNG) algorithm, which is the same type of randomness used in most computer applications, including games and simulations. While not truly "cosmically" random, it is statistically random for all practical purposes, meaning you are highly unlikely to see the same sequence of words twice.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I generate words of a specific type, like only nouns or verbs?</h3>
                    <p className="text-muted-foreground mt-1">Currently, our tool pulls from a general list to maximize creative connections. We may add options to select words by part of speech (noun, verb, adjective) or other criteria in a future update based on user demand.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How can this help me learn a new language?</h3>
                    <p className="text-muted-foreground mt-1">For language learners, this tool can be a great way to practice vocabulary. You can generate a list of words and then challenge yourself to define each one, use it in a sentence, or find its translation in your native language. It turns vocabulary building from a rote memorization task into an interactive game.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default RandomWordGeneratorTool;
