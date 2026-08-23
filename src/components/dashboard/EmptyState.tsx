import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Render without the surrounding card (for use inside an existing card/table). */
  bare?: boolean;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  bare = false,
  className,
}: EmptyStateProps) {
  const body = (
    <div className="mx-auto flex max-w-sm flex-col items-center text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-muted">
        <Icon className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 text-[15px] font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-5 h-9 text-[13px]">
          {actionLabel}
        </Button>
      )}
    </div>
  );

  if (bare) return <div className={cn('py-12', className)}>{body}</div>;

  return (
    <div
      className={cn(
        'rounded-2xl border border-border/70 bg-card px-6 py-14 shadow-[var(--shadow-sm)]',
        className,
      )}
    >
      {body}
    </div>
  );
}
