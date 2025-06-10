import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Image as ImageIcon, HelpCircle, CheckCircle } from 'lucide-react';
import { toast } from "sonner";
// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};
const YouTubeThumbnailDownloaderTool = () => {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState(null);
    const [error, setError] = useState('');
    const handleGetThumbnails = () => {
        const id = getYouTubeVideoId(url);
        if (id) {
            setVideoId(id);
            setError('');
            toast.success("Thumbnails loaded!");
        }
        else {
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Thumbnail Downloader" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Instantly download high-quality, high-resolution thumbnail images from any YouTube video. This tool is perfect for content creators, designers, and marketers who need visual assets for analysis, promotion, or creative projects. Get every available resolution, from standard definition to full HD, with a single click." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Thumbnail Downloader" }), _jsx(CardDescription, { children: "Paste any YouTube video URL below to grab all available thumbnail resolutions." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "url", placeholder: "Enter YouTube Video URL (e.g., https://www.youtube.com/watch?v=...)", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow text-base" }), _jsx(Button, { onClick: handleGetThumbnails, disabled: !url.trim(), className: "text-base px-6", children: "Get Thumbnails" })] }), error && _jsx("p", { className: "text-destructive text-center sm:text-left", children: error }), videoId && (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4", children: resolutions.map(({ name, key }) => (_jsxs(Card, { children: [_jsx(CardHeader, { className: "p-0", children: _jsx("img", { src: `https://img.youtube.com/vi/${videoId}/${key}.jpg`, alt: `${name} thumbnail`, className: "rounded-t-lg aspect-video object-cover", onError: (e) => { e.currentTarget.src = 'https://via.placeholder.com/480x360?text=Not+Available'; } }) }), _jsxs(CardContent, { className: "p-4", children: [_jsx("h3", { className: "font-semibold", children: name }), _jsx(Button, { asChild: true, className: "w-full mt-3", children: _jsxs("a", { href: `https://img.youtube.com/vi/${videoId}/${key}.jpg`, download: true, target: "_blank", rel: "noopener noreferrer", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Download"] }) })] })] }, key))) }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto grid gap-8 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(ImageIcon, { className: "h-6 w-6 text-primary" }), " What is a Thumbnail?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "A YouTube thumbnail is the small, clickable image that serves as a video's cover. It's the single most important factor, alongside the title, in convincing a potential viewer to click. A great thumbnail acts as a movie poster for your content, making a promise about the video's value, tone, and quality." }), _jsx("p", { children: "While YouTube auto-generates options, successful channels almost exclusively use custom thumbnails to stand out." })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(HelpCircle, { className: "h-6 w-6 text-primary" }), " Why Download a Thumbnail?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Downloading thumbnails is a common practice for many legitimate reasons. It allows you to analyze, create, and promote more effectively. It's not about stealing; it's about strategy." }), _jsxs("ul", { className: "list-disc list-inside space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Content Creation:" }), " Fair use in reaction videos, commentary, or news reports about the original video."] }), _jsxs("li", { children: [_jsx("strong", { children: "Design & Marketing:" }), " Creating social media posts, blog banners, or other promotional materials that reference a video."] }), _jsxs("li", { children: [_jsx("strong", { children: "Archiving:" }), " Saving a high-quality version of your own thumbnail for a portfolio or for A/B testing records."] }), _jsxs("li", { children: [_jsx("strong", { children: "Competitive Analysis:" }), " Deconstructing the visual strategies of top-performing videos in your niche to improve your own thumbnail designs. What colors, fonts, and layouts are working?"] })] }), _jsx("p", { className: "font-semibold", children: "Always respect copyright laws and the original creator's rights. Use downloaded assets responsibly and ethically." })] })] })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-6 w-6 text-primary" }), " Best Practices for Thumbnails"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("ul", { className: "list-disc list-inside space-y-3 text-muted-foreground", children: [_jsxs("li", { children: [_jsx("strong", { children: "Be Bold and Clear:" }), " Use large, easy-to-read fonts and high-contrast colors. Your thumbnail must be legible even when shrunk down to a tiny size on a mobile feed. Avoid clutter."] }), _jsxs("li", { children: [_jsx("strong", { children: "Show, Don't Just Tell:" }), " Include a compelling, high-quality image that hints at the video's content. Expressive human faces showing emotion (surprise, joy, curiosity) are particularly effective at grabbing attention."] }), _jsxs("li", { children: [_jsx("strong", { children: "Maintain Brand Consistency:" }), " Use a consistent style, font, logo, or color palette across your thumbnails. This helps viewers instantly recognize your content in a crowded subscription feed and builds brand loyalty."] }), _jsxs("li", { children: [_jsx("strong", { children: "Optimize for CTR:" }), " Your thumbnail should evoke curiosity or clearly communicate the value of watching. Ask a question, show a surprising result, or highlight the most exciting moment without giving everything away."] }), _jsxs("li", { children: [_jsx("strong", { children: "The 3-Element Rule:" }), " Keep the design simple and focused. A good rule of thumb is to have a maximum of three main elements (e.g., a face, a logo, and three words of text). Too much information is overwhelming."] })] }) })] })] }));
};
export default YouTubeThumbnailDownloaderTool;
