import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

/**
 * Mouse-tracking spotlight wrapper for feature/pricing cards.
 * Renders a radial highlight that follows the cursor. Transform/opacity only.
 */
export default function SpotlightCard({
  children,
  className,
  color = "255, 241, 0",
}: {
  children: ReactNode;
  className?: string;
  /** rgb triplet for the highlight */
  color?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 250, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 30, mass: 0.4 });
  const opacity = useMotionValue(0);
  const sOpacity = useSpring(opacity, { stiffness: 180, damping: 26 });

  const background = useMotionTemplate`radial-gradient(320px circle at ${sx}px ${sy}px, rgba(${color}, 0.14), transparent 40%)`;

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <div
      className={`group relative h-full rounded-4xl ${className ?? ""}`}
      onPointerMove={handleMove}
      onPointerEnter={() => !reduce && opacity.set(1)}
      onPointerLeave={() => opacity.set(0)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-4xl"
        style={{ background, opacity: sOpacity }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-4xl ring-1 ring-inset ring-[rgba(255,241,0,0.45)]"
        style={{ opacity: sOpacity }}
      />
      <div className="relative h-full transition-transform duration-300 group-hover:-translate-y-1">
        {children}
      </div>
    </div>
  );
}
