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
  /** SENDING is the in-flight state between the atomic claim and the result of
   *  the WhatsApp call. It exists so that a crash mid-send leaves a visible,
   *  recoverable row instead of a QUEUED one that a replay would transmit a
   *  second time. A stranded SENDING is a bug you can see; a duplicate message
   *  to a customer is one you cannot take back. */
  status: 'SENT' | 'PENDING_APPROVAL' | 'BLOCKED' | 'DISCARDED' | 'FAILED' | 'QUEUED' | 'SENDING';
  body: string;
  meta?: {
    proposedState?: CustomerState; income?: 'TFN' | 'TFN_ABN'; templateId?: string;
    variant?: 'A' | 'B'; credited?: boolean; providerId?: string; channel?: string; sendError?: string;
    /** The customer edited this message after sending it. WhatsApp shows an
     *  "Edited" mark on the bubble and so does the chat here. Meta does not
     *  always hand over the new wording, so this can be true while `body` is
     *  still the original text — which is why it is a flag and not an
     *  assumption that the body changed. */
    edited?: boolean;
    /** Present on a draft the scheduler queued: it must go out as this
     *  Meta-approved template, because it is reaching someone who has been
     *  quiet for a day or more and free text is rejected outside the 24h
     *  window. Absent on ordinary conversation replies, which go as text. */
    waTemplate?: { name: string; params: string[]; lang?: string | null };
    /** An attachment the customer sent. Meta keeps the file for 30 days behind
     *  an authenticated endpoint, so only the id is stored; the dashboard asks
     *  /api/will/media/[id] for the bytes when it renders the thread. `meta` is
     *  a jsonb column, so this needs no migration. */
    media?: { id: string; kind: string; mime?: string; filename?: string; caption?: string };
    /** A heart or thumbs up the customer put on one of our messages. Shown as a
     *  small note in the thread rather than a message bubble. */
    reaction?: { emoji: string | null; to?: string };
  };
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
}

