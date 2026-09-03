/**
 * No API key in production means tasks, not the keyword mock (audit, 3 Sep).
 *
 * mockDecide is an English-only keyword matcher kept for the simulator and the
 * tests. With ANTHROPIC_API_KEY missing on the live server and Autopilot on, it
 * used to answer customers for real: a German lead saying they had no ABN got
 * the $385 price message, in English, auto-sent. Production now treats a
 * missing key as an outage: every reply becomes an URGENT task until the key
 * is restored. Outside production the mock still runs, so the simulator and
 * the suite are unchanged.
 */
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ listTemplates: jest.fn().mockResolvedValue([]) }) }));
import { decide } from '@/lib/will/claude';

const ctx = {
  name: null, state: 'NEW_LEAD' as const, income: 'UNKNOWN' as const, paid: false, formComplete: false,
  missingDocs: [], estimatedRefundCents: null, lang: 'de', knowledge: [],
};
const history = [{ role: 'customer' as const, text: 'Hallo, ich brauche Hilfe mit meiner Steuererklärung' }];

const save = { ...process.env };
afterEach(() => { process.env = { ...save }; });

it('production without a key: an URGENT task, never a reply', async () => {
  delete process.env.ANTHROPIC_API_KEY;
  (process.env as Record<string, string>).NODE_ENV = 'production';
  delete process.env.WILL_ALLOW_MOCK_BRAIN;
  const d = await decide(ctx, history);
  expect(d.action).toBe('human_task');
  expect(d.task_severity).toBe('URGENT');
  expect(d.task_reason).toMatch(/ANTHROPIC_API_KEY/);
});

it('outside production the mock still answers (simulator, tests)', async () => {
  delete process.env.ANTHROPIC_API_KEY;
  (process.env as Record<string, string>).NODE_ENV = 'test';
  const d = await decide(ctx, history);
  expect(d.action).toBe('reply');
  expect(d.mock).toBe(true);
});

it('the explicit override keeps the mock in production for a demo deployment', async () => {
  delete process.env.ANTHROPIC_API_KEY;
  (process.env as Record<string, string>).NODE_ENV = 'production';
  process.env.WILL_ALLOW_MOCK_BRAIN = 'true';
  const d = await decide(ctx, history);
  expect(d.action).toBe('reply');
});
