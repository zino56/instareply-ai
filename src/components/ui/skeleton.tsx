import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * "pulse" (default) — safe for any surface, including long lists and
   * full-page loaders.
   * "shimmer" — subtle sweeping highlight. Use only on compact card/list
   * skeletons; avoid on long lists and full-page loading areas.
   */
  variant?: "pulse" | "shimmer";
}

function Skeleton({ className, variant = "pulse", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-muted",
        variant === "shimmer" ? "skeleton-shimmer" : "animate-pulse",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
