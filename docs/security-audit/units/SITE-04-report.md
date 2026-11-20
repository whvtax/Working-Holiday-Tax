# SITE-04 report

Static, read-only review. No project code was run. 46 of 46 unit files read in full (4,084 lines).
Files opened outside the unit to judge findings (partial reads, ranges given): `src/proxy.ts` (1-127, full), `src/lib/request-guard.ts` (1-47, full), `src/lib/will/auth.ts` (1-50), `src/lib/crm-store.ts` (55-189), `src/lib/json-ld-html.ts` (full), `src/lib/csv.ts` (1-21), `src/components/ui/ResidencyFixPanel.tsx` (1-80), `src/components/layout/RootDocument.tsx` (280-363), `src/components/layout/Analytics.tsx` (grep context 16-80), `config/form-paths.js` (full), `next.config.js` (grep context only), `src/app/robots.ts` (grep only), `src/lib/wa.ts` (188-202), first 12 lines of the four `src/components/mia/Mia*.tsx` files, and grep hits in `src/app/api/mia/*/route.ts`, `src/app/api/crm/verify-otp/route.ts`, `src/components/layout/PublicShellClient.tsx`, `src/lib/will/i18n.ts`.

## Coverage
| file | lines | ranges read | status |
|---|---|---|---|
| src/app/(site)/3cw5w5hcx/layout.tsx | 18 | 1-18 | REVIEWED |
| src/app/(site)/3cw5w5hcx/page.tsx | 50 | 1-50 | REVIEWED |
| src/app/(site)/HomeWa.tsx | 57 | 1-57 | REVIEWED |
| src/app/(site)/about/page.tsx | 209 | 1-209 | REVIEWED |
| src/app/(site)/blog/[slug]/MobileTOC.tsx | 283 | 1-283 | REVIEWED |
| src/app/(site)/blog/[slug]/ReadingProgress.tsx | 83 | 1-83 | REVIEWED |
| src/app/(site)/blog/analytics.ts | 108 | 1-108 | REVIEWED |
| src/app/(site)/blog/page.tsx | 123 | 1-123 | REVIEWED |
| src/app/(site)/blog/search.ts | 195 | 1-195 | REVIEWED |
| src/app/(site)/calculator/CalculatorClient.tsx | 238 | 1-238 | REVIEWED |
| src/app/(site)/calculator/page.tsx | 155 | 1-155 | REVIEWED |
| src/app/(site)/client-agreement/page.tsx | 53 | 1-53 | REVIEWED |
| src/app/(site)/contact/page.tsx | 214 | 1-214 | REVIEWED |
| src/app/(site)/crm/LoginClient.tsx | 200 | 1-200 | REVIEWED |
| src/app/(site)/crm/atlas/[module]/page.tsx | 31 | 1-31 | REVIEWED |
| src/app/(site)/crm/atlas/page.tsx | 20 | 1-20 | REVIEWED |
| src/app/(site)/crm/dashboard/ClientOnly.tsx | 19 | 1-19 | REVIEWED |
| src/app/(site)/crm/dashboard/error.tsx | 36 | 1-36 | REVIEWED |
| src/app/(site)/crm/layout.tsx | 108 | 1-108 | REVIEWED |
| src/app/(site)/crm/mia/page.tsx | 21 | 1-21 | REVIEWED |
| src/app/(site)/crm/page.tsx | 33 | 1-33 | REVIEWED |
| src/app/(site)/crm/partners/ClientOnly.tsx | 19 | 1-19 | REVIEWED |
| src/app/(site)/crm/partners/PartnersClient.tsx | 253 | 1-253 | REVIEWED |
| src/app/(site)/crm/partners/[id]/ClientOnly.tsx | 19 | 1-19 | REVIEWED |
| src/app/(site)/crm/partners/[id]/PartnerDetailClient.tsx | 272 | 1-272 | REVIEWED |
| src/app/(site)/crm/partners/[id]/page.tsx | 13 | 1-13 | REVIEWED |
| src/app/(site)/crm/partners/page.tsx | 13 | 1-13 | REVIEWED |
| src/app/(site)/crm/whatsapp/ClientOnly.tsx | 19 | 1-19 | REVIEWED |
| src/app/(site)/crm/whatsapp/connect/ClientOnly.tsx | 14 | 1-14 | REVIEWED |
| src/app/(site)/crm/whatsapp/connect/page.tsx | 20 | 1-20 | REVIEWED |
| src/app/(site)/crm/whatsapp/inbound-check/ClientOnly.tsx | 14 | 1-14 | REVIEWED |
| src/app/(site)/crm/whatsapp/inbound-check/InboundCheckClient.tsx | 127 | 1-127 | REVIEWED |
| src/app/(site)/crm/whatsapp/inbound-check/page.tsx | 20 | 1-20 | REVIEWED |
| src/app/(site)/crm/whatsapp/page.tsx | 16 | 1-16 | REVIEWED |
| src/app/(site)/expenses/hospitality/page.tsx | 290 | 1-290 | REVIEWED |
| src/app/(site)/expenses/labouring/page.tsx | 291 | 1-291 | REVIEWED |
| src/app/(site)/layout.tsx | 123 | 1-123 | REVIEWED |
| src/app/(site)/not-found.tsx | 32 | 1-32 | REVIEWED |
| src/app/(site)/privacy/page.tsx | 48 | 1-48 | REVIEWED |
| src/app/(site)/rh84sez58/layout.tsx | 18 | 1-18 | REVIEWED |
| src/app/(site)/rh84sez58/page.tsx | 50 | 1-50 | REVIEWED |
| src/app/(site)/start/layout.tsx | 19 | 1-19 | REVIEWED |
| src/app/(site)/start/page.tsx | 56 | 1-56 | REVIEWED |
| src/app/(site)/vukjw4byf/layout.tsx | 18 | 1-18 | REVIEWED |
| src/app/(site)/vukjw4byf/page.tsx | 50 | 1-50 | REVIEWED |
| src/app/(site)/y8vwp4bf7/page.tsx | 16 | 1-16 | REVIEWED |

