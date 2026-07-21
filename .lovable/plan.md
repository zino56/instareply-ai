ns
# Conveero Visual Polish Plan

A refinement-only pass. No routes, sections, copy, functionality, auth, or API calls change. Same structure, same components, same product identity — only visual quality goes up.

## 1. Current frontend (what exists)

Landing (`src/pages/LandingPage.tsx`) composed of:
- `LandingNavbar`, `HeroSection`, `FeaturesSection`, `BeforeAfterSection`, `OnboardingStepsSection`, `TestimonialsSection`, `FAQSection`, `PricingSection`, `CTASection`, `Footer`

Auth: `Login.tsx`, `Signup.tsx`, `onboarding/ConnectInstagram.tsx`, `AuthCallback.tsx`
App (behind `AppLayout` + `Navbar`): `Dashboard`, `Conversations`, `Products`, `AIKnowledge`, `Analytics`, `Settings`, `Pricing`

Brand tokens (in `src/index.css`):
- Yellow `#FFF100`, Magenta `#FF00FF`, Black `#000`, plus grays. Poppins headings, Inter body.

## 2. What will stay unchanged

- All routes in `src/App.tsx`
- All sections and their order on the landing page
- All copy, product positioning, testimonials, features, pricing tiers, FAQ items
- All forms, API calls (`src/lib/api.ts`), auth store, IG OAuth flow
- All page-level layouts (hero on top, features grid, before/after, 3 steps, testimonials carousel, FAQ, pricing, CTA, footer)
- Brand palette identity: yellow + black remains primary. Magenta stays as secondary accent.
- Dashboard information architecture, stats cards, quick actions, recent conversations

## 3. What will be visually improved

### 3.1 Design tokens (`src/index.css`, `tailwind.config.ts`)
- Add a subtle off-white surface token (`--surface`, ~`0 0% 98%`) so section alternation feels intentional instead of pure white on pure white.
- Refine border color to a slightly cooler neutral for a more premium feel (still very light).
- Introduce two shadow tiers: `--shadow-sm` (resting cards) and `--shadow-md` (hover) — replaces the ad-hoc `0 2px 8px` / `0 8px 24px` used inline.
- Add a `--radius-lg` (14px) for cards; keep buttons at existing radius.
- Tighten focus ring to use `--ring` with 2px offset for consistent a11y states.

### 3.2 Typography
- Landing H1: slight tracking tightening (`-0.02em`) and clamp-based responsive size for smoother scaling.
- Section H2s: unify to one size ramp (mobile 30 / desktop 44) and consistent `mb` spacing.
- Body: bump base line-height to 1.65 on marketing paragraphs for readability.
- Muted supporting text: switch to a single token (`text-muted-foreground`) everywhere instead of mixing `text-mc-gray` and gray-500/600.
- Numbers/stats in dashboard: tabular-nums for alignment.

### 3.3 Spacing rhythm
- Standardize section vertical padding on landing to `py-20 md:py-28` (currently varies 60–100px).
- Standardize section horizontal padding to `px-6 md:px-10` with a shared `max-w-6xl` container.
- Card interior padding aligned to `p-6 md:p-8`.
- Consistent 12/16/24 gap scale between grid items.

### 3.4 Cards & containers
- Landing feature cards, testimonial card, FAQ items, pricing cards: unify to `rounded-2xl`, `border-border`, `shadow-sm`, `hover:shadow-md`, `hover:-translate-y-0.5`.
- Replace inline shadows in `.feature-card` / `.card-elevated` with the new shadow tokens.
- Improve accent bars (yellow top/left borders on testimonials/FAQ/pricing) — keep them, but normalize to 3px and same color token.

### 3.5 Buttons & inputs
- Consolidate primary CTA style via existing `.btn-primary` and shadcn `Button` `default` variant — same look, better hover (slight lift + shadow-md, 200ms).
- Add clearer focus-visible ring on all buttons and inputs.
- Inputs: taller (`h-11`), refined border, focus ring uses `--ring`, placeholder muted.
- Secondary/outline buttons: consistent border weight and hover bg.

### 3.6 Navbar (landing + app)
- Same structure. Add subtle bottom border + backdrop blur when scrolled feel (already white — keep). Tighten vertical padding, align logo/link sizes, consistent gap.
- Active app nav link: pill with `bg-primary/10 text-foreground` instead of heavy fill on non-active hover.

### 3.7 Footer
- Same 4-column structure. Improve column gap, link hover color, newsletter input polish, social icon sizing consistency. No content changes.

### 3.8 Auth pages (`Login`, `Signup`, `ConnectInstagram`)
- Same fields, same actions. Refine card container: `rounded-2xl`, `shadow-md`, consistent inner padding, better label→input spacing, cleaner error state.

### 3.9 Dashboard & app screens
- `Dashboard.tsx`: keep grid; refine stat cards (icon chip alignment, tabular numbers, muted label), IG connection banner border/shadow tokens, Recent Conversations row hover, Avatar ring.
- `Conversations`, `Products`, `AIKnowledge`, `Analytics`, `Settings`: apply the shared card/spacing/typography tokens. No column/feature changes. Tables (if any) get zebra hover, tighter header, tabular numbers.
- Topbar (`Navbar` in `layout/`): tighter height, active pill, consistent icon size 18px.

### 3.10 Colors (minimal)
- Keep yellow + black identity. Only:
  - Slightly cooler border neutral.
  - Introduce `--surface` for alternating section backgrounds (very close to white).
  - Ensure `text-muted-foreground` contrast passes AA on white.
- No new brand colors. Magenta stays where it currently is.

## 4. Section-by-section conservative changes

```text
LandingNavbar     spacing, link gap, active/hover polish
HeroSection       H1 tracking + clamp size, CTA hover lift, image/card shadow token
FeaturesSection   unify card radius/shadow/padding; icon chip refinement
BeforeAfter       align column gaps, heading rhythm
OnboardingSteps   number circle shadow token, consistent step text sizes
Testimonials      card radius 2xl, 3px accent bar, dot spacing, arrow buttons focus ring
FAQ               item padding, chevron size, open state bg via token
Pricing           card radius/shadow tokens, "Most popular" ring using --ring, table hover
CTASection        button hover state, spacing
Footer            column gap, link hover, newsletter input polish
Auth pages        card container, input h-11, focus ring, spacing
Dashboard         stat card polish, tabular numbers, banner tokens, list row hover
App Navbar        active pill, height, icon size
Other app pages   shared card/spacing/typography tokens applied conservatively
```

## 5. Files touched (visual only)

- `src/index.css` — add tokens, refine shadows, radii, focus ring, muted contrast
- `tailwind.config.ts` — expose new tokens if needed
- `src/components/landing/*` — className tweaks only, no JSX restructure
- `src/components/layout/Navbar.tsx` — className tweaks
- `src/pages/Login.tsx`, `Signup.tsx`, `onboarding/ConnectInstagram.tsx` — container/spacing polish
- `src/pages/Dashboard.tsx` and other app pages — className tweaks only

Not touched: `src/App.tsx`, `src/lib/api.ts`, `src/store/authStore.ts`, any route, any handler, any data logic.

## 6. Guardrails

- No section added or removed.
- No copy edits.
- No new dependencies.
- No layout rewrites — only className / token changes and small wrapper refinements.
- Diffs kept small and reviewable per file.

Awaiting your approval to proceed.
