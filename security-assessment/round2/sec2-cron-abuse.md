# Round 2: sec2-cron-abuse (cron, email, WhatsApp recipients, rate limiting, cost, env, security-watch)

Method: code trace plus local jest with synthetic data. No network, no production, no secrets read or printed. Builds on `parts/sec-will-cron-ir.md` and `parts/sec-api-logic.md` (round 1); nothing below repeats a round 1 finding unless it is closed here.

## Summary

| ID | Sev | Status | Title | Disposition |
|---|---|---|---|---|
| R2-1 | Low | Confirmed | Limiter hardening: unbounded in-memory fallback, non-numeric Redis reply read as "not limited" | Fixed |
| R2-2 | Medium | Confirmed | Upload byte budget failed open when Redis was down (round 1 F-5); body buffered before size check; two-step EXPIRE could leave a key with no TTL | Fixed |
| R2-3 | Medium | Confirmed | IPv6 client can rotate the low 64 bits and get a fresh bucket on every form and upload limiter | Fixed |
| R2-4 | Low | Confirmed | WhatsApp numbers (E.164) used verbatim as Redis rate-limit keys (third party, PII) | Fixed |
| R2-5 | Medium | Confirmed | `/api/crm/verify-otp` is unauthenticated and created a Redis counter per forged pre-auth id: unbounded key creation and write amplification | Fixed |
| R2-6 | Low (availability) | Confirmed | TFN, ABN and super forms limited to 5 per IP per 15 minutes: the sixth person in a hostel is refused (the tax form was fixed for this on 5 Sep, these three were not) | Fixed |
| R2-7 | Low | Confirmed | `sendSecurityEmail` ignored a non-2xx Resend reply, so "new device" and "bank details changed" alerts could be silently dead | Fixed (status logged) |
| R2-8 | Info | Confirmed | Cron auth: verified fail-closed for every missing or empty secret; now pinned by tests | Tests added |
| R2-9 | Info | Suspected | Weak `CRON_SECRET` or `JWT_SECRET` (short) is accepted | Proposal, not applied |
| R2-10 | Info | Confirmed | Funnel endpoint: 5 events per IP per window drops analytics for a shared IP; analytics only | Not changed |

No Critical or High finding in this scope.

## Refuted suspicions (checked, no finding)

- **Cron fail-open on missing secret.** `cronAuthorized` and `cronAuthMethod` (`src/lib/will/auth.ts`) require the env value to be truthy before comparing, compare with `timingSafeEqual` after a length check, and reject empty header values. Tried: both unset, empty string, `Bearer undefined`, `Bearer ` (trailing space), `x-cron-secret: null`, wrong scheme, lowercase scheme, same-length near miss, cron secret in the wrong header, will secret as bearer. All refused (`sec2-cron-auth.test.ts`, 26 cases). Session fallback relies on `validateSession`; a forged cookie is refused.
- **Other cron routes / second scheduler.** `vercel.json` has one cron (`/api/will/tick`, every 5 minutes). Every other `/api/will/*` route except the Meta webhook is session guarded (`api-route-auth-inventory.test.ts` passes). The tick route checks `cronAuthorized()` before any work (asserted by test as ordering).
- **Header or recipient injection in email.** Three Resend callers only (`crm/login/route.ts` x2, `security-watch.ts`). JSON body, recipient from `CRM_ADMIN_EMAIL`, fixed `from`, constant subjects, no `reply_to`, no customer-controlled field anywhere in a staff email. The only interpolated values are a numeric OTP, a count, a server-formatted time, and (new-device mail) UA/city/country/IP, which are either mapped to a fixed vocabulary or HTML-escaped. Tested with `<img onerror>`, `<script>`, `"><svg onload>` in UA, `x-vercel-ip-city` and country, plus CRLF in the subject.
- **Customer text into staff email.** None exists: Will's staff notifications are tasks in the CRM, not email.
- **WhatsApp recipient provenance.** `sendWhatsAppText` and `sendWhatsAppTemplate` take the stored customer wa_id, strip to digits, and the decide schema has no recipient field (round 1). The public forms only look a number up (`findCustomerByPhone`); they never send to the typed number, and an unmatched number becomes a CRM task. Template parameters are stripped of newlines/tabs and capped.
- **Regex DoS in validators.** `validateIntake`, `isValidEmail` inputs are capped at 100 characters by `sanitiseShort` before they reach any regex; `foreignBankNumbers` bounded quantifiers, tested with 40 KB hostile input (linear). No finding.
- **Model-call cost.** Daily global budget `aiBudgetExhausted` uses an atomic RPC and fails CLOSED on any RPC error (`store-supabase.ts:1085-1094`). Per-sender 40 and global 400 inbound per window behind a verified Meta signature. Media download capped at 8 MB (declared and actual). Mining capped (5 per window, 100 conversations). The `catch { overBudget = false }` sites at `service.ts:2201,2490` only trigger when the budget function itself throws, which it does not (it catches internally): accepted, noted.
- **HEIC/image cost.** Compression is client-side only; the server-side HEIC decode (`crm/file`) is staff-only and already pixel-guarded by `heic-guard.ts` (another round 2 agent).
- **Env and secrets.** No `NEXT_PUBLIC_` secret: only Supabase URL, Meta app id, Featurable widget id (public by design). No secret literal in `src` or `config` (pattern grep). `PASSWORD_SALT`, `JWT_SECRET`, `CRM_PASSWORD` throw when missing (login returns 500, fails closed). `SEED_ENABLED` is double guarded by `NODE_ENV`. Demo follow-up timing refuses to run in production. Resend failures log status or error objects only, never headers or keys.

