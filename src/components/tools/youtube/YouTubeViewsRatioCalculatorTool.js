import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { AlertCircle, Loader2, Users, Eye, Percent } from 'lucide-react';
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
const YouTubeViewsRatioCalculatorTool = () => {
    const [url, setUrl] = useState('');
    const [metrics, setMetrics] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const handleCalculate = async () => {
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
        setMetrics(null);
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
                const subs = parseInt(statistics.subscriberCount);
                const views = parseInt(statistics.viewCount);
                const ratio = subs > 0 ? (views / subs) : 0;
                setMetrics({
                    title: snippet.title,
                    thumbnailUrl: snippet.thumbnails.default.url,
                    subscriberCount: statistics.subscriberCount,
                    viewCount: statistics.viewCount,
                    ratio: ratio,
                });
                toast.success("Ratio calculated successfully!");
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Views to Subscriber Ratio Calculator" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Analyze the engagement of any YouTube channel by calculating its views-to-subscriber ratio. This powerful metric helps you understand how well a channel's content resonates with its audience." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Calculate Ratio" }), _jsx(CardDescription, { children: "Enter a channel URL, ID, or @handle to calculate its views-to-subscriber ratio." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "text", placeholder: "e.g., https://www.youtube.com/c/MrBeast", value: url, onChange: (e) => setUrl(e.target.value), className: "flex-grow" }), _jsx(Button, { onClick: handleCalculate, disabled: isLoading || !url.trim(), children: isLoading ? _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : 'Calculate' })] }), error && (_jsxs(Alert, { variant: "destructive", className: "mt-4", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] }))] })] }), metrics && (_jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: metrics.thumbnailUrl, alt: metrics.title }), _jsx(AvatarFallback, { children: metrics.title.charAt(0) })] }), _jsx(CardTitle, { children: metrics.title })] }) }), _jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-center", children: [_jsxs("div", { className: "p-4 rounded-lg bg-muted", children: [_jsxs("p", { className: "text-sm text-muted-foreground flex items-center justify-center gap-2", children: [_jsx(Users, { className: "h-4 w-4" }), " Subscribers"] }), _jsx("p", { className: "text-3xl font-bold", children: Number(metrics.subscriberCount).toLocaleString() })] }), _jsxs("div", { className: "p-4 rounded-lg bg-muted", children: [_jsxs("p", { className: "text-sm text-muted-foreground flex items-center justify-center gap-2", children: [_jsx(Eye, { className: "h-4 w-4" }), " Total Views"] }), _jsx("p", { className: "text-3xl font-bold", children: Number(metrics.viewCount).toLocaleString() })] }), _jsxs("div", { className: "p-4 rounded-lg bg-primary text-primary-foreground", children: [_jsxs("p", { className: "text-sm flex items-center justify-center gap-2", children: [_jsx(Percent, { className: "h-4 w-4" }), " Views per Subscriber"] }), _jsx("p", { className: "text-3xl font-bold", children: metrics.ratio.toFixed(2) })] })] })] })), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is the Views-to-Subscriber Ratio?" }), _jsx("p", { className: "text-muted-foreground", children: "The Views-to-Subscriber Ratio is a key performance indicator (KPI) that measures the average number of views a channel receives per subscriber. It's calculated by dividing the total number of views by the total number of subscribers. This metric provides a deeper understanding of audience engagement than subscriber count alone. A high ratio suggests that a channel's content is actively being watched by its subscriber base and is also reaching a wider audience through recommendations and search. Conversely, a low ratio might indicate that a channel has many inactive subscribers or that its content is not engaging enough to retain viewership." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Factors That Influence the Ratio" }), _jsx("p", { className: "text-muted-foreground", children: "Several factors can impact a channel's views-to-subscriber ratio:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Content Quality and Relevance:" }), " High-quality, engaging content that resonates with the target audience will naturally lead to more views per subscriber."] }), _jsxs("li", { children: [_jsx("strong", { children: "Posting Frequency:" }), " Channels that upload content consistently tend to have a more active and engaged subscriber base."] }), _jsxs("li", { children: [_jsx("strong", { children: "Video Virality:" }), " A single viral video can dramatically increase the total view count, temporarily inflating the ratio."] }), _jsxs("li", { children: [_jsx("strong", { children: "Subscriber Age:" }), " Channels with a large number of old, inactive subscribers may have a lower ratio."] }), _jsxs("li", { children: [_jsx("strong", { children: "Niche and Content Type:" }), " Some niches, like news or tutorials, may attract more non-subscriber views from search, leading to a higher ratio."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Key Components of Our Ratio Calculator" }), _jsx("p", { className: "text-muted-foreground", children: "Our tool is built to provide a quick and accurate analysis of any public YouTube channel." }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Accurate Data:" }), " Fetches real-time statistics directly from the YouTube API."] }), _jsxs("li", { children: [_jsx("strong", { children: "Clear Visualization:" }), " Presents subscribers, views, and the final ratio in an easy-to-read format."] }), _jsxs("li", { children: [_jsx("strong", { children: "Universal Input:" }), " Accepts channel URLs, IDs, and @handles."] }), _jsxs("li", { children: [_jsx("strong", { children: "Fast and Secure:" }), " Calculates the ratio instantly without storing any user data."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the Views-to-Subscriber Ratio Calculator" }), _jsx("p", { className: "text-muted-foreground", children: "Analyzing a channel's engagement is simple with our tool:" }), _jsxs("ol", { className: "list-decimal list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Enter Channel Identifier:" }), " Paste the YouTube channel's URL, ID, or @handle into the input box."] }), _jsxs("li", { children: [_jsx("strong", { children: "Click \"Calculate\":" }), " Press the button to fetch the channel's data."] }), _jsxs("li", { children: [_jsx("strong", { children: "Analyze the Results:" }), " The tool will display the total subscribers, total views, and the calculated views-per-subscriber ratio."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "What is a good views-to-subscriber ratio?" }), _jsx("p", { className: "text-muted-foreground", children: "There's no single \"good\" ratio, as it varies widely by niche and channel size. However, a ratio significantly above 1.0 often indicates a highly engaged audience. The best approach is to compare the ratio with other channels in the same niche." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can I calculate the ratio for a private video or channel?" }), _jsx("p", { className: "text-muted-foreground", children: "No, our tool uses the public data provided by the YouTube API and cannot access private videos or channels." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is this tool free to use?" }), _jsx("p", { className: "text-muted-foreground", children: "Yes, our YouTube Views-to-Subscriber Ratio Calculator is completely free to use without any limitations." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "The concept of a \"subscriber\" was added to YouTube in October 2005, just a few months after the platform launched. It was a revolutionary feature at the time, allowing viewers to create a personalized feed of content, which laid the groundwork for the creator-centric ecosystem we know today." })] })] })] }));
};
export default YouTubeViewsRatioCalculatorTool;
