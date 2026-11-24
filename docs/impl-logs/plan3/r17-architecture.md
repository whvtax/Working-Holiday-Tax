# r17 architecture: internal links, cannibalisation, hub and spoke for tax return and super (WHT + SVT, all languages)

Method. Links were counted on the rendered HTML of the v68 build (`/home/claude/v68build/.next/server/app`, 1,574 public
pages, 109,643 links; its `src` differs from base20 only in RootDocument.tsx (font stub) and one test file). Regions:
template (header, footer), main, guide body (`guide-body` to the TOC aside), related cards, breadcrumb. Scripts and raw
output: `S/plan3/r17/graph.py`, `count.py`, `reg.py`, `clus.py`, `inb.py`, `phr.py`, `g.json`. GSC: `S/gsc24/wht`, `svt`
(3 months to 21 Nov). Important limit: no GSC export pairs queries with pages (Filters.csv shows no page filter, and
a05/a09 say the same), so every "which URL ranks for this query" below is an INFERENCE from matching positions and topics.

## 1. Findings

### F1 (fact) Inbound links to the money pages, per language
Pages = distinct source pages linking from main content (guides in brackets); template = header/footer on every page.
| hub | main pages (guides) | template pages | top anchors in content (count) |
|---|---|---|---|
| /tax-return | 163 (146) | 174 | working holiday tax return 103, tax return 52, "What we do" card 114 |
| /superannuation | 83 (72) | 174 | super 14, superannuation 12, claim your superannuation after leaving Australia 12, DASP claim 6 |
| /de/tax-return | 161 (145) | 172 | Steuererklärung 73, Steuererklärung als Working Holiday Maker 44, Working-Holiday-Steuererklärung 29 |
| /de/superannuation | 72 (63) | 172 | Super 18, Superannuation 15, Superannuation nach der Abreise auszahlen lässt 8, DASP-Antrag 6 |
| /ja/tax-return | 161 (146) | 172 | ワーホリのタックスリターン 89, タックスリターン 76, ...代行 7 in total |
| /ja/superannuation | 71 (62) | 172 | スーパー 18, スーパーアニュエーション 13, 出国後のスーパー受取 11, DASPの請求 6 |
| /fr/tax-return (hreflang twin) | 142 (129) | 173 | tax return 80, tax return en PVT 28, Tax return 8 |
| /fr/tax-return-australie-pvt (flagship) | 59 (51) | 168 (footer "Le guide complet du tax return") | tax return en PVT 16, tax return Australie PVT 9 |
| /fr/superannuation | 66 (56) | 173 | super 25, réclamer votre super après avoir quitté l'Australie 8 |
| /it/tax-return (twin) | 151 (137) | 173 (nav label "Dichiarazione dei redditi") | tax return 80, tax return da working holiday maker 36 |
| /it/dichiarazione-redditi-australia | 56 (48) | 168 (footer) | dichiarazione dei redditi australiana 6, tax return 5, dichiarazione dei redditi in Australia 5 |
| /it/superannuation | 67 (57) | 173 | super 17, superannuation 9 |
| /es/tax-return (twin) | 157 (143) | 173 | tax return 86, tax return de working holiday maker 29, ...de working holiday 28 |
| /es/devolucion-impuestos-australia | 57 (50) | 168 (footer) | devolución de impuestos en Australia 18 |
| /es/superannuation | 66 (56) | 173 | super 14, superannuation 11, reclamar tu superannuation al salir de Australia 8 |
| SVT / (tax return hub) | 187 (173) | 186 | International student tax return 165 (related lists), Get your tax refund on a student visa 9 |
| SVT /zh, /vi | 187 (173) each | 186 | 澳洲留学生报税 165; Khai thuế, hoàn thuế cho du học sinh 165 |
| SVT /superannuation (en, zh, vi) | 58 (53) each | 186 | Super (DASP) 54; 养老金（DASP） 54; Tiền super (DASP) 54 |
Reading: tax hubs are well linked; super hubs get half as many content links with generic anchors ("super",
"superannuation") while the queries are "claim superannuation", "superannuation working holiday visa" (F8).

### F2 (fact) Hub to spoke: what the money pages link
- /tax-return links 12 guides (GUIDES array `src/app/(site)/tax-return/page.tsx` 290 to 330 plus inline links). Missing:
  tax-back-australia-working-holiday (Copilot refund page), what-is-a-tax-refund-australia (354 impr), amending-tax-
  return-australia, tax-obligations-after-leaving-australia (1,219 impr), cash-in-hand, tax-return-without-tfn.
- /superannuation links 10 (GUIDES 243 to 252). Missing: super-for-casual-and-part-time-workers (979 impr @23.8),
  how-much-super-should-employer-pay, how-to-check-super-balance-working-holiday, what-is-superannuation-guarantee-charge.
- /ja/tax-return links 9; no link to tax-back, how-long-does-tax-refund-take (JA 1,317 impr @6.29), amending (JA 379
  impr, 36 clicks, the best JA tax guide by CTR). /it/tax-return 7, /es/tax-return 8, /it/superannuation and
  /es/superannuation 8 each (no super-employer-not-paying, although /ja version of that guide has 19 clicks).
