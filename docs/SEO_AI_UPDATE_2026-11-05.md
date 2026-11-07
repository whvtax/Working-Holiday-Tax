# SEO and AI search update, 5 November 2026

Base: whvtax-PRODUCTION-FINAL-3.zip (FINAL58), as received on 5 Nov 2026. Every change below is on that version only.

## Fixed

1. **Iron rule: "our tax agent team"** removed from the guide `how-to-update-address-with-ato` in EN, DE, FR, IT and ES (now "our team"). It reached Google and AI engines through the Article abstract in JSON-LD (about 7,700 impressions in three months). JA was already correct. New test `__tests__/wht-copy-compliance-6-languages.test.ts` scans all six languages for agent claims and refund promises.
2. **Business schema is Organization only.** The `/#business` node was `Organization + ProfessionalService + AccountingService` (both extra types are LocalBusiness subtypes; AccountingService also reads as "we are accountants") in the layout, /de and /ja. The EN and ES home pages declared a second business entity `/#professionalservice`; it is now a `Service` provided by `/#business`.
3. **German page language switcher** linked to /de and /ja pages that return 404. `/german-working-holiday-tax` added to `EN_ONLY_ROUTES`.
4. **FR/IT/ES flagship pages** (`/fr/tax-return-australie-pvt`, `/it/dichiarazione-redditi-australia`, `/es/devolucion-impuestos-australia`) had 1 internal link each and competed with `/xx/tax-return`. Now linked from the language home, the tax return page and every guide in the Tax Return category (38 internal links each).
5. **Duplicate titles** in FR and IT (two tax year guides with the same title) fixed.
6. **Accessibility:** the hidden sticky breadcrumbs on every guide kept their links focusable (React 19 drops `inert=""`). Now `inert={!visible}`. axe: 0 violations on 16 checked pages.
7. **AI sitemap:** `sitemap-llms.xml` was missing the about page and the 7 expense pages in FR, IT and ES (24 URLs). Generator fixed, llms files regenerated (1,001 URLs).
8. **Expense pages Article schema:** added `image` and `mainEntityOfPage` (no dates were invented).
9. **`scripts/build-offline.sh`** stubbed fonts the site no longer uses and could not build. Updated to Noto Sans JP and Inter.

## Titles and descriptions (6 languages)

265 title and description changes on guides and service pages, listed in full in `docs/title-changes-5nov.txt`. Each language was done by a native writer against these rules: duplicates, length (title 60, description 155; JA 32 and 90), Search Console CTR below benchmark for the position (EN, DE, JA), and native search phrasing (FR, IT, ES). Every text was checked by script for length, dashes, agent wording, refund promises and prices.

Not changed on purpose ("what works stays"): any page with 100+ clicks, or 20+ clicks with a CTR near the benchmark for its position. Includes the home pages, `/blog/tfn-application-delayed`, `/blog/casual-shift-cancellation-rules-australia`, `/blog/what-is-medicare-working-holiday-makers`, `/ja/blog/what-is-a-tax-agent` and the French home title.

For guides the title is also the H1 and the Article headline, so those change together.

## Checks run

- `npx tsc --noEmit`: clean. `npx eslint src __tests__ --quiet`: clean.
- `npx jest`: 454 suites, 6,178 passed, 1 skipped, 0 failed.
- Production build (`scripts/build-offline.sh`): passed; real font imports restored.
- Full crawl of all 1,007 sitemap URLs on `next start`: 0 errors, 0 warnings (status, one H1, canonical, html lang, hreflang reciprocity, JSON-LD, duplicate titles/descriptions, 1,010 internal link targets). Compliance scan of rendered text + JSON-LD: 0 hits.
- Playwright on a phone viewport, 16 pages in 6 languages: no horizontal overflow, WhatsApp link with prefilled message in the page language, axe 0 violations.
- `npm audit --omit=dev`: 0 vulnerabilities.

## Not tested
- Real devices and screen readers; field Core Web Vitals; Google Rich Results Test (no access from here).
- Native-speaker review by a person of the new FR, IT and ES titles.

## Note
`.data/store.json` (local dev store with 24 customer records and audit rows) was inside the zip you sent. It is gitignored and is not in this zip. Keep it out of any zip you share.

## After deploy
1. Search Console: submit `sitemap.xml` again; Request Indexing for `/blog/how-to-update-address-with-ato` (and its /de, /fr, /it, /es versions), the three flagship pages and `/fr`, `/it`, `/es`.
2. Bing: run `npm run indexnow` once.
3. Rich Results Test on `/` and `/expenses/hospitality` to confirm one Organization and no LocalBusiness.
