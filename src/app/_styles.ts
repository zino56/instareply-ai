// Per-instance class overrides for the cloned design components.
// Every field is optional: components merge them on top of their base classes.

export type ListRow2Styles = { className?: string; className2?: string };
export type LogoStyles = { className?: string; className2?: string };
export type Logo4Styles = { className?: string; className2?: string };
export type MediaCardStyles = {
  className?: string;
  className2?: string;
  className3?: string;
  className4?: string;
  className5?: string;
};
export type MediaTileStyles = { className?: string; className2?: string; className3?: string };
export type MediaTile2Styles = { className?: string; className2?: string; className3?: string };
export type MediaTile3Styles = { className?: string; className2?: string; className3?: string };
export type ProductCardStyles = {
  className?: string;
  className2?: string;
  className3?: string;
  className4?: string;
  className5?: string;
};
export type TextLinkStyles = { className?: string; className2?: string; className3?: string };

const EMPTY: Record<string, never> = Object.freeze({}) as Record<string, never>;

const make = <T,>(): T[] =>
  new Proxy([] as T[], {
    get(target, prop) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) return EMPTY as unknown as T;
      return (target as unknown as Record<string | symbol, unknown>)[prop];
    },
  });

export const ListRow2_styles = make<ListRow2Styles>();
export const Logo_styles = make<LogoStyles>();
export const Logo4_styles = make<Logo4Styles>();
export const MediaCard_styles = make<MediaCardStyles>();
export const MediaTile_styles = make<MediaTileStyles>();
export const MediaTile2_styles = make<MediaTile2Styles>();
export const MediaTile3_styles = make<MediaTile3Styles>();
export const ProductCard_styles = make<ProductCardStyles>();
export const TextLink_styles = make<TextLinkStyles>();
