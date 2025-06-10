import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle, Lightbulb, HelpCircle, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const YouTubeTitleLengthCheckerTool = () => {
  const [title, setTitle] = useState('');

  const titleLength = title.length;
  const maxLength = 70;
  const optimalMinLength = 20;

  const lengthStatus = useMemo(() => {
    if (titleLength === 0) {
      return {
        message: 'Start typing to see the analysis.',
        color: 'text-muted-foreground',
        icon: <FileText className="h-5 w-5" />,
      };
    }
    if (titleLength > maxLength) {
      return {
        message: `Title is too long. Exceeds by ${titleLength - maxLength} characters.`,
        color: 'text-destructive',
        icon: <XCircle className="h-5 w-5" />,
      };
    }
    if (titleLength < optimalMinLength) {
        return {
          message: 'Title is a bit short. Consider adding more detail.',
          color: 'text-yellow-500',
          icon: <AlertTriangle className="h-5 w-5" />,
        };
      }
    return {
      message: 'Title length is optimal.',
      color: 'text-green-500',
      icon: <CheckCircle className="h-5 w-5" />,
    };
  }, [titleLength]);

  const progressValue = (titleLength / maxLength) * 100;

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Title Length Checker</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Craft the perfect YouTube title. Check your title length to ensure it's optimized for visibility and clicks across all devices.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Title Length Analyzer</CardTitle>
          <CardDescription>Enter your YouTube title below to check its length.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your YouTube title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base p-4"
              maxLength={100} 
            />
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <div className={`flex items-center gap-2 font-semibold ${lengthStatus.color}`}>
                        {lengthStatus.icon}
                        <span>{lengthStatus.message}</span>
                    </div>
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {titleLength} / {maxLength}
                    </span>
                </div>
                <Progress value={progressValue} className={
                    lengthStatus.color === 'text-destructive' ? 'progress-red' : 
                    lengthStatus.color === 'text-yellow-500' ? 'progress-yellow' : 
                    'progress-green'
                } />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><HelpCircle className="h-6 w-6 text-primary" /> What is a YouTube Title Length Checker?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>A YouTube Title Length Checker is a simple but essential tool for video creators. It helps you measure the character count of your video title to ensure it fits within YouTube's recommended limits. Titles that are too long get cut off (truncated) in search results, suggested videos, and on mobile devices, which can significantly reduce your click-through rate (CTR). This tool gives you instant feedback, allowing you to optimize your titles for maximum impact and visibility.</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="h-6 w-6 text-primary" /> Factors to Consider for YouTube Title Length</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>While the technical limit for a YouTube title is 100 characters, the practical limit is much shorter. Here’s what you need to consider:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Device Truncation:</strong> YouTube displays titles differently across devices. A title that looks fine on a desktop might be cut off on a smartphone. Keeping titles around <strong>60-70 characters</strong> is a safe bet to ensure they are fully visible everywhere.</li>
                    <li><strong>Search Engine Optimization (SEO):</strong> Your most important keywords should appear at the beginning of the title. This helps both viewers and YouTube's algorithm quickly understand what your video is about.</li>
                    <li><strong>Readability and Impact:</strong> A shorter, punchier title is often more memorable and easier to read at a glance. It should be compelling enough to make someone want to click.</li>
                </ul>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6 text-primary" /> Key Components of an Effective YouTube Title</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <ul className="list-disc list-inside space-y-3">
                    <li><strong>Primary Keyword:</strong> Include the main search term you want to rank for.</li>
                    <li><strong>A Hook:</strong> Use power words, numbers, or questions to create curiosity (e.g., "Secret," "Ultimate," "Top 5").</li>
                    <li><strong>Clarity:</strong> The title must accurately promise what the video delivers. Avoid clickbait that misleads viewers.</li>
                    <li><strong>Branding (Optional):</strong> For a series or established channel, adding your brand name at the end can be beneficial.</li>
                </ul>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>How to Use the YouTube Title Length Checker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Type Your Title:</strong> Simply start typing your desired video title into the input box above.</li>
                    <li><strong>Analyze the Feedback:</strong> As you type, the tool will instantly show you the current character count.</li>
                    <li><strong>Check the Status:</strong> A status message will tell you if your title is too long, too short, or within the optimal range.</li>
                    <li><strong>Refine and Optimize:</strong> Adjust your title based on the feedback until it meets the recommended length for best performance.</li>
                </ol>
            </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Frequently Asked Questions (FAQ)</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">What is the maximum YouTube title length in 2025?</h4>
                            <p className="text-muted-foreground">The hard limit is 100 characters, but for practical purposes, you should aim for 60-70 characters to avoid truncation on most devices.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Why is my title getting cut off on YouTube?</h4>
                            <p className="text-muted-foreground">This happens when your title exceeds the display limit for the device being used. Mobile phones, in particular, have less space for titles. Our tool helps you prevent this by keeping you within a safe length.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Does title length affect my video's SEO?</h4>
                            <p className="text-muted-foreground">Yes. While not a direct ranking factor, a concise and compelling title that includes relevant keywords can improve your click-through rate (CTR), which is a crucial signal to the YouTube algorithm. If your title is too long and keywords are cut off, it can negatively impact performance.</p>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Fun Fact</AccordionTrigger>
                <AccordionContent>
                    <p className="text-muted-foreground">The very first video uploaded to YouTube, titled "Me at the zoo," has a simple 14-character title. It was uploaded on April 23, 2005, by YouTube co-founder Jawed Karim and has since garnered hundreds of millions of views, proving that sometimes, simplicity is key!</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <Card>
            <CardHeader>
                <CardTitle>Related Tools</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <a href="/tools/youtube-tools/youtube-title-generator" className="text-primary hover:underline">YouTube Title Generator</a>
                <a href="/tools/youtube-tools/youtube-hashtag-generator" className="text-primary hover:underline">YouTube Hashtag Generator</a>
                <a href="/tools/youtube-tools/youtube-tag-generator" className="text-primary hover:underline">YouTube Tag Generator</a>
                <a href="/tools/youtube-tools/youtube-description-generator" className="text-primary hover:underline">YouTube Description Generator</a>
                <a href="/tools/youtube-tools/youtube-title-extractor" className="text-primary hover:underline">YouTube Title Extractor</a>
                <a href="/tools/youtube-tools/youtube-channel-id-extractor" className="text-primary hover:underline">YouTube Channel ID Extractor</a>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default YouTubeTitleLengthCheckerTool;
