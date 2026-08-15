import { Reveal } from "../motion";
import { Logo } from "@/components/brand/Logo";
/** Section heading block — icon, headline, subcopy. */
export default function HiConveeroLetSection() {
  return (
    <section className="block relative z-2 mt-5 pt-20 pb-12 px-8" data-cid="n108" aria-label="Scale up your best conversations">
      <div className="block max-w-300 mx-auto px-8" data-cid="n109">
        <Reveal className="flex flex-col items-center gap-5">
          <Logo markOnly size="auth" className="h-10 w-10" />
          <h2 className="block max-w-[52rem] text-foreground [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[4.25rem] font-extrabold leading-[3.95rem] tracking-[-2.2px] text-balance text-center max-md:text-[2.5rem] max-md:leading-[2.35rem] max-md:tracking-[-1.2px] md:max-lg:text-[3rem] md:max-lg:leading-[2.75rem] md:max-lg:tracking-[-1.44px]" data-cid="n111">
            Scale up your best conversations
          </h2>
          <p className="block max-w-[34rem] text-muted-foreground text-lg leading-[1.75rem] text-center" data-cid="n114">
            Powerful automations for all the ways you engage and monetize.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
