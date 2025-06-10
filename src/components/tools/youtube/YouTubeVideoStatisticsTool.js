import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { AlertCircle, ThumbsUp, MessageSquare, Eye, Clock, Tag, Calendar, BarChart2, TrendingUp, Loader2 } from 'lucide-react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};
// Helper to format ISO 8601 duration
const formatDuration = (isoDuration) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = isoDuration.match(regex);
    if (!matches)
        return "0:00";
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    const seconds = matches[3] ? parseInt(matches[3], 10) : 0;
    let formatted = '';
    if (hours > 0) {
        formatted += `${hours}:`;
        formatted += `${String(minutes).padStart(2, '0')}:`;
    }
    else {
        formatted += `${minutes}:`;
    }
    formatted += String(seconds).padStart(2, '0');
    return formatted;
};
const YouTubeVideoStatisticsTool = () => {
    const [url, setUrl] = useState('');
    const [videoInfo, setVideoInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleFetchStats = async () => {
        const videoId = getYouTubeVideoId(url);
        if (!videoId) {
            setError('Please enter a valid YouTube video URL.');
            setVideoInfo(null);
            return;
        }
        if (!apiKey) {
            setError('YouTube API key is not configured. Please contact support.');
            setIsLoading(false);
            return;
        }
        setError('');
        setIsLoading(true);
        setVideoInfo(null);
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to fetch video data.');
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const { snippet, statistics, contentDetails } = data.items[0];
                setVideoInfo({
                    id: data.items[0].id,
                    title: snippet.title,
                    description: snippet.description,
                    publishedAt: snippet.publishedAt,
                    thumbnailUrl: snippet.thumbnails.maxres?.url || snippet.thumbnails.high.url,
                    channelTitle: snippet.channelTitle,
                    channelId: snippet.channelId,
                    duration: formatDuration(contentDetails.duration),
                    viewCount: statistics.viewCount,
                    likeCount: statistics.likeCount,
                    commentCount: statistics.commentCount,
                    tags: snippet.tags || null,
                });
                toast.success("Statistics loaded successfully!");
            }
            else {
                throw new Error('Video not found. Please check the URL and ensure it is public.');
            }
        }
        catch (err) {
            console.error(err);
            let errorMessage = 'An unexpected error occurred.';
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            toast.error("Error", { description: errorMessage });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Video Statistics" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Go beyond the surface and dive deep into the performance of any YouTube video. Get a comprehensive overview of key metrics to understand what makes content successful." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Statistics Tool" }), _jsx(CardDescription, { children: "Enter a video URL to fetch its detailed performance data." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "url", placeholder: "Enter YouTube Video URL (e.g., https://www.youtube.com/watch?v=...)", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow text-base" }), _jsxs(Button, { onClick: handleFetchStats, disabled: isLoading || !url.trim(), className: "text-base px-6", children: [isLoading ? _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : null, isLoading ? 'Fetching...' : 'Get Video Stats'] })] }), error && (_jsxs("div", { className: "flex items-center justify-center gap-2 text-destructive", children: [_jsx(AlertCircle, { className: "h-5 w-5" }), _jsx("p", { children: error })] })), videoInfo && (_jsxs(Card, { className: "animate-fade-in", children: [_jsxs(CardHeader, { children: [_jsx("img", { src: videoInfo.thumbnailUrl, alt: videoInfo.title, className: "rounded-lg mb-4 w-full aspect-video object-cover" }), _jsx(CardTitle, { className: "text-2xl font-bold", children: videoInfo.title }), _jsxs("a", { href: `https://www.youtube.com/channel/${videoInfo.channelId}`, target: "_blank", rel: "noopener noreferrer", className: "text-muted-foreground hover:text-primary transition-colors", children: ["by ", videoInfo.channelTitle] })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-center", children: [_jsxs("div", { className: "bg-card border p-4 rounded-lg", children: [_jsx(Eye, { className: "h-6 w-6 mx-auto mb-2 text-primary" }), _jsx("p", { className: "text-2xl font-bold", children: Number(videoInfo.viewCount).toLocaleString() }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Views" })] }), _jsxs("div", { className: "bg-card border p-4 rounded-lg", children: [_jsx(ThumbsUp, { className: "h-6 w-6 mx-auto mb-2 text-primary" }), _jsx("p", { className: "text-2xl font-bold", children: Number(videoInfo.likeCount).toLocaleString() }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Likes" })] }), _jsxs("div", { className: "bg-card border p-4 rounded-lg", children: [_jsx(MessageSquare, { className: "h-6 w-6 mx-auto mb-2 text-primary" }), _jsx("p", { className: "text-2xl font-bold", children: Number(videoInfo.commentCount).toLocaleString() }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Comments" })] }), _jsxs("div", { className: "bg-card border p-4 rounded-lg", children: [_jsx(Clock, { className: "h-6 w-6 mx-auto mb-2 text-primary" }), _jsx("p", { className: "text-2xl font-bold", children: videoInfo.duration }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Duration" })] })] }), _jsxs("div", { children: [_jsxs("h3", { className: "font-semibold text-lg mb-2 flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5" }), " Published"] }), _jsxs("p", { className: "text-muted-foreground", children: [format(parseISO(videoInfo.publishedAt), 'EEEE, MMMM d, yyyy'), " (", formatDistanceToNow(parseISO(videoInfo.publishedAt)), " ago)"] })] }), videoInfo.tags && videoInfo.tags.length > 0 && (_jsxs("div", { children: [_jsxs("h3", { className: "font-semibold text-lg mb-2 flex items-center gap-2", children: [_jsx(Tag, { className: "h-5 w-5" }), " Tags"] }), _jsx("div", { className: "flex flex-wrap gap-2", children: videoInfo.tags.map((tag, index) => (_jsx(Badge, { variant: "secondary", children: tag }, index))) })] })), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg mb-2", children: "Description" }), _jsx("p", { className: "text-muted-foreground whitespace-pre-wrap text-sm max-h-60 overflow-y-auto p-3 bg-muted/50 rounded-md", children: videoInfo.description || "No description provided." })] })] })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto grid gap-8 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(BarChart2, { className: "h-6 w-6 text-primary" }), " Understanding Video Performance"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Analyzing video statistics is essential for any creator aiming for growth. These numbers tell a story about how your content is received by your audience and discovered by new viewers. Key metrics like views, likes, and comments are direct indicators of engagement and appeal." }), _jsx("p", { children: "By tracking these metrics over time, you can make data-driven decisions. This tool provides a public snapshot, but for your own content, you should dive deeper into YouTube Analytics to study audience retention, click-through rate (CTR), and traffic sources to get the full picture of what drives your channel's success." })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "h-6 w-6 text-primary" }), " Leveraging Analytics for Growth"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Use the insights from this tool to benchmark your content against popular videos in your niche. Don't just look at the numbers; look for the patterns behind them. Ask critical questions:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Engagement Ratio:" }), " What is the like-to-view ratio? A high ratio often signals strong audience approval. How does your content compare?"] }), _jsxs("li", { children: [_jsx("strong", { children: "Content Strategy:" }), " Are the top-performing videos longer, more in-depth tutorials, or shorter, snappier clips? This can inform your own content length and format."] }), _jsxs("li", { children: [_jsx("strong", { children: "Velocity:" }), " How quickly did the video accumulate its views? A video with a million views in a week tells a different story than one that took five years. This indicates trendiness and viral potential."] }), _jsxs("li", { children: [_jsx("strong", { children: "Keyword Insights:" }), " What keywords are used in the title, description, and tags of successful videos? This is a goldmine for your own SEO strategy."] })] }), _jsx("p", { children: "Answering these questions can reveal powerful opportunities to refine your content and accelerate your channel's growth." })] })] })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the Video Statistics Tool" }), _jsx("p", { className: "text-muted-foreground", children: "Getting detailed statistics for any YouTube video is easy:" }), _jsxs("ol", { className: "list-decimal list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Enter the Video URL:" }), " Paste the full URL of the YouTube video you want to analyze."] }), _jsxs("li", { children: [_jsx("strong", { children: "Fetch the Stats:" }), " Click the \"Get Video Stats\" button to retrieve the latest data from the YouTube API."] }), _jsxs("li", { children: [_jsx("strong", { children: "Analyze the Results:" }), " The tool will display a comprehensive overview of the video, including its view, like, and comment counts, duration, publication date, and any associated tags."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can I see statistics for private or unlisted videos?" }), _jsx("p", { className: "text-muted-foreground", children: "No, the tool can only retrieve statistics for public videos. Private and unlisted videos are not accessible via the YouTube API." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Why are the like or comment counts sometimes disabled?" }), _jsx("p", { className: "text-muted-foreground", children: "A creator can choose to disable the like/dislike count or the comment section for their video. If they have done so, the API cannot retrieve this data, and it will be reflected in our tool." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "How can I use video tags for my own content?" }), _jsx("p", { className: "text-muted-foreground", children: "Analyzing the tags of successful videos in your niche can provide valuable keyword ideas for your own content. It helps you understand how top creators are positioning their videos for YouTube's search and discovery algorithms." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "The most viewed video on YouTube is \"Baby Shark Dance,\" which has amassed over 14 billion views as of 2024. Its incredible virality demonstrates the power of catchy music and content that appeals to a young, global audience, making it a phenomenon that has far surpassed the reach of traditional media." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Related Tools" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs("a", { href: "/tools/youtube-tools/youtube-channel-statistics", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Channel Statistics" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Get a high-level overview of any YouTube channel." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-tag-extractor", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Tag Extractor" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Extract all the tags from a YouTube video." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-thumbnail-downloader", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Thumbnail Downloader" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Download the thumbnail of any YouTube video." })] })] })] })] })] }));
};
export default YouTubeVideoStatisticsTool;
