import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Hash, HelpCircle, Loader2, CheckCircle } from 'lucide-react';
import { toast } from "sonner";
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
        // If no specific pattern matches, it might be a raw handle or ID
        const parts = pathname.split('/').filter(p => p);
        if (parts.length === 1) {
            if (parts[0].startsWith('@'))
                return { type: 'handle', value: parts[0].substring(1) };
            if (parts[0].startsWith('UC') || parts[0].startsWith('HC'))
                return { type: 'id', value: parts[0] };
            return { type: 'custom', value: parts[0] }; // Assume legacy username
        }
        return { type: 'invalid', value: 'No valid identifier found in URL.' };
    }
    catch {
        // Not a valid URL, maybe it's just a username or handle
        if (url.startsWith('@'))
            return { type: 'handle', value: url.substring(1) };
        if (url.startsWith('UC') || url.startsWith('HC'))
            return { type: 'id', value: url };
        if (url.match(/^[a-zA-Z0-9_.-]+$/))
            return { type: 'custom', value: url }; // Assume legacy username
        return { type: 'invalid', value: 'Invalid input format.' };
    }
};
const YouTubeChannelIDExtractorTool = () => {
    const [url, setUrl] = useState('');
    const [channelInfo, setChannelInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleExtract = async () => {
        if (!apiKey) {
            setError('YouTube API key is not configured on this site. This tool is currently disabled.');
            toast.error("API Key Missing", { description: "The site administrator needs to configure the YouTube API key." });
            return;
        }
        setError('');
        setIsLoading(true);
        setChannelInfo(null);
        const identifier = getChannelIdentifier(url);
        if (identifier.type === 'invalid') {
            setError(`Invalid YouTube Channel URL, handle, or ID. ${identifier.value}`);
            setIsLoading(false);
            return;
        }
        let apiUrl = 'https://www.googleapis.com/youtube/v3/channels?part=snippet';
        let searchParam = '';
        if (identifier.type === 'id')
            searchParam = `&id=${identifier.value}`;
        else if (identifier.type === 'handle')
            searchParam = `&forHandle=@${identifier.value}`;
        else if (identifier.type === 'custom')
            searchParam = `&forUsername=${identifier.value}`;
        if (!searchParam) {
            setError("Could not determine a valid search parameter from the input.");
            setIsLoading(false);
            return;
        }
        apiUrl += `${searchParam}&key=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const { id, snippet } = data.items[0];
                setChannelInfo({ id, title: snippet.title });
                toast.success("Channel ID found successfully!");
            }
            else {
                setError('Channel not found. Please double-check the URL, handle, or username. It may be incorrect or the channel may be private.');
                toast.error("Channel Not Found", { description: "Verify the input and try again." });
            }
        }
        catch (err) {
            setError('An API error occurred. Please try again later.');
            console.error(err);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Channel ID Extractor" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Find the unique, permanent Channel ID for any YouTube channel. This is an essential tool for developers, marketers, and anyone needing a stable identifier for a channel that never changes." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Channel ID Finder" }), _jsx(CardDescription, { children: "Paste a channel URL, @handle, or legacy username to find its official Channel ID." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "text", placeholder: "e.g., https://www.youtube.com/@mkbhd or MKBHD", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow text-base" }), _jsx(Button, { onClick: handleExtract, disabled: isLoading || !url.trim(), className: "text-base px-6", children: isLoading ? _jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }) : 'Find Channel ID' })] }), error && _jsx("p", { className: "text-destructive text-center sm:text-left", children: error }), channelInfo && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Result" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Channel Name" }), _jsx("p", { className: "font-semibold text-lg", children: channelInfo.title })] }) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1 flex-grow", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Channel ID" }), _jsx("p", { className: "font-mono text-sm bg-muted p-2 rounded", children: channelInfo.id })] }), _jsx(Button, { variant: "outline", size: "icon", className: "ml-4 flex-shrink-0", onClick: () => handleCopy(channelInfo.id), children: _jsx(Copy, { className: "h-4 w-4" }) })] })] })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto grid gap-8 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Hash, { className: "h-6 w-6 text-primary" }), " What is a Channel ID?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "A YouTube Channel ID is a unique identifier assigned to every channel upon creation. It's a 24-character alphanumeric string that typically starts with \"UC\"." }), _jsx("p", { children: "Unlike a channel's name or its vanity URL (@handle), which can be changed by the owner, the Channel ID is permanent and unchangeable. This makes it the most reliable and stable way to reference a specific channel for technical purposes." })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(HelpCircle, { className: "h-6 w-6 text-primary" }), " Why Do You Need It?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "While casual viewers rarely see it, the Channel ID is crucial for many advanced YouTube interactions:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Third-Party Apps:" }), " Tools like SocialBlade, TubeBuddy, and other analytics platforms require the Channel ID to access your data via the API."] }), _jsxs("li", { children: [_jsx("strong", { children: "API Development:" }), " It's the primary key used in YouTube Data API calls to fetch channel-specific data, playlists, and videos."] }), _jsxs("li", { children: [_jsx("strong", { children: "Subscription Links:" }), " Creating a direct, foolproof subscription link that won't break if the channel's handle changes."] }), _jsxs("li", { children: [_jsx("strong", { children: "Content Management:" }), " Correctly identifying a channel for whitelisting or blacklisting purposes in content systems."] })] })] })] })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-6 w-6 text-primary" }), " Pro Tips for Finding IDs"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("ul", { className: "list-disc list-inside space-y-3 text-muted-foreground", children: [_jsxs("li", { children: [_jsx("strong", { children: "Use the @handle:" }), " The most reliable modern method is to use the channel's handle (e.g., `@mkbhd`). It's unique and directly linked to the channel."] }), _jsxs("li", { children: [_jsx("strong", { children: "From a Video URL:" }), " If you have a URL to any video from the channel, you can find the Channel ID in the source code of the video page (search for `channelId`)."] }), _jsxs("li", { children: [_jsx("strong", { children: "Check the \"About\" Page:" }), " Sometimes, the direct channel URL containing the ID is available on the channel's \"About\" tab under the \"More information\" section."] }), _jsxs("li", { children: [_jsx("strong", { children: "Legacy Usernames:" }), " For very old channels, you might only have a legacy username (e.g., `PewDiePie`). Our tool can still find the ID for these."] })] }) })] })] }));
};
export default YouTubeChannelIDExtractorTool;
