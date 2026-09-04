/**
 * The gaps and false positives the 20-agent audit found on 4 Sep, pinned.
 *
 * FALSE POSITIVES (a correct message was refused and became a task):
 *   - the Japanese opening, because 対象 ("eligible") in "Medicare, every
 *     eligible deduction" read as a Medicare determination;
 *   - the team's own estimate figure, in English and in Japanese;
 *   - objection #9's worked example once translated.
 * GAPS (something unsafe was allowed to send, in some cases on Autopilot):
 *   - negative determinations ("you are NOT a resident", "you do not need to
 *     pay the Medicare levy", "you will definitely get a refund", "your boots
 *     are deductible");
 *   - Italian and Portuguese residency lines, whose \b could never match an
 *     accented word;
 *   - a bare refund figure in de/es/fr/it/pt;
 *   - the RETIRED guarantee line and its paraphrases in every language;
 *   - "the fee is refundable" in the passive/possessive form, every language;
 *   - fee, price and guarantee talk after payment in the six other languages.
 */
import { policyGuard } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';

const ctx = (o: Record<string, unknown> = {}) => ({
  aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
  lastCustomerMsgAt: new Date(), state: 'NEW_LEAD' as const, paid: false,
  isApprovedTemplate: false, ...o,
}) as Parameters<typeof policyGuard>[1];

const allows = (t: string, o?: Record<string, unknown>) => policyGuard(t, ctx(o)).allowed;
const blocks = (t: string, o?: Record<string, unknown>) => !policyGuard(t, ctx(o)).allowed;

describe('no longer refused (the reply is correct and must send)', () => {
  it('the Japanese opening', () => {
    expect(allows('税務上の居住区分、Medicare、対象となるすべての控除を含め、チームがあなたの確定申告を全面的に確認します。')).toBe(true);
  });
  it("the team's own estimate", () => {
    expect(allows('Your estimated tax refund is $1,234.00.', { estimateFromTeam: 123400 })).toBe(true);
    expect(allows('推定還付金は$1,234です。', { estimateFromTeam: 123400 })).toBe(true);
  });
  it("objection #9's worked example in Japanese", () => {
    expect(allows('例えば還付金が$100で料金が$220なら、$120を返金します。')).toBe(true);
  });
  it('the approved corpus itself', () => {
    const fill = (b: string) => b.replace(/\{\{BSB\}\}/g, '062692').replace(/\{\{ACCOUNT\}\}/g, '81049952');
    for (const [k, body] of [['opening', APPROVED.opening], ['price_tfn', APPROVED.price_tfn],
      ['price_tfn_abn', APPROVED.price_tfn_abn], ['payment_received', APPROVED.payment_received],
      ['legitimacy', APPROVED.legitimacy], ...Object.entries(APPROVED.objections)] as [string, string][]) {
      expect([k, policyGuard(fill(body), ctx()).violations]).toEqual([k, []]);
    }
  });
});

describe('now blocked (it was sending)', () => {
  it.each([
    ['you are NOT a resident', 'You are not a resident for tax purposes.'],
    ['negative Medicare determination', 'You do not need to pay the Medicare levy.'],
    ['a promised refund', 'You will definitely get a refund.'],
    ['a named deduction', 'Your boots are deductible.'],
    ['Italian residency', 'Lei è residente fiscale.'],
    ['Portuguese residency', 'És não residente para efeitos fiscais.'],
    ['German bare refund figure', 'Deine Rückerstattung beträgt 1.800.'],
    ['Spanish bare refund figure', 'Tu reembolso es de 1.800.'],
    ['French bare refund figure', 'Ton remboursement est de 1.800.'],
    ['Italian bare refund figure', 'Il tuo rimborso è di 1.800.'],
    ['the retired line, English', 'So our fee never costs you more than the refund you get back.'],
    ['the retired line, German', 'Die Gebühr kostet dich nie mehr als deine Rückerstattung.'],
    ['the retired line, Spanish', 'Nunca te cuesta más que tu reembolso.'],
    ['the fee is refundable', 'The fee is fully refundable if you end up owing.'],
    ['the fee will be refunded', 'The fee will be refunded to you.'],
    ['German passive fee refund', 'Du bekommst die Gebühr zurück.'],
    ['Spanish passive fee refund', 'Recuperas la tarifa completa.'],
    ['French passive fee refund', 'Les frais sont entièrement remboursables.'],
    ['Italian passive fee refund', 'La tariffa è rimborsabile.'],
    ['Japanese full fee refund', '料金は全額お返しします。'],
  ])('%s', (_name, text) => expect(blocks(text)).toBe(true));

  it('the honest owing line still sends', () => {
    expect(allows('If you owe money to the ATO instead, the fee covers the work completed and is non-refundable.')).toBe(true);
  });

  it.each([
    ['German', 'Die Gebühr von $220 deckt alles ab.'],
    ['Japanese', '料金についてご心配なく。'],
    ['Spanish', 'La tarifa cubre todo el trabajo.'],
  ])('sales content after payment, %s', (_n, text) => {
    expect(blocks(text, { paid: true, state: 'UNDER_REVIEW' })).toBe(true);
  });
});
