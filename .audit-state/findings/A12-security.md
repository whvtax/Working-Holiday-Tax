# A12: Application security audit (OWASP ASVS / Top 10)

Baseline: commit d9dbac0, branch svt-build. Read-only review of source plus the prebuilt
`.next` output; no secrets printed, nothing installed, no destructive tests. The local
server on :3100 was not running when I resumed, so I started the existing production build
with `next start -p 3100` for the host-routing probes and stopped it afterwards.

Severity scale: CRITICAL / HIGH / MEDIUM / LOW / INFO. Each finding says CONFIRMED (code
path traced, or observed on the local server) or THEORETICAL.

## Summary

No CRITICAL or HIGH findings. The SVT additions (host-derived brand, API default-deny on
SVT hosts, brand-scoped Will lookups, SVT CSP) are implemented as decisions 003/004
describe and behave as described on the local server. Every CRM and Will route checks the
CRM session (or the cron secret) before doing anything; the public form routes validate and
rate-limit; uploads go to the private bucket behind a fail-closed privacy assertion; the
WhatsApp webhook verifies the HMAC before parsing and resolves the brand from
`metadata.phone_number_id`, never from body text. The client bundles contain no secret
values, git history contains no committed env files or keys, and `npm audit --omit=dev`
reports 0 vulnerabilities across 44 production dependencies.

What remains is MEDIUM and below: one brand-isolation asymmetry in client matching, a few
places where a 500 or an internal error string reaches a public caller, and some hardening
gaps on the CRM file route. Leaving all of them unchanged for the SVT launch is acceptable
in my view, with A12-1 being the one I would fix first.

## Findings

### A12-1 MEDIUM, CONFIRMED: WHT form submissions can merge into an SVT client record

- Files: `src/lib/db.ts:139-176` (`findExistingClient`), `src/app/api/tax-form/route.ts:67`,
  `src/app/api/abn-form/route.ts:50`, `src/app/api/tfn-form/route.ts:51`,
  `src/app/api/super-form/route.ts:50`.
- Evidence: `findExistingClient(email, whatsapp, brand = 'wht')` applies `.eq('brand','svt')`
  only when `brand === 'svt'`. The WHT path (and the three WHT-only routes, which never pass a
  brand) matches on email/whatsapp across ALL rows, SVT rows included. The comment at
  db.ts:153-155 acknowledges this ("every row is WHT until SVT forms are on"), which stops
  being true the day SVT forms open.
- Impact: once SVT has clients, the same person submitting the WHT form (or an operator
  creating a WHT task for an email/phone that exists as an SVT client) reuses the SVT
  `clientId`, so a WHT tax-return task hangs off an SVT client record. Brand separation is
  "behind the scenes" for the CRM so no customer sees it, but the CRM card, the referral
  attribution and any later brand-filtered report mix the two. Reverse direction is already
  scoped correctly.
- Smallest fix: in `findExistingClient`, when `brand === 'wht'`, add
  `.or('brand.is.null,brand.eq.wht')` (or `.neq('brand','svt')`) once migration 047 is
  confirmed applied; the three WHT-only routes need no change because the default is 'wht'.
- Verify: unit test with one SVT row and a WHT lookup for the same email expecting `null`.
- Leave unchanged? Acceptable for launch (requires one person to be a customer of both
  brands), but it should be fixed before SVT volume grows.

### A12-2 MEDIUM, CONFIRMED: `/api/crm/file` serves customer PDFs inline without a sandbox CSP

- File: `src/app/api/crm/file/route.ts:139-148`.
- Evidence: response headers are `Content-Type`, `Content-Length`, `Cache-Control: private,
  no-store`, `X-Content-Type-Options: nosniff`, `Content-Disposition: inline`. The sibling
  route `src/app/api/will/media/[id]/route.ts:49` adds
  `content-security-policy: sandbox; default-src 'none'; ...` for exactly this reason (its
  comment cites the 3 Sep SVG incident). The CRM file route allows `application/pdf` inline
  from the private bucket, i.e. a file an anonymous visitor uploaded through
  `/api/tax-form/upload`.
- Impact: a crafted PDF rendered inline on the CRM origin. Browsers' PDF viewers are
  sandboxed and `object-src 'none'` is set on /crm, so exploitation is unlikely; this is a
  defence-in-depth gap and an inconsistency between two routes doing the same job.
