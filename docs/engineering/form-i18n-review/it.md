# Italian review of the tax form (18 Nov 2026)

Reviewer: Italian-language review agent. Scope: every Italian string of the tax return flow, both brands, checked against its English original.

## Strings checked: about 210

| Where | Count |
|---|---|
| `src/lib/form-i18n/it.ts` (the shared form block) | 85 |
| `src/components/svt/form-residency-copy.ts` `IT_RES` | 20 |
| `src/components/ui/ResidencyStep.tsx` `COPY.it` | 44 |
| `src/components/ui/ResidencyDeclaration.tsx` `COPY.it` | 17 |
| `src/components/ui/ResidencyFixPanel.tsx` `it` | 12 |
| `src/components/ui/FormStepper.tsx` `STEPS.it`, `OF.it` | 4 |
| `src/lib/submit-tax-form.ts` `FIELD_LABELS.*.it` | 8 |
| `src/lib/formStrings.ts` inline `it:` entries | 15 |
| `src/lib/form-lang.ts` language name, page titles under `src/app/(it)/it/start`, `(it)/it/y8vwp4bf7`, `(svt)/svt-site/it/jhd7hp9xd` (+ `/w3rp42fav`) | 5 |

Hard rules: no em or en dashes found, no mention of AI or bots, no claim that the business is a registered tax agent (the seal text names supervision only), prices and numbers unchanged ($18.200, $45.000, $2.462, $700, 15%, 4 MB, 10 files, 15 minutes, 24 hours), placeholders intact (`{n}`, `{max}`, `{name}`, `{reason}`, `{link}`, `{ca}`, `{pp}`, `\n\n`). Informal "tu" is used everywhere. TFN, ATO, BSB, Medicare, Client Agreement, Privacy Policy, Low Income Tax Offset, Working Holiday Maker stay in English.

## Changes made in `src/lib/form-i18n/it.ts` (9)

| Key | Before | After | Why |
|---|---|---|---|
| `englishOnlyNotice` | Puoi leggere il modulo nella tua lingua, ma scrivi le risposte in inglese, per favore. | Scegli la tua lingua per leggere le istruzioni, ma scrivi le risposte in inglese, per favore. | English says "Choose your language to see instructions"; the old text dropped the instruction to choose. |
| `waHint` | Metti lo stesso numero con cui stai chattando con noi, così colleghiamo il modulo alla chat. | Usa lo stesso numero con cui stai chattando con noi, così possiamo collegare il modulo alla nostra chat. | "Metti" is clumsy for a form field; "so we can match" is now literal. |
| `phEmail` | tu@email.it | nome@email.com | "tu@" is a word-for-word copy of "your@" and reads oddly; "nome@" is the usual Italian example. |
| `invoicesHint` | Puoi aggiungere fino a 10 fatture, senza costi. | Puoi aggiungere fino a 10 fatture gratis. | "senza costi" sounds translated; "gratis" is the natural word and shorter. |
| `howHeard` | Come ci hai conosciuto? | Come ci hai conosciuti? | Participle agreement with the plural object "ci". |
| `fieldIsRequired` | (obbligatorio) | (campo obbligatorio) | It follows a field name of any gender ("Data di nascita (obbligatorio)" mismatched); "campo" carries the masculine. |
| `fixBeforeSubmit` | Prima di inviare, sistema questi punti: | Prima di inviare, correggi questi punti: | "sistema" is colloquial and can be misread as a noun; "correggi" = "fix". |
| `invalidTfn` | Un TFN ha 8 o 9 cifre | Il TFN ha 8 o 9 cifre | Natural article for a general statement. |
| `invalidPhone` | Inserisci un numero valido con il prefisso internazionale, es. +39 312 345 6789 | Inserisci un numero di telefono valido con il prefisso internazionale, es. +39 312 345 6789 | English says "phone number"; example unchanged. |

The file header comment "written by an agent, not checked by a native speaker (18 Nov 2026)" was left as is because the test pins it. No test pinned any corrected string. `npx tsc --noEmit -p .` is clean; `form-nine-languages-18nov` passes (42/42).

## Proposed changes in shared files (not edited)

Meaning-level (recommended before go-live):

1. `src/components/ui/ResidencyStep.tsx`, `COPY.it.whyBody`
   - Current: `...quindi l’imposta del 15% pagata su quell’importo può essere rimborsata.`
   - Corrected: `...quindi l’imposta del 15% pagata su quell’importo potrebbe essere rimborsata.`
   - Why: English "may be refunded" is a possibility; "può essere" reads closer to a statement of fact.
2. `src/components/ui/ResidencyStep.tsx`, `COPY.it.condIntro`
   - Current: `Puoi essere considerato residente fiscale australiano se soddisfi questi criteri:`
   - Corrected: `Potresti essere considerato residente fiscale australiano se soddisfi questi criteri:`
   - Why: English "You may qualify".
