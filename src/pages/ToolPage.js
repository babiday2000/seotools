import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { tools, toolCategories } from '@/data/tools';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';
const ToolPage = () => {
    const { category, slug } = useParams();
    const tool = tools.find(t => {
        const categorySlug = toolCategories[t.category]?.slug;
        return categorySlug === category && t.slug === slug;
    });
    if (!tool) {
        return _jsx("div", { children: "Tool not found" });
    }
    const ToolComponent = tool.component;
    return (_jsxs(_Fragment, { children: [_jsx(Seo, { title: `${tool.name} | Seotooler`, description: tool.description }), _jsxs("div", { className: "space-y-12", children: [_jsxs("section", { className: "text-center", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-extrabold tracking-tighter mb-4", children: tool.name }), _jsx("p", { className: "max-w-2xl mx-auto text-lg text-muted-foreground", children: tool.description })] }), _jsx(AdsensePlaceholder, { className: "mx-auto", width: "90%", height: 90 }), _jsx("section", { className: "p-4 sm:p-6 md:p-8 border rounded-lg bg-card", children: _jsx(ToolComponent, {}) }), _jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [_jsx("div", { className: "md:col-span-2 prose dark:prose-invert max-w-none", dangerouslySetInnerHTML: { __html: tool.longDescription } }), _jsx("aside", { className: "space-y-6", children: _jsx(AdsensePlaceholder, { height: 600 }) })] })] })] }));
};
export default ToolPage;
