# Native review log: fr (French, vous)

Edits: 55 replacements across 22 files under src/app/(fr)/. tsc clean, both jest suites pass (27/27). Not committed.

## Repetition
- "déclaration d'impôts (tax return) en PVT" was the link text 22 times. 21 are now varied (déclaration d'impôts australienne, tax return australienne, déclaration de revenus, déclaration de fin d'année, déclaration annuelle, tax return de PVT, service de tax return, etc.). One original is left as is (chunks/09.ts). Every link still points to /tax-return.
- The TFN bridge sentence "Si vous préférez qu'on s'occupe de la demande..." appeared 4 times. 3 of them are now worded differently.
- The bridge "...à partir de vos chiffres depuis le début de l'année" appeared about 8 times. 5 of them are now worded differently, and the "estimer votre remboursement d'impôt" anchor is varied in places.

## 10 key before/after
1. tax-return/page.tsx (iron rule): "puisque le dépôt passe par nous." -> "puisque nous préparons tout avec vous."
2. tax-return/page.tsx meta description (baseline text, but it broke the iron rule): "Nous déposons la tax return ;" -> "Nous préparons la tax return ;"
3. chunks/10.ts (calque, and implied we amend returns): "Le schéma des déclarations que nous modifions est constant." -> "Dans les déclarations qu'on nous apporte à corriger, on retrouve toujours les mêmes erreurs."
4. chunks/12.ts (tautology): "Les déclarations déposées dans le cadre de la [déclaration d'impôts (tax return) en PVT] passent par..." -> "Les déclarations préparées avec notre [service de tax return] sont déposées par un canal professionnel vérifiable..."
5. page.tsx (ambiguity): "...la Medicare levy ait été comptée alors que vous n'y aviez pas droit" -> "...alors que vous n'aviez pas droit à Medicare"
6. chunks/11.ts (calque): "L'accord a été le taux de 15 %..." -> "Le compromis s'est traduit par le taux de 15 %..." The same file had a gender slip: "La DASP" -> "Le DASP" (le DASP is the dominant form).
7. chunks/03.ts (calque of "talk themselves out of"): "celles dont les gens se dissuadent" -> "celles que les gens jugent trop petites pour valoir la peine"
8. chunks/02.ts: "le montant n'est donc pas la surprise. C'est le calendrier." -> "la surprise ne vient donc pas du montant, mais du calendrier."
9. chunks/06.ts: "Parce que la paie de l'employeur lit le formulaire" -> "Parce que le logiciel de paie de l'employeur s'en tient au formulaire"; and "Le manque côté ambulance" -> "L'absence de prise en charge des ambulances"
10. chunks/07.ts: "où les pénalités mordent réellement" -> "tombent réellement"; and "Un agent fiscal enregistré qui passe votre année en revue en entier avant que quoi que ce soit soit déposé" -> "Un agent fiscal enregistré, qui vérifie votre année entière avant tout dépôt."
Also: "Si on a retenu trop / trop peu" -> "Si l'on a trop retenu / n'a pas assez retenu"; "un PVT" -> "un PVTiste" (person) in new text on page.tsx and superannuation; "certificat" -> "attestation" (calculator, to match the blog); "dites-le franchement à la paie" -> "prévenez franchement le service paie"; contact and home now give the same reply time ("dès le matin du jour ouvré suivant").

## Facts that looked off (not changed)
- page.tsx FAQ and tax-return-australie-pvt: "Un PVTiste ... paie 15 % dès le premier dollar ... sans seuil d'exonération", and elsewhere "taux 2026-27, inchangés depuis 2025-26". These are fine, but the "30 % jusqu'à 135 000 $" bracket line is worth confirming against the ATO 2026-27 rates.
- chunks/09.ts: the Home Affairs six-month exemption "depuis le 1er janvier 2024 jusqu'à nouvelle décision". Please confirm it is still current.
- data.ts: "Les autres résidents temporaires paient 35 % sur la part taxée" is correct for the taxed element, but the 35 %/45 % untaxed distinction is not mentioned (low priority).

## For the lead
- "Nous traitons directement avec l'ATO." is pasted in 7 places (home, abn, tfn, medicare, expenses, superannuation, calculator). I left it alone because it looks like a site-wide approved sentence. It also leans toward "we deal with the ATO as agent", so check it against the iron rule.
- In the FR files, "tax return en PVT" is still the most common link text by far (about 40 times, before today plus today's). The site would read better if it were varied too.
- Pre-existing FAQ questions use "Un PVT ..." for the person (baseline style). I left them as they were.
- The FR chunk files use NBSP before ":" and "%". The one new colon I added follows the file's convention.
