import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const WhatIsMyBrowserTool = () => {
  const [browserInfo, setBrowserInfo] = useState<string | null>(null);

  useEffect(() => {
    setBrowserInfo(navigator.userAgent);
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>What Is My Browser?</CardTitle>
        </CardHeader>
        <CardContent>
          {browserInfo ? (
            <div className="text-lg">
              <p>{browserInfo}</p>
            </div>
          ) : (
            <p>Detecting browser...</p>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is "What Is My Browser"?</h2>
        <p className="text-lg">
          Our "What Is My Browser" tool is a simple yet powerful utility that instantly identifies the web browser you are currently using. It provides you with your browser's user agent string, which contains valuable information about your browser type, version, operating system, and more. This tool is essential for developers, testers, and anyone curious about their digital footprint. By understanding your browser's identity, you can better troubleshoot issues, ensure web compatibility, and enhance your online security.
        </p>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors</h3>
          <p>
            Several factors contribute to the information displayed by this tool. The primary factor is the <strong>User-Agent string</strong> sent by your browser with every web request. This string is a line of text that identifies the browser and provides certain system details to the web server. Key information includes:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Browser Name and Version:</strong> (e.g., Chrome 125, Firefox 126). This is crucial for determining which web features are supported.</li>
            <li><strong>Operating System:</strong> (e.g., Windows 11, macOS, Linux). This helps websites serve OS-specific content or instructions.</li>
            <li><strong>Rendering Engine:</strong> (e.g., Gecko, WebKit, Blink). This is the core software that draws the web page content on your screen.</li>
            <li><strong>Device Information:</strong> (e.g., Mobile, Tablet, Desktop). This allows websites to serve responsive designs tailored to your screen size.</li>
          </ul>
          <p className="mt-2">
            The user-agent string is a complex piece of data that has evolved over time, sometimes containing information about other browsers for compatibility reasons. Our tool parses this string to give you the most relevant information in a clear and understandable format.
          </p>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of "What Is My Browser"</h3>
          <p>
            Understanding the components of your browser can help you appreciate the complexity of web technology. Here are the key parts:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>User Interface (UI):</strong> This is everything you see and interact with, including the address bar, buttons (back, forward, refresh), bookmarks menu, and settings. Its design aims to be intuitive and efficient.</li>
            <li><strong>Browser Engine:</strong> The core component that acts as a bridge between the UI and the rendering engine. It queries the rendering engine and orchestrates its actions based on your inputs.</li>
            <li><strong>Rendering Engine:</strong> Responsible for displaying the requested content. It parses HTML and CSS and displays the formatted content on your screen. Different browsers use different rendering engines (e.g., Blink for Chrome, Gecko for Firefox, WebKit for Safari).</li>
            <li><strong>Networking:</strong> Handles network calls, such as HTTP requests, to fetch URLs and other resources. It manages security, caching, and internet communication.</li>
            <li><strong>JavaScript Interpreter:</strong> Often called a JavaScript engine (e.g., V8 in Chrome), this component parses and executes the JavaScript code embedded in websites, enabling dynamic and interactive features.</li>
            <li><strong>UI Backend:</strong> Used for drawing basic widgets like combo boxes, windows, and dialogs. It uses the operating system's native UI methods.</li>
            <li><strong>Data Persistence/Storage:</strong> A small database on your local drive where the browser stores data like cookies, cache, and local storage. This allows websites to remember you and your preferences.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use "What Is My Browser"</h3>
          <p>
            Using our tool is incredibly straightforward:
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li>Simply load this page. There are no buttons to press or forms to fill out.</li>
            <li>The tool automatically detects and displays your browser's user agent string in the card above.</li>
            <li>You can copy the user agent string for use in bug reports, development testing, or for your own records. This is especially useful when you need to provide technical details to a support team.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Why is my browser information important?</AccordionTrigger>
              <AccordionContent>
                Your browser information is crucial for web developers to ensure that websites function correctly across different browsers and devices. It's also useful for troubleshooting issues you might encounter online. For example, if a website feature isn't working, knowing your browser and version can help a support team identify the problem quickly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it safe to share my user agent string?</AccordionTrigger>
              <AccordionContent>
                Yes, it is generally safe. The user agent string does not contain any personal identifiable information like your name or email address. It is standard practice for all browsers to send this information to web servers with every request.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I change my user agent string?</AccordionTrigger>
              <AccordionContent>
                Yes, it is possible to change your user agent string using browser extensions or the built-in developer tools. This is a common practice for web developers to test how a website appears and functions on different devices or browsers without needing to own every device.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Why does my user agent string sometimes show other browser names?</AccordionTrigger>
              <AccordionContent>
                This is a historical quirk of the web. In the early days, some websites would only serve full-featured pages to the most popular browser at the time. To get around this, other browsers started including parts of that popular browser's user agent string in their own. This practice, known as "user agent sniffing," has led to the complex and sometimes misleading user agent strings we see today.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The very first web browser was called WorldWideWeb (later renamed Nexus to avoid confusion with the World Wide Web itself). It was created by Sir Tim Berners-Lee in 1990 on a NeXT computer. Unlike modern browsers that are primarily for viewing content, WorldWideWeb was also a WYSIWYG (What You See Is What You Get) editor, allowing users to both browse and edit web pages simultaneously.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatIsMyBrowserTool;
