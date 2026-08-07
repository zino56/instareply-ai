/** Arrow-right icon (primary CTA). */
export default function Icon3({ cid }: { cid: string }) {
  return (
    <svg data-cid={cid} className="w-auto h-4.5 block max-w-full overflow-hidden" data-component="icon" aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
