# p1-keywords: keyword universe and #1 targets (lens: the most queries at position 1)

Data: GSC Queries/Pages `gsc24/wht/` and `gsc24/svt/` (23 Nov export, 3 months), older WHT exports for trend only, Bing AI
Performance `gsc24/bing/` (29 grounding queries = 1,402 citations; 98 cited pages = 5,888 citations). Script that builds the
clusters: `S/plan2/p1_kw.py` (regex rules per cluster, owner page, band counts) and `S/plan2/p1_sub.py` (sub-splits).
Limits: GSC has no query to page pairing, so "owner" means the page the keyword maps and Pages.csv point to (inference). Query
rows cover about 10% of clicks (a05). Positions are 3 month averages. Effects below are estimates, never promises.
Jo's final decisions respected: no new languages, no named reviewer line, no new fee displays, we do NOT arrange the Medicare
Entitlement Statement, no SVT super consolidation, no TFN mail holding address; we DO update the client's ATO address.

## 1. The headline: page one is common, position 1 is almost absent
Position bands of all 1,180 visible query rows (both sites; p1_kw.py `bands()`), rows / impressions:

| Site, lang | pos 1 to 1.5 | 1.5 to 3.5 | 3.5 to 10.5 | 10.5 to 20.5 | over 20.5 |
|---|---|---|---|---|---|
| WHT en | 3 / 8 | 18 / 206 | 364 / 17,462 | 151 / 3,314 | 337 / 9,249 |
| WHT ja | 0 | 4 / 83 | 81 / 2,597 | 13 / 149 | 2 / 11 |
| WHT de | 0 | 0 | 12 / 427 | 4 / 59 | 3 / 38 |
| WHT fr / it / es | 0 | 0 | 4 / 21 | 3 / 82 | 1 / 13 |
| SVT en / vi / zh | 1 / 1 | 0 | 27 / 88 | 16 / 35 | 136 / 903 |

- Fact: 4 queries sit at about #1 and 22 in the top 3, while 488 queries (20,595 impressions) sit at 4 to 10. The lever for
  "most queries at #1" is converting that 4 to 10 band, not new pages. Question queries at pos 8 or better get 0.42% CTR vs
  3.0% for non questions (a18 F2), and the "Q&A rich results" appearance earns 3.33% CTR at pos 5.09 (`Search appearance.csv`).
- Fact: the top TFN guide shows three #fragment rows with 26,792 impressions and 0 clicks (a19 F1): Google already shows our H2
  jump links. Rule for every action below: ADD question H2s, never rename an existing H2 (the fragment ids would break).
- Fact: Copilot already cites pages Google barely shows: /blog/tax-back-australia-working-holiday 267 citations vs 7 GSC
  impressions; /blog/how-many-hours-can-you-work-on-whv 142 citations but it is in the "crawled, currently not indexed" list
  (last crawled 30 Aug, `wht-crawled-not-indexed-1124.xlsx`); /superannuation has 9,457 GSC impressions and 0 citations.

## 2. The #1 playbook (codes used in the table)
- **A** answer block: add an H2 worded as the top query, then a 40 to 55 word answer with the number first. FAQPage JSON-LD is
  built automatically from question H2s (`src/app/(site)/blog/[slug]/page.tsx` line 679), so A also extends schema. On the top
  AI cited pages (TFN timing 1,664, countries 633, six month 397, work without TFN 281, tax back 267, address 245, no TFN 190,
  hours 142, reference number 140, lost TFN 121, JA wage 109, levy 107, FY dates 102) the opening paragraph stays as is; A goes
  below it.
- **L** internal links: 2 to 4 contextual body links with the exact anchor from the named pages (9 top guides have 0 body
  links in, a19 F3).
- **T** title/description wording, only on pages not retitled 5 to 6 Nov or with a measured reason; **F** extra FAQ item;
  **I** indexing/canonical fix; **C** consolidate the split (section 4); **S** visible "Official sources" + reviewed date
  (already Phase 1 item 11, no named reviewer).
