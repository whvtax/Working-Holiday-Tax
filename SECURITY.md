# Security Overview — Working Holiday Tax CRM (v4 — All Findings Patched)

## Patch Log (v3 → v4)

| # | Severity | File | Fix |
|---|----------|------|-----|
| 1 | **Critical** | `src/app/crm/dashboard/DashboardClient.tsx` | All state-changing `fetch()` calls now include `X-Requested-With: XMLHttpRequest` header. Previously every PATCH and DELETE from the dashboard was failing with 403 because `requireAuthAndCsrf()` on the server checks this header but the client never sent it. Added `CSRF_HEADERS` constant used by all 11 mutating fetches. |
| 2 | **Critical** | `src/app/crm/client/[id]/ClientPageClient.tsx` | Same CSRF fix applied — all PATCH calls now send `X-Requested-With: XMLHttpRequest`. |
| 3 | High | `src/app/crm/dashboard/DashboardClient.tsx` | `lockAndExit()` now sends `X-Requested-With` on the logout fetch. Also removed `clientId: \`CLT-${Date.now()}\`` in `addClient()` — client ID is now generated server-side via `crypto.randomUUID()`. |
| 4 | Medium | `src/app/api/crm/clients/[id]/notes/route.ts` | Added type check (`typeof notes !== 'string'`) and length cap (`slice(0, 5000)`) on incoming notes value. Previously any non-string could be passed to Postgres directly. |
| 5 | Medium | `src/app/api/crm/clients/[id]/tax-returns/route.ts` | Added `isFinite` + non-negative guard on `refundAmount` (`Number()` of undefined/null/string silently produces NaN or 0). Added year type-check and trim. Added strict `type` enum (`'refund' | 'owed'`). Same validation for DELETE year. |
| 6 | Medium | `src/app/api/crm/clients/[id]/route.ts` | `add-tax` and `add-super` actions now validate that amounts are finite and non-negative before writing to DB. `notes` action sanitizes to 5000 chars. |
| 7 | Medium | `src/app/api/crm/tasks/[id]/route.ts` | Added action whitelist (`Set<string>`) — unknown actions now return 400 immediately. `notes` action sanitizes to 5000 chars via `String().slice()`. |
| 8 | Low | `src/middleware.ts` | Added `object-src 'none'` and `upgrade-insecure-requests` directives to CSP. Prevents plugin/object injection and ensures all sub-resource requests are upgraded to HTTPS. |

## Patch Log (v2 → v3)

| # | Severity | File | Fix |
|---|----------|------|-----|
| 1 | High | `src/lib/db.ts` | `createTask()` now uses `crypto.randomUUID()` instead of `Date.now()` for task IDs — eliminates collision risk in concurrent serverless invocations and prevents predictable/enumerable IDs |
| 2 | High | `src/app/api/crm/verify-otp/route.ts` | OTP attempt counter now uses Redis `INCR` **before** reading the OTP hash (atomic increment-then-check). Eliminates race condition where two concurrent requests could both read count=0, pass the guard, and each consume an attempt slot |
| 3 | Medium | `src/app/api/crm/session/route.ts` | Polling endpoint now uses `validateSessionAsync()` with Redis revocation check instead of sync-only `validateSession()`. Prevents a logged-out token from returning `ok:true` during the polling interval |
| 4 | Medium | `src/middleware.ts` | Added server-side auth guard for all `/crm/*` and `/api/crm/*` routes. Unauthenticated page requests are redirected to `/crm` (login); API requests return 401. Previously `/crm/dashboard` relied entirely on client-side redirect. Guard uses lightweight sync HMAC check; full Redis revocation check still occurs inside each API route |


## Authentication
- Password hashed with PBKDF2-SHA512 (100,000 iterations) — **pre-computed once at startup** (not per request)
- Two-factor login: password → OTP email (10-minute expiry, one-time use, Redis-stored)
- OTP hashed with SHA-256; verified with `timingSafeEqual`
- Session: HMAC-SHA256 signed cookie (`crm_session`), `httpOnly`, `secure`, `sameSite=strict`
- Session TTL: 8 hours
- **Session revocation**: each session token includes a `jti` (UUID). On logout, jti is added to Redis `crm_revoked_sessions` set. All authenticated routes check this set via `validateSessionAsync()`.
- **Server-side middleware guard**: `/crm/*` routes redirect unauthenticated users at the edge before any page/API handler runs.

## Brute-Force Protection
- Redis-backed lockout after 5 failed password attempts (30-minute lockout)
- **Per-IP scoped** counters (`crm_pw_attempts:{ip}`) + global lockout key
- Rate-limit check runs **before** any cryptographic work
- Security alert email sent to admin on lockout (includes source IP)
- OTP: **atomic INCR-first** counter — race condition eliminated. Lockout after 5 incorrect attempts.
- Public form routes: Redis-backed global rate limiting (5 req/min per IP, falls back to in-memory)

## CSRF Protection
- All state-changing CRM endpoints (PATCH, DELETE, POST) require `X-Requested-With: XMLHttpRequest` header via `requireAuthAndCsrf()`
- Session cookie is `sameSite: strict` as additional layer

## Security Headers (all routes)
- `Content-Security-Policy`: nonce-based, per-request, **no `unsafe-inline`** for scripts OR styles
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Permissions-Policy`: camera, mic, geolocation, payment all blocked
- CRM and API routes: `X-Robots-Tag: noindex, nofollow`

## Input Validation
- All public form inputs sanitized and length-capped (`form-protection.ts`)
- Honeypot field on all public forms
- `isValidPhone()` called on all phone fields (waNumber, auPhone, whatsapp)
- `isValidTfn()` enforces Australian TFN format (NNN NNN NNN)
- File upload validation: type, size, magic bytes including **HEIC/HEIF ftyp box check** at offset 4
- Parameterised SQL via `@vercel/postgres` tagged template literals (no injection risk)

## ID Generation
- `crypto.randomUUID()` used for all IDs: clientId, task ID, session jti — never `Date.now()`

## Session Security
- Logout triggers server-side token revocation via Redis
- Session polling endpoint validates against Redis revocation list (async)

## Audit Log
- All CRM reads/writes logged to `crm_audit_log` Postgres table
- Includes: action, resource_id, timestamp

## Seed Endpoint
- Disabled unless both `NODE_ENV !== 'production'` AND `ENABLE_SEED=true` are set

## Demo Data
- All demo PII uses obviously fake values: TFN `000 000 000`, emails `*@example.invalid`, names `Demo User N`

## Known Remaining Limitations
- Uploaded files (bank statements, passports) are validated but **not yet stored** — Vercel Blob / S3 integration required
- PII fields (TFN, bank details) stored as plain text — consider application-layer encryption with KMS
- Redis downtime fallback: auth falls back to sync-only check (no revocation); form rate limiting falls back to per-instance in-memory (weaker in serverless). Consider alerting on Redis downtime.

## Environment Variables Required
```
POSTGRES_URL=
REDIS_URL=
CRM_PASSWORD=
CRM_ADMIN_EMAIL=
RESEND_API_KEY=
JWT_SECRET=
PASSWORD_SALT=
```
