import { Lift, Reveal, Stagger, StaggerItem } from "../motion";
/** Three-step onboarding section. */
export default function CtaSection() {
  return (
    <section className="block py-24 max-lg:py-14 bg-white" data-cid="n321" id="capabilities">
      <div className="block max-w-300 mx-auto px-8" data-cid="n322">
        <Reveal className="block max-w-200 mb-14 mx-auto text-center">
          <h2 className="[font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3rem] md:text-[4rem] font-extrabold leading-[0.95] tracking-[-2px] text-black text-balance max-lg:text-[2.5rem] max-lg:tracking-[-1.5px]">
            {"Get up and running in "}
            <mark className="inline px-2 rounded-sm bg-[#FFF100]">3 simple steps</mark>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-lg text-black">
            We make it easy to make it easy. No degree in computer science required.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-3 gap-8 max-lg:grid-cols-1">
          {/* Step 1 */}
          <StaggerItem>
            <div className="rounded-2xl bg-[#FFF100] aspect-[4/3] flex items-center justify-center overflow-hidden">
              <span className="rounded-full bg-[#FF00FF] text-white [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-sm font-extrabold tracking-[1px] px-6 py-3 uppercase shadow-[0_8px_24px_rgba(255,0,255,0.35)]">
                Get started free
              </span>
            </div>
            <h3 className="mt-5 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-lg font-extrabold text-black">
              Step 1: Sign up for free
            </h3>
            <p className="mt-2 text-black/70">Start your free trial — no credit card required</p>
          </StaggerItem>

          {/* Step 2 */}
          <StaggerItem>
            <div className="rounded-2xl bg-black aspect-[4/3] flex items-center justify-center gap-4 overflow-hidden">
              <span className="w-16 h-16 rounded-full bg-white flex items-center justify-center [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-2xl font-extrabold text-black">
                C
              </span>
              <span className="w-11 h-11 rounded-xl bg-[#FFF100] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M10 13a5 5 0 007.07 0l2-2A5 5 0 0012 4l-1 1M14 11a5 5 0 00-7.07 0l-2 2A5 5 0 0012 20l1-1" stroke="black" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="w-16 h-16 rounded-full bg-[#FF00FF]" />
            </div>
            <h3 className="mt-5 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-lg font-extrabold text-black">
              Step 2: Connect to your channels
            </h3>
            <p className="mt-2 text-black/70">Link all your favorite social or messaging apps</p>
          </StaggerItem>

          {/* Step 3 */}
          <StaggerItem>
            <div className="rounded-2xl border border-black/10 bg-white aspect-[4/3] flex flex-col justify-center gap-3 p-5">
              {["Conversation starters", "Story mention reply", "Default reply", "Main menu"].map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 ${i === 1 ? "bg-[#FFF100]" : "bg-black/[0.04]"}`}
                >
                  <span className="text-xs font-medium text-black truncate">{label}</span>
                  <span className="rounded-full bg-black text-white text-[10px] font-extrabold tracking-[1px] uppercase px-3 py-1">
                    Set up
                  </span>
                </div>
              ))}
            </div>
            <h3 className="mt-5 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-lg font-extrabold text-black">
              Step 3: Go live in minutes
            </h3>
            <p className="mt-2 text-black/70">Automate your selling, replying, and so much more!</p>
          </StaggerItem>
        </div>

        <div className="mt-14 flex items-center justify-center gap-4 max-sm:flex-col">
          <a
            href="/signup"
            className="rounded-full bg-black text-white [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-sm font-extrabold tracking-[1px] uppercase px-8 py-4 transition-colors duration-300 hover:bg-[#FF00FF]"
          >
            Get started free
          </a>
          <a
            href="/pricing"
            className="rounded-full border-2 border-black text-black [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-sm font-extrabold tracking-[1px] uppercase px-8 py-4 transition-colors duration-300 hover:bg-[#FFF100]"
          >
            See plans
          </a>
        </div>
      </div>
    </section>
  );
}
