# French review of the tax form (18 Nov 2026)

Scope: every French string a customer sees in the tax form flow, both brands, checked against its English original.

**Verdict: ready after shared-file fixes.** `src/lib/form-i18n/fr.ts` is ready now. Two residency-test lines in a shared file translate "ongoing work" as "stable job", which changes what the customer is answering (S1 and S2 below); those should be fixed before French goes live. Everything else in the shared files is polish.

Checks after the edits: `npx tsc --noEmit -p .` is clean. `form-nine-languages-18nov` passes, as do `form-translate-18nov`, `form-start-lang-18nov` and `FormLanguageToggle-18nov` (4 suites, 101 tests). No test pinned a string I changed, so no test was edited.

## Strings checked: 197

| Where | Count |
|---|---|
| `src/lib/form-i18n/fr.ts` (edited) | 87 |
| `src/components/ui/ResidencyStep.tsx`, `fr` block (WHT residency step) | 44 |
| `src/components/svt/form-residency-copy.ts`, `FR_RES` | 21 |
| `src/components/ui/ResidencyDeclaration.tsx`, `fr` block | 17 |
| `src/components/ui/ResidencyFixPanel.tsx`, `fr` | 12 |
| `src/lib/submit-tax-form.ts`, `FIELD_LABELS.*.fr` | 8 |
| `src/components/ui/FormStepper.tsx`, `STEPS.fr` and `OF.fr` | 4 |
| Page titles (`src/app/(fr)/fr/start`, SVT `fr/jhd7hp9xd` and `w3rp42fav`), `FORM_LANG_NAMES.fr`, `thankYouHeading('fr')` | 4 |

Confirmed across all of them: "tu" throughout, no leftover "vous/votre/vos"; TFN, ATO, Medicare, BSB, Low Income Tax Offset and Working Holiday Maker kept in English; "résident fiscal" used for tax resident; all numbers and amounts unchanged (18 200 $, 45 000 $, 2 462 $, 700 $, 15 %, 6 mois, 4 Mo, 10 factures, 15 minutes, 24 heures); placeholders (`{n}`, `{max}`, `{name}`, `{reason}`, `{link}`, `{ca}`, `{pp}`, `\n\n`) intact; no em or en dashes; no mention of AI or bots; no refund promise; the seal text says "sous la supervision d'un registered tax agent" and never says the business is one.

## Changes made in `src/lib/form-i18n/fr.ts`

| Key | Before | After | Why |
|---|---|---|---|
| `englishOnlyNotice` | Tu peux lire le formulaire dans ta langue, mais écris tes réponses en anglais, s'il te plaît. | Choisis ta langue pour lire les instructions, mais écris tes réponses en anglais, s'il te plaît. | The English tells the customer to choose a language; the French had dropped that instruction. |
| `waHint` | Mets le même numéro que celui de notre conversation, pour qu'on relie ton formulaire à notre échange. | Utilise le même numéro que celui avec lequel tu nous écris, pour qu'on puisse relier ton formulaire à notre conversation. | "Le numéro de notre conversation" is unclear (whose number?). Now says plainly: the number you write to us from. |
| `primaryJob` | Ton job principal sur l'année écoulée | Job principal de l'année écoulée | "Sur l'année écoulée" is office jargon; shorter label, matches the other field labels. |
| `invoicesHint` | Tu peux ajouter jusqu'à 10 factures, sans frais. | Tu peux ajouter jusqu'à 10 factures gratuitement. | Natural wording for "for free". |
| `invoicesRequired` | ..., ou change ta réponse ci-dessus en Non. | ..., ou réponds Non à la question ci-dessus. | "Changer une réponse en Non" is a word-for-word calque. |
| `bankStatementHint` | Ajoute un relevé de ton compte australien (PDF)... | Ajoute un relevé de ton compte bancaire australien (PDF)... | "Compte" alone is vague; the English says bank statement. |
| `tapToChoose` | Touche pour choisir un fichier | Appuie pour choisir un fichier | "Touche" reads first as the noun (a key). "Appuie" is the usual word. |
| `tapToAddFiles` | Touche pour ajouter des fichiers ({n} max.) | Appuie pour ajouter des fichiers ({n} max.) | Same. |
| `checkResidencyNote` | Dernière étape : la résidence fiscale. Ensuite tu peux envoyer. | Dernière étape : la résidence fiscale, puis tu pourras envoyer. | One sentence as in English; future tense is correct here. |
| `somethingWrong` | ...Réessaie ou écris-nous directement. | ...Réessaie ou contacte-nous directement. | English says "contact us", not "write to us". |
| `uploadFailedFile` | Échec de l'envoi de "{name}" : {reason} | Échec de l'envoi de « {name} » : {reason} | French quotation marks, as already used in the residency text. |
| 20 strings with `?`, `!`, `:` or `« »` | ordinary space before the mark | non-breaking space (` `) | French puts a space before these marks; with an ordinary space a narrow phone screen can push a lone "?" or ":" to the next line. Same escape the site already uses in `GoogleRating.tsx`. `waPrefill` keeps an ordinary space (it is a WhatsApp message the customer sends) and `fieldIsRequired` is unchanged. |
| File header | (none) | two comment lines: reviewed, and what ` ` is | The "written by an agent, not checked by a native speaker" line is kept because a test requires it, and because this review was also done by an agent. |

The other 76 strings in `fr.ts` were correct and natural; their wording is unchanged (some only gained a non-breaking space).

## Proposed changes in shared files (not edited)

### Should fix before launch (meaning)