- Smallest fix: copy the `content-security-policy: sandbox; default-src 'none'; img-src
  'self' data:; style-src 'unsafe-inline'` header from the media route.
- Verify: `curl -I` on the route with a valid session; header present.
- Leave unchanged? Acceptable; low likelihood, but a two-line fix.

### A12-3 LOW, CONFIRMED: WHT-only form routes return the storage error text to the public

- Files: `src/app/api/abn-form/route.ts:58-61`, `tfn-form/route.ts:59-62`,
  `super-form/route.ts:58-61`; `src/lib/upload.ts:160` (`Upload failed: ${uploadError.message}`).
- Evidence: an `uploadFiles` throw is returned as `{ error: 'invalid_file', message: msg }`
  with status 400. Validation messages are intended, but a Supabase storage failure
  (`Upload failed: <supabase message>`) also travels to the browser.
- Impact: minor information disclosure (bucket name / storage error wording) on a public
  endpoint. Not reachable on SVT hosts (these routes are not on the allowlist).
- Smallest fix: distinguish validation errors from storage errors in `uploadFile` (a typed
  error) and return a generic message for the latter.
- Leave unchanged? Yes.

### A12-4 LOW, CONFIRMED: `/api/tax-form` answers a malformed body with 500 and an audit row

- File: `src/app/api/tax-form/route.ts:24` (`req.formData()` outside any 400 handling).
- Evidence: observed on the local build: `POST /api/tax-form` with an empty body returns
  `{"ok":false,"error":"submission_failed","ref":"..."}` HTTP 500, and the catch block
  writes a `public_form_failed` audit row via the Will store.
- Impact: `req.formData()` (line 24) runs before both `isRateLimited` calls (lines 44-49),
  so this 500 path is not rate-limited: an unauthenticated caller can write
  `public_form_failed` audit rows without bound. Noise in the Decision Log, no data exposure.
- Smallest fix: wrap `req.formData()` in try/catch returning 400 `invalid_body`, and move
  the per-IP limiter above it.
- Leave unchanged? Yes, nuisance only.

### A12-5 LOW, THEORETICAL: Meta media download follows the URL Meta returns without a host check

- File: `src/lib/will/channel.ts:664-677` (`fetchWaMedia`).
- Evidence: the first Graph call returns `{ url }`; the second `fetch(info.url, { headers:
  { Authorization: Bearer <token> } })` sends the WhatsApp access token to whatever host
  `info.url` names.
- Impact: only exploitable if Meta's Graph response were attacker-controlled (compromise of
  Meta or of TLS). Admin-only route, bounded size, timeouts present.
- Smallest fix: assert `new URL(info.url).hostname` ends with `.fbcdn.net`, `.fbsbx.com` or
  `facebook.com` before attaching the token.
- Leave unchanged? Yes.

### A12-6 LOW, CONFIRMED: WhatsApp access token persisted in plaintext in `will_settings`

- Files: `src/lib/will/channel.ts:87-93` (`saveWaCreds`), `src/app/api/will/whatsapp/connect/route.ts:100`.
- Evidence: `store.setSetting(WA_TOKEN_KEY, token)`; the settings table is read with the
  service role only, and no route returns that key (checked: `/api/will/system`, `/state`,
  `/health`, `/version`, `/export` do not emit `wa_access_token`).
- Impact: a database read (backup, Supabase dashboard access) exposes a live system-user
  token. Equivalent in practice to it living in Vercel env, which it also does.
- Smallest fix: none required for launch; if kept, document it in SECURITY_CHECKLIST and
  rotate the token when access to Supabase changes.
- Leave unchanged? Yes.

### A12-7 LOW, CONFIRMED: `/api/analytics/funnel` is brand-blind and is called on SVT where it 404s

- Files: `src/app/api/analytics/funnel/route.ts:9-10, 36-41`, `src/app/(site)/tax-form/FormClient.tsx:287-297`,
  `config/brand-routing.js:36-38`.
- Evidence: the shared FormClient posts `formName: 'tax-form'` with no brand on every host.
  On the SVT host the route is not on `svtApiAllowlist`, so the POST is a 404 (observed
  locally). If it were ever allowlisted, SVT events would land in the WHT funnel table with
  no brand column.
