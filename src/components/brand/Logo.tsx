import logoDark from '@/assets/conveero-logo-dark.png';
import logoLight from '@/assets/conveero-logo-light.png';
import markDark from '@/assets/conveero-mark-dark.png';
import markLight from '@/assets/conveero-mark-light.png';
import { cn } from '@/lib/utils';

/**
 * Canonical logo sizes. Height drives the lockup; a matching min-width keeps
 * the slot reserved so the mark never shifts between pages while loading.
 */
const SIZES = {
  /** App chrome: sidebar, topbar, dashboard navbar */
  chrome: 'h-7 w-auto min-w-[104px]',
  /** Marketing navbar */
  nav: 'h-8 w-auto min-w-[118px]',
  /** Auth / standalone pages */
  auth: 'h-9 w-auto min-w-[132px]',
} as const;

/** Icon-only sizes — no reserved wordmark width, tighter optical presence. */
const MARK_SIZES = {
  chrome: 'h-8 w-8',
  nav: 'h-9 w-9',
  auth: 'h-11 w-11',
} as const;

export type LogoSize = keyof typeof SIZES;

interface LogoProps {
  /** `dark` = dark wordmark for light backgrounds, `light` = white wordmark for dark backgrounds */
  variant?: 'dark' | 'light';
  /** Standardized size token. Prefer this over ad-hoc height classes. */
  size?: LogoSize;
  /** Render the icon-only C mark instead of the full wordmark. */
  markOnly?: boolean;
  className?: string;
}

/**
 * Conveero brand lockup. No background box — the SVG keeps its own aspect ratio.
 * Use the `size` token so lockups align consistently across the app.
 */
export function Logo({ variant = 'dark', size = 'chrome', markOnly = false, className }: LogoProps) {
  const src = markOnly
    ? variant === 'light'
      ? markLight
      : markDark
    : variant === 'light'
      ? logoLight
      : logoDark;

  return (
    <img
      src={src}
      alt="Conveero"
      className={cn(
        'block shrink-0 select-none object-contain object-left',
        markOnly ? MARK_SIZES[size] : SIZES[size],
        className,
      )}
      draggable={false}
    />
  );
}

export default Logo;
