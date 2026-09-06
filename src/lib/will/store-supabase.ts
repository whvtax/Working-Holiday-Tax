// ============================================================
// SupabaseStore — the production implementation of Will's `Store`,
// backed by the CRM's own Supabase (tables will_*, migration 021).
// Same behaviour as FileStore; this is the seam we left open so all
// data lives on your server exactly like the rest of the CRM.
// ============================================================
import { randomUUID } from 'crypto';
import { phoneCandidates } from './phone-candidates';
import { getSupabase } from '@/lib/supabase';
import {
  Store, CustomerRow, MessageRow, TaskRow, TemplateRow, StateHistoryRow, JobRow, KnowledgeRow, AuditRow,
  LostAnalysisRow, DUE_JOBS_BATCH, CUSTOMER_FACING_JOB_KINDS,
} from './store';
import { CustomerState, POST_PAYMENT_STATES } from './state-machine';
import { seedTemplates } from './seed';

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
    unreadCount: (r.unread_count as number) ?? (r.unread ? 1 : 0),
    lastMessageAt: (r.last_message_at as string) ?? (r.last_customer_msg_at as string) ?? (r.state_changed_at as string) ?? null,
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
function toLostAnalysis(r: Record<string, unknown>): LostAnalysisRow {
  return {
    customerId: r.customer_id as string,
    state: r.state as CustomerState,
    triggerKind: (r.trigger_kind as string) ?? '',
    quietDays: (r.quiet_days as number) ?? 0,
    hoursPriceToSilence: r.hours_price_to_silence == null ? null : Number(r.hours_price_to_silence),
    status: (r.status as LostAnalysisRow['status']) ?? 'OK',
    error: (r.error as string) ?? null,
    attempts: (r.attempts as number) ?? 1,
    reason: (r.reason as string) ?? '',
    category: (r.category as string) ?? 'unclear',
    shouldHaveDone: (r.should_have_done as string) ?? '',
    fault: (r.fault as string) ?? 'NOT_OURS',
    recoverable: (r.recoverable as string) ?? 'NO',
    recoveryAction: (r.recovery_action as string) ?? null,
    recoveryMessage: (r.recovery_message as string) ?? null,
    evidenceQuote: (r.evidence_quote as string) ?? null,
    confidence: Number(r.confidence ?? 0),
    analysedAt: (r.analysed_at as string) ?? now(),
  };
}

// camelCase CustomerRow field -> snake_case column (for partial updates)
// KEYED BY THE ROW TYPE, NOT BY `string`.
//
// As Record<string, string> this compiled happily with a field missing, and
// updateCustomer's `if (col)` then swallowed the write: the call returned
// success and nothing was saved. That is the highest-probability silent
// data-loss bug in the codebase and it triggers on the most ordinary task
// there is, adding a field to a customer. Typed this way, omitting one is a
// compile error at the point of the omission.
const CUSTOMER_COL: Record<Exclude<keyof CustomerRow, 'id'>, string> = {
  waId: 'wa_id', name: 'name', flag: 'flag', state: 'state', income: 'income',
  paid: 'paid', formComplete: 'form_complete', missingDocs: 'missing_docs',
  aiPaused: 'ai_paused', isLegacy: 'is_legacy', botOwned: 'bot_owned', optedOut: 'opted_out',
  estimatedRefundCents: 'estimated_refund_cents', lastCustomerMsgAt: 'last_customer_msg_at',
  previousState: 'previous_state', stateChangedAt: 'state_changed_at',
  lastMessagePreview: 'last_message_preview', lastMessageDirection: 'last_message_direction',
  unread: 'unread', unreadCount: 'unread_count', lastMessageAt: 'last_message_at', lang: 'lang', createdAt: 'created_at',
};

const FORWARD = ['NEW_LEAD','QUALIFIED','PRICE_SENT','PAYMENT_PENDING','PAID','FORM_PENDING','FORM_COMPLETE','DOCUMENTS_COMPLETE','UNDER_REVIEW','ESTIMATE_READY','FINAL_REVIEW','SIGNATURE_PENDING','SIGNED','LODGED','COMPLETED'];
const CLOSED = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'];

export let lastPersistError: string | null = null;

// (audit, 5 Sep) lastPersistError used to be cleared only by a successful
// createCustomer, so a single stray read error (pageAll, countInStates, a
// secondary listTasks query...) turned the health dot red and it stayed red
// on that serverless instance until someone happened to sign up, with no way
// for the operator to know it was stale. The health route now clears it right
// after its own reachability probe succeeds, so a truthful "last error seen"
// heals itself instead of looking like a live outage forever.
export function clearLastPersistError(): void { lastPersistError = null; }

/** (audit, 5 Sep) `bumpCounter` fails closed on ANY error, so "the AI budget is
 *  exhausted" used to mean two different things to its caller: a real spend
 *  cap, or the RPC itself being unreachable (migration 029 not run, a
 *  transient Supabase error, a search_path issue). Both must still hand the
 *  conversation to a human unchanged — that is the whole point of failing
 *  closed — but the caller can tell them apart and audit/report the real
 *  cause instead of "raise the budget" when the budget was never the
 *  problem. Call this IMMEDIATELY after the `bumpCounter` call it describes,
 *  before any other store call has a chance to overwrite `lastPersistError`
 *  with an unrelated (or successful, null-ing) result. */
export function bumpCounterUnavailable(): boolean {
  return lastPersistError !== null && lastPersistError.startsWith('bumpCounter:');
}

export class SupabaseStore implements Store {
  private sb() { return getSupabase(); }

  // ------------------------------------------------------------------
  // Schema health.
  //
  // A deploy whose migrations were not run is the most expensive failure this
  // system has had: `last_message_at` was missing, every attempt to create a
  // NEW customer threw, the webhook caught the error exactly as designed, and
  // 105 real leads were dropped without a single visible symptom. Every other
  // health check stayed green throughout.
  //
  // So the schema is now verified rather than assumed: one cheap probe per
  // object, surfaced on the dashboard by /api/will/health.
  // ------------------------------------------------------------------
  async schemaHealth(): Promise<{ ok: boolean; missing: string[] }> {
    const missing: string[] = [];
    const probes: [string, () => PromiseLike<{ error: unknown }>][] = [
      ['will_customers.unread_count', () => this.sb().from('will_customers').select('unread_count').limit(1)],
      ['will_customers.last_message_at', () => this.sb().from('will_customers').select('last_message_at').limit(1)],
      ['will_known_contacts', () => this.sb().from('will_known_contacts').select('wa_norm').limit(1)],
      ['will_processed_messages', () => this.sb().from('will_processed_messages').select('meta_id').limit(1)],
      // (audit, 5 Sep) will_bump_counter (migration 029) guards the paid AI
      // call on every inbound message, but a missing/broken function used to
      // be invisible here: schemaHealth stayed green while bumpCounter quietly
      // failed every message to a human task. Probe it under a dedicated key
      // with a limit high enough it can never report the real day spent, so
      // this check never competes with the actual budget it protects.
      //
      // (found 6 Sep, chasing a permanently red "Schema" dot with every real
      // migration genuinely applied): p_limit is declared `integer` in SQL
      // (max 2,147,483,647), and this sent Number.MAX_SAFE_INTEGER
      // (9,007,199,254,740,991) — far outside that range, so Postgres could
      // not resolve an `integer` overload and reported the function itself as
      // "does not exist", exactly as a genuinely missing migration would.
      // Postgres' actual `integer` max is the honest ceiling to send here.
      ['will_bump_counter', () => this.sb().rpc('will_bump_counter', { p_key: 'schema_probe', p_limit: 2147483647 })],
      // Migration 031's will_lost_analysis is deliberately NOT probed here.
      // /api/will/health renders any miss in this list as "NEW CUSTOMERS ARE
      // BEING DROPPED", which is true of the four above and false of that one:
      // a missing lost-lead report costs a report, not a lead. It degrades
      // visibly on its own instead — the read is caught, and the Lost Leads
      // view says the analysis has not run.
    ];
    for (const [name, run] of probes) {
      try {
        const { error } = await run();
        if (error) missing.push(name);
      } catch {
        missing.push(name);
      }
    }
    return { ok: missing.length === 0, missing };
  }

