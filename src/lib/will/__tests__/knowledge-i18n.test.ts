/**
 * Learned answers are found in every language Will speaks (audit, 3 Sep).
 *
 * The pack is English and retrieval is lexical, so a German, Spanish, French,
 * Italian, Portuguese or Japanese question used to share no token with its
 * entry and the model answered from the playbook alone (DE 1/10, ES 2/10,
 * JA 0/10 of the top questions found their answer). knowledge-i18n.ts maps
 * the words those customers use to the English keywords the pack is indexed
 * on; this pins that the bridge finds the same entries an English customer's
 * question does, and that English retrieval is untouched.
 */
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';

const rows = KNOWLEDGE_SEED.map((e, i) => ({
  id: `k${i}`, intent: e.intent, question: e.question, examples: e.examples ?? [], answer: e.answer,
  keywords: e.keywords ?? [], tags: e.tags ?? [], lang: e.lang ?? 'en', weight: 1, status: 'active', source: 'mined',
  createdAt: '', updatedAt: '',
}));
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ listKnowledge: jest.fn().mockResolvedValue(rows) }) }));

import { retrieveKnowledge } from '@/lib/will/knowledge';
import { bridgeTokens } from '@/lib/will/knowledge-i18n';

const topIntents = async (msg: string, lang?: string) => (await retrieveKnowledge(msg, { lang })).map((h) => h.intent);

describe('the same question finds the same entry in every language', () => {
  const cases: [string, string, string][] = [
    ['de', 'Kann ich erst bezahlen, nachdem ich die Rückerstattung bekommen habe?', 'pay after refund'],
    ['es', '¿Puedo pagar después de recibir mi reembolso?', 'pay after refund'],
    ['fr', 'Puis-je payer après avoir reçu mon remboursement ?', 'pay after refund'],
    ['it', 'Posso pagare dopo aver ricevuto il rimborso?', 'pay after refund'],
    ['pt', 'Posso pagar depois de receber o meu reembolso?', 'pay after refund'],
    ['ja', '還付金を受け取ってから支払うことはできますか？', 'pay after refund'],
    ['de', 'Könnt ihr auch meine Rente (Superannuation) zurückholen?', 'super claim'],
    ['ja', 'スーパー（年金）の払い戻しも手伝ってもらえますか？', 'super claim'],
    ['es', 'Ya cerré mi cuenta bancaria australiana, ¿a dónde va el reembolso?', 'bank account'],
    ['ja', 'オーストラリアの銀行口座はもう閉鎖しました。還付金はどこに振り込まれますか？', 'bank account'],
    ['de', 'Warum muss ich vorher bezahlen?', 'why pay first'],
  ];
  it.each(cases)('%s: %s', async (lang, msg, expected) => {
    const hits = await topIntents(msg, lang);
    expect(hits.join(' | ').toLowerCase()).toContain(expected);
  });
});

it('an English message gains no bridge tokens, so English retrieval is unchanged', () => {
  expect(bridgeTokens('Can I pay after I receive my tax refund?')).toEqual([]);
});

it('a bridge token reaches the English entry through the same scoring as an English word', async () => {
  const en = await topIntents('Can I pay after I receive my tax refund?', 'en');
  const de = await topIntents('Kann ich nach der Rückerstattung bezahlen?', 'de');
  expect(en[0]).toBe('pay after refund');
  expect(de[0]).toBe('pay after refund');
});
