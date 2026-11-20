# Authentication and access control report: WILL MIA ATLAS

Evidence: `src/app/api/crm/login`, `verify-otp`, `logout`, `src/lib/crm-store.ts`, `src/lib/will/auth.ts`, `src/proxy.ts`, all Mia and Atlas route files.

## Controls verified in code
- **Login is OTP-based.** A pre-auth id is set in an `httpOnly`, `secure` (production), `sameSite: strict` cookie (`crm_preauth`).
- **Attempt limits.** Login counts failed attempts per client IP with a Redis lockout (`MAX_ATTEMPTS`). OTP verification allows 5 attempts (`OTP_MAX_ATTEMPTS`) with a TTL. Blocked attempts are logged in a throttled way.
- **Session token.** HMAC-SHA256 signed claims with a session id (`sid`) and an 8-hour lifetime (`ADMIN_SESSION_TTL`). Verified with a constant-time comparison.
- **Revocation.** Logout revokes the session id. A global "revoked before" epoch is available. The state is in Redis, with a local cache. Revocation checks use a fresh read on sensitive routes (`validateSessionFresh`).
- **Cookie flags.** `crm_session` is `httpOnly`, `sameSite: strict`, `secure` in production, `path: /`, and `maxAge` 8 hours.
- **Authorization on every Mia and Atlas route.** `sessionValid()` is the first call in each handler.
- **Cross-site guard.** Mutations on `/api/crm`, `/api/will`, `/api/atlas`, and now `/api/mia` are refused when the browser headers show a cross-site origin.
- **Atlas actions need a human click.** The model proposes, the owner presses Approve.

## Findings
- **AUTH-1 (Low, verified):** `/api/will/seed` checks only the session, so any logged-in session can run the seed or overwrite templates. Mitigated by an audit record now written on each overwrite. See WMA-02.
- **AUTH-2 (Low, LIKELY):** There is one owner account, and the second factor is an email code. If the owner's email is compromised, the CRM is exposed. This is an operational risk, outside the code.
- **AUTH-3 (Info):** Session lifetime is 8 hours. This is a product choice. Shorter lifetimes would reduce exposure on shared devices.

## Not verified
- Whether the owner's email has two-factor authentication enabled.
- Redis availability: if Redis is down, the revocation and lockout checks behave as coded (not tested live).
- Whether `JWT_SECRET` is strong and unique in production. Only its presence and use were confirmed in code.

## Tests
- Existing tests cover login lockout, OTP limits, session signing, and cross-site guard behaviour (see TEST_COVERAGE_REPORT.md). The new guard test covers Mia.
