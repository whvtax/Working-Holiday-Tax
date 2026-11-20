# Spanish (es) language review, 18 Nov

Reviewer: Spanish (neutral Spanish for Spain and Latin America). Brief: `BRIEF.md` in this folder.

## 1. Strings checked

- Fixed messages: all 43 keys of `docs/engineering/templates-i18n/es.json` against `SOURCE.json` (`en`), paragraph by paragraph (the expenses intake sentence by sentence). Placeholders (`{{1}}`, `{{AMOUNT}}`, `${AMOUNT}`), `*bold*`, emoji positions, `\n` / `\n\n`, numbered lists, links, prices, BSB and account: all identical to the English.
- Button labels in `src/lib/will/channel.ts`: FORM_BUTTON_LABEL, RESIDENCY_BUTTON_LABEL, MEDICARE_BUTTON_LABEL, REVIEW_BUTTON_LABEL (es).
- Free replies: `docs/engineering/language-blocks/es.md` against `en.md`, section by section; `playbook.ts` language parts (only `LANG_NAMES`; no Spanish text); `instant-choice.ts` (it sends `approved-es.ts` for es, so that file was checked too); `svt-fixed-texts.ts` (zh and vi only, nothing in es); legacy es texts in `i18n.ts` (REVIEW_REQUEST_MSG, HANDOFF_APOLOGY_MSG, fu_form_3d/7d, fu_sig_3d/7d: removed messages, fine).
- Forms: all 80 keys of `src/lib/form-i18n/es.ts` against `formStrings.ts` (en); es blocks of `ResidencyStep.tsx`, `ResidencyDeclaration.tsx`, `ResidencyFixPanel.tsx`; `ES_RES` in `src/components/svt/form-residency-copy.ts` against `EN_RES` in `form-brand-svt.tsx`.

Overall the es texts were already accurate in meaning; the changes below fix one misreadable sentence, Spain-only words in a "neutral" text, a gendered opener, a block that was missing many English rules, and a few form strings that added content.

## 2. Changes made

### 2a. `docs/engineering/templates-i18n/es.json` (regenerated with `node scripts/build-template-translations.mjs`)

| Key | Before | After | Why |
|---|---|---|---|
| NO_REFUND_CASES_MSG | "...así que, al contrario, hay impuestos que pagar. Si ese es tu caso o no es una de las cosas que comprobamos en la revisión 😊" | "...y entonces, en vez de una devolución, hay impuestos que pagar. Saber si ese es tu caso es una de las cosas que comprobamos en la revisión 😊" | "Si ese es tu caso o no es una..." reads first as "or it is not one of the things"; "al contrario" was a calque of "instead". |
| MEDICARE_CANT_HELP_MSG | "Vaya, lo siento." | "Lo lamento." | "Vaya" is Spain-flavoured; "Lo lamento" is neutral for "Sorry to hear that". |
| HANDOFF_BUMP_MSG | "Le he insistido al equipo por ti." | "He vuelto a avisar al equipo por ti." | "insistir" sounds pushy toward the team; the English is a neutral "followed up". |
| FORM_RECEIVED_MSG | "...y te escribirá." | "...y te responderá." | "get back to you" = respond. |
| MEDICARE_MSG | "Como no estabas cubierto por Medicare," | "Como no tenías cobertura de Medicare," | Gender-neutral; the old one is masculine only. |
| PAYMENT_RECEIVED_MSG | "Rellena este formulario rápido" | "Completa este formulario breve" | "Rellenar" is Spain usage; "completar" is neutral. "short" = breve, not rápido. |
| PRICE_FLOW_STEPS_TFN, _TFN_ABN, _TFN_FOREIGN, _TFN_ABN_FOREIGN | "2. Rellena un formulario corto" | "2. Completa un formulario breve" | Same word as above in every form message. |
| FOLLOWUP_MSG.fu_form_6h | "¿Ya pudiste rellenar el formulario?" | "¿Ya pudiste completar el formulario?" | Same. |
| RESIDENCY_CHECK_MSG | "lee esta página corta" | "lee esta página breve" | More natural. |
| EXPENSES_INTAKE_MSG | "Solo dime lo que aplique." | "Dime solo lo que corresponda." | "lo que aplique" is an anglicism. |
| _notes | | updated and one note added | Records the above. |

### 2b. `docs/engineering/language-blocks/es.md` (regenerated with `node scripts/build-language-rules.mjs`)

