import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ShieldCheck,
  XCircle,
  LifeBuoy,
  Loader2,
  Calendar,
} from "lucide-react";

/**
 * Billing / Upgrade page.
 * Scoped Linear-style dark theme (does not affect the rest of the dashboard).
 */

// TODO: replace with real credentials
const PAYPAL_CLIENT_ID = "YOUR_CLIENT_ID";
const PLAN_IDS = {
  pro: { monthly: "P-XXXXXXXXXXXXXXXX", annual: "P-XXXXXXXXXXXXXXXX" },
  scale: { monthly: "P-YYYYYYYYYYYYYYYY", annual: "P-YYYYYYYYYYYYYYYY" },
};

const INK = "#f7f8f8";
const MUTED = "#d0d6e0";
const SUBTLE = "#8a8f98";
const ACCENT = "#5e6ad2";
const HAIRLINE = "#23252a";

type Billing = "monthly" | "annual";

const proFeatures = [
  "7-day free trial",
  "3 Instagram accounts",
  "Unlimited AI replies",
  "Comment automation (coming soon)",
  "Keyword triggers",
  "Approval queue",
  "Analytics dashboard",
  "Priority email support",
];

const scaleFeatures = [
  "7-day free trial",
  "Everything in Pro",
  "10 Instagram accounts",
  "Custom AI prompts",
  "Team seats (up to 5)",
  "API access (coming soon)",
  "Custom integrations",
  "Dedicated Slack support",
  "99.9% uptime SLA",
  "Priority onboarding",
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time from your PayPal account or dashboard.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and Apple Pay via secure PayPal checkout.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! All plans include a 7-day free trial. You won't be charged until the trial ends.",
  },
  {
    q: "What happens after my trial?",
    a: "Your account will switch to read-only mode. You can upgrade to Pro or Scale at any time to continue using all features. Your data is preserved for 30 days.",
  },
  {
    q: "Do I need a credit card to start the trial?",
    a: "No! You can start your 7-day free trial without entering payment information. You'll only be charged if you choose to upgrade after the trial.",
  },
  {
    q: "What happens after my trial ends?",
    a: "Your account will switch to read-only mode. You can upgrade to Pro or Scale at any time to continue using all features. Your data is preserved for 30 days.",
  },
];

const PayPalLogo = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="currentColor">
    <path d="M7.4 21.5H4.2a.5.5 0 0 1-.5-.6L6.4 3.1a.7.7 0 0 1 .7-.6h6.1c3.3 0 5.4 1.7 4.9 5-.5 3.4-3 5.1-6.3 5.1H9.4l-1.3 8a.7.7 0 0 1-.7.9Zm3.2-11.1h1.2c1.6 0 2.9-.7 3.1-2.4.2-1.4-.6-2.1-2.1-2.1h-1.4l-.8 4.5Z" />
    <path opacity=".6" d="M18.9 8.3c.3 2.9-1.8 5.4-5.4 5.4h-1.7l-1.2 7.3a.6.6 0 0 1-.6.5H7.6l.3-1.9a.7.7 0 0 1 .7-.6h1.9c3.3 0 5.8-1.7 6.3-5.1.2-1.6-.2-2.8-1-3.6.4-.5.8-1.2 1.1-2Z" />
  </svg>
);

