import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const YouTubeEmbedCodeGeneratorTool = () => {
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(560);
  const [height, setHeight] = useState(315);
  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [controls, setControls] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [quality, setQuality] = useState('high');
  const [size, setSize] = useState('560x315');

  const videoId = useMemo(() => getYouTubeVideoId(url), [url]);

  useEffect(() => {
    if (size === 'custom') return;
    const [w, h] = size.split('x').map(Number);
    setWidth(w);
    setHeight(h);
  }, [size]);

  const embedCode = useMemo(() => {
    if (!videoId) return '';

    let src = `https://www.youtube.com/embed/${videoId}?`;
    const params = [];
    if (autoplay) params.push('autoplay=1');
    if (loop) params.push('loop=1', `playlist=${videoId}`);
    if (!controls) params.push('controls=0');
    if (startTime > 0) params.push(`start=${startTime}`);
    if (quality !== 'high') params.push(`vq=${quality}`);

    src += params.join('&');

    return `<iframe width="${width}" height="${height}" src="${src}" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`;
  }, [videoId, width, height, autoplay, loop, controls, startTime, quality]);

  const handleCopy = () => {
    if (!embedCode) {
      toast.error("Please generate the code first.");
      return;
    }
    navigator.clipboard.writeText(embedCode);
    toast.success('Embed code copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Embed Code Generator</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Customize and generate the HTML embed code for any YouTube video. Control the size, autoplay, loop, and other options to perfectly fit the video into your website or blog.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Embed Code Generator</CardTitle>
          <CardDescription>Enter a YouTube URL and configure the options to generate your embed code.</CardDescription>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="560x315">560x315 (Standard)</SelectItem>
                  <SelectItem value="640x360">640x360</SelectItem>
                  <SelectItem value="853x480">853x480</SelectItem>
                  <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                  <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time (seconds)</Label>
              <Input id="start-time" type="number" value={startTime} onChange={e => setStartTime(Number(e.target.value))} />
            </div>
          </div>

          {size === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="custom-width">Custom Width (px)</Label>
                <Input id="custom-width" type="number" value={width} onChange={e => setWidth(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-height">Custom Height (px)</Label>
                <Input id="custom-height" type="number" value={height} onChange={e => setHeight(Number(e.target.value))} />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="quality">Quality</Label>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="small">Small</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="autoplay" checked={autoplay} onCheckedChange={(checked) => setAutoplay(checked === true)} />
              <Label htmlFor="autoplay">Autoplay</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="loop" checked={loop} onCheckedChange={(checked) => setLoop(checked === true)} />
              <Label htmlFor="loop">Loop</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="controls" checked={controls} onCheckedChange={(checked) => setControls(checked === true)} />
              <Label htmlFor="controls">Show Player Controls</Label>
            </div>
          </div>

          {videoId && (
            <div className="space-y-4">
              <Card className="bg-muted/50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                      <CardTitle>Generated Embed Code</CardTitle>
                      <Button variant="outline" size="icon" onClick={handleCopy}>
                          <Copy className="h-4 w-4" />
                      </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea readOnly value={embedCode} className="h-48 font-mono text-sm" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Embed Code Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: embedCode }} />
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is a YouTube Embed Code?</h2>
          <p className="text-muted-foreground">
            A YouTube embed code is an HTML snippet that allows you to display a YouTube video directly on your own website or blog. It uses an `&lt;iframe&gt;` element to create a window on your page that loads the YouTube player and your chosen video. Embedding videos is a powerful way to enhance your content, provide visual examples, and keep visitors on your site longer without having to host the video files yourself.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Use a Custom Embed Code?</h2>
          <p className="text-muted-foreground">
            While YouTube provides a standard embed code, our generator gives you more control over the viewing experience:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Custom Sizing:</strong> Set the exact width and height of the video player to perfectly fit your website's layout.</li>
            <li><strong>Start Time:</strong> Make the video start playing from a specific point, which is great for highlighting a particular section.</li>
            <li><strong>Autoplay and Loop:</strong> Configure the video to play automatically or loop continuously, which can be useful for background videos or short clips.</li>
            <li><strong>Player Controls:</strong> Choose to hide the player controls for a cleaner, more minimalist look.</li>
            <li><strong>Ease of Use:</strong> Our tool generates the complex URL parameters for you, so you don't have to remember them or risk making a mistake.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Embed Code Generator</h2>
          <p className="text-muted-foreground">
            Generating your custom embed code is a simple process:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Enter the Video URL:</strong> Paste the URL of the YouTube video you want to embed.</li>
            <li><strong>Configure Options:</strong> Adjust the width, height, start time, and other options like autoplay and loop to your liking.</li>
            <li><strong>Generate and Copy:</strong> The tool will instantly generate the HTML embed code. Click the copy button.</li>
            <li><strong>Paste on Your Website:</strong> Paste the copied code into the HTML of your website where you want the video to appear.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Will embedding videos slow down my website?</h3>
              <p className="text-muted-foreground">Embedding a YouTube video is much more efficient than hosting the video yourself. The video content is loaded from YouTube's servers, which are highly optimized for video delivery. However, having many embedded videos on a single page can still impact load times.</p>
            </div>
            <div>
              <h3 className="font-semibold">Does autoplay work on all browsers?</h3>
              <p className="text-muted-foreground">Most modern browsers have policies that restrict autoplay, especially if the sound is not muted. Autoplay is not guaranteed to work for all users.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is it legal to embed any YouTube video?</h3>
              <p className="text-muted-foreground">If a video's owner has enabled embedding, it is generally permissible to embed it on your site. If they have disabled embedding for their video, it will not play on your site.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The `&lt;iframe&gt;` (Inline Frame) HTML tag, which is the backbone of YouTube embeds, was first introduced by Microsoft in Internet Explorer 3 in 1996. It was not part of the official HTML standard until HTML 4.01 in 1999, but its utility was so apparent that it became a de facto standard long before that.
          </p>
        </section>
      </div>
    </div>
  );
};

export default YouTubeEmbedCodeGeneratorTool;
