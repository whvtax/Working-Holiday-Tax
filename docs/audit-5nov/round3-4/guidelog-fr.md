# Guide log FR, round 4 (src/app/(fr)/fr/blog/chunks/*.ts only)

Scripts: guides4fr/apply1.py (earlier agent's draft, not yet applied; reviewed, one bridge reworded, run through frlib.py which matches the file's NBSP typography) and guides4fr/apply2.py. Backups: guides4fr/04.ts.bak, guides4fr/bak2/.

## Applied
- 04 what-is-a-tax-agent: new H2 "Qui a le droit de déposer une tax return australienne pour vous ?" (myGov yourself or a TPB-registered tax agent; only registered practitioners may charge; general terms, no "we").
- 04 australian-financial-year-dates: removed the over-withholding claim for part years (WHM flat 15% per pay up to $45,000; real causes: 45% before TFN, second job without declaration, unregistered employer); early return: no further Australian income except interest/dividends/royalties, paper form, 50 business days.
- 04 how-long-does-dasp-take: title/description/lead "28 jours suivant la réception d'une demande complète"; early bridge to /superannuation in "Que doit-il se passer..."; cannot submit before leaving (can start and save); one application per account; ATO-held super 28-day service standard; H2 "après l'approbation" became "une fois versé"; overseas account only if the fund offers it, ATO-held super only to an Australian account or cheque.
- 04 tax-on-super-withdrawal-backpacker: retargeted to intent "après les 65 %" (new title/description/body: not on the tax return, home-country tax, timing incl. Payday Super, receiving account, ATO-held route); links to dasp-tax-rate guide, unclaimed guide and early bridge in "Quand faut-il vraiment déposer la demande ?". No slug change, no redirect. Removed old wrong "1er janvier 2017".
- 04 what-happens-to-unclaimed-super: trigger = 6 months after the later of departure / visa end, twice-yearly transfer; bridge in "Peut-on encore le réclamer une fois transféré ?"; ATO-held payment only Australian account or cheque; myGov Super > Fund details; removed unverified interest sentence and "sans frais".
- 13 dasp-documents-required: $5,000 rule = Home Affairs Certification of Immigration Status on paper applications (fee); certified ID can be asked at any balance; no other active visa; 6-month transfer wording.
- 13 dasp-tax-rate-65-percent-explained: 65% on taxed and untaxed element for WHM; others 35%/45%; mixed history: WHM rate applies to the whole payment; removed "sans rendement"/"perdus"; bridge at end of "Vaut-il quand même..."; link to tax-on-super for the "after" intent; removed "souvent plus importante" refund comparison.
- 13 dasp-rejected-what-to-do: bridge at end of "Quelles sont les cinq causes ?"; ATO-held route fixed (no "plus rapide").
- 13 workplace-injury-working-holiday-rights, 03 how-does-australian-tax-year-work (3 places): part-year over-withholding claims replaced with the flat 15% fact and real causes.
- 16 dasp-vs-leaving-super-in-australia-pros-cons: retitled "Laisser sa super en Australie ou la réclamer ?" (+ description); overseas account fund-dependent; 6-month transfer; interest sentence removed; bridge in "Quand réclamer est-il clairement la bonne décision ?".
- 09 casual-shift-cancellation-rules-australia: notice H2 moved to 2nd position, both directions + resignation, FWO casual facts; old end H2 removed; title "Shift de casual annulé : préavis et paie minimale".
- 07 tax-obligations-after-leaving-australia: payslip claim corrected (ATO: payslips not sufficient; STP income statement in myGov; pre-fill generally unavailable); early return conditions + paper + 50 business days; 28 days wording; ATO-held transfer and payment options.
- 05 how-to-find-lost-superannuation: new H2 "Où lancer la recherche ?" (myGov Super > Fund details, "Contact fund", ATO app/phone, DASP online search by TFN, one application per account); 6-month trigger; removed "rapportent peu" (unverified interest). 05 how-to-choose-super-fund, 02, 08, 18: "approuvée en 28 jours" corrected.
- 11 how-to-check-super-balance-working-holiday: lost-fund detail handed to find-lost (C4); "retenue de 65 %" link now points to dasp-tax-rate; 28-day wording.

## Skipped
- early-tax-return-leaving-australia (EN only this round); no FR links to it added.
- what-is-a-tax-agent JA-style 税理士 note (n/a). No redirects/merges (per brief).
- dasp-rejected "dossiers de fin de visa se mettent à jour le lendemain" and 02.ts "une demande ne peut plus être annulée" left as is (outside plan scope, not verified either way).

## Handoffs
- Once the FR early-return guide exists: link it from tax-obligations-after-leaving-australia and australian-financial-year-dates.

## Facts and sources
- DASP F1-F12: ato.gov.au DASP page, payments-from-super rates table, DASP online help, ATO-held super, keeping-track-online (from round3/dasp-plan.json, checked 2026-11-05).
- TPB "Only registered tax practitioners can charge a fee": tpb.gov.au/your-tax-or-bas-agent-real-deal.
- Early return, payslips, 50 business days: ato.gov.au lodge-your-tax-return-before-leaving-australia; pre-fill: ATO practitioner future-year lodgments.
- Casual notice: FWO "Your guide to casual employment" (2025-03 PDF).
- WHM 15% to $45,000, 45% without TFN: public/llms.txt Key facts.

## Verify
tsc --noEmit clean; jest (compliance-6-languages, new-locales-sitemap, locale-blog, brand-isolation-round2, brand-routing-26oct, frontend-security) 154/154 pass; no U+2013/U+2014 in chunks.
