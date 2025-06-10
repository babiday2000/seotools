import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Loader2, X, Tags, HelpCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
const YouTubeHashtagGeneratorTool = () => {
    const [keyword, setKeyword] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const generateHashtags = (baseKeyword) => {
        if (!baseKeyword.trim()) {
            toast.error('Please enter a keyword to generate hashtags.');
            return [];
        }
        const sanitizedKeyword = baseKeyword.toLowerCase().replace(/\s+/g, '');
        const words = baseKeyword.toLowerCase().split(/\s+/).filter(Boolean);
        const generated = new Set();
        // 1. Core hashtag
        generated.add(`#${sanitizedKeyword}`);
        // 2. Single-word hashtags
        words.forEach(word => word.length > 2 && generated.add(`#${word}`));
        // 3. Combination hashtags
        if (words.length > 1) {
            generated.add(`#${words.join('')}`);
        }
        // 4. Common variations
        const prefixes = ['howTo', 'learn', 'discover'];
        const suffixes = ['tutorial', 'guide', 'tips', 'tricks', '2024'];
        prefixes.forEach(p => generated.add(`#${p}${sanitizedKeyword}`));
        suffixes.forEach(s => generated.add(`#${sanitizedKeyword}${s}`));
        // 5. Keyword + Suffix for each word
        words.forEach(word => {
            suffixes.slice(0, 2).forEach(suffix => {
                generated.add(`#${word}${suffix}`);
            });
        });
        // 6. Add a branded one
        generated.add('#seotooler');
        return Array.from(generated).slice(0, 15);
    };
    const handleGenerate = () => {
        setIsLoading(true);
        const newHashtags = generateHashtags(keyword);
        setHashtags(newHashtags);
        setIsLoading(false);
        if (newHashtags.length > 0) {
            toast.success('Hashtags generated successfully!');
        }
    };
    const handleCopyToClipboard = () => {
        if (hashtags.length === 0) {
            toast.error('No hashtags to copy.');
            return;
        }
        navigator.clipboard.writeText(hashtags.join(' '));
        toast.success('Hashtags copied to clipboard!');
    };
    const removeHashtag = (tagToRemove) => {
        setHashtags(hashtags.filter(tag => tag !== tagToRemove));
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Hashtag Generator" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Instantly generate relevant and effective hashtags to boost your video's visibility, reach a wider audience, and improve your YouTube SEO." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Hashtag Generator Tool" }), _jsx(CardDescription, { children: "Enter a keyword to generate a list of optimized hashtags." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "text", placeholder: "Enter your main video keyword (e.g., 'vegan cooking')", value: keyword, onChange: (e) => setKeyword(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleGenerate(), className: "flex-grow" }), _jsx(Button, { onClick: handleGenerate, disabled: isLoading, className: "w-full sm:w-auto", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Generating..."] })) : ('Generate Hashtags') })] }), hashtags.length > 0 && (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs(CardTitle, { children: ["Generated Hashtags (", hashtags.length, ")"] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: handleCopyToClipboard, children: [_jsx(Copy, { className: "mr-2 h-4 w-4" }), "Copy All"] })] }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-wrap gap-2", children: hashtags.map((tag) => (_jsxs(Badge, { variant: "secondary", className: "text-base font-medium", children: [tag, _jsx("button", { title: "Remove hashtag", onClick: () => removeHashtag(tag), className: "ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5", children: _jsx(X, { className: "h-3 w-3" }) })] }, tag))) }) })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto grid gap-8 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Tags, { className: "h-6 w-6 text-primary" }), " What Are YouTube Hashtags?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "YouTube hashtags are clickable keywords or phrases prefixed with a '#' symbol. They can be placed in your video's title or description to help categorize your content and make it more discoverable." }), _jsx("p", { children: "When a viewer clicks on a hashtag, they are taken to a results page showing other videos that share the same hashtag. This system helps viewers find content on specific topics and trends." })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(HelpCircle, { className: "h-6 w-6 text-primary" }), " Why Use Hashtags?"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Using hashtags strategically is a powerful way to extend the reach of your videos beyond your subscriber base. They improve your video's SEO by providing clear signals to the YouTube algorithm about your content's topic, helping it appear in relevant searches and suggestion feeds." }), _jsx("p", { children: "They also allow you to participate in trending topics, create content series, and build a community around specific themes related to your channel." })] })] })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-6 w-6 text-primary" }), " Best Practices for Hashtags"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("ul", { className: "list-disc list-inside space-y-2 text-muted-foreground", children: [_jsxs("li", { children: [_jsx("strong", { children: "Location Matters:" }), " Place your most important hashtags in the video title to make them prominent. Add a broader set of hashtags at the end of your video description."] }), _jsxs("li", { children: [_jsx("strong", { children: "Relevance is Key:" }), " Only use hashtags that are directly related to your video's content. Misleading hashtags can harm your video's performance and violate YouTube's policies."] }), _jsxs("li", { children: [_jsx("strong", { children: "Less is More:" }), " While you can use many hashtags, YouTube recommends using around 3-5 highly relevant ones for the best effect. YouTube will only display the first three from your description below the video title. The official limit is 15 hashtags per video; exceeding this will cause all hashtags to be ignored."] }), _jsxs("li", { children: [_jsx("strong", { children: "Create a Branded Hashtag:" }), " Develop a unique hashtag for your channel (e.g., #YourChannelName) and use it consistently. This encourages viewers to find more of your content easily."] }), _jsxs("li", { children: [_jsx("strong", { children: "Research Trending Topics:" }), " Tap into current events or popular trends in your niche by using relevant trending hashtags, but only if your video genuinely relates to the topic."] })] }) })] })] }));
};
export default YouTubeHashtagGeneratorTool;
