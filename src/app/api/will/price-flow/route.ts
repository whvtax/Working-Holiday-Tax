// GET /api/will/price-flow: the price message A/B setting and its result so far.
// Owner session only, read-only. The setting is changed through /api/will/actions.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { priceFlowStats } from '@/lib/will/price-flow-stats';
import { PRICE_FLOW_SETTING_KEY, normalisePriceFlowSetting } from '@/lib/will/price-flow-variant';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();
  const [audit, customers, setting] = await Promise.all([
    store.listAudit(5000), store.allCustomers(), store.getSetting(PRICE_FLOW_SETTING_KEY),
  ]);
  return NextResponse.json({ ok: true, setting: normalisePriceFlowSetting(setting), stats: priceFlowStats(audit, customers) });
}
