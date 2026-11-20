# French (fr) language review, 18 Nov

Reviewer: native French reviewer. Brief: `docs/engineering/language-review-18nov/BRIEF.md`.

## 1. Strings checked

- **Fixed messages**: all 43 keys of `docs/engineering/templates-i18n/fr.json` compared line by line with the `en` text in `SOURCE.json` (meaning, paragraphs, line breaks, placeholders `{{1}}` `{{AMOUNT}}` `${AMOUNT}`, `*bold*`, emoji positions, links, prices, BSB and account number). All keys are present and nothing is missing or extra. The generated `src/lib/will/template-translations.generated.ts` was rebuilt and matches.
- **Button labels** in `src/lib/will/channel.ts`: FORM_BUTTON_LABEL, RESIDENCY_BUTTON_LABEL, MEDICARE_BUTTON_LABEL and REVIEW_BUTTON_LABEL (fr).
- **Language block**: `docs/engineering/language-blocks/fr.md` checked section by section against `en.md`, and every approved phrase it quotes checked against the code. `language-rules.generated.ts` was regenerated with `node scripts/build-language-rules.mjs`.
- **Other French model and code texts**: `src/lib/will/approved-fr.ts` (the French price messages that `instant-choice.ts` sends), the French parts of `i18n.ts` (REVIEW_REQUEST_MSG and the legacy tables), and `playbook.ts`. The playbook has no French-specific text. `svt-fixed-texts.ts` has no French.
- **Forms**: all 86 keys of `src/lib/form-i18n/fr.ts` against the English in `formStrings.ts`. Also the French parts of `ResidencyStep.tsx`, `ResidencyDeclaration.tsx` and `ResidencyFixPanel.tsx`, and `FR_RES` in `form-residency-copy.ts` against `EN_RES` in `form-brand-svt.tsx`.

## 2. Changes made

### Fixed messages (`docs/engineering/templates-i18n/fr.json`, then regenerated)

The main finding: every fixed text goes out for both Will (male) and Mia (female). In French, "Désolé" and "Ravi" mark the speaker as male, so Mia would be writing in the masculine. Each of these texts now uses the "nous" form or a wording that shows no gender.

| Key | Before | After | Why |
|---|---|---|---|
| BANK_DOCUMENT_MSG | Désolé, mais nous avons vraiment besoin d'un document bancaire officiel... | Nous sommes désolés, mais il nous faut vraiment un document bancaire officiel... | Shows no gender, so it works for Mia. Matches the English "we". |
| MEDICARE_CANT_HELP_MSG | Désolé de l'apprendre. | Nous sommes désolés de l'apprendre. | Shows no gender. |
| NO_DASP_MSG | Désolé, notre service de superannuation (DASP)... | Nous sommes désolés, notre service de superannuation (DASP)... | Shows no gender. |
| HANDOFF_BUMP_MSG | Désolé pour l'attente. | Toutes mes excuses pour l'attente. | Shows no gender, and keeps the English "I" voice. |
| REVIEW_ASK_SHORT_MSG | Ravi de l'apprendre ! | Quelle bonne nouvelle ! | Shows no gender. Same meaning as "Great to hear!". |
| NO_REFUND_CASES_MSG | ...et qu'il y a alors de l'impôt à payer. Si c'est ton cas ou non, c'est l'une des choses que nous vérifions pendant l'examen 😊 | ...et qu'il reste alors de l'impôt à payer. Savoir si c'est ton cas fait partie des choses que nous vérifions pendant l'examen 😊 | "Si c'est ton cas ou non, c'est..." is not good French. The new wording says "Whether that's the case for you is one of the things we check". |
| REFUND_CHANCE_MSG | comme ton statut de résident ... de ta situation, | comme ta résidence fiscale ... de ta situation personnelle, | "Residency" means tax residency, which is "résidence fiscale" in every other French text. "Statut de résident" sounds like a visa status. "Situation personnelle" renders "your specific case". |
| COUPLE_MSG | Nos honoraires sont par personne : | Nos honoraires s'entendent par personne : | Better French for "the fee is per person". |
| HANDOFF_HOLDING_MSG | J'ai transmis ça à l'équipe, et ils te répondent ici, en général sous un jour ouvré. | J'ai transmis ça à l'équipe, et elle te répondra ici, en général sous un jour ouvré. | "L'équipe" is feminine singular, so it takes "elle". The future tense matches "they'll reply". No change to the time promise. |
| PAYMENT_RECEIVED_MSG | Remplis ce court formulaire pour que... | Remplis ce court formulaire, s'il te plaît, pour que... | The English says "Please". RESIDENCY_CHECK_MSG already uses "s'il te plaît". |
| EXPENSES_INTAKE_MSG | « Rien » est une très bonne réponse aussi. | « Rien » est aussi une réponse tout à fait valable. | "Très bonne" overstated the English "is a fine answer". |

