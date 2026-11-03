# sec-auth report: authentication, sessions, CRM/admin access, routes

Static review plus local jest only. No secrets printed, no network use, `npm audit` not run.

## Scope covered
src/proxy.ts, src/lib/crm-store.ts, rate-limit.ts, get-ip.ts, security-watch.ts, will/auth.ts, all 49 route handlers under src/app/api (there are no other route.ts files except 3 SVT static text routes: sitemap.xml, llms.txt, robots.txt, all public by design), all /crm pages, next.config.js headers, config/brand-routing.js. No `'use server'` actions exist.

### Route classification
Auth is per handler. The proxy only sets a nonce CSP on /crm and does no authentication (matcher is /crm only), so nothing depends on middleware (CVE-2025-29927 class is not applicable).

| Class | Routes | Protection |
|---|---|---|
| Public form | tax-form, tfn-form, abn-form, super-form | IP rate limit (5/15min; tax-form 5 per IP+person and 30 per IP), server validation, brand from Host |
| Public upload | tax-form/upload | IP limit 100/15min, 120MB byte budget, MIME allow-list, magic bytes, private bucket assertion |
| Public telemetry/read | analytics/funnel, google-reviews | IP limit / allow-listed events / cached read |
| Login flow | crm/login, crm/verify-otp, crm/logout | password + per-IP lockout, emailed OTP bound to httpOnly pre-auth cookie (5 tries), logout revokes only with a valid session |
| Webhook | will/webhook | GET verify token (timing-safe), POST HMAC-SHA256 over raw body (timing-safe, fail-closed if secret unset), size cap |
| Cron | will/tick | Bearer CRON_SECRET or x-cron-secret (timing-safe), else CRM session; fail-closed |
| Session (crm_session) | crm/clients, clients/[id], clients/[id]/{notes,tax-returns,referral,referral-payment}, clients/search, crm/file, crm/leads, crm/partners, partners/[id], crm/stats, crm/tasks, tasks/[id], crm/version, crm/seed (also disabled in production), will/{actions,audit,chats,export,followups,health,insights/monthly,knowledge,link,media/[id],messages,mine,morning,report,search,seed,state,system,version,whatsapp/connect,whatsapp/inbound-check} | validateSession / sessionValid first statement in every handler |
| Server pages | /crm/dashboard, /crm/partners, /crm/partners/[id], /crm/whatsapp, /crm/whatsapp/connect, /crm/whatsapp/inbound-check | validateSession + redirect (login page /crm is intentionally open) |

Result: no unauthenticated access to any customer data path found. All 49 handlers are either on the public list above or call a session check (now enforced by a test).

## Findings

| ID | Sev | Status | Title |
|---|---|---|---|
| AUTH-1 | Medium (conditional) | Confirmed | Login lockout keyed on full IPv6 address: one attacker can rotate within a /64 and never lock out |
| AUTH-2 | Low | Confirmed | Session revocation is not synchronous: validateSession() is sync, refreshes the revoked-before epoch in the background |
| AUTH-3 | Low | Confirmed | Idle-timeout logout and cookie clearing do not invalidate the token server side (stolen cookie lives up to 8h) |
| AUTH-4 | Medium | Confirmed (documented residual) | Unauthenticated tax-form binds to any customer by phone number: marks their form complete, cancels reminders, can queue Medicare/residency WhatsApp messages |
| AUTH-5 | Low | Confirmed | /api/crm/file served inline without sandbox CSP (carry-over A12-2) |
| AUTH-6 | Low | Confirmed | Public upload endpoint is unauthenticated by design: storage abuse bounded only per IP |
| AUTH-7 | Low | Confirmed | No Origin check on CRM mutating routes (only will/actions has one); relies on SameSite=Strict |
| AUTH-8 | Low | Confirmed | Internal error text returned to authenticated callers (partners routes return Supabase error.message; will/actions returns detail) |
| AUTH-9 | Info | Confirmed | Single shared password, no per-user identity; JWT_SECRET length/entropy not enforced in code |
| AUTH-10 | Info | Confirmed | New-device alert keys on UA string + country only (spoofable); OTP email can be triggered repeatedly by anyone holding the password |
| AUTH-11 | Info | Confirmed | crm_session cookie is Path=/ so it rides on every public request; no __Host- prefix |
| AUTH-12 | Info | Confirmed | Unlisted form URLs (/3cw5w5hcx, /rh84sez58, /vukjw4byf, /y8vwp4bf7) are obscurity only; the APIs behind them are public anyway |
| AUTH-13 | Info | Confirmed | Public refCode accepted on tax-form: anyone can attribute a lead to a partner code; staff review gates the commission |
| AUTH-14 | Info | Carry-over | A12-1: findExistingClient for WHT is not brand-scoped (SVT rows can be matched) |
| AUTH-15 | Info | False positive checked | crm/file path traversal: path check was `..` before decode; another agent already added decode-then-recheck in this copy. Authenticated route, bucket-scoped, so never Medium |

