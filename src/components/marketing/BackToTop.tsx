import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 600;
const SCROLL_DURATION = 500;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function smoothScrollToTop() {
  if (prefersReducedMotion()) {
    window.scrollTo(0, 0);
    return;
  }

  const start = window.scrollY;
  const startTime = performance.now();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / SCROLL_DURATION, 1);
    const eased = easeOutCubic(progress);
    window.scrollTo(0, Math.max(0, Math.round(start * (1 - eased))));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={smoothScrollToTop}
          aria-label="Back to top"
          className={cn(
            "fixed bottom-6 right-6 z-50 hidden md:flex",
            "h-12 w-12 items-center justify-center rounded-full",
            "bg-[#0f1011] text-[#f7f8f8]",
            "border border-[#23252a]",
            "shadow-[0_4px_14px_rgba(0,0,0,0.35)]",
            "transition-all duration-200 ease-out",
            "hover:bg-[#141516] hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(0,0,0,0.45)]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5e6ad2]/50"
          )}
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
