import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { StatePanel } from './StatePanel';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

type Status = 'healthy' | 'degraded' | 'down' | 'disconnected';

const dot: Record<Status, string> = {
  healthy: 'bg-success',
  degraded: 'bg-warning',
  down: 'bg-destructive',
  disconnected: 'bg-muted-foreground',
};

const label: Record<Status, string> = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  down: 'Down',
  disconnected: 'Disconnected',
};

interface Props {
  status: 'loading' | 'error' | 'ready';
  channel: { name: string; status: Status; lastSyncAt: string | null; webhook: 'ok' | 'error' | 'unknown' } | null;
  onRetry?: () => void;
}

export function ChannelHealthCard({ status, channel, onRetry }: Props) {
  return (
    <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-[14px] font-semibold text-foreground">Channel health</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatePanel
          status={status}
          onRetry={onRetry}
          skeleton={
            <div className="space-y-3">
              <Skeleton variant="shimmer" className="h-10 w-full" />
              <Skeleton variant="shimmer" className="h-3 w-1/2" />
            </div>
          }
        >
          {channel && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Instagram className="w-4.5 h-4.5 text-muted-foreground" strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-foreground">{channel.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={cn('w-1.5 h-1.5 rounded-full', dot[channel.status])} />
                    <span className="text-[12px] text-muted-foreground">{label[channel.status]}</span>
                  </div>
                </div>
              </div>
              <dl className="space-y-2 text-[12.5px]">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Last sync</dt>
                  <dd className="text-foreground tabular-nums">{formatDistanceToNow(new Date(channel.lastSyncAt), { addSuffix: true })}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Webhook</dt>
                  <dd className={cn('font-medium', channel.webhook === 'ok' ? 'text-success' : 'text-destructive')}>
                    {channel.webhook === 'ok' ? 'Delivering' : 'Failing'}
                  </dd>
                </div>
              </dl>
              {(channel.status !== 'healthy' || channel.webhook !== 'ok') && (
                <Button variant="outline" size="sm" className="w-full h-9 press-scale" asChild>
                  <Link to="/settings?tab=instagram">Reconnect</Link>
                </Button>
              )}
            </div>
          )}
        </StatePanel>
      </CardContent>
    </Card>
  );
}
