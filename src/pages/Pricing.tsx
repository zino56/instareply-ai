import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, X, Zap, Shield, Headphones, ArrowRight } from "lucide-react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import Footer from "@/components/landing/Footer";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [contacts, setContacts] = useState([5000]);

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
        "Comment automation",
        "DM templates",
      ],
      buttonText: "Start free trial",
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
        "Custom keywords",
        "Lead capture forms",
      ],
      buttonText: "Start free trial",
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
        "API access",
        "Custom AI training",
      ],
      buttonText: "Request demo",
      buttonStyle: "outline",
      highlighted: false,
    },
  ];

  const featureComparison = [
    { feature: "Instagram DM Automation", starter: true, pro: true, enterprise: true },
    { feature: "Comment Automation", starter: true, pro: true, enterprise: true },
    { feature: "AI-Powered Responses", starter: true, pro: true, enterprise: true },
    { feature: "DM Templates", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
    { feature: "Custom Keywords", starter: "10", pro: "Unlimited", enterprise: "Unlimited" },
    { feature: "Instagram Pages", starter: "1", pro: "Unlimited", enterprise: "Unlimited" },
    { feature: "Conversations/Day", starter: "50", pro: "500", enterprise: "Unlimited" },
    { feature: "Analytics Dashboard", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
    { feature: "A/B Testing", starter: false, pro: true, enterprise: true },
    { feature: "Zapier Integration", starter: false, pro: true, enterprise: true },
    { feature: "API Access", starter: false, pro: false, enterprise: true },
    { feature: "Custom AI Training", starter: false, pro: false, enterprise: true },
    { feature: "White-Label Option", starter: false, pro: false, enterprise: true },
    { feature: "Dedicated Account Manager", starter: false, pro: false, enterprise: true },
    { feature: "Support", starter: "Email", pro: "Priority (2hr)", enterprise: "24/7 Priority" },
    { feature: "SLA Guarantee", starter: false, pro: "99%", enterprise: "99.9%" },
  ];

  const faqs = [
    {
      question: "What does InstaAI include?",
      answer: "InstaAI includes AI-powered Instagram DM automation, comment automation, lead capture, analytics, and integrations. All plans include our core automation features with varying limits on conversations, pages, and advanced features."
    },
    {
      question: "Who is InstaAI for?",
      answer: "InstaAI is designed for e-commerce stores, content creators, coaches, and businesses of all sizes who want to automate their Instagram engagement and convert followers into customers."
    },
    {
      question: "How does the free trial work?",
      answer: "Start with a 14-day free trial on any plan. No credit card required. You'll have full access to all features in your selected plan. Cancel anytime before the trial ends."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes! You can upgrade or downgrade at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the change takes effect at your next billing cycle."
    },
    {
      question: "Are there additional charges for messages?",
      answer: "No hidden fees. Your plan includes a set number of daily conversations. If you consistently need more, we recommend upgrading to a higher tier for better value."
    },
    {
      question: "How does Email and SMS pricing work?",
      answer: "Email and SMS features are available on Pro and Enterprise plans. Email is included in your plan. SMS is charged at $0.01 per message sent, billed monthly based on usage."
    },
    {
      question: "Can I cancel at any time?",
      answer: "Absolutely. There are no long-term contracts. Cancel your subscription anytime from your account settings. You'll retain access until the end of your billing period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 30-day money-back guarantee on all plans. If you're not satisfied within the first 30 days, contact support for a full refund, no questions asked."
    },
  ];

  const calculatePrice = (contactCount: number) => {
    if (contactCount <= 1000) return { starter: 0, pro: 15 };
    if (contactCount <= 5000) return { starter: 15, pro: 49 };
    if (contactCount <= 10000) return { starter: 29, pro: 99 };
    return { starter: 49, pro: 149 };
  };

  const calculatedPrice = calculatePrice(contacts[0]);

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="pt-[120px] pb-[60px] md:pb-[80px] px-5 md:px-[60px] bg-mc-light-gray">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-poppins font-bold text-[36px] md:text-[56px] text-mc-black leading-tight mb-6"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-inter text-lg md:text-xl text-mc-gray max-w-[600px] mx-auto mb-10"
          >
            Choose an InstaAI plan that's right for you. Start free, upgrade when you're ready.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm"
          >
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
              Annual <span className="text-mc-magenta font-bold">- Save 20%</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-[60px] md:py-[80px] px-5 md:px-[60px] bg-mc-light-gray">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-xl p-8 transition-all duration-300 ${
                  tier.highlighted
                    ? "border-[3px] border-mc-magenta shadow-magenta md:-translate-y-3"
                    : "border border-[#E0E0E0] shadow-card hover:shadow-card-hover hover:-translate-y-1"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-mc-magenta text-white font-poppins font-bold text-xs px-4 py-1.5 rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <h3 className="font-poppins font-bold text-2xl md:text-[28px] text-mc-black mb-4">
                  {tier.name}
                </h3>

                <div className="mb-2">
                  {tier.monthlyPrice !== null ? (
                    <span className="font-poppins font-bold text-5xl md:text-[56px] text-mc-black">
                      ${isAnnual ? Math.round(tier.annualPrice! / 12) : tier.monthlyPrice}
                    </span>
                  ) : (
                    <span className="font-poppins font-bold text-3xl md:text-[36px] text-mc-black">
                      Custom
                    </span>
                  )}
                  {tier.monthlyPrice !== null && (
                    <span className="font-inter text-sm text-[#999999] ml-1">/month</span>
                  )}
                </div>

                <p className="font-inter text-sm text-[#999999] mb-6">{tier.period}</p>

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

                <Button
                  asChild
                  className={`w-full font-poppins font-bold text-sm py-4 h-auto rounded-lg transition-all duration-200 ${
                    tier.buttonStyle === "magenta"
                      ? "bg-mc-magenta hover:bg-[#E600E6] text-white hover:shadow-magenta"
                      : tier.buttonStyle === "outline"
                      ? "bg-transparent border-2 border-mc-black text-mc-black hover:bg-mc-black hover:text-white"
                      : "bg-mc-yellow hover:bg-mc-hover-yellow text-mc-black hover:shadow-yellow"
                  }`}
                >
                  <Link to={tier.buttonStyle === "outline" ? "#contact" : "/signup"}>
                    {tier.buttonText}
                  </Link>
                </Button>

                <p className="font-inter text-xs text-[#999999] text-center mt-4">
                  {tier.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-[#E0E0E0]">
            <div className="flex items-center gap-2 text-mc-gray">
              <Shield className="w-5 h-5" />
              <span className="font-inter text-sm">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-mc-gray">
              <Zap className="w-5 h-5" />
              <span className="font-inter text-sm">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2 text-mc-gray">
              <Headphones className="w-5 h-5" />
              <span className="font-inter text-sm">24/7 customer support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="py-[60px] md:py-[80px] px-5 md:px-[60px] bg-white">
        <div className="max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-mc-light-gray rounded-2xl p-8 md:p-10 shadow-card"
          >
            <h2 className="font-poppins font-bold text-[28px] md:text-[32px] text-mc-black text-center mb-2">
              Calculate Your Monthly Cost
            </h2>
            <p className="font-inter text-mc-gray text-center mb-8">
              Use our calculator to estimate the cost based on your Instagram contacts
            </p>

            <div className="mb-8">
              <label className="font-inter text-sm text-mc-gray block mb-4">
                How many Instagram contacts do you have?
              </label>
              <Slider
                value={contacts}
                onValueChange={setContacts}
                max={10000}
                min={100}
                step={100}
                className="mb-4"
              />
              <div className="text-center">
                <span className="font-poppins font-bold text-4xl text-mc-black">
                  {contacts[0].toLocaleString()}
                </span>
                <span className="font-inter text-mc-gray ml-2">contacts</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border border-[#E0E0E0]">
                <p className="font-inter text-sm text-mc-gray mb-1">Starter Plan</p>
                <p className="font-poppins font-bold text-3xl text-mc-black">
                  ${calculatedPrice.starter}
                  <span className="text-sm font-normal text-mc-gray">/mo</span>
                </p>
                <Button asChild variant="outline" className="w-full mt-4 border-mc-black">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-mc-magenta">
                <p className="font-inter text-sm text-mc-magenta font-semibold mb-1">Pro Plan</p>
                <p className="font-poppins font-bold text-3xl text-mc-black">
                  ${calculatedPrice.pro}
                  <span className="text-sm font-normal text-mc-gray">/mo</span>
                </p>
                <Button asChild className="w-full mt-4 bg-mc-magenta hover:bg-[#E600E6] text-white">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>

            <p className="font-inter text-xs text-mc-gray text-center mt-6">
              Prices shown are estimated base rates. Final price depends on usage and features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-[60px] md:py-[80px] px-5 md:px-[60px] bg-mc-light-gray">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-poppins font-bold text-[32px] md:text-[40px] text-mc-black mb-4">
              Compare Plans
            </h2>
            <p className="font-inter text-mc-gray text-lg">
              See all features side by side
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-card">
              <thead>
                <tr className="bg-mc-black text-white">
                  <th className="font-poppins font-bold text-left p-4 md:p-6 w-[40%]">Features</th>
                  <th className="font-poppins font-bold text-center p-4 md:p-6 w-[20%]">Starter</th>
                  <th className="font-poppins font-bold text-center p-4 md:p-6 w-[20%] bg-mc-magenta">Pro</th>
                  <th className="font-poppins font-bold text-center p-4 md:p-6 w-[20%]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-[#E0E0E0] ${
                      index % 2 === 0 ? "bg-white" : "bg-mc-light-gray"
                    }`}
                  >
                    <td className="font-inter text-mc-black p-4 md:p-5">{row.feature}</td>
                    <td className="text-center p-4 md:p-5">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-inter text-mc-black">{row.starter}</span>
                      )}
                    </td>
                    <td className="text-center p-4 md:p-5 bg-mc-magenta/5">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check className="w-5 h-5 text-mc-magenta mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-inter font-semibold text-mc-magenta">{row.pro}</span>
                      )}
                    </td>
                    <td className="text-center p-4 md:p-5">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-inter text-mc-black">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Button asChild className="bg-mc-yellow hover:bg-mc-hover-yellow text-mc-black font-poppins font-bold px-8">
              <Link to="/signup">
                Start Your Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-[60px] md:py-[80px] px-5 md:px-[60px] bg-white">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-poppins font-bold text-[32px] md:text-[40px] text-mc-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-inter text-mc-gray text-lg">
              Everything you need to know about InstaAI pricing
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-mc-light-gray rounded-xl border-none px-6"
              >
                <AccordionTrigger className="font-poppins font-semibold text-mc-black text-left hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-inter text-mc-gray pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[60px] md:py-[80px] px-5 md:px-[60px] bg-mc-black">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-bold text-[32px] md:text-[48px] text-white leading-tight mb-6"
          >
            Ready to automate your Instagram?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-inter text-lg text-white/80 mb-8"
          >
            Start your 14-day free trial today. No credit card required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild className="bg-mc-yellow hover:bg-mc-hover-yellow text-mc-black font-poppins font-bold px-10 py-6 h-auto text-lg">
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-poppins font-bold px-10 py-6 h-auto text-lg">
              <Link to="#contact">Contact Sales</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
