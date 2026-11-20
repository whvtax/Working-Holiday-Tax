# German review of the tax form (18 Nov 2026)

Scope: every German string a customer sees in the tax form flow, for both brands, checked against its English original. This was a read-only review: no source file was changed, because the German strings sit in files shared with other languages. Every fix below is a suggestion for whoever edits those files.

**Verdict: ready after fixes.** Nothing breaks a hard rule. Two problems should be fixed before the new lines go live:

- The residency test translates "ongoing work" as "feste Arbeit" (a permanent job). That changes the question the customer answers (H1).
- The two consent lines are not faithful: "read" was dropped from one, and the other has no object (H2, H3).

The terminology finding (T1) is a decision for the owner. Everything else is polish.

## Strings checked: about 325

| Where | Count |
|---|---|
| `src/lib/formStrings.ts`, `de` values (all keys, tax, super, TFN and ABN forms) | 207 |
| `src/components/ui/ResidencyStep.tsx`, `de` block (WHT residency step) | 44 |
| `src/components/svt/form-residency-copy.ts`, `DE_RES` (SVT residency step) | 21 |
| `src/components/ui/ResidencyDeclaration.tsx`, `de` block | 15 |
| `src/components/ui/ResidencyFixPanel.tsx`, `de` | 12 |
| `src/lib/submit-tax-form.ts`, `FIELD_LABELS.*.de` | 8 |
| `src/components/ui/FormStepper.tsx`, `STEPS.de` and `OF.de` | 4 |
| `src/components/ui/LinkAfterPayment.tsx`, `de` | 4 |
| Page titles (`src/app/(de)/de/start`, `de/y8vwp4bf7`, `de/rh84sez58`, SVT `de/jhd7hp9xd` and `w3rp42fav`), `FORM_LANG_NAMES.de`, `GoogleReviewsBadge` `de` | about 10 |

`src/lib/form-i18n/index.ts` holds no German. German falls through from there to `formStrings[key].de`. `FormLanguageToggle.tsx` has no German text of its own; its label comes from `langPicker` ("Sprache").

### Confirmed across all of them

- **du:** used throughout, with no leftover "Sie/Ihr" addressing the customer.
- **Terms in English:** TFN, ABN, ATO, BSB, Medicare, Low Income Tax Offset, Working Holiday Maker and Tax File Number stay in English.
- **Numbers:** all unchanged. The amounts are $18.200, $45.000, $2.462, $700, 15 %, 4 MB, 10 Belege, 15 Minuten, 24 Stunden, 6 Monate, and TFN 8 oder 9 Ziffern. They use German digit grouping, which is correct, and the $ stays in front as on the English form.
- **Placeholders:** intact. `{n}`, `{max}`, `{name}`, `{reason}`, `{link}`, `{ca}`, `{pp}`, the `\n\n` in `quizIntro`, and `${s}`/`${t}` in `OF.de` are all there.
- **Dashes:** no em dashes or en dashes.
- **AI:** no mention of AI, KI or bots.
- **Steuerberater:** no "Steuerberater" anywhere. The seal alt text says "Unter der Aufsicht eines registrierten Tax Agent(s), Nr." and never says the business itself is registered.
- **Spelling:** umlauts and ß are correct everywhere (Straße, Großbritannien, Datenschutzerklärung).

## H. Fix before going live (meaning or legal faithfulness)

