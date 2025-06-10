import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OpenGraphGeneratorTool = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [siteName, setSiteName] = useState('');
  const [type, setType] = useState('website');
  const [openGraphTags, setOpenGraphTags] = useState('');

  const generateOpenGraphTags = () => {
    const tags = `
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:image" content="${image}">
      <meta property="og:url" content="${url}">
      <meta property="og:site_name" content="${siteName}">
      <meta property="og:type" content="${type}">
    `;
    setOpenGraphTags(tags.trim());
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Open Graph Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="og:title"
            />
            <Input
              type="text"
              value={siteName}
              onChange={e => setSiteName(e.target.value)}
              placeholder="og:site_name"
            />
            <Input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="og:url"
              className="md:col-span-2"
            />
            <Input
              type="text"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="og:image"
              className="md:col-span-2"
            />
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="og:description"
              className="md:col-span-2"
            />
            <Input
              type="text"
              value={type}
              onChange={e => setType(e.target.value)}
              placeholder="og:type (e.g., website, article)"
            />
          </div>
          <Button onClick={generateOpenGraphTags} className="mt-4">
            Generate Open Graph Tags
          </Button>
          {openGraphTags && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Generated Open Graph Tags:
              </h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{openGraphTags}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          What is an Open Graph Generator?
        </h2>
        <p className="mb-4">
          An Open Graph Generator is a tool that helps you create Open Graph
          tags for your website. These tags are used by social media platforms
          like Facebook, Twitter, and LinkedIn to display rich snippets of your
          content when it's shared. By using an Open Graph Generator, you can
          ensure that your content is displayed in the most appealing way
          possible, which can lead to higher click-through rates and more
          engagement.
        </p>
        <p className="mb-4">
          When you share a link on social media, the platform's crawler will
          visit the page to look for Open Graph tags. If it finds them, it will
          use the information in those tags to create a rich snippet. If it
          doesn't find them, it will try to guess what to display, which can
          lead to less-than-ideal results.
        </p>
        <h2 className="text-2xl font-bold mb-4">Factors to Consider</h2>
        <p className="mb-4">
          When generating Open Graph tags, there are several factors to
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
          Key Components of Open Graph Generation
        </h2>
        <p className="mb-4">
          Our Open Graph Generator helps you create the most important Open
          Graph tags for your website. Here are the key components:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>og:title:</strong> The title of your content.
          </li>
          <li className="mb-2">
            <strong>og:description:</strong> A short description of your
            content.
          </li>
          <li className="mb-2">
            <strong>og:image:</strong> The URL of an image that represents your
            content.
          </li>
          <li className="mb-2">
            <strong>og:url:</strong> The canonical URL of your content.
          </li>
          <li className="mb-2">
            <strong>og:site_name:</strong> The name of your website.
          </li>
          <li className="mb-2">
            <strong>og:type:</strong> The type of content you're sharing.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
        <p className="mb-4">
          Using our Open Graph Generator is easy. Just follow these steps:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">
            Fill in the fields above with your content's information.
          </li>
          <li className="mb-2">Click the "Generate Open Graph Tags" button.</li>
          <li className="mb-2">
            Copy the generated tags and paste them into the{' '}
            <code>{'<head>'}</code> section of your website's HTML.
          </li>
        </ol>
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            What is the difference between Open Graph and Twitter Cards?
          </h3>
          <p>
            Open Graph is a protocol that's used by many social media
            platforms, including Facebook, LinkedIn, and Pinterest. Twitter
            Cards are similar, but they're specific to Twitter. If you have
            both Open Graph and Twitter Card tags on your site, Twitter will
            use the Twitter Card tags.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Do I need to use an Open Graph Generator?
          </h3>
          <p>
            You don't need to use an Open Graph Generator, but it can save you
            a lot of time and effort. It's also a good way to ensure that your
            tags are formatted correctly.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            What are the benefits of using Open Graph tags?
          </h3>
          <p>
            The main benefit of using Open Graph tags is that they give you
            more control over how your content is displayed on social media.
            This can lead to higher click-through rates and more engagement.
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
        <p>
          The Open Graph protocol was first introduced by Facebook at their F8
          conference in 2010. It's now used by billions of web pages across the
          internet!
        </p>
      </div>
    </>
  );
};

export default OpenGraphGeneratorTool;
