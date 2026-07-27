import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BillingToggle, PricingCard, TIERS, type Billing } from "@/components/pricing/plans";

const PricingSection = () => {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="bg-background px-5 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Pricing</p>
          <h2 className="mt-3 font-poppins text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground lg:text-[40px]">
            Pricing that scales with your inbox
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-relaxed text-muted-foreground">
            Start free, automate repetitive DMs, and upgrade when your message volume grows.
          </p>
          <div className="mt-8 flex justify-center">
            <BillingToggle value={billing} onChange={setBilling} />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} billing={billing} />
          ))}
        </div>

        {/* Link to full pricing */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Need full details?{" "}
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1 font-semibold text-foreground underline-offset-4 hover:underline focus-ring rounded-md"
          >
            View full pricing
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
