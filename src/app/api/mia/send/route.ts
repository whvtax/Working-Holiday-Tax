// Message typed in Mia. Saved as a draft awaiting approval, never sent until the SVT number is live.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { saveMiaDraft } from '@/lib/mia/data';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const text = typeof body.body === 'string' ? body.body.trim() : '';
  if (typeof body.customerId !== 'string' || text.length === 0 || text.length > 4096) {
    return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 });
  }
  try {
    const row = await saveMiaDraft(body.customerId, text);
    return NextResponse.json({ ok: true, id: row.id, sent: false, reason: 'svt_number_not_live' });
  } catch (e) {
    await getStore().audit('mia', 'save_failed', { customerId: body.customerId, error: (e as Error).message }).catch(() => undefined);
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 503 });
  }
}
