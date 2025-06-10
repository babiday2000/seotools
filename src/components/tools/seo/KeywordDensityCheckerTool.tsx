import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const KeywordDensityCheckerTool = () => {
  const [text, setText] = useState('');
  const [density, setDensity] = useState<Record<string, { count: number; density: string }>>({});
  const [loading, setLoading] = useState(false);

  const calculateDensity = () => {
    if (!text) return;
    setLoading(true);

    const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    const totalWords = words.length;
    const wordMap: Record<string, number> = {};

    words.forEach(word => {
      wordMap[word] = (wordMap[word] || 0) + 1;
    });

    const densityResult: Record<string, { count: number; density: string }> = {};
    for (const word in wordMap) {
      densityResult[word] = {
        count: wordMap[word],
        density: ((wordMap[word] / totalWords) * 100).toFixed(2) + '%',
      };
    }

    setDensity(densityResult);
    setLoading(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Keyword Density Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="mb-4"
            rows={10}
          />
          <Button onClick={calculateDensity} disabled={loading}>
            {loading ? 'Calculating...' : 'Check Density'}
          </Button>
          {Object.keys(density).length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Keyword Density:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(density)
                  .sort(([, a], [, b]) => b.count - a.count)
                  .map(([word, { count, density }]) => (
                    <div key={word} className="border p-2 rounded">
                      <span className="font-semibold">{word}:</span> {count} (
                      {density})
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          What is Keyword Density?
        </h2>
        <p className="mb-4">
          Keyword density is a fundamental concept in Search Engine Optimization
          (SEO). It refers to the percentage of times a specific keyword or
          phrase appears in a piece of content relative to the total number of
          words. For example, if a 100-word article uses a particular keyword 3
          times, the keyword density for that term is 3%. This metric helps
          search engines understand the topic and relevance of your content.
        </p>
        <p className="mb-4">
          In the early days of SEO, keyword stuffing—overloading a page with
          keywords—was a common tactic to rank higher. However, search engines
          like Google have become much more sophisticated. Today, while keyword
          density is still important, the focus has shifted to natural language,
          user experience, and providing valuable information. An unnaturally
hight keyword density can now lead to penalties, as it's a sign of
          manipulative practices.
        </p>
        <h2 className="text-2xl font-bold mb-4">Factors to Consider</h2>
        <p className="mb-4">
          Achieving the right keyword density is about balance. There's no
          magic number that guarantees a top ranking, but here are some factors
          to consider:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Content-Length:</strong> Longer content can naturally
            accommodate more keyword mentions without appearing spammy.
          </li>
          <li className="mb-2">
            <strong>Keyword Prominence:</strong> Where you place your keywords
            matters. Keywords in titles, headings, and the introduction carry
            more weight.
          </li>
          <li className="mb-2">
            <strong>LSI Keywords:</strong> Latent Semantic Indexing (LSI)
            keywords are terms and phrases that are semantically related to your
            main keyword. Using them makes your content more comprehensive and
            natural.
          </li>
          <li className="mb-2">
            <strong>User Intent:</strong> Your primary goal should always be to
            answer the user's query. Write for humans first, then optimize for
            search engines.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">
          Key Components of Keyword Density Analysis
        </h2>
        <p className="mb-4">
          Our Keyword Density Checker provides a detailed breakdown of your
          text, focusing on these key components:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Word Count:</strong> The total number of words in your text.
          </li>
          <li className="mb-2">
            <strong>Keyword Frequency:</strong> The number of times each keyword
            appears.
          </li>
          <li className="mb-2">
            <strong>Density Percentage:</strong> The calculated keyword density
            for each term.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
        <p className="mb-4">
          Using our Keyword Density Checker is simple and straightforward:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">
            Paste your text into the text area above.
          </li>
          <li className="mb-2">
            Click the "Check Density" button.
          </li>
          <li className="mb-2">
            The tool will analyze your text and display a table of keywords,
            their frequency, and their density percentage.
          </li>
        </ol>
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            What is the ideal keyword density?
          </h3>
          <p>
            There is no single "ideal" keyword density. Most SEO experts
            recommend a range of 1-2%, but this can vary depending on the
            industry, content type, and competition. The best approach is to
            analyze the top-ranking pages for your target keyword and aim for a
            similar density.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Can I get penalized for high keyword density?
          </h3>
          <p>
            Yes, search engines can penalize websites for keyword stuffing. This
            is why it's crucial to use keywords naturally and focus on providing
            a great user experience.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Does this tool work for different languages?
          </h3>
          <p>
            Yes, our tool can analyze text in any language, as it calculates
            density based on word separation.
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
        <p>
          The concept of keyword density has been around since the mid-1990s,
          making it one of the oldest SEO metrics still in use today!
        </p>
      </div>
    </>
  );
};

export default KeywordDensityCheckerTool;
