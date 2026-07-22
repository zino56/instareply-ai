# Conveero — Enterprise SaaS Visual Polish

## Visual principles adapted from the references

From the uploaded screenshots I'm adapting only the *visual system*, not their product:

- **Off-white canvas + elevated white cards** with hairline borders and soft shadows (not gradients).
- **Persistent left sidebar** with grouped nav sections ("Main", "Workspace") and a calm active state (subtle tinted pill + 2px left indicator).
- **Sticky topbar** with page title, breadcrumb/subtitle, search, and utility icons (help, notifications, avatar).
- **KPI cards** — icon chip top-left, label, then large tabular-num value, then small delta line. Uniform height, 4-up on desktop.
- **Generous whitespace + strict alignment** on 4px grid; consistent 24–32px section gaps; `rounded-2xl` on cards, `rounded-xl` on inputs/buttons.
- **List/table hierarchy** — clear column headers, muted metadata, right-aligned numerics, status pills, hover row tint, focus ring.
- **Restraint on color** — neutrals do 90% of the work; yellow reserved for primary CTA / active accent; magenta only for a single secondary accent (badges, highlights) — never as a fill on large surfaces.

Explicitly **not** copying: Salezy logo/name, their icon set, gradient blue charts, fake revenue numbers, their exact grid, or their sidebar tool list.

## What stays untouched

- All routes, navigation items, page copy, backend calls, auth flow, dev bypass, API client, Zustand store, data fetching, and component behavior.
- Brand palette: yellow `#FFF100` primary, magenta `#FF00FF` restrained accent, black/white/gray neutrals.
- No new fake metrics, orders, charts, or seeded data. Empty states remain empty states.

## Files I will modify (visual only)

**Shared system**
- `src/index.css` — refine neutral scale, surface token to off-white, tighten shadow tokens, adjust ring for light bg.
- `tailwind.config.ts` — expose any new tokens if needed.
- `src/components/layout/AppLayout.tsx` — swap to sidebar + topbar shell (keep auth gate identical).
- `src/components/layout/Navbar.tsx` → become **Sidebar.tsx** + new **Topbar.tsx** (same nav links, same logout, same user menu, same mobile drawer behavior — visual restructure only).

**Authenticated pages (className/structure-only polish)**
- `src/pages/Dashboard.tsx`
- `src/pages/Conversations.tsx`
- `src/pages/Products.tsx`
- `src/pages/AIKnowledge.tsx`
- `src/pages/Analytics.tsx`
- `src/pages/Settings.tsx`
- `src/pages/Pricing.tsx`
- `src/pages/onboarding/ConnectInstagram.tsx`

Landing, Login, Signup, AuthCallback, NotFound: **untouched**.

## Stages (I stop for review between each)

**Stage 1 — Shared layout & tokens**
Refine `index.css` tokens (off-white canvas `--surface`, softened shadows, neutral border). Replace `Navbar` with a two-part shell: left `Sidebar` (grouped links, calm active pill, collapsed on mobile via existing drawer) and top `Topbar` (page title slot, right-side user menu + logout — same items as today). `AppLayout` composes them; auth gate unchanged.

**Stage 2 — Dashboard**
Rework layout inside existing `Dashboard.tsx`: page header block, Instagram connection card as a full-width status strip, KPI row using **only real values already computed** (`total_messages_this_month`, `active_conversations`) — no invented metrics. Quick Actions + Recent Conversations grid gets the refined card/list treatment. Empty states preserved.

**Stage 3 — Remaining pages**
Apply the same card, header, list, and table language to Conversations (premium inbox rows: avatar, name, snippet, time, unread pill, status tag), Products (structured card grid), AI Knowledge (document list with clear rows + upload zone), Analytics (real values only, no fake charts), Settings (sectioned panels with clear labels), Pricing (aligned tier cards), and Connect Instagram onboarding (calmer card, same CTA + skip).

## Guardrails I'll hold to

- Every interactive element keeps a visible `focus-visible` ring.
- No hardcoded color utilities — semantic tokens only.
- No dependency additions.
- Diffs stay reviewable per stage; I pause after Stage 1 and Stage 2 for your OK before continuing.

Reply "approved" to start with Stage 1 (shared layout + tokens).