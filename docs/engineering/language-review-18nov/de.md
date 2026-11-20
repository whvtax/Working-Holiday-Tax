# German (de) language review, 18 Nov

Reviewer: native German. Standard: identical in meaning to the English, du throughout, natural WhatsApp German, no dashes, no AI words, no agent title, no extra promises.

## 1. Strings checked

- Fixed messages: all 43 keys of `docs/engineering/templates-i18n/de.json` against `SOURCE.json` (en), and the generated `src/lib/will/template-translations.generated.ts` (rebuilt, identical to the JSON).
- Button labels in `src/lib/will/channel.ts`: FORM, RESIDENCY, MEDICARE, REVIEW.
- Language block `docs/engineering/language-blocks/de.md` against `en.md`, section by section. Every approved phrase quoted in the block was checked with grep against the code.
- German parts of `playbook.ts` (agent wording section, residency follow-up), `instant-choice.ts` (MYGOV_REASSURANCE.de, PRICE_ML.de, REVIEW_ML.de), `svt-fixed-texts.ts` (no German, correct), legacy German tables in `i18n.ts` (REVIEW_REQUEST_MSG, HANDOFF_APOLOGY_MSG, LODGED_NEUTRAL_MSG, removed follow-ups: fine, no change needed).
- Forms: all 205 en/de pairs in `src/lib/formStrings.ts`; the de blocks in `ResidencyStep.tsx`, `ResidencyDeclaration.tsx`, `ResidencyFixPanel.tsx`; `DE_RES` in `src/components/svt/form-residency-copy.ts` against `EN_RES` in `form-brand-svt.tsx`.

Overall the fixed messages were already very good: placeholders, links, emoji positions, line breaks, prices, BSB and account number all match the English; TFN/ABN/ATO/Medicare/myGov/BSB/DASP are kept in English; no dashes; no agent title; no extra promises.

## 2. Changes made

### templates-i18n/de.json (then `node scripts/build-template-translations.mjs`)

| Key | Before | After | Why |
|---|---|---|---|
| HANDOFF_BUMP_MSG | "Entschuldige die Wartezeit. Ich habe es für dich nochmal beim Team angestoßen." | "Entschuldige die Wartezeit. Ich habe für dich beim Team nachgehakt." | "nachhaken" is the exact, natural German for "followed up"; "angestoßen" reads as slang and adds "nochmal" (again), which the English does not say. |
| OWN_ACCOUNT_MSG | "...und deine persönlichen Daten zeigen." | "...und deine persönlichen Daten enthalten." | A bank account does not "zeigen" data in German; "enthalten" is the idiomatic equivalent of "show". |
| ESTIMATE_INVOICE_MSG, ESTIMATE_PAYABLE_MSG | "...zur finalen Prüfung und danach zur Unterschrift an dich." | "...zur finalen Prüfung und danach zur Unterschrift." | "an dich" added a fact the English leaves open (it says the customer does the final review). Now neutral like the English. |
| EXPENSES_INTAKE_MSG (working from home line) | "Homeoffice: ein Tagebuch oder Stundenzettel mit den Daten und Stunden." | "Homeoffice: ein Arbeitstagebuch oder Stundenzettel mit Datum und Stunden." | "Daten" is ambiguous (data or dates); "Tagebuch" alone sounds like a personal diary. |

A note was added to `_notes` recording these four changes.

### language-blocks/de.md (then `node scripts/build-language-rules.mjs`)

- Fixed a quote that did not match the code: PRE_PAYMENT_CHECK_MSG.de was quoted as "Überlass das ruhig uns." but the code says "..., also überlass das ruhig uns." Now quotes "das ist auf jeden Fall eines der vielen Dinge, die wir prüfen" and "überlass das ruhig uns".
- HANDOFF_BUMP_MSG quote updated to the new text; added "the holding line is the only time promise allowed" (as en.md).
- Added rules that en.md has and the German block lacked:
  - Section 2: name once, never repeated; "wir" vs "ich"; exclamation marks sparingly, none in complaints; match their length; one warm closing line after a no; no slang or chat shorthand (German examples); benefit stated once, no pressure; at most one question.
  - Section 4: legitimacy answers open with "Natürlich." (never "Ja"/"Absolut"), supervision phrase, client agreement link, never a TPB number; lodged message: only its first sentence in a free reply; PAYMENT_RECEIVED_MSG.de only after the screenshot is matched; DOCUMENTS_RECEIVED_MSG.de; EXPENSES_INTAKE_MSG.de sent as written.
  - Section 6: date and day-count promises (was missing entirely), with German examples; DIY steps widened (no "du kannst sie selbst einreichen", no Medicare exemption steps); social proof and no own-words Google review ask; never $330 without its label, no other currency, no IBAN/SWIFT; customers who owe tax; complaints wording; bullet rule now "unless the customer asked for steps", as in en.md.
  - Section 7: approved texts not padded or shortened and not counted toward 450 characters; never restate the question or repeat; shorter after payment.
  - Section 8: never invent facts; what goes to a handoff; "Bist du ein Bot?" gets no line (playbook rule 8).
