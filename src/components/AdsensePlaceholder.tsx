import { cn } from '@/lib/utils';

interface AdsensePlaceholderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function AdsensePlaceholder({ className, width = '100%', height = 250 }: AdsensePlaceholderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-lg',
        className
      )}
      style={{ width, height }}
    >
      <p className="text-muted-foreground text-sm">Ad Placeholder</p>
    </div>
  );
}
