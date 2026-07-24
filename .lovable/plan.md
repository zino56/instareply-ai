# Dashboard Product-Completeness Pass

Scope: `src/pages/Dashboard.tsx` only + small local components under `src/components/dashboard/`. No backend, routes, colors, or typography changes. Keep existing motion tokens (`pageContainer`, `pageItem`, `AnimatedNumber`).

---

## 1. Information Architecture

Top-to-bottom on desktop; single column on mobile:

```text
┌───────────────────────────────────────────────────────────────┐
│ Welcome header  (existing — kept)                             │
├───────────────────────────────────────────────────────────────┤
│ Setup Alert Banner  (only if setupComplete < 100%)            │
├───────────────────────────────────────────────────────────────┤
│ KPI Row  ── 4 cards ──────────────────────────────────────────│
│  Messages 7d │ Active convos │ AI reply rate │ Needs attention│
├───────────────────────────────────────┬───────────────────────┤
│ Needs Attention  (list, 2/3 width)    │ Channel Health (1/3)  │
├───────────────────────────────────────┼───────────────────────┤
│ Recent Conversations  (2/3)           │ Quick Actions (1/3)   │
├───────────────────────────────────────┼───────────────────────┤
│ Usage / Plan  (2/3)                   │ (Quick Actions cont.) │
└───────────────────────────────────────┴───────────────────────┘
```

Empty-account variant: header + **First-run Checklist** replaces Setup Alert and hides Needs Attention / Recent Convos (shows empty states inline instead).

---

## 2. Sections & Components

New files under `src/components/dashboard/`:

- `SetupAlert.tsx` — dismissible banner. Shows N of 3 steps done (Instagram, AI knowledge, products). Warning-tint if incomplete, hidden when 100%.
- `KpiCard.tsx` — unified KPI tile with label, `AnimatedNumber`, delta chip (▲/▼ + %), sparkline placeholder line, skeleton + error states.
- `NeedsAttentionList.tsx` — grouped rows: unread DMs, failed replies, disconnected channels, missing setup. Each row: icon tile, title, meta, right-side action button (`Review`, `Reconnect`, `Fix`).
- `RecentConversationsCompact.tsx` — refactor of existing recent list into its own component with skeleton/empty/error.
- `ChannelHealthCard.tsx` — Instagram row with status dot (green/amber/red), last sync time, webhook status, "Reconnect" if unhealthy.
- `QuickActionsCard.tsx` — existing 4 links, kept, moved into component.
- `UsagePlanCard.tsx` — plan name, messages used / quota with progress bar, renewal date, "Upgrade" CTA (yellow — meaningful action).
- `FirstRunChecklist.tsx` — 4 tasks with check circles, progress bar, primary CTA on next incomplete task.

Shared micro-primitives (local to dashboard folder):

- `StatePanel` helper: renders `{loading|error|empty|children}` to keep every block covering the 4 required states without duplication.

Motion: reuse `pageContainer`/`pageItem`; skeletons use existing `.skeleton-shimmer`.

---

## 3. Mock Data Shape

Add `src/lib/dashboardMock.ts` with typed fixtures (used only inside Dashboard until backend is ready):

```ts
type Trend = { value: number; direction: 'up' | 'down' | 'flat' };

type DashboardMock = {
  setup: { instagram: boolean; aiKnowledge: boolean; products: boolean };
  kpis: {
    messages7d: { value: number; trend: Trend; spark: number[] };
    activeConversations: { value: number; trend: Trend };
    aiReplyRate: { value: number; trend: Trend }; // 0..1
    needsAttention: { value: number };
  };
  attention: Array<{
    id: string;
    kind: 'unread' | 'failed' | 'disconnected' | 'setup';
    title: string;
    meta: string;
    actionLabel: string;
    href: string;
  }>;
  channel: {
    name: 'Instagram';
    status: 'healthy' | 'degraded' | 'down' | 'disconnected';
    lastSyncAt: string;
    webhook: 'ok' | 'error';
  };
  usage: {
    plan: 'Free' | 'Starter' | 'Pro';
    used: number;
    quota: number;
    renewsAt: string;
  };
};
```

Real values from `clientStatus` / conversations still flow in where already wired (Instagram connection, recent list). Everything else is mock; each block owns a `loading`/`error` toggle in state so QA can visually flip states via a dev-only query flag `?dashState=loading|error|empty`.

---

## 4. Mobile Layout Plan

- Single column, 16px gutter.
- Order: Header → Setup Alert → KPI (2×2 grid) → Needs Attention → Recent Conversations → Channel Health → Quick Actions → Usage/Plan.
- KPI cards: `grid-cols-2` on `sm`, `grid-cols-4` on `xl` (unchanged pattern).
- Right-column widgets (Channel Health, Quick Actions, Usage) collapse to full width under Needs Attention.
- All action buttons keep `h-11` on mobile / `h-9` desktop to preserve 44px targets.
- Sparklines hidden < `md` to keep density calm.
- First-run checklist is full-width on all breakpoints.

---

## 5. Waits for Backend

These render with mock data now, but need endpoints later:

- KPI deltas + sparkline history (`/api/metrics/summary?range=7d`)
- AI reply rate (`assistant_msgs / total_msgs`)
- Failed reply events for Needs Attention (`/api/events?type=reply_failed`)
- Webhook/channel health (`/api/channels/health`)
- Plan + usage/quota (`/api/billing/usage`)
- Setup completeness flags for `aiKnowledge` and `products` (currently only Instagram is real)
- Dismiss-state persistence for Setup Alert (needs a user-pref endpoint or local key — will use `localStorage` until then)

Once endpoints exist, swap `dashboardMock.ts` calls for real fetches; component contracts won't change.
