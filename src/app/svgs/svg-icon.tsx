/** Chevron-down icon. */
export default function Icon({ cid }: { cid: string }) {
  return (
    <svg data-cid={cid} className="w-auto h-3.5 block max-w-full overflow-hidden" data-component="icon" aria-hidden="true" fill="none" height="14" viewBox="0 0 24 24" width="14">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