Rewritten so it carries every rule of `en.md` (same structure, same forbidden content), in Spanish where the customer sees the words:
- Section 1: added "never compare the two brands" and the "visa de estudiante" rule from en. Both brands still covered; nothing limits Spanish to one brand.
- Section 2: added from en: answer first, greet on first message only and use the name once, never repeat it; "nosotros" vs "yo"; exclamation marks sparingly and none in complaints; calm with money worries; benefit once ("para que no te pierdas nada a lo que tengas derecho"); after a clear no, one closing line. Removed "excited with excited" (not in en).
- Section 3: added the missing en rows (lodging only after signature, refund with no amount before payment, fee never "revisión gratis / sin riesgo / no reembolsable", supervision phrase, TFN option names, Medicare no steps, DASP never "pronto / más adelante", myGov line "No necesitas iniciar sesión para nada de esto. Nosotros tratamos directamente con la ATO.").
- Section 4: quotes updated to the new first lines (NO_REFUND_CASES_MSG, MEDICARE_CANT_HELP_MSG, MEDICARE_MSG, HANDOFF_BUMP_MSG); all quotes checked against the code. Added the en usage notes (payment received only after a matched screenshot; holding line is the only time promise; lodged confirmation first sentence only when quoted; Medicare line only when it plausibly applies). Fixed a wrong statement: the block said no Spanish one-message price or review texts exist, but `approved-es.ts` has them and `instant-choice.ts` sends price_tfn / price_tfn_abn. Added legitimacy ("Claro."), signedOff, objections and o7 meanings, as en lists them.
- Section 6: added from en: open agent answers with "Claro." never "Sí"; date and day-count promises (was missing entirely); DIY "puedes presentarla tú mismo"; money "never $330 without its label", no IBAN/SWIFT, money message at most one emoji (the block said "none", stricter than en); social proof and no review ask in Will's own words; customers who owe tax; complaints. Kept the card-details rule (it is in the playbook).
- Section 7 and 8: added the 450-character guard note, one emoji, shorter after payment, never invent a fact, handoff choices, holding line only, "¿Eres un bot?" gets no line.
- Section 5: replaced two examples that were not neutral or duplicated others.

### 2c. `src/lib/form-i18n/es.ts`

| Key | Before | After | Why |
|---|---|---|---|
| registeredAgentNo | "Bajo la supervisión de un registered tax agent, n.º" | "Bajo la supervisión de un agente fiscal registrado, n.º" | Mixed English inside Spanish; the block's approved Spanish for the supervision meaning. Still names supervision, no claim. |
| titleTaxStep2 | "¡Ya casi está!" | "¡Ya casi terminas!" | "Ya casi está" is Spain usage. |
| phJob | "p. ej. Farm worker, Barista (en inglés)" | "p. ej. Farm worker, Barista" | "(en inglés)" was added; the English notice already asks for English answers. |
| phCountry | "p. ej. Argentina, Chile, Spain" | "p. ej. Argentina" | One example like the English; "Argentina" is the same word in English and Spanish, so it matches the English-answers rule. |
| uploadSelfie | "Subir selfie con el pasaporte" | "Subir selfie con tu pasaporte en la mano" | "holding" was missing. |
| submitTax | "Enviar la declaración →" | "Enviar declaración de impuestos →" | Sits just under the "Declaración" (declaration) heading; "la declaración" alone could read as "send the declaration". |

## 3. Shared-file changes for another agent (exact)

