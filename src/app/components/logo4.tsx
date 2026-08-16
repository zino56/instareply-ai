import type { Logo4Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Logo4Data = {
  label: string;
  alt: string;
  imgSrc: string;
  kind?: string;
};
/** A logo. */
export default function Logo4({ d, cids, styles }: { d: Logo4Data; cids: string[]; styles: Logo4Styles }) {
  return (
    <span data-cid={cids[0]} className={cn("w-17.5 h-17.5 border border-solid border-border flex p-4 rounded-xl justify-center items-center bg-surface max-md:w-14 max-md:h-14 max-md:p-3", styles.className)} title={d.label}>
      <img data-cid={cids[1]} className="w-full h-9 block max-w-full overflow-clip object-contain max-md:h-7.5" alt={d.alt} src={d.imgSrc} data-component={d.kind} />
    </span>
  );
}