- Own = realistic #1 for the head query within 3 to 6 months (Y), top 3 realistic (T3), page one only (P1). Estimate.

## 3. Ranked target list (60 clusters), ordered per Jo: tax return and super/DASP first in every language, TFN/ABN/info as
entry points that link on to those two services. q = query rows, impr, clk, best pos (rows with 10+ impr), weighted avg pos.
AI = Bing citations: grounding queries / owner page. All paths on the site's own domain.

| # | Cluster (lang) | Head query (impr @ pos) | Owner page | q / impr / clk / best / avg | AI | What moves it to #1 | P, effort | Own |
|---|---|---|---|---|---|---|---|---|
| | **EN: tax return and super/DASP (core)** | | | | | | | |
| 1 | WHV tax return (en) | working holiday visa tax return 129@27.17 | /tax-return | 25 / 546 / 12 / 10.4 / 25.2 | 184 / 81 | A: H2 "How do I get a tax refund on a working holiday visa?" (Bing query, 110 citations) answered without promising an amount; L from rows 16, 18, 22 with anchor "working holiday visa tax return" (Plan item 3) | P1, M | P1 |
| 2 | Tax back (en) | tax back australia working holiday visa 27@12.67 | /blog/tax-back-australia-working-holiday | 2 / 38 / 1 / 12.7 / 31.7 | 133 / 267 | I: URL Inspection (7 GSC impr vs 267 citations); L from /tax-return; keep opening | P1, S | T3 |
| 3 | Late / overdue return (en) | lodge late tax return 28@22.54 | /blog/past-years-tax-returns-working-holiday | 16 / 268 / 0 / 17.9 / 23.3 | 0 / 0 | I: past-years guide has no GSC row; L from penalty guide "lodge overdue tax returns"; /tax-return section (Plan item 5) | P1, S | P1 |
| 4 | Brand (en) | working holiday tax 393@6.58 | / | 5 / 665 / 77 / 6.6 / 8.9 | 0 / 6 | I: check rendered home title for doubled suffix (a19 R5); Organization schema name, logo, sameAs consistent; "whv tax" 151@16.3 | P1, S | Y |
| 5 | WHV tax overview (en) | taxes working holiday 57@9.11 | /blog/working-holiday-visa-tax-guide-417-462 | 13 / 245 / 2 / 8.4 / 13.1 | 0 / 92 | L from / and /tax-return with anchor "working holiday visa tax guide" (Google shows owner only 28 impr, Copilot cites it 92); guide links on to /tax-return | P1, S | T3 |
| 6 | WHV tax calculator (en) | working holiday visa tax calculator 100@9.68 | /calculator | 8 / 238 / 5 / 7.2 / 21.1 | 0 / 0 | T "Working holiday visa tax calculator (2025-26)"; 2026-27 option is Phase 2 | P2, S | T3 |
| 7 | Tax free threshold on WHV (en) | can working holiday visa claim tax free threshold 48@6.17 | /blog/tax-free-threshold-working-holiday-visa | 5 / 144 / 0 / 5.9 / 6.9 | 0 / 14 | A: exact H2 (a19); L from /tax-return | P2, S | Y |
| 8 | Medicare levy for WHM (en) | do working holiday makers pay medicare levy 76@4.37 | /blog/medicare-levy-working-holiday-makers | 13 / 263 / 11 / 3.2 / 5.2 | 0 / 107 | L from /tax-return and /medicare FAQ with anchor "Medicare levy exemption"; S; no other change (CTR works) | P2, S | Y |
| 9 | Tax withheld meaning (en) | tax withheld meaning 50@9.46 | /blog/what-does-tax-withheld-mean-payslip | 11 / 201 / 0 / 7.5 / 11.0 | 12 / 43 | A: H2 "What does total tax withheld this financial year mean?"; F "What does EE withhold mean?" (Bing query) | P2, S | T3 |
| 10 | DASP term (en) | dasp 288@7.44; ato dasp 89@5.38 | /superannuation | 11 / 478 / 1 / 5.0 / 11.1 | 0 / 0 | A: "What is DASP?" 40 word definition box above the steps (a18 weak 60+ word lead); L from what-is-dasp-super-withdrawal | P1, S | P1 |
| 11 | DASP how long (en) | how long does dasp payment take 90@6.78 | /blog/how-long-does-dasp-take | 4 / 181 / 1 / 6.8 / 7.6 | 0 / 60 | A: H2 "How long does a DASP payment take?" (a19); L from super guides | P1, S | Y |
| 12 | DASP rejected (en) | my superannuation claim was rejected, what now? 62@9.03 | /blog/dasp-rejected-what-to-do | 2 / 70 / 0 / 9.0 / 10.1 | 0 / 0 | F with that exact wording; page is 5.8 overall | P3, S | Y |
| 13 | DASP tax / super tax WHM (en) | super tax working holiday maker 311@16.53 | /blog/dasp-tax-rate-65-percent-explained | 6 / 383 / 0 / 8.0 / 16.3 | 0 / 1 | C with tax-on-super-withdrawal-backpacker (section 4); worked net table; L to /superannuation | P1, M | T3 |
| 14 | Super on a WHV / 417 claim (en) | superannuation working holiday visa 301@26.71 | /superannuation | 12 / 1,521 / 1 / 23.6 / 27.5 | 0 / 0 | A: "Can backpackers get their super back?" box (a16 R3); L from the 10 top TFN/medicare guides; authority bound (ATO, funds) | P1, S | P1 |
| 15 | Casual super (en) | do casuals get super 89@21.17 | /blog/super-for-casual-and-part-time-workers | 23 / 796 / 0 / 15.5 / 26.5 | 0 / 0 | A "Do casual employees get super?" yes/12% first line; WHV angle; L to /superannuation | P3, S | P1 |
| | **EN: TFN, ABN and info entry points (each links on to /tax-return or /superannuation)** | | | | | | | |
| 16 | TFN how long, "tfn" wording (en) | how long does it take to get a tfn 808@7.99 | /blog/how-long-does-it-take-to-get-a-tfn | 52 / 4,352 / 11 / 5.3 / 7.0 | 264 / 1,664 | A: H2 "How long does it take to get a TFN in Australia?" + table (normal 2 weeks, ATO limit 28 days, then what); L in from /tfn, what-is-a-tfn, tax-file-number-declaration-form, how-to-apply-for-a-tfn; L on to /tax-return (weeks taxed at 45% are reclaimed in the return); keep opening and 5 Nov title | P1, S | T3 |
| 17 | TFN how long, "tax file number" wording (en) | how long does it take to get a tax file number 1,016@7.25 | same | 19 / 2,267 / 3 / 6.3 / 7.7 | 103 / (same) | Spell "tax file number (TFN)" in description and the new H2 (a19 R1); title change only if 7 Dec read shows CTR flat | P1, S | T3 |
| 18 | Work without a TFN (en) | can you work without a tax file number 187@5.13 | /blog/can-you-start-work-without-a-tfn | 19 / 1,225 / 3 / 3.8 / 6.0 | 0 / 281 | A: H2 "Can you work without a tax file number?" (H2 check failed, a19); L in from 4 TFN guides; 45% vs 15% line as sentence two (a18); L on to /tax-return | P1, S | Y |
| 19 | TFN before arriving (en) | can you apply for tfn before arriving in australia 106@5.13 | /blog/apply-for-tfn-before-arriving | 7 / 405 / 6 / 4.5 / 5.1 | 0 / 74 | L from /tfn and how-long guide (0 links in now); A "Can I apply for a TFN before I arrive?" | P1, S | Y |
| 20 | TFN not received / delayed (en) | tfn not received after 28 days 95@5.0 | /blog/tfn-application-delayed | 5 / 218 / 9 / 3.0 / 4.8 | 0 / 88 | F "Why is my TFN taking so long?"; keep title (best guide CTR 2.17%) | P2, S | Y |
| 21 | TFN reference number (en) | tfn application reference number 18@5.89 | /blog/tfn-reference-number-before-tfn-arrives | 2 / 35 / 1 / 4.3 / 5.1 | 51 / 140 | A: H2 "What is the reference number for a TFN application?" (Bing share 63%); L from how-long and delayed guides | P2, S | Y |
| 22 | No TFN tax rate (en) | no tfn withholding tax 38@9.74 | /blog/what-happens-without-your-tfn | 3 / 81 / 0 / 7.5 / 8.7 | 12 / 190 | A: H2 "What is the tax rate with no TFN?" below the cited opening; L on to /tax-return "claim back over-withheld tax" | P2, S | T3 |
| 23 | Does a TFN expire (en) | does tfn expire 34@6.74 | /blog/do-you-need-new-tfn-second-visa | 5 / 125 / 0 / 6.0 / 6.8 | 0 / 8 | A: H2 "Does a TFN expire?" first; L from what-is-a-tfn; L on to /tax-return and /superannuation (same TFN for both claims) | P2, S | Y |
| 24 | TFN on a WHV, service (en) | tax file number australia working holiday visa 110@9.09 | /tfn | 9 / 401 / 2 / 8.4 / 10.1 | 0 / 12 | T "Tax file number (TFN) on a working holiday visa: how to apply" (a19); L from rows 16, 18, 19; then L on to /tax-return | P2, S | T3 |
| 25 | Lost TFN (en) | find tfn 56@15.5 | /blog/how-to-find-lost-tfn | 16 / 327 / 2 / 10.1 / 24.9 | 0 / 121 | A: H2 "How do you find your TFN?" (a19); spell tax file number once | P2, S | T3 |
| 26 | ATO change of address (en) | ato change address 214@9.56 | /blog/how-to-update-address-with-ato | 49 / 1,947 / 2 / 3.9 / 9.0 | 61 / 245 | A: H2 "How do I change my address with the ATO?" with numbered myGov and phone steps; CTA line "Using our tax return service? Updating your ATO address is part of it" (Jo confirmed) | P1, S | T3 |
| 27 | TFN address change (en) | tfn address change 213@8.24 | same | 14 / 529 / 2 / 1.5 / 7.1 | (same) | T: add "TFN address" to description; F "Is my TFN address the same as my ATO address?"; L from /blog/tfn-australian-address-no-fixed-address | P1, S | Y |
| 28 | ABN on a WHV (en) | can you get an abn on a working holiday visa 55@6.53 | /abn | 8 / 160 / 1 / 5.7 / 12.2 | 0 / 0 | T description opens "Yes, you can get an ABN on a working holiday visa if..." (a19); A in hero; L on to /tax-return (ABN income in the return) | P2, S | T3 |
| 29 | TFN vs ABN (en) | tfn vs abn 27@14.96 | /blog/tfn-vs-abn-difference | 16 / 226 / 0 / 15.0 / 20.2 | 0 / 7 | C with can-you-have-tfn-and-abn; comparison table; L from /abn (a16 R7); L on to /tax-return | P2, S | T3 |
| 30 | Medicare on a WHV (en) | medicare working holiday visa 335@7.59 | /blog/what-is-medicare-working-holiday-makers | 20 / 1,019 / 5 / 6.0 / 9.7 | 0 / 70 | A: H2 "Can you get Medicare on a working holiday visa?" (Yes for the reciprocal countries, levy is separate); C with /medicare (section 4) | P1, S | T3 |
| 31 | Medicare reciprocal countries (en) | medicare reciprocal countries 143@14.03 | /blog/countries-with-medicare-agreement-australia | 16 / 324 / 0 / 6.7 / 15.6 | 372 / 633 | A: H2 "Which countries have reciprocal Medicare with Australia?" + 11 country table; T description "Medicare reciprocal countries: the 11 are..." (a19); keep opening | P1, S | T3 |
| 32 | Casual gives notice to cancel a shift (en) | how much notice does a casual employee have to give to cancel a shift 694@6.44 | /blog/casual-shift-cancellation-rules-australia | 4 / 782 / 4 / 5.0 / 6.5 | 0 / 96 | A: exact H2 + 2 sentence answer citing Fair Work; L from full-time-part-time-casual, unpaid-trial-shifts | P1, S | Y |
| 33 | Employer cancels a casual shift (en) | minimum notice to cancel casual shift australia 165@7.27 | same | 23 / 806 / 4 / 4.5 / 9.3 | (same) | A: H2 "How much notice must an employer give to cancel a casual shift?" with award examples (hospitality, retail, horticulture) | P2, S | T3 |
| 34 | RSA / white card on tax (en) | can you claim rsa on tax 26@4.65 | /blog/rsa-certificate-australia-working-holiday | 5 / 89 / 0 / 1.7 / 4.6 | 0 / 0 | F "Can you claim your RSA (or white card) on tax?" on both cert guides | P3, S | Y |
| 35 | White card (en) | white card 232@6.8 | /blog/white-card-australia-working-holiday | 15 / 474 / 1 / 3.8 / 11.7 | 0 / 0 | A "What is a white card?"; generic head term, low value | P3, S | P1 |
| 36 | Six month rule and hours (en) | working holiday visa 6 month rule exemption 8@8.62 | /blog/six-month-employer-rule-working-holiday-visa | 3 / 20 / 0 / 8.6 / 9.9 | 90 / 397+142 | I: request indexing of /blog/how-many-hours-can-you-work-on-whv (crawled not indexed, 142 citations); L between the two | P1, S | Y |
| 37 | German health cover (en) | germany travel insurance 18@6.22 | /blog/german-european-health-insurance-australia-working-holiday | 7 / 66 / 1 / 5.6 / 17.8 | 0 / 20 | C hreflang check with DE twin (section 4) | P3, S | Y |
| 38 | Financial year dates (en) | financial year dates 53@32.57 | /blog/australian-financial-year-dates | 62 / 1,075 / 0 / 5.3 / 25.9 | 4 / 102 | A "What financial year are we in?" dated answer; gov sites own head term | P3, S | P1 |
| | **JA: tax return and super first, then entry points** | | | | | | | |
| 39 | 税理士 / 代行 (ja) | オーストラリア タックスリターン 税理士 136@7.12 | /ja/blog/what-is-a-tax-agent | 12 / 528 / 29 / 2.7 / 6.8 | 0 / 7 | Keep page; L to /ja/tax-return "タックスリターン代行" high on page; never call ourselves 税理士 | P1, S | Y |
| 40 | Deadline いつまで (ja) | オーストラリア タックスリターン いつまで 129@7.73 | /ja/blog/australian-financial-year-dates | 7 / 251 / 3 / 5.4 / 7.0 | 0 / 15 | A: "10月31日" in first paragraph, L to the deadline guide; seasonal, ready by June 2027 | P2, S | T3 |
| 41 | After returning home 帰国後 (ja) | オーストラリア タックスリターン 帰国後 35@9.26 | /ja/blog/tax-obligations-after-leaving-australia | 4 / 48 / 3 / 9.3 / 9.5 | 0 / 0 | L to /ja/tax-return; A "帰国後でもタックスリターンはできる？" | P3, S | T3 |
| 42 | Medicare 免除 (ja) | メディケア免除申請 オーストラリア 115@8.37 | /ja/blog/medicare-levy-working-holiday-makers | 11 / 312 / 9 / 6.4 / 8.2 | 0 / 0 | A: H2 "メディケア免除申請のやり方" in steps; wording "申請方法を説明します" (we do not arrange the statement); C with /ja/medicare | P2, S | Y |
| 43 | Super 返金 (ja) | スーパーアニュエーション 返金 42@10.19 | /ja/superannuation | 14 / 202 / 7 / 5.8 / 8.5 | 0 / 18 | T description starts "スーパーアニュエーション返金" (a19); F "5,000ドル以上の場合" (34 impr query) | P2, S | T3 |
| 44 | Minimum wage (ja) | オーストラリア 最低賃金 251@10.24 | /ja/blog/minimum-wage-australia-2026-27 | 17 / 917 / 0 / 7.9 / 9.2 | 56 / 109 | A: H2 "オーストラリアの最低賃金はいくら？（2026年）" + casual/part/full table; L from kitchen-hand, penalty-rates, trial (a07 R2) | P1, M | T3 |
| 45 | Kitchen hand / trial shifts (ja) | キッチンハンドとは 138@4.4 | /ja/blog/kitchen-hand-working-holiday-australia | 6 / 208 / 8 / 2.0 / 4.8 | 0 / 0 | A "キッチンハンドとは" definition first; trial guide already 2.0 | P2, S | Y |
| 46 | ABN / sole trader とは (ja) | sole trader 意味 24@6.0 | /ja/blog/what-is-an-abn | 7 / 87 / 0 / 6.0 / 8.2 | 5 / 0 | C with /ja/blog/category/abn (section 4); F "sole traderとは" | P2, S | T3 |
| 47 | PAYG / payslip とは (ja) | ペイスリップとは 20@5.25 | /ja/blog/what-is-payg-payment-summary | 1 / 20 / 1 / 5.2 / 5.2 | 30 / 24 | A: H2 "PAYGとは" two sentence definition (Copilot cites it for paygとは) | P2, S | Y |
| 48 | TFN 住所変更 (ja) | tfn 住所変更 41@8.93 | /ja/blog/how-to-update-address-with-ato (not /ja/tfn) | 1 / 41 / 0 / 8.9 / 8.9 | 0 / 4 | T/H1 add "TFN 住所変更" (a07 R6); page already 4.65 | P2, S | Y |
| | **DE: tax return and super first, then entry points** | | | | | | | |
| 49 | Steuererklärung Work and Travel (de) | steuererklärung australien work and travel 19@6.63 | /de/tax-return | 3 / 39 / 2 / 6.6 / 12.4 | 0 / 0 | L anchors "Steuererklärung Australien" from DE guides (a06 R5); index the 34 zero impression DE guides first | P2, M | T3 |
| 50 | Super zurück (de) | superannuation zurück 35@13.17 | /de/superannuation | 3 / 86 / 0 / 4.6 / 8.9 | 0 / 1 | H1 "Superannuation zurückholen" (a06 R4); keep title | P1, S | Y |
| 51 | Steuerjahr, tax return timing (de) | steuerjahr australien 14@5.21 | /de/blog/australian-financial-year-dates | 1 / 14 / 0 / 5.2 / 5.2 | 0 / 13 | Hold (owner already 3.2 page avg) | P3, S | Y |
| 52 | Mindestlohn (de) | mindestlohn australien 40@8.2 | /de/blog/minimum-wage-australia-2026-27 | 3 / 56 / 0 / 8.2 / 8.6 | 10 / 28 | A table with 2026-27 rate and casual loading; dated source | P2, S | T3 |
| 53 | White card (de) | white card australien 100@8.03 | /de/blog/white-card-australia-working-holiday | 5 / 252 / 1 / 3.6 / 6.5 | 0 / 0 | A "Was ist eine White Card?" (38@3.58 already); "beantragen" steps | P2, S | Y |
| 54 | ABN beantragen (de) | abn beantragen 46@7.39 | /de/abn | 1 / 46 / 0 / 7.4 / 7.4 | 0 / 0 | A "ABN beantragen: Schritt für Schritt"; L from how-to-register-for-an-abn | P2, S | T3 |
| | **IT / ES / FR (only IT has a visible tax return query; ES/FR guides are entry points to the flagships)** | | | | | | | |
| 55 | Tasse working holiday (it) | tasse working holiday 44@20.5 | /it/dichiarazione-redditi-australia | 1 / 44 / 0 / 20.5 / 20.5 | 0 / 0 | I: flagship has no GSC row; index, then L from IT guides | P2, S | P1 |
| 56 | Salario mínimo (es) | sueldo minimo en australia 7@13.29 | /es/blog/minimum-wage-australia-2026-27 | 4 / 23 / 0 / 9.6 / 9.7 | 0 / 0 | T add "2026" and "sueldo" (a08 R3); page 258@6.97; L on to /es/devolucion-impuestos-australia | P2, S | T3 |
| 57 | RSA Australie (fr) | rsa australie 31@11.97 | /fr/blog/rsa-certificate-australia-working-holiday | 2 / 44 / 0 / 12.0 / 16.3 | 0 / 0 | T add "Australie" and "passer son RSA" (a08 R3); L on to /fr/tax-return-australie-pvt | P2, S | T3 |
| | **SVT: tax return first; super/DASP head terms sit at 78 to 91 (291 impr), so super work there is the Plan item 10 rebuild, not a #1 target yet** | | | | | | | |
| 58 | Hoàn thuế (SVT vi) | hoàn thuế ở úc 24@34.42 | /vi | 6 / 86 / 0 / 29.4 / 33.0 | n/a | Plan item 9 routing box + vi home answer block (a13 R1, R2) | P1, S | P1 |
| 59 | International student tax return (SVT en) | international student tax return 13@51.15 | / | 27 / 68 / 0 / 47.3 / 54.6 | n/a | L from TRS and student guide (a13 R3); new domain, authority bound | P2, S | P1 |
| 60 | zh 退税 / vi là gì long tail (SVT) | 2026报税截止日期 5@9.2; white card là gì 7@7 | /zh/blog/how-long-does-a-tax-refund-take, vi posts | 14 / 32 / 0 / 7.0 / 9.3 | n/a | A one line definitions first; L to /zh and /vi with "澳洲留学生报税" / "khai thuế du học sinh" | P2, S | Y |

