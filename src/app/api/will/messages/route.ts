import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  const customerId = new URL(req.url).searchParams.get('customerId');
  if (!customerId) return NextResponse.json({ error: 'customerId required' }, { status: 400 });
  const store = getStore();
  const messages = await store.listMessages(customerId);
  return NextResponse.json({ messages });
}
