# Spanish (es) review of the tax form translation

Date: 18 Nov 2026. Reviewer: automated language review (not a human native speaker; the "not checked by a native speaker" comments in the source were left in place).

## Verdict

**Ready after shared-file fixes.** `src/lib/form-i18n/es.ts` is ready now. One shared-file item is a real meaning problem (S1, "tipos de impuesto"), one is a grammar error (S4), and the rest are consistency points.

## Scope and count

About 209 Spanish strings checked against their English originals:

| Where | Strings |
|---|---|
| `src/lib/form-i18n/es.ts` (all keys) | 85 |
| `src/components/svt/form-residency-copy.ts` `ES_RES` | 20 |
| `src/components/ui/ResidencyStep.tsx` `COPY.es` | 44 |
| `src/components/ui/ResidencyDeclaration.tsx` `COPY.es` | 17 |
| `src/components/ui/ResidencyFixPanel.tsx` `es` | 12 |
| `src/components/ui/FormStepper.tsx` `STEPS.es`, `OF.es` | 4 |
| `src/lib/submit-tax-form.ts` `FIELD_LABELS.*.es` | 8 |
| `src/lib/formStrings.ts` inline `es:` values | 15 |
| `src/lib/form-lang.ts` language name, page `<title>`s under `/es/` | 4 |

Checks run after the edits: `npx tsc --noEmit -p .` clean; `npx jest --forceExit src/lib/__tests__/form-nine-languages-18nov` 42 of 42 passed. No test pinned any string I changed, and no test was edited.

Hard rules: no em or en dashes, no mention of AI or bots, no claim that the business is a registered tax agent, no refund promise, all placeholders (`{link}`, `{ca}`, `{pp}`, `{n}`, `{max}`, `{name}`, `{reason}`, `\n\n`) intact, all numbers unchanged (4 MB, 10, 15 minutes, 24 hours, 8 or 9 digits, $18,200, $700, $45,000, $2,462, 15 %, 6 months). TFN, ATO, Medicare, BSB, Working Holiday Maker and Low Income Tax Offset stay in English. Informal "tú" is used throughout.

## Changes made in `src/lib/form-i18n/es.ts` (4)

| Key | Before | After | Why |
|---|---|---|---|
| `otherIncomeWhat` | `¿Qué ingreso?` | `¿Qué tipo de ingreso?` | The two-word question read as clipped and machine-like. Same meaning as "Which income?", and it matches the examples in the placeholder. |
| `invoicesHint` | `Puedes añadir hasta 10 facturas sin coste.` | `Puedes añadir hasta 10 facturas gratis.` | "coste" is Spain only (Latin America says "costo"). "gratis" is neutral and closer to "for free". |
| `invalidPhone` | `...con el prefijo del país, p. ej. +34 612 345 678` | `...con el código de país, p. ej. +34 612 345 678` | "prefijo" is Spain usage; "código de país" is understood everywhere and matches "country code". |
| `fileTooLarge` | `...Si es un PDF, comprímelo o mejor hazle una foto al documento.` | `...Si es un PDF, comprímelo o sube una foto del documento.` | "hazle una foto" is peninsular (Latin America says "tómale una foto"). The new wording is neutral. |

The other 81 keys were left as they are: correct, natural, and short enough for their buttons and labels.

## Proposed changes in shared files (not edited)

### S1. Meaning: "tax rates" translated as "tipos de impuesto" (should fix)

In Latin America "tipos de impuesto" reads as "kinds of tax", not "tax rates". Only in Spain does "tipo" mean rate, and even there the usual phrase is "tipo impositivo".

- `src/components/svt/form-residency-copy.ts`, `ES_RES.intro`
  - Current: `La residencia fiscal decide qué tipos de impuesto se aplican a tus ingresos.`
  - Corrected: `La residencia fiscal decide qué tasas de impuestos se aplican a tus ingresos.`
- `src/components/ui/ResidencyStep.tsx`, `COPY.es.intro`
  - Current: `La residencia fiscal determina qué tipos de impuesto se aplican a tus ingresos.`
  - Corrected: `La residencia fiscal determina qué tasas de impuestos se aplican a tus ingresos.`

### S2. Thousands separator differs between screens of the same step

`ResidencyStep.tsx` and `ES_RES` write `$18.200`; `ResidencyDeclaration.tsx` writes `$18,200`. Pick one. Recommended: the dot, already used in the other two files and normal in Chile, Argentina, Colombia and Spain.

- `src/components/ui/ResidencyDeclaration.tsx`, `COPY.es.confirmP2strong`
  - Current: `umbral libre de impuestos de $18,200`
  - Corrected: `umbral libre de impuestos de $18.200`

### S3. Low Income Tax Offset named two ways

- `src/components/ui/ResidencyDeclaration.tsx`, `COPY.es.confirmLeadNonNda`
  - Current: `...Esto significa que podrías no tener derecho a la bonificación fiscal por ingresos bajos de hasta $700.`
  - Corrected: `...Esto significa que podrías no tener derecho al Low Income Tax Offset de hasta $700.`
  - Why: every other Spanish screen keeps the Australian term in English, so the customer sees one name.

