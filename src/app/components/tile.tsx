export type TileData = {
  text: string;
  text2: string;
  text3: string;
};
/** A content tile. */
export default function Tile({ d, cids }: { d: TileData; cids: string[] }) {
  return (
    <span data-cid={cids[0]} className="flex items-center gap-2 [font-family:'JetBrains_Mono',_ui-monospace,_'SF_Mono',_Menlo,_monospace] text-[0.8125rem] font-medium leading-[1.3125rem] whitespace-nowrap text-nowrap">
      <span data-cid={cids[1]} className="block text-accent">
        {d.text}
      </span>
      <span data-cid={cids[2]} className="block">
        {d.text2}
      </span>
      <span data-cid={cids[3]} className="block text-color-009">
        {d.text3}
      </span>
    </span>
  );
}
