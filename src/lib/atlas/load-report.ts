// Server only (imports the store, which reads the database). Loads the last
// 24 hours and builds the morning report, the same way /api/will/morning does.
// Read-only.
import { getStore } from '@/lib/will/store';
import { buildMorningReport, type MorningReport } from '@/lib/will/morning-report';

import type { OpenTaskItem } from './atlas-view';

/** One read of the store, shared by the report and the open-task list. */
export async function loadAtlasState(): Promise<{ report: MorningReport; openTasks: OpenTaskItem[] }> {
  const store = getStore();
  const now = Date.now();
  const startIso = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const [customers, tasks, history, messages, auth, winbacks] = await Promise.all([
    store.listCustomers(), store.listTasks(), store.allHistory(),
    store.listMessagesBetween(startIso, new Date(now).toISOString(), 5000),
    typeof store.listAuditByActor === 'function' ? store.listAuditByActor('auth', startIso) : Promise.resolve([]),
    store.getSetting('winbacks').catch(() => null),
  ]);
  const report = buildMorningReport({
    customers, tasks, messages, history, auth, now,
    winbacks: (winbacks && typeof winbacks === 'object' ? winbacks : {}) as Record<string, { sentAt?: string; decision?: string; decidedAt?: string; finalAt?: string }>,
  });
  const openTasks: OpenTaskItem[] = tasks
    .filter((t) => t.status === 'OPEN')
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 50)
    .map((t) => ({
      id: t.id,
      customerName: t.customerName,
      reason: t.reason,
      severity: t.severity,
      createdAt: t.createdAt,
    }));
  return { report, openTasks };
}

export async function loadMorningReport(): Promise<MorningReport> {
  return (await loadAtlasState()).report;
}
