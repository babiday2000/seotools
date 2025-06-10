import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Wand2, Loader2, X, HelpCircle, CheckCircle } from 'lucide-react';
import { toast } from "sonner";
import { relatedKeywords, tagModifiers } from '@/lib/youtube-keyword-data';
// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};
const YouTubeTagGeneratorTool = () => {
    const [keyword, setKeyword] = useState('');
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const generateTags = (baseKeyword) => {
        if (!baseKeyword.trim()) {
            toast.error('Please enter a keyword to generate tags.');
            return [];
        }
        const sanitizedKeyword = baseKeyword.toLowerCase().trim();
        const generated = new Set();
        // 1. Add the core keyword itself
        generated.add(sanitizedKeyword);
        // 2. Find related keywords from our knowledge base
        const related = relatedKeywords[sanitizedKeyword] || [];
        if (related.length > 0) {
            related.forEach(tag => generated.add(tag));
        }
        else {
            // Fallback for keywords not in our DB
            Object.keys(relatedKeywords).forEach(key => {
                if (sanitizedKeyword.includes(key)) {
                    relatedKeywords[key].forEach(tag => generated.add(tag));
                }
            });
        }
        // 3. Generate variations using modifiers and formats
        const allRelated = [sanitizedKeyword, ...related];
        tagModifiers.formats.forEach(format => {
            if (format.includes('{prefix}')) {
                shuffleArray(tagModifiers.prefixes).slice(0, 2).forEach(prefix => {
                    generated.add(format.replace('{prefix}', prefix).replace('{kw}', sanitizedKeyword));
                });
            }
            if (format.includes('{suffix}')) {
                shuffleArray(tagModifiers.suffixes).slice(0, 3).forEach(suffix => {
                    generated.add(format.replace('{suffix}', suffix).replace('{kw}', sanitizedKeyword));
                });
            }
            if (format.includes('{related}') && allRelated.length > 1) {
                const randomRelated = shuffleArray(allRelated.filter(k => k !== sanitizedKeyword))[0];
                if (randomRelated) {
                    generated.add(format.replace('{kw}', sanitizedKeyword).replace('{related}', randomRelated));
                }
            }
        });
        // 4. Add channel/brand specific tags (example)
        generated.add('seotooler');
        return shuffleArray(Array.from(generated)).slice(0, 30);
    };
    const handleGenerate = () => {
        setIsLoading(true);
        setTags([]);
        // No more artificial delay
        const newTags = generateTags(keyword);
        setTags(newTags);
        setIsLoading(false);
        if (newTags.length > 0) {
            toast.success('Tags generated successfully!');
        }
    };
    const handleCopy = async (tag) => {
        try {
            await navigator.clipboard.writeText(tag);
            toast.success("Copied!", {
                description: `Tag "${tag}" copied to clipboard.`,
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (_err) {
            toast.error("Copy failed", {
                description: "Could not copy to clipboard. Please check browser permissions.",
            });
        }
    };
    const handleCopyAll = async () => {
        if (tags.length === 0)
            return;
        const allTags = tags.join(', ');
        try {
            await navigator.clipboard.writeText(allTags);
            toast.success("All Copied!", {
                description: "All generated tags copied to clipboard.",
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (_err) {
            toast.error("Copy failed", {
                description: "Could not copy to clipboard. Please check browser permissions.",
            });
        }
    };
    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Tag Generator" }), _jsx("p", { className: "mt-3 text-lg max-w-3xl mx-auto text-muted-foreground", children: "Supercharge your YouTube SEO with our intelligent Tag Generator. Stop the guesswork and instantly create dozens of highly relevant, performance-driven tags based on a single keyword. Our tool analyzes your topic to suggest a powerful mix of long-tail keywords, semantic variations, and related terms, maximizing your video's discoverability. Reach a wider audience, rank higher in search results, and let the YouTube algorithm know exactly who to show your content to." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Tag Generator Tool" }), _jsx(CardDescription, { children: "Enter a primary keyword or topic to generate a list of suggested tags." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "text", placeholder: "Enter a primary keyword (e.g., 'react')", value: keyword, onChange: (e) => setKeyword(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleGenerate(), className: "flex-grow text-base" }), _jsxs(Button, { onClick: handleGenerate, disabled: isLoading || !keyword.trim(), className: "text-base px-6", children: [isLoading ? _jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }) : _jsx(Wand2, { className: "h-4 w-4 mr-2" }), isLoading ? 'Generating...' : 'Generate Tags'] })] }), tags.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(CardTitle, { children: ["Generated Tags (", tags.length, ")"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleCopyAll, children: [_jsx(Copy, { className: "h-4 w-4 mr-2" }), "Copy All"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag, index) => (_jsxs(Badge, { variant: "secondary", className: "text-base font-medium p-2 group", children: [_jsx("span", { className: "cursor-pointer", onClick: () => handleCopy(tag), children: tag }), _jsx("button", { title: "Remove tag", onClick: () => removeTag(tag), className: "ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5 opacity-50 group-hover:opacity-100 transition-opacity", children: _jsx(X, { className: "h-3 w-3" }) })] }, index))) }) })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-12 text-left", children: [_jsxs("section", { children: [_jsxs("h2", { className: "text-2xl font-bold tracking-tight flex items-center gap-2", children: [_jsx(Wand2, { className: "h-7 w-7 text-primary" }), "The Magic of Automated Tag Generation"] }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "A YouTube Tag Generator is a creator's secret weapon for mastering video SEO. At its core, the tool automates the complex and time-consuming process of keyword research for your video tags. Video tags are hidden keywords that you add to your video upload, and they serve as a critical signal to the YouTube algorithm. They provide essential context about your video's topic, style, and intended audience, directly influencing who sees your content." }), _jsx("p", { children: "Instead of spending hours brainstorming every possible keyword variation, our generator does the heavy lifting. By providing a single 'seed' keyword that represents your video's main topic, the tool intelligently expands upon it. It delves into a vast database of related terms, common search queries, and effective keyword patterns to produce a comprehensive list of suggested tags. This ensures you cover all your bases, from broad category terms to highly specific long-tail keywords that capture motivated viewers." })] })] }), _jsxs("section", { children: [_jsxs("h2", { className: "text-2xl font-bold tracking-tight flex items-center gap-2", children: [_jsx(HelpCircle, { className: "h-7 w-7 text-primary" }), "How to Generate Tags That Drive Results"] }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "The effectiveness of your generated tags hinges entirely on the quality of your initial input. A well-chosen seed keyword acts as a blueprint for the generator, guiding it to produce relevant and powerful suggestions. To get the best results, your primary keyword should be a concise and accurate representation of your video's core subject matter." }), _jsx("p", { children: "Follow these principles for optimal tag generation:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Start with Specificity:" }), " Avoid overly broad, single-word inputs. Instead of \"cooking,\" try \"how to make carbonara.\" Instead of \"cars,\" use \"Tesla Model 3 review.\" This level of detail provides the necessary context for the generator to find niche, targeted keywords that are less competitive and have higher search intent."] }), _jsxs("li", { children: [_jsx("strong", { children: "Adopt the Viewer's Mindset:" }), " Put yourself in the shoes of your ideal viewer. What phrases would they type into the YouTube search bar if they were looking for your video? Use these natural language queries as your seed keywords. For example, a user is more likely to search \"best budget gaming laptop 2025\" than just \"laptop.\""] }), _jsxs("li", { children: [_jsx("strong", { children: "Generate, Curate, and Refine:" }), " The generated list is a powerful starting point, not a final answer. Your expertise as the creator is invaluable. Review the list and critically assess each tag. Remove any that are not a perfect match for your specific video content. The goal is to build a highly relevant, focused list that accurately describes your video."] }), _jsxs("li", { children: [_jsx("strong", { children: "Iterate and Experiment:" }), " Don't be afraid to run the generator a few times with different seed keywords. Try a primary topic, then a secondary one. For a video on \"iPhone photography tips,\" you could generate tags for that phrase, and then also for \"how to edit photos on iPhone.\" Blending the results can create an even more robust tag list."] })] })] })] }), _jsxs("section", { children: [_jsxs("h2", { className: "text-2xl font-bold tracking-tight flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-7 w-7 text-primary" }), "From Generation to Implementation: Best Practices"] }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Once you have your curated list of tags, applying them correctly is key. Simply having good tags isn't enough; they need to be structured strategically within the 500-character limit YouTube provides. Here\u2019s how to make your tags work for you:" }), _jsxs("ol", { className: "list-decimal list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Prioritize Your Primary Keyword:" }), " The first tag you list should always be your main target keyword\u2014the most important search term you want to rank for. The YouTube algorithm places more emphasis on the initial tags, so this signals its importance."] }), _jsxs("li", { children: [_jsx("strong", { children: "Balance Broad and Niche:" }), " A winning strategy involves a mix of tag types. Include 2-3 broad tags (e.g., \"fitness,\" \"workout\") to establish the general category. Then, dedicate the majority of your tags to specific, long-tail phrases (e.g., \"15 minute at home HIIT workout no equipment\"). The broad tags help with overall content association, while the long-tail tags help you win less competitive, high-intent searches."] }), _jsxs("li", { children: [_jsx("strong", { children: "Maintain Unwavering Relevance:" }), " Never use a tag that isn't directly related to your video, no matter how popular it is. Using misleading tags (e.g., adding a celebrity's name to a video they're not in) is a practice known as \"tag stuffing.\" It violates YouTube's community guidelines and can lead to penalties, including reduced visibility or even video removal."] }), _jsxs("li", { children: [_jsx("strong", { children: "Embrace Your Brand:" }), " Consistently include your channel name or a unique brand identifier as a tag in every video. This simple action helps the algorithm understand that your content is related, significantly increasing the chances that your other videos will be recommended in the \"Up Next\" sidebar when someone is watching your content."] }), _jsxs("li", { children: [_jsx("strong", { children: "Spy on the Competition (Ethically):" }), " Use our companion ", _jsx("a", { href: "/tools/youtube-tools/youtube-tag-extractor", className: "text-primary underline", children: "YouTube Tag Extractor" }), " tool. Look at the tags of the top 3-5 videos ranking for your target keyword. This isn't about copying them verbatim, but about identifying keyword patterns and discovering effective tags you may have missed."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "mt-4 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Are generated tags as good as manually researched ones?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "They can be even better. Our generator leverages a massive dataset of keyword relationships that would be impossible for a human to process manually. It identifies patterns and connections you might miss. The best approach is a hybrid one: use the generator for speed and breadth, then use your human expertise to refine the list for perfect relevance." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "How many tags should I generate and use?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "While our tool can generate up to 30 tags, you don't have to use all of them. The sweet spot for most videos is between 15 and 30 tags. This provides enough data for the algorithm without diluting the focus. Always prioritize the quality and relevance of your tags over hitting a specific number." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can I get my channel in trouble for using a tag generator?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Not at all. Using a tag generator is a completely safe and legitimate SEO strategy. The tool is designed to help you brainstorm and find relevant keywords more efficiently. Trouble only arises if you use the generated tags irresponsibly, such as by using misleading tags that don't match your video's content." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Should I put tags in my video description?" }), _jsxs("p", { className: "text-muted-foreground mt-1", children: ["You should focus on two things: ", _jsx("strong", { children: "tags" }), " in the dedicated tag box and ", _jsx("strong", { children: "hashtags" }), " in the description. Don't paste a block of comma-separated keywords in your description; this is an outdated practice called \"keyword stuffing\" and is penalized by YouTube. Instead, you can use up to 15 relevant #hashtags in your description to aid discovery. Three of these may be shown above your video title."] })] })] })] })] })] }));
};
export default YouTubeTagGeneratorTool;
