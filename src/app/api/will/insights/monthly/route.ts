// Month-by-month lead → paid conversion, so July can be compared with August.
// Computed from real data on every call (customers + state history); nothing is
// stored and nothing "resets on the 1st". The definition lives in
// lib/will/monthly-conversion.ts and is the only one in the system.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { monthlyConversion } from '@/lib/will/monthly-conversion';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();
  const [customers, history, messages] = await Promise.all([
    store.listCustomers(),
    store.allHistory(),
    // Only HUMAN-authored rows matter (the "Will did it all" share); the
    // store now filters this in the database instead of paging through every
    // message ever sent (audit, 5 Sep).
    store.humanOutMessages().catch(() => []),
  ]);
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    months: monthlyConversion(customers, history, new Date(), 12, messages),
  });
}