## Findings

### R2-1 Limiter hardening (Low, Confirmed, fixed)
Evidence: `src/lib/rate-limit.ts` (old purge only removed expired entries; `count > max` with a non-number `count`). Attack: with Redis down, an attacker sending many distinct keys inside one 15 minute window grew the map without bound and made every later call an O(n) scan. Separately, a Redis EXEC returning an error object compared as `NaN > max` which is false: "not limited" while Redis is up but unhealthy. Impact: memory and CPU pressure on a warm instance; a limiter silently off. Fix: hard cap of 5000 keys (expired first, then oldest), `typeof count !== 'number'` falls back to memory. Test: `sec2-rate-limit-abuse.test.ts` (flood of 6500 keys stays at or under 5000; error reply and thrown error both still limit; an active limited key survives a 1000-key flood). Residual: the memory fallback is per instance, so the effective limit is N x limit across N warm instances. That is the deliberate degrade-not-deny posture (a real customer must still submit); see "decision for Jo" below.

### R2-2 Upload byte budget (Medium, Confirmed, fixed; closes round 1 F-5)
Evidence: `src/app/api/tax-form/upload/route.ts` (was `catch { /* fail open */ }`, `if (used === body.byteLength) expire`). Attack: with Redis unreachable, 100 requests x 10 MB per IP per window (about 1 GB) into the private bucket that holds identity documents; and if the process died between INCRBY and EXPIRE the key had no TTL and blocked that IP permanently. Impact: storage cost, bucket noise, possible quota exhaustion. Fix: new `consumeByteBudget` (Redis `MULTI INCRBY` + `EXPIRE NX`, degrades to a bounded per-instance counter, never throws); route refuses a declared Content-Length over 10 MB before buffering, with the same 400 message as before. Compatibility: 120 MB per IP per 15 minutes is unchanged; a hostel of ten people uploading 10 MB each (100 MB) passes (tested); per-instance counting under-counts, so it blocks less than Redis would. Test: `sec2-rate-limit-abuse.test.ts` (R2-2 group, 5 cases), `tax-form/upload/__tests__/sec2-budget.test.ts` (3 cases). Residual: orphaned uploads never linked to a submission still need a bucket lifecycle rule (infrastructure).

