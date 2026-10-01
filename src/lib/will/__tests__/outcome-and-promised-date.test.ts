/**
 * 1 Oct, second round after the 72-hour audit:
 *  - the "tax payable" outcome (Jo's toggle): estimate and lodged wording,
 *    the prompt, the review ask;
 *  - "I'll fill it in on Wednesday" pauses the form reminders;
 *  - the three ABN answers rule.
 */
import { promisedUntil } from '@/lib/will/promised-date';
import { ESTIMATE_PAYABLE_MSG, LODGED_PAYABLE_MSG, estimatePayableTemplateKey, lodgedPayableTemplateKey } from '@/lib/will/i18n';
import { buildSystemPrompt } from '@/lib/will/playbook';
import { policyGuard } from '@/lib/will/policy-guard';
import { EXPECTED_META_TEMPLATES } from '@/lib/will/channel';

describe('promisedUntil', () => {
  const now = new Date('2026-09-28T04:00:00Z'); // a Monday
  it('reads a weekday with a future cue', () => {
    const u = promisedUntil("I'm up north until Tuesday, I will fill in Wednesday as I have receipts if that's ok", now)!;
    expect(u.slice(0, 10)).toBe('2026-10-01'); // Wednesday 30 Sep, end of day + 12 h grace -> 1 Oct 11:59Z
  });
  it('tomorrow, next week, in N days, tonight', () => {
    expect(promisedUntil("I'll do it tomorrow", now)!.slice(0, 10)).toBe('2026-09-30');
    expect(promisedUntil('next week I will send everything', now)!.slice(0, 10)).toBe('2026-10-06');
    expect(promisedUntil('in 3 days', now)!.slice(0, 10)).toBe('2026-10-02');
    expect(promisedUntil("I'll get to it tonight", now)!.slice(0, 10)).toBe('2026-09-29');
  });
  it('German and Japanese', () => {
    expect(promisedUntil('Ich mache das am Freitag', now)!.slice(0, 10)).toBe('2026-10-03');
    expect(promisedUntil('明日送ります', now)!.slice(0, 10)).toBe('2026-09-30');
  });
  it('says nothing for a plain question or an unrelated weekday', () => {
    expect(promisedUntil('how long does the review take?', now)).toBeNull();
    expect(promisedUntil('I started the job on a Monday in March', now)).toBeNull();
    expect(promisedUntil('', now)).toBeNull();
  });
});

describe('the tax-payable outcome', () => {
  const ctx = { state: 'LODGED' as const, paid: true, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: true, estimateFromTeam: null };
  it('payable wordings never mention a refund arriving', () => {
    for (const v of Object.values(LODGED_PAYABLE_MSG)) { expect(v).not.toMatch(/refund|Rückerstattung|還付金は/); expect(v).toMatch(/Notice of Assessment/); }
    for (const v of Object.values(ESTIMATE_PAYABLE_MSG)) { expect(v).toContain('{{AMOUNT}}'); expect(v).toContain('{{INVOICE_LINK}}'); expect(v).not.toMatch(/refund/i); }
    expect(policyGuard(LODGED_PAYABLE_MSG.en, ctx).allowed).toBe(true);
  });
  it('has Library keys and Meta template names per language', () => {
    expect(estimatePayableTemplateKey('de')).toBe('estimate_payable_de');
    expect(lodgedPayableTemplateKey('en')).toBe('lodged_payable');
    const names = EXPECTED_META_TEMPLATES.map((t) => t.name);
    expect(names).toEqual(expect.arrayContaining(['lodged_payable', 'lodged_payable_ja', 'estimate_payable', 'estimate_payable_de']));
  });
  it('the prompt tells Will the customer owes and bans refund talk', () => {
    const { dynamic, stable } = buildSystemPrompt({ name: 'Alex', state: 'LODGED', income: 'TFN', paid: true, formComplete: true, missingDocs: [], estimatedRefundCents: 291091, outcome: 'PAYABLE', lang: 'en' });
    const all = stable + dynamic;
    expect(all).toMatch(/amount PAYABLE to the ATO/);
    expect(all).toMatch(/OUTCOME: TAX PAYABLE/);
    expect(all).toMatch(/Never write anything about a refund arriving/);
    const def = buildSystemPrompt({ name: 'Alex', state: 'LODGED', income: 'TFN', paid: true, formComplete: true, missingDocs: [], estimatedRefundCents: 291091, lang: 'en' });
    expect(def.stable + def.dynamic).not.toMatch(/OUTCOME: TAX PAYABLE/);
  });
  it('the playbook carries the three-ABN-answers rule', () => {
    const { stable } = buildSystemPrompt({ name: 'F', state: 'FORM_COMPLETE', income: 'TFN_ABN', paid: true, formComplete: true, missingDocs: [], estimatedRefundCents: null, lang: 'en' });
    expect(stable).toMatch(/THE THREE ABN ANSWERS/);
  });
});
