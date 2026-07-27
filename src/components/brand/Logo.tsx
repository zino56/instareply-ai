import logoDark from '@/assets/conveero-logo-dark.svg';
import logoLight from '@/assets/conveero-logo-light.svg';
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

export type LogoSize = keyof typeof SIZES;

interface LogoProps {
  /** `dark` = dark wordmark for light backgrounds, `light` = white wordmark for dark backgrounds */
  variant?: 'dark' | 'light';
  /** Standardized size token. Prefer this over ad-hoc height classes. */
  size?: LogoSize;
  className?: string;
}

/**
 * Conveero brand lockup. No background box — the SVG keeps its own aspect ratio.
 * Use the `size` token so lockups align consistently across the app.
 */
export function Logo({ variant = 'dark', size = 'chrome', className }: LogoProps) {
  return (
    <img
      src={variant === 'light' ? logoLight : logoDark}
      alt="Conveero"
      className={cn('block shrink-0 select-none object-contain object-left', SIZES[size], className)}
      draggable={false}
    />
  );
}

export default Logo;
