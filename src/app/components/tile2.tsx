export type Tile2Data = {
  description: string;
  href: string;
  label: string;
  href2: string;
  label2: string;
  href3: string;
  label3: string;
  href4: string;
  label4: string;
  href5: string;
  label5: string;
  href6: string;
  label6: string;
};
/** A content tile. */
export default function Tile2({ d, cids }: { d: Tile2Data; cids: string[] }) {
  return (
    <div data-cid={cids[0]} className="block">
      <p data-cid={cids[1]} className="block max-w-[30.675rem] mb-5 text-accent text-xs font-semibold leading-[1.1875rem] tracking-[1.68px] uppercase">
        {d.description}
      </p>
      <ul data-cid={cids[2]} className="flex flex-col gap-3 [list-style-type:none] list-outside">
        <li data-cid={cids[3]} className="list-item">
          <a data-cid={cids[4]} className="inline text-color-006 text-sm leading-[1.375rem] cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-component="link" href={d.href}>
            {d.label}
          </a>
        </li>
        <li data-cid={cids[5]} className="list-item">
          <a data-cid={cids[6]} className="inline text-color-006 text-sm leading-[1.375rem] cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-component="link" href={d.href2}>
            {d.label2}
          </a>
        </li>
        <li data-cid={cids[7]} className="list-item">
          <a data-cid={cids[8]} className="inline text-color-006 text-sm leading-[1.375rem] cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-component="link" href={d.href3}>
            {d.label3}
          </a>
        </li>
        <li data-cid={cids[9]} className="list-item">
          <a data-cid={cids[10]} className="inline text-color-006 text-sm leading-[1.375rem] cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-component="link" href={d.href4}>
            {d.label4}
          </a>
        </li>
        <li data-cid={cids[11]} className="list-item">
          <a data-cid={cids[12]} className="inline text-color-006 text-sm leading-[1.375rem] cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-component="link" href={d.href5}>
            {d.label5}
          </a>
        </li>
        <li data-cid={cids[13]} className="list-item">
          <a data-cid={cids[14]} className="inline text-color-006 text-sm leading-[1.375rem] cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-component="link" href={d.href6}>
            {d.label6}
          </a>
        </li>
      </ul>
    </div>
  );
}
