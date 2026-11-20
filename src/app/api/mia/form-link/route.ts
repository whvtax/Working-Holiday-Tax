// Signed SVT form link for an SVT customer. The token names the SVT chat, so the form
// takes the number from the chat, as WHT does. Needs FORM_TOKEN_SECRET.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { withBrand } from '@/lib/will/brand-context';
import { signFormToken } from '@/lib/will/form-token';

export const dynamic = 'force-dynamic';

/** The SVT intake page (the shared form in SVT colours). */
export const SVT_FORM_URL = 'https://studentvisatax.com.au/jhd7hp9xd';

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (typeof body.customerId !== 'string') return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 });

  const customer = await withBrand('svt', () => getStore().getCustomerById(body.customerId));
  if (!customer || customer.brand !== 'svt') return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });

  const token = signFormToken({ customerId: customer.id, brand: 'svt' });
  if (!token) return NextResponse.json({ ok: false, error: 'token_unavailable' }, { status: 503 });
  return NextResponse.json({ ok: true, url: `${SVT_FORM_URL}?k=${encodeURIComponent(token)}` });
}
