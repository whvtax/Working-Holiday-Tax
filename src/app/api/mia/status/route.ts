// Mia's own Pause, stored as a setting. Pausing Mia does not pause Will.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getMiaPaused, setMiaPaused } from '@/lib/mia/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  return NextResponse.json({ ok: true, paused: await getMiaPaused() });
}

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const paused = body.paused === true;
  try {
    await setMiaPaused(paused);
    return NextResponse.json({ ok: true, paused });
  } catch {
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 503 });
  }
}
