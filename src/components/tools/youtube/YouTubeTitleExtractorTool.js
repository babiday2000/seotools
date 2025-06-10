import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, FileText, HelpCircle, CheckCircle, Lightbulb, Loader2 } from 'lucide-react';
import { toast } from "sonner";
// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};
const YouTubeTitleExtractorTool = () => {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleExtract = async () => {
        const videoId = getYouTubeVideoId(url);
        if (!videoId) {
            setError('Please enter a valid YouTube video URL.');
            setTitle('');
            return;
        }
        if (!apiKey) {
            setError('YouTube API key is not configured. Please contact support.');
            setIsLoading(false);
            return;
        }
        setError('');
        setIsLoading(true);
        setTitle('');
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch video data from YouTube API.');
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const videoTitle = data.items[0].snippet.title;
                setTitle(videoTitle);
                toast.success("Title extracted successfully!");
            }
            else {
                setError('Video not found. Please check the URL.');
                toast.error("Video not found.");
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch video data.';
            console.error(err);
            setError(errorMessage);
            toast.error("Extraction Failed", { description: errorMessage });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleCopy = () => {
        if (!title)
            return;
        navigator.clipboard.writeText(title);
        toast.success("Title Copied!", {
            description: "The video title has been copied to your clipboard.",
        });
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Title Extractor" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Instantly grab the exact title from any YouTube video. A simple tool for content creators and marketers to analyze what makes a title clickable and successful." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Title Extractor Tool" }), _jsx(CardDescription, { children: "Paste a video URL to extract its title." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "url", placeholder: "Enter YouTube Video URL...", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow text-base" }), _jsxs(Button, { onClick: handleExtract, disabled: isLoading || !url.trim(), className: "text-base px-6", children: [isLoading ? _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : _jsx(FileText, { className: "h-4 w-4 mr-2" }), isLoading ? 'Extracting...' : 'Extract Title'] })] }), error && _jsx("p", { className: "text-destructive text-center sm:text-left", children: error }), title && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Extracted Title" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center gap-4 p-4 border rounded-md bg-muted/50", children: [_jsx("p", { className: "text-lg font-semibold flex-grow", children: title }), _jsx(Button, { variant: "ghost", size: "icon", onClick: handleCopy, children: _jsx(Copy, { className: "h-5 w-5" }) })] }) })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto grid gap-8 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Lightbulb, { className: "h-6 w-6 text-primary" }), " The Power of a Great Title"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "A video's title is arguably the most important piece of its metadata. Along with the thumbnail, it's the primary driver of clicks. A great title grabs attention, creates curiosity, and clearly communicates the video's value proposition to a potential viewer." }), _jsx("p", { children: "It's a crucial element for both human psychology and search engine optimization (SEO), as it tells YouTube's algorithm what your video is about, helping it rank in search results." })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(HelpCircle, { className: "h-6 w-6 text-primary" }), " Why Analyze Video Titles?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "By extracting and analyzing the titles of popular videos in your niche, you can identify patterns and strategies that lead to success. This research helps you:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Understand Keyword Strategy:" }), " See which keywords top creators are targeting."] }), _jsxs("li", { children: [_jsx("strong", { children: "Get Inspiration:" }), " Brainstorm ideas and formats for your own titles."] }), _jsxs("li", { children: [_jsx("strong", { children: "Identify Trends:" }), " Spot popular title formats (e.g., \"X vs Y\", \"My Top 5...\", \"The Ultimate Guide to...\")."] }), _jsxs("li", { children: [_jsx("strong", { children: "Improve Your Own Titles:" }), " Learn how to write more compelling and clickable titles to increase your video's performance."] })] })] })] })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-6 w-6 text-primary" }), " Elements of a High-Performing Title"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("ul", { className: "list-disc list-inside space-y-3 text-muted-foreground", children: [_jsxs("li", { children: [_jsx("strong", { children: "Include Your Target Keyword:" }), " Place your main keyword naturally within the title, preferably near the beginning."] }), _jsxs("li", { children: [_jsx("strong", { children: "Keep it Concise:" }), " Aim for under 60-70 characters to prevent the title from being cut off in search results and suggestion feeds."] }), _jsxs("li", { children: [_jsx("strong", { children: "Use Numbers and Lists:" }), " Titles with numbers (e.g., \"7 Tips for...\") often have higher click-through rates because they set clear expectations."] }), _jsxs("li", { children: [_jsx("strong", { children: "Create Curiosity or Urgency:" }), " Use powerful words that evoke emotion or a sense of urgency (e.g., \"Warning,\" \"Secret,\" \"Finally\")."] }), _jsxs("li", { children: [_jsx("strong", { children: "Be Accurate:" }), " Your title must accurately reflect the content of your video. Misleading titles (clickbait) lead to low watch time and can harm your channel's reputation."] }), _jsxs("li", { children: [_jsx("strong", { children: "Consider Adding a Brand:" }), " For series or recognizable content, adding your brand or show name can be effective (e.g., \"React Crash Course | MyChannel\")."] })] }) })] })] }));
};
export default YouTubeTitleExtractorTool;
