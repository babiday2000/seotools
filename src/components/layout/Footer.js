import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Logo } from '../Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { toolCategories } from '@/data/tools';
import { Link } from 'react-router-dom';
const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const handleSubscribe = async () => {
        setMessage('');
        setIsSuccess(false);
        setIsLoading(true);
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setIsSuccess(true);
                setEmail('');
            }
            else {
                setMessage(data.message || 'Something went wrong.');
                setIsSuccess(false);
            }
        }
        catch (error) {
            console.error(error);
            setMessage('Something went wrong.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("footer", { className: "border-t bg-background", children: _jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Logo, {}), _jsx("p", { className: "text-muted-foreground text-sm", children: "Powerful & Simple SEO Tools to boost your ranking." }), _jsxs("div", { className: "flex space-x-4", children: [_jsx("a", { href: "#", className: "text-muted-foreground hover:text-foreground", children: _jsx(Github, { size: 20 }) }), _jsx("a", { href: "#", className: "text-muted-foreground hover:text-foreground", children: _jsx(Twitter, { size: 20 }) }), _jsx("a", { href: "#", className: "text-muted-foreground hover:text-foreground", children: _jsx(Linkedin, { size: 20 }) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-foreground", children: "Tools" }), _jsx("ul", { className: "mt-4 space-y-2 text-sm", children: Object.values(toolCategories).slice(0, 5).map((category) => (_jsx("li", { children: _jsx(Link, { to: `/tools/${category.slug}`, className: "text-muted-foreground hover:text-foreground", children: category.name }) }, category.slug))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-foreground", children: "Company" }), _jsxs("ul", { className: "mt-4 space-y-2 text-sm", children: [_jsx("li", { children: _jsx(Link, { to: "/tools", className: "text-muted-foreground hover:text-foreground", children: "Tools" }) }), _jsx("li", { children: _jsx(Link, { to: "/about", className: "text-muted-foreground hover:text-foreground", children: "About Us" }) }), _jsx("li", { children: _jsx(Link, { to: "/blog", className: "text-muted-foreground hover:text-foreground", children: "Blog" }) }), _jsx("li", { children: _jsx(Link, { to: "/contact", className: "text-muted-foreground hover:text-foreground", children: "Contact" }) }), _jsx("li", { children: _jsx(Link, { to: "/privacy-policy", className: "text-muted-foreground hover:text-foreground", children: "Privacy Policy" }) }), _jsx("li", { children: _jsx(Link, { to: "/terms-and-conditions", className: "text-muted-foreground hover:text-foreground", children: "Terms & Conditions" }) }), _jsx("li", { children: _jsx(Link, { to: "/disclaimer", className: "text-muted-foreground hover:text-foreground", children: "Disclaimer" }) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-foreground", children: "Stay Updated" }), _jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Subscribe to our newsletter for the latest SEO tips and tool updates." }), _jsxs("div", { className: "mt-4 flex w-full max-w-sm items-center space-x-2", children: [_jsx(Input, { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), disabled: isLoading }), _jsx(Button, { type: "button", onClick: handleSubscribe, disabled: isLoading, children: isLoading ? 'Subscribing...' : 'Subscribe' })] }), message && (_jsx("p", { className: `mt-2 text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'}`, children: message }))] })] }), _jsx("div", { className: "mt-12 border-t pt-8 text-center text-sm text-muted-foreground", children: _jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " Seotooler. All rights reserved."] }) })] }) }));
};
export default Footer;
