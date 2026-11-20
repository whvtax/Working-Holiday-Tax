// GET /api/will/metrics: four numbers for Will (reply after follow-up, team load per paid
// customer, failed sends by kind, failed model decisions). Owner session only, read-only.
// Separate from /api/will/health, which reports system checks.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { willHealth } from '@/lib/will/metrics';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();
  const [audit, messages, humanOut, customers] = await Promise.all([
    store.listAudit(5000), store.allMessages(), store.humanOutMessages(), store.allCustomers(),
  ]);
  return NextResponse.json({ ok: true, metrics: willHealth({ audit, messages, humanOut, customers }) });
}
