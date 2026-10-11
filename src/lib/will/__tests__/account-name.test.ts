/**
 * Full audit, 11 Oct 2026, decision 4: the account name has one answer.
 * Neta got "Simple Tax Services", Laura and Marta "Working Holiday Tax".
 */
import { isAccountNameQuestion, namesAccountWrongly, accountNameMessage, ACCOUNT_NAME_MSG } from '@/lib/will/account-name';
import { policyGuard } from '@/lib/will/policy-guard';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { APPROVED } from '@/lib/will/approved-messages';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { readFileSync } from 'fs';
import { join } from 'path';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;
beforeEach(() => decideMock.mockReset());

const ctx = { state: 'PRICE_SENT' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };

describe('the question', () => {
  it.each([
    "What's the account name?", 'what name do I put for the transfer', 'my bank shows a different name, is this right?', 'The name doesn\'t match',
    'Wie lautet der Kontoname?', 'Auf welchen Namen überweise ich?', '口座名義を教えてください', '名義は何ですか？', '¿A nombre de quién?', 'Quel est le nom du compte ?', 'Qual è l\'intestatario?',
  ])('recognises: %s', (t) => expect(isAccountNameQuestion(t)).toBe(true));
  it.each([
    'What is your name?', 'Do you need my full name?', 'I worked for a company called Academy Cafe on an ABN', 'TFN please',
    'I have a long story: ' + 'x '.repeat(120) + ' what name do I put',
  ])('does not fire on: %s', (t) => expect(isAccountNameQuestion(t)).toBe(false));
});

describe('the answer', () => {
  it('is Jo\'s wording in seven languages, no explanation', () => {
    expect(accountNameMessage('en')).toBe('The account name is The Accounting Academy.\n\nBSB: 062692\nAccount: 81049952');
    expect(accountNameMessage('de')).toBe('Der Kontoname ist The Accounting Academy.\n\nBSB: 062692\nKonto: 81049952');
    expect(accountNameMessage('ja')).toBe('口座名義は The Accounting Academy です。\n\nBSB: 062692\n口座番号: 81049952');
    expect(accountNameMessage('xx')).toBe(ACCOUNT_NAME_MSG.en);
    for (const v of Object.values(ACCOUNT_NAME_MSG)) {
      expect(v).toContain('The Accounting Academy');
      expect(v).not.toMatch(/firm|agreement|Kanzlei|会計事務所|[—–]/);
      expect(policyGuard(v, ctx).allowed).toBe(true);
    }
  });
  it('the Library entries carry the same wording', () => {
    const e = KNOWLEDGE_SEED.filter((k) => /account name/i.test(k.intent));
    expect(e.length).toBeGreaterThanOrEqual(2);
    for (const k of e) expect(k.answer).toContain('The account name is The Accounting Academy.\n\nBSB: 062692\nAccount: 81049952');
  });
});

describe('the guard', () => {
  it('refuses a wrong or vague account name', () => {
    expect(namesAccountWrongly('The account name is Simple Tax Services.')).toBe(true);
    expect(namesAccountWrongly('Put Working Holiday Tax as the recipient name.')).toBe(true);
    expect(namesAccountWrongly('The account name is The Accounting Academy Services Pty Ltd.')).toBe(true);
    expect(namesAccountWrongly("Yes that's the right account, the name is correct, go ahead.")).toBe(false);
    expect(namesAccountWrongly('The account name is The Accounting Academy.')).toBe(false);
    expect(policyGuard('The account name is Simple Tax Services. BSB 062692, Account 81049952', ctx).violations).toContain('ACCOUNT_NAME_WRONG');
    expect(policyGuard(APPROVED.price_tfn, ctx).violations).not.toContain('ACCOUNT_NAME_WRONG');
  });
  it('a wrongly named draft becomes the fixed answer, not a task', async () => {
    decideMock.mockResolvedValueOnce({ action: 'reply', reply_text: 'The account name is Simple Tax Services, you can go ahead with the transfer.', confidence: 0.9 });
    const input: EngineInput = {
      ctx: { name: 'Neta', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] },
      guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
      history: [{ role: 'assistant', text: APPROVED.price_tfn }, { role: 'customer', text: 'and the account name? my bank asks for it' }],
      mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' },
    };
    const out = await runEngine(input);
    expect(out.kind).toBe('queued');
    expect(out.replyText).toBe(accountNameMessage('en'));
  });
});

describe('at ingest', () => {
  it('the question is answered from the code before the timer, in the customer language', () => {
    const src = readFileSync(join(__dirname, '..', 'service.ts'), 'utf8');
    const idx = src.indexOf('isAccountNameQuestion(text)');
    const defer = src.indexOf('const armed = await armAutoReply(store, customer);');
    expect(idx).toBeGreaterThan(0);
    expect(idx).toBeLessThan(defer);
    expect(src).toMatch(/accountNameMessage\(customer\.lang\)/);
  });
});
