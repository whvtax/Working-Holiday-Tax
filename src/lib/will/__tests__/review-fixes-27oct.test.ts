/** Final review, 27 Oct: regressions found in the 26-27 Oct hotfixes. */
import { readFileSync } from 'fs';
import { join } from 'path';
import { looksLikePaymentConfirmation } from '@/lib/will/payment-confirmation';
import { stripDashes } from '@/lib/will/text';

const src = (p: string) => readFileSync(join(process.cwd(), p), 'utf8');

it('"Payment received" only counts when the phrase closes itself', () => {
  for (const t of ['Payment received, thanks Sam!', 'Payment received.', 'Payment received', 'Payment received! Here is the form']) expect(looksLikePaymentConfirmation(t)).toBe(true);
  for (const t of ["Payment received isn't showing on our side yet, could you send a screenshot?", 'Payment received? Not yet on our side']) expect(looksLikePaymentConfirmation(t)).toBe(false);
});

it('Japanese gets 、 after kana, and punctuation is not doubled', () => {
  expect(stripDashes('確認しました—ありがとうございます')).toBe('確認しました、ありがとうございます');
  expect(stripDashes('確認しました。——ありがとうございます')).toBe('確認しました。ありがとうございます');
  expect(stripDashes('我们会帮你报税——一般 24 小时内回复')).toBe('我们会帮你报税，一般 24 小时内回复');
});

it('a yes counts for the check-in only when the check-in was the last thing sent, and only a delivered one', () => {
  const svc = src('src/lib/will/service.ts');
  expect(svc).toMatch(/checkinWasLast && saysYesToRefundCheckin\(text\)/);
  expect(svc).toMatch(/if \(yesToCheckin && !hasQuestionOrRequest\(text\)/);
  expect(src('src/lib/will/scheduler.ts')).toMatch(/if \(out\.ok\) await patchReviewAsk\(store, c\.id, \{ checkinAt/);
});

it('the deadline 15 May line is limited to the current year, and the Library answer is date-free', () => {
  expect(src('src/lib/will/playbook.ts')).toMatch(/Never a 15 May date for an earlier year/);
  expect(src('src/lib/will/seed.ts')).toMatch(/marker: 'fix-27oct'/);
  expect(src('src/lib/will/knowledge-seed.ts')).not.toMatch(/with us before 31 October, you have more time/);
});

it('llms.txt never says the fee is refunded when there is no refund', () => {
  const g = src('scripts/generate-llms.mjs');
  expect(g).toMatch(/If there is no refund, or you owe tax, the full fee applies/);
  expect(g).not.toMatch(/'If your refund is less than our fee, we refund the difference, so you are never out of pocket/);
});

it('knowledge fixes run each batch once, in order, never re-running an earlier one', async () => {
  const { applyKnowledgeFixes } = await import('@/lib/will/seed');
  const settings: Record<string, string> = { knowledge_fix: 'fix-25oct' };
  const rows = [
    { id: 'a', question: 'Is there a deadline for paying and getting my tax return lodged?', answer: 'old' },
    { id: 'b', question: 'Can you help me claim my superannuation (DASP)?', answer: 'edited by Jo' },
  ];
  const updates: string[] = [];
  const store = {
    listKnowledge: async () => rows,
    updateKnowledge: async (id: string) => { updates.push(id); },
    getSetting: async (k: string) => settings[k] ?? null,
    setSetting: async (k: string, v: string) => { settings[k] = v; },
  } as unknown as Parameters<typeof applyKnowledgeFixes>[0];
  expect(await applyKnowledgeFixes(store)).toBe(1);
  expect(updates).toEqual(['a']);
  expect(settings.knowledge_fix).toBe('fix-27oct');
  expect(await applyKnowledgeFixes(store)).toBe(0);
});
