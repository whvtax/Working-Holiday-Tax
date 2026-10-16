/** 16 Oct (Jo, Minami +61 478 455 106): a German or Japanese first message
 *  that already names the track gets the approved price message at once, in
 *  their language, instead of "I've passed this to the team". */
import { detectChoice, priceMessageIn, hasPriceIn } from '@/lib/will/instant-choice';
import { policyGuard } from '@/lib/will/policy-guard';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('the choice, in German and Japanese', () => {
  it.each([
    ['こんにちは。タックスリターンについて相談したいです。 TFNで雇用されて働いていました。', 'TFN'],
    ['TFNのみです', 'TFN'],
    ['ABNはありません', 'TFN'],
    ['ウーバーイーツの配達もしていました', 'TFN_ABN'],
    ['Ich hatte keine ABN, nur TFN', 'TFN'],
    ['Ich war angestellt', 'TFN'],
    ['Ich habe auch als Lieferdienst gearbeitet', 'TFN_ABN'],
  ])('%s → %s', (t, track) => { expect(detectChoice(t, null)).toBe(track); });
});

describe('the message', () => {
  const ctx = { state: 'NEW_LEAD' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: true, estimateFromTeam: null };
  it('Japanese first contact: greeting, the right plan, bank, guarantee, screenshot', () => {
    const m = priceMessageIn('ja', 'TFN', true, 'Minami');
    expect(m.startsWith('こんにちは、Minamiさん😊')).toBe(true);
    expect(m).toContain('TFNのみのプランが合いそうです：$220。');
    expect(m).toContain('BSB: 062692\nAccount: 81049952');
    expect(m).toContain('差額を返金');
    expect(policyGuard(m, ctx).allowed).toBe(true);
  });
  it('German reply to the opening question, TFN + ABN', () => {
    const m = priceMessageIn('de', 'TFN_ABN', false);
    expect(m.startsWith('Alles klar, also die TFN + ABN-Option, $385.')).toBe(true);
    expect(m).toContain('die Differenz');
    expect(m).not.toMatch(/[—–]/);
    expect(policyGuard(m, ctx).allowed).toBe(true);
  });
  it('only German and Japanese have their own; others stay as before', () => {
    expect(hasPriceIn('de')).toBe(true);
    expect(hasPriceIn('ja')).toBe(true);
    expect(hasPriceIn('es')).toBe(false);
  });
  it('wired into the instant path (source-pinned)', () => {
    const service = readFileSync(join(__dirname, '..', 'service.ts'), 'utf8');
    expect(service).toMatch(/\(customer\.lang \?\? 'en'\) === 'en' \|\| hasPriceIn\(customer\.lang\)/);
    expect(service).toMatch(/priceMessageIn\(customer\.lang, track, firstContact/);
  });
});
