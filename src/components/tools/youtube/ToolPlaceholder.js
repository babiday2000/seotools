import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';
const ToolPlaceholder = ({ toolName }) => {
    return (_jsxs(Card, { className: "text-center", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: toolName }) }), _jsxs(CardContent, { className: "flex flex-col items-center justify-center space-y-4 p-10", children: [_jsx(Construction, { className: "h-16 w-16 text-muted-foreground" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "This tool is currently under construction." }), _jsx("p", { className: "text-sm text-muted-foreground", children: "We're working hard to bring it to you soon!" })] })] }));
};
export default ToolPlaceholder;