- Every approved phrase in section 4 now matches the code exactly (checked by grep). Nothing in the block limits German to one brand.

Checks: `npx tsc --noEmit -p .` clean; the three required jest suites pass (269 tests); also own-account-27oct, w2-language-3nov and svt-all-languages-18nov pass.

## 3. Shared-file changes for another agent (not applied)

1. `src/lib/will/channel.ts`, RESIDENCY_BUTTON_LABEL.de
   - Current: `'Seite öffnen'`
   - Corrected: `'Ansässigkeitstest'` (17 characters)
   - Why: English is "Tax residency test"; "Seite öffnen" (open page) is a different meaning. (The other seven languages also say "open the page"; Jo may want them all aligned.)
2. `src/lib/will/channel.ts`, MEDICARE_BUTTON_LABEL.de
   - Current: `'Video ansehen'`
   - Corrected: `'So beantragst du es'` (19 characters)
   - Why: English is "How to apply". Same note on the other languages.
3. `src/lib/will/channel.ts`, FORM_BUTTON_LABEL.de
   - Current: `'Jetzt starten'`
   - Corrected: `'Hier starten'`
   - Why: English is "Start here"; "Jetzt" (now) adds urgency the English does not have. Low priority.
4. `src/lib/will/instant-choice.ts`, REVIEW_ML.de (line 228)
   - Current: `` (amount) => `Da deine Steuererklärung schon eingereicht wurde, ist das eine Prüfung der bestehenden Erklärung und keine neue. Die Gebühr beträgt $${amount} für die Prüfung selbst und ist unabhängig vom Ergebnis gleich.` ``
   - Corrected: `` (amount) => `Kein Problem, wir können auch eine bereits eingereichte Steuererklärung prüfen.\n\nDa deine Steuererklärung schon eingereicht wurde, ist das eine Prüfung der bestehenden Erklärung und keine neue. Die Gebühr beträgt $${amount} für die Prüfung selbst${amount === 440 ? ' (inkl. GST)' : ''} und ist unabhängig vom Ergebnis gleich.${amount === 330 ? ' Sie deckt auch die Einreichung der korrigierten Steuererklärung ab, falls eine nötig ist.' : ''}` ``
   - Why: English price_tfn_review / price_tfn_abn_review have the opening line "No problem, we can review a return you've already lodged.", "(GST included)" on $440, and "It also covers lodging the amended return, if one is needed." on $330. German leaves all three out. The block quote "Da deine Steuererklärung schon eingereicht wurde" stays valid.
5. `src/lib/will/instant-choice.ts`, PRICE_ML.de.abnBody
   - Current: `'Wir prüfen deine steuerliche Ansässigkeit, Medicare und deine Abzüge, erstellen eine Aufstellung für deine ABN-Einnahmen und -Ausgaben und reichen dann deine Steuererklärung ein, damit du nichts verpasst, was dir zusteht.'`
   - Corrected: `'Wir prüfen deine steuerliche Ansässigkeit, Medicare und deine Abzüge, erstellen eine Aufstellung für deine ABN-Einnahmen und -Ausgaben, dann erstellen wir deine Steuererklärung und reichen sie ein, damit du nichts verpasst, was dir zusteht.'`
   - Why: English says "then prepare and lodge your tax return"; German dropped "prepare".
6. `src/lib/will/instant-choice.ts`, PRICE_ML.de.guarantee
   - Current: `'... Gibt es keine Rückerstattung, fällt die volle Gebühr an.'`
   - Corrected: `'... Gibt es keine Rückerstattung, fällt unsere volle Gebühr an.'`
   - Why: English "our full fee applies"; matches PRICE_FLOW_STEPS_TFN in the templates word for word.
7. `src/lib/will/instant-choice.ts`, MYGOV_REASSURANCE.de
   - Current: `'... und eine eventuelle Rückzahlung geht direkt auf dein australisches Bankkonto.'`
   - Corrected: `'... und eine mögliche Rückerstattung geht direkt auf dein australisches Bankkonto.'`
   - Why: "Rückzahlung" can mean a repayment by the customer; every other German text uses "Rückerstattung". If applied, the exception "(except inside the approved myGov sentence)" in de.md section 3 can be dropped.
8. `src/lib/formStrings.ts`, checkResidency.de and checkResidencyNote.de
   - Current: `'Weiter zur Steuerresidenz →'`, `'Letzter Schritt: deine Steuerresidenz, danach kannst du absenden.'`
   - Corrected: `'Weiter zur steuerlichen Ansässigkeit →'`, `'Letzter Schritt: deine steuerliche Ansässigkeit, danach kannst du absenden.'`
   - Why: "Steuerresidenz" is an anglicism; the messages, the block and the residency labels all say "steuerlich ansässig / steuerliche Ansässigkeit". Same in `ResidencyStep.tsx` de.intro (`'Die steuerliche Ansässigkeit bestimmt, welche Steuersätze für dein Einkommen gelten.'`) and de.warn.notePre (`'Deine steuerliche Ansässigkeit ist '`), in `ResidencyDeclaration.tsx` and `form-residency-copy.ts` DE_RES pickOne (`'Bitte wähle deinen steuerlichen Status'`), and DE_RES.intro (as ResidencyStep). The title accent "Steuerresidenz" may stay if "steuerliche Ansässigkeit" breaks the one-line title on phones.