- Impact: no security impact (fire-and-forget, no PII in the event). It is a wasted request
  on the SVT form and a latent data-mixing issue.
- Smallest fix: skip `trackFunnelEvent` when `brand.id === 'svt'`, or add a `brand` field
  derived from the host server-side before allowlisting the route.
- Leave unchanged? Yes.

### A12-8 INFO, CONFIRMED: `.env.example` carries real Meta account identifiers

- File: `.env.example` (the "Verified account facts" block): real phone number, phone
  number ID, WABA IDs, Meta app ID, business portfolio ID, system-user name; plus a
  hardcoded fallback app ID in `src/app/api/will/whatsapp/connect/route.ts:20`.
- Impact: these are identifiers, not credentials (the app ID is already `NEXT_PUBLIC_`).
  They are committed to a repository that may one day be shared; they are also an
  operational note that belongs in docs, not in the env template.
- Smallest fix: move the block to `docs/engineering/` or PROJECT_HANDOFF.md.
- Leave unchanged? Yes.

### A12-9 INFO, CONFIRMED: TFN, bank details and passport numbers stored as plain columns

- Files: `src/lib/db.ts:203-239` (`createTask` writes `tfn`, `bank_details`), tfn/super
  routes write `Passport No:` into `notes`.
- Evidence: no application-level encryption; relies on Supabase at-rest encryption and the
  service-role boundary. Pre-existing WHT design, unchanged by SVT.
- Impact: a database compromise exposes identity-theft kits directly.
- Smallest fix (out of scope for this launch): envelope-encrypt `tfn` and `bank_details`
  with a server-side key, decrypt only in the CRM render path.
- Leave unchanged? For this launch, yes; flag for the roadmap.

### A12-10 INFO, CONFIRMED: sessionStorage snapshot holds name, DOB, address, phone, email for up to 2 h

- File: `src/app/(site)/tax-form/FormClient.tsx:305, 410-416, 343-366`.
- Evidence: written under `whv_taxform_return` when leaving for the residency page, read
  and removed on return, ignored after 2 h. TFN and files are deliberately excluded
  (`tax-form-handoff.ts` comment). Applies to SVT too since the component is shared.
- Impact: if the customer abandons on the residency page, the snapshot stays until the tab
  closes. Same-origin only; no third-party script can read it (SVT CSP allows only gtag).
- Smallest fix: also `removeItem` on the residency page's unmount, and consider a
  brand-neutral key name (the `whv_` prefix is a WHT acronym visible in DevTools; no
  customer-facing exposure).
- Leave unchanged? Yes.

### A12-11 INFO, CONFIRMED: client console logs upload file names

- File: `src/lib/submit-tax-form.ts:102` (`console.error('[uploadOne]', f.name, ...)`).
- Impact: a file named `passport_jane_doe.jpg` appears in the customer's own browser
  console on a failed upload. Browser-local; not sent anywhere.
- Smallest fix: log `kind` instead of `f.name`.
- Leave unchanged? Yes.

### A12-12 INFO, CONFIRMED: public pages keep `script-src 'unsafe-inline'` (WHT and SVT)

- Files: `next.config.js` (`staticCsp`, `svtCsp`); nonce CSP is /crm-only (`src/proxy.ts`).
- Evidence: observed locally. The reasoning (prerendered pages cannot carry a nonce) is
  documented and was browser-tested on 29 Aug per the comments. SVT CSP is otherwise
  least-privilege: no Facebook/YouTube/Supabase origins, `frame-src 'none'`, self-hosted
  fonts; GA4 origins only.
- Leave unchanged? Yes; a hash-based CSP would be the eventual improvement.

### A12-13 INFO, CONFIRMED: `notifyFormReceived` is awaited without try/catch on three WHT routes

- Files: `abn-form/route.ts:98`, `tfn-form/route.ts:100`, `super-form/route.ts:103`.
- Evidence: the comment says "best effort by design" but the call is a bare `await`, so a
  Will-store failure after `createTask` turns a saved submission into a 500 for the customer
  (the tax-form route fixed exactly this; see its comment at lines 232-243).
