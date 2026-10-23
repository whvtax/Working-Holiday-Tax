// The morning report for the Overview (Jo, 22 Oct). Read-only.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { buildMorningReport } from '@/lib/will/morning-report';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();
  const now = Date.now();
  const startIso = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const [customers, tasks, history, messages] = await Promise.all([
    store.listCustomers(), store.listTasks(), store.allHistory(),
    store.listMessagesBetween(startIso, new Date(now).toISOString(), 5000),
  ]);
  return NextResponse.json({ ok: true, report: buildMorningReport({ customers, tasks, messages, history, now }) });
}
