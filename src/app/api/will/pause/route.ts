// Pause switches (Jo, 20 Nov): Will's screen pauses Will, Mia's screen pauses
// Mia, Control's "Pause all" is the existing kill switch (actions route).
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { crossSiteMutationReason } from '@/lib/request-guard';
import { WILL_PAUSED_SETTING, MIA_PAUSED_SETTING } from '@/lib/will/pause';

export const dynamic = 'force-dynamic';

async function read() {
  const store = getStore();
  const [will, mia, all] = await Promise.all([
    store.getSetting(WILL_PAUSED_SETTING).catch(() => false),
    store.getSetting(MIA_PAUSED_SETTING).catch(() => false),
    store.getSetting('kill_switch').catch(() => false),
  ]);
  return { will: will === true, mia: mia === true, all: all === true };
}

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  return NextResponse.json({ ok: true, ...(await read()) });
}

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  if (crossSiteMutationReason(req)) return NextResponse.json({ ok: false, error: 'bad origin' }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const who = body?.who === 'mia' ? 'mia' : body?.who === 'will' ? 'will' : null;
  if (!who || typeof body.paused !== 'boolean') return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 });
  const store = getStore();
  await store.setSetting(who === 'mia' ? MIA_PAUSED_SETTING : WILL_PAUSED_SETTING, body.paused);
  await store.audit('owner', body.paused ? `${who}_paused` : `${who}_resumed`, {}).catch(() => undefined);
  return NextResponse.json({ ok: true, ...(await read()) });
}
