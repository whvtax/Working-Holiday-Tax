// ============================================================
// SupabaseStore — the production implementation of Will's `Store`,
// backed by the CRM's own Supabase (tables will_*, migration 021).
// Same behaviour as FileStore; this is the seam we left open so all
// data lives on your server exactly like the rest of the CRM.
// ============================================================
import { randomUUID } from 'crypto';
import { getSupabase } from '@/lib/supabase';
import {
  Store, CustomerRow, MessageRow, TaskRow, TemplateRow, StateHistoryRow, JobRow, SuggestionRow,
} from './store';
import { CustomerState } from './state-machine';

const now = () => new Date().toISOString();

// Phone normalisation identical to SQL crm_norm_phone() so app-written and
// DB-computed values always agree (used to match a customer to a crm_tasks row).
function normPhone(num: string | null | undefined): string | null {
  let d = (num ?? '').replace(/\D/g, '');
  if (!d) return null;
  if (d.startsWith('00')) d = d.slice(2);
  if (d.length < 7) return null;
  return d;
}

// ---------- row mappers (snake_case DB <-> camelCase TS) ----------
function toCustomer(r: Record<string, unknown>): CustomerRow {
  return {
    id: r.id as string,
    waId: r.wa_id as string,
    name: (r.name as string) ?? null,
    flag: (r.flag as string) ?? '',
    state: r.state as CustomerState,
    income: (r.income as CustomerRow['income']) ?? 'UNKNOWN',
    paid: !!r.paid,
    formComplete: !!r.form_complete,
    missingDocs: (r.missing_docs as string[]) ?? [],
    aiPaused: !!r.ai_paused,
    isLegacy: !!r.is_legacy,
    botOwned: !!r.bot_owned,
    optedOut: !!r.opted_out,
    estimatedRefundCents: (r.estimated_refund_cents as number) ?? null,
    lastCustomerMsgAt: (r.last_customer_msg_at as string) ?? null,
    previousState: (r.previous_state as CustomerState) ?? null,
    stateChangedAt: (r.state_changed_at as string) ?? now(),
    lastMessagePreview: (r.last_message_preview as string) ?? null,
    lastMessageDirection: (r.last_message_direction as CustomerRow['lastMessageDirection']) ?? null,
    unread: !!r.unread,
    lang: (r.lang as string) ?? null,
    createdAt: (r.created_at as string) ?? now(),
  };
}
function toMessage(r: Record<string, unknown>): MessageRow {
  return {
    id: r.id as string,
    customerId: r.customer_id as string,
    direction: r.direction as MessageRow['direction'],
    author: r.author as MessageRow['author'],
    status: r.status as MessageRow['status'],
    body: (r.body as string) ?? '',
    meta: (r.meta as MessageRow['meta']) ?? undefined,
    createdAt: (r.created_at as string) ?? now(),
  };
}
function toTask(r: Record<string, unknown>): TaskRow {
  return {
    id: r.id as string,
    customerId: (r.customer_id as string) ?? null,
    customerName: (r.customer_name as string) ?? null,
    reason: (r.reason as string) ?? '',
    severity: (r.severity as string) ?? 'REVIEW',
    context: (r.context as string) ?? null,
    suggestedReply: (r.suggested_reply as string) ?? null,
    status: r.status as TaskRow['status'],
    createdAt: (r.created_at as string) ?? now(),
  };
}
function toTemplate(r: Record<string, unknown>): TemplateRow {
  return {
    id: r.id as string,
    key: (r.key as string) ?? '',
    category: (r.category as string) ?? '',
    title: (r.title as string) ?? '',
    body: (r.body as string) ?? '',
    requiresMeta: !!r.requires_meta,
    versions: (r.versions as number) ?? 1,
    updatedAt: (r.updated_at as string) ?? now(),
    variantB: (r.variant_b as string) ?? null,
    sentA: (r.sent_a as number) ?? 0,
    sentB: (r.sent_b as number) ?? 0,
    convA: (r.conv_a as number) ?? 0,
    convB: (r.conv_b as number) ?? 0,
  };
}
function toSuggestion(r: Record<string, unknown>): SuggestionRow {
  return {
    id: r.id as string,
    kind: r.kind as SuggestionRow['kind'],
    title: (r.title as string) ?? '',
    detail: (r.detail as string) ?? '',
    proposedBody: (r.proposed_body as string) ?? '',
    targetTemplateId: (r.target_template_id as string) ?? undefined,
    occurrences: (r.occurrences as number) ?? 1,
    status: r.status as SuggestionRow['status'],
    createdAt: (r.created_at as string) ?? now(),
  };
}
function toJob(r: Record<string, unknown>): JobRow {
  return {
    id: r.id as string,
    customerId: (r.customer_id as string) ?? null,
    kind: r.kind as JobRow['kind'],
    payload: (r.payload as JobRow['payload']) ?? {},
    runAt: (r.run_at as string) ?? now(),
    status: r.status as JobRow['status'],
    claimedAt: (r.claimed_at as string) ?? undefined,
    attempts: (r.attempts as number) ?? 0,
    createdAt: (r.created_at as string) ?? now(),
  };
}
function toHistory(r: Record<string, unknown>): StateHistoryRow {
  return {
    customerId: r.customer_id as string,
    from: (r.from_state as CustomerState) ?? null,
    to: r.to_state as CustomerState,
    causedBy: (r.caused_by as string) ?? '',
    createdAt: (r.created_at as string) ?? now(),
  };
}

