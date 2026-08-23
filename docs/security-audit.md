# Conveero Frontend Security Audit

Scope: this repo only (React/Vite SPA). The backend at `https://instaai-saas.onrender.com`
is external and was not audited — several findings can only be fully fixed there.

## Findings

### Critical
1. **Demo/dev auth bypass reachable in production** — `src/components/layout/AppLayout.tsx`
   (`hasDemoBypass`), `src/pages/Login.tsx` (`showDevBypass` returned `true` unconditionally).
   Anyone could set `conveero_dev_bypass=1` or visit `?demo=1` and load the dashboard shell.
   **Fixed:** both are now gated behind `import.meta.env.DEV`.

### High
2. **JWT stored in `localStorage`** — `src/lib/api.ts:11`, `src/pages/AuthCallback.tsx:12`.
   Readable by any XSS payload. Fix requires the backend to issue the session as an
   `HttpOnly; Secure; SameSite=Lax` cookie and the client to send `credentials: 'include'`
   instead of an `Authorization` header.
3. **Token delivered in the URL query string** — `/auth/callback?token=...`. Tokens land in
   browser history, referrers and server logs. Fix: cookie-based callback, or at minimum
   strip the query with `history.replaceState` immediately after reading it.
4. **No token expiry / refresh handling** — the client only reacts to a 401 (`api.ts:58`).
   Add expiry checking and a refresh endpoint, or rely on cookie-based rotation.
5. **`dangerouslySetInnerHTML` with runtime HTML** — `src/app/ditto/DropdownMenu.tsx:70`.
   Currently only static captured markup, but it is an XSS sink if that data ever becomes
   dynamic. Replace with real JSX or sanitize with DOMPurify.

### Medium
6. **No Content Security Policy / security headers** — `index.html` and hosting config.
   Add CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
   `Referrer-Policy: strict-origin-when-cross-origin`, HSTS at the host/CDN layer.
7. **Client-side-only access control** — routes are guarded in `AppLayout`, and plan/tier
   gating is presentational. Every permission and subscription-tier check must be enforced
   server-side; the frontend guard is UX only.
8. **PII logged to console** — `src/components/landing/Footer.tsx:49` logged newsletter
   emails. **Fixed** (log removed).
9. **No client-side rate limiting / lockout feedback** on auth forms
   (`Login.tsx`, `ForgotPassword.tsx`). Rate limiting must be enforced backend-side; the UI
   should surface 429 responses.
10. **`alert()` exposing raw PayPal subscription ID** — `src/pages/Billing.tsx:116`.
    Replace with a toast and verify the subscription server-side via webhook before granting
    access.
11. **No error monitoring** (Sentry/LogRocket) is configured.

### Low
12. **Inconsistent input validation** — `zod` is a dependency but auth forms validate ad hoc
    (`ResetPassword.tsx` checks length only; `Login.tsx` has no validation). Standardize on
    zod schemas: trimmed email, max lengths, password strength.
13. **File upload validation is client-side only** — `src/pages/AIKnowledge.tsx` checks
    `accept=".pdf"` and `MAX_FILE_SIZE`. The backend must re-validate MIME type and size.
14. **Unvalidated URL params** used for UI state (`Settings.tsx:39`, `Conversations.tsx:98`).
    Not injectable (React escapes), but values should be whitelisted before use.
15. **PayPal client ID hardcoded** — this is a publishable identifier, acceptable in the
    client. No private keys or `.env` secrets were found in the repo.

## Verified clean
- `npm audit`: no high/critical dependency vulnerabilities.
- No hardcoded API keys, secrets or `.env` files committed.
- `logout()` clears all app-scoped `localStorage` keys (`api.ts:18`).
- Error handling already suppresses backend detail: only whitelisted status codes surface a
  short message, everything else returns a generic string; verbose logging is `import.meta.env.DEV`-only (`api.ts:63-73`).
- All API traffic uses HTTPS.
- No `eval`, no untrusted third-party scripts (PayPal SDK only, loaded from paypal.com).
- Responsive/mobile layout does not bypass any auth guard; no camera/geolocation APIs used.

## Checklist for future development
- [ ] Never store tokens or PII in `localStorage`/`sessionStorage`.
- [ ] All new routes under `AppLayout`; treat frontend guards as UX only.
- [ ] Validate every form with a zod schema (trim, max length, format).
- [ ] Never `console.log` user input, tokens, or API payloads outside `import.meta.env.DEV`.
- [ ] No `dangerouslySetInnerHTML` without DOMPurify.
- [ ] Any new dev/demo shortcut must be wrapped in `import.meta.env.DEV`.
- [ ] Re-validate file uploads (type + size) on the server.
- [ ] Run `npm audit` before each release.
- [ ] Surface 429s from the backend rather than retrying silently.

## Recommended next steps
1. Move the session to `HttpOnly` cookies (removes findings 2 and 3 at once).
2. Add CSP + security headers at the hosting layer.
3. Add Sentry with PII scrubbing enabled.
4. Confirm backend CORS allows only the production and preview origins.
