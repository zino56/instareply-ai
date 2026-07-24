import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { StatePanel } from './StatePanel';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Props {
  status: 'loading' | 'error' | 'ready';
  usage: { plan: string; used: number; quota: number; renewsAt: string } | null;
  onRetry?: () => void;
}

export function UsagePlanCard({ status, usage, onRetry }: Props) {
  return (
    <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-[14px] font-semibold text-foreground">Usage & plan</CardTitle>
        {usage && (
          <Badge variant="secondary" className="h-5 bg-muted text-muted-foreground border-0 font-medium text-[11px]">{usage.plan}</Badge>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <StatePanel
          status={status}
          onRetry={onRetry}
          skeleton={<><Skeleton variant="shimmer" className="h-4 w-1/2 mb-3" /><Skeleton variant="shimmer" className="h-2 w-full mb-2" /><Skeleton variant="shimmer" className="h-3 w-1/3" /></>}
        >
          {usage && (() => {
            const pct = Math.min(100, Math.round((usage.used / usage.quota) * 100));
            const nearLimit = pct >= 80;
            return (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <p className="text-[13px] text-muted-foreground">Messages this cycle</p>
                  <p className="text-[13px] font-medium text-foreground tabular-nums">
                    {usage.used.toLocaleString()} <span className="text-muted-foreground">/ {usage.quota.toLocaleString()}</span>
                  </p>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', nearLimit ? 'bg-warning' : 'bg-foreground')}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-muted-foreground">Renews {format(new Date(usage.renewsAt), 'MMM d')}</span>
                  <Button variant={nearLimit ? 'default' : 'ghost'} size="sm" className="h-8 text-[12.5px] press-scale" asChild>
                    <Link to="/pricing">{nearLimit ? 'Upgrade plan' : 'Manage plan'}</Link>
                  </Button>
                </div>
              </div>
            );
          })()}
        </StatePanel>
      </CardContent>
    </Card>
  );
}
