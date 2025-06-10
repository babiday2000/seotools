import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MetaTagGeneratorTool = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [metaTags, setMetaTags] = useState('');

  const generateMetaTags = () => {
    const tags = `
      <meta name="title" content="${title}">
      <meta name="description" content="${description}">
      <meta name="keywords" content="${keywords}">
      <meta name="author" content="${author}">
    `;
    setMetaTags(tags.trim());
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Meta Tag Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Author"
            />
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              className="md:col-span-2"
            />
            <Textarea
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder="Keywords (comma-separated)"
              className="md:col-span-2"
            />
          </div>
          <Button onClick={generateMetaTags} className="mt-4">
            Generate Meta Tags
          </Button>
          {metaTags && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Generated Meta Tags:
              </h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{metaTags}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What are Meta Tags?</h2>
        <p className="mb-4">
          Meta tags are snippets of text that describe a page's content; they
          don't appear on the page itself, but only in the page's code. We use
          them to tell search engines what a web page is about. Meta tags are
          an important part of a solid SEO strategy.
        </p>
        <p className="mb-4">
          The main purpose of meta tags is to provide search engines with the
          information they need to understand your content. This helps them
          rank your pages for relevant search queries. While not all meta tags
          directly impact rankings, they all play a role in how your site is
          perceived by search engines and users.
        </p>
        <h2 className="text-2xl font-bold mb-4">Factors to Consider</h2>
        <p className="mb-4">
          When creating meta tags, it's important to be accurate and concise.
          Here are some factors to consider:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Title Tag:</strong> This is the most important meta tag. It
            should be a concise, accurate description of the page's content.
            Keep it under 60 characters to ensure it displays properly in
            search results.
          </li>
          <li className="mb-2">
            <strong>Meta Description:</strong> This tag provides a brief
            summary of the page's content. While it doesn't directly impact
            rankings, it can influence click-through rates. Keep it between
            150-160 characters.
          </li>
          <li className="mb-2">
            <strong>Meta Keywords:</strong> In the past, this tag was used to
            list relevant keywords. However, most search engines no longer use
            it for ranking purposes. It's still a good practice to include a
            few relevant keywords.
          </li>
          <li className="mb-2">
            <strong>Author Tag:</strong> This tag is used to specify the author
            of the content. It's a good way to build authority and trust.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">
          Key Components of Meta Tag Generation
        </h2>
        <p className="mb-4">
          Our Meta Tag Generator helps you create the most important meta tags
          for your website. Here are the key components:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Title:</strong> The title of your web page.
          </li>
          <li className="mb-2">
            <strong>Description:</strong> A short description of your web page.
          </li>
          <li className="mb-2">
            <strong>Keywords:</strong> Comma-separated keywords related to your
            content.
          </li>
          <li className="mb-2">
            <strong>Author:</strong> The author of the content.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
        <p className="mb-4">
          Using our Meta Tag Generator is easy. Just follow these steps:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">
            Fill in the fields above with your website's information.
          </li>
          <li className="mb-2">Click the "Generate Meta Tags" button.</li>
          <li className="mb-2">
            Copy the generated meta tags and paste them into the
            <code>{'<head>'}</code> section of your website's HTML.
          </li>
        </ol>
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Are meta tags still important for SEO?
          </h3>
          <p>
            Yes, meta tags are still an important part of a solid SEO strategy.
            While not all meta tags directly impact rankings, they all play a
            role in how your site is perceived by search engines and users.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            How many keywords should I use?
          </h3>
          <p>
            There's no magic number, but it's a good practice to include a few
            relevant keywords. Don't overdo it, as this can be seen as keyword
            stuffing.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Where do I put the meta tags?
          </h3>
          <p>
            Meta tags should be placed in the <code>{'<head>'}</code> section
            of your website's HTML.
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
        <p>
          The "meta" in meta tags comes from the Greek word "meta," which
          means "about." So, meta tags are literally tags "about" your content!
        </p>
      </div>
    </>
  );
};

export default MetaTagGeneratorTool;
