import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface StatePanelProps {
  status: 'loading' | 'error' | 'empty' | 'ready';
  onRetry?: () => void;
  skeleton?: React.ReactNode;
  empty?: React.ReactNode;
  errorLabel?: string;
  children?: React.ReactNode;
  className?: string;
}

export function StatePanel({ status, onRetry, skeleton, empty, errorLabel = 'Couldn\u2019t load this section.', children, className }: StatePanelProps) {
  if (status === 'loading') {
    return (
      <div className={cn('space-y-2', className)}>
        {skeleton ?? (
          <>
            <Skeleton variant="shimmer" className="h-4 w-2/3" />
            <Skeleton variant="shimmer" className="h-4 w-1/2" />
            <Skeleton variant="shimmer" className="h-4 w-3/4" />
          </>
        )}
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className={cn('flex flex-col items-center justify-center py-8 text-center', className)}>
        <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center mb-2">
          <AlertCircle className="w-4 h-4 text-destructive" strokeWidth={1.75} />
        </div>
        <p className="text-[13px] text-foreground font-medium">{errorLabel}</p>
        {onRetry && (
          <Button variant="outline" size="sm" className="mt-3 h-8 gap-1.5 text-[12px]" onClick={onRetry}>
            <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.75} />
            Retry
          </Button>
        )}
      </div>
    );
  }
  if (status === 'empty') {
    return <div className={className}>{empty}</div>;
  }
  return <div className={className}>{children}</div>;
}
