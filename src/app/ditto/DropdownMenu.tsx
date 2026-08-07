import { useEffect, useState } from "react";

export type DittoMenu = {
  trigger: string;
  hoverOpen?: boolean;
  gap?: number;
  align?: "left" | "right" | string;
  html: string;
};

/**
 * Lightweight runtime for the cloned design's dropdown menus.
 * Attaches to the element carrying `data-cid={trigger}` and toggles an
 * absolutely-positioned panel rendered from the captured markup.
 */
export default function DropdownMenu({ menus = [] }: { menus?: DittoMenu[] }) {
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!menus.length) return;

    const cleanups: Array<() => void> = [];

    for (const menu of menus) {
      const trigger = document.querySelector<HTMLElement>(`[data-cid="${menu.trigger}"]`);
      if (!trigger) continue;

      const host = trigger.parentElement;
      if (host && getComputedStyle(host).position === "static") host.style.position = "relative";

      const onClick = (event: Event) => {
        event.preventDefault();
        setOpen((current) => (current === menu.trigger ? null : menu.trigger));
      };
      trigger.addEventListener("click", onClick);
      cleanups.push(() => trigger.removeEventListener("click", onClick));
    }

    const onDocClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-ditto-menu]")) return;
      if (menus.some((m) => target?.closest(`[data-cid="${m.trigger}"]`))) return;
      setOpen(null);
    };
    document.addEventListener("click", onDocClick);
    cleanups.push(() => document.removeEventListener("click", onDocClick));

    return () => cleanups.forEach((fn) => fn());
  }, [menus]);

  const active = menus.find((m) => m.trigger === open);
  if (!active) return null;

  const trigger = document.querySelector<HTMLElement>(`[data-cid="${active.trigger}"]`);
  if (!trigger) return null;

  const rect = trigger.getBoundingClientRect();
  const gap = active.gap ?? 6;

  return (
    <div
      data-ditto-menu={active.trigger}
      style={{
        position: "fixed",
        top: rect.bottom + gap,
        left: active.align === "right" ? undefined : rect.left,
        right: active.align === "right" ? Math.max(8, window.innerWidth - rect.right) : undefined,
        zIndex: 60,
      }}
      dangerouslySetInnerHTML={{ __html: active.html }}
    />
  );
}
