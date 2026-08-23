import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/** Wrapper that fades content in once real data has loaded. */
export function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('animate-fade-in', className)}>{children}</div>;
}

const S = (props: React.HTMLAttributes<HTMLDivElement>) => <Skeleton variant="shimmer" {...props} />;

/** Inbox / conversation list row. */
export function MessageRowSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3">
      <S className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <S className="h-3 w-1/2" />
        <S className="h-3 w-4/5" />
      </div>
    </div>
  );
}

/** KPI / stat tile. */
export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="flex items-start justify-between">
        <S className="h-3 w-24" />
        <S className="h-8 w-8 rounded-lg" />
      </div>
      <S className="mt-4 h-7 w-20" />
      <S className="mt-3 h-3 w-28" />
    </div>
  );
}

/** Chart card with faux bars. */
export function ChartSkeleton({ height = 280 }: { height?: number }) {
  const bars = [45, 70, 35, 85, 60, 95, 50, 75, 40, 65, 80, 55];
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-2">
        <S className="h-4 w-4 rounded" />
        <S className="h-3.5 w-40" />
      </div>
      <div className="mt-6 flex items-end gap-2" style={{ height }}>
        {bars.map((h, i) => (
          <S key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        {Array.from({ length: 5 }).map((_, i) => (
          <S key={i} className="h-2.5 w-6" />
        ))}
      </div>
    </div>
  );
}

/** Table row for the Leads viewer. */
export function LeadRowSkeleton({ columns = 7 }: { columns?: number }) {
  const widths = ['w-28', 'w-40', 'w-32', 'w-16', 'w-24', 'w-24', 'w-8'];
  return (
    <tr className="border-b border-border/50 last:border-0">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <S className={cn('h-4', widths[i] ?? 'w-24')} />
        </td>
      ))}
    </tr>
  );
}

/** Automation rule card. */
export function AutomationCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-[var(--shadow-sm)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2.5">
          <S className="h-4 w-44" />
          <S className="h-3 w-64" />
        </div>
        <S className="h-6 w-11 rounded-full" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <S className="h-6 w-20 rounded-full" />
        <S className="h-6 w-16 rounded-full" />
        <S className="h-6 w-24 rounded-full" />
      </div>
      <div className="mt-4 flex gap-2">
        <S className="h-8 w-20 rounded-lg" />
        <S className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}

/** Pricing / plan card for Billing. */
export function PlanCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-sm)]">
      <S className="h-4 w-24" />
      <S className="mt-4 h-9 w-32" />
      <S className="mt-2 h-3 w-40" />
      <S className="mt-5 h-11 w-full rounded-lg" />
      <div className="mt-6 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <S className="h-4 w-4 rounded-full" />
            <S className="h-3 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
