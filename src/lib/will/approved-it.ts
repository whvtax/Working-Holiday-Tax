// ============================================================
// Italian (it) wording for the Working Holiday Tax price and guarantee
// messages. Meaning comes from the English APPROVED object in
// approved-messages.ts (price_tfn, price_tfn_abn, price_tfn_foreign,
// price_tfn_abn_foreign, price_tfn_review, price_tfn_abn_review, and the
// guarantee sentences). Form, terms and length follow
// docs/engineering/language-blocks/it.md: "tu", "tariffa", "rimborso",
// "dichiarazione dei redditi", "modulo", no dashes, no emoji in money messages.
//
// Italian wording written by an agent acting as reviewer. Not checked by a native speaker.
// 18 Nov (language review, it.md): "dichiarazione modificata" (the amended return); the
// screenshot line is the price flow's own line.
//
// The guarantee (both sentences) is for TFN-only returns only. It is in
// price_tfn and nowhere else: not in the ABN, foreign-income or review texts.
// ============================================================

export const APPROVED_IT = {
  price_tfn: `Perfetto, quindi è l'opzione TFN, $220. Esaminiamo la tua residenza fiscale, Medicare e le deduzioni, poi prepariamo e presentiamo la tua dichiarazione dei redditi, in modo che tu non perda nulla a cui hai diritto.

BSB: 062692
Conto: 81049952

Se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza. Se non c'è nessun rimborso, si applica la nostra tariffa piena.

Mandaci uno screenshot dopo aver pagato e iniziamo!`,

  price_tfn_abn: `Perfetto, quindi è l'opzione TFN + ABN, $385. Esaminiamo la tua residenza fiscale, Medicare e le deduzioni, aggiungiamo un allegato per l'attività con le entrate e le spese del tuo ABN, poi prepariamo e presentiamo la tua dichiarazione dei redditi, in modo che tu non perda nulla a cui hai diritto.

BSB: 062692
Conto: 81049952

Mandaci uno screenshot dopo aver pagato e iniziamo!`,

  price_tfn_foreign: `Perfetto, quindi è l'opzione TFN con redditi esteri, $330. Esaminiamo la tua residenza fiscale, Medicare e le deduzioni, includiamo i tuoi redditi esteri, poi prepariamo e presentiamo la tua dichiarazione dei redditi, in modo che tu non perda nulla a cui hai diritto.

BSB: 062692
Conto: 81049952

Mandaci uno screenshot dopo aver pagato e iniziamo!`,

  price_tfn_abn_foreign: `Perfetto, quindi è l'opzione TFN + ABN con redditi esteri, $495. Esaminiamo la tua residenza fiscale, Medicare e le deduzioni, aggiungiamo un allegato per l'attività con le entrate e le spese del tuo ABN, includiamo i tuoi redditi esteri, poi prepariamo e presentiamo la tua dichiarazione dei redditi, in modo che tu non perda nulla a cui hai diritto.

BSB: 062692
Conto: 81049952

Mandaci uno screenshot dopo aver pagato e iniziamo!`,

  price_tfn_review: `Nessun problema, possiamo esaminare una dichiarazione che hai già presentato.

Dato che è già stata presentata, si tratta di una revisione della dichiarazione esistente e non di una nuova. La tariffa è di $330 per la revisione in sé e resta la stessa, qualunque sia il risultato. Copre anche la presentazione della dichiarazione modificata, se serve.

BSB: 062692
Conto: 81049952

Mandaci uno screenshot dopo aver pagato e iniziamo!`,

  price_tfn_abn_review: `Nessun problema, possiamo esaminare una dichiarazione che hai già presentato.

Dato che è già stata presentata, si tratta di una revisione della dichiarazione esistente e non di una nuova. La tariffa è di $440 per la revisione in sé (GST inclusa) e resta la stessa, qualunque sia il risultato.

BSB: 062692
Conto: 81049952

Mandaci uno screenshot dopo aver pagato e iniziamo!`,

  guarantee: `Se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza. Se non c'è nessun rimborso, si applica la nostra tariffa piena.`,

  no_refund_line: `Se non c'è nessun rimborso, si applica la nostra tariffa piena.`,
};
