# Products Product-Completeness Pass — Proposal (v1)

Scope: `src/pages/Products.tsx` + small local components. Frontend + mock states. No global color/font/spacing changes. Preserves existing motion + 44px mobile targets. Keeps current backend calls (`api.getProducts`, `api.createProduct`) intact; edit/toggle/archive stay client-side until backend routes exist.

---

## 1. Page IA

Single page, no route changes.

```text
Products
├─ Header
│   • Title + subtle "N products · M active" meta
│   • Actions: [Search] [View: Grid|Table] [Add product ▾ (Add manually / Import JSON)]
├─ Toolbar (sticky under header on scroll)
│   • Search (title/description/category)
│   • Filter chips: Status (All/Active/Inactive), Missing image, No description
│   • Sort menu: Newest · Name A→Z · Price ↑ · Price ↓
│   • Result count on the right
├─ Catalog
│   • Grid view (default): responsive product cards
│   • Table view (md+): image · title · category · price · status · actions
└─ Modals
    • Add / Edit product (single form component, side-sheet on desktop, full sheet on mobile)
    • Import JSON (existing, cleaned up)
    • Archive confirm (replaces destructive Delete as the default; Delete stays behind overflow)
```

Overview stat cards (Total / Active / Catalog value) are kept as-is — no redesign.

---

## 2. Required States

**Catalog area**
- loading: 8 skeleton cards (image block + 2 lines + price + switch row)
- empty (no products at all): illustrated panel, "Add your first product" + "Import JSON" secondary
- empty (filtered/search): "No matches" + Clear filters
- error: inline card with Retry
- ready: grid or table

**Row / card**
- default, hover (elevation + reveal actions), inactive (dimmed + "Inactive" chip), archived (hidden from default view, visible only with Status = Archived filter)
- saving (optimistic toggle showing spinner on the switch, reverts on failure with toast)

**Add / Edit form**
- idle, validating (inline field errors), saving (button spinner, form disabled), saved (toast + close), failed (inline error banner + Retry, form stays open with values)

**Import JSON**
- idle, parsing/uploading (spinner), invalid JSON (inline error with line hint), partial success (toast: "X added, Y skipped"), failed (retry)

---

## 3. Product Form v1 (fields)

Kept intentionally thin — one dialog for Add and Edit.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Title | text | ✓ | 2–80 chars |
| Description | textarea | ✓ | up to ~500 chars, counter |
| Price | number | ✓ | ≥ 0, 2 decimals, currency = USD (locked in v1) |
| Category | text w/ suggestions | – | free text, autocompletes from existing categories in catalog |
| Image URL | url | – | live preview thumbnail on the side; "invalid image" fallback |
| Active | switch | – | default on |

Validation is client-side only in v1. No SKU, inventory, variants, tax, or multi-currency.

---

## 4. Row / Card Actions

Visible primary (card hover / table row):
- **Toggle Active** (switch) — optimistic, mock persist
- **Edit** — opens form pre-filled

Overflow (⋯ menu):
- **Duplicate** — clones to `Title (copy)`, inactive by default
- **Archive** — soft-hide (moves to Status: Archived), reversible via Unarchive
- **Copy link** *(stubbed, disabled tooltip "Available when catalog is public")*
- **Delete** — destructive, confirm dialog; only shown for archived items to prevent accidental loss

Bulk selection deferred to v2.

---

## 5. Max 10 Concrete UI Additions

1. **Toolbar with sticky behavior**: search + status filter chips + sort menu + result count.
2. **Filter chips**: All / Active / Inactive / Archived, plus quality chips "Missing image", "No description".
3. **Sort menu**: Newest, Name A→Z, Price ↑, Price ↓ (client-side sort of the mock list).
4. **View toggle**: Grid ↔ Table (Table = desktop only, ≥ md).
5. **Rich card**: image with graceful fallback, category chip, price, active switch, hover-revealed overflow, "Inactive"/"Archived" dim state.
6. **Table view row** (md+): compact 44px-height rows, sortable headers, inline switch + overflow.
7. **Unified Add/Edit form** with validation, image live preview, category autocomplete, character counter on description.
8. **Optimistic toggle + toast** for Activate/Deactivate with error revert.
9. **Archive flow**: soft state distinct from Delete; empty-state message when Status=Archived is empty.
10. **State coverage**: skeletons, filtered-empty with Clear, catalog-empty with dual CTA (Add / Import), error card with Retry, plus `?prodState=loading|error|empty` QA param.

---

## 6. Waits for Backend / Data Layer

- Real `PATCH /api/products/:id` for edit + toggle active → currently optimistic client-only.
- `POST /api/products/:id/archive` + `unarchive` — v1 keeps `archived` in local state.
- `DELETE /api/products/:id` — wired to mock removal only.
- `POST /api/products/bulk` for CSV / Shopify sync buttons (kept disabled).
- Server-side search + pagination once catalogs exceed ~200 items (v1 is client-filtered).
- Image upload pipeline (v1 = URL only).
- Category taxonomy endpoint (v1 = derived from existing product categories).
- Currency + tax settings (v1 hardcodes USD).
- Public catalog link (Copy link action stays disabled).
- Audit / who-edited-what timeline (deferred).

All new UI reads from the existing `Product` type and the same `api.getProducts` response, so swapping mocks for real endpoints is a data-layer change only.

---

Reply **approved** (or with edits — e.g. drop table view, drop archive, defer duplicate) and I'll ship it as one grouped diff on `src/pages/Products.tsx` plus a small `src/lib/productsMock.ts` for demo data + QA states.
