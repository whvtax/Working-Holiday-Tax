# Fix log: es-guides

Files edited: only `src/app/(es)/es/blog/chunks/01-18.ts`. Edit scripts and JSON edit lists are in `scratchpad/plan/work-fix-es-guides/`.

## Applied
- es-guides-a-001 (P0): how-to-find-lost-tfn and do-you-need-new-tfn-second-visa: removed both "nosotros nos encargamos de esa gestión", restored the ATO numbers 13 28 61 and +61 2 6216 1111, and described the agent as "agente fiscal registrado".
- es-guides-a-002 (P0): how-long-does-it-take-to-get-a-tfn: replaced "esa gestión la hacemos nosotros" with the ATO phone numbers.
- EXTRA P0 (same pattern, not in findings): tfn-application-delayed (01.ts): "Nosotros hacemos esa gestión en tu nombre" became "Un agente fiscal registrado puede hacer esa consulta en tu nombre", aligned with EN.
- es-guides-a-003 (P0): how-long-does-tax-refund-take: the "Cuando presentamos nosotros la return... en nombre del cliente" sentence now uses the reviewing agent wording.
- es-guides-b-006 (P1): what-is-a-tax-agent: "Quien cobra por trabajo de impuestos debe tener ese registro" replaced.
- Same pattern in super-multiple-funds-consolidation and super-employer-not-paying-what-to-do: "Quien cobre/preste servicios de impuestos ... debe figurar en el registro" became "Los tax agents registrados figuran en el registro público".
- es-guides-a-004 (P1): added the eligibility qualifier for the 1000 AUD deduction in bartender (plus a link), kitchen-hand, station-hand, abn-deductions (2 places), tools-under-300 and tax-deductions-working-holiday-makers.
- es-guides-a-005 (P1): do-you-need-to-lodge-tax-return-short-stay: new lead ("Casi siempre sí. Si un empleador te retuvo impuesto..."), the non-lodgment section aligned, and the false "tres meses se gravan como doce" section rewritten for the flat 15% WHM rate. The deadline paragraph now says the 31 Oct 2026 deadline has passed and the agent extension applies only if you were on an agent's list before 31 Oct. Description fixed because it stated "en estancias cortas se suele retener de más" (factual error), and "finalised" became "finalizado".
- es-guides-b-005 (P1), extended to the whole ES corpus: removed every "partial year / leaving mid-year means over-withheld" claim. Places: what-is-a-tax-refund (lead, section, bullet, "tres meses como doce"), tax-back (intro, bullet removed with a note added, list now "Cuatro cosas"), average-tax-refund (bullet replaced), how-does-australian-tax-year-work (3 places), backpacker-tax-rate (2 places), australian-financial-year-dates, full-time-part-time-casual ("quincenas desiguales"). Medicare levy bullet moved out of the "retenido de más" list in what-is-a-tax-refund.
- es-guides-a-006 / es-guides-b-001 (P1): added a contextual [tax return](/tax-return) link to all 37 guides that had none (work rights, super/DASP, TFN, job guides, ATO address, shift cancellation, tax-obligations-after-leaving, tfn-vs-abn and others). Every ES guide body now links /tax-return.
- es-guides-a-007 / es-guides-b-002 (P1/P2): links to /es/devolucion-impuestos-australia (full /es/ path) in how-to-lodge-tax-return-working-holiday, how-to-lodge-from-overseas, how-long-does-tax-refund-take, do-you-need-to-lodge-short-stay, late-tax-return-penalty, tax-return-deadline-31-october, multiple-jobs, tax-return-without-tfn, tax-back, what-is-a-tax-refund, average-tax-refund, working-holiday-visa-tax-guide, diy-vs-agent (13 links in total).
- es-guides-a-008 (P1): backpacker-tax-rate: answer-first lead with the 15/30/37/45% brackets, a cross-link to backpacker-tax-history, and a link back from history (a-013 part).
- es-guides-a-009 (P1): how-to-update-address-with-ato: answer-first lead, new H2 "¿Cómo se cambia la dirección en la ATO?" covering the four ATO channels, and the mixed-person lead sentence fixed. I did not write "we update it for you", because changing a client's ATO address is an agent action. It says "revisamos esa dirección como parte de la preparación" instead.
- es-guides-a-010 (P1): countries-with-medicare-agreement: tax section replaced with the general RHCA rule plus a link to the levy guide. Added a note that Italy and Malta cover is limited (Italy: 6 months maximum).
- es-guides-b-003 (P1): medicare-levy-working-holiday-makers rebuilt from EN: 2% answer-first lead, 11 RHCA countries, Spain and Latin America not on the list, MES once per financial year, agreement-country case, 2-year amendment window. Approved sign-off kept. No reader amounts.
- es-guides-a-011 (P1): how-long-does-tax-refund-take lead now states 7-14 business days first.
- es-guides-a-012 (P2): casual-shift-cancellation: new H2 on how much notice a casual must give, and the last H2 renamed "¿Qué decide si te deben el mínimo?".
- es-guides-a-013 (P2): reciprocal links between australian-financial-year-dates and how-does-australian-tax-year-work, and between backpacker-tax-rate and backpacker-tax-history.
- es-guides-a-014 / es-guides-b-010 (P2): every bare "return/returns" in 08.ts became "declaración/declaraciones" (0 left in the corpus). The "la return es preparada y revisada por un agente" calque was reworded to "que después revisa y aprueba un agente fiscal registrado".
- es-guides-a-015 (P3): "El Fair Work Ombudsman", plus the tuteo fix.
- es-guides-a-016 (P3): the 4 listed period-ending H2s became questions. Fixed 5 more of the same pattern too (04, 05 x2, 06, 07): no ES H2 now ends in a period.
- es-guides-b-007 (P2): TFN "30 %" openers made self-contained (01 lead and H2, 11, 12 x2). The tax-return-without-tfn lead now answers its title, and the duplicate sentence was removed.
- es-guides-b-008 (P2): LITO figures added (700 AUD up to 37 500 AUD, phasing out between 37 500 and 66 667 AUD).
- es-guides-b-009 (P2): /superannuation links in tax-on-super-withdrawal (worded "preparamos el reclamo", not "lo presentamos") and what-happens-to-unclaimed-super.
- es-guides-b-011 (P2): "cents" became "centavos" across 10, 12, 16 and 17.ts, with "(cents per kilometre)" at the first mention in each vehicle guide.
- es-guides-b-012 (P3): "recuperarlo" / "a quien nunca volvieron a llamar".
- Deadline qualifier (31 Oct passed, agent extension only if on an agent's list before 31 Oct) added in tax-back, working-holiday-visa-tax-guide, tax-obligations-after-leaving, how-does-australian-tax-year-work and what-is-a-tax-agent.

## Skipped
- None of the findings were skipped. Some were changed in part:
  - a-009: dropped the suggested option "la actualizamos como parte de ella", because it implies we act with the ATO as the agent.
  - b-009: "lo presentamos" became "preparamos el reclamo".
  - b-005: in tax-back I removed the leaving-mid-year bullet and added a separate sentence, rather than keeping a bullet that contradicts its list heading.
- Left as is: "leemos tu registro en la ATO" in tax-return-deadline-31-october. It mirrors the EN line, appears on /es/tax-return and /es/devolucion-impuestos-australia, and the lead should decide on it site-wide.
- Left as is: "Nos encargamos de las solicitudes de TFN con una dirección verificada" in tfn-australian-address-no-fixed-address. It describes the TFN application service, not tax agent work.

## Handoff
- EN `src/app/(site)/blog/data.ts` (EN guides owner). Same issues as fixed in ES:
  1. how-long-does-tax-refund-take-australia: "Where we lodge a return, ... registered tax agent's channel" implies agent status. Reword to: "When your return is prepared with us, the registered tax agent who reviews and signs it off can check its status with the ATO and see where it is held."
  2. what-is-a-tax-agent: "Anyone charging for tax work must hold that registration". Reword to: "Only a registered tax agent can prepare and lodge other people's returns for a fee, and their registration can be checked on the government's public register."
  3. what-is-a-tax-refund-australia, tax-back-australia-working-holiday, average-tax-refund-working-holiday, how-does-australian-tax-year-work: remove "partial year / leaving mid-year is the most reliable source of over-withholding" and "three months taxed as twelve". WHM withholding is a flat 15% to $45,000.
  4. do-you-need-to-lodge-tax-return-short-stay: the lead "depends on how much you earned, not how long you stayed" should say: if tax was withheld, lodge.
  5. how-to-update-address-with-ato: it has no how-to section.
- Other locales (FR/IT): probably carry the same partial-year over-withholding wording. Worth a grep for each guides owner.

## Facts checked
- ATO phone 13 28 61 / +61 2 6216 1111 (overseas): EN source data.ts lines 193, 480, 596.
- WHM rates 15/30/37/45%, unchanged 2025-26 and 2026-27; RHCA list of 11 countries: public/llms.txt Key facts.
- Flat 15% WHM withholding with no annualisation, Italy capped at 6 months, 31 Oct 2026 deadline passed, agent extension rule: FIX_BRIEF "Known".
- Ways to update an ATO address (myGov profile path, ATO online services path, phone after identity check, paper "Change of details for individuals" form, up to 28 days): ato.gov.au "Update your personal contact details".
- Casual employees are excluded from notice under the NES: fairwork.gov.au "Who doesn't get notice". It does not cover resignation, so the ES text says "normalmente no se exige".
- MES is for people not eligible for Medicare who claim the levy exemption: servicesaustralia.gov.au/medicare-entitlement-statement. "One per financial year" and the 2-year amendment window come from the EN source.
- LITO $700 / $37,500 / $66,667: EN source data.ts.
- 1000 AUD standard deduction for eligible people, ATO says it is for Australian tax residents: ES 1000-dollar guide and EN data.ts.

## Verification
- `npx tsc --noEmit -p .`: pass.
- `npx jest __tests__/wht-copy-compliance-6-languages.test.ts`: 3/3 pass. locale-blog, brand-routing-26oct and new-locales-sitemap tests: 70/70 pass.
- No U+2013 or U+2014 in any ES chunk. No NBSP was added in new text: existing text uses NBSP in "30 000" and before "%", new text uses plain spaces.
