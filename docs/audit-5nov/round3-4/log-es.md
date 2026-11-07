# Native review log: es

Edits: 52, across 18 blog chunks, CalculatorClient.tsx, expenses/cleaners and expenses/construction. No titles, meta descriptions, numbers, facts or approved sentences were changed. tsc passes (exit 0) and both jest suites pass (27/27). The es group has no en or em dashes.

## Top 10 before/after
1. 03.ts: "Recibes dos notices of assessment en lugar de una, una por cada año fiscal." -> "en lugar de uno, uno por cada año fiscal" (gender; the site uses "el notice of assessment" 23 times and never "la").
2. 05.ts: "Equivocarse es silencioso y no dramático:" -> "Cuando sale mal, no hace ruido:" (calque).
3. 04.ts: "La cuestión de momento que realmente importa es el último aporte." -> "En cuanto a los plazos, lo que realmente importa es el último aporte." (calque of "timing question").
4. 11.ts: "El momento es el punto de decisión." -> "Lo decisivo es el momento."
5. 13.ts: "y que te la pidan es el final de la conversación." -> "y si te la piden, ahí se termina la conversación."
6. 01.ts: "30 AUD más por cada 100 AUD, mientras dure, que después se concilian en la tax return." -> "30 AUD más por cada 100 AUD mientras dure la situación, una diferencia que después se concilia en la tax return." (broken syntax and agreement).
7. 01.ts: "Esos ingresos igual pertenecen a tu tax return" -> "siguen correspondiendo a tu tax return" (colloquial "igual" means "anyway" only in the Southern Cone).
8. 10.ts: "El método de centavos por kilómetro paga 91 centavos" -> "permite reclamar 91 centavos". Also "más simples y comparables" -> "más simples y dan un resultado parecido".
9. calculator: "Una estimación vale lo que vale lo que escribiste." -> "Una estimación vale tanto como los datos que escribiste."
10. Repetition: the bridge "El super y la tax return son trámites distintos, pero conviene resolver los dos antes de irte." appeared 5 times, now 5 different wordings (04, 05, 08, 13 twice). About 15 of today's "puedes [estimar tu devolución de impuestos](/calculator) con tus cifras..." closers now have different wordings and anchors (calculadora, hacer una estimación, calculadora de devolución, estimar por separado). Every link target is unchanged. The three near-identical closers in chunk 15 are now three different sentences.

Other fixes: "la retención suele pasarse" -> "suele retener de más"; "Qué tan sencillo sea" -> "Lo sencillo que resulte"; "presionas enviar" -> "haces clic en enviar"; "hacia adelante" removed; "en un año working holiday" -> "en un año de working holiday"; "La prueba es si el artículo" -> "El criterio es si..."; "¿Qué decide el costo según tu fecha de llegada?" -> "¿Por qué tu fecha de llegada cambia lo que te cuesta?"; "te enteras de qué la frena" (wrong antecedent) -> "averiguas qué frena la solicitud"; "Lavar la ropa ... deducible se deduce" / "es en sí deducible" -> "El lavado de ... también se deduce"; "estadías cortas" -> "estancias cortas" (the more common form in these files).

## Facts that looked odd (not changed)
- 11.ts / 01.ts: the 45 % vs 15 % gap is called "Un 30 % más de retención". It is 30 percentage points, which is correct per 100 AUD earned. Fine, but the "30 %" could be read as a relative increase.
- 11.ts: "con el sistema trimestral anterior no vencía hasta el 28 de julio" is right for a quarter ending 30 June only. It reads as general.
- data.ts FAQ: "Debes presentar el tax return entre el 1 de julio y el 31 de octubre de ese mismo año". The year that ends on 30 June is filed by 31 October of the same calendar year. That is correct but easy to misread.

## For the lead
- The gender of "tax return" is mixed site-wide, and this predates today (owner's version: 63 "la" + 28 "una" vs 43 "el" + 15 "un" + 12 "del/al"). Each file is consistent: blog articles (chunks) use "la", while pages and data.ts use "el". Today's text follows its file, so I did not unify. If you want one form everywhere, it is a large separate job.
- "el/la Fair Work Ombudsman" is also mixed inside chunks 02, 08, 14-17 and data.ts, and this predates today. The correct form is "el" (ombudsman/defensor). I did not mass-change it.
- The number format differs between blog chunks ("45 000", "1000") and pages ("45.000"). I left it as is, because the rules say not to touch numbers.
