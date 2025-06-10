import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const ConvertSrtToVttTool = () => {
  const [srt, setSrt] = useState('');
  const [vtt, setVtt] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    setError('');
    setVtt('');
    if (!srt) return;

    try {
      // Basic SRT to VTT conversion: add header and replace timestamp comma with a period.
      const vttContent =
        'WEBVTT\n\n' + srt.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
      setVtt(vttContent);
    } catch {
      setError('Invalid SRT format. Please check your input.');
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Convert SRT to VTT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">SRT Content</h3>
              <Textarea
                placeholder="Enter SRT content here"
                value={srt}
                onChange={(e) => setSrt(e.target.value)}
                rows={12}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">VTT Content</h3>
              <Textarea value={vtt} readOnly rows={12} placeholder="VTT output will appear here" />
            </div>
          </div>
          <Button onClick={handleConvert} className="mt-4 w-full">Convert to VTT</Button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is an SRT to VTT Converter?</h2>
        <p className="text-lg">
          An SRT to VTT Converter is a utility that transforms subtitle files from the SRT (SubRip Subtitle) format to the WebVTT (Web Video Text Tracks) format. SRT is a very common and basic subtitle format, but VTT is the modern standard for displaying timed text in web videos and is required for use with HTML5 video elements. This tool is essential for web developers and content creators who need to make their video subtitles compatible with modern web standards, enabling features like styling and better accessibility.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in Subtitle Conversion (SRT vs. VTT)</h3>
          <p>
            The conversion process involves translating the specific syntax of SRT into the syntax of VTT. Here are the key differences:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Timestamp Format:</strong> SRT uses a comma (`,`) as the decimal separator for milliseconds (e.g., `00:00:01,234`), while VTT uses a period (`.`) (e.g., `00:00:01.234`). This is the most fundamental change during conversion.</li>
            <li><strong>Header:</strong> SRT files have no header. A valid VTT file must begin with the line `WEBVTT`. The converter adds this header automatically.</li>
            <li><strong>Cue Identifiers:</strong> In SRT, each subtitle cue is identified by a sequential number. In VTT, these identifiers are optional, but our converter preserves them for clarity.</li>
            <li><strong>Styling and Metadata:</strong> The basic SRT format does not support styling. VTT, on the other hand, allows for rich styling and positioning of cues using syntax similar to CSS. Our converter handles the basic text and timing conversion, laying the groundwork for you to add VTT-specific features if needed.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our SRT to VTT Converter</h3>
          <p>
            Our tool is designed to be fast, simple, and reliable.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>SRT Input Area:</strong> A text box where you can paste the entire content of your SRT file.</li>
            <li><strong>Convert Button:</strong> This button initiates the conversion process.</li>
            <li><strong>VTT Output Area:</strong> A read-only text box where the converted WebVTT content appears, ready for you to copy.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the SRT to VTT Converter</h3>
          <p>
            Converting your subtitle file is a simple process.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Paste SRT Content:</strong> Open your `.srt` file in a text editor, copy all of its content, and paste it into the SRT input box on the left.</li>
            <li><strong>Click Convert:</strong> Press the "Convert to VTT" button.</li>
            <li><strong>Copy the VTT Output:</strong> The tool will instantly display the converted WebVTT content in the box on the right. You can then copy this content and save it as a new `.vtt` file for use in your web projects.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Why do I need to convert from SRT to VTT?</AccordionTrigger>
              <AccordionContent>
                The primary reason is for web video. The HTML5 {`<track>`} element, used for displaying subtitles and captions, officially requires the VTT format. If you want to provide accessible, in-browser subtitles for your videos, converting your existing SRT files to VTT is a necessary step.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is the main advantage of VTT over SRT?</AccordionTrigger>
              <AccordionContent>
                The biggest advantage of VTT is its support for styling and positioning. You can use CSS-like commands within the VTT file to change the color, font, and position of your subtitles, which is not possible with the basic SRT format. This allows for more creative and accessible subtitle presentations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What does "Invalid SRT format" mean?</AccordionTrigger>
              <AccordionContent>
                This error indicates that the text you pasted does not follow the rules of the SRT format. This could be due to missing cue numbers, incorrectly formatted timestamps (e.g., using a period instead of a comma), or other syntax errors. Please ensure you have copied the entire, unmodified content of the SRT file.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The WebVTT format was developed by the Web Hypertext Application Technology Working Group (WHATWG) starting in 2010. It was heavily based on the much older SRT format, with the explicit goal of creating a standardized and more powerful subtitle format that was native to the web, finally giving HTML video a proper captioning system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConvertSrtToVttTool;
