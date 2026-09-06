/**
 * Handoff tasks propose the customer's OWN language, and the operator note
 * can never reach the customer (audit, 5 Sep).
 *
 * (1) The holding line and the payment confirmation have a Library row per
 *     language, and the scheduler already sends the per-language holding line
 *     30 minutes after a handoff. The task itself still proposed the English
 *     row, so "Send Reply" put English into a German thread while waiting would
 *     have sent German. suggestReply now picks the customer's row, with the
 *     code copy in that language as fallback. English customers see no change.
 * (2) The "[Library answer, in English ...]" note that suggestReply prepends
 *     for a foreign customer was inside the sendable text and humanSend sent
 *     it verbatim. humanSend now strips a leading note; the owner still sees it.
 */
const templates: { key: string; body: string }[] = [];
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({ listTemplates: jest.fn().mockResolvedValue(templates) }),
}));
const retrieve = jest.fn().mockResolvedValue([]);
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: (...a: unknown[]) => retrieve(...a) }));

import fs from 'fs';
import path from 'path';
import { operatorNote, stripOperatorNote, suggestReply } from '@/lib/will/suggest';
import { APPROVED } from '@/lib/will/approved-messages';
import { HANDOFF_HOLDING_MSG, PAYMENT_RECEIVED_MSG, Lang } from '@/lib/will/i18n';

// UNDER_REVIEW has no pipeline message of its own, so the holding reasons fall
// through to the holding line, which is what this test is about.
type State = 'UNDER_REVIEW' | 'PAID' | 'FORM_PENDING';
const cust = (lang: string | null, state: State = 'UNDER_REVIEW') =>
  ({ state, income: 'TFN' as const, paid: true, lang, waId: '4915100000000' });

beforeEach(() => { templates.length = 0; retrieve.mockResolvedValue([]); });

describe('holding line', () => {
  it('English is unchanged: the Library row, or Jo\'s approved line', async () => {
    expect(HANDOFF_HOLDING_MSG.en).toBe(APPROVED.handoff.holding);
    expect(await suggestReply('', cust('en'), 'budget')).toBe(APPROVED.handoff.holding);
    expect(await suggestReply('', null, 'send_failed')).toBe(APPROVED.handoff.holding);
    templates.push({ key: 'handoff_holding', body: 'One moment please.' });
    expect(await suggestReply('', cust('en'), 'send_failed')).toBe('One moment please.');
    expect(await suggestReply('', cust(null), 'generic')).toBe('One moment please.');
  });

  it.each(['de', 'ja', 'es', 'fr', 'it', 'pt'] as Lang[])('a %s customer is proposed the holding line in %s', async (lang) => {
    for (const reason of ['guard_blocked', 'draft_invalid', 'budget', 'send_failed', 'generic'] as const) {
      const out = await suggestReply('', cust(lang), reason);
      expect(out).toBe(HANDOFF_HOLDING_MSG[lang]);
      expect(out).not.toMatch(/^\[/);
    }
  });

  it('the owner\'s Library row for that language wins over the code copy', async () => {
    templates.push({ key: 'handoff_holding', body: 'English edit' });
    templates.push({ key: 'handoff_holding_de', body: 'Einen Moment bitte.' });
    expect(await suggestReply('', cust('de'), 'budget')).toBe('Einen Moment bitte.');
    expect(await suggestReply('', cust('es'), 'budget')).toBe(HANDOFF_HOLDING_MSG.es);
  });
});

describe('payment confirmation', () => {
  it('a paid German customer whose reply hit a task is proposed the German confirmation', async () => {
    expect(PAYMENT_RECEIVED_MSG.en).toBe(APPROVED.payment_received);
    expect(await suggestReply('', cust('en', 'PAID'), 'guard_blocked')).toBe(APPROVED.payment_received);
    expect(await suggestReply('', cust('de', 'PAID'), 'guard_blocked')).toBe(PAYMENT_RECEIVED_MSG.de);
    expect(await suggestReply('', cust('ja', 'FORM_PENDING'), 'budget')).toBe(PAYMENT_RECEIVED_MSG.ja);
    templates.push({ key: 'payment_received_de', body: 'Zahlung da!' });
    expect(await suggestReply('', cust('de', 'FORM_PENDING'), 'generic')).toBe('Zahlung da!');
    expect(await suggestReply('', cust('en', 'FORM_PENDING'), 'generic')).toBe(APPROVED.payment_received);
  });
});

describe('operator note', () => {
  it('is still shown to the owner above an English Library answer', async () => {
    retrieve.mockResolvedValue([{ score: 0.9, answer: 'You can claim it in your return.' }]);
    const out = await suggestReply('Can I claim my flights?', cust('de'), 'generic');
    expect(out.startsWith(operatorNote('de'))).toBe(true);
    expect(stripOperatorNote(out)).toBe('You can claim it in your return.');
    expect(await suggestReply('Can I claim my flights?', cust('en'), 'generic')).toBe('You can claim it in your return.');
  });

  it('is put on the English only handoff rows for a foreign customer, and comes off cleanly', async () => {
    const out = await suggestReply('', cust('de'), 'attachment');
    expect(stripOperatorNote(out)).toBe(APPROVED.handoff.attachment);
    expect(out).not.toBe(APPROVED.handoff.attachment);
    expect(await suggestReply('', cust('en'), 'attachment')).toBe(APPROVED.handoff.attachment);
  });

  it('leaves any other text alone', () => {
    expect(stripOperatorNote('Hi Anna 😊 [see attached]')).toBe('Hi Anna 😊 [see attached]');
    expect(stripOperatorNote('  Hello')).toBe('  Hello');
  });

  it('is stripped by humanSend before any send (source shape)', () => {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/app/api/will/actions/route.ts'), 'utf8');
    expect(src).toMatch(/import \{[^}]*stripOperatorNote[^}]*\} from '@\/lib\/will\/suggest'/);
    const fn = src.slice(src.indexOf('async function humanSend('));
    const body = fn.slice(0, fn.indexOf('fillPlaceholders(rawBody'));
    expect(body).toMatch(/rawBody = stripOperatorNote\(rawBody\);/);
  });
});
