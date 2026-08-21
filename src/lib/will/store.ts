// ============================================================
// Data layer. One interface, two implementations:
//  - FileStore: JSON on disk, zero credentials, for dev/simulator
//  - SupabaseStore: the real thing, selected automatically when
//    SUPABASE env vars exist. Same behavior either way.
// ============================================================
import { CustomerState } from './state-machine';
export type { CustomerState };

export interface CustomerRow {
  id: string;
  waId: string;
  name: string | null;
  flag: string;
  state: CustomerState;
  income: 'UNKNOWN' | 'TFN' | 'TFN_ABN';
  paid: boolean;
  formComplete: boolean;
  missingDocs: string[];
  aiPaused: boolean;
  isLegacy: boolean;
  botOwned: boolean;   // true only for brand-new leads the bot originated
  optedOut: boolean;
  estimatedRefundCents: number | null;
  lastCustomerMsgAt: string | null;
  previousState: CustomerState | null;
  stateChangedAt: string;
  lastMessagePreview: string | null;
  lastMessageDirection: 'IN' | 'OUT' | null;
  unread: boolean;
  unreadCount: number;   // number of unread inbound messages (WhatsApp-style badge); reset to 0 when the chat is opened
  lastMessageAt: string | null; // time of the most recent message either direction; drives WhatsApp-style most-recent-first ordering
  lang: string | null;   // detected customer language (e.g. 'de','ja'); null until known
  createdAt: string;
}

export interface MessageRow {
  id: string;
  customerId: string;
  direction: 'IN' | 'OUT';
  author: 'CUSTOMER' | 'AI' | 'HUMAN' | 'SYSTEM';
  status: 'SENT' | 'PENDING_APPROVAL' | 'BLOCKED' | 'DISCARDED' | 'FAILED' | 'QUEUED';
  body: string;
  meta?: { proposedState?: CustomerState; income?: 'TFN' | 'TFN_ABN'; templateId?: string; variant?: 'A' | 'B'; credited?: boolean; providerId?: string; channel?: string; sendError?: string };
  createdAt: string;
}

export interface TaskRow {
  id: string;
  customerId: string | null;
  customerName: string | null;
  reason: string;
  severity: string;
  context: string | null;
  suggestedReply: string | null;
  status: 'OPEN' | 'RESOLVED';
  createdAt: string;
}

export interface TemplateRow {
  id: string;
  key: string;
  category: string;
  title: string;
  body: string;
  requiresMeta: boolean;
  versions: number;
  updatedAt: string;
  variantB?: string | null;
  sentA?: number; sentB?: number;
  convA?: number; convB?: number;
}

export interface SuggestionRow {
  id: string;
  kind: 'NEW_TEMPLATE' | 'REWORD';
  title: string;
  detail: string;
  proposedBody: string;
  targetTemplateId?: string;
  occurrences: number;
  status: 'PENDING' | 'APPROVED' | 'DISMISSED';
  createdAt: string;
}

export interface JobRow {
  id: string;
  customerId: string | null;
  kind: 'FOLLOW_UP' | 'AUTO_CLOSE' | 'NIGHTLY' | 'FORM_RECEIVED';
  payload: { templateKey?: string; seq?: number; flow?: 'prePayment' | 'form' | 'signature'; taskId?: string };
  runAt: string;
  status: 'SCHEDULED' | 'CLAIMED' | 'DONE' | 'CANCELLED' | 'FAILED';
  claimedAt?: string;   // lease timestamp for CLAIMED jobs (H6: reclaim if stale)
  attempts?: number;    // retry counter
  createdAt: string;
}

export interface KnowledgeRow {
  id: string;
  intent: string;              // short label
  question: string;            // canonical customer question
  examples: string[];          // real phrasings customers used
  answer: string;              // polished, approved-style answer
  keywords: string[];          // for lexical retrieval
  tags: string[];
  lang: string;
  weight: number;              // recurrence / conversion weight
  status: 'draft' | 'active' | 'archived';
  source: 'mined' | 'manual';
  createdAt: string;
  updatedAt: string;
}

export interface StateHistoryRow {
  customerId: string;
  from: CustomerState | null;
  to: CustomerState;
  causedBy: string;
  createdAt: string;
}

export interface AuditRow {
  id: string;
  actor: string;   // system | assistant | policy_guard | scheduler | owner | nightly
  action: string;  // decision | reply_blocked | human_task_created | manual_reply | ...
  detail: unknown; // structured context
  at: string;      // ISO timestamp
}

export interface Store {
  listCustomers(): Promise<CustomerRow[]>;
  getCustomerByWaId(waId: string): Promise<CustomerRow | null>;
  /** PERF-01/02: PK lookup instead of scanning listCustomers(). */
  getCustomerById(id: string): Promise<CustomerRow | null>;
  createCustomer(c: Partial<CustomerRow> & { waId: string }): Promise<CustomerRow>;
  updateCustomer(id: string, patch: Partial<CustomerRow>): Promise<void>;
  setState(id: string, to: CustomerState, causedBy: string): Promise<void>;
  history(customerId: string): Promise<StateHistoryRow[]>;
  /** PERF-03: all state history in one query (for the aggregate report) instead
   *  of one history() call per customer. */
  allHistory(): Promise<StateHistoryRow[]>;

