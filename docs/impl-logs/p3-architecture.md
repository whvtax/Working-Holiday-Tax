# p3-architecture: more pages indexed and ranking through site architecture (WHT + SVT)

Inputs: `gsc24/wht-coverage-1124.xlsx`, `wht-crawled-not-indexed-1124.xlsx` (156 URLs), `svt-coverage-1124.xlsx`,
`gsc24/wht/Pages.csv`, Bing `AIPageStatsReport`, code `repo/whvtax-FINAL58`, a15, a19. Scripts and raw output:
`S/p3/graph.py`, `S/p3/out.txt`, `S/p3/guides.json`. Jo's decisions of 24 Nov respected (no new languages, no reviewer
line, no new fee displays, no MES arranging, no SVT consolidation, no TFN mail address). Priority from Jo: tax return and
super (DASP) are the core; TFN and ABN feed them.

## 1. Facts that drive the design
- F1 Indexing is recovering, not collapsing. WHT Indexed 292 (23 Oct) > 335 (24 Oct) > 402 (7 Nov) > 452 (10 Nov) >
  503 (14 Nov); "Crawled, not indexed" 248 (6 Nov) > 156 (14 Nov) (coverage Chart, CNI Chart). Inference: the 21 Oct and
  5 to 6 Nov work is being re-evaluated; the remaining 156 are mostly stale verdicts.
- F2 The 156: 121 last crawled Apr to Aug. Split (S/p3/out.txt): 56 ja, 48 de, 21 en guides (7 of them already 301),
  1 fr; 20 `/guides/*` (301 already); 3 fonts, manifest.json, `/tfn/` (308), it/ja category hubs; money pages
  /de/tax-return (170 impr), /ja/abn (22), /de/tax-residency (retired form slug, 302 to /de/link-after-payment).
- F3 Link starvation. 63 of 144 EN guides get zero in-body links from other guides, incl. the top page
  how-long-does-it-take-to-get-a-tfn (51,136 impr incl. fragments; 1,664 Copilot citations) and can-you-start-work-
  without-a-tfn (13,043). DE 62 and JA 64 guides get zero. Of the 126 CNI guide URLs, 68 have zero in-body links in
  their own language. Related links follow category file order (`getRelatedGuides`, `(site)/blog/[slug]/page.tsx` 366;
  `LocaleGuidePage.tsx` 216), so neighbours, not topics, share equity.
- F4 Money pages are weak where Jo earns. /tax-return 760 impr, 7 clicks; /superannuation 9,457 / 41; /de/tax-return
  170 / 4 (not indexed); /ja/tax-return 27 / 2; fr/it/es flagships 23 impr total (Pages.csv). Every EN guide links a
  money page somewhere in its body, but only 9 of 144 do so in the first three paragraphs. Nav lists TFN and ABN before
  Tax Return and Super (`Nav.tsx` 36 to 39) and describes Tax Return as "Lodge your annual return" (wording rule).
- F5 FR/IT/ES have two tax return pages each: `/<l>/tax-return` (hreflang twin) and the flagship
  (`LOCALE_ONLY_ROUTES`). FR bodies link `/tax-return` 131 times and the flagship 23 times: the split dilutes both.
- F6 SVT has no tax return page: the home (/, /zh, /vi) is the tax return hub, yet `LONG_SERVICE` sends "Tax return",
  "Deductions" and "Work" articles to /pricing and /how-it-works (`content/long/en/links.ts`).
- F7 lastmod carries no signal: no guide has a `reviewed` date (0 in EN data.ts), so every EN/DE/JA guide says
  2026-08-22 (`CORPUS_REVISED`), including the 5 to 6 Nov rewrites; and `sitemap.ts` `guideLastMod()` ignores `reviewed`
  even though the page's dateModified uses it, so they will disagree as soon as one is set.
- F8 IndexNow is WHT only and submits the whole sitemap each run (`scripts/indexnow.mjs`). On the SVT host every
  path is rewritten into `/svt-site`, so a key file in `public/` is not reachable there (`config/brand-routing.js`).
- F9 GA4: the tag loads only after "Accept" (`Analytics.tsx`); before that `window.gtag` is undefined and every
  `whatsapp_click` is silently dropped. There is no Consent Mode default/update. The banner is fixed at bottom 12px,
  z-index 60, over the mobile sticky WhatsApp bar, so mobile users often tap WhatsApp without choosing. CSP connect-src
  lacks `https://*.analytics.google.com` and img-src lacks the GA hosts (both brands, `next.config.js` 38 and 97).

