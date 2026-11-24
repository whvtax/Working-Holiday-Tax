# Title and description proposals for the December decision (from plan 3 research r18, 24 Nov 2026)
Apply only after the December GSC measurement; compare against docs/SEO_PLAN_STATE.md baselines.

## 3. Title and description proposals for the December decision (NOT to apply now; frozen until the measurement)
GSC = 3 month page export to 21 Nov (wht/Pages.csv, svt/Pages.csv); trend = wht-1021 -> wht-1105 -> wht.
| Page | Current | GSC behind it | Proposal | Verdict |
|---|---|---|---|---|
| /superannuation | T "Claim superannuation on a working holiday visa (DASP 2026)" | 9,457 impr, 41 clicks, 0.43%, pos 22.0 -> 19.9 -> 16.65; "super tax working holiday maker" 311 at 16.5, "417 visa super claim" 287 at 25.4; generic "claim superannuation" 348 at 38.4 | none | Ranking problem, title already holds the WHM terms. Revisit only if position is under 10 |
| /tax-return | D "...Any refund usually lands about 14 business days after lodgement." | 760 impr, 7 clicks, pos 31.9 -> 30.15 | D (154): "Tax return and refund for 417 and 462 visas: no payslips, no myGov, works from overseas. The ATO says most online returns process within 10 business days." | Only if Jo cannot source "14 business days"; ATO how-to-lodge says 10 |
| /de/superannuation | T "Superannuation aus Australien zurückholen (DASP)" | 1,097 impr, 20 clicks, 1.82%, pos 6.03 -> 5.96 -> 7.47; "superannuation australien zurück bekommen" 34 at 4.59, 0 clicks; "superannuation zurück" 35 at 13.17 | T (57): "Superannuation aus Australien zurückbekommen: DASP-Antrag" | Test: matches the typed verb at position 4.6 with 0 clicks |
| /de/tax-return | T "Steuererklärung Australien für Work and Travel, ohne myGov" | 170 impr, 2.35%, 6.94; crawled not indexed 16 Nov | none | Fix indexing first (P1-2) |
| /ja/superannuation | T "スーパーアニュエーション返金のやり方｜帰国後DASPで日本から申請" | 2,303 impr, 66 clicks, 2.87%, 7.46; "スーパー アニュ エーション 返金 5,000ドル以上" 34 at 5.88 (already in D) | none | Working, keep |
| /ja/tax-return | T "オーストラリアのタックスリターン代行｜ワーホリ・帰国後も" | 27 impr, pos 24.89; JA tax return queries ("…税理士" 136 at 7.12, "…いつまで" 129 at 7.73) land on other pages | none | Never add 税理士 for us; deadline intent goes to P2-1 table |
| /it/tax-return | T (61) "Tax return dall’Italia dopo il working holiday: come funziona", D 166 | no impressions | T (58) "Tax return dall’Italia dopo il working holiday: come si fa"; D (153) "Servono passaporto e conto bancario australiano, niente buste paga. Leggiamo il tuo record ATO e prepariamo la tax return, che firmi tu prima dell’invio." | Length fix only (title over 60, description over 160) |
| /fr/superannuation | D 168 | 15 impr, pos 7 | D (155) "Parti d’Australie avec un visa 417 ou 462 ? Réclamez votre super via le DASP, en ligne depuis la France : conditions, retenue de 65 %, documents, 28 jours." | Length fix only |
| /es/superannuation, /it/superannuation | unchanged | 74 impr 0 clicks at 6.07; 95 impr 1 click at 9.29 | none yet | Baseline too young (pages new about 3 Nov, a04 R9): judge in January |
| SVT / | T (74) "International student tax return in Australia from $220 \| Student Visa Tax", D 165 | 28 impr, 7 clicks, pos 34.54 (+10 impr on http://) | T (60) "Student tax return in Australia from $220 \| Student Visa Tax"; D (158) "Tax returns for 500 and 485 visas: $220, or $385 with ABN work, incl. GST. Reviewed and signed off by a registered tax agent before it is lodged with the ATO." | Length fix; same prices, no new ones |
| SVT /how-it-works | D 164 | 10 impr, 1 click, 5.8 | D (156) "WhatsApp us, pay by bank transfer, fill in a short form and sign online. Reviewed and signed off by a registered tax agent before it is lodged with the ATO." | Length fix |

## 4. What NOT to do
- Do not add FAQPage, HowTo, Speakable or Q&A markup to "win rich results": FAQ results ended 7 May 2026; no snippet
  feature to gain. Keep existing FAQPage (accurate, harmless, used as machine context). Never reintroduce QAPage.
- No LocalBusiness, ProfessionalService or AccountingService (Jo's rule, and AccountingService reads as an accountant
  claim). Organization only, as #business; leave #supervising-agent as Jo decided and never merge it into #business or
  describe WHT/SVT as the agent. No `reviewedBy` naming a person (no named reviewer).
- No aggregateRating or Review markup from Google reviews (self-serving reviews are not eligible; the home rating is
  already null on purpose).
- No Offer/price in any new Service node; SVT prices stay where they are; WHT gets none.
- No myGov problem text only inside the accordion; no JS that scrolls on load or strips `#` (breaks read-more links).
- Do not move FR/IT/ES hreflang before the December data (P2-4); never redirect or delete the twin pages (freeze).
- No WHT link, schema or hreflang to SVT or the reverse; no `sameAs` between the brands.
- Do not change titles/descriptions before the December measurement, including the length fixes in section 3.
- Do not add a new "What is DASP" block to /ja/superannuation; it is the best performing super page.
- Do not use 税理士, 会计/税务师, kế toán, Steuerberater for us in any schema `name`, `serviceType` or `description`
  (current values checked: compliant). JA Service name says タックスリターン; keep it.
- Cannibalisation check for P1-1: problem blocks on the money pages must answer in 2 to 4 sentences and link to the
  full guide (EN blog/dasp-rejected-what-to-do exists; myGov guides proposed elsewhere). Do not copy a guide's opening.
