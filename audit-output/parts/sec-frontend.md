# sec-frontend: Frontend and Browser Security (Agent 11)

Project copy: /home/claude/work/whvtax-security. Static review plus local jest only. No production access, no secrets read or printed, nothing deployed.

## Scope covered

- XSS and unsafe HTML: every `dangerouslySetInnerHTML` (309 uses in 90 files), `innerHTML`/`document.write`/`eval`/`new Function` (none found), the guide markdown renderer, JSON-LD injection, the CRM surface that renders text typed by strangers over WhatsApp, the downloadable task HTML.
- Headers: `next.config.js` (enforced CSP for WHT and SVT, all other headers), `vercel.json`, `src/proxy.ts` (nonce CSP on /crm). I ran `headers()` from `next.config.js` to see the effective rule order.
- Redirects: `next.config.js` redirects, every `redirect()`, `router.push`, `window.location` in src.
- `target="_blank"`: all 14 sites plus `window.open`.
- Client-side secrets: every `'use client'` file for non-public `process.env`, client imports of server-only modules, every `NEXT_PUBLIC_*`.
- Browser storage, third-party scripts and origins, postMessage handlers, iframes.
- Route groups: (site) English, (de), (ja), (fr), (it), (es), and the SVT groups (svt), (svt-zh), (svt-vi). Rendering differs only in the root document and JSON-LD helper; findings below say where.

## Findings

| ID | Severity | Status | Title | Evidence |
|---|---|---|---|---|
| FE-01 | Low | Confirmed, fixed | Guide inline-markdown renderer injects unescaped HTML and any link scheme | `src/app/(site)/blog/[slug]/GuideArticle.tsx` (renderInline, 4 call sites) |
| FE-02 | Low | Confirmed, fixed | WhatsApp Embedded Signup `postMessage` origin check is a loose regex | `src/app/(site)/crm/whatsapp/connect/ConnectClient.tsx:58` (old line) |
| FE-03 | Low (Medium if the apex hosts other services) | Confirmed, patch proposed | HSTS already sends `includeSubDomains; preload` on both brands | `next.config.js` `securityHeaders` (HSTS entry) |
| FE-04 | Info | Confirmed, patch proposed | `X-XSS-Protection: 1; mode=block` is obsolete | `next.config.js` `securityHeaders` |
| FE-05 | Info | Confirmed | Enforced public CSP keeps `script-src 'unsafe-inline'` (by design) and over-broad origin allowlist | `next.config.js` `staticCsp` |
| FE-06 | Info | Suspected | Enforced CSP may be missing GA4 origins (`*.analytics.google.com`, `stats.g.doubleclick.net`, GA in `img-src`) | `next.config.js` `staticCsp`, `svtCsp` |
| FE-07 | Info | Confirmed | 299 JSON-LD blocks use bare `JSON.stringify` (no `</script>` escaping); not exploitable today | 85 files, e.g. `src/components/wht/JobPageBlocks.tsx:93` |
| FE-08 | Info | Confirmed | Form snapshot of personal fields in `sessionStorage` (TFN excluded) | `src/app/(site)/start/FormClient.tsx:423` |
| FE-09 | Info | Confirmed | Third-party review data (Featurable) rendered as React text; avatar URL set as `<img src>` | `src/components/ui/GoogleReviews.tsx:102` |
| FE-10 | Info | Confirmed | `rel="noreferrer"` (not `noopener noreferrer`) in CRM attachment links; same-origin, modern browsers imply noopener | `src/components/will/Dashboard.tsx:503,511` |

Items checked and found clean (so nobody re-checks them):

