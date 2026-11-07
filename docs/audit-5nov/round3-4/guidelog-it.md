# Round 4 guides, IT (chunks only)

State found: no IT chunk had been touched by the earlier agent (all mtimes 01:44, before the brief); everything below applied fresh, nothing duplicated.
Script: `.../plan/round4/guides-it/apply.py` (exact-match replacements, each asserted unique). Backup of the pre-edit chunks: `.../plan/round4/guides-it/chunks-backup/`.

## Applied
Leftover part-year claim (WHM flat 15% per pay up to $45,000; real causes kept: 45% before TFN, second job without declaration, unregistered employer)
- 03.ts australian-financial-year-dates: H2 paragraph, refund-factors sentence, list item.
- 03.ts (Medicare/two-years guide): "sistematicamente troppo alta" paragraph rewritten; list item.
- 03.ts do-you-need-to-lodge-tax-return-short-stay: description, lead, H2 retitled "Un soggiorno breve viene trattenuto in eccesso?" and rewritten, second-job cause added, "anni con la quota più alta" sentence; early-return payslip claim fixed (ATO: payslips not sufficient, pre-fill generally unavailable, use myGov income statement).
- 08.ts what-is-a-tax-refund-australia: description, H2 + first bullet, "data di arrivo e partenza" bullet, short-years sentence.
- 10.ts: "anno che finisce a metà" sentence.

DASP facts and bridges
- how-long-does-dasp-take: title/description/lead now "28 days from a complete application" (ATO); early bridge at end of "Cosa deve succedere prima..." ("richiesta della DASP"); ATO-held: 28-day service standard from lodgement, no "faster" claim; trigger 6 months; H2 "dopo l'approvazione" -> "dopo il pagamento"; overseas account conditional on fund.
- tax-on-super-withdrawal-backpacker: retargeted by intent (no slug change): title "Dopo il 65% sulla super: tax return, Italia e tempi", new description, lead links to dasp-tax-rate guide; short "what the 65% covers" (taxed + untaxed, WHM 65% on whole payment, others 35/45); tax return section (final withholding, refund AU account only); Italy section; timing section with bridge ("DASP per chi ha lasciato l'Australia"), start online before leaving / submit after, 28 days from complete application. Removed duplicated "why higher" and "small balance" sections and the 35% mixed-history error.
- dasp-tax-rate-65-percent-explained: 35/45 for others; 65% on taxed and untaxed for WHM; unclaimed trigger; bridge "richiedila come DASP" end of "Vale comunque la pena"; mixed-history bullet corrected (F5).
- dasp-vs-leaving: title retitled leading with "leave it" ("Lasciare la super in Australia o riscuoterla? Cosa costa aspettare"); overseas account fund-dependent; interest/inflation claim removed (fees/insurance wording); bridge "come funziona la richiesta DASP" in "Quando riscuotere è chiaramente giusto?".
- dasp-rejected-what-to-do: bridge "procedura DASP" end of "Quali sono le cinque cause?"; ATO-held "faster" claim removed.
- what-happens-to-unclaimed-super: description, lead and first H2 lead with F7 trigger (6 months after later of departure/visa ceasing; 31 Oct / 30 Apr); bridge "come si richiede la DASP" in "Puoi ancora richiederlo..."; interest sentence removed; "senza commissioni" -> out of reach of fund fees and insurance premiums; 28-day ATO-held standard.
- dasp-documents-required: $5,000 tied to Home Affairs Certification of Immigration Status on paper applications (certified ID any balance); "departure must follow visa cessation" error fixed (both must be true at claim time); list items.
- how-to-find-lost-superannuation (C4): new H2 with myGov path (Super > Fund details, Contact fund), DASP online search by TFN with one application per account, ATO app/phone; ATO-held "rende poco" removed; 28 days wording.
- how-to-check-super-balance-working-holiday (C4): unknown-fund section cut to two sentences + link to find-lost; 28 days wording; 65% link now to dasp-tax-rate guide.
- backpacker-tax-history (11.ts): 35/45 for other visas; 65% link now to dasp-tax-rate guide.
- tax-obligations-after-leaving-australia: payslip claim fixed; 28 days wording; unclaimed trigger.
- SGC, super-multiple-funds-consolidation, super-employer-not-paying: bare "[super]" hub link in lead removed (descriptive "richiesta DASP" link kept later); one varied tax-return sentence added in the closing section of each.

New-guides sections
- what-is-a-tax-agent: new H2 "Chi può presentare per te una dichiarazione australiana?" (self via myTax/myGov or paper; only TPB-registered practitioners can charge; Italian commercialista/CAF not on the register cannot charge). No "we".
- casual-shift-cancellation-rules-australia: retitled "Turni casual cancellati: preavviso e paga minima", new description and lead; new notice H2 first, both directions, FWO facts; Cleaning Services Award corrected (area-based, FWO); duplicate refusal sentence later trimmed.

## Skipped
- early-tax-return-leaving-australia (EN only this round) and its inbound links (no IT guide to link to).
- C1 merge/redirects (brief: no redirects/merges/slug changes).
- Unverified bank-transfer day counts and movement-record "7-14 days" lines: not in the plan's fix list, left as is.

## Handoffs
- None needed for IT. Service page /it/superannuation untouched.

## Facts and sources
- DASP 65% taxed+untaxed for 417/462, whole payment; others 35%/45%: ATO payments-from-super DASP rates.
- 28 days from completed application; ATO-held 28 days from lodgement: ATO DASP page.
- Unclaimed transfer 6 months after later of leaving/visa ceasing, 31 Oct / 30 Apr: ATO DASP page + USM protocol (plan F7).
- $5,000 Certification of Immigration Status (paper, Home Affairs, fee); certified ID any balance: ATO DASP page (F9).
- myGov Super > Fund details, Contact fund, DASP online search, one application per account: ATO keeping track of super online, DASP help page (F4, F8).
- Refund only to AU account: ATO financial institution details (F10).
- Early return: payslips not sufficient, income statement; pre-fill generally unavailable: ATO lodge-before-leaving page, practitioner future-year lodgments.
- TPB: "Only registered tax practitioners can charge a fee for tax agent services." https://www.tpb.gov.au/your-tax-or-bas-agent-real-deal (fetched).
- FWO casual employment guide (no firm advance commitment; generally no notice to resign); FWO cleaning award page (minimum depends on area cleaned, fetched).
- WHM 15% to $45,000, no tax-free threshold, 45% no TFN: public/llms.txt Key facts.

## Verify
tsc --noEmit: pass. jest wht-copy-compliance-6-languages, new-locales-sitemap, locale-blog, frontend-security, brand-isolation-round2, brand-routing-26oct, supabase-schema-guards: 7 suites, 196 tests pass. No U+2013/U+2014 in IT chunks.