- Impact: reliability, not security; WHT only.
- Leave unchanged? Acceptable; copy the tax-form route's try/catch when next touched.

## Reviewed with no finding

Public and auth routes
- `src/app/api/tax-form/route.ts`: brand from Host only; required-field guard; per-person
  and per-IP rate limits; `validateIntake` server-side; `invoiceUrls` capped at 50 and
  filtered by `isValidSupabaseStorageUrl` (host + bucket prefix + `..` check); JSON fields
  parsed defensively with caps; SVT branch audits or notifies inside `withBrand('svt')`;
  error text never returned, only a 6-char ref.
- `src/app/api/tax-form/upload/route.ts`: 100 req / 15 min per IP plus a 120 MB byte budget;
  MIME allowlist; magic-byte check; dangerous-signature check at offset 0; filename
  sanitised and prefixed with timestamp + UUID; `svt/` prefix from Host; `assertUploadsBucketPrivate()`
  fail-closed before every upload; `upsert: false`. Unauthenticated by design (public form).
- `src/app/api/crm/login/route.ts`: password length cap (PBKDF2 DoS), per-IP lockout
  (3 attempts / 30 min) with constant-time compare, OTP bound to an httpOnly `crm_preauth`
  cookie (SameSite=Strict, Secure in prod, 10 min), OTP hash only in Redis, Resend called
  with a timeout, alert email fire-and-forget. Fails closed if Redis is absent.
- `src/app/api/crm/verify-otp/route.ts`: preauth cookie format check, 5 attempts per OTP
  lifecycle, timing-safe compare, one-time use, session cookie httpOnly/Secure/Strict/8 h,
  preauth cookie consumed; new-device alert.
- `src/app/api/crm/logout/route.ts`: requires a valid session before the global revoke;
  idle logout only clears the cookie.
- `src/lib/crm-store.ts`: HMAC-SHA256 tokens with `exp` and `iat` type checks, global
  revocation epoch persisted to Redis, fail-safe.
- `src/lib/get-ip.ts`: prefers `x-real-ip`, validates IP shape, rightmost XFF hop.
- `src/lib/rate-limit.ts`: Redis with in-memory fallback (fails open by design, documented).
- All 18 other `/api/crm/*` routes: `validateSession` on every handler; numeric inputs
  bounded; `safeYear` regex; `updateClient` whitelists and length-caps columns; ILIKE
  wildcards escaped in `findExistingClient` and `searchClients`; CSV export guards formula
  injection; `seed` is 404 in production and gated by `SEED_ENABLED` + session.
- All 22 `/api/will/*` routes (actions, audit, chats, export, followups, health,
  insights/monthly, knowledge, link, media/[id], messages, mine, morning, report, search,
  seed, state, system, tick, version, whatsapp/connect, whatsapp/inbound-check): first
  statement is `sessionValid()` (tick: `cronAuthorized()` with constant-time secret compare).
  `actions` adds an Origin check on top of SameSite=Strict; `send_estimate` validates the
  invoice URL scheme; `media/[id]` validates the id, keeps the Meta token server-side and
  serves with a sandbox CSP; `connect` sends the app secret in a POST body, never a query
  string. The `/api/will/*` tree is single-tenant (one admin), so `customerId`/`id` params
  are not IDOR surfaces.
- `src/app/api/will/webhook/route.ts`: Content-Length precheck and 256 KB byte cap before
  parsing; HMAC-SHA256 over the raw body, constant-time, fail-closed when the secret is
  unset; GET verification uses constant-time compare; brand resolved by
  `brandForPhoneNumberId(metadata.phone_number_id, ourPhoneId)` and unknown phone ids are
  dropped; idempotency claim on the Meta message id with bounded retry (3) via Redis;
  per-sender (40) and global (400) inbound limits on both the text and the note path;
  phone numbers masked in audit rows; echoes also brand-scoped. No replay beyond Meta's
  own redelivery is possible without the app secret.
- `src/lib/will/brand-context.ts`, `src/lib/will/store-supabase.ts:451-477`: AsyncLocalStorage
  brand; `getCustomerByWaId` and `findCustomerByPhone` add `.eq('brand', currentBrand())`
  once `SVT_WHATSAPP_PHONE_NUMBER_ID` is set; `listChatPage` brand filter accepts only the
  two known values. ILIKE escaping in `searchCustomers`; no string-built SQL anywhere in
  `src/lib/db.ts` or `src/lib/will/store*.ts` (PostgREST builder only; `.or()` uses
  constants).
