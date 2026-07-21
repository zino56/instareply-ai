
# Conveero Dashboard — Visual Polish Plan

Pure visual refinement. Only className / token / style tweaks. No changes to routes, auth, data fetching, copy, layout structure, or component tree.

## 1. Current state (what's there)

- `src/components/layout/Navbar.tsx` — topbar with logo, 6 nav links, user dropdown, mobile drawer. Active state uses solid yellow fill with black text.
- `src/pages/Dashboard.tsx` — welcome header + CTAs, Instagram connection card, 2 stat cards, Quick Actions card, Recent Conversations card.
- Tokens already exist in `src/index.css`: `--shadow-sm/md`, `--surface`, `--border`, `.stat-value` (tabular-nums), `.card-elevated`, `.feature-card`.

## 2. What will change (visual only)

### 2.1 Topbar (`Navbar.tsx`)
- Increase height slightly (`h-16` → `h-[68px]`), tighter horizontal padding rhythm.
- Nav link container: keep `gap-1`, but refine link padding to `px-3.5 py-2` for balanced density.
- Active state: swap solid yellow fill for a calmer premium pill — `bg-foreground text-background` OR `bg-primary/15 text-foreground` with a soft inner ring. Will use `bg-foreground/[0.06] text-foreground` with a 1px inset border for restraint (yellow fill on every page-load is visually loud).
- Hover: `hover:bg-muted/60` (calmer than current `hover:bg-muted`).
- Icons standardized at `w-4 h-4` (already), but add `stroke-[1.75]` for a lighter premium line-weight.
- Logo mark: refine to `rounded-xl`, subtle `shadow-sm`, keep yellow.
- Border-bottom: soften to `border-border/70`, add `shadow-sm` on scroll-free state for a floating feel.
- User dropdown trigger: refined avatar ring (`ring-1 ring-border`) and tighter gap.

### 2.2 Page header (Welcome)
- `h1`: `text-3xl` → `text-[28px] md:text-[32px]`, tighter tracking `-0.02em`, keep emoji.
- Subtitle: `text-muted-foreground` → `text-muted-foreground text-[15px]`, spacing `mt-1.5`.
- CTA row: unify button heights, add `gap-2` inside, `gap-3` between; secondary button gets subtle border refinement.

### 2.3 Instagram connection card
- Replace `border-2` with `border` + tinted background for a lighter, more premium feel.
- Icon chip: `rounded-xl` → `rounded-2xl`, slightly smaller (`w-12 h-12`), consistent with stat card icon chip.
- Title `text-lg` → `text-[17px] font-semibold`, badge with softer bg (`bg-success/10`).
- Padding `p-6` → `p-5 md:p-6`, add `shadow-sm`.

### 2.4 Stat cards
- Card: `rounded-2xl`, `border border-border`, `shadow-sm`, `hover:shadow-md`, `hover:-translate-y-0.5`, `transition-all duration-300`.
- Icon chip: `p-2.5 rounded-lg` → `p-3 rounded-xl`, consistent bg tint.
- Number: keep `.stat-value` (already tabular-nums), bump to `text-[32px]` with tighter tracking.
- Label: `text-sm` muted, uppercase-free, `mt-1` spacing.
- Remove `hover-scale` (feels cheap) in favor of the shared lift + shadow.

### 2.5 Quick Actions card
- Card header: `CardTitle` `text-lg` → `text-[15px] font-semibold text-foreground`, add subtle `text-muted-foreground` "Shortcuts" style is out of scope — keep copy.
- Buttons: keep outline variant, refine to `h-11`, `justify-start`, icon `mr-3`, chevron muted (`text-muted-foreground group-hover:text-foreground`), hover uses `hover:bg-muted/60 hover:border-border`.

### 2.6 Recent Conversations card
- Card padding tightened, section title styled same as Quick Actions.
- Row: `p-3` → `px-3 py-3.5`, `rounded-xl`, hover `bg-muted/50` → `bg-muted/60`, add `transition-colors`.
- Avatar: `h-10 w-10` keep, add `ring-1 ring-border`.
- Name: `text-sm font-medium` — keep. Timestamp: tabular-nums, `text-[11px]`, uppercase off.
- Last message: `text-[13px]` muted, `line-clamp-1`.
- Unread badge: pill shape, `bg-primary text-primary-foreground` with `min-w-[22px] h-[22px]`, `text-[11px] font-semibold`.
- Empty state: refined muted text with a subtle centered icon spacing.

### 2.7 Global card surfaces
- All dashboard cards inherit `rounded-2xl`, `border-border`, `shadow-sm`, consistent internal padding (`p-6`).
- `CardHeader` bottom spacing standardized (`pb-4`).

### 2.8 Spacing rhythm
- Page container: `py-8` → `py-8 md:py-10`, `space-y-8` → `space-y-6 md:space-y-8` for tighter vertical rhythm.
- Grid gap between Quick Actions / Recent Conversations: `gap-6` (keep).
- Stats grid: `gap-4` → `gap-4 md:gap-5`.

### 2.9 Typography & color refinement
- No new brand colors.
- Use `text-muted-foreground` consistently — already in place.
- Numbers use tabular-nums (already via `.stat-value`); add tabular-nums to timestamps.
- Section titles unified at 15–17px semibold.

## 3. What will NOT change

- All routes, links, and navigation targets
- All copy (welcome text, labels, button text, empty states)
- Data fetching (`useEffect`, `api.getConversations`, `fetchClientStatus`)
- `useAuthStore`, `authStore.ts`, `api.ts`
- Component hierarchy / JSX structure (no adds, no removes, no reorders)
- Framer Motion variants / stagger animations
- Mobile menu behavior
- Auth flow, dev bypass, protected routes
- Any other app page (Conversations, Products, AI Knowledge, Analytics, Settings) — this pass is dashboard + shared topbar only

## 4. Files to touch

- `src/components/layout/Navbar.tsx` — className-only edits for topbar, active pill, hover, spacing, icon weight
- `src/pages/Dashboard.tsx` — className-only edits across header, IG card, stat cards, quick actions, conversations list

No CSS token changes needed — tokens added in the previous polish pass already cover this. If a small addition is required (e.g. `text-[11px]` timestamp helper), it will be applied inline via Tailwind arbitrary values, no `index.css` edits.

## 5. Guardrails

- No dependency changes
- No new components
- No structural JSX changes beyond className swaps and one-line style adjustments
- Diff limited to two files
- Production behavior identical

Awaiting your approval to proceed.