- **Client-side secrets: none.** No `'use client'` file reads a non-public env var. The only client import of a server library is `import type` from `@/lib/will/store` (erased) and `ASSISTANT_NAME` from `@/lib/will/config`, which imports nothing and whose env reads are not secrets. `NEXT_PUBLIC_*` in use: `SUPABASE_URL`, `SITE_URL`, `FEATURABLE_ID`, `META_APP_ID`, `META_CONFIG_ID`, `META_EMBEDDED_CONFIG_ID`. All are identifiers, none is a secret. The hardcoded Featurable widget id and Meta app id fallbacks are public identifiers by design. Hygiene gap only: the repo does not use the `server-only` package, so a future client import of `crm-store`, `supabase` or `will/*` would not fail the build. See FE-11 below.
- **Open redirects: none.** All `redirects()` destinations are fixed paths; the two `:path*` redirects keep a fixed `/blog/` prefix, so `/guides//evil.example` cannot escape. Every `redirect()`, `router.push`, `location.replace` argument is a constant or a `brand.url()` result. The only query parameters read by client code are `ref` (FormClient, posted as data) and `timeout=1` (a boolean). `utm_source` is read for GA only.
- **`target="_blank"`: 14 sites, all carry `rel` with noopener** (12 `noopener noreferrer`, 2 `noreferrer` which implies it). `window.open(proxyUrl,'_blank')` opens a same-origin API path.
- **CRM XSS surface.** WhatsApp text, captions, filenames, names are rendered as React text (auto-escaped). No linkify, no `dangerouslySetInnerHTML` of message content. Media goes through `/api/will/media/<encoded id>`. The one hand-built HTML document (`downloadTaskPdf`, DashboardClient.tsx ~976) escapes all interpolated customer values with `esc()` (`& < > " '`); the unescaped `sec(title)` arguments are string literals. It is downloaded as a file, not rendered in the app origin. The /crm nonce CSP with `strict-dynamic` is a good second layer.
- **Meta pixel / ad tags: not present.** Only GA4 (gtag via `next/script`, WHT `G-8667...`, SVT `G-YHFJ...`, IDs are public by nature), YouTube iframes, and the Facebook JS SDK on /crm/whatsapp/connect only.
- **Service workers: none.** No `navigator.serviceWorker`.
- **Cookies from client JS:** none (`document.cookie` is not used). `localStorage` holds only `wht-lang-banner-seen` and a CRM activity timestamp. `sessionStorage` is FE-08 and a GA referral label.
- **TFN handling in the browser:** confirmed kept out of storage by design (`src/lib/tax-form-handoff.ts` in-memory module singleton; excluded from the snapshot object).
- **Route groups.** (de)/(ja)/(fr)/(it)/(es)/(site) all go through `RootDocument.tsx`, which already escapes `<`, `>`, `&`, U+2028/2029 in its Organization JSON-LD (JSONLD-04). SVT's three groups go through `SvtDocument.tsx` and `src/lib/svt/jsonld.ts`, which also escape. Only the per-page JSON-LD blocks in the WHT groups are bare (FE-07). No other rendering difference affects security. The `/crm` route exists only under (site).

### FE-01 detail (fixed)

`renderInline` turned `**x**` and `[text](href)` into HTML for `dangerouslySetInnerHTML` with no escaping and no href validation. Exploitability in this architecture: the body strings are static TypeScript in `src/app/(site)/blog/data.ts`; I scanned all of them and found no `<`, no `javascript:`/`data:` link, and only `/path` and `https://` hrefs, so nothing is exploitable today. Impact if content ever came from a CMS, a translation vendor or an unreviewed PR: stored XSS on every guide page for every visitor, and the public CSP would not stop it (`'unsafe-inline'`). Fix: moved the function to `src/lib/render-inline.ts`, escapes `<`/`>`, and renders a link only for `/path`, `#anchor`, `https://` or `mailto:` without quotes or whitespace (anything else becomes plain text). Verified byte-identical output to the old renderer for every line of every guide (test below), so SEO, text and layout are unchanged. Note it only affects the English guides: the locale guides use `LocaleGuidePage`, which renders React text.

### FE-02 detail (fixed)

`/facebook\.com$/.test(new URL(event.origin).hostname)` accepts `evilfacebook.com` (no dot boundary) and throws on the opaque `"null"` origin. Exploitability: low. The page is behind the CRM login, the attacker must hold a window reference to the open popup (for example the admin follows a link to an attacker page that opens /crm/whatsapp/connect), and the injected `phone_number_id`/`waba_id` are only used together with a token the admin obtained from a real Facebook login, which Meta then verifies server-side (`/api/will/whatsapp/connect`). Worst case is connecting the wrong phone id and a failed or confusing connect, not credential theft. Fix: `src/lib/fb-origin.ts` requires https and `facebook.com` or `*.facebook.com`, and never throws. Legitimate Embedded Signup origins (`www.facebook.com`, `web.facebook.com`, `business.facebook.com`) still pass.

### FE-03 HSTS (patch only, owner decision)

