# impl-fr-it-es (24 Nov 2026)

Owned: src/app/(fr)/**, (it)/**, (es)/**. locale-guide-slugs.ts not touched (no slug change). No titles, descriptions,
H1s or existing H2s changed. No prices, no amounts, no new pages.

## 1. Jo-decision wording fixes (T2): 29
Medicare Entitlement Statement "we handle / ce ne occupiamo / nos encargamos" changed to "we explain how to apply to Services Australia":
- FR: blog/chunks/06.ts (2, medicare guides), blog/data.ts (FAQ), medicare/page.tsx (comparison row `us`, FAQ, Service schema description, "Pas de droit à Medicare" card), page.tsx home FAQ ("certificats d'exemption" to "l'exemption ... dans la déclaration").
- IT: blog/chunks/06.ts (2), 03.ts (checklist), 14.ts, 18.ts, medicare/page.tsx (FAQ, Service schema), page.tsx home FAQ.
- ES: blog/chunks/18.ts (2), 06.ts, 03.ts (2), 14.ts, medicare/page.tsx (FAQ, "error contrario" paragraph), page.tsx home FAQ.
TFN "verified address that holds mail" (no such service): IT chunks/12.ts and ES chunks/12.ts (tfn-australian-address-no-fixed-address) rewritten to the FR wording (we settle the address question with you and follow up with the ATO).
"We lodge" breach: FR home FAQ "Nous déposons votre tax return" changed to "Nous préparons votre tax return australienne, vérifiée et validée par un agent fiscal enregistré avant son dépôt auprès de l'ATO".

## 2. Money pages (T6)
- /es/tax-return: FAQ 5 to 10 (cómo recupero los impuestos; cuánto me van a devolver (no amount, ATO decides); años anteriores; cuenta australiana cerrada; cuánto tarda desde mi país). Facts from the same page and /es/devolucion-impuestos-australia (10/14 business days, 50 days paper, AU account only, DASP abroad). Lede now opens with year, 31 Oct 2026 deadline, late still possible. New section "Si se te pasó el 31 de octubre o nunca presentaste años anteriores" linking past-years and late-penalty guides + ATO failure-to-lodge page. dateModified 2026-11-24.
- /fr/tax-return: lede answer-first sentence (year, 31 Oct 2026, late still possible); new section "Vous avez raté le 31 octobre ou jamais déposé une année précédente ?" (past-years + late guides, ATO FTL link).
- /fr/tax-return-australie-pvt: same late section (before rules). Lede already answer-first.
- /it/tax-return: lede answer-first sentence; late section ("Hai perso il 31 ottobre...").
- /it/dichiarazione-redditi-australia: late section; new H2 "Quante tasse paga chi ha il working holiday in Australia?" for GSC "tasse working holiday" 44@20.5 (rates 15/30/37/45, 45% no TFN, Medicare 2%; source ATO tax-rates-working-holiday-makers, URL confirmed by search).
- /es/devolucion-impuestos-australia: past-years guide link added inside existing deadline section.
- Super: /fr/superannuation FAQ 11 to 13 (compte bancaire français; date limite: none, ATO after 6 months); /it/superannuation 13 to 15 (conto italiano; scadenza); /es/superannuation 13 to 15 (recuperar desde Argentina/Chile/México/España; plazo). Facts from the same pages (international transfer only if fund offers, ATO-held super AU account or cheque, 6 months rule, 65%, 28 days).

## 3. Internal links (T5)
All 144 guides per language already linked /tax-return; flagship pages had few links. Added one contextual paragraph right after the opening (no opening changed) linking the language flagship, in guides that already get GSC impressions:
- FR (/fr/tax-return-australie-pvt, anchors "tax return Australie PVT" and variants): rsa-certificate (181 impr), tax-residency, what-is-a-tax-agent (uses approved reviewer wording), minimum-wage, uber-eats, what-is-payg-payment-summary, employer-not-paying-correctly, how-long-does-it-take-to-get-a-tfn (TFN feeder: 45% weeks examined in the return), can-you-have-tfn-and-abn, farm-work-and-abns. 10.
- IT (/it/dichiarazione-redditi-australia): gross-pay-vs-net-pay (71), tax-free-threshold, abn-invoicing (61), what-is-the-ato, what-is-a-tfn, how-long-does-it-take-to-get-a-tfn, tax-residency, farm-hand-jobs, ato-payment-plan, tax-deductions. 10.
- ES (/es/devolucion-impuestos-australia, anchor "devolución de impuestos en Australia" and variants): minimum-wage (258), how-long-does-it-take-to-get-a-tfn, tax-obligations-after-leaving (69), full-time-part-time-casual (60), rsa-certificate (75), can-you-have-tfn-and-abn, tfn-application-delayed, farm-hand-jobs, tax-residency, ato-tax-debt, penalty-rates. 11.
- Tax-back guides (fr/it/es tax-back-australia-working-holiday): new H2 "how to get your tax back, step by step" right after the opening, 5 numbered ATO steps (30 June, AU bank account, lodge by 31 Oct or late, NOA and about 14 business days, super separate via DASP), then a link to the flagship with the core phrase (FR "tax return Australie PVT", IT "dichiarazione dei redditi in Australia con il working holiday", ES "devolución de impuestos en Australia con visa working holiday"). Coordinator request covered.
- Crawled not indexed: /fr/blog/how-to-read-a-payslip-australia-working-holiday now linked from what-is-payg-payment-summary (20 impr) and penalty-rates-australia (7 impr), plus the existing link in employer-not-paying-correctly (9). /it/blog/category/abn skipped (category page, per brief).
- Super guides: every super/DASP/leaving guide already links /superannuation (checked by script); none added.
Check: no guide links the same target twice (script).

## Verify
tsc: 0 errors. jest __tests__ + src/lib/__tests__ + svt: 7 failed (the known Will + form-start-lang set), all else pass incl. new-locales-sitemap and locale-blog. Dash grep on added lines: none.
