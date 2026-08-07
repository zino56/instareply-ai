export type TextLink2Data = {
  href: string;
  label: string;
};
/** A text link. */
export default function TextLink2({ d, cids }: { d: TextLink2Data; cids: string[] }) {
  return (
    <a data-cid={cids[0]} className="block text-color-006 cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-component="link" href={d.href} rel="noopener noreferrer" target="_blank">
      {d.label}
    </a>
  );
}
