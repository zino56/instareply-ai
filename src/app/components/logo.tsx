import type { LogoStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type LogoData = {
  label: string;
  alt: string;
  imgSrc: string;
};
/** A logo. */
export default function Logo({ d, cids, styles }: { d: LogoData; cids: string[]; styles: LogoStyles }) {
  return (
    <span data-cid={cids[0]} className={cn("h-11 border-2 border-solid border-background block rounded-[50%] overflow-hidden bg-color-004 shadow-[var(--clr-4)_0px_4px_12px_0px]", styles.className)} title={d.label}>
      <img data-cid={cids[1]} className="w-10 h-10 block max-w-full overflow-clip object-cover bg-color-004 transform-[matrix(1.35,0,0,1.35,0,0)] origin-[20px_20px] max-md:w-[1.9375rem] max-md:origin-[15.3828px_20px]" data-component="image" alt={d.alt} src={d.imgSrc} width="40" height="40" loading="lazy" decoding="async" />
    </span>
  );
}
