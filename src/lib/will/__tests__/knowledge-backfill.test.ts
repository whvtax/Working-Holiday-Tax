/**
 * The answers pack arrives on its own.
 *
 * WHAT WAS WRONG. The curated question-and-answer pack lived in the code and
 * reached a live install only if somebody POSTed `import_starter`, which
 * nothing in the dashboard ever did. So the pack could be written, reviewed,
 * shipped, and be invisible to Will forever. It was, until 28 Aug, when 33 new
 * answers were added and the question "will I see this in Will?" turned out to
 * have the answer "no".
 *
 * Jo's rule, and he is right: the Library is one thing. A message he can send
 * and an answer Will can look up are the same kind of object to the person
 * using this, and neither should need a button.
 */
import { backfillKnowledgePack } from '@/lib/will/seed';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import type { Store } from '@/lib/will/store';

function fakeStore(existingQuestions: string[] = []) {
  const settings = new Map<string, unknown>();
  const rows = existingQuestions.map((q) => ({ question: q, answer: 'mine', status: 'active' }));
  const addKnowledge = jest.fn().mockImplementation((k) => { rows.push(k); return Promise.resolve(k); });
  const listKnowledge = jest.fn().mockImplementation(() => Promise.resolve(rows));
  const getSetting = jest.fn().mockImplementation((k) => Promise.resolve(settings.get(k)));
  const setSetting = jest.fn().mockImplementation((k, v) => { settings.set(k, v); return Promise.resolve(); });
  return { store: { listKnowledge, addKnowledge, getSetting, setSetting } as unknown as Store,
    addKnowledge, listKnowledge, getSetting, setSetting, rows, settings };
}

describe('the pack loads itself', () => {
  it('adds every answer on a system that has none', async () => {
    const f = fakeStore();
    const added = await backfillKnowledgePack(f.store);
    expect(added).toBe(KNOWLEDGE_SEED.length);
    expect(f.addKnowledge).toHaveBeenCalledTimes(KNOWLEDGE_SEED.length);
  });

  it('adds them ACTIVE, because a draft is invisible to Will', async () => {
    // The whole point. Importing as draft would put the answers on the screen
    // and still leave Will unable to use one of them.
    const f = fakeStore();
    await backfillKnowledgePack(f.store);
    for (const call of f.addKnowledge.mock.calls) expect(call[0].status).toBe('active');
  });

  it('does nothing at all the second time', async () => {
    const f = fakeStore();
    await backfillKnowledgePack(f.store);
    f.addKnowledge.mockClear();
    expect(await backfillKnowledgePack(f.store)).toBe(0);
    expect(f.addKnowledge).not.toHaveBeenCalled();
  });

  it('picks up answers added to the pack later', async () => {
    // The marker carries the pack size, so a future batch lands on the next
    // tick instead of being locked out by an "already done" flag.
    const f = fakeStore();
    await backfillKnowledgePack(f.store);
    f.settings.set('knowledge_backfill', 'pack-1');   // as if the pack has grown
    f.addKnowledge.mockClear();
    await backfillKnowledgePack(f.store);
    // Everything is already present by question, so nothing is duplicated,
    // but the run DID happen rather than being skipped by the marker.
    expect(f.listKnowledge).toHaveBeenCalled();
    expect(f.addKnowledge).not.toHaveBeenCalled();
  });

  it('never overwrites an answer the owner has edited', async () => {
    // Matching is by question text. His wording is the one that stays.
    const q = KNOWLEDGE_SEED[0].question;
    const f = fakeStore([q]);
    await backfillKnowledgePack(f.store);
    const added = f.addKnowledge.mock.calls.map((c) => c[0].question);
    expect(added).not.toContain(q);
    expect(f.rows.find((r) => r.question === q)!.answer).toBe('mine');
  });

  it('matches regardless of case and spacing', async () => {
    const f = fakeStore([`  ${KNOWLEDGE_SEED[0].question.toUpperCase()}  `]);
    await backfillKnowledgePack(f.store);
    expect(f.addKnowledge).toHaveBeenCalledTimes(KNOWLEDGE_SEED.length - 1);
  });

  it('never breaks the tick when the store is down', async () => {
    // It runs on every scheduler tick. A throw here would take the follow-ups
    // and the whole queue down with it.
    const f = fakeStore();
    (f.listKnowledge as jest.Mock).mockRejectedValue(new Error('db down'));
    await expect(backfillKnowledgePack(f.store)).resolves.toBe(0);
  });
});