| # | File, line / key | Current | Corrected | Why |
|---|---|---|---|---|
| H1 | `ResidencyStep.tsx` l.109, `de.questions[3]` | Du hast eine feste Arbeit in Australien | Du hast eine laufende Beschäftigung in Australien | This is a residency test question. EN says "ongoing work"; "feste Arbeit" means a permanent job, which is a stricter test. Customers with continuing casual or farm work would wrongly answer No. |
| H1b | `ResidencyStep.tsx` l.98, `de.conditions[3]` | ...zum Beispiel ein Zuhause, eine feste Arbeit oder persönliche Beziehungen. | ...zum Beispiel ein Zuhause, eine laufende Beschäftigung oder persönliche Beziehungen. | Same as H1. EN says "ongoing employment". |
| H2 | `formStrings.ts` l.137, `acceptTerms` (super form consent) | Ich akzeptiere die | Gelesen und akzeptiert: | EN is "I have read and accept the". "Read" is missing from a legal consent. This suggestion only works if `and` (l.139) becomes `'und'`: "Gelesen und akzeptiert: Mandantenvereinbarung und Datenschutzerklärung". Check first that `and` is used only in `rh84sez58/FormClient.tsx` l.321. |
| H3 | `formStrings.ts` l.587, `declaration` (tax form consent) | Ich habe die {ca}Mandantenvereinbarung{/ca} & {pp}Datenschutzerklärung{/pp} gelesen & stimme zu. | Ich habe die {ca}Mandantenvereinbarung{/ca} und die {pp}Datenschutzerklärung{/pp} gelesen und stimme ihnen zu. | "stimme zu" needs an object ("ihnen"). "&" inside a German sentence reads like a chat message, not a declaration. The markers stay intact. |
| H4 | `ResidencyStep.tsx` l.113, `de.whmResult` | ...gilt der steuerfreie Betrag von $18.200 nicht. Unser Team bestätigt dies bei der Erstellung deiner Steuererklärung. | Aufgrund deiner Antworten bist du steuerlich ein Working Holiday Maker, daher gilt der steuerfreie Betrag von $18.200 für dich nicht. | The second sentence is not in the English. Either remove it, or add it to EN if it is wanted. French has the same extra sentence, so this may be an EN line that was later shortened. |
| H5 | `formStrings.ts` l.97, `checkResidencyNote` | Letzter Schritt: Wir erklären dir die Steuerresidenz, dann kannst du absenden. | Letzter Schritt: deine Steuerresidenz, danach kannst du absenden. | Added content: EN does not say "we explain it to you". On that page the customer declares their status; nothing is explained to them by us. |
| H6 | `formStrings.ts` l.188, `stepRefund` | Deine Steuererklärung wird geprüft und eingereicht | Deine Steuererklärung wird geprüft und beim ATO eingereicht | Missing content ("with the ATO"). |

## T. Terminology decision: "Steuerresident" vs "steuerlich ansässig"

The brief says tax resident = **steuerlich ansässig**. The form instead uses the anglicism "Steuerresident" about 20 times. It is masculine only, and it is not a German legal term. The German site pages already mix both forms (grep under `src/app/(de)`: "steuerlich ansässig" 4 times, "Steuerresident(en)" 5 times).

**Recommendation:** use "steuerlich ansässig" wherever it describes the person's status. Keep "Steuerresidenz" as the short topic noun in titles, the stepper and the button, where length matters and it reads naturally.

