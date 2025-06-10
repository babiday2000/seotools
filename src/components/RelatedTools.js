import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
const RelatedTools = ({ category, currentToolName }) => {
    const relatedTools = tools
        .filter(tool => tool.category === category && tool.name !== currentToolName)
        .slice(0, 4);
    if (relatedTools.length === 0) {
        return null;
    }
    return (_jsxs("div", { className: "mt-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Related Tools" }), _jsx("div", { className: "flex flex-wrap gap-4", children: relatedTools.map((tool) => (_jsx(Link, { to: `/tools/${tool.category}/${tool.slug}`, children: _jsx(Button, { variant: "default", className: "transform transition-transform duration-300 hover:scale-105", children: tool.name }) }, tool.name))) })] }));
};
export default RelatedTools;
