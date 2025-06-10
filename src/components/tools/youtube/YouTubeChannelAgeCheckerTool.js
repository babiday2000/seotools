import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { Calendar, AlertCircle, BadgeCheck } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
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
const YouTubeChannelAgeCheckerTool = () => {
    const [url, setUrl] = useState('');
    const [channelInfo, setChannelInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleCheck = async () => {
        if (!apiKey) {
            setError('YouTube API key is not configured. Please contact support.');
            toast.error("API Key Missing", { description: "The YouTube API key is not available." });
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
                    // Find the most relevant channel, often the first result matches the handle/custom URL
                    const foundChannel = searchData.items.find((item) => item.snippet.channelTitle.toLowerCase() === identifier.value.toLowerCase() ||
                        item.snippet.customUrl?.toLowerCase() === `@${identifier.value.toLowerCase()}`) || searchData.items[0];
                    channelId = foundChannel.id.channelId || foundChannel.id;
                }
                else {
                    throw new Error('Channel not found with the provided URL/handle.');
                }
            }
            // Now fetch channel details with statistics
            const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
            if (!detailsResponse.ok) {
                const errorData = await detailsResponse.json();
                throw new Error(errorData.error?.message || 'Failed to fetch channel details.');
            }
            const detailsData = await detailsResponse.json();
            if (detailsData.items && detailsData.items.length > 0) {
                const { snippet, statistics } = detailsData.items[0];
                setChannelInfo({
                    id: detailsData.items[0].id,
                    title: snippet.title,
                    description: snippet.description,
                    publishedAt: snippet.publishedAt,
                    thumbnailUrl: snippet.thumbnails.high.url,
                    subscriberCount: statistics.subscriberCount,
                    viewCount: statistics.viewCount,
                    videoCount: statistics.videoCount,
                });
                toast.success("Channel found!", { description: `Displaying details for ${snippet.title}.` });
            }
            else {
                throw new Error('Could not retrieve channel details.');
            }
        }
        catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setError(errorMessage);
            toast.error("Error", { description: errorMessage });
        }
        finally {
            setIsLoading(false);
        }
    };
    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
        }).format(date);
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Channel Age Checker" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Discover the creation date of any YouTube channel with our Channel Age Checker. This simple tool tells you how long a channel has been active on the platform, a piece of information that can be surprisingly useful for analysis and understanding a creator's journey. Whether you're a fan curious about the origins of your favorite content creator, a marketer assessing a channel's long-term performance, or a fellow creator looking for inspiration, knowing a channel's age provides critical context. It helps you trace the timeline of their growth, understand the dedication behind their success, and appreciate the milestones they've achieved along the way. Our tool makes this discovery process effortless\u2014just paste a channel URL to begin." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Channel Age Finder" }), _jsx(CardDescription, { children: "Enter a YouTube channel's URL to find out exactly when it was created and see its current stats." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "url", placeholder: "Enter YouTube Channel URL (e.g., https://www.youtube.com/@MrBeast)", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow text-base" }), _jsx(Button, { onClick: handleCheck, disabled: isLoading || !url.trim(), className: "text-base px-6", children: isLoading ? 'Checking...' : 'Check Channel Age' })] }), error && (_jsxs("div", { className: "flex items-center justify-center gap-2 text-destructive", children: [_jsx(AlertCircle, { className: "h-5 w-5" }), _jsx("p", { children: error })] })), channelInfo && (_jsxs(Card, { className: "overflow-hidden animate-fade-in", children: [_jsxs(CardHeader, { className: "flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left", children: [_jsxs(Avatar, { className: "h-24 w-24 border-4 border-background", children: [_jsx(AvatarImage, { src: channelInfo.thumbnailUrl, alt: channelInfo.title }), _jsx(AvatarFallback, { children: channelInfo.title.charAt(0) })] }), _jsxs("div", { className: "flex-grow", children: [_jsxs(CardTitle, { className: "text-2xl font-bold flex items-center gap-2 justify-center sm:justify-start", children: [channelInfo.title, " ", _jsx(BadgeCheck, { className: "h-6 w-6 text-blue-500" })] }), _jsx("p", { className: "text-muted-foreground mt-1 max-w-xl line-clamp-2", children: channelInfo.description })] })] }), _jsxs(CardContent, { className: "space-y-4 pt-4", children: [_jsxs("div", { className: "bg-muted/50 p-6 rounded-lg text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 text-lg font-semibold text-foreground", children: [_jsx(Calendar, { className: "h-5 w-5" }), _jsx("span", { children: "Channel Creation Date" })] }), _jsx("p", { className: "text-3xl font-extrabold text-primary mt-2", children: formatDate(channelInfo.publishedAt) }), _jsxs("p", { className: "text-muted-foreground mt-1 text-lg", children: ["(That's about ", _jsx("span", { className: "font-semibold text-foreground", children: formatDistanceToNow(parseISO(channelInfo.publishedAt)) }), " ago)"] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-center", children: [_jsxs("div", { className: "bg-card border p-4 rounded-lg", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Subscribers" }), _jsx("p", { className: "text-2xl font-bold", children: Number(channelInfo.subscriberCount).toLocaleString() })] }), _jsxs("div", { className: "bg-card border p-4 rounded-lg", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Total Views" }), _jsx("p", { className: "text-2xl font-bold", children: Number(channelInfo.viewCount).toLocaleString() })] }), _jsxs("div", { className: "bg-card border p-4 rounded-lg", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Total Videos" }), _jsx("p", { className: "text-2xl font-bold", children: Number(channelInfo.videoCount).toLocaleString() })] })] })] })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is a YouTube Channel Age Checker?" }), _jsx("p", { className: "text-muted-foreground", children: "A YouTube Channel Age Checker is a specialized tool that determines the exact date a YouTube channel was created. This information, often referred to as the channel's \"birthday,\" offers valuable insights into its history and journey on the platform. For aspiring creators, it can be motivating to see how long it took successful channels to grow. For marketers, it provides context for a channel's authority and experience. Our tool simplifies this process by fetching the publication date directly from the YouTube API, presenting it in a clear and understandable format." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Factors Influencing a Channel's Age" }), _jsx("p", { className: "text-muted-foreground", children: "While the creation date is a fixed point, several factors contribute to what a channel's age represents:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Content Strategy Evolution:" }), " An older channel may have pivoted its content niche over time. Understanding its age helps trace this evolution."] }), _jsxs("li", { children: [_jsx("strong", { children: "Consistency and Activity:" }), " A ten-year-old channel with only 50 videos tells a different story than a two-year-old channel with 500. Age combined with video count reveals the creator's posting frequency."] }), _jsxs("li", { children: [_jsx("strong", { children: "Algorithm Changes:" }), " YouTube's algorithm has changed significantly over the years. A channel's age can indicate how it has adapted to these shifts to stay relevant."] }), _jsxs("li", { children: [_jsx("strong", { children: "Building Authority:" }), " Generally, older channels that have consistently produced quality content are viewed as more authoritative by both YouTube and its audience."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Key Components of Our Channel Age Checker" }), _jsx("p", { className: "text-muted-foreground", children: "Our tool is designed to be both powerful and easy to use, offering a suite of features to give you a comprehensive overview:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Precise Date and Time:" }), " Get the exact moment the channel was created, down to the hour and minute."] }), _jsxs("li", { children: [_jsx("strong", { children: "Relative Age Calculation:" }), " See the channel's age calculated in years, months, and days for easy reference."] }), _jsxs("li", { children: [_jsx("strong", { children: "Comprehensive Statistics:" }), " Alongside the age, view key metrics like subscriber, view, and video counts."] }), _jsxs("li", { children: [_jsx("strong", { children: "Universal URL Support:" }), " Works with modern @handle URLs, classic /channel/ URLs, and legacy /c/ and /user/ formats."] }), _jsxs("li", { children: [_jsx("strong", { children: "Ad-Friendly and Clean Interface:" }), " Our tool is designed to be Adsense-friendly, ensuring a smooth user experience without intrusive pop-ups."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the YouTube Channel Age Checker" }), _jsx("p", { className: "text-muted-foreground", children: "Checking a channel's age is a simple, three-step process:" }), _jsxs("ol", { className: "list-decimal list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Find the Channel URL:" }), " Go to the YouTube channel you want to check and copy its URL from your browser's address bar."] }), _jsxs("li", { children: [_jsx("strong", { children: "Paste and Check:" }), " Paste the URL into the input field on our tool and click the \"Check Channel Age\" button."] }), _jsxs("li", { children: [_jsx("strong", { children: "Explore the Results:" }), " The tool will instantly display the channel's creation date, its age, and other vital statistics."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can this tool see when a private channel was created?" }), _jsx("p", { className: "text-muted-foreground", children: "No, the YouTube API only provides data for public channels. You cannot use this tool to find the age of a private or terminated channel." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is the information provided by this tool accurate?" }), _jsx("p", { className: "text-muted-foreground", children: "Yes, all data is fetched in real-time from the official YouTube API, ensuring the highest level of accuracy." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Why is knowing a channel's age important?" }), _jsx("p", { className: "text-muted-foreground", children: "It provides valuable context for a channel's growth and success. It helps in competitive analysis, content strategy assessment, and understanding a creator's journey on the platform." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "While \"Me at the zoo\" was the first video uploaded, the first-ever YouTube channel was created by Jawed Karim on the same day, April 23, 2005. The second channel, \"smosh,\" was created just a few months later and became one of the platform's first breakout stars, demonstrating that even in the earliest days, consistency and unique content were key to success." })] })] })] }));
};
export default YouTubeChannelAgeCheckerTool;
