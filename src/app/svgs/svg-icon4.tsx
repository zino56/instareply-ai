/** Small arrow-right icon (inline link). */
export default function Icon4({ cid }: { cid: string }) {
  return (
    <svg data-cid={cid} className="w-auto h-4 block max-w-full overflow-hidden" data-component="icon" aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
