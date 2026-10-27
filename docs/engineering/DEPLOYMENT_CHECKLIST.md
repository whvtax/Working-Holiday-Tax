# Deployment readiness checklist

## Known issues found on 26 Oct 2026 (to fix in milestone 0)
`npm audit`: 2 critical, 5 high, 2 moderate.
- `next` 16.3.3: critical advisories (RCE in `next/og` ImageResponse; Draft Mode leak with
  `use cache`). This project uses neither feature, so direct exposure is low, but the
  framework must move to 16.4.3. `sharp` (through Next) has a high librsvg advisory.
- `handlebars` (critical), `brace-expansion`, `browserslist`, `source-map-js`, `zod`,
  `postcss-selector-parser`, `baseline-browser-mapping`: development tooling (jest,
  eslint, build). Fix with `npm audit fix` and verify tests.

### Status after milestone 0 (26 Oct 2026)
- `next` and `eslint-config-next` 16.4.3, then `npm audit fix` (no `--force`).
  `npm audit`: 0 critical, 0 high, 3 moderate.
- Accepted risk, 3 moderate: `tailwindcss` 3 → `postcss-nested` → `postcss-selector-parser`.
  Build-time only (CSS compilation of our own source files); nothing reaches the browser
  or the server runtime. The only fix is Tailwind 4, a major upgrade with breaking config
  changes. Revisit together with the milestone 11 redesign, or earlier if an advisory
  becomes high or reachable at runtime.
- Verified: tsc, eslint, Jest 3126/3126, production build, browser smoke test.

## Every release
- [ ] `npx tsc --noEmit`, `npx eslint src --quiet`, `npx jest` all pass.
- [ ] Playwright journeys pass on a preview deployment at 390, 768, 1440 px.
- [ ] `npm audit` has no critical/high in production dependencies; Semgrep findings triaged.
- [ ] No secrets in the repository, zip or `.next/static` output.
- [ ] Environment variables present in Vercel for production and preview; preview never
      points at production data unless deliberately approved.
- [ ] Database migrations reviewed, backward compatible, applied before the code that needs
      them; backup taken before any data-changing migration.
- [ ] CSP checked in a real browser (no blocked scripts, forms submit, embeds load).
- [ ] Lighthouse mobile on key pages: performance >= 90, accessibility 100, best practices
      100, SEO 100.
- [ ] Sitemaps, robots, canonicals and hreflang correct per brand.
- [ ] Smoke test on production after deploy: home, form submit (test record, then
      removed with approval), CRM login, webhook health, cron run.
- [ ] Rollback path known (previous Vercel deployment).

## Student Visa Tax launch only
- [ ] Real SVT number set in `src/lib/svt/brand-public.ts` (`phone`, `whatsappNumber`,
      `whatsappIsPlaceholder: false`) BEFORE the domain is attached. The legal pages read it
      from there. `SVT_LAUNCH=true npx jest launch-gate` must pass.
- [ ] Database backup taken, then migration 047 AND 048 applied in the same session
      (Jo approved 047 on 26 Oct, to run at launch; 048 makes the form/lead triggers brand-aware) (brand on will_customers,
      crm_tasks, crm_clients, crm_leads, form_funnel_events). Verified idempotent locally.
- [ ] SVT WhatsApp line (decision 004), in this order: migration 047 applied; the new
      number added to the same WhatsApp Business account; template readiness checked and
      `_svt` twins approved for every template that names WHT (list the neutral ones in
      `SVT_SHARED_TEMPLATES`); THEN `SVT_WHATSAPP_PHONE_NUMBER_ID` set and redeployed. The
      health panel must show no missing schema (it probes the brand column once the line is on).
- [ ] Will brand-aware (milestone 5) BEFORE the form opens: otherwise an SVT customer would
      get the WHT WhatsApp confirmation. Until then SVT submissions only write an
      `svt_form_received` audit event.
- [ ] `SVT_FORMS_ENABLED=true` set in Vercel (production and preview) and redeployed; this
      opens exactly /api/tax-form and /api/tax-form/upload on the SVT host (decision 003).
- [ ] One test submission on the SVT domain: task shows the SVT chip in the CRM, files sit
      under svt/ in the private bucket, the test record is removed afterwards with approval.
- [ ] Domain and HTTPS on Vercel; host routing verified both ways.
- [ ] Business name registered to The Accounting Academy Services Pty Limited (ABN 93 671 788 355, Tax Agent Number 26233096); TPB notified.
- [ ] WhatsApp number live in the WABA; webhook routes it to the SVT brand.
- [ ] Meta templates approved in en, zh, vi.
- [x] Search Console set up and sitemap submitted (Jo, 27 Oct: 110 URLs from the old deploy; v4 lists 560). Bing Webmaster imported from Search Console (Jo, 27 Oct).
- [ ] SVT: www.studentvisatax.com.au redirects to the apex in the Vercel domain settings (308).
- [x] SVT GA4 property G-YHFJYVG620, its own account (Jo, 27 Oct); tag, CSP origins and the `whatsapp_click` event wired, /tax-form untagged. Left: mark `whatsapp_click` as a key event once the first one arrives. Original note: an SVT-only GA4 property (never shared with WHT); then add the tag, its CSP origins and a `whatsapp_click` key event (every SVT WhatsApp link carries `data-wa-pos`). Never tag /tax-form. Google Ads linked to that property; Meta uses Click-to-WhatsApp ads on the SVT number only.
- [ ] SVT: before any Chinese-language ads, open a wa.me link inside the WeChat and Xiaohongshu browsers on a real phone.
- [x] Email inbox info@studentvisatax.com.au working (Jo checked send and reply, 27 Oct).
- [ ] Google Business Profile "Student Visa Tax" created by Jo on 27 Oct (service area, no address, no phone yet, waiting for Google's check). Once approved: put the review link in the student brand config, unblock `review_link` for Mia (SVT_BLOCKED_KEYS), add the reviews badge to the form and site like WHT, add the profile to the site JSON-LD `sameAs`. Add the SVT phone to the profile when the number is live.
- [ ] Rollback note: unsetting `SVT_WHATSAPP_PHONE_NUMBER_ID` is only safe while no wa_id
      exists under both brands; to stop the SVT line, turn the number off in Meta instead.
- [ ] After deploy, the tick applies the Library brand tags (`knowledge_brand_tags`) and the
      27 Oct deadline answer (`knowledge_fix` = fix-27oct): check both settings before the
      SVT line goes on.
- [ ] Brand separation: no cross-mention or cross-link in pages, emails, WhatsApp texts,
      Xero invoice template, JSON-LD, analytics or social profiles.

## Recommended CI (needs a GitHub repository)
On every pull request: install with `npm ci`, type check, lint, Jest, `npm audit
--omit=dev --audit-level=high`, Semgrep (security rules), Playwright against the Vercel
preview, Lighthouse CI on the home page and one guide. Merge blocked unless all pass.
