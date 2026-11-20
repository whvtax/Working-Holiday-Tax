import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { brandParam, rowBrand } from '@/lib/will/brand-param';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  const customerId = new URL(req.url).searchParams.get('customerId');
  if (!customerId) return NextResponse.json({ error: 'customerId required' }, { status: 400 });
  const store = getStore();
  // Jo, 20 Nov: Will's screen never opens a Mia chat, and Mia's never a Will chat.
  const brand = brandParam(req);
  if (brand) {
    const c = await store.getCustomerById(customerId).catch(() => null);
    if (!c || rowBrand(c) !== brand) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
  }
  const messages = await store.listMessages(customerId);
  return NextResponse.json({ messages });
}
