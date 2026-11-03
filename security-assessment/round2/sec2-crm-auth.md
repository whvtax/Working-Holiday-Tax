# Round 2: sec2-crm-auth (CRM login, sessions, CSRF, route coverage, customer text in the CRM UI)

Method: code trace of every file in scope plus synthetic jest tests (fake Redis, mocked Supabase, no network, no secrets, no real data). Builds on round 1 (parts/sec-auth.md, 12-final review). Not repeated: AUTH-1 to AUTH-15 except where noted.

## Findings

| ID | Sev | Status | Title | State |
|---|---|---|---|---|
| AUTH2-01 | Low-Medium | Confirmed | Origin check on will/actions failed open for `Origin: null` and malformed values; no check at all on every other mutating CRM/Will route (login, knowledge, seed, whatsapp/connect, clients DELETE, partners DELETE) | Fixed |
| AUTH2-02 | Medium (conditional) | Confirmed | Login lockout race: lockout was checked, then the password verified, then the failure recorded. A parallel burst passed the check together and got N guesses instead of 3 | Fixed |
| AUTH2-03 | Low | Confirmed | Locked-out attempts wrote one audit row each, unauthenticated and unbounded (log flooding, evidence dilution) | Fixed (1 per minute per IP) |
| AUTH2-04 | Low | Confirmed (was AUTH-3) | Idle logout only cleared the cookie; a copied cookie stayed valid 8h | Fixed (per-session id) |
| AUTH2-05 | Low | Confirmed (was AUTH-2) | Revocation checked against a stale or empty cache on cold instances | Fixed (validateSessionFresh) |
| AUTH2-06 | Low | Confirmed | referral PATCH passed an unvalidated `partnerId` (any JSON) to PostgREST and returned Supabase `error.message`; partners, partners/[id], referral-payment also returned raw DB error text | Fixed |
| AUTH2-07 | Low | Confirmed | Bulk exports (will/export ?all=1, crm/leads csv) left no audit trail, so a stolen session could download everything silently | Fixed (audit row) |
| AUTH2-08 | Low | Confirmed | Only per-IP login throttle; distributed guessing against the single shared password is unbounded in aggregate (OTP still required) | Proposal |
| AUTH2-09 | Info | Confirmed | JWT_SECRET strength unenforced | Warn-only log added; enforcement in proposal |
| AUTH2-10 | Low | Confirmed | CRM nonce CSP still allows `*.supabase.co`, GA, Resend in connect-src/img-src: exfil channel if an XSS sink ever appears. No sink found today | Proposal |
| AUTH2-11 | Low | Confirmed | Client-side CSV exports (clients, partners) had no formula guard; names/notes come from public forms | Fixed by the parallel frontend agent (src/lib/csv.ts, wired in DashboardClient/PartnersClient); I only verified the helper |
| AUTH2-12 | Info | Confirmed | fetchWaMedia sends the WhatsApp bearer to whatever URL Meta returns, no host check | Proposal |
| AUTH2-13 | Info | Confirmed | No staff roles: every session can delete clients, set kill switch, connect WhatsApp, export all. Single-owner design; object-level authz is N/A | Accepted |
| AUTH2-14 | Info | Confirmed | Hard DELETE of clients and partners with one request and no soft delete (UI has a confirm dialog, API does not) | Accepted, note for retention work |

