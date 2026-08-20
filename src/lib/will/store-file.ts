// JSON-file store: credential-free persistence for dev & the simulator.
// Lives in .data/store.json (gitignored). Not for production traffic.
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import {
  Store, CustomerRow, MessageRow, TaskRow, TemplateRow, StateHistoryRow, JobRow, SuggestionRow, KnowledgeRow, AuditRow,
} from './store';
import { CustomerState } from './state-machine';
import { seedCustomers, seedTemplates } from './seed';

interface Db {
  customers: CustomerRow[];
  messages: MessageRow[];
  tasks: TaskRow[];
  templates: TemplateRow[];
  history: StateHistoryRow[];
  jobs: JobRow[];
  suggestions: SuggestionRow[];
  knowledge: KnowledgeRow[];
  settings: Record<string, unknown>;
  audit: { id?: string; actor: string; action: string; detail: unknown; at: string }[];
  processed?: { id: string; at: string }[];
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
    cache.suggestions ??= [];
    cache.knowledge ??= [];
    cache.settings ??= {};
    cache.processed ??= [];
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
      suggestions: [],
      knowledge: [],
      settings: {},
      audit: [],
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

export class FileStore implements Store {
  async listCustomers() { return (await load()).customers; }

  async getCustomerByWaId(waId: string) {
    return (await load()).customers.find((c) => c.waId === waId) ?? null;
  }

  async getCustomerById(id: string) {
    return (await load()).customers.find((c) => c.id === id) ?? null;
  }

  async getMessageById(id: string) {
    return (await load()).messages.find((m) => m.id === id) ?? null;
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

  async setState(id: string, to: CustomerState, causedBy: string) {
    const db = await load();
    const c = db.customers.find((x) => x.id === id);
    if (!c || c.state === to) return;
    // A/B conversion credit: advancing forward (not closing) credits the last
    // variant message sent to this customer.
    const order = ['NEW_LEAD','QUALIFIED','PRICE_SENT','PAYMENT_PENDING','PAID','FORM_PENDING','FORM_COMPLETE','DOCUMENTS_COMPLETE','UNDER_REVIEW','ESTIMATE_READY','FINAL_REVIEW','SIGNATURE_PENDING','SIGNED','LODGED','COMPLETED'];
    if (order.indexOf(to) > order.indexOf(c.state) && order.indexOf(c.state) >= 0) {
      const lastVariantMsg = [...db.messages].reverse().find((m) => m.customerId === id && m.meta?.templateId && m.meta?.variant);
      if (lastVariantMsg?.meta?.templateId && lastVariantMsg.meta.variant) {
        const t = db.templates.find((x) => x.id === lastVariantMsg.meta!.templateId);
        if (t) {
          const key = ('conv' + lastVariantMsg.meta.variant) as 'convA' | 'convB';
          // only credit once per message
          if (!(lastVariantMsg.meta as { credited?: boolean }).credited) {
            t[key] = (t[key] ?? 0) + 1;
            (lastVariantMsg.meta as { credited?: boolean }).credited = true;
          }
        }
      }
    }
    db.history.push({ customerId: id, from: c.state, to, causedBy, createdAt: now() });
    if (['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(to)) c.previousState = c.state;
    c.state = to;
    c.stateChangedAt = now();
    if (to === 'PAID') c.paid = true;
    await persist();
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
      c.lastMessagePreview = m.body.slice(0, 80);
      c.lastMessageDirection = m.direction;
      c.lastMessageAt = row.createdAt;
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

  async claimMessageForSend(id: string): Promise<boolean> {
    const db = await load();
    const m = db.messages.find((x) => x.id === id);
    if (!m || m.status !== 'PENDING_APPROVAL') return false;
    m.status = 'QUEUED';
    await persist();
    return true;
  }

  async setMessageStatus(id: string, status: MessageRow['status']) {
    const db = await load();
    const m = db.messages.find((x) => x.id === id);
    if (m) m.status = status;
    await persist();
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

  async listTemplates() { return (await load()).templates; }

  async addTemplate(t: { category: string; title: string; body: string }): Promise<TemplateRow> {
    const db = await load();
    const row: TemplateRow = {
      id: randomUUID(),
      key: 'custom_' + randomUUID().slice(0, 8),
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

  async listSuggestions() { return (await load()).suggestions; }

  async upsertSuggestion(s: Omit<SuggestionRow, 'id' | 'createdAt' | 'status'> & { dedupeKey: string }) {
    const db = await load();
    const existing = db.suggestions.find((x) => x.detail === s.dedupeKey && x.status === 'PENDING');
    if (existing) { existing.occurrences = s.occurrences; existing.proposedBody = s.proposedBody; }
    else db.suggestions.push({
      id: randomUUID(), kind: s.kind, title: s.title, detail: s.detail,
      proposedBody: s.proposedBody, targetTemplateId: s.targetTemplateId,
      occurrences: s.occurrences, status: 'PENDING', createdAt: now(),
    });
    await persist();
  }

  async setSuggestionStatus(id: string, status: SuggestionRow['status']) {
    const db = await load();
    const s = db.suggestions.find((x) => x.id === id);
    if (s) s.status = status;
    await persist();
  }

  async bumpVariant(templateId: string, variant: 'A' | 'B', field: 'sent' | 'conv') {
    const db = await load();
    const t = db.templates.find((x) => x.id === templateId);
    if (!t) return;
    const key = (field + variant) as 'sentA' | 'sentB' | 'convA' | 'convB';
    t[key] = (t[key] ?? 0) + 1;
    await persist();
  }

  async setVariantB(templateId: string, body: string | null) {
    const db = await load();
    const t = db.templates.find((x) => x.id === templateId);
    if (t) { t.variantB = body; if (!body) { t.sentB = 0; t.convB = 0; } }
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

  async addJob(j: Omit<JobRow, 'id' | 'createdAt' | 'status'>): Promise<JobRow> {
    const db = await load();
    const row: JobRow = { ...j, id: randomUUID(), status: 'SCHEDULED', createdAt: now() };
    db.jobs.push(row);
    await persist();
    return row;
  }

  async dueJobs(nowDate: Date) {
    const db = await load();
    return db.jobs.filter((j) => j.status === 'SCHEDULED' && new Date(j.runAt) <= nowDate);
  }

  async listJobs() { return (await load()).jobs; }

  async listJobsForCustomer(customerId: string, kinds?: JobRow['kind'][]) {
    return (await load()).jobs.filter(
      (j) => j.customerId === customerId && (!kinds || kinds.includes(j.kind)),
    );
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
