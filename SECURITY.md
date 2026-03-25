# Security Overview — Working Holiday Tax CRM (v2 — Patched)

## Authentication
- Password hashed with PBKDF2-SHA512 (100,000 iterations) — **pre-computed once at startup** (not per request)
- Two-factor login: password → OTP email (10-minute expiry, one-time use, Redis-stored)
- OTP hashed with SHA-256; verified with `timingSafeEqual`
- Session: HMAC-SHA256 signed cookie (`crm_session`), `httpOnly`, `secure`, `sameSite=strict`
- Session TTL: 8 hours
- **Session revocation**: each session token includes a `jti` (UUID). On logout, jti is added to Redis `crm_revoked_sessions` set. All authenticated routes check this set via `validateSessionAsync()`.

## Brute-Force Protection
- Redis-backed lockout after 5 failed password attempts (30-minute lockout)
- **Per-IP scoped** counters (`crm_pw_attempts:{ip}`) + global lockout key
- Rate-limit check runs **before** any cryptographic work
- Security alert email sent to admin on lockout (includes source IP)
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

## Session Security
- `crypto.randomUUID()` used for all IDs (clientId, session jti) — not `Date.now()`
- Logout triggers server-side token revocation via Redis

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