Not chasing (off target or ATO owned, 0 clicks): what is the ATO 1,096 impr @17.2; ATO debt/payment plan 726 @34.0; objections
259 @30.9; generic "claim superannuation" 2,048 @32.4; lost super 835 @29.3; tax invoice 311 @20.1; PAYG summary 225 @24.7;
SVT "dasp licence/licensing" 284 @57.2 and SVT DASP head terms 291 @81.6. Use only L to service pages from these guides.

## 4. Clusters where two of our pages split the signal (evidence: Pages.csv rows; no query to page data)
1. Medicare: /blog/what-is-medicare-working-holiday-makers 8,953@5.92, /medicare 4,735@5.35, levy guide 1,636@6.03 (Copilot: 70,
   70, 107). Fix: guide owns "medicare working holiday visa"; /medicare owns "levy exemption" service; each links the other with
   that exact anchor. No merge (all three work).
2. DASP tax: 65% explainer 867@10.15 vs tax-on-super-withdrawal-backpacker 690@8.85 (a09: wrong one growing). Fix: retarget,
   not merge (a05 R5 data): withdrawal page owns "tax on super withdrawal", explainer owns "dasp tax rate" and "super tax
   working holiday maker" with one link each way. P2, S.
3. Super hub: /superannuation 9,457@16.65 vs dasp-vs-leaving-super pros-cons 1,348@23.8, what-is-dasp-super-withdrawal
   114@16.6, /blog/category/super 146@30.7 (still index: true, Plan item 12 fixes). Pros-cons title drops "claim super".
