// ============================================================
// Spanish (es) wording for the Working Holiday Tax price and
// guarantee messages.
//
// Spanish wording written by an agent acting as reviewer. Not checked by a native speaker.
// 18 Nov (language review, es.md): the screenshot line is the price flow's own line.
//
// Meaning comes from the English in approved-messages.ts (APPROVED.price_tfn,
// price_tfn_abn, price_tfn_foreign, price_tfn_abn_foreign, price_tfn_review,
// price_tfn_abn_review) and the guarantee sentence in price_tfn, which is the
// same line PRICE_ML uses in instant-choice.ts. Amounts are unchanged:
// $220, $385, $330, $495 and $440 AUD.
//
// Rules applied (docs/engineering/language-blocks/es.md): tú form, neutral
// Spanish, "tarifa" for the fee, "devolución" for the tax refund,
// "presentar" for lodge, no dashes, no emoji in price or bank messages.
// The guarantee is TFN only; no ABN, foreign-income or review text carries it.
// ============================================================

export const APPROVED_ES = {
  price_tfn: `Entendido, entonces es la opción TFN, $220. Revisamos tu residencia fiscal, Medicare y deducciones, y después preparamos y presentamos tu declaración de impuestos, asegurándonos de que no se te pase nada a lo que tienes derecho.

BSB: 062692
Cuenta: 81049952

Si tu devolución de impuestos es menor que nuestra tarifa, te devolvemos la diferencia. Si no hay devolución, se aplica nuestra tarifa completa.

¡Mándanos una captura cuando hayas pagado y empezamos!`,

  price_tfn_abn: `Entendido, entonces es la opción TFN + ABN, $385. Revisamos tu residencia fiscal, Medicare y deducciones, añadimos un anexo de negocio con tus ingresos y gastos de ABN, y después preparamos y presentamos tu declaración de impuestos, asegurándonos de que no se te pase nada a lo que tienes derecho.

BSB: 062692
Cuenta: 81049952

¡Mándanos una captura cuando hayas pagado y empezamos!`,

  price_tfn_foreign: `Entendido, entonces es la opción TFN con ingresos del extranjero, $330. Revisamos tu residencia fiscal, Medicare y deducciones, incluimos tus ingresos del extranjero, y después preparamos y presentamos tu declaración de impuestos, asegurándonos de que no se te pase nada a lo que tienes derecho.

BSB: 062692
Cuenta: 81049952

¡Mándanos una captura cuando hayas pagado y empezamos!`,

  price_tfn_abn_foreign: `Entendido, entonces es la opción TFN + ABN con ingresos del extranjero, $495. Revisamos tu residencia fiscal, Medicare y deducciones, añadimos un anexo de negocio con tus ingresos y gastos de ABN, incluimos tus ingresos del extranjero, y después preparamos y presentamos tu declaración de impuestos, asegurándonos de que no se te pase nada a lo que tienes derecho.

BSB: 062692
Cuenta: 81049952

¡Mándanos una captura cuando hayas pagado y empezamos!`,

  price_tfn_review: `Sin problema, podemos revisar una declaración que ya hayas presentado.

Como ya está presentada, esto es una revisión de la declaración existente y no una nueva. La tarifa es de $330 por la revisión en sí y es la misma sea cual sea el resultado. También incluye presentar la declaración corregida, si hace falta.

BSB: 062692
Cuenta: 81049952

¡Mándanos una captura cuando hayas pagado y empezamos!`,

  price_tfn_abn_review: `Sin problema, podemos revisar una declaración que ya hayas presentado.

Como ya está presentada, esto es una revisión de la declaración existente y no una nueva. La tarifa es de $440 por la revisión en sí (incluido el GST) y es la misma sea cual sea el resultado.

BSB: 062692
Cuenta: 81049952

¡Mándanos una captura cuando hayas pagado y empezamos!`,

  guarantee: `Si tu devolución de impuestos es menor que nuestra tarifa, te devolvemos la diferencia. Si no hay devolución, se aplica nuestra tarifa completa.`,

  no_refund_line: `Si no hay devolución, se aplica nuestra tarifa completa.`,
};
