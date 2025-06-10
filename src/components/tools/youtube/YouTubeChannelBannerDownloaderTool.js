import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Image as ImageIcon, HelpCircle, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// Helper to extract channel ID or handle from various YouTube URL formats
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
        return { type: 'invalid', value: 'No valid identifier found in URL.' };
    }
    catch {
        return { type: 'invalid', value: 'Invalid URL format.' };
    }
};
const YouTubeChannelBannerDownloaderTool = () => {
    const [url, setUrl] = useState('');
    const [channelInfo, setChannelInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleGetBanner = async () => {
        if (!apiKey) {
            setError('YouTube API key is not configured. This tool is currently disabled.');
            toast.error("API Key Missing", { description: "The site administrator needs to configure the YouTube API key." });
            return;
        }
        const identifier = getChannelIdentifier(url);
        if (identifier.type === 'invalid') {
            setError(`Invalid YouTube Channel URL. ${identifier.value}`);
            setChannelInfo(null);
            return;
        }
        setError('');
        setIsLoading(true);
        setChannelInfo(null);
        try {
            let channelId = '';
            if (identifier.type === 'id') {
                channelId = identifier.value;
            }
            else {
                // For handles or custom URLs, we need to search first
                const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${identifier.value}&type=channel&key=${apiKey}`);
                const searchData = await searchResponse.json();
                if (searchData.items && searchData.items.length > 0) {
                    const foundChannel = searchData.items.find((item) => item.snippet.channelTitle.toLowerCase() === identifier.value.toLowerCase() ||
                        item.snippet.customUrl?.toLowerCase() === `@${identifier.value.toLowerCase()}`) || searchData.items[0];
                    channelId = foundChannel.id.channelId || foundChannel.id;
                }
                else {
                    throw new Error('Channel not found with the provided URL/handle.');
                }
            }
            const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&id=${channelId}&key=${apiKey}`);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const item = data.items[0];
                const snippet = item.snippet;
                const brandingSettings = item.brandingSettings;
                const bannerUrl = brandingSettings?.image?.bannerExternalUrl || null;
                if (!bannerUrl) {
                    setError('This channel does not have a banner image or it is not accessible via the API.');
                    toast.error("No Banner Found", { description: "The channel might not have uploaded a banner." });
                    setIsLoading(false);
                    return;
                }
                setChannelInfo({
                    id: item.id,
                    title: snippet.title,
                    thumbnail: snippet.thumbnails.default.url,
                    bannerUrl: bannerUrl,
                });
                toast.success("Channel banner loaded successfully!");
            }
            else {
                setError('Channel not found. Please check the URL.');
                toast.error("Channel Not Found", { description: "The Channel ID might be incorrect or the channel is private." });
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An API error occurred. Please try again later.';
            setError(errorMessage);
            toast.error("Error", { description: errorMessage });
            console.error(err);
        }
        finally {
            setIsLoading(false);
        }
    };
    const bannerResolutions = [
        { name: 'TV (2560px)', param: '=w2560' },
        { name: 'Desktop (2120px)', param: '=w2120' },
        { name: 'Tablet (1707px)', param: '=w1707' },
        { name: 'Mobile (1060px)', param: '=w1060' },
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Channel Banner Downloader" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Download the high-resolution channel art from any YouTube channel. This tool is perfect for designers, marketers, and content creators who need to analyze, archive, or draw inspiration from channel branding." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Banner Downloader" }), _jsx(CardDescription, { children: "Paste the YouTube channel URL below to fetch its banner." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "url", placeholder: "Enter YouTube Channel URL (e.g., youtube.com/channel/UC...)", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow" }), _jsx(Button, { onClick: handleGetBanner, disabled: isLoading || !url.trim(), children: isLoading ? _jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), " Fetching..."] }) : 'Get Banner' })] }), error && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] })), channelInfo && channelInfo.bannerUrl && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: channelInfo.thumbnail, alt: `${channelInfo.title} profile`, className: "w-16 h-16 rounded-full" }), _jsxs("div", { children: [_jsx(CardTitle, { children: channelInfo.title }), _jsx(CardDescription, { children: "Banner image and download options below." })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "border rounded-lg overflow-hidden", children: _jsx("img", { src: channelInfo.bannerUrl, alt: `${channelInfo.title} banner`, className: "w-full object-cover" }) }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: bannerResolutions.map(({ name, param }) => (_jsx(Button, { asChild: true, children: _jsxs("a", { href: `${channelInfo.bannerUrl}${param}`, download: true, target: "_blank", rel: "noopener noreferrer", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), name] }) }, name))) })] })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto grid gap-8 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(ImageIcon, { className: "h-6 w-6 text-primary" }), " What is a Channel Banner?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "A YouTube channel banner, also known as \"channel art,\" is the large header image that appears at the top of a channel's page. It's a powerful branding tool that serves as a digital billboard, giving visitors an immediate sense of the channel's personality, niche, and content style." }), _jsxs("p", { children: ["The recommended size is ", _jsx("strong", { children: "2560 x 1440 pixels" }), ", but the most critical part is the central \"safe area\" of ", _jsx("strong", { children: "1546 x 423 pixels" }), ", which is the only part of the image guaranteed to be visible on all devices, from large TVs to small mobile screens."] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(HelpCircle, { className: "h-6 w-6 text-primary" }), " Why Download a Banner?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Downloading channel art is a common practice for several legitimate reasons:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Inspiration & Analysis:" }), " Study the design choices, color palettes, and layouts of successful channels in your niche."] }), _jsxs("li", { children: [_jsx("strong", { children: "Design Mockups:" }), " Graphic designers can use a channel's existing banner as a placeholder or reference when creating a new design for a client."] }), _jsxs("li", { children: [_jsx("strong", { children: "Archiving:" }), " Save a high-quality version of your own channel's banner for your portfolio or to track your brand's evolution over time."] }), _jsxs("li", { children: [_jsx("strong", { children: "Fair Use Content:" }), " Use banner images in video essays, reviews, or commentary about a specific channel or creator."] })] }), _jsx("p", { className: "font-semibold", children: "Always respect copyright and intellectual property. Use downloaded assets responsibly." })] })] })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-6 w-6 text-primary" }), " Best Practices for Banners"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("ul", { className: "list-disc list-inside space-y-3 text-muted-foreground", children: [_jsxs("li", { children: [_jsx("strong", { children: "Prioritize the Safe Area:" }), " All essential elements\u2014logos, key text, and main visuals\u2014must be placed within the 1546 x 423 pixel central safe area to ensure visibility on every device."] }), _jsxs("li", { children: [_jsx("strong", { children: "High-Resolution is Key:" }), " Always upload a 2560 x 1440 pixel image to ensure your banner looks sharp and professional on large displays like TVs and desktop monitors."] }), _jsxs("li", { children: [_jsx("strong", { children: "Communicate Your Value Proposition:" }), " Your banner should instantly tell a new visitor what your channel is about and why they should subscribe. Use a short tagline or visuals that represent your content."] }), _jsxs("li", { children: [_jsx("strong", { children: "Maintain Brand Consistency:" }), " Use the same fonts, colors, and logo that you use in your video thumbnails and other branding materials. This creates a cohesive and recognizable identity."] }), _jsxs("li", { children: [_jsx("strong", { children: "Keep it Clean and Uncluttered:" }), " A simple, focused design is more effective than a busy one. Avoid filling the entire space with text and images; use negative space to your advantage."] }), _jsxs("li", { children: [_jsx("strong", { children: "Include a Subtle Call-to-Action:" }), " You can add text like \"New Videos Every Friday\" or arrows pointing towards your social media links to guide visitor actions."] })] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the Banner Downloader" }), _jsx("p", { className: "text-muted-foreground", children: "Downloading a channel's banner is a simple process with our tool:" }), _jsxs("ol", { className: "list-decimal list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Enter the Channel URL:" }), " Paste the URL of the YouTube channel you want to download the banner from."] }), _jsxs("li", { children: [_jsx("strong", { children: "Fetch the Banner:" }), " Click the \"Get Banner\" button to load the channel's information and banner image."] }), _jsxs("li", { children: [_jsx("strong", { children: "Choose a Resolution:" }), " Select the desired resolution for your download. We provide options for TV, desktop, tablet, and mobile to suit your needs."] }), _jsxs("li", { children: [_jsx("strong", { children: "Download the Image:" }), " Click the download button for your chosen resolution to save the banner image to your device."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can I download a banner from any channel?" }), _jsx("p", { className: "text-muted-foreground", children: "You can download the banner from any public YouTube channel that has uploaded one. If a channel has not set a banner, or if it's a private channel, the tool will not be able to retrieve an image." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is it legal to download YouTube channel banners?" }), _jsx("p", { className: "text-muted-foreground", children: "Downloading a banner for personal use, such as for inspiration or analysis, is generally acceptable under fair use. However, you must respect copyright laws. Do not re-upload or use the banner for commercial purposes without explicit permission from the channel owner." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "What is the highest resolution I can download?" }), _jsx("p", { className: "text-muted-foreground", children: "The tool allows you to download the banner in its highest available resolution, which is typically 2560 pixels wide, suitable for TV displays." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "The concept of a \"banner\" on a web page is a direct descendant of the physical banners used for centuries in parades, protests, and storefronts. In the digital world, the YouTube channel banner serves the same purpose: to grab attention and communicate a message or identity instantly." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Related Tools" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs("a", { href: "/tools/youtube-tools/youtube-channel-logo-downloader", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Channel Logo Downloader" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Download a channel's profile picture in high quality." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-channel-statistics", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Channel Statistics" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Analyze the performance and growth of any YouTube channel." })] }), _jsxs("a", { href: "/tools/image-editing-tools/image-resizer", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "Image Resizer" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Resize any image to your desired dimensions." })] })] })] })] })] }));
};
export default YouTubeChannelBannerDownloaderTool;
