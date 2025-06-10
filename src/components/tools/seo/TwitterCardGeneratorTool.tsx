import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TwitterCardGeneratorTool = () => {
  const [cardType, setCardType] = useState('summary');
  const [site, setSite] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [twitterCardTags, setTwitterCardTags] = useState('');

  const generateTwitterCardTags = () => {
    const tags = `
      <meta name="twitter:card" content="${cardType}">
      <meta name="twitter:site" content="@${site}">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${description}">
      <meta name="twitter:image" content="${image}">
    `;
    setTwitterCardTags(tags.trim());
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Twitter Card Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select onValueChange={setCardType} defaultValue={cardType}>
              <SelectTrigger>
                <SelectValue placeholder="Card Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary Card</SelectItem>
                <SelectItem value="summary_large_image">
                  Summary Card with Large Image
                </SelectItem>
                <SelectItem value="app">App Card</SelectItem>
                <SelectItem value="player">Player Card</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={site}
              onChange={e => setSite(e.target.value)}
              placeholder="Twitter Username (without @)"
            />
            <Input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              className="md:col-span-2"
            />
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              className="md:col-span-2"
            />
            <Input
              type="text"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="Image URL"
              className="md:col-span-2"
            />
          </div>
          <Button onClick={generateTwitterCardTags} className="mt-4">
            Generate Twitter Card Tags
          </Button>
          {twitterCardTags && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Generated Twitter Card Tags:
              </h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{twitterCardTags}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What are Twitter Cards?</h2>
        <p className="mb-4">
          Twitter Cards are a feature that allows you to attach rich photos,
          videos, and media experiences to Tweets that drive traffic to your
          website. By adding a few lines of HTML to your webpage, any user who
          Tweets a link to your content will have a "Card" added to the Tweet
          that's visible to all of their followers.
        </p>
        <p className="mb-4">
          This is a powerful way to increase engagement and drive traffic to
          your site. When a user sees a Tweet with a Card, they're more likely
          to click on it than a standard link. This is because Cards provide a
          preview of the content, which can be much more compelling than a
          simple URL.
        </p>
        <h2 className="text-2xl font-bold mb-4">Factors to Consider</h2>
        <p className="mb-4">
          When creating Twitter Cards, there are several factors to consider.
          These include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Card Type:</strong> There are four types of Cards: Summary,
            Summary with Large Image, App, and Player. The type of Card you
            choose will depend on the type of content you're sharing.
          </li>
          <li className="mb-2">
            <strong>Title:</strong> The title of your content. This should be
            concise and compelling.
          </li>
          <li className="mb-2">
            <strong>Description:</strong> A one- to two-sentence description of
            your content.
          </li>
          <li className="mb-2">
            <strong>Image:</strong> The URL of an image that represents your
            content. This is one of the most important tags, as images can
            significantly increase engagement.
          </li>
          <li className="mb-2">
            <strong>Twitter Username:</strong> Your Twitter username. This will
            be displayed on the Card.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">
          Key Components of Twitter Card Generation
        </h2>
        <p className="mb-4">
          Our Twitter Card Generator helps you create the most important
          Twitter Card tags for your website. Here are the key components:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Card Type:</strong> The type of Card you want to create.
          </li>
          <li className="mb-2">
            <strong>Twitter Username:</strong> Your Twitter username.
          </li>
          <li className="mb-2">
            <strong>Title:</strong> The title of your content.
          </li>
          <li className="mb-2">
            <strong>Description:</strong> A short description of your content.
          </li>
          <li className="mb-2">
            <strong>Image URL:</strong> The URL of an image that represents
            your content.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
        <p className="mb-4">
          Using our Twitter Card Generator is easy. Just follow these steps:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">
            Fill in the fields above with your content's information.
          </li>
          <li className="mb-2">Click the "Generate Twitter Card Tags" button.</li>
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
            Do I need to use a Twitter Card Generator?
          </h3>
          <p>
            You don't need to use a Twitter Card Generator, but it can save you
            a lot of time and effort. It's also a good way to ensure that your
            tags are formatted correctly.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            What are the benefits of using Twitter Cards?
          </h3>
          <p>
            The main benefit of using Twitter Cards is that they give you more
            control over how your content is displayed on Twitter. This can
            lead to higher click-through rates and more engagement.
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
        <p>
          Twitter Cards were first introduced in 2012. Since then, they've
          become an essential tool for marketers and content creators who want
          to get the most out of their Twitter presence.
        </p>
      </div>
    </>
  );
};

export default TwitterCardGeneratorTool;
