import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { refreshSuggestions } from '@/lib/will/suggestions';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!sessionValid()) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  await refreshSuggestions();
  const all = await getStore().listSuggestions();
  return NextResponse.json({ suggestions: all.filter((s) => s.status === 'PENDING') });
}
