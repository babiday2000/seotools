import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const ContentDisplay = ({ title, content }) => {
    return (_jsxs(Card, { className: "mt-6", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: title }) }), _jsx(CardContent, { children: content })] }));
};
export default ContentDisplay;
