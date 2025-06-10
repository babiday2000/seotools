import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const getYouTubeVideoId = (url) => {
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
        if (size === 'custom')
            return;
        const [w, h] = size.split('x').map(Number);
        setWidth(w);
        setHeight(h);
    }, [size]);
    const embedCode = useMemo(() => {
        if (!videoId)
            return '';
        let src = `https://www.youtube.com/embed/${videoId}?`;
        const params = [];
        if (autoplay)
            params.push('autoplay=1');
        if (loop)
            params.push('loop=1', `playlist=${videoId}`);
        if (!controls)
            params.push('controls=0');
        if (startTime > 0)
            params.push(`start=${startTime}`);
        if (quality !== 'high')
            params.push(`vq=${quality}`);
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Embed Code Generator" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Customize and generate the HTML embed code for any YouTube video. Control the size, autoplay, loop, and other options to perfectly fit the video into your website or blog." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Embed Code Generator" }), _jsx(CardDescription, { children: "Enter a YouTube URL and configure the options to generate your embed code." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "youtube-url", children: "YouTube Video URL" }), _jsx(Input, { id: "youtube-url", type: "url", placeholder: "https://www.youtube.com/watch?v=...", value: url, onChange: (e) => setUrl(e.target.value) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "size", children: "Size" }), _jsxs(Select, { value: size, onValueChange: setSize, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select size" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "560x315", children: "560x315 (Standard)" }), _jsx(SelectItem, { value: "640x360", children: "640x360" }), _jsx(SelectItem, { value: "853x480", children: "853x480" }), _jsx(SelectItem, { value: "1280x720", children: "1280x720 (HD)" }), _jsx(SelectItem, { value: "1920x1080", children: "1920x1080 (Full HD)" }), _jsx(SelectItem, { value: "custom", children: "Custom" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "start-time", children: "Start Time (seconds)" }), _jsx(Input, { id: "start-time", type: "number", value: startTime, onChange: e => setStartTime(Number(e.target.value)) })] })] }), size === 'custom' && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "custom-width", children: "Custom Width (px)" }), _jsx(Input, { id: "custom-width", type: "number", value: width, onChange: e => setWidth(Number(e.target.value)) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "custom-height", children: "Custom Height (px)" }), _jsx(Input, { id: "custom-height", type: "number", value: height, onChange: e => setHeight(Number(e.target.value)) })] })] })), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "quality", children: "Quality" }), _jsxs(Select, { value: quality, onValueChange: setQuality, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select quality" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "high", children: "High" }), _jsx(SelectItem, { value: "medium", children: "Medium" }), _jsx(SelectItem, { value: "small", children: "Small" })] })] })] }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "autoplay", checked: autoplay, onCheckedChange: (checked) => setAutoplay(checked === true) }), _jsx(Label, { htmlFor: "autoplay", children: "Autoplay" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "loop", checked: loop, onCheckedChange: (checked) => setLoop(checked === true) }), _jsx(Label, { htmlFor: "loop", children: "Loop" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "controls", checked: controls, onCheckedChange: (checked) => setControls(checked === true) }), _jsx(Label, { htmlFor: "controls", children: "Show Player Controls" })] })] }), videoId && (_jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { className: "bg-muted/50", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { children: "Generated Embed Code" }), _jsx(Button, { variant: "outline", size: "icon", onClick: handleCopy, children: _jsx(Copy, { className: "h-4 w-4" }) })] }) }), _jsx(CardContent, { children: _jsx(Textarea, { readOnly: true, value: embedCode, className: "h-48 font-mono text-sm" }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Embed Code Preview" }) }), _jsx(CardContent, { children: _jsx("div", { dangerouslySetInnerHTML: { __html: embedCode } }) })] })] }))] })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is a YouTube Embed Code?" }), _jsx("p", { className: "text-muted-foreground", children: "A YouTube embed code is an HTML snippet that allows you to display a YouTube video directly on your own website or blog. It uses an `<iframe>` element to create a window on your page that loads the YouTube player and your chosen video. Embedding videos is a powerful way to enhance your content, provide visual examples, and keep visitors on your site longer without having to host the video files yourself." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Why Use a Custom Embed Code?" }), _jsx("p", { className: "text-muted-foreground", children: "While YouTube provides a standard embed code, our generator gives you more control over the viewing experience:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Custom Sizing:" }), " Set the exact width and height of the video player to perfectly fit your website's layout."] }), _jsxs("li", { children: [_jsx("strong", { children: "Start Time:" }), " Make the video start playing from a specific point, which is great for highlighting a particular section."] }), _jsxs("li", { children: [_jsx("strong", { children: "Autoplay and Loop:" }), " Configure the video to play automatically or loop continuously, which can be useful for background videos or short clips."] }), _jsxs("li", { children: [_jsx("strong", { children: "Player Controls:" }), " Choose to hide the player controls for a cleaner, more minimalist look."] }), _jsxs("li", { children: [_jsx("strong", { children: "Ease of Use:" }), " Our tool generates the complex URL parameters for you, so you don't have to remember them or risk making a mistake."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the Embed Code Generator" }), _jsx("p", { className: "text-muted-foreground", children: "Generating your custom embed code is a simple process:" }), _jsxs("ol", { className: "list-decimal list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Enter the Video URL:" }), " Paste the URL of the YouTube video you want to embed."] }), _jsxs("li", { children: [_jsx("strong", { children: "Configure Options:" }), " Adjust the width, height, start time, and other options like autoplay and loop to your liking."] }), _jsxs("li", { children: [_jsx("strong", { children: "Generate and Copy:" }), " The tool will instantly generate the HTML embed code. Click the copy button."] }), _jsxs("li", { children: [_jsx("strong", { children: "Paste on Your Website:" }), " Paste the copied code into the HTML of your website where you want the video to appear."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Will embedding videos slow down my website?" }), _jsx("p", { className: "text-muted-foreground", children: "Embedding a YouTube video is much more efficient than hosting the video yourself. The video content is loaded from YouTube's servers, which are highly optimized for video delivery. However, having many embedded videos on a single page can still impact load times." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Does autoplay work on all browsers?" }), _jsx("p", { className: "text-muted-foreground", children: "Most modern browsers have policies that restrict autoplay, especially if the sound is not muted. Autoplay is not guaranteed to work for all users." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is it legal to embed any YouTube video?" }), _jsx("p", { className: "text-muted-foreground", children: "If a video's owner has enabled embedding, it is generally permissible to embed it on your site. If they have disabled embedding for their video, it will not play on your site." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "The `<iframe>` (Inline Frame) HTML tag, which is the backbone of YouTube embeds, was first introduced by Microsoft in Internet Explorer 3 in 1996. It was not part of the official HTML standard until HTML 4.01 in 1999, but its utility was so apparent that it became a de facto standard long before that." })] })] })] }));
};
export default YouTubeEmbedCodeGeneratorTool;
