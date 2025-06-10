import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import ToolsDirectoryPage from '@/pages/Tools';
import ToolCategoryPage from '@/pages/ToolCategoryPage';
import ToolPage from '@/pages/ToolPage';
import BlogPage from '@/pages/Blog';
import BlogPostPage from '@/pages/BlogPost';
import ContactPage from '@/pages/Contact';
import PrivacyPolicyPage from '@/pages/PrivacyPolicy';
import TermsAndConditionsPage from '@/pages/TermsAndConditions';
import DisclaimerPage from '@/pages/Disclaimer';
import { Toaster } from '@/components/ui/sonner';
import { Progress } from '@/components/ui/progress';
function App() {
    return (_jsxs(_Fragment, { children: [_jsx(Layout, { children: _jsx(Suspense, { fallback: _jsx("div", { className: "flex items-center justify-center h-64", children: _jsx(Progress, { value: 50, className: "w-1/2" }) }), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "/tools", element: _jsx(ToolsDirectoryPage, {}) }), _jsx(Route, { path: "/tools/:category", element: _jsx(ToolCategoryPage, {}) }), _jsx(Route, { path: "/tools/:category/:slug", element: _jsx(ToolPage, {}) }), _jsx(Route, { path: "/blog", element: _jsx(BlogPage, {}) }), _jsx(Route, { path: "/blog/:slug", element: _jsx(BlogPostPage, {}) }), _jsx(Route, { path: "/contact", element: _jsx(ContactPage, {}) }), _jsx(Route, { path: "/privacy-policy", element: _jsx(PrivacyPolicyPage, {}) }), _jsx(Route, { path: "/terms-and-conditions", element: _jsx(TermsAndConditionsPage, {}) }), _jsx(Route, { path: "/disclaimer", element: _jsx(DisclaimerPage, {}) })] }) }) }), _jsx(Toaster, {})] }));
}
export default App;