| # | File, line / key | Current | Corrected |
|---|---|---|---|
| T1 | `formStrings.ts` l.277 `australianTaxResident`; `ResidencyStep.tsx` l.91 `residentName`; `ResidencyDeclaration.tsx` `de.residentLabel`; `ResidencyFixPanel.tsx` l.19 `resident`; `form-residency-copy.ts` l.81 `residentLabel` | Australischer Steuerresident | In Australien steuerlich ansässig |
| T2 | `form-residency-copy.ts` l.82 `otherLabel` | Foreign resident (steuerlich nicht ansässig) | In Australien steuerlich nicht ansässig (foreign resident) |
| T3 | `ResidencyStep.tsx` l.119/121 `warn.leadPre` / `leadPost` | Aufgrund deiner Antworten giltst du steuerlich ' + nicht + ' als australischer Steuerresident. | leadPre: `Aufgrund deiner Antworten bist du in Australien steuerlich `, leadEmph: `nicht`, leadPost: ` ansässig.` |
| T4 | `ResidencyDeclaration.tsx` `de.confirmP1strong` | kein australischer Steuerresident | in Australien steuerlich nicht ansässig |
| T5 | `ResidencyDeclaration.tsx` `de.confirmNote` | Menschen aus deinem Land können unter Umständen als australischer Steuerresident gelten und... | Menschen aus deinem Land können unter Umständen in Australien steuerlich ansässig sein und den steuerfreien Betrag behalten. Falls das auf dich zutreffen könnte, prüfe bitte zuerst deine Antworten. |
| T6 | `ResidencyStep.tsx` l.93 `condIntro`, l.100 `note`, l.88 `whyBody`, l.114 `nonNdaResult` | ...als australischer Steuerresident gelten / giltst / bist du möglicherweise australischer Steuerresident | ...in Australien steuerlich ansässig sein / bist / bist du möglicherweise in Australien steuerlich ansässig |
| T7 | `ResidencyStep.tsx` l.101 and `form-residency-copy.ts` l.71, `quizIntro` (both brands) | Um als australischer Steuerresident zu gelten, was bedeutet, dass die ersten $18.200 deines Einkommens steuerfrei sind, sollten die meisten der folgenden Punkte wirklich auf dich zutreffen.\n\nWenn das der Fall ist, kannst du „Australischer Steuerresident“ auswählen. Die endgültige Entscheidung über deinen Status trifft das ATO, nachdem wir deine Steuererklärung eingereicht haben. | Damit du in Australien als steuerlich ansässig giltst (dann sind die ersten $18.200 deines Einkommens steuerfrei), sollten die meisten der folgenden Punkte wirklich auf dich zutreffen.\n\nWenn das so ist, kannst du „In Australien steuerlich ansässig“ auswählen. Die endgültige Entscheidung über deinen Status trifft das ATO, nachdem wir deine Steuererklärung eingereicht haben. |
| T8 | `src/app/(de)/de/y8vwp4bf7/page.tsx` l.11, metadata title | Steuerlicher Wohnsitz | Steuerresidenz |

Why T8: "Wohnsitz" is a different concept, a registered home. It also does not match the SVT German page title and the stepper, which both say "Steuerresidenz".

The quoted label in T7 must match the radio label exactly. That is a reason to change T1 and T7 together. Even if "Steuerresident" is kept, T7 still needs the rewrite: the "zu gelten, was bedeutet, dass" chain is the most machine-sounding sentence in the flow.

## M. Should fix (wrong nuance, grammar, unnatural)

