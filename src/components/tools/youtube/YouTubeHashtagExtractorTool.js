import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Hash, HelpCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from "sonner";
// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};
const YouTubeHashtagExtractorTool = () => {
    const [url, setUrl] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleExtract = async () => {
        const videoId = getYouTubeVideoId(url);
        if (!videoId) {
            setError('Please enter a valid YouTube video URL.');
            setHashtags([]);
            return;
        }
        if (!apiKey) {
            setError('YouTube API key is not configured. Please contact support.');
            setIsLoading(false);
            return;
        }
        setError('');
        setIsLoading(true);
        setHashtags([]);
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch video data from YouTube API.');
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const snippet = data.items[0].snippet;
                const description = snippet.description || '';
                const title = snippet.title || '';
                const videoTags = snippet.tags || [];
                // Extract from description and title
                const combinedText = `${title} ${description}`;
                const foundHashtags = combinedText.match(/#[\w\d]+/g) || [];
                // Extract from the video's actual tags
                const tagBasedHashtags = videoTags.map((tag) => `#${tag.replace(/\s+/g, '')}`);
                const uniqueHashtags = [...new Set([...foundHashtags, ...tagBasedHashtags])];
                if (uniqueHashtags.length > 0) {
                    setHashtags(uniqueHashtags);
                    toast.success("Hashtags extracted successfully!");
                }
                else {
                    setError('No hashtags found in the video\'s title, description, or tags.');
                    toast.info("No hashtags found for this video.");
                }
            }
            else {
                setError('Video not found. Please check the URL.');
                toast.error("Video not found.");
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch video data.';
            console.error(err);
            setError(errorMessage);
            toast.error("Extraction Failed", { description: errorMessage });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleCopy = (tag) => {
        navigator.clipboard.writeText(tag);
        toast.success("Copied!", {
            description: `Hashtag "${tag}" copied to clipboard.`,
        });
    };
    const handleCopyAll = () => {
        if (hashtags.length === 0)
            return;
        const allTags = hashtags.join(' ');
        navigator.clipboard.writeText(allTags);
        toast.success("All Copied!", {
            description: "All hashtags copied to clipboard.",
        });
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Hashtag Extractor" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Discover the hashtags successful creators are using to boost their video's reach. Paste any YouTube video URL to instantly extract all hashtags from its title, description, and tags." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Hashtag Extractor Tool" }), _jsx(CardDescription, { children: "Paste a video URL below to get started." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "url", placeholder: "Enter YouTube Video URL...", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow text-base" }), _jsxs(Button, { onClick: handleExtract, disabled: isLoading || !url.trim(), className: "text-base px-6", children: [isLoading ? _jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }) : _jsx(Hash, { className: "h-4 w-4 mr-2" }), isLoading ? 'Extracting...' : 'Extract Hashtags'] })] }), error && _jsx("p", { className: "text-destructive text-center sm:text-left", children: error }), hashtags.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(CardTitle, { children: ["Extracted Hashtags (", hashtags.length, ")"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleCopyAll, children: [_jsx(Copy, { className: "h-4 w-4 mr-2" }), "Copy All"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-wrap gap-2", children: hashtags.map((tag, index) => (_jsxs(Badge, { variant: "secondary", className: "text-base font-medium p-2 cursor-pointer hover:bg-primary/10 group", onClick: () => handleCopy(tag), children: [tag, _jsx(Copy, { className: "h-3 w-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" })] }, index))) }) })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto grid gap-8 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Hash, { className: "h-6 w-6 text-primary" }), " Where to Find Hashtags"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "YouTube hashtags are clickable labels that creators can add to their videos to help viewers find content on a specific topic. They are most commonly found in two places:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Above the Title:" }), " YouTube prominently displays up to three hashtags from the video's description right above the title."] }), _jsxs("li", { children: [_jsx("strong", { children: "In the Description:" }), " Creators can include a larger list of hashtags within the video description box, often at the very end."] }), _jsxs("li", { children: [_jsx("strong", { children: "In the Video Tags:" }), " Creators can add tags to their videos, and these can also be used as hashtags."] })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(HelpCircle, { className: "h-6 w-6 text-primary" }), " Why Extract Hashtags?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Analyzing the hashtags used by top-performing videos in your niche is a powerful form of competitor research. It gives you direct insight into:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Content Strategy:" }), " The topics and trends your competitors are targeting."] }), _jsxs("li", { children: [_jsx("strong", { children: "Keyword Opportunities:" }), " Relevant keywords you may have overlooked."] }), _jsxs("li", { children: [_jsx("strong", { children: "Community Trends:" }), " Popular hashtags that a specific community is following."] })] }), _jsx("p", { children: "This information helps you position your own videos more effectively to reach a similar audience." })] })] })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-6 w-6 text-primary" }), " Using Extracted Hashtags Effectively"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("ul", { className: "list-disc list-inside space-y-3 text-muted-foreground", children: [_jsxs("li", { children: [_jsx("strong", { children: "Don't Just Copy:" }), " Never blindly copy all hashtags from another video. Select only the ones that are highly relevant to your specific content."] }), _jsxs("li", { children: [_jsx("strong", { children: "Prioritize Relevance:" }), " Your primary goal is to accurately describe your video for both viewers and the algorithm. Irrelevant hashtags can harm your video's performance."] }), _jsxs("li", { children: [_jsx("strong", { children: "Combine with Your Own:" }), " Mix relevant extracted hashtags with your own unique branded hashtag (e.g., #YourChannelName) and other keywords you've researched."] }), _jsxs("li", { children: [_jsx("strong", { children: "Understand the Context:" }), " Look at the video the hashtag came from. Is it part of a series? A response to a trend? Understanding the context helps you use it more strategically."] }), _jsxs("li", { children: [_jsx("strong", { children: "Follow the Rules:" }), " YouTube's official limit is 15 hashtags. Using more than that will cause YouTube to ignore all of them. Focus on 3-5 highly effective ones for the best results."] })] }) })] })] }));
};
export default YouTubeHashtagExtractorTool;
