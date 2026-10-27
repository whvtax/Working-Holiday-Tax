// Server-side customer search for the Will dashboard.
//
// The dashboard's own /state bootstrap can only carry a bounded window of
// customers. This endpoint searches EVERY customer in the database — by
// WhatsApp number, name, or last-message preview — so typing a number into the
// search box finds its conversation however old it is, exactly like scrolling
// back to a ten-year-old WhatsApp chat. Behind the same CRM session as the rest
// of Will.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const params = new URL(req.url).searchParams;
  // Jo, 27 Oct: an unmatched questionnaire (the customer typed another number,
  // or a typo) is almost always one of the people who paid and have not sent
  // the form yet. ?waiting=1 lists exactly those, for the "Link to chat" picker.
  if (params.get('waiting') === '1') {
    try {
      const customers = await getStore().listChatPage(0, 50, { states: ['PAID', 'FORM_PENDING'] });
      return NextResponse.json({ ok: true, customers });
    } catch (e) {
      return NextResponse.json({ ok: false, error: (e as Error).message?.slice(0, 200) ?? 'search failed' }, { status: 500 });
    }
  }
  const q = (params.get('q') ?? '').slice(0, 100);
  if (q.trim().length < 2) return NextResponse.json({ ok: true, customers: [] });
  try {
    const customers = await getStore().searchCustomers(q, 50);
    return NextResponse.json({ ok: true, customers });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message?.slice(0, 200) ?? 'search failed' }, { status: 500 });
  }
}