- `src/lib/supabase.ts`: service-role client created server-side only; `NEXT_PUBLIC_SUPABASE_URL`
  is the only public var; `assertUploadsBucketPrivate` fails closed on error or public bucket.
- `src/lib/upload.ts`: same validation as the route; `deleteFiles` reports partial failure
  instead of clearing references (so `markTaskDone` keeps URLs when deletion fails).
- `src/lib/analytics` / `src/components/layout/Analytics.tsx`: SVT form paths (`/tax-form`,
  `/zh/tax-form`, `/vi/tax-form` and subpaths, so the residency step too) untagged; GA
  measurement id passed per brand so SVT never ships the WHT property.

Routing, headers and isolation (observed on the local build, Host: svt.localhost)
- `/api/crm/login`, `/api/crm/stats`, `/api/will/health`, `/api/analytics/funnel`,
  `/api/tax-form`, `/api/tax-form/upload` (forms closed in this build), `/api/crm/login?x=...`,
  `/api/crm/../tax-form`, `/crm`, `/svt-site`, `/de`: all 404. `/api//crm/login` 308s to
  `/api/crm/login` which is then 404. On the WHT host `/svt-site` and `/svt-assets/*` are
  404. SVT responses carry the SVT CSP (no WHT domain, no Facebook/YouTube), HSTS with
  preload, X-Frame-Options DENY, COOP/CORP, Permissions-Policy. `/crm` on WHT carries the
  nonce CSP with `strict-dynamic`.
- `config/brand-routing.js`: host regex is anchored and grouped; `whtOnly()` adds
  `missing: svtHost()` to every WHT redirect; no open redirect (all destinations are
  literal internal paths).
- `src/proxy.ts`: matcher limited to `/crm`; only sets the nonce CSP.

Server-only boundaries and bundles
- `'use client'` files importing from `@/lib/db`, `supabase`, `upload`, `crm-store`,
  `rate-limit`, `will/store`, `will/channel`, `will/service`, `leads`, `seed`: only
  `Dashboard.tsx` and `LinkFormTask.tsx`, both `import type` from `@/lib/will/store`
  (erased at build). No `process.env.<non-NEXT_PUBLIC>` in any client component; the only
  non-public reads in `.tsx` are `SVT_FORMS_ENABLED` in server pages and `NODE_ENV`.
- `.next/static/chunks/*.js` (56 files): no `service_role`, `sk_live`, `sk-ant-`, Resend
  key shape, Meta `EAA...` token shape, JWT shape, `rediss://`. The only hits are the env var
  NAMES `CRM_PASSWORD`, `JWT_SECRET`, `CRON_SECRET` inside CRM help text in
  `chunk 09vulc8y6l9b1.js` (no values). `NEXT_PUBLIC_META_APP_ID` / `NEXT_PUBLIC_META_CONFIG_ID`
  / `NEXT_PUBLIC_META_EMBEDDED_CONFIG_ID` names appear (expected, non-secret). No
  `*.supabase.co` host is inlined in any client chunk.
- `.env.example` vs code: every variable the code reads is documented or deliberately
  undocumented-by-default (`CLAUDE_MODEL`, `FOLLOWUP_*`, `WILL_*`, `GOOGLE_PLACE_ID`,
  `ANTHROPIC_ADMIN_API_KEY`, `AI_PRICES_JSON`, `META_APP_ID`, `SEED_ENABLED`,
  `CSP_NONCE_DISABLED`, `SVT_LAUNCH`); none of them is `NEXT_PUBLIC_`.

Git history
- `git ls-files`: only `.env.example` tracked; `.env`, `.env.local`, `.env*.local` ignored.
  No commit ever added `.env`, `.env.local`, `.env.production` or `.env.development`.
  Pattern search across all history for `sk-ant-`, service-role JWT prefix, Resend key
  shape, Meta token shape, `rediss://`, `JWT_SECRET=<hex>`: one hit, commit 281edd1
  ("baseline 21 Oct"), a unit-test fixture string (`sk-ant-123`) used as a leak-detection
  sample. No real key.

