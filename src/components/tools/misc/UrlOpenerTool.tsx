import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const UrlOpenerTool = () => {
  const [urls, setUrls] = useState('');

  const handleOpenUrls = () => {
    const urlArray = urls.split('\n').filter(url => url.trim() !== '');
    urlArray.forEach(url => {
      let fullUrl = url.trim();
      if (!/^https?:\/\//i.test(fullUrl)) {
        fullUrl = 'https://' + fullUrl;
      }
      window.open(fullUrl, '_blank');
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>URL Opener</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter URLs, one per line"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            rows={10}
          />
          <Button onClick={handleOpenUrls} className="mt-4">Open URLs</Button>
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a URL Opener?</h2>
        <p className="text-lg">
          A URL Opener is a time-saving utility designed to open multiple website links simultaneously. Instead of clicking on each link one by one, you can paste a list of URLs into the tool, and with a single click, it will open each URL in a new browser tab. This tool is incredibly useful for researchers, digital marketers, SEO analysts, and anyone who regularly works with large sets of links. Whether you're checking a list of backlinks, reviewing search engine results, or opening your daily set of news websites, the URL Opener streamlines the process, boosting your productivity and saving you from tedious, repetitive clicking.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors to Consider When Opening Multiple URLs</h3>
          <p>
            While our URL Opener is straightforward, there are a few factors that can affect its use and your browser's performance:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Number of URLs:</strong> Opening a very large number of URLs at once (e.g., 50 or 100) can consume a significant amount of your computer's memory (RAM) and CPU resources. This can cause your browser and computer to slow down or even become unresponsive.</li>
            <li><strong>Browser Pop-up Blockers:</strong> Most modern web browsers have built-in pop-up blockers. Since our tool opens new tabs programmatically, your browser might initially block them. You will likely need to explicitly allow pop-ups from our site for the tool to function correctly.</li>
            <li><strong>Internet Connection:</strong> The speed at which the new tabs load will depend on your internet connection speed and the responsiveness of the websites' servers.</li>
            <li><strong>URL Formatting:</strong> Ensure that the URLs you paste are correctly formatted. Our tool is designed to handle standard URLs, and it will attempt to add "https://" to links that are missing a protocol.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of the URL Opener Tool</h3>
          <p>
            Our tool is designed with simplicity and efficiency in mind, featuring a few key components:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>URL Input Area:</strong> A large text box where you can paste your list of URLs. The tool expects one URL per line.</li>
            <li><strong>Open URLs Button:</strong> The main action button. Clicking this will trigger the tool to process your list and open each link.</li>
            <li><strong>URL Parsing Logic:</strong> Behind the scenes, the tool splits the text you entered into individual lines, cleans up any empty lines, and then iterates through the list to open each URL.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the URL Opener</h3>
          <p>
            Using the tool is as easy as copy, paste, and click.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Prepare Your List:</strong> Copy the list of URLs you want to open. Make sure each URL is on a new line.</li>
            <li><strong>Paste the URLs:</strong> Paste the list into the text area provided on this page.</li>
            <li><strong>Click "Open URLs":</strong> Press the "Open URLs" button. You may need to approve a browser notification to allow multiple pop-ups. Once approved, each URL will open in a new tab.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Why did my browser block the URLs from opening?</AccordionTrigger>
              <AccordionContent>
                Browsers block unsolicited pop-ups as a security measure to prevent malicious ads and websites from overwhelming you. When you click the "Open URLs" button, the browser sees a script trying to open multiple tabs at once and may block it. You should see a notification near the address bar allowing you to "always allow pop-ups and redirects" from our site.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is there a limit to how many URLs I can open at once?</AccordionTrigger>
              <AccordionContent>
                Technically, our tool doesn't impose a hard limit. However, the practical limit is determined by your computer's hardware (RAM and CPU) and your browser's ability to handle many open tabs. We recommend starting with smaller batches (10-20 URLs) to see how your system performs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is this tool safe to use?</AccordionTrigger>
              <AccordionContent>
                Yes, our tool is safe. It simply takes the URLs you provide and uses standard browser functionality to open them. We do not store, analyze, or share the URLs you enter. However, you should always be cautious about the URLs you are opening and ensure they are from trusted sources.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>Does the tool work on all browsers?</AccordionTrigger>
              <AccordionContent>
                The tool uses standard JavaScript that is compatible with all modern web browsers, including Chrome, Firefox, Safari, and Edge. The only difference you might encounter is how each browser handles the pop-up blocking notification.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The concept of tabbed browsing, which is essential for a tool like this to be useful, wasn't a feature of early web browsers. It was first popularized by the browser Opera in the mid-1990s. Other browsers were slow to adopt it; Internet Explorer, the dominant browser of the time, didn't get native tabbed browsing until version 7 was released in 2006. Before tabs, opening multiple websites meant opening multiple separate browser windows, which was far more chaotic to manage!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrlOpenerTool;
