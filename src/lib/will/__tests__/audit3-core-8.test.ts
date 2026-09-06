/**
 * A paid customer's document drop is acknowledged in THEIR language
 * (audit, 5 Sep).
 *
 * `suggestReply('', customer, 'documents_after_payment')` is both the task's
 * suggested reply and, on Autopilot, what service.ts sends on its own. It
 * resolved to the English-only Library row `handoff_documents_after_payment`,
 * so a German customer who had just been thanked in German for their
 * questionnaire sent payslips and got "Perfect, got it all" in English. Now it
 * goes through the same language machinery as the other post-payment sends:
 * the customer's Library row first, then the code copy in their language.
 * English customers see exactly what they saw before.
 */
const templates: { key: string; body: string }[] = [];
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({ listTemplates: jest.fn().mockResolvedValue(templates) }),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));

import { suggestReply } from '@/lib/will/suggest';
import { APPROVED } from '@/lib/will/approved-messages';
import { DOCUMENTS_RECEIVED_MSG, documentsReceivedTemplateKey, documentsReceivedMessage, Lang } from '@/lib/will/i18n';
import { seedTemplates } from '@/lib/will/seed';

const paid = (lang: string | null) => ({ state: 'PAID' as const, income: 'TFN_ABN' as const, paid: true, lang, waId: '4915100000000' });

beforeEach(() => { templates.length = 0; });

it('English is unchanged: the Library row, or Jo\'s approved line', async () => {
  expect(await suggestReply('', paid('en'), 'documents_after_payment')).toBe(APPROVED.handoff.documents_after_payment);
  expect(DOCUMENTS_RECEIVED_MSG.en).toBe(APPROVED.handoff.documents_after_payment);
  templates.push({ key: 'handoff_documents_after_payment', body: 'Got them, thanks!' });
  expect(await suggestReply('', paid('en'), 'documents_after_payment')).toBe('Got them, thanks!');
  expect(await suggestReply('', paid(null), 'documents_after_payment')).toBe('Got them, thanks!');
});

it.each(['de', 'ja', 'es', 'fr', 'it', 'pt'] as Lang[])('a %s customer gets the acknowledgement in %s', async (lang) => {
  const out = await suggestReply('', paid(lang), 'documents_after_payment');
  expect(out).toBe(DOCUMENTS_RECEIVED_MSG[lang]);
  expect(out).not.toBe(APPROVED.handoff.documents_after_payment);
  expect(out).not.toMatch(/[-–—]/);
});

it('the owner\'s Library edit for that language wins over the code copy', async () => {
  templates.push({ key: 'handoff_documents_after_payment', body: 'English edit' });
  templates.push({ key: 'handoff_documents_after_payment_de', body: 'Alles da, danke!' });
  expect(await suggestReply('', paid('de'), 'documents_after_payment')).toBe('Alles da, danke!');
  // A language with no Library row yet falls back to the code copy in that
  // language, never to the English row.
  expect(await suggestReply('', paid('es'), 'documents_after_payment')).toBe(DOCUMENTS_RECEIVED_MSG.es);
});

it('an unknown language falls back to English, like every other auto-send', () => {
  expect(documentsReceivedMessage('nl')).toBe(DOCUMENTS_RECEIVED_MSG.en);
  expect(documentsReceivedTemplateKey('nl')).toBe('handoff_documents_after_payment');
  expect(documentsReceivedTemplateKey('de')).toBe('handoff_documents_after_payment_de');
});

it('every language row is seeded so it is editable in the Library', () => {
  const seeded = new Map(seedTemplates().map((t) => [t.key, t.body]));
  for (const lang of Object.keys(DOCUMENTS_RECEIVED_MSG) as Lang[]) {
    expect(seeded.get(documentsReceivedTemplateKey(lang))).toBe(DOCUMENTS_RECEIVED_MSG[lang]);
  }
});
