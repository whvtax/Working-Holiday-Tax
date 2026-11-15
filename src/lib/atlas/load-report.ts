// Server only (imports the store, which reads the database). Loads the last
// 24 hours and builds the morning report, the same way /api/will/morning does.
// Read-only.
import { getStore } from '@/lib/will/store';
import { buildMorningReport, type MorningReport } from '@/lib/will/morning-report';

export async function loadMorningReport(): Promise<MorningReport> {
  const store = getStore();
  const now = Date.now();
  const startIso = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const [customers, tasks, history, messages, auth, winbacks] = await Promise.all([
    store.listCustomers(), store.listTasks(), store.allHistory(),
    store.listMessagesBetween(startIso, new Date(now).toISOString(), 5000),
    typeof store.listAuditByActor === 'function' ? store.listAuditByActor('auth', startIso) : Promise.resolve([]),
    store.getSetting('winbacks').catch(() => null),
  ]);
  return buildMorningReport({
    customers, tasks, messages, history, auth, now,
    winbacks: (winbacks && typeof winbacks === 'object' ? winbacks : {}) as Record<string, { sentAt?: string; decision?: string; decidedAt?: string; finalAt?: string }>,
  });
}
