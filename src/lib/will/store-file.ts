// JSON-file store: credential-free persistence for dev & the simulator.
// Lives in .data/store.json (gitignored). Not for production traffic.
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import {
  Store, CustomerRow, MessageRow, TaskRow, TemplateRow, StateHistoryRow, JobRow, KnowledgeRow, AuditRow,
  LostAnalysisRow,
} from './store';
import { CustomerState } from './state-machine';
import { phoneCandidates } from './phone-candidates';
import { seedCustomers, seedTemplates } from './seed';

interface Db {
  customers: CustomerRow[];
  messages: MessageRow[];
  tasks: TaskRow[];
  templates: TemplateRow[];
  history: StateHistoryRow[];
  jobs: JobRow[];
  knowledge: KnowledgeRow[];
  settings: Record<string, unknown>;
  audit: { id?: string; actor: string; action: string; detail: unknown; at: string }[];
  processed?: { id: string; at: string }[];
  lostAnalyses?: LostAnalysisRow[];   // stored lost-lead post-mortems (migration 031)
  knownContacts?: string[]; // normalized numbers of pre-existing contacts kept OUT of Will
}

function normPhoneDigits(num: string | null | undefined): string | null {
  let d = (num ?? '').replace(/\D/g, '');
  if (!d) return null;
  if (d.startsWith('00')) d = d.slice(2);
  return d.length < 7 ? null : d;
}

const FILE = path.join(process.cwd(), '.data', 'store.json');
let cache: Db | null = null;
let writing: Promise<void> = Promise.resolve();

async function load(): Promise<Db> {
  if (cache) return cache;
  try {
    const rawText = await fs.readFile(FILE, 'utf8');
    try {
      cache = JSON.parse(rawText) as Db;
    } catch (parseErr) {
      await fs.writeFile(FILE + '.corrupt-' + Date.now(), rawText).catch(() => {});
      throw parseErr;
    }
    cache.jobs ??= [];
    cache.knowledge ??= [];
    cache.settings ??= {};
    cache.processed ??= [];
    cache.lostAnalyses ??= [];
    for (const c of cache.customers) { c.previousState ??= null; c.lastMessageDirection ??= (c.unread ? 'IN' : 'OUT'); c.botOwned ??= false; c.lang ??= null; c.unreadCount ??= (c.unread ? 1 : 0); c.lastMessageAt ??= (c.lastCustomerMsgAt ?? c.stateChangedAt ?? c.createdAt ?? null); }
    for (const t of cache.tasks) t.suggestedReply ??= null;
  } catch {
    cache = {
      customers: seedCustomers(),
      messages: [],
      tasks: [],
      templates: seedTemplates(),
      history: [],
      jobs: [],
      knowledge: [],
      settings: {},
      audit: [],
      lostAnalyses: [],
    };
    await persist();
  }
  return cache;
}

/** Last persist error (M9: surfaced so /api/health can report a failing disk
 *  instead of the app silently pretending writes succeeded). */
export let lastPersistError: string | null = null;

async function persist(): Promise<void> {
  const db = cache!;
  // .catch keeps the chain alive after a transient fs failure;
  // temp-file + rename makes the write atomic (a crash can't tear store.json).
  writing = writing.catch(() => {}).then(async () => {
    try {
      await fs.mkdir(path.dirname(FILE), { recursive: true });
      const tmp = FILE + '.tmp';
      await fs.writeFile(tmp, JSON.stringify(db, null, 1));
      await fs.rename(tmp, FILE);
      lastPersistError = null;
    } catch (e) {
      lastPersistError = String(e);
      console.error('[store] persist failed:', e);
      throw e; // propagate to this call's awaiter so the request can surface it
    }
  });
  return writing;
}

const now = () => new Date().toISOString();

/** Most jobs a single tick will claim. Kept in step with the Supabase store. */
const DUE_JOBS_BATCH = 50;

/** Re-derive a customer's chat-list row (preview / direction / time) from the
 *  newest message that actually exists as far as the customer is concerned:
 *  one they sent, or one of ours WhatsApp accepted. Both are stored as 'SENT'.
 *  A draft, a parked autopilot reply, a guard-blocked, discarded or failed
 *  message never reached them and must never appear as the row's last message.
 *  Mirrors SupabaseStore.refreshLastMessage; called on every status change. */
