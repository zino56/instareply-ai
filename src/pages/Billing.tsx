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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pageContainer as container, pageItem as item } from "@/lib/motion";

/**
 * Billing / Upgrade page — uses the shared light dashboard design system.
 */

// Replace these with your actual PayPal credentials
const PAYPAL_CLIENT_ID = "YOUR_CLIENT_ID_HERE";
const PAYPAL_PRO_PLAN_ID = "P-PRO_PLAN_ID_HERE";
const PAYPAL_SCALE_PLAN_ID = "P-SCALE_PLAN_ID_HERE";

const PLAN_IDS = {
  pro: { monthly: PAYPAL_PRO_PLAN_ID, annual: PAYPAL_PRO_PLAN_ID },
  scale: { monthly: PAYPAL_SCALE_PLAN_ID, annual: PAYPAL_SCALE_PLAN_ID },
};

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
            style: {
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "subscribe",
              height: 44,
            },
            createSubscription: (_data: unknown, actions: any) =>
              actions.subscription.create({ plan_id: planId }),
            onApprove: (data: any) => {
              alert("Subscription created! ID: " + data.subscriptionID);
            },
            onError: () => {
              if (!cancelled) setStatus("error");
            },
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
      try {
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
      } catch {
        if (!cancelled) setStatus("error");
      }
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
    <div className="my-4">
      <div id={containerId} ref={ref} className="min-h-[44px]" />
      {status === "loading" && (
        <div className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-border/70 bg-muted/30 text-[13px] text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Loading payment options…
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-3 text-[13px] leading-relaxed text-muted-foreground">
          Payment options unavailable. Please refresh or contact support.
        </div>
      )}
    </div>
  );
}

const FeatureItem = ({ label }: { label: string }) => (
  <li className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-foreground">
    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-foreground/5">
      <Check className="h-3 w-3 text-foreground" strokeWidth={2.5} aria-hidden />
    </span>
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
    <Card
      className={cn(
        "relative flex h-full flex-col rounded-2xl border shadow-[var(--shadow-sm)] bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]",
        popular ? "border-primary/50 bg-primary/[0.03]" : "border-border/70",
      )}
    >
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[17px] font-semibold tracking-[-0.005em] text-foreground">{name}</h3>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="h-5 border-0 bg-[hsl(var(--success)/0.12)] text-[11px] font-medium text-[hsl(var(--success))]"
            >
              7-Day Free Trial
            </Badge>
            {popular && (
              <Badge className="h-5 border-0 bg-primary text-[11px] font-semibold text-primary-foreground">
                Most Popular
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[13px] text-muted-foreground line-through">${price}/month</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`${billing}-${price}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-1 text-[26px] font-semibold tracking-[-0.015em] leading-none text-foreground"
            >
              Free for 7 days
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 text-[12.5px] text-muted-foreground">
            {billing === "annual" ? `Then $${annual}/year billed yearly` : `Then $${monthly}/month`}
          </p>
        </div>

        <ul className="mt-6 flex-1 space-y-2.5 border-t border-border/70 pt-6">
          {features.map((f) => (
            <FeatureItem key={f} label={f} />
          ))}
        </ul>

        <div className="mt-6">
          <PayPalButton containerId={containerId} planId={planId} />
          <p className="mt-3 text-center text-[12px] text-muted-foreground">
            Start your free trial today • No credit card required
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Billing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [openFaq, setOpenFaq] = useState<number>(0);
  const pricingRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="container py-8 space-y-8"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-[26px] md:text-[28px] font-semibold tracking-[-0.015em] leading-tight">
          Upgrade your plan
        </h1>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Start your 7-day free trial. Cancel anytime.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 text-[12.5px] text-muted-foreground">
          <PayPalLogo />
          Secure payment via PayPal
        </div>
      </motion.div>

      {/* Current plan */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/70">
              <div className="p-6 md:p-7">
                <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  Current plan
                </p>
                <div className="mt-2 flex items-center gap-2.5">
                  <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-foreground">
                    7-Day Free Trial
                  </h2>
                  <Badge
                    variant="secondary"
                    className="h-5 border-0 bg-primary/15 text-[11px] font-medium text-foreground"
                  >
                    Trial Active
                  </Badge>
                </div>
                <p className="mt-2 text-[13.5px] text-muted-foreground">
                  7 days remaining in your trial
                </p>
                <Button
                  onClick={() => pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="mt-6 h-11 press-scale"
                >
                  Start Your Free Trial
                </Button>
              </div>

              <div className="p-6 md:p-7 bg-muted/30">
                <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  Trial includes
                </p>
                <ul className="mt-3 space-y-2.5">
                  {["All Pro features included during trial", "No credit card required", "Cancel anytime"].map(
                    (f) => (
                      <FeatureItem key={f} label={f} />
                    ),
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Plans */}
      <motion.div variants={item} className="space-y-4">
        <div
          ref={pricingRef}
          className="scroll-mt-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
        >
          <div>
            <h2 className="text-[16px] font-semibold tracking-[-0.005em] text-foreground">
              Choose a plan
            </h2>
            <p className="text-[13px] text-muted-foreground">Switch billing period to compare pricing.</p>
          </div>

          <div
            role="radiogroup"
            aria-label="Billing period"
            className="inline-flex items-center rounded-lg border border-border/70 bg-muted/40 p-0.5 text-[12.5px]"
          >
            {(["monthly", "annual"] as Billing[]).map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={billing === option}
                onClick={() => setBilling(option)}
                className={cn(
                  "min-h-[36px] rounded-md px-3 py-1.5 font-medium transition-colors duration-200 press-scale",
                  billing === option
                    ? "bg-card text-foreground shadow-[var(--shadow-sm)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option === "monthly" ? "Monthly" : "Annual (Save 17%)"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PlanCard
            name="Conveero Pro"
            monthly={49}
            annual={490}
            billing={billing}
            features={proFeatures}
            popular
            containerId="paypal-pro-plan-button"
            planId={PLAN_IDS.pro[billing]}
          />
          <PlanCard
            name="Conveero Scale"
            monthly={99}
            annual={990}
            billing={billing}
            features={scaleFeatures}
            containerId="paypal-scale-plan-button"
            planId={PLAN_IDS.scale[billing]}
          />
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-[16px] font-semibold tracking-[-0.005em] text-foreground">
          Frequently asked questions
        </h2>
        <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card overflow-hidden">
          <CardContent className="p-0">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className="border-b border-border/70 last:border-b-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-[14px] font-medium text-foreground transition-colors hover:bg-muted/40"
                  >
                    {f.q}
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} aria-hidden />
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
                        <p className="px-5 pb-5 text-[13.5px] leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Trust */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
          <CardContent className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Secure Payments", sub: "Powered by PayPal" },
              { icon: XCircle, title: "Cancel Anytime", sub: "No hidden fees" },
              { icon: LifeBuoy, title: "24/7 Support", sub: "We're here to help" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="text-[14px] font-medium text-foreground">{title}</p>
                  <p className="mt-0.5 text-[13px] text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Trial trust badges */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { icon: ShieldCheck, title: "No credit card required", sub: "Start your trial instantly" },
          { icon: Calendar, title: "Cancel anytime during trial", sub: "You're in control" },
        ].map(({ icon: Icon, title, sub }) => (
          <Card key={title} className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
            <CardContent className="flex items-start gap-3 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="text-[14px] font-medium text-foreground">{title}</p>
                <p className="mt-0.5 text-[13px] text-muted-foreground">{sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
