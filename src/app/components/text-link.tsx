import type { TextLinkStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type TextLinkData = {
  ariaselected: string;
  label: string;
  style?: string;
};
/** A text link. */
export default function TextLink({ d, cids, styles }: { d: TextLinkData; cids: string[]; styles: TextLinkStyles }) {
  return (
    <button data-cid={cids[0]} className="flex min-w-0 flex-col items-center flex-1 gap-4 [font-family:Arial] text-[0.8125rem] leading-[0.9375rem] text-center cursor-pointer max-lg:gap-[0.65rem]" data-component="button" aria-selected={d.ariaselected} role="tab" type="button">
      <span data-cid={cids[1]} className={cn("block [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[1.375rem] font-bold leading-6.5 max-md:text-base max-md:leading-[1.1875rem] md:max-lg:text-[1.0625rem] md:max-lg:leading-[1.3125rem]", styles.className)}>
        {d.label}
      </span>
      <span data-cid={cids[2]} className={cn("w-full h-[0.1875rem] block rounded-[999px]", styles.className2)} style={d.style} aria-hidden="true" />
    </button>
  );
}
