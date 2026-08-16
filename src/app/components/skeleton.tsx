import { useEffect, useState } from "react";

/**
 * CSS-only shimmer skeleton primitives for the marketing site.
 * Animation + reduced-motion handling live in `globals.css` (.cv-skeleton).
 */
export function Skeleton({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      aria-hidden="true"
      className={`cv-skeleton cv-skeleton--${tone} block rounded-md ${className}`}
    />
  );
}

/** Returns true for `ms` after mount — used to show a brief skeleton pass. */
export function useSkeleton(ms = 700, deps: unknown[] = []) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), ms);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return loading;
}

/** Card-shaped skeleton used by feature / pricing grids. */
export function CardSkeleton({ tone = "light" }: { tone?: "dark" | "light" }) {
  const border = tone === "light" ? "border-black/10 bg-black/[0.02]" : "border-[#23252a] bg-[#0f1011]";
  return (
    <div className={`h-full rounded-2xl border border-solid p-6 ${border}`}>
      <Skeleton tone={tone} className="h-4 w-24" />
      <Skeleton tone={tone} className="mt-5 h-9 w-32" />
      <Skeleton tone={tone} className="mt-3 h-3 w-40" />
      <div className="mt-7 space-y-3">
        <Skeleton tone={tone} className="h-3 w-full" />
        <Skeleton tone={tone} className="h-3 w-5/6" />
        <Skeleton tone={tone} className="h-3 w-4/6" />
        <Skeleton tone={tone} className="h-3 w-3/6" />
      </div>
      <Skeleton tone={tone} className="mt-8 h-11 w-full rounded-full" />
    </div>
  );
}

/** Comment-card skeleton: avatar circle + text lines. */
export function CommentSkeleton() {
  return (
    <div className="rounded-2xl border border-solid border-[#23252a] bg-[#0f1011] p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-2.5 w-20" />
        </div>
      </div>
      <div className="mt-4 space-y-2.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
