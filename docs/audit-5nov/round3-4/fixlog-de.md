# Fix log DE (round 4)

Files: src/app/(de)/de/{tfn,abn,tax-return,superannuation}/page.tsx only.
Verify: `npx tsc --noEmit -p .` exit 0; jest wht-copy-compliance-6-languages (3/3), seo-legal-og + brand-routing-26oct (35/35) pass. No U+2013/2014/2015 or NBSP in the four files. No test imports these pages directly.

## Applied

### /de/tfn (svc-tfn-de.json)
- P1 metadata.title -> "TFN beantragen: Work and Travel Australien"; description replaced.
- P1 hero lede -> "Ohne TFN und ohne laufenden Antrag behält dein Arbeitgeber 45 % ..." (28-day rule now correct).
- P1 kicker -> "TFN beantragen für Work and Travel · Visum 417 & 462".
- P1 new section "Was ist die TFN und wie beantragst du sie?" (.what-lede + TFN_FACTS via PlainRows `<ul>`, Stand/Quelle line).
- P1 new section "So läuft der TFN-Antrag in Australien" (APPLY_STEPS via Steps, two guide links, WaButton topic tfn).
- P1 FAQs: new first "Wie beantrage ich die TFN mit Work-and-Travel-Visum?"; "vor der Ankunft" replaced by "Kann ich die TFN schon von Deutschland aus beantragen?" (moved to 2nd); new "Meine TFN ist nach 28 Tagen nicht da" after "Wie lange dauert...". P2 new "Brauche ich eine TFN oder eine ABN?".
- P1 links to /de/abn and /de/superannuation in "Was wir dagegen tun".
- P1 GUIDES replaced (4 items; slugs verified in de/blog/data.ts).
- P1 closing CTA paragraph replaced.
- P1 webPageLd name/description, dateModified 2026-11-05, speakable ['h1', '.what-lede'].
- P2 guarantee section moved after FAQ/guides, before "Was kommt als Nächstes".
- P2 OG/twitter titles; OG description and serviceLd description ("vorbereitet und eingereicht" -> "mit dir vorbereitet und geprüft"); trust "den wir einreichen" -> "den wir vorbereiten". Also WHAT_WE_DO "vor dem Einreichen" -> "bevor der Antrag rausgeht" (same rule).

### /de/abn (svc-abn-de.json)
- P1 hero lede replaced (answer-first, keeps old sentence at end).
- P1 new section "ABN beantragen mit Working Holiday Visum: so läuft es ab" (APPLY_STEPS, .what-lede, TFN + guide link, WaButton). Plan line "Die Registrierung übernehmen wir auf Wunsch für dich" changed to "Den Antrag bereiten wir auf Wunsch mit dir vor" (rule: no lodging the ABN application as agent).
- P1 new section "ABN in Zahlen, Stand November 2026" (Figures: 0 $, bis 28 Tage, 47 %, 75.000 $).
- P1 FAQs: 3 new (WHV ABN, Kosten/Dauer, keine ABN auf Rechnung), reordered to the plan's 10-item order; ABN-cancel answer first paragraph replaced (cancel after statements lodged and debts paid).
- P1 supervision sign-off sentence added after "Wir regeln das direkt mit dem ATO."
- P1 new Compare section "TFN oder ABN: was ist der Unterschied?" with links (tfn-vs-abn-difference, can-you-have-tfn-and-abn, /de/superannuation). Compare has no row-label column, so the label prefixes each cell; the identical "Steuererklärung" row was dropped and said once in the paragraph below (plan allowed).
- P2 title/OG/twitter titles, description, kicker, GUIDES (6, slugs verified) + section title, next-section paragraph with /de/tfn and /de/superannuation ("Die TFN beantragen wir mit dir zuerst" -> "Den TFN-Antrag bereiten wir zuerst mit dir vor"), webPageLd name/description/dateModified/speakable, FAQ WhatsApp CTA.
- Also: WHAT_WE_DO "Wir registrieren sie passend zu deiner Tätigkeit" -> "Wir bereiten den Antrag passend zu deiner Tätigkeit vor" (rule).

### /de/tax-return (svc-tax-return-de.json)
- P1 OG/twitter descriptions ("wir reichen ein" removed); FAQ "Was muss ich selbst tun?" -> sign-off sentence; "die wir einreichen" -> "die wir vorbereiten".
- P1 title "Steuererklärung Australien: Work and Travel", description, webPageLd.name.
- P1 .what-lede replaced (timing, deadline, from Germany, AU account rule).
- P1 KEY_FIGURES section "Die Eckdaten auf einen Blick" (PlainRows in .key-figures).
- P1 4 FAQs added at the planned positions; P2 FAQ "in Deutschland angeben" appended.
- P1 Medicare refund card: DACH no RHCA, "kann ... in der Regel ... beantragen" + "hängt von deinem Anspruch ab", link /de/medicare (REFUND_SOURCES got optional href/linkLabel).
- P1 inline WhatsApp CTA after steps.
- P2 TFN link on 45 % card; Addy v Commissioner [2021] HCA 34 named + residency guide link; section order moved (needed > steps > refund > two ways > rules); RULES comment fixed; GUIDES (6); dateModified + speakable '.key-figures'; kicker.
- Tones adjusted after the move to avoid adjacent pale sections (figures pale, refund white).

