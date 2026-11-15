// POST /api/atlas/action: runs one proposal the user approved in Atlas chat.
// It hands the change to the same handler the CRM uses (/api/will/actions), so
// that handler's guards, policy checks and audit all apply. Requires a CRM session.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { cleanProposal, toWillAction } from '@/lib/atlas/actions';
import { POST as willActions } from '@/app/api/will/actions/route';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 }); }
  const proposal = cleanProposal((body as { proposal?: unknown } | null)?.proposal);
  if (!proposal) return NextResponse.json({ ok: false, error: 'invalid_proposal' }, { status: 400 });

  const origin = new URL(req.url).origin;
  const inner = new Request(`${origin}/api/will/actions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin,
      'sec-fetch-site': 'same-origin',
      cookie: req.headers.get('cookie') ?? '',
    },
    body: JSON.stringify(toWillAction(proposal)),
  });
  const res = await willActions(inner as never);
  const ok = res.ok;
  await getStore().audit('owner', 'atlas_action', {
    kind: proposal.kind,
    customerId: proposal.customerId ?? null,
    taskId: proposal.taskId ?? null,
    ok,
  }).catch(() => {});
  if (!ok) {
    const detail = await res.text().catch(() => '');
    return NextResponse.json({ ok: false, error: 'failed', detail: detail.slice(0, 300) }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
