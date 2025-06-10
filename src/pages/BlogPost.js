import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Seo } from '@/components/Seo';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';
import { blogPosts } from '@/data/blog';
const BlogPostPage = () => {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) {
        return _jsx("div", { children: "Post not found" });
    }
    const postContent = `
    <p>Search Engine Optimization (SEO) can seem daunting, but at its core, it's about making your website more visible to people who are looking for your products or services via search engines like Google, Bing, and Yahoo.</p>
    <h2 class="text-2xl font-bold mt-8 mb-4">1. Understand Your Audience and Keywords</h2>
    <p>Before you do anything else, you need to understand who you're trying to reach. What terms are they searching for? Tools like our Keyword Research tool can help you discover what your audience is looking for and how competitive those keywords are.</p>
    <h2 class="text-2xl font-bold mt-8 mb-4">2. Optimize Your Page Titles and Meta Descriptions</h2>
    <p>Your page title and meta description are the first things users see in search results. Make them compelling and include your primary keyword. A good title tag is typically 50-60 characters long.</p>
    <h2 class="text-2xl font-bold mt-8 mb-4">3. Create High-Quality, Relevant Content</h2>
    <p>Content is king. Create informative, engaging, and original content that answers your audience's questions. This is the single most important factor for ranking well.</p>
    <p class="mt-4">This includes blog posts, product pages, guides, and more. The more value you provide, the more likely other sites are to link to you, and the more Google will see you as an authority.</p>
    <blockquote class="border-l-4 border-primary pl-4 italic my-6">"The best way to rank is to deserve to rank." - Rand Fishkin</blockquote>
    <h2 class="text-2xl font-bold mt-8 mb-4">4. Improve Your Site's Loading Speed</h2>
    <p>Page speed is a confirmed ranking factor. Use tools like Google's PageSpeed Insights or our Page Speed Test to see how your site performs and get recommendations for improvement.</p>
    <h2 class="text-2xl font-bold mt-8 mb-4">5. Ensure Your Site is Mobile-Friendly</h2>
    <p>With mobile-first indexing, Google primarily uses the mobile version of your content for indexing and ranking. Your site must be responsive and provide a good user experience on all devices.</p>
  `;
    return (_jsxs(_Fragment, { children: [_jsx(Seo, { title: post.title, description: post.description, type: "article" }), _jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs("article", { className: "grid lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsxs("header", { className: "mb-8", children: [_jsx("div", { className: "flex gap-2 mb-4", children: post.tags.map(tag => _jsx(Badge, { variant: "secondary", children: tag }, tag)) }), _jsx("h1", { className: "text-4xl md:text-5xl font-extrabold tracking-tighter mb-4", children: post.title }), _jsxs("div", { className: "flex items-center space-x-4 text-muted-foreground", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: post.authorAvatar }), _jsx(AvatarFallback, { children: post.author.charAt(0) })] }), _jsx("span", { children: post.author })] }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: post.date })] })] }), _jsx("img", { src: post.imageUrl, alt: post.title, className: "w-full rounded-lg mb-8" }), _jsx("div", { className: "prose dark:prose-invert max-w-none", dangerouslySetInnerHTML: { __html: postContent } })] }), _jsxs("aside", { className: "lg:col-span-1 space-y-8", children: [_jsx(AdsensePlaceholder, { height: 250 }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Related Posts" }) }), _jsx(CardContent, { children: _jsxs("ul", { className: "space-y-2", children: [_jsx("li", { children: _jsx(Link, { to: "/blog/mastering-keyword-research-ultimate-guide", className: "text-muted-foreground hover:text-foreground", children: "Mastering Keyword Research" }) }), _jsx("li", { children: _jsx(Link, { to: "/blog/ultimate-guide-youtube-tools-creators", className: "text-muted-foreground hover:text-foreground", children: "The Ultimate Guide to YouTube Tools for Creators" }) })] }) })] }), _jsx(AdsensePlaceholder, { height: 250 })] })] }) })] }));
};
export default BlogPostPage;
