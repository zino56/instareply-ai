import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Video, MessageSquare, Info } from "lucide-react";
import { easeOutQuiet, Lift, Reveal } from "../motion";

type UseCase = {
  id: string;
  tab: string;
  headline: string;
  blurb: string;
  handle: string;
  incoming: string;
  reply: string;
  cardTitle: string;
  cardSub: string;
  cta: string;
};

const USE_CASES: UseCase[] = [
  {
    id: "ecommerce",
    tab: "E-Commerce",
    headline: "Turn product questions into checkouts",
    blurb: "Answer sizing, stock and shipping questions instantly — then drop the checkout link before the buyer cools off.",
    handle: "The Linen Store",
    incoming: "Is the linen set back in stock?",
    reply: "Yes! Restocked this morning 💛 Sizes S–XL available. Want the checkout link?",
    cardTitle: "New Linen Arrivals",
    cardSub: "In stock · Free shipping over $80",
    cta: "View collection",
  },
  {
    id: "agencies",
    tab: "Agencies",
    headline: "Qualify leads for every client account",
    blurb: "Run first-line replies across all managed accounts, capture budgets and hand warm leads to the team.",
    handle: "Northwind Agency",
    incoming: "Do you handle paid social for DTC brands?",
    reply: "We do 👋 What's your monthly ad budget? I'll route you to the right strategist.",
    cardTitle: "Discovery call",
    cardSub: "30 min · Strategy team",
    cta: "Book a slot",
  },
  {
    id: "creators",
    tab: "Creators",
    headline: "Never leave a fan on read",
    blurb: "Welcome new followers, run giveaways and send links from comments — automatically, in your voice.",
    handle: "@studio.mira",
    incoming: "Where's the preset pack you used?",
    reply: "Sent it over 🎉 Pack link: mira.link/presets — use MIRA10 for 10% off.",
    cardTitle: "Preset Pack Vol. 3",
    cardSub: "Instant download",
    cta: "Get the pack",
  },
  {
    id: "services",
    tab: "Service Businesses",
    headline: "Fill the calendar while you work",
    blurb: "Share availability, confirm bookings and send reminders without touching the inbox.",
    handle: "Clay Studio",
    incoming: "Any openings this weekend?",
    reply: "Saturday 2pm and Sunday 11am are open ✨ Which works? I'll confirm instantly.",
    cardTitle: "Pottery workshop",
    cardSub: "Sat 2:00pm · 4 seats left",
    cta: "Reserve seat",
  },
];

/** See it in action — animated use-case tab switcher. */
export default function AllInOneSection() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(USE_CASES[0].id);
  const active = USE_CASES.find((u) => u.id === activeId)!;

  return (
    <section
      className="block py-24 overflow-x-clip bg-[hsl(var(--mc-yellow))] max-lg:py-14"
      id="create"
    >
      <div className="max-w-300 mx-auto px-8">
        <Reveal className="mx-auto mb-10 max-w-[46rem] text-center">
          <h2 className="[font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[2.5rem] leading-[1.05] font-extrabold tracking-[-1.4px] text-black max-lg:text-[2rem]">
            See it in action
          </h2>
          <p className="mt-4 text-black/70">
            Pick your world — Conveero adapts the conversation to it.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.05} className="mb-10 flex justify-center">
          <div className="flex flex-wrap justify-center gap-1 rounded-full border border-black/10 bg-white/70 p-1.5 backdrop-blur-sm">
            {USE_CASES.map((u) => (
              <motion.button
                key={u.id}
                type="button"
                onClick={() => setActiveId(u.id)}
                whileTap={{ scale: 0.95 }}
                aria-pressed={activeId === u.id}
                className="relative rounded-full px-4 py-2 text-sm font-semibold text-black/70 transition-colors duration-200 hover:text-black"
              >
                {activeId === u.id && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-black"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                )}
                <span className={`relative z-10 ${activeId === u.id ? "text-white" : ""}`}>
                  {u.tab}
                </span>
              </motion.button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left card */}
          <div className="bg-background rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                transition={{ duration: reduce ? 0.001 : 0.25, ease: easeOutQuiet }}
              >
                <span className="inline-flex rounded-full bg-[hsl(var(--mc-yellow))] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-black">
                  {active.tab}
                </span>
                <h3 className="mt-4 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[2rem] leading-[2.25rem] font-extrabold tracking-[-1px] text-foreground">
                  {active.headline}
                </h3>
                <p className="mt-4 text-foreground/70 leading-relaxed">{active.blurb}</p>
              </motion.div>
            </AnimatePresence>

            <Lift className="mt-8">
              <a
                href="/signup"
                className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-foreground px-6 font-semibold uppercase tracking-[0.12em] text-background transition-colors duration-300 hover:bg-[hsl(var(--mc-magenta))] hover:text-white active:scale-[0.98]"
              >
                <span className="relative z-10">Get started</span>
                <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100 motion-reduce:hidden" />
              </a>
            </Lift>
          </div>

          {/* Right: phone mockup */}
          <div className="flex flex-col items-center gap-8">
            <div className="w-[19rem] rounded-[2.25rem] bg-black p-3 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="rounded-[1.75rem] bg-black overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                  <div className="h-8 w-8 rounded-full bg-[hsl(var(--mc-magenta))]" />
                  <span className="truncate font-semibold text-white">{active.handle}</span>
                  <div className="ml-auto flex items-center gap-3 text-white/70">
                    <Video className="h-4 w-4" />
                    <MessageSquare className="h-4 w-4" />
                    <Info className="h-4 w-4" />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                    transition={{ duration: reduce ? 0.001 : 0.25, ease: easeOutQuiet }}
                    className="px-4 py-4 space-y-3"
                  >
                    <div className="flex justify-end">
                      <span className="max-w-[85%] rounded-2xl bg-[hsl(var(--mc-magenta))] px-4 py-2 text-sm font-medium text-white">
                        {active.incoming}
                      </span>
                    </div>
                    <div className="flex justify-start">
                      <p className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3 text-sm leading-snug text-white">
                        {active.reply}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3">
                      <div className="h-32 rounded-xl bg-gradient-to-br from-white/25 to-white/5" />
                      <p className="mt-3 text-sm font-semibold text-white">{active.cardTitle}</p>
                      <p className="text-xs text-white/60">{active.cardSub}</p>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="mt-3 w-full rounded-lg bg-white/15 py-2 text-sm text-white transition-colors hover:bg-white/25"
                      >
                        {active.cta}
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className="max-w-[18rem] border-l-2 border-foreground pl-4 font-semibold leading-snug text-foreground">
              Automate customer support — let Conveero handle the responses to
              common questions and provide immediate help to your audience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