- SVT home (/, /zh, /vi) links 0 guides (only service pages). SVT /superannuation related list
  (`src/lib/svt/content/services-en.ts` 267 to 277) has 7 guides incl. the TRS page, but not dasp-rejected-
  international-students, employer-not-paying-super, dasp-or-leave-super-international-students.
Every WHT spoke already links its hub in the body (1 to 3 times; script `clus.py`), so the gap is hub to spoke and
spoke to spoke, not spoke to hub.

### F3 (fact) Starved spokes: in-body links from other guides (body / related cards), same language
| guide (GSC EN impr, pos) | en | de | ja | fr | it | es |
|---|---|---|---|---|---|---|
| dasp-rejected-what-to-do (963, 5.8, 26 clicks) | 0/3 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| how-long-does-dasp-take (1,905, 6.4) | 0/2 | 0/2 | 2/2 | 0/2 | 0/2 | 0/2 |
| dasp-vs-leaving-super-in-australia-pros-cons (1,348, 23.8) | 0/2 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 |
| super-for-casual-and-part-time-workers (979, 23.8) | 0/2 | 0/1 | 0/1 | 0/1 | 0/1 | 0/1 |
| what-happens-to-unclaimed-super (146, 15.7) | 0/2 | 0/3 | 1/3 | 1/3 | 0/3 | 1/3 |
| dasp-documents-required (149, 8.3) | 0/2 | 2/3 | 2/3 | 0/3 | 0/3 | 0/3 |
| tax-back-australia-working-holiday (frozen opening) | 0/2 | 0/3 | 0/3 | 0/3 | 0/3 | 0/3 |
| what-is-a-tax-refund-australia (354, 10.1) | 0/2 | 0/1 | 2/1 | 0/1 | 0/1 | 0/1 |
| average-tax-refund-working-holiday | 0/2 | 0/3 | 0/3 | 0/3 | 0/3 | 0/3 |
| multiple-jobs-tax-return-working-holiday | 0/8 | 0/2 | 0/2 | 0/2 | 0/2 | 0/2 |
| tax-return-without-tfn-australia | 0/2 | 0/2 | 0/2 | 0/2 | 0/2 | 1/2 |
For comparison late-tax-return-penalty gets 8 body links and 41 related cards in every language, super-employer-not-
paying 13 body links: the equity sits on two problem pages, while the super problem page with the most clicks
(dasp-rejected) gets none in any language.

### F4 (fact) FR, IT, ES: two tax return pages per language, and the anchors overlap
- The hreflang cluster of /tax-return points fr/it/es to the twins (/fr/tax-return, /it/tax-return, /es/tax-return).
  The flagships (/fr/tax-return-australie-pvt, /it/dichiarazione-redditi-australia, /es/devolucion-impuestos-australia)
  have a self canonical and no hreflang. That is correct: no other language has an equivalent page.
- Roles in the code: the twin is the service page (FR metadata comment "requête transactionnelle"), the flagship is the
  complete guide (footer "Le guide complet..."). The two link each other (twin to flagship 2 to 4 links, back 2).
