/**
 * Library retrieval, 3 Nov review (wave 2).
 *
 * A synthetic set of customer questions (anonymised paraphrases of what the
 * 72h export shows) is run against the REAL seed with the module's own
 * retrieveKnowledge(). Recall = a right entry is among the hits (top 3);
 * multi-part questions need every part found. Negatives are small talk and
 * off-topic lines that must not pull an answer.
 */
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';

const rows = KNOWLEDGE_SEED.map((e, i) => ({
  id: `k${i}`, intent: e.intent, question: e.question, examples: e.examples ?? [], answer: e.answer,
  keywords: e.keywords ?? [], tags: e.tags ?? [], lang: e.lang ?? 'en', weight: 1, status: 'active', source: 'mined',
  createdAt: '', updatedAt: '',
}));
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ listKnowledge: jest.fn().mockResolvedValue(rows), listTemplates: jest.fn().mockResolvedValue([]) }) }));

import { retrieveKnowledge, KNOWLEDGE_THRESHOLD, splitQuestions, tokenize, stem } from '@/lib/will/knowledge';
import { contradicts, contactNumbers } from '@/lib/will/knowledge';
import { suggestReply } from '@/lib/will/suggest';
import { isThanksLine, isClosingOnly, hasQuestionOrRequest } from '@/lib/will/text-normalize';

type Case = { lang: string; q: string; want: RegExp[] };
const C = (lang: string, q: string, ...want: RegExp[]): Case => ({ lang, q, want });

const POSITIVE: Case[] = [
  C('en', 'What is the bank account name?', /account name/i),
  C('en', 'What name will I put as the account holder?', /account name/i),
  C('de', 'Was für einen Namen soll ich bei der Überweisung angeben?', /account name/i),
  C('en', 'I have lost access to my ATO account, will you still be able to do it?', /cannot access myGov|cannot log in to myGov|myGov/i),
  C('en', 'Are you guys registered tax agents?', /registered agent|is this legit/i),
  C('en', 'Will I have any issues because of the deadline today?', /deadline/i),
  C('en', 'Until when can this be submitted?', /deadline|lodge/i),
  C('en', 'I think I owe money, is the full fee still required?', /fee if refund|owe|payable|guarantee/i),
  C('en', 'If I submitted the payment today, would you be able to provide feedback today?', /timeline after payment|when will the team reply/i),
  C('en', 'I have no receipts but I can get screenshots of stuff I bought?', /no invoices or bank statements/i),
  C('en', 'Is there any expenses I am eligible to claim working in hospo?', /expenses|claim/i),
  C('en', 'I also did 2 jobs as a landscaper with an ABN. Do you take that into account?', /abn/i),
  C('en', 'How can I get started and how much does it cost?', /pricing/i),
  C('en', 'Can I pay you after the refund arrives?', /pay after refund/i),
  C('en', 'My bank says the payee details are incorrect and paused the transfer', /bank warns/i),
  C('en', 'Do I need to give you my myGov password?', /login details/i),
  C('en', 'what is the password?', /login details|password/i),
  C('en', 'Is there another way for me to review the document before I sign?', /review the return|signing documents/i),
  C('en', 'I have signed, what next?', /signed/i),
  C('en', 'Where do I find the Medicare exemption form?', /where to find the Medicare/i),
  C('en', 'My Australian number does not work anymore, how do I fill in the form?', /phone number/i),
  C('en', 'Is the estimated refund a true reflection of what I will receive?', /estimate/i),
  C('en', 'How long until the refund arrives in my account?', /when does the refund arrive|refund has not arrived/i),
  C('en', 'Do you need my payslips?', /payslips/i),
  C('en', 'Can you do my partner return too?', /two people/i),
  C('en', 'Would a Wise account work for the refund?', /Wise/i),
  C('en', 'I ticked no expenses in the form but I do have some', /expenses mentioned after ticking/i),
  C('en', 'Can I claim my laundry and work boots?', /clothing footwear laundry/i),
  C('de', 'Kann ich erst nach der Rückerstattung bezahlen?', /pay after refund/i),
  C('de', 'Sieht gut aus, wo muss ich unterschreiben?', /signature document|signing|review the return|signed/i),
  C('de', 'Ist es ein Problem, dass die ABN Steuern aus dem Jahr 2024/25 zu spät sind?', /earlier tax year|multiple years|ABN/i),
  C('de', 'Kann ich einzelne Screenshots vom Kontoauszug schicken und markieren?', /bank statement|cannot access banking/i),
  C('de', 'Was soll ich bei australischer Adresse angeben? Ich bin ja nicht mehr da', /australian phone and address|phone number/i),
  C('de', 'Ich habe keinen Zugriff mehr auf mein Online Banking', /cannot log in to online banking|cannot access banking/i),
  C('de', 'Was beinhaltet diese Rückerstattung? Auch meine Superannuation?', /super/i),
  C('ja', 'オーストラリアの電話番号が使えなくなったので登録ができません', /phone number/i),
  C('ja', '最初のログインでSMSが届かないので進めません', /phone|log in|myGov/i),
  C('ja', 'これってそのままサインしたらいいですか？', /sign/i),
  C('ja', 'オーストラリア居住者でやってもらってもいいですか？', /residen/i),
  C('ja', '還付金はいつ入金されますか？', /when does the refund arrive|refund has not arrived/i),
  C('ja', '料金はいくらですか？', /pricing/i),
  // multi-part: every part must be found
  C('en', 'Is the fee GST included? And can I pay after the refund?', /GST/i, /pay after refund/i),
  C('en', 'Do you need my payslips and does the signing link ask me to log in?', /payslips/i, /signing documents/i),
  C('en', 'Which documents do I send after the form, and when does the refund arrive?', /which documents to send/i, /when does the refund arrive|refund has not arrived/i),
  C('en', 'Can I claim my phone and also my laundry?', /claim phone/i, /clothing footwear laundry/i),
];

