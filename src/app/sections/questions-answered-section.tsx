import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeOutQuiet, Lift, Reveal } from "../motion";

const faqs = [
  {
    q: "How does the AI know what to reply?",
    a: "You train it with your store's FAQ, policies, and common responses. The AI uses this to draft accurate replies that match your brand voice.",
  },
  {
    q: "Can I review replies before they're sent?",
    a: "Yes! Every AI-drafted reply goes to your approval queue. You can edit or approve with one click.",
  },
  {
    q: "Does it work with my existing Instagram?",
    a: "Yes! Just connect your Instagram Business account and you're ready to go. No need to change accounts.",
  },
  {
    q: "What if I get hundreds of DMs?",
    a: "Conveero scales automatically. Whether you get 10 or 10,000 DMs per day, the AI handles them all instantly.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! All plans include a 7-day free trial. No credit card required to start.",
  },
];

/** Questions Answered section. */
export default function QuestionsAnsweredSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="block py-24 max-lg:py-14" data-cid="n534" id="faq">
      <div className="block max-w-300 mx-auto px-8" data-cid="n535">
        <Reveal className="block max-w-160 mb-14 mx-auto text-center">
          <h2 className="block [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3.1875rem] font-bold leading-[3.1875rem] tracking-[-1.28px] text-balance max-lg:text-4xl max-lg:leading-9 max-lg:tracking-[-0.9px] 2xl:text-[3.25rem] 2xl:leading-13 2xl:tracking-[-1.3px]" data-cid="n537" data-component="heading">
            {"Frequently asked "}
            <mark className="inline px-[0.575rem] rounded-sm bg-color-010 max-lg:px-[6.5px] 2xl:px-[0.5875rem]" data-cid="n538">
              questions
            </mark>
          </h2>
          <p className="block max-w-[44rem] my-5 text-primary text-lg leading-[1.8125rem]" data-cid="n539">
            Straight answers before you create an account.
          </p>
        </Reveal>

        <Reveal className="border-t border-solid border-t-color-002 border-b border-b-color-002 block mt-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className="border-b border-solid border-b-color-002 block last:border-b-0" key={f.q}>
                <button
                  className="w-full flex py-5 justify-between items-center gap-5 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[1.375rem] font-bold leading-6.5 tracking-[-0.22px] cursor-pointer text-left transition-opacity duration-200 hover:opacity-70"
                  data-component="button"
                  aria-expanded={isOpen}
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="block">{f.q}</span>
                  <motion.svg
                    className="w-auto h-5 block max-w-full shrink-0 overflow-hidden text-primary"
                    data-component="icon"
                    aria-hidden="true"
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: easeOutQuiet }}
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easeOutQuiet }}
                      className="overflow-hidden"
                    >
                      <div className="w-full max-w-[39.1125rem] block mb-5 pb-5 text-primary">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>

        <div className="flex mt-14 flex-wrap justify-between items-center gap-5" data-cid="n562">
          <Lift>
            <a className="w-[10.8125rem] h-12 border border-solid border-foreground flex px-6.5 rounded-[999px] justify-center items-center gap-2 text-background font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap bg-foreground cursor-pointer transition-colors duration-300 hover:bg-color-001 hover:border-color-001" data-cid="n563" data-component="button" href="/signup">
              Get started
            </a>
          </Lift>
        </div>
      </div>
    </section>
  );
}