## 2. Internal linking system (one config, applied by script, tested in CI)
New file `src/lib/link-plan.ts` (WHT) holding: MONEY = {tax: '/tax-return', super: '/superannuation'} per language
(fr/it/es tax = flagship, see L9), SECONDARY = /tfn, /abn, /medicare, /expenses/*, and CLUSTERS: each EN slug ->
{cluster, pillar, money: 'tax'|'super', second?: 'super'|'tax', secondary?}. Default by category: Tax Return, TFN, ABN,
Medicare, Work Rights -> money 'tax'; Super -> 'super'. Overrides -> 'super': how-much-super-should-employer-pay,
super-for-casual-and-part-time-workers, super-employer-not-paying-what-to-do, employer-not-paying-correctly.
second = the other money page for leaving guides (tax-obligations-after-leaving-australia, early-tax-return-leaving-
australia, how-to-lodge-tax-return-from-overseas, transferring-money-overseas-australia-tax, tax-on-super-withdrawal-
backpacker, dasp-tax-rate-65-percent-explained) and for all job guides (super is paid on every job).
Clusters and pillars (pillar first): TFN timing (how-long-does-it-take-to-get-a-tfn: tfn-application-delayed, tfn-
reference-number-before-tfn-arrives, apply-for-tfn-before-arriving, tfn-application-rejected); TFN basics (what-is-a-
tfn: how-to-apply-for-a-tfn, can-you-start-work-without-a-tfn, what-happens-without-your-tfn, tax-file-number-
declaration-form, tfn-identity-documents-required, who-can-ask-for-your-tfn, tfn-security-protect-from-fraud, how-to-
find-lost-tfn, tfn-australian-address-no-fixed-address, how-to-update-address-with-ato, do-you-need-new-tfn-second-visa);
Refund (tax-back-australia-working-holiday: what-is-a-tax-refund-australia, average-tax-refund-working-holiday, how-long-
does-tax-refund-take-australia, tax-deductions-working-holiday-makers); Lodging (working-holiday-visa-tax-guide-417-462:
how-to-lodge-tax-return-working-holiday, diy-tax-return-vs-tax-agent-working-holiday, what-is-a-tax-agent, tax-return-
deadline-31-october-working-holiday, late-tax-return-penalty-working-holiday, past-years-tax-returns-working-holiday,
amending-tax-return-australia); Rates and payslip (backpacker-tax-rate-australia: tax-free-threshold-working-holiday-
visa, what-does-tax-withheld-mean-payslip, gross-pay-vs-net-pay-australia, what-is-payg-payment-summary, australian-
financial-year-dates, low-income-tax-offset-working-holiday, tax-residency-working-holiday-makers); DASP (how-long-does-
dasp-take: dasp-documents-required, dasp-rejected-what-to-do, dasp-tax-rate-65-percent-explained, tax-on-super-
withdrawal-backpacker, dasp-vs-leaving-super-in-australia-pros-cons); Find super (how-to-find-lost-superannuation: super-
multiple-funds-consolidation, what-happens-to-unclaimed-super, how-to-choose-super-fund); ABN (can-you-have-tfn-and-abn
plus the ABN category); Medicare (what-is-medicare-working-holiday-makers plus that category); Work rights (six-month-
employer-rule-working-holiday-visa, casual-shift-cancellation-rules-australia); Jobs (each job guide -> its /expenses/x
page as secondary: waiter, bartender, barista, kitchen-hand, ski-resort -> /expenses/hospitality; fruit-picking, farm-
hand, station-hand -> /expenses/farm-work; construction-laborer -> /expenses/construction; uber-eats, uber-driver ->
/expenses/delivery-drivers; supermarket -> /expenses). Pillars chosen by impressions and AI citations; keep openings.

Rules (all languages; a guide only links to pages that exist and are indexable in that language):
- L1 Money first. The "What we do" rows on every guide = [money hub, second money hub if set, secondary hub]. Replaces
  `SERVICE_FOR_CATEGORY` + `TAX_RETURN_BRIDGE` (`page.tsx` 292 to 345) and `cfg.serviceForCategory` in LocaleGuidePage
  and the six `(<l>)/<l>/blog/[slug]/page.tsx` configs. TFN and ABN guides therefore show /tax-return before /tfn or /abn.
- L2 One contextual money link in paragraphs 2 or 3 of every guide (not paragraph 1 of the top 10 AI-cited pages, whose
  openings stay). Anchors rotate per language from a fixed list, e.g. EN "working holiday visa tax return", "your tax
  return", "claim your super back (DASP)"; DE "Steuererklärung in Australien", "Super zurückholen"; JA
  "タックスリターン", "スーパーアニュエーション返金"; FR/IT/ES the flagship terms from a08. Max one link per target per page.
- L3 Spoke to pillar: each member links its pillar once in body; each pillar renders an "In this topic" list of all its
  members (server HTML, from config). Fixes the 0 in-links on the top TFN page.
- L4 Related guides = pillar (or, on a pillar, the member with the fewest in-links) + 2 cluster members chosen by a
  deterministic balancer so every indexable guide receives at least 3 related links per language. Replaces both
  `getRelatedGuides` functions.
- L5 Hub to spokes: /tax-return and /superannuation (all 6 languages; fr/it/es flagships) render a "Guides on this"
  block of every pillar mapped to them plus 6 members; /tfn, /abn, /medicare, /expenses/* link /tax-return and
  /superannuation above the fold, then their own pillars. Category hubs open with a money link.
- L6 Nav and footer order: Tax return, Super withdrawal, TFN, ABN, Medicare, all languages (`Nav.tsx`, `Footer.tsx`);
  replace "Lodge your annual return" with wording such as "Your return, reviewed by a registered tax agent".
- L7 Visible breadcrumb on EN guides (Home > Guides > Category > title) matching the BreadcrumbList (`page.tsx` 666);
  locale guides already render one (`LocaleGuidePage.tsx` 758). /blog hub: server-render every guide grouped by
  category (or crawlable ?page= links), `BlogClient.tsx` and twins (a15 R6).
- L8 Caps: at most 8 in-body internal links per guide, none in H2s or the first sentence after an H2 (FAQ answers).
- L9 fr/it/es: `localizeBodyLinks` (`src/lib/locale-blog.ts` 42) maps `/tax-return` to the flagship, and
  `/<l>/tax-return` links the flagship in its lead. Decision for Jo: the flagship owns "tax return" in those languages.
- L10 SVT: `LONG_SERVICE` Tax return, Deductions, Work, TFN, ABN, Medicare -> first the language home (tax return hub),
  then the current page; Super -> superannuation. Allow '' (home) in `relatedOf` and `exists` (`long/library.ts` 98).
  Short posts (`blog-en.ts`, `blog-zh.ts`, `blog-vi.ts`) get the same rule. No WHT links, ever.
Apply with `scripts/link-plan.mjs` (new): parses EN/DE/JA data.ts and fr/it/es chunks, prints in-degree per URL and
language, inserts the L2/L3 links where an anchor phrase already exists in the text (else lists the page for a
hand-written sentence), never touches paragraph 1 of the protected pages. Jest test `__tests__/link-plan.test.ts` fails
if any indexable guide has fewer than 3 inbound links (body + related) or lacks its money link. P1, effort M to L.
Expected (estimate): faster recrawl and indexing of the 68 zero-link CNI guides; stronger /tax-return and
/superannuation in every language. Measure: per-language sitemap indexed counts (section 4), GSC impressions and
position for /tax-return, /superannuation and their twins against the 9 to 21 Nov baseline.

## 3. Merge (301), strengthen, keep (exact slugs)
Merge, P2, effort M, 301 in en/de/ja/fr/it/es plus `/guides/<slug>`, same pattern as the Aug super block
(`next.config.js` 242 to 266); fold unique paragraphs and FAQs into the target first; drop the source from EN/DE/JA
data.ts, fr/it/es chunks, `locale-guide-slugs.ts`, DECISION_GUIDES and service page links (e.g. /medicare links
private-health-insurance). None has more than 16 Copilot citations; the high-cited how-many-hours (142) is NOT merged.
| source (EN/DE/JA impr) | target |
|---|---|
| restaurant-industry-award-working-holiday (37/17/3) | hospitality-award-working-holiday-makers |
| what-is-an-income-statement (70/1/7) | what-is-payg-payment-summary |
| how-does-payg-withholding-work (95/10/5) | what-does-tax-withheld-mean-payslip |
| how-does-australian-tax-year-work (0/125/5) | australian-financial-year-dates |
| backpacker-tax-history-australia (19/0/6) | backpacker-tax-rate-australia |
| abn-invoicing-requirements-australia (77/21/1) | what-is-a-tax-invoice |
| how-to-check-super-balance-working-holiday (177/0/0) | how-to-find-lost-superannuation |
| private-health-insurance-working-holiday-australia (0/8/14) | travel-insurance-vs-health-insurance-working-holiday |
| emergency-medical-care-working-holiday-no-medicare (0/4/1) | travel-insurance-vs-health-insurance-working-holiday |
| employer-asking-you-to-work-more-than-visa-allows (27/8/2) | six-month-employer-rule-working-holiday-visa |
| wage-theft-working-holiday-australia (14/7/24) | employer-not-paying-correctly |
| what-is-superannuation-guarantee-charge (36/8/26) | super-employer-not-paying-what-to-do |
Effect: 72 URLs removed (12 x 6 languages); 26 CNI URLs are sources and 11 are targets. Measure: target impressions
and indexing in 6 weeks; no merged URL left in any sitemap or llms file (`npm run generate:llms`).
Not now: DASP pair (dasp-tax-rate vs tax-on-super-withdrawal) stays a December decision, per plan.
Language fit, P3, S: noindex + drop from sitemap and hreflang (page stays live) for country guides read in the wrong
language: german-european-health-insurance in ja/fr/it/es; uk-medicare-reciprocal-agreement in de/ja/fr/it/es.
Strengthen, P1/P2, M: money pages first: /de/tax-return, /ja/abn (native answer-first section, 3+ DE/JA guide links in
each, no new fees); then CNI guides whose EN twin earns: de/can-you-start-work-without-a-tfn (EN 13,043),
de+ja/what-is-payg-payment-summary, de/what-does-tax-withheld-mean-payslip, ja/how-long-does-dasp-take (JA 84),
ja/how-to-find-lost-tfn, ja/who-can-ask-for-your-tfn, ja/tfn-reference-number-before-tfn-arrives, ja/trs-tourist-refund-
scheme-australia (105), ja/can-you-work-for-multiple-employers, de+ja/bringing-money-into-australia-10000-reporting-
threshold, de/german-european-health-insurance (41), de/tax-on-super-withdrawal-backpacker (32); EN second-third-year-
visa-tax-implications (334), fair-work-act-working-holiday-makers (127), how-many-hours-can-you-work-on-whv (142 cit.).
Strengthen = in-links per section 2 + one native unique block (worked example or table) + `reviewed` date. Job guides:
keep, add one tax/super section each and link to their /expenses page (L5). Everything else: keep, links only.
Retired slug, P2, S: `/tax-residency`, `/de/tax-residency`, `/ja/tax-residency` 301 to the tax-residency guide in that
language instead of 302 to link-after-payment (736 impr on the EN slug, a15 F4), if Jo confirms partner links are gone.

## 4. Sitemaps per language (monitoring)
P1, effort S. Move the entry builder out of `src/app/sitemap.ts` into `src/lib/wht-sitemap-entries.ts` (each entry with
locale and kind) and serve `/sitemaps/<l>-pages.xml` and `/sitemaps/<l>-guides.xml` for en/de/ja/fr/it/es from
`src/app/sitemaps/[file]/route.ts` (12 files). Keep `/sitemap.xml` (submitted, 1,019 URLs). SVT: `buildSvtSitemap(locale)`
in `src/lib/svt/seo.ts` + `src/app/(svt)/svt-site/sitemaps/[file]/route.ts` for en, zh, vi. List all in robots
(`robots.ts`, `buildSvtRobots`) and submit in GSC and Bing. Fix lastmod: pass the guide's `reviewed` into
`guideLastMod` for all six languages (`sitemap.ts` 34 and the DE/JA blocks), set `reviewed` only on guides really
changed (5 to 6 Nov rewrites, merges, strengthened pages); same in `scripts/generate-llms.mjs`. Measure: GSC Pages
report filtered by each sitemap, weekly indexed share per language and per type.

## 5. IndexNow on both sites
P1, effort S. `scripts/indexnow.mjs`: add `--site=wht|svt` (SVT host, its own new key, never the WHT key) and
`--changed` mode that submits only URLs whose sitemap lastmod is newer than the last run (stored in
`scripts/.indexnow-last`), plus merged source URLs so Bing sees the 301s. SVT key file: route
`src/app/(svt)/svt-site/<svtkey>.txt/route.ts` returning the key (public/ files do not reach the SVT host). Run after
every deploy. Measure: Bing Webmaster URL submission log, Bing indexed count, Bing AI Performance cited pages (WHT
baseline about 6,600 citations 20 Oct to 21 Nov; SVT 0).

## 6. GA4 and Consent Mode (whatsapp_click)
P1, effort S. In `src/components/layout/Analytics.tsx` (both brands): always define `dataLayer`/`gtag` and set
`gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',
ad_personalization:'denied',wait_for_update:500})`; on Accept call `gtag('consent','update',{analytics_storage:
'granted'})`. Jo decided on 3 Nov that no Google script loads before consent: Basic mode keeps that (queue events in
dataLayer, load gtag.js on Accept, events from this page view are sent then); Advanced mode loads gtag.js at once and
sends cookieless pings that GA can model. Decision for Jo; Basic at minimum. Also: move the banner above the mobile
sticky bar (bottom offset of the bar height) or make it a top bar on mobile; add `https://*.analytics.google.com` to
connect-src and `https://*.google-analytics.com https://*.googletagmanager.com` to img-src in both CSPs
(`next.config.js` 38 and 97, and the nonce CSP in `src/proxy.ts`). Verify in DevTools that /g/collect returns 204
after Accept on a phone. Keep the weekly CRM chat count as the true conversion measure. Measure: whatsapp_click per
week vs CRM chats with a site prefill; target ratio rising from near zero.

## 7. Other technical items
- P1 S: purge the stale /blog cache and recheck title and "144" (a15 R2); fonts, manifest.json and `/tfn/` in the CNI
  list need nothing.
- P2 S: request indexing after deploy for /de/tax-return, /ja/abn, /tax-return, /superannuation, the 12 merge targets.
- P3 S: remove the duplicate microdata Article (`page.tsx` 814 to 819), keep JSON-LD (a15 R7).
Do not undo: Aug super 301s, FAQ answer anchors, openings of the top 10 AI-cited pages, 5 to 6 Nov titles.

## 8. Files to change
`src/lib/link-plan.ts` (new), `scripts/link-plan.mjs` (new), `__tests__/link-plan.test.ts` (new);
`src/app/(site)/blog/[slug]/page.tsx`; `src/components/blog/LocaleGuidePage.tsx`; `src/app/(de|ja|fr|it|es)/<l>/blog/
[slug]/page.tsx`; `src/app/(site)/blog/data.ts`, `(de)/de/blog/data.ts`, `(ja)/ja/blog/data.ts`, `(fr|it|es)/<l>/blog/
chunks/*.ts`; `src/lib/locale-blog.ts`; `src/lib/locale-guide-slugs.ts`; service pages `(site|<l>)/{tax-return,
superannuation,tfn,abn,medicare,expenses}/page.tsx` and fr/it/es flagships; `src/components/layout/Nav.tsx`,
`Footer.tsx`; `src/app/(site)/blog/BlogClient.tsx` and twins; `next.config.js` (301s, CSP); `config/form-paths.js`
(tax-residency); `src/app/sitemap.ts`, `src/lib/wht-sitemap-entries.ts` (new), `src/app/sitemaps/[file]/route.ts`
(new), `src/app/robots.ts`, `src/lib/blog-dates.ts` use; `scripts/generate-llms.mjs`; `scripts/indexnow.mjs`;
SVT: `src/lib/svt/content/long/en/links.ts`, `long/library.ts`, `src/lib/svt/seo.ts`,
`src/app/(svt)/svt-site/sitemaps/[file]/route.ts` (new), key route (new); `src/components/layout/Analytics.tsx`,
`src/proxy.ts`.

## 9. Measurement (baseline 14 Nov: 503 indexed, 156 CNI, 394 discovered; SVT 503 / 73)
Weekly: indexed per language sitemap; CNI count and how many of the 156 remain; in-degree report from
`scripts/link-plan.mjs`; impressions and position of /tax-return, /superannuation and twins (strip # rows); Bing
citations per money page. Expect gradual change over 4 to 8 weeks; no ranking is guaranteed.
