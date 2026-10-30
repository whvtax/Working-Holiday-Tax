/**
 * 30 Oct (Jo, second batch): guarantee, 7 days, review $330 / $440, DASP not
 * available, expenses (receipts, clothing, car and fuel, before payment), the
 * customer who owes tax, German and Japanese agent wording, Japanese consult.
 * Shared by Will and Mia. Invented customers only.
 */
import * as fs from 'fs';
import * as path from 'path';
import { buildSystemPrompt } from '@/lib/will/playbook';
import { APPROVED, EXPENSES_INTAKE_MSG, AGENT_PHRASES } from '@/lib/will/approved-messages';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { NO_DASP_MSG, LODGED_PAYABLE_MSG } from '@/lib/will/i18n';
import { reviewMessageIn } from '@/lib/will/instant-choice';
import { policyGuard } from '@/lib/will/policy-guard';
import { FEES_AUD, amountMatchesFee, incomeFromAmount } from '@/lib/will/payment-proof';
import { VOICES, SVT_PROMPT_ADDENDUM } from '@/lib/will/brand-voice';
import { WILL_DECIDES_PROMPT } from '@/lib/will/will-decides';

const DASH = /[—–―−]/;
const prompt = buildSystemPrompt({
  name: null, state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false,
  missingDocs: [], estimatedRefundCents: null, decisionMode: 'will',
} as never).stable;
const entry = (intent: string) => {
  const e = KNOWLEDGE_SEED.find((k) => k.intent === intent);
  if (!e) throw new Error(`no Library entry: ${intent}`);
  return e.answer;
};
const g = (paid: boolean, state = paid ? 'FORM_PENDING' : 'PRICE_SENT') => ({
  state, paid, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
  lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
}) as never;
const verdict = (text: string, paid: boolean, customerText?: string) =>
  policyGuard(text, { ...(g(paid) as object), customerText } as never).violations;
const SRC = path.join(__dirname, '..');
const sources = fs.readdirSync(SRC).filter((f) => f.endsWith('.ts')).map((f) => ({ f, t: fs.readFileSync(path.join(SRC, f), 'utf8') }));

describe('1. the guarantee says the same everywhere', () => {
  it('TFN price message carries it; ABN, foreign income and the review do not', () => {
    expect(APPROVED.price_tfn).toContain("If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.");
    for (const m of [APPROVED.price_tfn_abn, APPROVED.price_tfn_foreign, APPROVED.price_tfn_abn_foreign, APPROVED.price_tfn_review, APPROVED.price_tfn_abn_review]) {
      expect(m).not.toMatch(/refund the difference/);
    }
  });
  it('the Library pricing and two years entries no longer give the guarantee to ABN returns', () => {
    const pricing = entry('pricing');
    expect(pricing).toMatch(/On the TFN only option, if your tax refund is less than our fee/);
    expect(pricing).toMatch(/With ABN income the fee is fixed whatever the result/);
    expect(entry('worked across two financial years, two returns and two fees')).toMatch(/for TFN only returns the same guarantee/);
  });
  it('timing and scope: after the Notice of Assessment, paid within 7 days, TFN only', () => {
    const a = entry('when is the difference refunded under the guarantee');
    expect(a).toMatch(/after your Notice of Assessment/);
    expect(a).toMatch(/within 7 days of the Notice of Assessment/);
    expect(a).toMatch(/TFN only returns/);
    expect(a).toMatch(/ABN income, foreign income or a return that was already lodged/);
    expect(entry('does the guarantee apply with ABN or foreign income or an already lodged return')).toMatch(/fixed whatever the result/);
    expect(prompt).toContain('EVERYONE SAYS THE SAME');
    expect(prompt).toContain('NO guarantee with ABN, foreign income or an already lodged return');
  });
});

