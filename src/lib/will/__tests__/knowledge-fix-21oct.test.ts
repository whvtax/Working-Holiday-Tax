/**
 * 21 Oct: the payment-plan answer changed in the pack. The backfill only adds
 * missing questions, so applyKnowledgeFixes must update the existing row once.
 */
import { applyKnowledgeFixes } from '@/lib/will/seed';

function store(rows: { id: string; question: string; answer: string }[], settings: Record<string, string> = {}) {
  const updates: { id: string; patch: unknown }[] = [];
  return {
    updates,
    s: {
      listKnowledge: async () => rows,
      updateKnowledge: async (id: string, patch: unknown) => { updates.push({ id, patch }); },
      getSetting: async (k: string) => settings[k] ?? null,
      setSetting: async (k: string, v: string) => { settings[k] = v; },
    } as never,
  };
}

describe('applyKnowledgeFixes', () => {
  it('updates the payment-plan answer on the matching row', async () => {
    const st = store([{ id: 'r1', question: 'Can I set up a payment plan with the ATO for the amount I owe?', answer: 'old' }]);
    const n = await applyKnowledgeFixes(st.s);
    // two batches touch this row now (25 Oct, then 30 Oct b): the last one wins
    expect(n).toBeGreaterThanOrEqual(1);
    expect(st.updates[0].id).toBe('r1');
    expect(JSON.stringify(st.updates[st.updates.length - 1].patch)).toMatch(/within 14 days of lodging you will receive an email from the ATO/i);
    expect(JSON.stringify(st.updates.map((u) => u.patch))).not.toMatch(/call the ATO yourself|in about two weeks/);
  });
  it('runs once (marker)', async () => {
    const settings: Record<string, string> = {};
    const st = store([{ id: 'r1', question: 'Can I set up a payment plan with the ATO for the amount I owe?', answer: 'old' }], settings);
    await applyKnowledgeFixes(st.s);
    const again = await applyKnowledgeFixes(st.s);
    expect(again).toBe(0);
  });
  it('leaves other rows alone', async () => {
    const st = store([{ id: 'r2', question: 'Something else', answer: 'x' }]);
    expect(await applyKnowledgeFixes(st.s)).toBe(0);
    expect(st.updates).toHaveLength(0);
  });
});
