/** Hamburger menu icon. */
export default function Icon2({ cid }: { cid: string }) {
  return (
    <svg data-cid={cid} className="w-auto h-5.5 block max-w-full overflow-hidden" data-component="icon" aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
