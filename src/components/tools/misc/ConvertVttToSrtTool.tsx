import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const ConvertVttToSrtTool = () => {
  const [vtt, setVtt] = useState('');
  const [srt, setSrt] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    setError('');
    setSrt('');
    if (!vtt) return;

    try {
      // Basic VTT to SRT conversion: remove header and replace timestamp period with a comma.
      const srtContent = vtt
        .replace('WEBVTT', '')
        .replace(/(\d{2}:\d{2}:\d{2})\.(\d{3})/g, '$1,$2')
        .trim();
      setSrt(srtContent);
    } catch {
      setError('Invalid VTT format. Please check your input.');
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Convert VTT to SRT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">VTT Content</h3>
              <Textarea
                placeholder="Enter VTT content here"
                value={vtt}
                onChange={(e) => setVtt(e.target.value)}
                rows={12}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">SRT Content</h3>
              <Textarea value={srt} readOnly rows={12} placeholder="SRT output will appear here" />
            </div>
          </div>
          <Button onClick={handleConvert} className="mt-4 w-full">Convert to SRT</Button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a VTT to SRT Converter?</h2>
        <p className="text-lg">
          A VTT to SRT Converter is a tool that transforms subtitle files from the WebVTT (Web Video Text Tracks) format to the SRT (SubRip Subtitle) format. Both formats are used to display timed text, such as subtitles or captions, in videos. However, they have slightly different syntax and are supported by different platforms and players. VTT is the modern standard for web videos, while SRT is an older but still widely used format, especially in desktop media players and video editing software. Our converter bridges this compatibility gap, allowing you to easily convert your VTT files for use in applications that require the SRT format.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in Subtitle Conversion (VTT vs. SRT)</h3>
          <p>
            The conversion process involves translating the specific syntax of VTT into the syntax of SRT. Here are the key differences:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Timestamp Format:</strong> This is the most significant difference. VTT uses a period (`.`) as the decimal separator for milliseconds (e.g., `00:00:01.234`), while SRT uses a comma (`,`) (e.g., `00:00:01,234`).</li>
            <li><strong>Header:</strong> VTT files must start with a `WEBVTT` header line. SRT files do not have a header.</li>
            <li><strong>Cue Identifiers:</strong> In VTT, giving each subtitle cue a name or identifier is optional. In SRT, each cue must have a sequential number.</li>
            <li><strong>Styling and Metadata:</strong> VTT allows for more advanced features, such as styling cues with CSS and adding metadata in the form of "note" comments. These advanced features are not supported by the SRT format and are typically stripped out during conversion.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our VTT to SRT Converter</h3>
          <p>
            Our tool is designed to be fast and reliable.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>VTT Input Area:</strong> A text box where you can paste the entire content of your VTT file.</li>
            <li><strong>Convert Button:</strong> This button initiates the conversion process.</li>
            <li><strong>SRT Output Area:</strong> A read-only text box where the converted SRT content appears, ready for you to copy.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the VTT to SRT Converter</h3>
          <p>
            Converting your subtitle file is a simple process.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Paste VTT Content:</strong> Open your `.vtt` file in a text editor, copy all of its content, and paste it into the VTT input box on the left.</li>
            <li><strong>Click Convert:</strong> Press the "Convert to SRT" button.</li>
            <li><strong>Copy the SRT Output:</strong> The tool will instantly display the converted SRT content in the box on the right. You can then copy this content and save it as a new `.srt` file.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Why do I need to convert from VTT to SRT?</AccordionTrigger>
              <AccordionContent>
                You might need to convert subtitles if you've downloaded them from a web source (like YouTube, which often uses VTT) and want to use them with a desktop media player (like VLC or MPC-HC) or video editing software (like Adobe Premiere Pro or Final Cut Pro) that has better support for the SRT format.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Will I lose any information during the conversion?</AccordionTrigger>
              <AccordionContent>
                You will not lose any of the essential subtitle information (the text and the timings). However, any VTT-specific features, such as styling, cue positioning, and comments, will be removed, as the SRT format does not support them.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What does "Invalid VTT format" mean?</AccordionTrigger>
              <AccordionContent>
                This error means that the text you pasted does not follow the rules of the VTT format. This could be due to a missing `WEBVTT` header, incorrectly formatted timestamps, or other syntax errors. Please ensure you have copied the entire, unmodified content of the VTT file.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The SRT (SubRip) format is one of the oldest and simplest subtitle formats. It was originally created by a software developer named "Zub" for his DVD ripping software, "SubRip," which was released in the late 1990s. The format was never formally specified but became a de facto standard due to its simplicity and widespread adoption by the video-sharing community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConvertVttToSrtTool;
