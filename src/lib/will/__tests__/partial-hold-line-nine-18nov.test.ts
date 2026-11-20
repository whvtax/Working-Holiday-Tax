/**
 * VERIFY-18nov, open item 5 (closed 18 Nov): the "checking the rest with the team" line of a
 * partial answer exists in all nine languages, with the English meaning and no time promise, so
 * a draft with a [TEAM:] point sends its answered parts in every language. Synthetic data only.
 */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, toPartialAnswer, PARTIAL_HOLD_LINE, type EngineInput } from '@/lib/will/engine';
import { policyGuard } from '@/lib/will/policy-guard';
import { LANGS } from '@/lib/will/i18n';

const DASH = /[‒-―−⸺⸻﹘]/;
// Time words in the nine languages: the English line promises no time, so no translation may.
const TIME = /\b(?:today|tomorrow|soon|shortly|hours?|minutes?|days?|asap|heute|morgen|bald|gleich|Stunden?|Tagen?|hoy|mañana|pronto|horas?|minutos?|días?|aujourd'hui|demain|bientôt|heures?|jours?|oggi|domani|presto|ore|giorni|hoje|amanhã|em breve|logo|dias?)\b|今日|明日|すぐ|時間以内|今天|明天|马上|尽快|小时|hôm nay|ngày mai|sớm|ngay/i;
const ctx = (paid: boolean) => ({
  state: paid ? 'FORM_PENDING' : 'PRICE_SENT', paid, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
  lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
}) as never;

describe('the partial-answer hold line in all nine languages', () => {
  it('has all nine and nothing else', () => {
    expect(Object.keys(PARTIAL_HOLD_LINE).sort()).toEqual([...LANGS].sort());
    expect(PARTIAL_HOLD_LINE.en).toBe("I'm checking the rest with the team and will come back to you here."); // locked English unchanged
  });
  it.each(LANGS)('%s: no dash, no time promise, passes the guard before and after payment', (l) => {
    const line = PARTIAL_HOLD_LINE[l];
    expect(line).not.toMatch(DASH);
    expect(line).not.toMatch(TIME);
    for (const paid of [false, true]) expect([l, paid, policyGuard(line, ctx(paid)).violations]).toEqual([l, paid, []]);
  });
  it.each(LANGS)('%s: toPartialAnswer keeps the answer, drops the marker, adds the line', (l) => {
    const p = toPartialAnswer('First part of the answer, with enough words to be real.\n\n[TEAM: the open point]', l);
    expect(p?.open).toEqual(['the open point']);
    expect(p?.reply).toContain(PARTIAL_HOLD_LINE[l]);
    expect(p?.reply).not.toMatch(/\[TEAM/);
  });
});

describe('a Spanish multi-question draft now sends its answered part', () => {
  it('queued with the Spanish hold line and a task for the open point only', async () => {
    const draft = 'Sí, necesitamos el extracto bancario oficial con tu nombre, BSB y número de cuenta.\n\n[TEAM: cuánto será el Medicare levy]';
    (decide as jest.Mock).mockResolvedValue({ action: 'human_task', confidence: 0.9, task_reason: 'Medicare levy amount', suggested_reply: draft });
    const input = {
      ctx: { name: 'Ana', state: 'FORM_PENDING', income: 'TFN', paid: true, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'es', knowledge: [], decisionMode: 'will' },
      guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
      history: [{ role: 'assistant', text: 'Gracias.' }, { role: 'customer', text: '¿Necesitan el extracto bancario? ¿Cuánto será mi Medicare levy?' }],
      mode: 'FULL_AUTO', bank: { bsb: '000000', account: '00000000' }, decisionMode: 'will', partialAnswer: true,
    } as unknown as EngineInput;
    const out = await runEngine(input);
    expect(out.kind).toBe('queued');
    expect(out.replyText).toContain(PARTIAL_HOLD_LINE.es);
    expect(out.replyText).not.toMatch(/\[TEAM/);
    expect(out.followUpTask?.reason).toMatch(/cuánto será el Medicare levy/);
  });
});
