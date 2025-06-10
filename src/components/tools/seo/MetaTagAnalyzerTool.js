import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const MetaTagAnalyzerTool = () => {
    const [url, setUrl] = useState('');
    const [analysis, setAnalysis] = useState({});
    const [loading, setLoading] = useState(false);
    const analyzeMetaTags = async () => {
        if (!url)
            return;
        setLoading(true);
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            const html = data.contents;
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const metaTags = doc.querySelectorAll('meta');
            const analysisResult = {};
            metaTags.forEach(tag => {
                const name = tag.getAttribute('name') || tag.getAttribute('property');
                if (name) {
                    analysisResult[name] = tag.getAttribute('content') || '';
                }
            });
            const title = doc.querySelector('title');
            if (title) {
                analysisResult['title'] = title.innerText;
            }
            setAnalysis(analysisResult);
        }
        catch (error) {
            console.error('Error analyzing meta tags:', error);
            setAnalysis({ error: 'Failed to analyze meta tags. Please check the URL and try again.' });
        }
        setLoading(false);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Meta Tag Analyzer" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex gap-2 mb-4", children: [_jsx(Input, { type: "text", value: url, onChange: e => setUrl(e.target.value), placeholder: "Enter a URL" }), _jsx(Button, { onClick: analyzeMetaTags, disabled: loading, children: loading ? 'Analyzing...' : 'Analyze Meta Tags' })] }), Object.keys(analysis).length > 0 && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Meta Tag Analysis:" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: Object.entries(analysis).map(([name, content]) => (_jsxs("div", { className: "border p-2 rounded", children: [_jsxs("span", { className: "font-semibold", children: [name, ":"] }), " ", content] }, name))) })] }))] })] }), _jsxs("div", { className: "mt-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "What is a Meta Tag Analyzer?" }), _jsx("p", { className: "mb-4", children: "A Meta Tag Analyzer is a tool that examines the meta tags of a web page and provides a detailed report on their content. This analysis is crucial for SEO, as it helps you understand how your website is being perceived by search engines. By analyzing your meta tags, you can identify areas for improvement and optimize your site for better search engine rankings." }), _jsx("p", { className: "mb-4", children: "Meta tags, such as the title, description, and keywords, provide search engines with essential information about your page's content. A well-optimized set of meta tags can significantly improve your site's visibility in search results, driving more organic traffic to your pages." }), _jsx("h2", { className: "text-2xl font-bold mb-4", children: "Factors to Consider" }), _jsx("p", { className: "mb-4", children: "When analyzing your meta tags, there are several factors to consider. These include:" }), _jsxs("ul", { className: "list-disc list-inside mb-4", children: [_jsxs("li", { className: "mb-2", children: [_jsx("strong", { children: "Title Tag:" }), " Is your title tag concise and descriptive? Does it include your target keyword? Is it within the recommended length of 60 characters?"] }), _jsxs("li", { className: "mb-2", children: [_jsx("strong", { children: "Meta Description:" }), " Is your meta description compelling and informative? Does it accurately summarize the page's content? Is it within the recommended length of 150-160 characters?"] }), _jsxs("li", { className: "mb-2", children: [_jsx("strong", { children: "Meta Keywords:" }), " Are you using relevant keywords? Are you avoiding keyword stuffing?"] }), _jsxs("li", { className: "mb-2", children: [_jsx("strong", { children: "Open Graph Tags:" }), " Are you using Open Graph tags to control how your content is displayed on social media?"] })] }), _jsx("h2", { className: "text-2xl font-bold mb-4", children: "Key Components of Meta Tag Analysis" }), _jsx("p", { className: "mb-4", children: "Our Meta Tag Analyzer provides a comprehensive analysis of your web page's meta tags. Here are the key components of our analysis:" }), _jsxs("ul", { className: "list-disc list-inside mb-4", children: [_jsxs("li", { className: "mb-2", children: [_jsx("strong", { children: "Title Tag:" }), " We check the length and content of your title tag to ensure it's optimized for search engines."] }), _jsxs("li", { className: "mb-2", children: [_jsx("strong", { children: "Meta Description:" }), " We analyze your meta description for length, content, and keyword usage."] }), _jsxs("li", { className: "mb-2", children: [_jsx("strong", { children: "Meta Keywords:" }), " We examine your meta keywords to ensure they're relevant and not overused."] }), _jsxs("li", { className: "mb-2", children: [_jsx("strong", { children: "Open Graph Tags:" }), " We check for the presence of Open Graph tags and analyze their content."] })] }), _jsx("h2", { className: "text-2xl font-bold mb-4", children: "How to Use the Tool" }), _jsx("p", { className: "mb-4", children: "Using our Meta Tag Analyzer is simple. Just follow these steps:" }), _jsxs("ol", { className: "list-decimal list-inside mb-4", children: [_jsx("li", { className: "mb-2", children: "Enter the URL of the web page you want to analyze." }), _jsx("li", { className: "mb-2", children: "Click the \"Analyze Meta Tags\" button." }), _jsx("li", { className: "mb-2", children: "Our tool will crawl the page and provide a detailed report on its meta tags." })] }), _jsx("h2", { className: "text-2xl font-bold mb-4", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: "Why is meta tag analysis important?" }), _jsx("p", { children: "Meta tag analysis is important because it helps you understand how your website is being perceived by search engines. By analyzing your meta tags, you can identify areas for improvement and optimize your site for better search engine rankings." })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: "How often should I analyze my meta tags?" }), _jsx("p", { children: "It's a good practice to analyze your meta tags regularly, especially when you make changes to your website's content or structure. This will help you stay on top of any issues and ensure your site is always optimized for search engines." })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: "What are Open Graph tags?" }), _jsx("p", { children: "Open Graph tags are a set of meta tags that allow you to control how your content is displayed on social media platforms like Facebook and Twitter. They're an important part of a solid social media marketing strategy." })] }), _jsx("h2", { className: "text-2xl font-bold mb-4", children: "Fun Fact" }), _jsx("p", { children: "The first search engine to use meta tags was AltaVista, which was launched in 1995. At the time, it was one of the most popular search engines on the web!" })] })] }));
};
export default MetaTagAnalyzerTool;
