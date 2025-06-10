import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Wand2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
const YouTubeDescriptionGeneratorTool = () => {
    const [videoTitle, setVideoTitle] = useState('');
    const [keywords, setKeywords] = useState('');
    const [generatedDesc, setGeneratedDesc] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const generateDescription = () => {
        if (!videoTitle.trim()) {
            toast.error('Please enter a video title.');
            return;
        }
        setIsLoading(true);
        const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
        const keywordText = keywordList.length > 0 ? `We'll cover topics like ${keywordList.join(', ')}.` : '';
        const template = `
👋 In this video, "${videoTitle}", we dive deep into the topic to bring you a comprehensive guide. ${keywordText}

Whether you're a beginner just starting out or an expert looking for advanced tips, this video has something for you. We'll walk you through everything you need to know, step-by-step.

🔔 SUBSCRIBE for more content like this: [Your Channel Link]

✅ In this tutorial, you'll learn:
- Point 1
- Point 2
- Point 3

🔗 Important Links & Resources:
- [Link to your website or a relevant resource]
- [Another useful link]

💬 Let's Connect:
- Instagram: [Your Instagram Link]
- Twitter: [Your Twitter Link]
- Website: [Your Website Link]

#Hashtag1 #Hashtag2 #Hashtag3

Thanks for watching!
    `;
        setGeneratedDesc(template.trim());
        setIsLoading(false);
        toast.success('Description generated!');
    };
    const handleCopy = () => {
        if (generatedDesc) {
            navigator.clipboard.writeText(generatedDesc);
            toast.success('Description copied to clipboard!');
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Description Generator" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Create SEO-friendly and well-structured YouTube descriptions in seconds. Our tool provides a proven template to help you rank higher and engage your audience effectively." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Description Generator" }), _jsx(CardDescription, { children: "Fill in the details below to generate a description template." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "video-title", className: "font-medium", children: "Video Title" }), _jsx(Input, { id: "video-title", placeholder: "e.g., How to Make the Perfect Sourdough Bread", value: videoTitle, onChange: (e) => setVideoTitle(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "keywords", className: "font-medium", children: "Main Keywords (comma-separated)" }), _jsx(Input, { id: "keywords", placeholder: "e.g., sourdough, baking, bread making", value: keywords, onChange: (e) => setKeywords(e.target.value) })] }), _jsxs(Button, { onClick: generateDescription, disabled: isLoading, children: [isLoading ? _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : _jsx(Wand2, { className: "mr-2 h-4 w-4" }), "Generate Description"] })] })] }), generatedDesc && (_jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { children: "Generated Description" }), _jsx(Button, { variant: "outline", size: "icon", onClick: handleCopy, children: _jsx(Copy, { className: "h-4 w-4" }) })] }), _jsx(CardDescription, { children: "Copy and paste this into your YouTube description box. Be sure to fill in the bracketed information!" })] }), _jsx(CardContent, { children: _jsx(Textarea, { readOnly: true, value: generatedDesc, className: "h-96 text-sm" }) })] })), _jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 mt-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is a YouTube Description Generator?" }), _jsx("p", { className: "text-muted-foreground", children: "A YouTube Description Generator is a tool that helps creators quickly produce structured, SEO-friendly descriptions for their videos. The description is a critical piece of metadata that YouTube's algorithm uses to understand the content and context of your video. A well-written description can improve your video's ranking in search results, increase its visibility in suggested feeds, and provide valuable information to your viewers. Our generator uses a proven template that incorporates best practices for SEO and user engagement, saving you time and helping you create effective descriptions consistently." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "The Importance of a Good Video Description" }), _jsx("p", { className: "text-muted-foreground", children: "Many creators underestimate the power of the video description, but it serves several vital functions:" }), _jsxs("ul", { className: "list-disc list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Search Engine Optimization (SEO):" }), " The description is a prime location to include relevant keywords that help YouTube and Google understand what your video is about, improving its chances of ranking for those terms."] }), _jsxs("li", { children: [_jsx("strong", { children: "Viewer Engagement:" }), " It provides a space to give viewers more context, link to resources, and encourage them to subscribe or visit your other social media profiles."] }), _jsxs("li", { children: [_jsx("strong", { children: "Monetization:" }), " You can include affiliate links or links to your own products and services, turning your description into a revenue-generating asset."] }), _jsxs("li", { children: [_jsx("strong", { children: "Credibility and Professionalism:" }), " A well-structured, informative description makes your channel look more professional and trustworthy."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the Description Generator" }), _jsx("p", { className: "text-muted-foreground", children: "Creating a professional description is easy with our tool:" }), _jsxs("ol", { className: "list-decimal list-inside text-muted-foreground space-y-2 mt-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Enter Your Video Title:" }), " Provide the title of your video to set the main context."] }), _jsxs("li", { children: [_jsx("strong", { children: "Add Main Keywords:" }), " List the primary keywords or topics your video covers, separated by commas. This will help the generator craft an SEO-focused paragraph."] }), _jsxs("li", { children: [_jsx("strong", { children: "Generate the Template:" }), " Click the \"Generate Description\" button. The tool will produce a structured template with placeholders."] }), _jsxs("li", { children: [_jsx("strong", { children: "Customize and Copy:" }), " Fill in the bracketed information (e.g., [Your Channel Link], [Link to your website]) and then copy the full description to your clipboard, ready to be pasted into YouTube."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is the generated description unique?" }), _jsx("p", { className: "text-muted-foreground", children: "The tool generates a standardized template based on your inputs. We highly recommend customizing the \"In this tutorial, you'll learn\" section and adding your own unique voice to the introductory paragraph to make it your own." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "How many keywords should I use?" }), _jsx("p", { className: "text-muted-foreground", children: "Focus on 2-3 main keywords that accurately describe your video. It's better to be specific and relevant than to stuff the description with too many keywords." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Where should I place the most important information?" }), _jsx("p", { className: "text-muted-foreground", children: "The first 2-3 lines of your description are the most important, as this is what viewers see before clicking \"Show more.\" Include your most important keywords and a compelling hook in this section." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { className: "text-muted-foreground", children: "YouTube's description box can hold up to 5,000 characters, which is roughly equivalent to 800 words. While you don't need to use all of that space, it highlights how much value YouTube places on the description as a source of information for its algorithm and its users." })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Related Tools" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs("a", { href: "/tools/youtube-tools/youtube-tag-generator", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Tag Generator" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Generate SEO-optimized tags for your videos." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-title-generator", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Title Generator" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Create catchy and clickable titles for your videos." })] }), _jsxs("a", { href: "/tools/youtube-tools/youtube-hashtag-generator", className: "block p-4 border rounded-lg hover:bg-muted", children: [_jsx("h3", { className: "font-semibold", children: "YouTube Hashtag Generator" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Find relevant hashtags to boost your video's reach." })] })] })] })] })] }));
};
export default YouTubeDescriptionGeneratorTool;