| # | File, line / key | Current | Corrected | Why |
|---|---|---|---|---|
| M1 | `ResidencyStep.tsx` l.107 `de.questions[1]` | Dein gewöhnlicher Wohnsitz ist in Australien | Du wohnst normalerweise in Australien | EN "Your usual home" is everyday language. "Gewöhnlicher Wohnsitz" is a German tax-law term, and a German backpacker who is still registered (gemeldet) at home may answer No for the wrong reason. Keep the formal wording in `conditions[1]` (l.96), where EN is also formal ("ordinary place of residence"). |
| M2 | `form-residency-copy.ts` l.75 `DE_RES.questions[2]` | Dein gewöhnliches Zuhause in diesem Jahr ist in Australien | Während des Jahres wohnst du normalerweise in Australien | "Gewöhnliches Zuhause" is a word-for-word calque. EN: "Your usual home during the year is in Australia". |
| M3 | `ResidencyStep.tsx` l.85 `de.intro` | Die Steuerresidenz bestimmt deinen Steuersatz. | Die Steuerresidenz bestimmt, welche Steuersätze für dein Einkommen gelten. | EN "which tax rates apply to your income". Australia has graded rates, so a single "Steuersatz" is misleading. The SVT version already says it correctly. |
| M4 | `formStrings.ts` l.103 `registeredAgentNo` | Unter der Aufsicht eines registrierten Tax Agent, Nr. | Unter der Aufsicht eines registrierten Tax Agents, Nr. | Genitive -s. It is the seal's alt text, so screen readers read it aloud. |
| M5 | `formStrings.ts` l.574 `waHint` | Bitte genau die Nummer, über die wir gerade chatten, damit wir dein Formular deinem Chat zuordnen können. | Nutze bitte dieselbe Nummer, über die wir gerade chatten, damit wir dein Formular unserem Chat zuordnen können. | The current sentence has no verb and reads clipped. EN says "our chat". |
| M6 | `formStrings.ts` l.510 `phCountry` | z. B. Deutschland | z. B. Germany | The form tells customers to type answers in English, but this placeholder shows a German answer. `normalise-labels.ts` happens to map "deutschland", so nothing breaks, but the hint contradicts the notice. `phJob` already says "(bitte auf Englisch)". |
| M7 | `formStrings.ts` l.425 `otherIncomePh` | z. B. Einkünfte aus dem Ausland, Zinsen, Aktien, Mieteinnahmen | z. B. Einkünfte aus dem Ausland, Zinsen, Aktien, Miete (bitte auf Englisch) | Same reason as M6; it matches `phJob` and the Japanese line. |
| M8 | `formStrings.ts` l.436 `declABN` | ...dass ich kein Vermögen in Australien besitze... | ...dass ich keine Vermögenswerte in Australien besitze... | Same EN phrase ("do not own any assets") as `declTFN`, which says "Vermögenswerte". A legal declaration should use one term. The rest of `declABN` and `declTFN` is faithful. |
| M9 | `formStrings.ts` l.468 `thereName` | du | (code: when no first name, show "Vielen Dank!" without a name) | Used only in the super form (`rh84sez58/FormClient.tsx` l.197). It produces "Vielen Dank, du!", which no German writes. There is no string fix, because German has no equivalent of "there". |
| M10 | `formStrings.ts` l.128 `tapToChoose` | Tippe zum Auswählen einer Datei | Tippe, um eine Datei auszuwählen | Noun style reads like an official form; this also matches `tapToAddFiles`. |
| M11 | `formStrings.ts` l.560 `uploadFailedFile` | Upload fehlgeschlagen für "{name}": {reason} | Upload von „{name}“ fehlgeschlagen: {reason} | German word order and German quotation marks. Placeholders kept. |
| M12 | `formStrings.ts` l.161 `invoicesRequired` | ..., oder ändere deine Antwort oben auf Nein. | ..., oder beantworte die Frage oben mit Nein. | "Antwort auf Nein ändern" is a calque. |
| M13 | `GoogleReviewsBadge.tsx` l.22 | Google Bewertungen | Google-Bewertungen | German compound needs the hyphen. |
| M14 | `src/app/(de)/de/start/page.tsx` l.27 and l.31, OG/Twitter title | Steuererklärungsantrag stellen | Steuererklärung starten | Not a natural word. The page `title` already says "Steuererklärung starten". |

## P. Polish (optional)

| File / key | Current | Suggested |
|---|---|---|
| `ResidencyStep.tsx` `warn.btnConfirm` | Ich verstehe, das ist korrekt | Verstanden, das stimmt so |
| `ResidencyStep.tsx` `de.questions[2]` | Du beabsichtigst, weiterhin in Australien zu leben | Du hast vor, weiter in Australien zu leben (friendlier du tone) |
| `formStrings.ts` `followSub` | Jeden Tag eine Sache lernen 🙋 | Lerne jeden Tag etwas Neues 🙋 |
| `formStrings.ts` `workingHolidayMakerTax` | Working Holiday Maker für die Steuer | Steuerlich ein Working Holiday Maker |
| `formStrings.ts` `passportCountryWithVisa` | Land, das den Reisepass ausgestellt hat (mit Visum) | Ausstellungsland des Reisepasses, mit dem dein Visum verknüpft ist ("with visa attached" refers to the passport) |
| `formStrings.ts` `invoicesHint` | Bis zu 10 Belege oder Rechnungen kostenlos hinzufügen. | Du kannst bis zu 10 Belege oder Rechnungen kostenlos hinzufügen. |
| `formStrings.ts` `linkUsedBody`, `ResidencyFixPanel` `usedBody` / `err` | ..., schreib uns auf WhatsApp, wir kümmern uns darum. | ..., schreib uns auf WhatsApp und wir kümmern uns darum. (avoids the comma splice) |

