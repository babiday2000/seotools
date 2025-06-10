import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useParams } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Seo } from '@/components/Seo';
import { toolCategories, tools } from '@/data/tools';
import { ArrowRight } from 'lucide-react';
const ToolCategoryPage = () => {
    const { category: categorySlug } = useParams();
    const category = Object.values(toolCategories).find(c => c.slug === categorySlug);
    const categoryTools = tools.filter(tool => tool.category === categorySlug);
    if (!category) {
        return _jsx("div", { children: "Category not found" });
    }
    return (_jsxs(_Fragment, { children: [_jsx(Seo, { title: `${category.name} | Seotooler`, description: category.description }), _jsxs("div", { className: "space-y-12", children: [_jsxs("section", { className: "text-center", children: [_jsx("div", { className: "inline-block bg-primary/10 p-4 rounded-full mb-4", children: category.icon }), _jsx("h1", { className: "text-4xl md:text-5xl font-extrabold tracking-tighter mb-4", children: category.name }), _jsx("p", { className: "max-w-2xl mx-auto text-lg text-muted-foreground", children: category.description })] }), _jsx("section", { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: categoryTools.map((tool) => (_jsx(Link, { to: `/tools/${category.slug}/${tool.slug}`, className: "block hover:scale-105 transition-transform duration-200", children: _jsxs(Card, { className: "h-full flex flex-col justify-between", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: tool.name }), _jsx(CardDescription, { children: tool.description })] }), _jsx("div", { className: "p-6 pt-0 flex justify-end", children: _jsx(ArrowRight, { className: "h-5 w-5 text-primary" }) })] }) }, tool.slug))) }) })] })] }));
};
export default ToolCategoryPage;