Two new notes were added to `_notes`, and the 🎉 note was updated. Non-breaking spaces before `? ! :` and inside « » are unchanged.

**Tried and reverted:** I changed "questionnaire" to "formulaire" in FORM_RECEIVED_MSG, because the English says "form". `system-message-guard.ts` uses that word to recognise our own "form received" message in French, so the change broke `templates-nine-languages-18nov` ("detection of our own messages › fr"). "Ton questionnaire" stays. It is good French for this form.

All other keys were already correct: same meaning, same lines, placeholders and emoji in place, prices only $220/$385/$330/$495/$300, and the guarantee only in PRICE_FLOW_STEPS_TFN.

### Language block (`docs/engineering/language-blocks/fr.md`, then regenerated)

- **Section 2**:
  - New rule: no gendered first-person adjectives ("désolé", "ravi", "content", "prêt", "sûr"), because the same French serves Will and Mia. Use the "nous" form or a wording that shows no gender.
  - Added rules from en.md that were missing: warm and never gushing, exclamation marks sparingly and none in a complaint, the benefit given once, no false urgency, and one closing line after a clear no.
- **Section 2, agent answer**: the block banned "Bien sûr" as the opening, but the English rule and the approved `legitimacy` text open with "Of course." It now says: open with "Bien sûr.", never "Oui" or "Absolument". (Jo to confirm, see section 4.)
- **Section 3 (Terms)**:
  - Fee: before payment, never "vérification gratuite", "sans risque" or "non remboursable" (from en.md).
  - Lodge: "déposée auprès de l'ATO" only after signature (from en.md).
  - The block said "expert-comptable" is not checked by the guard. That was out of date: `PROTECTED_AGENT_TITLE` in `policy-guard.ts` now refuses expert-comptable, conseiller fiscal and comptable agréé.
- **Section 4 (Approved wording)**:
  - All quotes now match the regenerated texts: REFUND_CHANCE, NO_REFUND_CASES, BANK_DOCUMENT, NO_DASP, MEDICARE_CANT_HELP, HANDOFF_HOLDING, HANDOFF_BUMP and REVIEW_ASK_SHORT.
  - HANDOFF_HOLDING is now marked as the only time promise allowed.
  - New paragraph: the objection answers (o1, o9, o10a, o10b, o11, o15, o16) and the o7 phrase have no French fixed text. They are rendered from the English, adapting only the opening, as en.md says.
- **Section 5 (Phrases to write freely)**:
  - Removed "On te répond ici dès que possible." It is a time promise ("asap") that en.md forbids.
  - Removed "Désolé pour ça..." because it is gendered.
  - Removed "Tu veux qu'on regarde ça ensemble ?" because it suggests a joint session we do not offer.
  - Replaced them with French versions of en.md's own examples (screenshot thanks, "Pas d'urgence...", "Pardon pour tout ça, je comprends que ce soit frustrant.").
- **Section 6 (Forbidden content)**: added the en.md rules that were missing:
  - Date and day-count promises.
  - Social proof.
  - Customers who owe tax.
  - Complaints.
  - Never widening the guarantee, never applying it to a return already lodged, and sending to the team a customer who says the guarantee applies to them.
  - Tax determinations are now forbidden at any time, as in en.md (before, only "before payment").
  - Emoji rule: ✅, 🎉 and 🙏 only in the approved texts that carry them. It used to say "No French text carries 🎉", which contradicted SIGNATURE_MSG.
- **Section 7 (Length and layout)**: typography now says a non-breaking space, and gives the format for thousands ("$18 200", "5 000 km").

### Form (`src/lib/form-i18n/fr.ts`)

| Key | Before | After | Why |
|---|---|---|---|
| fieldIsRequired | `: champ obligatoire` | `(obligatoire)` | The code builds "label + space + suffix". With a question label this gave "As-tu accès à Medicare en Australie ? : champ obligatoire" (double punctuation, and a breakable space before ":"). "(obligatoire)" reads well after every label, and matches es/it/pt. |

