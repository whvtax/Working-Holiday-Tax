# Fix log, round 4, FR (pages de service)

Fichiers : `src/app/(fr)/fr/{tfn,abn,tax-return,superannuation,tax-return-australie-pvt}/page.tsx`.

## Contexte
Un premier agent (scripts dans `plan/round4/fix4fr/`) avait appliqué une partie des plans avant d’être arrêté.
J’ai comparé chaque changement des quatre plans `svc-*-fr.json` au fichier actuel, fragment par fragment
(script `scratchpad/fix4fr2/check.py` et `miss.py`). Résultat : tous les changements P1 et P2 dans mon périmètre
étaient déjà présents. Je n’ai donc rien ajouté, pour ne dupliquer aucune section. J’ai vérifié qu’il n’y a aucun
titleId, id, question de FAQ, constante ou guide en double, et aucune phrase longue répétée (hormis la phrase de
validation approuvée, présente une fois dans chacune de trois sections différentes de /fr/tax-return, comme le prévoit le plan).

## Déjà en place (vérifié, non modifié)
- **TFN** (#0 à #19) : lead answer-first, paragraphe 45 % et Figures, section des 5 étapes (APPLY_STEPS),
  4 nouvelles FAQ, réponses avant l’arrivée et délai (reçu ATO), meta description, webPageLd (description, dateModified),
  faqLd généré depuis FAQS, FAQ « Pourquoi payer ? » fusionnée, nouvel ordre des 10 FAQ, deuxième visa, liens ABN et super
  dans « Ce que nous faisons », GUIDES, kicker, keywords.
- **ABN** (#0 à #17, #19 à #25) : titre, description, kicker, lead, intro, bloc « L’ABN en chiffres » daté et sourcé,
  section des 6 étapes, paragraphes de l’avertissement, tableau FAQ réordonné avec nouvelles questions, lien ABN dans
  « Ce que nous faisons », WaButton final sans `tier`, GUIDES, section next-title, webPageLd, titre FAQ, lien /fr/abn
  depuis /fr/tfn (#24), keywords.
- **Tax return** (#0 à #22) : page phare (FAQ 1, sections what/who, carte « Utile même pour quelques semaines »,
  FAQ ajoutées, KEY_FIGURES, figures, GUIDES, keywords) et page de démarche (section « Comment faire sa tax return
  australienne en PVT » avec `.what-lede` dans le speakable, section « Seul sur myTax ou avec nous ? », lien ABN,
  3 FAQ ajoutées, nouvel ordre des sections, GUIDES, kicker, keywords).
- **Superannuation** (#0 à #26) : lead answer-first, lignes MYGOV, délai de 28 jours à compter d’une demande complète,
  65 %, paiement depuis l’étranger, section #steps visible et HowTo généré depuis le même tableau STEPS, bloc
  #key-figures daté, section #with-us (libellé « Si nous faisons aussi votre tax return : », phrase de validation
  rattachée à la tax return), notes neutres des cartes de solde, #who-can-claim, #while-in-australia, #find-your-fund,
  #never-claimed, FAQ TFN et ligne de liens TFN/ABN sous l’accordéon, 2 FAQ ajoutées, description, speakableSchema
  (inLanguage, name, dateModified), GUIDES, Medicare conditionnelle (« selon leur situation »), CTA.

## Écarts au plan, conservés volontairement (déjà appliqués par le premier agent)
- Super #2, #9, #10, #12 (règle des 5 000 $) : le plan lie les copies certifiées au seuil de 5 000 $. La recherche DASP
  (`round3/dasp-plan.json`, point F9) corrige : l’ATO lie les 5 000 $ à la Certification of Immigration Status
  (formulaire 1194, payant) sur une demande papier ; un fund peut demander des copies certifiées quel que soit le solde.
  Le texte actuel suit la recherche DASP, prioritaire pour la page super.
- Super #12 : bloc rendu avec `PlainRows` (composant existant) au lieu d’un `<dl>` écrit à la main ; contenu identique.
- Super #23 : `#key-figures` non ajouté au cssSelector (optionnel dans le plan).
- ABN #6 : « puis nous l’enregistrons avec vous » remplacé par « puis nous préparons la demande avec vous » (règle :
  ne jamais laisser entendre que nous déposons la demande d’ABN comme agent).

## Ignoré
- ABN #18 (`src/lib/wa.ts`, message WhatsApp FR « abn ») : fichier hors de mon périmètre (fichier partagé).
- TFN #11 `datePublished` : aucune date de mise en ligne FR sourcée ; seul `dateModified: '2026-11-05'` est présent.

## Faits utilisés (déjà dans les pages, sources des plans)
- DASP : 65 % de la part imposable (taxée et non taxée) pour les PVT ; 28 jours à compter d’une demande complète ;
  super détenue par l’ATO versée seulement sur un compte australien ou par chèque ; sans limite de temps ; NAT 7204,
  NAT 74880, formulaire 1194 (ATO, page DASP et page d’aide, mise à jour le 21 avril 2026 ; dasp-plan.json).
- TFN : gratuit, sous 28 jours, 45 % sans TFN ni déclaration de demande en cours ; 15 % jusqu’à 45 000 $ chez un
  employeur enregistré (ATO, llms.txt).
- ABN : gratuit, immédiat ou 20 jours ouvrés (business.gov.au), retenue de 47 %, GST à 75 000 $ (ATO, llms.txt),
  super 12 % depuis le 1er juillet 2025, salaire minimum 33,05 $ (ATO, Fair Work Commission).

## Vérifications
- `npx tsc --noEmit -p .` : 0 erreur.
- `npx jest __tests__/wht-copy-compliance-6-languages.test.ts` : 3/3 réussis.
- Tests qui référencent ces pages (`locale-blog`, `new-locales-sitemap`, `page-photo-priority`) : 42/42 réussis.
- U+2013/U+2014 dans les 5 fichiers : 0.