Server-side gate summary for every CRM / Atlas page in the unit (all are server checks before render, none is client-only):

| page | gate | freshness |
|---|---|---|
| crm/page.tsx (login) | `validateSession` :29, redirects a valid session to /atlas | cached revocation |
| crm/atlas/page.tsx | `sessionValid()` :11 | fresh revocation |
| crm/atlas/[module]/page.tsx | `sessionValid()` :17, allowlist + `notFound()` :19-20 | fresh revocation |
| crm/mia/page.tsx | `validateSession` :12 | cached revocation |
| crm/partners/page.tsx | `validateSession` :9 | cached revocation |
| crm/partners/[id]/page.tsx | `validateSession` :9 | cached revocation |
| crm/whatsapp/page.tsx | `validateSession` :12 | cached revocation |
| crm/whatsapp/connect/page.tsx | `validateSession` :18 | cached revocation |
| crm/whatsapp/inbound-check/page.tsx | `validateSession` :18 | cached revocation |
| crm/layout.tsx | none (client component: idle timer, CSS, noindex meta only) | n/a |

`src/proxy.ts` does not check the session at all: it only sets the nonce CSP on /crm and /atlas and applies the cross-site guard to API paths.

## Findings

### SITE-04-F01: Cross-site request guard never runs for /api/mia (proxy matcher omits it)
- Severity: MEDIUM
- Confidence: high (that the guard is skipped); medium (exploitability)
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-352
- Files and lines: src/proxy.ts:125-127 (matcher), src/proxy.ts:61-65, src/lib/request-guard.ts:43; consumers: src/app/(site)/crm/mia/page.tsx:15-18 (Mia UI calling /api/mia/*); routes src/app/api/mia/send/route.ts:9-11, move/route.ts:9-11, status/route.ts:13-15, form-link/route.ts:14-16
- Evidence: `GUARDED_API_PREFIXES` lists `/api/mia/`, but `config.matcher` contains only `/crm`, `/atlas`, `/api/crm/:path*`, `/api/will/:path*`, `/api/atlas/:path*`. The proxy is therefore never invoked for `/api/mia/*`, so `crossSiteMutationReason` is dead code for those routes. The four mutating Mia routes check only `sessionValid()` and parse the body with `req.json().catch(() => ({}))` with no Content-Type or Origin check (grep of the mia tree found no origin check). The existing test `src/lib/__tests__/request-guard-mia-17nov.test.ts:4` asserts `isGuardedApiPath` only, not the matcher, so it passes while the guard is inactive.
- Root cause: prefix list and matcher are maintained in two places; `/api/mia/` was added to one only.
- Attack prerequisites: a logged-in CRM operator, plus an attacker able to run script or host a page on a same-site origin (any sibling subdomain of the registrable domain; this is the exact threat `request-guard.ts:4-7` says the guard exists for). The `crm_session` cookie is `SameSite=Strict` (verify-otp/route.ts:93), which blocks ordinary cross-site CSRF, so a fully foreign site cannot exploit this.
- Impact: forged POSTs to send a WhatsApp message to an SVT customer, move a customer between pipeline stages, pause/unpause Mia, or mint a form link, in the operator's name. A `text/plain` form post is a simple request (no preflight) and its body would still be parsed by `req.json()`.
- Recommended fix: add `'/api/mia/:path*'` to `config.matcher`; better, derive the matcher from `GUARDED_API_PREFIXES` so they cannot diverge. Optionally require `Content-Type: application/json` on mutating routes.
- Regression test: assert that for every prefix in `GUARDED_API_PREFIXES` the proxy `config.matcher` contains `<prefix>:path*`; plus a proxy-level test that `POST /api/mia/send` with `Sec-Fetch-Site: same-site` returns 403.
- Limits of this verification: I did not read the Mia route bodies beyond the auth and body-parse lines, and did not confirm at runtime that Next applies no other matcher. No second middleware file exists (`src/middleware.*` absent).

### SITE-04-F02: CRM page gates use the cached revocation list; a logged-out cookie can still render admin screens on a cold instance
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-613
- Files and lines: src/app/(site)/crm/page.tsx:29; crm/mia/page.tsx:12; crm/partners/page.tsx:9; crm/partners/[id]/page.tsx:9; crm/whatsapp/page.tsx:12; crm/whatsapp/connect/page.tsx:18; crm/whatsapp/inbound-check/page.tsx:18; helper src/lib/crm-store.ts:146-161 (vs. 111-124 and src/lib/will/auth.ts:17-20)
- Evidence: these pages call the synchronous `validateSession`, which starts a non-blocking refresh (`void refreshRevocation()`) and answers from in-memory `_revokedBefore` / `_revokedSids`. On a fresh serverless instance both are empty, so a token revoked by logout or idle logout but not yet expired (8 h TTL) passes. The two Atlas pages use `sessionValid()`, which awaits `ensureRevocationFresh()` first.
- Root cause: two validation helpers; the page gates use the one that may answer from a stale or empty cache.
- Attack prerequisites: possession of a `crm_session` cookie that was valid and has since been logged out, within its 8 h lifetime, and a request landing on an instance whose cache is cold or older than the last revocation.
- Impact: the admin UI shell renders (including the WhatsApp Connect screen, whose own header comment at connect/page.tsx:3-8 describes why unauthenticated rendering of it was unwanted). Customer data is not exposed by this path as far as I could see: the client components fetch from APIs that call `sessionValid()` (confirmed for /api/mia; other API trees belong to other units).
- Recommended fix: use `await sessionValid()` (or `validateSessionFresh`) in every page gate, as the Atlas pages already do.
- Regression test: with a mocked Redis holding a revoked-before epoch later than the token `iat` and an empty in-memory cache, each /crm page must redirect to /crm.
- Limits of this verification: static only; the size of the window depends on instance lifecycle. `crm/dashboard/page.tsx` is outside this unit; grep shows it uses the same `validateSession` at line 9.

### SITE-04-F03: No central session gate for /crm and /atlas; protection depends on every page remembering its own check
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-284 (defence in depth)
- Files and lines: src/app/(site)/crm/layout.tsx:1 and 75-108; src/proxy.ts:54-115
- Evidence: the /crm layout is a `'use client'` component with no session check, and the proxy (which already runs on every /crm and /atlas request) never inspects `crm_session`. All nine pages in this unit do gate themselves today, but the comment at whatsapp/connect/page.tsx:3-8 records that two pages previously shipped without a gate.
- Root cause: per-page gating with no fallback.
- Attack prerequisites: a future (or currently unreviewed) page under /crm added without the gate.
- Impact: unauthenticated render of an admin page. Today: none found in this unit.
- Recommended fix: make the layout a server component that performs the check for every path except `/crm` itself (moving the client pieces into a child), or reject requests without a structurally valid cookie in the proxy; keep the per-page checks.
- Regression test: a test that walks `src/app/(site)/crm/**/page.tsx` and fails if a page (other than the login page) lacks a session check.
- Limits of this verification: I only read the pages listed in this unit plus a grep of dashboard/page.tsx.

### SITE-04-F04: "Unlisted" form pages are served to anyone and their slugs are published in public code
- Severity: LOW
- Confidence: high (disclosure); low (impact, depends on API controls outside this unit)
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-656
- Files and lines: src/app/(site)/vukjw4byf/page.tsx:43-49; 3cw5w5hcx/page.tsx:43-49; rh84sez58/page.tsx:43-49; y8vwp4bf7/page.tsx:14-16; start/page.tsx:49-55; disclosure points: src/components/layout/PublicShellClient.tsx:33-36, src/app/robots.ts:26-31, hreflang/canonical/OpenGraph in each page's metadata (e.g. vukjw4byf/page.tsx:10-23)
- Evidence: the TFN, ABN, super and residency pages render their form component unconditionally; there is no server-side token or payment check in the page or layout. `config/form-paths.js` describes the random slugs as reset links and retired slugs as going to a "this link opens after payment" page, i.e. the slug is treated as the access control. The slugs are however shipped to every visitor inside the public client bundle (PublicShellClient path list), the residency slug is listed in robots.txt, and each page prints its own slug in canonical, hreflang and og:url tags.
- Root cause: obscurity of the path used as the gate for public forms.
- Attack prerequisites: none; read the public JS bundle or robots.txt.
- Impact: anyone can open the paid-service forms without paying or being invited. Whether that allows unpaid submissions, spam records or document uploads depends on the form submit and upload APIs, which are not in this unit.
- Recommended fix: treat the pages as public and enforce entitlement in the submit/upload APIs (signed per-customer token, as the tax form and residency fix already do with `?k=`); do not rely on slug rotation.
- Regression test: API-level test that a TFN/ABN/super submission without a valid per-customer token is rejected or flagged.
- Limits of this verification: `FormClient` components and the submit APIs were not read here (other units). Minor inconsistency also noted: layouts set `robots follow:false` while pages set `follow:true`.

### SITE-04-F05: One-time residency token travels in the query string and is left in the address bar
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-598
- Files and lines: src/app/(site)/y8vwp4bf7/page.tsx:15 (renders `ResidencyFixPanel`); src/components/ui/ResidencyFixPanel.tsx:30-34; link builder src/lib/will/i18n.ts:884-887
- Evidence: the personal link is `/<slug>?k=<token>`. The panel reads `k` from `window.location.search`, then sends it again as a GET query to `/api/tax-form/link?k=...`; it never removes it from the URL (no `history.replaceState` in the file). The token therefore persists in browser history and appears in request URLs logged by the host/CDN.
- Root cause: bearer token carried in URL query on both the page and the validation GET.
- Attack prerequisites: access to the customer's browser history / shared device, or to request logs, before the token is used.
- Impact: ability to change that customer's residency answer once (per the component comment nothing else on the record is reachable; the token is single-use, `link_used` handling at :54).
- Recommended fix: strip `k` from the address bar after reading it, and validate with a POST body instead of a GET query. Short expiry on the token if not already present.
- Regression test: component test that after mount `location.search` no longer contains `k`, and that no GET request carries the token.
- Limits of this verification: token entropy, expiry and single-use enforcement live in `/api/tax-form/*` (not read). Mitigations confirmed: GA is not loaded on these paths (RootDocument.tsx:292, 357; Analytics.tsx:67-68) and Referrer-Policy is `strict-origin-when-cross-origin` (next.config.js:52). The `/start` page is in the same token list; its `FormClient` was not read.

### SITE-04-F06: A full phone number is hard-coded as example text in a CRM client bundle
- Severity: LOW
- Confidence: low (cannot tell whether the number is real)
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-200
- Files and lines: src/app/(site)/crm/whatsapp/inbound-check/InboundCheckClient.tsx:64 (`placeholder` attribute)
- Evidence: the input placeholder contains an 11-digit Australian mobile number in international format. The file is a client component, so the string is in a static JS chunk that is downloadable without a session (static assets are not behind the page gate).
- Root cause: real-looking sample data in UI text.
- Attack prerequisites: none beyond fetching the chunk.
- Impact: disclosure of a personal or staff number if it is real. The same applies generally to all CRM client code: route names and the internal vocabulary of the inbound pipeline are readable from the static chunks even though the pages are gated.
- Recommended fix: replace with an obviously fictitious number (e.g. the ACMA reserved range) and confirm whose number it was.
- Regression test: lint/grep rule rejecting 10+ digit runs in `placeholder` strings.
- Limits of this verification: I did not check the number against any data source.

### SITE-04-F07: Idle logout is enforced only in the browser
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: CWE-613
- Files and lines: src/app/(site)/crm/layout.tsx:9, 18-55
- Evidence: the 30-minute idle timeout is a client `setTimeout` that calls `/api/crm/logout` with `reason: 'idle'`. A copied cookie used outside the browser is bounded only by the 8 h token TTL (crm-store.ts:140-144), and the timer does not run if the tab is closed before it fires.
- Root cause: stateless token with no server-side last-activity.
- Attack prerequisites: stolen session cookie (it is HttpOnly, Secure in production, SameSite=Strict).
- Impact: the idle window is not a server guarantee.
- Recommended fix: if a real idle limit is required, keep last-activity per `sid` server-side.
- Regression test: n/a (design note).
- Limits of this verification: logout route not read.

### SITE-04-F08: Dashboard error boundary prints the raw error message
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: CWE-209
- Files and lines: src/app/(site)/crm/dashboard/error.tsx:19-23
- Evidence: `{error?.message || 'Unknown error'}` and the digest are rendered. In production Next replaces server-component error messages with a generic one, so this mainly shows client-side error text; the page is behind the session gate. Rendered as text (no HTML injection).
- Root cause / fix: show a fixed message plus the digest only.
- Attack prerequisites: authenticated operator view; n/a for outsiders.
- Impact: negligible.
- Regression test: n/a.
- Limits of this verification: production behaviour of message redaction not verified at runtime.

## Checked and found sound
- Server-side session check before render on every CRM/Atlas page in the unit (table above); `ClientOnly` shims only load the client bundle after the server page has passed the gate.
- Atlas module route: allowlist object + `notFound()`, no reflection of the `module` param: crm/atlas/[module]/page.tsx:9-20.
- Atlas pages use the fresh revocation check and `force-dynamic`: crm/atlas/page.tsx:8-11, [module]/page.tsx:7,17.
- /atlas is a rewrite to /crm/atlas and is covered by the proxy matcher, the nonce CSP and the private/no-store + noindex headers: src/proxy.ts:86,126; next.config.js:150-154, 237-238.
- Login redirect targets are constants (`/atlas`, `/crm?timeout=1`), no open redirect: crm/page.tsx:30, LoginClient.tsx:58, crm/layout.tsx:32. The `timeout` query param only selects a fixed message: LoginClient.tsx:17-21.
- No password, OTP or session stored in localStorage; only an activity timestamp: crm/layout.tsx:17,37. Password and OTP go in POST bodies, not URLs: LoginClient.tsx:28-32, 51-55.
- No `dangerouslySetInnerHTML` with untrusted data in the unit. All uses are JSON-LD built from constants and passed through `jsonLdHtml`, which escapes `<`, `>`, `&`: about/page.tsx:203-205, contact/page.tsx:208-210, blog/page.tsx:115-116, calculator/page.tsx:147-150, start/page.tsx:52, the three form pages :46; src/lib/json-ld-html.ts.
- Server/API-supplied strings in CRM clients are rendered as React text (partner name, email, code, client full name, API error, inbound `detail` via `JSON.stringify` in `<pre>`): PartnersClient.tsx:179,202-204; PartnerDetailClient.tsx:121-127,151,213; InboundCheckClient.tsx:72,81,88,117.
- CSV export guards against formula injection and quotes cells: PartnersClient.tsx:91 with src/lib/csv.ts:12-21.
- Inbound-check number is reduced to digits and URL-encoded before use in the query: InboundCheckClient.tsx:44. The report shows only booleans for secrets (`appSecretSet`, `verifyTokenSet`, `sendTokenSet`), not values: :96-98.
- External links use `rel="noopener noreferrer"`: HomeWa.tsx:48-49, not-found.tsx:25. WhatsApp prefill is length-capped and URL-encoded: src/lib/wa.ts:196-198; calculator detail contains only computed figures: CalculatorClient.tsx:78-84.
- Blog analytics redacts emails and 6+ digit runs and caps strings before any provider call: blog/analytics.ts:46-57, 65.
- Calculator input is stripped, clamped and allowlisted; client-only arithmetic, nothing sent to a server: CalculatorClient.tsx:195-214.
- Guarantee wording limits the guarantee to TFN-income-only returns wherever it appears in the unit: about/page.tsx:107,173; contact/page.tsx:109; calculator/CalculatorClient.tsx:160; expenses/hospitality/page.tsx:71; expenses/labouring/page.tsx:72. No prices are printed in the unit's public pages.
- CRM pages get `noindex` + `Cache-Control: private, no-store`: next.config.js:122, 150-154; /crm disallowed in robots.ts:7-8.
- Token-bearing form paths are excluded from Google Analytics for en/de/ja, and no fr/it/es variants of those pages exist: RootDocument.tsx:292,357.
- Cross-brand: the Mia (SVT) screen sits behind the same CRM session; no SVT identifiers or data are embedded in WHT public pages in this unit.

## Open questions
1. Is `/api/mia` meant to be covered by the proxy guard (F01)? The prefix list and its test say yes; the matcher says no.
2. Is the number in InboundCheckClient.tsx:64 a real person's or the business's number (F06)?
3. Do the TFN / ABN / super submit and upload APIs require a per-customer token or payment state, or is the random slug the only gate (F04)? Not answerable from this unit.
4. Is the residency `?k=` token time-limited as well as single-use (F05)?
5. PartnersClient.tsx:91 exports `totalPaidHistorically*20` under a "$" column while PartnerDetailClient.tsx:183-184 computes dollars as `count*20`; if the API already returns dollars for `totalPaidHistorically` the CSV overstates it by 20x. Could not verify without the API route (not in unit). Not a security issue.
6. LoginClient.tsx:144 hard-codes the OTP destination mailbox shown after a correct password; if the server ever sends to a different address the UI will mislead. Informational.
7. Comment drift in src/proxy.ts:9-10 and RootDocument.tsx:306 says nonce CSP is OFF by default, while the code (proxy.ts:25) turns it ON for /crm unless `CSP_NONCE_DISABLED=true`. Behaviour is the safer one; comments are stale.
