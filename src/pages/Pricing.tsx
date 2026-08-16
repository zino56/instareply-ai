import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Minus, Moon, Sun, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { BillingToggle, PricingCard, TIERS, type Billing } from "@/components/pricing/plans";

const COMPARISON: { label: string; values: (string | boolean)[] }[] = [
  { label: "Instagram accounts", values: ["1", "1", "Up to 3", "Up to 10 or custom"] },
  { label: "Monthly messages / AI usage", values: ["25", "Limited", "Expanded", "High volume"] },
  { label: "Automation level", values: ["None", "Common questions", "Suggestions + automation", "Advanced"] },
  { label: "Team access", values: [false, false, "Shared inbox", "Full team access"] },
  { label: "Analytics", values: [false, false, true, "Reporting"] },
  { label: "Support", values: ["Community", "Email", "Priority", "Priority + onboarding"] },
  { label: "Conveero branding", values: ["Shown", "Removed", "Removed", "Removed"] },
];

const FAQS = [
  {
    q: "Can Conveero replace a community manager?",
    a: "No. It handles first-line repetitive DMs and inbox load so your team focuses on high-value conversations.",
  },
  {
    q: "What happens when I hit the Free limit?",
    a: "You can upgrade instantly to keep responding.",
  },
  {
    q: "Is yearly cheaper?",
    a: "Yes — yearly billing includes 2 months free.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, upgrade or downgrade anytime.",
  },
  {
    q: "Who is Growth for?",
    a: "Active brands and small teams with real daily DM volume.",
  },
];

const NAV = [
  { label: "Home", to: "/" },
  { label: "Pricing", to: "/pricing", active: true },
  { label: "Sign in", to: "/login" },
];

function useTheme() {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  return { isDark, toggle: () => setIsDark((v) => !v) };
}

const PricingHeader = () => {
  const { isDark, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center rounded-md focus-ring" aria-label="Conveero home">
          <Logo markOnly variant={isDark ? "light" : "dark"} size="chrome" className="md:hidden" priority />
          <Logo variant={isDark ? "light" : "dark"} size="nav" className="hidden md:block" priority />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-ring",
                item.active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-ring"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Button asChild className="hidden h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 md:inline-flex">
            <Link to="/signup">Start free</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground md:hidden focus-ring"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 py-3 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium focus-ring",
                  item.active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 h-11 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Link to="/signup" onClick={() => setOpen(false)}>Start free</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

const CellValue = ({ value }: { value: string | boolean }) => {
  if (value === true) return <Check className="h-4 w-4 text-primary" aria-label="Included" />;
  if (value === false) return <Minus className="h-4 w-4 text-muted-foreground/60" aria-label="Not included" />;
  return <span className="text-sm text-foreground/90">{value}</span>;
};

const Pricing = () => {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div className="min-h-screen bg-background">
      <PricingHeader />

      <main>
        {/* Hero */}
        <section className="border-b border-border/70 px-5 py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Pricing</p>
            <h1 className="mt-3 font-poppins text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground lg:text-[44px]">
              Pricing that scales with your inbox
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-relaxed text-muted-foreground">
              Start free, automate repetitive DMs, and upgrade when your message volume grows. Built for
              brands, teams, and agencies that need faster first-line community handling.
            </p>
            <div className="mt-8 flex justify-center">
              <BillingToggle value={billing} onChange={setBilling} />
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="px-5 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {TIERS.map((tier) => (
              <PricingCard key={tier.id} tier={tier} billing={billing} />
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-[1200px] text-center text-xs text-muted-foreground">
            Automate first-line replies. Keep your inbox moving. Free your team for high-value conversations.
          </p>
        </section>

        {/* Comparison */}
        <section className="border-t border-border/70 px-5 py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="font-poppins text-xl font-semibold tracking-[-0.01em] text-foreground lg:text-2xl">
              Key differences
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Only what actually changes between plans.
            </p>

            {/* Desktop table */}
            <div className="mt-8 hidden overflow-hidden rounded-2xl border border-border bg-card lg:block">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Conveero plan comparison</caption>
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Feature
                    </th>
                    {TIERS.map((tier) => (
                      <th
                        key={tier.id}
                        scope="col"
                        className={cn(
                          "px-5 py-3.5 text-sm font-semibold",
                          tier.popular ? "text-foreground" : "text-foreground/80",
                        )}
                      >
                        {tier.name}
                        {tier.popular && (
                          <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase text-primary-foreground">
                            Popular
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="border-b border-border last:border-0">
                      <th scope="row" className="px-5 py-4 text-sm font-medium text-muted-foreground">
                        {row.label}
                      </th>
                      {row.values.map((value, i) => (
                        <td key={i} className={cn("px-5 py-4", TIERS[i].popular && "bg-primary/[0.04]")}>
                          <CellValue value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile stacked */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {TIERS.map((tier, tierIndex) => (
                <div key={tier.id} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-poppins text-sm font-semibold text-foreground">{tier.name}</h3>
                  <dl className="mt-3 space-y-2.5">
                    {COMPARISON.map((row) => (
                      <div key={row.label} className="flex items-start justify-between gap-4 border-b border-border/70 pb-2.5 last:border-0 last:pb-0">
                        <dt className="text-xs text-muted-foreground">{row.label}</dt>
                        <dd className="text-right">
                          <CellValue value={row.values[tierIndex]} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ + trust */}
        <section className="border-t border-border/70 px-5 py-14 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
            <div>
              <h2 className="font-poppins text-xl font-semibold tracking-[-0.01em] text-foreground lg:text-2xl">
                Questions, answered
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Conveero handles first-line replies so your team spends its time on the conversations that
                actually need a human.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" aria-hidden /> Official Instagram messaging APIs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" aria-hidden /> Cancel or change plans anytime
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" aria-hidden /> Human handover always available
                </li>
              </ul>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  className="rounded-xl border border-border bg-card px-5"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-medium text-foreground hover:no-underline focus-ring">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-5 pb-16 lg:px-8 lg:pb-24">
          <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-sm)] md:flex-row md:items-center lg:p-10">
            <div>
              <h2 className="font-poppins text-xl font-semibold tracking-[-0.01em] text-foreground lg:text-2xl">
                Keep your inbox moving
              </h2>
              <p className="mt-2 max-w-[520px] text-sm leading-relaxed text-muted-foreground">
                Start on Free, automate the repetitive DMs, and upgrade when volume grows.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild className="h-11 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                <Link to="/signup">Start free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-lg border-border px-6 text-sm font-semibold text-foreground hover:bg-muted"
              >
                <Link to="/signup?plan=growth">Start with Growth</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 md:flex-row">
          <Logo markOnly size="chrome" className="dark:hidden" />
          <Logo markOnly variant="light" size="chrome" className="hidden dark:block" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Conveero. First-line community replies, automated.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
