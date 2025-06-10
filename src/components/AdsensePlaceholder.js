import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
export function AdsensePlaceholder({ className, width = '100%', height = 250 }) {
    return (_jsx("div", { className: cn('flex items-center justify-center bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-lg', className), style: { width, height }, children: _jsx("p", { className: "text-muted-foreground text-sm", children: "Ad Placeholder" }) }));
}
