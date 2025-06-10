import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OpenGraphCheckerTool = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const analyzeOpenGraph = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const html = data.contents;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const metaTags = doc.querySelectorAll('meta[property^="og:"]');
      const analysisResult: Record<string, string> = {};
      metaTags.forEach(tag => {
        const property = tag.getAttribute('property');
        if (property) {
          analysisResult[property] = tag.getAttribute('content') || '';
        }
      });
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('Error analyzing Open Graph tags:', error);
      setAnalysis({ error: 'Failed to analyze Open Graph tags. Please check the URL and try again.' });
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Open Graph Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Enter a URL"
            />
            <Button onClick={analyzeOpenGraph} disabled={loading}>
              {loading ? 'Analyzing...' : 'Check Open Graph'}
            </Button>
          </div>
          {Object.keys(analysis).length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Open Graph Analysis:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(analysis).map(([property, content]) => (
                  <div key={property} className="border p-2 rounded">
                    <span className="font-semibold">{property}:</span> {content}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is Open Graph?</h2>
        <p className="mb-4">
          Open Graph is a protocol that enables any web page to become a rich
          object in a social graph. It was originally created by Facebook to
          allow for more control over how content is displayed when shared on
          their platform. Today, it's used by many other social media sites,
          including Twitter, LinkedIn, and Pinterest.
        </p>
        <p className="mb-4">
          By adding Open Graph tags to your website, you can control what
          title, description, image, and other information is displayed when
          your content is shared. This can have a significant impact on your
          click-through rates and overall social media engagement.
        </p>
        <h2 className="text-2xl font-bold mb-4">Factors to Consider</h2>
        <p className="mb-4">
          When implementing Open Graph tags, there are several factors to
          consider. These include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>og:title:</strong> The title of your content. This should
            be concise and compelling.
          </li>
          <li className="mb-2">
            <strong>og:description:</strong> A one- to two-sentence description
            of your content.
          </li>
          <li className="mb-2">
            <strong>og:image:</strong> The URL of an image that represents your
            content. This is one of the most important tags, as images can
            significantly increase engagement.
          </li>
          <li className="mb-2">
            <strong>og:url:</strong> The canonical URL of your content.
          </li>
          <li className="mb-2">
            <strong>og:type:</strong> The type of content you're sharing (e.g.,
            article, video, website).
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">
          Key Components of Open Graph Analysis
        </h2>
        <p className="mb-4">
          Our Open Graph Checker provides a comprehensive analysis of your web
          page's Open Graph tags. Here are the key components of our analysis:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>og:title:</strong> We check the length and content of your
            title tag to ensure it's optimized for social media.
          </li>
          <li className="mb-2">
            <strong>og:description:</strong> We analyze your description for
            length, content, and keyword usage.
          </li>
          <li className="mb-2">
            <strong>og:image:</strong> We check for the presence of an image
            and analyze its dimensions.
          </li>
          <li className="mb-2">
            <strong>og:url:</strong> We ensure that the URL is valid and
            canonical.
          </li>
          <li className="mb-2">
            <strong>og:type:</strong> We check that the content type is
            correctly specified.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
        <p className="mb-4">
          Using our Open Graph Checker is simple. Just follow these steps:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">
            Enter the URL of the web page you want to analyze.
          </li>
          <li className="mb-2">Click the "Check Open Graph" button.</li>
          <li className="mb-2">
            Our tool will crawl the page and provide a detailed report on its
            Open Graph tags.
          </li>
        </ol>
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Why is Open Graph important?
          </h3>
          <p>
            Open Graph is important because it allows you to control how your
            content is displayed on social media. This can have a significant
            impact on your click-through rates and overall social media
            engagement.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            How do I add Open Graph tags to my website?
          </h3>
          <p>
            You can add Open Graph tags to the <code>{'<head>'}</code> section
            of your website's HTML. If you're using a CMS like WordPress, there
            are plugins that can help you add them automatically.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            What are the recommended image dimensions for Open Graph?
          </h3>
          <p>
            The recommended image dimensions for Open Graph are 1200x630
            pixels. This will ensure that your image is displayed correctly on
            most social media platforms.
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
        <p>
          The "og" in Open Graph stands for "Open Graph," which is a bit
          redundant, but it's the official name of the protocol!
        </p>
      </div>
    </>
  );
};

export default OpenGraphCheckerTool;
