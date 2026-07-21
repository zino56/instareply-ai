import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: "Starter",
      monthlyPrice: 49,
      annualPrice: 470,
      period: isAnnual ? "Billed annually" : "Billed monthly",
      description: "Best for small shops testing automation",
      features: [
        "50 conversations/day",
        "1 Instagram page",
        "Basic analytics",
        "Email support",
        "AI-powered responses",
      ],
      buttonText: "Start free",
      buttonStyle: "primary",
      highlighted: false,
    },
    {
      name: "Pro",
      monthlyPrice: 149,
      annualPrice: 1435,
      period: isAnnual ? "Billed annually" : "Billed monthly",
      description: "Most popular. Ideal for growing stores.",
      features: [
        "500 conversations/day",
        "Unlimited Instagram pages",
        "Advanced analytics",
        "Priority support (2hr response)",
        "Custom AI tone",
        "A/B testing",
        "Zapier integration",
      ],
      buttonText: "Start free",
      buttonStyle: "magenta",
      highlighted: true,
      badge: "MOST POPULAR",
    },
    {
      name: "Enterprise",
      monthlyPrice: null,
      annualPrice: null,
      period: "Tailored to your needs",
      description: "For high-volume brands and agencies.",
      features: [
        "Unlimited conversations/day",
        "Unlimited Instagram pages",
        "Dedicated account manager",
        "Custom integrations",
        "White-label option",
        "SLA guarantees (99.9% uptime)",
        "Priority support 24/7",
      ],
      buttonText: "Request demo",
      buttonStyle: "outline",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-[60px] md:py-[100px] px-5 md:px-[60px] bg-mc-light-gray">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-[32px] md:text-[48px] text-mc-black leading-tight mb-6">
            Simple, transparent pricing
          </h2>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setIsAnnual(false)}
              className={`font-inter text-sm px-6 py-2.5 rounded-md transition-all duration-200 ${
                !isAnnual
                  ? "bg-mc-yellow text-mc-black font-semibold"
                  : "text-mc-gray hover:text-mc-black"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`font-inter text-sm px-6 py-2.5 rounded-md transition-all duration-200 ${
                isAnnual
                  ? "bg-mc-yellow text-mc-black font-semibold"
                  : "text-mc-gray hover:text-mc-black"
              }`}
            >
              Annual - Save 20%
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl p-8 transition-all duration-300 ${
                tier.highlighted
                  ? "border-[3px] border-mc-yellow shadow-yellow md:-translate-y-3"
                  : "border border-[#E0E0E0] shadow-card hover:shadow-card-hover hover:-translate-y-1"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-mc-yellow text-mc-black font-poppins font-bold text-xs px-4 py-1.5 rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier Name */}
              <h3 className="font-poppins font-bold text-2xl md:text-[28px] text-mc-black mb-4">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-2">
                {tier.monthlyPrice !== null ? (
                  <span className="font-poppins font-bold text-5xl md:text-[64px] text-mc-black">
                    ${isAnnual ? Math.round(tier.annualPrice! / 12) : tier.monthlyPrice}
                  </span>
                ) : (
                  <span className="font-poppins font-bold text-3xl md:text-[40px] text-mc-black">
                    Custom pricing
                  </span>
                )}
                {tier.monthlyPrice !== null && (
                  <span className="font-inter text-sm text-[#999999] ml-1">/month</span>
                )}
              </div>

              {/* Period */}
              <p className="font-inter text-sm text-[#999999] mb-6">{tier.period}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-mc-yellow flex-shrink-0 mt-0.5" />
                    <span className="font-inter text-[15px] text-mc-black leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button
                asChild
                className={`w-full font-poppins font-bold text-sm py-4 h-auto rounded-lg transition-all duration-200 ${
                  tier.buttonStyle === "magenta"
                    ? "bg-mc-magenta hover:bg-[#E600E6] text-white hover:shadow-magenta"
                    : tier.buttonStyle === "outline"
                    ? "bg-transparent border-2 border-mc-yellow text-mc-black hover:bg-mc-yellow"
                    : "bg-mc-yellow hover:bg-mc-hover-yellow text-mc-black hover:shadow-yellow"
                }`}
              >
                <Link to={tier.buttonStyle === "outline" ? "#contact" : "/signup"}>
                  {tier.buttonText}
                </Link>
              </Button>

              {/* Description */}
              <p className="font-inter text-xs text-[#999999] text-center mt-4">
                {tier.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
