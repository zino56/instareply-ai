import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Route-level resource hints.
 *
 * Vite emits a separate JS + CSS chunk for every `React.lazy` route, so
 * warming the next likely route means importing its chunk during idle time.
 * The browser then has the JS/CSS in cache before the user clicks.
 */
const PREFETCH_MAP: Record<string, Array<() => Promise<unknown>>> = {
  // On the homepage, pricing is by far the most common next stop.
  "/": [() => import("@/pages/Pricing")],
  "/pricing": [() => import("@/pages/Comments")],
};

function onIdle(cb: () => void) {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(cb, { timeout: 2500 });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(cb, 1500);
  return () => window.clearTimeout(t);
}

export function RoutePrefetch() {
  const { pathname } = useLocation();

  useEffect(() => {
    const loaders = PREFETCH_MAP[pathname];
    if (!loaders?.length) return;
    // Never compete with the current page's critical resources.
    const cancel = onIdle(() => {
      loaders.forEach((load) => {
        void load().catch(() => {
          /* prefetch is best-effort */
        });
      });
    });
    return cancel;
  }, [pathname]);

  return null;
}

export default RoutePrefetch;
