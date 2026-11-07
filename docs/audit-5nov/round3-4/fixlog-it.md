# Fix log, round 4, IT (WHT service pages)

Files edited (only these):
- src/app/(it)/it/tfn/page.tsx
- src/app/(it)/it/abn/page.tsx
- src/app/(it)/it/tax-return/page.tsx
- src/app/(it)/it/superannuation/page.tsx
- src/app/(it)/it/dichiarazione-redditi-australia/page.tsx (flagship)

Edit scripts (reproducible): plan/round4/it_tfn.py, it_abn.py, it_tr.py, it_flag.py, it_super.py

## Applied

### svc-tfn-it.json (all P1 and P2 applied)
- P1 title "Come richiedere il TFN in Australia"; new description; 5 keywords added.
- P1 H1 kicker "Come richiedere il TFN in Australia · visto 417 e 462"; answer-first lede in .hero-lede (45% only without TFN and without declaration).
- P1 hero note adds "dati del passaporto e un indirizzo australiano".
- P1 "Quanto costa..." paragraph rewritten (15% for 28 days with declaration, 45% otherwise); Figures now 45% / 28 giorni / 15% / Gratis with "Fonte: ATO" + dated line "Dati verificati ... 5 novembre 2026".
- P1 new section "Come si richiede il TFN in Australia" with HOW_TO (5 Steps) + inline WhatsApp link (WA_TFN). Step 03 uses the plan's safer fallback "È il punto in cui si inceppano più spesso" (not "quasi tutte").
- P1 FAQ: 3 new (cos'è, documenti, non arrivato dopo 28 giorni), "dall'Italia, prima di partire" rewrite, two DIY FAQs merged, "Quanto tempo" last sentence (do not reapply), new order (9 items), FAQ title "Domande frequenti sul TFN in Australia". faqLd still maps FAQS.
- P2 Compare (senza richiesta vs richiesta dichiarata); trust paragraph uses approved sentences; "E poi" now LinkRows to ABN, super, tax-return, flagship; GUIDES replaced (5 IT slugs, all present in IT chunks); guarantee band moved after FAQ; final CTA copy; webPageLd name/description/dateModified; serviceLd availableLanguage. No HowTo schema added (as planned). Unused LinkButton import removed.

### svc-abn-it.json (all P1 and P2 applied)
- P1 answer-first lede ("partita IVA australiana") + old lede kept as second line inside .hero-lede; title/description; og/twitter title.
- P1 Figures section "ABN in Australia: le cifre che contano" (6 sourced figures + dated line); HOW_TO_APPLY Steps section + WaButton (WA_ABN, topic abn).
- P1 TFN accuracy fix in FAQ and "Cosa facciamo noi" paragraph (TFN not mandatory, speeds identification).
- P1 3 new FAQs (partita IVA, costo e tempi, 47% senza ABN); ABR entitlement rule added to the employer FAQ; sham contracting paragraph (13 March 2026) in the warning section.
- P2 order: Hero > Le cifre > Come si richiede > Devi aprire un ABN... > Cosa cambia > TFN o ABN (Compare) > Cosa facciamo noi > ... Tones adjusted to keep pale/white alternation.
- P2 GUIDES (5 IT slugs), guides title, "E poi" links (superannuation, expenses/delivery-drivers, tax-return, flagship with tone="light"), final CTA copy, kicker, keywords, webPageLd description/dateModified/mentions.

### svc-tax-return-it.json (all P1 and P2 applied, both files)
/it/tax-return:
- P1 metadata description, og and twitter descriptions without "la presentiamo noi"; FAQ "Cosa devo fare io" ends with approved sign-off; FAQ question "La tax return si può presentare anche se ho già lasciato l'Australia?".
- P1 title { absolute: 'Tax return Australia, anche dall’Italia: come funziona' }; keyword "rimborso tasse Australia" removed, 3 added.
- P1 "In breve" section with .what-lede before PhotoFrame; speakable adds .what-lede; HowTo JSON-LD from SEQUENCE (5th script); 2 new FAQs (firma dall'Italia, agente fiscale registrato controlla).
- P2 SEQUENCE 07 "L’ATO la valuta"; mid-page WaButton (inline, topic tax-return) after the steps; TFN + Medicare links in refund section; TPB number line with AGENT_TPB (from @/lib/agent, same as EN); 3 guides; dateModified; REFUND_SOURCES WHM-employer mechanism text.
Flagship /it/dichiarazione-redditi-australia:
- P1 fact fixes (45.001 $ lodgment threshold) in "Chi deve presentarla", FAQ "Devo fare la tax return se ho lavorato pochi mesi o guadagnato poco?" and FAQ 1 second paragraph.
- P1 og/twitter descriptions passive; FAQ "che prepariamo"; "In breve" what-title section with .what-lede moved above PhotoFrame; speakable; figures section moved right after what-title with new intro (date) + 2 new KEY_FIGURES + "Fonte: ATO" on the three unsourced rows + links to /it/tfn, /it/medicare, /it/superannuation.
- P1 TWO_WAYS Compare section (#two-ways) with TPB register line, 2 guide links, WaButton inline; 5 new FAQs; "anni passati, anche dopo 2 o 3 anni" question.
- P2 1.000 $ arithmetic example; 100 $ deduction = 15 $ sentence; WHM employer registration text; TPB line (sentence removed from first trust p to avoid repetition); webPageLd description + dateModified; 3 guides; 4 keywords.
- Tone: plan gave #two-ways tone pale, but it follows the pale refund section; set to default (white) to keep alternation. Layout-only deviation.

### svc-superannuation-it.json (all P1 and P2 applied)
- P1 title/og/twitter, description; P2 keywords.
- P1 hero answer-first Lead + 28-day paragraph inside .hero-sub.
- P1 #key-figures section after PhotoFrame: 9 rows (PlainRows markup via coreBlocks.plain/plainItem, rowTitle/rowBody), each "Fonte: ..." linking to the ATO URL from the plan (row 9 unlinked, as planned), dated line.
- P1 #how-to-claim (5 Steps + WaButton topic super) after #who-can-claim.
- P2 order: key-figures > who-can-claim > how-to-claim > Fai da te (Compare) > how-much > documents > how-long > find-your-fund > from-overseas > while-in-australia > never-claimed > dasp-vs-leaving > with-us > FAQ > guides > E poi > CTA; Answer tones re-alternated.
- P1 MYGOV rows 1-2 corrected; statement under Compare; #who-can-claim three conditions + automatic check + 12% super guarantee with ABN link; #how-much ("nessun agente" removed, calculator link, small print fixed to 65% on taxed and untaxed + guide link); #documents (5.000 $ tied to Certification of Immigration Status on paper applications, TFN link, guide link); #how-long (28 days from receipt of complete application, guide link); #find-your-fund official paths + guide; #from-overseas (cheque claim removed, Wise/Revolut, refund only to AU account, flagship link); #while-in-australia start-before-you-leave; #never-claimed heading + "almeno sei mesi", no "senza spese".
- P1 #with-us: "Puoi farla da te, gratis..." first p; "Se ci affidi anche la tax return:" label before guarantee (guarantee verbatim); sign-off now scoped to the tax return with /it/tax-return link. P2 CTA note under the button.
- FAQ: 13 items (4 new, 5 rewritten). faqSchema still maps faqs; all answers plain text.
- P2 serviceSchema description; 2 guides added (8 total).

## Extra changes made to satisfy the rules (beyond the plans)
- TFN: og description "Prepariamo e inviamo" -> "Prepariamo"; serviceLd "preparate e inviate" -> "preparate"; trust "che inviamo" -> "che prepariamo" (no implication that we lodge the TFN application).
- ABN: WHAT_WE_DO "Lo registriamo sul lavoro che fai davvero" -> "Prepariamo la richiesta sul lavoro che fai davvero"; serviceLd name "Registrazione dell’ABN..." -> "Richiesta dell’ABN...", description "Registrazione..." -> "Preparazione della richiesta di ABN..." (plan said serviceLd unchanged; overridden by the no-lodging rule).
- Tax return: serviceLd name/serviceType "Presentazione..." -> "Preparazione della tax return"; FAQ "lo vediamo sul record ATO prima di presentare" -> "prima che venga presentata".
- Flagship: serviceType -> "Preparazione della tax return"; "prima di presentare" (refund section, NOT_COVERED, FAQ anni passati) -> passive; TWO_WAYS row "prima di presentare qualsiasi cosa" -> "prima che la dichiarazione venga presentata"; KEY_FIGURES 45% row now states the 28-day/declaration rule (brief TFN fact); KEY_FIGURES 65% row "componente tassata" -> "componente imponibile (taxable component, sia taxed sia untaxed)" (brief DASP fact).
- Super: FAQ 1 "65% dell’importo tassato" -> "65% della componente imponibile" and "se il fondo lo prevede" added; "E poi" "la tax return dell’anno va presentata comunque" -> "se hai una tax return da presentare" (contradicted the 45.001 $ threshold now on the flagship).

## Skipped / left as is
- /it/tax-return refund-range sentence "I rimborsi dei nostri clienti vanno da qualche centinaio di dollari a diverse migliaia..." left untouched: plan lists it under do_not_change (owner-approved range, not a promise). Flag for owner if the brief's "EN only" approval should also cover IT.
- Hero H1s of all pages kept (plans keep them; tfn/abn only kicker changed as planned).
- No HowTo schema on /it/tfn or /it/superannuation (plans say so). VEVO and fund cheques not mentioned (super plan not_used).

## Facts used (source)
- TFN: online route only in Australia with work visa, no documents, 28 days by post, do not reapply, receipt ID (ATO foreign passport holders TFN application page); free (ATO apply for a TFN); 28-day declaration rule and 45% (ATO employer TFN declarations page; llms.txt); 15% to 45.000 $ from 1 July 2026, 12% super (llms.txt Key facts); ATO phones 13 28 61 / +61 2 6216 1111 (EN /tfn page).
- ABN: 11 digits, free, does not replace TFN, 28 days to update (business.gov.au); immediate outcome or up to 20 business days, TFN speeds identification (abr.gov.au/node/28); no ABN for employee work (abr.gov.au/node/29); rideshare GST from first ride (ATO ride-sourcing); sham contracting 13 March 2026 (ATO media release); 47%, 75.000 $ GST threshold, 15% (llms.txt).
- Tax return: 45.001 $ lodgment threshold for WHM with only salary (ATO, per plan); 31 October; final return before leaving, paper, ~50 business days (ATO, per plan); ~14 business days refund (existing site wording); WHM employer registration, non-resident rate from 30% (ATO); AGENT_TPB 26233096 (src/lib/agent.ts, same as EN page).
- DASP: 65% of taxable component taxed and untaxed for WHM, 35%/45% other visas, from 1 July 2017 (ATO DASP rates); eligibility three conditions, free online application, 28 days from complete application, ATO-held super after at least 6 months, Certification of Immigration Status for paper applications 5.000 $+, does not affect future visas, not in tax return (ATO DASP page, fetched 5 Nov 2026 per plan); refund only to Australian account (ATO financial institution details page); NAT 7204; KiwiSaver trans-Tasman (ATO, per plan); 12% super guarantee (llms.txt).

## Verification
- npx tsc --noEmit -p .: no errors in IT files; the only errors are in src/app/(fr)/fr/superannuation/page.tsx (unused vars, another fixer's file, in progress).
- npx jest __tests__/wht-copy-compliance-6-languages.test.ts: 3/3 pass. No test imports the IT service pages directly; related suites (page-photo-priority, new-locales-sitemap, locale-blog): 42/42 pass.
- npx eslint on the 5 IT files --quiet: clean.
- U+2013/U+2014/U+2015 and literal U+00A0 scan of the 5 files: none (NBSP only as   escapes and &nbsp; already used by the files).
- Not done (per brief): build, dev server, browser check.
