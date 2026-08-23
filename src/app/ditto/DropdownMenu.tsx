import { useEffect, useState } from "react";

export type DittoMenuItem = {
  label: string;
  secondaryLabel?: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
};

export type DittoMenu = {
  trigger: string;
  hoverOpen?: boolean;
  gap?: number;
  align?: "left" | "right" | string;
  label?: string;
  items: DittoMenuItem[];
};

const menuContainerStyles: React.CSSProperties = {
  position: "absolute",
  margin: 0,
  display: "block",
  boxSizing: "border-box",
  minWidth: "168px",
  padding: "5.6px",
  border: "1px solid rgba(26, 14, 8, 0.12)",
  borderRadius: "13.6px",
  backgroundColor: "rgb(251, 246, 234)",
  color: "rgb(26, 14, 8)",
  boxShadow: "rgba(26, 14, 8, 0.12) 0px 12px 32px 0px",
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "25.6px",
  listStyleType: "none",
  flexDirection: "row",
  flexWrap: "nowrap",
  zIndex: 60,
};

/**
 * Lightweight runtime for the cloned design's dropdown menus.
 * Attaches to the element carrying `data-cid={trigger}` and toggles an
 * absolutely-positioned panel rendered from structured menu items.
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

  const positionStyles: React.CSSProperties = {
    top: rect.bottom + gap,
    left: active.align === "right" ? undefined : rect.left,
    right: active.align === "right" ? Math.max(8, window.innerWidth - rect.right) : undefined,
  };

  return (
    <ul
      data-ditto-menu={active.trigger}
      aria-label={active.label || "Menu"}
      style={{ ...menuContainerStyles, ...positionStyles }}
    >
      {active.items.map((item, index) => {
        const activeStyles: React.CSSProperties = item.active
          ? { backgroundColor: "rgba(255, 241, 0, 0.18)" }
          : {};

        const content = (
          <>
            <span>{item.label}</span>
            {item.secondaryLabel && <span>{item.secondaryLabel}</span>}
          </>
        );

        return (
          <li
            key={index}
            style={{
              display: "list-item",
              width: "100%",
              listStyleType: "none",
            }}
          >
            {item.href ? (
              <a
                href={item.href}
                onClick={(event) => {
                  item.onClick?.();
                  setOpen(null);
                }}
                style={{
                  display: "flex",
                  width: "100%",
                  padding: "8px 10.4px",
                  borderRadius: "8.8px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "14px",
                  lineHeight: "22.4px",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  backgroundColor: "transparent",
                  ...activeStyles,
                }}
              >
                {content}
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  item.onClick?.();
                  setOpen(null);
                }}
                style={{
                  display: "flex",
                  width: "100%",
                  padding: "8px 10.4px",
                  border: "none",
                  borderRadius: "8.8px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "14px",
                  lineHeight: "22.4px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: "inherit",
                  ...activeStyles,
                }}
              >
                {content}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
