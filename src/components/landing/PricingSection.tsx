import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    description: "Get started with access to InstaAI basic features to engage up to 1,000 contacts FREE OF CHARGE",
    headerColor: "bg-[#E8F5E9]",
    headerTextColor: "text-black",
    features: [
      "Engage up to 1,000 Instagram DMs",
      "Post to Instagram at prime times",
      "Create 5 Custom Keyword Triggers",
      "Auto-respond to Comments",
      "Basic analytics",
    ],
    cta: "Start for Free",
    ctaLink: "/signup",
  },
  {
    name: "Pro",
    monthlyPrice: 15,
    description: "Grow your business with access to all advanced Pro features, starting at:",
    headerColor: "bg-manychat-green",
    headerTextColor: "text-white",
    popular: true,
    features: [
      "Unlimited Instagram DMs",
      "Post to Instagram at prime times",
      "Unlimited Custom Keyword Triggers",
      "Auto-respond to Comments",
      "Automate Lead Capture via DMs",
      "Access to Latest Features",
      "Advanced analytics",
    ],
    cta: "Get Started",
    ctaLink: "/signup",
  },
  {
    name: "Elite",
    monthlyPrice: null,
    description: "Customize your InstaAI experience to meet (and exceed) your ambitious goals",
    headerColor: "bg-manychat-blue",
    headerTextColor: "text-white",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "Priority Support",
      "SLA guarantee (99.9%)",
      "White-label option",
      "Unlimited team members",
    ],
    cta: "Contact Us",
    ctaLink: "/contact",
  },
];

