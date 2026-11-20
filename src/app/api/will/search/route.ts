// Server-side customer search for the Will dashboard.
//
// The dashboard's own /state bootstrap can only carry a bounded window of
// customers. This endpoint searches EVERY customer in the database - by
// WhatsApp number, name, or last-message preview - so typing a number into the
// search box finds its conversation however old it is, exactly like scrolling
// back to a ten-year-old WhatsApp chat. Behind the same CRM session as the rest
// of Will.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { brandParam, rowBrand } from '@/lib/will/brand-param';
import { recordDataRead, searchKind } from '@/lib/will/access-log';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const params = new URL(req.url).searchParams;
  // Jo, 20 Nov: Will's screen searches Will's customers, Mia's screen Mia's.
  // The brand is applied before the 50-result cap, so the other brand's rows
  // cannot push this brand's matches out of the list.
  const brand = brandParam(req);
  const scoped = <T extends { brand?: string | null }>(rows: T[]) => (brand ? rows.filter((c) => rowBrand(c) === brand) : rows).slice(0, 50);
  // Jo, 27 Oct: an unmatched questionnaire (the customer typed another number,
  // or a typo) is almost always one of the people who paid and have not sent
  // the form yet. ?waiting=1 lists exactly those, for the "Link to chat" picker.
  if (params.get('waiting') === '1') {
    await recordDataRead(req, 'search', { waiting: true });
    try {
      const customers = scoped(await getStore().listChatPage(0, brand ? 300 : 50, { states: ['PAID', 'FORM_PENDING'] }));
      return NextResponse.json({ ok: true, customers });
    } catch (e) {
      return NextResponse.json({ ok: false, error: (e as Error).message?.slice(0, 200) ?? 'search failed' }, { status: 500 });
    }
  }
  const q = (params.get('q') ?? '').slice(0, 100);
  if (q.trim().length < 2) return NextResponse.json({ ok: true, customers: [] });
  // Length and kind only: the text is usually a customer's phone number or name.
  await recordDataRead(req, 'search', { qLen: q.trim().length, qKind: searchKind(q) });
  try {
    const customers = scoped(await getStore().searchCustomers(q, brand ? 300 : 50));
    return NextResponse.json({ ok: true, customers });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message?.slice(0, 200) ?? 'search failed' }, { status: 500 });
  }
}
