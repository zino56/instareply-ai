import type { MediaTile2Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type MediaTile2Data = {
  text: string;
  text2: string;
  description: string;
  description2: string;
};
/** A media tile. */
export default function MediaTile2({ d, cids, styles }: { d: MediaTile2Data; cids: string[]; styles: MediaTile2Styles }) {
  return (
    <figure data-cid={cids[0]} className="block">
      <div data-cid={cids[1]} className="flex mb-3 gap-0.5" aria-label="5 out of 5 stars">
        <svg data-cid={cids[2]} className="w-auto h-4 block max-w-full overflow-hidden" data-component="icon" aria-hidden="true" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" fill="#00b67a" />
        </svg>
        <svg data-cid={cids[3]} className="w-auto h-4 block max-w-full overflow-hidden" data-component="icon" aria-hidden="true" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" fill="#00b67a" />
        </svg>
        <svg data-cid={cids[4]} className="w-auto h-4 block max-w-full overflow-hidden" data-component="icon" aria-hidden="true" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" fill="#00b67a" />
        </svg>
        <svg data-cid={cids[5]} className="w-auto h-4 block max-w-full overflow-hidden" data-component="icon" aria-hidden="true" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" fill="#00b67a" />
        </svg>
        <svg data-cid={cids[6]} className="w-auto h-4 block max-w-full overflow-hidden" data-component="icon" aria-hidden="true" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" fill="#00b67a" />
        </svg>
      </div>
      <blockquote data-cid={cids[7]} className="block opacity-92 text-background">
        {d.text}
      </blockquote>
      <figcaption data-cid={cids[8]} className="border-t border-solid border-t-border flex mt-5 pt-5 items-center gap-3">
        <span data-cid={cids[9]} className="w-9 h-9 flex rounded-[50%] justify-center items-center shrink-0 text-color-004 text-sm font-bold leading-[1.375rem] bg-color-014" aria-hidden="true">
          {d.text2}
        </span>
        <span data-cid={cids[10]} className="block">
          <p data-cid={cids[11]} className={cn("block max-w-[35.7875rem] text-background text-sm font-semibold leading-[1.375rem]", styles.className)}>
            {d.description}
          </p>
          <p data-cid={cids[12]} className={cn("block max-w-[34.225rem] text-color-011 text-sm leading-[1.375rem]", styles.className2)}>
            {d.description2}
          </p>
        </span>
      </figcaption>
    </figure>
  );
}