4. TFN category page: /blog/category/tfn 837@7.73 and /blog/category/tax-return 342@10.88 take TFN and return impressions from
   guides. Fix: category intro links to the owner guides with exact anchors; do not noindex (they rank). P3.
5. TFN vs ABN: can-you-have-tfn-and-abn 3,287@6.91 vs tfn-vs-abn-difference 1,013@10.73. Keep "at the same time" on the first.
6. Tax return: / 3,766@11.25 vs /tax-return 760@30.15 vs tax-back guide (Copilot 267) vs how-to-lodge-tax-return-working-holiday
   70@23.7. Home keeps "working holiday tax"; /tax-return "working holiday visa tax return"; guide "tax back"; lodge guide DIY.
7. JA tax agent: what-is-a-tax-agent 1,496@6.65 vs /ja/tax-return 27@24.9 vs /ja. Google chose the guide; route, do not fight.
8. JA deadline and medicare: financial-year 533@4.56 vs deadline guide (1 impr); levy guide 1,177@7.55 vs /ja/medicare 47@7.68.
9. JA ABN: /ja/blog/category/abn 104@8.0 vs what-is-an-abn 173@7.7 (a07 R5).
10. DE health: EN german-european-health-insurance 1,171@7.38 vs DE twin 41@11.4 (a06 F8): check hreflang pairing (I).
11. FR/ES tax back guides outrank flagships (fr guide 38@15.7, flagship 23@8.1; es guide 45@6.0, /es/tax-return 14@29).
12. SVT vi: TRS post 115@21.0 carries "hoàn thuế" instead of /vi (1 impr). Plan item 9.
13. Old /guides/ URLs still get impressions (e.g. /guides/what-is-payg-payment-summary 46@64.7); confirm 301s (Plan item 13).

