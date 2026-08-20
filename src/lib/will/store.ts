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
  lang: string | null;   // detected customer language (e.g. 'de','ja'); null until known
  createdAt: string;
}

export interface MessageRow {
  id: string;
  customerId: string;
  direction: 'IN' | 'OUT';
  author: 'CUSTOMER' | 'AI' | 'HUMAN' | 'SYSTEM';
  status: 'SENT' | 'PENDING_APPROVAL' | 'BLOCKED' | 'DISCARDED';
  body: string;
  meta?: { proposedState?: CustomerState; income?: 'TFN' | 'TFN_ABN'; templateId?: string; variant?: 'A' | 'B'; credited?: boolean };
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

export interface StateHistoryRow {
  customerId: string;
  from: CustomerState | null;
  to: CustomerState;
  causedBy: string;
  createdAt: string;
}

export interface Store {
  listCustomers(): Promise<CustomerRow[]>;
  getCustomerByWaId(waId: string): Promise<CustomerRow | null>;
  createCustomer(c: Partial<CustomerRow> & { waId: string }): Promise<CustomerRow>;
  updateCustomer(id: string, patch: Partial<CustomerRow>): Promise<void>;
  setState(id: string, to: CustomerState, causedBy: string): Promise<void>;
  history(customerId: string): Promise<StateHistoryRow[]>;

  addMessage(m: Omit<MessageRow, 'id' | 'createdAt'>): Promise<MessageRow>;
  listMessages(customerId: string): Promise<MessageRow[]>;
  setMessageStatus(id: string, status: MessageRow['status']): Promise<void>;
  pendingApprovals(): Promise<(MessageRow & { customerName: string | null })[]>;

  addTask(t: Omit<TaskRow, 'id' | 'createdAt' | 'status'>): Promise<TaskRow>;
  listTasks(): Promise<TaskRow[]>;
  resolveTask(id: string): Promise<void>;

  listTemplates(): Promise<TemplateRow[]>;
  addTemplate(t: { category: string; title: string; body: string }): Promise<TemplateRow>;
  updateTemplate(id: string, body: string): Promise<void>;
  deleteTemplate(id: string): Promise<void>;

  audit(actor: string, action: string, detail?: unknown): Promise<void>;
  deleteCustomerByWaId(waId: string): Promise<void>;

  listSuggestions(): Promise<SuggestionRow[]>;
  upsertSuggestion(s: Omit<SuggestionRow, 'id' | 'createdAt' | 'status'> & { dedupeKey: string }): Promise<void>;
  setSuggestionStatus(id: string, status: SuggestionRow['status']): Promise<void>;
  bumpVariant(templateId: string, variant: 'A' | 'B', field: 'sent' | 'conv'): Promise<void>;
  setVariantB(templateId: string, body: string | null): Promise<void>;

  getSetting(key: string): Promise<unknown>;
  setSetting(key: string, value: unknown): Promise<void>;

  addJob(j: Omit<JobRow, 'id' | 'createdAt' | 'status'>): Promise<JobRow>;
  dueJobs(now: Date): Promise<JobRow[]>;
  listJobs(): Promise<JobRow[]>;
  getJob(id: string): Promise<JobRow | null>;
  setJobStatus(id: string, status: JobRow['status']): Promise<void>;
  /** Atomically move a SCHEDULED job to CLAIMED. Returns true if this caller won it. */
  claimJob(id: string): Promise<boolean>;
  /** Reclaim CLAIMED jobs whose lease is older than `olderThanMs` back to SCHEDULED. */
  reclaimStaleJobs(olderThanMs: number): Promise<number>;
  cancelJobsFor(customerId: string, kinds?: JobRow['kind'][]): Promise<number>;
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
