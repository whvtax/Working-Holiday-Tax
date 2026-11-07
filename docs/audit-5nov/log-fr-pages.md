# Fix log: fr-pages

All paths below are under `src/app/(fr)/fr/`. Edit scripts: `scratchpad/plan/work-fix-fr-pages/s1.py`, `s2.py`, `s3.py`.

## Applied
- fr-pages-002: tax-return hub intro (blog/data.ts) no longer says backpackers generally get a refund. It now says a refund is possible when too much was withheld, and that the ATO decides.
- fr-pages-003: home myGov notice reworded to "Personne de sérieux ne vous demandera vos identifiants myGov. Nous ne les demandons jamais : si quelqu’un vous les réclame, ce n’est pas nous." (FR is allowed to reword this.)
- fr-pages-004: about: "Un comptable généraliste…" changed to "Dans un cabinet généraliste, une déclaration de backpacker arrive…". Added the approved supervision sentence and the approved review sentence as a new whyParas paragraph, because AboutView did not render them.
- fr-pages-005: France has no RHCA. Added to the flagship Medicare FAQ (answer now leads with it), to the /fr/medicare #who-is-exempt section and to the medicare-and-other hub FAQ.
- fr-pages-006: /fr/medicare: removed the "500 $ sur 25 000 $" example from the FAQ and the objection paragraph. Now reads "au-delà d’un seuil de faible revenu (28 011 $ pour une personne seule en 2025-26, selon l’ATO) : environ 1 000 $ sur 50 000 $".
- fr-pages-007: /fr/superannuation: the untaxed element is now also 65% for WHM, and the tax-free component 0%.
- fr-pages-008: super hub: 12% "since 1 July 2025, unchanged in 2026-27", set by law (SG). Added Payday Super from 1 July 2026. Removed the Fair Work Annual Wage Review attribution.
- fr-pages-009: home FAQ "Quel taux d’impôt…" now gives the WHM rates (15/30/37/45, 2025-26 and 2026-27) and 45% without a TFN, then the residency caveat.
- fr-pages-010: flagship: answer-first paragraph at the top of "Les bases", the 15% WHM rate in the definition, and the dated 2025-26 deadline (31 Oct 2026) in the deadline FAQ.
- fr-pages-011 / tech-004 (within the lead's decision: keep both, no redirect, no hreflang change):
  - Removed 'tax return Australie PVT' and 'déclaration d’impôts Australie PVT' from the /fr/tax-return keywords.
  - The flagship is now the guide. New "Les chiffres clés, avec leurs dates" section (WHM rates, 45% no TFN, 31 Oct 2026 deadline with the late-lodgement and agent-list note, Medicare 2% and the 2025-26 threshold, SG 12%, Payday Super, DASP 65%, about 14 business days). New "La Medicare levy selon votre passeport" section (France and other non-RHCA countries vs the RHCA list, Italy and Malta limited, Medicare Entitlement Statement, non-residents do not pay it). New FAQ on the tax rate. FAQs 1 and 7 no longer contradict each other.
  - Removed the duplicated seven-step SEQUENCE, the NEEDED block and the HowTo JSON-LD from the flagship. They are replaced by a short process summary with a LinkButton "Les sept étapes du dépôt en détail" to /fr/tax-return. The HowTo now lives only on /fr/tax-return.
  - /fr/tax-return (service and process page): removed the deadline FAQ and the "remplace ma déclaration en France" FAQ (both are on the flagship). Added a link below the FAQ to the flagship. The flagship stays first in GUIDES.
  - The "Et ensuite" links on /fr/tfn and /fr/medicare now point to /fr/tax-return-australie-pvt. Home SERVICES 03 is left on /fr/tax-return (it is the service row; home GUIDES already links the flagship).
  - The tax-return hub relatedServicePath now points to '/fr/tax-return-australie-pvt'. The frCategoryMeta mapping in blog/data.ts keeps paths that start with /fr/ as they are, so localePath is bypassed.
- fr-pages-012: superannuation "Et ensuite" now reads "Avant de fermer votre compte australien" and links to the flagship. Calculator: added an "Et ensuite" section in calculator/page.tsx (after CalculatorView) linking to the flagship.
- fr-pages-013: about talkP2 links to the flagship. Contact: the first blocker ("déjà quitté l’Australie") has a link to the flagship. Work-rights hub: relatedServicePath '/tax-return', label 'Vérifier votre tax return'.
- fr-pages-014: /fr/tfn: hero, body paragraph and FAQ now give the 28-day rule correctly (it applies only when the declaration says the application is pending). The TFN hub FAQ was rewritten as in the finding.
- fr-pages-015: the levy is now "ajoutée par défaut au calcul de votre impôt" or "comptée", not "retenue": home ANALYSIS 03, home FAQ 1 and FAQ 2, calculator diffParas.
- fr-pages-016: super hub FAQ: "35 % avant 2017" replaced with "since 1 July 2017 for 417/462; other temporary residents pay 35% on the taxed element".
- fr-pages-017: Medicare hub FAQ on private insurance softened. It is now "fortement recommandée", indispensable in practice for non-RHCA nationals (French included), with a pointer to check one's own grant notice. The wording no longer says it is a visa condition.
- fr-pages-018: calculator superHint: 65% applies to the taxable part of the balance.
- fr-pages-019: flagship FAQ 1 and the "quelques semaines" FAQ are now consistent with each other.
- fr-pages-020: home figure "18 200 $" body now explains the residents' tax-free threshold and that WHM rates apply 15% from the first dollar.
- fr-pages-021: home FAQ and contact (FAQ and hours field): "(heure de l’est de l’Australie)". I used this instead of "heure de Sydney" because the code also refers to Melbourne time, and both cities share the same zone.
- fr-pages-022: "versés à vous" changed to "qui vous sont versés". "deviner quel formulaire est lequel / est le bon" changed to "deviner quel formulaire remplir" on home, contact, medicare, superannuation, tfn, abn, calculator and expenses ("chercher quel formulaire remplir").
- fr-pages-023: tax-return hub refund timing is now "en général environ 14 jours ouvrés après le dépôt", and the CTA goes to the flagship. The hub deadline FAQ is now dated (31 Oct 2026 for 2025-26, late still possible, agent extension only if on an agent’s list before 31 Oct).
- fr-pages-024 / tech-009 (FR part): Service availableLanguage set to the six languages on /fr/tax-return, the flagship, /fr/tfn and /fr/abn. /fr/contact: the inline Organization redeclaration was replaced by { '@id': '/#business' } (the global RootDocument graph holds the six-language ContactPoint), isPartOf is now a reference, and the unused WA_NUMBER import was removed. /fr/blog: the inline Organization node was removed, and isPartOf/publisher are now references.
- fr-pages-025: /fr/blog OG alt is now 'Guides impôts pour PVT en Australie'. Straight apostrophes in blog/page.tsx were not changed, see Skipped.
- fr-pages-026: /fr/tax-return FAQ "Que dois-je fournir" now matches the NEEDED list.

## Skipped
- fr-pages-001: the lead marked "Les remboursements de nos clients vont de quelques centaines à plusieurs milliers de dollars…" as owner-approved, keep as is.
- tech-004, the redirect/hreflang/LOCALE_ONLY_ROUTES/footer parts: the lead decided to keep both pages with no redirects and no hreflang changes. Only the differentiation and the cross-linking were applied.
- fr-pages-025, the apostrophe part: the remaining straight apostrophes in blog/page.tsx are in metadata titles and descriptions and in schema strings. Titles and descriptions are frozen, and the change is cosmetic.
- fr-pages-011, home SERVICES row 03: kept on /fr/tax-return on purpose, see Applied.

## Handoff
- shared (src/components/wht/CalculatorBlocks.tsx): optional. The new flagship link on /fr/calculator renders after the calculator's forest CTA, because the view has no slot. If preferred, add an optional `hrefs.taxReturn` and `t.linkTaxReturn` next to linkMedicare, linkSuper and linkExpenses, and move the link there. FR copy: linkTaxReturn: "Comment se passe la tax return avec un PVT", href '/fr/tax-return-australie-pvt'.
- EN/IT/ES lead: the same factual errors exist in EN (medicare $25,000 example, superannuation "untaxed element higher rate"), as the findings note. Those files are not mine.

## Facts checked
- WHM rates 15/30/37/45 (to $45k/$135k/$190k), 2025-26 unchanged in 2026-27: public/llms.txt Key facts (ATO).
- No-TFN withholding 45%: llms.txt.
- SG 12% from 1 July 2025, Payday Super from 1 July 2026: llms.txt.
- DASP WHM 65% of the taxable component since 1 July 2017: llms.txt and FIX_BRIEF. Untaxed element also 65% for WHM: finding evidence (ATO DASP rates).
- Medicare levy low-income threshold, singles 2025-26: lower $28,011, upper $35,013. Source: ATO "Medicare levy reduction for low-income earners" (fetched).
- RHCA list (UK, Ireland, Italy, Malta, NL, Belgium, Finland, Norway, Sweden, Slovenia, NZ). France, Germany, Spain, Switzerland, Austria, Canada, Japan and Latin America are not on it. Italy cover is limited to 6 months: llms.txt and FIX_BRIEF (Services Australia).
- 31 Oct 2026 deadline for 2025-26 has passed, late lodgement is possible, and the agent extension applies only if on an agent's list before 31 Oct: FIX_BRIEF.
- Health insurance on 417/462: I could not fetch Home Affairs (not on the allowlist). I softened the wording instead of asserting either way.
- Foreign residents do not pay the Medicare levy (used in the flagship Medicare section): standard ATO rule, not separately fetched. The lead may want to confirm it.

## Checks
- `npx tsc --noEmit -p .` passes. `npx eslint "src/app/(fr)" --quiet` is clean.
- jest: wht-copy-compliance-6-languages, locale-blog, new-locales-sitemap, redirect-loop-30oct, brand-routing-26oct, page-photo-priority: 78/78 passed.
- No U+2013, U+2014 or U+2015 in any changed file. New text uses plain spaces, so no new NBSP was added.
