// Mia client file: SVT clients (crm_clients, brand 'svt').
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { listMiaClients } from '@/lib/mia/data';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const archived = new URL(req.url).searchParams.get('archived') === 'true';
  try {
    return NextResponse.json({ ok: true, clients: await listMiaClients(archived) });
  } catch {
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 503 });
  }
}
