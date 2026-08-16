import { motion, useReducedMotion } from "framer-motion";
import { easeOutQuiet, Lift } from "../motion";

/** Hero section — the page's lead block. */
export default function HeroSection() {
  const reduce = useReducedMotion();


  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.04 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.001 : 0.35, ease: easeOutQuiet } },
  };

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden bg-black"
      data-cid="n31"
    >
      {/* Ambient drifting glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 h-[540px] w-[540px] rounded-full blur-[120px] will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(255,241,0,0.16), transparent 65%)" }}
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 30, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-0 h-[520px] w-[520px] rounded-full blur-[130px] will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(255,0,255,0.16), transparent 65%)" }}
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -25, 0], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-[60px] pt-[100px] pb-[80px] md:pt-[120px] md:pb-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left column */}
          <motion.div
            className="text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="mb-6 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/80 backdrop-blur-sm">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[#FFF100]"
                  animate={reduce ? undefined : { opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                AI replies for Instagram DMs
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              data-component="heading"
              className="[font-family:'Bricolage_Grotesque',_Poppins,_Inter,_system-ui,_sans-serif] font-extrabold text-[44px] md:text-[72px] text-white leading-[1.05] tracking-[-2.3px] max-md:tracking-[-1.32px] text-balance mb-6"
            >
              {"Make the most out of every "}
              <mark className="inline px-3.5 max-md:px-2 rounded-sm bg-[#FFF100] text-black">
                conversation
              </mark>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-[500px] mx-auto lg:mx-0"
            >
              Sell more, engage better, and grow your audience. AI-powered automation that turns
              messages into revenue.
            </motion.p>


            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Lift>
                <a
                  href="/signup"
                  data-component="button"
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden bg-[#FF00FF] hover:bg-[#E600E6] text-white font-bold text-sm tracking-wide px-10 py-4 rounded-lg transition-shadow duration-300 hover:shadow-[0_10px_30px_-10px_rgba(255,0,255,0.7)] active:scale-[0.97]"
                >
                  <span className="relative z-10">GET STARTED FREE</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 opacity-0 transition-all duration-700 ease-out group-hover:left-[115%] group-hover:opacity-100 motion-reduce:hidden"
                  />
                </a>
              </Lift>
              <Lift>
                <a
                  href="#product"
                  data-component="button"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border-2 border-white active:scale-[0.97] text-white font-bold text-sm tracking-wide px-10 py-4 rounded-lg transition-colors duration-300 hover:bg-white/10 hover:border-[#FFF100] hover:text-[#FFF100]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  WATCH DEMO
                </a>
              </Lift>
            </motion.div>

            <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2">
                {[
                  "from-pink-500 to-rose-500",
                  "from-blue-500 to-cyan-500",
                  "from-purple-500 to-violet-500",
                  "from-amber-500 to-orange-500",
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-black`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/70">500+ brands trust Conveero</span>
            </motion.div>
          </motion.div>

          {/* Right column — DM mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduce ? 0.001 : 0.45, delay: reduce ? 0 : 0.25, ease: easeOutQuiet }}
          >
            <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto">
              <div className="bg-[#111111] rounded-[24px] p-4 shadow-2xl">
                <div className="bg-white rounded-[16px] overflow-hidden">
                  <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#FF00FF]" />
                      <span className="font-semibold text-sm text-black">Instagram DMs</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                        animate={reduce ? undefined : { opacity: [1, 0.3, 1], scale: [1, 1.35, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                      AI Active
                    </span>
                  </div>

                  <div className="p-4 space-y-4 min-h-[300px]">
                    <ChatIn delay={0.7} reduce={!!reduce}>Hey! How much is this product? 🤔</ChatIn>
                    <ChatOut delay={1.1} reduce={!!reduce}>
                      Hi! 👋 Great choice! This item is $49.99. Would you like me to send you the
                      checkout link?
                    </ChatOut>
                    <ChatIn delay={1.6} reduce={!!reduce}>Yes please! 💸</ChatIn>
                    <ChatOut delay={2.0} reduce={!!reduce}>
                      Perfect! Here's your checkout link: shop.link/abc123 ✨
                    </ChatOut>

                    {/* Typing indicator */}
                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: reduce ? 0 : 2.5, duration: 0.4, ease: easeOutQuiet }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-neutral-400"
                            animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    <div className="flex justify-center mt-4">
                      <span className="bg-[#FF00FF]/10 text-[#FF00FF] text-xs font-medium px-3 py-1.5 rounded-full">
                        ⚡ Powered by Conveero
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -left-4 top-1/4 bg-white rounded-lg p-3 shadow-lg hidden lg:block"
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">📈</span>
                  <div>
                    <p className="font-bold text-black text-sm">4x</p>
                    <p className="text-xs text-neutral-500">Conversion</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-1/4 bg-white rounded-lg p-3 shadow-lg hidden lg:block"
                animate={reduce ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <p className="font-bold text-black text-sm">&lt;2s</p>
                    <p className="text-xs text-neutral-500">Response</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ChatIn({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean }) {
  return (
    <motion.div
      className="flex gap-3"
      initial={{ opacity: 0, x: reduce ? 0 : -10, y: reduce ? 0 : 6 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: reduce ? 0.001 : 0.4, delay: reduce ? 0 : delay, ease: easeOutQuiet }}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]">
        <p className="text-sm text-black">{children}</p>
      </div>
    </motion.div>
  );
}

function ChatOut({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean }) {
  return (
    <motion.div
      className="flex justify-end"
      initial={{ opacity: 0, x: reduce ? 0 : 10, y: reduce ? 0 : 6 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: reduce ? 0.001 : 0.4, delay: reduce ? 0 : delay, ease: easeOutQuiet }}
    >
      <div className="bg-[#FFF100] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
        <p className="text-sm text-black">{children}</p>
      </div>
    </motion.div>
  );
}
