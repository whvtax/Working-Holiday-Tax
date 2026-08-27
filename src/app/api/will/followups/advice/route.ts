// Read one queued follow-up's conversation and recommend the next nudge.
//
// ON DEMAND, ONE ROW AT A TIME, BY DESIGN
//   This is a paid model call against a real conversation. Running it for the
//   whole queue every time the Follow-ups tab opens would be twenty-two calls
//   for a screen that is usually only glanced at, and a fresh bill on every
//   refresh. So nothing happens until a row is opened, and the answer is held
//   in the page for as long as it is open.
//
// IT RECOMMENDS. IT DOES NOT ACT.
//   Nothing here writes to the job, the customer, or a message. Changing what
//   is queued is a separate deliberate call (../apply), which can only ever
//   swap one approved template key for another approved template key from the
//   same flow.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { adviseForJob } from '@/lib/will/nudge-advice';
import { aiBudgetExhausted } from '@/lib/will/ai-budget';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  let jobId: unknown;
  try {
    ({ jobId } = await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }
  if (typeof jobId !== 'string' || !jobId.trim()) {
    return NextResponse.json({ ok: false, error: 'Missing jobId.' }, { status: 400 });
  }

  // The same atomic daily counter the live customer-reply path spends against.
  // A customer talking to Will always matters more than an explanation on a
  // dashboard, so when the budget is gone this is the thing that stops.
  if (await aiBudgetExhausted().catch(() => false)) {
    return NextResponse.json({
      ok: false,
      error: "Today's AI budget is used up. The queued message is unchanged and will still send as scheduled.",
    }, { status: 429 });
  }

  const job = await getStore().getJob(jobId).catch(() => null);
  if (!job) return NextResponse.json({ ok: false, error: 'That follow-up is no longer queued.' }, { status: 404 });

  const result = await adviseForJob(job);
  return NextResponse.json({ ok: !result.error, ...result });
}
