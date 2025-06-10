import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const ScreenResolutionSimulatorTool = () => {
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(1366);
  const [height, setHeight] = useState(768);
  const [simulationUrl, setSimulationUrl] = useState('');

  const handleSimulate = () => {
    if (url) {
      // A simple way to handle URLs without protocols
      if (!/^https?:\/\//i.test(url)) {
        setSimulationUrl('https://' + url);
      } else {
        setSimulationUrl(url);
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Screen Resolution Simulator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              type="text"
              placeholder="Enter URL (e.g., example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Input
              type="number"
              placeholder="Width"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
              className="w-full sm:w-24"
            />
            <Input
              type="number"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
               className="w-full sm:w-24"
            />
            <Button onClick={handleSimulate} className="w-full sm:w-auto">Simulate</Button>
          </div>
          {simulationUrl && (
            <div className="w-full bg-muted/20 p-4 border-2 border-dashed rounded-lg">
               <p className="text-center text-muted-foreground mb-2">Displaying {simulationUrl} at {width}x{height}</p>
              <iframe
                src={simulationUrl}
                style={{ width: `${width}px`, height: `${height}px`, border: '1px solid #ccc', margin: '0 auto', display: 'block' }}
                title="Screen Resolution Simulation"
              />
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
       <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a Screen Resolution Simulator?</h2>
        <p className="text-lg">
          A Screen Resolution Simulator is a powerful tool that allows you to view a website as it would appear on screens of different sizes and resolutions. This is an indispensable utility for web developers, designers, and quality assurance testers who need to ensure a consistent and user-friendly experience across a wide range of devices, from small mobile phones to large desktop monitors. By entering a website's URL and specifying a width and height, you can instantly see a live preview of the site within a framed window that matches your chosen dimensions. This helps in identifying layout issues, checking the readability of text, and verifying the functionality of responsive design elements without needing physical access to every type of device.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors Influencing Website Display</h3>
          <p>
            The way a website is displayed is influenced by more than just the screen resolution. Our simulator primarily focuses on resolution, but it's important to understand the other factors at play:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Screen Resolution:</strong> The number of pixels on the screen (width x height). This is the primary factor our tool simulates.</li>
            <li><strong>Aspect Ratio:</strong> The ratio of the width to the height of the screen. Different resolutions can have the same aspect ratio (e.g., 1280x720 and 1920x1080 are both 16:9).</li>
            <li><strong>Responsive Design:</strong> Modern websites use responsive design techniques, employing CSS media queries to adapt their layout based on the viewport size. A well-designed responsive site will look good at any resolution.</li>
            <li><strong>Pixel Density (PPI):</strong> High-density screens (often called "Retina" displays) pack more pixels into a smaller area. This can make images sharper but can also make text and UI elements appear smaller if not scaled properly.</li>
             <li><strong>Browser Viewport:</strong> The actual visible area of the web page within the browser. This can be different from the screen resolution if the browser window is not maximized or if there are toolbars and scrollbars present. Our simulator sets the iframe to the specified resolution, which acts as the viewport.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our Simulator</h3>
          <p>
            Our Screen Resolution Simulator is built with several key components to provide an effective testing environment:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>URL Input:</strong> Where you enter the web address of the site you want to test.</li>
            <li><strong>Dimension Inputs (Width & Height):</strong> These fields allow you to specify the exact resolution you want to simulate. We provide default values, but you can enter any custom size.</li>
            <li><strong>Simulate Button:</strong> This triggers the tool to load the specified URL into the simulation window.</li>
            <li><strong>Simulation Window (Iframe):</strong> An inline frame (iframe) is used to display the target website. We dynamically set the width and height of this iframe to match your input, effectively simulating the desired screen resolution.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the Screen Resolution Simulator</h3>
          <p>
            Testing your website at different resolutions is a simple, three-step process with our tool:
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Enter the URL:</strong> Type or paste the full URL of the website you wish to test into the URL input field.</li>
            <li><strong>Set the Resolution:</strong> Enter your desired width and height in pixels into the respective input fields. You can use common resolutions like 360x640 for mobile, 768x1024 for tablets, or 1920x1080 for desktops.</li>
            <li><strong>Click Simulate:</strong> Press the "Simulate" button. The website will load in the preview window below, resized to your specified dimensions. You can then scroll and interact with the site within the frame to test its appearance and functionality.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Why is it important to test different screen resolutions?</AccordionTrigger>
              <AccordionContent>
                The variety of devices used to access the internet is immense. A website that looks perfect on a large desktop monitor might be unusable on a small mobile screen if it's not designed to be responsive. Testing ensures that all users, regardless of their device, have a good experience. It helps catch issues like overlapping text, images that are too large, or navigation that is difficult to use.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can this tool simulate mobile devices accurately?</AccordionTrigger>
              <AccordionContent>
                Our tool simulates the screen resolution of mobile devices, which is a major part of mobile testing. However, a full mobile simulation also involves factors like touch events, device-specific user agents, and performance limitations. For a complete mobile test, it's best to use browser developer tools or real devices in addition to our simulator.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Are there any limitations to the simulator?</AccordionTrigger>
              <AccordionContent>
                Some websites have security policies (specifically the `X-Frame-Options` header) that prevent them from being loaded inside an iframe. If a website has this policy, it cannot be displayed in our simulator. This is a security measure to prevent a type of attack called "clickjacking."
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>What are some common screen resolutions I should test for?</AccordionTrigger>
              <AccordionContent>
                It's a good practice to test a range of resolutions. Here are a few common ones to start with:
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li><strong>Mobile:</strong> 360x640, 375x667, 414x896</li>
                  <li><strong>Tablet:</strong> 768x1024, 810x1080</li>
                  <li><strong>Desktop:</strong> 1366x768, 1920x1080, 2560x1440</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The concept of responsive web design, which is the practice of making websites that adapt to different screen sizes, was first introduced by Ethan Marcotte in an article in "A List Apart" magazine back in 2010. Before this, companies often had to build and maintain a completely separate "mobile version" of their website (often on a subdomain like m.example.com). Responsive design revolutionized web development by allowing one codebase to serve all devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreenResolutionSimulatorTool;
