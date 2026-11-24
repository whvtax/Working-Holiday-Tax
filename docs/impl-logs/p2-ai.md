# p2-ai: be the source AI answers cite (WHT now, SVT from December)

Data: Bing AI Performance 20 Oct to 21 Nov (`S/gsc24/bing/*AISearchQueriesReport*`, `*AIPageStatsReport*`,
`*AIPerformanceOverviewStats*`), GSC `S/gsc24/wht|svt/Queries.csv, Pages.csv` (23 Nov), `S/analysis/a18-ai-search.md`,
code `S/repo/whvtax-FINAL58`. Fact vs estimate is labelled. Respects Jo's 24 Nov decisions (no named reviewer, no new
languages, no new fee displays, no MES arranging, no SVT super consolidation, no mail-holding claim).

## 1. Why the top cited pages work (read in `src/app/(site)/blog/data.ts`)
Fact: 7 pages hold 3,677 of about 6,600 WHT citations: how-long-does-it-take-to-get-a-tfn 1,664 (line 152),
countries-with-medicare-agreement-australia 633 (2886), six-month-employer-rule 397 (4473), can-you-start-work-without-a-tfn
281 (217), tax-back-australia-working-holiday 267 (9300), how-to-update-address-with-ato 245 (3561),
what-happens-without-your-tfn 190. Shared traits:
1. The answer, with its number, is inside the first 40 words: "Eleven." / "Visa condition 8547 limits 417 and 462 holders to
   six calendar months" / "Yes. ... You have 28 days" / "Two weeks is normal, 28 days is the ATO's ceiling".
2. Complete enumerations, not samples: all 11 RHCA countries by name, every 8547 exempt sector, all 3 address routes with
   both phone numbers (13 28 61, +61 2 6216 1111). An AI can quote one block and be complete.
