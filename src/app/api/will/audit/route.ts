// Decision log for review: the most recent things Will and the owner did, with
// the reasoning attached (knowledge used, guard verdict). Read-only, owner-gated.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const limit = Math.min(500, Math.max(1, Number(url.searchParams.get('limit') ?? '200') || 200));
  const rows = await getStore().listAudit(limit);
  return NextResponse.json({ ok: true, rows });
}