- Anchor conflict FR: the same anchor "tax return en PVT" points 28 times to the twin and 17 times to the flagship
  (`grep` in `src/app/(fr)/fr/blog/chunks`). IT: the sitewide nav and footer label "Dichiarazione dei redditi"
  (`Nav.tsx` 103, 201; `Footer.tsx` 74) points to the twin, while the flagship slug and title target exactly
  "dichiarazione dei redditi Australia"; 5 body anchors "tax return" point to the flagship. ES is clean (twin: "tax
  return...", flagship: "devolución de impuestos...").
- GSC (Pages.csv): FR flagship 23 impr @8.1, FR twin no row; ES twin 14 @29.0, ES flagship no row; IT neither. Titles of
  both FR pages contain "déclaration" (twin "Déclaration d'impôts en Australie pour PVT", flagship "Tax return
  Australie PVT : déclaration et remboursement"); titles are frozen to 7 Dec.

### F5 (fact) hreflang and breadcrumbs today
- Money pages: en-AU, de, ja, fr, it, es, x-default on all six language versions, reciprocal, canonical self.
  Asymmetry: /tax-return, /superannuation and /de/superannuation also declare `en`; the others do not. Harmless, but
  inconsistent (fix in P3). Guides: same 7-value set, reciprocal. SVT: en-AU, zh-Hans, vi, x-default, reciprocal.
- Breadcrumbs: every WHT money page renders a visible crumb and BreadcrumbList "Home > page" in its language. Guides:
  "Home > Blog > Category > title" (`(site)/blog/[slug]/page.tsx` 668 to 678 and 795 to 800; `LocaleGuidePage.tsx` 677
  and its crumbs). The money page is never in a guide's breadcrumb. SVT /superannuation has BreadcrumbList JSON-LD but no
  visible crumb.
- Category hubs open with a money link (EN "Lodge your tax return →", "How to claim superannuation after leaving
  Australia"); FR tax return category links the flagship only.

### F6 (fact) Nav still puts TFN and ABN before Tax return and Super in every language (`Nav.tsx` 34 to 40, 88 to 130)
and describes the tax return as "Lodge your annual return" / "Jahressteuererklärung einreichen" / "年次タックスリターンを
提出" / "Déposez votre déclaration annuelle" / "Presenta la dichiarazione annuale" / "Presenta tu declaración anual".
p3 L6 proposed the fix; not done in phase 1.

### F7 (inference) Cannibalisation, refund and super queries (query rows from Queries.csv, pages from Pages.csv)
| query group (impr, position) | competing URLs (impr, avg pos) | owner | why |
|---|---|---|---|
| claim superannuation, superannuation claim, claim superannuation australia, 417 visa super claim, superannuation working holiday (visa) (about 3,000 impr, pos 20 to 50) | /superannuation (9,457 @16.7); /blog/category/super (146 @30.7); /blog/how-to-find-lost-superannuation (875 @36.3); 301'd guides still listed (how-to-apply-for-super-back, what-is-dasp-super-withdrawal, best-way-to-claim..., can-you-withdraw...) | /superannuation | the Aug merge already chose it; category page is the remaining rival |
| super tax working holiday maker (311 @16.5), why is dasp tax so high, dasp tax rate, ato dasp ... 65% | dasp-tax-rate-65-percent-explained (867 @10.2); tax-on-super-withdrawal-backpacker (690 @8.9) | dasp-tax-rate-65-percent-explained | rate intent; tax-on-super keeps "what is left after 65%" |
| dasp (288 @7.4), ato dasp, dasp australia, how long does dasp payment take (90 @6.8) | how-long-does-dasp-take (1,905 @6.4, anchor fragments 75 to 78 each); /superannuation | /superannuation for "dasp", "ato dasp"; how-long for timing | |
| find lost super, search for lost super, lost superannuation australia, ato lost super search, unclaimed super (about 400 impr, pos 7 to 77) | how-to-find-lost-superannuation (875 @36.3); what-happens-to-unclaimed-super (146 @15.7); how-to-check-super-balance (177 @30.3); super-multiple-funds (126 @33.2) | how-to-find-lost-superannuation for "lost/find"; unclaimed-super for "unclaimed" | positions 7 to 9 on some rows fit unclaimed-super better than the owner (@36) |
| do casuals get super and 10 variants (about 900 impr, pos 21 to 33) | super-for-casual-and-part-time-workers (979 @23.8); how-much-super-should-employer-pay (15) | super-for-casual | it has 0 body in-links (F3) |
| working holiday (visa) tax return / refund, tax return whv, backpacker tax return (about 450 impr, pos 11 to 30) | / (3,766 @11.3, title "...WHV Tax Return & Refund"); /tax-return (760 @30.2); /blog/category/tax-return (342 @10.9, "Backpacker tax return guides"); how-to-lodge-tax-return-working-holiday (70 @23.7) | /tax-return | home likely holds these (a02 R2); category page holds "backpacker tax return" |
| late tax return, lodge late, overdue tax return(s), penalty (about 300 impr, pos 15 to 31) | late-tax-return-penalty (672 @14.5); tax-return-deadline-31-october (44 @20.3); past-years (no row) | late-tax-return-penalty for "penalty/late"; past-years for "overdue/lodge late" | past-years gets only 2 body links |
| how long tax refund, tax refund time (about 60 @15 to 50) | how-long-does-tax-refund-take (2,756 @13.0); what-is-a-tax-refund (354 @10.1) | how-long | |
| JA タックスリターン 税理士/代行/費用/おすすめ/安い (about 550 impr, pos 2.4 to 7.9) | /ja (749 @7.6); /ja/tax-return (27 @24.9) | /ja/tax-return (title has 代行) | /ja ranks, the service page does not; never say 税理士 for us |
| JA タックスリターン いつまで / 期限 (about 370 impr, pos 4.6 to 7.7) | /ja/blog/how-long-does-tax-refund-take-australia (1,317 @6.3); /ja; deadline guide (1 impr) | /ja/blog/tax-return-deadline-31-october-working-holiday (title "...はいつまで？") | owner gets almost nothing |
| JA スーパーアニュエーション 返金 (やり方, 方法), dasp 申請 (about 200 @5.9 to 10.4) | /ja/superannuation (2,303 @7.5); /ja/blog/how-long-does-dasp-take (84 @3.8) | /ja/superannuation | working; keep |
| DE superannuation (australien) zurück (bekommen) (86 @4.6 to 13.2) | /de/superannuation (1,097 @7.5); /de/blog/how-to-apply-for-super-back (65 @8.1, 301'd) | /de/superannuation | working |
| SVT DASP docs and timing | /blog/dasp-documents-and-timing (279 @51.2, title "How to apply for DASP online: step by step"); dasp-documents-checklist (106 @50.8); /superannuation (212 @84.7); how-long-does-dasp-take-international-students (6) | /superannuation for "how to apply/claim"; checklist for documents; how-long for timing | the short post's title is a /superannuation title |
| SVT tax on DASP (148 @91) | dasp-tax-rate-international-students (17 @5.8); tax-on-super-withdrawal-international-students (48 @11.3) | dasp-tax-rate | LONG_ALSO already routes them; keep |

### F8 (fact) The new guides proposed by the other agents overlap each other (grep of S/plan3/r*.md)
| intent | slugs proposed | by |
|---|---|---|
| myGov SMS code abroad | mygov-sms-code-not-received-overseas / mygov-sms-code-overseas / mygov-sms-code-old-australian-number | r04 r06 r07 r11 / r15 / r05 |
| locked out | mygov-account-locked-out / mygov-account-locked | r06 r11 / r05 |
| myID passport | myid-foreign-passport-working-holiday / -link-ato / -australia / myid-foreign-passport | r07 r11 / r04 / r06 / r05 |
| tax return without myGov | tax-return-without-mygov / mygov-access-problems-working-holiday / no-mygov-access-tax-return | r01 r05 r11 / r03 / r07 |
| super without myGov | claim-super-without-mygov / claim-super-without-mygov-dasp / dasp-without-mygov | r02 r07 r09 r13 / r11 / r04 |
| DASP online problems | dasp-online-application-problems / dasp-online-application-step-by-step | r02 r06 r10 r13 r15 / r03 |
| refund, AU account closed or missing | tax-refund-closed-australian-bank-account / tax-refund-closed-bank-account / tax-refund-australian-bank-account-closed / closed-australian-bank-account-tax-refund / tax-refund-without-australian-bank-account | r12 / r15 / r01 / r03 / r20 |
| SVT myGov | mygov-sms-code-overseas-international-students / mygov-code-not-received-... / mygov-sign-in-problems-... / mygov-sign-in-after-leaving-australia-students; cant-link-ato-mygov-international-students / link-mygov-to-ato-problems-... / link-ato-to-mygov-problems-... / cant-link-mygov-to-ato-... | r11 / r09 / r10 / r08 |
Also: FR flagship already says "pas de compte myGov" and the /de/tax-return title is "Steuererklärung Australien für
Work and Travel, ohne myGov": a DE guide "Steuererklärung ohne myGov" would compete with the DE money page. WHT FR/IT/ES
guides need an EN twin with the same slug or they 404 (r05 F6), so one slug per intent across all six languages.

## 2. Proposals

### P1-1 One slug per intent (the registry). Apply before anyone writes a guide. Effort S.
WHT (same slug in en, de, ja, fr, it, es; category in brackets; hub = the money page it hangs from):
| slug | intent owned | hub | parent guide (links up) |
|---|---|---|---|
| mygov-problems-tax-return-super | "myGov not working" overview (r11 H) | /tax-return and /superannuation | none (it is the problem hub) |
| mygov-sms-code-not-received-overseas | no SMS code, old AU number | /tax-return | mygov-problems-tax-return-super |
| mygov-account-locked-out | locked out, password | /tax-return | mygov-problems-tax-return-super |
| cant-link-ato-to-mygov | ATO will not link | /tax-return | mygov-problems-tax-return-super |
| myid-foreign-passport-working-holiday | myID with a foreign passport | /tax-return | mygov-problems-tax-return-super |
| tax-return-without-mygov (EN, JA, FR, IT, ES; NOT DE, see 3) | getting the return done without myGov | /tax-return | mygov-problems-tax-return-super |
| claim-super-without-mygov (Super) | DASP without myGov | /superannuation | mygov-problems-tax-return-super |
| dasp-online-application-problems (Super) | errors in the DASP online form | /superannuation | dasp-rejected-what-to-do |
| tax-refund-closed-australian-bank-account | refund with closed or no AU account (r12 scope plus r20 "no account") | /tax-return | how-long-does-tax-refund-take-australia |
| ato-tax-return-status-meaning, tax-refund-less-than-expected-offset, ato-letter-asking-for-information-tax-return, notice-of-assessment-working-holiday (r12) | refund problems | /tax-return | how-long-does-tax-refund-take-australia |
| r13 visa-still-active-cant-claim-super, certify-documents-overseas-super-claim | DASP blockers | /superannuation | dasp-rejected-what-to-do (visa), dasp-documents-required (certify) |
SVT (en, zh, vi): the r11 table 2.5 names (mygov-problems-international-students, mygov-sms-code-overseas-international-
students, cant-link-ato-mygov-international-students, myid-foreign-passport-international-students, tax-return-without-
mygov-international-students, claim-super-without-mygov-international-students) plus dasp-online-application-problems-
international-students and tax-refund-closed-australian-bank-account-international-students. Drop every other variant
in F8. Check each against `S/plan3/r20/*.txt` and the SVT blog list before writing (done for the names above: none exist).

### P1-2 The hub and spoke model (all languages, both sites)
```
Home - money hub ----------- supporting guides ------- problem guides
       /tax-return (fr/it/es: flagship owns head term, twin = service)
         | how-long-does-tax-refund-take - tax-refund-closed-australian-bank-account, ato-tax-return-status-meaning,
         |                                  tax-refund-less-than-expected-offset, ato-letter..., notice-of-assessment
         | tax-back, what-is-a-tax-refund, average-tax-refund, multiple-jobs, tax-return-without-tfn, diy-vs-agent
         | deadlines: tax-return-deadline-31-october - late-tax-return-penalty, past-years, amending
         | leaving: tax-obligations-after-leaving - how-to-lodge-from-overseas, early-tax-return-leaving
         ` mygov-problems-tax-return-super - sms-code, locked-out, cant-link, myid, tax-return-without-mygov
       /superannuation
         | how-long-does-dasp-take, dasp-documents-required - certify-documents-overseas-super-claim
         | dasp-tax-rate-65 (owner of "DASP tax") - tax-on-super-withdrawal (net amount only)
         | how-to-find-lost-superannuation - what-happens-to-unclaimed-super, super-multiple-funds, check-balance
         | super-for-casual - how-much-super-should-employer-pay - super-employer-not-paying, SGC
         ` dasp-rejected-what-to-do - dasp-online-application-problems, visa-still-active, claim-super-without-mygov
```
Rules: (a) every spoke links its hub once in body (already true) and its parent once; (b) each hub links every
supporting guide and the problem hub in a server-rendered list; (c) problem guides link their parent and 1 to 2 siblings;
(d) the two hubs link each other (already true); (e) at most 8 body links per guide, none in paragraph 1 of the 12 frozen
pages, none in the first paragraph under an H2; (f) one anchor phrase family per target (P1-5).
SVT: home = tax return hub, /superannuation = super hub; bodies cannot hold links, so (a) to (c) go through `related`
(`blog-en.ts`, `long/en/links.ts` LONG_ALSO) and the home/hub lists.

### P1-3 Hub to spoke additions (exact)
EN `src/app/(site)/tax-return/page.tsx`, GUIDES (290 to 330), append:
- `{ href: '/blog/tax-back-australia-working-holiday', title: 'Getting your tax back, step by step', desc: 'From your last payslip to the refund in your account.' }`
- `{ href: '/blog/amending-tax-return-australia', title: 'Fixing a return already lodged', desc: 'When an amendment is worth it, and how long it can wait.' }`
- `{ href: '/blog/tax-obligations-after-leaving-australia', title: 'What is still owed after you leave', desc: 'The return, your super and the bank account, in order.' }`
- after the new guides exist: `{ href: '/blog/mygov-problems-tax-return-super', title: 'myGov not working?', desc: 'Locked out, no SMS code abroad, or the ATO will not link.' }`
EN `src/app/(site)/superannuation/page.tsx`, GUIDES (243 to 252), append:
`{ href: '/blog/super-for-casual-and-part-time-workers', label: 'Super on casual and part time jobs' }`,
`{ href: '/blog/how-to-check-super-balance-working-holiday', label: 'Checking your balance before you claim' }`,
later `{ href: '/blog/claim-super-without-mygov', label: 'Claiming your super without myGov' }`.
Same three tax and two super additions in the other languages (GUIDES arrays: `de/tax-return` 286 to 311,
`de/superannuation` 256 to 263, `ja/tax-return` 247 to 267, `ja/superannuation` 244 to 252, `fr/tax-return-australie-pvt`
246 to 273, `fr/superannuation` 26 to 30, `it/dichiarazione-redditi-australia` near 266, `it/superannuation` near 239,
`es/devolucion-impuestos-australia` near 314, `es/superannuation` near 306; on fr/it/es add to the flagship, not the twin):
| target | de | ja | fr | it | es |
|---|---|---|---|---|---|
| tax-back | Steuern zurückholen, Schritt für Schritt | 払いすぎた税金を取り戻す手順 | Récupérer ses impôts, étape par étape | Riavere le tasse, passo per passo | Recuperar tus impuestos, paso a paso |
| amending | Eine eingereichte Erklärung korrigieren | 提出済みタックスリターンの修正 | Corriger une tax return déjà déposée | Correggere una tax return già presentata | Corregir un tax return ya presentado |
| tax-obligations-after-leaving | Was nach der Abreise noch offen ist | 出国後に残る手続き | Ce qui reste à faire après le départ | Cosa resta da fare dopo la partenza | Lo que queda pendiente después de irte |
| super-for-casual | Super bei Casual- und Teilzeitjobs | カジュアル・パートタイムのスーパー | La super pour les jobs casual et à temps partiel | La super nei lavori casual e part time | La super en trabajos casual y de medio tiempo |
| check-super-balance | Guthaben prüfen, bevor du beantragst | 請求前にスーパー残高を確認する | Vérifier son solde avant la demande | Controllare il saldo prima della richiesta | Revisar tu saldo antes de reclamar |
JA also: add how-long-does-tax-refund-take-australia to `ja/tax-return` GUIDES ("還付金はいつ届く？") and the deadline
guide to the JA home (P1-6). SVT: `services-en.ts` 267 to 277 related of /superannuation, insert after 'home':
'blog/dasp-rejected-international-students', 'blog/dasp-or-leave-super-international-students',
'blog/employer-not-paying-super' (same lists in services-zh.ts / services-vi.ts if they carry their own).
SVT home `home-en.ts` answer.items (29 to 33), add two items (and the zh/vi equivalents in home-zh.ts, home-vi.ts):
`{ q: 'Refund late or smaller than expected?', a: 'Most delays have a known cause, and the ATO shows where your return is.', href: '/blog/tax-refund-delays-international-students' }`,
`{ q: 'Made a mistake on your return?', a: 'A lodged return can be amended, within time limits set by the ATO.', href: '/blog/amend-tax-return' }`.
zh: `{ q: '退税晚到或比预期少？', a: '多数延误都有常见原因，ATO 会显示你的报税处理到哪一步。', href: ... }`,
`{ q: '报税填错了？', a: '已提交的报税可以修改，但要在 ATO 规定的期限内。', href: ... }`.
vi: `{ q: 'Tiền hoàn thuế về chậm hoặc ít hơn dự kiến?', a: 'Phần lớn trường hợp chậm đều có nguyên nhân quen thuộc, và ATO cho bạn xem hồ sơ đang ở bước nào.', href: ... }`,
`{ q: 'Khai sai trên tờ khai thuế?', a: 'Hồ sơ đã nộp vẫn sửa được, trong thời hạn ATO quy định.', href: ... }`.
Facts (URLs as verified in r12, not re-fetched here: web budget used up): amendment time limits
https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments; progress
and status https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/status-of-your-tax-return.
DASP facts used in P1-4/P1-5 (28 days, certified copies, 6 month transfer) are on the ATO DASP page, fetched 24 Nov:
https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp Effect (estimate): hubs pass equity to the 5 to 6 spokes that rank 10 to 37 on head
problem queries. Measure: GSC Pages for each added target, 28 days after deploy.

### P1-4 Spoke to spoke: wrap existing words (no new text), every language
Wrap the quoted words as a link to the target; the path is `/blog/<slug>` in EN and FR/IT/ES chunks (localised by
`localizeBodyLinks`), `/de/blog/<slug>` and `/ja/blog/<slug>` in DE/JA data.ts. Lines from `phr.py` on base20.
| target | source guide: file:line, words to wrap |
|---|---|
| how-long-does-dasp-take | super-for-casual: EN data.ts 3810 "within 28 days"; DE de/blog/data.ts 4298 "binnen 28 Tagen"; JA ja/blog/data.ts 4912 "通常28日以内に支払う"; FR chunks/08.ts 147 "dans les 28 jours"; IT chunks/08.ts 151 "in circa 28 giorni"; ES chunks/08.ts 146 "dentro de los 28 días" |
| how-long-does-dasp-take | how-to-check-super-balance: EN 5672 "within 28 days"; DE 4360 "die 28 Tage"; FR chunks/11.ts 377 "28 jours"; IT chunks/11.ts 373 "entro 28 giorni"; ES chunks/11.ts 371 "dentro de los 28 días" |
| dasp-documents-required | how-long-does-dasp-take: EN 1871 "certified documents"; JA 4607 "認証済み書類"; IT chunks/04.ts 306 "documenti certificati"; ES chunks/04.ts 306 "documentos certificados"; FR chunks/04.ts 310 "documents certifiés"; DE 2279 "beglaubigten Dokumente" |
| what-happens-to-unclaimed-super | dasp-vs-leaving: EN 8201, DE 7910, IT chunks/16.ts 202 ("unclaimed super" / "super non reclamata"); super-multiple-funds: EN 6595, DE 6670, IT chunks/13.ts 268, ES chunks/13.ts 272; how-to-find-lost-superannuation: JA 4756 "未請求スーパー", FR chunks/05.ts 12, ES chunks/05.ts 12 |
| dasp-vs-leaving-super... | how-to-find-lost-superannuation: JA 4794 "残高をまるごと置いていく" |
| average-tax-refund | what-is-a-tax-refund: EN 3661 "average refund"; DE 1991 "durchschnittliche Erstattung"; JA 3166 "平均還付額"; FR chunks/08.ts 22 "remboursement moyen" |
| multiple-jobs-tax-return | what-is-a-tax-refund: EN 3695 "several employers"; JA 3200 "複数の雇用主"; FR chunks/08.ts 56 "plusieurs employeurs"; ES chunks/08.ts 55 "varios empleadores" (DE skipped: guide already has 7 links) |
| tax-return-without-tfn | what-is-a-tax-refund: EN 3667 "without a TFN"; FR chunks/08.ts 28 "sans TFN"; IT chunks/08.ts 28 "senza TFN"; ES chunks/08.ts 27 "sin TFN" |
| what-is-a-tax-refund | tax-return-deadline-31-october: EN 7889 "tax refund"; DE 3953 "Steuererstattung" (FR/IT/ES deadline guides already have 8 links: skip) |
Before each wrap: count links in that guide body (cap 8) and skip if the paragraph is the first under an H2.

### P1-5 Spoke to spoke: three new link sentences (native text, no new facts beyond the target guide)
(A) to dasp-rejected-what-to-do, appended to the "certified documents" paragraph of how-long-does-dasp-take (lines in P1-4):
- EN: If a claim does come back declined, [why a DASP is rejected and how to fix it](/blog/dasp-rejected-what-to-do) goes through all five causes.
- DE: Kommt ein Antrag trotzdem abgelehnt zurück, zeigt dir [DASP abgelehnt: die Gründe und die Lösung](/de/blog/dasp-rejected-what-to-do), wie du jede der fünf Ursachen behebst.
- JA: それでも却下された場合は、[DASPが却下される5つの理由と対処法](/ja/blog/dasp-rejected-what-to-do)で原因を確認できます。
- FR: Si une demande revient malgré tout refusée, [les cinq causes d'un DASP refusé et leurs solutions](/blog/dasp-rejected-what-to-do) vous disent quoi corriger.
- IT: Se una richiesta viene comunque respinta, [i cinque motivi per cui un DASP viene respinto](/blog/dasp-rejected-what-to-do) ti dicono cosa correggere.
- ES: Si aun así te rechazan la solicitud, en [por qué se rechaza un DASP y cómo arreglarlo](/blog/dasp-rejected-what-to-do) tienes las cinco causas y qué hacer con cada una.
(B) to dasp-vs-leaving-super-in-australia-pros-cons, appended to the last paragraph of dasp-tax-rate-65-percent-explained
(EN data.ts 6549, DE 6626, JA 5113, FR chunks/13.ts 230, IT chunks/13.ts 226, ES chunks/13.ts 230):
- EN: Whether to claim now or wait is weighed up in [leave super in Australia or take a DASP](/blog/dasp-vs-leaving-super-in-australia-pros-cons).
- DE: Ob du jetzt beantragst oder wartest, wägt [Super in Australien lassen oder DASP beantragen](/de/blog/dasp-vs-leaving-super-in-australia-pros-cons) ab.
- JA: 今すぐ請求するか置いておくかは、[スーパーを残すかDASPで受け取るか](/ja/blog/dasp-vs-leaving-super-in-australia-pros-cons)で比べています。
- FR: Réclamer tout de suite ou attendre : la comparaison est dans [laisser sa super en Australie ou demander le DASP](/blog/dasp-vs-leaving-super-in-australia-pros-cons).
- IT: Se conviene chiedere subito o aspettare lo trovi in [lasciare la super in Australia o chiedere il DASP](/blog/dasp-vs-leaving-super-in-australia-pros-cons).
- ES: Si te conviene reclamar ya o esperar lo comparamos en [dejar la super en Australia o pedir el DASP](/blog/dasp-vs-leaving-super-in-australia-pros-cons).
(C) to tax-back-australia-working-holiday, appended to the last paragraph of how-long-does-tax-refund-take-australia
(EN 3755, DE 2080, JA 3264, FR chunks/08.ts 110, IT chunks/08.ts 114, ES chunks/08.ts 109):
- EN: The whole route, from your last payslip to the money arriving, is in [how to get your tax back on a working holiday](/blog/tax-back-australia-working-holiday).
- DE: Den ganzen Weg von der letzten Lohnabrechnung bis zur Gutschrift findest du in [so holst du dir deine Steuern zurück](/de/blog/tax-back-australia-working-holiday).
- JA: 最後の給与明細から入金までの流れは、[ワーホリで払いすぎた税金を取り戻す方法](/ja/blog/tax-back-australia-working-holiday)にまとめています。
- FR: Tout le parcours, de la dernière fiche de paie au virement, est dans [récupérer ses impôts en PVT](/blog/tax-back-australia-working-holiday).
- IT: Tutto il percorso, dall'ultima busta paga ai soldi sul conto, è in [come riavere le tasse con il working holiday](/blog/tax-back-australia-working-holiday).
- ES: Todo el camino, desde tu último payslip hasta el dinero en tu cuenta, está en [cómo recuperar tus impuestos con la working holiday](/blog/tax-back-australia-working-holiday).
Note: r12 P1-A/P1-B change how-long-does-tax-refund-take (12 to 10 business days, closed account paragraph); apply
(C) after those edits and re-read the file.

### P1-6 Owner fixes for the cannibal groups in F7 (links only; titles stay frozen)
- JA 代行/税理士 group: on the JA home (`src/app/(ja)/ja/page.tsx`) put one contextual link in the first text block
  after the hero: anchor "オーストラリアのタックスリターン代行" to /ja/tax-return (today only a card and "タックスリターン代行").
  Never "税理士" in our own copy; the sign-off is "登録タックスエージェントが確認・承認".
- JA いつまで group: link the deadline guide with anchor "タックスリターンはいつまで" from the JA home (first text block) and from
  /ja/blog/how-long-does-tax-refund-take-australia (it ranks @6.3 for the same people; one link in its body, not
  paragraph 1). Effect: lets Google see the owner; today the owner has 1 impression.
- EN super anchors: rotate the anchor of in-body links to /superannuation away from bare "super"/"superannuation"
  (26 links) toward "claim your superannuation", "superannuation on a working holiday visa", "DASP claim". Change only
  where the sentence still reads naturally; list from `grep -n "\[super\](/superannuation)\|\[superannuation\](/superannuation)" src/app/(site)/blog/data.ts`.
  Same in DE ("Superannuation zurückholen"), FR ("récupérer sa super"), IT ("rimborso della super"), ES ("reclamar tu super").
- DASP tax pair: every in-body anchor that says "65%" or "DASP tax" points to dasp-tax-rate-65-percent-explained; the
  one link to tax-on-super-withdrawal-backpacker keeps a net-amount anchor ("what is left after the 65%"). No merge now.
- FR anchor split: change the 28 links `[tax return en PVT](/tax-return)` in `src/app/(fr)/fr/blog/chunks/*.ts` to
  point to `/fr/tax-return-australie-pvt` (same words; the head term belongs to the flagship, which has the only FR
  impressions). The twin keeps "tax return" (80) and the nav. IT: change the 5 `[tax return](/it/dichiarazione-redditi-australia)`
  to `/tax-return`, and the IT nav/footer label of /it/tax-return from "Dichiarazione dei redditi" / "Dichiarazione" to
  "Tax return" (`Nav.tsx` 103 and 201, `Footer.tsx` 74; fits the bar like FR). ES: no change.
- SVT: /blog/dasp-documents-and-timing (short post, `blog-en.ts` around 672) keeps its frozen title, but its related list
  already starts with 'superannuation'; add 'blog/dasp-online-application-problems-international-students' when that
  exists, and do not create any SVT "how to apply for DASP" page.

### P1-7 Breadcrumbs through the money hub (EN, DE, JA, FR, IT, ES guides in categories Tax Return and Super)
Visible crumb and BreadcrumbList become: Home > [money hub] > [category] > title, replacing "Blog" at position 2 only
for those two categories. Hub label and URL: EN "Tax return" /tax-return, "Super withdrawal" /superannuation; DE
"Steuererklärung", "Super-Auszahlung (DASP)"; JA "タックスリターン", "スーパー受取"; FR "Tax return Australie PVT"
/fr/tax-return-australie-pvt, "Récupérer sa super"; IT "Dichiarazione dei redditi" /it/dichiarazione-redditi-australia,
"Rimborso della super"; ES "Devolución de impuestos" /es/devolucion-impuestos-australia, "Retiro de la super".
Files: `src/app/(site)/blog/[slug]/page.tsx` 668 to 678 (LD) and 795 to 800 (crumbs), `StickyBreadcrumbs.tsx`,
`src/components/blog/LocaleGuidePage.tsx` 677 onward and its crumbs prop (DE/JA/FR/IT/ES configs). New problem guides
inherit it. SVT: add a visible crumb to /superannuation matching its JSON-LD (`(svt)/svt-site/[slug]/page.tsx`).
Effect (inference): every refund and super guide sends a crumb link to its hub; the SERP path shows the service. Risk:
Category pages lose position 2 links; they keep nav, related and category links.

### P2-1 Nav and footer (all languages): order Tax return, Super, TFN, ABN, Medicare (`Nav.tsx` 34 to 40 and the
locale arrays 88 to 130; Footer same). Descriptions: EN "Reviewed and signed off by a registered tax agent"; DE "Von
einem registrierten Tax Agent geprüft und freigegeben"; JA "登録タックスエージェントが確認・承認"; FR "Validée par un agent
fiscal enregistré"; IT "Rivista e approvata da un agente fiscale registrato"; ES "Revisado y aprobado por un agente
fiscal registrado" (wordings already on the money pages). Super: EN "Claim your super after you leave", others keep.
Category hub button EN "Lodge your tax return →" to "How your tax return is done →".

### P2-2 Problem hub placement once the new guides exist
- Each money page gets an H2 block "Problems we sort out" (EN) / "Probleme, die wir lösen" / "よくあるトラブル" /
  "Les blocages fréquents" / "I problemi più comuni" / "Problemas frecuentes" with 4 to 6 links: the myGov problem
  hub, the closed bank account guide, late or past years, amending (tax hub); claim-super-without-mygov,
  dasp-rejected, dasp-online-application-problems, super-employer-not-paying (super hub). Below existing H2s; no
  existing H2 changed.
- Problem guides close with the approved CTA (r11 2.1 wording) and one link to the hub with a hub anchor from the
  family in P1-6.
- SVT: new myGov guides get related ['home', 'superannuation' (super ones), 'blog/lodge-from-overseas',
  'past-years'] and an entry in LONG_ALSO pairing the hub with each child.

### P3
- hreflang consistency: drop the extra `en` key on /tax-return, /superannuation, /de/superannuation (or add it everywhere).
- December decisions (after the 7 Dec measurement): retitle the FR and IT twins to service intent ("...avec nous",
  "...dall'Italia") so only the flagship targets the head term; DASP tax pair merge; noindex /blog/category/super if it
  still ranks @30 for super head terms.

## 3. What not to do
- Do not publish a DE guide on "Steuererklärung ohne myGov": /de/tax-return already targets "ohne myGov" in its title;
  put that answer into the DE myGov problem guides as a link to /de/tax-return. Same caution for FR (flagship hero "pas
  de compte myGov"): the FR tax-return-without-mygov guide must be problem-led, and link the flagship.
- Do not create dasp-online-application-step-by-step (r03): "how to claim / step by step" is the /superannuation H1
  intent in every language, and the Aug 2026 merge folded five guides into /superannuation for exactly this (`next.config.js` 286 to 310).
- Do not add r13 visa-still-active-cant-claim-super as a standalone if it repeats reason 1 of dasp-rejected-what-to-do:
  either expand dasp-rejected (below the opening) or give the new page a narrower query and link up to dasp-rejected.
- Do not let two agents ship different slugs for one intent (F8); FR/IT/ES guides without the EN twin 404.
- Do not point fr/it/es hreflang at the flagships now (no equivalent page in other languages; would also strip the
  twin of the cluster it earns with), and do not 301 or canonicalise twin to flagship (rule: no redirects, no deletes).
- Do not add links to paragraph 1 of the frozen pages (tax-back-australia-working-holiday, how-to-update-address-with-
  ato, how-to-find-lost-tfn are spokes here) or exceed 8 body links per guide.
- Do not build an SVT /tax-return page (a13 R5): the home owns that intent.
- No WHT link to SVT or back; no "we lodge" in anchors (anchors like "lodge your tax return" are instructions, but use
  the hub families above instead).