The brief says not to add `includeSubDomains` or `preload`. They are already present in the locked build on every response, both brands (`max-age=63072000; includeSubDomains; preload`). Consequences: after one visit, browsers force HTTPS for every subdomain of each apex for two years, and the `preload` token marks the domain as eligible for browser preload lists. I cannot see DNS, so I cannot tell whether any subdomain (mail tracking, staging, a Vercel preview alias, a legacy host) is HTTP-only, nor whether either domain has already been submitted to hstspreload.org. If a domain is on the preload list, removing the token does nothing until the list is updated and removal can take months, so this needs the owner to check hstspreload.org for both domains and the DNS zone first. I did not change it. Patch is below.

### FE-05 and CSP current state

Enforced today (Category B, untouched):

- Public WHT: `default-src 'self'`; `script-src 'self' 'unsafe-inline' googletagmanager.com connect.facebook.net`; `style-src 'self' 'unsafe-inline' fonts.googleapis.com`; fonts from `fonts.gstatic.com`; `img-src` self, data, blob, `*.supabase.co/.in`, own absolute origin, `lh3.googleusercontent.com`; frames YouTube plus Facebook; `connect-src` Supabase wildcards, `api.resend.com`, GA, Facebook Graph; `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`.
- SVT: same shape, least privilege (no Facebook, no YouTube, no Google Fonts, no WHT domain).
- /crm: nonce plus `strict-dynamic` set per request by `src/proxy.ts` (default on, `CSP_NONCE_DISABLED=true` to fall back). The static CSP is deliberately not applied there, so there is never an intersection of two policies. Nonce is `btoa(randomUUID())`, adequate entropy. The Facebook SDK is added by a nonced script so `strict-dynamic` covers it.
- The decision to keep `'unsafe-inline'` on the ~520 prerendered public pages is correct for this architecture (documented, browser-verified). Public pages render no user-supplied HTML, so the residual XSS risk is low. I do not recommend revisiting it; the realistic next step is hash-based script CSP (Next `experimental.sri`), and only after a Report-Only period.
- Over-broad but low-impact: `*.supabase.co`/`.in` in `connect-src` and `img-src` (any Supabase project, usable as an exfiltration channel after an XSS), `connect.facebook.net`, `graph.facebook.com`, Facebook frames and `api.resend.com` on public pages that never use them (fonts are self-hosted per `font-imports.test.ts`, Resend is server-only, no client component imports Supabase). These are harmless unless XSS already exists.

### FE-06 (Suspected)

Google's GA4 CSP guidance lists `*.analytics.google.com` and `stats.g.doubleclick.net` for `connect-src` and the GA origins for `img-src`. The enforced policy has `*.google-analytics.com` and `www.googletagmanager.com` in `connect-src` only. GA4 normally works with fetch/beacon to `region1.google-analytics.com` (covered), so most hits arrive, but some hits (Google Signals, image fallback) may be silently blocked. Only a Report-Only period will say. Do not edit the enforced policy; check the reports.

## Fixes applied (project copy)

- `src/lib/render-inline.ts` (new) and `src/app/(site)/blog/[slug]/GuideArticle.tsx` (renderInline now delegates, plus import): FE-01.
- `src/lib/fb-origin.ts` (new) and `src/app/(site)/crm/whatsapp/connect/ConnectClient.tsx` (import plus one-line origin check): FE-02.
- `config/csp-report-only.js` (new) and `next.config.js` (one require plus one spread of two header rules): opt-in Report-Only CSP candidate. **Off by default.** With `CSP_REPORT_ONLY` unset, `headers()` returns exactly the same 9 rules as before (asserted by test). It uses a different header key, so it can never merge with or weaken the enforced CSP, it is never attached to /crm, and SVT hosts get a separate SVT candidate. Optional `CSP_REPORT_URI` (a same-site path or https URL only) adds `report-uri`.
- Tests: `src/lib/__tests__/frontend-security.test.ts`, `src/lib/__tests__/csp-report-only.test.ts` (32 tests).

### Report-Only rollout plan (recommended, nothing enforced)

1. Vercel Preview only: set `CSP_REPORT_ONLY=true`, open WHT pages in all six languages, the tax form (upload previews, camera/file inputs), a guide with the YouTube embed, the calculator, then an SVT page in each of en/zh/vi, with DevTools console open. Violations print there even without a receiver.
2. Add a receiver (patch below) or a hosted collector, set `CSP_REPORT_URI`, enable on Production for 2 weeks. Expect noise from browser extensions (`chrome-extension:`, `moz-extension:`) and injected ad/translation scripts; ignore those.
3. Review: anything real and legitimate gets added to the candidate; if clean, the owner decides whether to swap the candidate into the enforced policy (separate Category B change with its own browser test). `'unsafe-inline'` is out of scope for that swap.
4. Do not enable on /crm (it has its own nonce CSP).

