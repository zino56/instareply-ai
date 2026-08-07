import type { MediaTile3Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type MediaTile3Data = {
  label: string;
};
/** A media tile. */
export default function MediaTile3({ d, cids, styles }: { d: MediaTile3Data; cids: string[]; styles: MediaTile3Styles }) {
  return (
    <div data-cid={cids[0]} className={cn("block", styles.className)}>
      <button data-cid={cids[1]} className={cn("w-full flex py-5 justify-between items-center gap-5 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[1.375rem] font-bold leading-6.5 tracking-[-0.22px] cursor-pointer", styles.className2)} data-component="button" aria-expanded="false" type="button">
        <span data-cid={cids[2]} className="block">
          {d.label}
        </span>
        <svg data-cid={cids[3]} className="w-auto h-5 block max-w-full shrink-0 overflow-hidden text-primary focus:outline-clr-24 focus:[outline-style:auto] focus:outline-[5px]" data-component="icon" aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