Dependencies
- `npm audit --omit=dev --json`: 0 vulnerabilities (info 0, low 0, moderate 0, high 0,
  critical 0) across 44 production dependencies (773 total incl. dev). Key prod versions:
  next ^16.4.3, react ^19.2.8, @supabase/supabase-js ^2.45.4, redis ^4.7.0, heic-convert ^2.1.0.

## Coverage

Read in full
- All 52 `src/app/api/**/route.ts` files. Of these, read line by line: tax-form,
  tax-form/upload, abn-form, tfn-form, super-form, analytics/funnel, google-reviews, all 19
  crm/* routes, will/webhook (all 959 lines), will/media/[id], will/whatsapp/connect,
  will/system, will/messages, will/audit, will/morning, will/insights/monthly, will/search,
  will/chats, will/version, will/seed, will/mine, will/tick, will/link (handler body).
- `src/lib/upload.ts`, `src/lib/supabase.ts`, `src/lib/crm-store.ts`, `src/lib/rate-limit.ts`,
  `src/lib/get-ip.ts`, `src/lib/will/auth.ts`, `src/lib/will/brand-context.ts`,
  `src/lib/brand.ts`, `src/lib/submit-tax-form.ts`, `src/lib/tax-form-handoff.ts`,
  `config/brand-routing.js`, `next.config.js`, `src/proxy.ts`, `.env.example`, `.gitignore`,
  `src/components/layout/Analytics.tsx`, `src/components/svt/SvtDocument.tsx`,
  `src/app/(svt)/svt-site/tax-form/page.tsx`.

Read partially (targeted sections, grep-guided)
- `src/app/api/will/actions/route.ts` (1569 lines): auth/CSRF head, action list, setSetting
  call sites, dismiss_fault, send_estimate URL validation, set_google_place_id. The other
  cases were checked only for the auth guard they share.
- `src/app/api/will/{export,followups,health,knowledge,report,state,whatsapp/inbound-check}`:
  auth line and exported handlers only.
- `src/lib/db.ts` (937 lines): types, `findExistingClient`, `createTask`, `updateClient`,
  `searchClients`, query-builder grep for all `.or/.ilike/.rpc` uses.
- `src/lib/will/store-supabase.ts` (1564 lines): brand scoping (lines 384-477, 499-502),
  `searchCustomers`, all `.or/.ilike/.like/.rpc` call sites. `store.ts`, `store-file.ts`:
  grep only (dev file store, not used in production).
- `src/lib/will/channel.ts`: credential resolution (60-125), `fetchWaMedia` (640-720), env
  accessors; send paths not reviewed (belongs to the Will agent).
- `src/app/(site)/tax-form/FormClient.tsx`: lines 260-440 (analytics, storage, hand-off,
  validation); the JSX below was not reviewed.
- `src/components/ui/ResidencyDeclaration.tsx`: lines 100-175 (submit path);
  `ResidencyStep.tsx`: grep for storage/logging/URL use only.
- `src/components/svt/form-brand-svt.tsx`: lines 1-120 (copy and provider; no logic).
- `src/lib/sanitise.ts`: function signatures only.

Not reviewed
- `src/lib/will/form-link.ts` (`notifyFormReceived`), `service.ts`, `engine.ts`,
  `scheduler.ts`, `security-watch.ts`, `leads.ts`, `intake-validate.ts`, `seed.ts`,
  `googleReviewsServer.ts`, `compress-image.ts`: trusted as called; their internals are
  other agents' scope or out of this audit's priority list.
- Supabase RLS policies and migrations (`migrations/`): NOT VERIFIED here; the app uses the
  service role for every query, so RLS is not the control this code relies on.
- Deployment facts that code cannot prove: that Vercel overwrites inbound `x-real-ip`
  (get-ip.ts relies on it), that the `uploads` bucket is private in the real project (the
  code asserts it at runtime), that `META_APP_SECRET`/`META_VERIFY_TOKEN` are set in
  production (webhook fails closed if not). All NOT VERIFIED: no access to production.
- `npx semgrep`: not run (not installed; the brief forbids installing).
- Playwright/browser checks: not performed; all host-routing evidence is from curl against
  the local production build.
