# Conversations Product-Completeness Pass — Proposal

Scope: `src/pages/Conversations.tsx` + small local components under `src/components/conversations/`. Frontend + mock states only. No color/font token changes, no route/API/copy-system changes. Preserves existing motion, spacing, and 44px mobile targets.

---

## 1. Information Architecture

Three-region shell inside the existing full-height layout:

```text
┌─ Inbox Rail (280–360px) ─┬─ Thread (flex) ─────────────────┬─ Detail (0 or 320px) ─┐
│ Header:                  │ Header:                         │ (desktop-only,        │
│  title + count           │  avatar · name · @handle        │  toggleable)           │
│  segment tabs            │  status pill · assignee menu    │                        │
│  search                  │  actions: Resolve · Snooze · ⋯  │  Customer summary      │
│ Filter chips (row 2)     │ ────────────────────────────────│  Conversation meta     │
│ Bulk-action bar (when    │ Message list                    │  Linked products        │
│  selection > 0)          │  · date separators              │  Notes (internal)      │
│ List rows                │  · role bubbles (user/AI/agent) │  Tags                  │
│  · avatar, name, snippet │  · delivery ticks + timestamps  │  Timeline (events)     │
│  · time, unread dot,     │  · AI reasoning inline chip     │                        │
│    status chip, channel  │  · typing/sending indicator     │                        │
│  · long-press select     │ AI Suggested Replies strip      │                        │
│ Sticky "Load more"       │ Composer                        │                        │
│                          │  · AI/manual toggle             │                        │
│                          │  · quick replies · attach       │                        │
│                          │  · send · shortcut hint         │                        │
└──────────────────────────┴─────────────────────────────────┴────────────────────────┘
```

- Route contract unchanged: `?id=<conversationId>` selects. Optional `?segment=…&filter=…` for shareable views.
- Detail panel is collapsed by default on `lg`, hidden on `md`, opened by an "Info" toggle in the thread header.

---

## 2. Required States (per region)

**Inbox rail**
- loading: 8 shimmer rows (avatar + 2 lines)
- empty (no conversations yet): illustration + "Connect Instagram" CTA
- empty (filtered): "No matches" + clear filters
- error: inline card with Retry
- selected row: left accent bar + subtle bg
- multi-select: checkbox appears, action bar slides in

**Thread**
- no-selection (desktop): centered empty state
- loading messages: 3 shimmer bubbles (alternating sides)
- error loading: inline retry
- empty thread (new conv): "No messages yet" + suggested opener
- streaming AI: shimmer "AI is drafting…" bubble with cancel
- sending: outbound bubble with clock icon → single tick on ack
- failed to send: red border bubble + Retry / Delete
- resolved: soft banner "Marked resolved · Reopen"
- snoozed: banner "Snoozed until 3:00 PM · Unsnooze"
- disconnected channel: warning banner blocking composer

**Composer**
- idle, focused (ring), typing (send enabled), sending (spinner in submit)
- disabled (channel disconnected / resolved without reopen)
- over-limit (char count red)
- AI-draft mode: yellow accent border, "Generated — review before sending"

---

## 3. Filters / Segments to Include Now

Segment tabs (mutually exclusive, top of rail):
- **All** · **Unread** · **Needs attention** · **AI handled** · **Resolved**

Filter chips (multi, secondary row, collapse to "Filter" button on mobile):
- Status: open · snoozed · resolved
- Assignee: me · unassigned · teammate
- AI: replied · failed · not handled
- Time: today · 7d · 30d
- Tag: (dynamic, from mock tag set)

Sort menu: Newest · Oldest · Unread first · Longest waiting.

State is URL-synced so views are shareable/bookmarkable.

---

## 4. Mobile Split-Pane Behavior

- Breakpoint: `< md` (768px) = single pane, current AnimatePresence slide behavior kept.
- List view: full width; sticky header with title + search icon (tap opens search sheet); segment tabs scroll horizontally; filter chips collapse into a "Filters" bottom sheet.
- Thread view: full width; sticky top bar with back arrow (44px), name, and overflow menu (Resolve · Snooze · Info · Mark unread).
- Composer: sticky to bottom, safe-area padding, expands to 4 lines max, then scrolls.
- Detail/customer panel opens as a full-screen bottom sheet on mobile via the header "Info" action.
- Bulk selection on mobile: long-press a row to enter select mode; floating action bar at bottom.
- All tap targets ≥ 44px (rows `min-h-[64px]`, icon buttons `h-11 w-11`).

---

## 5. Max 12 Concrete UI Additions

1. **Segment tabs** in rail header (All / Unread / Needs attention / AI handled / Resolved) with counts.
2. **Filter chips row** + sort menu, URL-synced.
3. **Rich list row**: unread dot, channel icon (IG), AI status chip, waiting-time badge for open items > 1h.
4. **Bulk-select mode**: checkbox on hover / long-press mobile, sticky action bar (Resolve, Snooze, Assign, Mark read).
5. **Thread header actions**: Resolve toggle, Snooze menu (1h/3h/tomorrow/custom), Assign menu, Info toggle, overflow (Mark unread, Block, Copy link).
6. **Date separators + delivery ticks + read receipts** in message stream; role labels for AI vs human agent.
7. **AI reasoning chip** under AI messages ("Used: FAQ.pdf, 2 products") that expands inline.
8. **Suggested replies strip** above composer: 3 AI-generated chips (Insert / Send).
9. **Composer upgrades**: multiline auto-grow textarea, AI-draft toggle, `/` quick-replies menu, char counter, Cmd/Ctrl+Enter to send, emoji trigger.
10. **Optimistic send with sending/failed/retry** states per message.
11. **Right-side Customer/Context panel** (desktop): profile, first seen, tags editor, linked products, internal notes tab, event timeline.
12. **Empty & error states**: illustrated no-selection panel, "no matches" state with Clear filters, connection-lost banner with Reconnect.

---

## 6. Waits for Backend / Realtime

- Real segment/filter counts (currently derived client-side from mock).
- Server-side search + pagination (`?cursor=`); infinite scroll instead of client filter.
- Websocket/SSE stream for new messages, typing indicators, presence, delivery/read receipts.
- Message send endpoint with ack + failure semantics (drives sending/failed states for real).
- AI suggested replies endpoint (`POST /api/ai/suggest`).
- Snooze / resolve / assign / tag / note / block endpoints.
- Attachment upload pipeline.
- Persisted per-user view prefs (default segment, density, panel open).
- Channel health signal to gate composer (already partially in dashboard mock).
- Audit/event timeline source for the Customer panel.

Frontend will ship all of the above behind a `conversationsMock.ts` fixture with the same state toggles as the dashboard pass (`?convState=loading|error|empty`), so swapping to real endpoints later is a data-layer change only.

---

Reply **approved** (or with edits: e.g. drop items, tighten segments, defer the Customer panel to a later pass) and I'll ship it as one grouped diff.