function refreshLastMessage(db: Db, customerId: string): void {
  const c = db.customers.find((x) => x.id === customerId);
  if (!c) return;
  let latest: MessageRow | null = null;
  for (const m of db.messages) {
    if (m.customerId !== customerId || m.status !== 'SENT') continue;
    // `>=` not `>`: db.messages is append-ordered, so on two messages written
    // in the same millisecond the later-appended one is the later message.
    if (!latest || m.createdAt >= latest.createdAt) latest = m;
  }
  c.lastMessagePreview = latest ? latest.body.slice(0, 80) : null;
  c.lastMessageDirection = latest ? latest.direction : null;
  c.lastMessageAt = latest ? latest.createdAt : null;
}

export class FileStore implements Store {
  async listCustomers() { return (await load()).customers; }

  async countCustomers() { return (await load()).customers.length; }

  async countInStates(states: CustomerState[]) {
    if (!states.length) return 0;
    const set = new Set(states);
    return (await load()).customers.filter((c) => set.has(c.state)).length;
  }

  async listChatPage(offset: number, limit: number, opts?: { states?: CustomerState[]; unreadOnly?: boolean }) {
    const set = opts?.states && opts.states.length ? new Set(opts.states) : null;
    return (await load()).customers
      .filter((c) => c.lastMessagePreview)
      .filter((c) => !set || set.has(c.state))
      .filter((c) => !opts?.unreadOnly || c.unreadCount > 0)
      .sort((a, b) => {
        const at = (a.lastMessageAt ?? a.lastCustomerMsgAt) ?? '';
        const bt = (b.lastMessageAt ?? b.lastCustomerMsgAt) ?? '';
        return bt.localeCompare(at) || String(b.id).localeCompare(String(a.id));
      })
      .slice(offset, offset + limit);
  }

  async searchCustomers(q: string, limit = 50) {
    const raw = (q ?? '').trim().toLowerCase();
    if (!raw) return [];
    const digits = raw.replace(/\D/g, '');
    const noTrunk = digits.replace(/^0+/, '');
    const all = (await load()).customers;
    const out = all.filter((c) => {
      const num = (c.waId ?? '').replace(/\D/g, '');
      const numHit = digits.length >= 3 && (num.includes(digits) || (!!noTrunk && num.includes(noTrunk)));
      const nameHit = (c.name ?? '').toLowerCase().includes(raw);
      const prevHit = (c.lastMessagePreview ?? '').toLowerCase().includes(raw);
      return numHit || nameHit || prevHit;
    });
    return out.slice(0, limit);
  }

  async getCustomerByWaId(waId: string) {
    return (await load()).customers.find((c) => c.waId === waId) ?? null;
  }

  async findCustomerByPhone(phone: string) {
    // Same rule as the Supabase store: both spellings of the same number, and
    // an ambiguous match (two customers) is treated as no match.
    const candidates = phoneCandidates(phone);
    if (!candidates.length) return null;
    const hits = (await load()).customers.filter((c) => {
      const stored = normPhoneDigits(c.waId);
      return !!stored && candidates.includes(stored);
    });
    return hits.length === 1 ? hits[0] : null;
  }

  async getCustomerById(id: string) {
    return (await load()).customers.find((c) => c.id === id) ?? null;
  }

  async getMessageById(id: string) {
    return (await load()).messages.find((m) => m.id === id) ?? null;
  }

  async staleOutbound(olderThanMs: number, limit = 500) {
    const cutoff = Date.now() - olderThanMs;
    return (await load()).messages
      .filter((m) => m.direction === 'OUT'
        && (m.status === 'QUEUED' || m.status === 'SENDING')
        && new Date(m.createdAt).getTime() < cutoff)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .slice(0, limit);
  }