The rest of fr.ts matches the English. The localised placeholders (+33, France) and "(en anglais)" after the job example are deliberate and the same in es/it/pt, so I kept them.

## 3. Shared-file changes for another agent (exact)

1. **`src/lib/will/channel.ts`, RESIDENCY_BUTTON_LABEL, `fr`**: `'Ouvrir la page'` → `'Test de résidence'` (17 characters). The English is "Tax residency test". "Open the page" is not the same meaning. (Every other language has the same problem.)
2. **`src/lib/will/channel.ts`, MEDICARE_BUTTON_LABEL, `fr`**: `'Voir la vidéo'` → `'Comment demander'` (16 characters). The English is "How to apply".
3. **`src/lib/will/channel.ts`, FORM_BUTTON_LABEL, `fr`**: `'Commencer'` → `'Commencer ici'`. The English is "Start here". This one is minor.
4. **`src/lib/will/approved-fr.ts`**:
   - `GUARANTEE_FR`: current `Si ton remboursement d'impôts est inférieur à nos honoraires, nous te rembourserons la différence. S'il n'y a pas de remboursement, nos honoraires complets s'appliquent.` → `Si ton remboursement d'impôts est inférieur à nos honoraires, nous te remboursons la différence. S'il n'y a pas de remboursement, l'intégralité de nos honoraires s'applique.` Why: the guarantee must read the same everywhere ("Never a different version", playbook). This is the wording of the approved PRICE_FLOW_STEPS_TFN fr.
   - `NO_REFUND_LINE_FR`: → `S'il n'y a pas de remboursement, l'intégralité de nos honoraires s'applique.` Same reason.
   - In `price_tfn`, `price_tfn_abn`, `price_tfn_foreign` and `price_tfn_abn_foreign`: `ta Medicare` → `ta situation Medicare` (4 places). Why: "ta Medicare" is not French. The fixed texts say "ta situation Medicare".
   - Optional, same 4 keys: `Bien noté, donc c'est l'option` → `C'est noté, c'est donc l'option`, to match "C'est noté, option TFN !" in the price flow.
   - Header comment: these texts have now been read by the French reviewer.
5. **`src/components/ui/ResidencyStep.tsx`, `fr`**:
   - Amounts are written with the $ after the number (Canadian style). The brief and fr.md require "$220" style. Change these (the space after `$` is a non-breaking space):
     - `18 200 $` → `$18 200` in whyBody, quizIntro, whmResult, nonNdaResult and warn.b1.
     - `45 000 $` → `$45 000` in compareCaption.
     - `2 462 $` → `$2 462` in compareFoot.
     - `700 $` → `$700` in note and warn.b2.
   - `introEmph`: `Elle n’a rien à voir avec ton statut d’immigration.` → `Elle est distincte de ton statut d’immigration.` Why: the English "It is separate from" is neutral, and "n'a rien à voir" is stronger and more casual.
6. **`src/components/ui/ResidencyDeclaration.tsx`, `fr`**:
   - `confirmLeadNonNda`: `jusqu’à 700 $` → `jusqu’à $700`.
   - `confirmP2strong`: `pas droit au seuil d’exonération de 18 200 $` → `pas droit au seuil d’exonération de $18 200`.
   - Why: amount format.
7. **`src/components/svt/form-residency-copy.ts`, `FR_RES`**:
   - `quizIntro` and `confirmLead`: `18 200 $` → `$18 200`.
   - `introEmph`: `Elle n’a rien à voir avec ton visa.` → `Elle est distincte de ton visa.`
   - `confirmNo`: `Je revérifie` → `Revoir mes réponses`. Why: the English "Let me review again" is the same on both brands, and WHT French already says "Revoir mes réponses".

No change is needed in `playbook.ts`, `svt-fixed-texts.ts`, `form-brand-svt.tsx` or `ResidencyFixPanel.tsx` (fr is correct). `i18n.ts` REVIEW_REQUEST_MSG fr is correct. HANDOFF_APOLOGY_MSG fr still says "Désolé", but that message is removed and no longer sent, so it is left alone.

## 4. For Jo

