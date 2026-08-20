// Will learns: scan the task log for recurring questions with no approved
// answer, and propose adding one to the library for the owner to approve.
import { getStore } from './store';

export async function refreshSuggestions(): Promise<void> {
  const store = getStore();
  const tasks = await store.listTasks();
  const buckets = new Map<string, { count: number; sample: string; suggestion: string }>();
  for (const t of tasks) {
    if (!/no confident match|no approved|not sure|unclear/i.test(t.reason)) continue;
    if (!t.context) continue;
    const key = normalizeQuestion(t.context);
    const b = buckets.get(key) ?? { count: 0, sample: t.context, suggestion: t.suggestedReply ?? '' };
    b.count += 1;
    if (t.suggestedReply && !b.suggestion) b.suggestion = t.suggestedReply;
    buckets.set(key, b);
  }
  for (const [, b] of buckets) {
    if (b.count < 2) continue;
    await store.upsertSuggestion({
      kind: 'NEW_TEMPLATE',
      title: 'Recurring question with no library answer',
      detail: b.sample,
      dedupeKey: b.sample,
      proposedBody: b.suggestion || draftAnswer(b.sample),
      occurrences: b.count,
    });
  }
}

function normalizeQuestion(s: string): string {
  return s.toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter((w) => w.length > 3).sort().slice(0, 6).join(' ');
}
function draftAnswer(q: string): string {
  return `Thanks for asking! Regarding "${q.slice(0, 60)}", here is what applies: [write the approved answer here, then approve].`;
}
