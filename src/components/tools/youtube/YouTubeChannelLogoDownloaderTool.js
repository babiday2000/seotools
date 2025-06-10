import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { Download, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
const getChannelIdentifier = (url) => {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const channelIdMatch = pathname.match(/\/channel\/([a-zA-Z0-9_-]+)/);
        if (channelIdMatch)
            return { type: 'id', value: channelIdMatch[1] };
        const handleMatch = pathname.match(/\/@([a-zA-Z0-9_.-]+)/);
        if (handleMatch)
            return { type: 'handle', value: handleMatch[1] };
        const customUrlMatch = pathname.match(/\/c\/([a-zA-Z0-9_.-]+)/);
        if (customUrlMatch)
            return { type: 'custom', value: customUrlMatch[1] };
        const userUrlMatch = pathname.match(/\/user\/([a-zA-Z0-9_.-]+)/);
        if (userUrlMatch)
            return { type: 'custom', value: userUrlMatch[1] };
        const parts = pathname.split('/').filter(p => p);
        if (parts.length === 1) {
            if (parts[0].startsWith('@'))
                return { type: 'handle', value: parts[0].substring(1) };
            if (parts[0].startsWith('UC') || parts[0].startsWith('HC'))
                return { type: 'id', value: parts[0] };
            return { type: 'custom', value: parts[0] };
        }
        return { type: 'invalid', value: 'No valid identifier found in URL.' };
    }
    catch {
        if (url.startsWith('@'))
            return { type: 'handle', value: url.substring(1) };
        if (url.startsWith('UC') || url.startsWith('HC'))
            return { type: 'id', value: url };
        if (url.match(/^[a-zA-Z0-9_.-]+$/))
            return { type: 'custom', value: url };
        return { type: 'invalid', value: 'Invalid input format.' };
    }
};
const YouTubeChannelLogoDownloaderTool = () => {
    const [url, setUrl] = useState('');
    const [channelInfo, setChannelInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleFetchLogo = async () => {
        if (!apiKey) {
            setError('YouTube API key is not configured.');
            toast.error("API Key Missing");
            return;
        }
        setError('');
        setIsLoading(true);
        setChannelInfo(null);
        const identifier = getChannelIdentifier(url);
        if (identifier.type === 'invalid') {
            setError(`Invalid YouTube Channel URL or identifier. ${identifier.value}`);
            setIsLoading(false);
            return;
        }
        try {
            let channelId = '';
            if (identifier.type === 'id') {
                channelId = identifier.value;
            }
            else {
                let searchParam = '';
                if (identifier.type === 'handle')
                    searchParam = `&forHandle=@${identifier.value}`;
                else if (identifier.type === 'custom')
                    searchParam = `&forUsername=${identifier.value}`;
                const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet${searchParam}&key=${apiKey}`);
                const searchData = await searchResponse.json();
                if (searchData.items && searchData.items.length > 0) {
                    channelId = searchData.items[0].id;
                }
                else {
                    throw new Error('Channel not found with the provided URL/handle.');
                }
            }
            const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`);
            const detailsData = await detailsResponse.json();
            if (detailsData.items && detailsData.items.length > 0) {
                const { id, snippet } = detailsData.items[0];
                setChannelInfo({
                    id,
                    title: snippet.title,
                    logoUrl: snippet.thumbnails.high.url,
                });
                toast.success("Logo fetched successfully!");
            }
            else {
                throw new Error('Could not retrieve channel details.');
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setError(errorMessage);
            toast.error("Error", { description: errorMessage });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Channel Logo Downloader" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Easily download the high-quality profile picture of any YouTube channel. Perfect for designers, fans, or anyone needing a channel's logo." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Download Channel Logo" }), _jsx(CardDescription, { children: "Enter a YouTube channel URL, @handle, or ID to get its logo." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "text", placeholder: "e.g., https://www.youtube.com/@MrBeast", value: url, onChange: (e) => setUrl(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleFetchLogo(), className: "flex-grow" }), _jsx(Button, { onClick: handleFetchLogo, disabled: isLoading || !url.trim(), children: isLoading ? _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : 'Get Logo' })] }), error && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] }))] }) })] }), channelInfo && (_jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: ["Logo for ", channelInfo.title] }) }), _jsxs(CardContent, { className: "flex flex-col items-center gap-4", children: [_jsxs(Avatar, { className: "w-48 h-48", children: [_jsx(AvatarImage, { src: channelInfo.logoUrl, alt: channelInfo.title }), _jsx(AvatarFallback, { children: channelInfo.title.charAt(0) })] }), _jsx(Button, { asChild: true, children: _jsxs("a", { href: channelInfo.logoUrl, download: true, target: "_blank", rel: "noopener noreferrer", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Download High-Resolution Logo"] }) })] })] })), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is a YouTube Channel Logo?" }), _jsx("p", { className: "text-muted-foreground", children: "A YouTube channel logo, also known as a profile picture, is the primary visual identifier for a creator on the platform. It appears next to every video, comment, and channel name, making it a crucial element of a channel's brand identity. A strong, recognizable logo helps viewers quickly identify your content in crowded subscription feeds and search results. It's the face of the channel, and our downloader tool allows you to easily save a high-quality version of this important asset." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Why Download a Channel Logo?" }), _jsx("p", { className: "text-muted-foreground", children: "There are many legitimate reasons why you might need to download a channel's logo:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Design and Branding Analysis:" }), " Marketers and designers often study the logos of successful channels to understand branding trends and gather inspiration."] }), _jsxs("li", { children: [_jsx("strong", { children: "Content Creation:" }), " If you are creating a video or blog post that reviews, discusses, or features another channel, using their logo is essential for context (always follow fair use guidelines)."] }), _jsxs("li", { children: [_jsx("strong", { children: "Personal Use:" }), " Fans may want to download a logo for use as a profile picture on other platforms or for personal creative projects."] }), _jsxs("li", { children: [_jsx("strong", { children: "Archiving:" }), " Creators can use this tool to save a high-quality copy of their own logo for their portfolio or brand kit."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the Logo Downloader" }), _jsx("p", { className: "text-muted-foreground", children: "Getting a channel's logo is a simple, three-step process:" }), _jsxs("ol", { className: "list-decimal list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Enter the Channel Identifier:" }), " Paste the channel's URL, @handle, or ID into the input field."] }), _jsxs("li", { children: [_jsx("strong", { children: "Fetch the Logo:" }), " Click the \"Get Logo\" button. Our tool will find the channel and display its profile picture."] }), _jsxs("li", { children: [_jsx("strong", { children: "Download:" }), " Click the \"Download High-Resolution Logo\" button to save the image to your device."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "What resolution will the logo be?" }), _jsx("p", { className: "text-muted-foreground", children: "The tool downloads the highest resolution version of the logo that the channel has uploaded, ensuring the best possible quality." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is it legal to use a downloaded logo?" }), _jsx("p", { className: "text-muted-foreground", children: "You must respect the copyright and trademark of the channel owner. Downloading for personal use or for commentary/criticism under fair use is generally acceptable. However, you should not use a channel's logo for commercial purposes or in a way that implies endorsement without permission." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Does this tool work for any channel?" }), _jsx("p", { className: "text-muted-foreground", children: "Yes, you can download the logo from any public YouTube channel. The tool cannot access logos from private or terminated channels." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "YouTube's original logo, used from 2005 to 2011, featured the slogan \"Broadcast Yourself\" inside a classic television-shaped screen. This reflected the platform's initial vision of being a personal broadcasting service for everyone, a mission that has remained at its core even as it has evolved into a global entertainment powerhouse." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Related Tools" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs("a", { href: "/tools/youtube-tools/youtube-channel-banner-downloader", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Channel Banner Downloader" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Download a channel's banner image in high resolution." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-channel-id-extractor", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Channel ID Extractor" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Quickly find the unique ID of any channel." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-channel-finder", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Channel Finder" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Discover new channels by keyword or topic." })] })] })] })] })] }));
};
export default YouTubeChannelLogoDownloaderTool;
