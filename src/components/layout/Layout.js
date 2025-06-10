import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './Header';
import Footer from './Footer';
import RelatedTools from '../RelatedTools';
import { useLocation } from 'react-router-dom';
import { tools, toolCategories } from '@/data/tools';
const Layout = ({ children }) => {
    const location = useLocation();
    const pathParts = location.pathname.split('/').filter(Boolean);
    const isToolPage = pathParts[0] === 'tools' && pathParts.length === 3;
    let category = '';
    let currentToolName = '';
    if (isToolPage) {
        const tool = tools.find(t => {
            const categorySlug = toolCategories[t.category]?.slug;
            return categorySlug === pathParts[1] && t.slug === pathParts[2];
        });
        if (tool) {
            category = tool.category;
            currentToolName = tool.name;
            console.log('Category:', category);
        }
    }
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Header, {}), _jsxs("main", { className: "flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [children, isToolPage && category !== 'domain-ip-tools' && _jsx(RelatedTools, { category: category, currentToolName: currentToolName })] }), _jsx(Footer, {})] }));
};
export default Layout;