  addMessage(m: Omit<MessageRow, 'id' | 'createdAt'>): Promise<MessageRow>;
  listMessages(customerId: string): Promise<MessageRow[]>;
  /** PERF-01: PK lookup of a single message (includes its customerId). */
  getMessageById(id: string): Promise<MessageRow | null>;
  setMessageStatus(id: string, status: MessageRow['status']): Promise<void>;
  /** Clear the unread badge for a customer (chat opened / read). */
  markCustomerRead(id: string): Promise<void>;
  /** Fresh-start filter: true if this WhatsApp number is a KNOWN pre-existing
   *  contact (an old/returning customer we deliberately keep out of Will).
   *  Genuinely new numbers return false and are allowed in. */
  isBlockedContact(waId: string): Promise<boolean>;
  /** RACE-02: atomically move a PENDING_APPROVAL draft to QUEUED. Returns true if
   *  THIS caller won the claim (so only one concurrent approval actually sends). */
  claimMessageForSend(id: string): Promise<boolean>;
  pendingApprovals(): Promise<(MessageRow & { customerName: string | null })[]>;

  addTask(t: Omit<TaskRow, 'id' | 'createdAt' | 'status'>): Promise<TaskRow>;
  listTasks(): Promise<TaskRow[]>;
  resolveTask(id: string): Promise<void>;

  listTemplates(): Promise<TemplateRow[]>;
  addTemplate(t: { category: string; title: string; body: string }): Promise<TemplateRow>;
  updateTemplate(id: string, body: string): Promise<void>;
  deleteTemplate(id: string): Promise<void>;

  audit(actor: string, action: string, detail?: unknown): Promise<void>;
  /** Most recent audit rows, newest first (decision log for review). */
  listAudit(limit?: number): Promise<AuditRow[]>;

  // Atomic inbound idempotency (RACE-01/REL-02/WILL-WH-01).
  /** Atomically claim a Meta message id. Returns true if THIS caller won the
   *  claim (first time seen), false if it was already claimed. */
  claimInbound(metaId: string): Promise<boolean>;
  /** Release a claim so a failed message can be reprocessed on Meta's retry. */
  releaseInbound(metaId: string): Promise<void>;
  /** Purge processed-message markers older than the cutoff (COST-02). Returns count. */
  purgeProcessedMessages(olderThanMs: number): Promise<number>;

  deleteCustomerByWaId(waId: string): Promise<void>;

  listSuggestions(): Promise<SuggestionRow[]>;
  upsertSuggestion(s: Omit<SuggestionRow, 'id' | 'createdAt' | 'status'> & { dedupeKey: string }): Promise<void>;
  setSuggestionStatus(id: string, status: SuggestionRow['status']): Promise<void>;
  bumpVariant(templateId: string, variant: 'A' | 'B', field: 'sent' | 'conv'): Promise<void>;
  setVariantB(templateId: string, body: string | null): Promise<void>;

  getSetting(key: string): Promise<unknown>;
  setSetting(key: string, value: unknown): Promise<void>;

  // Knowledge base (the brain's learned Q&A; RAG retrieval reads 'active' rows).
  listKnowledge(status?: KnowledgeRow['status']): Promise<KnowledgeRow[]>;
  addKnowledge(k: Omit<KnowledgeRow, 'id' | 'createdAt' | 'updatedAt'>): Promise<KnowledgeRow>;
  updateKnowledge(id: string, patch: Partial<Pick<KnowledgeRow, 'answer' | 'intent' | 'question' | 'keywords' | 'tags' | 'weight' | 'lang'>>): Promise<void>;
  setKnowledgeStatus(id: string, status: KnowledgeRow['status']): Promise<void>;
  deleteKnowledge(id: string): Promise<void>;

  addJob(j: Omit<JobRow, 'id' | 'createdAt' | 'status'>): Promise<JobRow>;
  dueJobs(now: Date): Promise<JobRow[]>;
  listJobs(): Promise<JobRow[]>;
  /** PERF-02: jobs for one customer (optionally filtered by kind), pushed to the DB. */
  listJobsForCustomer(customerId: string, kinds?: JobRow['kind'][]): Promise<JobRow[]>;
  /** PERF-04: the N soonest SCHEDULED non-nightly jobs, pushed to the DB (LIMIT). */
  listUpcomingJobs(limit: number): Promise<JobRow[]>;
  /** PERF-04: cheap existence check for a queued nightly job. */
  hasScheduledNightly(): Promise<boolean>;
  getJob(id: string): Promise<JobRow | null>;
  setJobStatus(id: string, status: JobRow['status']): Promise<void>;
  /** Atomically move a SCHEDULED job to CLAIMED. Returns true if this caller won it. */
  claimJob(id: string): Promise<boolean>;
  /** Reclaim CLAIMED jobs whose lease is older than `olderThanMs` back to SCHEDULED. */
  reclaimStaleJobs(olderThanMs: number): Promise<number>;
  cancelJobsFor(customerId: string, kinds?: JobRow['kind'][]): Promise<number>;

  /** Optional: verify that the columns and tables the code writes to actually
   *  exist. Implemented by the Supabase store; the file store has no schema to
   *  drift. A deploy missing its migrations used to fail completely silently,
   *  so /api/will/health now asks this question rather than assuming. */
  schemaHealth?(): Promise<{ ok: boolean; missing: string[] }>;
}

import { FileStore, lastPersistError as fileErr } from './store-file';
import { SupabaseStore, lastPersistError as sbErr } from './store-supabase';

/** Surface whichever active store last failed to persist (M9), for /api/health. */
export function getLastPersistError(): string | null { return sbErr ?? fileErr; }

// Production uses the CRM's Supabase (data lives on your server, like the rest
// of the CRM). With no Supabase env configured we fall back to the local
// JSON-file store for dev/simulator. Selecting a store is the only switch.
let _store: Store | null = null;
export function getStore(): Store {
  if (_store) return _store;
  const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  _store = hasSupabase ? new SupabaseStore() : new FileStore();
  return _store;
}
