import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Image as ImageIcon, HelpCircle, CheckCircle } from 'lucide-react';
import { toast } from "sonner";

// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const YouTubeThumbnailDownloaderTool = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGetThumbnails = () => {
    const id = getYouTubeVideoId(url);
    if (id) {
      setVideoId(id);
      setError('');
      toast.success("Thumbnails loaded!");
    } else {
      setVideoId(null);
      setError('Please enter a valid YouTube video URL.');
      toast.error("Invalid URL", {
        description: "Make sure the URL points to a valid YouTube video.",
      });
    }
  };

  const resolutions = [
    { name: 'Maximum Quality (1280x720)', key: 'maxresdefault' },
    { name: 'High Quality (480x360)', key: 'hqdefault' },
    { name: 'Medium Quality (320x180)', key: 'mqdefault' },
    { name: 'Standard Quality (640x480)', key: 'sddefault' },
    { name: 'Normal (120x90)', key: 'default' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Thumbnail Downloader</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Instantly download high-quality, high-resolution thumbnail images from any YouTube video. This tool is perfect for content creators, designers, and marketers who need visual assets for analysis, promotion, or creative projects. Get every available resolution, from standard definition to full HD, with a single click.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Thumbnail Downloader</CardTitle>
          <CardDescription>Paste any YouTube video URL below to grab all available thumbnail resolutions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter YouTube Video URL (e.g., https://www.youtube.com/watch?v=...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow text-base"
              />
              <Button onClick={handleGetThumbnails} disabled={!url.trim()} className="text-base px-6">
                Get Thumbnails
              </Button>
            </div>
            {error && <p className="text-destructive text-center sm:text-left">{error}</p>}
            
            {videoId && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                {resolutions.map(({ name, key }) => (
                  <Card key={key}>
                    <CardHeader className="p-0">
                      <img 
                        src={`https://img.youtube.com/vi/${videoId}/${key}.jpg`} 
                        alt={`${name} thumbnail`}
                        className="rounded-t-lg aspect-video object-cover"
                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/480x360?text=Not+Available'; }}
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{name}</h3>
                      <Button 
                        asChild 
                        className="w-full mt-3"
                      >
                        <a href={`https://img.youtube.com/vi/${videoId}/${key}.jpg`} download target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageIcon className="h-6 w-6 text-primary" /> What is a Thumbnail?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>A YouTube thumbnail is the small, clickable image that serves as a video's cover. It's the single most important factor, alongside the title, in convincing a potential viewer to click. A great thumbnail acts as a movie poster for your content, making a promise about the video's value, tone, and quality.</p>
            <p>While YouTube auto-generates options, successful channels almost exclusively use custom thumbnails to stand out.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HelpCircle className="h-6 w-6 text-primary" /> Why Download a Thumbnail?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Downloading thumbnails is a common practice for many legitimate reasons. It allows you to analyze, create, and promote more effectively. It's not about stealing; it's about strategy.</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Content Creation:</strong> Fair use in reaction videos, commentary, or news reports about the original video.</li>
              <li><strong>Design & Marketing:</strong> Creating social media posts, blog banners, or other promotional materials that reference a video.</li>
              <li><strong>Archiving:</strong> Saving a high-quality version of your own thumbnail for a portfolio or for A/B testing records.</li>
              <li><strong>Competitive Analysis:</strong> Deconstructing the visual strategies of top-performing videos in your niche to improve your own thumbnail designs. What colors, fonts, and layouts are working?</li>
            </ul>
            <p className="font-semibold">Always respect copyright laws and the original creator's rights. Use downloaded assets responsibly and ethically.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6 text-primary" /> Best Practices for Thumbnails</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-3 text-muted-foreground">
            <li><strong>Be Bold and Clear:</strong> Use large, easy-to-read fonts and high-contrast colors. Your thumbnail must be legible even when shrunk down to a tiny size on a mobile feed. Avoid clutter.</li>
            <li><strong>Show, Don't Just Tell:</strong> Include a compelling, high-quality image that hints at the video's content. Expressive human faces showing emotion (surprise, joy, curiosity) are particularly effective at grabbing attention.</li>
            <li><strong>Maintain Brand Consistency:</strong> Use a consistent style, font, logo, or color palette across your thumbnails. This helps viewers instantly recognize your content in a crowded subscription feed and builds brand loyalty.</li>
            <li><strong>Optimize for CTR:</strong> Your thumbnail should evoke curiosity or clearly communicate the value of watching. Ask a question, show a surprising result, or highlight the most exciting moment without giving everything away.</li>
            <li><strong>The 3-Element Rule:</strong> Keep the design simple and focused. A good rule of thumb is to have a maximum of three main elements (e.g., a face, a logo, and three words of text). Too much information is overwhelming.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeThumbnailDownloaderTool;
