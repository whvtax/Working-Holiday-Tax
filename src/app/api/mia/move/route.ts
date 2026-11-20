// Move an SVT customer to another stage, through Will's state machine.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { moveMiaCustomer } from '@/lib/mia/data';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (typeof body.customerId !== 'string' || typeof body.toState !== 'string') {
    return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 });
  }
  try {
    const moved = await moveMiaCustomer(body.customerId, body.toState);
    return NextResponse.json({ ok: true, moved });
  } catch (e) {
    await getStore().audit('mia', 'move_failed', { customerId: body.customerId, error: (e as Error).message }).catch(() => undefined);
    return NextResponse.json({ ok: false, error: 'move_failed' }, { status: 500 });
  }
}