Evidence and attack paths
- AUTH2-01: actions/route.ts (old lines 453-458) `new URL('null')` throws and the catch ignored it. Attacker: a sandboxed iframe or data: page on any origin, or a page on a sibling subdomain (same-site, so SameSite=Strict still sends the cookie), posts to /api/will/whatsapp/connect with their own token and takes over the WhatsApp channel, or to /api/crm/clients/[id] DELETE. Test: request-guard.test.ts (13 cases including proxy invocation). Fix: src/lib/request-guard.ts, enforced centrally in src/proxy.ts (matcher now also /api/crm/* and /api/will/*) and again in will/actions. Browser-less callers (Meta webhook, Vercel cron, curl) send neither header and pass. Residual: non-browser clients with a stolen cookie are unaffected, as intended.
- AUTH2-02: login/route.ts old order isLockedOut, verifyPassword (sync PBKDF2), recordFailed. Test round2-auth.test.ts: 30 parallel wrong passwords now call verifyPassword at most 3 times; crm-store test: 20 parallel reservations allow exactly 3. Residual: many IPs; see AUTH2-08.
- AUTH2-04/05: crm-store.ts. Tokens now carry `sid`; `revokeSession` writes a sorted set in Redis; `validateSessionFresh` awaits a refresh (max 1.5s, once per 60s per instance) and is used by every crm route and by will `sessionValid` (all Will routes and the cron fallback). Tests: cold instance rejects a revoked token on the first check; one revoked session dies on all instances while a second survives; Redis down degrades to in-memory without error. Deliberate fail-open on Redis outage (sessions cannot be minted without Redis, and failing closed would lock the owner out of the live system). Tokens issued before deploy have no sid and stay revocable only by Lock and Exit. Dashboard pages still use the sync check; they only gate navigation, data comes from the fresh-checked APIs.
- AUTH2-06/07: tests in round2-auth.test.ts (DB error text absent from responses, injection-shaped partnerId rejected, leads export neutralises `=1+1` and audits). Left unchanged on purpose: leads route still returns `detail` (Jo wanted the reason on screen; authenticated).

## Verified safe (no finding)
- Password and OTP compares are timingSafeEqual; token HMAC compare timing-safe; exp/iat strictly numeric. OTP is crypto.randomInt, 8 digits, bound to a 192-bit crypto.randomBytes pre-auth id, 5 tries, single use; the attempt counter is atomic INCR so parallel guesses cannot exceed 5. Cookie flags httpOnly, Secure (prod), SameSite=Strict, 8h; logout clears with identical flags. ADMIN_EMAIL unset fails closed (OTP never delivered).
- No server actions exist. Every exported handler under src/app/api (per method, not per file) now has a test that the session check precedes any body read or data access (round2-auth.test.ts, 50+ cases); will/tick and webhook use constant-time secret/HMAC checks and fail closed.
- Mass assignment: updateClient whitelists seven fields with type coercion and length caps; tasks POST rebuilds every field through sanitise helpers; service/tax actions rebuild their objects.
- Proxy gaps: pages under /crm each call validateSession (7 pages); nothing relies on the proxy for authentication. SVT host cannot reach /crm or /api (default-deny rewrites). No crm route exists under locale groups.
- Rendering of stranger text: no dangerouslySetInnerHTML, innerHTML, markdown or linkify anywhere in components/will, components/crm or app/(site)/crm. WhatsApp bodies, profile names, captions and filenames render as React text. Links built from data: wa.me with digits only, media via encodeURIComponent id. The task PDF/print document escapes all fields with esc(). Customer filename in `download=` is overridden by the server Content-Disposition. Media route serves only raster images and PDF inline, sandbox CSP, nosniff. Only Info: bidi control characters in a filename could visually reorder the label; the click target is unaffected.
- Secrets/tokens: the only Math.random uses are a partner-code fallback (public attribution code, not a secret) and retry jitter; ids use randomUUID.

## Files changed
src/lib/request-guard.ts (new), src/proxy.ts, src/lib/crm-store.ts, src/lib/will/auth.ts, src/app/api/crm/{login,logout}/route.ts, all other src/app/api/crm routes (auth helper now awaits validateSessionFresh), crm partners/referral/referral-payment error handling and referral validation, crm/leads and will/export audit rows, will/actions (uses the shared guard). Tests: src/lib/__tests__/request-guard.test.ts, auth-session-revocation.test.ts, src/app/api/crm/__tests__/round2-auth.test.ts; mocks updated in path-hardening, audit3-sched-45, audit3-ui-22.
Proposal: security-assessment/proposals/crm-csp-and-login-hardening/ (PLAN.md, patch.diff).

## Test results
npx tsc --noEmit clean; the new and touched suites pass (68 in src/app/api/crm, 13 request-guard, 7 revocation). Unrelated failures seen from concurrent agents: src/lib/__tests__/upload-dangerous.test.ts and src/lib/will/__tests__/audit3-actions-31.test.ts (db.ts / upload code I did not touch).

## Could not assess
Whether Vercel overwrites inbound X-Real-IP; real Redis behaviour and latency (tests use a fake); production strength of CRM_PASSWORD and JWT_SECRET; Supabase RLS/bucket policy; Vercel dashboard settings and WAF; git history; real-browser behaviour of the new proxy guard and of the proposed CSP (only simulated with NextRequest); email deliverability.
