import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      name: "Starter",
      monthly: 49,
      annual: 470,
      description: "For solo operators testing DMs as a channel.",
      features: [
        "1 Instagram + 1 WhatsApp number",
        "Up to 500 conversations / month",
        "AI reply + qualification",
        "Email support",
      ],
      cta: "Start free",
      href: "/signup",
      recommended: false,
    },
    {
      name: "Growth",
      monthly: 149,
      annual: 1435,
      description: "For teams turning DMs into predictable pipeline.",
      features: [
        "Unlimited Instagram + WhatsApp numbers",
        "Up to 5,000 conversations / month",
        "Custom qualification flows & tone",
        "Rep routing rules & round-robin",
        "CRM sync (HubSpot, Salesforce, Pipedrive)",
        "Priority support",
      ],
      cta: "Start free",
      href: "/signup",
      recommended: true,
    },
    {
      name: "Scale",
      monthly: null,
      annual: null,
      description: "For high-volume brands, agencies, and multi-brand teams.",
      features: [
        "Unlimited conversations",
        "Multi-workspace & multi-brand",
        "Custom integrations & webhooks",
        "SSO / SAML",
        "Dedicated success manager",
      ],
      cta: "Talk to sales",
      href: "#contact",
      recommended: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-secondary/40 border-t border-border">
      <div className="section-container">
        <div className="max-w-2xl mb-10">
          <div className="eyebrow mb-4">Pricing</div>
          <h2 className="font-display text-[36px] md:text-[48px] leading-[1.05] text-foreground">
            Simple pricing. Grows with your volume.
          </h2>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <p className="text-muted-foreground text-sm">
            14-day free trial · No credit card required · Cancel anytime.
          </p>
          <div className="inline-flex items-center bg-card border border-border rounded-lg p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`text-sm px-4 py-1.5 rounded-md transition-all ${
                !isAnnual ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`text-sm px-4 py-1.5 rounded-md transition-all ${
                isAnnual ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual · save 20%
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl bg-card p-8 flex flex-col ${
                tier.recommended
                  ? "border border-foreground shadow-elevated"
                  : "border border-border"
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3 left-8 text-[10px] uppercase tracking-[0.16em] text-background bg-foreground px-2 py-1 rounded">
                  Recommended
                </div>
              )}

              <h3 className="font-display text-2xl text-foreground mb-1">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>

              <div className="mb-6">
                {tier.monthly !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-5xl text-foreground">
                      ${isAnnual ? Math.round((tier.annual as number) / 12) : tier.monthly}
                    </span>
                    <span className="text-sm text-muted-foreground">/ month</span>
                  </div>
                ) : (
                  <div className="font-display text-4xl text-foreground">Custom</div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  {tier.monthly !== null ? (isAnnual ? "Billed annually" : "Billed monthly") : "Tailored to your team"}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={
                  tier.recommended
                    ? "w-full h-11 rounded-[10px] bg-foreground text-background hover:bg-accent"
                    : "w-full h-11 rounded-[10px] bg-background text-foreground border border-foreground hover:bg-secondary"
                }
              >
                <Link to={tier.href}>{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
