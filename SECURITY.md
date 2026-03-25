# Security Overview — Working Holiday Tax CRM

## Authentication
- Password is hashed with PBKDF2-SHA256 (100,000 iterations) — stored as env var `CRM_PASSWORD`
- Two-factor login: password → OTP email (10-minute expiry, one-time use)
- OTP is hashed with SHA-256 before storage; verified with `timingSafeEqual`
- Session: HMAC-SHA256 signed cookie (`crm_session`), `httpOnly`, `secure`, `sameSite=strict`
- Session TTL: 8 hours

## Brute-Force Protection
- Redis-backed lockout after 5 failed password attempts (30-minute lockout)
- Security alert email sent to admin on lockout
- Public form routes: in-memory rate limiting (5 req/min per IP per instance)

## Security Headers (all routes)
- `Content-Security-Policy`: nonce-based, per-request, no `unsafe-inline` for scripts
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Permissions-Policy`: camera, mic, geolocation, payment all blocked
- CRM and API routes: `X-Robots-Tag: noindex, nofollow`

## Input Protection
- All public form inputs sanitized and length-capped (`form-protection.ts`)
- Honeypot field on all public forms
- File upload validation: type, size, magic bytes
- Parameterized SQL via `@vercel/postgres` tagged template literals (no injection risk)

## Environment Variables Required
```
POSTGRES_URL=
REDIS_URL=
CRM_PASSWORD=
CRM_ADMIN_EMAIL=
RESEND_API_KEY=
JWT_SECRET=
```

## Known Limitations
- OTP stored in module memory — works reliably on single warm Vercel instance.
  Upgrade to Redis for strict multi-region reliability.
- Form rate limiting is per-serverless-instance; upgrade to Redis for global enforcement.
