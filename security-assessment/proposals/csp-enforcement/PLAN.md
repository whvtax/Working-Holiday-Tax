# CSP enforcement plan (sec2-frontend, 2 Nov 2026)

Status: proposal only. Nothing here is applied. Next 16.4.3, React 19.2.8. No production build was available and no browser was run, so every "would break" item below is derived from code, not observed.

## Where we are

| Surface | Mechanism | script-src | Weak points |
|---|---|---|---|
| WHT public (~520 static pages, 6 languages) | static header, next.config.js `staticCsp` | `'self' 'unsafe-inline' googletagmanager connect.facebook.net` | unsafe-inline; unused origins (supabase wildcards, resend, facebook, fonts.googleapis) usable as exfil channels after any XSS |
| SVT public (3 languages) | `svtCsp` | `'self' 'unsafe-inline' googletagmanager` | unsafe-inline only |
| /crm | nonce + strict-dynamic from src/proxy.ts | nonce | connect-src/img-src/frame-src carry the same unused public origins |
| Report-Only candidate | `config/csp-report-only.js`, off unless `CSP_REPORT_ONLY=true` | same as above minus unused origins | no receiver yet |

## Options for the public pages, evaluated

1. Nonce. Impossible on static HTML (proven 29 Aug: every chunk refused). Only possible if pages become dynamic, which loses the CDN and the SEO/perf model. Rejected for the whole site.
2. Hashes of inline scripts. Next emits per-page inline `self.__next_f.push(...)` flight data and bootstrap scripts, so the hash set differs on every page and changes every build. A single header cannot carry it. A post-build step could emit one header rule per route (~520 x hashes), which hits Vercel's route/header limits and breaks on every deploy that is not rebuilt together. `experimental.sri` (Next 16) adds integrity to external chunk tags only and is webpack-only, while Next 16 builds with Turbopack by default. Rejected as not worth the fragility.
3. `strict-dynamic` without nonce or hash. Ignored by browsers unless a nonce or hash is present. No value.
4. Keep `'unsafe-inline'` on public pages and remove everything else that helps an attacker (recommended). With no user HTML on those pages (pinned by `round2-frontend-security.test.ts`: only JSON-LD, constant style and the sanitised guide renderer use dangerouslySetInnerHTML), the practical XSS risk is low, and the exfiltration and framing directives still bite.
5. Strict nonce CSP only for the pages that hold PII: the five questionnaire routes in WHT (en/de/ja) and three in SVT. They are interactive client pages and low traffic. Making just those routes dynamic (`export const dynamic = 'force-dynamic'`, already required by `useSearchParams` in FormClient) and adding them to the proxy matcher gives nonce + strict-dynamic exactly where TFN, passport and bank data are typed. Recommended as stage 3.

## Staged plan

Stage 0 (done in this round): X-Robots-Tag and private no-store on /crm, noindex on /api, `NOT_CRM` boundary fix, poweredByHeader off.

Stage 1, Report-Only on Preview (1 day). Set `CSP_REPORT_ONLY=true`. Walk: home, a guide with YouTube, calculator, /start through upload preview and submit, /de and /ja equivalents, each SVT language. Watch the DevTools console. Expected clean.

Stage 2, Production Report-Only (2 weeks). Add a receiver (patch P3 in `parts/sec-frontend.md`, or a hosted collector) and `CSP_REPORT_URI`. Add the `Reporting-Endpoints` / `report-to` pair as well because Chromium is moving off `report-uri`. Triage: ignore `chrome-extension:`/`moz-extension:`/`safari-extension:`, inline-injected translation overlays; fix real hits. Decision gate: zero first-party violations for 7 days.

Stage 3, swap the candidate in as the enforced public policy (one PR, own browser test). What changes for users, and what would break if wrong:
- Removing `fonts.googleapis.com` / `fonts.gstatic.com`: breaks nothing if fonts are self-hosted (test `font-imports.test.ts` asserts it). If a page still links Google Fonts the text falls back to system font.
- Removing `connect.facebook.net`, `graph.facebook.com`, facebook frames from public pages: nothing public uses them. /crm keeps them through its own CSP.
- Removing `*.supabase.co/.in` from connect-src and img-src: breaks any browser-side upload straight to Supabase or any `<img src="https://x.supabase.co/...">`. Code review found neither (uploads go through /api/tax-form/upload, images through /_next/image), but the Report-Only period is the proof. If it breaks: the tax form upload fails at the final step, so test a real upload on Preview.
- Removing `api.resend.com`: server-only, no effect.
- Adding `*.analytics.google.com`, `stats.g.doubleclick.net` and GA img-src: prevents silently dropped GA4 hits (FE-06).
- `frame-src blob:` stays for PDF previews of the visitor's own uploads. `youtube.com` bare origin dropped; embeds use `www.youtube.com`.
- Removing the absolute WHT origin from img-src: OG images are fetched by crawlers, not by the page.

Stage 4, form pages only: nonce CSP (option 5). What would break: any third-party inline snippet on those pages (GA is a `next/script` and receives the nonce automatically; with strict-dynamic its loaded scripts inherit trust). Pair with `ga-off-form-pages` so no Google script runs where TFN is typed. Test: submit a full form on Preview in a real browser, camera/file inputs, PDF preview, residency step, de and ja.

Stage 5, /crm tightening (independent, can go first). In `src/proxy.ts` `buildCsp`: drop `https://*.supabase.co https://*.supabase.in https://api.resend.com` from connect-src, drop fonts.googleapis/gstatic if the CRM loads none, drop youtube from frame-src, keep facebook only for the connect page. Browser-verify login, dashboard, Will, document preview, and the WhatsApp connect popup. Escape hatch stays `CSP_NONCE_DISABLED=true`.

## Rollback

Every stage is a header change. Rollback is reverting the config or unsetting the env flag, no data impact.

## Residual risk after all stages

Public pages keep `'unsafe-inline'`. The control that carries the XSS risk there is output encoding plus the sink-pinning test, not CSP. A new `dangerouslySetInnerHTML` with non-constant input fails CI.
