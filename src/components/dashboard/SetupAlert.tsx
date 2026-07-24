import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Step { label: string; done: boolean; href: string }

interface SetupAlertProps { steps: Step[] }

const DISMISS_KEY = 'conveero_setup_alert_dismissed_v1';

export function SetupAlert({ steps }: SetupAlertProps) {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISS_KEY) === '1');
  const done = steps.filter((s) => s.done).length;
  const total = steps.length;
  if (done === total || dismissed) return null;
  const next = steps.find((s) => !s.done);

  return (
    <Card className="rounded-2xl border border-warning/30 bg-warning/5 shadow-[var(--shadow-sm)]">
      <CardContent className="p-4 md:p-5">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[14px] font-semibold text-foreground">Finish setting up Conveero</p>
              <span className="text-[12px] text-muted-foreground tabular-nums">{done} of {total} complete</span>
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
              {steps.map((s) => (
                <li key={s.label} className="flex items-center gap-1.5 text-[12.5px]">
                  {s.done ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" strokeWidth={2} />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.75} />
                  )}
                  <span className={cn(s.done ? 'text-muted-foreground line-through' : 'text-foreground')}>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {next && (
              <Button size="sm" className="h-9 gap-1.5 press-scale" asChild>
                <Link to={next.href}>
                  Continue
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </Link>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={() => { localStorage.setItem(DISMISS_KEY, '1'); setDismissed(true); }}
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" strokeWidth={1.75} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
