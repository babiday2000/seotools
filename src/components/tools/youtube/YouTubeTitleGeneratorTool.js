import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Loader2, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
const YouTubeTitleGeneratorTool = () => {
    const [keyword, setKeyword] = useState('');
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const titleCase = (s) => s.toLowerCase().split(' ').map(word => capitalize(word)).join(' ');
    const generateTitles = (baseKeyword) => {
        if (!baseKeyword.trim()) {
            toast.error('Please enter a keyword to generate titles.');
            return [];
        }
        const kw = titleCase(baseKeyword);
        const kwLower = baseKeyword.toLowerCase();
        const year = new Date().getFullYear();
        const patterns = {
            howTo: [
                `How to ${kw}: The Ultimate Guide`,
                `How to Master ${kw} in ${Math.floor(Math.random() * 10) + 5} Minutes`,
                `The Right Way to Do ${kw} (You're Probably Doing It Wrong)`,
            ],
            listicle: [
                `${Math.floor(Math.random() * 5) + 3} ${kw} Mistakes to Avoid`,
                `${Math.floor(Math.random() * 8) + 5} Must-Know Tips for ${kw}`,
                `The Top ${Math.floor(Math.random() * 3) + 3} Tools for ${kw} in ${year}`,
            ],
            question: [
                `Is ${kw} Still Worth It in ${year}?`,
                `What They Don't Tell You About ${kw}`,
                `Are You Making These ${kw} Errors?`,
            ],
            curiosity: [
                `The #1 Secret to ${kw}`,
                `This Simple Trick Will Change Your ${kw} Forever`,
                `Why Your ${kw} Strategy Is Failing (And How to Fix It)`,
            ],
            negative: [
                `Don't Try ${kw} Until You Watch This`,
                `The Biggest Lie About ${kw}`,
                `Stop Wasting Time on ${kwLower} - Do This Instead`,
            ],
        };
        const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
        let allTitles = [];
        Object.values(patterns).forEach(p => {
            allTitles = [...allTitles, ...shuffle(p).slice(0, 2)];
        });
        return shuffle(allTitles);
    };
    const handleGenerate = () => {
        setIsLoading(true);
        const newTitles = generateTitles(keyword);
        setTitles(newTitles);
        setIsLoading(false);
        if (newTitles.length > 0) {
            toast.success('Catchy titles generated!');
        }
    };
    const handleCopyToClipboard = (title) => {
        navigator.clipboard.writeText(title);
        toast.success('Title copied to clipboard!');
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "YouTube Title Generator" }), _jsx("p", { className: "mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", children: "Generate dozens of catchy, clickable, and SEO-friendly title ideas for your videos in seconds. Overcome writer's block and create headlines that demand attention, boost click-through rates, and help your content get discovered by the right audience." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Title Idea Engine" }), _jsx(CardDescription, { children: "Enter your main keyword or topic to get started." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "text", placeholder: "e.g., 'sourdough baking', 'landscape photography'", value: keyword, onChange: (e) => setKeyword(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleGenerate(), className: "flex-grow" }), _jsx(Button, { onClick: handleGenerate, disabled: isLoading, className: "w-full sm:w-auto", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Generating..."] })) : ('Generate Titles') })] }), titles.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-xl font-semibold", children: ["Generated Titles (", titles.length, ")"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: titles.map((title, index) => (_jsxs(Card, { className: "flex items-center justify-between p-4", children: [_jsx("p", { className: "flex-grow pr-4 text-sm", children: title }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleCopyToClipboard(title), children: _jsx(Copy, { className: "h-4 w-4" }) })] }, index))) })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto grid gap-8 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Lightbulb, { className: "h-6 w-6 text-primary" }), " Why Your Title is Crucial"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Your video title is the single most important piece of text associated with your video. It's the primary factor, along with your thumbnail, that determines whether a viewer will click to watch." }), _jsx("p", { children: "A great title makes a promise to the viewer, creates curiosity, and clearly communicates the video's value. It's your first and best chance to grab someone's attention in a crowded feed. A powerful title can be the difference between a video that gets 100 views and one that gets 100,000." })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-primary" }), " Common Title Mistakes"] }) }), _jsxs(CardContent, { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Many creators fail to maximize their potential due to weak titles. Common mistakes include:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Boring & Vague:" }), " Titles like \"My Vlog Day 5\" or \"New Video\" give no reason to click. They don't communicate value or topic."] }), _jsxs("li", { children: [_jsx("strong", { children: "Too Long:" }), " Titles get cut off after ~70 characters on most devices. The most important information must be at the beginning."] }), _jsxs("li", { children: [_jsx("strong", { children: "No Keywords:" }), " Failing to include search terms makes you invisible to the algorithm and to users searching for your topic."] }), _jsxs("li", { children: [_jsx("strong", { children: "Clickbait:" }), " Over-promising and under-delivering hurts your channel's reputation and watch time, signaling to YouTube that your content is low quality."] })] })] })] })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-6 w-6 text-primary" }), " Best Practices for High-Performing Titles"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("ul", { className: "list-disc list-inside space-y-3 text-muted-foreground", children: [_jsxs("li", { children: [_jsx("strong", { children: "Include Your Main Keyword:" }), " Place your most important keyword(s) naturally within the title, preferably near the beginning. This helps with both search ranking and user comprehension."] }), _jsxs("li", { children: [_jsx("strong", { children: "Use Numbers & Lists:" }), " Titles like \"7 Ways to...\" or \"Top 5...\" are highly clickable because they set clear expectations and promise a structured, easy-to-digest format."] }), _jsxs("li", { children: [_jsx("strong", { children: "Create Curiosity (Without Clickbaiting):" }), " Ask a question ('Are you making this mistake?'), hint at a secret, or use powerful words ('Ultimate', 'Definitive', 'Simple') to make viewers want to know the answer."] }), _jsxs("li", { children: [_jsx("strong", { children: "Keep it Concise:" }), " Aim for 60-70 characters to ensure your full title is visible in search results and on mobile devices. Front-load the most impactful words."] }), _jsxs("li", { children: [_jsx("strong", { children: "Highlight the Value:" }), " Clearly state what the viewer will learn or gain from watching. Use words like \"Guide,\" \"Tutorial,\" \"Review,\" \"Tips,\" or \"Tricks\" to signal the video's purpose."] }), _jsxs("li", { children: [_jsx("strong", { children: "A/B Test Your Ideas:" }), " Don't just settle on the first title you think of. Use this generator to brainstorm multiple options and pick the one that feels most compelling. You can even change titles on older videos to see if it improves performance."] })] }) })] })] }));
};
export default YouTubeTitleGeneratorTool;
