/**
 * A transient Anthropic overload must not become a task (Jo, 2 Sep, MIKIYA +
 * Meg Righton).
 *
 * Anthropic returns 529 ("overloaded") in bursts. Two layers of patience now
 * keep it off the manual queue:
 *   1. In-request: several attempts with a growing gap, so a 529 or two in a row
 *      still lands on the real reply.
 *   2. If it is STILL overloaded after that, decide THROWS. engine.decide() is
 *      unwrapped, so the throw reaches the webhook, which releases the inbound
 *      and asks Meta to redeliver it — the message is retried minutes later
 *      until Anthropic recovers, and only dead-letters to a task after the
 *      webhook's own redelivery budget is spent. So a persistent overload is
 *      ridden out, never turned into a task by decide itself.
 */
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({ listTemplates: async () => [] }),
}));

import { decide } from '@/lib/will/claude';
import type { CustomerContext } from '@/lib/will/playbook';

const CTX: CustomerContext = {
  name: 'Mikiya', state: 'PRICE_SENT', income: 'TFN', paid: false,
  formComplete: false, missingDocs: [], estimatedRefundCents: null,
  lang: 'ja', knowledge: [],
};
const HISTORY = [{ role: 'customer' as const, text: 'ありがとうございます。また連絡します。' }];

const overloaded = () => ({ status: 529, ok: false, json: async () => ({}) });
const ok = () => ({
  status: 200, ok: true,
  json: async () => ({
    content: [{ type: 'tool_use', name: 'decide', input: { action: 'wait', confidence: 1 } }],
  }),
});

const origFetch = global.fetch;
const origKey = process.env.ANTHROPIC_API_KEY;
beforeAll(() => { process.env.ANTHROPIC_API_KEY = 'test-key'; });
afterAll(() => { global.fetch = origFetch; process.env.ANTHROPIC_API_KEY = origKey; });

it('rides out two 529s and returns the real decision, not a task', async () => {
  const fetchMock = jest.fn()
    .mockResolvedValueOnce(overloaded())
    .mockResolvedValueOnce(overloaded())
    .mockResolvedValueOnce(ok());
  global.fetch = fetchMock as unknown as typeof fetch;

  const d = await decide(CTX, HISTORY);
  expect(fetchMock).toHaveBeenCalledTimes(3);
  expect(d.action).toBe('wait');                 // the model's real answer
  expect(d.task_reason).toBeUndefined();         // NOT a fallback task
}, 15000);

it('throws when the overload never clears, so the inbound is redelivered rather than tasked', async () => {
  global.fetch = jest.fn().mockResolvedValue(overloaded()) as unknown as typeof fetch;
  // A throw is the signal to the webhook to release + redeliver; decide must NOT
  // quietly return a human_task on a transient overload any more.
  await expect(decide(CTX, HISTORY)).rejects.toThrow(/overloaded \(529\)/);
}, 15000);
