import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Task { id: string; label: string; description: string; done: boolean; href: string; cta: string }

interface Props { tasks: Task[] }

export function FirstRunChecklist({ tasks }: Props) {
  const done = tasks.filter((t) => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-semibold text-foreground">Get started with Conveero</CardTitle>
          <span className="text-[12px] text-muted-foreground tabular-nums">{done} of {tasks.length}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden mt-3">
          <div className="h-full bg-foreground rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="divide-y divide-border/60 -mx-2">
          {tasks.map((t) => (
            <li key={t.id} className="flex items-center gap-3 px-2 py-3">
              {t.done ? (
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" strokeWidth={2} />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.75} />
              )}
              <div className="flex-1 min-w-0">
                <p className={cn('text-[13.5px] font-medium', t.done ? 'text-muted-foreground line-through' : 'text-foreground')}>
                  {t.label}
                </p>
                <p className="text-[12px] text-muted-foreground mt-0.5">{t.description}</p>
              </div>
              {!t.done && (
                <Button size="sm" variant="outline" className="h-9 md:h-8 gap-1 text-[12.5px] press-scale shrink-0" asChild>
                  <Link to={t.href}>
                    {t.cta}
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
