import type { Variants, Transition } from 'framer-motion';

/**
 * Shared motion primitives for the authenticated app.
 * - Durations 120–220ms, content up to 260ms.
 * - Quiet, non-bouncy easing.
 * - Respect prefers-reduced-motion: framer-motion's <MotionConfig reducedMotion="user">
 *   short-circuits transforms; we also degrade CSS keyframes via index.css.
 */

export const easeOutQuiet: Transition['ease'] = [0.22, 1, 0.36, 1];

export const pageTransition: Transition = {
  duration: 0.22,
  ease: easeOutQuiet,
};

/** Stagger children by 30ms for a calm, layered enter. */
export const pageContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

/** Fade + 8px upward settle. */
export const pageItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: pageTransition,
  },
};

/** Fade-only entrance for empty states / large content blocks. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.18, ease: easeOutQuiet } },
};
