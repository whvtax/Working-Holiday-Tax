// Bootstrap endpoint: everything the dashboard needs in one call.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!sessionValid()) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  const store = getStore();
  const [customers, tasks, templates, pending] = await Promise.all([
    store.listCustomers(),
    store.listTasks(),
    store.listTemplates(),
    store.pendingApprovals(),
  ]);
  return NextResponse.json({ customers, tasks, templates, pending });
}
