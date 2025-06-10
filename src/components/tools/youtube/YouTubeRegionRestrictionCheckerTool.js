import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe, Lock, Loader2, HelpCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};
const YouTubeRegionRestrictionCheckerTool = () => {
    const [url, setUrl] = useState('');
    const [videoInfo, setVideoInfo] = useState(null);
    const [restrictionInfo, setRestrictionInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleCheck = async () => {
        if (!apiKey) {
            setError('YouTube API key is not configured. This tool is currently disabled.');
            toast.error("API Key Missing", { description: "The site administrator needs to configure the YouTube API key." });
            return;
        }
        const videoId = getYouTubeVideoId(url);
        if (!videoId) {
            setError('Please enter a valid YouTube video URL.');
            toast.error("Invalid URL", { description: "Make sure the URL points to a valid YouTube video." });
            return;
        }
        setError('');
        setIsLoading(true);
        setRestrictionInfo(null);
        setVideoInfo(null);
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const item = data.items[0];
                const snippet = item.snippet;
                const contentDetails = item.contentDetails;
                setVideoInfo({
                    title: snippet.title,
                    thumbnail: snippet.thumbnails.medium.url,
                });
                const regionRestriction = contentDetails.regionRestriction;
                if (regionRestriction) {
                    if (regionRestriction.allowed) {
                        setRestrictionInfo({ type: 'allowed', countries: regionRestriction.allowed });
                    }
                    else if (regionRestriction.blocked) {
                        setRestrictionInfo({ type: 'blocked', countries: regionRestriction.blocked });
                    }
                    else {
                        setRestrictionInfo({ type: 'none', countries: [] });
                    }
                }
                else {
                    setRestrictionInfo({ type: 'none', countries: [] });
                }
                toast.success("Restriction check complete!");
            }
            else {
                setError('Video not found. Please check the URL.');
                toast.error("Video Not Found", { description: "The video might be private or the URL incorrect." });
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
    const renderRestrictionResult = () => {
        if (!restrictionInfo)
            return null;
        if (restrictionInfo.type === 'none') {
            return (_jsxs("div", { className: "flex items-center gap-4 p-4 border rounded-md bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700", children: [_jsx(Globe, { className: "h-8 w-8 text-green-500" }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-green-800 dark:text-green-300", children: "Available Worldwide" }), _jsx("p", { className: "text-sm text-green-600 dark:text-green-400", children: "This video has no region restrictions and can be viewed from any country." })] })] }));
        }
        const isAllowed = restrictionInfo.type === 'allowed';
        const title = isAllowed ? `Allowed only in ${restrictionInfo.countries.length} countries` : `Blocked in ${restrictionInfo.countries.length} countries`;
        const description = isAllowed ? 'This video can only be viewed in the following countries:' : 'This video is not available in the following countries:';
        return (_jsxs("div", { className: "p-4 border rounded-md bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx(Lock, { className: "h-8 w-8 text-yellow-500" }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-yellow-800 dark:text-yellow-300", children: title }), _jsx("p", { className: "text-sm text-yellow-600 dark:text-yellow-400", children: description })] })] }), _jsx("div", { className: "flex flex-wrap gap-2 max-h-48 overflow-y-auto bg-background p-2 rounded", children: restrictionInfo.countries.map(countryCode => (_jsx(Badge, { variant: "secondary", children: countryCode }, countryCode))) })] }));
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Region Restriction Checker" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Find out if a YouTube video is blocked or unavailable in certain countries. Our tool checks the global availability of any video, helping creators, marketers, and viewers understand its reach." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Region Checker" }), _jsx(CardDescription, { children: "Paste a YouTube video URL to check for regional restrictions." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "url", placeholder: "Enter YouTube Video URL...", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow" }), _jsx(Button, { onClick: handleCheck, disabled: isLoading || !url.trim(), children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Checking..."] })) : ('Check Restrictions') })] }), error && _jsx("p", { className: "text-destructive text-center sm:text-left", children: error }), videoInfo && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex gap-4 items-center", children: [_jsx("img", { src: videoInfo.thumbnail, alt: "Video thumbnail", className: "w-32 h-18 rounded-md object-cover" }), _jsxs("div", { className: "flex-grow", children: [_jsx(CardTitle, { className: "text-lg", children: videoInfo.title }), _jsx(CardDescription, { children: "Restriction status below." })] })] }) }), _jsx(CardContent, { children: renderRestrictionResult() })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto grid gap-8 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-primary" }), " What is Region Restriction?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Region restriction, also known as geoblocking, is a practice where access to content is limited based on the user's geographical location. On YouTube, this means a video might be fully available in one country but completely blocked in another." }), _jsx("p", { children: "This is enforced by content owners (the creators or rights holders) and is a common feature on the platform, primarily used to comply with legal and licensing agreements." })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(HelpCircle, { className: "h-6 w-6 text-primary" }), " Why Are Videos Restricted?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "There are several common reasons why a video might be geoblocked:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Music Licensing:" }), " The most frequent cause. A record label may only own the rights to distribute a song in specific countries."] }), _jsxs("li", { children: [_jsx("strong", { children: "Content Licensing:" }), " TV networks or movie studios often upload clips or full episodes, but their license only permits them to show this content in their home country."] }), _jsxs("li", { children: [_jsx("strong", { children: "Local Laws & Regulations:" }), " A video might be blocked in a specific country to comply with local laws regarding sensitive or controversial topics."] }), _jsxs("li", { children: [_jsx("strong", { children: "Creator's Choice:" }), " A creator might intentionally restrict a video to a specific market if the content is only relevant to that audience (e.g., a local promotion)."] })] })] })] })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(ShieldCheck, { className: "h-6 w-6 text-primary" }), " Navigating Restrictions"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold text-foreground", children: "For Viewers" }), _jsx("p", { className: "text-muted-foreground", children: "If you encounter a blocked video, the message \"This video is not available in your country\" will appear. While tools like VPNs (Virtual Private Networks) or proxies can sometimes bypass these restrictions by making it seem like you're browsing from another country, be aware that using them may violate YouTube's terms of service. Always proceed with caution and respect the creator's licensing choices." }), _jsx("h4", { className: "font-semibold text-foreground mt-4", children: "For Creators" }), _jsx("p", { className: "text-muted-foreground", children: "As a creator, you can manage region restrictions in the YouTube Studio. When uploading a video, you have the option to block or allow specific countries. This is crucial if you're using licensed content (like music) that has geographical limitations. Failing to set these restrictions correctly can lead to copyright claims or strikes against your channel. Always check the terms of any licensed assets you use." })] })] })] }));
};
export default YouTubeRegionRestrictionCheckerTool;
