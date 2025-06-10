import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Target } from 'lucide-react';
export function Logo() {
    return (_jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx(Target, { className: "h-8 w-8 text-primary" }), _jsx("span", { className: "text-2xl font-bold text-foreground", children: "Seotooler" })] }));
}
