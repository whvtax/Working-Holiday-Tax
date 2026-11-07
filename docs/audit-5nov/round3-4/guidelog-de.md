# Guide log DE (round 4, GUIDES4_BRIEF)

File: src/app/(de)/de/blog/data.ts (only). Backup before edits: plan/round4/guides-de/data.ts.bak.
Earlier agent: no DE changes found in data.ts (no log, no bridges, interest sentence still present), so all items were applied now, none duplicated.

## Applied
- Category Super FAQ: "zwei bis vier Wochen" -> ATO 28 days from complete application; overseas account only if the fund offers it.
- tax-on-super-withdrawal-backpacker: differentiated by intent (no slug change, no redirect): new title/description "Super-Steuer nach der Ausreise: was nach den 65 % kommt"; H2s now: not on AU tax return, home country tax, can it be reduced (WHM rate on whole payment, F5), small balance (F7 trigger), when to lodge. Intro links to dasp-tax-rate guide; early bridge to /de/superannuation in "Wann solltest du den Antrag tatsächlich stellen?". Removed wrong "mixed visa history taxed separately / 35%" and "approval ~28 days".
- dasp-tax-rate-65-percent-explained: 35% taxed / 45% untaxed for others; taxed and untaxed element both 65% for WHM; F7 trigger replaces "irgendwann als lost gemeldet"; mixed-history bullet corrected (F5); bridge "beantrage es als DASP" at end of "Lohnt sich der Antrag bei diesem Satz überhaupt?".
- what-happens-to-unclaimed-super: lead and first H2 now F7 (6 months after later of departure/visa ceasing, 31 Oct / 30 Apr); bridge in "Kannst du es noch beantragen..." first paragraph; ATO-held: 28 days service standard from lodgement, paid only by EFT to an Australian account in your name or cheque; myGov path (Super, Fund details); interest sentence removed; "gebührenfrei" -> out of reach of fund fees and premiums; description updated.
- how-long-does-dasp-take: title "DASP-Bearbeitungszeit: meist innerhalb von 28 Tagen ausgezahlt", description and lead per F6; bridge at end of "Was muss passieren, bevor das Geld sich bewegt?"; one application per account (F4); ATO-held 28 days from lodgement; "nach der Freigabe" H2 -> "nach der Auszahlung"; start-and-save before flying, submit after leaving.
- dasp-vs-leaving-super-in-australia-pros-cons: retitled leading with the leave-it half ("Super in Australien lassen oder beantragen? Was Warten kostet"), new description and first sentence; bridge at end of first paragraph of "Wann ist Beantragen eindeutig richtig?"; overseas account only where fund offers it; F7 trigger (twice); ATO interest/inflation sentence removed; ATO-held paid only to AU account or cheque; unverified "only changeable with a new application" removed.
- dasp-rejected-what-to-do: bridge after the five reasons; ATO-held paragraph corrected (F7, no "faster", AU account or cheque).
- dasp-documents-required: $5,000 now the Home Affairs Certification of Immigration Status on paper applications (fee); certified copies at any balance (F9), body and checklist bullet.
- 28 days "nach Genehmigung/Freigabe" corrected to ATO wording in: working-holiday-visa-tax-guide-417-462, how-to-cancel-your-abn, how-to-find-lost-superannuation, how-to-choose-super-fund, super-for-casual-and-part-time-workers (also one application per account), how-to-check-super-balance-working-holiday (also Payday Super timing), tax-obligations-after-leaving-australia.
- how-to-find-lost-superannuation: F7 trigger; myGov path incl. "Contact fund" and DASP online search by TFN (C4/F8); ATO "low return" claim removed.
- opening-bank-account-australia-working-holiday: refund only to AU account, DASP overseas only if fund offers; checklist no longer says DASP "before or shortly after departure" (cannot claim before leaving).
- "Vor der Abreise gehören zwei Dinge zusammen: der DASP-Antrag" -> "Rund um die Abreise ..." (5 guides) so it no longer implies claiming before leaving.
- backpacker tax history guide: inbound 65% link now points to dasp-tax-rate guide (rate intent).
- what-is-a-tax-agent: new H2 "Wer darf deine australische Steuererklärung für dich einreichen?" (self via myTax/paper; only registered tax practitioners can charge, TPB quote; home-country Steuerberater not on the AU register cannot charge). No "we" as agent.
- casual-shift-cancellation-rules-australia: retitled "Casual-Schicht absagen: Vorlauf und Bezahlung", new answer-first lead, notice H2 now first H2 covering both directions with FWO facts; Cleaning Services Award "3 Stunden" corrected to area-based (FWO link, as EN); duplicated refuse-shift sentence trimmed.
- tax-obligations-after-leaving-australia: payslip claim fixed (ATO: payslips not sufficient; STP income statement in myGov; pre-fill generally unavailable); early lodgement facts (paper form yourself, 50 business days, tax agent electronically up to 15 June, no further AU income except interest/dividends/royalties); unclaimed paragraph per F7 + AU account/cheque.
- Same early-lodgement payslip/"refund months earlier" claims fixed in do-you-need-to-lodge-tax-return-short-stay, working-holiday-visa-tax-guide-417-462, how-to-lodge-tax-return-from-overseas.
- Leftover part-year over-withholding claims removed (flat 15% up to $45,000; kept 45% before TFN, second job without declaration, unregistered employer): do-you-need-to-lodge-tax-return-short-stay (description, lead, H2 rewritten, closing), what-is-a-tax-refund-australia, transferring-money-overseas-australia-tax.
- Medicare exemption made conditional in one refund sentence (working-holiday-visa-tax-guide-417-462).

## Skipped
- New guide early-tax-return-leaving-australia: EN only this round; no DE link to it added (slug does not exist in DE).
- No redirects, merges or slug changes (per brief).
- Service pages untouched.

## Handoffs
- DE early-tax-return-leaving-australia guide later; then add inbound links from tax-obligations-after-leaving-australia, australian-financial-year-dates, do-you-need-to-lodge-tax-return-short-stay, how-to-lodge-tax-return-from-overseas.
- dasp-rejected still says "das Neueinreichen übernehmen wir für dich" and "Visumsende wird am Tag nach Ablauf erfasst" (unverified timing); left as is.

## Facts and sources
- ATO DASP page (fetched 5 Nov 2026): ATO-held super only EFT to an Australian bank account in your name or cheque; 28 days from completed application; $5,000 paper applications Certification of Immigration Status; one form per fund; cannot claim until after leaving, start before leaving. https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp
- TPB (fetched): "Only registered tax practitioners can charge a fee for tax agent services." https://www.tpb.gov.au/your-tax-or-bas-agent-real-deal
- F4, F5, F7, F8, F9 from round3/dasp-plan.json; early lodgement facts from round3/new-guides.json (ATO lodge-before-leaving and PLS future-year lodgments pages); FWO casual facts from the plan's FWO guide PDF; WHM 15% to $45,000 from public/llms.txt.

## Verify
- npx tsc --noEmit -p . : exit 0
- jest wht-copy-compliance-6-languages, new-locales-sitemap, locale-blog, frontend-security, brand-isolation-round2, brand-routing-26oct, supabase-schema-guards: 7 suites, 196 tests passed
- U+2013/2014/2015 in DE data.ts: none
