// Stable per-instance element ids used by the cloned design markup.
// The upstream export shipped explicit arrays; we generate them deterministically
// so any instance/element index resolves to a unique, stable string.

const inner = (prefix: string): string[] =>
  new Proxy([] as string[], {
    get(target, prop) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) return `${prefix}-${prop}`;
      return (target as unknown as Record<string | symbol, unknown>)[prop];
    },
  });

const make = (prefix: string): string[][] =>
  new Proxy([] as string[][], {
    get(target, prop) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) return inner(`${prefix}-${prop}`);
      return (target as unknown as Record<string | symbol, unknown>)[prop];
    },
  });

export const ListRow_cids = make("list-row");
export const ListRow2_cids = make("list-row2");
export const ListRow3_cids = make("list-row3");
export const Logo_cids = make("logo");
export const Logo2_cids = make("logo2");
export const Logo3_cids = make("logo3");
export const Logo4_cids = make("logo4");
export const MediaCard_cids = make("media-card");
export const MediaTile_cids = make("media-tile");
export const MediaTile2_cids = make("media-tile2");
export const MediaTile3_cids = make("media-tile3");
export const ProductCard_cids = make("product-card");
export const TextLink_cids = make("text-link");
export const TextLink2_cids = make("text-link2");
export const Tile_cids = make("tile");
export const Tile2_cids = make("tile2");
