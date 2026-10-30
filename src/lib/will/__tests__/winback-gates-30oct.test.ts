/**
 * 30 Oct 2026, real file store, model and WhatsApp mocked: a winback is never
 * made to someone who said no, never in English to a customer who does not
 * write English, and the stored paragraph is cleaned before it is sent.
 */
import os from 'os';
import path from 'path';
import { mkdtempSync } from 'fs';

const dir = mkdtempSync(path.join(os.tmpdir(), 'winback-30oct-'));
jest.spyOn(process, 'cwd').mockImplementation(() => dir);
const decideWinback = jest.fn();
jest.mock('@/lib/will/claude', () => ({ decideWinback: (...a: unknown[]) => decideWinback(...a) }));
jest.mock('@/lib/will/ai-budget', () => ({ aiBudgetExhausted: async () => false }));
const deliverOut = jest.fn(async (..._a: unknown[]) => ({ ok: true }));
jest.mock('@/lib/will/channel', () => ({ deliverOut: (...a: unknown[]) => deliverOut(...a) }));
jest.mock('@/lib/will/config', () => ({ ...jest.requireActual('@/lib/will/config'), withinQuietHours: () => true }));

it('winbacks: no message after a no, no English to a French lead, stale payee and dashes cleaned', async () => {
  const { getStore } = await import('@/lib/will/store');
  const { runWinbackPass } = await import('@/lib/will/winback-auto');
  const store = getStore();
  const old = new Date(Date.now() - 40 * 86400_000).toISOString();
  const mk = async (wa: string, name: string, said: string) => {
    const c = await store.createCustomer({ waId: wa, name } as never);
    await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: said } as never);
    await store.setState(c.id, 'PRICE_SENT', 'AI');
    await store.setState(c.id, 'WENT_COLD', 'SYSTEM');
    await store.updateCustomer(c.id, { lastMessageAt: old, lastCustomerMsgAt: old } as never);
    return c.id;
  };
  const refused = await mk('61400000011', 'Tom Test', "Thanks, I'll pass, going with someone else");
  const french = await mk('61400000012', 'Lea Test', 'Bonjour, je voudrais savoir pour mon remboursement');
  const english = await mk('61400000013', 'Sam Test', 'How much is it?');
  decideWinback.mockImplementation(async (ev: { label: string }) => ({
    decision: 'send', reason: 'Went quiet.', confidence: 0.8,
    message: /Sam/.test(ev.label)
      ? 'You asked about the price. Pay Simple Tax Services — or ask us anything, we are here.'
      : 'Vous aviez une question sur le remboursement, voulez-vous que nous nous en occupions ?',
  }));

  const s = await runWinbackPass(Date.now(), 120_000);
  // The "no" lead never reached the model nor WhatsApp and is Final.
  expect((await store.getCustomerById(refused))!.state).toBe('FINAL');
  expect(decideWinback.mock.calls.some((c) => /Tom/.test((c[0] as { label: string }).label))).toBe(false);
  // The French lead got no English template; the paragraph went to Jo as one task and the lead is finished.
  expect(deliverOut.mock.calls.some((c) => (c[0] as { id: string }).id === french)).toBe(false);
  expect((await store.getCustomerById(french))!.state).toBe('FINAL');
  const tasks = (await store.listTasks()).filter((t) => t.customerId === french);
  expect(tasks).toHaveLength(1);
  expect(tasks[0].suggestedReply).toMatch(/remboursement/);
  // The English lead was sent; the stored paragraph carries neither the retired payee nor a dash.
  expect(s.sent).toBe(1);
  const call = deliverOut.mock.calls.find((c) => (c[0] as { id: string }).id === english)!;
  const tpl = call[4] as { name: string; params: string[] };
  expect(tpl.name).toBe('winback_en');
  expect(tpl.params[1]).not.toMatch(/Simple Tax|—|–/);
  expect(String(call[1])).not.toMatch(/Simple Tax|—|–/);
  expect(String(call[1])).toContain('The Accounting Academy');
});
