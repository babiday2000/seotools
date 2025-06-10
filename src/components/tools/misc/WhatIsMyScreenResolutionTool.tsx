import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const WhatIsMyScreenResolutionTool = () => {
  const [resolution, setResolution] = useState<string | null>(null);

  useEffect(() => {
    setResolution(`${window.screen.width} x ${window.screen.height}`);
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>What Is My Screen Resolution?</CardTitle>
        </CardHeader>
        <CardContent>
          {resolution ? (
            <div className="text-lg">
              <p>{resolution}</p>
            </div>
          ) : (
            <p>Detecting screen resolution...</p>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is Screen Resolution?</h2>
        <p className="text-lg">
          Screen resolution refers to the number of distinct pixels in each dimension that can be displayed on a device's screen. It is usually quoted as width × height, with the units in pixels: for example, "1920 x 1080" means the width is 1920 pixels and the height is 1080 pixels. This measurement is crucial in determining the quality of the visual output on a screen. A higher resolution means more pixels, which allows for more detail and sharper images. Our "What Is My Screen Resolution" tool instantly detects and displays the resolution of your screen, providing valuable information for web developers, designers, and anyone looking to optimize their viewing experience. Understanding your screen resolution is the first step towards ensuring that websites and applications are displayed correctly and look their best on your specific device.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors Affecting Screen Resolution</h3>
          <p>
            Several factors determine the screen resolution you experience. It's not just about the physical screen itself; software and settings also play a significant role.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Physical Screen Properties:</strong> The most fundamental factor is the native resolution of the monitor or display panel. This is the maximum number of pixels the screen can physically display. You can set your resolution lower than the native resolution, but not higher.</li>
            <li><strong>Graphics Card:</strong> The graphics card (or GPU) in your computer is responsible for rendering the images that are sent to your monitor. The capabilities of your graphics card can limit the maximum resolution and refresh rate you can use.</li>
            <li><strong>Operating System Settings:</strong> Your operating system (like Windows, macOS, or Linux) allows you to change your screen resolution through its display settings. You can choose from a list of resolutions supported by your monitor and graphics card.</li>
            <li><strong>Aspect Ratio:</strong> This is the proportional relationship between the width and height of the screen. Common aspect ratios include 16:9 (widescreen) and 4:3 (standard). The available resolutions will typically conform to the native aspect ratio of your monitor.</li>
            <li><strong>Display Scaling:</strong> Modern operating systems often use display scaling to make text and UI elements larger and easier to read on high-resolution screens. While this doesn't change the actual screen resolution, it affects the "effective" resolution, or how much content can fit on the screen.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Screen Resolution</h3>
          <p>
            To fully grasp screen resolution, it's helpful to understand its core components and related concepts:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Pixels:</strong> The smallest unit of a digital image or display. Everything you see on your screen is made up of a grid of these tiny dots.</li>
            <li><strong>Pixel Density (PPI):</strong> Pixels Per Inch (PPI) is a measure of how many pixels are packed into a one-inch line on the screen. A higher PPI results in a sharper, more detailed image because the individual pixels are smaller and closer together.</li>
            <li><strong>Refresh Rate:</strong> Measured in Hertz (Hz), the refresh rate is the number of times per second that the display hardware updates its buffer. A higher refresh rate (e.g., 120Hz or 144Hz) results in smoother motion, which is especially noticeable in gaming and video playback.</li>
            <li><strong>Color Depth:</strong> This determines how many different colors can be displayed for each pixel. It's measured in bits. For example, a 24-bit color depth (also known as "true color") can display approximately 16.7 million different colors.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use Our "What Is My Screen Resolution" Tool</h3>
          <p>
            Our tool is designed for simplicity and immediate results.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Visit the Page:</strong> Simply by loading this page, the tool is already at work.</li>
            <li><strong>Instant Detection:</strong> The tool queries your browser to get the current screen resolution of your display.</li>
            <li><strong>Clear Display:</strong> The detected resolution is shown in a clear "width x height" format in the card at the top of the page. There are no buttons to press or forms to fill out.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Why is knowing my screen resolution important?</AccordionTrigger>
              <AccordionContent>
                For web developers and designers, it's crucial for creating responsive websites that look good on all devices. For gamers, matching the game's resolution to the monitor's native resolution provides the best visual quality. For general users, it can help in troubleshooting display issues or choosing the right monitor for their needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is the difference between screen resolution and viewport size?</AccordionTrigger>
              <AccordionContent>
                Screen resolution is the total number of pixels on your physical screen. The viewport is the visible area of a web page in your browser window. The viewport can be smaller than the screen resolution if the browser window is not maximized. Our tool shows the full screen resolution, not just the browser viewport.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Should I always use the highest resolution possible?</AccordionTrigger>
              <AccordionContent>
                Generally, it's best to use your monitor's native resolution for the sharpest image. However, on very high-resolution screens, this can make text and icons appear very small. In such cases, you might use display scaling to make things more readable while still benefiting from the high pixel density.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>How does screen resolution impact performance?</AccordionTrigger>
              <AccordionContent>
                A higher resolution requires your graphics card to render more pixels, which demands more processing power. This is especially relevant for gaming and video editing. Running a game at a very high resolution (like 4K) requires a powerful graphics card to maintain a smooth frame rate.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The first commercially available color graphics card, the "Ultimate Graphics Adapter" (UGA), was released by IBM in 1984. It supported a resolution of up to 640x400 pixels with 16 colors. Today, we have 8K resolutions (7680x4320) that display over 33 million pixels, showcasing the incredible advancement in display technology over the past few decades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatIsMyScreenResolutionTool;
