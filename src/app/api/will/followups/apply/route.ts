// Swap the approved message queued for one person, for a different approved
// message from the SAME flow.
//
// This is the only thing the conversation-aware advice is ever allowed to
// change, and it is a separate, explicit call so that reading a recommendation
// and acting on one are never the same gesture.
//
// WHAT IT CAN DO
//   Replace job.payload.templateKey with another key that is (a) in the
//   Library right now and (b) in this customer's own flow. The send time, the
//   flow and the sequence position are all carried across untouched, so the
//   cadence continues exactly as it would have.
//
// WHAT IT CANNOT DO
//   Send anything. Write message text. Accept a body from the client. The
//   request carries a KEY, never prose — there is deliberately no parameter
//   here that a composed sentence could travel through, which is what keeps
//   "Will drafted something" and "a customer received something" separate
//   facts. Free-form text cannot be delivered outside Meta's 24h window in any
//   case (channel.ts), and every scheduled follow-up is outside it.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { candidatesFor } from '@/lib/will/nudge-advice';
import { flowForState, Flow } from '@/lib/will/state-machine';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  let jobId: unknown;
  let templateKey: unknown;
  try {
    ({ jobId, templateKey } = await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }
  if (typeof jobId !== 'string' || !jobId.trim() || typeof templateKey !== 'string' || !templateKey.trim()) {
    return NextResponse.json({ ok: false, error: 'Missing jobId or templateKey.' }, { status: 400 });
  }

  const store = getStore();
  const job = await store.getJob(jobId).catch(() => null);
  if (!job || job.kind !== 'FOLLOW_UP' || job.status !== 'SCHEDULED' || !job.customerId) {
    return NextResponse.json({ ok: false, error: 'That follow-up is no longer queued.' }, { status: 404 });
  }
  if (job.payload.templateKey === templateKey) {
    return NextResponse.json({ ok: true, unchanged: true, runAt: job.runAt });
  }

  const customer = await store.getCustomerById(job.customerId).catch(() => null);
  if (!customer) return NextResponse.json({ ok: false, error: 'That customer no longer exists.' }, { status: 404 });

  const flow = (job.payload.flow as Flow | undefined) ?? flowForState(customer.state);
  if (!flow) return NextResponse.json({ ok: false, error: 'This customer is not in a stage with a follow-up cadence.' }, { status: 409 });

  // Re-derived from the store on THIS request. The client sends a key and the
  // key is checked here; whatever the browser was shown a minute ago has no
  // authority over what a real person is about to receive.
  const templates = await store.listTemplates().catch(() => []);
  const allowed = candidatesFor(flow, templates);
  const chosen = allowed.find((c) => c.key === templateKey);
  if (!chosen) {
    return NextResponse.json({
      ok: false,
      error: 'That message is not an approved follow-up for this stage.',
    }, { status: 409 });
  }

  // There is no updateJob in the store, and adding one for this would give
  // every caller the ability to rewrite a queued job's payload. Cancel-and-
  // requeue reaches the same end state through the two narrow operations that
  // already exist, and leaves the swap visible in the job list as two rows —
  // a cancelled one and its replacement — rather than a silent mutation.
  await store.addJob({
    customerId: customer.id,
    kind: 'FOLLOW_UP',
    payload: { ...job.payload, templateKey: chosen.key },
    runAt: job.runAt,
  });
  await store.setJobStatus(job.id, 'CANCELLED');

  await store.audit('nudge_advice', 'template_swapped', {
    customerId: customer.id,
    jobId: job.id,
    from: job.payload.templateKey ?? null,
    to: chosen.key,
    runAt: job.runAt,
    by: 'HUMAN',
  }).catch(() => { /* the swap already happened; the audit is best-effort */ });

  return NextResponse.json({ ok: true, templateKey: chosen.key, title: chosen.title, runAt: job.runAt });
}