Details
- AUTH-1 evidence: crm-store.ts failKeys/sanitizeScope used the raw IP; get-ip.ts returns full IPv6. Exploit: IPv6 attacker sends password guesses from different addresses of a /64, each a new bucket, so the 3-attempt lockout never triggers (also PBKDF2 100k CPU per guess). Second factor (emailed OTP) still holds, so impact is password disclosure plus OTP email spam to the owner; Medium only if CRM_PASSWORD is weak. Fixed (below).
- AUTH-2 evidence: crm-store.ts validateSession `void refreshRevocation()` (60s), cold instance starts with epoch 0. After "Lock and Exit", a stolen cookie can work on a cold or stale instance for the first request and up to about 60s. Needs cookie theft first. Patch below (not applied: changes every caller).
- AUTH-3: layout.tsx idle logout posts reason:'idle' which deliberately skips revocation. Acceptable trade-off documented by the owner; mitigation is the Lock and Exit button, or a per-session id with a Redis denylist.
- AUTH-4 evidence: form-link.ts applyFormReceived comment states it; gated to PAID/FORM_PENDING states, with audit trail. Needs the victim's phone number and the victim to be mid-flow. Real fix is a completion token in the WhatsApp link (product change). Not changed.
- AUTH-6: could use a short-lived signed upload token issued on form load, or Turnstile-style bot check (not Google-dependent on /zh per checklist). Needs product decision.
- Verified OK: cookie flags (httpOnly, Secure in production, SameSite=Strict, 8h; preauth 10 min), HMAC token with timingSafeEqual and strict exp/iat checks, OTP SHA-256 compare timingSafeEqual and single use, OTP attempts per pre-auth id, no username so no account enumeration (login replies identical shape; forms never reveal existing clients), webhook and cron comparisons timing-safe and fail-closed when secrets absent, seed disabled in production, logout cannot be used anonymously to revoke everyone, SVT host cannot reach /crm or /api except the two allow-listed form routes, brand derived from Host not body, ilike inputs escaped, mass assignment prevented (updateClient whitelists fields), file URLs restricted to the uploads bucket, CSV export neutralises formula cells.

## Fixes applied (project copy)
1. src/lib/crm-store.ts: `lockoutScope()` collapses IPv6 to /64 for the CRM login lockout keys (AUTH-1). IPv4 unchanged.
2. src/app/api/crm/file/route.ts: added `Content-Security-Policy: sandbox; default-src 'none'; ...` (AUTH-5). Note: the same file was concurrently edited by another agent for path decoding; my edit only adds the header.
3. Tests added: src/lib/__tests__/auth-lockout-scope.test.ts, src/lib/__tests__/api-route-auth-inventory.test.ts (fails if a new route under src/app/api has neither a session/cron check nor an entry on the documented public list).

## Patches proposed (not applied)
AUTH-2, make revocation authoritative (Category B). Add and use in routes that serve documents first (crm/file, will/export, will/actions):
```diff
--- a/src/lib/crm-store.ts
+++ b/src/lib/crm-store.ts
@@
+/** Like validateSession, but waits for a fresh revoked-before epoch when the cached one is stale. */
+export async function validateSessionFresh(token: string | undefined): Promise<boolean> {
+  if (!checkToken(token, ADMIN_SESSION_TTL)) return false
+  if (Date.now() - _lastRefresh > REFRESH_MS || _lastRefresh === 0) {
+    _lastRefresh = Date.now()
+    await refreshRevocation()
+  }
+  return validateSession(token)
+}
```
AUTH-7, shared same-origin guard (call at top of every POST/PATCH/DELETE after auth):
```diff
+export function sameOrigin(req: Request): boolean {
+  const o = req.headers.get('origin')
+  if (!o) return true
+  try { return new URL(o).host === new URL(req.url).host } catch { return true }
+}
```
AUTH-9: in crm-store.jwtSecret() throw when `s.length < 32` (check the production value first, or this locks everyone out).

## Tests run
- `npx tsc --noEmit`: clean (before and after).
- jest: auth-lockout-scope, api-route-auth-inventory (51), security-fixes: 121 passed. Full `npx jest` not run by me (other agents editing concurrently).

## Not assessed / needs infrastructure access
Whether Vercel overwrites inbound X-Real-IP (affects all IP rate limits and lockout); Redis availability behavior in production (rate limits fail open to per-instance memory); actual strength of CRM_PASSWORD and JWT_SECRET; Supabase RLS and bucket policy (bucket privacy only asserted at runtime); Meta app secret rotation; email deliverability of OTP; npm audit.

## Specialist perspectives
- AppSec/IAM: single-factor-plus-email-OTP admin, strong token handling; weak points are revocation latency and lack of per-user identity.
- Abuse/Fraud: phone-number binding (AUTH-4), refCode attribution (AUTH-13), upload storage abuse (AUTH-6).
- Zero trust: handler-by-handler auth with no central gate; the new inventory test is the compensating control.

## Devil's advocate
- AUTH-1: the /64 collapse could lock out a legitimate owner who shares a /64 with an attacker (mobile carriers). Lockout is 30 min and keyed only after 3 failed passwords, so risk is small; owner can also wait. It does not touch public-form rate limits (get-ip unchanged), so no customer is blocked.
- AUTH-2: real but needs a stolen cookie; fixing makes every request wait for Redis (up to 1.5s timeout), so apply only on sensitive routes.
- AUTH-4: documented and mitigated by state gate; fixing needs a customer-visible link change, so left to the owner.
- AUTH-5: low likelihood, zero functional risk, but a sandbox CSP could stop a browser's built-in PDF viewer in some browsers; the same header already ships on the will/media route, so it is a known-working policy.
