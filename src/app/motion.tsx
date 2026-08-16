import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared marketing motion primitives (Linear/Stripe style).
 * GPU-friendly: only opacity + transform. Honors prefers-reduced-motion.
 */

export const easeOutQuiet = [0.22, 1, 0.36, 1] as const;

/** Fade + slide-up reveal, plays once when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 15,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: reduce ? 0.001 : 0.35, delay: reduce ? 0 : delay, ease: easeOutQuiet }}
    >
      {children}
    </Comp>
  );
}

/** Parent for staggered card grids. Pair with <StaggerItem>. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOutQuiet } },
};

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

/** Hover-lift wrapper for CTAs and cards (keeps the child link/button intact). */
export function Lift({
  children,
  className,
  tap = true,
}: {
  children: ReactNode;
  className?: string;
  tap?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={tap && !reduce ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2, ease: easeOutQuiet }}
    >
      {children}
    </motion.div>
  );
}