/** Loads the PayPal SDK once and renders subscription buttons. */
function PayPalButton({
  containerId,
  planId,
}: {
  containerId: string;
  planId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    const render = () => {
      const paypal = (window as any).paypal;
      if (!paypal?.Buttons || !ref.current || cancelled) return false;
      ref.current.innerHTML = "";
      try {
        paypal
          .Buttons({
            style: { shape: "rect", color: "blue", layout: "vertical", label: "subscribe", height: 46 },
            createSubscription: (_data: unknown, actions: any) =>
              actions.subscription.create({ plan_id: planId }),
          })
          .render(ref.current);
        setStatus("ready");
        return true;
      } catch {
        setStatus("error");
        return true;
      }
    };

    const load = () => {
      if (render()) return;
      const existing = document.querySelector<HTMLScriptElement>("script[data-paypal-sdk]");
      if (existing) {
        existing.addEventListener("load", () => render());
        existing.addEventListener("error", () => !cancelled && setStatus("error"));
        return;
      }
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
      script.async = true;
      script.dataset.paypalSdk = "true";
      script.onload = () => render();
      script.onerror = () => !cancelled && setStatus("error");
      document.head.appendChild(script);
    };

    load();
    const timeout = window.setTimeout(() => {
      if (!cancelled) setStatus((s) => (s === "ready" ? s : "error"));
    }, 8000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [planId]);

  return (
    <div>
      <div id={containerId} ref={ref} className="min-h-[46px]" />
      {status === "loading" && (
        <div
          className="flex min-h-[46px] items-center justify-center gap-2 rounded-lg text-[13px]"
          style={{ border: `1px solid ${HAIRLINE}`, color: SUBTLE }}
        >
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Loading payment options…
        </div>
      )}
      {status === "error" && (
        <div
          className="rounded-lg px-3 py-3 text-[13px] leading-relaxed"
          style={{ border: `1px solid ${HAIRLINE}`, background: "#141516", color: MUTED }}
        >
          Payment options loading… Please refresh the page or contact support.
        </div>
      )}
    </div>
  );
}

const FeatureItem = ({ label }: { label: string }) => (
  <li className="flex items-start gap-2.5 text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} aria-hidden />
    <span>{label}</span>
  </li>
);

const PlanCard = ({
  name,
  monthly,
  annual,
  billing,
  features,
  popular,
  containerId,
  planId,
}: {
  name: string;
  monthly: number;
  annual: number;
  billing: Billing;
  features: string[];
  popular?: boolean;
  containerId: string;
  planId: string;
}) => {
  const price = billing === "annual" ? Math.round(annual / 12) : monthly;

  return (
    <div
      className="relative flex h-full flex-col rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: popular ? "#141516" : "#0f1011",
        border: `1px solid ${popular ? ACCENT : HAIRLINE}`,
        boxShadow: popular ? `0 0 0 1px rgba(94,106,210,0.15), 0 18px 60px -24px rgba(94,106,210,0.55)` : "none",
      }}
    >
      {popular && (
        <span
          className="absolute right-5 top-[-11px] rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ background: ACCENT, color: "#fff" }}
        >
          Most Popular
        </span>
      )}
      <span
        className="absolute left-5 top-[-11px] rounded-full px-2.5 py-1 text-[11px] font-semibold"
        style={{ background: "rgba(16,185,129,0.12)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}
      >
        7-Day Free Trial
      </span>

      <h3 className="text-[15px] font-semibold" style={{ color: INK }}>
        {name}
      </h3>

      <div className="mt-4 flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-lg" style={{ color: SUBTLE, textDecoration: "line-through" }}>
            ${price}/month
          </span>
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-4xl font-bold tracking-[-0.02em]" style={{ color: INK }}>
            Free for 7 days
          </span>
        </div>
      </div>
      <p className="mt-1.5 text-[12.5px]" style={{ color: SUBTLE }}>
        {billing === "annual"
          ? `Then $${annual}/year billed yearly`
          : `Then $${monthly}/month`}
      </p>

      <ul className="mt-6 space-y-2.5 border-t pt-6" style={{ borderColor: HAIRLINE }}>
        {features.map((f) => (
          <FeatureItem key={f} label={f} />
        ))}
      </ul>

      <div className="mt-6">
        <PayPalButton containerId={containerId} planId={planId} />
        <p className="mt-3 text-center text-[12px]" style={{ color: "#34d399" }}>
          Start your free trial today • No credit card required
        </p>
      </div>
    </div>
  );
};

export default function Billing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [openFaq, setOpenFaq] = useState<number>(0);
  const pricingRef = useRef<HTMLDivElement>(null);

  return (
    <div className="-m-4 min-h-screen px-4 py-8 sm:-m-6 sm:px-6 lg:px-8" style={{ background: "#010102" }}>
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <header>
          <h1 className="font-poppins text-[28px] font-bold tracking-[-0.02em]" style={{ color: INK }}>
            Upgrade your plan
          </h1>
          <p className="mt-2 text-[14.5px]" style={{ color: MUTED }}>
            Start your 7-day free trial. Cancel anytime.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-[12.5px]" style={{ color: SUBTLE }}>
            <PayPalLogo />
            Secure payment via PayPal
          </div>
        </header>

        {/* Current plan */}
        <section
          className="mt-8 rounded-2xl p-6"
          style={{ background: "#0f1011", border: `1px solid ${HAIRLINE}` }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[15px] font-semibold" style={{ color: INK }}>
                Current Plan: 7-Day Free Trial
              </p>
              <p className="mt-1 text-[13px]" style={{ color: MUTED }}>
                7 days remaining in your trial
              </p>
              <ul className="mt-4 space-y-2.5">
                {["All Pro features included during trial", "No credit card required", "Cancel anytime"].map((f) => (
                  <FeatureItem key={f} label={f} />
                ))}
              </ul>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{ background: "rgba(94,106,210,0.12)", color: ACCENT, border: "1px solid rgba(94,106,210,0.3)" }}
            >
              Trial Active
            </span>
          </div>
          <button
            type="button"
            onClick={() => pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="mt-6 inline-flex h-11 min-h-[44px] items-center justify-center rounded-lg px-5 text-[13.5px] font-semibold transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: ACCENT, color: "#fff" }}
          >
            Start Your Free Trial
          </button>
        </section>

        {/* Billing toggle */}
        <div ref={pricingRef} className="mt-12 flex justify-center scroll-mt-24">
          <div
            role="radiogroup"
            aria-label="Billing period"
            className="inline-flex items-center rounded-lg p-1"
            style={{ background: "#0f1011", border: `1px solid ${HAIRLINE}` }}
          >
            {(["monthly", "annual"] as Billing[]).map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={billing === option}
                onClick={() => setBilling(option)}
                className="min-h-[40px] rounded-lg px-4 text-[13px] font-medium transition-colors duration-200"
                style={
                  billing === option
                    ? { background: ACCENT, color: "#fff" }
                    : { color: SUBTLE, background: "transparent" }
                }
              >
                {option === "monthly" ? "Monthly" : "Annual (Save 17%)"}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <PlanCard
            name="Conveero Pro"
            monthly={49}
            annual={490}
            billing={billing}
            features={proFeatures}
            popular
            containerId="paypal-pro-plan"
            planId={PLAN_IDS.pro[billing]}
          />
          <PlanCard
            name="Conveero Scale"
            monthly={99}
            annual={990}
            billing={billing}
            features={scaleFeatures}
            containerId="paypal-scale-plan"
            planId={PLAN_IDS.scale[billing]}
          />
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-poppins text-xl font-semibold" style={{ color: INK }}>
            Frequently asked questions
          </h2>
          <div className="mt-5 rounded-2xl" style={{ background: "#0f1011", border: `1px solid ${HAIRLINE}` }}>
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className="border-b last:border-b-0" style={{ borderColor: HAIRLINE }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 px-6 py-4 text-left text-[14px] font-medium"
                    style={{ color: INK }}
                  >
                    {f.q}
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronDown className="h-4 w-4" style={{ color: SUBTLE }} aria-hidden />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.26 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust */}
        <section
          className="mt-12 grid grid-cols-1 gap-6 rounded-2xl p-6 sm:grid-cols-3"
          style={{ background: "#0f1011", border: `1px solid ${HAIRLINE}` }}
        >
          {[
            { icon: ShieldCheck, title: "Secure Payments", sub: "Powered by PayPal" },
            { icon: XCircle, title: "Cancel Anytime", sub: "No hidden fees" },
            { icon: LifeBuoy, title: "24/7 Support", sub: "We're here to help" },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "#141516", border: `1px solid ${HAIRLINE}` }}
              >
                <Icon className="h-4.5 w-4.5" style={{ color: ACCENT }} aria-hidden />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold" style={{ color: INK }}>
                  {title}
                </p>
                <p className="mt-0.5 text-[12.5px]" style={{ color: SUBTLE }}>
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
