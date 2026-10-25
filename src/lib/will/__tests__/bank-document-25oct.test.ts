/** Jo, 25 Oct (+49 160): "is the bank statement really needed?" got "No".
 *  It is required: an official document with full name, BSB and account. */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import fs from 'fs';
import path from 'path';
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { BANK_DOC_DENIED_RE, bankDocumentMessage } from '@/lib/will/i18n';
import { renderApproved, APPROVED_KEYS } from '@/lib/will/will-decides';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const ASK = 'Hallo, ich komme nicht mehr in mein online banking rein. Dementsprechend kann ich auch kein bankstatment herunterladen. Ist es zwingend erforderlich?';
const WRONG = 'Nein, du brauchst kein Bankstatement.\n\nIm Formular gibst du einfach deine australischen Bankdaten an (Bankleitzahl und Kontonummer), damit die ATO deine Rückerstattung überweisen kann. Mehr brauchen wir dazu nicht.';

const input = (lang: string): EngineInput => ({
  ctx: { name: 'Lena', state: 'FORM_PENDING', income: 'TFN', paid: true, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [], decisionMode: 'will' },
  guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
  history: [{ role: 'assistant', text: 'Sehr gerne! 😊' }, { role: 'customer', text: ASK }],
  mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
});

it('spots "not needed" in English, German and Japanese, and not the right answer', () => {
  expect(BANK_DOC_DENIED_RE.test(WRONG)).toBe(true);
  expect(BANK_DOC_DENIED_RE.test("No, you don't need a bank statement.")).toBe(true);
  expect(BANK_DOC_DENIED_RE.test('銀行明細は不要です。')).toBe(true);
  for (const l of ['en', 'de', 'ja']) expect(BANK_DOC_DENIED_RE.test(bankDocumentMessage(l) ?? '')).toBe(false);
});

it('the wrong German answer is replaced by Jo\'s wording', async () => {
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: WRONG } as never);
  const out = await runEngine(input('de'));
  expect(out.replyText).toBe(bankDocumentMessage('de'));
  expect(out.replyText).toContain('BSB');
  expect(out.replyText).not.toContain('brauchst kein');
});

it('a language with no wording goes to the team', async () => {
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: "No, you don't need a bank statement." } as never);
  const out = await runEngine(input('fr'));
  expect(out.kind).toBe('human_task');
});

it('Will can choose it himself, and the playbook says it is required', () => {
  expect(APPROVED_KEYS).toContain('bank_document');
  const base = { state: 'FORM_PENDING' as const, firstName: null, firstContact: false, lastWillText: '', foreign: false };
  expect(renderApproved('bank_document', { ...base, lang: 'ja' })).toContain('BSB');
  const pb = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/playbook.ts'), 'utf8');
  expect(pb).toContain('THE BANK DOCUMENT IS REQUIRED');
});
