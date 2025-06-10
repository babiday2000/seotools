interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    description?: string;
    loading?: boolean;
}
export default function StatCard({ title, value, icon, description, loading }: StatCardProps): import("react/jsx-runtime").JSX.Element;
export {};