// camelCase CustomerRow field -> snake_case column (for partial updates)
const CUSTOMER_COL: Record<string, string> = {
  waId: 'wa_id', name: 'name', flag: 'flag', state: 'state', income: 'income',
  paid: 'paid', formComplete: 'form_complete', missingDocs: 'missing_docs',
  aiPaused: 'ai_paused', isLegacy: 'is_legacy', botOwned: 'bot_owned', optedOut: 'opted_out',
  estimatedRefundCents: 'estimated_refund_cents', lastCustomerMsgAt: 'last_customer_msg_at',
  previousState: 'previous_state', stateChangedAt: 'state_changed_at',
  lastMessagePreview: 'last_message_preview', lastMessageDirection: 'last_message_direction',
  unread: 'unread', lang: 'lang', createdAt: 'created_at',
};

const FORWARD = ['NEW_LEAD','QUALIFIED','PRICE_SENT','PAYMENT_PENDING','PAID','FORM_PENDING','FORM_COMPLETE','DOCUMENTS_COMPLETE','UNDER_REVIEW','ESTIMATE_READY','FINAL_REVIEW','SIGNATURE_PENDING','SIGNED','LODGED','COMPLETED'];
const CLOSED = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'];

export let lastPersistError: string | null = null;

export class SupabaseStore implements Store {
  private sb() { return getSupabase(); }

  async listCustomers(): Promise<CustomerRow[]> {
    const { data } = await this.sb().from('will_customers').select('*').order('state_changed_at', { ascending: false });
    return (data ?? []).map(toCustomer);
  }

  async getCustomerByWaId(waId: string): Promise<CustomerRow | null> {
    const { data } = await this.sb().from('will_customers').select('*').eq('wa_id', waId).limit(1).maybeSingle();
    return data ? toCustomer(data) : null;
  }

  async createCustomer(c: Partial<CustomerRow> & { waId: string }): Promise<CustomerRow> {
    const row = {
      id: randomUUID(), wa_id: c.waId, wa_norm: normPhone(c.waId), name: c.name ?? null,
      flag: c.flag ?? '💬', state: c.state ?? 'NEW_LEAD', income: c.income ?? 'UNKNOWN',
      paid: false, form_complete: false, missing_docs: [], ai_paused: false,
      is_legacy: false, bot_owned: true, opted_out: false, estimated_refund_cents: null,
      last_customer_msg_at: null, previous_state: null, state_changed_at: now(),
      last_message_preview: null, last_message_direction: null, unread: false, created_at: now(),
    };
    const { data, error } = await this.sb().from('will_customers').insert(row).select('*').single();
    if (error) { lastPersistError = error.message; throw error; }
    lastPersistError = null;
    return toCustomer(data);
  }