## Checked and fine as they are

- **Form labels:** all labels, section titles, buttons, validation messages and upload errors not listed above. They are faithful and natural, and the buttons are short enough ("Steuererklärung abschicken →" is the longest at 28 characters; the WHT and SVT CSS already shrink the German title).
- **TFN declaration:** `declTFN` is faithful.
- **SVT residency copy:** `DE_RES` is fine apart from M2, T1, T2 and T7. `confirmLead` is faithful, including "Wir prüfen deine Angabe, bevor etwas eingereicht wird."
- **Smaller components:** `FormStepper` (Deine Daten / Dein Einkommen / Steuerresidenz / Schritt s von t), `LinkAfterPayment`, `FIELD_LABELS.de` and the SVT page titles are fine.
- **Localised examples:** `invalidPhone` and `phWaNumberEg` give a German example number (+49 151 ...) where EN gives a UK one. That is deliberate localisation, not a changed number. The same goes for `dobHint` (20.10.2000).

## Doubts

1. **Missing comma in the error summary.** `FormClient.tsx` l.765-768 and l.936-941 build each line as "label + ' ' + fieldIsRequired". In German that gives "Die WhatsApp-Nummer, mit der du uns geschrieben hast ist ein Pflichtfeld" (a comma is needed before "ist") and "Hast du Zugang zu Medicare in Australien? ist ein Pflichtfeld". No German string alone can fix this. Suggested code change: render as "label: Pflichtfeld" (a colon instead of a space for German, through `requiredSep`, with `fieldIsRequired.de = 'Pflichtfeld'`). English has the same "?" problem.
2. **H4.** If the English `whmResult` is supposed to include "Our team confirms this when preparing your return", the fix belongs in EN, not DE.
3. **T1 is a product choice.** "Steuerresident" is what many German backpacker forums say, so it is understood. It is still not the term the brief asks for, and it is masculine only. If the owner keeps it, apply T7, M1 to M3 and T8 anyway.
4. **ATO gender.** "das ATO" is used everywhere (the site uses "das ATO" 285 times and "die ATO" 6 times). That is consistent, so I left it.
5. **SVT German pages.** They sit in the English shell (the page comment says so), so the residency step's surrounding chrome there is English. That is outside the strings reviewed here.

## Applied 18 Nov

All changes are to German strings only, plus two small shared helpers. Covered by `src/lib/__tests__/form-review-fixes-de-ja-18nov.test.ts`.

**Fix before going live**
- H1 / H1b: `ResidencyStep.tsx` `de.questions[3]` and `de.conditions[3]` now say "laufende Beschäftigung".
- H2: `formStrings.ts` `acceptTerms.de` is "Gelesen und akzeptiert:" and `and.de` is "und" (checked: `and` is only used in `rh84sez58/FormClient.tsx`). The super form now reads "Gelesen und akzeptiert: Mandantenvereinbarung und Datenschutzerklärung".
- H3: `declaration.de` is "Ich habe die {ca}Mandantenvereinbarung{/ca} und die {pp}Datenschutzerklärung{/pp} gelesen und stimme ihnen zu." (markers kept).
- H5: `checkResidencyNote.de` is "Letzter Schritt: deine Steuerresidenz, danach kannst du absenden."
- H6: `stepRefund.de` now ends "beim ATO eingereicht".

