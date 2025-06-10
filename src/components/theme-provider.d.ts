type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: "light" | "dark" | "system";
    storageKey?: string;
};
type ThemeProviderState = {
    theme: "light" | "dark" | "system";
    setTheme: (theme: "light" | "dark" | "system") => void;
};
export declare function ThemeProvider({ children, defaultTheme, storageKey, ...props }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useTheme: () => ThemeProviderState;
export {};
