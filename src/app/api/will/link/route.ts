// ============================================================
// Which WhatsApp conversation does this CRM task belong to?
//
// WHY THIS EXISTS. The CRM and Will have never shared an id. They are joined
// by the phone number and nothing else, and until now that join lived only
// inside Postgres, in the trigger that notices a questionnaire coming back
// (will_on_form_received). Nothing in the app could ask the question.
//
// It has to be askable now, because Jo, 28 Aug: pressing Done on a task in the
// CRM should send the estimate and the invoice to that customer on WhatsApp.
// The button needs to know who that is before it can offer to do it.
//
// A MISS IS NOT AN ERROR. Plenty of tasks have no WhatsApp conversation behind
// them: an old lead, a number typed with a digit missing, someone who came in
// by email. Those return `{ customer: null }` and the CRM quietly falls back to
// the plain Done it has always had. A 404 here would turn a normal case into a
// red console error on the owner's screen.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { STAGE_GROUPS } from '@/lib/will/state-machine';
import { APPROVED } from '@/lib/will/approved-messages';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  const phone = req.nextUrl.searchParams.get('phone') ?? '';
  if (!phone.trim()) return NextResponse.json({ ok: true, customer: null });

  try {
    const store = getStore();
    const c = await store.findCustomerByPhone(phone);
    if (!c) return NextResponse.json({ ok: true, customer: null });
    // The CURRENT Library wording, so the preview in the CRM is the message
    // that will actually be sent and not a copy of it that drifted.
    let template: string = APPROVED.estimate_invoice;
    try {
      const t = (await store.listTemplates()).find((x) => x.key === 'estimate_invoice');
      if (t?.body?.trim()) template = t.body;
    } catch { /* the constant is the honest fallback */ }
    const stage = STAGE_GROUPS.find((g) => (g.states as readonly string[]).includes(c.state));
    return NextResponse.json({
      ok: true,
      customer: {
        id: c.id,
        name: c.name,
        waId: c.waId,
        state: c.state,
        stage: stage?.label ?? null,
        paid: c.paid,
        estimatedRefundCents: c.estimatedRefundCents ?? null,
      },
      template,
    });
  } catch {
    // The CRM must stay usable when Will's store is down: no match, plain Done.
    return NextResponse.json({ ok: true, customer: null });
  }
}