const NEGATIVE: Case[] = [
  C('en', 'Hi, am I speaking with Josh?'),
  C('en', 'Thank you so much!'),
  C('en', 'Nevermind'),
  C('en', 'I see, thank you no I was just asking to clarify'),
  C('en', 'Good morning'),
  C('en', 'Which transfer?'),
  C('en', 'What would you advise then?'),
  C('de', 'ok das heißt ich muss nur abwarten'),
  C('de', 'Ein Freund von mir ist gerade in Australien'),
  C('ja', 'ご確認ありがとうございます！'),
  C('ja', 'こんにちは！フォームを送信しました'),
  C('en', 'What is the weather like in Sydney this weekend?'),
];

async function run(c: Case) {
  return retrieveKnowledge(c.q, { lang: c.lang, k: 3 });
}

// Measured on the unchanged retrieval (3 Nov, before this change):
//   recall 31/45, top-1 correct 23/41, 6 of 12 non-questions pulled an answer.
// After: recall 40/45, top-1 30/41, 4 of 12.
describe('recall on the synthetic customer set', () => {
  it('finds a right entry for at least 88% of the questions (was 69%)', async () => {
    let ok = 0;
    const miss: string[] = [];
    for (const c of POSITIVE) {
      const hits = await run(c);
      if (c.want.every((re) => hits.some((h) => re.test(h.intent)))) ok++;
      else miss.push(c.q);
    }
    expect(ok / POSITIVE.length).toBeGreaterThanOrEqual(0.88);
  });

  it('puts the right entry first for most single questions (was 56%)', async () => {
    let top1 = 0, single = 0;
    for (const c of POSITIVE.filter((x) => x.want.length === 1)) {
      single++;
      const hits = await run(c);
      if (hits[0] && c.want[0].test(hits[0].intent)) top1++;
    }
    expect(top1 / single).toBeGreaterThanOrEqual(0.7);
  });

  it('does not pull an answer for small talk, thanks or off-topic lines (no worse than before)', async () => {
    let wrong = 0;
    for (const c of NEGATIVE) if ((await run(c)).length) wrong++;
    expect(wrong).toBeLessThanOrEqual(4);
  });
});