describe('2. a refund of our fee is paid within 7 days', () => {
  const asks = entry('customer asks for a refund of our fee');
  const status = entry('status of the refund of our fee');
  it('the holding line is gone from the Library and the playbook says 7 days with the right starting point', () => {
    expect(asks).toContain('full name, BSB and account number');
    expect(asks).toContain('within 7 days of when we have your details');
    expect(status).toContain('within 7 days');
    for (const t of [asks, status]) expect(t).not.toMatch(/will confirm the date/);
    expect(prompt).toContain('paid within 7 days of when we have their details');
    expect(prompt).toContain('the 7 days count from the Notice of Assessment');
    expect(prompt).toContain('never promise the amount of their TAX refund');
  });
  it('the old holding line is in no Library entry and no code file as customer text', () => {
    expect(KNOWLEDGE_SEED.filter((k) => /team has your details and will confirm the date|The team will confirm the date here/.test(k.answer))).toEqual([]);
    for (const { f, t } of sources) {
      if (f === 'playbook.ts') continue; // quotes it once as retired
      expect(t).not.toMatch(/The team has your details and will confirm the date here/);
    }
  });
  it('the guard allows "7 days" in this context: no DEADLINE_CLAIM, no amount, no refund promise for the Library wording', () => {
    for (const t of [asks, status]) {
      const v = verdict(t, true);
      expect(v.filter((x) => x === 'DEADLINE_CLAIM' || x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([]);
    }
    const own = verdict('Thanks for sending those. The refund is paid within 7 days of when we have your details.', true, 'please refund my fee');
    expect(own.filter((x) => x === 'DEADLINE_CLAIM' || x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([]);
    const nt = verdict('If your refund comes in under our fee, we refund the difference after your Notice of Assessment, paid within 7 days of it.', false, 'when do I get the difference?');
    expect(nt.filter((x) => x === 'DEADLINE_CLAIM' || x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([]);
  });
});

describe('3. the review of a lodged return: $330 TFN, $440 ABN, replacing $360', () => {
  it('approved messages, German and Japanese versions and the Library', () => {
    expect(APPROVED.price_tfn_review).toContain('$330 for the review itself');
    expect(APPROVED.price_tfn_abn_review).toContain('$440 for the review itself (GST included)');
    expect(reviewMessageIn('de', 'Anna')).toContain('$330');
    expect(reviewMessageIn('de', 'Anna', 'TFN_ABN')).toContain('$440');
    expect(reviewMessageIn('ja', 'Aki', 'TFN_ABN')).toContain('$440');
    expect(reviewMessageIn('ja', 'Aki')).toContain('$330');
    expect(entry('already started or lodged the return myself')).toContain('$330 with TFN or $440 with ABN');
    expect(entry('review or amend a return already lodged')).toContain('$330 with TFN or $440 with ABN');
  });
  it('no $360 remains in customer facing code, prompts or the Library', () => {
    for (const { f, t } of sources) {
      if (f === 'policy-guard.ts' || f === 'playbook.ts') continue; // both only name the retired price
      expect(t).not.toMatch(/\$\s?360\b/);
    }
    expect(KNOWLEDGE_SEED.filter((k) => /\$\s?360\b/.test(k.answer))).toEqual([]);
    expect(prompt).toContain('Never quote $360.');
    expect(WILL_DECIDES_PROMPT).toContain('$330 with TFN or $440 with ABN');
  });
  it('price tables agree: payment proof knows 330 and 440, not 360', () => {
    expect([...FEES_AUD]).toEqual([220, 385, 330, 495, 440]);
    expect(amountMatchesFee(440)).toBe(true);
    expect(amountMatchesFee(360)).toBe(false);
    expect(incomeFromAmount(440)).toBe('TFN_ABN');
  });
  it('the guard allows $330 and $440 only in the review context, and $360 never', () => {
    const review = 'It is a review of a return you have already lodged. The fee is $440 for the review itself, whatever the result.';
    expect(verdict(review, false).filter((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([]);
    expect(verdict('The fee is $330 for the review itself, whatever the result.', false).filter((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([]);
    expect(verdict('It will cost $440.', false)).toContain('FORBIDDEN_AMOUNT:440.00');
    expect(verdict('The fee is $360 for the review itself, whatever the result.', false)).toContain('FORBIDDEN_AMOUNT:360.00');
  });
});

describe('4. DASP is not available at the moment', () => {
  it('every language says it, with no timeline and no price', () => {
    expect(NO_DASP_MSG.en).toBe("Unfortunately our superannuation (DASP) service is not available at the moment. We're happy to take care of your tax return.");
    for (const t of Object.values(NO_DASP_MSG)) {
      expect(t).not.toMatch(/\$\s?\d|future|Zukunft|今後|soon|later/i);
    }
    expect(NO_DASP_MSG.de).toContain('nicht verfügbar');
    expect(NO_DASP_MSG.ja).toContain('現在ご利用いただけません');
  });
  it('Library, playbook and the student brand agree; no price offer remains', () => {
    for (const k of KNOWLEDGE_SEED.filter((e) => e.lang === 'en' && /dasp|superannuation/i.test(e.question) && /claim|withdraw/i.test(e.question))) {
      expect(k.answer).not.toMatch(/may add it|future|\$\d/);
    }
    expect(entry('super withdrawal DASP availability or price')).toMatch(/not available at the moment/);
    expect(prompt).toContain('not available at the moment');
    expect(prompt).not.toContain('we help with the super (DASP) refund as well');
    expect(VOICES.svt.daspFeeAud).toBeNull();
    expect(VOICES.wht.daspFeeAud).toBeNull();
    expect(SVT_PROMPT_ADDENDUM).not.toMatch(/say we can help with it/);
  });
});

describe('5, 6, 7. expenses: receipts, everyday clothing, before payment', () => {
  it('receipts: the $300 line stays and Will asks what the items were', () => {
    expect(EXPENSES_INTAKE_MSG.en).toContain('A list of the items is fine, up to $300. Just tell us what the items were.');
    expect(EXPENSES_INTAKE_MSG.de).toContain('bis zu $300');
    expect(EXPENSES_INTAKE_MSG.de).toContain('um welche Posten es sich handelt');
    expect(EXPENSES_INTAKE_MSG.ja).toContain('$300');
    expect(EXPENSES_INTAKE_MSG.ja).toContain('どんな品目だったか');
    expect(verdict(EXPENSES_INTAKE_MSG.ja, true).filter((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([]);
  });
  it('everyday clothing: asks compulsory or work purposes, never decides, never "can\'t go in"', () => {
    expect(EXPENSES_INTAKE_MSG.en).toContain('whether it was compulsory at work or used for work purposes');
    expect(EXPENSES_INTAKE_MSG.de).toContain('vorgeschrieben');
    expect(EXPENSES_INTAKE_MSG.ja).toContain('義務付けられていたか');
    for (const t of Object.values(EXPENSES_INTAKE_MSG)) expect(t).not.toMatch(/leider nicht\.|含められません。ジーンズ|will be accepted/);
    expect(EXPENSES_INTAKE_MSG.en).not.toMatch(/Everyday clothes like jeans, trainers or black pants can't/);
    expect(entry('everyday clothing bought for work')).toMatch(/compulsory at work, or used for work purposes/);
    expect(entry('claim work clothing footwear laundry')).not.toMatch(/can't go in/);
    expect(prompt).toContain('RECORD the answer');
    expect(prompt).toContain('never say it will be accepted');
    const doc = fs.readFileSync(path.join(__dirname, '../../../../docs/WILL_EXPENSES_MODULE_30OCT.md'), 'utf8');
    expect(doc).toMatch(/Everyday clothing[^\n]*collected on the basis "compulsory at work or used for work purposes"/);
    expect(doc).toMatch(/needs verification/);
  });
  it('before payment: a short answer with "may", no intake, no logbook, no $300', () => {
    for (const intent of ['what can i claim before paying', 'what can i claim before paying (German)', 'what can i claim before paying (Japanese)']) {
      const a = entry(intent);
      expect(a.length).toBeLessThan(700);
      expect(a).not.toMatch(/logbook|Fahrtenbuch|\$300|rego|88/);
      expect(a).not.toMatch(/will be accepted|werden akzeptiert/);
    }
    expect(entry('what can i claim before paying')).toContain('with no reimbursement, may be claimable');
    expect(entry('what can i claim before paying (German)')).toContain('kann möglicherweise geltend gemacht werden');
    expect(entry('what can i claim before paying (Japanese)')).toContain('申告できる可能性があります');
    expect(prompt).toContain('EXPENSES BEFORE PAYMENT');
    expect(prompt).toContain('the intake ([expenses_intake]) is for paid customers only');
  });
});

describe('fuel and car expenses (Jo, 30 Oct)', () => {
  it('the intake checks the trips, asks the logbook for up to 5,000 km, gives the 88 cents line once and asks the car details', () => {
    const en = EXPENSES_INTAKE_MSG.en;
    expect(en).toContain('fuel receipts');
    expect(en).toContain('from home to work');
    expect(en).toContain('Trips between work sites during working hours may be included');
    expect(en).toContain('logbook (trip diary) covering up to 5,000 km');
    expect(en.match(/88 cents per km, up to 5,000 km/g)?.length).toBe(1);
    expect(en).toContain('registration number (rego)');
    expect(en).toMatch(/when you bought it, how much it cost, and the make and model/);
    expect(EXPENSES_INTAKE_MSG.de).toMatch(/88 Cent pro km, bis zu 5\.000 km/);
    expect(EXPENSES_INTAKE_MSG.de).toContain('Kennzeichen (Rego)');
    expect(EXPENSES_INTAKE_MSG.ja).toContain('1kmあたり88セント');
    expect(EXPENSES_INTAKE_MSG.ja).toContain('車両登録番号');
    for (const t of Object.values(EXPENSES_INTAKE_MSG)) expect(t).not.toMatch(/will be accepted/);
  });
  it('the Library and the playbook carry the same rule, and a fuel receipts entry exists', () => {
    const f = entry('fuel receipts or a car expense mentioned');
    expect(f).toMatch(/Trips from home to work can't go in, but trips between work sites during working hours may be included/);
    expect(f).toContain('88 cents per km, up to 5,000 km');
    expect(f).toContain('registration number (rego)');
    expect(entry('car trips home to work or between sites')).toContain('88 cents per km, up to 5,000 km');
    expect(prompt).toContain('CAR AND FUEL (Jo, 30 Oct)');
    expect(prompt).toContain('88 cents per km, up to 5,000 km');
  });
  it('the doc lists the approved tax figures as approved by Jo on 30 Oct and keeps clothing for verification', () => {
    const doc = fs.readFileSync(path.join(__dirname, '../../../../docs/WILL_EXPENSES_MODULE_30OCT.md'), 'utf8');
    expect(doc).toMatch(/88 cents per km[^\n]*Approved by Jo on 30 Oct/);
    expect(doc).toMatch(/\$300 rule[^\n]*Approved by Jo on 30 Oct/);
    expect(doc).toMatch(/Phone and internet percentage[^\n]*Approved by Jo on 30 Oct/);
    expect(doc).not.toMatch(DASH);
  });
});

describe('8. a customer who owes tax after lodging', () => {
  it('the lodged text and the Library say 14 days, the ATO email, and "message us"; no holding line, no two weeks', () => {
    expect(LODGED_PAYABLE_MSG.en).toContain('Within 14 days you will receive an email from the ATO with the payment request and how to pay');
    expect(LODGED_PAYABLE_MSG.en).toContain('message us here and we will send it to you directly');
    expect(LODGED_PAYABLE_MSG.de).toContain('14 Tagen');
    expect(LODGED_PAYABLE_MSG.ja).toContain('14日以内');
    for (const t of Object.values(LODGED_PAYABLE_MSG)) expect(t).not.toMatch(/two weeks|zwei Wochen|2週間/);
    const ready = entry('owes tax after lodgement is it ready to pay');
    expect(ready).toContain('Within 14 days of lodging');
    expect(ready).not.toMatch(/The team will confirm|two weeks/);
    for (const intent of ['when does the tax owed have to be paid', 'ATO payment plan for tax owed']) {
      expect(entry(intent)).toMatch(/14 days/);
      expect(entry(intent)).not.toMatch(/message you (?:again )?(?:about|in about) two weeks|call the ATO yourself/);
    }
    expect(entry('the ATO payment email did not arrive')).toMatch(/sent to you directly here in this chat/);
  });
  it('the playbook answers directly, makes no task up front and creates the task only when it did not arrive', () => {
    expect(prompt).toContain('there is no task for Jo up front');
    expect(prompt).toContain('human_task for Jo to send the payment details');
    expect(prompt).not.toContain('Say the team will confirm the amount, the due date and how to pay here');
    expect(prompt).not.toMatch(/we'll message them in about two weeks/);
  });
  it('the guard lets Will say the 14 days sentence to a customer who owes', () => {
    const v = verdict('Within 14 days of lodging you will receive an email from the ATO with the payment request and how to pay. If it has not arrived, message us here and we will send it to you directly.', true, 'do I need to pay the ATO? how?');
    expect(v).toEqual([]);
  });
});

describe('9, 10, 11. agent wording in German and Japanese, and Japanese consults', () => {
  const PROTECTED = /Steuerberater|Steueragent|Steuer-Agent|税理士|税務代理/;
  it('no protected title in any customer text of the Will code or the Library', () => {
    const allowed = new Set(['knowledge-i18n.ts', 'text-normalize.ts', 'policy-guard.ts', 'playbook.ts', 'claude.ts', 'approved-messages.ts', 'send-errors.ts']); // detect or forbid, never said
    for (const { f, t } of sources) if (!allowed.has(f)) expect(t).not.toMatch(PROTECTED);
    expect(KNOWLEDGE_SEED.filter((k) => PROTECTED.test(k.answer))).toEqual([]);
    for (const m of [...Object.values(EXPENSES_INTAKE_MSG), ...Object.values(LODGED_PAYABLE_MSG), ...Object.values(NO_DASP_MSG)]) expect(m).not.toMatch(PROTECTED);
  });
  it('the approved German and Japanese phrases are exact, and the German signed off phrase is used in the German Library', () => {
    expect(AGENT_PHRASES.supervision.de).toBe('unter der Aufsicht eines registrierten australischen Tax Agent');
    expect(AGENT_PHRASES.supervision.ja).toBe('オーストラリアの登録タックスエージェントの監督のもとで運営');
    expect(AGENT_PHRASES.signedOff.de).toContain('registrierten australischen Tax Agent');
    const de = KNOWLEDGE_SEED.filter((k) => k.lang === 'de' && /Tax Agent|tax agent/i.test(k.answer));
    expect(de.length).toBeGreaterThan(0);
    for (const k of de) {
      expect(k.answer).toContain(AGENT_PHRASES.signedOff.de);
      expect(k.answer).not.toContain('Reviewed and signed off');
    }
    for (const k of KNOWLEDGE_SEED.filter((e) => e.lang === 'ja' && /タックスエージェント|tax agent/i.test(e.answer))) {
      expect(k.answer).toContain(AGENT_PHRASES.signedOff.ja);
      expect(k.answer).not.toContain('Reviewed and signed off');
    }
    expect(prompt).toContain('unter der Aufsicht eines registrierten australischen Tax Agent');
    expect(prompt).toContain(AGENT_PHRASES.supervision.ja);
  });
  it('the guard accepts the approved phrases and refuses the protected titles', () => {
    const okDe = `Wir arbeiten ${AGENT_PHRASES.supervision.de}.`;
    const okJa = `当社は${AGENT_PHRASES.supervision.ja}しています。`;
    expect(verdict(okDe, false)).not.toContain('PROTECTED_AGENT_TITLE');
    expect(verdict(okJa, false)).not.toContain('PROTECTED_AGENT_TITLE');
    expect(verdict(AGENT_PHRASES.signedOff.de + '.', false)).not.toContain('PROTECTED_AGENT_TITLE');
    expect(verdict(AGENT_PHRASES.signedOff.ja + '。', false)).not.toContain('PROTECTED_AGENT_TITLE');
    for (const bad of ['Wir sind Steuerberater.', 'Ein Steueragent prüft alles.', '当社は登録税理士が確認します。', '税務代理人が対応します。']) {
      expect(verdict(bad, false)).toContain('PROTECTED_AGENT_TITLE');
    }
  });
  it('a Japanese customer can be told they can consult us in Japanese: Library line and playbook rule', () => {
    expect(entry('can I talk to you in Japanese')).toContain('日本語でご相談いただけます');
    expect(prompt).toContain('consult us in Japanese');
  });
});

describe('no dashes in anything new', () => {
  it('the new Library entries, messages and prompt blocks', () => {
    const intents = ['fuel receipts or a car expense mentioned', 'when is the difference refunded under the guarantee', 'does the guarantee apply with ABN or foreign income or an already lodged return',
      'super withdrawal DASP availability or price', 'the ATO payment email did not arrive', 'can I talk to you in Japanese', 'everyday clothing bought for work'];
    for (const i of intents) expect(entry(i)).not.toMatch(DASH);
    for (const t of [...Object.values(LODGED_PAYABLE_MSG), ...Object.values(NO_DASP_MSG), ...Object.values(EXPENSES_INTAKE_MSG), APPROVED.price_tfn_review, APPROVED.price_tfn_abn_review,
      AGENT_PHRASES.supervision.de, AGENT_PHRASES.supervision.ja, AGENT_PHRASES.signedOff.de, AGENT_PHRASES.signedOff.ja]) expect(t).not.toMatch(DASH);
  });
});
