import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, Plus, Trash, Code2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
const FaqSchemaGeneratorTool = () => {
    const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
    const [generatedSchema, setGeneratedSchema] = useState('');
    const [copied, setCopied] = useState(false);
    const handleAddFaq = () => {
        setFaqs([...faqs, { question: '', answer: '' }]);
    };
    const handleRemoveFaq = (index) => {
        const newFaqs = faqs.filter((_, i) => i !== index);
        setFaqs(newFaqs);
    };
    const handleFaqChange = (index, field, value) => {
        const newFaqs = faqs.map((faq, i) => {
            if (i === index) {
                return { ...faq, [field]: value };
            }
            return faq;
        });
        setFaqs(newFaqs);
    };
    const handleGenerate = () => {
        if (faqs.some(f => !f.question.trim() || !f.answer.trim())) {
            toast.error('Please fill out all question and answer fields.');
            return;
        }
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        setGeneratedSchema(JSON.stringify(schema, null, 2));
        toast.success('FAQ Schema generated successfully!');
    };
    const handleCopy = () => {
        if (!generatedSchema)
            return;
        const script = `<script type="application/ld+json">\n${generatedSchema}\n</script>`;
        navigator.clipboard.writeText(script);
        setCopied(true);
        toast.success('Schema script copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "FAQ Page Schema Generator" }), _jsx("p", { className: "mt-3 text-lg max-w-3xl mx-auto text-muted-foreground", children: "Easily create JSON-LD structured data for your FAQ pages. This tool helps you generate the necessary schema markup to make your content eligible for rich results in Google Search, thereby boosting your visibility and click-through rate." })] }), _jsxs(Card, { className: "max-w-6xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Generate FAQ Schema" }), _jsx(CardDescription, { children: "Add your question-and-answer pairs below, then generate the schema code to add to your website." })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2", children: [_jsxs("div", { className: "space-y-4", children: [faqs.map((faq, index) => (_jsxs("div", { className: "space-y-2 rounded-md border p-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "font-semibold", children: ["FAQ #", index + 1] }), faqs.length > 1 && (_jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleRemoveFaq(index), title: "Remove FAQ", children: _jsx(Trash, { className: "h-4 w-4 text-destructive" }) }))] }), _jsx(Input, { placeholder: "Enter the full question here", value: faq.question, onChange: (e) => handleFaqChange(index, 'question', e.target.value) }), _jsx(Textarea, { placeholder: "Enter the full answer here", value: faq.answer, onChange: (e) => handleFaqChange(index, 'answer', e.target.value) })] }, index))), _jsxs(Button, { variant: "outline", onClick: handleAddFaq, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Add Another FAQ"] })] }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "relative", children: [_jsx(Textarea, { placeholder: "Generated FAQ Schema (JSON-LD) will appear here...", className: "h-full min-h-[400px] text-xs font-mono bg-muted", value: generatedSchema ? `<script type="application/ld+json">\n${generatedSchema}\n</script>` : "", readOnly: true }), generatedSchema && (_jsx(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2", onClick: handleCopy, title: "Copy script tag", children: copied ? _jsx(ClipboardCheck, { className: "h-5 w-5 text-green-500" }) : _jsx(Clipboard, { className: "h-5 w-5" }) }))] }) })] }), _jsx("div", { className: "text-center mt-6", children: _jsxs(Button, { onClick: handleGenerate, size: "lg", children: [_jsx(Code2, { className: "mr-2 h-5 w-5" }), "Generate Schema"] }) })] })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-12 text-left", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "What is FAQ Schema and Why is it Important?" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "FAQ schema is a type of structured data that you can add to your website to help search engines understand your content better. It is used to mark up a list of questions and answers on a page, which can then be displayed as a rich result in Google Search." }), _jsx("p", { children: "By using FAQ schema, you can increase your visibility in search results, drive more traffic to your website, and improve your click-through rate. It is a simple and effective way to enhance your SEO and provide a better user experience for your visitors." })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Key Components of FAQ Schema" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "FAQ schema is made up of a few key components that you need to include in your structured data. These include:" }), _jsxs("ul", { className: "list-disc list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Question:" }), " The full text of the question."] }), _jsxs("li", { children: [_jsx("strong", { children: "Answer:" }), " The full text of the answer."] }), _jsxs("li", { children: [_jsx("strong", { children: "Accepted Answer:" }), " A property that contains the answer to the question."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "How to Use and Customize Your Generated FAQ Schema" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Our tool makes it easy to generate FAQ schema, but it is important to customize it to your specific needs. Here\u2019s how:" }), _jsxs("ol", { className: "list-decimal list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Generate the Base Text:" }), " Enter your question-and-answer pairs in the text area above, then click \"Generate.\""] }), _jsxs("li", { children: [_jsx("strong", { children: "Review and Edit:" }), " Carefully review the generated schema to ensure that it accurately reflects your content."] }), _jsxs("li", { children: [_jsx("strong", { children: "Add to Your Website:" }), " Copy the generated schema and paste it into the ", _jsx("code", { children: '<head>' }), " section of your HTML document."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "mt-4 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is FAQ schema a ranking factor?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "While FAQ schema is not a direct ranking factor, it can help you increase your visibility in search results and improve your click-through rate, which can indirectly lead to higher rankings." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can I use FAQ schema on any page?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Yes, you can use FAQ schema on any page that contains a list of questions and answers. However, it is most effective on pages that are dedicated to a specific topic and provide in-depth answers to common questions." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "What is a fun fact about FAQ schema?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "The first version of schema.org was launched in 2011 by Google, Microsoft, and Yahoo. It was created to provide a common vocabulary for structured data that could be used by all search engines." })] })] })] })] })] }));
};
export default FaqSchemaGeneratorTool;