**Terminology (T1 to T8)**, applied exactly as proposed:
- T1: "In Australien steuerlich ansässig" in `australianTaxResident`, `ResidencyStep` `residentName`, `ResidencyDeclaration` `residentLabel`, `ResidencyFixPanel` `resident`, and SVT `DE_RES.residentLabel`.
- T2: SVT `otherLabel` is "In Australien steuerlich nicht ansässig (foreign resident)".
- T3: `warn.leadPre` / `leadPost` are "Aufgrund deiner Antworten bist du in Australien steuerlich " + "nicht" + " ansässig."
- T4: `confirmP1strong` is "in Australien steuerlich nicht ansässig".
- T5: `confirmNote` now says "in Australien steuerlich ansässig sein".
- T6: `condIntro`, `note`, `whyBody` and `nonNdaResult` now use "in Australien steuerlich ansässig".
- T7: `quizIntro` was rewritten for both brands. The quoted option matches the radio label, and a test pins that.
- T8: the `de/y8vwp4bf7` metadata title is "Steuerresidenz".
- "Steuerresidenz" stays only in titles, the stepper, the button, `pickOne` and `warn.notePre`. No "Steuerresident" is left in the form files.

**Should fix**
- M1: WHT `questions[1]` is "Du wohnst normalerweise in Australien". `conditions[1]` keeps the formal wording.
- M2: SVT `questions[2]` is "Während des Jahres wohnst du normalerweise in Australien".
- M3: `ResidencyStep` `de.intro` is "Die Steuerresidenz bestimmt, welche Steuersätze für dein Einkommen gelten."
- M4: `registeredAgentNo` now says "Tax Agents".
- M5: `waHint` is "Nutze bitte dieselbe Nummer, ... unserem Chat zuordnen können."
- M6: `phCountry` is "z. B. Germany".
- M7: `otherIncomePh` now ends "Miete (bitte auf Englisch)".
- M8: `declABN` now says "keine Vermögenswerte". The declaration still includes the sole owner ("alleiniger Inhaber") and establish ("gründen").
- M9 (code): `thankYouHeading` returns "Vielen Dank!" for `de` when there is no real name, so the super form no longer shows "Vielen Dank, du!".
- M10: `tapToChoose` is "Tippe, um eine Datei auszuwählen".
- M11: `uploadFailedFile` is "Upload von „{name}“ fehlgeschlagen: {reason}".
- M12: `invoicesRequired` now ends "oder beantworte die Frage oben mit Nein."
- M13: `GoogleReviewsBadge` now says "Google-Bewertungen".
- M14: the `de/start` OpenGraph and Twitter titles are "Steuererklärung starten".

**Polish:** all seven applied.
- `warn.btnConfirm` is "Verstanden, das stimmt so".
- `questions[2]` is "Du hast vor, weiter in Australien zu leben".
- `followSub` is "Lerne jeden Tag etwas Neues 🙋".
- `workingHolidayMakerTax` is "Steuerlich ein Working Holiday Maker".
- `passportCountryWithVisa` is "Ausstellungsland des Reisepasses, mit dem dein Visum verknüpft ist".
- `invoicesHint` now starts "Du kannst".
- The comma splice is fixed with "und" in `linkUsedBody` and in `ResidencyFixPanel` `usedBody` and `err`.

**Doubt 1 (code):** `requiredSep('de')` is now ": " and `fieldIsRequired.de` is "Pflichtfeld". The error summary in the tax form and the super form now reads "Die WhatsApp-Nummer, mit der du uns geschrieben hast: Pflichtfeld". English is unchanged.

**Also (small code, shared):** the tax form success screen takes the first name with `firstNameOf` (trimmed), and passes `isRealName` only when a name exists.

**Not done**
- H4 / Doubt 2 (`whmResult` extra sentence): the owner has not decided yet, so it is left as it is.
- Doubts 3 to 5: these needed no change ("das ATO" kept; the SVT English shell is out of scope).
