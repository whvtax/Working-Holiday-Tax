// Everyone who is scheduled to receive a follow-up, any flow, soonest first.
//
// Replaces the old "Regenerate report" button: instead of a static preview of
// the next five jobs, this is the whole queue, joined to the customer so each
// row says who it reaches, which Library message it will send, when, and what
// stage they are in. Recomputed on every call, so it is never stale.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore, CustomerState } from '@/lib/will/store';
import { greetingName } from '@/lib/will/scheduler';

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
  /**
   * The message itself, exactly as the customer will receive it: the Library
   * body with {{1}} already replaced by the same greeting name the scheduler
   * will use. Null only when the Library entry has been deleted since the job
   * was queued — in which case nothing is sent and the cadence moves on.
   *
   * This is deliberately the substituted text and not the raw template. A row
   * that says "Hi {{1}}," is a row you still have to decode; the point of
   * showing the body at all is to be able to read what will land on someone's
   * phone without opening anything.
   */
  body: string | null;
}

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();
  // Only the live queue and only the customers it reaches. This used to be
  // listJobs() + listCustomers() filtered in JS: will_jobs is never purged, so
  // every 20 s poll of this view paged the entire job history (every DONE
  // auto-reply timer, every CANCELLED deferral) plus every customer to find a
  // few hundred rows, and once a response took longer than the poll the
  // requests piled up. The rows returned are identical (audit, 5 Sep).
  const [jobs, templates] = await Promise.all([
    store.listScheduledFollowUps(),
    store.listTemplates(),
  ]);
  const customers = await store.listCustomersByIds(
    jobs.map((j) => j.customerId).filter((id): id is string => !!id),
  );

  // Status of the one-time retro that reconciled every existing chat, so the CRM
  // can show whether it has finished going over all the chats and when.
  const [bfDone, bfOffset, bfTotal, bfAt] = await Promise.all([
    store.getSetting('followup_schedule_backfill').catch(() => null),
    store.getSetting('followup_schedule_backfill_offset').catch(() => null),
    store.getSetting('followup_schedule_backfill_total').catch(() => null),
    store.getSetting('followup_schedule_backfill_at').catch(() => null),
  ]);
  const backfill = {
    done: bfDone === 'v1',
    processed: typeof bfOffset === 'number' ? bfOffset : 0,
    total: typeof bfTotal === 'number' ? bfTotal : null,
    at: typeof bfAt === 'string' ? bfAt : null,
    started: bfDone === 'v1' || typeof bfTotal === 'number',
  };

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
    const t = key ? templateByKey.get(key) ?? null : null;
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
      templateTitle: t?.title ?? null,
      // Same substitution as scheduler.ts does at send time, from the same
      // greetingName(), so the preview cannot drift from what is delivered.
      // An entry with an empty body is treated as no body rather than shown as
      // a blank line: the scheduler would send nothing useful either, and this
      // way the row says so in words.
      body: t?.body?.trim() ? t.body.replace(/\{\{1\}\}/g, greetingName(c)) : null,
    });
  }
  rows.sort((a, b) => a.runAt.localeCompare(b.runAt));

  return NextResponse.json({ ok: true, generatedAt: new Date().toISOString(), rows, backfill });
}
