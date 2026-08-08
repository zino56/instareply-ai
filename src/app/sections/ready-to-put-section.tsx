import Icon7 from "../svgs/svg-icon7";
/** Ready To Put section. */
export default function ReadyToPutSection() {
  return (
    <section className="block py-14 max-lg:py-8" data-cid="n564" id="final-cta">
      <div className="block max-w-300 mx-auto px-8" data-cid="n565">
        <div className="flex py-14 px-8 rounded-4xl flex-col items-center text-background text-center bg-foreground" data-cid="n566">
          <span className="w-8 h-8 block [vertical-align:-2px] text-accent transform-[matrix(0.978148,-0.207912,0.207912,0.978148,0,0)] origin-[16px_16px]" data-cid="n567" aria-hidden="true">
            <Icon7 cid={"n568"} />
          </span>
          <h2 className="block mt-5 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3.1875rem] font-bold leading-[3.1875rem] tracking-[-1.28px] text-balance max-lg:text-4xl max-lg:leading-9 max-lg:tracking-[-0.9px] 2xl:text-[3.25rem] 2xl:leading-13 2xl:tracking-[-1.3px]" data-cid="n569" data-component="heading">
            {"Ready to put conversations to "}
            <mark className="inline px-[0.575rem] rounded-sm text-foreground bg-color-010 max-lg:px-[6.5px] 2xl:px-[0.5875rem]" data-cid="n570">
              work
            </mark>
            ?
          </h2>
          <p className="block opacity-88 max-w-[44rem] my-5 mx-auto text-lg leading-[1.8125rem]" data-cid="n571">
            Get started and connect your first channel in minutes.
          </p>
          <div className="block mt-8" data-cid="n572">
            <a className="w-[10.8125rem] h-12 border border-solid border-background inline-flex px-6.5 rounded-[999px] justify-center items-center gap-2 text-foreground font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap bg-background cursor-pointer hover:bg-color-003 hover:border-color-003 hover:text-background hover:outline-background hover:[text-decoration-color:var(--background)]" data-cid="n573" data-component="button" href="/signup">
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
