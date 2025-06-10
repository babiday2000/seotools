import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const WhatIsMyUserAgentTool = () => {
  const [userAgent, setUserAgent] = useState<string | null>(null);

  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>What Is My User Agent?</CardTitle>
        </CardHeader>
        <CardContent>
          {userAgent ? (
            <div className="text-lg">
              <p>{userAgent}</p>
            </div>
          ) : (
            <p>Detecting user agent...</p>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a User Agent?</h2>
        <p className="text-lg">
          A User Agent is a string of text that your web browser sends to each website you visit. It acts as a digital name tag, introducing your browser and providing the website with key details about your system. This information helps the website's server to deliver content that is optimized for your specific device and software. For example, it can tell a website whether you are browsing on a mobile phone or a desktop computer, which can trigger different layouts for the site. Our "What Is My User Agent" tool allows you to see this string, which is essential for developers, marketers, and tech enthusiasts who need to understand how different systems interact with web services. The user agent string is a fundamental part of the web's architecture, enabling the rich, device-agnostic experience we've come to expect. It’s a simple yet powerful mechanism that facilitates compatibility and customization across the vast landscape of the internet.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors That Determine Your User Agent</h3>
          <p>
            Your user agent string is composed of several distinct pieces of information, known as tokens. Each token provides a specific detail about your environment. Here are the primary factors that make up your user agent string:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Browser Name and Version:</strong> This is one of the most critical parts of the user agent. It specifies which browser you are using (e.g., Chrome, Firefox, Safari, Edge) and its version number (e.g., 125.0). This allows websites to leverage browser-specific features or apply workarounds for known bugs in certain versions.</li>
            <li><strong>Operating System (OS):</strong> The user agent identifies your OS (e.g., Windows 11, macOS 14.4, Android 13). This is crucial for websites that offer different software downloads for different operating systems or need to adjust their functionality based on the OS.</li>
            <li><strong>Rendering Engine:</strong> This is the core component of the browser that is responsible for drawing the content on your screen. Examples include Blink (used by Chrome and Edge), Gecko (used by Firefox), and WebKit (used by Safari). Knowing the rendering engine helps developers predict how HTML, CSS, and JavaScript will be interpreted and displayed.</li>
            <li><strong>Device Type:</strong> The user agent often indicates whether you are using a mobile device, a tablet, or a desktop computer. This is fundamental for responsive web design, allowing sites to serve a mobile-optimized layout to phones and a full-featured layout to desktops.</li>
            <li><strong>Compatibility Flags:</strong> Sometimes, a user agent string includes tokens for other browsers to ensure compatibility. For instance, many browsers, including Chrome and Edge, include "Mozilla/5.0" and "like Gecko" in their user agent strings to signal compatibility with the Mozilla rendering engine, a legacy practice from the early days of the web.</li>
            <li><strong>Other Details:</strong> The user agent can also include other miscellaneous details, such as the CPU architecture (e.g., 64-bit) or specific device models (e.g., 'iPhone').</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of a User Agent String</h3>
          <p>
            A user agent string might look cryptic at first, but it has a defined structure. Let's break down a typical example:
            <br />
            <code>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36</code>
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Mozilla/5.0:</strong> This is a historical token that almost every modern browser includes for compatibility reasons. It dates back to the "browser wars" of the 1990s.</li>
            <li><strong>(Windows NT 10.0; Win64; x64):</strong> This part, enclosed in parentheses, is the platform token. It describes the operating system. In this case, "Windows NT 10.0" corresponds to Windows 10 or 11, and "Win64; x64" indicates a 64-bit version of Windows.</li>
            <li><strong>AppleWebKit/537.36:</strong> This specifies the browser's rendering engine. WebKit is an open-source engine, and many browsers, including Chrome and Safari, are based on it. The number is the version of the engine.</li>
            <li><strong>(KHTML, like Gecko):</strong> This is another compatibility token. KHTML is the predecessor to WebKit, and Gecko is the engine used by Firefox. Including these terms signals that the browser is compatible with standards followed by these engines.</li>
            <li><strong>Chrome/125.0.0.0:</strong> This token identifies the actual browser and its version number.</li>
            <li><strong>Safari/537.36:</strong> This is another compatibility token, indicating that the browser is compatible with Safari. This is often included because, for a long time, Safari was the most prominent browser using the WebKit engine.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use Our "What Is My User Agent" Tool</h3>
          <p>
            Our tool is designed for simplicity and ease of use. Here’s how you can get your user agent string in seconds:
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Load the Page:</strong> The moment you open this webpage, the tool gets to work.</li>
            <li><strong>Automatic Detection:</strong> The tool automatically reads the user agent string that your browser sends to our server.</li>
            <li><strong>View and Copy:</strong> The detected user agent string is displayed clearly in the card at the top of the page. You can easily highlight and copy the full string for your needs, whether it's for a bug report, a development project, or simply for your own curiosity.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Why would I need to know my user agent?</AccordionTrigger>
              <AccordionContent>
                There are several reasons. Web developers need it to test how their sites behave with different browsers and devices. If you're reporting a bug on a website, providing your user agent string can help the developers diagnose the problem much faster. It's also used by content delivery networks to serve optimized content and by analytics platforms to gather statistics about website traffic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is my user agent string unique to me?</AccordionTrigger>
              <AccordionContent>
                Not usually. Many people will have the same browser and operating system, so their user agent strings will be identical. However, the combination of all the information in the string, along with other data like your IP address, can be used to create a "fingerprint" that is highly unique. This is a technique used by some websites for tracking users.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I change or hide my user agent?</AccordionTrigger>
              <AccordionContent>
                Yes, you can. Most modern browsers have developer tools that allow you to manually change your user agent string for a single tab. There are also browser extensions that can manage and switch your user agent for you. This is a common practice for developers who need to test a website from the perspective of a different browser or device without actually switching their setup.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Do all devices have a user agent?</AccordionTrigger>
              <AccordionContent>
                Yes, any device that can access the web will have a user agent. This includes not just computers and smartphones, but also smart TVs, gaming consoles, and even some IoT (Internet of Things) devices. Search engine crawlers, like Googlebot, also have their own user agent strings to identify themselves to websites.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The complexity and sometimes misleading nature of user agent strings are a direct result of the "browser wars" in the late 1990s between Netscape Navigator and Internet Explorer. Both browsers introduced new features and tried to be the dominant force on the web. To ensure websites built for one browser would still work on the other, browsers started to "impersonate" each other by including parts of their rival's user agent string. This practice of including compatibility tokens has continued to this day, making the modern user agent string a fascinating piece of internet history.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatIsMyUserAgentTool;
