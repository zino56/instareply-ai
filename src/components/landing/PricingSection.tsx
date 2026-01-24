import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 50,
    description: "Best for testing automation",
    features: [
      "50 conversations/day",
      "1 Instagram page",
      "Basic analytics",
      "Email support (24hr)",
      "AI-powered responses",
    ],
    popular: false,
    cta: "Start Free",
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
      "Priority support (2hr)",
      "Custom AI tone",
      "A/B testing",
      "Integrations",
    ],
    popular: true,
    cta: "Start Free",
    ctaLink: "/signup",
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    description: "For enterprise & agencies",
    features: [
      "Unlimited conversations",
      "Unlimited pages",
      "Dedicated account manager",
      "Custom integrations",
      "White-label option",
      "SLA guarantee (99.9%)",
      "Priority support",
    ],
    popular: false,
    cta: "Request Demo",
    ctaLink: "/contact",
  },
];

const comparisonFeatures = [
  { name: "Conversations/day", starter: "50", pro: "500", enterprise: "Unlimited" },
  { name: "Instagram pages", starter: "1", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Analytics level", starter: "Basic", pro: "Advanced", enterprise: "Advanced" },
  { name: "Support tier", starter: "Email (24hr)", pro: "Priority (2hr)", enterprise: "Dedicated" },
  { name: "Custom AI tone", starter: false, pro: true, enterprise: true },
  { name: "Team members", starter: "1", pro: "5", enterprise: "Unlimited" },
  { name: "API access", starter: false, pro: true, enterprise: true },
  { name: "SLA guarantee", starter: false, pro: false, enterprise: true },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const getPrice = (monthlyPrice: number | null) => {
    if (monthlyPrice === null) return "Custom Pricing";
    if (isAnnual) {
      const annualMonthly = Math.round(monthlyPrice * 0.8);
      return `$${annualMonthly}`;
    }
    return `$${monthlyPrice}`;
  };

  return (
    <section className="py-16 md:py-[100px] px-5 md:px-10 bg-white">
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="font-poppins font-bold text-[36px] md:text-[44px] text-[#001D3D] leading-tight">
            Simple, Transparent Pricing
          </h2>
        </div>
        <p className="font-inter text-lg text-[#6b7280] text-center mb-10 md:mb-[50px]">
          Start free. Upgrade when you're ready.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12 md:mb-[60px]">
          <div className="inline-flex bg-[#f3f4f6] rounded-lg p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`font-inter font-semibold text-sm px-5 py-2 rounded-md transition-all duration-200 ${
                !isAnnual
                  ? "bg-[#FFD60A] text-[#001D3D]"
                  : "text-[#6b7280] hover:text-[#001D3D]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`font-inter font-semibold text-sm px-5 py-2 rounded-md transition-all duration-200 ${
                isAnnual
                  ? "bg-[#FFD60A] text-[#001D3D]"
                  : "text-[#6b7280] hover:text-[#001D3D]"
              }`}
            >
              Annual - Save 20%
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-[1100px] mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl p-8 md:p-10 border transition-all duration-300 ${
                plan.popular
                  ? "border-t-[5px] border-t-[#FFD60A] border-[#e5e7eb] shadow-[0_8px_24px_rgba(255,214,10,0.15)] lg:scale-105"
                  : "border-t-4 border-t-[#FFD60A] border-[#e5e7eb] hover:shadow-lg"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-[#FFD60A] text-[#001D3D] text-[10px] font-poppins font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="font-poppins font-semibold text-xl md:text-2xl text-[#001D3D] mb-4">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className={`font-poppins font-bold ${plan.monthlyPrice ? "text-[40px] md:text-[48px] text-[#FFD60A]" : "text-[32px] md:text-[36px] text-[#001D3D]"}`}>
                    {getPrice(plan.monthlyPrice)}
                  </span>
                  {plan.monthlyPrice && (
                    <span className="font-inter text-base text-[#6b7280]">/month</span>
                  )}
                </div>
                {plan.monthlyPrice ? (
                  <p className="font-inter text-xs text-[#6b7280]">
                    Billed {isAnnual ? "annually" : "monthly"}
                  </p>
                ) : (
                  <p className="font-inter text-xs text-[#6b7280]">
                    Tailored to your needs
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#FFD60A] flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="font-inter text-sm text-[#001D3D]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                asChild
                className={`w-full font-inter font-semibold text-base py-3.5 h-auto rounded-lg transition-all duration-200 ${
                  plan.popular
                    ? "bg-[#001D3D] hover:bg-[#002a57] text-[#FFD60A] shadow-md hover:shadow-lg"
                    : plan.name === "Enterprise"
                    ? "bg-white border-2 border-[#001D3D] text-[#001D3D] hover:bg-[#001D3D] hover:text-white"
                    : "bg-[#FFD60A] hover:bg-[#E5C009] text-[#001D3D]"
                }`}
                variant={plan.name === "Enterprise" ? "outline" : "default"}
              >
                <Link to={plan.ctaLink}>{plan.cta}</Link>
              </Button>

              {/* Footer */}
              <p className="font-inter text-xs text-[#6b7280] italic text-center mt-4">
                {plan.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-16 md:mt-20">
          <h3 className="font-poppins font-semibold text-2xl md:text-[28px] text-[#001D3D] text-center mb-10">
            Feature Comparison
          </h3>
          
          <div className="max-w-[1000px] mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FFD60A]">
                  <th className="font-poppins font-semibold text-sm text-[#001D3D] text-left py-4 px-4 md:px-6">
                    Feature
                  </th>
                  <th className="font-poppins font-semibold text-sm text-[#001D3D] text-center py-4 px-4">
                    Starter
                  </th>
                  <th className="font-poppins font-semibold text-sm text-[#001D3D] text-center py-4 px-4">
                    Pro
                  </th>
                  <th className="font-poppins font-semibold text-sm text-[#001D3D] text-center py-4 px-4">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors"
                  >
                    <td className="font-inter text-sm text-[#001D3D] py-4 px-4 md:px-6">
                      {feature.name}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.starter === "boolean" ? (
                        feature.starter ? (
                          <Check className="w-5 h-5 text-[#FFD60A] mx-auto" strokeWidth={3} />
                        ) : (
                          <Minus className="w-5 h-5 text-[#d1d5db] mx-auto" />
                        )
                      ) : (
                        <span className="font-inter text-sm text-[#001D3D]">{feature.starter}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <Check className="w-5 h-5 text-[#FFD60A] mx-auto" strokeWidth={3} />
                        ) : (
                          <Minus className="w-5 h-5 text-[#d1d5db] mx-auto" />
                        )
                      ) : (
                        <span className="font-inter text-sm text-[#001D3D]">{feature.pro}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <Check className="w-5 h-5 text-[#FFD60A] mx-auto" strokeWidth={3} />
                        ) : (
                          <Minus className="w-5 h-5 text-[#d1d5db] mx-auto" />
                        )
                      ) : (
                        <span className="font-inter text-sm text-[#001D3D]">{feature.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
