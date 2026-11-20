# Italian (it) language review, 18 Nov

Reviewer: native Italian reviewer (agent), following BRIEF.md.

## 1. Strings checked

- Fixed messages: all 43 keys of `docs/engineering/templates-i18n/it.json` against `SOURCE.json` (English), and the Italian column of `src/lib/will/template-translations.generated.ts` after regenerating it.
- Button labels in `src/lib/will/channel.ts`: FORM_BUTTON_LABEL, RESIDENCY_BUTTON_LABEL, MEDICARE_BUTTON_LABEL, REVIEW_BUTTON_LABEL (`it`).
- Free replies: `docs/engineering/language-blocks/it.md` against `en.md`, section by section; the language parts of `playbook.ts` (only LANG_NAMES and the generated block are used, no Italian text in the file); `instant-choice.ts` (uses `approved-it.ts`, which was also checked against the English `APPROVED.price_*` texts); `svt-fixed-texts.ts` (no Italian entries); Italian literals in `i18n.ts` (REVIEW_REQUEST_MSG, retired HANDOFF_APOLOGY_MSG and fu_form_3d/7d, fu_sig_3d/7d) and `account-name.ts`.
- Forms: all 87 keys in `src/lib/form-i18n/it.ts` against the English in `formStrings.ts`; `ResidencyStep.tsx` (`it` block), `ResidencyDeclaration.tsx` (`it` block), `ResidencyFixPanel.tsx` (`it`), `src/components/svt/form-residency-copy.ts` (IT_RES) against EN_RES in `form-brand-svt.tsx`.

Checked for: same meaning as English, nothing added or left out, "tu" throughout, no dashes, no AI or bot wording, no agent title claim, no refund promise or extra time promise, prices only as in English, TFN/ABN/ATO/Medicare/myGov/BSB/DASP kept in English, placeholders, links, emoji and line breaks identical.

## 2. Changes made

### templates-i18n/it.json (then `node scripts/build-template-translations.mjs`)

| Key | Before | After | Why |
|---|---|---|---|
| PRICE_FLOW_STEPS_TFN | "...si applica la nostra tariffa completa." | "...si applica la nostra tariffa piena." | Same words as the guarantee in `approved-it.ts`, so a customer sees one guarantee wording. `policy-guard.ts` GUARANTEE_DIFFERENCE recognises "tariffa piena" but not "tariffa completa". |
| NO_REFUND_CASES_MSG | "...e quindi ci sono tasse da pagare. Se questo vale anche per te è una delle cose che controlliamo nella revisione 😊" | "...e quindi ci sono invece tasse da pagare. Capire se è il tuo caso è una delle cose che controlliamo nella revisione 😊" | "instead" was missing; "Se questo vale anche per te" means "if this also applies to you", not "whether that's the case for you". |
| LODGED_CONFIRMATION_MSG | "...sul tuo conto entro 14 giorni lavorativi." | "...sul tuo conto bancario entro 14 giorni lavorativi." | English says "bank account". |
| EXPENSES_INTAKE_MSG | "Per cosa hai speso per lavoro?" | "Quali spese hai avuto per lavoro?" | The old question is not idiomatic Italian; same meaning. |

Two notes explaining these were added to `_notes`. Everything else in the file was already identical in meaning to the English.

### language-blocks/it.md (then `node scripts/build-language-rules.mjs`)

Rewritten to follow `en.md` section by section. Before, the Italian block had gaps and one contradiction:

- Section 2: the first greeting was "Ciao! Grazie per avermi scritto.", which differs from the approved opening; now the approved opening "Ciao! Ti aiuto volentieri😊", first name once, never repeated. Added from en.md: "noi" for the business and "io" for Will's own actions, exclamation marks sparingly and none in complaints, calm with anxious readers, match length, benefit given once, one warm line after a clear no. The ban on English words now lets through the terms in section 3 and the words the fixed texts already use (team, screenshot, link, email, logbook). Before, the fixed texts broke the block's own rule.
- Section 3: added the missing rows for lodging (only after signature), fee (no "controllo gratuito", "senza rischi", "non rimborsabile"), agent (the approved meaning "operiamo sotto la supervisione di un registered tax agent"), Medicare (no steps, no "riprova"), DASP (no "presto", "più avanti", no price) and the myGov reassurance. Before, the block pointed to "the reassurance in section 4", and that text did not exist.
- Section 4: the NO_REFUND_CASES_MSG quote now matches the new code text. Added the usage conditions from en.md: PAYMENT_RECEIVED only after a matched screenshot, HANDOFF_HOLDING is the only time promise, LODGED_CONFIRMATION first sentence only in Will's own reply, the review ask is sent only by the system, MEDICARE_MSG only when it plausibly applies. Also added the objections list and the Italian meaning for legitimacy, AGENT_PHRASES.signedOff and myGov. All first-line quotes were checked against `template-translations.generated.ts` and `approved-messages.ts` and match exactly.
- Section 5: now the same eight free phrases as en.md, in Italian.
- Section 6: added what was missing from en.md: "Certo." to open agent answers, the date and day-count list with the only allowed 14-day sentences, myGov and Medicare DIY steps, bullet lists only when steps are asked for, the money rule ($330 never without its label, no other currency, no conversion, no IBAN or SWIFT), social proof, the full list of forbidden words (added automazione, sistema, software, IA), customers who owe tax, and complaints.
- Sections 7 and 8: now follow en.md, with greeting on its own line, no padding of approved texts, no repeating, shorter after payment, never inventing facts, the handoff cases, and "Sei un bot?" going to a person.
- Nothing in the block limits it to one brand. It applies to WHT and SVT, with the brand swap described in section 1.

