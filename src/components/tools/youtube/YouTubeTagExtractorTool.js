import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Tags, HelpCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from "sonner";
// Helper function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return match[2];
    }
    return null;
};
const YouTubeTagExtractorTool = () => {
    const [url, setUrl] = useState('');
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleExtract = async () => {
        const videoId = getYouTubeVideoId(url);
        if (!videoId) {
            setError('Please enter a valid YouTube video URL.');
            setTags([]);
            return;
        }
        if (!apiKey) {
            setError('YouTube API key is not configured. Please contact support.');
            setIsLoading(false);
            return;
        }
        setError('');
        setIsLoading(true);
        setTags([]);
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error?.message || 'An unknown error occurred with the YouTube API.';
                throw new Error(`API Error: ${errorMessage}`);
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const videoTags = data.items[0].snippet.tags;
                if (videoTags && videoTags.length > 0) {
                    setTags(videoTags);
                    toast.success("Tags extracted successfully!");
                }
                else {
                    setError('No tags found for this video.');
                    toast.info("No tags found", {
                        description: "This video doesn't have any public tags.",
                    });
                }
            }
            else {
                setError('Video not found. Please check the URL.');
                toast.error("Video not found", {
                    description: "Please ensure the YouTube URL is correct and the video is public.",
                });
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch video data. Please try again later.';
            console.error(err);
            setError(errorMessage);
            toast.error("Extraction Failed", {
                description: errorMessage,
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleCopy = (tag) => {
        navigator.clipboard.writeText(tag);
        toast.success("Copied!", {
            description: `Tag "${tag}" copied to clipboard.`,
        });
    };
    const handleCopyAll = () => {
        if (tags.length === 0)
            return;
        const allTags = tags.join(', ');
        navigator.clipboard.writeText(allTags);
        toast.success("All Copied!", {
            description: "All tags copied to clipboard.",
        });
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Tag Extractor" }), _jsx("p", { className: "mt-3 text-lg max-w-3xl mx-auto text-muted-foreground", children: "Instantly reveal the SEO strategy behind any successful YouTube video. Our YouTube Tag Extractor allows you to see the exact tags a creator is using, providing a powerful competitive advantage. By analyzing the keywords that top-ranking videos use, you can gain deep insights to refine your own content, boost your video's discoverability in search results and recommendations, and ultimately grow your channel faster. Stop guessing and start making data-driven decisions to optimize your YouTube SEO." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Extractor Tool" }), _jsx(CardDescription, { children: "Paste a video URL below to get started." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "url", placeholder: "Enter YouTube Video URL (e.g., https://www.youtube.com/watch?v=...)", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow text-base" }), _jsx(Button, { onClick: handleExtract, disabled: isLoading || !url.trim(), className: "text-base px-6", children: isLoading ? _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : 'Extract Tags' })] }), error && _jsx("p", { className: "text-destructive text-center sm:text-left", children: error }), tags.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(CardTitle, { children: ["Extracted Tags (", tags.length, ")"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleCopyAll, children: [_jsx(Copy, { className: "h-4 w-4 mr-2" }), "Copy All"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag, index) => (_jsxs(Badge, { variant: "secondary", className: "text-base font-medium p-2 cursor-pointer hover:bg-primary/10 group", onClick: () => handleCopy(tag), children: [tag, _jsx(Copy, { className: "h-3 w-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" })] }, index))) }) })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-12 text-left", children: [_jsxs("section", { children: [_jsxs("h2", { className: "text-2xl font-bold tracking-tight flex items-center gap-2", children: [_jsx(Tags, { className: "h-7 w-7 text-primary" }), "Unveiling the Power of YouTube Tags"] }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "YouTube tags, often referred to as 'video tags', are a fundamental component of your video's metadata. They are essentially descriptive keywords and phrases that you can associate with your video. Their primary purpose is to provide YouTube's complex algorithm with crucial context about your content, its subject matter, its category, and even its target audience. While not prominently displayed to viewers like the title or thumbnail, these tags operate behind the scenes as a powerful tool for search engine optimization (SEO) within the YouTube ecosystem." }), _jsx("p", { children: "Think of them as digital signposts. They guide the YouTube algorithm, helping it understand what your video is about and who might be interested in watching it. When a user types a query into the YouTube search bar, the algorithm scans through titles, descriptions, and tags to find the most relevant results. A well-optimized set of tags dramatically increases the likelihood that your video will appear for relevant searches, connecting you with a new audience actively looking for content like yours." })] })] }), _jsxs("section", { children: [_jsxs("h2", { className: "text-2xl font-bold tracking-tight flex items-center gap-2", children: [_jsx(HelpCircle, { className: "h-7 w-7 text-primary" }), "Why Tagging is a Non-Negotiable for Growth"] }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "In the competitive landscape of YouTube, discoverability is everything. While YouTube's algorithm has become incredibly sophisticated, relying heavily on user engagement metrics like watch time, click-through rate (CTR), and audience retention, tags remain a foundational pillar of YouTube SEO. They are your direct line of communication with the algorithm, giving you a measure of control over how your content is categorized and recommended." }), _jsx("p", { children: "Here\u2019s why strategic tagging is crucial:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Improved Search Rankings:" }), " The most direct benefit. The right tags help your video rank higher in YouTube's search results for your target keywords. This is especially vital for educational, informational, or \"how-to\" content where users are actively searching for solutions."] }), _jsxs("li", { children: [_jsx("strong", { children: "Enhanced \"Recommended Videos\" Placement:" }), " Have you ever noticed the \"Up Next\" sidebar or the recommended videos on your homepage? Tags play a significant role here. By using relevant tags, you tell YouTube which other videos are similar to yours. This increases the chance of your video being recommended to viewers who are watching content in the same niche, a powerful driver of organic views."] }), _jsxs("li", { children: [_jsx("strong", { children: "Clarifying Content for the Algorithm:" }), " Sometimes your title needs to be catchy and creative, which might make it slightly ambiguous. Tags allow you to be specific. For example, a video titled \"The Ultimate Baking Fail\" can use tags like \"sourdough bread recipe,\" \"kitchen disaster,\" and \"how not to bake\" to give the algorithm precise details."] }), _jsxs("li", { children: [_jsx("strong", { children: "Targeting Long-Tail Keywords:" }), " Viewers often search for very specific phrases (e.g., \"how to fix a leaky faucet under the sink\"). These are long-tail keywords. While they have lower search volume, they have incredibly high intent. Tags are the perfect place to include these specific phrases, capturing a highly motivated audience."] }), _jsxs("li", { children: [_jsx("strong", { children: "Correcting Common Misspellings:" }), " If your topic involves words that are commonly misspelled (e.g., \"Arnold Schwarzenegger\" or \"Matcha vs. Maccha\"), you can include these variations in your tags to capture that search traffic without cluttering your title or description."] })] })] })] }), _jsxs("section", { children: [_jsxs("h2", { className: "text-2xl font-bold tracking-tight flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-7 w-7 text-primary" }), "Mastering the Art of Tagging: Best Practices"] }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Effective tagging is both an art and a science. It's not about stuffing the tag box with as many keywords as possible. It's about relevance, precision, and strategy. Our YouTube Tag Extractor is your secret weapon, allowing you to see what works for top creators. Here\u2019s how to apply those insights and craft the perfect tag strategy:" }), _jsxs("ol", { className: "list-decimal list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Lead with Your Primary Keyword:" }), " Your very first tag should be your main target keyword\u2014the exact phrase you want your video to rank for. For example, if your video is a review of the iPhone 15, your first tag should be \"iPhone 15 review\". YouTube pays more attention to the first few tags, so make them count."] }), _jsxs("li", { children: [_jsx("strong", { children: "Employ a Mix of Broad and Specific Tags:" }), " Create a balanced portfolio of tags. Start with broad, general tags that describe your video's category (e.g., \"digital photography,\" \"street photography\"). Then, get more specific with long-tail tags that describe the video's content in detail (e.g., \"night street photography with Sony A7IV,\" \"best camera settings for low light photos\"). This combination helps you compete in both broad categories and specific search queries."] }), _jsxs("li", { children: [_jsx("strong", { children: "Analyze, Don't Just Copy Competitors:" }), " Use our extractor tool to analyze the tags of several top-ranking videos for your target keyword. Look for common patterns and recurring keywords. However, never blindly copy-paste their entire tag list. Their brand name or irrelevant tags won't help you. Instead, extract the relevant, high-performing keywords and adapt them to your unique video."] }), _jsxs("li", { children: [_jsx("strong", { children: "Think Like a Viewer:" }), " Put yourself in the shoes of your target audience. What words and phrases would they use to find your video? Brainstorm synonyms, related topics, and questions they might ask. If your video is a \"vegan lasagna recipe,\" consider tags like \"plant-based lasagna,\" \"dairy-free pasta recipe,\" and \"how to make vegan cheese sauce.\""] }), _jsxs("li", { children: [_jsx("strong", { children: "Include Your Brand Tag:" }), " Create a unique tag for your channel (e.g., your channel name or a variation of it) and include it as one of the last tags in all your videos. This helps YouTube's algorithm associate all of your content, increasing the chances that your other videos will be recommended to someone watching one of yours. It builds a content ecosystem."] }), _jsxs("li", { children: [_jsx("strong", { children: "Keep it Relevant and Focused:" }), " While YouTube allows up to 500 characters for tags, quality trumps quantity. Aim for 15-30 highly relevant tags. Using misleading or irrelevant tags (e.g., tagging a gaming video with \"Justin Bieber\" to get views) is a violation of YouTube's policy and can harm your channel's standing."] }), _jsxs("li", { children: [_jsx("strong", { children: "Order Tags by Importance:" }), " After your primary keyword, list your other important keywords. Follow those with the more specific, long-tail keywords. While the exact weight YouTube gives to tag order is debated, it's a logical best practice to front-load the most critical terms."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "mt-4 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is it illegal or against YouTube's rules to extract tags from other videos?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Absolutely not. The tags on a public video are considered public information. Our tool simply accesses this data through YouTube's official API in a structured way. It's a standard and legitimate SEO research practice, similar to how website owners use tools to analyze competitor keywords for Google search." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "How many tags should I use for my video?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "There's no magic number, but a best practice is to aim for a focused list of 15 to 30 tags. This is enough to provide plenty of context to the algorithm without appearing spammy. The total character limit is 500, but it's rare that you'll need to use all of it. Relevance is always more important than volume." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Will adding more tags guarantee more views?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Not necessarily. Tags are just one piece of the puzzle. They increase your video's *potential* to be discovered. However, getting the click and keeping the viewer watching depends on your thumbnail, title, and the quality of your content itself. Great tags can't save a bad video, but they can significantly amplify a great one." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "What's the difference between tags and hashtags in the description?" }), _jsxs("p", { className: "text-muted-foreground mt-1", children: ["They serve different functions. ", _jsx("strong", { children: "Tags" }), " (in the dedicated tag box) are backend metadata primarily for the YouTube algorithm. ", _jsx("strong", { children: "Hashtags" }), " (in the video description or title) are clickable, frontend elements that allow viewers to discover other videos using the same hashtag. You can use up to 15 hashtags, and they are a great way to join trending topics or create a series playlist."] })] })] })] })] })] }));
};
export default YouTubeTagExtractorTool;
