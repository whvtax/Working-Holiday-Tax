// Portuguese wording written by an agent acting as reviewer. Not checked by a native speaker.
// 18 Nov (language review, pt.md): guarantee and screenshot line worded as in the price
// flow; "renda do exterior" as in every other pt text; no "garantindo" next to a price.
//
// Brazilian Portuguese (pt_BR) rendering of the approved English price and
// guarantee messages in approved-messages.ts (APPROVED.price_tfn,
// price_tfn_abn, price_tfn_foreign, price_tfn_abn_foreign, price_tfn_review,
// price_tfn_abn_review) and the guarantee sentence in price_tfn (the
// PRICE_ML refund line in instant-choice.ts has de and ja only). Meaning,
// amounts and conditions follow the English exactly. Rules: docs/engineering/language-blocks/pt.md.
// The guarantee applies to TFN-only returns, as in the English.

export const APPROVED_PT = {
  price_tfn: `Entendi, então é a opção TFN, $220. Revisamos sua residência fiscal, Medicare e deduções, depois preparamos e enviamos sua declaração de imposto, para você não perder nada a que tem direito.

BSB: 062692
Conta: 81049952

Se a sua restituição for menor que o nosso valor, nós devolvemos a diferença. Se não houver restituição, o nosso valor integral é cobrado.

Mande um print quando pagar e a gente começa!`,

  price_tfn_abn: `Entendi, então é a opção TFN + ABN, $385. Revisamos sua residência fiscal, Medicare e deduções, acrescentamos um demonstrativo da sua renda e das suas despesas com ABN, depois preparamos e enviamos sua declaração de imposto, para você não perder nada a que tem direito.

BSB: 062692
Conta: 81049952

Mande um print quando pagar e a gente começa!`,

  price_tfn_foreign: `Entendi, então é a opção TFN com renda do exterior, $330. Revisamos sua residência fiscal, Medicare e deduções, incluímos sua renda do exterior, depois preparamos e enviamos sua declaração de imposto, para você não perder nada a que tem direito.

BSB: 062692
Conta: 81049952

Mande um print quando pagar e a gente começa!`,

  price_tfn_abn_foreign: `Entendi, então é a opção TFN + ABN com renda do exterior, $495. Revisamos sua residência fiscal, Medicare e deduções, acrescentamos um demonstrativo da sua renda e das suas despesas com ABN, incluímos sua renda do exterior, depois preparamos e enviamos sua declaração de imposto, para você não perder nada a que tem direito.

BSB: 062692
Conta: 81049952

Mande um print quando pagar e a gente começa!`,

  price_tfn_review: `Sem problema, podemos revisar uma declaração que você já enviou.

Como ela já foi enviada, esta é uma revisão de uma declaração existente, e não uma declaração nova. O valor é $330 pela revisão em si, e é o mesmo independentemente do resultado. O valor também cobre o envio da declaração corrigida, se for necessário.

BSB: 062692
Conta: 81049952

Mande um print quando pagar e a gente começa!`,

  price_tfn_abn_review: `Sem problema, podemos revisar uma declaração que você já enviou.

Como ela já foi enviada, esta é uma revisão de uma declaração existente, e não uma declaração nova. O valor é $440 pela revisão em si (GST incluso), e é o mesmo independentemente do resultado.

BSB: 062692
Conta: 81049952

Mande um print quando pagar e a gente começa!`,

  guarantee: `Se a sua restituição for menor que o nosso valor, nós devolvemos a diferença. Se não houver restituição, o nosso valor integral é cobrado.`,

  no_refund_line: `Se não houver restituição, o nosso valor integral é cobrado.`,
} as const;