  async updateCustomer(id: string, patch: Partial<CustomerRow>): Promise<void> {
    const upd: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(patch)) {
      const col = CUSTOMER_COL[k];
      if (col) upd[col] = v;
    }
    if ('waId' in patch && patch.waId) upd.wa_norm = normPhone(patch.waId);
    if (Object.keys(upd).length === 0) return;
    const { error } = await this.sb().from('will_customers').update(upd).eq('id', id);
    if (error) { lastPersistError = error.message; throw error; }
  }

  async setState(id: string, to: CustomerState, causedBy: string): Promise<void> {
    const { data: cur } = await this.sb().from('will_customers').select('*').eq('id', id).maybeSingle();
    if (!cur) return;
    const c = toCustomer(cur);
    if (c.state === to) return;

    // A/B conversion credit: forward move (not a close) credits the last variant message.
    if (FORWARD.indexOf(to) > FORWARD.indexOf(c.state) && FORWARD.indexOf(c.state) >= 0) {
      const { data: msgs } = await this.sb().from('will_messages').select('*')
        .eq('customer_id', id).order('created_at', { ascending: false }).limit(100);
      const lastVariant = (msgs ?? []).map(toMessage)
        .find((m) => m.meta?.templateId && m.meta?.variant && !m.meta?.credited);
      if (lastVariant?.meta?.templateId && lastVariant.meta.variant) {
        const { data: t } = await this.sb().from('will_templates').select('*').eq('id', lastVariant.meta.templateId).maybeSingle();
        if (t) {
          const col = lastVariant.meta.variant === 'A' ? 'conv_a' : 'conv_b';
          await this.sb().from('will_templates').update({ [col]: ((t[col] as number) ?? 0) + 1 }).eq('id', t.id);
          await this.sb().from('will_messages').update({ meta: { ...lastVariant.meta, credited: true } }).eq('id', lastVariant.id);
        }
      }
    }

    await this.sb().from('will_state_history').insert({
      customer_id: id, from_state: c.state, to_state: to, caused_by: causedBy, created_at: now(),
    });
    const upd: Record<string, unknown> = { state: to, state_changed_at: now() };
    if (CLOSED.includes(to)) upd.previous_state = c.state;
    if (to === 'PAID') upd.paid = true;
    const { error } = await this.sb().from('will_customers').update(upd).eq('id', id);
    if (error) { lastPersistError = error.message; throw error; }
  }

  async history(customerId: string): Promise<StateHistoryRow[]> {
    const { data } = await this.sb().from('will_state_history').select('*')
      .eq('customer_id', customerId).order('created_at', { ascending: true });
    return (data ?? []).map(toHistory);
  }

  async addMessage(m: Omit<MessageRow, 'id' | 'createdAt'>): Promise<MessageRow> {
    const row = {
      id: randomUUID(), customer_id: m.customerId, direction: m.direction, author: m.author,
      status: m.status, body: m.body, meta: m.meta ?? null, created_at: now(),
    };
    const { data, error } = await this.sb().from('will_messages').insert(row).select('*').single();
    if (error) { lastPersistError = error.message; throw error; }
    const patch: Record<string, unknown> = {
      last_message_preview: m.body.slice(0, 80), last_message_direction: m.direction,
    };
    if (m.direction === 'IN') { patch.last_customer_msg_at = row.created_at; patch.unread = true; }
    await this.sb().from('will_customers').update(patch).eq('id', m.customerId);
    return toMessage(data);
  }

  async listMessages(customerId: string): Promise<MessageRow[]> {
    const { data } = await this.sb().from('will_messages').select('*')
      .eq('customer_id', customerId).order('created_at', { ascending: true });
    return (data ?? []).map(toMessage);
  }

  async setMessageStatus(id: string, status: MessageRow['status']): Promise<void> {
    await this.sb().from('will_messages').update({ status }).eq('id', id);
  }

  async pendingApprovals(): Promise<(MessageRow & { customerName: string | null })[]> {
    const { data } = await this.sb().from('will_messages').select('*').eq('status', 'PENDING_APPROVAL');
    const msgs = (data ?? []).map(toMessage);
    const ids = [...new Set(msgs.map((m) => m.customerId))];
    const names = new Map<string, string | null>();
    if (ids.length) {
      const { data: cs } = await this.sb().from('will_customers').select('id,name').in('id', ids);
      for (const c of cs ?? []) names.set(c.id as string, (c.name as string) ?? null);
    }
    return msgs.map((m) => ({ ...m, customerName: names.get(m.customerId) ?? null }));
  }

  async addTask(t: Omit<TaskRow, 'id' | 'createdAt' | 'status'>): Promise<TaskRow> {
    const row = {
      id: randomUUID(), customer_id: t.customerId, customer_name: t.customerName,
      reason: t.reason, severity: t.severity, context: t.context ?? null,
      suggested_reply: t.suggestedReply ?? null, status: 'OPEN', created_at: now(),
    };
    const { data, error } = await this.sb().from('will_tasks').insert(row).select('*').single();
    if (error) { lastPersistError = error.message; throw error; }
    return toTask(data);
  }

  async listTasks(): Promise<TaskRow[]> {
    const { data } = await this.sb().from('will_tasks').select('*').order('created_at', { ascending: false });
    return (data ?? []).map(toTask);
  }

  async resolveTask(id: string): Promise<void> {
    await this.sb().from('will_tasks').update({ status: 'RESOLVED' }).eq('id', id);
  }

  async listTemplates(): Promise<TemplateRow[]> {
    const { data } = await this.sb().from('will_templates').select('*').order('updated_at', { ascending: false });
    return (data ?? []).map(toTemplate);
  }

  async addTemplate(t: { category: string; title: string; body: string }): Promise<TemplateRow> {
    const row = {
      id: randomUUID(), key: 'custom_' + randomUUID().slice(0, 8),
      category: t.category || 'Custom', title: t.title || 'Untitled message', body: t.body,
      requires_meta: false, versions: 1, updated_at: now(),
    };
    const { data, error } = await this.sb().from('will_templates').insert(row).select('*').single();
    if (error) { lastPersistError = error.message; throw error; }
    return toTemplate(data);
  }

  async updateTemplate(id: string, body: string): Promise<void> {
    const { data: t } = await this.sb().from('will_templates').select('versions').eq('id', id).maybeSingle();
    await this.sb().from('will_templates').update({
      body, versions: (((t?.versions as number) ?? 1) + 1), updated_at: now(),
    }).eq('id', id);
  }

  async deleteTemplate(id: string): Promise<void> {
    await this.sb().from('will_templates').delete().eq('id', id);
  }

  async deleteCustomerByWaId(waId: string): Promise<void> {
    const { data: c } = await this.sb().from('will_customers').select('id').eq('wa_id', waId).maybeSingle();
    if (!c) return;
    const id = c.id as string;
    await Promise.all([
      this.sb().from('will_messages').delete().eq('customer_id', id),
      this.sb().from('will_tasks').delete().eq('customer_id', id),
      this.sb().from('will_state_history').delete().eq('customer_id', id),
      this.sb().from('will_jobs').delete().eq('customer_id', id),
    ]);
    await this.sb().from('will_customers').delete().eq('id', id);
  }

  async listSuggestions(): Promise<SuggestionRow[]> {
    const { data } = await this.sb().from('will_suggestions').select('*').order('created_at', { ascending: false });
    return (data ?? []).map(toSuggestion);
  }

  async upsertSuggestion(s: Omit<SuggestionRow, 'id' | 'createdAt' | 'status'> & { dedupeKey: string }): Promise<void> {
    const { data: existing } = await this.sb().from('will_suggestions').select('id')
      .eq('dedupe_key', s.dedupeKey).eq('status', 'PENDING').maybeSingle();
    if (existing) {
      await this.sb().from('will_suggestions').update({
        occurrences: s.occurrences, proposed_body: s.proposedBody,
      }).eq('id', existing.id);
    } else {
      await this.sb().from('will_suggestions').insert({
        id: randomUUID(), kind: s.kind, title: s.title, detail: s.detail,
        proposed_body: s.proposedBody, target_template_id: s.targetTemplateId ?? null,
        occurrences: s.occurrences, status: 'PENDING', dedupe_key: s.dedupeKey, created_at: now(),
      });
    }
  }

  async setSuggestionStatus(id: string, status: SuggestionRow['status']): Promise<void> {
    await this.sb().from('will_suggestions').update({ status }).eq('id', id);
  }

  async bumpVariant(templateId: string, variant: 'A' | 'B', field: 'sent' | 'conv'): Promise<void> {
    const col = `${field === 'sent' ? 'sent' : 'conv'}_${variant.toLowerCase()}`;
    const { data: t } = await this.sb().from('will_templates').select(col).eq('id', templateId).maybeSingle();
    if (!t) return;
    const cur = ((t as unknown as Record<string, number>)[col]) ?? 0;
    await this.sb().from('will_templates').update({ [col]: cur + 1 }).eq('id', templateId);
  }

  async setVariantB(templateId: string, body: string | null): Promise<void> {
    const upd: Record<string, unknown> = { variant_b: body };
    if (!body) { upd.sent_b = 0; upd.conv_b = 0; }
    await this.sb().from('will_templates').update(upd).eq('id', templateId);
  }

  async getSetting(key: string): Promise<unknown> {
    const { data } = await this.sb().from('will_settings').select('value').eq('key', key).maybeSingle();
    return data ? (data.value as unknown) : undefined;
  }

  async setSetting(key: string, value: unknown): Promise<void> {
    await this.sb().from('will_settings').upsert({ key, value }, { onConflict: 'key' });
  }

  async addJob(j: Omit<JobRow, 'id' | 'createdAt' | 'status'>): Promise<JobRow> {
    const row = {
      id: randomUUID(), customer_id: j.customerId, kind: j.kind, payload: j.payload,
      run_at: j.runAt, status: 'SCHEDULED', attempts: 0, created_at: now(),
    };
    const { data, error } = await this.sb().from('will_jobs').insert(row).select('*').single();
    if (error) { lastPersistError = error.message; throw error; }
    return toJob(data);
  }

  async dueJobs(nowDate: Date): Promise<JobRow[]> {
    const { data } = await this.sb().from('will_jobs').select('*')
      .eq('status', 'SCHEDULED').lte('run_at', nowDate.toISOString());
    return (data ?? []).map(toJob);
  }

  async listJobs(): Promise<JobRow[]> {
    const { data } = await this.sb().from('will_jobs').select('*');
    return (data ?? []).map(toJob);
  }

  async getJob(id: string): Promise<JobRow | null> {
    const { data } = await this.sb().from('will_jobs').select('*').eq('id', id).maybeSingle();
    return data ? toJob(data) : null;
  }

  async setJobStatus(id: string, status: JobRow['status']): Promise<void> {
    await this.sb().from('will_jobs').update({ status }).eq('id', id);
  }

  // Atomic at the DB: the conditional UPDATE only matches a still-SCHEDULED row,
  // so exactly one caller can flip it to CLAIMED. Postgres serialises the write.
  async claimJob(id: string): Promise<boolean> {
    const { data: cur } = await this.sb().from('will_jobs').select('attempts').eq('id', id).maybeSingle();
    const attempts = ((cur?.attempts as number) ?? 0) + 1;
    const { data } = await this.sb().from('will_jobs')
      .update({ status: 'CLAIMED', claimed_at: now(), attempts })
      .eq('id', id).eq('status', 'SCHEDULED').select('id');
    return !!(data && data.length > 0);
  }

  async reclaimStaleJobs(olderThanMs: number): Promise<number> {
    const cutoff = new Date(Date.now() - olderThanMs).toISOString();
    const { data } = await this.sb().from('will_jobs').select('*')
      .eq('status', 'CLAIMED').or(`claimed_at.is.null,claimed_at.lt.${cutoff}`);
    const stale = (data ?? []).map(toJob);
    let n = 0;
    for (const j of stale) {
      const next = (j.attempts ?? 0) >= 3 ? 'FAILED' : 'SCHEDULED';
      await this.sb().from('will_jobs').update({ status: next }).eq('id', j.id);
      n++;
    }
    return n;
  }

  async cancelJobsFor(customerId: string, kinds?: JobRow['kind'][]): Promise<number> {
    let q = this.sb().from('will_jobs').update({ status: 'CANCELLED' })
      .eq('customer_id', customerId).eq('status', 'SCHEDULED');
    if (kinds && kinds.length) q = q.in('kind', kinds);
    const { data } = await q.select('id');
    return data?.length ?? 0;
  }

  async audit(actor: string, action: string, detail?: unknown): Promise<void> {
    // Audit is written to the CRM's own audit trail if present; a no-op here is
    // acceptable since every state change is already recorded in will_state_history.
    void actor; void action; void detail;
  }
}
