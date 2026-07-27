import logoDark from '@/assets/conveero-logo-dark.svg';
import logoLight from '@/assets/conveero-logo-light.svg';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** `dark` = dark wordmark for light backgrounds, `light` = white wordmark for dark backgrounds */
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * Conveero brand lockup. No background box — the SVG keeps its own aspect ratio.
 * Set height via className (e.g. `h-8`); width scales automatically.
 */
export function Logo({ variant = 'dark', className }: LogoProps) {
  return (
    <img
      src={variant === 'light' ? logoLight : logoDark}
      alt="Conveero"
      className={cn('h-8 w-auto select-none', className)}
      draggable={false}
    />
  );
}

export default Logo;