3. `src/components/ui/ResidencyStep.tsx`, `COPY.it.whmResult`
   - Current: `In base alle tue risposte, ai fini fiscali risulti Working Holiday Maker, quindi la soglia di esenzione di $18.200 non si applica. Il nostro team lo verificherà quando preparerà la tua dichiarazione.`
   - Corrected (faithful to English): `In base alle tue risposte, ai fini fiscali risulti Working Holiday Maker, quindi la soglia di esenzione di $18.200 non si applica.`
   - Why: the second sentence is not in the English. The same extra sentence is in de, ja, fr and es, so this may be deliberate and the English may be the stale one. Owner decision.
4. `src/components/ui/ResidencyDeclaration.tsx`, `COPY.it.confirmNote`
   - Current: `...Se potrebbe valere anche per te, rivedi prima le tue risposte.`
   - Corrected: `...Se pensi che possa valere anche per te, rivedi prima le tue risposte.`
   - Why: "se" + conditional is felt as a grammar mistake by most readers.

Polish (optional):

5. `src/components/ui/ResidencyStep.tsx` `COPY.it.titleLead` and `src/components/svt/form-residency-copy.ts` `IT_RES.titleLead`: `Conferma la tua ` -> `Confermiamo la tua ` (English "Let's confirm your").
6. `src/components/ui/ResidencyStep.tsx`, `COPY.it.yearNote`: `Questi punti riguardano l’anno fiscale che stai dichiarando.` -> `Questi punti riguardano l’anno fiscale per cui presenti la dichiarazione.` Same wording in `warn.read`: `...solo per l’anno fiscale che stai dichiarando.` -> `...solo per l’anno fiscale per cui presenti la dichiarazione.`
7. `src/components/ui/ResidencyDeclaration.tsx`, `COPY.it.confirmYes`: `Sì, presenta come WHM` -> `Sì, presentala come WHM` (the verb needs its object).
8. `src/lib/submit-tax-form.ts`, `FIELD_LABELS.taxStatus.it`: `stato fiscale` -> `residenza fiscale` (matches the step name the customer saw; "stato fiscale" is vague).
9. `src/components/svt/form-residency-copy.ts`, `IT_RES.introEmph`: `Non dipende dal tuo visto.` -> `È una cosa distinta dal tuo visto.` (English "It is separate from your visa"; the current text is acceptable).
10. `src/lib/formStrings.ts` inline `it:` values for `somethingWrong`, `fileTooLarge`, `uploadFailedRequired` differ slightly from `it.ts`. They are never shown (the block wins); delete or align them to avoid two sources.

Everything else in `IT_RES`, the declaration, the fix panel, the stepper and the field labels is correct and faithful: the four student questions and the six WHT questions match the English one for one, and the declaration lines ("dichiaro che ai fini fiscali sono:", "dichiaro di essere:") add nothing.

## Doubts

- `phJob` "es. Farm worker, Barista (in inglese)" and `phCountry` "es. Italy (in inglese)" add "(in inglese)", which is not in the English. It is consistent with es/fr/pt and helps the customer, so I kept it. Also, students on the Student Visa Tax form see "Farm worker" as the job example in Italian (only zh/vi have a student-specific example).
- `single` = "Single" is everyday Italian; the registry terms are "celibe/nubile". Kept for simplicity.
- `declaration` glosses the two document names in brackets ("accordo con il cliente", "informativa sulla privacy"). Faithful, but it is longer than English; check it wraps well next to the checkbox on a narrow phone.
- `checkResidency` "Continua: residenza fiscale →" (29 characters) is the longest button; fine on mobile width in my reading of the layout, not visually tested.
- Amounts use the Italian thousands point ($18.200). Values are unchanged, only the separator differs from English, same as de/es.
- `registeredAgentNo` keeps "registered tax agent" in English ("Sotto la supervisione di un registered tax agent, n."). It names supervision only and is used as image alt text.
- The Student Visa Tax Italian pages show the closed-form notice in English (`SvtFormClosed locale={'en'}`) when forms are disabled. By design per the page comment.
- Nothing was rendered in a browser; this is a text review.

## Verdict

Ready after shared-file fixes. The form block (`it.ts`) is ready now. Items 1 to 4 above should be applied (or item 3 consciously accepted) before the residency step is shown to Italian customers; items 5 to 10 are polish.

## Applied 18 Nov

Items 1 to 4 and 7 were already in the code or applied by the 18 Nov review. Applied now: 5 ("Confermiamo la tua" in both files), 6 (yearNote and warn.read "per cui presenti la dichiarazione"), 9 (IT_RES.introEmph "È una cosa distinta dal tuo visto."). Not applied: 8 (FIELD_LABELS.taxStatus "stato fiscale" is the English "tax status", identical in meaning); 10 (unused inline values, no customer effect).