### /de/superannuation (svc-superannuation-de.json + dasp-plan.json de)
- P1 answer-first paragraph in .hero-sub (Lead kept).
- P1 key-figures section (65 %, 28 Tage, 5.000 $, 6 Monate, 12 % / Payday Super).
- P1 #how-long first paragraph (28 days from complete application).
- P1 #how-to-apply section (online vs NAT 7204 / NAT 74880, Form 1194, ATO source link).
- P1 FAQ 1 and howTo step 5: overseas transfer only for fund-held super.
- P1 #from-overseas heading (DACH) and second paragraph (ATO-held: AU account or AUD cheque).
- P1 #while-in-australia: start and save before departure.
- P1 MYGOV row 2 + #never-claimed: 6 months since departure + visa ceased; "das ATO nennt keine Frist".
- P1 4 FAQs appended; FAQ 8 question rephrased.
- P2 who-can-claim ABN/employer links; documents TFN link + "kann ... Ausweisdokumente verlangen"; how-much guide link; find-your-fund guide link + WaButton; with-us first-message line; next section -> tax return bridge with Medicare text link ("je nach deinem Anspruch"); GUIDES +2; speakableSchema (name, inLanguage, dateModified, about, citation); howTo step 1 (no other active visa); meta description.
- From dasp-plan de/shared: MYGOV row 1 and row 2 "mygov" cells corrected (S6, online system searches by TFN, one application per account); who-can-claim drops "endgültig" and adds "kein anderes australisches Visum" (S7); "gebührenfrei" replaced by "außer Reichweite von Fondsgebühren und Versicherungsprämien" (not_verified list); FAQ 8 answer: unverified "späterer Visumsantrag hängt nicht daran" removed (S9); extra DE FAQ "Wie bekomme ich meine Super aus Australien zurück?" (now 13 FAQs, FAQPage generated from the same array); serviceSchema "australisches oder deutsches Konto" -> "beim Fonds auch auf ein Konto im Ausland".
- Tones adjusted (how-much pale, documents white) so sections alternate.

## Skipped
- tfn P2 src/lib/wa.ts DE tfn prefill and tfn P2 src/app/(de)/de/blog/data.ts guide title: files outside my ownership.
- abn P2 blog/data.ts note: outside my files, note only.
- dasp-plan S3 (visible steps + delete howToSchema): conflicts with the newer round4 plan, which keeps howToSchema and edits steps 1 and 5; followed round4. The new #how-to-apply section and the extra FAQ cover the steps intent.
- dasp-plan S6 statement "Wir regeln das direkt mit dem ATO": kept, approved wording per brief and round4 keep_unchanged.
- dasp-plan S10 amber label before the guarantee: left the guarantee block untouched (approved wording); the tax-return bridge part of S10 is applied.
- dasp-plan S8 calculator link in #how-much: the DE calculator is a tax refund calculator, not a DASP one; not added.
- dasp-plan open change for DE blog category FAQ ("zwei bis vier Wochen"): blog/data.ts not my file.
- Hero H1s kept ("Den Rest übernehmen wir." on tax-return, plans say keep the H1).

## Facts used (source)
- TFN: apply in Australia with valid work visa, free, no documents, 28 days by post, no second application: ATO TFN application page for foreign passport holders. 28-day declaration window then max rate: ATO payer information and obligations. 45 % without TFN, 15 % to 45,000 $, no tax-free threshold: public/llms.txt Key facts. ATO phone 13 28 61 / +61 2 6216 1111: EN /tfn page (as given in plan).
- ABN: free, usually immediate, up to 28 days if manual: abr.business.gov.au ABN basics. 47 % no-ABN withholding over 75 $ ex GST: llms.txt + ato.gov.au. GST 75,000 $ and rideshare from first trip: ATO. Cancel after statements and debts: business.gov.au.
- Tax return: tax year, tax ready by 14 July, lodge from late July, 31 October, late lodgement, early paper lodgement 50 business days, FTL penalty rule, 10 business days processing, refund to AU account only: ATO (plan facts). WHM rates 2026/27, Medicare 2 % and MES for non-RHCA countries (Germany, Austria, Switzerland): llms.txt (ATO, Services Australia). Addy v Commissioner [2021] HCA 34: plan, case by case wording.
- DASP: 65 % taxable component (taxed and untaxed) for WHM since 1 July 2017; 28 days from completed application; ATO-held super only to AU account or AUD cheque; no time limit named; 6 months since departure + visa ceased transfer; online system free, start before departure; NAT 7204 / NAT 74880; Form 1194 fee; 5,000 $ certified copies "may"; DASP not assessable income: ATO DASP page (updated 24 Aug 2026) and dasp-plan verified facts. 12 % SG and Payday Super: llms.txt.
