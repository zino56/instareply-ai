import { motion } from 'framer-motion';
import { Check, CreditCard, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { pageContainer as container, pageItem as item } from '@/lib/motion';

// Temporary default subscription view. Replace from GET /api/subscription when billing launches.
const PLAN_VM = {
  name: 'Free',
  status: 'current' as const,
  description: 'A simple starting point for managing customer conversations.',
  renewalLabel: 'No renewal date — Free plan',
  includes: [
    '1 connected Instagram account',
    'Basic conversation inbox',
    'Product catalog',
    'AI knowledge uploads',
  ],
};

type UsageMetric = { key: string; label: string; value: number | null };
const USAGE: UsageMetric[] = [
  { key: 'messages', label: 'Messages this month', value: null },
  { key: 'active', label: 'Active conversations', value: null },
  { key: 'ai', label: 'AI responses', value: null },
  { key: 'docs', label: 'Knowledge documents', value: null },
];

type PlanCard = {
  id: 'free' | 'starter' | 'pro';
  name: string;
  tagline: string;
  badge: { label: string; tone: 'current' | 'muted' } | null;
  features: string[];
  cta: { label: string; disabled: true };
  current?: boolean;
};

const PLANS: PlanCard[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Get started with the essentials.',
    badge: { label: 'Current plan', tone: 'current' },
    features: ['1 connected channel', 'Core inbox tools', 'Basic knowledge uploads'],
    cta: { label: 'Current plan', disabled: true },
    current: true,
  },
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For growing conversation volume.',
    badge: { label: 'Coming soon', tone: 'muted' },
    features: ['More conversations and AI usage', 'Multiple team members', 'More connected channels'],
    cta: { label: 'Coming soon', disabled: true },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For teams scaling automation.',
    badge: { label: 'Coming soon', tone: 'muted' },
    features: ['Higher AI usage', 'Advanced automation', 'Priority support'],
    cta: { label: 'Coming soon', disabled: true },
  },
];

function UsageTile({ metric }: { metric: UsageMetric }) {
  const hasValue = metric.value !== null && metric.value !== undefined;
  return (
    <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
      <CardContent className="p-5">
        <p className="text-[13px] text-muted-foreground font-medium">{metric.label}</p>
        <p className="mt-4 text-[26px] font-semibold text-foreground tabular-nums tracking-[-0.015em] leading-none">
          {hasValue ? metric.value!.toLocaleString() : <span className="text-muted-foreground/60">—</span>}
        </p>
        <p className="mt-2 text-[12px] text-muted-foreground">
          {hasValue ? 'Updated just now' : 'Available once usage tracking is enabled.'}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Subscriptions() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="container py-8 space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-[26px] md:text-[28px] font-semibold tracking-[-0.015em] leading-tight">
          Subscription
        </h1>
        <p className="mt-1 text-[14px] text-muted-foreground">Manage your plan and usage.</p>
      </motion.div>

      {/* Current plan overview */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/70">
              {/* Left: current plan */}
              <div className="p-6 md:p-7">
                <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  Current plan
                </p>
                <div className="mt-2 flex items-center gap-2.5">
                  <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-foreground">
                    {PLAN_VM.name}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="h-5 bg-muted text-muted-foreground border-0 font-medium text-[11px]"
                  >
                    Current plan
                  </Badge>
                </div>
                <p className="mt-2 text-[13.5px] text-muted-foreground max-w-md">
                  {PLAN_VM.description}
                </p>
                <p className="mt-4 text-[12.5px] text-muted-foreground">{PLAN_VM.renewalLabel}</p>
              </div>

              {/* Right: includes */}
              <div className="p-6 md:p-7 bg-muted/30">
                <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  Plan includes
                </p>
                <ul className="mt-3 space-y-2.5">
                  {PLAN_VM.includes.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-foreground">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-foreground/5">
                        <Check className="h-3 w-3 text-foreground" strokeWidth={2.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Usage */}
      <motion.div variants={item} className="space-y-3">
        <div>
          <h2 className="text-[16px] font-semibold tracking-[-0.005em] text-foreground">Usage</h2>
          <p className="text-[13px] text-muted-foreground">Live once usage tracking is enabled.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {USAGE.map((m) => (
            <UsageTile key={m.key} metric={m} />
          ))}
        </div>
      </motion.div>

      {/* Plans */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-[16px] font-semibold tracking-[-0.005em] text-foreground">
              Choose a plan
            </h2>
            <p className="text-[13px] text-muted-foreground">Plans will be available soon.</p>
          </div>

          {/* UI-only billing cycle toggle, disabled */}
          <div
            role="group"
            aria-label="Billing cycle (coming soon)"
            aria-disabled="true"
            className="inline-flex items-center rounded-lg border border-border/70 bg-muted/40 p-0.5 text-[12.5px] opacity-70 select-none"
          >
            <span className="px-3 py-1.5 rounded-md bg-card text-foreground font-medium shadow-[var(--shadow-sm)]">
              Monthly
            </span>
            <span className="px-3 py-1.5 rounded-md text-muted-foreground">Yearly</span>
            <span className="ml-1 mr-1 text-[11px] text-muted-foreground">Coming soon</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                'rounded-2xl border shadow-[var(--shadow-sm)] bg-card flex flex-col',
                plan.current ? 'border-primary/40 bg-primary/[0.03]' : 'border-border/70',
              )}
            >
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[17px] font-semibold tracking-[-0.005em] text-foreground">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        'h-5 border-0 font-medium text-[11px]',
                        plan.badge.tone === 'current'
                          ? 'bg-primary/15 text-foreground'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {plan.badge.label}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-[13px] text-muted-foreground">{plan.tagline}</p>

                <div className="mt-4">
                  <p className="text-[13px] text-muted-foreground">Pricing coming soon</p>
                </div>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-foreground">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-foreground/5">
                        <Check className="h-3 w-3 text-foreground" strokeWidth={2.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  disabled
                  variant={plan.current ? 'secondary' : 'outline'}
                  className="mt-6 h-11 w-full press-scale"
                  aria-disabled="true"
                >
                  {plan.current ? <Sparkles className="w-4 h-4 mr-1.5" strokeWidth={1.75} /> : null}
                  {plan.cta.label}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Help */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
          <CardContent className="p-5 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-muted shrink-0">
              <CreditCard className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[14px] font-medium text-foreground">Need help with your plan?</p>
              <p className="text-[13px] text-muted-foreground mt-0.5">
                Contact support from your profile menu.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