### R2-3 IPv6 rotation (Medium, Confirmed, fixed)
Evidence: `get-ip.ts` returns the full address; `isRateLimited(ip, ...)` keyed on it; `lockoutScope` (login) already collapses to /64 but the form and upload limiters did not. Attack: a client with a /64 (the normal residential and mobile allocation) sends each request from a different address and never hits the 5, 30 or 100 per window limits, nor the byte budget. Impact: the public forms, upload endpoint and mining limiter are unbounded per client; CRM task spam, storage fill. Fix: `ipRateLimitScope` / `getRateLimitIp` (IPv6 to /64, IPv4-mapped to IPv4, IPv4 and `unknown` byte-identical), used by tax-form, tax-form upload, TFN, ABN, super, funnel and will/mine. Test: `sec2-rate-limit-abuse.test.ts` (7 of 10 rotated addresses limited at max 3), the existing `security-fixes.test.ts` `getClientIp` cases unchanged. Residual: whether Vercel overwrites `x-real-ip` and `x-forwarded-for` is an ingress property (not assessable here); a /48 or /56 holder can still use 256 to 65536 buckets.

### R2-4 PII in rate-limit keys (Low, Confirmed, fixed)
Evidence: `webhook/route.ts:768,882` pass `msg.from` (E.164) to `isRateLimited`, producing `rl:will_inbound:<number>` in Redis. Round 1 hashed only the tax-form key. Fix: `rateLimitIdentity` hashes phone-shaped, email-shaped and over-long identifiers inside `isRateLimited`, so every present and future caller is covered; IPs, `all`, `<ip>:<hash>` pass through. Effect on deploy: per-sender counters reset once. Test: key sent to the fake Redis contains no digits of the number; same number same key; different numbers different keys.

### R2-5 verify-otp key creation by anonymous callers (Medium, Confirmed, fixed)
Evidence: `src/app/api/crm/verify-otp/route.ts` (before): `redis.incr(crm_otp_attempts:<id>)` and `expire` ran before checking that an OTP exists for the id, and the id is any 48 hex characters from a cookie the caller controls. Attack: a script POSTing `{code}` with a random `crm_preauth` each time creates one Redis key per request (TTL 600 s) with no IP limit. Impact: Redis memory and command-quota burn on a shared Upstash instance that also backs the login lockout and the rate limiter, so exhaustion would also push the login and every form into their failure paths. No credential exposure. Fix: look the OTP up first; an id that was never issued returns 401 and performs no write. The 5-guess limit is unchanged (sixth is 429 and burns the code, then even the right code fails). Test: `crm/verify-otp/__tests__/sec2-otp-keys.test.ts` (4 cases). Residual: still no per-IP request limit on this endpoint (request volume, not state); proposal below. Not applied because a per-IP lock could lock out the only operator on a shared network and that is a product decision.

### R2-6 TFN, ABN, super form per-IP limit (Low, availability, Confirmed, fixed)
Evidence: `isRateLimited(ip, 'tfn-form')` default 5 per 15 minutes (same for abn-form, super-form); the tax-form route comment documents the hostel problem. Fix: per-/64 ceiling 30 (`<form>-ip`), plus 5 per person keyed `<ip>:<hash of digits or email>` (no PII in key). A single abuser is still capped at 30 per window; the rotating-person bypass is bounded by that ceiling. Test: `api/__tests__/sec2-form-ratelimit.test.ts` (9 cases).

### R2-7 Security alert delivery unobserved (Low, Confirmed, fixed)
Evidence: `security-watch.ts sendSecurityEmail` awaited fetch and discarded the response. A revoked key or unverified domain returns 4xx and the alert is lost with no trace. Fix: log the status code only. Test: `sec2-security-email.test.ts` (6 cases, includes no key and no recipient in the log, no send when env missing, network error never throws).

### R2-8 Cron auth (Info, Confirmed, tests only)
See refuted list. Residual: Vercel passes `Authorization: Bearer $CRON_SECRET` only if the variable is set in the project; `/api/will/health` already reports `CRON_SECRET missing` (`health/route.ts:167-174`). Live value and presence not assessable.

### R2-9 Weak secrets accepted (Info, Suspected)
`cronAuthorized` accepts any non-empty `CRON_SECRET` (a value like `test` works). `crm-store.jwtSecret` only warns below 32 characters (`AUTH2-09`, another agent). `form-token.ts` already treats under 32 as disabled. Proposal (not applied: if production holds a shorter cron secret, enforcing would stop the scheduler): in `cronAuthorized`, ignore a `CRON_SECRET` shorter than 16 characters after surfacing a red health dot for one release. Verify in the Vercel dashboard first.

