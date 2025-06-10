import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
const getChannelIdentifier = (url) => {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const parts = pathname.split('/').filter(p => p);
        if (parts[0] === 'channel' && parts[1])
            return { type: 'id', value: parts[1] };
        if (parts[0] === '@' && parts[1])
            return { type: 'handle', value: parts[1] };
        if (parts[0] === 'c' && parts[1])
            return { type: 'custom', value: parts[1] };
        if (parts[0] === 'user' && parts[1])
            return { type: 'custom', value: parts[1] };
        if (parts.length === 1) {
            if (parts[0].startsWith('@'))
                return { type: 'handle', value: parts[0].substring(1) };
            if (parts[0].startsWith('UC') || parts[0].startsWith('HC'))
                return { type: 'id', value: parts[0] };
            return { type: 'custom', value: parts[0] };
        }
        return { type: 'invalid', value: 'Could not parse URL.' };
    }
    catch {
        if (url.startsWith('@'))
            return { type: 'handle', value: url.substring(1) };
        if (url.startsWith('UC') || url.startsWith('HC'))
            return { type: 'id', value: url };
        if (url.match(/^[a-zA-Z0-9_.-]+$/))
            return { type: 'custom', value: url };
        return { type: 'invalid', value: 'Invalid input.' };
    }
};
const YouTubeVideoCountCheckerTool = () => {
    const [url, setUrl] = useState('');
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleCheck = async () => {
        if (!apiKey) {
            setError('API key is not configured.');
            return;
        }
        if (!url.trim()) {
            setError('Please enter a channel URL, ID, or handle.');
            return;
        }
        setIsLoading(true);
        setError('');
        setStats(null);
        const identifier = getChannelIdentifier(url);
        if (identifier.type === 'invalid') {
            setError(identifier.value);
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
                const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id${searchParam}&key=${apiKey}`);
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    channelId = data.items[0].id;
                }
                else {
                    throw new Error('Channel not found.');
                }
            }
            const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
            const detailsData = await detailsResponse.json();
            if (detailsData.items && detailsData.items.length > 0) {
                const { snippet, statistics } = detailsData.items[0];
                setStats({
                    title: snippet.title,
                    thumbnailUrl: snippet.thumbnails.default.url,
                    videoCount: statistics.videoCount,
                });
                toast.success("Video count fetched!");
            }
            else {
                throw new Error('Could not retrieve channel statistics.');
            }
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : 'An error occurred.';
            setError(msg);
            toast.error(msg);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Video Count Checker" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Quickly find out the total number of public videos on any YouTube channel." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Video Count Checker" }), _jsx(CardDescription, { children: "Enter a channel URL, ID, or @handle to see its total video count." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "text", placeholder: "e.g., https://www.youtube.com/c/Google", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow" }), _jsx(Button, { onClick: handleCheck, disabled: isLoading || !url.trim(), children: isLoading ? _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : 'Check Count' })] }), error && (_jsxs(Alert, { variant: "destructive", className: "mt-4", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] }))] })] }), stats && (_jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: stats.thumbnailUrl, alt: stats.title }), _jsx(AvatarFallback, { children: stats.title.charAt(0) })] }), _jsx(CardTitle, { children: stats.title })] }) }), _jsxs(CardContent, { className: "text-center", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Total Public Videos" }), _jsx("p", { className: "text-6xl font-bold", children: Number(stats.videoCount).toLocaleString() })] })] })), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is a YouTube Video Count Checker?" }), _jsx("p", { className: "text-muted-foreground", children: "A YouTube Video Count Checker is an online tool designed to provide the exact number of public videos uploaded to a specific YouTube channel. For content creators, marketers, and analysts, this metric is more than just a number\u2014it's a reflection of a channel's content strategy, consistency, and overall growth trajectory. Manually counting videos, especially for channels with extensive libraries, is impractical. This tool automates the process, delivering precise data in seconds. By simply entering a channel's URL, ID, or handle, users can get an instant snapshot of its content volume, which is crucial for competitive analysis, content planning, and performance tracking." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Factors Affecting Video Count Accuracy" }), _jsx("p", { className: "text-muted-foreground", children: "The accuracy of the video count is primarily dependent on the YouTube API. Our tool queries the API for the most up-to-date information. However, several factors can influence the number you see:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Public vs. Private/Unlisted Videos:" }), " The tool only counts public videos. Private and unlisted videos are not included in the total provided by the API."] }), _jsxs("li", { children: [_jsx("strong", { children: "Deleted Videos:" }), " If a creator deletes videos, the total count will decrease accordingly."] }), _jsxs("li", { children: [_jsx("strong", { children: "API Caching:" }), " YouTube's API may have a slight delay in updating statistics. While generally minimal, this can sometimes cause a minor discrepancy."] }), _jsxs("li", { children: [_jsx("strong", { children: "Channel Permissions:" }), " In rare cases, channel settings might restrict full data access, although this is uncommon for public channels."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Key Components of Our Tool" }), _jsx("p", { className: "text-muted-foreground", children: "Our YouTube Video Count Checker is built with simplicity and power in mind. Here are its key features:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Multiple Input Formats:" }), " Accepts channel URLs, IDs, and @handles for maximum flexibility."] }), _jsxs("li", { children: [_jsx("strong", { children: "Real-Time Data:" }), " Fetches live data directly from the YouTube API for the most current count."] }), _jsxs("li", { children: [_jsx("strong", { children: "User-Friendly Interface:" }), " A clean, intuitive design that makes it easy for anyone to use."] }), _jsxs("li", { children: [_jsx("strong", { children: "Fast and Efficient:" }), " Optimized for speed, delivering results almost instantly."] }), _jsxs("li", { children: [_jsx("strong", { children: "Secure and Private:" }), " We do not store any of the data you enter. Your searches are completely private."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the YouTube Video Count Checker" }), _jsx("p", { className: "text-muted-foreground", children: "Finding the video count of a channel is a straightforward process with our tool:" }), _jsxs("ol", { className: "list-decimal list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Enter the Channel Identifier:" }), " Copy and paste the YouTube channel's URL, ID, or @handle into the input field."] }), _jsxs("li", { children: [_jsx("strong", { children: "Click \"Check Count\":" }), " Hit the button to initiate the search."] }), _jsxs("li", { children: [_jsx("strong", { children: "View the Results:" }), " The tool will display the channel's name, thumbnail, and the total number of public videos."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is this tool free to use?" }), _jsx("p", { className: "text-muted-foreground", children: "Yes, our YouTube Video Count Checker is completely free. There are no hidden charges or subscription fees." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can I check the video count for any YouTube channel?" }), _jsx("p", { className: "text-muted-foreground", children: "You can check the video count for any public YouTube channel. Private channels or those with specific restrictions may not be accessible." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "How accurate is the video count?" }), _jsx("p", { className: "text-muted-foreground", children: "The count is highly accurate as it is fetched directly from the official YouTube API. It reflects the total number of public videos at the time of your query." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Do I need a YouTube API key to use this tool?" }), _jsx("p", { className: "text-muted-foreground", children: "No, you do not need your own API key. Our tool handles all the API interactions for you." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "The first video ever uploaded to YouTube was titled \"Me at the zoo,\" posted on April 23, 2005, by co-founder Jawed Karim. As of 2024, the platform has grown to host billions of videos, with over 500 hours of content uploaded every single minute!" })] })] })] }));
};
export default YouTubeVideoCountCheckerTool;
