// ============================================================
// French (fr) wording for the Working Holiday Tax price and guarantee
// messages. Meaning comes from the English in approved-messages.ts
// (APPROVED.price_tfn, price_tfn_abn, price_tfn_foreign,
// price_tfn_abn_foreign, price_tfn_review, price_tfn_abn_review) and the
// guarantee sentence in the same file. Written to docs/engineering/
// language-blocks/fr.md: tu, no dashes, no emoji.
//
// French wording written by an agent acting as reviewer. Not checked by a native speaker.
// 18 Nov (language review, fr.md): guarantee, screenshot line and "C'est noté" worded
// exactly as the two-message price flow; "ta situation Medicare".
// ============================================================

const BANK_FR = `BSB : 062692
Numéro de compte : 81049952`;

const SCREENSHOT_FR = `Envoie une capture d'écran une fois le paiement fait et nous nous y mettons !`;

const GUARANTEE_FR = `Si ton remboursement d'impôts est inférieur à nos honoraires, nous te remboursons la différence. S'il n'y a pas de remboursement, l'intégralité de nos honoraires s'applique.`;

const NO_REFUND_LINE_FR = `S'il n'y a pas de remboursement, l'intégralité de nos honoraires s'applique.`;

export const APPROVED_FR = {
  price_tfn: `C'est noté, c'est donc l'option TFN, $220. Nous vérifions ta résidence fiscale, ta situation Medicare et tes déductions, puis nous préparons et déposons ta déclaration d'impôts, en veillant à ne rien laisser passer de ce à quoi tu as droit.

${BANK_FR}

${GUARANTEE_FR}

${SCREENSHOT_FR}`,

  price_tfn_abn: `C'est noté, c'est donc l'option TFN + ABN, $385. Nous vérifions ta résidence fiscale, ta situation Medicare et tes déductions, ajoutons une annexe d'activité pour tes revenus et dépenses ABN, puis nous préparons et déposons ta déclaration d'impôts, en veillant à ne rien laisser passer de ce à quoi tu as droit.

${BANK_FR}

${SCREENSHOT_FR}`,

  price_tfn_foreign: `C'est noté, c'est donc l'option TFN avec revenus étrangers, $330. Nous vérifions ta résidence fiscale, ta situation Medicare et tes déductions, intégrons tes revenus étrangers, puis nous préparons et déposons ta déclaration d'impôts, en veillant à ne rien laisser passer de ce à quoi tu as droit.

${BANK_FR}

${SCREENSHOT_FR}`,

  price_tfn_abn_foreign: `C'est noté, c'est donc l'option TFN + ABN avec revenus étrangers, $495. Nous vérifions ta résidence fiscale, ta situation Medicare et tes déductions, ajoutons une annexe d'activité pour tes revenus et dépenses ABN, intégrons tes revenus étrangers, puis nous préparons et déposons ta déclaration d'impôts, en veillant à ne rien laisser passer de ce à quoi tu as droit.

${BANK_FR}

${SCREENSHOT_FR}`,

  price_tfn_review: `Pas de souci, nous pouvons examiner une déclaration que tu as déjà déposée.

Comme elle a déjà été déposée, il s'agit d'un examen de la déclaration existante et non d'une nouvelle déclaration. Nos honoraires sont de $330 pour l'examen lui-même, et ils sont les mêmes quel que soit le résultat. Ils couvrent aussi le dépôt de la déclaration rectifiée, si c'est nécessaire.

${BANK_FR}

${SCREENSHOT_FR}`,

  price_tfn_abn_review: `Pas de souci, nous pouvons examiner une déclaration que tu as déjà déposée.

Comme elle a déjà été déposée, il s'agit d'un examen de la déclaration existante et non d'une nouvelle déclaration. Nos honoraires sont de $440 pour l'examen lui-même (GST incluse), et ils sont les mêmes quel que soit le résultat.

${BANK_FR}

${SCREENSHOT_FR}`,

  guarantee: GUARANTEE_FR,

  no_refund_line: NO_REFUND_LINE_FR,
};
