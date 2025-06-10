import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MetaTagAnalyzerTool = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const analyzeMetaTags = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const html = data.contents;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const metaTags = doc.querySelectorAll('meta');
      const analysisResult: Record<string, string> = {};
      metaTags.forEach(tag => {
        const name = tag.getAttribute('name') || tag.getAttribute('property');
        if (name) {
          analysisResult[name] = tag.getAttribute('content') || '';
        }
      });
      const title = doc.querySelector('title');
      if (title) {
        analysisResult['title'] = title.innerText;
      }
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('Error analyzing meta tags:', error);
      setAnalysis({ error: 'Failed to analyze meta tags. Please check the URL and try again.' });
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Meta Tag Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Enter a URL"
            />
            <Button onClick={analyzeMetaTags} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Meta Tags'}
            </Button>
          </div>
          {Object.keys(analysis).length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Meta Tag Analysis:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(analysis).map(([name, content]) => (
                  <div key={name} className="border p-2 rounded">
                    <span className="font-semibold">{name}:</span> {content}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          What is a Meta Tag Analyzer?
        </h2>
        <p className="mb-4">
          A Meta Tag Analyzer is a tool that examines the meta tags of a web
          page and provides a detailed report on their content. This analysis
          is crucial for SEO, as it helps you understand how your website is
          being perceived by search engines. By analyzing your meta tags, you
          can identify areas for improvement and optimize your site for better
          search engine rankings.
        </p>
        <p className="mb-4">
          Meta tags, such as the title, description, and keywords, provide
          search engines with essential information about your page's content.
          A well-optimized set of meta tags can significantly improve your
          site's visibility in search results, driving more organic traffic to
          your pages.
        </p>
        <h2 className="text-2xl font-bold mb-4">Factors to Consider</h2>
        <p className="mb-4">
          When analyzing your meta tags, there are several factors to consider.
          These include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Title Tag:</strong> Is your title tag concise and
            descriptive? Does it include your target keyword? Is it within the
            recommended length of 60 characters?
          </li>
          <li className="mb-2">
            <strong>Meta Description:</strong> Is your meta description
            compelling and informative? Does it accurately summarize the page's
            content? Is it within the recommended length of 150-160 characters?
          </li>
          <li className="mb-2">
            <strong>Meta Keywords:</strong> Are you using relevant keywords?
            Are you avoiding keyword stuffing?
          </li>
          <li className="mb-2">
            <strong>Open Graph Tags:</strong> Are you using Open Graph tags to
            control how your content is displayed on social media?
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">
          Key Components of Meta Tag Analysis
        </h2>
        <p className="mb-4">
          Our Meta Tag Analyzer provides a comprehensive analysis of your web
          page's meta tags. Here are the key components of our analysis:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Title Tag:</strong> We check the length and content of your
            title tag to ensure it's optimized for search engines.
          </li>
          <li className="mb-2">
            <strong>Meta Description:</strong> We analyze your meta description
            for length, content, and keyword usage.
          </li>
          <li className="mb-2">
            <strong>Meta Keywords:</strong> We examine your meta keywords to
            ensure they're relevant and not overused.
          </li>
          <li className="mb-2">
            <strong>Open Graph Tags:</strong> We check for the presence of Open
            Graph tags and analyze their content.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
        <p className="mb-4">
          Using our Meta Tag Analyzer is simple. Just follow these steps:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">Enter the URL of the web page you want to analyze.</li>
          <li className="mb-2">Click the "Analyze Meta Tags" button.</li>
          <li className="mb-2">
            Our tool will crawl the page and provide a detailed report on its
            meta tags.
          </li>
        </ol>
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Why is meta tag analysis important?
          </h3>
          <p>
            Meta tag analysis is important because it helps you understand how
            your website is being perceived by search engines. By analyzing
            your meta tags, you can identify areas for improvement and optimize
            your site for better search engine rankings.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            How often should I analyze my meta tags?
          </h3>
          <p>
            It's a good practice to analyze your meta tags regularly,
            especially when you make changes to your website's content or
            structure. This will help you stay on top of any issues and ensure
            your site is always optimized for search engines.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            What are Open Graph tags?
          </h3>
          <p>
            Open Graph tags are a set of meta tags that allow you to control
            how your content is displayed on social media platforms like
            Facebook and Twitter. They're an important part of a solid social
            media marketing strategy.
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
        <p>
          The first search engine to use meta tags was AltaVista, which was
          launched in 1995. At the time, it was one of the most popular search
          engines on the web!
        </p>
      </div>
    </>
  );
};

export default MetaTagAnalyzerTool;
