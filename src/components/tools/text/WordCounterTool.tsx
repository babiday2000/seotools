import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, CaseSensitive, Pilcrow, Type } from 'lucide-react';

const WordCounterTool = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const words = text.match(/\b\w+\b/g)?.length || 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 0;
    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '').length;
    const readingTime = Math.ceil(words / 200); // Average reading speed of 200 WPM

    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
  }, [text]);

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Word and Character Counter</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Get a real-time analysis of your text. Our tool instantly counts words, characters, sentences, paragraphs, and even estimates the reading time. Perfect for writers, students, marketers, and anyone who needs to meet specific length requirements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Text</CardTitle>
              <CardDescription>Paste your content below for instant analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Start typing or paste your text here..."
                className="h-80 text-base"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Statistics</CardTitle>
              <CardDescription>Your text analysis appears here in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold">{stats.words}</span>
                  <span className="text-muted-foreground flex items-center gap-1"><Type className="h-4 w-4" /> Words</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold">{stats.characters}</span>
                  <span className="text-muted-foreground flex items-center gap-1"><CaseSensitive className="h-4 w-4" /> Characters</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold">{stats.sentences}</span>
                  <span className="text-muted-foreground">Sentences</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold">{stats.paragraphs}</span>
                  <span className="text-muted-foreground flex items-center gap-1"><Pilcrow className="h-4 w-4" /> Paragraphs</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg col-span-2">
                  <span className="text-3xl font-bold">~{stats.readingTime} min</span>
                  <span className="text-muted-foreground flex items-center gap-1"><BookOpen className="h-4 w-4" /> Reading Time</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">Why Word Count Matters</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>In the world of writing, length is often a crucial constraint. From a 280-character tweet to a 5,000-word essay, different platforms and formats have different expectations and requirements. A word counter is an indispensable tool for any writer, providing immediate, accurate feedback to ensure your content fits its intended medium perfectly. It removes the guesswork, allowing you to focus on crafting the best possible message while staying within your specified limits.</p>
                <p>Beyond simple compliance, word count also has a significant impact on readability, engagement, and even SEO. A blog post that is too short may be seen as "thin content" by search engines, while one that is too long may intimidate readers. Our tool provides not just a word count, but a comprehensive suite of statistics—including character, sentence, and paragraph counts, plus an estimated reading time—to give you a holistic view of your text's structure and length.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Understanding the Statistics</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool provides a real-time analysis of your text, broken down into several key metrics:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Words:</strong> This is the total count of words, calculated by separating the text by spaces and punctuation. It's the most common metric for measuring text length.</li>
                    <li><strong>Characters:</strong> This shows the total number of characters in your text, including letters, numbers, symbols, and spaces. This is crucial for platforms with strict character limits, like Twitter.</li>
                    <li><strong>Sentences:</strong> The tool counts the number of sentences by identifying sentence-terminating punctuation like periods (.), question marks (?), and exclamation marks (!).</li>
                    <li><strong>Paragraphs:</strong> A paragraph is counted as a block of text separated by a new line. This helps you analyze the structure and pacing of your writing.</li>
                    <li><strong>Reading Time:</strong> This is an estimation of how long it would take an average adult to read your text. It's calculated based on an average reading speed of approximately 200 words per minute (WPM), a standard benchmark for English text.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Practical Applications for Every Writer</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Whether you're a student, a professional, or a casual writer, this tool can streamline your workflow.</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Students and Academics:</strong> Easily meet the strict word count requirements for essays, research papers, and dissertations. Use the sentence and paragraph counts to improve the structure and flow of your arguments.</li>
                    <li><strong>Content Marketers and SEOs:</strong> Craft blog posts and articles with an optimal length for search engine ranking. While there's no magic number, longer, in-depth content (often 1,500+ words) tends to rank better for competitive keywords.</li>
                    <li><strong>Social Media Managers:</strong> Ensure your posts fit within platform limits (like Twitter's 280 characters) and are concise enough to capture attention on fast-moving feeds.</li>
                    <li><strong>Authors and Novelists:</strong> Keep track of chapter lengths to maintain a consistent pace throughout your book.</li>
                    <li><strong>Translators:</strong> Word count is the standard metric for quoting and billing translation projects. This tool provides a quick and accurate count for estimation.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">How accurate is the word count?</h3>
                    <p className="text-muted-foreground mt-1">The tool uses a standard algorithm that splits text by spaces and punctuation, which is highly accurate for most English texts. However, it may differ slightly from other programs (like Microsoft Word) that might handle hyphenated words or other edge cases differently.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Is the reading time estimate reliable?</h3>
                    <p className="text-muted-foreground mt-1">It's a solid estimate. The calculation is based on the average reading speed of an adult, which is around 200-230 words per minute. However, the actual time can vary depending on the complexity of the text and the individual reader's speed.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Does the tool count words in other languages?</h3>
                    <p className="text-muted-foreground mt-1">Yes, the tool can count words in most languages that use spaces to separate them. However, for logographic languages like Chinese or Japanese that do not use spaces, the word count will not be accurate; the character count, however, will be correct.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is the ideal word count for a blog post?</h3>
                    <p className="text-muted-foreground mt-1">There's no single answer, but data suggests that longer, more comprehensive content performs better in search rankings. For competitive topics, articles of 1,500 to 2,500 words often rank highest. However, the ultimate goal should always be to cover the topic thoroughly and provide value to the reader, regardless of the final word count.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default WordCounterTool;