## Patches proposed (not applied)

**P1: HSTS (owner to check DNS and hstspreload.org first).**

```diff
--- a/next.config.js
+++ b/next.config.js
@@ const securityHeaders = [
-  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
+  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
```

If either domain is already on the preload list, keep the header as is and skip this. A first step that lowers risk without losing HTTPS: `max-age=31536000` while the inventory is done.

**P2: obsolete header.**

```diff
-  { key: 'X-XSS-Protection',        value: '1; mode=block' },
+  { key: 'X-XSS-Protection',        value: '0' },
```

The legacy XSS auditor was removed from every current browser; `0` is the OWASP-recommended value and avoids auditor-based information leaks in very old ones. Also optional: drop `interest-cohort=()` from Permissions-Policy (the FLoC feature no longer exists; Chrome logs an "unrecognized feature" console message).

**P3: CSP report receiver (Category B: new unauthenticated endpoint, needs review and a rate-limit decision).**

```diff
--- /dev/null
+++ b/src/app/api/csp-report/route.ts
@@
+import { NextResponse } from 'next/server'
+import { isRateLimited } from '@/lib/rate-limit'
+import { getClientIp } from '@/lib/get-ip'
+
+export const dynamic = 'force-dynamic'
+const MAX_BYTES = 8 * 1024
+
+// Logs one line per violation: directive plus blocked ORIGIN and page PATH only.
+// Never the query string (it can carry a ref code or utm) and never the body verbatim.
+export async function POST(req: Request) {
+  if (await isRateLimited(getClientIp(req), 'csp-report', 30)) return new NextResponse(null, { status: 204 })
+  const raw = await req.text()
+  if (raw.length > MAX_BYTES) return new NextResponse(null, { status: 204 })
+  try {
+    const j = JSON.parse(raw)
+    const r = j['csp-report'] ?? (Array.isArray(j) ? j[0]?.body : j?.body) ?? {}
+    const origin = (u: unknown) => { try { return new URL(String(u)).origin } catch { return String(u).slice(0, 40) } }
+    const path = (u: unknown) => { try { return new URL(String(u)).pathname } catch { return '' } }
+    console.warn('[csp-report]', JSON.stringify({
+      directive: String(r['violated-directive'] ?? r.effectiveDirective ?? '').slice(0, 60),
+      blocked: origin(r['blocked-uri'] ?? r.blockedURL),
+      page: path(r['document-uri'] ?? r.documentURL),
+    }))
+  } catch { /* ignore malformed */ }
+  return new NextResponse(null, { status: 204 })
+}
```

Notes: it always answers 204 (no oracle, no error amplification). SVT hosts 404 every `/api` route not on `SVT_API_ALLOWLIST` (`config/brand-routing.js`), so SVT violations need either that allowlist entry or an external collector; WHT-only collection is a sensible first stage. A hosted collector (report-uri.com style) avoids a new public endpoint entirely.

**P4: optional JSON-LD hardening codemod (FE-07).** Add a helper identical to `src/lib/svt/jsonld.ts` to `src/lib/` and replace `__html: JSON.stringify(X)` with `__html: safeJsonLd(X)` in the 85 files. Output differs only by `<`/`>`/`&` escapes, which JSON parsers (Google included) decode identically. I did not apply it: 299 edits across every page's structured data in a locked build is a lot of diff surface for a risk that is currently zero (all inputs are static repo strings; no review text, form data or request data reaches any JSON-LD). Recommend doing it only if content is ever sourced from outside the repo, and verify with the Rich Results Test.

**P5: `server-only` guard (FE-11, hygiene).** Add `import 'server-only'` as the first line of `src/lib/supabase.ts`, `crm-store.ts`, `rate-limit.ts`, `security-watch.ts`, `will/auth.ts`, `will/channel.ts`, `will/claude.ts`, `will/service.ts`, `will/store.ts` so a client import fails the build instead of silently bundling code that would read an undefined env. Needs `npm i server-only` (a new dependency, so I did not do it; do not run it in this copy).

## Tests run

