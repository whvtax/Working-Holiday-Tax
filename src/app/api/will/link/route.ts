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
import { signatureNoticeStands } from '@/lib/will/scheduler';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

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
    // Has the "ready for signature" notice already gone out? The CRM Done card
    // uses this to decide whether to show "Send for Signature" or "Mark Lodged",
    // and it must survive a page reload (the customer stays at SIGNATURE_PENDING
    // for both, so state alone cannot tell them apart). Matched on the stable,
    // distinctive phrase so a wording tweak to the template does not break it.
    // Reads the same `signature_notice_sent:${id}` marker the cadence uses
    // (scheduler.ts), instead of scanning every message for the phrase "tax
    // return is ready". The regex flipped the card early on a discarded or
    // pending draft that happened to contain the words, and flipped it back
    // (re-arming a resend) if Jo ever edited the Library `signature` wording.
    // The marker also already knows to reset on a fresh re-entry to Signature
    // via Done, which the regex never could (audit, 5 Sep).
    let signatureReadySent = false;
    try {
      signatureReadySent = await signatureNoticeStands(c.id);
    } catch { /* best effort: default to not-sent, so the worst case is a re-send */ }
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
        signatureReadySent,
      },
      template,
    });
  } catch {
    // The CRM must stay usable when Will's store is down: no match, plain Done.
    return NextResponse.json({ ok: true, customer: null });
  }
}