## 5. Per language: clusters we can realistically own at #1 (estimate, from the Own column)
| Lang | In top 60 | Own #1 (Y) | Top 3 (T3) | Query rows inside Y clusters |
|---|---|---|---|---|
| WHT en | 38 (15 core) | 15 | 17 | about 100 |
| WHT ja | 10 (5 core) | 5 | 5 | about 31 |
| WHT de | 6 (3 core) | 3 | 3 | 9 |
| WHT fr / it / es | 1 / 1 / 1 | 0 / 0 / 0 | 1 / 0 / 1 | 0 |
| SVT en / zh+vi | 1 / 2 | 0 / 1 | 0 / 0 | 14 |
Estimate: if half the Y clusters' query rows reach #1, visible #1 queries rise from 4 to about 60 to 90 within 3 to 6 months.
FR/IT/ES and SVT money terms are bound by indexing age and authority, not on-page work (a08, a13); no outreach for now per Jo.

## 6. New items for the plan (rest is already in PLAN_CURRENT)
- P1, S: "Question H2 pass" on core rows 1, 7 to 11, 13, 14, 39 to 43, 49, 50 first, then entry rows 16 to 23, 26, 27, 30, 31, 44, 47 (one deploy, dated; each entry H2 answer ends with one link on to /tax-return or /superannuation): add the H2 and the 40 to 55 word answer
  only; no title or opening changes on top cited pages; never rename existing H2s.
- P1, S: Jo URL Inspection and request indexing for /blog/how-many-hours-can-you-work-on-whv, /blog/tax-back-australia-working-holiday,
  /blog/past-years-tax-returns-working-holiday and /it/dichiarazione-redditi-australia.
- P1, S: address guide CTA about the ATO address update (Jo confirmed service).
- P2, S: the split fixes in section 4, items 1, 2, 5, 8, 9 (anchors and titles only).
- Measure (7 Dec, then every 28 days): rerun `p1_kw.py` on a new export; KPI = query rows at pos 1 to 1.5 and 1.5 to 3.5 per
  language (baseline 4 and 22), the 60 cluster table, "Q&A rich results" impressions (510), and Bing grounding citation share
  per query (baseline file above). Ask Jo for page filtered query exports on rows 1, 10, 14, 16, 26, 30, 31, 44 to confirm owners.
