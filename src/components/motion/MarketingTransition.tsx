import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const MARKETING_ROUTES = [
  "/",
  "/pricing",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/comments",
];

export function isMarketingRoute(pathname: string) {
  return MARKETING_ROUTES.includes(pathname);
}

/**
 * Subtle marketing page transition: fade + 8px slide-up, 0.25s ease-out.
 * Keyed on pathname so each new page animates in. No exit animation and no
 * `mode="wait"`, so navigation is never delayed and no spinner is introduced.
 * Framer's app-level MotionConfig reducedMotion="user" neutralizes the
 * transform, and we also flatten the fade under prefers-reduced-motion.
 */
export function MarketingTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const marketing = isMarketingRoute(location.pathname);

  if (!marketing) return <>{children}</>;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default MarketingTransition;
