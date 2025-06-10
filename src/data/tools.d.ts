export interface Tool {
    slug: string;
    category: string;
    name: string;
    description: string;
    longDescription: string;
    component: React.LazyExoticComponent<React.FC<Record<string, unknown>>>;
}
export declare const toolCategories: {
    'text-tools': {
        slug: string;
        name: string;
        description: string;
        icon: import("react/jsx-runtime").JSX.Element;
    };
    'youtube-tools': {
        slug: string;
        name: string;
        description: string;
        longDescription: string;
        icon: import("react/jsx-runtime").JSX.Element;
    };
    'domain-ip-tools': {
        slug: string;
        name: string;
        description: string;
        icon: import("react/jsx-runtime").JSX.Element;
    };
    'website-management-tools': {
        slug: string;
        name: string;
        description: string;
        icon: import("react/jsx-runtime").JSX.Element;
    };
    'web-development-tools': {
        slug: string;
        name: string;
        description: string;
        icon: import("react/jsx-runtime").JSX.Element;
    };
    'image-editing-tools': {
        slug: string;
        name: string;
        description: string;
        icon: import("react/jsx-runtime").JSX.Element;
    };
    'online-calculators': {
        slug: string;
        name: string;
        description: string;
        icon: import("react/jsx-runtime").JSX.Element;
    };
    'unit-converters': {
        slug: string;
        name: string;
        description: string;
        icon: import("react/jsx-runtime").JSX.Element;
    };
    'binary-converter-tools': {
        slug: string;
        name: string;
        description: string;
        icon: import("react/jsx-runtime").JSX.Element;
    };
    'seo-tools': {
        slug: string;
        name: string;
        description: string;
        icon: import("react/jsx-runtime").JSX.Element;
    };
};
export declare const tools: ({
    slug: string;
    category: string;
    name: string;
    description: string;
    longDescription: string;
    component: import("react").LazyExoticComponent<() => import("react/jsx-runtime").JSX.Element>;
} | {
    slug: string;
    category: string;
    name: string;
    description: string;
    longDescription: string;
    component: import("react").LazyExoticComponent<import("react").FC<{}>>;
})[];