- `npx tsc --noEmit`: clean.
- `npx jest src/lib/__tests__/frontend-security.test.ts src/lib/__tests__/csp-report-only.test.ts`: 2 suites, 32 tests passed. These include: new renderer output equals the old renderer for every line of every English guide (more than 1000 lines); `<script>`/`<img onerror>` neutralised; 9 hostile hrefs (`javascript:`, mixed case, `data:`, `//host`, `http:`, attribute-breakout quotes, leading space) never become links; Facebook origin accepted/rejected tables; Report-Only header is off by default, never enforcing, has no unsafe-eval or wildcard in script-src, keeps SVT free of WHT/Facebook/YouTube origins, rejects a hostile `CSP_REPORT_URI`, and `next.config.js` enforced rules are identical with the flag on or off.
- Wider run `npx jest src/lib/__tests__ __tests__`: see the line at the end of this file.
- Manually ran `next.config.js` `headers()` to confirm effective ordering (the SVT rule replaces the CSP key for SVT hosts; `/crm` receives no static CSP).

## Specialist perspectives (Agent 11 and neighbours)

- **Frontend/browser:** the public site is a content site with no user HTML, so the high-value surface is /crm (customer-authored text, identity documents). That surface is well defended: React escaping, nonce plus strict-dynamic, private bucket proxied behind a session check, frame-ancestors none, COOP same-origin-allow-popups for the Facebook popup. The remaining gaps are low.
- **Red team:** best chain I could build is XSS on a public page, then read `sessionStorage` form snapshot (name, DOB, address, email, phone; no TFN) or phish through a fake form. It needs an injection point; I found none (FE-01 was the only unescaped HTML path and its input is static). The enforced `connect-src` wildcard `*.supabase.co` would let an attacker exfiltrate to their own Supabase project, a reason to tighten after the Report-Only period.
- **Privacy/compliance (APP 11):** TFN never touches browser storage (by design, tested in code comments only). Personal fields in `sessionStorage` (FE-08) live only for the tab and are removed on restore and on submit; acceptable, but note the form pages are `Cache-Control` default for pages, so confirm no personal data is ever in a cached HTML response (not applicable here: form state is client-only).
- **Blue team:** there is no CSP violation telemetry today, so a CSP bypass would be invisible. The Report-Only receiver (P3) doubles as detection.
- **QA/regression:** the guide renderer test pins current output against the whole guide corpus; any future content that contains raw HTML in a guide body will now render escaped, and the test will not catch intended HTML, so authors should be told guide bodies are markdown-only.

## Not assessed / needs infrastructure access

- Actual response headers as served by Vercel (it can add or override headers such as HSTS; I read config, not live responses).
- DNS zone and subdomain inventory, hstspreload.org status of both domains (blocks FE-03 decision).
- CSP behaviour in a real browser (no browser run; Report-Only plan above covers it). GA4 completeness (FE-06).
- Vercel preview/branch alias exposure; third-party consoles (Featurable, Meta app domain allowlist for the Embedded Signup popup).
- Cookie flags and session handling (other agents' scope). `npm audit` (supply-chain agent's scope).

## Devil's Advocate

- **FE-01 is real but not exploitable today.** I label it Low, not Medium, for that reason. Could the fix break production? It changes output only if a body contains `<`, `>` or an unusual link, and the corpus test shows zero differences across all English guides. Risk: a future author who deliberately wrote an `http://` link or an inline `<br>` will see it rendered as text; that is the intended behaviour and is visible immediately.
- **FE-02 is a theoretical attack** (needs a logged-in admin plus a hostile page that opens the popup and a valid Meta code). I kept it Low. The fix cannot reject Meta's real origins because Meta serves the signup from `*.facebook.com`; if Meta ever used `facebook.net` or another domain, the connect flow would stop receiving the phone id (the connect would then fall back to the WABA lookup in the server route). Test this on the CRM connect page once in a browser before relying on it, since I could not.
- **FE-03 might be intentional and already preloaded.** I did not claim a vulnerability, only an unverified blast radius. Removing the tokens could be pointless or mildly harmful if the owner relies on them. Hence patch-only.
- **Report-Only candidate:** it is dead code unless the env flag is set, and even then it enforces nothing. Possible harm is only console noise or report volume. A Report-Only header with `report-uri` to a public endpoint can be spammed, which is why P3 is rate-limited, size-capped and logs only origin plus path. Not applying P3 means no extra attack surface at all.
- **"Why not just remove `'unsafe-inline'`?"** Because it was tested and broke all prerendered pages; I agree with that decision and did not suggest it.
- **Could a rate limit block real customers?** I added none.

## Full jest run

`npx jest src/lib/__tests__ __tests__`: 377 suites passed, 4690 tests passed, 1 skipped, 0 failed. `npx tsc --noEmit` clean.
