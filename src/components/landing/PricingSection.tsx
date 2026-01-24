import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 50,
    description: "Best for small shops testing automation",
    features: [
      "50 conversations/day",
      "1 Instagram page",
      "Basic analytics",
      "Email support (24hr response)",
      "AI-powered responses",
    ],
    popular: false,
    cta: "Start free",
    ctaLink: "/signup",
  },
  {
    name: "Pro",
    monthlyPrice: 150,
    description: "Most popular. Ideal for growing stores.",
    features: [
      "500 conversations/day",
      "Unlimited Instagram pages",
      "Advanced analytics",
      "Priority support (2hr response)",
      "Custom AI tone",
      "A/B testing",
      "Integrations (Zapier coming)",
    ],
    popular: true,
    cta: "Start free",
    ctaLink: "/signup",
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    description: "For high-volume brands and agencies",
    features: [
      "Unlimited conversations/day",
      "Unlimited Instagram pages",
      "Dedicated account manager",
      "Custom integrations",
      "White-label option",
      "SLA guarantees (99.9% uptime)",
      "Priority support",
    ],
    popular: false,
    cta: "Request demo",
    ctaLink: "/contact",
  },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const getPrice = (monthlyPrice: number | null) => {
    if (monthlyPrice === null) return "Custom";
    if (isAnnual) {
      const annualMonthly = Math.round(monthlyPrice * 0.8);
      return `$${annualMonthly}`;
    }
    return `$${monthlyPrice}`;
  };

  return (
    <section className="py-16 md:py-20 px-5 md:px-10 bg-landing-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-landing-headline mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="font-inter text-lg text-landing-subheadline">
            Start free. Upgrade when you're ready.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`font-inter text-sm ${!isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-landing-teal"
          />
          <span className={`font-inter text-sm ${isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Annual
            <span className="ml-1.5 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "border-landing-teal shadow-lg scale-105"
                  : "border-border hover:-translate-y-1"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-landing-teal text-white text-xs font-medium px-3 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="font-poppins font-semibold text-xl text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="font-poppins font-bold text-4xl text-landing-teal">
                    {getPrice(plan.monthlyPrice)}
                  </span>
                  {plan.monthlyPrice && (
                    <span className="font-inter text-sm text-muted-foreground">/month</span>
                  )}
                </div>
                {plan.monthlyPrice && (
                  <p className="font-inter text-xs text-muted-foreground">
                    Billed {isAnnual ? "annually" : "monthly"}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-landing-teal flex-shrink-0 mt-0.5" />
                    <span className="font-inter text-sm text-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                asChild
                className={`w-full font-inter font-medium py-3 rounded-lg transition-all duration-200 ${
                  plan.popular
                    ? "bg-landing-teal hover:bg-landing-teal/90 text-white shadow-md hover:shadow-lg"
                    : plan.name === "Enterprise"
                    ? "bg-white border-2 border-landing-teal text-landing-teal hover:bg-landing-teal/5"
                    : "bg-landing-teal hover:bg-landing-teal/90 text-white"
                }`}
                variant={plan.name === "Enterprise" ? "outline" : "default"}
              >
                <Link to={plan.ctaLink}>{plan.cta}</Link>
              </Button>

              {/* Footer */}
              <p className="font-inter text-xs text-muted-foreground italic text-center mt-4">
                {plan.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
