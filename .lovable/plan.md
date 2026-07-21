
# Conveero Frontend Redesign — Plan

Frontend/UI only. No backend, auth, routing, or API changes.

## 1. Revised headline

**Primary:** Turn Instagram and WhatsApp DMs into qualified pipeline.
**Sub:** Conveero replies, qualifies, follows up, and routes every conversation to the right person — so no lead sits unread.

Alternates if you prefer sharper pain framing:
- "Your DMs are a pipeline. Start treating them like one."
- "Every Instagram and WhatsApp lead, qualified and routed within minutes."

## 2. Section-by-section landing plan

1. **Nav** — thin, white, left wordmark, center links (Product, How it works, Pricing, FAQ), right: Sign in + "Book a demo" primary.
2. **Hero** — two-column. Left: eyebrow ("For Instagram & WhatsApp sales teams"), headline, sub, two CTAs (Start free / See it in action), tiny "Illustrative preview" note. Right: realistic product frame showing a DM thread + qualification panel side-by-side (marked *Illustrative*).
3. **Problem / Solution** — two stacked cards or split table. Left "Without Conveero" (missed DMs, no ownership, cold follow-ups, no CRM trace). Right "With Conveero" (instant reply, auto-qualified, routed to rep, synced to pipeline). No metrics.
4. **How it works** — 4 steps horizontal on desktop, stacked on mobile: Connect → Reply & Qualify → Follow up → Hand off. Each step: number, short title, one-line description, small inline UI motif.
5. **Product workflow preview** — the flagship section. Single wide "command center" mock showing a lead's lifecycle: DM in → AI draft → qualification tags → assigned rep → booked call. Marked *Illustrative product preview*.
6. **Trust / proof** — honest version: "Built for teams handling high-volume DMs" + placeholder logo row explicitly labeled *Placeholder — replace with real customers*. Plus 2 short quote cards labeled *Illustrative*. No invented numbers.
7. **Pricing** — 3 tiers (Starter, Growth, Scale), one recommended, feature lists, single accent on the recommended tier. Keep existing pricing structure.
8. **FAQ** — accordion, 6–8 questions focused on IG/WhatsApp specifics, data handling, handoff to CRM, pricing, cancellation.
9. **Final CTA** — full-width neutral band, single headline, one primary button, one secondary link.
10. **Footer** — minimal: wordmark, short tagline, columns (Product, Company, Legal), no social clutter.

Dashboard shell (light polish, no logic change):
- Tighten Navbar spacing, replace neon accents with the restrained accent.
- Dashboard: replace generic stat cards with a "Pipeline today" strip (Unread / Qualifying / Awaiting follow-up / Handed off) plus a live "Recent conversations" list styled like the workflow preview.
- Conversations, Products, AI Knowledge, Analytics, Settings: unify card, input, and spacing tokens. No behavior changes.

## 3. Visual system

**Palette — "Paper & Ink + restrained accent"**
- Background: `#FAFAF7` (warm paper)
- Surface: `#FFFFFF`
- Border: `#ECEBE6`
- Ink (text): `#111111`
- Muted text: `#5B5B57`
- Accent: `#2F5D50` (deep evergreen — calm, premium, non-tech-cliché)
- Accent hover: `#264A40`
- Success: `#3F7D58` · Warning: `#B4791F` · Danger: `#B23A2A`

No gradients. No neon. One accent, used sparingly on primary CTAs, active states, and single emphasis marks.

**Typography**
- Headings: **Instrument Serif** (editorial, premium, distinctive from typical AI SaaS)
- Body/UI: **Inter** (kept for legibility and existing usage)
- Scale: 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64. Hero headline 56–64, section H2 36, body 16, small 14.
- Tracking: -0.02em on display, 0 on body.

**Spacing & layout**
- Container max-width 1200px, gutter 24px.
- Section vertical padding: 96px desktop / 56px mobile.
- Card radius: 12px. Input radius: 10px. Button radius: 10px.
- Border: 1px `#ECEBE6`. Elevation: single soft shadow `0 1px 2px rgba(17,17,17,0.04), 0 8px 24px rgba(17,17,17,0.04)` — used only on the workflow preview and pricing recommended card.

**Buttons**
- Primary: solid `#111111` bg, white text, 44px height, 10px radius, hover → accent `#2F5D50`.
- Secondary: white bg, 1px border `#111111`, ink text, hover → bg `#F3F2ED`.
- Ghost: no border, ink text, hover underline.
- Focus ring: 2px accent at 40% opacity.

**Motion**
- 200–300ms ease-out on hover/enter only. No parallax, no marquee, no auto-carousels.

## 4. Files/components I will change

Landing:
- `src/pages/LandingPage.tsx` — recompose sections
- `src/components/landing/LandingNavbar.tsx`
- `src/components/landing/HeroSection.tsx`
- `src/components/landing/BeforeAfterSection.tsx` → refactored into Problem/Solution
- `src/components/landing/OnboardingStepsSection.tsx` → "How it works"
- `src/components/landing/FeaturesSection.tsx` → replaced by new **WorkflowPreviewSection.tsx** (new file)
- `src/components/landing/TestimonialsSection.tsx` → honest "Trust" section, all placeholders labeled
- `src/components/landing/PricingSection.tsx` — restyle only
- `src/components/landing/FAQSection.tsx` — restyle + rewrite Qs
- `src/components/landing/CTASection.tsx`
- `src/components/landing/Footer.tsx`

Design tokens:
- `src/index.css` — replace palette variables, add serif font import, adjust radii/shadow tokens
- `tailwind.config.ts` — register new semantic tokens and font families

Auth pages (visual only, no logic):
- `src/pages/Login.tsx`, `src/pages/Signup.tsx`, `src/pages/onboarding/ConnectInstagram.tsx`

Dashboard shell (visual only, no logic):
- `src/components/layout/Navbar.tsx`
- `src/pages/Dashboard.tsx` — restyled "Pipeline today" strip + recent conversations layout, same data sources
- Light token pass on `Conversations.tsx`, `Products.tsx`, `AIKnowledge.tsx`, `Analytics.tsx`, `Settings.tsx` (no structural rewrites)

Untouched:
- `src/lib/api.ts`, `src/store/authStore.ts`, `src/App.tsx` routes, `src/pages/AuthCallback.tsx`, all types and API calls.

---

Reply **approve** to proceed, or tell me what to adjust (headline, accent color, serif choice, or which sections to rescope).
