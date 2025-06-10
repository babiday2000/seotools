import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UTMBuilderTool = () => {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [utmUrl, setUtmUrl] = useState('');

  const generateUtmUrl = () => {
    const params = new URLSearchParams();
    if (source) params.set('utm_source', source);
    if (medium) params.set('utm_medium', medium);
    if (campaign) params.set('utm_campaign', campaign);
    if (term) params.set('utm_term', term);
    if (content) params.set('utm_content', content);
    setUtmUrl(`${url}?${params.toString()}`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>UTM Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Website URL"
              className="md:col-span-2"
            />
            <Input
              type="text"
              value={source}
              onChange={e => setSource(e.target.value)}
              placeholder="Campaign Source (e.g., google, newsletter)"
            />
            <Input
              type="text"
              value={medium}
              onChange={e => setMedium(e.target.value)}
              placeholder="Campaign Medium (e.g., cpc, email)"
            />
            <Input
              type="text"
              value={campaign}
              onChange={e => setCampaign(e.target.value)}
              placeholder="Campaign Name (e.g., summer_sale)"
            />
            <Input
              type="text"
              value={term}
              onChange={e => setTerm(e.target.value)}
              placeholder="Campaign Term (e.g., running+shoes)"
            />
            <Input
              type="text"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Campaign Content (e.g., logo_link)"
              className="md:col-span-2"
            />
          </div>
          <Button onClick={generateUtmUrl} className="mt-4">
            Generate UTM URL
          </Button>
          {utmUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Generated UTM URL:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{utmUrl}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a UTM Builder?</h2>
        <p className="mb-4">
          A UTM Builder is a tool that helps you create custom URLs with UTM
          parameters. UTM parameters are short pieces of code that you can add
          to a URL to track the performance of your marketing campaigns. When a
          user clicks on a URL with UTM parameters, the information in those
          parameters is sent to your analytics tool, such as Google Analytics.
        </p>
        <p className="mb-4">
          This allows you to see which campaigns are driving the most traffic
          to your website, which can help you optimize your marketing efforts
          and get a better return on your investment.
        </p>
        <h2 className="text-2xl font-bold mb-4">Factors to Consider</h2>
        <p className="mb-4">
          When creating UTM parameters, there are several factors to consider.
          These include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Campaign Source:</strong> The source of your traffic (e.g.,
            google, newsletter).
          </li>
          <li className="mb-2">
            <strong>Campaign Medium:</strong> The medium of your traffic (e.g.,
            cpc, email).
          </li>
          <li className="mb-2">
            <strong>Campaign Name:</strong> The name of your campaign (e.g.,
            summer_sale).
          </li>
          <li className="mb-2">
            <strong>Campaign Term:</strong> The keyword you're targeting (e.g.,
            running+shoes).
          </li>
          <li className="mb-2">
            <strong>Campaign Content:</strong> The specific ad or link that was
            clicked (e.g., logo_link).
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">
          Key Components of UTM Generation
        </h2>
        <p className="mb-4">
          Our UTM Builder helps you create custom URLs with the most important
          UTM parameters. Here are the key components:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Website URL:</strong> The URL of the page you want to link
            to.
          </li>
          <li className="mb-2">
            <strong>Campaign Source:</strong> The source of your traffic.
          </li>
          <li className="mb-2">
            <strong>Campaign Medium:</strong> The medium of your traffic.
          </li>
          <li className="mb-2">
            <strong>Campaign Name:</strong> The name of your campaign.
          </li>
          <li className="mb-2">
            <strong>Campaign Term:</strong> The keyword you're targeting.
          </li>
          <li className="mb-2">
            <strong>Campaign Content:</strong> The specific ad or link that was
            clicked.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
        <p className="mb-4">
          Using our UTM Builder is easy. Just follow these steps:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">
            Fill in the fields above with your campaign's information.
          </li>
          <li className="mb-2">Click the "Generate UTM URL" button.</li>
          <li className="mb-2">
            Copy the generated URL and use it in your marketing campaigns.
          </li>
        </ol>
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Why should I use UTM parameters?
          </h3>
          <p>
            You should use UTM parameters to track the performance of your
            marketing campaigns. This will help you understand which campaigns
            are driving the most traffic to your website, which can help you
            optimize your marketing efforts and get a better return on your
            investment.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            What's the difference between utm_term and utm_content?
          </h3>
          <p>
            The utm_term parameter is used to track the keyword you're
            targeting, while the utm_content parameter is used to track the
            specific ad or link that was clicked. For example, if you're
            running a Google Ads campaign, you might use the utm_term parameter
            to track the keyword that triggered your ad, and the utm_content
            parameter to track which version of your ad was clicked.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Do I need to use all of the UTM parameters?
          </h3>
          <p>
            No, you don't need to use all of the UTM parameters. However, the
            more parameters you use, the more detailed your tracking will be.
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
        <p>
          UTM stands for "Urchin Tracking Module." Urchin was a web analytics
          company that was acquired by Google in 2005. The technology that
          Urchin developed became the foundation for Google Analytics.
        </p>
      </div>
    </>
  );
};

export default UTMBuilderTool;
