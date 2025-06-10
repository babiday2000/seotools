import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
export function Seo({ title, description, keywords, name, type }) {
    return (_jsxs(Helmet, { children: [_jsx("title", { children: title }), _jsx("meta", { name: 'description', content: description }), keywords && _jsx("meta", { name: 'keywords', content: keywords }), _jsx("meta", { property: "og:type", content: type || 'website' }), _jsx("meta", { property: "og:title", content: title }), _jsx("meta", { property: "og:description", content: description }), _jsx("meta", { name: "twitter:creator", content: name || 'Seotooler' }), _jsx("meta", { name: "twitter:card", content: type || 'summary' }), _jsx("meta", { name: "twitter:title", content: title }), _jsx("meta", { name: "twitter:description", content: description })] }));
}
