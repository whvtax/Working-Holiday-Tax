# Security findings: WILL MIA ATLAS (code review, 17 Nov 2026)

Scope: the repository as it is on disk. No Supabase, Vercel, GitHub settings, or live traffic were available, so nothing below was tested against a running system. Every status is tied to the code that was read. Customer data was not read or copied. Secret values were not printed.

Status key: VERIFIED = seen in code and confirmed by reading the surrounding lines. LIKELY = strong code evidence, needs a live check. UNVERIFIED = cannot be checked from the repository. FALSE POSITIVE = a scanner flag that the code does not support.

| ID | Title | Severity | Status | Area |
|---|---|---|---|---|
| WMA-01 | `/api/mia/*` is not in the cross-site request guard | Medium | VERIFIED | API / CSRF |
| WMA-02 | `/api/will/seed` can overwrite templates on any logged-in session | Medium | VERIFIED | API / business data |
| WMA-03 | Tax-form and upload files sit in a bucket addressed by public URL | Medium | VERIFIED in code, bucket setting UNVERIFIED | Storage / privacy |
| WMA-04 | Next.js below the fixed version (one moderate advisory, production dependency) | Medium | VERIFIED | Supply chain |
| WMA-05 | `Math.random` builds the partner referral code | Low | VERIFIED | Crypto |
| WMA-06 | Raw `error.message` returned in the Will seed route's 500 path | Low | VERIFIED | Error handling |
| WMA-07 | Live database RLS, grants and policies | Unknown | UNVERIFIED | Supabase |
| WMA-08 | Vercel environment scope, previews, branch protection | Unknown | UNVERIFIED | Infrastructure |
| WMA-09 | Public-by-design routes need input limits reviewed | Low | LIKELY | API |

## Details

### WMA-01: `/api/mia/*` is not in the cross-site request guard
- Evidence: `src/lib/request-guard.ts` sets `GUARDED_API_PREFIXES = ['/api/crm/', '/api/will/', '/api/atlas/']`. `src/proxy.ts` runs `crossSiteMutationReason` only for prefixes in that list. The Mia mutation routes (`move`, `send`, `status`, `form-link`) are outside it.
- Mitigating controls: every Mia route calls `sessionValid()` first, and the CRM session cookie is `httpOnly`, `sameSite: 'strict'`, with `secure` in production. A cross-site form post would not carry the cookie, so the practical risk is low. It is still a gap in defence in depth.
- Severity: Medium. A separate scanner run rated this High. It is not High because of the strict cookie and session check.
- Fix: add `'/api/mia/'` to `GUARDED_API_PREFIXES`. Breaking-change risk: low, since Mia's own UI is same-origin. Test: a cross-origin POST to `/api/mia/move` should return 403, and the Mia screen should still move stages.

### WMA-02: `/api/will/seed` can overwrite templates on any logged-in session
- Evidence: `src/app/api/will/seed/route.ts` checks only `sessionValid()`. It has no `NODE_ENV` or `SEED_ENABLED` gate. With `{ "overwrite": true }` it switches into a sync mode that rewrites templates. The CRM seed route at `src/app/api/crm/seed/route.ts` does have both gates.
- Preconditions: a logged-in CRM session, which in practice is only the owner.
- Impact: unintended change to message templates in production.
- Fix: apply the same double gate as the CRM seed route, or remove the overwrite mode from production builds. Breaking risk: none for normal use.

### WMA-03: Uploads use public URLs
- Evidence: `src/lib/upload.ts:186` and `src/app/api/tax-form/upload/route.ts:198` both call `getPublicUrl(pathname)`. The path is `folder/<Date.now()>_<8 hex>_<name>`, which is hard to guess but not secret.
- Impact: anyone who holds the URL can read the file. The URL is stored with the customer record, so a leak of CRM data would also expose the documents.
- Unverified: whether the bucket is set to public in Supabase. The code assumes it is.
- Fix: serve CRM documents through a signed URL with a short expiry, and keep `getPublicUrl` only for images that are truly public. Breaking risk: medium. Documents already shown in the CRM would need the new access path.

### WMA-04: Next.js advisory
- Evidence: `npm audit --omit=dev` returns one moderate finding, `next` in the range 16.3.0 to 16.4.4. npm offers a fix. The project pins `next@16.4.3`.
- Fix: upgrade Next to the version npm names, then run the full test suite and a build. Breaking-change risk: low to medium for a framework upgrade. Needs approval before it is applied.

### WMA-05: `Math.random` in the partner code
- Evidence: `src/app/api/crm/partners/route.ts:79` builds `PTR` plus four characters from `Math.random`.
- Impact: low. A referral code is not a credential, but guessable codes could be claimed by someone else.
- Fix: `crypto.randomBytes`.

### WMA-06: Raw error in the seed route
- Evidence: `src/app/api/will/seed/route.ts:44` returns `error.message` to the caller.
- Impact: low, because the caller is authenticated. Still, database text should not reach the browser.
- Fix: return a fixed code, and log the detail on the server.

### WMA-07, WMA-08: Not verifiable from code
Live RLS status, grants, Supabase Auth settings, storage bucket visibility, Vercel environment scopes, preview deployment protection, and branch protection on GitHub were not available. They are marked UNVERIFIED and are not counted as passing. The checklist for these is in `REMEDIATION_ROADMAP.md`.

### WMA-09: Public routes
- Routes that are public by design (customer forms, login, OTP, version, health, Meta webhook, analytics beacon) are listed in the audit script. Each needs a review of its input limits and rate limiting. The Meta webhook is HMAC-checked with `timingSafeEqual`, which is correct.

