import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Billing = "monthly" | "yearly";

export interface Tier {
  id: string;
  name: string;
  monthly: number;
  blurb: string;
  features: string[];
  cta: string;
  to: string;
  popular?: boolean;
}

export const TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    blurb: "Try first-line automation on a single account.",
    features: [
      "25 messages / month",
      "1 Instagram account",
      "Inbox preview",
      "Basic access only",
      "No advanced automation",
      "Conveero branding",
    ],
    cta: "Start free",
    to: "/signup",
  },
  {
    id: "starter",
    name: "Starter",
    monthly: 49,
    blurb: "Automate the questions you answer every day.",
    features: [
      "1 Instagram account",
      "DM auto-replies for common questions",
      "Basic inbox assistant",
      "Limited monthly AI usage",
      "Email support",
    ],
    cta: "Choose Starter",
    to: "/signup?plan=starter",
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 99,
    blurb: "Handle repetitive DMs at scale with a shared inbox.",
    features: [
      "Up to 3 Instagram accounts",
      "Shared inbox",
      "AI reply suggestions + automation",
      "Saved FAQs + quick replies",
      "Analytics",
      "Priority support",
    ],
    cta: "Start with Growth",
    to: "/signup?plan=growth",
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 199,
    blurb: "Keep multi-account inboxes moving with your whole team.",
    features: [
      "Up to 10 accounts (or custom)",
      "Team access",
      "Advanced automation",
      "Reporting",
      "Priority onboarding",
      "Fast support",
    ],
    cta: "Choose Scale",
    to: "/signup?plan=scale",
  },
];

export const BillingToggle = ({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (v: Billing) => void;
}) => (
  <div className="flex flex-col items-center gap-3">
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="inline-flex items-center rounded-xl border border-border bg-card p-1 shadow-[var(--shadow-sm)]"
    >
      {(["monthly", "yearly"] as Billing[]).map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={cn(
            "min-h-[40px] rounded-lg px-5 text-sm font-medium capitalize transition-all duration-200 focus-ring",
            value === option
              ? "bg-primary text-primary-foreground shadow-[var(--shadow-sm)]"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
    <p className="text-xs text-muted-foreground">
      Yearly billing includes <span className="font-semibold text-foreground">2 months free</span>.
    </p>
  </div>
);

const PriceBlock = ({ tier, billing }: { tier: Tier; billing: Billing }) => {
  if (tier.monthly === 0) {
    return (
      <div className="mt-5">
        <div className="flex items-baseline gap-1.5">
          <span className="font-poppins text-4xl font-bold tracking-[-0.02em] text-foreground">$0</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">Free forever, limited usage</p>
      </div>
    );
  }

  const effective = billing === "yearly" ? Math.round((tier.monthly * 10) / 12) : tier.monthly;

  return (
    <div className="mt-5">
      <div className="flex items-baseline gap-1.5">
        <span className="font-poppins text-4xl font-bold tracking-[-0.02em] text-foreground">${effective}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {billing === "yearly" ? (
          <>
            ${tier.monthly * 10} billed yearly{" "}
            <span className="text-muted-foreground/80 line-through">${tier.monthly}/mo</span>
          </>
        ) : (
          "Billed monthly"
        )}
      </p>
    </div>
  );
};

export const PricingCard = ({ tier, billing }: { tier: Tier; billing: Billing }) => (
  <div
    className={cn(
      "relative flex h-full flex-col rounded-2xl border bg-card p-6 text-left transition-all duration-300",
      tier.popular
        ? "border-primary/70 shadow-[var(--shadow-md)] ring-1 ring-primary/30"
        : "border-border shadow-[var(--shadow-sm)] hover:border-border hover:shadow-[var(--shadow-md)]",
    )}
  >
    {tier.popular && (
      <span className="absolute -top-2.5 left-6 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
        Most Popular
      </span>
    )}

    <h3 className="font-poppins text-base font-semibold text-foreground">{tier.name}</h3>
    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tier.blurb}</p>

    <PriceBlock tier={tier} billing={billing} />

    <Button
      asChild
      className={cn(
        "mt-6 h-11 w-full rounded-lg text-sm font-semibold transition-all duration-200",
        tier.popular
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-border bg-transparent text-foreground hover:bg-muted",
      )}
    >
      <Link to={tier.to}>{tier.cta}</Link>
    </Button>

    <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
      {tier.features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5">
          <Check
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              tier.popular ? "text-primary" : "text-muted-foreground",
            )}
            aria-hidden
          />
          <span className="text-sm leading-relaxed text-foreground/90">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);