### R2-10 Funnel limit (Info)
`/api/analytics/funnel` allows 5 events per IP per window; the form sends up to 4 per person, so a shared IP loses analytics after the second person. Not a security issue; fail is silent by design. Left unchanged.

## security-watch.ts review
- Escaping correct on every interpolation; device label from a fixed vocabulary; masked IP (v4 `a.b.c.x`, v6 first three groups).
- Weakness (Info): the new-device key is browser + OS + country, so a thief on the same browser, OS and country as the operator raises no alert; the first ever login after the settings key is cleared is silent; known-device read/modify/write is not atomic (a race can only cause a duplicate alert). Accepted; a stronger device binding would change the login UX.
- Bank constants (`OUR_BSB`, `OUR_ACCOUNT`) are public business details, duplicated in code (round 1 F-13).
- Alert delivery now observable (R2-7). Alerting remains pull-based for most signals (round 1 F-06).

## Decisions for Jo
1. Fail-open vs fail-closed when Redis is down: the code now degrades to a bounded per-instance limiter everywhere a customer is involved (forms, uploads, WhatsApp inbound) and fails CLOSED where only the operator is involved (login and OTP return 500 without Redis). I recommend keeping this split. A true fail-closed form would turn a Redis outage into a total loss of lead capture.
2. Optional: a per-IP request limit on verify-otp (for example 60 per 15 minutes). Cheap, but on a shared network an attacker could burn the operator's budget; recommend only if login traffic is observed from unknown IPs.

## Files changed
- `src/lib/rate-limit.ts`, `src/lib/get-ip.ts`, `src/lib/security-watch.ts`
- `src/app/api/tax-form/upload/route.ts`, `tax-form/route.ts`, `tfn-form/route.ts`, `abn-form/route.ts`, `super-form/route.ts`, `analytics/funnel/route.ts`, `will/mine/route.ts`, `crm/verify-otp/route.ts`
- Tests added: `src/lib/__tests__/sec2-rate-limit-abuse.test.ts`, `src/lib/__tests__/sec2-security-email.test.ts`, `src/lib/will/__tests__/sec2-cron-auth.test.ts`, `src/app/api/__tests__/sec2-form-ratelimit.test.ts`, `src/app/api/crm/verify-otp/__tests__/sec2-otp-keys.test.ts`, `src/app/api/tax-form/upload/__tests__/sec2-budget.test.ts`
- Test mocks updated: `tax-form/upload/__tests__/brand-26oct.test.ts` (mocks `consumeByteBudget`), `will/__tests__/audit3-sched-45.test.ts` (mock gained `ensureRevocationFresh`, which another agent added to `auth.ts`).
- URLs, copy, translation keys, the questionnaire and visual design untouched. SVT remains host-routed and isolated; no CRM or WHT code path was changed for SVT.

## Verification
- Targeted jest: new suites 6 files, all passing; surrounding suites (`src/lib/__tests__`, `src/app/api`, webhook, send-rate-limit, audit3-sched-45/70, sec-webhook-edge-cases) 892 of 894 passed at the last full run.
- One failing test is not from this work: `src/lib/__tests__/upload-dangerous.test.ts` ("accepts a genuine JPEG and a HEIC-as-jpeg") fails because another agent changed `validateMagicBytes` in `tax-form/upload/route.ts` while I worked.
- `npx tsc --noEmit` (run once): no error in any file I touched. Errors exist in `src/app/(site)/crm/dashboard/DashboardClient.tsx` (a JSX syntax break from another agent's in-progress edit) and a type error in `crm/file/__tests__/heic-bomb.test.ts` (another agent).
- eslint --quiet on changed files: clean.

## Not assessed
Vercel (env values and scoping, whether CRON_SECRET is set, edge header handling for `x-real-ip` and `x-forwarded-for`, WAF and platform rate limits, log retention), Upstash (region, plan limits, eviction policy, whether `EXPIRE NX` is supported by the server version: Redis 7 required, Upstash supports it), Resend (domain, DMARC, key scope, send logs), Meta (app secret, templates, webhook field subscriptions), Supabase (bucket lifecycle for orphaned uploads, quotas), git history, and any dashboards.