  // Auto-seed the message Library on first use if it's empty, so the templates
  // are simply "there" after deploy (same as the local build did) with no manual step.
  private seeded = false;
  private seedingPromise: Promise<void> | null = null;
  private async ensureSeeded(): Promise<void> {
    if (this.seeded) return;
    if (this.seedingPromise) return this.seedingPromise;
    this.seedingPromise = (async () => {
      // The count query's error was ignored: a transient failure read as
      // "0 templates", which then tried to insert the whole seed set on top of
      // a live table. Treat an errored count as "cannot tell" and retry later
      // rather than guessing.
      const { count, error } = await this.sb().from('will_templates').select('id', { count: 'exact', head: true });
      if (error) throw new Error(`template seed check failed: ${error.message}`);
      if ((count ?? 0) === 0) {
        const rows = seedTemplates().map((t) => ({
          id: t.id, key: t.key, category: t.category, title: t.title, body: t.body,
          requires_meta: t.requiresMeta, versions: t.versions, updated_at: t.updatedAt,
        }));
        const { error: insertError } = await this.sb().from('will_templates').insert(rows);
        if (insertError) throw new Error(`template seed insert failed: ${insertError.message}`);
      }
      this.seeded = true;
    })()
      // Without this, one rejected promise is cached forever and every later
      // caller re-awaits the same rejection: the Library stays empty and every
      // template is unavailable on this instance until the next deploy. Clearing
      // it means the next caller simply tries again.
      .finally(() => { this.seedingPromise = null; });
    return this.seedingPromise;
  }

  // Page through an entire table in bounded batches, so a table larger than
  // PostgREST's 1,000-row response cap is fully read instead of silently
  // truncated. Ordered by a stable key so pages do not overlap or skip.
  //
  // Keyset, not offset (audit, 5 Sep): `.range(from, ...)` became OFFSET/LIMIT,
  // so page k first skipped k x 1,000 rows and a full read of a large table
  // (export, monthly insights, nightly scans, /state bootstrap) got quadratically
  // slower until it timed out with no error the owner could act on. Carrying the
  // last row's key forward (`orderCol > lastKey`) makes every page an index seek
  // of the same cost regardless of depth. Same order, same rows, same callers.
  // `orderCol` must be unique (a PK) for the pages to be gap free: every caller
  // passes `id`, or the `customer_id` PK of will_lost_analysis.
  private async pageAll<T>(table: string, orderCol: string): Promise<T[]> {
    const PAGE = 1000;
    const out: T[] = [];
    let lastKey: unknown = undefined;
    for (;;) {
      let q = this.sb().from(table).select('*');
      if (lastKey !== undefined) q = q.gt(orderCol, lastKey);
      const { data, error } = await q.order(orderCol, { ascending: true }).limit(PAGE);
      if (error) { lastPersistError = `pageAll ${table}: ${error.message}`; throw error; }
      const rows = (data ?? []) as Array<Record<string, unknown>>;
      out.push(...(rows as unknown as T[]));
      if (rows.length < PAGE) break;
      const next = rows[rows.length - 1]?.[orderCol];
      // A missing key would re-read the same page forever: stop rather than spin.
      if (next === undefined || next === null || next === lastKey) break;
      lastKey = next;
    }
    return out;
  }

  async allCustomers(): Promise<CustomerRow[]> {
    return (await this.pageAll<Record<string, unknown>>('will_customers', 'id')).map(toCustomer);
  }

  async allMessages(): Promise<MessageRow[]> {
    return (await this.pageAll<Record<string, unknown>>('will_messages', 'id')).map(toMessage);
  }

  // (audit, 5 Sep) monthlyConversion's "Will did it all" share only ever looks
  // at HUMAN/OUT, non-discarded/blocked rows, but it used to be fed via
  // allMessages() — every message in the system, bodies and jsonb meta
  // included, paged 1,000 at a time. Ask the database for just that slice
  // instead: same keyset paging as pageAll, with the filter pushed into the
  // query so the round-trips shrink from "every message" to "every human
  // reply".
  async humanOutMessages(): Promise<MessageRow[]> {
    const PAGE = 1000;
    const out: MessageRow[] = [];
    let lastKey: string | undefined;
    for (;;) {
      let q = this.sb().from('will_messages')
        .select('id, customer_id, direction, author, status, created_at')
        .eq('author', 'HUMAN').eq('direction', 'OUT')
        .not('status', 'in', '(DISCARDED,BLOCKED)');
      if (lastKey !== undefined) q = q.gt('id', lastKey);
      const { data, error } = await q.order('id', { ascending: true }).limit(PAGE);
      if (error) { lastPersistError = `humanOutMessages: ${error.message}`; throw error; }
      const rows = (data ?? []) as Array<Record<string, unknown>>;
      out.push(...rows.map(toMessage));
      if (rows.length < PAGE) break;
      const next = rows[rows.length - 1]?.id as string | undefined;
      if (next === undefined || next === null || next === lastKey) break;
      lastKey = next;
    }
    return out;
  }

  async allJobs(): Promise<JobRow[]> {
    return (await this.pageAll<Record<string, unknown>>('will_jobs', 'id')).map(toJob);
  }

  /** Every customer, most recently active first.
   *
   *  Paged, then sorted in memory: the ordered select was capped at 1,000 rows,
   *  which was fine for the dashboard window but wrong for the reports built on
   *  it (monthly conversion, funnel, lost leads all counted only the newest
   *  1,000 customers, audit 4 Sep). */
  async listCustomers(): Promise<CustomerRow[]> {
    const rows = (await this.pageAll<Record<string, unknown>>('will_customers', 'id')).map(toCustomer);
    return rows.sort((a, b) => String(b.stateChangedAt ?? '').localeCompare(String(a.stateChangedAt ?? '')));
  }

  async countCustomers(): Promise<number> {
    const { count, error } = await this.sb().from('will_customers').select('id', { count: 'exact', head: true });
    if (error) throw error;   // the probe must fail loudly; that is its job
    return count ?? 0;
  }

  /** Server-side search across EVERY customer, not just the window the dashboard
   *  happened to load. The point is that a number typed into the search box finds
   *  its customer however old the conversation is — the "a WhatsApp message from
   *  ten years ago is still there" promise. Matches, in one merged set:
   *    - the WhatsApp number: the typed digits anywhere inside wa_id or the
   *      normalised wa_norm, plus a trunk-zero-stripped variant so a locally
   *      typed 0176… still finds a stored 49176…;
   *    - the profile name and the last-message preview, as a plain text contains.
   *  Each sub-query is itself bounded, and the merge stops at `limit`. */
  /** How many customers are in this set of states — a head-only COUNT, so the
   *  pipeline totals are true at any size instead of being capped at the 1,000
   *  the dashboard window happened to load. */
  async countInStates(states: CustomerState[]): Promise<number> {
    if (!states.length) return 0;
    const { count, error } = await this.sb().from('will_customers')
      .select('id', { count: 'exact', head: true }).in('state', states);
    if (error) { lastPersistError = `countInStates: ${error.message}`; throw error; }
    return count ?? 0;
  }

