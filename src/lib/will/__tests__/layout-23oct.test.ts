/** Jo, 23 Oct: long messages go out in short paragraphs, in every language. */
import { paragraphise, splitSentences } from '@/lib/will/layout';
import { APPROVED } from '@/lib/will/approved-messages';
import { PAYMENT_RECEIVED_MSG, RESIDENCY_CHECK_MSG } from '@/lib/will/i18n';

const EN = "No problem at all, we can do everything from here wherever you are. You don't need myGov, we deal with the ATO directly through our tax agent portal. Once you've paid, you'll get a short form to fill in with your details. The team then reviews your residency, Medicare and deductions before anything is lodged. Your refund goes straight to your bank account. Just send a screenshot once paid and we'll get started!";

it('a long English block becomes short paragraphs, not a word changed', () => {
  const out = paragraphise(EN);
  const paras = out.split('\n\n');
  expect(paras.length).toBeGreaterThanOrEqual(2);
  for (const p of paras) expect(p.length).toBeLessThanOrEqual(260);
  expect(out.replace(/\s+/g, ' ')).toBe(EN.replace(/\s+/g, ' '));
});

it('German, with an abbreviation that is not a sentence end', () => {
  const de = 'Kein Problem, wir erledigen alles von hier aus. Du brauchst kein myGov, z.B. auch keinen Login beim ATO, denn wir arbeiten direkt über unser Portal. Nach der Zahlung bekommst du ein kurzes Formular. Danach prüft das Team deine Ansässigkeit, Medicare und deine Abzüge, bevor etwas eingereicht wird. Die Rückerstattung geht direkt auf dein Konto.';
  const s = splitSentences(de);
  expect(s.some((x) => x.endsWith('z.B.'))).toBe(false);
  const out = paragraphise(de);
  expect(out.split('\n\n').length).toBeGreaterThanOrEqual(2);
  expect(out.replace(/\s+/g, ' ')).toBe(de.replace(/\s+/g, ' '));
});

it('Japanese, split at 。', () => {
  const ja = '問題ありません。どこにいらっしゃってもこちらで全て対応できます。myGovは必要ありません。弊社が税理士ポータルを通じてATOと直接やり取りします。お支払い後に簡単なフォームをお送りします。その後、チームが居住区分やメディケア、控除を確認してから申告します。還付金はお客様の銀行口座に直接振り込まれます。';
  const out = paragraphise(ja);
  expect(out.split('\n\n').length).toBeGreaterThanOrEqual(3);
  expect(out.replace(/\n/g, '')).toBe(ja);
});

it('links, amounts and emoji do not break a sentence in the wrong place', () => {
  const t = "The fee is $220.50 for this one, and here's the form: https://workingholidaytax.com.au/tax-form. Fill it in when you can 😊 We then review everything and come back to you here. If anything is unclear, just ask me and I'll explain it. The team usually starts the same day. Thanks again for choosing us, it really means a lot.";
  const s = splitSentences(t);
  expect(s[0]).toContain('$220.50');
  expect(s.join(' ')).toContain('https://workingholidaytax.com.au/tax-form.');
  expect(paragraphise(t).replace(/\s+/g, ' ')).toBe(t);
});

it('short messages and laid-out ones are left exactly as they are', () => {
  expect(paragraphise("You're very welcome! 😊")).toBe("You're very welcome! 😊");
  for (const m of [APPROVED.price_tfn, APPROVED.price_tfn_abn, APPROVED.opening, PAYMENT_RECEIVED_MSG.de, RESIDENCY_CHECK_MSG.ja]) {
    expect(paragraphise(m)).toBe(m);
  }
});

it('a list keeps its lines', () => {
  const list = 'Here is what we need:\n- your passport\n- your TFN\n- your payslips';
  expect(paragraphise(list)).toBe(list);
});