1. `src/lib/will/channel.ts`, RESIDENCY_BUTTON_LABEL, `es`: current `'Abrir la página'`, corrected `'Test de residencia fiscal'`. Why: English is "Tax residency test"; "Open the page" is a different meaning. 25 characters, the WhatsApp button limit; if too long, `'Test de residencia'`.
2. `src/lib/will/channel.ts`, MEDICARE_BUTTON_LABEL, `es`: current `'Ver el video'`, corrected `'Cómo solicitarla'`. Why: English is "How to apply".
3. `src/lib/will/channel.ts`, FORM_BUTTON_LABEL, `es`: current `'Empezar'`, corrected `'Empieza aquí'`. Why: English is "Start here" (minor).
4. `src/lib/will/approved-es.ts`, the last line of price_tfn, price_tfn_abn, price_tfn_foreign, price_tfn_abn_foreign, price_tfn_review, price_tfn_abn_review (6 places): current `En cuanto pagues, mándame una captura y empezamos.`, corrected `¡Mándanos una captura cuando hayas pagado y empezamos!`. Why: English "Just send a screenshot once paid and we'll get started!" is "us" and has "!"; this is also the exact line of the es PRICE_FLOW_PAYMENT_DETAILS template, so both price paths say the same.
5. `src/components/ui/ResidencyStep.tsx`, `es.warn.read`: current `'Asegúrate de haber leído y entendido cada pregunta y de responder solo por el año fiscal que declaras.'`, corrected `'Asegúrate de haber leído y entendido cada pregunta, y de haber respondido solo para el año fiscal que estás declarando.'`. Why: English is past ("answered"); "por el año" is the wrong preposition.
6. `src/components/ui/ResidencyStep.tsx`, `es.sessionLost`: current `'Tu sesión ha caducado, así que tienes que volver a introducir tus datos. No se ha enviado nada.'`, corrected `'Tu sesión caducó, así que tienes que volver a escribir tus datos. No se envió nada.'`. Why: neutral ("introducir datos" is Spain usage) and identical to the SVT `ES_RES.sessionLost`.
7. `src/components/ui/ResidencyDeclaration.tsx`, `es`: current `confirmP1pre: 'No eres ', confirmP1strong: 'residente fiscal australiano'` and `confirmP2pre: 'No tienes derecho al ', confirmP2strong: 'umbral libre de impuestos de $18.200'`; corrected `confirmP1pre: '', confirmP1strong: 'No eres residente fiscal australiano'` and `confirmP2pre: '', confirmP2strong: 'No tienes derecho al umbral libre de impuestos de $18.200'`. Why: the English puts "not" in bold ("not an Australian tax resident"); the Spanish left the "no" out of the bold.
8. `src/components/svt/form-residency-copy.ts`, `ES_RES.introEmph`: current `'No tiene que ver con tu visa.'`, corrected `'Es algo distinto de tu visa.'`. Why: English "It is separate from your visa."; "no tiene que ver" = "has nothing to do with", stronger than the English.

No change needed: REVIEW_BUTTON_LABEL es, `ResidencyFixPanel.tsx` es, `playbook.ts`, `svt-fixed-texts.ts`, `instant-choice.ts` itself.

## 4. For Jo

- Button labels: in every language (not only Spanish) RESIDENCY_BUTTON_LABEL says "Open the page" and MEDICARE_BUTTON_LABEL says "Watch the video", while the English says "Tax residency test" and "How to apply". Please confirm which meaning you want; items 1 and 2 above follow the English.
- English itself: `en.md` greets with "Hey! 😊 Happy to help." but the locked OPENING_MSG is "Hey! Happy to help😊" (emoji placed differently). The es block follows the code.
- Number format on the residency pages: es shows $18.200, $45.000, $2.462 (period separator). Spain and most of South America read that correctly; Mexico uses a comma ($18,200). If you prefer the English format in every Spanish text, it is a one-line change per number in the shared files. The messages avoid the issue ("5000 km").
- "calificar como residente" (ResidencyStep es) is Latin American usage, understood in Spain; left as is.
- REVIEW_ASK_SHORT_MSG ends with the `{{1}}` link, like the English. If it is ever sent outside the 24h window as a Meta template, Meta rule 6 would need text after the variable.
- Test run: `tsc` clean. Of the three test files, all es checks pass; at the time of my last run two tests failed in other languages (fr: "questionnaire_received" detection; vi: the "not checked by a native speaker" marker in `form-i18n/vi.ts`), both in files being edited by the other reviewers, not by this review.

## 5. Verdict

Spanish is now the same as the English in meaning in all 43 fixed messages, the form and the rules block, in one neutral tú register, with no dashes, no AI mention, no agent claim, no refund or time promise beyond the English, and prices and English terms as in the source. Ready once the 8 shared-file items above are applied (items 1, 2 and 7 matter most; the rest are polish).

## Applied 18 Nov

Applied:
1. channel.ts: RESIDENCY "Test de residencia" (the 25-character version is over Meta's 20), MEDICARE "Cómo solicitarla", FORM "Empieza aquí".
2. approved-es.ts: the screenshot line of all six texts is the price flow's own line "¡Mándanos una captura cuando hayas pagado y empezamos!".
3. ResidencyStep es.warn.read and es.sessionLost; ResidencyDeclaration es: "No eres residente fiscal australiano" and "No tienes derecho al umbral..." fully bold; ES_RES.introEmph "Es algo distinto de tu visa."
4. Numbers (Jo, decision 2): $18,200, $45,000, $2,462 exactly as the English on every residency page.
5. Greeting "¡Hola, Ana!" with the comma (withGreetingName, test); es.md: name once, no name when none, Jo's emoji rule, prices with nothing added (no "AUD").
6. Culture items: invalidAuPhone "teléfono", payment-proof "falta una parte. Avísame", "ir completando el formulario".
7. Older form review (form-i18n-review/es.md S7): quizIntro "deberían aplicarse".

Not applied: nothing else open in this report.
Checks after applying: `npx tsc --noEmit -p .` clean; full `npx jest --forceExit` passing except the two security suites that need `.env.example`.
