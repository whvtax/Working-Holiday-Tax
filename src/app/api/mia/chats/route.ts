// Mia chat list: SVT customers, most recent message first.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { listMiaCustomers } from '@/lib/mia/data';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const offset = Math.max(0, parseInt(url.searchParams.get('offset') ?? '0', 10) || 0);
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') ?? '50', 10) || 50));
  try {
    const customers = await listMiaCustomers({ order: 'activity', limit, offset });
    return NextResponse.json({ ok: true, customers, hasMore: customers.length === limit });
  } catch {
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 503 });
  }
}
