/**
 * 30 Oct (Jo): expenses module, stock line retired, THIRTY DAYS OF CHATS block.
 */
import { buildSystemPrompt } from '@/lib/will/playbook';
import { APPROVED, EXPENSES_INTAKE_MSG, EXPENSES_DONE_MSG, AGENT_PHRASES } from '@/lib/will/approved-messages';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { WILL_DECIDES_PROMPT } from '@/lib/will/will-decides';
import { policyGuard } from '@/lib/will/policy-guard';
import * as fs from 'fs';
import * as path from 'path';

const prompt = buildSystemPrompt({
  name: null, state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false,
  missingDocs: [], estimatedRefundCents: null, decisionMode: 'will',
} as never).stable;

const between = (from: string, to: string) => {
  const i = prompt.indexOf(from);
  const j = prompt.indexOf(to, i + from.length);
  expect(i).toBeGreaterThan(-1);
  expect(j).toBeGreaterThan(i);
  return prompt.slice(i, j);
};
const expensesBlock = between('# EXPENSES: ALL OF IT IS YOURS', '# THIRTY DAYS OF CHATS, 30 OCT');
const thirtyBlock = between('# THIRTY DAYS OF CHATS, 30 OCT', '# "YES" TO THE ESTIMATE');
const preBlock = between('# PRE PAYMENT TAX QUESTIONS', '# THE CAREFUL BUYER');
const NEW_ENTRY_INTENTS = [
  'work expenses intake after payment', 'work expenses intake after payment (German)', 'work expenses intake after payment (Japanese)',
  'what can i claim before paying', 'what can i claim before paying (German)', 'what can i claim before paying (Japanese)',
  'car trips home to work or between sites', 'expenses mentioned after ticking no expenses', 'customer asks for a refund of our fee',
  'status of the refund of our fee', 'overseas and cannot log in to myGov or the ATO', 'owes tax after lodgement is it ready to pay',
];
const newEntries = KNOWLEDGE_SEED.filter((k) => NEW_ENTRY_INTENTS.includes(k.intent));
const DASH = /[—–―−]/;

describe('30 Oct blocks exist', () => {
  it('has both new blocks and the retired stock line section', () => {
    expect(expensesBlock).toContain('You COLLECT, you never DECIDE');
    expect(thirtyBlock).toContain('POINT BY POINT');
    expect(thirtyBlock).toContain('A REFUND OF OUR FEE');
    expect(thirtyBlock).toContain('paid within 7 days');
    expect(thirtyBlock).toContain('Never the retired "the team will confirm the date here"');
    expect(thirtyBlock).toContain('IS THIS A BOT');
    expect(preBlock).toContain('the stock line is retired');
  });
  it('adds all the Library entries (3 languages for intake and pre payment)', () => {
    expect(newEntries.length).toBe(NEW_ENTRY_INTENTS.length);
    expect(newEntries.filter((k) => k.lang === 'de').length).toBe(2);
    expect(newEntries.filter((k) => k.lang === 'ja').length).toBe(2);
  });
});

describe('no dashes in the new text', () => {
  it('blocks, messages, entries and docs', () => {
    for (const t of [expensesBlock, thirtyBlock, preBlock, ...Object.values(EXPENSES_INTAKE_MSG), ...Object.values(EXPENSES_DONE_MSG),
      APPROVED.objections.o7_professional_question, APPROVED.objections.o13_one_question,
      ...newEntries.map((k) => k.answer + k.question + k.examples.join(' '))]) {
      expect(t).not.toMatch(DASH);
    }
    const doc = fs.readFileSync(path.join(__dirname, '../../../../docs/WILL_EXPENSES_MODULE_30OCT.md'), 'utf8');
    expect(doc).not.toMatch(DASH);
  });
});

