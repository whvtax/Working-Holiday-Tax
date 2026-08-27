// Everyone who is scheduled to receive a follow-up, any flow, soonest first.
//
// Replaces the old "Regenerate report" button: instead of a static preview of
// the next five jobs, this is the whole queue, joined to the customer so each
// row says who it reaches, which Library message it will send, when, and what
// stage they are in. Recomputed on every call, so it is never stale.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore, CustomerState } from '@/lib/will/store';

export const dynamic = 'force-dynamic';

export interface ScheduledFollowUp {
  jobId: string;
  customerId: string;
  name: string | null;
  waId: string;
  state: CustomerState;
  lang: string | null;
  /** ISO time the scheduler will send it. */
  runAt: string;
  /** 'prePayment' | 'form' | 'signature', or null on an older job. */
  flow: string | null;
  /** 0-based position in that flow's cadence. */
  seq: number;
  /** Library key of the message that will be sent. */
  templateKey: string | null;
  /** Its title in the Library, when the entry still exists. */
  templateTitle: string | null;
}

export async function GET() {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();
  const [jobs, customers, templates] = await Promise.all([
    store.listJobs(),
    store.listCustomers(),
    store.listTemplates(),
  ]);

  const customerById = new Map(customers.map((c) => [c.id, c]));
  const templateByKey = new Map(templates.map((t) => [t.key, t]));

  const rows: ScheduledFollowUp[] = [];
  for (const j of jobs) {
    if (j.kind !== 'FOLLOW_UP' || j.status !== 'SCHEDULED' || !j.customerId) continue;
    const c = customerById.get(j.customerId);
    // A job whose customer was deleted is cancelled by nightly maintenance;
    // until then it is not something a person can act on, so it is not listed.
    if (!c) continue;
    const key = j.payload.templateKey ?? null;
    rows.push({
      jobId: j.id,
      customerId: c.id,
      name: c.name,
      waId: c.waId,
      state: c.state,
      lang: c.lang,
      runAt: j.runAt,
      flow: j.payload.flow ?? null,
      seq: j.payload.seq ?? 0,
      templateKey: key,
      templateTitle: key ? templateByKey.get(key)?.title ?? null : null,
    });
  }
  rows.sort((a, b) => a.runAt.localeCompare(b.runAt));

  return NextResponse.json({ ok: true, generatedAt: new Date().toISOString(), rows });
}
