// Mia open tasks: SVT tasks (crm_tasks, brand 'svt'), not done.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { listMiaOpenTasks } from '@/lib/mia/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  try {
    return NextResponse.json({ ok: true, tasks: await listMiaOpenTasks() });
  } catch {
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 503 });
  }
}
