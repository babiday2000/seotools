import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function StatCard({ title, value, icon, description, loading }) {
    if (loading) {
        return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: title }), _jsx(Skeleton, { className: "h-4 w-4" })] }), _jsxs(CardContent, { children: [_jsx(Skeleton, { className: "h-8 w-24 mb-1" }), _jsx(Skeleton, { className: "h-4 w-40" })] })] }));
    }
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: title }), icon] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: value }), description && _jsx("p", { className: "text-xs text-muted-foreground", children: description })] })] }));
}