3. The title already contains the answer ("Most arrive in about 2 weeks", "the 11 with an agreement", "45% instead of 15%").
4. Every H2 is a real follow-up question, and its first sentence answers it alone ("The legal entity behind the ABN, not
   the building you work in."). FAQPage JSON-LD is built from these H2s with #anchor URLs (`blog/[slug]/page.tsx` 679 to 700).
5. A named official source linked in the body at the point of the claim (Services Australia list, ATO "TFN applications by
   temporary visitors", ATO "update your personal contact details").
6. A myth block: what people wrongly assume (countries assumed but not on the list; "no paid fast track"; "do not lodge a
   second application"). This matches the negative and comparison prompts users send to chat engines.
7. WHM specific facts the ATO page does not combine in one place (two 28 day clocks; 45% vs 15%; ABN entity = employer).
   Inference: this "consolidation of several official pages for one visa group" is why Copilot picks us next to ato.gov.au.
8. A closing "depends on" list that routes to /tax-return or /calculator without promising an amount (compliant CTA).

## 2. The repeatable template ("answer block page")
Apply to new and refreshed pages; on the top 10 cited pages, only add (links, tables, dates), never replace openings.
- Title: query words + the answer ("X: [fact]"); H1 for money pages = query phrase, slogan as subtitle (plan item 5).
- Sentence 1 (max about 35 words): direct answer with the figure and the official body named. Sentence 2: the WHM twist.
- "Key facts" box (3 to 6 rows) with effective date and "Source: ATO / Fair Work / Home Affairs / Services Australia",
  copied from the `/superannuation` key facts pattern (`superannuation/page.tsx` 335 to 345).
- 5 to 9 question H2s from GSC and Bing grounding queries; first sentence of each answers on its own.
- One table where the answer is a comparison (rate by situation, country by cover, step by time).
- One myth block. One numbered steps list on any "how to" page (feeds HowTo detection, page.tsx line 722).
- Visible "Official sources" links + "Checked against [bodies], [month year]" + true "Updated" date (needs `reviewed:`).
- Organization attribution only (no person), compliant CTA, no refund amounts, internal link to the service page.
Effort per page: S (EN), M (native DE/JA/FR/IT/ES). Measure: Bing citations per page, GSC "Q&A rich results" appearance.

## 3. Uncited pages with real demand: treatment order
Fact: none of these appear (or barely) in the Bing cited pages file, yet GSC shows demand.
| P | Page | GSC (23 Nov export) | Bing cit. | Treatment |
|---|---|---|---|---|
| P1 | `/superannuation` (`(site)/superannuation/page.tsx`) | 9,457 impr, pos 16.65; "claim superannuation" 348 @38.4, "superannuation claim" 315 @23.1, "claim superannuation australia" 292 @20.5, "417 visa super claim" 287 @25.4; super/DASP cluster 168 rows 6,822 impr 5 clicks | 0 | 30 word first sentence before the 63 word lead (plan item 5); add the worked example from dasp-vs-leaving ($5,000 gives about $1,750, line in that guide) as a table row; "When can you apply" table (visa ceased + left Australia); myth block ("DASP is not your tax refund", "you cannot claim while still here on the visa"). Effort M |
| P1 | `/tax-return` | 760 impr, pos 30.15; "working holiday visa tax return" 129 @27.2; Bing: "tax return for working holiday" 22.49%, "how to get a tax refund if i am on a working holiday visa" 19.23% | 81 | H1 = "Working holiday visa tax return (417 and 462)", current slogan as subtitle; first sentence answers "what it is and when" (1 July to 30 June year, self lodgement due 31 October, late returns can still be lodged); numbered 5 step list already exists as the 7 process cards (lines 105 to 135): render them as an `<ol>` with plain step names. No amounts. Effort M |
| P1 | `/abn` + `/blog/can-you-have-tfn-and-abn` | /abn 2,938 @6.28; guide 3,287 @6.91 (0 cit.); "can you get an abn on a working holiday visa" 55 @6.53 + 46 @5.67; "tfn vs abn" cluster about 117 impr @15 to 27 | 0 / 0 | Openings already pass the template ("Yes. A 417 or 462..."). Missing: a TFN vs ABN comparison table on /abn (withholding, super, GST, 47% no-ABN rate from llms facts, 8547 applies to contractors), and the H1 is a slogan ("An ABN does not change your job"): put "ABN on a working holiday visa" in the H1. Effort S |
| P2 | DASP guides: dasp-rejected-what-to-do (963 @5.8), dasp-vs-leaving (1,348 @23.8), super-for-casual (979 @23.8), how-to-find-lost-superannuation (875 @36.3) | see left | 0 | Openings already good. Add key facts box + visible ATO source links + reviewed date only. Inference: super is an authority problem (ATO and funds own it, a18 F5), so expect slower gains. Effort S |
| P2 | `/de/superannuation` 1,097 @7.47 (1 cit.), "superannuation australien zurück bekommen" 34 @4.59; `/de/tax-return` 170 @6.94 (crawled, not indexed) | | 1 / 0 | Native German key facts box and myth block; nothing ranks or gets cited until /de/tax-return is indexed (Phase 0 requested). Effort M |
| P2 | `/ja/superannuation` 2,303 impr, 2.87% CTR (18 cit.); JA min wage cluster ("オーストラリア 最低賃金" 251 @10.2, "…2026" 138 @8.9, casual variants 74+67+65 @8.3 to 8.5), Bing 23% and 30% share | | 18 / 109 | JA min wage guide (`(ja)/ja/blog/data.ts` 5388) already answers first: add the wage table by award level already planned (item 7) plus "Updated" date. /ja/superannuation: add 65% / 28 days facts box. /ja/abn indexed first. Effort S |
| P3 | FR/IT/ES flagships (`/fr/tax-return-australie-pvt` 23 impr @8.1; `/es/tax-return` 14 @29; IT/ES flagship no row) | | 0 | Indexing first (a08 F3). Template only on `/es/blog/minimum-wage-australia-2026-27` (258 @6.97, 6 Bing cit. on es tax year guide) and `/fr/blog/rsa-certificate...` (181 @9.88). Effort M |
| P3 | SVT: `/blog/student-visa-tax-guide-500-485` 84 @7.26, `/zh/blog/how-long-does-a-tax-refund-take` 83 @6.06, `/vi/blog/what-is-the-ato-international-students` 77 @7.52, `/blog/tourist-refund-scheme...` 163 @10.3 | | no Bing data yet | Template on these 4 first (positions under 11 are the only realistic citation candidates, a13); residency "may be/usually". Effort M |

## 4. Raising citation SHARE where we hold 17% to 39% (Bing grounding queries, fact)
Share = our citations / all citations for that grounding query; the rest goes to other sites (inference: mostly ATO,
Services Australia, community.ato.gov.au, per a18 F5). Levers, per query, on pages we already own (add, do not replace):
| Query (share, citations) | Page | Add (P, effort) |
|---|---|---|
| how to change address with ato (16.99%, 61) | how-to-update-address-with-ato | Numbered 4 step myGov path as `<ol>` (currently a bullet); "What changes do not carry over" (super funds keep own address). P1 S |
| medicare reciprocal countries with australia (17.99%, 52); medicare reciprocal countries (33.07%, 85); reciprocal medicare (32.16%, 164) | countries-with-medicare-agreement-australia | Country table (country / cover scope / limits, e.g. Italy six months) verified on Services Australia and dated; one sentence with the literal phrase "countries with a reciprocal health care agreement with Australia". P1 S |
| how to get a tax refund if i am on a working holiday visa (19.23%, 110); tax back from (29.68%) / for (32.24%) working holiday; tax return for working holiday (22.49%) | tax-back-australia-working-holiday, /tax-return | Add below the opening a numbered "How to get your tax back, step by step" (income statements final mid July, TFN, residency and Medicare levy check, lodge in myTax or through a registered tax agent, ATO assessment). No amounts. Link /tax-return. P1 S |
| no tfn tax rate (16.67%, 12) | what-happens-without-your-tfn | Rate table by situation: 15% WHM with TFN, 45% no TFN, 30% unregistered employer (foreign resident rate), 47% no ABN; source ATO. P2 S |
| how long is a tfn (21.05%, 44); how long does it take to get a tfn (37.04%) / tax file number (39.16%) | how-long-does-it-take-to-get-a-tfn | Do not touch the opening (1,664 citations). Add a dated "TFN timeline" table (apply, reference number, about 2 weeks, day 28 ATO limit, day 28 employer clock) and the line "A TFN is nine digits" in an H2 answer. P2 S |
| 6 month work limitation (28.38%, 84) | six-month-employer-rule | Add Home Affairs source link inline and "Checked [month]" date; the exemption list carries a "until the Government makes further decisions" caveat, so freshness is the share lever. P2 S |
| paygとは (27.27%), abnとは (10.87%), オーストラリア 最低賃金 (23.12%), mindestlohn australien (21.74%) | JA PAYG, JA what-is-an-abn (line 1482), JA/DE min wage | Native key facts box; JA ABN: 11桁 / 給与なら不要 / 申請無料 in a 3 row table. P2 S |
General share levers (all pages, inference from what the winners share): exact query phrasing in one H2, a table, a dated
official source next to the figure, and a sentence that is quotable alone. Expected effect (estimate): share up by a few
points per query over 4 to 8 weeks; no guarantee.

## 5. Engine specific actions
Crawler access (fact, repo): WHT `src/app/robots.ts` allows `*` and 26 named AI agents (GPTBot, OAI-SearchBot,
ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Google-Extended, Bingbot...); SVT `buildSvtRobots()` allows all.
Not verified live (a18 could not fetch). P1 S: Jo opens both live /robots.txt files once and checks Vercel firewall / bot
protection is not challenging OAI-SearchBot, PerplexityBot or Bingbot (a 403 there silently removes us).
- ChatGPT search: grounds on Bing plus OAI-SearchBot. Bing is the gate: WHT verified with AI data; SVT sitemap only since
  24 Nov. P1 S: add `studentvisatax.com.au` host to `scripts/indexnow.mjs` (a18 F10) and run IndexNow after every deploy;
  Bing URL Inspection for /superannuation, /abn, /tax-return (all uncited) to confirm they are indexed in Bing.
- Copilot: same Bing index; the Bing AI Performance report is our only direct citation data, export monthly (section 6).
- Perplexity: own index plus freshness weighting (inference). Lever: true `dateModified`. Fact: `reviewed:` is set on
  0 guides in EN, DE and JA data files, so every guide shows "Updated 22 August 2026" (CORPUS_REVISED,
  `src/lib/blog-dates.ts` 82) despite the 5 to 6 Nov review. P1 S: set `reviewed: "2026-11-06"` only on guides that were
  actually revised then (list in `docs/SEO_AI_ROUND*`), so the date stays honest.
- Google AI Overviews: use the normal Google index and ranking; Google-Extended does not control AIO inclusion, so keep it
  allowed and do not expect it to matter. The lever is ranking top 10 plus quotable passages (FAQPage, speakable already in
  place). Also: indexing the 156 crawled-not-indexed URLs (56 ja, 48 de) is a precondition.
- llms.txt: keep (fact: strong, dated key facts, six language sections). P1 S correction: `scripts/generate-llms.mjs`
  line 464 says the work includes "applying for a Medicare Entitlement Statement where it is warranted". This contradicts
  Jo's 24 Nov decision; change to "explaining how to apply for a Medicare Entitlement Statement where it is relevant" and
  regenerate. AI engines quote service descriptions literally. Same check in `src/lib/svt/llms.ts` (line 54 is fine).
- Entity consistency (Organization only, Jo's rule): P2 S. One 25 word entity description reused verbatim in WHT
  Organization `description` (`RootDocument.tsx` 111), llms.txt summary, Facebook, Instagram, TikTok bios and the Google
  Business Profile. Add the Google Business Profile URL to `sameAs` (line 126) if the profile is WHT's (GoogleRating suggests
  it exists; Jo confirms). SVT `svtOrganization()` (`src/lib/svt/jsonld.ts` 17) has no `sameAs`: add SVT's own Instagram
  only, never a WHT profile. Do not add `reviewedBy`, a person author or a new Organization id; the existing
  `#supervising-agent` node stays as is (owner decision 5 Nov).
- Sources: add the visible "Official sources" block (plan item 11) using `getRelevantCitations()` which today only feeds
  JSON-LD. Trust signal is organisational: "Checked against ATO and Services Australia guidance, November 2026".
  Optional P3 S: a short "How our guides are prepared" section on /about reusing llms.txt lines 23 to 25 (no tax agent
  mention on /about, rule 3).

## 6. Monthly AI visibility routine (first Monday, about 60 minutes, Jo)
1. Bing Webmaster Tools > AI Performance, each domain: export the 3 CSVs (overview, grounding queries, pages) for the last
   full month into `seo-data/bing-ai/YYYY-MM/<domain>/`. Record: total citations, cited pages, citations per day on
   weekdays (weekends dip: 24 Oct 76, 31 Oct 37, 7 Nov 31, 21 Nov 61, so compare weekday averages; baseline 20 Oct to
   21 Nov = about 6,600 total).
2. Track a fixed list: the 29 grounding queries above (citations + share) and the 20 pages in section 3 and 4. Flag any
   page that loses 30%+ citations month on month and check whether its opening changed.
3. Fixed question panel, same wording every month, run in ChatGPT (search on, logged out), Perplexity, Copilot and Google
   (note if an AI Overview shows): log per answer: our domain cited (y/n), brand named (y/n), other domains cited, any
   wrong fact about us. Use the ai-seo panel sheet (ai-seo:ai-seo-audit, then ai-seo:ai-visibility-report). Panel:
   - EN (10): how long does it take to get a tfn; can you work without a tfn in australia; medicare reciprocal countries;
     6 month employer rule working holiday visa; how to get a tax refund on a working holiday visa; working holiday visa
     tax return; how to claim superannuation after leaving australia; can you get an abn on a working holiday visa;
     no tfn tax rate; how to change address with ato.
   - DE (5): mindestlohn australien; superannuation australien zurück bekommen; steuererklärung australien work and
     travel; abn beantragen australien; was ist eine white card.
   - JA (5): オーストラリア 最低賃金; オーストラリア タックスリターン いつまで; タックスリターン メディケア免除; paygとは; abnとは.
   - FR/IT/ES (2 each, panel picks, low data): remboursement impôts australie pvt; salaire minimum australie; tasse working
     holiday australia; rimborso tasse australia working holiday; salario minimo australia 2026; devolución impuestos
     australia working holiday.
   - SVT (8): international student tax return australia; student visa 500 tax rate; dasp international student;
     tourist refund scheme international students; hoàn thuế ở úc; abn là gì; plus 2 zh questions on 退税 (panel picks).
4. GA4 referrals from chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com (undercounted by consent; trend
   only) and WhatsApp chats whose prefilled message names a guide.
5. One line per month in a log: change shipped, pages touched, citations and share before/after (28 day windows).
Effect target (estimate, not a promise): WHT citations flat to up through the quiet season; SVT first citations in December.
