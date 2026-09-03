/**
 * Opting out takes an explicit ask, not the word "stop" (audit, 3 Sep).
 *
 * `\bstop\b` anywhere in a message opted people out for good: "Can I stop my
 * ABN and still get a refund?" got no reply ever again, every follow-up was
 * cancelled, and Jo's own answer bounced with "customer opted out". Now an
 * explicit phrase anywhere, in any language Will speaks, or the bare word as
 * the whole message.
 */
jest.mock('@/lib/will/store', () => ({ getStore: () => ({}) }));
import { isOptOut } from '@/lib/will/service';

it('an ordinary sentence containing "stop" is not an opt-out', () => {
  for (const t of [
    'Hi! Can I stop my ABN and still get a refund?',
    'When should I stop working to get the full refund?',
    'I did a stopover in Bali on the way',
    'Please stop the review for now, I found my payslips, will send them',
    'ok stop worrying, I paid it this morning',
  ]) expect([t, isOptOut(t)]).toEqual([t, false]);
});

it('the bare word as the whole message is', () => {
  for (const t of ['STOP', 'stop', 'Stopp.', 'unsubscribe', 'basta', 'やめて']) expect([t, isOptOut(t)]).toEqual([t, true]);
});

it('an explicit ask anywhere is, in every language Will speaks', () => {
  for (const t of [
    'Please unsubscribe me from these messages',
    'stop messaging me',
    "I'm not interested, leave me alone",
    'Bitte nicht mehr schreiben, danke',
    'No me escribas más por favor',
    "Arrête de m'écrire",
    'Smettila di scrivermi',
    'Para de me mandar mensagens',
    '配信停止をお願いします',
    'もう連絡しないでください',
  ]) expect([t, isOptOut(t)]).toEqual([t, true]);
});
