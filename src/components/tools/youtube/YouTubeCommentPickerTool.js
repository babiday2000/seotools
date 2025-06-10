import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { Gift, Repeat, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Confetti from 'react-confetti';
import { Checkbox } from '@/components/ui/checkbox';
const YouTubeCommentPickerTool = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [comments, setComments] = useState([]);
    const [winner, setWinner] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [filterDuplicates, setFilterDuplicates] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const getVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };
    const fetchComments = async (videoId) => {
        let allComments = [];
        let nextPageToken = undefined;
        do {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&maxResults=100&pageToken=${nextPageToken || ''}&key=${apiKey}`);
            const data = await response.json();
            if (data.error)
                throw new Error(data.error.message);
            const fetchedComments = data.items.map((item) => ({
                author: item.snippet.topLevelComment.snippet.authorDisplayName,
                authorProfileImageUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
                authorChannelUrl: item.snippet.topLevelComment.snippet.authorChannelUrl,
                text: item.snippet.topLevelComment.snippet.textDisplay,
            }));
            allComments = [...allComments, ...fetchedComments];
            nextPageToken = data.nextPageToken;
        } while (nextPageToken);
        return allComments;
    };
    const handleFetchComments = async () => {
        const videoId = getVideoId(videoUrl);
        if (!videoId) {
            setError('Invalid YouTube video URL.');
            return;
        }
        if (!apiKey) {
            setError('YouTube API key is not configured.');
            return;
        }
        setError('');
        setIsLoading(true);
        setWinner(null);
        setComments([]);
        try {
            const fetched = await fetchComments(videoId);
            setComments(fetched);
            toast.success(`Loaded ${fetched.length} comments.`);
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : 'Failed to fetch comments.';
            setError(msg);
            toast.error("Error", { description: msg });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handlePickWinner = () => {
        if (comments.length === 0)
            return;
        let eligibleComments = [...comments];
        if (filterDuplicates) {
            const uniqueAuthors = new Map();
            eligibleComments.forEach(c => {
                if (!uniqueAuthors.has(c.authorChannelUrl)) {
                    uniqueAuthors.set(c.authorChannelUrl, c);
                }
            });
            eligibleComments = Array.from(uniqueAuthors.values());
        }
        if (eligibleComments.length === 0) {
            toast.info("No eligible comments to pick from.");
            return;
        }
        const randomIndex = Math.floor(Math.random() * eligibleComments.length);
        const newWinner = { ...eligibleComments[randomIndex], pickedAt: new Date() };
        setWinner(newWinner);
        setShowConfetti(true);
        toast.success(`${newWinner.author} is the winner!`);
    };
    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => setShowConfetti(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [showConfetti]);
    return (_jsxs("div", { className: "space-y-8", children: [showConfetti && _jsx(Confetti, { recycle: false, numberOfPieces: 400 }), _jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Comment Picker" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Running a giveaway or contest on your YouTube channel is a fantastic way to boost engagement and reward your audience. Our YouTube Comment Picker tool provides a fair, transparent, and easy way to select a random winner from the comments section of your video." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Giveaway Winner Picker" }), _jsx(CardDescription, { children: "Paste your YouTube video URL to load comments and pick a winner." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "url", placeholder: "Enter YouTube Video URL", value: videoUrl, onChange: (e) => setVideoUrl(e.target.value), className: "flex-grow" }), _jsx(Button, { onClick: handleFetchComments, disabled: isLoading || !videoUrl.trim(), children: isLoading ? _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : 'Load Comments' })] }), error && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] })), _jsx("div", { className: "flex items-center space-x-4", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "filter-duplicates", checked: filterDuplicates, onCheckedChange: (checked) => setFilterDuplicates(checked) }), _jsx("label", { htmlFor: "filter-duplicates", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "Filter duplicate users" })] }) })] }) })] }), comments.length > 0 && !winner && (_jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Ready to Pick a Winner" }), _jsxs(CardDescription, { children: ["Loaded ", comments.length, " comments. ", filterDuplicates && `Filtering to unique users.`] })] }), _jsx(CardContent, { className: "text-center", children: _jsxs(Button, { size: "lg", onClick: handlePickWinner, children: [_jsx(Gift, { className: "mr-2 h-5 w-5" }), " Pick a Winner"] }) })] })), winner && (_jsxs(Card, { className: "max-w-4xl mx-auto bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx(CardTitle, { className: "text-2xl font-bold text-yellow-900", children: "Congratulations!" }), _jsx(CardDescription, { className: "text-yellow-800", children: "The winning comment is:" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "bg-white/80 p-4 rounded-lg shadow-inner", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: winner.authorProfileImageUrl, alt: winner.author }), _jsx(AvatarFallback, { children: winner.author.charAt(0) })] }), _jsxs("div", { children: [_jsx("a", { href: winner.authorChannelUrl, target: "_blank", rel: "noopener noreferrer", className: "font-bold text-lg hover:underline", children: winner.author }), _jsx("p", { className: "text-gray-700", dangerouslySetInnerHTML: { __html: winner.text } })] })] }) }), _jsx("div", { className: "text-center", children: _jsxs(Button, { onClick: handlePickWinner, variant: "secondary", children: [_jsx(Repeat, { className: "mr-2 h-4 w-4" }), " Pick Another Winner"] }) })] })] })), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is a YouTube Comment Picker?" }), _jsx("p", { className: "text-muted-foreground", children: "A YouTube Comment Picker is a tool that automates the process of selecting a random comment from a YouTube video. It's an indispensable utility for creators who run giveaways, contests, or any promotion where a winner is chosen from the comments. Instead of manually scrolling through potentially thousands of comments, the tool fetches all comments from a specified video and selects one at random, ensuring a fair and unbiased result. This not only saves a significant amount of time but also adds a layer of transparency and legitimacy to your contest." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Factors to Consider for a Fair Giveaway" }), _jsx("p", { className: "text-muted-foreground", children: "To ensure your giveaway is fair and runs smoothly, consider the following factors:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Clear Rules:" }), " Clearly state the rules of the giveaway in your video and description, including the prize, entry requirements (e.g., \"comment to win\"), and the deadline."] }), _jsxs("li", { children: [_jsx("strong", { children: "Filter Duplicate Users:" }), " Our tool includes an option to filter duplicate users, meaning each person only gets one entry regardless of how many times they comment. This is crucial for a fair drawing."] }), _jsxs("li", { children: [_jsx("strong", { children: "Transparency:" }), " Record the process of you using the tool to pick a winner. This builds trust with your audience and shows that the selection was truly random."] }), _jsxs("li", { children: [_jsx("strong", { children: "Compliance with YouTube's Policies:" }), " Be sure to follow YouTube's contest policies and guidelines to avoid any issues with your channel."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Key Components of Our Comment Picker" }), _jsx("p", { className: "text-muted-foreground", children: "Our tool is designed to make your giveaways as simple and fair as possible." }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Fetches All Comments:" }), " The tool retrieves every comment from the video to ensure no one is left out."] }), _jsxs("li", { children: [_jsx("strong", { children: "Duplicate User Filtering:" }), " A one-click option to ensure each user gets only one entry."] }), _jsxs("li", { children: [_jsx("strong", { children: "Truly Random Selection:" }), " Uses a secure random number generator to pick the winner."] }), _jsxs("li", { children: [_jsx("strong", { children: "Winner Display:" }), " Clearly displays the winner's name, profile picture, and comment."] }), _jsxs("li", { children: [_jsx("strong", { children: "Confetti Celebration:" }), " A fun confetti animation to celebrate the winner."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the YouTube Comment Picker" }), _jsx("p", { className: "text-muted-foreground", children: "Picking a winner for your giveaway is a simple process:" }), _jsxs("ol", { className: "list-decimal list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Enter the Video URL:" }), " Paste the URL of the YouTube video you're hosting the giveaway on."] }), _jsxs("li", { children: [_jsx("strong", { children: "Load the Comments:" }), " Click the \"Load Comments\" button. The tool will fetch all the comments from the video."] }), _jsxs("li", { children: [_jsx("strong", { children: "Choose Your Options:" }), " Decide if you want to filter out duplicate users by checking the box."] }), _jsxs("li", { children: [_jsx("strong", { children: "Pick a Winner:" }), " Click the \"Pick a Winner\" button to randomly select a comment. The winner will be displayed on the screen."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is this tool free?" }), _jsx("p", { className: "text-muted-foreground", children: "Yes, our YouTube Comment Picker is 100% free to use. There are no hidden costs or limitations." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can the tool see all comments?" }), _jsx("p", { className: "text-muted-foreground", children: "The tool uses the official YouTube API to fetch comments. It can retrieve all public comments, but it cannot access comments that have been held for review, marked as spam, or deleted." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is the winner selection truly random?" }), _jsx("p", { className: "text-muted-foreground", children: "Yes, the tool uses a cryptographically secure random number generator to select the winner, ensuring a fair and unbiased outcome." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "The first-ever YouTube contest was held in 2010, called \"YouTube Play: A Biennial of Creative Video.\" It was a collaboration with the Guggenheim Museum to find the most creative videos on the platform. The winning entries were displayed at Guggenheim museums around the world, marking a major step in the recognition of YouTube as a legitimate artistic medium." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Related Tools" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs("a", { href: "/tools/youtube-tools/youtube-subscribe-link-generator", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Subscribe Link Generator" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Create a link that prompts users to subscribe to your channel." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-channel-statistics", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Channel Statistics" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Analyze the performance of any YouTube channel." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-money-calculator", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Money Calculator" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Estimate the potential earnings of a video or channel." })] })] })] })] })] }));
};
export default YouTubeCommentPickerTool;
