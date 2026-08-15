import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import { easeOutQuiet, Reveal } from "../motion";
import CountUp from "../components/count-up";

type Prompt = {
  id: string;
  pill: string;
  user: string;
  reply: string;
};

const PROMPTS: Prompt[] = [
  {
    id: "tracking",
    pill: "Order tracking inquiry",
    user: "Hey, where is my order? I ordered 3 days ago 😅",
    reply:
      "Got you! 📦 Order #4821 shipped yesterday and is out for delivery today before 6pm.\n\nTracking: track.link/4821 — want me to text you when it lands?",
  },
  {
    id: "pricing",
    pill: "Product pricing question",
    user: "How much is the linen set? Any bundle deal?",
    reply:
      "The Linen Set is $89. 💛 Bundle 2 and it drops to $74 each (save $30).\n\nWant the checkout link for the bundle?",
  },
  {
    id: "booking",
    pill: "Booking / Consultation",
    user: "Can I book a consultation this week?",
    reply:
      "Absolutely! ✨ I have Thu 2:00pm and Fri 10:30am open.\n\nReply with a time and I'll lock it in + send the calendar invite.",
  },
];

/** Interactive "Try the DM AI" sandbox. */
export default function DmSandboxSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Prompt | null>(null);
  const [phase, setPhase] = useState<"idle" | "typing" | "streaming" | "done">("idle");
  const [streamed, setStreamed] = useState("");
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const run = useCallback(
    (p: Prompt) => {
      clearTimers();
      setActive(p);
      setStreamed("");

      if (reduce) {
        setStreamed(p.reply);
        setPhase("done");
        return;
      }

      setPhase("typing");
      timers.current.push(
        window.setTimeout(() => {
          setPhase("streaming");
          const chars = [...p.reply];
          let i = 0;
          const step = () => {
            i += Math.max(1, Math.round(chars.length / 90));
            setStreamed(p.reply.slice(0, i));
            if (i < chars.length) {
              timers.current.push(window.setTimeout(step, 18 + Math.random() * 28));
            } else {
              setPhase("done");
            }
          };
          step();
        }, 600),
      );
    },
    [clearTimers, reduce],
  );

  const reset = useCallback(() => {
    clearTimers();
    setActive(null);
    setStreamed("");
    setPhase("idle");
  }, [clearTimers]);

  return (
    <section id="try-it" className="relative overflow-hidden bg-black py-20 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(255,241,0,0.12), transparent 65%)" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 md:px-10">
        <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/80">
            <Sparkles className="h-3.5 w-3.5 text-[#FFF100]" />
            Live sandbox
          </span>
          <h2 className="mt-5 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[34px] md:text-[46px] font-extrabold leading-[1.05] tracking-[-1.4px] text-white text-balance">
            {"Try the "}
            <mark className="inline rounded-sm bg-[#FFF100] px-2 text-black">DM AI</mark>
          </h2>
          <p className="mt-4 text-white/70">
            Pick a question a real customer would send. Watch Conveero draft the reply.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto max-w-[720px]">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm md:p-6">
            {/* Prompt pills */}
            <div className="flex flex-wrap gap-2">
              {PROMPTS.map((p) => (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() => run(p)}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18, ease: easeOutQuiet }}
                  aria-pressed={active?.id === p.id}
                  className={`relative rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-300 md:text-sm ${
                    active?.id === p.id
                      ? "border-[#FFF100] bg-[#FFF100] text-black"
                      : "border-white/15 bg-white/5 text-white/80 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {p.pill}
                </motion.button>
              ))}
              <motion.button
                type="button"
                onClick={reset}
                whileTap={{ scale: 0.95 }}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-white/60 transition-colors duration-300 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </motion.button>
            </div>

            {/* Chat window */}
            <div className="mt-5 rounded-2xl bg-[#0d0d0d] ring-1 ring-white/10">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#FF00FF]" />
                  <span className="text-sm font-semibold text-white">Instagram DMs</span>
                </div>
                <AnimatePresence>
                  {phase === "done" && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: easeOutQuiet }}
                      className="relative inline-flex items-center gap-1.5 rounded-full bg-[#FFF100]/15 px-2.5 py-1 text-[11px] font-semibold text-[#FFF100]"
                    >
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-[#FFF100]"
                        animate={reduce ? undefined : { opacity: [1, 0.25, 1], scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                      AI Drafted — Ready to Send
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="min-h-[260px] space-y-4 p-4">
                <AnimatePresence mode="popLayout">
                  {!active && (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: easeOutQuiet }}
                      className="pt-16 text-center text-sm text-white/40"
                    >
                      Choose a prompt above to start the conversation.
                    </motion.p>
                  )}

                  {active && (
                    <motion.div
                      key={`${active.id}-user`}
                      initial={{ opacity: 0, y: reduce ? 0 : 8, scale: reduce ? 1 : 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: easeOutQuiet }}
                      className="flex gap-3"
                    >
                      <span className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                      <p className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5 text-sm text-white">
                        {active.user}
                      </p>
                    </motion.div>
                  )}

                  {active && phase === "typing" && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-end"
                    >
                      <span className="flex items-center gap-1.5 rounded-2xl rounded-br-md bg-[#FFF100] px-4 py-3">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-black/60"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                          />
                        ))}
                      </span>
                    </motion.div>
                  )}

                  {active && (phase === "streaming" || phase === "done") && (
                    <motion.div
                      key={`${active.id}-reply`}
                      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: easeOutQuiet }}
                      className="flex justify-end"
                    >
                      <p className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-br-md bg-[#FFF100] px-4 py-2.5 text-sm leading-relaxed text-black">
                        {streamed}
                        {phase === "streaming" && (
                          <motion.span
                            className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-black/70"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        )}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Avg. response", node: <><CountUp to={30} prefix="<" suffix="s" /></> },
                { label: "Coverage", node: <><CountUp to={24} />/<CountUp to={7} /></> },
                { label: "More conversions", node: <CountUp to={4} suffix="x" /> },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center">
                  <p className="[font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-xl font-extrabold text-[#FFF100] md:text-2xl">
                    {m.node}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-white/50">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
