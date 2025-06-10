import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';

const YouTubeVideoTitleCapitalizerTool = () => {
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
        .map((c, i) => (i % 2 === 0 ? c : c.toUpperCase()))
        .join('')
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Video Title Capitalizer</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Craft the perfect, professional-looking YouTube title with our easy-to-use capitalization tool. Instantly convert your video titles into various case formats, including Title Case, Sentence case, UPPER CASE, and more, to enhance readability and click-through rates.
        </p>
      </div>
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          <Button onClick={toSentenceCase}>Sentence case</Button>
          <Button onClick={toLowerCase}>lower case</Button>
          <Button onClick={toUpperCase}>UPPER CASE</Button>
          <Button onClick={toTitleCase}>Title Case</Button>
          <Button onClick={toAlternatingCase}>aLtErNaTiNg cAsE</Button>
        </div>
      <div className="relative">
        <Textarea
          placeholder="Paste your YouTube video title here..."
          className="h-64 text-base"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleCopy}
          disabled={!text}
        >
          {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
        </Button>
      </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a YouTube Video Title Capitalizer?</h2>
          <p className="text-muted-foreground">
            A YouTube Video Title Capitalizer is an essential tool for content creators that automates the process of formatting video titles. A well-capitalized title appears more professional, is easier to read, and can significantly impact a viewer's decision to click on a video. Instead of manually correcting the case of each word, this tool allows you to paste your title and instantly convert it to a variety of standard formats, such as Title Case (where the first letter of each major word is capitalized) or Sentence case (where only the first letter of the sentence is capitalized). This ensures consistency across your channel and helps your content stand out in crowded search results and subscription feeds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Factors to Consider When Capitalizing Titles</h2>
          <p className="text-muted-foreground">
            Choosing the right case for your title depends on several factors, and what works for one video might not work for another. Here’s what to keep in mind:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Readability:</strong> Title Case is often the most readable and is standard for many types of content, including educational videos, reviews, and tutorials.</li>
            <li><strong>Tone and Brand:</strong> An all-caps title can convey excitement or urgency, which might be suitable for a viral challenge or a major announcement. Conversely, an all-lowercase title can feel more casual and personal, fitting for a vlog or a laid-back commentary video.</li>
            <li><strong>YouTube's Algorithm:</strong> While capitalization itself is not a direct ranking factor, a clear, readable title can lead to a higher click-through rate (CTR), which *is* a crucial signal to the algorithm.</li>
            <li><strong>Audience Expectation:</strong> Consider what your target audience is used to seeing. Gamers, for example, might be more accustomed to dramatic, all-caps titles, while a business-focused audience would expect standard Title Case.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Key Components of Our Title Capitalizer</h2>
          <p className="text-muted-foreground">
            Our tool is designed to be fast, flexible, and user-friendly.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Multiple Case Formats:</strong> Instantly switch between Sentence case, lower case, UPPER CASE, Title Case, and even a fun aLtErNaTiNg cAsE.</li>
            <li><strong>Large Text Area:</strong> A spacious text area to easily paste and edit your titles.</li>
            <li><strong>One-Click Copy:</strong> A convenient copy button to transfer your formatted title directly to your YouTube upload page.</li>
            <li><strong>Real-Time Conversion:</strong> The tool applies the changes instantly, so you can see the result without any delay.</li>
            <li><strong>Adsense-Friendly Design:</strong> The page is optimized for a clean user experience, making it a reliable tool for creators monetizing their content.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the YouTube Video Title Capitalizer</h2>
          <p className="text-muted-foreground">
            Formatting your title is as simple as 1-2-3:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Enter Your Title:</strong> Type or paste your draft title into the text area.</li>
            <li><strong>Choose a Case:</strong> Click on one of the buttons (e.g., "Title Case") to apply the desired format.</li>
            <li><strong>Copy and Paste:</strong> Use the copy button to grab your perfectly formatted title and paste it into the title field on YouTube.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Which case is best for YouTube titles?</h3>
              <p className="text-muted-foreground">Title Case is generally considered the best practice for most YouTube videos as it is professional and highly readable. However, the best choice can depend on your niche and brand identity.</p>
            </div>
            <div>
              <h3 className="font-semibold">Does capitalizing titles affect SEO?</h3>
              <p className="text-muted-foreground">While not a direct ranking factor, proper capitalization improves readability and click-through rate, which are important for SEO. A title that is hard to read or looks unprofessional is less likely to be clicked.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is this tool free?</h3>
              <p className="text-muted-foreground">Yes, our YouTube Video Title Capitalizer is 100% free to use. There are no limits or fees.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The term "case" in typography dates back to the days of manual printing presses. Printers kept their metal type characters in wooden boxes called cases. The capital letters were traditionally stored in the "upper case" and the small letters in the "lower case," which is where the terms we use today originated.
          </p>
        </section>
      </div>
    </div>
  );
};

export default YouTubeVideoTitleCapitalizerTool;
