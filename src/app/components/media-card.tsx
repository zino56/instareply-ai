import type { MediaCardStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type MediaCardData = {
  title: string;
  description: string;
  label: string;
  alt: string;
  imgSrc: string;
};
/** A card with media + heading. */
export default function MediaCard({ d, cids, styles }: { d: MediaCardData; cids: string[]; styles: MediaCardStyles }) {
  return (
    <div data-cid={cids[0]} className="w-full grid items-start gap-8 grid-cols-[644px_460px] max-lg:grid-cols-1">
      <div data-cid={cids[1]} className={cn("block", styles.className)}>
        <h3 data-cid={cids[2]} className="block [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-3xl font-bold leading-[2rem] tracking-[-0.45px] text-balance" data-component="heading">
          {d.title}
        </h3>
        <p data-cid={cids[3]} className="w-full max-w-[39.1125rem] block my-5 text-primary">
          {d.description}
        </p>
        <a data-cid={cids[4]} className={cn("h-[31.3px] border-b-2 border-solid border-b-accent inline-flex mt-8 pb-[0.15rem] items-center gap-2 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[1.0625rem] font-extrabold leading-[1.6875rem] cursor-pointer", styles.className2)} data-component="button" href="https://app.zamili.ai/join">
          {d.label}
          <svg data-cid={cids[5]} className={cn("w-auto h-4.5 block max-w-full overflow-hidden focus:outline-clr-24 focus:[outline-style:auto] focus:outline-[5px]", styles.className3)} data-component="icon" aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
            <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      <div data-cid={cids[6]} className={cn("border border-solid border-color-002 block rounded-4xl overflow-hidden bg-color-003", styles.className4)}>
        <img data-cid={cids[7]} className={cn("block max-w-full overflow-clip aspect-[auto_1200/800] max-md:w-[19.3125rem] max-md:h-[9.6875rem] md:max-lg:w-175.5 md:max-lg:h-[21.9375rem]", styles.className5)} data-component="image" alt={d.alt} height="800" src={d.imgSrc} width="1200" />
      </div>
    </div>
  );
}
