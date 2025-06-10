import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, BarChart, Link as LinkIcon, HelpCircle, TrendingUp, Zap } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
const features = [
    {
        icon: _jsx(Search, { className: "h-8 w-8 text-primary" }),
        title: 'YouTube Keyword Research',
        description: 'Find high-ranking keywords, analyze keyword difficulty, and get content ideas to attract more viewers to your YouTube channel.',
    },
    {
        icon: _jsx(BarChart, { className: "h-8 w-8 text-primary" }),
        title: 'Video Rank Tracking',
        description: 'Monitor your YouTube video rankings for target keywords, track performance over time, and spy on your competitors.',
    },
    {
        icon: _jsx(LinkIcon, { className: "h-8 w-8 text-primary" }),
        title: 'Channel Analysis',
        description: 'Get in-depth analytics of your YouTube channel, understand your audience, and discover growth opportunities.',
    },
];
const testimonials = [
    {
        name: 'AlexTube',
        title: 'YouTube Creator',
        avatar: 'https://i.pravatar.cc/150?img=3',
        quote: "Seotooler's YouTube tools have been a game-changer for my channel. I've been able to grow my audience and increase my views by 50% in just a few months!",
    },
    {
        name: 'CreativeFlow',
        title: 'Content Creator',
        avatar: 'https://i.pravatar.cc/150?img=4',
        quote: "I love how easy it is to use Seotooler's tools. They've helped me optimize my videos and get more subscribers. I highly recommend it to any YouTube creator.",
    },
];
const faqs = [
    {
        question: "What is Seotooler and how can it help my YouTube channel?",
        answer: "Seotooler is a comprehensive suite of SEO tools designed specifically for YouTube creators. It helps you with keyword research, rank tracking, channel analysis, and more, to improve your video visibility, attract more subscribers, and grow your channel."
    },
    {
        question: "Are the tools offered by Seotooler completely free?",
        answer: "Yes, all tools currently available on Seotooler are completely free to use. Our mission is to provide powerful and accessible SEO tools to help creators of all sizes succeed on YouTube."
    },
    {
        question: "How does the YouTube Keyword Research tool work?",
        answer: "Our Keyword Research tool analyzes YouTube search trends and provides you with a list of relevant keywords for your niche. It also shows you keyword difficulty and search volume, helping you choose the best topics for your videos to rank higher in search results."
    },
    {
        question: "Can I track my video rankings with Seotooler?",
        answer: "Absolutely! Our Video Rank Tracking tool allows you to monitor your video's performance for specific keywords on YouTube. This helps you understand what's working and what's not, so you can optimize your content strategy."
    }
];
const HomePage = () => {
    const navigate = useNavigate();
    return (_jsxs(_Fragment, { children: [_jsx(Seo, { title: "Free YouTube SEO Tools | Rank Higher on YouTube with Seotooler", description: "Boost your YouTube channel's performance with our powerful and free SEO tools. Get more views, subscribers, and revenue with Seotooler's keyword research, rank tracking, and channel analysis tools." }), _jsxs("div", { className: "space-y-24", children: [_jsxs("section", { className: "text-center animate-fade-in", children: [_jsx("h1", { className: "text-4xl md:text-6xl font-extrabold tracking-tighter mb-4", children: "Unlock Your YouTube Potential with Top-Tier SEO Tools" }), _jsx("p", { className: "max-w-3xl mx-auto text-lg text-muted-foreground mb-8", children: "Elevate your YouTube channel with our suite of free, powerful SEO tools. From in-depth keyword research to comprehensive video optimization, Seotooler is your partner in climbing the ranks." }), _jsx("div", { className: "flex justify-center gap-4", children: _jsx(Button, { size: "lg", onClick: () => navigate('/tools'), className: "text-lg px-8 py-6", children: "Explore Free Tools" }) })] }), _jsxs("section", { children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl font-bold", children: "Everything You Need to Succeed on YouTube" }), _jsx("p", { className: "text-muted-foreground mt-3 text-lg", children: "A complete toolkit to improve your channel's visibility and growth." })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: features.map((feature, index) => (_jsxs(Card, { className: "transition-transform duration-300 hover:scale-105 hover:shadow-xl", style: { animationDelay: `${index * 150}ms` }, children: [_jsxs(CardHeader, { className: "items-center text-center", children: [feature.icon, _jsx(CardTitle, { className: "mt-4 text-xl", children: feature.title })] }), _jsx(CardContent, { className: "text-center text-muted-foreground", children: feature.description })] }, feature.title))) })] }), _jsxs("section", { className: "bg-secondary/50 py-20 px-8 rounded-lg", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-4xl font-bold", children: "Why Seotooler is the Best Choice for YouTubers" }), _jsx("p", { className: "text-muted-foreground mt-3 text-lg", children: "We are dedicated to your growth. Here\u2019s what makes our tools stand out." })] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-10 text-center", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(TrendingUp, { className: "h-12 w-12 text-primary mb-4" }), _jsx("h3", { className: "text-2xl font-semibold mb-2", children: "Drive Growth" }), _jsx("p", { className: "text-muted-foreground", children: "Our tools are designed to provide actionable insights that translate into real growth for your channel, helping you gain more subscribers and views." })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Zap, { className: "h-12 w-12 text-primary mb-4" }), _jsx("h3", { className: "text-2xl font-semibold mb-2", children: "Easy to Use" }), _jsx("p", { className: "text-muted-foreground", children: "Get started in seconds with our intuitive, user-friendly interface. No technical expertise required to become an SEO pro." })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(HelpCircle, { className: "h-12 w-12 text-primary mb-4" }), _jsx("h3", { className: "text-2xl font-semibold mb-2", children: "Completely Free" }), _jsx("p", { className: "text-muted-foreground", children: "Access all our powerful SEO tools without any cost. We believe in empowering creators to succeed without barriers." })] })] })] }), _jsxs("section", { children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-4xl font-bold", children: "Loved by Creators Worldwide" }), _jsx("p", { className: "text-muted-foreground mt-3 text-lg", children: "Don't just take our word for it. Here's what our users say." })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: testimonials.map((testimonial) => (_jsx(Card, { className: "p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("p", { className: "text-muted-foreground text-lg mb-6", children: ["\"", testimonial.quote, "\""] }), _jsxs("div", { className: "flex items-center", children: [_jsxs(Avatar, { className: "h-12 w-12", children: [_jsx(AvatarImage, { src: testimonial.avatar, alt: testimonial.name }), _jsx(AvatarFallback, { children: testimonial.name.charAt(0) })] }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "font-semibold text-lg", children: testimonial.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: testimonial.title })] })] })] }) }, testimonial.name))) })] }), _jsxs("section", { children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-4xl font-bold", children: "Frequently Asked Questions" }), _jsx("p", { className: "text-muted-foreground mt-3 text-lg", children: "Have questions? We've got answers." })] }), _jsx(Accordion, { type: "single", collapsible: true, className: "w-full max-w-3xl mx-auto", children: faqs.map((faq, index) => (_jsxs(AccordionItem, { value: `item-${index}`, children: [_jsx(AccordionTrigger, { className: "text-lg text-left", children: faq.question }), _jsx(AccordionContent, { className: "text-base text-muted-foreground", children: faq.answer })] }, index))) })] }), _jsxs("section", { className: "text-center bg-primary text-primary-foreground py-16 rounded-lg", children: [_jsx("h2", { className: "text-4xl font-bold mb-4", children: "Ready to Grow Your YouTube Channel?" }), _jsx("p", { className: "text-lg mb-8 max-w-2xl mx-auto", children: "Start using our free SEO tools today and see the difference they can make." }), _jsx(Button, { size: "lg", onClick: () => navigate('/tools'), variant: "secondary", className: "text-lg px-10 py-6", children: "Get Started Now" })] })] })] }));
};
export default HomePage;