export interface JobRow {
  id: string;
  customerId: string | null;
  kind: 'FOLLOW_UP' | 'AUTO_CLOSE' | 'NIGHTLY' | 'FORM_RECEIVED' | 'AUTO_REPLY' | 'DAILY_DIGEST' | 'LOST_ANALYSIS' | 'HANDOFF_ACK';
  payload: {
    templateKey?: string; seq?: number; flow?: 'prePayment' | 'form' | 'signature'; taskId?: string;
    /** AUTO_REPLY only: the QUEUED message this job will transmit. */
    messageId?: string;
  };
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

/** One stored post-mortem for a lead that never paid (migration 031).
 *  Written ONLY by the nightly LOST_ANALYSIS job; read by /api/will/lost and
 *  the dashboard's Lost Leads view. It never reaches a customer — there is no
 *  draft, message or template field here on purpose. */
export interface LostAnalysisRow {
  customerId: string;
  /** Snapshot of the lead as it was when analysed, so the report still reads
   *  correctly if the customer later reactivates. */
  state: CustomerState;
  triggerKind: string;           // 'declined' | 'opted_out' | 'auto_closed' | 'silent'
  quietDays: number;
  hoursPriceToSilence: number | null;
  status: 'OK' | 'ERROR';
  error: string | null;
  attempts: number;
  reason: string;
  category: string;
  shouldHaveDone: string;
  fault: string;                 // OURS | PARTLY_OURS | NOT_OURS
  recoverable: string;           // YES | MAYBE | NO
  recoveryAction: string | null;
  /** The ready-to-send win-back message. Null when recoverable is NO. */
  recoveryMessage: string | null;
  evidenceQuote: string | null;
  confidence: number;
  analysedAt: string;
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
  /** How many customers exist, without fetching any of them. Used as the
   *  store's reachability probe: the health check used to call listCustomers()
   *  for this, which pulled the whole table every 45 seconds per open tab. */
  countCustomers(): Promise<number>;
  /** Search every customer (not just a loaded window) by WhatsApp number, name,
   *  or last-message preview. Powers the dashboard search box so a number finds
   *  its customer however old the conversation is. Bounded by `limit`. */
  searchCustomers(q: string, limit?: number): Promise<CustomerRow[]>;
  /** Accurate COUNT of customers in a set of states (head-only), for pipeline
   *  totals that stay true past the 1,000-row window. */
  countInStates(states: CustomerState[]): Promise<number>;
  /** One page of the chat list, newest conversation first, for infinite scroll
   *  through every conversation. `opts.states` narrows to a pipeline group;
   *  `opts.unreadOnly` to unread chats. */
  listChatPage(offset: number, limit: number, opts?: { states?: CustomerState[]; unreadOnly?: boolean }): Promise<CustomerRow[]>;
  getCustomerByWaId(waId: string): Promise<CustomerRow | null>;
  /**
   * The same customer, found by a phone number written any way at all.
   *
   * The CRM stores whatever the customer typed into the form ("0412 345 678",
   * "+61 412 345 678", "61412345678"); Will stores what WhatsApp gave us. The
   * two only ever agree once both are reduced to digits, which is what the
   * `wa_norm` column and crm_norm_phone() already do for the form trigger.
   * This is that same join, reachable from application code, so a CRM task can
   * find the WhatsApp conversation it belongs to. Null when nothing matches,
   * which is normal and never an error.
   */
  findCustomerByPhone(phone: string): Promise<CustomerRow | null>;
  /** PERF-01/02: PK lookup instead of scanning listCustomers(). */
  getCustomerById(id: string): Promise<CustomerRow | null>;
  createCustomer(c: Partial<CustomerRow> & { waId: string }): Promise<CustomerRow>;
  updateCustomer(id: string, patch: Partial<CustomerRow>): Promise<void>;
  /** Returns whether this call performed the transition. false = no-op (already
   *  in the target state, or customer gone) or a lost race against a concurrent
   *  transition on another instance. Callers on the payment path use it to avoid
   *  a duplicate confirmation. */
  setState(id: string, to: CustomerState, causedBy: string): Promise<boolean>;
  history(customerId: string): Promise<StateHistoryRow[]>;
  /** PERF-03: all state history in one query (for the aggregate report) instead
   *  of one history() call per customer. */
  allHistory(): Promise<StateHistoryRow[]>;

