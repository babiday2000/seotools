import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import JavaScriptObfuscator from 'javascript-obfuscator';
const JavaScriptObfuscatorTool = () => {
    const [prettyJs, setPrettyJs] = useState('');
    const [obfuscatedJs, setObfuscatedJs] = useState('');
    const [copied, setCopied] = useState(false);
    const handleObfuscate = () => {
        try {
            const obfuscationResult = JavaScriptObfuscator.obfuscate(prettyJs, {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 1,
                debugProtection: true,
                debugProtectionInterval: 4000,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                log: false,
                numbersToExpressions: true,
                renameGlobals: true,
                selfDefending: true,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 5,
                stringArray: true,
                stringArrayEncoding: ['rc4'],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 5,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersParametersMaxCount: 5,
                stringArrayWrappersType: 'function',
                stringArrayThreshold: 1,
                transformObjectKeys: true,
                unicodeEscapeSequence: true,
            });
            setObfuscatedJs(obfuscationResult.getObfuscatedCode());
        }
        catch {
            setObfuscatedJs('Invalid JavaScript to obfuscate.');
        }
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(obfuscatedJs);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [_jsx(Textarea, { placeholder: "Paste your JavaScript here...", className: "h-48 text-base", value: prettyJs, onChange: (e) => setPrettyJs(e.target.value) }), _jsxs("div", { className: "relative", children: [_jsx(Textarea, { placeholder: "Obfuscated JavaScript will appear here...", className: "h-48 text-base", value: obfuscatedJs, readOnly: true }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2", onClick: handleCopy, disabled: !obfuscatedJs, children: copied ? _jsx(ClipboardCheck, { className: "h-5 w-5 text-green-500" }) : _jsx(Clipboard, { className: "h-5 w-5" }) })] })] }), _jsx(Button, { onClick: handleObfuscate, disabled: !prettyJs, children: "Obfuscate JavaScript" }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-12 text-left", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "What is a JavaScript Obfuscator?" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "A JavaScript Obfuscator is a tool that transforms your readable JavaScript code into a garbled, unreadable version that is extremely difficult for humans to understand. While the obfuscated code functions identically to the original, its logic is hidden, protecting your intellectual property from theft and reverse engineering. This is a crucial security measure for any web application that contains proprietary algorithms or sensitive business logic." }), _jsx("p", { children: "By making your code a tangled mess, you can deter would-be attackers and prevent them from easily understanding and exploiting your application's inner workings." })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Why Use a JavaScript Obfuscator?" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "You'll find a JavaScript obfuscator essential in many situations:" }), _jsxs("ul", { className: "list-disc list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Protecting Intellectual Property:" }), " If your JavaScript code contains proprietary algorithms or business logic, obfuscation can prevent competitors from stealing your work."] }), _jsxs("li", { children: [_jsx("strong", { children: "Preventing Piracy:" }), " For web-based games or applications, obfuscation can make it more difficult for users to cheat or create unauthorized copies."] }), _jsxs("li", { children: [_jsx("strong", { children: "Enhancing Security:" }), " By hiding the logic of your code, you can make it more difficult for attackers to find and exploit vulnerabilities."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Key Components of JavaScript Obfuscation" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "The obfuscation process involves several key transformations:" }), _jsxs("ul", { className: "list-disc list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Renaming Variables:" }), " Variable and function names are replaced with meaningless, short names."] }), _jsxs("li", { children: [_jsx("strong", { children: "Control Flow Flattening:" }), " The logical flow of the code is obscured by breaking it up into a series of dispatched blocks, making it difficult to follow."] }), _jsxs("li", { children: [_jsx("strong", { children: "String Encryption:" }), " Strings are encrypted and stored in an array, and are only decrypted at runtime when they are needed."] }), _jsxs("li", { children: [_jsx("strong", { children: "Dead Code Injection:" }), " Useless code is added to the program to confuse anyone trying to understand it."] })] }), _jsx("p", { children: "Our tool uses a powerful combination of these and other techniques to provide a high level of protection for your code." })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "How to Use Our JavaScript Obfuscator Tool" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Our tool makes obfuscating your JavaScript code simple:" }), _jsxs("ol", { className: "list-decimal list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Paste Your JavaScript:" }), " Copy your JavaScript code and paste it into the input text area."] }), _jsxs("li", { children: [_jsx("strong", { children: "Click the Obfuscate Button:" }), " Press the \"Obfuscate JavaScript\" button. The tool will instantly transform your code into a highly protected version."] }), _jsxs("li", { children: [_jsx("strong", { children: "Copy the Obfuscated JavaScript:" }), " The obfuscated JavaScript will appear in the output area, ready for you to use in your production environment."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "mt-4 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Will obfuscating my JavaScript slow down my website?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Obfuscation can sometimes increase the size of your code and add a small amount of overhead, but the impact on performance is usually negligible. In some cases, it can even improve performance by making the code more difficult for the browser to parse." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is obfuscation the same as encryption?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "No. Encryption is a two-way process that requires a key to decrypt the data. Obfuscation is a one-way process that makes the code difficult to understand, but it does not require a key to be executed." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can obfuscated code be deobfuscated?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "While it is possible to deobfuscate code, it is a difficult and time-consuming process. A good obfuscator will make the code so complex that it is not worth the effort for most attackers to try to reverse engineer it." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Fun Fact" }), _jsx("div", { className: "mt-4 space-y-4 text-muted-foreground", children: _jsx("p", { children: "The first known use of the term \"obfuscate\" in a computing context was in a 1986 paper by the computer scientist, David S. Touretzky. He used the term to describe a technique for making Lisp code more difficult to understand." }) })] })] })] }));
};
export default JavaScriptObfuscatorTool;