### S4. Grammar and number agreement in the treaty-country note

- `src/components/ui/ResidencyDeclaration.tsx`, `COPY.es.confirmNote`
  - Current: `Las personas de tu país a veces pueden calificar como residente fiscal australiano y conservar el umbral libre de impuestos. Si esto podría aplicarte, revisa primero tus respuestas.`
  - Corrected: `Las personas de tu país a veces pueden ser consideradas residentes fiscales australianos y conservar el umbral libre de impuestos. Si este puede ser tu caso, revisa primero tus respuestas.`
  - Why: "Si esto podría" is ungrammatical (no conditional after "si"); "personas ... residente" does not agree in number; "calificar como" is an anglicism that sounds odd in Spain.

### S5. "WHM" used on the button but never introduced

- `src/components/ui/ResidencyDeclaration.tsx`, `COPY.es.confirmLead` and `confirmLeadNonNda`
  - Current: `...se presentará como Working Holiday Maker.`
  - Corrected: `...se presentará como Working Holiday Maker (WHM).`
  - Why: the confirm button says "Sí, presentar como WHM". German, French and Italian already add "(WHM)".

### S6. "visado" against "visa"

- `src/components/ui/ResidencyStep.tsx`, `COPY.es.warn.notePost`
  - Current: ` de tu situación migratoria (visado).`
  - Corrected: ` de tu situación migratoria (visa).`
  - Why: `ES_RES` says "visa", which is the Latin American word and is understood in Spain.

### S7. Smaller polish (optional)

- `src/components/ui/ResidencyStep.tsx`, `COPY.es.whyBody` and `condIntro` and `note`: "calificas / calificar como residente fiscal australiano" could be "cumples los requisitos para ser residente fiscal australiano". Fine for Latin America as written.
- `src/components/ui/ResidencyStep.tsx`, `COPY.es.sessionLost` (`Tu sesión ha caducado ... No se ha enviado nada.`) and `ES_RES.sessionLost` (`Tu sesión caducó ... No se envió nada.`) use different tenses for the same message. Either is correct; `es.ts` uses the simple past.
- `src/components/svt/form-residency-copy.ts`, `ES_RES.quizIntro`: "deben aplicarse de verdad a tu caso" is slightly stronger than "should genuinely apply". `deberían aplicarse de verdad a tu caso` is closer. The same sentence is in `ResidencyStep.tsx` `COPY.es.quizIntro`.
- `src/lib/formStrings.ts` inline `es:` values for keys in `TAX_FORM_KEYS` (for example `somethingWrong`, `linkUsedTitle`, `fileTooLarge`, `uploadFailedFile`) differ slightly from `es.ts` but are never shown, because `es.ts` wins in `formString`. They are correct Spanish; they could be deleted to avoid two versions. `numberFromChat.es` is the only one that can be shown, and it is correct.

## Things I am unsure of

1. `ResidencyStep.tsx` `COPY.es.whmResult` ends with `Nuestro equipo lo confirmará al preparar tu declaración.` The English `whmResult` has no such sentence. This is added content in a residency result message. I could not tell whether it is intended, so it needs the owner's decision: remove it from Spanish, or add it to English.
2. `fieldIsRequired: '(obligatorio)'` produces lines such as `Nombre(s) (obligatorio)` in the error list. It is correct and avoids gender agreement problems, but two brackets in a row look a little odd. `es un campo obligatorio` would read as a sentence. Left as is, same pattern as Italian and Portuguese.
3. `phWaNumber: '+34 6XX XXX XXX'` and the example in `invalidPhone` are Spanish numbers. They are only examples, but most Spanish-speaking working holiday makers come from Chile and Argentina. A neutral alternative would be the Australian `+61 4XX XXX XXX`. Left as is.
4. `titleTaxStep2: '¡Ya casi está!'` is understood everywhere but leans peninsular. `¡Ya casi terminas!` is the more neutral option. Left as is.
5. `registeredAgentNo: 'Bajo la supervisión de un registered tax agent, n.º'` keeps the Australian term in English, as French, Italian and Portuguese do. It does not say the business is registered. A Spanish gloss ("agente fiscal registrado") would be clearer for the reader, but it is a wording decision for the owner, and the test suite bans nearby job titles ("asesor fiscal", "contador").
6. `phJob` adds `(en inglés)` and `declaration` adds Spanish glosses after "Client Agreement" and "Privacy Policy". Both are additions to the English, both are helpful (answers must be in English; the legal pages exist only in English, German and Japanese), and the other new languages do the same. Left as is.
7. `bankStatements: 'Extracto bancario'` is understood everywhere, though Chile says "cartola" and Mexico "estado de cuenta". Left as is.

## Applied 18 Nov

S1, S3 to S6 were already in the code. S2: every amount is now written as the English ($18,200), Jo's decision. S7: quizIntro "deberían aplicarse" applied; sessionLost now uses the simple past in both files. Doubt 1 (whmResult extra sentence) was removed by Jo's decision of 18 Nov (DECISIONS.md). Doubt 4 and 5 were applied by the 18 Nov review.
