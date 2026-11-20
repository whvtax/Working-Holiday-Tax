/**
 * Mia reads and writes the shared tables, scoped to brand 'svt'.
 * Customers: will_customers (brand 'svt'). Clients: crm_clients (brand 'svt').
 * Tasks: crm_tasks (brand 'svt'). Stage moves go through Will's own setState,
 * so the rules and the state history are the same as for WHT.
 */
import { getSupabase } from '@/lib/supabase';
import { getStore } from '@/lib/will/store';
import { withBrand } from '@/lib/will/brand-context';
import { ALL_STATES } from '@/lib/will/state-machine';

export const MIA_PAUSED_KEY = 'mia_paused';
export const MIA_PAGE_MAX = 1000;

export interface MiaCustomerRow {
  id: string;
  name: string | null;
  wa_id: string;
  state: string;
  paid: boolean;
  source: string | null;
  source_detail: string | null;
  last_customer_msg_at: string | null;
  created_at: string;
}

const CUSTOMER_COLUMNS = 'id, name, wa_id, state, paid, source, source_detail, last_customer_msg_at, created_at';

/** Mia's customers, newest first. Brand is fixed to 'svt' here, never from input. */
export async function listMiaCustomers(opts: { order: 'created' | 'activity'; limit: number; offset: number }): Promise<MiaCustomerRow[]> {
  const sb = getSupabase();
  const orderCol = opts.order === 'activity' ? 'last_customer_msg_at' : 'created_at';
  const { data, error } = await sb
    .from('will_customers')
    .select(CUSTOMER_COLUMNS)
    .eq('brand', 'svt')
    .order(orderCol, { ascending: false, nullsFirst: false })
    .range(opts.offset, opts.offset + opts.limit - 1);
  if (error) throw error;
  return (data ?? []) as MiaCustomerRow[];
}

/** Stage move through Will's state machine (history and rules as for WHT). */
export async function moveMiaCustomer(customerId: string, toState: string): Promise<boolean> {
  // 18 Nov (audit): only a real state, and only a Student Visa Tax customer.
  if (!(ALL_STATES as string[]).includes(toState)) return false;
  return withBrand('svt', async () => {
    const customer = await getStore().getCustomerById(customerId);
    if (!customer || customer.brand !== 'svt') return false;
    return getStore().setState(customerId, toState as never, 'mia');
  });
}

/** Create an SVT customer through Will, then record where the lead came from. */
export async function createMiaCustomer(input: { waId: string; name?: string | null; source?: string | null; sourceDetail?: string | null }) {
  const customer = await withBrand('svt', () => getStore().createCustomer({ waId: input.waId, name: input.name ?? null, brand: 'svt' }));
  if (input.source) {
    const { error } = await getSupabase().from('will_customers').update({
      source: input.source, source_detail: input.sourceDetail ?? null, source_at: new Date().toISOString(),
    }).eq('id', customer.id).eq('brand', 'svt');
    if (error) throw error;
  }
  return customer;
}

/** Message typed by Jo in Mia. Saved as a draft awaiting approval, never sent,
 *  until the SVT WhatsApp number is live. */
export async function saveMiaDraft(customerId: string, body: string) {
  // 18 Nov (audit): a draft can only be saved on a Student Visa Tax customer.
  const customer = await withBrand('svt', () => getStore().getCustomerById(customerId));
  if (!customer || customer.brand !== 'svt') throw new Error('not an SVT customer');
  return getStore().addMessage({
    customerId, direction: 'OUT', author: 'HUMAN', status: 'PENDING_APPROVAL', body,
    meta: { reason: 'svt_number_not_live' },
  } as never);
}

export async function getMiaPaused(): Promise<boolean> {
  return (await getStore().getSetting(MIA_PAUSED_KEY).catch(() => null)) === true;
}

export async function setMiaPaused(paused: boolean): Promise<void> {
  await getStore().setSetting(MIA_PAUSED_KEY, paused);
}

/** Mia's client file: SVT clients (crm_clients with brand 'svt'). */
export async function listMiaClients(archived: boolean) {
  const { data, error } = await getSupabase()
    .from('crm_clients').select('id, full_name, whatsapp, created_at')
    .eq('brand', 'svt').eq('archived', archived)
    .order('created_at', { ascending: false }).limit(MIA_PAGE_MAX);
  if (error) throw error;
  return data ?? [];
}

/** Open SVT tasks (crm_tasks with brand 'svt'). */
export async function listMiaOpenTasks() {
  const { data, error } = await getSupabase()
    .from('crm_tasks').select('id, client_name, whatsapp, submitted_at')
    .eq('brand', 'svt').eq('done', false)
    .order('submitted_at', { ascending: true }).limit(200);
  if (error) throw error;
  return data ?? [];
}