  /** One page of the chat list, ordered newest-conversation-first, so the list
   *  scrolls through EVERY conversation like WhatsApp instead of stopping at the
   *  first 1,000. Only rows that have a real last message are shown (the same
   *  rule the client used). `opts.states` narrows to a pipeline group; `unreadOnly`
   *  to the unread chats. Keyed by (last_message_at, id) with a stable tiebreak
   *  so pages neither overlap nor skip. */
  async listChatPage(offset: number, limit: number, opts?: { states?: CustomerState[]; unreadOnly?: boolean }): Promise<CustomerRow[]> {
    let q = this.sb().from('will_customers').select('*').not('last_message_preview', 'is', null);
    if (opts?.states && opts.states.length) q = q.in('state', opts.states);
    if (opts?.unreadOnly) q = q.gt('unread_count', 0);
    q = q.order('last_message_at', { ascending: false, nullsFirst: false })
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);
    const { data, error } = await q;
    if (error) { lastPersistError = `listChatPage: ${error.message}`; throw error; }
    return (data ?? []).map(toCustomer);
  }

  async searchCustomers(q: string, limit = 50): Promise<CustomerRow[]> {
    const raw = (q ?? '').trim();
    if (!raw) return [];
    const esc = (s: string) => s.replace(/[\\%_]/g, (ch) => '\\' + ch);
    const textPattern = `%${esc(raw)}%`;
    const digits = raw.replace(/\D/g, '');

    const queries: PromiseLike<{ data: Record<string, unknown>[] | null }>[] = [
      this.sb().from('will_customers').select('*').ilike('name', textPattern).limit(limit),
      this.sb().from('will_customers').select('*').ilike('last_message_preview', textPattern).limit(limit),
    ];
    if (digits.length >= 3) {
      const variants = new Set<string>([digits]);
      const noTrunk = digits.replace(/^0+/, '');
      if (noTrunk && noTrunk !== digits) variants.add(noTrunk);
      for (const d of variants) {
        const p = `%${d}%`;
        queries.push(this.sb().from('will_customers').select('*').ilike('wa_id', p).limit(limit));
        queries.push(this.sb().from('will_customers').select('*').ilike('wa_norm', p).limit(limit));
      }
    }

    const results = await Promise.all(queries);
    const seen = new Set<string>();
    const merged: CustomerRow[] = [];
    for (const res of results) {
      for (const row of res.data ?? []) {
        const c = toCustomer(row);
        if (seen.has(c.id)) continue;
        seen.add(c.id);
        merged.push(c);
        if (merged.length >= limit) break;
      }
      if (merged.length >= limit) break;
    }
    return merged;
  }

  async getCustomerByWaId(waId: string): Promise<CustomerRow | null> {
    const { data } = await this.sb().from('will_customers').select('*').eq('wa_id', waId).limit(1).maybeSingle();
    return data ? toCustomer(data) : null;
  }

  async findCustomerByPhone(phone: string): Promise<CustomerRow | null> {
    // Both spellings of the same number: an Australian typing "0412 345 678"
    // into the form has to find the customer WhatsApp gave us as
    // "61412345678". See phone-candidates.ts for why the normaliser itself is
    // left alone. wa_norm is written on insert and on every waId patch, and is
    // indexed, so this stays a single indexed lookup.
    const candidates = phoneCandidates(phone);
    if (!candidates.length) return null;
    // limit(2), not limit(1): an ambiguous match is not a match. If two
    // customers resolve to the same candidate set, acting on either one would
    // open the wrong person's conversation or mark the wrong form complete, so
    // the safe answer is null. Two is enough to detect ambiguity cheaply.
    const { data } = await this.sb().from('will_customers').select('*').in('wa_norm', candidates).limit(2);
    const rows = data ?? [];
    return rows.length === 1 ? toCustomer(rows[0]) : null;
  }

  async getCustomerById(id: string): Promise<CustomerRow | null> {
    const { data } = await this.sb().from('will_customers').select('*').eq('id', id).limit(1).maybeSingle();
    return data ? toCustomer(data) : null;
  }

  /** Chunks of 200 ids per query, the same shape pendingApprovals() and
   *  listMessagesBetween() already use for names, so a long task list never
   *  builds an oversized IN clause (audit, 5 Sep). */
  async listCustomersByIds(ids: string[]): Promise<CustomerRow[]> {
    const unique = [...new Set(ids.filter(Boolean))];
    const out: CustomerRow[] = [];
    for (let i = 0; i < unique.length; i += 200) {
      const chunk = unique.slice(i, i + 200);
      const { data, error } = await this.sb().from('will_customers').select('*').in('id', chunk);
      if (error) { lastPersistError = `listCustomersByIds: ${error.message}`; throw error; }
      out.push(...(data ?? []).map(toCustomer));
    }
    return out;
  }

  async createCustomer(c: Partial<CustomerRow> & { waId: string }): Promise<CustomerRow> {
    const row = {
      id: randomUUID(), wa_id: c.waId, wa_norm: normPhone(c.waId), name: c.name ?? null,
      flag: c.flag ?? '💬', state: c.state ?? 'NEW_LEAD', income: c.income ?? 'UNKNOWN',
      paid: false, form_complete: false, missing_docs: [], ai_paused: false,
      is_legacy: false, bot_owned: true, opted_out: false, estimated_refund_cents: null,
      last_customer_msg_at: null, previous_state: null, state_changed_at: now(),
      last_message_preview: null, last_message_direction: null, unread: false, unread_count: 0, last_message_at: now(), created_at: now(),
    };
    const { data, error } = await this.sb().from('will_customers').insert(row).select('*').single();
    if (error) { lastPersistError = error.message; throw error; }
    lastPersistError = null;
    return toCustomer(data);
  }

  async updateCustomer(id: string, patch: Partial<CustomerRow>): Promise<void> {
    const upd: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(patch)) {
      // The cast is only to index a typed map with a runtime key. Completeness
      // is now enforced by the map's own type above, so a field that is not
      // mapped fails the build rather than being silently dropped here.
      const col = CUSTOMER_COL[k as Exclude<keyof CustomerRow, 'id'>];
      if (col) upd[col] = v;
    }
    if ('waId' in patch && patch.waId) upd.wa_norm = normPhone(patch.waId);
    if (Object.keys(upd).length === 0) return;
    const { error } = await this.sb().from('will_customers').update(upd).eq('id', id);
    if (error) { lastPersistError = error.message; throw error; }
  }

  async setState(id: string, to: CustomerState, causedBy: string): Promise<boolean> {
    const { data: cur } = await this.sb().from('will_customers').select('*').eq('id', id).maybeSingle();
    if (!cur) return false;
    const c = toCustomer(cur);
    if (c.state === to) return false;

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
    // ANY post-payment stage means they paid (audit, 5 Sep).
    //
    // Only 'PAID' used to set the flag, so a customer moved straight to
    // Signature from the CRM (Jo's "Send for Signature" works from any stage),
    // or moved by hand to Lodged, or imported mid-flow, kept paid=false forever.
    // The nightly consistency check then listed 38 of them in one night, and
    // more quietly: `paid` is what keeps the SALES follow-ups away from a paying
    // customer, so those people were one stage move from being chased for money
    // they had already sent. Reaching a post-payment stage IS the proof.
    if (POST_PAYMENT_STATES.includes(to)) upd.paid = true;
    // CONC-01: optimistic concurrency — only write if the state is still what we
    // read, so two concurrent transitions cannot clobber each other (lost update).
    //
    // The write now RETURNS whether it won. `.select('id')` makes the update
    // report the rows it changed; zero rows means another serverless instance
    // moved this customer between our read and our write. The caller uses this
    // to avoid, for example, sending a second "payment received" message when a
    // concurrent delivery already confirmed the same payment. Silent before,
    // this is the cross-instance half of the duplicate-send guard (the
    // in-process mutex covers same-instance). At 5,000 customers a year two
    // Meta deliveries for one customer landing on two warm instances is no
    // longer rare, so this matters.
    const { data: won, error } = await this.sb().from('will_customers')
      .update(upd).eq('id', id).eq('state', c.state).select('id');
    if (error) { lastPersistError = error.message; throw error; }
    if (!won || won.length === 0) {
      await this.audit('system', 'state_change_lost_race', { customerId: id, from: c.state, to });
      return false;
    }
    return true;
  }

  /** Every transition ever recorded. Paged: an unbounded select stopped at
   *  PostgREST's 1,000 rows, and the funnel, the monthly conversion figures and
   *  the "did they ever pay" test all quietly read a fraction of the history
   *  once the business passed that many transitions (audit, 4 Sep). */
  async allHistory(): Promise<StateHistoryRow[]> {
    return (await this.pageAll<Record<string, unknown>>('will_state_history', 'id')).map(toHistory);
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
    const patch: Record<string, unknown> = {};
    // TRUTH RULE (see refreshLastMessage): the chat-list row preview may only
    // ever be a message that actually reached the customer, or one they sent.
    // This used to be written unconditionally, so the instant Will DRAFTED a
    // reply (PENDING_APPROVAL) or parked one (QUEUED) the list started showing
    // it as the conversation's last message — and if the draft was then
    // discarded, blocked by the guard, or simply never approved, the row kept
    // showing text the customer never received. The list was telling the owner
    // something untrue about their own conversation.
    if (m.status === 'SENT') {
      patch.last_message_preview = m.body.slice(0, 80);
      patch.last_message_direction = m.direction;
      patch.last_message_at = row.created_at;
    }
    if (m.direction === 'IN') {
      patch.last_customer_msg_at = row.created_at;
      patch.unread = true;
      // Increment the unread badge. Inbound messages from one customer are
      // serialized (idempotency-gated), so read-then-write is safe here.
      const { data: cur } = await this.sb().from('will_customers')
        .select('unread_count').eq('id', m.customerId).maybeSingle();
      patch.unread_count = ((cur?.unread_count as number) ?? 0) + 1;
    }
    if (Object.keys(patch).length) {
      // The message row is already committed at this point, so a failure here
      // does not lose the message — but its error was discarded, which meant the
      // chat list could silently stop updating (no preview, no unread badge)
      // while messages kept arriving. Audit it so the divergence is visible;
      // don't throw, because the message itself did land.
      const { error: custError } = await this.sb().from('will_customers').update(patch).eq('id', m.customerId);
      if (custError) {
        lastPersistError = custError.message;
        await this.audit('system', 'message_customer_update_failed', {
          customerId: m.customerId, messageId: row.id, direction: m.direction,
          error: custError.message,
        }).catch(() => { /* audit is a nice-to-have here, never the failure itself */ });
      }
    }
    return toMessage(data);
  }

  /** Re-derive the chat-list row (preview / direction / time) from the newest
   *  message that ACTUALLY exists in the conversation as far as the customer is
   *  concerned: one they sent, or one of ours that WhatsApp accepted. Both are
   *  stored as status 'SENT'; a draft (PENDING_APPROVAL), a parked autopilot
   *  reply (QUEUED), a guard-refused one (BLOCKED), a discarded one (DISCARDED)
   *  and a rejected send (FAILED) are all things the customer never received,
   *  so none of them may show up as "the last message" in the list.
   *
   *  Called whenever a message's status changes, so a QUEUED reply becomes the
   *  preview at the moment it is really sent — and a send that FAILS falls back
   *  to the last message that did land, instead of leaving the row claiming a
   *  delivery that never happened. */
  private async refreshLastMessage(customerId: string): Promise<void> {
    const { data } = await this.sb().from('will_messages')
      .select('body, direction, created_at')
      .eq('customer_id', customerId).eq('status', 'SENT')
      .order('created_at', { ascending: false }).limit(1).maybeSingle();
    await this.sb().from('will_customers').update({
      last_message_preview: data ? String(data.body ?? '').slice(0, 80) : null,
      last_message_direction: data ? (data.direction as string) : null,
      last_message_at: data ? (data.created_at as string) : null,
    }).eq('id', customerId);
  }

  async markCustomerRead(id: string): Promise<void> {
    await this.sb().from('will_customers').update({ unread: false, unread_count: 0 }).eq('id', id);
  }

  async isBlockedContact(waId: string): Promise<boolean> {
    const norm = normPhone(waId);
    if (!norm) return false;
    const { data } = await this.sb().from('will_known_contacts').select('wa_norm').eq('wa_norm', norm).limit(1).maybeSingle();
    return !!data;
  }

  /** A conversation, oldest first.
   *
   *  Audit, 4 Sep: this was an unbounded ASCENDING read, so PostgREST's
   *  1,000-row cap silently dropped the NEWEST messages once a thread passed
   *  that length: the chat, the link route's "already sent for signature"
   *  check and the export all read a stale conversation. It now takes the
   *  newest MESSAGE_WINDOW rows and hands them back in reading order, which is
   *  the window the dashboard renders anyway. */
  async listMessages(customerId: string): Promise<MessageRow[]> {
    const MESSAGE_WINDOW = 1000;
    const { data } = await this.sb().from('will_messages').select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })
      .limit(MESSAGE_WINDOW);
    return (data ?? []).map(toMessage).reverse();
  }

  /** Just this customer's still-live outbound drafts, filtered in the database
   *  instead of reading the whole MESSAGE_WINDOW conversation to find two or
   *  three rows (audit3, 5 Sep — see afterHumanReplyIndexed). */
  async listPendingOutbound(customerId: string): Promise<MessageRow[]> {
    const { data } = await this.sb().from('will_messages').select('*')
      .eq('customer_id', customerId)
      .eq('direction', 'OUT')
      .in('status', ['PENDING_APPROVAL', 'QUEUED']);
    return (data ?? []).map(toMessage);
  }

  async getMessageById(id: string): Promise<MessageRow | null> {
    const { data } = await this.sb().from('will_messages').select('*').eq('id', id).limit(1).maybeSingle();
    return data ? toMessage(data) : null;
  }

  /** Outbound messages stranded mid-send: written QUEUED (or claimed SENDING)
   *  and never reconciled to SENT/FAILED because the invocation died in between.
   *  Bounded and indexed on (direction,status,created_at). The caller passes an
   *  age far beyond any real send or autopilot delay so a message still in
   *  flight is never mistaken for a stranded one. */
  async staleOutbound(olderThanMs: number, limit = 500): Promise<MessageRow[]> {
    const cutoff = new Date(Date.now() - olderThanMs).toISOString();
    const { data, error } = await this.sb().from('will_messages').select('*')
      .eq('direction', 'OUT').in('status', ['QUEUED', 'SENDING'])
      .lt('created_at', cutoff)
      .order('created_at', { ascending: true }).limit(limit);
    if (error) { lastPersistError = `staleOutbound: ${error.message}`; throw error; }
    return (data ?? []).map(toMessage);
  }

  async listInboundBetween(
    startIso: string,
    endIso: string,
    limit = 5000,
  ): Promise<(MessageRow & { customerName?: string | null; waId?: string })[]> {
    return this.messagesBetween(startIso, endIso, limit, 'IN');
  }

  async listMessagesBetween(
    startIso: string,
    endIso: string,
    limit = 10000,
  ): Promise<(MessageRow & { customerName?: string | null; waId?: string })[]> {
    // Same shape as listInboundBetween but both directions: the daily digest
    // needs the outbound reply that followed each inbound question.
    return this.messagesBetween(startIso, endIso, limit);
  }

  /** The messages in a window with their customer's name and number.
   *
   *  This used to be one query with `will_customers(name, wa_id)` embedded.
   *  PostgREST can only embed across a FOREIGN KEY, and will_messages has none
   *  (migration 021 declares customer_id as plain TEXT), so the query failed
   *  with PGRST200, the error was ignored, and the digest read an empty day
   *  every night: "No new suggestions today, every message was answered using
   *  the Library" (audit, 3 Sep). Two plain queries now, and a failed read is
   *  a thrown error, never a quiet empty list. The explicit .limit() matters:
   *  without one PostgREST caps the result at 1000 rows. */
  private async messagesBetween(
    startIso: string, endIso: string, limit: number, direction?: 'IN' | 'OUT',
  ): Promise<(MessageRow & { customerName?: string | null; waId?: string })[]> {
    let q = this.sb().from('will_messages').select('*')
      .gte('created_at', startIso).lt('created_at', endIso)
      .order('created_at', { ascending: true }).limit(limit);
    if (direction) q = q.eq('direction', direction);
    const { data, error } = await q;
    if (error) { lastPersistError = `messagesBetween: ${error.message}`; throw new Error(`messagesBetween read failed: ${error.message}`); }
    const rows = data ?? [];
    const ids = [...new Set(rows.map((r) => r.customer_id as string).filter(Boolean))];
    const byId = new Map<string, { name: string | null; wa_id: string }>();
    // .in() with a long list is fine for PostgREST, but keep the URL sane.
    for (let i = 0; i < ids.length; i += 200) {
      const { data: cs, error: cerr } = await this.sb().from('will_customers')
        .select('id, name, wa_id').in('id', ids.slice(i, i + 200));
      if (cerr) { lastPersistError = `messagesBetween customers: ${cerr.message}`; throw new Error(`messagesBetween customers read failed: ${cerr.message}`); }
      for (const c of cs ?? []) byId.set(c.id as string, { name: (c.name as string | null) ?? null, wa_id: c.wa_id as string });
    }
    return rows.map((row) => {
      const c = byId.get(row.customer_id as string);
      return { ...toMessage(row), customerName: c?.name ?? null, waId: c?.wa_id };
    });
  }

  async claimMessageForSend(id: string): Promise<boolean> {
    // Atomic: only succeeds if the row is still PENDING_APPROVAL, so two
    // concurrent approvals cannot both transmit.
    const { data } = await this.sb().from('will_messages')
      .update({ status: 'QUEUED' }).eq('id', id).eq('status', 'PENDING_APPROVAL').select('id');
    return (data ?? []).length > 0;
  }

  async claimQueuedForSend(id: string): Promise<boolean> {
    // Atomic, same shape as claimMessageForSend above: the eq('status','QUEUED')
    // in the UPDATE is what makes only one caller win.
    const { data } = await this.sb().from('will_messages')
      .update({ status: 'SENDING' }).eq('id', id).eq('status', 'QUEUED').select('id');
    return (data ?? []).length > 0;
  }

  async setMessageStatus(id: string, status: MessageRow['status'], opts?: { restamp?: boolean }): Promise<void> {
    const patch: Record<string, unknown> = { status };
    if (opts?.restamp) patch.created_at = now();
    // `.select` so the customer comes back from the same round trip: the chat
    // list row has to be re-derived whenever a message's delivery status moves
    // (QUEUED -> SENT is the moment a reply becomes real; -> FAILED/BLOCKED/
    // DISCARDED is the moment one stops being real).
    const { data } = await this.sb().from('will_messages').update(patch).eq('id', id).select('customer_id');
    const customerId = (data ?? [])[0]?.customer_id as string | undefined;
    if (customerId) await this.refreshLastMessage(customerId);
  }

  async attachProviderId(id: string, providerId: string): Promise<void> {
    const { data } = await this.sb().from('will_messages').select('meta').eq('id', id).maybeSingle();
    const meta = { ...((data?.meta as Record<string, unknown>) ?? {}), providerId };
    await this.sb().from('will_messages').update({ meta }).eq('id', id);
  }

  async discardByProviderId(providerId: string): Promise<boolean> {
    // meta is JSONB; match on meta->>providerId.
    const { data } = await this.sb().from('will_messages')
      .update({ status: 'DISCARDED' })
      .eq('meta->>providerId', providerId)
      .select('id, customer_id');
    // The owner deleted this message in the WhatsApp app, so it is no longer
    // something the customer has: if it was the row preview, the row must fall
    // back to whatever really is the last message now.
    const customerId = (data ?? [])[0]?.customer_id as string | undefined;
    if (customerId) await this.refreshLastMessage(customerId);
    return (data?.length ?? 0) > 0;
  }

  async markDeliveryFailedByProviderId(providerId: string, error: string): Promise<MessageRow | null> {
    const { data: found } = await this.sb().from('will_messages').select('*')
      .eq('meta->>providerId', providerId).limit(1).maybeSingle();
    if (!found) return null;
    const meta = { ...((found.meta as Record<string, unknown>) ?? {}), sendError: error, deliveryFailedAt: now() };
    const { error: err } = await this.sb().from('will_messages')
      .update({ status: 'FAILED', meta }).eq('id', found.id);
    if (err) { lastPersistError = `markDeliveryFailed: ${err.message}`; throw new Error(err.message); }
    // A failed message is not what the customer last saw: the preview falls
    // back to whatever really is the last message now.
    await this.refreshLastMessage(found.customer_id as string);
    return toMessage({ ...found, status: 'FAILED', meta });
  }

  async markDeliveryReceiptByProviderId(providerId: string, receipt: 'delivered' | 'read', at: string): Promise<void> {
    const { data: found } = await this.sb().from('will_messages').select('id, meta')
      .eq('meta->>providerId', providerId).limit(1).maybeSingle();
    if (!found) return;
    const meta = { ...((found.meta as Record<string, unknown>) ?? {}), [receipt === 'read' ? 'readAt' : 'deliveredAt']: at };
    await this.sb().from('will_messages').update({ meta }).eq('id', found.id);
  }

  async applyEditByProviderId(providerId: string, body: string | null): Promise<boolean> {
    const { data: found } = await this.sb().from('will_messages')
      .select('id, customer_id, meta').eq('meta->>providerId', providerId).maybeSingle();
    if (!found) return false;
    const meta = { ...((found.meta as Record<string, unknown>) ?? {}), edited: true };
    const patch: Record<string, unknown> = { meta };
    // Only when Meta actually handed us the new wording. Overwriting the stored
    // text with anything else would replace what the customer really said with
    // a guess, in the one record that is supposed to be the truth.
    if (body && body.trim()) patch.body = body;
    await this.sb().from('will_messages').update(patch).eq('id', found.id as string);
    const customerId = found.customer_id as string | undefined;
    // The edited message may be the one the chat list is previewing.
    if (customerId && body && body.trim()) await this.refreshLastMessage(customerId);
    return true;
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
    // Every OPEN task, however old, plus the most recent resolved ones. One
    // unbounded query used to be capped at PostgREST's 1,000 rows, newest
    // first, so once the table passed that an old OPEN handoff simply fell
    // off the Tasks tab and could never be resolved (audit, 3 Sep).
    const [{ data: open, error: e1 }, { data: recent, error: e2 }] = await Promise.all([
      this.sb().from('will_tasks').select('*').eq('status', 'OPEN').order('created_at', { ascending: false }).limit(5000),
      this.sb().from('will_tasks').select('*').neq('status', 'OPEN').order('created_at', { ascending: false }).limit(500),
    ]);
    if (e1) { lastPersistError = `listTasks: ${e1.message}`; throw new Error(`listTasks read failed: ${e1.message}`); }
    if (e2) { lastPersistError = `listTasks: ${e2.message}`; }
    const seen = new Set<string>();
    const out: TaskRow[] = [];
    for (const r of [...(open ?? []), ...(recent ?? [])]) {
      if (seen.has(r.id as string)) continue;
      seen.add(r.id as string);
      out.push(toTask(r));
    }
    return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0));
  }

  // Task writes and the one-task lookup fail loud like addTask does (audit,
  // 5 Sep). They used to ignore `error`: a failed lookup looked like "no open
  // task" and raiseOrUpdateTask opened a second card for the same customer,
  // a failed update silently dropped the customer's newest message from the
  // card, and a failed resolve let the dashboard say "Dismissed" before the
  // card came straight back on the next poll. Throwing keeps the one-task
  // rule (raise nothing during a blip rather than raise twice), lets
  // resolve_task return the error the dashboard already renders, and puts
  // the failure on the System & Costs "last write failed" line.
  async resolveTask(id: string): Promise<void> {
    const { error } = await this.sb().from('will_tasks').update({ status: 'RESOLVED' }).eq('id', id);
    if (error) { lastPersistError = `resolveTask: ${error.message}`; throw new Error(`resolveTask write failed: ${error.message}`); }
  }

  async findOpenTaskForCustomer(customerId: string): Promise<TaskRow | null> {
    const { data, error } = await this.sb().from('will_tasks').select('*')
      .eq('customer_id', customerId).eq('status', 'OPEN')
      .order('created_at', { ascending: false }).limit(1).maybeSingle();
    if (error) { lastPersistError = `findOpenTaskForCustomer: ${error.message}`; throw new Error(`findOpenTaskForCustomer read failed: ${error.message}`); }
    return data ? toTask(data) : null;
  }

  // Single-row and per-customer task reads (audit, 5 Sep). Every owner send
  // (Tasks tab, chat, approve, estimate/signature/lodged) and every phone echo
  // used to read the whole task table through listTasks() just to find one
  // task or one customer's open ones; at thousands of rows with 2,000-char
  // contexts that was the wait behind the greyed Send button. Same rows come
  // back, from the indexed (customer_id, status) lookup instead.
  async getTaskById(id: string): Promise<TaskRow | null> {
    const { data, error } = await this.sb().from('will_tasks').select('*').eq('id', id).maybeSingle();
    if (error) { lastPersistError = `getTaskById: ${error.message}`; throw new Error(`getTaskById read failed: ${error.message}`); }
    return data ? toTask(data) : null;
  }

  async listOpenTasksForCustomer(customerId: string): Promise<TaskRow[]> {
    const { data, error } = await this.sb().from('will_tasks').select('*')
      .eq('customer_id', customerId).eq('status', 'OPEN')
      .order('created_at', { ascending: false }).limit(1000);
    if (error) { lastPersistError = `listOpenTasksForCustomer: ${error.message}`; throw new Error(`listOpenTasksForCustomer read failed: ${error.message}`); }
    return (data ?? []).map(toTask);
  }

  async updateTask(id: string, patch: Partial<Pick<TaskRow, 'reason' | 'context' | 'suggestedReply' | 'severity'>>): Promise<void> {
    const row: Record<string, unknown> = {};
    if (patch.reason !== undefined) row.reason = patch.reason;
    if (patch.context !== undefined) row.context = patch.context;
    if (patch.suggestedReply !== undefined) row.suggested_reply = patch.suggestedReply;
    if (patch.severity !== undefined) row.severity = patch.severity;
    if (Object.keys(row).length === 0) return;
    const { error } = await this.sb().from('will_tasks').update(row).eq('id', id);
    if (error) { lastPersistError = `updateTask: ${error.message}`; throw new Error(`updateTask write failed: ${error.message}`); }
  }

  // (audit, 5 Sep) A discarded error here used to read as "table empty": the
  // seed route saw existing.length === 0 and inserted the whole seed set on
  // top of a populated table, doubling every Library key. Same throw-loud
  // shape as pageAll, so a transient read failure can no longer masquerade
  // as an empty Library.
  async listTemplates(): Promise<TemplateRow[]> {
    await this.ensureSeeded();
    const { data, error } = await this.sb().from('will_templates').select('*').order('updated_at', { ascending: false });
    if (error) { lastPersistError = `listTemplates: ${error.message}`; throw error; }
    return (data ?? []).map(toTemplate);
  }

  async addTemplate(t: { category: string; title: string; body: string; key?: string }): Promise<TemplateRow> {
    const row = {
      id: randomUUID(), key: t.key || 'custom_' + randomUUID().slice(0, 8),
      category: t.category || 'Custom', title: t.title || 'Untitled message', body: t.body,
      requires_meta: false, versions: 1, updated_at: now(),
    };
    const { data, error } = await this.sb().from('will_templates').insert(row).select('*').single();
    if (error) {
      // (audit, 5 Sep) will_templates.key is now unique (migration 041). The
      // backfill tick and a concurrent dashboard tab can both see a key
      // missing and both try to add it; the second insert hits the unique
      // violation. Treat that as "already present" and hand back the row
      // that won, instead of failing the tick.
      if (error.code === '23505' && row.key) {
        const { data: existing } = await this.sb().from('will_templates').select('*').eq('key', row.key).maybeSingle();
        if (existing) return toTemplate(existing);
      }
      lastPersistError = error.message; throw error;
    }
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

  async getSetting(key: string): Promise<unknown> {
    const { data } = await this.sb().from('will_settings').select('value').eq('key', key).maybeSingle();
    return data ? (data.value as unknown) : undefined;
  }

  async setSetting(key: string, value: unknown): Promise<void> {
    await this.sb().from('will_settings').upsert({ key, value }, { onConflict: 'key' });
  }

  async listCounters(prefix: string): Promise<{ key: string; value: number }[]> {
    // `like` with a trailing % — the daily AI counters are 'ai_calls:2026-08-26'.
    // The `_` and `%` wildcards are escaped so a prefix can never widen the match.
    const pattern = prefix.replace(/([%_\\])/g, '\\$1') + '%';
    const { data } = await this.sb().from('will_settings').select('key, value').like('key', pattern);
    return (data ?? [])
      .map((r) => ({ key: String(r.key), value: Number(r.value) }))
      .filter((r) => Number.isFinite(r.value));
  }

  /** Atomic slot claim against a daily limit (migration 029).
   *
   *  The counter this replaces was a SELECT then an upsert, which meant every
   *  concurrent serverless instance read the same value and wrote value+1: the
   *  count advanced by ~1 instead of N and the cap did not hold. The paid AI
   *  call it guards is reachable by anyone who messages the business number, so
   *  the ceiling has to be real.
   *
   *  Fails CLOSED: if the function is missing (migration not run) or the call
   *  errors, we report "exhausted" so the conversation goes to a human rather
   *  than spending money we cannot account for. */
  async bumpCounter(key: string, limit: number): Promise<boolean> {
    try {
      const { data, error } = await this.sb().rpc('will_bump_counter', { p_key: key, p_limit: limit });
      if (error) { lastPersistError = `bumpCounter: ${error.message}`; return true; }
      return data === true;
    } catch (e) {
      lastPersistError = `bumpCounter: ${(e as Error).message}`;
      return true;
    }
  }

  async addJob(j: Omit<JobRow, 'id' | 'createdAt' | 'status'>): Promise<JobRow> {
    const row = {
      id: randomUUID(), customer_id: j.customerId, kind: j.kind, payload: j.payload,
      run_at: j.runAt, status: 'SCHEDULED', attempts: 0, created_at: now(),
    };
    const { data, error } = await this.sb().from('will_jobs').insert(row).select('*').single();
    if (error) {
      // 23505 on will_jobs_one_pending_followup (or will_jobs_one_pending_auto_reply,
      // migration 040, audit3 core 32, 5 Sep) means another process armed the
      // same follow-up a moment ago. That is the index doing its job, not a
      // failure: the customer already has exactly one pending nudge, which is
      // the whole point. Migration 034 explains the race.
      if ((error as { code?: string }).code === '23505') {
        const { data: existing } = await this.sb().from('will_jobs').select('*')
          .eq('customer_id', j.customerId).eq('kind', j.kind).eq('status', 'SCHEDULED')
          .limit(1).maybeSingle();
        if (existing) return toJob(existing);
      }
      lastPersistError = error.message; throw error;
    }
    return toJob(data);
  }

  /** Oldest-due first, capped. Unordered and unlimited, a backlog past
   *  PostgREST's implicit 1000-row ceiling returned an arbitrary slice, so the
   *  same newest jobs could be picked up forever while the oldest never ran.
   *  The cap pairs with the tick loop's time budget: whatever this batch does
   *  not clear is still SCHEDULED and comes back on the next tick.
   *
   *  Two reads, not one (audit3 core 12, 5 Sep): the customer-facing kinds
   *  (CUSTOMER_FACING_JOB_KINDS) are fetched first and the remainder of the
   *  batch is filled with everything else. With a single run_at-ordered read,
   *  the 19:00 follow-up pile could take all 50 rows and a customer's
   *  two-minute Autopilot timer was not in the batch at all, tick after tick,
   *  until the pile had drained. Same rows, same rules; a waiting customer is
   *  just never left out of the batch. Both reads use idx_will_jobs_due. */
  async dueJobs(nowDate: Date): Promise<JobRow[]> {
    const dueAt = nowDate.toISOString();
    const kinds = [...CUSTOMER_FACING_JOB_KINDS];
    const facing = await this.sb().from('will_jobs').select('*')
      .eq('status', 'SCHEDULED').lte('run_at', dueAt).in('kind', kinds)
      .order('run_at', { ascending: true }).limit(DUE_JOBS_BATCH);
    // A FAILED read must never look like "nothing is due". This is the one query
    // that decides whether the tick does any work at all: if a transient DB
    // error silently returned [], every Autopilot reply, follow-up, form
    // confirmation and nightly job would freeze with the tick still reporting
    // success — the whole automation stopped, invisibly, until someone noticed.
    // So it fails loud: record it and throw, and the next tick retries.
    if (facing.error) {
      lastPersistError = `dueJobs: ${facing.error.message}`;
      throw new Error(`dueJobs read failed: ${facing.error.message}`);
    }
    const first = (facing.data ?? []).map(toJob);
    const room = DUE_JOBS_BATCH - first.length;
    if (room <= 0) return first;
    const rest = await this.sb().from('will_jobs').select('*')
      .eq('status', 'SCHEDULED').lte('run_at', dueAt)
      .not('kind', 'in', `(${kinds.join(',')})`)
      .order('run_at', { ascending: true }).limit(room);
    if (rest.error) {
      lastPersistError = `dueJobs: ${rest.error.message}`;
      throw new Error(`dueJobs read failed: ${rest.error.message}`);
    }
    return first.concat((rest.data ?? []).map(toJob));
  }

  /** Every job. Paged for the same reason as allHistory: the Scheduled
   *  Follow-ups view read an unordered, 1,000-row-capped slice, so once the job
   *  table grew past that the queue it showed was arbitrary (audit, 4 Sep). */
  async listJobs(): Promise<JobRow[]> {
    return (await this.pageAll<Record<string, unknown>>('will_jobs', 'id')).map(toJob);
  }

  /** SCHEDULED FOLLOW_UP jobs only, soonest first, paged. The filter runs in
   *  the database (served by idx_will_jobs_due on status, run_at) instead of
   *  reading every DONE/CANCELLED job ever created and filtering in JS, which
   *  is what the Scheduled Follow-ups view did every 20 seconds (audit, 5 Sep).
   *  Ordered by (run_at, id) so pages neither overlap nor skip when two jobs
   *  share a run_at. */
  async listScheduledFollowUps(): Promise<JobRow[]> {
    const PAGE = 1000;
    const out: JobRow[] = [];
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await this.sb().from('will_jobs').select('*')
        .eq('kind', 'FOLLOW_UP').eq('status', 'SCHEDULED')
        .order('run_at', { ascending: true }).order('id', { ascending: true })
        .range(from, from + PAGE - 1);
      if (error) { lastPersistError = `listScheduledFollowUps: ${error.message}`; throw error; }
      const rows = data ?? [];
      out.push(...rows.map(toJob));
      if (rows.length < PAGE) break;
    }
    return out;
  }

  async listJobsForCustomer(customerId: string, kinds?: JobRow['kind'][]): Promise<JobRow[]> {
    let q = this.sb().from('will_jobs').select('*').eq('customer_id', customerId);
    if (kinds && kinds.length) q = q.in('kind', kinds);
    const { data } = await q;
    return (data ?? []).map(toJob);
  }

  async customerIdsWithScheduledFollowup(): Promise<string[]> {
    // One indexed, single-column query, paged. At most one pending FOLLOW_UP
    // per customer (migration 034), so the set is bounded by active leads.
    const out = new Set<string>();
    const PAGE = 1000;
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await this.sb().from('will_jobs')
        .select('customer_id')
        .eq('kind', 'FOLLOW_UP').eq('status', 'SCHEDULED')
        .range(from, from + PAGE - 1);
      if (error) { lastPersistError = `followupIds: ${error.message}`; break; }
      const rows = data ?? [];
      for (const r of rows) if (r.customer_id) out.add(r.customer_id as string);
      if (rows.length < PAGE) break;
    }
    return [...out];
  }

  async customerIdsWithPendingAutoReply(): Promise<string[]> {
    // At most one armed timer per customer (armAutoReply cancels the previous
    // one), so this is bounded by the customers who wrote in the last few
    // minutes. Payload shape is checked in memory: the older messageId jobs
    // are not "about to answer", they are a reply already written.
    const out = new Set<string>();
    const { data, error } = await this.sb().from('will_jobs')
      .select('customer_id, payload')
      .eq('kind', 'AUTO_REPLY').in('status', ['SCHEDULED', 'CLAIMED'])
      .limit(2000);
    if (error) { lastPersistError = `autoReplyIds: ${error.message}`; return []; }
    for (const r of data ?? []) {
      const payload = (r.payload ?? {}) as { debounce?: boolean };
      if (r.customer_id && payload.debounce) out.add(r.customer_id as string);
    }
    return [...out];
  }

  async listUpcomingJobs(limit: number): Promise<JobRow[]> {
    const { data } = await this.sb().from('will_jobs').select('*')
      .eq('status', 'SCHEDULED').neq('kind', 'NIGHTLY')
      .order('run_at', { ascending: true }).limit(limit);
    return (data ?? []).map(toJob);
  }

  /** Generic form of `hasScheduledNightly`, for any job kind. A head+count
   *  existence check, so testing for one row never pulls the whole table. */
  async hasScheduledJobOfKind(kind: JobRow['kind']): Promise<boolean> {
    const { count } = await this.sb().from('will_jobs')
      .select('id', { count: 'exact', head: true })
      .eq('kind', kind).eq('status', 'SCHEDULED');
    return (count ?? 0) > 0;
  }

  async hasScheduledNightly(): Promise<boolean> {
    const { count } = await this.sb().from('will_jobs')
      .select('id', { count: 'exact', head: true })
      .eq('kind', 'NIGHTLY').eq('status', 'SCHEDULED');
    return (count ?? 0) > 0;
  }

  async getJob(id: string): Promise<JobRow | null> {
    const { data } = await this.sb().from('will_jobs').select('*').eq('id', id).maybeSingle();
    return data ? toJob(data) : null;
  }

  async setJobStatus(id: string, status: JobRow['status']): Promise<void> {
    // A swallowed error here defeated the mark-DONE-before-send guard: the
    // template went out, the job stayed CLAIMED, was reclaimed, and the same
    // nudge went again (audit, 3 Sep). A write that fails now fails loudly,
    // which the job loop turns into FAILED + audit instead of a resend.
    const { error } = await this.sb().from('will_jobs').update({ status }).eq('id', id);
    if (error) { lastPersistError = `setJobStatus: ${error.message}`; throw new Error(`setJobStatus failed: ${error.message}`); }
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
    const { data, error } = await this.sb().from('will_jobs').select('*')
      .eq('status', 'CLAIMED').or(`claimed_at.is.null,claimed_at.lt.${cutoff}`);
    // Recorded but not thrown: a failed reclaim must not stop the tick from
    // sending the jobs it CAN see. A job left CLAIMED by this miss is picked up
    // on the next reclaim anyway. dueJobs, right after, is the one that throws.
    if (error) lastPersistError = `reclaimStaleJobs: ${error.message}`;
    const stale = (data ?? []).map(toJob);
    let n = 0;
    for (const j of stale) {
      const deadLettered = (j.attempts ?? 0) >= 3;
      const next = deadLettered ? 'FAILED' : 'SCHEDULED';
      await this.sb().from('will_jobs').update({ status: next }).eq('id', j.id);
      // A job that has given up is a message that will never be sent: a
      // follow-up that never goes, a review request nobody gets, a payment
      // confirmation left undelivered. It used to end here in silence, with
      // nothing in the audit trail and nothing on the board (audit, 4 Sep).
      if (deadLettered) {
        try {
          await this.audit('scheduler', 'job_dead_lettered', {
            jobId: j.id, kind: j.kind, customerId: j.customerId, attempts: j.attempts ?? 0,
          });
          if (j.customerId) {
            const c = await this.getCustomerById(j.customerId);
            await this.addTask({
              customerId: j.customerId,
              customerName: c?.name ?? null,
              reason: `A scheduled ${j.kind.replace(/_/g, ' ').toLowerCase()} failed three times and has been given up on. Nothing was sent to this customer.`,
              severity: 'REVIEW',
              context: `Job ${j.id} (${j.kind}) was claimed and never completed after ${j.attempts ?? 0} attempts. Check the chat and send it by hand if the customer is still waiting.`,
              suggestedReply: null,
            });
          }
        } catch { /* the reclaim itself must still finish */ }
      }
      n++;
    }
    return n;
  }

  // A swallowed error here reported 0 cancelled while the SCHEDULED row stayed
  // exactly as it was: reconcileSchedule's follow-on addJob then hit the
  // one-pending-followup unique index and handed back that same STALE row as
  // if it were the new one, so the customer who just replied was still nudged
  // at the old time, and "Stop chasing" told the operator it worked while the
  // job kept running. Mirrors setJobStatus (3 Sep): fail loud so every caller's
  // existing catch (reconcile_failed_after_send / manual_followup_not_recorded
  // / the actions route's top-level handler) can see and record the real
  // failure instead of a false ok (audit, 5 Sep).
  async cancelJobsFor(customerId: string, kinds?: JobRow['kind'][]): Promise<number> {
    let q = this.sb().from('will_jobs').update({ status: 'CANCELLED' })
      .eq('customer_id', customerId).eq('status', 'SCHEDULED');
    if (kinds && kinds.length) q = q.in('kind', kinds);
    const { data, error } = await q.select('id');
    if (error) { lastPersistError = `cancelJobsFor: ${error.message}`; throw new Error(`cancelJobsFor failed: ${error.message}`); }
    return data?.length ?? 0;
  }

  /** Row -> KnowledgeRow, shared by listKnowledge and addKnowledge so the
   *  insert path never needs a second read just to shape its own result. */
  private toKnowledgeRow(r: Record<string, unknown>): KnowledgeRow {
    return {
      id: r.id as string,
      intent: (r.intent as string) ?? '',
      question: (r.question as string) ?? '',
      examples: (r.examples as string[]) ?? [],
      answer: (r.answer as string) ?? '',
      keywords: (r.keywords as string[]) ?? [],
      tags: (r.tags as string[]) ?? [],
      lang: (r.lang as string) ?? 'en',
      weight: (r.weight as number) ?? 1,
      status: r.status as KnowledgeRow['status'],
      source: r.source as KnowledgeRow['source'],
      createdAt: (r.created_at as string) ?? now(),
      updatedAt: (r.updated_at as string) ?? now(),
    };
  }

  /** Paged (audit3 core 44, 5 Sep): this used to be a single unordered-cap
   *  `select('*')`, so past PostgREST's implicit 1,000-row ceiling the nightly
   *  digest's dedupe and Will's own retrieval (knowledge.ts, called on every
   *  inbound message) silently lost the oldest/lowest-weight rows, producing
   *  duplicate mined drafts and quietly-ignored answers. Offset paging is fine
   *  here (unlike pageAll's keyset paging for the big tables) because this
   *  table only grows by a handful of mined drafts a night, not thousands of
   *  rows a day; `id` breaks ties so a shared weight can't skip or repeat a row. */
  async listKnowledge(status?: KnowledgeRow['status']): Promise<KnowledgeRow[]> {
    const PAGE = 1000;
    const out: Record<string, unknown>[] = [];
    for (let from = 0; ; from += PAGE) {
      let q = this.sb().from('will_knowledge').select('*')
        .order('weight', { ascending: false }).order('id', { ascending: true });
      if (status) q = q.eq('status', status);
      const { data, error } = await q.range(from, from + PAGE - 1);
      if (error) { lastPersistError = `listKnowledge: ${error.message}`; throw error; }
      const rows = data ?? [];
      out.push(...rows);
      if (rows.length < PAGE) break;
    }
    return out.map((r) => this.toKnowledgeRow(r));
  }
  async addKnowledge(k: Omit<KnowledgeRow, 'id' | 'createdAt' | 'updatedAt'>): Promise<KnowledgeRow> {
    const row = {
      id: randomUUID(), intent: k.intent, question: k.question, examples: k.examples,
      answer: k.answer, keywords: k.keywords, tags: k.tags, lang: k.lang, weight: k.weight,
      status: k.status, source: k.source, created_at: now(), updated_at: now(),
    };
    // Return the row the insert itself gives back (audit3 core 44, 5 Sep):
    // this used to re-run listKnowledge() just to find the row it inserted, so
    // mining N knowledge entries cost N full-table reads for no reason.
    const { data, error } = await this.sb().from('will_knowledge').insert(row).select('*').single();
    if (error) { lastPersistError = error.message; throw error; }
    return this.toKnowledgeRow(data as Record<string, unknown>);
  }
  async updateKnowledge(id: string, patch: Partial<KnowledgeRow>): Promise<void> {
    const upd: Record<string, unknown> = { updated_at: now() };
    for (const key of ['answer', 'intent', 'question', 'examples', 'keywords', 'tags', 'weight', 'lang'] as const) {
      if (key in patch) upd[key] = (patch as Record<string, unknown>)[key];
    }
    await this.sb().from('will_knowledge').update(upd).eq('id', id);
  }
  async setKnowledgeStatus(id: string, status: KnowledgeRow['status']): Promise<void> {
    await this.sb().from('will_knowledge').update({ status, updated_at: now() }).eq('id', id);
  }
  async deleteKnowledge(id: string): Promise<void> {
    await this.sb().from('will_knowledge').delete().eq('id', id);
  }

  // ── Lost-lead post-mortems (migration 031) ──
  //
  // Read-only for every UI path: these rows are written ONLY by the nightly
  // LOST_ANALYSIS job. Nothing in them ever reaches a customer.
  //
  // Paged, then sorted newest first in memory (audit, 5 Sep): the ordered
  // select was silently capped at PostgREST's 1,000 rows, the same trap the
  // customer, history and job readers already avoid above. Three readers need
  // the COMPLETE set: the nightly job treats this list as "already analysed"
  // (so a lead past the cap was re-analysed and re-paid for every night, and
  // its fresh analysed_at pushed another lead off the cap in turn), the lost
  // report showed those leads as pending, and Win-back said "not assessed"
  // for a lead that was. customer_id is the upsert key, so it is a stable,
  // unique page cursor.
  async listLostAnalyses(): Promise<LostAnalysisRow[]> {
    const data = await this.pageAll<Record<string, unknown>>('will_lost_analysis', 'customer_id');
    return data.map(toLostAnalysis)
      .sort((a, b) => String(b.analysedAt).localeCompare(String(a.analysedAt)));
  }

  /** One lead's post-mortem by its key, without reading the whole table. */
  async getLostAnalysis(customerId: string): Promise<LostAnalysisRow | null> {
    const { data, error } = await this.sb().from('will_lost_analysis').select('*')
      .eq('customer_id', customerId).maybeSingle();
    if (error) { lastPersistError = `getLostAnalysis: ${error.message}`; throw error; }
    return data ? toLostAnalysis(data as Record<string, unknown>) : null;
  }

  /** Upsert on customer_id, so re-running the nightly job replaces a lead's
   *  post-mortem rather than accumulating one row per run. */
  async upsertLostAnalysis(row: LostAnalysisRow): Promise<void> {
    const { error } = await this.sb().from('will_lost_analysis').upsert({
      customer_id: row.customerId,
      state: row.state,
      trigger_kind: row.triggerKind,
      quiet_days: row.quietDays,
      hours_price_to_silence: row.hoursPriceToSilence,
      status: row.status,
      error: row.error,
      attempts: row.attempts,
      reason: row.reason,
      category: row.category,
      should_have_done: row.shouldHaveDone,
      fault: row.fault,
      recoverable: row.recoverable,
      recovery_action: row.recoveryAction,
      recovery_message: row.recoveryMessage,
      evidence_quote: row.evidenceQuote,
      confidence: row.confidence,
      analysed_at: row.analysedAt,
    }, { onConflict: 'customer_id' });
    // (audit, 5 Sep) Used to only record lastPersistError and return, so a
    // failed upsert looked identical to a successful one to the caller: the
    // nightly job's .catch(...) that logs 'lost_analysis_store_failed' could
    // never fire, and the loop kept spending paid model calls on leads whose
    // verdicts were never actually stored. Throw so the caller's catch runs.
    if (error) { lastPersistError = `upsertLostAnalysis: ${error.message}`; throw error; }
  }

  async audit(actor: string, action: string, detail?: unknown): Promise<void> {
    // Best-effort: the decision log is valuable but must never break a send if
    // the table is missing or a write fails. Swallow errors deliberately.
    //
    // But READ the result. The Supabase client does not throw on a failed
    // insert, it returns { error }, so the old try/catch never saw a missing
    // column, an RLS change or a full table: every row was dropped in silence
    // and the diagnostics then read an empty log as "all clear" (audit, 5 Sep).
    try {
      const { error } = await this.sb().from('will_audit').insert({ actor, action, detail: detail ?? null });
      if (error) lastPersistError = `audit ${action}: ${error.message}`;
    } catch (e) {
      lastPersistError = `audit ${action}: ${(e as Error).message}`;
    }
  }

  async checkAuditLog(): Promise<{ ok: true } | { ok: false; error: string }> {
    // One cheap read on the log table, so an empty decision log is never
    // mistaken for a quiet system (audit, 5 Sep). Two ways it can be broken:
    // the table cannot be read at all, or it reads fine but stays empty while
    // customers are clearly talking to us (inserts failing, see audit() above).
    try {
      const probe = await this.sb().from('will_audit').select('id').limit(1);
      if (probe.error) return { ok: false, error: `will_audit cannot be read: ${probe.error.message}` };
      if ((probe.data ?? []).length > 0) return { ok: true };
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { count, error } = await this.sb().from('will_messages')
        .select('id', { count: 'exact', head: true }).gte('created_at', since);
      if (error || !count) return { ok: true };
      const seen = lastPersistError && lastPersistError.startsWith('audit ') ? ` (last write error seen here: ${lastPersistError})` : '';
      return { ok: false, error: `will_audit is empty although ${count} message(s) were exchanged in the last day, so writes to it are failing${seen}` };
    } catch (e) {
      return { ok: false, error: `will_audit cannot be read: ${(e as Error).message}` };
    }
  }

  async claimInbound(metaId: string): Promise<boolean> {
    // Atomic: the UNIQUE primary key means the first insert wins and a duplicate
    // insert returns a unique-violation (23505) which we treat as "already seen".
    const { error } = await this.sb().from('will_processed_messages').insert({ meta_id: metaId });
    if (!error) return true;
    if ((error as { code?: string }).code === '23505') return false; // duplicate
    // On an unexpected error, fail OPEN (allow processing) rather than dropping a
    // real message; at-least-once is safer than at-most-zero for a customer reply.
    return true;
  }

  async releaseInbound(metaId: string): Promise<void> {
    await this.sb().from('will_processed_messages').delete().eq('meta_id', metaId);
  }

  async purgeAudit(olderThanMs: number): Promise<number> {
    const cutoff = new Date(Date.now() - olderThanMs).toISOString();
    const { data } = await this.sb().from('will_audit').delete().lt('created_at', cutoff).select('id');
    return data?.length ?? 0;
  }

  async purgeProcessedMessages(olderThanMs: number): Promise<number> {
    const cutoff = new Date(Date.now() - olderThanMs).toISOString();
    const { data } = await this.sb().from('will_processed_messages').delete().lt('created_at', cutoff).select('meta_id');
    return (data ?? []).length;
  }

  /** Every SCHEDULED job, filtered by the database (idx_will_jobs_due on
   *  status, run_at) and paged on (run_at, id), for the nightly orphan sweep,
   *  which used to page the entire never-purged table (audit3 sched 54, 5 Sep). */
  async listScheduledJobs(): Promise<JobRow[]> {
    const PAGE = 1000;
    const out: JobRow[] = [];
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await this.sb().from('will_jobs').select('*')
        .eq('status', 'SCHEDULED')
        .order('run_at', { ascending: true }).order('id', { ascending: true })
        .range(from, from + PAGE - 1);
      if (error) { lastPersistError = `listScheduledJobs: ${error.message}`; throw error; }
      const rows = data ?? [];
      out.push(...rows.map(toJob));
      if (rows.length < PAGE) break;
    }
    return out;
  }

  /** Finished job rows older than the cutoff: CANCELLED/FAILED of any kind and
   *  DONE of every kind but FOLLOW_UP (those are the cadence's memory, see
   *  reconcileSchedule). Counted rather than selected back, because the first
   *  run after deploy removes months of auto-reply timers and LOST_ANALYSIS
   *  rows and returning every id would be its own problem (audit3 sched 54, 5 Sep). */
  async purgeFinishedJobs(olderThanMs: number): Promise<number> {
    const cutoff = new Date(Date.now() - olderThanMs).toISOString();
    const { count, error } = await this.sb().from('will_jobs')
      .delete({ count: 'exact' })
      .lt('created_at', cutoff)
      .or('status.in.(CANCELLED,FAILED),and(status.eq.DONE,kind.neq.FOLLOW_UP)');
    if (error) { lastPersistError = `purgeFinishedJobs: ${error.message}`; throw error; }
    return count ?? 0;
  }

  async listAudit(limit = 200): Promise<AuditRow[]> {
    try {
      const { data, error } = await this.sb()
        .from('will_audit')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      // Same reason as audit(): the client returns the error instead of
      // throwing, so note it rather than pass off a failed read as an empty
      // log (audit, 5 Sep). Callers still get [] and carry on.
      if (error) lastPersistError = `listAudit: ${error.message}`;
      return (data ?? []).map((r: Record<string, unknown>) => ({
        id: String(r.id),
        actor: String(r.actor),
        action: String(r.action),
        detail: r.detail ?? null,
        at: String(r.created_at),
      }));
    } catch {
      return [];
    }
  }
}
