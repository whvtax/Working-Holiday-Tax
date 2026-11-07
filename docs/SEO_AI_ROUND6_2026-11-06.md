# SEO and AI search, round 6 (6 Nov 2026)

Both sites, every language. Nothing here guarantees a ranking; results show in Search Console after 3 to 4 weeks.

## What changed
1. **Keyword maps applied** (`docs/keywords/*.md`), 9 site and language pairs: missing native search wording added to the
   owner page, each cannibalised keyword given one owner page with links from the others, AI questions answered early.
2. **SVT zh/vi**: new `/zh/tfn` and `/vi/tfn` hubs; `/zh/superannuation` and `/vi/superannuation` follow the new English
   structure (`services-zh.ts`, `services-vi.ts`, shared `services-i18n.ts`).
3. **SVT FAQs**: 38 FAQ items added in each of en, zh and vi (114) on 22 pages, equal counts per language.
4. **Search snippets** (title and description) rewritten from Search Console data where pages ranked on page 1 with CTR
   under 3%: EN 69 pages, DE 19, JA 15. FR, IT and ES had no qualifying data and were left alone. EN guides gained an
   optional `seoTitle` field so the search title can differ from the H1.
5. **New guide** `past-years-tax-returns-working-holiday` in all 6 languages (ATO-sourced), linked from the late-penalty
   and lodge-from-overseas guides.
6. **Full read of every guide**: 36 reviewers read all guides on both sites (about 1,450 pages); 780 small patches were
   applied through a script that rejects any patch with a dash, a tax-agent claim or the other brand. Then a
   cross-language pass fixed 18 verified facts wherever they were still wrong (see below).
7. Two crawl warnings fixed (`/blog/category/super` title, DE past-years description).

## Facts corrected across languages (checked on official pages)
AUSTRAC reports international transfers of any amount ($10,000 is the cash threshold); the super guarantee charge rules
from 1 July 2026 (GIC interest, admin uplift, deductible); the $1,000 standard deduction is for residents with wage income
only and is based on draft ruling LCR 2026/D5; the $300 and $150 no-receipt rules end on 1 July 2026; STP finalisation by
14 July; Restaurant and Hospitality Award casual rates already include the loading; a first RSA or White Card is not
deductible; compromised TFN line 1800 467 033; WHMs must lodge from $45,001 (ATO 2026); food processing is exempt from the
6-month limit; TRS refunds never go to a foreign account; the Medicare levy follows tax residency; piece-rate floor since
28 April 2022; how the 88 days are counted; GIC 11.51% (Oct to Dec 2026); DASP went from 38% to 65% in 2017; the 28-day TFN
grace needs the employer to be told; part-year work is not over-taxed at the flat 15% WHM rate; online refunds take about
12 business days. Also several sentences (mostly SVT zh) that implied we lodge returns were changed to the approved wording.

## Kept on purpose
WHT fee lines ($220 / $385) stay exactly as they were (Jo, 6 Nov 2026: "להשאיר", keep them). Some agents removed them in
DE and ES; that was reverted.

## Verification
tsc and eslint clean; jest 455 suites, 6,200 passed, 2 skipped; offline build passed with font imports restored; llms
files regenerated (1,013 sitemap URLs). WHT crawl: 1,019 pages, 1,020 link targets, 0 errors (2 warnings, both fixed
after the crawl). SVT crawl: 561 pages, 567 links, 0 errors (the only flags are the generic phrase "your tax agent").
Phone-size browser check with axe on 18 WHT and 9 SVT pages: no overflow, one H1 each, 0 axe violations, SVT WhatsApp
messages name Student Visa Tax in every language. A scan of every added line found no dashes, no agent claims, no AI
mention and no brand mixing.

## Open questions for Jo
1. Do we arrange the **Medicare Entitlement Statement** for clients? Several JA, ZH and EN guides say "we arrange it";
   normally the client applies to Services Australia.
2. Do we **update the client's ATO address** for them (SVT zh update-address guide)?
3. Does SVT **consolidate or roll over super** for clients? The zh text was softened; en/vi did not say it.
4. The EN TFN guide says we use **a verified address that holds mail** for TFN applications. Is that a real service?
5. SVT has no dedicated **/abn** or **/tax-return** page (it uses /abn-delivery and /pricing). Add them?
6. Unverified claims left as they were: the ATO offsetting a tax debt against a DASP payment; an unresolved ATO matter
   affecting a later visa; GST costing Uber drivers 5% to 8%; state permit names for rideshare; RSA expiry by state;
   WWCC fees; 13 SICK availability; the 14-day payment summary on leaving.
7. Older open items: client agreement wording, TPB symbol, the myGov home line, SVT's own WhatsApp number later.

## After deploy (Jo)
Resubmit both sitemaps in Search Console, request indexing for the main changed pages, run `npm run indexnow`, redirect
www.studentvisatax.com.au to the apex in Vercel. Send a new Search Console export in early December for the review.
