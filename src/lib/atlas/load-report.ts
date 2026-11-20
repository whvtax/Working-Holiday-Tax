// Server only (imports the store, which reads the database). Loads the last
// 24 hours and builds the morning report, the same way /api/will/morning does.
// Read-only.
import { getStore } from '@/lib/will/store';
import { rowBrand } from '@/lib/will/brand-param';
import { buildMorningReport, type MorningReport } from '@/lib/will/morning-report';

import type { OpenTaskItem } from './atlas-view';

/** One read of the store, shared by the report and the open-task list. */
export async function loadAtlasState(): Promise<{ report: MorningReport; openTasks: OpenTaskItem[]; byBrand: { wht: MorningReport; svt: MorningReport } }> {
  const store = getStore();
  const now = Date.now();
  const startIso = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const [customers, tasks, history, messages, auth] = await Promise.all([
    store.listCustomers(), store.listTasks(), store.allHistory(),
    store.listMessagesBetween(startIso, new Date(now).toISOString(), 5000),
    typeof store.listAuditByActor === 'function' ? store.listAuditByActor('auth', startIso) : Promise.resolve([]),
  ]);
  const report = buildMorningReport({
    customers, tasks, messages, history, auth, now,
  });
  // Jo, 20 Nov: Will's and Mia's own numbers, same split as /api/will/morning.
  const forBrand = (brand: 'wht' | 'svt') => {
    const mine = customers.filter((c) => rowBrand(c) === brand);
    const ids = new Set(mine.map((c) => c.id));
    const inBrand = (id: string | null | undefined) => (id ? ids.has(id) : brand === 'wht');
    return buildMorningReport({
      customers: mine,
      tasks: tasks.filter((t) => inBrand(t.customerId)),
      messages: messages.filter((m) => inBrand(m.customerId)),
      history: history.filter((h) => inBrand(h.customerId)),
      auth, now,
    });
  };
  const byBrand = { wht: forBrand('wht'), svt: forBrand('svt') };
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
  return { report, openTasks, byBrand };
}

export async function loadMorningReport(): Promise<MorningReport> {
  return (await loadAtlasState()).report;
}