  addMessage(m: Omit<MessageRow, 'id' | 'createdAt'>): Promise<MessageRow>;
  listMessages(customerId: string): Promise<MessageRow[]>;
  /** SCALE: every customer and every message, fetched in pages, for the admin
   *  export ONLY. `listCustomers()` silently truncates at PostgREST's 1,000-row
   *  cap and the export used to fire one listMessages() per customer in
   *  parallel (N concurrent queries). At 5,000 customers that overruns the
   *  connection pool; these page through in bounded batches instead. Do not use
   *  on a request-serving path. */
  allCustomers(): Promise<CustomerRow[]>;
  allMessages(): Promise<MessageRow[]>;
  /** Every job, paged past PostgREST's 1,000-row cap. For the one place a
   *  partial read would be WRONG rather than just incomplete: orphan-job cleanup
   *  cancels jobs whose customer is missing, so it must see every job or it would
   *  cancel live follow-ups for customers it simply did not read. */
  allJobs(): Promise<JobRow[]>;
  /** PERF-01: PK lookup of a single message (includes its customerId). */
  getMessageById(id: string): Promise<MessageRow | null>;
  /** Outbound messages stranded mid-send (QUEUED/SENDING) past the given age,
   *  for the nightly sweep that recovers a reply a crashed invocation never
   *  finished sending. `olderThanMs` is well beyond any real send. */
  staleOutbound(olderThanMs: number, limit?: number): Promise<MessageRow[]>;
  /** `restamp` sets the message's created_at to now — used when an approved
   *  draft is actually sent, so its shown time is the SEND time, not the (older)
   *  time it was drafted, and it sorts to the bottom of the thread. */
  setMessageStatus(id: string, status: MessageRow['status'], opts?: { restamp?: boolean }): Promise<void>;
  /** Record the WhatsApp message id Meta assigned once a send succeeds. This
   *  is what lets a reaction (which only carries Meta's id) be matched back
   *  to the specific message it landed on, instead of showing as a floating
   *  unattached line. */
  attachProviderId(id: string, providerId: string): Promise<void>;
  /** Hide the message whose Meta id (meta.providerId) matches — used when the
   *  staff member deletes ("revokes") a message from the WhatsApp Business app,
   *  so it disappears from Will too. Returns true if a message was found. */
  discardByProviderId(providerId: string): Promise<boolean>;
  /**
   * The customer edited a message they had already sent.
   *
   * Matched on Meta's id of the ORIGINAL message. `body` is the new text when
   * Meta gave us one and null when it did not — in which case the message is
   * only marked as edited, and the stored text stays as it was rather than
   * being replaced with a guess. Returns true if a message was found.
   */
  applyEditByProviderId(providerId: string, body: string | null): Promise<boolean>;
  /** Inbound messages in [startIso, endIso), newest last, with the sender's name
   *  and number joined on. Bounded by `limit` so a busy window cannot pull an
   *  unbounded result set into a serverless function. */
  listInboundBetween(
    startIso: string,
    endIso: string,
    limit?: number,
  ): Promise<(MessageRow & { customerName?: string | null; waId?: string })[]>;
  /** Both directions in [startIso, endIso), oldest first, with the sender's
   *  name and number joined on. Used by the daily Library-suggestions digest
   *  to pair a customer's question with whatever reply followed it. */
  listMessagesBetween(
    startIso: string,
    endIso: string,
    limit?: number,
  ): Promise<(MessageRow & { customerName?: string | null; waId?: string })[]>;
  /** Clear the unread badge for a customer (chat opened / read). */
  markCustomerRead(id: string): Promise<void>;
  /** Fresh-start filter: true if this WhatsApp number is a KNOWN pre-existing
   *  contact (an old/returning customer we deliberately keep out of Will).
   *  Genuinely new numbers return false and are allowed in. */
  isBlockedContact(waId: string): Promise<boolean>;
  /** RACE-02: atomically move a PENDING_APPROVAL draft to QUEUED. Returns true if
   *  THIS caller won the claim (so only one concurrent approval actually sends). */
  claimMessageForSend(id: string): Promise<boolean>;
  /**
   * Atomically take a QUEUED message for transmission (QUEUED -> SENDING).
   *
   * The Autopilot path had no claim at all: it sent, then wrote SENT. An
   * invocation killed in between left the row QUEUED, the stale-job reclaim put
   * the job back, and the guard "is it still QUEUED?" passed, because the write
   * that would have changed it is exactly the one that did not happen. The same
   * reply went to the customer twice. Only the winner of this claim may send.
   */
  claimQueuedForSend(id: string): Promise<boolean>;
  pendingApprovals(): Promise<(MessageRow & { customerName: string | null })[]>;

  addTask(t: Omit<TaskRow, 'id' | 'createdAt' | 'status'>): Promise<TaskRow>;
  listTasks(): Promise<TaskRow[]>;
  resolveTask(id: string): Promise<void>;
  /** The single OPEN task for this customer, if one exists — used to fold a
   *  burst of messages/attachments into ONE task instead of one per message. */
  findOpenTaskForCustomer(customerId: string): Promise<TaskRow | null>;
  /** Patch an existing task in place (reason/context/suggestedReply/severity)
   *  rather than creating a new one — how a burst of messages consolidates. */
  updateTask(id: string, patch: Partial<Pick<TaskRow, 'reason' | 'context' | 'suggestedReply' | 'severity'>>): Promise<void>;