const comparisonFeatures = [
  { name: "Full-featured 7-day/1000 contact free trial", starter: true, pro: true, enterprise: true },
  { name: "Engage Unlimited Instagram DMs", starter: "1,000 max", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Team members", starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Create Custom Keyword Triggers", starter: "10 keywords", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Mobile App (iOS/Android)", starter: true, pro: true, enterprise: true },
  { name: "Access to Latest Features", starter: false, pro: true, enterprise: true },
  { name: "Unlimited Flow Builder Automations", starter: false, pro: true, enterprise: true },
  { name: "Priority Support", starter: false, pro: false, enterprise: true },
  { name: "Multiple Instagram Accounts per ManyChat/InstaAI account", starter: "Paid Add-on", pro: "No Branding", enterprise: "No Branding" },
];

const PricingSection = () => {
  const [contactCount, setContactCount] = useState([500]);
  const [billingTab, setBillingTab] = useState<"free" | "pro" | "elite">("pro");

  const getProPrice = () => {
    const count = contactCount[0];
    if (count <= 500) return 15;
    if (count <= 1000) return 25;
    if (count <= 2500) return 45;
    if (count <= 5000) return 65;
    if (count <= 10000) return 95;
    return 95;
  };

  return (
    <section className="py-16 md:py-[120px] px-5 md:px-10 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="font-poppins font-bold text-[36px] md:text-[48px] text-black leading-tight">
            Choose an InstaAI plan that's right for you
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto mt-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl overflow-hidden border border-border transition-all duration-300 ${
                plan.popular ? "shadow-yellow-glow lg:scale-105" : "hover:shadow-lg"
              }`}
            >
              {/* Colored Header */}
              <div className={`${plan.headerColor} ${plan.headerTextColor} py-6 px-6`}>
                <h3 className="font-poppins font-bold text-2xl mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="px-6 py-6 border-b border-border">
                {plan.monthlyPrice !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="font-poppins font-bold text-[48px] text-black">
                      ${plan.name === "Pro" ? getProPrice() : plan.monthlyPrice}
                    </span>
                    <span className="font-inter text-base text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <div>
                    <span className="font-poppins font-bold text-[36px] text-black">
                      Custom
                    </span>
                    <p className="font-inter text-sm text-muted-foreground mt-1">
                      Contact for pricing
                    </p>
                  </div>
                )}

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="mt-3">
                    <span className="bg-manychat-green/10 text-manychat-green text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="px-6 py-4">
                <Button
                  asChild
                  className={`w-full font-inter font-semibold text-base py-3.5 h-auto rounded-lg transition-all duration-200 ${
                    plan.popular
                      ? "bg-manychat-green hover:bg-manychat-green/90 text-white"
                      : plan.name === "Elite"
                      ? "bg-manychat-blue hover:bg-manychat-blue/90 text-white"
                      : "bg-manychat-yellow hover:bg-[#E5D600] text-black"
                  }`}
                >
                  <Link to={plan.ctaLink}>{plan.cta}</Link>
                </Button>
              </div>

              {/* Features */}
              <div className="px-6 pb-6">
                <p className="font-inter text-xs text-muted-foreground mb-4 uppercase tracking-wide">
                  {plan.name === "Elite" ? "Everything in Pro, plus:" : "What's included:"}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-manychat-green flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="font-inter text-sm text-black">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Calculator */}
        <div className="mt-20 max-w-[800px] mx-auto">
          <div className="bg-white border border-border rounded-2xl p-8 shadow-card">
            <h3 className="font-poppins font-bold text-[24px] md:text-[28px] text-black text-center mb-2">
              Calculate the Cost and Billing of Your Monthly Plan
            </h3>
            <p className="font-inter text-base text-muted-foreground text-center mb-8">
              Try our plan calculator below to see the price of your preferred tier.
            </p>

            <div className="mb-8">
              <p className="font-inter text-sm text-muted-foreground mb-3">
                How many Instagram contacts do you have?
              </p>
              <div className="text-center mb-4">
                <span className="font-poppins font-bold text-[40px] text-black">
                  {contactCount[0].toLocaleString()}
                </span>
              </div>
              <Slider
                value={contactCount}
                onValueChange={setContactCount}
                max={10000}
                min={100}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span className="font-inter text-xs text-muted-foreground">100</span>
                <span className="font-inter text-xs text-muted-foreground">10,000</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setBillingTab("free")}
                className={`py-3 px-4 rounded-lg font-inter font-semibold text-sm transition-all ${
                  billingTab === "free"
                    ? "bg-manychat-yellow text-black"
                    : "bg-manychat-light-gray text-muted-foreground hover:bg-gray-200"
                }`}
              >
                Start for Free
              </button>
              <button
                onClick={() => setBillingTab("pro")}
                className={`py-3 px-4 rounded-lg font-inter font-semibold text-sm transition-all ${
                  billingTab === "pro"
                    ? "bg-manychat-green text-white"
                    : "bg-manychat-light-gray text-muted-foreground hover:bg-gray-200"
                }`}
              >
                Get Pro
              </button>
              <button
                onClick={() => setBillingTab("elite")}
                className={`py-3 px-4 rounded-lg font-inter font-semibold text-sm transition-all ${
                  billingTab === "elite"
                    ? "bg-manychat-blue text-white"
                    : "bg-manychat-light-gray text-muted-foreground hover:bg-gray-200"
                }`}
              >
                Get Elite
              </button>
            </div>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="font-inter text-sm text-muted-foreground">Free Plan</p>
                  <p className="font-poppins font-bold text-3xl text-black">$0</p>
                </div>
                <div className="text-center">
                  <p className="font-inter text-sm text-muted-foreground">Pro Plan</p>
                  <p className="font-poppins font-bold text-3xl text-manychat-green">${getProPrice()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20">
          <h3 className="font-poppins font-bold text-[24px] md:text-[28px] text-black text-center mb-2">
            Compare Plans
          </h3>
          <p className="font-inter text-base text-muted-foreground text-center mb-10">
            see all Pricing details
          </p>
          
          <div className="max-w-[1000px] mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="font-poppins font-semibold text-sm text-black text-left py-4 px-4 md:px-6 bg-manychat-light-gray">
                    Features
                  </th>
                  <th className="font-poppins font-semibold text-sm text-center py-4 px-4 bg-[#E8F5E9]">
                    Start for Free
                  </th>
                  <th className="font-poppins font-semibold text-sm text-white text-center py-4 px-4 bg-manychat-green">
                    Get Pro
                  </th>
                  <th className="font-poppins font-semibold text-sm text-white text-center py-4 px-4 bg-manychat-blue">
                    Get Elite
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-border hover:bg-manychat-light-gray transition-colors"
                  >
                    <td className="font-inter text-sm text-black py-4 px-4 md:px-6">
                      {feature.name}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.starter === "boolean" ? (
                        feature.starter ? (
                          <Check className="w-5 h-5 text-manychat-green mx-auto" strokeWidth={2.5} />
                        ) : (
                          <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-inter text-sm text-muted-foreground">{feature.starter}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <Check className="w-5 h-5 text-manychat-green mx-auto" strokeWidth={2.5} />
                        ) : (
                          <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-inter text-sm text-black font-medium">{feature.pro}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <Check className="w-5 h-5 text-manychat-green mx-auto" strokeWidth={2.5} />
                        ) : (
                          <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-inter text-sm text-black font-medium">{feature.enterprise}</span>
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