**S1. `src/components/ui/ResidencyStep.tsx`, `fr.questions[3]`**
- English: You have ongoing work in Australia
- Current: Tu as un emploi stable en Australie
- Proposed: Tu as un emploi en cours en Australie
- Why: "stable" means a secure, lasting job. A backpacker with continuing casual work would answer No to "emploi stable" and Yes to the English question. This is a residency test question and feeds the result.

**S2. `src/components/ui/ResidencyStep.tsx`, `fr.conditions[3]`**
- English: ...such as a home, ongoing employment or personal connections.
- Current: ...par exemple un logement, un emploi stable ou des attaches personnelles.
- Proposed: ...par exemple un logement, un emploi en cours ou des attaches personnelles.
- Why: same as S1.

### Worth fixing (faithfulness and style)

**S3. `src/components/ui/ResidencyDeclaration.tsx`, `fr.intro`**
- English: After reviewing this page and the relevant ATO information, I declare that I am:
- Current: Après avoir lu cette page et les informations de l'ATO, je déclare être :
- Proposed: Après avoir lu cette page et les informations pertinentes de l'ATO, je déclare être :
- Why: "relevant" was dropped from a declaration.

**S4. `quizIntro`, last sentence, in both `src/components/ui/ResidencyStep.tsx` (`fr`) and `src/components/svt/form-residency-copy.ts` (`FR_RES`)**
- English: The ATO makes the final decision on your residency after we lodge your return.
- Current: C'est l'ATO qui décide au final de ta résidence, une fois ta déclaration déposée par nos soins.
- Proposed: La décision finale sur ta résidence revient à l'ATO, une fois ta déclaration déposée par nos soins.
- Why: "au final" is widely regarded as incorrect French and looks careless in a tax text.

**S5. `src/components/ui/ResidencyFixPanel.tsx`, `fr.intro`**
- Current: ...et c'est l'ATO qui décide au final.
- Proposed: ...et la décision finale revient à l'ATO.
- Why: same as S4.

**S6. "Low Income Tax Offset, jusqu'à 700 $" (three places)**
- `ResidencyStep.tsx` `fr.warn.b2`: "Tu n'as pas droit au Low Income Tax Offset, jusqu'à 700 $." → "Tu n'as pas droit au Low Income Tax Offset (jusqu'à 700 $)."
- `ResidencyStep.tsx` `fr.nonNdaResult`: "...avoir droit au Low Income Tax Offset, jusqu'à 700 $." → "...avoir droit au Low Income Tax Offset (jusqu'à 700 $)."
- `ResidencyDeclaration.tsx` `fr.confirmLeadNonNda`: "...ne pas avoir droit au Low Income Tax Offset, jusqu'à 700 $." → "...ne pas avoir droit au Low Income Tax Offset (jusqu'à 700 $)."
- Why: with a comma, "jusqu'à 700 $" hangs loose and in the negative sentences can be misread; brackets attach the amount to the offset, as "of up to $700" does.

### Optional

**S7. `introEmph`** (`ResidencyStep.tsx` `fr` and `FR_RES`): "Elle n'a rien à voir avec ton statut d'immigration." / "...avec ton visa." English says "It is separate from...". Closer: "Elle est indépendante de ton statut d'immigration." / "Elle est indépendante de ton visa." The current wording is a little stronger than the English but not wrong.

**S8. Non-breaking spaces.** The shared French strings use an ordinary space before `?` and `:` and inside amounts ("18 200 $", "15 %"), so "$" or "?" can wrap alone onto a new line on a phone. Replace with ` ` in the `fr` blocks of `ResidencyStep.tsx`, `ResidencyDeclaration.tsx`, `form-residency-copy.ts`, and in `thankYouHeading` (`src/lib/formStrings.ts`: `${thankYou}, ${name} !`; the test at `form-nine-languages-18nov.test.ts:252` pins `'Merci, Lou !'` and would need the same change).

## Doubts

1. **`whmResult` has a sentence the English does not.** French ends with "Notre équipe le vérifiera en préparant ta déclaration." The German, Japanese, Italian and Spanish lines have the same extra sentence, so it looks intended and only English lacks it. The French sentence itself is fine. Someone should decide whether English should gain it or the others lose it.
2. **Masculine only.** "considéré", "résident fiscal australien" are masculine, while the form writes "Marié(e)". This is normal on French forms for a status name, and adding "(e)" everywhere makes the residency text heavy, so I left it. If you want it inclusive, the sentences to change are those with "tu es considéré" (→ "considéré(e)") in `ResidencyStep.tsx` and `form-residency-copy.ts`.
3. **`declaration`** keeps the English document names with a French gloss: "le Client Agreement (contrat client) et la Privacy Policy (politique de confidentialité)". That adds words, but the two documents exist in English only, and Chinese and Vietnamese do the same, so I kept it.
4. **`registeredAgentNo`** ("Sous la supervision d'un registered tax agent, n°") is used as the alt text of the seal image, followed by the number. It describes supervision, not the business. Kept as is.
5. **`checkResidency`** ("Continuer : résidence fiscale →", 31 characters) is the longest French button. "Continuer vers la résidence fiscale →" is more natural but longer; I kept the short one. Worth a look on a small phone.
6. **WhatsApp prefill spacing.** `waPrefill` was left with an ordinary space before "!" on purpose.
7. Outside the form, not reviewed, but seen while searching: `src/components/ui/MobileCta.tsx` line 20 has "Validée par un agent fiscal enregistré" and line 11 uses "vous" ("Écrivez-nous"). Not part of this flow; mentioning it only because of the registration wording rule.

## Applied 18 Nov

S1 to S5 were already in the code. Applied now: S6 ("Low Income Tax Offset (jusqu’à $700)" in three places), S7 ("Elle est distincte de..."). S8: amounts are now written as the English ($18,200, Jo's decision), so they no longer wrap; non-breaking spaces before ? and : were already in place.