## Controls checked and found in place
- Every Mia and Atlas API route checks `sessionValid()` before doing anything.
- The CRM session cookie is `httpOnly`, `sameSite: 'strict'`, and `secure` in production.
- The OTP pre-auth cookie has the same flags.
- The Meta webhook verifies `x-hub-signature-256` with HMAC-SHA256 and compares with `timingSafeEqual`.
- The CRM seed route is disabled in production and needs an explicit env flag.
- Migration 049 locks down functions and revokes default grants. Its grant lines are commented out, so the effective result depends on the live database, which was not checked.
- The CI workflow has read-only permissions, uses `npm ci --ignore-scripts`, and does not use `pull_request_target`.
- No `productionBrowserSourceMaps` setting was found. Next.js leaves production source maps off by default. This is inferred from the absence of the setting.

## Scanner false positives (from the full code audit)
- Rule "seed route reachable outside development" flagged `/api/crm/seed`. The route is correctly gated, so this is a false positive. The rule should check for the gate instead of the name.
- Rule "secret compared with ==" flagged state labels such as `signal === 'mismatch'`. These are not secrets. The rule needs a narrower pattern.
- Rule "Math.random used for a token" flagged retry back-off sleeps. Those are not tokens. The rule needs the surrounding name check to be stricter.
- Rule "PostgREST filter from variables" flagged a date cutoff the system generates. Not user input.
- Rule "logging personal data" flagged a generic OTP error message, which contains no code.

## Status update: 17 Nov 2026, after your approval

- **WMA-01 FIXED:** `/api/mia/` added to `GUARDED_API_PREFIXES` in `src/lib/request-guard.ts`. Test added: `src/lib/__tests__/request-guard-mia-17nov.test.ts`.
- **WMA-04 FIXED:** `next` moved from `^16.4.3` to `^16.4.6`. `npm audit --omit=dev` now reports 0 vulnerabilities.
- **WMA-05 FIXED:** partner fallback code now uses `crypto.randomBytes` (`src/app/api/crm/partners/route.ts`).
- **WMA-06 FIXED:** the Will seed route returns the fixed code `seed_failed` and logs the detail server-side.
- **WMA-02 NOT CHANGED, decision needed:** the Will seed route's sync mode is the normal way to push wording changes from code into Will (edit in code, deploy, click Sync). Adding an environment gate would block that flow in production. The route is already protected by a logged-in session. Options: keep as is (accept the risk, owner-only), or add a separate confirmation step for `overwrite: true`.
- **Build check:** `tsc --noEmit` passes, Jest passes (472 suites, 6,336 tests, 2 skipped, plus the new 5), ESLint passes on the changed files. `next build` could not complete in this sandbox because Google Fonts cannot be reached from here. The build must be confirmed on a Vercel preview before production.
- **WMA-03 DOWNGRADED to Low (correction):** my first reading was incomplete. `getPublicUrl` only builds a reference string. The code calls `assertUploadsBucketPrivate()` before every upload (src/lib/upload.ts and src/app/api/tax-form/upload/route.ts). It refuses to upload if the bucket is public. Files are read only through `/api/crm/file`, which needs a CRM session and uses the service role. The live bucket setting is still worth one check in the Supabase dashboard.
- **WMA-02 still open, decision needed:** an audit record is added to each overwrite run. The sync mode is kept, since it is the normal path for wording changes. Whether to add a confirmation step is your call.
- **Not done by this audit:** WMA-07 and WMA-08 (live Supabase, Vercel and GitHub settings), the full production build (blocked here by Google Fonts), and 14 of the 22 brief deliverables (performance, dead code, business logic, tests, frontend, independent validation).

## Final status, 17 Nov 2026 (all workstreams attempted)

| ID | Title | Severity now | Status |
|---|---|---|---|
| WMA-01 | Mia missing from cross-site guard | Medium | FIXED |
| WMA-02 | Will seed overwrite | Medium | Audited. Gate not added (would break wording sync). Confirmation step OPEN (owner decision) |
| WMA-03 | Public-URL uploads | Low | Mitigated by runtime bucket check. Confirm bucket setting (WMA-07) |
| WMA-04 | Next.js advisory | Medium | FIXED |
| WMA-05 | Partner code with Math.random | Low | FIXED |
| WMA-06 | Raw error text in seed | Low | FIXED |
| WMA-07 | Live Supabase settings | Unknown | NOT VERIFIED (no dashboard access) |
| WMA-08 | Vercel and GitHub settings | Unknown | NOT VERIFIED (no dashboard access) |
| WMA-09 | Public routes need limits review | Low | Login and OTP rate limits confirmed in code. Others not tested |
| WMA-10 | JSON-LD not escaped for `</script>` | Low | OPEN. Static content only. Not changed (about 100 pages) |
| WMA-11 | CI actions pinned by tag, not SHA | Low | OPEN. Needs GitHub read access to get SHAs |
| WMA-12 | Atlas proposals run the same actions as the CRM | Low | Accepted: human Approve click required |
| WMA-13 | Three unreferenced components | Low | OPEN. Removal needs your approval |
| WMA-14 | Atlas sends a report summary to the model | Low | OPEN. Privacy notice and minimisation |
| WMA-15 | Customer retention period not set | Low | OPEN. Owner decision |
| WMA-16 | Scanner false positives | Info | Rules tuned; reviewed items recorded in the script |

## Decision, 17 Nov 2026
- **WMA-02 ACCEPTED by owner.** The template sync has always been part of the code and is the normal way to change Will's wording. It stays as it is, with no extra confirmation. Each run is written to the audit log (`library_sync_overwrite`). Only the owner's session can reach it.
