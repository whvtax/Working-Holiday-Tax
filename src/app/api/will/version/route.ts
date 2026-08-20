// Cheap change-token endpoint. The dashboard polls THIS (tiny, ~1 cheap query)
// and only refetches the heavy /state, /suggestions payloads when the token
// changes — i.e. the UI updates when something new happens, not on a fixed
// timer. Kept behind the CRM session like the rest of Will.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

async function supabaseToken(): Promise<string> {
  const sb = getSupabase();
  const [msg, cust, tasks, pending] = await Promise.all([
    sb.from('will_messages').select('created_at').order('created_at', { ascending: false }).limit(1).maybeSingle(),
    sb.from('will_customers').select('state_changed_at').order('state_changed_at', { ascending: false }).limit(1).maybeSingle(),
    sb.from('will_tasks').select('id', { count: 'exact', head: true }).eq('status', 'OPEN'),
    sb.from('will_messages').select('id', { count: 'exact', head: true }).eq('status', 'PENDING_APPROVAL'),
  ]);
  const lastMsg = (msg.data?.created_at as string) ?? '0';
  const lastCust = (cust.data?.state_changed_at as string) ?? '0';
  return `${lastMsg}|${lastCust}|${tasks.count ?? 0}|${pending.count ?? 0}`;
}

async function fileToken(): Promise<string> {
  // Dev fallback (JSON store, in-memory): cheap enough to derive from the store.
  const store = getStore();
  const [customers, tasks, pending] = await Promise.all([
    store.listCustomers(), store.listTasks(), store.pendingApprovals(),
  ]);
  const lastCust = customers.reduce((m, c) => c.stateChangedAt > m ? c.stateChangedAt : m, '0');
  const lastMsgPreview = customers.reduce((m, c) => (c.lastCustomerMsgAt ?? '0') > m ? (c.lastCustomerMsgAt ?? '0') : m, '0');
  const open = tasks.filter((t) => t.status === 'OPEN').length;
  return `${lastMsgPreview}|${lastCust}|${open}|${pending.length}`;
}

export async function GET() {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  try {
    const token = hasSupabase ? await supabaseToken() : await fileToken();
    const killSwitch = (await getStore().getSetting('kill_switch').catch(() => false)) === true;
    return NextResponse.json({ token, killSwitch });
  } catch {
    return NextResponse.json({ token: 'err', killSwitch: false });
  }
}