describe('single mechanisms', () => {
  it('"what is the password?" now reaches an entry (scored 0.30 against a 0.35 floor)', async () => {
    const hits = await retrieveKnowledge('what is the password?');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].score).toBeGreaterThanOrEqual(KNOWLEDGE_THRESHOLD);
  });

  it('one common word is not a question', async () => {
    expect(await retrieveKnowledge('Which transfer?')).toEqual([]);
    expect(await retrieveKnowledge('Thank you so much!')).toEqual([]);
    expect(await retrieveKnowledge('ご確認ありがとうございます！', { lang: 'ja' })).toEqual([]);
  });

  it('a thank-you with a question in it is still answered, with or without a question mark', async () => {
    const hits = await retrieveKnowledge('Danke, wann kommt die Rückerstattung auf mein Konto', { lang: 'de' });
    expect(hits.map((h) => h.intent).join('|')).toMatch(/refund/i);
  });

  it('a message with two questions gets an entry for each', async () => {
    const hits = await retrieveKnowledge('How much does it cost and do I need to send my passport?', { k: 3 });
    const intents = hits.map((h) => h.intent).join('|');
    expect(intents).toMatch(/pricing/);
    expect(intents).toMatch(/passport/);
  });

  it('splitQuestions separates parts and leaves a single question alone', () => {
    expect(splitQuestions('Is the fee GST included? And can I pay after the refund?')).toHaveLength(2);
    expect(splitQuestions('Can I pay after the refund?')).toEqual([]);
  });

  it('Japanese is split into character pairs so it can match a Japanese entry', () => {
    const t = tokenize('銀行口座を教えてください');
    expect(t).toEqual(expect.arrayContaining(['銀行', '行口', '口座']));
    expect(tokenize('です')).toEqual([]);
  });

  it('stems let lodged / lodging / claims meet lodge / claim', () => {
    expect(stem('lodged')).toBe(stem('lodge'));
    expect(stem('lodging')).toBe(stem('lodge'));
    expect(stem('claims')).toBe(stem('claim'));
    expect(stem('submitted')).toBe(stem('submit'));
  });
});

describe('closing lines in German and Japanese', () => {
  it('a thanks that carries a question is not a pure thank-you', () => {
    expect(isThanksLine('Danke, wo muss ich unterschreiben')).toBe(false);
    expect(isClosingOnly('Danke, wann kommt das Geld')).toBe(false);
    expect(hasQuestionOrRequest('ありがとう、いつ届きますか')).toBe(true);
  });
  it('a pure thank-you still is one', () => {
    expect(isThanksLine('ご確認ありがとうございます！')).toBe(true);
    expect(isThanksLine('Vielen Dank!')).toBe(true);
    expect(isClosingOnly('Danke dir')).toBe(true);
  });
});


describe('contradicting entries', () => {
  it('two answers with different bank or phone numbers contradict; the same number or no number does not', () => {
    expect(contradicts('Pay BSB 111 222 account 33445566', 'Pay BSB 999 888 account 77665544')).toBe(true);
    expect(contradicts('Call 0400 000 001', 'Call +61 400 000 001')).toBe(false);
    expect(contradicts('The fee is $220', 'The fee is $385')).toBe(false);
    expect(contactNumbers('$385 and 14 days')).toEqual(new Set());
  });
});

describe('suggestReply still offers a strong Library answer with the re-based scores', () => {
  it('offers a clear, strong Library answer', async () => {
    const out = await suggestReply('Where do I find the Medicare exemption form?', null, 'generic');
    expect(out).toMatch(/exemption/i);
  });
});
