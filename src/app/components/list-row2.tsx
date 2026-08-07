import type { ListRow2Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type ListRow2Data = {
  text: string;
  text2: string;
};
/** A list row. */
export default function ListRow2({ d, cids, styles }: { d: ListRow2Data; cids: string[]; styles: ListRow2Styles }) {
  return (
    <li data-cid={cids[0]} className={cn("flex min-w-22 flex-col items-center gap-[0.15rem]", styles.className)}>
      <span data-cid={cids[1]} className="block text-color-004 [font-family:'JetBrains_Mono',_ui-monospace,_'SF_Mono',_Menlo,_monospace] text-[1.625rem] font-bold leading-[1.8125rem] tracking-[-0.79px] max-lg:text-xl max-lg:leading-5.5 max-lg:tracking-[-0.6px]">
        {d.text}
      </span>
      <span data-cid={cids[2]} className={cn("block text-color-013 text-sm font-medium leading-[1.375rem]", styles.className2)}>
        {d.text2}
      </span>
    </li>
  );
}
