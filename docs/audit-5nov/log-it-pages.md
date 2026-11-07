# Log: it-pages

## Applied
- it-pages-001: blog/data.ts Medicare category FAQ "I working holiday maker pagano la Medicare levy?" now answers by passport (RHCA countries incl. Italy generally no exemption; Germany/Japan/France/Spain can claim with a Medicare Entitlement Statement).
- it-pages-002: blog/data.ts Tax Return category intro no longer says backpackers usually get a refund (text from finding). Also softened the category FAQ "I working holiday maker ricevono un rimborso?" from "Spesso sì" to "Dipende dal tuo anno ... niente è garantito e l'importo lo stabilisce l'ATO".
- it-pages-003 (adapted, see Facts): /it/medicare Lead, #who-is-exempt section and a new first FAQ "Sono italiano: posso avere l'esenzione dalla Medicare levy?" (placed before "Quanto vale"); home FIGURES '2%' replaced by '15%' WHM rate; home ANALYSIS 03 and COMPARISON Medicare row rewritten; Medicare REFUND_SOURCES card on flagship and /it/tax-return retitled "La Medicare levy, dopo i primi mesi". Wording reflects the 6-month limit of Italian cover instead of the finding's flat "di solito no" for the whole year. Updated the code comment in medicare/page.tsx.
- it-pages-004: blog/data.ts Super category: 12% from 1 July 2025, unchanged 2026-27, Payday Super from 1 July 2026 ("entro pochi giorni da ogni giorno di paga", per llms.txt); intro date fixed to 1° luglio 2025.
- it-pages-005 (partial, per lead decision: no redirect, keep both): removed 'dichiarazione dei redditi Australia' and '... italiani' from /it/tax-return keywords; made flagship distinct (complete guide with new "Le cifre chiave, con le date" section; the duplicated 7-step SEQUENCE replaced by a short summary + LinkButton to /it/tax-return "I sette passaggi del servizio"); /it/tax-return now links inline to the flagship ("la guida completa con aliquote, scadenze e Medicare") in addition to its GUIDES entry. Nav/Footer/category relatedServicePath left on /it/tax-return (service page, consistent with lead decision).
- it-pages-006: home FAQ "Che aliquota pagano" now gives 15/30/37/45 with thresholds and years (ATO); calculator FAQ "Quali aliquote usa" opens with the rates; flagship "Che cos'è la tax return" section and FAQ include the 15% up to 45,000 $; TFN FAQ says "invece del 15% previsto per i working holiday maker".
- it-pages-007: superannuation "E poi" section now "Prima della super, chiudi la tax return" -> /it/dichiarazione-redditi-australia (said "un eventuale rimborso" instead of "il rimborso"); calculator: new server-rendered Section under the calculator "La stima diventa una tax return" with LinkButton to the flagship (in calculator/page.tsx, because CalculatorView hrefs live in a shared component); about talkP2 inline link "come prepariamo la tax return"; contact first blocker gets link "Come prepariamo la tax return".
- it-pages-008: TFN FAQ "Cosa succede se comincio a lavorare senza TFN?" now separates the declared-application 28-day case from the 45% case.
- it-pages-009: /it/tax-return step 07 "Se c'è un rimborso, di solito arriva..."; webPageLd description "quando arriva un eventuale rimborso".
- it-pages-010: /it/abn "garanzia di rimborso" -> "garanzia sulla tariffa".
- it-pages-011: "Vedi l'importo prima che venga presentato qualsiasi documento, insieme alla spiegazione..." on both pages; also fixed "prima che venga presentato qualsiasi cosa" in /it/tax-return refund section and "inviato qualsiasi cosa" on the home hero.
- it-pages-012: both refund cards now "e nemmeno la dichiarazione che l'hai già richiesto".
- it-pages-013: TFN "Paghi noi per accorciare quel periodo e per recuperare con la tax return, se spetta, ..."; FAQ "Posso richiedere il TFN da solo?" starts "Sì, gratis sul sito dell'ATO."
- it-pages-014: Super category FAQ lost-super answer rewritten (used "chiederci di aiutarti a ritrovarli" rather than "cercarli per te" to avoid implying we access ATO records as agent).
- it-pages-015: about: Manchester/Osaka -> Bari/Torino.
- it-pages-016: calculator 2025/26 -> 2025-26 (page FAQs, schema description, client footnote); DASP 65% "sulla componente tassata del saldo (di solito quasi tutto)" in FAQ and superHint.

Extra, iron rule (FR/IT/ES allowed by lead):
- Home trust notice "Un agente fiscale registrato non ti chiede mai le credenziali di myGov" -> "Nessuno di serio ti chiederà le credenziali di myGov. Noi non le chiediamo mai: se qualcuno te le chiede a nome nostro, non siamo noi."
- "Ce la vediamo (direttamente noi) con l'ATO" / "Parliamo noi direttamente con l'ATO" (implies dealing with the ATO as agent) -> "Alla pratica pensiamo noi." in home COMPARISON, tfn, abn, contact, calculator client, superannuation, expenses hub.
- Step 07 on /it/tax-return "Se l'ATO chiede chiarimenti, rispondiamo noi" -> "ti diciamo cosa è stato chiesto e prepariamo con te la risposta." (flagship version removed with the step list).
- Tax Return category FAQ deadline: 31 Oct 2026 passed, late lodgement possible, agent extension only if on an agent's list before 31 October.

## Skipped
- it-pages-005 redirect / hreflang move / Nav-Footer-home-services relinking: conflicts with lead decision (keep both pages, no redirects, no hreflang changes; /it/tax-return stays the service page).
- it-pages-003 part (4): covered by it-pages-007.
- it-pages-003 flat wording "Con il passaporto italiano, di solito la levy non si può evitare" (for the whole year): not used, because Services Australia limits Italian cover to 6 months or visa expiry; wrote the 6-month version instead.

## Handoff
- shared (src/components/wht/CalculatorBlocks.tsx): optional. If the lead wants the tax return link inside the calculator result block, add an optional `taxReturn?: string` to CalcHrefs and a `linkTaxReturn?: string` to the copy type, render it next to linkMedicare; then IT can pass taxReturn: '/it/dichiarazione-redditi-australia', label 'La stima diventa una tax return: come funziona'. Not required: the IT page already has a link section below the calculator.

## Facts checked
- WHM rates 15% to 45,000 / 30% to 135,000 / 37% to 190,000 / 45% above, 2025-26 unchanged 2026-27: public/llms.txt Key facts (ATO); matches calc() in IT CalculatorClient.
- SG 12% from 1 July 2025, unchanged 2026-27; Payday Super from 1 July 2026, paid within days of each payday: llms.txt Key facts.
- DASP 65% of the taxable component: llms.txt.
- No-TFN withholding 45%: llms.txt.
- Italy on the RHCA list: llms.txt. Italian cover "ends after 6 months or when your visa expires, whichever comes first": Services Australia, https://www.servicesaustralia.gov.au/reciprocal-health-care-agreements-visiting-from-italy (fetched).
- Deadline 31 Oct 2026 for 2025-26 passed, late lodgement possible, agent extension only if on agent's list before 31 Oct: FIX_BRIEF known facts; EN /tax-return FAQ.

## Notes for the lead
- Pre-existing literal non-breaking space in src/app/(it)/it/expenses/page.tsx line 186 ('1.000 $ fissi'), not written by me, left untouched.
- tsc clean; jest wht-copy-compliance-6-languages, seo-legal-og, locale-blog, new-locales-sitemap pass. No em/en dashes in (it) pages.
