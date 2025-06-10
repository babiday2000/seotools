import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Wand2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const YouTubeDescriptionGeneratorTool = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateDescription = () => {
    if (!videoTitle.trim()) {
      toast.error('Please enter a video title.');
      return;
    }
    setIsLoading(true);

    const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
    const keywordText = keywordList.length > 0 ? `We'll cover topics like ${keywordList.join(', ')}.` : '';

    const template = `
👋 In this video, "${videoTitle}", we dive deep into the topic to bring you a comprehensive guide. ${keywordText}

Whether you're a beginner just starting out or an expert looking for advanced tips, this video has something for you. We'll walk you through everything you need to know, step-by-step.

🔔 SUBSCRIBE for more content like this: [Your Channel Link]

✅ In this tutorial, you'll learn:
- Point 1
- Point 2
- Point 3

🔗 Important Links & Resources:
- [Link to your website or a relevant resource]
- [Another useful link]

💬 Let's Connect:
- Instagram: [Your Instagram Link]
- Twitter: [Your Twitter Link]
- Website: [Your Website Link]

#Hashtag1 #Hashtag2 #Hashtag3

Thanks for watching!
    `;

    setGeneratedDesc(template.trim());
    setIsLoading(false);
    toast.success('Description generated!');
  };

  const handleCopy = () => {
    if (generatedDesc) {
      navigator.clipboard.writeText(generatedDesc);
      toast.success('Description copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Description Generator</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Create SEO-friendly and well-structured YouTube descriptions in seconds. Our tool provides a proven template to help you rank higher and engage your audience effectively.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Description Generator</CardTitle>
          <CardDescription>Fill in the details below to generate a description template.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="video-title" className="font-medium">Video Title</label>
            <Input
              id="video-title"
              placeholder="e.g., How to Make the Perfect Sourdough Bread"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="keywords" className="font-medium">Main Keywords (comma-separated)</label>
            <Input
              id="keywords"
              placeholder="e.g., sourdough, baking, bread making"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <Button onClick={generateDescription} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            Generate Description
          </Button>
        </CardContent>
      </Card>

      {generatedDesc && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated Description</CardTitle>
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Copy and paste this into your YouTube description box. Be sure to fill in the bracketed information!</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              readOnly
              value={generatedDesc}
              className="h-96 text-sm"
            />
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a YouTube Description Generator?</h2>
          <p className="text-muted-foreground">
            A YouTube Description Generator is a tool that helps creators quickly produce structured, SEO-friendly descriptions for their videos. The description is a critical piece of metadata that YouTube's algorithm uses to understand the content and context of your video. A well-written description can improve your video's ranking in search results, increase its visibility in suggested feeds, and provide valuable information to your viewers. Our generator uses a proven template that incorporates best practices for SEO and user engagement, saving you time and helping you create effective descriptions consistently.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">The Importance of a Good Video Description</h2>
          <p className="text-muted-foreground">
            Many creators underestimate the power of the video description, but it serves several vital functions:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Search Engine Optimization (SEO):</strong> The description is a prime location to include relevant keywords that help YouTube and Google understand what your video is about, improving its chances of ranking for those terms.</li>
            <li><strong>Viewer Engagement:</strong> It provides a space to give viewers more context, link to resources, and encourage them to subscribe or visit your other social media profiles.</li>
            <li><strong>Monetization:</strong> You can include affiliate links or links to your own products and services, turning your description into a revenue-generating asset.</li>
            <li><strong>Credibility and Professionalism:</strong> A well-structured, informative description makes your channel look more professional and trustworthy.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Description Generator</h2>
          <p className="text-muted-foreground">
            Creating a professional description is easy with our tool:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Enter Your Video Title:</strong> Provide the title of your video to set the main context.</li>
            <li><strong>Add Main Keywords:</strong> List the primary keywords or topics your video covers, separated by commas. This will help the generator craft an SEO-focused paragraph.</li>
            <li><strong>Generate the Template:</strong> Click the "Generate Description" button. The tool will produce a structured template with placeholders.</li>
            <li><strong>Customize and Copy:</strong> Fill in the bracketed information (e.g., [Your Channel Link], [Link to your website]) and then copy the full description to your clipboard, ready to be pasted into YouTube.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Is the generated description unique?</h3>
              <p className="text-muted-foreground">The tool generates a standardized template based on your inputs. We highly recommend customizing the "In this tutorial, you'll learn" section and adding your own unique voice to the introductory paragraph to make it your own.</p>
            </div>
            <div>
              <h3 className="font-semibold">How many keywords should I use?</h3>
              <p className="text-muted-foreground">Focus on 2-3 main keywords that accurately describe your video. It's better to be specific and relevant than to stuff the description with too many keywords.</p>
            </div>
            <div>
              <h3 className="font-semibold">Where should I place the most important information?</h3>
              <p className="text-muted-foreground">The first 2-3 lines of your description are the most important, as this is what viewers see before clicking "Show more." Include your most important keywords and a compelling hook in this section.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            YouTube's description box can hold up to 5,000 characters, which is roughly equivalent to 800 words. While you don't need to use all of that space, it highlights how much value YouTube places on the description as a source of information for its algorithm and its users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/tools/youtube-tools/youtube-tag-generator" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Tag Generator</h3>
              <p className="text-sm text-muted-foreground">Generate SEO-optimized tags for your videos.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-title-generator" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Title Generator</h3>
              <p className="text-sm text-muted-foreground">Create catchy and clickable titles for your videos.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-hashtag-generator" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Hashtag Generator</h3>
              <p className="text-sm text-muted-foreground">Find relevant hashtags to boost your video's reach.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default YouTubeDescriptionGeneratorTool;