### form-i18n/it.ts

No change needed. Every string matches the English in meaning. I tried updating the header comment to say a native check was done, but `form-nine-languages-18nov.test.ts` requires the exact line "written by an agent, not checked by a native speaker (18 Nov 2026)", so I restored it (see section 4).

## 3. Shared-file changes for another agent

| File | Key / line | Current text | Corrected text | Why |
|---|---|---|---|---|
| src/lib/will/channel.ts | RESIDENCY_BUTTON_LABEL.it | 'Apri la pagina' | 'Test di residenza' | English is 'Tax residency test'; "Open the page" is a different meaning. 17 characters, under the 20 limit ("Test residenza fiscale" would be 22). |
| src/lib/will/channel.ts | MEDICARE_BUTTON_LABEL.it | 'Guarda il video' | 'Come fare domanda' | English is 'How to apply'. 17 characters. |
| src/lib/will/channel.ts | FORM_BUTTON_LABEL.it | 'Inizia' | 'Inizia qui' | English is 'Start here'. 10 characters. (Minor.) |
| src/lib/will/channel.ts | REVIEW_BUTTON_LABEL.it | 'Scrivi recensione' | no change | 'Lascia una recensione' is 21 characters, over the limit; the current label is fine. |
| src/lib/will/approved-it.ts | price_tfn_review | 'La tariffa copre anche la presentazione della dichiarazione corretta, se serve.' | 'Copre anche la presentazione della dichiarazione modificata, se serve.' | English "the amended return". "corretta" also reads as "the correct return". |
| src/lib/will/approved-it.ts | header comment, line 10 | 'Italian wording written by an agent acting as reviewer. Not checked by a native speaker.' | 'Italian wording written by an agent acting as reviewer. Checked in the Italian language review, 18 Nov (docs/engineering/language-review-18nov/it.md).' | The texts were checked against the English in this review and match in meaning. Optional. |
| src/components/ui/ResidencyDeclaration.tsx | COPY.it.confirmYes | 'Sì, presenta come WHM' | 'Sì, presentala come WHM' | English 'Yes, lodge me as a WHM'. Without an object the Italian is incomplete; "presentala" (the return) reads naturally. |
| src/lib/will/account-name.ts | ACCOUNT_NAME_MSG.it | 'Il nome del conto è ${ACCOUNT_NAME}.' | 'L'intestatario del conto è ${ACCOUNT_NAME}.' | "nome del conto" is a calque. Italian banks say "intestatario". Same meaning as "The account name is". |

Everything else checked in shared files is correct and needs no change: the `it` blocks of ResidencyStep.tsx, ResidencyDeclaration.tsx (apart from confirmYes), ResidencyFixPanel.tsx, IT_RES in form-residency-copy.ts, the other approved-it.ts texts, and REVIEW_REQUEST_MSG.it in i18n.ts.

## 4. For Jo

- `PRICE_FLOW_PAYMENT_DETAILS` translates the labels ("Conto", "Importo"), like `approved-it.ts` and `account-name.ts` ("Conto"). The numbers are unchanged. If bank labels must stay in English, change them in all three places.
- `form-i18n/it.ts` adds "(in inglese)" to the job and country placeholders and uses Italian sample numbers (+39). This does not change the meaning: it repeats the form's own notice that answers must be in English. I left it in.
- `REVIEW_ASK_SHORT_MSG` ends with the `{{1}}` variable, as in the English. Meta rejects a template body that ends with a variable. This is already noted in it.json `_notes`.
- The form test requires each new language file to say "not checked by a native speaker". Now that Italian has been reviewed, the test (or that wording) may need updating.
- Test status: `npx tsc --noEmit -p .` is clean. In the three test files, every Italian test passes (267 of 269 pass in total). The two failures are not in Italian files: "detection of our own messages works in every language › fr", and "each new block says it was not checked by a native speaker", which fails on `src/lib/form-i18n/es.ts` because its header was changed by the es review running in parallel.

## 5. Verdict

The Italian is in good shape. The fixed messages, forms and residency steps match the English in meaning, use "tu" throughout, have no dashes, and make no agent, refund or time claims beyond the English. Four small template fixes were made, one of which aligns the guarantee wording with the policy guard. The Italian free-reply rules now match the English block. Three button labels (residency, Medicare, form) and four small shared-file wordings are listed above for another agent to apply.

## Applied 18 Nov

Applied:
1. channel.ts: RESIDENCY "Test di residenza", MEDICARE "Come fare domanda", FORM "Inizia qui"; REVIEW unchanged (21 characters is over the limit).
2. approved-it.ts: "dichiarazione modificata"; screenshot line as in the price flow; header note added (the "not checked by a native speaker" line stays).
3. ResidencyDeclaration it.confirmYes "Sì, presentala come WHM"; account-name.ts "L'intestatario del conto è".
4. Older form review leftovers: titleLead "Confermiamo la tua", yearNote and warn.read "per cui presenti la dichiarazione", IT_RES.introEmph "È una cosa distinta dal tuo visto."
5. it.md: no "Tranquillo/a" (gendered), name once, Jo's emoji rule; HANDOFF_HOLDING_MSG with a colon (culture it10) and its quote.
6. AGENT_PHRASES.it (supervision, signed off, legitimacy) in the code, same as the block.

Not applied: the form test still requires the "not checked by a native speaker" line (Jo: agent reviews are not native checks), so it stays.
Checks after applying: `npx tsc --noEmit -p .` clean; full `npx jest --forceExit` passing except the two security suites that need `.env.example`.
