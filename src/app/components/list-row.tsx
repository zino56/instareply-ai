export type ListRowData = {
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow({ d, cids }: { d: ListRowData; cids: string[] }) {
  return (
    <li data-cid={cids[0]} className="list-item">
      <a data-cid={cids[1]} className="h-9 inline-flex px-4 rounded-[999px] items-center text-primary text-sm font-semibold leading-[1.375rem] cursor-pointer hover:bg-clr-19 hover:border-foreground hover:text-foreground hover:outline-foreground hover:[text-decoration-color:var(--foreground)]" data-component="link" href={d.href}>
        {d.label}
      </a>
    </li>
  );
}
