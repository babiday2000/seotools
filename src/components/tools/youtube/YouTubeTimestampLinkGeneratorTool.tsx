import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Clock } from 'lucide-react';
import { toast } from 'sonner';

const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const YouTubeTimestampLinkGeneratorTool = () => {
  const [url, setUrl] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const generatedLink = useMemo(() => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return '';

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (totalSeconds <= 0) {
      return `https://youtu.be/${videoId}`;
    }
    return `https://youtu.be/${videoId}?t=${totalSeconds}`;
  }, [url, hours, minutes, seconds]);

  const handleCopy = () => {
    if (!generatedLink) {
        toast.error("Please generate a link first.");
        return;
    };
    navigator.clipboard.writeText(generatedLink);
    toast.success('Timestamp link copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Timestamp Link Generator</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Create a YouTube link that starts playing at the exact moment you specify. Perfect for sharing specific sections of a video, citing sources, or creating a video table of contents.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Timestamp Link Generator</CardTitle>
          <CardDescription>Enter a YouTube URL and the desired start time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="youtube-url">YouTube Video URL</Label>
            <Input
              id="youtube-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Start Time</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="hours" className="text-sm text-muted-foreground">Hours</Label>
                <Input id="hours" type="number" min="0" value={hours} onChange={e => setHours(Number(e.target.value))} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="minutes" className="text-sm text-muted-foreground">Minutes</Label>
                <Input id="minutes" type="number" min="0" max="59" value={minutes} onChange={e => setMinutes(Number(e.target.value))} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="seconds" className="text-sm text-muted-foreground">Seconds</Label>
                <Input id="seconds" type="number" min="0" max="59" value={seconds} onChange={e => setSeconds(Number(e.target.value))} />
              </div>
            </div>
          </div>

          {getYouTubeVideoId(url) && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Generated Link</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <Input readOnly value={generatedLink} className="flex-grow" />
                  <Button onClick={handleCopy} size="icon" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                 <div className="mt-4 text-center">
                    <Button asChild>
                        <a href={generatedLink} target="_blank" rel="noopener noreferrer">Test Link</a>
                    </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a YouTube Timestamp Link?</h2>
          <p className="text-muted-foreground">
            A YouTube Timestamp Link is a special URL that directs viewers to a specific point in a YouTube video. Instead of starting the video from the beginning, the link includes a time parameter (e.g., `?t=123`) that tells the YouTube player to begin playback at that exact second. This is an incredibly useful feature for sharing highlights, referencing specific information in a long video, or creating chapter markers in your video descriptions. It enhances the viewer experience by taking them directly to the content that is most relevant to them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Use a Timestamp Link Generator?</h2>
          <p className="text-muted-foreground">
            Manually creating a timestamp link requires you to calculate the total number of seconds, which can be tedious and prone to error, especially for long videos. Our generator simplifies this process significantly:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Ease of Use:</strong> Simply input the hours, minutes, and seconds. The tool handles the conversion to total seconds automatically.</li>
            <li><strong>Accuracy:</strong> Eliminates the risk of manual calculation errors, ensuring your link works perfectly every time.</li>
            <li><strong>Speed:</strong> Quickly generate multiple timestamp links for video chapters or references without any hassle.</li>
            <li><strong>Universal Compatibility:</strong> The generated links work across all devices and browsers that support YouTube.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Creative Ways to Use Timestamp Links</h2>
          <p className="text-muted-foreground">
            Timestamp links are more than just a convenience; they are a powerful tool for engagement and content organization.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Video Chapters:</strong> Create a table of contents in your video description, allowing viewers to jump to different sections.</li>
            <li><strong>Citing Sources:</strong> When referencing another video, link to the exact moment you are discussing.</li>
            <li><strong>Sharing Highlights:</strong> Share the most exciting or important part of a video with your friends or on social media.</li>
            <li><strong>Tutorials and How-Tos:</strong> Help viewers find the exact step they need without having to scrub through the video.</li>
            <li><strong>Podcasts and Interviews:</strong> Link to the beginning of different topics or questions in a long-form conversation.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Timestamp Link Generator</h2>
          <p className="text-muted-foreground">
            Generating your timestamp link is a simple three-step process:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Paste the YouTube URL:</strong> Enter the full URL of the YouTube video you want to link to.</li>
            <li><strong>Set the Start Time:</strong> Use the input fields to specify the exact hour, minute, and second you want the video to start at.</li>
            <li><strong>Copy and Share:</strong> The tool will instantly generate the timestamped link. Click the copy button and share it anywhere.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Can I create a timestamp for the very beginning of the video?</h3>
              <p className="text-muted-foreground">Yes, if you set the time to 0 hours, 0 minutes, and 0 seconds, the tool will generate a clean link to the start of the video without a time parameter.</p>
            </div>
            <div>
              <h3 className="font-semibold">What is the maximum time I can set?</h3>
              <p className="text-muted-foreground">You can set a timestamp for any point up to the full duration of the video.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is this tool free to use?</h3>
              <p className="text-muted-foreground">Yes, our YouTube Timestamp Link Generator is completely free and has no usage limits.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The ability to link to a specific time in a video was one of the most requested YouTube features in the late 2000s. When it was finally implemented, it was initially done through a URL fragment (e.g., `#t=2m03s`). It was later changed to the query parameter format (`?t=123`) for better consistency with other URL parameters and to simplify the parsing process for developers.
          </p>
        </section>
      </div>
    </div>
  );
};

export default YouTubeTimestampLinkGeneratorTool;
