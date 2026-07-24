import { ArrowUp, ArrowDown, Minus, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedNumber } from '@/components/motion/AnimatedNumber';
import { cn } from '@/lib/utils';
import type { Trend } from '@/lib/dashboardMock';

interface KpiCardProps {
  label: string;
  value: number | null;
  icon: LucideIcon;
  format?: (n: number) => string;
  trend?: Trend;
  spark?: number[];
  status?: 'loading' | 'error' | 'ready';
  emphasize?: boolean; // yellow accent for "needs attention"
  hint?: string;
}

function Sparkline({ data }: { data: number[] }) {
  if (!data?.length) return null;
  const w = 80, h = 22;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="hidden md:block text-muted-foreground/60" aria-hidden>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KpiCard({ label, value, icon: Icon, format, trend, spark, status = 'ready', emphasize, hint }: KpiCardProps) {
  const hasValue = value !== null && value !== undefined;
  const highlight = emphasize && hasValue && (value as number) > 0;
  return (
    <Card className={cn(
      'rounded-2xl border shadow-[var(--shadow-sm)] bg-card',
      highlight ? 'border-primary/40 bg-primary/[0.03]' : 'border-border/70',
    )}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-[13px] text-muted-foreground font-medium">{label}</p>
          <div className={cn('p-2 rounded-lg', highlight ? 'bg-primary/15' : 'bg-muted')}>
            <Icon className={cn('w-4 h-4', highlight ? 'text-foreground' : 'text-muted-foreground')} strokeWidth={1.75} />
          </div>
        </div>
        {status === 'loading' ? (
          <Skeleton variant="shimmer" className="h-8 w-24 mt-4" />
        ) : status === 'error' ? (
          <p className="mt-4 text-[13px] text-destructive">Failed to load</p>
        ) : (
          <div className="mt-4 flex items-end justify-between gap-3">
            <p className="text-[26px] font-semibold text-foreground tabular-nums tracking-[-0.015em] leading-none">
              {hasValue ? <AnimatedNumber value={value as number} format={format} /> : <span className="text-muted-foreground/60">—</span>}
            </p>
            {spark && hasValue && <Sparkline data={spark} />}
          </div>
        )}
        <div className="mt-2 flex items-center gap-1.5 text-[12px]">
          {trend && status === 'ready' && hasValue ? (
            <>
              <span className={cn('inline-flex items-center gap-0.5 font-medium tabular-nums',
                trend.direction === 'up' ? 'text-success' : trend.direction === 'down' ? 'text-destructive' : 'text-muted-foreground',
              )}>
                {trend.direction === 'up' ? <ArrowUp className="w-3 h-3" strokeWidth={2.25} /> : trend.direction === 'down' ? <ArrowDown className="w-3 h-3" strokeWidth={2.25} /> : <Minus className="w-3 h-3" strokeWidth={2.25} />}
                {trend.value}%
              </span>
              <span className="text-muted-foreground">vs last 7d</span>
            </>
          ) : status === 'ready' ? (
            <span className="text-muted-foreground">{hint ?? (hasValue ? 'Updated just now' : 'No data yet')}</span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
