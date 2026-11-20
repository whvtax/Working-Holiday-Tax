# 05. Authentication audit

Sources: LIB-01, LIB-02, API-01, API-02, SITE-04, TESTS-01, TESTS-02 and the DEBATE files. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- The audit read the authentication code in full (`src/lib/crm-store.ts`, `src/lib/will/auth.ts`, the login, one-time code and logout routes, `src/lib/will/form-token.ts`).
- No login was attempted. No session was created. Redis, email delivery and cookie behaviour in a browser were not observed.

## STATIC ANALYSIS CONCLUSIONS

### Staff login (one account, one role)

| step | control read in code | location |
|---|---|---|
| Password | PBKDF2-SHA512, 100,000 rounds, constant-time compare, input capped at 200 characters, attempt reserved before the check | `src/lib/crm-store.ts:8-19, 243-251`; `src/app/api/crm/login/route.ts:32, 67-73` |
| Lockout | per-IP counters in Redis, IPv6 collapsed to /64; login refuses to run without Redis | `src/lib/crm-store.ts:207-223`; `login/route.ts:43-44` |
| Second factor | 8-digit code from `crypto.randomInt`, stored as a hash for 10 minutes, bound to a random httpOnly pre-auth cookie, 5 tries, deleted on use, constant-time compare; sent to the admin email | `src/lib/crm-store.ts:21-23`; `src/app/api/crm/verify-otp/route.ts:26-80` |
| Session | HMAC-SHA256 signed token, random 128-bit id, numeric expiry enforced, 8-hour ceiling; cookie httpOnly, SameSite=Strict, Secure in production | `src/lib/crm-store.ts:43-72, 142-144`; `verify-otp/route.ts:90-96` |
| Revocation | logout revokes one session or all; data routes use the fresh check | `src/app/api/crm/logout/route.ts:26-40` |
| New-device alert | security email, HTML escaped | `src/lib/security-watch.ts` |

### Machine authentication

| caller | control | location |
|---|---|---|
| Meta webhook (POST) | HMAC-SHA256 of the raw body with the app secret, constant-time; missing secret rejects | `src/app/api/will/webhook/route.ts:154-165, 693-712` |
| Meta webhook (GET handshake) | verify token, constant-time | `webhook/route.ts:136-152` |
| Vercel cron | Bearer cron secret, header secret or session; constant-time; unset secret never matches | `src/lib/will/auth.ts:9-13, 25-33` |

### Customer links (not accounts)

- Signed form token: separate secret from the session secret, MAC verified in constant time before parsing, brand claim, purpose claim, expiry 21 days (7 for a correction), single use recorded by the caller (`src/lib/will/form-token.ts`).
- Customers have no login. Identity on WhatsApp is the sending number as delivered by Meta.

### Findings

| topic | status | rows |
|---|---|---|
| `/api/mia` routes were outside the cross-site guard matcher | FIXED | R001 |
| Lockout is per IP; a global counter was removed on purpose so nobody can lock the owner out | ACCEPTED | R027 |
| Session revocation cache: a failed refresh is treated as fresh for a short time (documented fail-open during a Redis fault) | ACCEPTED | R031 |
| Client IP taken from edge headers | ACCEPTED (platform guarantee assumed) | R032 |
| Eight page gates use the cached session check; the pages render an empty shell and every data route uses the fresh check | ACCEPTED | R184 |
| CRM layout is a client component with no check of its own | ACCEPTED (defence in depth only) | R194 |
| Form token: optional on the tax form until `FORM_TOKEN_ENFORCE=true`; absent on the super form | OPEN | R008, R101, R191 |
| Form token single use is read-then-write; a failed read counts as unused | ACCEPTED | R010, R208 |
| Form token header promised a revocation that does not exist | FIXED (comment corrected) | WILL-06-F12 |
| Fixed temporary password for the customer signing account in two knowledge answers | OPEN (HIGH) | R135 |
| Authentication of most gated routes is proved in tests by source text only | ACCEPTED (backlog test) | R204 |

## HYPOTHESES

- A stolen session cookie is usable from another device until it expires (8 hours) or is revoked. No device binding was read in the code.

## UNVERIFIED ASSUMPTIONS

- `JWT_SECRET`, the password hash, the cron secret, the Meta app secret and the form-token secret are long, random and held only in the hosting environment.
- The admin mailbox that receives the one-time code is itself protected by a second factor.
- Redis is reachable in production; without it login fails closed.

## NOT TESTED

- Brute-force limits, parallel guesses, cookie flags in a real browser, expiry at 8 hours, revocation across instances, and replay of a used one-time code. Tests for several of these exist in the suite (file 18) but were not used as evidence.
