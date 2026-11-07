# Fix log ES (round 4, service pages)

Context: an earlier agent applied most of the four ES plans before it was stopped. Each plan change was compared
with the current file. Changes already present were left untouched (no duplicated sections, FAQs or links).

## Already present when checked (applied by the earlier agent, verified, not repeated)

### svc-tfn-es.json (`src/app/(es)/es/tfn/page.tsx`)
All P1 and P2 changes present: absolute title, description, H1 kicker, answer-first lede, dated figures block
(Gratis / 28 días / Día 29 / 45 % / 15 %) plus tax return line, new "Cómo sacar el TFN" section (HOW_STEPS,
official ATO link, WHO_CAN_APPLY panels, guide link, inline WaButton), fail-title eyebrow and intro, 10 FAQs,
webPageLd (name, description, dateModified, citation), "Cuando ya tienes el TFN" LinkRows, WHAT_WE_DO[4] body,
FAILURE_POINTS[2], 7 guides with new title, guarantee moved after next-title with lead-in sentence, flagship link
in next-title, sources line under the FAQ, CTA paragraph, serviceLd description, keywords and OG/Twitter titles.

### svc-abn-es.json (`src/app/(es)/es/abn/page.tsx`)
All present: description (plus OG description), answer-first lede, how-to section with HOW_TO steps, notice and
WaButton, "El ABN en cifras" block, 3 new FAQs first, rewritten employer FAQ, ABR sanctions paragraph, superannuation
link, flagship link in next-title, 6 guides with new title, FAQ order and heading, webPageLd name/description/
dateModified, hero CTA "Pregúntanos si necesitas un ABN", keywords.

### svc-tax-return-es.json (flagship `devolucion-impuestos-australia/page.tsx` and `tax-return/page.tsx`)
Flagship: title/description/OG titles, lede plus "Actualizado" line, webPageLd dateModified and citation, rates
table plus KEY_FIGURES and footnote with links, Chile section with mid-page WhatsApp CTA, deadline paragraph moved
into new abroad-title section, DIY myTax steps with sources, 3 new FAQs, FAQ order (late lodgement 1st, refund
time 5th), duplicate "¿Qué no cubren?" FAQ and palePanel removed, 5 new guides, Medicare and expenses links,
keywords. Service page: title, description, lede, "Respondemos en aproximadamente una hora en horario laboral."
(hero and CTA, kept as instructed), section order, home-title section, figures-title block, TFN/Medicare/expenses
links, FAQ "¿Me atienden en español?" and "¿Cuánto cuesta?", reworded country FAQ, guides, dateModified, keywords.

### svc-superannuation-es.json + round3 dasp-plan.json ES (`superannuation/page.tsx`)
All present: description, keywords, two-paragraph lede, hero hint to #how-to-claim, key-figures dl (9 rows, 12 %
row unlinked as the plan says), MYGOV rows 1-2, statement, who-can-claim paragraphs, how-to-claim ol, howToSchema
removed, how-much paragraph and small print (65 % on taxed and untaxed), documents, how-long, find-your-fund,
from-overseas, while-in-australia, never-claimed, with-us guarantee restored verbatim with "Si también hacemos tu
tax return:" label, start prompt, forest CTA, FAQs 0/3/5/7 rewritten and 5 inserted, 8 guides, merged "Lo
siguiente" tax return section with Medicare inline link, serviceSchema description, speakable selectors.

## Applied in this pass
- ABN (P1 title): plan title "ABN en Australia: cómo sacarlo con visa 462 o 417" plus the layout template
  "%s | Working Holiday Tax" (src/app/(es)/es/layout.tsx) gave 71 characters. Changed to
  "ABN en Australia: cómo sacarlo" = 52 characters with the suffix (lead's 60-character cap). Head term first and
  the "cómo sacar" verb kept; visa numbers stay in the description, H1 kicker and lede.
- Medicare conditional wording (rule): "con esos pasaportes se puede pedir la exención" read as automatic
  entitlement. Now "puedes tener derecho a pedir la exención ... según tu situación / Depende de tu situación" in
  tax-return FROM_HOME row, flagship KEY_FIGURES Medicare row and flagship Medicare FAQ.

## Skipped (why)
- Tax return plan, FAQ "¿Tengo tax-free threshold...?": sentence "Por eso no conviene marcarlo en la Tax File
  Number Declaration." left out (personal advice; lead instruction). Confirmed absent.
- Tax return plan, reworded country FAQ: plan text said "muchos de los tax returns que presentamos"; kept as
  "que preparamos" (rule: no "presentamos" lodging lines). Sign-off sentence used for the lodging part.
- TFN plan P2 `src/lib/wa.ts` ES.tfn prefilled message: outside the files this fixer owns. Not edited; flag for
  the lead if still wanted.
- ABN plan, "TFN" link inside step 02: Steps bodies are plain strings, so the /es/tfn link sits in the how-to
  intro paragraph instead (already present).
- /es/tax-return title "Tax return Australia en español: visa 462 y 417" is 69 characters with the suffix. Not
  changed: plan title, no cap given for this page. Flag for the lead.

## Facts used (source)
- TFN free, 28 days, 45 % without TFN after the 28-day window unless declared as applied, 15 % WHM to 45,000 AUD
  from 1 July 2026: ATO TFN application page (22 Jun 2026) and TFN declaration payer obligations; llms.txt.
- ABN free, 11 digits, 47 % no-ABN withholding, GST 75,000 AUD and rideshare, 28-day update, ~20 business days on
  review, ineligible-ABN penalties: abr.gov.au, business.gov.au, ATO (as cited in svc-abn-es.json).
- WHM rates 15/30/37/45 %, no tax-free threshold, 31 Oct deadline, 10 / 14 / 50 business days, Australian account
  only for refunds, Chile and other nationalities on resident rates if tax resident: ATO pages cited in
  svc-tax-return-es.json.
- DASP 65 % of taxable component (taxed and untaxed) since 1 July 2017, 35/45 % others, paid within 28 days of a
  complete application, ATO-held super only to an Australian account or by cheque, no time limit, 6 months to ATO,
  5,000 AUD paper Certification of Immigration Status, super 12 %: round3 dasp-plan.json verified facts and ATO.

## Verification
- `npx tsc --noEmit -p .`: no errors.
- `npx jest __tests__/wht-copy-compliance-6-languages.test.ts`: 3/3 passed. Related tests (page-photo-priority,
  new-locales-sitemap, locale-blog): 42/42 passed. No test imports these page files directly.
- U+2013, U+2014, U+2015 and U+00A0: none in the five ES files.