- **Agent answer opening**: fr.md used to forbid "Bien sûr" as the opening of "are you an agent?". It is now aligned with the English rule ("Of course." → "Bien sûr."). In French, "Bien sûr." straight after "Êtes-vous agent fiscal enregistré ?" can read as "yes, of course". The same risk exists in English. Please confirm you want them identical.
- **REVIEW_ASK_SHORT_MSG** ends with the variable `{{1}}`, exactly like the English. As a Meta template outside the 24h window, Meta rejects a body that ends with a variable. The fix has to be decided in English first.
- **en.md is out of date in places**, and fr.md now follows the code:
  - The `opening` quote "Hey! 😊 Happy to help." does not match the approved "Hey! Happy to help😊".
  - FORM_RECEIVED is quoted as "we've received your questionnaire", but the approved text is "Got your form".
  - The amounts list leaves out $110 (foreign income) and $165 (ABN upgrade), which the playbook and guard allow and fr.md lists.
- **Gendered labels**: the residency labels say "Résident fiscal australien" in the masculine, which is the normal convention for a form label. If you want, they can become "Résident(e)". I did not change them.
- **Behaviour, not wording**: `instant-choice.ts` recognises ABN income words in English, German and Japanese only (`ABN_ML_RE`). French words such as "auto-entrepreneur", "indépendant" and "livraison" are not recognised, so a French customer who writes them is asked the question instead of getting the TFN + ABN price straight away.

## 5. Checks

- `node scripts/build-template-translations.mjs`: wrote 43 keys x 8 languages.
- `node scripts/build-language-rules.mjs`: wrote 9 language rule files.
- `npx tsc --noEmit -p .`: clean.
- `npx jest --forceExit src/lib/will/__tests__/templates-nine-languages-18nov.test.ts src/lib/will/__tests__/language-rules-loader.test.ts src/lib/__tests__/form-nine-languages-18nov.test.ts`: 269 / 269 passed.
- Also ran all of `src/lib/will` and `src/lib/__tests__`: 5992 passed, 2 skipped.
- No em or en dashes in any edited file. No mention of AI or bots, no agent title, no new price, refund figure or time promise.

## 6. Verdict

The French is now professional, natural and identical in meaning to the English. The fixed texts were already close; the fixes are mostly for Mia's gender, plus a few unnatural phrases. The language block had gaps against en.md (no date-promise rule, a time promise as an example, a stale guard note, a 🎉 contradiction); these are now closed. Six shared files still need small fixes (section 3), mainly two button labels whose meaning differs from the English and the amount format on the residency pages. The fr verdict is ready once those are applied.

## Applied 18 Nov

Applied:
1. channel.ts: RESIDENCY "Test de résidence", MEDICARE "Comment demander", FORM "Commencer ici".
2. approved-fr.ts: GUARANTEE_FR and NO_REFUND_LINE_FR as in PRICE_FLOW_STEPS_TFN; "ta situation Medicare"; "C'est noté, c'est donc l'option"; screenshot line as in the price flow.
3. FORM_RECEIVED_MSG fr now says "formulaire" (Jo). `system-message-guard.ts` recognises "nous avons (bien) reçu ton formulaire" and `followup-gate-30oct.ts` keeps the old "questionnaire" text as a legacy wording, so chats in progress are still recognised.
4. fr.md: always tu (vous only as a plural for two people); greeting and name once; "Bien sûr." opening with the approved supervision sentence, "registered tax agent" kept in English (AGENT_PHRASES.legitimacy.fr); $110 and $165 removed; amounts as the English; Jo's emoji rule; section 4 now lists the agent, myGov and one-message price texts.
5. ResidencyStep and ResidencyDeclaration fr, FR_RES: amounts written as the English ($18,200, $45,000, $2,462, $700) per Jo's decision 2 (not "$18 200" as proposed); introEmph "Elle est distincte de..."; FR_RES.confirmNo "Revoir mes réponses"; Low Income Tax Offset "(jusqu’à $700)" (older form review S6).
6. instant-choice.ts: French ABN words (auto-entrepreneur, indépendant, micro-entreprise) choose the TFN + ABN track; MYGOV_REASSURANCE.fr added.
7. Culture items fr12 and fr13 (PRE_PAYMENT_CHECK_MSG "laisse-nous gérer ça", fu_pre_24h "faire un petit point").

Not applied: "Résident(e)" labels (left for Jo, normal convention for a form label); non-breaking spaces in the fixed texts are already in fr.json.
Checks after applying: `npx tsc --noEmit -p .` clean; full `npx jest --forceExit` passing except the two security suites that need `.env.example`.
