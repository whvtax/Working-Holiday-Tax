/**
 * 25 Sep, Rose (+44 7931 932828): "am I eligible to be taxed as an Australian
 * resident or a working holiday maker?" got "Great question, Rose! You're
 * absolutely right that it makes a big difference. This depends on your
 * individual circumstances, so we check it carefully rather than guess.
 * That's exactly what our team reviews once we get started."
 *
 * Jo: before payment we do not want to give information that ends with them
 * lodging alone, so the answer to nearly every "am I / can I / will I" question
 * before payment is ONE line: "Yes, that's definitely one of the many things we
 * check before we lodge your tax return, so leave that with us." Then the next
 * step. The Library answers ARE that line, the guard blocks the hedge before
 * payment, and the engine sends the line instead of a task.
 */
import { policyGuard } from '@/lib/will/policy-guard';
import { PRE_PAYMENT_CHECK_MSG, PROFESSIONAL_QUESTION_MSG, professionalQuestionMessage } from '@/lib/will/i18n';
import { APPROVED } from '@/lib/will/approved-messages';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { buildSystemPrompt } from '@/lib/will/playbook';
import { describeViolation } from '@/lib/will/send-errors';

const LINE = "Yes, that's definitely one of the many things we check before we lodge your tax return, so leave that with us. 😊";
const ROSE_REPLY = "Great question, Rose! You're absolutely right that it makes a big difference.\n\nThis depends on your individual circumstances, so we check it carefully rather than guess. That's exactly what our team reviews once we get started.\n\nWhich option works for you, TFN ($220) or TFN + ABN ($385)?";

const ctx = (paid: boolean) => ({
  state: paid ? 'FORM_PENDING' as const : 'PRICE_SENT' as const, paid, aiPaused: false, killSwitch: false,
  optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
});

describe('the one line is Jo\'s wording and is what the engine falls back to', () => {
  it('English is verbatim and every language has it', () => {
    expect(PRE_PAYMENT_CHECK_MSG.en).toBe(LINE);
    for (const l of ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt'] as const) expect(PRE_PAYMENT_CHECK_MSG[l].length).toBeGreaterThan(30);
    expect(professionalQuestionMessage('en')).toBe(LINE);
    expect(PROFESSIONAL_QUESTION_MSG).toBe(PRE_PAYMENT_CHECK_MSG);
  });

  it('no language carries a dash, a price or a figure', () => {
    for (const v of Object.values(PRE_PAYMENT_CHECK_MSG)) {
      expect(v).not.toMatch(/[—–]/);
      expect(v).not.toMatch(/\$|\d/);
    }
  });

  it('is guard-clean before payment in every language', () => {
    for (const v of Object.values(PRE_PAYMENT_CHECK_MSG)) {
      expect(policyGuard(v, ctx(false)).allowed).toBe(true);
    }
  });
});

describe('the Rose reply is blocked before payment and the line goes instead', () => {
  it('flags PRE_PAYMENT_HEDGE before payment', () => {
    const v = policyGuard(ROSE_REPLY, ctx(false));
    expect(v.allowed).toBe(false);
    expect(v.violations).toContain('PRE_PAYMENT_HEDGE');
  });

  it('each hedge sentence trips it on its own', () => {
    for (const s of [
      'Great question! Which option works for you?',
      'This depends on your individual circumstances, so we check it carefully rather than guess.',
      "That's exactly what our team reviews once we get started.",
      'It depends on your situation.',
      'Das hängt von deiner individuellen Situation ab.',
    ]) expect(policyGuard(s, ctx(false)).violations).toContain('PRE_PAYMENT_HEDGE');
  });

  it('is NOT flagged after payment: the team is already on it then', () => {
    expect(policyGuard('It depends on your individual circumstances, and the team is checking it now.', ctx(true)).violations).not.toContain('PRE_PAYMENT_HEDGE');
  });

  it('has a plain-language explanation for the handoff card', () => {
    expect(describeViolation('PRE_PAYMENT_HEDGE')).toMatch(/one of the many things we check/);
  });
});

describe('the Library and the approved messages carry the line, not the hedge', () => {
  const byIntent = (i: string) => KNOWLEDGE_SEED.find((k) => k.intent === i)!;

  it('the four pre-payment answers are the line', () => {
    expect(byIntent('tax residency question').answer).toBe(LINE);
    expect(byIntent('tax free threshold eligibility').answer).toBe(LINE);
    expect(byIntent('how much tax do i owe on my income').answer).toBe(LINE);
    expect(byIntent('asked for a residency ruling on their own facts').answer).toContain(LINE);
  });

  it('the already-paid residency answer stays as it was (different stage)', () => {
    expect(byIntent('tax residency question (already paid, form submitted)').answer).toMatch(/page three of the tax return form/);
  });

  it('no Library answer that Will could use before payment opens with "great question"', () => {
    for (const k of KNOWLEDGE_SEED) expect(k.answer).not.toMatch(/^that's a great question/i);
  });

  it('objection #7 is the line and #13 leans on it', () => {
    expect(APPROVED.objections.o7_professional_question).toBe(LINE);
    expect(APPROVED.objections.o13_one_question).toMatch(/one of the many things we check before we lodge/);
    expect(JSON.stringify(APPROVED.objections)).not.toMatch(/depends on your individual situation/);
  });
});

describe('the playbook states the rule', () => {
  const { stable } = buildSystemPrompt({
    name: 'Rose', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false,
    formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en',
  });
  it('names the line, the two-line shape and the banned sentences', () => {
    expect(stable).toMatch(/THE ONE LINE THAT ANSWERS ALMOST EVERYTHING BEFORE PAYMENT/);
    expect(stable).toContain(LINE);
    expect(stable).toMatch(/That is the whole reply\. Two lines\./);
    expect(stable).toMatch(/NEVER before payment: "Great question"/);
  });
});
