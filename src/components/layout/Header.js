import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Logo } from '../Logo';
import { ModeToggle } from '../mode-toggle';
const navLinks = [
    { to: '/tools', label: 'Tools' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];
const Header = () => {
    return (_jsx("header", { className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: _jsxs("div", { className: "container flex h-16 items-center", children: [_jsx("div", { className: "mr-4 hidden md:flex", children: _jsx(Logo, {}) }), _jsx("div", { className: "flex items-center md:hidden", children: _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "icon", children: [_jsx(Menu, { className: "h-6 w-6" }), _jsx("span", { className: "sr-only", children: "Toggle navigation menu" })] }) }), _jsxs(SheetContent, { side: "left", children: [_jsx("div", { className: "py-6", children: _jsx(Logo, {}) }), _jsx("nav", { className: "grid gap-4", children: navLinks.map((link) => (_jsx(NavLink, { to: link.to, className: ({ isActive }) => `text-lg font-medium ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`, children: link.label }, link.to))) })] })] }) }), _jsxs("div", { className: "flex flex-1 items-center justify-end space-x-4", children: [_jsx("nav", { className: "hidden items-center space-x-6 text-sm font-medium md:flex", children: navLinks.map((link) => (_jsx(NavLink, { to: link.to, className: ({ isActive }) => `transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`, children: link.label }, link.to))) }), _jsx("div", { className: "flex items-center", children: _jsx(ModeToggle, {}) })] })] }) }));
};
export default Header;
