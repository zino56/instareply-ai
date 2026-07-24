import { Link } from 'react-router-dom';
import { MessageSquare, AlertTriangle, PlugZap, Settings, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { StatePanel } from './StatePanel';
import { cn } from '@/lib/utils';
import type { AttentionItem, AttentionKind } from '@/lib/dashboardMock';

const iconFor: Record<AttentionKind, typeof MessageSquare> = {
  unread: MessageSquare,
  failed: AlertTriangle,
  disconnected: PlugZap,
  setup: Settings,
};

const toneFor: Record<AttentionKind, string> = {
  unread: 'bg-primary/15 text-foreground',
  failed: 'bg-destructive/10 text-destructive',
  disconnected: 'bg-warning/12 text-warning',
  setup: 'bg-muted text-muted-foreground',
};

interface Props {
  items: AttentionItem[];
  status: 'loading' | 'error' | 'ready';
  onRetry?: () => void;
}

export function NeedsAttentionList({ items, status, onRetry }: Props) {
  const panelStatus = status === 'ready' && items.length === 0 ? 'empty' : status;
  return (
    <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-[14px] font-semibold text-foreground">Needs attention</CardTitle>
          {status === 'ready' && items.length > 0 && (
            <Badge variant="secondary" className="h-5 px-1.5 bg-primary/15 text-foreground border-0 text-[11px] font-semibold tabular-nums">{items.length}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <StatePanel
          status={panelStatus}
          onRetry={onRetry}
          skeleton={<>
            {[0,1,2].map(i => (
              <div key={i} className="flex items-center gap-3 py-3">
                <Skeleton variant="shimmer" className="w-9 h-9 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton variant="shimmer" className="h-3.5 w-2/3" />
                  <Skeleton variant="shimmer" className="h-3 w-1/3" />
                </div>
                <Skeleton variant="shimmer" className="h-8 w-16 rounded-md" />
              </div>
            ))}
          </>}
          empty={
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-11 h-11 rounded-2xl bg-success/10 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={1.75} />
              </div>
              <p className="text-foreground text-[14px] font-medium">All clear</p>
              <p className="text-muted-foreground text-[13px] mt-1 max-w-[260px]">Nothing needs your attention right now.</p>
            </div>
          }
        >
          <ul className="divide-y divide-border/60 -mx-2">
            {items.map((item) => {
              const Icon = iconFor[item.kind];
              return (
                <li key={item.id} className="flex items-center gap-3 px-2 py-3">
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', toneFor[item.kind])}>
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-[12px] text-muted-foreground truncate mt-0.5">{item.meta}</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="h-9 md:h-8 gap-1 text-[12.5px] press-scale shrink-0">
                    <Link to={item.href}>
                      {item.actionLabel}
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </StatePanel>
      </CardContent>
    </Card>
  );
}