describe('only the two approved agent phrases', () => {
  const OK1 = 'operates under the supervision of a registered tax agent';
  const OK2 = 'Reviewed and signed off by a registered tax agent before it is lodged with the ATO';
  it('every mention of a registered tax agent sits inside an approved phrase', () => {
    for (const t of [expensesBlock, thirtyBlock, preBlock, ...Object.values(EXPENSES_INTAKE_MSG),
      APPROVED.objections.o7_professional_question, APPROVED.objections.o13_one_question, ...newEntries.map((k) => k.answer)]) {
      let stripped = t.split(OK1).join('').split(OK2).join('');
      for (const p of [AGENT_PHRASES.supervision.de, AGENT_PHRASES.supervision.ja, AGENT_PHRASES.signedOff.de, AGENT_PHRASES.signedOff.ja]) stripped = stripped.split(p).join('');
      expect(stripped).not.toMatch(/registered tax agent|tax agent|Steuerberater|税理士/i);
    }
  });
});

describe('expenses wording rules', () => {
  it('never says claimable, no need, a percentage or a promise', () => {
    for (const t of [...Object.values(EXPENSES_INTAKE_MSG), ...Object.values(EXPENSES_DONE_MSG), ...newEntries.map((k) => k.answer)]) {
      expect(t).not.toMatch(/(?<!may be )claimable|no need|we can't claim/i);
      expect(t).not.toMatch(/\d+ ?%/);
    }
    expect(EXPENSES_DONE_MSG.en).toBe('Thanks, I have what we need on expenses.');
  });
  it('asks the home to work question and all the items in one message', () => {
    const m = EXPENSES_INTAKE_MSG.en;
    for (const w of ['from home to work', 'between work sites', 'lunch runs', 'trip diary', 'logbook', '88 cents per km, up to 5,000 km', 'registration number (rego)', 'make and model', 'notes app', 'own it or rent it',
      'rental invoices', "yearly km report", 'earnings summary', 'timesheet', 'percentage', 'jeans, trainers or black pants', 'compulsory at work or used for work purposes', 'highlighted', 'up to $300', 'what the items were']) {
      expect(m).toContain(w);
    }
  });
  it('the English intake passes the Policy Guard for a paid customer', () => {
    const r = policyGuard(EXPENSES_INTAKE_MSG.en, {
      state: 'FORM_PENDING', paid: true, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
      lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
    } as never);
    expect(r.violations).toEqual([]);
  });
});

describe('the stock line is retired', () => {
  const STOCK = /one of the many things we check/i;
  it('is gone from the approved messages, the prompt for Will and the playbook except as history', () => {
    expect(JSON.stringify(APPROVED)).not.toMatch(STOCK);
    expect(WILL_DECIDES_PROMPT).not.toMatch(STOCK);
    expect(prompt).not.toMatch(STOCK);
    expect(prompt).not.toMatch(/definitely one of the many/i);
  });
  it('remains in the Library only in the two residency entries Jo asked to leave untouched', () => {
    const left = KNOWLEDGE_SEED.filter((k) => STOCK.test(k.answer)).map((k) => k.intent).sort();
    expect(left).toEqual(['asked for a residency ruling on their own facts', 'tax residency question']);
  });
  it('the refund outcome answer is the refund_chance form', () => {
    const k = KNOWLEDGE_SEED.find((e) => e.intent === 'how much tax do i owe on my income')!;
    expect(k.answer).toContain('We can only give you an estimate after a thorough review');
  });
});

describe('THIRTY DAYS rules mention the required items', () => {
  it('lists the prices and the never handover list', () => {
    for (const w of ['$330 with TFN or $440 with ABN', '$220', '$385', '$330', '$495', 'no $110 consultation'.replace('no ', 'There is no '), 'DASP', 'price times the number of years',
      'refund_chance', 'legitimacy', 'payment_link_offer', 'status of a refund of OUR fee'.replace('status of a', 'the status of a'),
      'stop trying and not call the ATO', 'One warm closing line, then silence', 'within 14 days they receive an email from the ATO', 'each person pays separately'.replace('each', 'Each')]) {
      expect(thirtyBlock).toContain(w);
    }
  });
});
