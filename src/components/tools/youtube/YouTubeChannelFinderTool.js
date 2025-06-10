import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { Search, AlertCircle, Users, Video, Eye } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
const YouTubeChannelFinderTool = () => {
    const [query, setQuery] = useState('');
    const [channels, setChannels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleSearch = async () => {
        if (!apiKey) {
            setError('YouTube API key is not configured. Please contact support.');
            toast.error("API Key Missing");
            return;
        }
        if (!query.trim()) {
            setError('Please enter a search query.');
            toast.error("Query is empty");
            return;
        }
        setError('');
        setIsLoading(true);
        setChannels([]);
        try {
            const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=channel&maxResults=12&key=${apiKey}`);
            const searchData = await searchResponse.json();
            if (searchData.error) {
                throw new Error(searchData.error.message);
            }
            if (!searchData.items || searchData.items.length === 0) {
                setChannels([]);
                toast.info("No channels found for this query.");
                return;
            }
            const channelIds = searchData.items.map((item) => item.snippet.channelId).join(',');
            const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${apiKey}`);
            const detailsData = await detailsResponse.json();
            if (detailsData.error) {
                throw new Error(detailsData.error.message);
            }
            const fetchedChannels = detailsData.items.map((item) => ({
                id: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl: item.snippet.thumbnails.default.url,
                subscriberCount: item.statistics.subscriberCount,
                videoCount: item.statistics.videoCount,
                viewCount: item.statistics.viewCount,
            }));
            setChannels(fetchedChannels);
            toast.success(`Found ${fetchedChannels.length} channels.`);
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Channel Finder" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Discover new channels or find specific ones with our powerful search tool. Enter any keyword, topic, or name to get a list of relevant YouTube channels along with their key statistics." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Find YouTube Channels" }), _jsx(CardDescription, { children: "Enter a query to search for channels." })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "text", placeholder: "e.g., 'Web Development Tutorials', 'Gordon Ramsay'", value: query, onChange: (e) => setQuery(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSearch(), className: "flex-grow" }), _jsxs(Button, { onClick: handleSearch, disabled: isLoading || !query.trim(), children: [_jsx(Search, { className: "mr-2 h-4 w-4" }), isLoading ? 'Searching...' : 'Search'] })] }), error && (_jsxs(Alert, { variant: "destructive", className: "mt-4", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] }))] })] }), channels.length > 0 && (_jsx("div", { className: "max-w-4xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: channels.map((channel) => (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex items-center gap-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: channel.thumbnailUrl, alt: channel.title }), _jsx(AvatarFallback, { children: channel.title.charAt(0) })] }), _jsx("a", { href: `https://youtube.com/channel/${channel.id}`, target: "_blank", rel: "noopener noreferrer", className: "font-bold hover:underline", children: channel.title })] }), _jsxs(CardContent, { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-muted-foreground line-clamp-3", children: channel.description }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-4 w-4" }), " ", Number(channel.subscriberCount).toLocaleString()] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Video, { className: "h-4 w-4" }), " ", Number(channel.videoCount).toLocaleString()] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "h-4 w-4" }), " ", Number(channel.viewCount).toLocaleString()] })] })] })] }, channel.id))) })), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is a YouTube Channel Finder?" }), _jsx("p", { className: "text-muted-foreground", children: "A YouTube Channel Finder is a search tool designed specifically to discover channels rather than individual videos. While YouTube's native search is powerful, it often prioritizes videos in its results. Our tool filters the search to return only channels, making it an ideal utility for users who want to find new creators in a specific niche, research competitors, or identify potential collaborators. By providing key statistics at a glance\u2014such as subscriber, view, and video counts\u2014it offers a comprehensive overview of each channel, helping you make informed decisions about who to watch, follow, or partner with." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the Channel Finder Effectively" }), _jsx("p", { className: "text-muted-foreground", children: "To get the most out of our Channel Finder, consider these tips:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Use Specific Keywords:" }), " Instead of a broad term like \"cooking,\" try a more specific query like \"vegan Italian recipes\" to find channels in a focused niche."] }), _jsxs("li", { children: [_jsx("strong", { children: "Search by Creator Name:" }), " If you know the name of a creator but can't remember their exact channel name or handle, this tool can help you find them quickly."] }), _jsxs("li", { children: [_jsx("strong", { children: "Analyze the Statistics:" }), " Use the subscriber, view, and video counts to gauge a channel's size and activity level. A high view count with a moderate number of subscribers can indicate highly engaging content."] }), _jsxs("li", { children: [_jsx("strong", { children: "Explore Different Niches:" }), " Use the tool to explore topics you're interested in and discover up-and-coming creators who might not yet be appearing in your recommended feeds."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Key Components of Our Channel Finder" }), _jsx("p", { className: "text-muted-foreground", children: "Our tool is built to provide a seamless and informative search experience." }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Keyword-Based Search:" }), " Find channels by topic, niche, or creator name."] }), _jsxs("li", { children: [_jsx("strong", { children: "At-a-Glance Statistics:" }), " Each result includes subscriber, video, and total view counts."] }), _jsxs("li", { children: [_jsx("strong", { children: "Direct Links to Channels:" }), " Easily navigate to any channel's page with a single click."] }), _jsxs("li", { children: [_jsx("strong", { children: "Clean, Ad-Friendly Interface:" }), " A user-friendly layout that is free of clutter and intrusive ads."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "How does the search work?" }), _jsx("p", { className: "text-muted-foreground", children: "The tool uses the official YouTube API to search for channels that match your query. It then fetches detailed statistics for the top results to provide you with a comprehensive overview." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can I find private or hidden channels?" }), _jsx("p", { className: "text-muted-foreground", children: "No, the tool can only find public YouTube channels that are indexed by YouTube's search algorithm." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is this tool free to use?" }), _jsx("p", { className: "text-muted-foreground", children: "Yes, our YouTube Channel Finder is completely free to use with no limitations on the number of searches." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "The YouTube search algorithm processes billions of queries every day, making it the second-largest search engine in the world after Google. Unlike Google, which primarily indexes text, YouTube's algorithm has the complex task of understanding the content of videos to match them with user queries, a process that involves analyzing titles, descriptions, tags, and even the video's transcript." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Related Tools" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs("a", { href: "/tools/youtube-tools/youtube-channel-statistics", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Channel Statistics" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Get a detailed performance analysis of any channel." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-channel-id-extractor", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Channel ID Extractor" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Quickly find the unique ID of any channel." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-tag-generator", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Tag Generator" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Generate SEO-optimized tags for your videos." })] })] })] })] })] }));
};
export default YouTubeChannelFinderTool;
