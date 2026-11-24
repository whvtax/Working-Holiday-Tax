# p4-content: new pages and question banks to cover more queries (Dec 2026 to May 2027)

Lens: cover more search queries with new, high quality pages, in the existing languages only (Jo, 24 Nov: no Korean,
no Traditional Chinese, no fee displays, no named reviewer, no MES arranging, no SVT super consolidation, no TFN mail
address). Sources: a20, a10, a13, a16, a17, a18; `gsc24/wht/Queries.csv`, `gsc24/svt/Queries.csv` (23 Nov, 3 months);
Bing AI Performance `gsc24/bing/*` (20 Oct to 21 Nov); repo `repo/whvtax-FINAL58` (grep checks below); 7 web searches
on 23 Nov ("SERP observed" = WebSearch tool, US index, not a Google position). Rows quoted as "query" impr@pos.
No search volumes are invented; every number is a GSC, Bing or Home Affairs figure from the files named.

Priority (Jo, 24 Nov): core services are TAX RETURNS (refunds) and SUPER WITHDRAWAL (DASP) in every language. TFN and
ABN content is built only where it feeds those two (for example "weeks taxed at 45% without a TFN are reclaimed in the
tax return"; "ABN income changes your tax return"; "cancel your ABN before DASP"). Section 3.0 gives the build order.

## 0. What this adds to PLAN_CURRENT (and what it changes)
1. A question bank system per service per language (section 2), so existing pages answer many more queries without
   new thin URLs. Most "missing" queries already have a page (a20 F1: 144 WHT guides in all 6 languages, about 150 SVT
   articles in en/zh/vi); the bank decides which page owns each question.
2. A calendar sequence for every new page (section 3), each live about 6 weeks before its seasonal peak (a20 F8).
3. Four items not yet in the plan (verified absent in the repo): WHT casual super cluster rebuild + Payday Super guide
   pairing; SVT "income from overseas while studying" owner guide (merges a20 SVT #7); a factual "Australian documents
   your home tax office may ask for" section in /leaving-australia; SVT question H2s for RSA, WWCC and OSHC.
4. Two corrections: (a) do NOT create a dated "Tax time 2027" URL (a20 WHT #11, SVT #10); refresh the existing
   evergreen deadline guides at the same URL instead, so the JA いつまで cluster keeps its pos 5 to 8; (b) Korean and
   Traditional Chinese (PLAN Phase 3, a10 R3/R4) are removed per Jo.

## 1. Owner test (applies to every new URL; prevents thin pages and cannibalisation)
A question gets a NEW guide only if all four hold, otherwise it becomes an H2 in an existing page or a FAQ entry:
(1) grep of the repo in that language finds no page that answers it as its main topic; (2) our data shows at least about
50 impressions in 3 months across its variants, OR the SERP is owned by forums, community threads or old blogs (SERP
observed); (3) the page can carry a table, checklist or worked example of its own, not a rewrite of another guide;
(4) it has one natural link into a service page with an exact anchor. After 6 weeks, check GSC for two own URLs on one
query; if found, move the weaker page's answer into the owner and 301 (owner wins on clicks, then position).

## 2. Question bank per service per language (P1, effort M once, then S per month)
Files (docs only, no routes): `docs/keywords/qbank/<brand>-<service>-<lang>.md`. Build order: tax-return and super/DASP
banks first in all 9 brand-languages (WHT 6, SVT 3 = 18 files, December); TFN, ABN and Medicare banks after (January),
keeping only questions whose answer links into /tax-return or /superannuation (or SVT home, /superannuation). Columns: question in native wording,
variants seen, source (GSC row, Bing grounding query, SERP observed PAA or forum title, WhatsApp chat Jul to Oct),
owner URL, placement (service FAQ / guide H2 / guide FAQ), status, date added.
Rules: one owner per question; others give one line plus a link. Service page FAQ stays at 10 to 15 questions (current:
EN tax-return 15, super 10, tfn 10, abn 10, medicare 6; DE 10 to 14; JA 10 to 12; FR 10 to 11; IT 9 to 13; ES super 13,
tfn 10, abn 10 but ES tax-return only 5). The overflow goes to guide H2s. Each answer: question verbatim as H2/H3 in
native phrasing (not translated from EN), first sentence under 50 words with the number or date, one visible ATO /
Fair Work / Home Affairs link, then detail. Question H2s already feed FAQPage JSON-LD (a18 F8), so no schema work.
Native question forms to mine and use: JA いつまで / やり方 / 帰国後 / とは / いくら; DE wie lange / zurück bekommen /
beantragen / was ist; FR comment / faut-il / PVT / récupérer; IT come / quanto / tasse working holiday; ES cómo /
cuánto / sueldo (Latin American wording, a10 R6); zh 多久 / 怎么 / 截止日期 / 退税; vi là gì / bao nhiêu / như thế nào.
Monthly refresh: GSC Queries filtered by the a18 question regex (baseline: 329 question rows, 14,254 impr, weighted
pos 11.1, CTR 0.34%) plus Bing grounding queries.

Seed questions from our data (owner in brackets; "existing" = page exists, add the H2 or FAQ):
| Service | Lang | Questions and evidence | Owner and placement |
|---|---|---|---|
| TFN | en | "do you need a tax file number to work" 124@6.59; "can you get paid without a tax file number" 77@7.39; Bing "what is reference number for tfn application" 33 cit., "tfn application reference number" 18, "no tfn tax rate" 12 | existing guides keep them; /tfn gets a 5 line "first week" summary linking each |
| TFN | it/es | EN TFN timing rows landing on IT pages: "how long does a tfn take to come" 204@5.8 | IT/ES how-long guide: first sentence answer as in DE twin |
| ABN | en/de/ja | "can you get an abn on a working holiday visa" 55@6.53 + 46@5.67; "abn vs tfn" 12@16.42, "abn or tfn" 7@23.71; DE "abn beantragen" 46@7.39; JA "abn とは" 7@8.71, Bing "abnとは" 5 cit. | /abn FAQ (existing Q1); comparison table in tfn-vs-abn-difference; DE how-to-register guide H2 "ABN beantragen: Schritt für Schritt" |
| Super | en | "do casuals get super" 89@21.17, "do casual employees get super" 88@28.15, "...superannuation" 76@27.33, "do casual workers get super" 70@23.89 + 30@25.77, "is super payable on overtime for casuals" 23@15.52 (about 376 impr) | super-for-casual-and-part-time-workers: one H2 per variant group (see A2) |
| Super | en | "does gross income include super" 26@30.92, "does gross salary include super" 25@38.32 + 12@35.33, "does gross pay include super" 14@25.64, "does gross wages include super" 12@21.5 (89 impr) | H2 in gross-pay-vs-net-pay-australia (keeps WHV angle, a05 R7) |
| Super | en | "how to get superannuation back" 94@36.03, "how do i claim my superannuation" 81@39.58, "when can i claim my super" 12@49.42, "why is dasp tax so high" 19@8.0, "is unclaimed super automatically moved to the ato" 31@6.19, "my superannuation claim was rejected, what now?" 62@9.03 | /superannuation FAQ for the first three (replace none of the 10, swap only if one has 0 impr); others stay on their guides |
| Super | de/ja | "superannuation zurück" 35@13.17; "スーパーアニュエーション 返金 やり方" 12@6.75, "...申請方法 帰国後" 12@7.42 | /de/superannuation DASP step section (a17 R6); /ja/superannuation FAQ |
| Tax return | ja | いつまで cluster: 129@7.73, 65@6.6, 20@6.65, 17@5.41, 8@4.62, 7@6.43 (246 impr, 2 clicks) | existing JA deadline guide (refresh yearly, same URL); /ja/tax-return FAQ already has the question |
| Tax return | es | /es/tax-return has 5 FAQs vs 10 to 15 elsewhere | bring to 10 with cómo / cuánto tiempo / desde mi país questions (no fee numbers) |
| Medicare | en | Bing: "reciprocal medicare" 164 cit., "medicare reciprocal countries" 85, "rhca medicare" 36; /medicare has 6 FAQs | /medicare FAQ to 10, linking countries-with-medicare-agreement (633 cit.) |
| SVT misc | en | "is rsa tax deductible" 3@8.33; "can you claim wwcc on tax" 3@10.67; "is oshc private health insurance for tax purposes" 3@19 | H2s in rsa-certificate-international-students, working-with-children-check-international-students, medicare-or-oshc-international-students |
| SVT refund | vi/zh | "hoàn thuế ở úc được bao nhiêu" 13@29.38; "退税时间" 4@9; "2026报税截止日期" 5@9.2 | vi average-tax-refund H2 (a13 R1); zh deadline and refund-time posts |
Expected effect (estimate): more of the 14,254 question impressions answered by the intended page; the casual super and
gross-includes-super groups (about 465 impr at pos 15 to 38) are the likeliest to move to page one. Clicks may stay low
on pure facts (a18 F2); value is AI citation and links into money pages. Measure: share of question rows at pos 10 or
better, and Bing cited pages count (baseline 20 Oct to 21 Nov in `gsc24/bing`).

## 3.0 Core first: build order per language (tax return and super/DASP before anything else)
Off season for lodging is not off season for these intents: late and past-years returns grow after 31 Oct ("late tax
return" 25@24.3, late cluster 244 impr@23.8, a05), and departures plus DASP run all year with the Mar to Jun peak.
| Lang | 1st (Dec build) | 2nd (Jan build) | TFN/ABN only as feeders |
|---|---|---|---|
| en | super bank: casual super H2s (about 376 impr) + Payday Super guide (A2); /superannuation FAQ "how to get superannuation back" 94@36.03, "how do i claim my superannuation" 81@39.58 | /leaving-australia (B1) with DASP and "lodge from home"; past-years and late-return entry on /tax-return (PLAN Phase 1) | /tfn first-week section links "45% weeks are reclaimed in your tax return" (A1) |
| de | DASP Schritt für Schritt on /de/superannuation (B3): "superannuation zurück" 35@13.17, "...zurück bekommen" 34@4.59 | /de/leaving-australia; /de/tax-return bank ("Steuererklärung Australien nachträglich / von Deutschland aus"); German page (B4) | "abn beantragen" 46@7.39 only via "ABN und Steuererklärung" H2 |
| ja | /ja/superannuation bank: "返金 やり方" 12@6.75, "申請方法 帰国後" 12@7.42; JA deadline guide refresh (C2, いつまで 246 impr) | /ja/leaving-australia; 帰国後 tax return content (B4 Japan page, "タックスリターン 帰国後" 35@9.3); JA choosing-help guide (C4) moved up to Feb | ABN とは only inside ABN-and-tax-return H2 |
| fr | /fr/superannuation bank ("récupérer sa superannuation", DASP to a French account, a20 #15); flagship /fr/tax-return-australie-pvt bank (1 click, 23@8.09) | /fr/leaving-australia + B2 section | none new |
| it | /it/superannuation (95 impr, 1 click) bank; "tasse working holiday" 44@20.5 to /it/dichiarazione-redditi-australia | /it/leaving-australia + B2 | none new |
| es | /es/tax-return FAQ from 5 to 10 now (moved from C3); /es/superannuation (74 impr, 0 clicks) bank, Latin American wording | /es/leaving-australia + B2 | none new |
| SVT en | Payday Super for students (a20 SVT #4: "not being paid super" 92@78.46); tax rates 2026-27 (A8, feeds the return); graduating section with DASP (B5) | first job hub (A9) framed as "your first payslip and your tax return"; foreign income guide (A11) | /abn hub (A10) after, P3 |
| SVT zh | zh deadline and 退税时间 posts ("2026报税截止日期" 5@9.2, "退税时间" 4@9); zh DASP/graduating section | zh rates 2026-27, Payday Super | later |
| SVT vi | vi "hoàn thuế" routing to /vi (83 impr, a13 R1) and "hoàn thuế ở úc được bao nhiêu" H2; vi graduating + DASP section | vi rates 2026-27, Payday Super | "abn là gì" only via ABN-and-tax-return H2 |
Changed priorities below: A1 (TFN section) P1 to P2; A9 (SVT first job) P1 to P2; A10 (SVT /abn hub) P2 to P3; A12
(RSA/WWCC/OSHC) P2 to P3; B1, B3, B5 and the ES tax-return FAQ move into the December build; C4 moves to February.

## 3. New pages and sections by season (N = new in this report; P = already in PLAN_CURRENT; A = from a20)
### Wave A: arrivals, TFN, harvest, ABN, summer break. Build now, live by mid Dec to mid Jan (peak Dec to Mar)
| # | Item | Lang | Target queries (data) | Why it can win | Owner page; link into service | Pri / effort |
|---|---|---|---|---|---|---|
| A1 | /tfn "first week in Australia" section (TFN, bank, super fund, payslip check), not a new hub | 6 | rows in section 2 TFN; "tax file number australia working holiday visa" 110@9.09, "tfn working holiday visa" 74@9.66 (a05) | TFN guides already rank 5 to 8 and earn most Bing citations (how-long 1,664 cit.); a WHT hub would split /tfn (pos 7.84) | /tfn; each guide links back; /tfn links /tax-return "45% weeks reclaimed in your tax return" | P2 / S (feeder) |
| A2 | N: Payday Super guide (A #6) paired with casual super rebuild | en, de, ja, fr | casual super group about 376 impr at 15 to 28; "pay day super" 1@1 | rule started 1 July 2026, no page exists (a20 F5: inline in 5 guides); rivals' super pages are about DASP | new guide + super-for-casual page; both link /superannuation "claim your super after a working holiday" | P1 / S |
| A3 | P: 2026-27 package (what changed 1 July 2026; calculator year on the same /calculator URL) | en, de, ja (calc all 6) | "working holiday visa tax calculator" 100@9.68; "working holiday tax calculator" 20@10.3 | year-in-title pattern common in SERP (a16 F3); our calculator page says 2025-26 only | /calculator; links /tax-return | P1 / M |
| A4 | A: 88 days: pay, payslip and records that prove specified work | 6 | season; SERP observed: pvtistes specified work dossier, backpackerjobboard 88 days calculator, gogaffl, pomsinoz forum | nobody covers the tax records angle (cash, ABN farm work, piece rates); repo has "88 days" in only 4 files as fragments | new guide; links /abn ("ABN for farm work") and /tax-return; visa decisions stay with Home Affairs | P2 / M |
| A5 | A: work for accommodation and volunteering (hostels, Workaway) | en, de, fr, ja | SERP observed: ATO WHM pages, australia.com WHV FAQ only | 0 repo files mention it; question is situational, community style SERP | new guide; links /tax-return and fair-work guides | P2 / M |
| A6 | A: Christmas, New Year, Australia Day shifts section | 6 | "public holiday pay rates" 9@39 | seasonal; existing guide | public-holidays guide H2; link penalty-rates | P3 / S, live early Dec |
| A7 | A: SVT summer break work guide (48 h per fortnight in session, unlimited in scheduled breaks; check VEVO wording) | en, zh, vi | "student visa work rights australia" 1@47; rule only inline in batch-03/11 | universities and IDP own it with no tax angle (a20) | new guide; links home ("international student tax return") | P1 / S |
| A8 | A: SVT tax rates 2026-27 (residency "may" apply), keep 2025-26 page and cross link | en, zh, vi | "student visa tax rate" 11@57.64, "student visa 500 tax rate" 10@66.3, "student tax rate" 5@44.8 | no 2026-27 page exists | new guide; links home | P1 / S |
| A9 | A: SVT first job hub (TFN, bank, super, payslip) for the Feb intake | en, zh, vi | "apply tfn online international student" 18@48.67 | links 6+ existing posts into one owner | new hub; links home "international student tax return" and /superannuation | P2 / M, live late Jan |
| A10 | P: SVT /abn hub (tfn pattern) | en, zh, vi | vi "abn là gì" 2@10, "ubereats student visa" 6@31.83 (a13 F7) | gathers 6 ABN posts; summer gig work | new hub; links /abn-delivery (tax return with ABN income) | P3 / M, after core |
| A11 | N: SVT "Income from overseas while studying": savings interest at home, money from parents (not income), remote work for an overseas employer (absorbs a20 SVT #7) | en, zh, vi | no GSC rows yet; SERP observed for vi student tax: ATO Vietnamese "foreign income" and residency factsheets, studyaustralia.gov.au; repo: "foreign income" in 4 SVT files, inline only | one owner instead of two thin pages; residency "may be" / "usually" decides it | new guide; links tax-residency guide and home | P2 / M, live Feb |
| A12 | N: SVT RSA / WWCC / OSHC question H2s (section 2) | en (zh, vi later) | rows in section 2 | pages already rank 8 to 19 | existing posts | P3 / S |

### Wave B: departures and DASP. Build Jan, live by mid Feb to early Mar (peak Mar to Jun)
| # | Item | Lang | Target queries (data) | Why it can win | Owner page; link | Pri / effort |
|---|---|---|---|---|---|---|
| B1 | P/A: WHT /leaving-australia checklist hub, with section "refund and DASP to an overseas bank account" (A #15) | 6 | "how do i claim my superannuation when i leave australia" 100@40.36, "withdraw super leaving australia" 43@31, "claim superannuation leaving australia" 37@32.4, "leaving australia" 26@31.2 (a20 F2) | no WHT owner page; topic split over 5 guides; SVT has one, WHT not | new hub; super section links /superannuation, no DASP steps repeated | P1 / M, build Dec, live late Jan |
| B2 | N: section in B1 "Australian documents your home tax office may ask for" (income statement, notice of assessment, tax paid, in English); states we do not advise on home country tax | de, fr, it, es, ja (en short) | SERP observed: pvtistes forum threads ("déclaration des revenus en France après avoir travaillé en Australie"), zeiri4.com Q&A for ワーホリ 帰国後 確定申告, lohnsteuer-kompakt for Progressionsvorbehalt; repo: Progressionsvorbehalt in 1 file (EN German page), 住民税 0 files | forums own it, no service page answers the Australian side | section only, not a page; links /tax-return ("lodge from home") | P2 / S |
| B3 | A: DE DASP step by step section (a17 R6) | de | "superannuation zurück" 35@13.17; "superannuation australien zurück bekommen" 34@4.59 | German SERP is old blogs (a17 F2, F3) | /de/superannuation | P1 / S, build Dec |
| B4 | P: German page in German; Japan (NDA) page en + ja | de; en, ja | "steuererklärung australien work and travel" 19@6.63, "steuerrecht australien" 12@22.5; "オーストラリア タックスリターン 帰国後" 35@9.3 | Germany and Japan in ATO NDA list (a20 F4); Japan 354 clicks, Germany 165 (a10 F1) | new pages; link /de/tax-return, /ja/tax-return (informational, no 税理士 claim) | P2 / M |
| B5 | A: SVT "graduating this summer" section | en, zh, vi | "leaving australia" 4@78.75, "superannuation leaving australia" 1@78 | Dec graduations | /leaving-australia (SVT) and 485 post | P1 / S, build Dec |
| B6 | P: Ireland and Canada guides (English, allowed: no new language) | en | Ireland 1,100 impr pos 8.98, 14,833 holders; Canada 1,409 impr (a10 F8) | no Ireland or Canada page; departures drive residency and Medicare questions | new guides; link countries-with-medicare-agreement and /superannuation | P3 / S, live Mar |

### Wave C: EOFY and tax season 2027. Build Apr, live mid May to early Jun (peak Jul to Oct)
| # | Item | Lang | Target queries (data) | Why it can win | Owner page; link | Pri / effort |
|---|---|---|---|---|---|---|
| C1 | A: EOFY 30 June checklist (WHT, SVT) | WHT en, de, ja; SVT en, zh, vi | "end of financial year australia" 46@29.6, "current financial year" 34@24.1, "what financial year are we in" 28@25.7; zh "2026报税截止日期" 5@9.2 | australian-financial-year-dates keeps date queries; checklist is a different task | new page each brand; links /tax-return and SVT home | P2 / S |
| C2 | Changed: refresh the existing deadline and refund timing guides for tax time 2027 at the SAME URL (tax-return-deadline-31-october-working-holiday, how-long-does-tax-refund-take-australia, JA/DE twins, SVT deadline posts) | 6 + 3 | JA いつまで 246 impr at 5 to 8; "when to expect tax refund 2026" 7@30.57 | keeps earned rank; a dated URL would compete with it | existing guides; link /tax-return | P1 / S, by 1 June |
| C3 | Tax-return question bank refresh in all languages (ES to 10 FAQs) | 9 | section 2 | July is the click peak (a05 table) | service pages (ES moved to Dec) | P1 / S, by mid June |
| C4 | P: JA guide on choosing help and how fees are generally set, no numbers for our own fee (Jo) | ja | "オーストラリア タックスリターン 税理士" 136@7.12, "...安い" 79@7.22 (a17) | Japanese SERP rewards 選び方 guides | new guide; link /ja/tax-return "タックスリターン代行" | P2 / M, live Feb (moved up: tax return core) |

## 4. Not doing (and why)
Korean, Traditional Chinese (Jo). Fee blocks or price comparisons (Jo). Japanese 住民税 / 国民年金 and other home country
tax pages (outside an Australian service, advice risk; B2 covers only Australian documents). Separate SVT /tax-return
(home owns it, a13 R5). "Backpacker tax" news hub (news SERP, a16). Dated "tax time 2027" URLs (C2). Au pair, daigou,
partners, OSHC, harvest calendar (a20 P3 items): revisit after Wave A shows indexing.

## 5. Rules applied to all items
No tax agent or lodging claim; only the approved sentences. No refund promise; examples labelled illustrative. Brands
never link or mention each other (twin topics written separately, different structure). SVT residency "may be" or
"usually". Organization schema only. No dashes. Facts checked on ATO, Fair Work, Home Affairs and dated. Top AI cited
pages (how-long TFN, countries-with-medicare, six-month rule, can-you-start-work, tax-back) keep their openings; they only
gain links to the new owners.

## 6. Measurement
Per item, a fixed query set (the rows quoted above) checked in GSC at 4 and 8 weeks after live; new URL appears in Pages
and in Bing AI cited pages; two-URL-per-query check at 6 weeks (owner test). Wave targets (estimates, not guarantees):
Wave A pages indexed and showing impressions by mid Jan; B1 departure queries from pos 28 to 41 toward under 15 by end
April (a20 R1); question bank share of question impressions at pos 10 or better up from the 23 Nov baseline.
Sources (web, 23 Nov): pvtistes.net forum and dossiers; zeiri4.com; lohnsteuer-kompakt.de; backpackerjobboard.com.au/88-days-calculator;
gogaffl.com; australia.com WHV FAQ; ato.gov.au (WHM, Vietnamese foreign income and residency); studyaustralia.gov.au.