  listTemplates(): Promise<TemplateRow[]>;
  /** `key` is optional: the owner adding a message from the Library gets a
   *  generated `custom_…` key, while the seed backfill passes the stable key the
   *  send path looks the message up by (e.g. 'estimate_invoice'). */
  addTemplate(t: { category: string; title: string; body: string; key?: string }): Promise<TemplateRow>;
  updateTemplate(id: string, body: string): Promise<void>;
  deleteTemplate(id: string): Promise<void>;

  // ── Lost-lead post-mortems (migration 031) ──
  /** Every stored post-mortem, newest first. Read-only for the UI. */
  listLostAnalyses(): Promise<LostAnalysisRow[]>;
  /** Insert or replace the post-mortem for one customer. Keyed by customerId,
   *  so re-running the nightly job is idempotent rather than duplicating. */
  upsertLostAnalysis(row: LostAnalysisRow): Promise<void>;

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
  /** The set of customerIds that currently have a SCHEDULED FOLLOW_UP job, for
   *  the dashboard's "already being chased" indicator. Selects one column and,
   *  because migration 034 allows at most one pending follow-up per customer,
   *  the result is bounded by the number of active leads. */
  customerIdsWithScheduledFollowup(): Promise<string[]>;
  /** PERF-04: the N soonest SCHEDULED non-nightly jobs, pushed to the DB (LIMIT). */
  listUpcomingJobs(limit: number): Promise<JobRow[]>;
  /** PERF-04: cheap existence check for a queued nightly job. */
  hasScheduledNightly(): Promise<boolean>;
  /** Cheap existence check for a queued job of any kind — the generic form of
   *  `hasScheduledNightly`. Use this instead of scanning `listJobs()` to answer
   *  "is one of these already queued?": that scan silently truncates at
   *  PostgREST's 1000-row ceiling and starts answering "no" on a busy table,
   *  which schedules a duplicate. */
  hasScheduledJobOfKind(kind: JobRow['kind']): Promise<boolean>;
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

  /** Optional: delete decision-log rows older than the cutoff. The log records
   *  what the system did and why, which is worth days, not years. Customer
   *  conversations are never touched by this. */
  purgeAudit?(olderThanMs: number): Promise<number>;

  /** Optional: atomically claim one slot against a counted daily limit.
   *
   *  Returns true when the limit is ALREADY spent (caller must not proceed) and
   *  false when a slot was reserved. This exists because the previous
   *  read-then-write spend cap did not hold across serverless instances, and it
   *  guards a paid API call reachable by anyone who messages the business. */
  bumpCounter?(key: string, limit: number): Promise<boolean>;

  /** Optional: read back every counter bumpCounter has written whose key starts
   *  with `prefix` (e.g. 'ai_calls:'). One query, not one per day.
   *
   *  This is what makes the paid-model usage visible on the dashboard at all:
   *  the daily counters are the ONLY record this system keeps of how much Will
   *  has been asked to think. Anthropic's billing is not connected to it, so
   *  what comes back is a call count, never a measured dollar amount. */
  listCounters?(prefix: string): Promise<{ key: string; value: number }[]>;
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
  // FAIL CLOSED IN PRODUCTION.
  //
  // This chose the file store whenever the env vars were absent, silently. A
  // mistyped key name during a rotation, or a new environment, and Will keeps
  // running while writing real customer records AND the plaintext WhatsApp
  // access token to .data/store.json on an ephemeral filesystem: a disclosure
  // risk and silent data loss at the same time, with every health dot green.
  // The .gitignore already carries a note recognising this exact hazard; the
  // gitignore was fixed and the fail-open was not.
  if (!hasSupabase && process.env.NODE_ENV === 'production') {
    throw new Error('Refusing to start: Supabase is not configured, and the file store must never hold production data.');
  }
  _store = hasSupabase ? new SupabaseStore() : new FileStore();
  return _store;
}