  async createCustomer(c: Partial<CustomerRow> & { waId: string }): Promise<CustomerRow> {
    const db = await load();
    const row: CustomerRow = {
      id: randomUUID(), waId: c.waId, name: c.name ?? null, flag: c.flag ?? '💬',
      state: c.state ?? 'NEW_LEAD', income: c.income ?? 'UNKNOWN',
      paid: false, formComplete: false, missingDocs: [], aiPaused: false,
      isLegacy: false, botOwned: true, optedOut: false, estimatedRefundCents: null,
      lastCustomerMsgAt: null, previousState: null, stateChangedAt: now(), lastMessagePreview: null,
      lastMessageDirection: null, unread: false, unreadCount: 0, lastMessageAt: now(), lang: null, createdAt: now(),
    };
    db.customers.push(row);
    await persist();
    return row;
  }

  async updateCustomer(id: string, patch: Partial<CustomerRow>) {
    const db = await load();
    const c = db.customers.find((x) => x.id === id);
    if (c) Object.assign(c, patch);
    await persist();
  }

  async setState(id: string, to: CustomerState, causedBy: string): Promise<boolean> {
    const db = await load();
    const c = db.customers.find((x) => x.id === id);
    // Returns whether this call performed the transition (mirrors SupabaseStore).
    // The dev file store is single-process, so there is no race to lose; a
    // no-op (missing customer or already in the target state) returns false.
    if (!c || c.state === to) return false;
    db.history.push({ customerId: id, from: c.state, to, causedBy, createdAt: now() });
    if (['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(to)) c.previousState = c.state;
    c.state = to;
    c.stateChangedAt = now();
    if (to === 'PAID') c.paid = true;
    await persist();
    return true;
  }

  async history(customerId: string) {
    return (await load()).history.filter((h) => h.customerId === customerId);
  }

  async allHistory() {
    return (await load()).history;
  }

  async addMessage(m: Omit<MessageRow, 'id' | 'createdAt'>): Promise<MessageRow> {
    const db = await load();
    const row: MessageRow = { ...m, id: randomUUID(), createdAt: now() };
    db.messages.push(row);
    const c = db.customers.find((x) => x.id === m.customerId);
    if (c) {
      // TRUTH RULE (mirrors SupabaseStore): only a message that actually
      // reached the customer, or one they sent, may become the chat-list row
      // preview. A draft awaiting approval, a parked autopilot reply, a
      // guard-blocked or discarded one was never received, so it must not make
      // the list read as though the customer got something.
      if (m.status === 'SENT') {
        c.lastMessagePreview = m.body.slice(0, 80);
        c.lastMessageDirection = m.direction;
        c.lastMessageAt = row.createdAt;
      }
      if (m.direction === 'IN') { c.lastCustomerMsgAt = row.createdAt; c.unread = true; c.unreadCount = (c.unreadCount ?? 0) + 1; }
    }
    await persist();
    return row;
  }

  async markCustomerRead(id: string) {
    const db = await load();
    const c = db.customers.find((x) => x.id === id);
    if (c && (c.unread || (c.unreadCount ?? 0) > 0)) { c.unread = false; c.unreadCount = 0; await persist(); }
  }

  async isBlockedContact(waId: string): Promise<boolean> {
    const norm = normPhoneDigits(waId);
    if (!norm) return false;
    const db = await load();
    return (db.knownContacts ?? []).includes(norm);
  }

  async listMessages(customerId: string) {
    return (await load()).messages.filter((m) => m.customerId === customerId);
  }

  // Admin export only; the file store is small and in-memory, so no paging.
  async allCustomers() { return (await load()).customers; }
  async allMessages() { return (await load()).messages; }
  async allJobs() { return (await load()).jobs; }

  async listInboundBetween(startIso: string, endIso: string, limit = 5000) {
    const db = await load();
    const byId = new Map(db.customers.map((c) => [c.id, c]));
    return db.messages
      .filter((m) => m.direction === 'IN' && m.createdAt >= startIso && m.createdAt < endIso)
      .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
      .slice(0, limit)
      .map((m) => ({
        ...m,
        customerName: byId.get(m.customerId)?.name ?? null,
        waId: byId.get(m.customerId)?.waId,
      }));
  }

  async listMessagesBetween(startIso: string, endIso: string, limit = 10000) {
    const db = await load();
    const byId = new Map(db.customers.map((c) => [c.id, c]));
    return db.messages
      .filter((m) => m.createdAt >= startIso && m.createdAt < endIso)
      .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
      .slice(0, limit)
      .map((m) => ({
        ...m,
        customerName: byId.get(m.customerId)?.name ?? null,
        waId: byId.get(m.customerId)?.waId,
      }));
  }

  async claimMessageForSend(id: string): Promise<boolean> {
    const db = await load();
    const m = db.messages.find((x) => x.id === id);
    if (!m || m.status !== 'PENDING_APPROVAL') return false;
    m.status = 'QUEUED';
    await persist();
    return true;
  }

  async claimQueuedForSend(id: string): Promise<boolean> {
    const db = await load();
    const m = db.messages.find((x) => x.id === id);
    if (!m || m.status !== 'QUEUED') return false;
    m.status = 'SENDING';
    await persist();
    return true;
  }

  async setMessageStatus(id: string, status: MessageRow['status'], opts?: { restamp?: boolean }) {
    const db = await load();
    const m = db.messages.find((x) => x.id === id);
    if (m) {
      m.status = status;
      if (opts?.restamp) m.createdAt = now();
      refreshLastMessage(db, m.customerId);
    }
    await persist();
  }

  async attachProviderId(id: string, providerId: string) {
    const db = await load();
    const m = db.messages.find((x) => x.id === id);
    if (m) { m.meta = { ...(m.meta ?? {}), providerId }; await persist(); }
  }

  async discardByProviderId(providerId: string) {
    const db = await load();
    const m = db.messages.find((x) => x.meta?.providerId === providerId);
    if (m) { m.status = 'DISCARDED'; refreshLastMessage(db, m.customerId); await persist(); return true; }
    return false;
  }

  async applyEditByProviderId(providerId: string, body: string | null) {
    const db = await load();
    const m = db.messages.find((x) => x.meta?.providerId === providerId);
    if (!m) return false;
    m.meta = { ...(m.meta ?? {}), edited: true };
    // Only replace the text when Meta actually sent the new wording; otherwise
    // the message is marked edited and keeps what the customer really said.
    if (body && body.trim()) { m.body = body; refreshLastMessage(db, m.customerId); }
    await persist();
    return true;
  }

  async pendingApprovals() {
    const db = await load();
    return db.messages
      .filter((m) => m.status === 'PENDING_APPROVAL')
      .map((m) => ({ ...m, customerName: db.customers.find((c) => c.id === m.customerId)?.name ?? null }));
  }

  async addTask(t: Omit<TaskRow, 'id' | 'createdAt' | 'status'>): Promise<TaskRow> {
    const db = await load();
    const row: TaskRow = { ...t, id: randomUUID(), status: 'OPEN', createdAt: now() };
    db.tasks.push(row);
    await persist();
    return row;
  }

  async listTasks() { return (await load()).tasks; }

  async resolveTask(id: string) {
    const db = await load();
    const t = db.tasks.find((x) => x.id === id);
    if (t) t.status = 'RESOLVED';
    await persist();
  }

  async findOpenTaskForCustomer(customerId: string): Promise<TaskRow | null> {
    const db = await load();
    return db.tasks.find((x) => x.customerId === customerId && x.status === 'OPEN') ?? null;
  }

  async updateTask(id: string, patch: Partial<Pick<TaskRow, 'reason' | 'context' | 'suggestedReply' | 'severity'>>): Promise<void> {
    const db = await load();
    const t = db.tasks.find((x) => x.id === id);
    if (t) Object.assign(t, patch);
    await persist();
  }

  async listTemplates() { return (await load()).templates; }

  async addTemplate(t: { category: string; title: string; body: string; key?: string }): Promise<TemplateRow> {
    const db = await load();
    const row: TemplateRow = {
      id: randomUUID(),
      key: t.key || 'custom_' + randomUUID().slice(0, 8),
      category: t.category || 'Custom',
      title: t.title || 'Untitled message',
      body: t.body,
      requiresMeta: false,
      versions: 1,
      updatedAt: now(),
    };
    db.templates.push(row);
    await persist();
    return row;
  }

  async deleteTemplate(id: string) {
    const db = await load();
    db.templates = db.templates.filter((t) => t.id !== id);
    await persist();
  }

  async updateTemplate(id: string, body: string) {
    const db = await load();
    const t = db.templates.find((x) => x.id === id);
    if (t) { t.body = body; t.versions += 1; t.updatedAt = now(); }
    await persist();
  }

  async deleteCustomerByWaId(waId: string) {
    const db = await load();
    const c = db.customers.find((x) => x.waId === waId);
    if (!c) return;
    db.customers = db.customers.filter((x) => x.id !== c.id);
    db.messages = db.messages.filter((x) => x.customerId !== c.id);
    db.tasks = db.tasks.filter((x) => x.customerId !== c.id);
    db.history = db.history.filter((x) => x.customerId !== c.id);
    db.jobs = db.jobs.filter((x) => x.customerId !== c.id); // L4: no orphaned jobs
    await persist();
  }

  async getSetting(key: string) {
    return (await load()).settings[key];
  }

  async setSetting(key: string, value: unknown) {
    const db = await load();
    db.settings[key] = value;
    await persist();
  }

  async listCounters(prefix: string): Promise<{ key: string; value: number }[]> {
    const db = await load();
    return Object.entries(db.settings)
      .filter(([k]) => k.startsWith(prefix))
      .map(([key, value]) => ({ key, value: Number(value) }))
      .filter((r) => Number.isFinite(r.value));
  }

  async addJob(j: Omit<JobRow, 'id' | 'createdAt' | 'status'>): Promise<JobRow> {
    const db = await load();
    const row: JobRow = { ...j, id: randomUUID(), status: 'SCHEDULED', createdAt: now() };
    db.jobs.push(row);
    await persist();
    return row;
  }

  /** Oldest-due first and capped, matching the Supabase store so the tick loop
   *  behaves identically on both. */
  async dueJobs(nowDate: Date) {
    const db = await load();
    return db.jobs
      .filter((j) => j.status === 'SCHEDULED' && new Date(j.runAt) <= nowDate)
      .sort((a, b) => a.runAt.localeCompare(b.runAt))
      .slice(0, DUE_JOBS_BATCH);
  }

  async listJobs() { return (await load()).jobs; }

  async listJobsForCustomer(customerId: string, kinds?: JobRow['kind'][]) {
    return (await load()).jobs.filter(
      (j) => j.customerId === customerId && (!kinds || kinds.includes(j.kind)),
    );
  }

  async customerIdsWithScheduledFollowup(): Promise<string[]> {
    const out = new Set<string>();
    for (const j of (await load()).jobs) {
      if (j.kind === 'FOLLOW_UP' && j.status === 'SCHEDULED' && j.customerId) out.add(j.customerId);
    }
    return [...out];
  }

  async listUpcomingJobs(limit: number) {
    return (await load()).jobs
      .filter((j) => j.status === 'SCHEDULED' && j.kind !== 'NIGHTLY')
      .sort((a, b) => a.runAt.localeCompare(b.runAt))
      .slice(0, limit);
  }

  async hasScheduledNightly() {
    return (await load()).jobs.some((j) => j.kind === 'NIGHTLY' && j.status === 'SCHEDULED');
  }

  async hasScheduledJobOfKind(kind: JobRow['kind']) {
    return (await load()).jobs.some((j) => j.kind === kind && j.status === 'SCHEDULED');
  }

  async getJob(id: string) {
    return (await load()).jobs.find((j) => j.id === id) ?? null;
  }

  async setJobStatus(id: string, status: JobRow['status']) {
    const db = await load();
    const j = db.jobs.find((x) => x.id === id);
    if (j) j.status = status;
    await persist();
  }

  // Atomic within this single-process store: the check and the mutation happen
  // together with no await in between, so two callers cannot both win.
  async claimJob(id: string) {
    const db = await load();
    const j = db.jobs.find((x) => x.id === id);
    if (!j || j.status !== 'SCHEDULED') return false;
    j.status = 'CLAIMED';
    j.claimedAt = now();
    j.attempts = (j.attempts ?? 0) + 1;
    await persist();
    return true;
  }

  async reclaimStaleJobs(olderThanMs: number) {
    const db = await load();
    const cutoff = Date.now() - olderThanMs;
    let n = 0;
    for (const j of db.jobs) {
      if (j.status === 'CLAIMED' && (!j.claimedAt || new Date(j.claimedAt).getTime() < cutoff)) {
        // Give up permanently after 3 attempts; otherwise return to the queue.
        j.status = (j.attempts ?? 0) >= 3 ? 'FAILED' : 'SCHEDULED';
        n++;
      }
    }
    if (n) await persist();
    return n;
  }

  async cancelJobsFor(customerId: string, kinds?: JobRow['kind'][]) {
    const db = await load();
    let n = 0;
    for (const j of db.jobs) {
      if (j.customerId === customerId && j.status === 'SCHEDULED' && (!kinds || kinds.includes(j.kind))) {
        j.status = 'CANCELLED'; n++;
      }
    }
    await persist();
    return n;
  }

  async listKnowledge(status?: KnowledgeRow['status']) {
    const db = await load();
    return status ? db.knowledge.filter((k) => k.status === status) : db.knowledge;
  }
  async addKnowledge(k: Omit<KnowledgeRow, 'id' | 'createdAt' | 'updatedAt'>): Promise<KnowledgeRow> {
    const db = await load();
    const row: KnowledgeRow = { ...k, id: randomUUID(), createdAt: now(), updatedAt: now() };
    db.knowledge.push(row);
    await persist();
    return row;
  }
  async updateKnowledge(id: string, patch: Partial<KnowledgeRow>) {
    const db = await load();
    const k = db.knowledge.find((x) => x.id === id);
    if (k) { Object.assign(k, patch); k.updatedAt = now(); }
    await persist();
  }
  async setKnowledgeStatus(id: string, status: KnowledgeRow['status']) {
    const db = await load();
    const k = db.knowledge.find((x) => x.id === id);
    if (k) { k.status = status; k.updatedAt = now(); }
    await persist();
  }
  async deleteKnowledge(id: string) {
    const db = await load();
    db.knowledge = db.knowledge.filter((k) => k.id !== id);
    await persist();
  }

  // ── Lost-lead post-mortems (migration 031) ──
  async listLostAnalyses(): Promise<LostAnalysisRow[]> {
    const db = await load();
    return [...(db.lostAnalyses ?? [])].sort((a, b) => (a.analysedAt < b.analysedAt ? 1 : -1));
  }
  /** Keyed by customerId: re-running the nightly job replaces the row rather
   *  than adding a second post-mortem for the same lead. */
  async upsertLostAnalysis(row: LostAnalysisRow): Promise<void> {
    const db = await load();
    db.lostAnalyses ??= [];
    const i = db.lostAnalyses.findIndex((r) => r.customerId === row.customerId);
    if (i >= 0) db.lostAnalyses[i] = row; else db.lostAnalyses.push(row);
    await persist();
  }

  async audit(actor: string, action: string, detail?: unknown) {
    const db = await load();
    db.audit.push({ id: randomUUID(), actor, action, detail: detail ?? null, at: now() });
    await persist();
  }

  async claimInbound(metaId: string): Promise<boolean> {
    const db = await load();
    db.processed ??= [];
    if (db.processed.some((p) => p.id === metaId)) return false;
    db.processed.push({ id: metaId, at: now() });
    await persist();
    return true;
  }

  async releaseInbound(metaId: string): Promise<void> {
    const db = await load();
    db.processed = (db.processed ?? []).filter((p) => p.id !== metaId);
    await persist();
  }

  async purgeProcessedMessages(olderThanMs: number): Promise<number> {
    const db = await load();
    const cutoff = Date.now() - olderThanMs;
    const before = (db.processed ?? []).length;
    db.processed = (db.processed ?? []).filter((p) => new Date(p.at).getTime() >= cutoff);
    const removed = before - db.processed.length;
    if (removed > 0) await persist();
    return removed;
  }

  async listAudit(limit = 200): Promise<AuditRow[]> {
    const db = await load();
    return db.audit
      .slice(-limit)
      .reverse()
      .map((a) => ({ id: (a as { id?: string }).id ?? '', actor: a.actor, action: a.action, detail: a.detail, at: a.at }));
  }
}
