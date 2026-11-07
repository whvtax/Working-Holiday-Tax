# Guide log ES, round 4 (src/app/(es)/es/blog/chunks/*.ts only)

## Already done by the earlier agent (verified, not redone)
- 04 what-is-a-tax-agent: H2 "¿Quién puede presentar una tax return australiana por ti?" (TPB) present.
- 04 what-happens-to-unclaimed-super: 6-month trigger (later of departure/visa ceasing, 31 Oct / 30 Apr), interest sentence removed, ATO-held paid only to Australian account or cheque, 28-day service standard, myGov Super > Fund details path, early hub link in lead.
- 04 tax-on-super-withdrawal-backpacker: retargeted to "after the 65%" intent (tax return, home country, timing, unclaimed), bridge in "¿Cuándo conviene presentar el reclamo?".
- 04 how-long-does-dasp-take: 28 days from completed application, one application per account, ATO-held path, bridge at end of "¿Qué tiene que pasar...?".

## Applied this run
- 13 dasp-documents-required: early bridge in "¿Ya cumples los requisitos?" (start/save before flying, send after); $5,000 rule now = Home Affairs Certification of Immigration Status (form 1194, fee) on paper applications; certified copies "may" be asked online and paper; 6-month transfer wording; checklist bullet fixed.
- 13 dasp-tax-rate-65-percent-explained: other visas 35% taxed / 45% untaxed; 65% on taxed and untaxed element for WHM; removed "sin rendimientos" at ATO, replaced with 6-month rule + Australian account/cheque; bridge at end of "¿Igual conviene reclamar...?"; mixed-visa bullet fixed (WHM rate applies to whole payment); link to tax-on-super for the "after the 65%" intent.
- 13 dasp-rejected-what-to-do: bridge at end of "¿Cuáles son las cinco causas?"; unclaimed paragraph fixed (6-month rule, no "más rápida", Australian account/cheque).
- 13 super-multiple-funds-consolidation, super-employer-not-paying-what-to-do, 08 SGC, 11 check-balance: bare "super" hub link in lead removed (descriptive link kept/added). "Close both before leaving" endings rewritten (DASP only after leaving and visa ceased).
- 16 dasp-vs-leaving: retitled "¿Dejar tu super en Australia o reclamarla? Lo que cuesta esperar" + new description (C2, slug unchanged); 28 days from completed application; overseas account only if fund offers; interest/inflation sentence removed; bridge in "¿Cuándo conviene claramente reclamar?"; checklist bullet fixed.
- 04 how-much-super-should-employer-pay: early bridge in "¿Cuándo debería aparecer el dinero?"; closing "both before leaving" fixed.
- 05 how-to-find-lost-superannuation: 6-month trigger; myGov Super > Fund details + "Contact fund", ATO app/phone, DASP online search (TFN optional, one application per account) with early hub link; ATO "rinden poco" removed; 28-day wording; closing fixed. 05 how-to-choose-super-fund: 28-day wording.
- 08 super-for-casual: one application per account, 28-day wording, varied hub anchor; 08 SGC ending fixed.
- 11 check-balance: "no sabes en qué fondo" shortened to payslip + myGov and link to find-lost (C4); 65% links retargeted to dasp-tax-rate; 28-day wording; hub link moved to DASP mention. 11 backpacker-tax-history: 65% link retargeted to dasp-tax-rate, 35% scoped to taxed element.
- 09 casual-shift-cancellation: retitled "Turno casual cancelado: aviso y pago mínimo" + description; notice H2 moved to 2nd position, covers both directions with FWO facts; old duplicate H2 removed. 09 bank account guide: refund only to Australian account, ATO-held super Australian account/cheque, fund DASP overseas only if offered; checklist no longer implies claiming DASP before leaving.
- 07 tax-obligations-after-leaving: early-return H2 corrected (conditions, paper form, 50 business days, agent electronic up to 15 June, payslips not sufficient, no pre-fill; removed "adelanta la devolución"); DASP 28 days + overseas only if fund offers; unclaimed 6-month rule + Australian account/cheque.
- 03 (short-stay + lodge-from-overseas), 04 australian-financial-year-dates, 18: early-return statements corrected (no refund-speed promise, payslip claim removed, DASP not simultaneous). 02 and 18: DASP 28-day wording.

## Skipped
- New guide early-tax-return-leaving-australia (EN only this round); no inbound links to it added.
- Merges/redirects/slug changes (forbidden). Part-year over-withholding claims: none left in ES (03/04/08 already say flat 15%).
- what-is-a-tax-agent section: already present.
- Unverified fund-fee figures in dasp-vs-leaving and "7 a 14 días" movement-record timing in DASP guides: not in brief scope, left.

## Handoffs
- None required. Service pages untouched.

## Facts + sources
- DASP 28 days from completed application; ATO-held 28-day service standard; start/save before leaving; $5,000 Certification of Immigration Status (form 1194) on paper: ato.gov.au .../departing-australia-superannuation-payment-dasp
- One application per account, TFN optional, status only "submitted": .../dasp/help-with-the-dasp-online-application-system
- 65% taxed and untaxed for WHM, 35%/45% others, WHM rate on whole payment: ato.gov.au/tax-rates-and-codes/key-superannuation-rates-and-thresholds/payments-from-super
- 6-month transfer, 31 Oct / 30 Apr: ATO USM protocol for former temporary residents; ATO-held super page
- myGov Super > Fund details, "Contact fund": ato.gov.au .../keeping-track-of-your-super-online
- Fund DASP overseas only if fund offers (F11, Cbus/ART); refunds only to Australian account (ATO update financial institution details)
- Early return conditions, paper, 50 business days, payslips not sufficient: ato.gov.au .../lodge-your-tax-return-before-leaving-australia; agent electronic to 15 June, no pre-fill: ATO PLS future-year lodgments
- Casual notice: FWO "Your guide to casual employment" (2025-03 PDF); TPB register (tax agent section, pre-existing)

## Verify
- tsc --noEmit: pass. jest (compliance 6 languages, new-locales-sitemap, locale-blog, frontend-security, brand-isolation-round2, brand-routing-26oct, supabase-schema-guards): 7 suites, 196 tests pass. No U+2013/U+2014 in ES chunks.