9. `src/components/svt/form-residency-copy.ts`, DE_RES.introEmph
   - Current: `'Sie hat nichts mit deinem Visum zu tun.'`
   - Corrected: `'Sie ist unabhängig von deinem Visum.'`
   - Why: English "It is separate from your visa." German "has nothing to do with" is stronger than the English.
10. `src/lib/formStrings.ts`, registeredAgentNo.de
    - Current: `'Unter der Aufsicht eines registrierten Tax Agents, Nr.'`
    - Corrected: `'Aufsichtführender registrierter Tax Agent, Nr.'`
    - Why: English is a label ("Supervising registered tax agent no."), not a sentence; also keeps "Tax Agent" uninflected as in the approved phrases.
11. `src/lib/will/instant-choice.ts`, PRICE_ML.de.screenshot (optional, consistency)
    - Current: `'Schick mir einfach einen Screenshot, sobald du bezahlt hast, und wir legen los!'`
    - Corrected: `'Schick uns einfach einen Screenshot, sobald du bezahlt hast, und wir legen los!'`
    - Why: the template PRICE_FLOW_PAYMENT_DETAILS says "Schick uns"; the English is neutral ("Just send a screenshot").

## 4. For Jo

- Bank label: the German one-message price (instant-choice.ts BANK) says "Account: 81049952", while the German price-flow template says "Konto: 81049952". Both are understandable; pick one if you want them the same.
- Button labels: all eight non-English languages say "open the page" and "watch the video" where English says "Tax residency test" and "How to apply". I proposed German fixes (items 1 and 2); the same decision applies to every language.
- Form placeholders otherIncomePh and phJob add "(bitte auf Englisch)". The English does not have it, but every language does (the answers must be in English). I left it; it is helpful, but strictly an addition.
- RESIDENCY_CHECK_MSG.de uses the English link `/y8vwp4bf7`, as the English does. The old German text used `/de/y8vwp4bf7`; the button regex accepts both. Swap if you want German readers to land on the German page.
- REVIEW_ML.de and the Japanese version are sent with a greeting ("Hey! 😊 Gerne helfe ich dir.") that the English review message does not have (code in reviewMessageIn). Not a language error; a structural difference to be aware of.

## 5. Verdict

German is in good shape. The fixed messages were already faithful; four small wording fixes made them more exact and natural. The language block now carries the same rules and forbidden content as the English block (date promises, social proof, owe-tax, legitimacy opening and others were missing) and every approved phrase it quotes matches the code. Remaining gaps are in shared files (mainly the review-of-lodged-return message missing three English sentences, and the residency/Medicare button labels), listed above for another agent.

## Applied 18 Nov

Applied (another agent, from section 3 and Jo's decisions of 18 Nov):
1. `channel.ts`: RESIDENCY_BUTTON_LABEL.de `Ansässigkeitstest`, MEDICARE_BUTTON_LABEL.de `So beantragst du es`, FORM_BUTTON_LABEL.de `Hier starten`; REVIEW_BUTTON_LABEL.de `Bewertung abgeben` ("Leave a review"; test updated).
2. `instant-choice.ts` REVIEW_ML.de: opening line, "(inkl. GST)" on $440, the amended-return sentence on $330 (Jo, decision 4).
3. PRICE_ML.de: abnBody "dann erstellen wir deine Steuererklärung und reichen sie ein"; guarantee "unsere volle Gebühr" (same as PRICE_FLOW_STEPS_TFN); screenshot "Schick uns"; the greeting is now the approved opening's greeting line ("Hey Anna! Gerne helfe ich dir😊").
4. MYGOV_REASSURANCE.de "mögliche Rückerstattung"; the "Rückzahlung" exception removed from de.md.
5. `formStrings.ts` checkResidency.de and checkResidencyNote.de, `ResidencyStep.tsx` de.intro and warn.notePre, `ResidencyDeclaration.tsx` and DE_RES pickOne ("Bitte wähle deinen steuerlichen Status"), DE_RES.intro: "steuerliche Ansässigkeit". The title accent "Steuerresidenz" stays (one-line title).
6. DE_RES.introEmph "Sie ist unabhängig von deinem Visum."; registeredAgentNo.de "Aufsichtführender registrierter Tax Agent, Nr."
7. Every dollar amount on the residency pages and the declaration is written as the English ("$18,200", "$45,000", "$2,462").
8. de.md: name once, complaint rule (no new greeting, no name), Jo's emoji rule, letter closings, date and amount format; NO_REFUND_CASES_MSG "klären" (culture de7).

Not applied: the "Account" / "Konto" label difference and the "(bitte auf Englisch)" placeholders (for Jo, no meaning error); the German residency link (`localizeOwnLinks` already sends the German page); the opening "Ich helfe dir gerne" (culture de8, optional, needs the Meta template re-entered).
Checks after applying: `npx tsc --noEmit -p .` clean; full `npx jest --forceExit` passing except the two security suites that need `.env.example`.
