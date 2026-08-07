import type { MediaTileStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type MediaTileData = {
  imgSrc: string;
  text: string;
};
/** A media tile. */
export default function MediaTile({ d, cids, styles }: { d: MediaTileData; cids: string[]; styles: MediaTileStyles }) {
  return (
    <div data-cid={cids[0]} className={cn("w-60 h-80 border border-solid border-color-005 block absolute -top-40 -left-30 p-[0.85rem] rounded-[18.4px] overflow-hidden shadow-[var(--clr-9)_0px_18px_40px_0px] origin-[120px_160px]", styles.className)} style={{ backgroundImage: "linear-gradient(var(--clr-10), var(--clr-11))" }}>
      <img data-cid={cids[1]} className={cn("w-[13.1875rem] h-[18.1875rem] block max-w-full rounded-[13.6px] overflow-clip object-cover aspect-[auto_1080/1080] pointer-events-none max-lg:w-[10.3125rem] max-lg:h-[16.1875rem]", styles.className2)} data-component="image" alt="" height="1080" src={d.imgSrc} width="1080" />
      <span data-cid={cids[2]} className={cn("h-[25.5px] block absolute top-[1.15rem] left-[1.15rem] z-1 py-[3.5px] px-[0.6rem] rounded-[999px] text-color-004 text-xs font-bold leading-[1.125rem] tracking-[0.23px] bg-color-008", styles.className3)}>
        {d.text}
      </span>
    </div>
  );
}
