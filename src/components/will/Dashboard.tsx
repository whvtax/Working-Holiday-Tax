'use client';
// Live dashboard. Two assistant modes (Approval / Autopilot), real health
// checks, quick replies everywhere, suggested answers on every task,
// one-click service templates, deep report.
import { useCallback, useEffect, useRef, useState } from 'react';
import { STAGE_GROUPS, STATE_LABELS, TRANSITIONS, FLOW_TEMPLATES, flowForState, CustomerState } from '@/lib/will/state-machine';
import type { CustomerRow, MessageRow, TaskRow, TemplateRow, JobRow } from '@/lib/will/store';
import { ASSISTANT_NAME } from '@/lib/will/config';
import { explainHandoffReason, describeSystemPlaceholder, captionAfterPlaceholder } from '@/lib/will/handoff-reasons';
import type { MonthConversion } from '@/lib/will/monthly-conversion';
import type { AiUsage, SystemFault } from '@/lib/will/system-report';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// The Simulator was removed on Jo's instruction, 25 Aug: with real WhatsApp
// traffic flowing it had no use left, and a fake customer sitting in the
// pipeline next to the real ones was a hazard rather than a help.
type View = 'pipeline' | 'chats' | 'tasks' | 'library' | 'followups' | 'insights' | 'lost' | 'learning';

/** Sidebar labels. Only needed where the view id is not the words we want. */
const VIEW_LABELS: Partial<Record<View, string>> = { followups: 'Follow-ups', insights: 'System & Costs', lost: 'Lost Leads' };

// ────────────────────────────────────────────────────────────
// Lost Leads report, as /api/will/lost returns it.
//
// Every post-mortem here is written for Jo and NOBODY else. There is no
// "message them" button anywhere in this view and no draft is ever created
// from it — the whole feature is read-only by construction.
// ────────────────────────────────────────────────────────────
interface LostAnalysisView {
  reason: string;
  category: string;
  categoryLabel: string;
  shouldHaveDone: string;
  fault: 'OURS' | 'PARTLY_OURS' | 'NOT_OURS';
  recoverable: 'YES' | 'MAYBE' | 'NO';
  recoveryAction: string | null;
  evidenceQuote: string | null;
  confidence: number;
  hoursPriceToSilence: number | null;
  analysedAt: string;
}
interface LostRow {
  customerId: string;
  waId: string;
  name: string | null;
  flag: string;
  state: CustomerState;
  stateLabel: string;
  lang: string | null;
  trigger: string | null;
  triggerLabel: string | null;
  quietDays: number;
  lostBecause: string;
  analysis: LostAnalysisView | null;
  failure: { error: string | null; attempts: number } | null;
}
interface LostReport {
  generatedAt: string;
  definition: { silenceDays: number; text: string };
  counts: { lost: number; analysed: number; pending: number; failed: number; recoverable: number; ourFault: number };
  categories: { category: string; label: string; n: number; share: number; recoverable: number; ourFault: number }[];
  rows: LostRow[];
  lastRun: { day: string; ranAt: string; analysed: number; failed: number; remaining: number; budgetExhausted: boolean; incomplete: boolean } | null;
}
/** How firmly the model committed, in the same three words the report uses. */
const FAULT_TEXT: Record<LostAnalysisView['fault'], { label: string; color: string }> = {
  OURS: { label: 'We lost this one', color: 'var(--crit)' },
  PARTLY_OURS: { label: 'Partly on us', color: 'var(--warn)' },
  NOT_OURS: { label: 'Nothing was done wrong', color: 'var(--ink3)' },
};
const RECOVER_TEXT: Record<LostAnalysisView['recoverable'], { label: string; color: string }> = {
  YES: { label: 'Winnable', color: 'var(--good)' },
  MAYBE: { label: 'Maybe winnable', color: 'var(--sig)' },
  NO: { label: 'Gone', color: 'var(--ink3)' },
};

/** One scheduled follow-up, as /api/will/followups returns it. */
interface FollowUpRow {
  jobId: string;
  customerId: string;
  name: string | null;
  waId: string;
  state: CustomerState;
  lang: string | null;
  runAt: string;
  flow: string | null;
  seq: number;
  templateKey: string | null;
  templateTitle: string | null;
  /** The message as the customer will receive it, {{1}} already filled in. */
  body: string | null;
}

const FLOW_LABELS: Record<string, string> = {
  prePayment: 'Before payment', form: 'Waiting on the form', signature: 'Waiting on a signature',
};

interface StateData {
  customers: CustomerRow[];
  // `waId` is attached by /api/will/state from the customers in the same
  // payload, so a task or a draft can always be labelled by the WhatsApp
  // number — Jo's rule — without depending on the customer also being found in
  // the loaded list. Null only when the customer no longer exists.
  tasks: (TaskRow & { waId?: string | null })[];
  templates: TemplateRow[];
  pending: (MessageRow & { customerName: string | null; waId?: string | null })[];
}
interface Health {
  ok: boolean;
  checks: Record<string, { ok: boolean; detail: string }>;
  killSwitch: boolean;
  /** The mode the SYSTEM is in, read from storage — not what this tab clicked. */
  aiMode?: 'SUPERVISED' | 'FULL_AUTO';
  usingMock: boolean;
  whatsappLive?: boolean;
  whatsappConfigured?: boolean;
  whatsappDetail?: string;
}
interface Report {
  generatedAt: string;
  funnel: { label: string; n: number }[];
  stageGroups: { label: string; color: string; n: number }[];
  closed: { total: number; coldAfterPrice: number };
  stuck: { name: string; state: string; flag: string }[];
  tasks: { open: number; topReasons: [string, number][] };
  insights: { problem: string; evidence: string; solution: string }[];
  qualitative: { note: string } | null;
  leadToPaid: number;
  goal: number | null;
  paidCount: number;
  variantTests: { title: string; a: { sent: number; conv: number; rate: number | null }; b: { sent: number; conv: number; rate: number | null }; winner: string | null; enoughData: boolean }[];
}

const ICONS: Record<View, React.ReactNode> = {
  pipeline: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="3" width="5" height="18" rx="1.5"/><rect x="10" y="8" width="5" height="13" rx="1.5"/><rect x="17" y="13" width="5" height="8" rx="1.5"/></svg>,
  chats: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z"/></svg>,
  tasks: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  library: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>,
  // A clock with a forward arrow: messages queued to leave later.
  followups: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>,
  insights: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg>,
  // A person walking away: the leads that did not become clients.
  lost: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M15 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="17" y1="8" x2="22" y2="13"/><line x1="22" y1="8" x2="17" y2="13"/></svg>,
  learning: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
};
const BELL = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>;
// WhatsApp-style default avatar. Meta's Cloud API does not expose a customer's
// profile photo (privacy), so a contact with no name on file gets this neutral
// silhouette — exactly like a WhatsApp chat with no picture and no saved name.
const AVATAR = (
  <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
    <circle cx="20" cy="20" r="20" fill="#d7dbe0" />
    <circle cx="20" cy="16" r="7" fill="#fff" />
    <path d="M7 35c1.5-7 6.8-10 13-10s11.5 3 13 10z" fill="#fff" />
  </svg>
);
// WhatsApp-style coloured initial: once a name IS known for a contact (saved
// in WhatsApp, or captured from the conversation), real WhatsApp shows a
// coloured circle with their initial instead of the blank silhouette. Same
// idea as the CRM's own avatar palette, so the two apps read as one product.
const AVATAR_COLORS: [string, string][] = [
  ['#e8f5f0', '#0E5C42'], ['#eaf1fb', '#1d4ed8'], ['#fef3e8', '#c2410c'],
  ['#f0fdf4', '#16a34a'], ['#fdf2f8', '#be185d'], ['#f5f3ff', '#6d28d9'],
];
function avatarFor(name: string | null | undefined) {
  const clean = (name ?? '').trim();
  if (!clean) return AVATAR;
  const letter = clean[0]?.toUpperCase() ?? '?';
  const [bg, fg] = AVATAR_COLORS[clean.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '42%' }}>
      {letter}
    </div>
  );
}

const timeAgo = (iso: string | null) => {
  if (!iso) return '·';
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m`;
  if (s < 86400) return `${Math.round(s / 3600)}h`;
  return `${Math.round(s / 86400)}d`;
};
// WhatsApp-style date dividers in an open chat: "Today" / "Yesterday" / the
// full date, all read in the business's own timezone so a message sent late
// at night doesn't land on the wrong side of the divider.
const MEL_TZ = 'Australia/Melbourne';
const melDayKey = (iso: string) =>
  new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: MEL_TZ }).format(new Date(iso));
const melDayLabel = (iso: string) => {
  const key = melDayKey(iso);
  if (key === melDayKey(new Date().toISOString())) return 'Today';
  if (key === melDayKey(new Date(Date.now() - 86400e3).toISOString())) return 'Yesterday';
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: MEL_TZ });
};
// WhatsApp-real chat-list timestamp: a clock time for today, "Yesterday",
// the weekday name for the rest of this week, then a short date — never a
// relative duration like "5m"/"4d" (that's what timeAgo elsewhere is for;
// this is specifically the chat list's own top-right timestamp).
const chatListTime = (iso: string | null) => {
  if (!iso) return '·';
  const d = new Date(iso);
  const key = melDayKey(iso);
  const todayKey = melDayKey(new Date().toISOString());
  const yesterdayKey = melDayKey(new Date(Date.now() - 86400e3).toISOString());
  if (key === todayKey) return d.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: MEL_TZ });
  if (key === yesterdayKey) return 'Yesterday';
  const daysAgo = Math.round((new Date(`${todayKey}T00:00:00Z`).getTime() - new Date(`${key}T00:00:00Z`).getTime()) / 86400000);
  if (daysAgo < 7) return d.toLocaleDateString('en-AU', { weekday: 'long', timeZone: MEL_TZ });
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'numeric', year: '2-digit', timeZone: MEL_TZ });
};
// When a scheduled message will actually leave, read in the business's own
// timezone: "Tue 2 Sep, 09:15". The exact time matters here — this is a queue
// you may want to get ahead of, not a "2h ago" you only glance at.
const sendAtLabel = (iso: string) =>
  new Date(iso).toLocaleString('en-AU', {
    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    hour12: false, timeZone: MEL_TZ,
  });
/** "in 4h" / "in 3d" / "due now" — how long until a scheduled job runs. */
const untilLabel = (iso: string) => {
  const s = (new Date(iso).getTime() - Date.now()) / 1000;
  if (s <= 30) return 'due now';
  if (s < 90) return `in ${Math.round(s)}s`;
  if (s < 5400) return `in ${Math.round(s / 60)}m`;
  if (s < 172800) return `in ${Math.round(s / 3600)}h`;
  return `in ${Math.round(s / 86400)}d`;
};
/** One short line for a list row. You scan this list to see WHO is waiting, not
 *  to read the message, so anything past the first line is noise. */
const previewLine = (s: string) => {
  const first = (s || '').split('\n')[0].trim();
  return first.length > 58 ? `${first.slice(0, 58).trimEnd()}…` : first;
};

/** A task headline in 8 words or fewer.
 *
 *  Will is now asked for a short headline, but tasks written before that, and
 *  any answer that drifts, still arrive as a paragraph. Cutting to the first
 *  sentence and then to 8 words keeps the queue scannable either way; the full
 *  text stays available on hover. */
const shortReason = (s: string) => {
  const firstSentence = (s || '').split(/(?<=[.!?])\s/)[0].trim();
  const words = firstSentence.split(/\s+/).filter(Boolean);
  return words.length > 8 ? `${words.slice(0, 8).join(' ')}…` : firstSentence;
};
const incLabel = (i: CustomerRow['income']) => (i === 'TFN_ABN' ? 'TFN+ABN' : i === 'TFN' ? 'TFN' : '?');
const feeOf = (i: CustomerRow['income']) => (i === 'TFN_ABN' ? '$385' : i === 'TFN' ? '$220' : null);
// Jo's rule: identify customers by their WhatsApp phone number, never the profile name.
// Formatted exactly like the WhatsApp app (grouped spacing) via libphonenumber.
const phoneOf = (waId: string) => {
  const raw = waId.startsWith('+') ? waId : '+' + waId;
  try {
    const parsed = parsePhoneNumberFromString(raw);
    if (parsed) return parsed.formatInternational(); // e.g. "+44 7851 436936"
  } catch { /* fall back to the raw number */ }
  return raw;
};

async function act(body: Record<string, unknown>) {
  const res = await fetch('/api/will/actions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  return res.json().catch(() => ({}));
}

// "Quick fill" #5 used to be payment_received — redundant now that payment
// confirmation has dedicated features (auto-detection from a photo, and the
// Send Estimate/Signature/Lodged buttons that already send the right
// confirmation for their stage), so it was removed rather than left as a
// second, manual way to do the same thing.
const QUICK_TEMPLATES = ['req_abn', 'req_expenses', 'req_doc', 'medicare'];

/** What the customer actually sent, shown inside the message bubble.
 *
 *  The bytes come from /api/will/media/[id], which holds the WhatsApp token
 *  server-side. Meta deletes attachments after 30 days, so a failure here is
 *  expected on old chats and falls back to a plain line rather than a broken
 *  image. Everything that is not a picture or a video is offered as a download,
 *  which covers payment screenshots sent as PDFs, payslips, and voice notes. */
function Attachment({ media }: { media: NonNullable<MessageRow['meta']>['media'] }) {
  const [failed, setFailed] = useState(false);
  if (!media) return null;
  const src = `/api/will/media/${encodeURIComponent(media.id)}`;
  const isImage = media.kind === 'image' || media.kind === 'sticker' || (media.mime ?? '').startsWith('image/');
  const isVideo = media.kind === 'video' || (media.mime ?? '').startsWith('video/');
  const isAudio = media.kind === 'audio' || media.kind === 'voice' || (media.mime ?? '').startsWith('audio/');
  const label = media.filename || (media.kind === 'document' ? 'Document' : 'File');

  if (failed) {
    return <div className="attach-gone">Attachment no longer available (WhatsApp keeps files for 30 days)</div>;
  }
  return (
    <div className="attach">
      {isImage ? (
        // Opens full size in a new tab — the common case is a payment
        // screenshot that has to be read, not glanced at.
        <a href={src} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={media.caption || 'Photo from customer'} onError={() => setFailed(true)} />
        </a>
      ) : isVideo ? (
        <video src={src} controls preload="metadata" onError={() => setFailed(true)} />
      ) : isAudio ? (
        <audio src={src} controls preload="metadata" onError={() => setFailed(true)} />
      ) : (
        <a className="attach-doc" href={src} target="_blank" rel="noreferrer" download={media.filename || undefined}>
          <span aria-hidden>📄</span> {label}
        </a>
      )}
      {media.caption && <div className="attach-cap">{media.caption}</div>}
    </div>
  );
}

export default function Dashboard() {
  const [view, setView] = useState<View>('pipeline');
  const [notifOpen, setNotifOpen] = useState(false);
  const [focusTaskId, setFocusTaskId] = useState<string | null>(null);
  const [group, setGroup] = useState('sales');
  const [data, setData] = useState<StateData>({ customers: [], tasks: [], templates: [], pending: [] });
  const [health, setHealth] = useState<Health | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [tpl, setTpl] = useState<TemplateRow | null>(null);
  const [newTpl, setNewTpl] = useState<{ title: string; category: string; body: string } | null>(null);
  type Knw = { id: string; intent: string; question: string; answer: string; source: string };
  const [knowledge, setKnowledge] = useState<{ drafts: Knw[]; active: Knw[] }>({ drafts: [], active: [] });
  const loadKnowledge = useCallback(async () => {
    try { const r = await fetch('/api/will/knowledge').then((x) => x.json()); if (r.ok) setKnowledge({ drafts: r.drafts ?? [], active: r.active ?? [] }); } catch { /* */ }
  }, []);
  // Editing a learned Knowledge Base answer from the Library (same modal shape
  // as `tpl`/`tplText`, but this is a SEPARATE store — knowledge, not templates
  // — so it needs its own selection + draft text and its own save action.
  const [know, setKnow] = useState<Knw | null>(null);
  const [knowText, setKnowText] = useState('');
  // Review-stage chat button: type the refund estimate + paste the invoice
  // link, one Send composes and delivers the message and moves the customer
  // on to Estimate. `estimateFor` holds which customer the modal is open for.
  const [estimateFor, setEstimateFor] = useState<CustomerRow | null>(null);
  const [estimateAmt, setEstimateAmt] = useState('');
  const [estimateLink, setEstimateLink] = useState('');
  // The raw audit feed was removed from the screen on 27 Aug (see the Decision
  // Log panel), so nothing fetches /api/will/audit from here any more. The route
  // and the rows behind it are untouched — this dropped the reader, not the
  // record.
  // Claude usage + the real system faults, for the System & Costs card.
  const [system, setSystem] = useState<{ usage: AiUsage; faults: SystemFault[]; faultWindow: number; auditRowsRead: number } | null>(null);
  const loadSystem = useCallback(async () => {
    try {
      const r = await fetch('/api/will/system').then((x) => x.json());
      if (r.ok) setSystem({ usage: r.usage, faults: r.faults ?? [], faultWindow: r.faultWindow ?? 0, auditRowsRead: r.auditRowsRead ?? 0 });
    } catch { /* keep whatever is on screen */ }
  }, []);
  // Month-by-month lead → paid, computed server-side from the state history.
  // Sits under the goal card so July can be compared with August.
  const [monthly, setMonthly] = useState<MonthConversion[] | null>(null);
  const loadMonthly = useCallback(async () => {
    try {
      const r = await fetch('/api/will/insights/monthly').then((x) => x.json());
      if (r.ok) setMonthly(r.months ?? []);
    } catch { /* keep whatever is on screen */ }
  }, []);
  // The Lost Leads report. Read-only: the post-mortems are written once a night
  // by the LOST_ANALYSIS job and simply read here, so opening the tab is instant
  // and free and yesterday's finding is still the same finding today.
  const [lost, setLost] = useState<LostReport | null>(null);
  const [lostOpen, setLostOpen] = useState<string | null>(null);
  const loadLost = useCallback(async () => {
    try {
      const r = await fetch('/api/will/lost').then((x) => x.json());
      if (r.ok) setLost(r as LostReport);
    } catch { /* keep whatever is on screen */ }
  }, []);
  // Everyone scheduled to receive a follow-up. Kept current while the view is
  // open: this is a live queue, not a report you regenerate.
  const [followups, setFollowups] = useState<FollowUpRow[] | null>(null);
  const loadFollowups = useCallback(async () => {
    try {
      const r = await fetch('/api/will/followups').then((x) => x.json());
      if (r.ok) setFollowups(r.rows ?? []);
    } catch { /* keep whatever is on screen */ }
  }, []);
  // Two-click arming for "clear the log" (see the Decision Log panel).
  const [clearArmed, setClearArmed] = useState(false);
  const [knwDrafts, setKnwDrafts] = useState<Record<string, string>>({});
  const [tplText, setTplText] = useState('');
  const [toast, setToast] = useState('');
  // NOT local state any more. This used to be a useState that the two mode
  // buttons set and nothing else ever read, so the dashboard displayed the last
  // thing clicked in this tab rather than the mode the system was actually in —
  // and clicking Autopilot changed the label without changing any behaviour.
  // It now reflects what is stored, which is what every sender reads.
  const mode: 'SUPERVISED' | 'FULL_AUTO' = health?.aiMode ?? 'SUPERVISED';
  const [chatSelId, setChatSelId] = useState<string | null>(null);
  const [chatMsgs, setChatMsgs] = useState<MessageRow[]>([]);
  const [upcoming, setUpcoming] = useState<JobRow[]>([]);
  const [composer, setComposer] = useState('');
  const [drawerReply, setDrawerReply] = useState('');
  const [taskDrafts, setTaskDrafts] = useState<Record<string, string>>({});
  const [acted, setActed] = useState<Set<string>>(new Set());
  const [searchQ, setSearchQ] = useState('');
  // Chat-list filter chip: 'all' | 'unread' | a pipeline stage-group id.
  const [chatFilter, setChatFilter] = useState('all');
  // Whether the chat-header stage badge dropdown (manual stage move) is open.
  const [stageMenuOpen, setStageMenuOpen] = useState(false);
  const [, setClock] = useState(0);
  const msgsRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const latestChatReq = useRef<string | null>(null);

  const say = (m: string) => {
    setToast(m);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  };

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/will/state');
      const d: StateData = await res.json();
      setData(d);
      setChatSelId((sel) => sel ?? (
        [...d.customers].sort((a, b) => (b.lastCustomerMsgAt ?? '').localeCompare(a.lastCustomerMsgAt ?? ''))[0]?.id ?? null
      ));
    } catch { /* server starting */ }
  }, []);

  const loadChat = useCallback(async (id: string) => {
    setChatSelId(id);
    latestChatReq.current = id;
    const res = await fetch('/api/will/messages?customerId=' + id);
    const d = await res.json();
    if (latestChatReq.current === id) setChatMsgs(d.messages); // race guard
  }, []);
  // Opening a chat clears its unread badge (WhatsApp-style). Only fired on an
  // explicit user open, never from the reactive re-load effects below.
  const openChat = useCallback(async (id: string) => {
    await loadChat(id);
    act({ action: 'mark_read', id }).then(() => refresh());
  }, [loadChat, refresh]);

  useEffect(() => { refresh(); }, [refresh, view]);
  // Scroll to and briefly highlight a task opened from the notification bell.
  useEffect(() => {
    if (view !== 'tasks' || !focusTaskId) return;
    const el = document.getElementById('task-' + focusTaskId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const tmr = setTimeout(() => setFocusTaskId(null), 2200);
    return () => clearTimeout(tmr);
  }, [view, focusTaskId, data]);
  useEffect(() => { if (view === 'chats' && chatSelId) loadChat(chatSelId); }, [view, chatSelId, loadChat]);
  useEffect(() => {
    if (view !== 'chats' || !chatSelId) return;
    loadChat(chatSelId);
    // WhatsApp-real behaviour: a message that arrives while this chat is the
    // one you're actively looking at is implicitly read — it must never go
    // bold behind your own open conversation. Self-limiting: once cleared,
    // unreadCount is 0 and this is a no-op on the next poll.
    const openCustomer = data.customers.find((c) => c.id === chatSelId);
    if (openCustomer && openCustomer.unreadCount > 0) {
      act({ action: 'mark_read', id: chatSelId }).then(() => refresh());
    }
    /* eslint-disable-next-line */
  }, [data]);
  useEffect(() => { if ((view === 'insights' || view === 'learning') && !report) fetch('/api/will/report').then((r) => r.json()).then((rp) => setReport(rp)).catch(() => {}); }, [view, report]);
  useEffect(() => { if (view === 'learning' || view === 'library') { loadKnowledge(); } }, [view, loadKnowledge]);
  useEffect(() => { if (view === 'learning') { loadMonthly(); } }, [view, loadMonthly]);
  useEffect(() => { if (view === 'insights') loadSystem(); }, [view, loadSystem]);
  // Fetched on open, not polled: these rows only change once a night.
  useEffect(() => { if (view === 'lost') loadLost(); }, [view, loadLost]);
  // The follow-up queue moves on its own (the scheduler sends, cancels and
  // re-arms jobs), so while you are looking at it, it refreshes itself.
  useEffect(() => {
    if (view !== 'followups') return;
    loadFollowups();
    const iv = setInterval(() => { if (!document.hidden) loadFollowups(); }, 20000);
    return () => clearInterval(iv);
  }, [view, loadFollowups]);

  // Update-on-change: instead of refetching everything on a fixed timer, poll a
  // tiny change-token and only pull the heavy /state payload when something
  // actually changed. Cuts server load to near-zero while idle.
  useEffect(() => {
    let stop = false;
    let lastToken = '';
    const hidden = () => typeof document !== 'undefined' && document.hidden;

    const refetchHeavy = async () => {
      const h = await fetch('/api/will/health').then((r) => r.json()).catch(() => null);
      if (stop) return;
      if (h) setHealth(h);
      await refresh();
    };

    const poll = async () => {
      if (hidden()) return; // pause on hidden tabs
      try {
        const v = await fetch('/api/will/version').then((r) => r.json());
        if (stop) return;
        if (v.token && v.token !== lastToken) { lastToken = v.token; await refetchHeavy(); }
      } catch {
        if (!stop) setHealth((prev) => prev ? { ...prev, ok: false, checks: { ...prev.checks, server: { ok: false, detail: 'unreachable' } } } : null);
      }
    };

    // Scheduler driver. In production a cron hits /api/will/tick (see vercel.json);
    // this slow browser tick is a dev/idle safety net. When it sends something the
    // change-token moves, so the UI refresh happens through poll(), not here.
    const tickOnce = async () => {
      if (hidden()) return;
      try {
        const tick = await fetch('/api/will/tick').then((r) => r.json());
        if (stop) return;
        setUpcoming((tick.upcoming ?? []).filter((j: JobRow) => j.customerId));
        if (tick.sent?.length) say('Follow-up sent: ' + tick.sent[0]);
        if (tick.closed?.length) say('Auto-closed (went cold): ' + tick.closed[0]);
      } catch { /* cron will catch up */ }
    };

    refetchHeavy();
    tickOnce();
    // 15s, not 3s. At 3s this one timer was 86% of the dashboard's Vercel
    // invocations and ~69% of its Supabase load: 1,200 calls/hour x ~5 queries
    // each, per open tab, forever, with nobody touching the keyboard. Across a
    // small team that was ~3.2M queries a month to shave a few seconds off a
    // notification. 15s costs at most 12 extra seconds of inbound latency and
    // removes roughly three quarters of the baseline cost.
    const pollIv = setInterval(poll, 15000);
    const tickIv = setInterval(tickOnce, 30000);   // slow scheduler safety net
    const healthIv = setInterval(() => {           // keep status dots fresh even when idle
      if (!hidden()) fetch('/api/will/health').then((r) => r.json()).then((h) => { if (!stop) setHealth(h); }).catch(() => {});
    }, 45000);
    // Skip while hidden: this re-renders the whole dashboard once a second,
    // and a backgrounded tab has nobody to show a ticking clock to.
    const clockIv = setInterval(() => { if (!hidden()) setClock((c) => c + 1); }, 1000);
    return () => { stop = true; clearInterval(pollIv); clearInterval(tickIv); clearInterval(healthIv); clearInterval(clockIv); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatMsgs]);

  const g = STAGE_GROUPS.find((x) => x.id === group)!;
  const countFor = (states: readonly CustomerState[]) => data.customers.filter((c) => states.includes(c.state)).length;
  const openTasks = data.tasks.filter((t) => t.status === 'OPEN');
  // ── Drafts Will has written and not sent, waiting on your approval.
  //    They are listed at the top of Tasks, which is now the only inbox.
  // One place instead of hunting through every chat. Three kinds:
  //   1. drafts awaiting your approval (Will's proposals)
  //   2. messages that could not be sent (WhatsApp/Meta rejected them)
  //   3. drafts the guard blocked before they could go out
  const pendingDrafts = data.pending;
  // Which chats have a draft Will is holding. The chat list needs this because
  // a draft is no longer allowed to masquerade as the row preview: it is a real
  // and useful fact about the conversation, but it is not something the
  // customer received, so it gets its own marker instead.
  const draftWaitingFor = new Set(pendingDrafts.map((m) => m.customerId));
  // notSentTasks and outboxCount belonged to the Outbox tab, which is gone:
  // blocked and failed sends are ordinary tasks and are listed with the rest.
  const custById = (id: string | null) => data.customers.find((c) => c.id === id) ?? null;
  // Notifications, most urgent first (URGENT > CONFLICT > REVIEW), then newest.
  const SEV_RANK: Record<string, number> = { URGENT: 0, CONFLICT: 1, REVIEW: 2 };
  const notifTasks = [...openTasks].sort(
    (a, b) => (SEV_RANK[a.severity] ?? 3) - (SEV_RANK[b.severity] ?? 3) || b.createdAt.localeCompare(a.createdAt),
  );
  const openTaskNotif = (id: string) => { setFocusTaskId(id); setView('tasks'); setNotifOpen(false); };
  const greetHour = new Date().getHours();
  const greeting = greetHour < 12 ? 'Good morning' : greetHour < 17 ? 'Good afternoon' : greetHour < 22 ? 'Good evening' : 'Working late';
  const awaiting = data.customers.filter((c) => ['PRICE_SENT', 'PAYMENT_PENDING'].includes(c.state));
  const awaitingPotential = awaiting.reduce((s, c) => s + (c.income === 'TFN_ABN' ? 385 : c.income === 'TFN' ? 220 : 0), 0);
  // We sent the last message, they went quiet, but never explicitly declined:
  // worth a personal nudge in a few weeks. "We spoke last" was being counted
  // the instant our reply went out, with no time passed at all — a lead who
  // messaged 5 minutes ago and got an instant answer counted as "gone quiet"
  // just as much as someone silent for a month, which is why 60 of 84 showed
  // up here. Requires at least 24h of actual silence since our side spoke,
  // the same bar the "stuck" flag and the follow-up cadence already use.
  const QUIET_THRESHOLD_MS = 24 * 3600e3;
  const quietLeads = data.customers.filter((c) =>
    c.lastMessageDirection === 'OUT' && !c.optedOut &&
    c.lastMessageAt != null && Date.now() - new Date(c.lastMessageAt).getTime() > QUIET_THRESHOLD_MS &&
    ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING', 'WENT_COLD'].includes(c.state));
  const killSwitch = health?.killSwitch ?? false;

  const chatSel = data.customers.find((c) => c.id === chatSelId) ?? null;
  const drawer = data.customers.find((c) => c.id === drawerId) ?? null;

  // Chat-list filter: 'all', 'unread', or a pipeline STAGE-GROUP id.
  const chatGroupStates = (id: string): readonly CustomerState[] | null => {
    const g = STAGE_GROUPS.find((x) => x.id === id);
    return g ? (g.states as readonly CustomerState[]) : null;
  };
  const chatList = [...data.customers]
    .filter((c) => c.lastMessagePreview)
    .filter((c) => !searchQ || phoneOf(c.waId).toLowerCase().includes(searchQ.toLowerCase()) || (c.lastMessagePreview ?? '').toLowerCase().includes(searchQ.toLowerCase()))
    .filter((c) => {
      if (chatFilter === 'all') return true;
      if (chatFilter === 'unread') return c.unreadCount > 0;
      const states = chatGroupStates(chatFilter);
      return states ? states.includes(c.state) : true;
    })
    // WhatsApp-style: most recent conversation first, bumped by ANY message
    // (incoming or the owner's own reply), falling back to inbound time.
    // No cap here any more — a chat with a real conversation must never
    // silently drop off the list once there are more than N others, exactly
    // like the WhatsApp app on a phone never hides an old conversation, it
    // just scrolls further down.
    .sort((a, b) => ((b.lastMessageAt ?? b.lastCustomerMsgAt) ?? '').localeCompare((a.lastMessageAt ?? a.lastCustomerMsgAt) ?? ''));

  const stageColorOf = (s: CustomerState) => STAGE_GROUPS.find((sg) => (sg.states as readonly CustomerState[]).includes(s))?.color ?? '#7a8494';
  // Every status shown to the owner — in chat, in the pipeline strip, in the
  // move-stage dropdown, in toasts — must be one of the eight pipeline stage
  // names (Sales, Paid, Review, Ready, Estimate, Signature, Completed,
  // Closed) and nothing else. The eighteen granular CustomerState values
  // (New Lead, Qualified, Price Sent, Form Complete, …) are internal
  // plumbing for the state machine; they are never surfaced in the UI.
  const stageLabelOf = (s: CustomerState) => STAGE_GROUPS.find((sg) => (sg.states as readonly CustomerState[]).includes(s))?.label ?? STATE_LABELS[s];
  // "Journey" timeline in the customer drawer: same eight pipeline stages,
  // in pipeline order, minus "Closed" (a closed customer is shown via the
  // separate closedState banner rather than as a forward step).
  const journeyGroups = STAGE_GROUPS.filter((sg) => sg.id !== 'closed');
  const journey: CustomerState[] = journeyGroups.map((sg) => sg.states[0] as CustomerState);
  const journeyIdx: Partial<Record<CustomerState, number>> = {};
  STAGE_GROUPS.forEach((sg) => {
    const idx = journeyGroups.findIndex((jg) => jg.id === sg.id);
    if (idx === -1) return; // 'closed' states aren't on the forward journey
    (sg.states as readonly CustomerState[]).forEach((st) => { journeyIdx[st] = idx; });
  });

  const grouped = data.templates.reduce<Record<string, TemplateRow[]>>((acc, t) => {
    (acc[t.category] ??= []).push(t);
    return acc;
  }, {});

  const once = async (key: string, fn: () => Promise<void>) => {
    if (acted.has(key)) return;
    setActed((s) => new Set(s).add(key));
    try { await fn(); } finally { /* keep acted to prevent double fire */ }
  };

  const sendManual = async (customerId: string, text: string) => {
    if (!text.trim()) return;
    const r = await act({ action: 'manual_reply', customerId, body: text });
    // The server now reports whether WhatsApp actually accepted the message.
    // Reporting "Sent" on a failure is how a lost message looked delivered.
    if (r?.ok) {
      say(`Sent. ${ASSISTANT_NAME} paused for this chat, you have the wheel`);
    } else {
      say(`❌ Not sent: ${r?.error ?? r?.message ?? 'WhatsApp rejected it'}`);
    }
    refresh();
    if (chatSelId === customerId) loadChat(customerId);
  };

  return (
    <>
      <aside className="side">
        <div className="slogo"><div className="logo"><div className="mark">W</div></div><div className="sname">{ASSISTANT_NAME}<small>Admin</small></div></div>
        {(['pipeline', 'chats', 'tasks', 'library', 'followups', 'insights', 'lost', 'learning'] as View[]).map((v) => (
          <button key={v} className={`ni ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>
            <span className="ic">{ICONS[v]}</span>
            <span className="nl">{VIEW_LABELS[v] ?? v[0].toUpperCase() + v.slice(1)}</span>
            {v === 'tasks' && (openTasks.length + pendingDrafts.length) > 0 && <span className="nbadge">{openTasks.length + pendingDrafts.length}</span>}
          </button>
        ))}
        <div className="sfoot">
          <button onClick={() => { window.location.href = '/crm/dashboard'; }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', padding: '9px', border: '1px solid var(--line2)', borderRadius: 10, background: 'var(--surface2)', color: 'var(--ink2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            ← Back to CRM
          </button>
        </div>
      </aside>

      <header>
        <div className="hrow">
          <div className="modebar" style={{ padding: 0 }}>
            <span className="modelabel">{ASSISTANT_NAME} Mode</span>
            <div className="modes">
              <button className={`mode ${mode === 'SUPERVISED' ? 'active supervised' : ''}`} title={`${ASSISTANT_NAME} drafts every message, you approve before anything sends. Includes scheduled follow-ups and templates.`}
                onClick={async () => {
                  if (mode === 'SUPERVISED') return;
                  const r = await act({ action: 'set_ai_mode', mode: 'SUPERVISED' });
                  if (!r?.ok) { say('Could not change mode — nothing was changed'); return; }
                  setHealth((h) => h ? { ...h, aiMode: 'SUPERVISED' } : h);
                  say(`Approval mode: nothing sends without you`);
                }}>Approval</button>
              <button className={`mode ${mode === 'FULL_AUTO' ? 'active autopilot' : ''}`} title={`${ASSISTANT_NAME} sends on his own; anything unclear comes to you`}
                onClick={async () => {
                  if (mode === 'FULL_AUTO') return;
                  // Turning approval OFF is the one switch in this dashboard that
                  // lets a message reach a customer unread by you. It asks first.
                  if (!window.confirm(`Autopilot means ${ASSISTANT_NAME} sends messages to customers WITHOUT your approval.\n\nTurn it on?`)) return;
                  const r = await act({ action: 'set_ai_mode', mode: 'FULL_AUTO' });
                  if (!r?.ok) { say('Could not change mode — nothing was changed'); return; }
                  setHealth((h) => h ? { ...h, aiMode: 'FULL_AUTO' } : h);
                  say(`Autopilot: ${ASSISTANT_NAME} sends, escalates anything unclear`);
                }}>Autopilot</button>
            </div>
          </div>
          <div className="hspacer" />
          <div className="health">
            {health && Object.entries(health.checks).filter(([k]) => k !== 'whatsapp').map(([k, v]) => (
              <span key={k} className="hdot" title={v.detail}>
                <span className="dot" style={{ background: v.ok ? undefined : 'var(--crit)' }} />
                <span className="hlabel">{k[0].toUpperCase() + k.slice(1)}</span>
              </span>
            ))}
            {health && (health.whatsappLive
              ? <span className="waPill live" title={health.whatsappDetail}>● WhatsApp: Connected</span>
              : health.whatsappConfigured
                ? <a className="waPill bad" href="/crm/whatsapp/connect" title={`${health.whatsappDetail || ''} — click to reconnect`}>● WhatsApp: NOT WORKING — connect</a>
                : <a className="waPill test" href="/crm/whatsapp/connect" title={health.whatsappDetail || 'Cloud API credentials not active — click to connect'}>● WhatsApp: TEST MODE — connect</a>)}
            {/* A missing migration silently dropped 105 real leads once, while
                every dot up here stayed green the whole time. A tooltip is too
                easy to miss for a failure that expensive, so it gets an alarm. */}
            {health?.checks?.schema && !health.checks.schema.ok && (
              <a className="waPill bad" href="/crm/whatsapp/inbound-check" title={health.checks.schema.detail}>
                ● DATABASE OUT OF DATE — new customers are being dropped
              </a>
            )}
            {!health && <span className="hdot"><span className="dot" style={{ background: 'var(--warn)' }} /><span className="hlabel">connecting…</span></span>}
          </div>
          <div style={{ position: 'relative' }}>
            <div className="bell" onClick={() => setNotifOpen((o) => !o)}>{BELL}{openTasks.length > 0 && <span className="badge">{openTasks.length}</span>}</div>
            {notifOpen && (
              <>
                <div onClick={() => setNotifOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />
                <div style={{ position: 'absolute', top: 34, right: 0, width: 320, maxHeight: 420, overflowY: 'auto', background: 'var(--surface)', border: '1px solid var(--line2)', borderRadius: 14, boxShadow: '0 12px 40px rgba(20,22,30,.18)', zIndex: 999, padding: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px 6px' }}>
                    <span style={{ fontWeight: 700, fontSize: 12.5 }}>Notifications</span>
                    <span style={{ fontSize: 11, color: 'var(--ink3)' }}>{notifTasks.length} open</span>
                  </div>
                  {notifTasks.length === 0 && (
                    <div style={{ padding: '14px 10px', fontSize: 12, color: 'var(--ink3)' }}>All clear. Nothing needs you right now 🎉</div>
                  )}
                  {notifTasks.slice(0, 10).map((t) => {
                    const dot = t.severity === 'URGENT' ? 'var(--crit)' : t.severity === 'CONFLICT' ? 'var(--warn)' : 'var(--ink3)';
                    return (
                      <button key={t.id} onClick={() => openTaskNotif(t.id)}
                        style={{ display: 'flex', gap: 9, alignItems: 'flex-start', width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', padding: '9px 10px', borderRadius: 10, fontFamily: 'inherit' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface2)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}>
                        <span style={{ width: 7, height: 7, borderRadius: 4, background: dot, marginTop: 5, flex: 'none' }} />
                        <span style={{ minWidth: 0, flex: 1 }}>
                          <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(() => { const c = custById(t.customerId); const w = c?.waId ?? t.waId; return w ? phoneOf(w) : 'System'; })()}</span>
                          <span title={t.reason} style={{ display: 'block', fontSize: 11.5, color: 'var(--ink2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shortReason(t.reason)}</span>
                        </span>
                        <span style={{ fontSize: 9.5, color: 'var(--ink3)', flex: 'none', marginTop: 2 }}>{timeAgo(t.createdAt)}</span>
                      </button>
                    );
                  })}
                  {notifTasks.length > 0 && (
                    <button onClick={() => { setView('tasks'); setNotifOpen(false); }}
                      style={{ width: '100%', border: 'none', borderTop: '1px solid var(--line)', background: 'none', cursor: 'pointer', padding: '9px', fontSize: 11.5, fontWeight: 600, color: 'var(--brand1)', fontFamily: 'inherit', marginTop: 4 }}>
                      View all tasks
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
          <button className={`kill ${killSwitch ? 'paused' : ''}`} onClick={async () => {
            await act({ action: 'set_kill_switch', value: !killSwitch });
            say(killSwitch ? `${ASSISTANT_NAME} resumed from saved states ✓` : `🛑 ${ASSISTANT_NAME} fully stopped. Every chat is yours.`);
            setHealth((h) => h ? { ...h, killSwitch: !killSwitch } : h);
          }}>
            {killSwitch ? `⏻ ${ASSISTANT_NAME.toUpperCase()} STOPPED` : `⏻ Pause ${ASSISTANT_NAME}`}
          </button>
        </div>
      </header>

      <main>
        {view === 'pipeline' && (
          <section className="view active">
            {/* The "Welcome / Your Dashboard" heading and its gap were removed —
                they only took space. The KPI row and the pipeline strip are now
                a STICKY summary: they stay pinned to the top of the view while
                the customer list below scrolls under them. */}
            <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'var(--bg)', paddingTop: 2, marginBottom: 14 }}>
            <div className="kpis">
              <div className="kpi clickable" title="See all conversations" onClick={() => setView('chats')}><div className="kl">Customers</div><div className="kv">{data.customers.length}</div><div className="kd">in the system</div></div>
              <div className="kpi clickable" title="We sent the last message and they went quiet, but never said no. Worth a personal follow-up later." onClick={() => { setView('pipeline'); setGroup('closed'); }}>
                <div className="kl">Worth a Nudge</div><div className="kv">{quietLeads.length}</div><div className="kd">Never said no</div>
              </div>
              <div className="kpi clickable" title="See completed customers" onClick={() => { setView('pipeline'); setGroup('done'); }}><div className="kl">Completed</div><div className="kv">{countFor(STAGE_GROUPS.find((sg) => sg.id === 'done')!.states)}</div><div className="kd up">all-time</div></div>
            </div>

            <div className="pstrip">
              <div className="pstitle">My Pipeline</div>
              <div className="psrow">
                {STAGE_GROUPS.map((sg, i) => {
                  const n = countFor(sg.states);
                  return (
                    <span key={sg.id} style={{ display: 'contents' }}>
                      {i > 0 && <div className="psarrow">→</div>}
                      <div className={`ps ${sg.id === group ? 'active' : ''} ${n ? '' : 'zero'}`} style={{ ['--pc' as string]: sg.color }} onClick={() => setGroup(sg.id)}>
                        <div className="psc">{n}</div><div className="psl">{sg.label}</div>
                      </div>
                    </span>
                  );
                })}
              </div>
              <div className="psfoot"><span>Total customers in pipeline</span><b>{data.customers.length}</b></div>
            </div>
            </div>{/* end sticky summary */}

            <div className="rowlist">
              {data.customers.filter((c) => (g.states as readonly CustomerState[]).includes(c.state))
                .sort((a, b) => (g.states as readonly string[]).indexOf(a.state) - (g.states as readonly string[]).indexOf(b.state) || (b.lastCustomerMsgAt ?? '').localeCompare(a.lastCustomerMsgAt ?? ''))
                .map((c) => (
                <div key={c.id} className="rowcard" style={{ ['--gc' as string]: g.color }} onClick={() => { setView('chats'); openChat(c.id); }}>
                  <div className="rc-main">
                    <div className="rc-top">
                      <span className="cname">{phoneOf(c.waId)}</span>
                    </div>
                    {c.lastMessagePreview && <div className="rc-msg">“{previewLine(c.lastMessagePreview)}”</div>}
                  </div>
                  <div className="rc-side">
                    <span className="stagepill" style={{ ['--pc' as string]: g.color }}>{stageLabelOf(c.state)}</span>
                    {/* When the last message actually arrived, not when the
                        pipeline stage last changed: "2h" should mean 2h since
                        anyone spoke, which is what you scan this list for. */}
                    <span className="rc-time">{timeAgo(c.lastMessageAt ?? c.stateChangedAt)}</span>
                  </div>
                </div>
              ))}
              {data.customers.filter((c) => (g.states as readonly CustomerState[]).includes(c.state)).length === 0 &&
                <div className="sysline" style={{ margin: '20px 0' }}>No customers in {g.label} right now</div>}
            </div>
          </section>
        )}

        {view === 'chats' && (
          <section className="view active chats-view">
            <div className="chatwrap">
              <div className="chatlist">
                <div className="chatlist-head">
                  {/* WhatsApp's own search glyph: thin grey line-art, not the
                      colour emoji. The emoji rendered as a blue-and-pink
                      magnifier, which is the one thing in this panel that did
                      not look like WhatsApp. currentColor so it inherits the
                      muted ink the rest of the field uses. */}
                  <div className="search">
                    <span className="search-ic" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M16.2 16.2 L21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <input placeholder="Search customers & messages…" value={searchQ} onChange={(e) => setSearchQ(e.target.value)} />
                  </div>
                  {/* Filter chips (owner's choice): All, then the three stage
                      stops that matter for a quick filter — Paid, Review,
                      Signature. */}
                  <div className="chatfilter">
                    <button className={`cfchip ${chatFilter === 'all' ? 'on' : ''}`} onClick={() => setChatFilter('all')}>All</button>
                    {STAGE_GROUPS.filter((sg) => sg.id === 'onb' || sg.id === 'rev' || sg.id === 'sig').map((sg) => (
                      <button key={sg.id} className={`cfchip ${chatFilter === sg.id ? 'on' : ''}`} style={{ ['--pc' as string]: sg.color }} onClick={() => setChatFilter(sg.id)}>{sg.label}</button>
                    ))}
                  </div>
                </div>
                {/* WhatsApp-real: the scrollbar belongs to the chat list only —
                    search and the filter chips are outside the scrolling area
                    entirely (not just visually pinned via sticky), so the
                    scrollbar track starts right where the first chat does,
                    never running up alongside the search box. */}
                <div className="chatlist-items">
                  {chatList.map((c) => {
                    // WhatsApp-real: the chat you're currently looking at is
                    // never shown as unread, even for the instant before the
                    // mark-read round-trip above lands.
                    const isOpen = chatSelId === c.id;
                    const showUnread = c.unreadCount > 0 && !isOpen;
                    // The preview is now guaranteed to be a message that really
                    // went out or really came in (see store addMessage /
                    // refreshLastMessage). A draft Will is holding is a
                    // different fact about the chat, so it is shown as its own
                    // small marker rather than by overwriting the preview with
                    // words the customer never received.
                    const draftWaiting = draftWaitingFor.has(c.id);
                    return (
                    <div key={c.id} className={`citem ${isOpen ? 'sel' : ''} ${showUnread ? 'hasunread' : ''}`} onClick={() => openChat(c.id)}>
                      <div className="cav">{avatarFor(c.name)}</div>
                      <div className="cinfo">
                        <div className="cn"><b>{phoneOf(c.waId)}</b><time>{chatListTime(c.lastCustomerMsgAt)}</time></div>
                        <div className="cm">
                          {draftWaiting && (
                            <span className="cdraft" title={`${ASSISTANT_NAME} has written a reply for this chat and is waiting for you to approve it. It has NOT been sent.`}>✎ draft waiting</span>
                          )}
                          {c.lastMessagePreview}
                        </div>
                      </div>
                      {showUnread
                        ? <span className="unreadbadge" title={`${c.unreadCount} unread`}>{c.unreadCount > 99 ? '99+' : c.unreadCount}</span>
                        : <span className="cstate" style={{ ['--sc' as string]: stageColorOf(c.state) }}>{stageLabelOf(c.state)}</span>}
                    </div>
                    );
                  })}
                </div>
              </div>
              <div className="chatpane">
                {chatSel ? (
                  <>
                    <div className="chathead">
                      <div className="cav">{avatarFor(chatSel.name)}</div>
                      <div className="chtitle">
                        {/* Normal weight, like WhatsApp shows a contact. */}
                        <span className="chnum">{phoneOf(chatSel.waId)}</span>
                        <div className="st">
                          {/* The stage badge is a dropdown: click it to move the
                              customer to ANY pipeline stage, forward or back. */}
                          <div className="stagepick">
                            <button
                              type="button"
                              className="cstate cstate-btn"
                              style={{ ['--sc' as string]: stageColorOf(chatSel.state) }}
                              onClick={() => setStageMenuOpen((o) => !o)}
                              title="Move stage"
                            >
                              {/* The label is its own span so the hover underline
                                  lands on the word alone — see .cstate-label. */}
                              <span className="cstate-label">{stageLabelOf(chatSel.state)}</span>
                              <span className="cstate-caret">▾</span>
                            </button>
                            {stageMenuOpen && (
                              <>
                                <div className="stagemenu-backdrop" onClick={() => setStageMenuOpen(false)} />
                                {/* This offers ONLY the same eight options as the
                                    pipeline strip at the top of the dashboard — same
                                    names, same order, nothing more. The eighteen
                                    internal states behind them are not exposed here
                                    at all (there used to be a "Move anywhere…" escape
                                    hatch into that list; it broke the promise that
                                    this menu is exactly the pipeline, so it's gone). */}
                                <div className="stagemenu">
                                  {(() => {
                                    const nextStates = TRANSITIONS[chatSel.state] ?? [];
                                    const move = async (s: CustomerState) => {
                                      setStageMenuOpen(false);
                                      if (s === chatSel.state) return;
                                      // Only an out-of-order correction forces.
                                      const force = !nextStates.includes(s);
                                      const r = await act({ action: 'set_state', customerId: chatSel.id, state: s, force });
                                      say(r?.ok ? `Moved to ${stageLabelOf(s)}` : `❌ ${r?.error ?? 'could not move'}`);
                                      loadChat(chatSel.id); refresh();
                                    };
                                    return STAGE_GROUPS.map((g) => {
                                      const states = g.states as readonly CustomerState[];
                                      const isHere = states.includes(chatSel.state);
                                      // Landing on a group means its first state,
                                      // unless we are already inside the group, in
                                      // which case the row is just a marker.
                                      const target = states[0];
                                      return (
                                        <button
                                          key={g.id}
                                          type="button"
                                          className={`stagemenu-item${isHere ? ' is-current' : ''}`}
                                          onClick={() => { if (!isHere) move(target); else setStageMenuOpen(false); }}
                                        >
                                          <span className="stagemenu-dot" style={{ background: g.color }} />
                                          <span className="stagemenu-lbl">{g.label}</span>
                                          {isHere && <span className="stagemenu-check">✓</span>}
                                        </button>
                                      );
                                    });
                                  })()}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={`aitoggle ${chatSel.aiPaused ? 'off' : ''}`} onClick={async () => {
                        await act({ action: 'toggle_ai', id: chatSel.id, value: chatSel.aiPaused });
                        say(chatSel.aiPaused ? `${ASSISTANT_NAME} resumed from current state` : `${ASSISTANT_NAME} paused, you have the wheel`);
                        refresh();
                      }}>
                        <span className="lbl">{chatSel.aiPaused ? `${ASSISTANT_NAME} Paused` : `${ASSISTANT_NAME} Active`}</span>
                        <div className="switch" />
                      </div>
                      {/* Same delete action as the ✕ in the chat list, but reachable
                          from inside an open chat too — on mobile the list is hidden
                          once a chat is open, so that button is otherwise unreachable. */}
                      <button
                        type="button"
                        className="tdismiss"
                        title="Delete this chat"
                        style={{ marginLeft: 8 }}
                        onClick={() => {
                          if (!confirm(`Delete this chat with ${phoneOf(chatSel.waId)}? This removes it and its history for good.`)) return;
                          act({ action: 'delete_customer', customerId: chatSel.id }).then((r) => {
                            if (r?.ok) { setChatSelId(null); say('Chat deleted'); refresh(); }
                            else say(`❌ ${r?.error ?? 'could not delete'}`);
                          });
                        }}
                      >✕</button>
                    </div>
                    {/* One combined row: the stage action button (if any), Quick
                        fill numbers, and Follow-up nudges all inline together,
                        rather than three stacked rows. Scrolls sideways if it
                        doesn't fit rather than wrapping, same as Quick fill
                        always did. */}
                    <div className="tplchips">
                      {/* Quick send: numbered buttons instead of long labels, so the
                          row never overflows and needs no sideways scroll. Always
                          first/leftmost, before the stage action button and
                          Follow-up — a fixed anchor so "1-4" is always in the same
                          place regardless of what else is showing. Hover a number
                          to see the full text (native tooltip). Clicking a number
                          does NOT send — it drops the text into the compose box so
                          you can read it, edit it, and send it yourself. */}
                      {QUICK_TEMPLATES.map((key, i) => {
                        const t = data.templates.find((x) => x.key === key);
                        if (!t) return null;
                        const label = t.title.replace(/ \(.*\)/, '');
                        return <button key={key} className="chipbtn qsnum" title={label} aria-label={label} onClick={() => { setComposer(t.body); say(`Loaded: ${label} — edit and send`); }}>{i + 1}</button>;
                      })}
                      {/* Review-stage action: send the refund estimate + invoice
                          in one step. Only shown while the customer is in Review. */}
                      {chatSel.state === 'FORM_COMPLETE' && (
                        <button
                          type="button"
                          className="btn save"
                          style={{ padding: '5px 12px', fontSize: 11.5, flex: 'none' }}
                          onClick={() => { setEstimateFor(chatSel); setEstimateAmt(''); setEstimateLink(''); }}
                        >
                          Send Estimate + Invoice
                        </button>
                      )}
                      {/* Estimate-stage action: once the return has actually been
                          sent to the customer to sign, one click sends the "ready
                          for signature" confirmation and moves them on to
                          Signature. Only shown during Estimate. */}
                      {(chatSel.state === 'ESTIMATE_READY' || chatSel.state === 'FINAL_REVIEW') && (
                        <button
                          type="button"
                          className="btn save"
                          style={{ padding: '5px 12px', fontSize: 11.5, flex: 'none' }}
                          onClick={async () => {
                            if (!confirm(`Send the "ready for signature" message to ${phoneOf(chatSel.waId)} and move them to Signature?`)) return;
                            const r = await act({ action: 'send_signature', customerId: chatSel.id });
                            if (!r?.ok) { say(`❌ ${r?.error ?? 'could not send'}`); return; }
                            say('Sent — moved to Signature ✓'); loadChat(chatSel.id); refresh();
                          }}
                        >
                          ✍️ Send for Signature
                        </button>
                      )}
                      {/* Signature-stage action: once they've signed, one click
                          sends the lodged + review-request message and moves them
                          on to Completed. Only shown during Signature. */}
                      {chatSel.state === 'SIGNATURE_PENDING' && (
                        <button
                          type="button"
                          className="btn save"
                          style={{ padding: '5px 12px', fontSize: 11.5, flex: 'none' }}
                          onClick={async () => {
                            if (!confirm(`Send the "lodged successfully" message to ${phoneOf(chatSel.waId)} and move them to Completed?`)) return;
                            const r = await act({ action: 'send_lodged', customerId: chatSel.id });
                            if (!r?.ok) { say(`❌ ${r?.error ?? 'could not send'}`); return; }
                            say('Sent — moved to Completed ✓'); loadChat(chatSel.id); refresh();
                          }}
                        >
                          ✅ Mark Lodged
                        </button>
                      )}
                      {/* The nudges for this customer's stage, so a follow-up can be
                          sent after reading the conversation rather than only on the
                          scheduler's timer. Which three appear is decided by the
                          stage, so there is nothing to choose wrongly. Unlike Quick
                          fill these cannot go through the composer: the customer has
                          been quiet, so the message is outside Meta's 24h window and
                          has to leave as the approved template, word for word. */}
                      {(() => {
                        const flow = flowForState(chatSel.state);
                        if (!flow) return null;
                        const keys = FLOW_TEMPLATES[flow];
                        return (
                          <>
                            {keys.map((key) => {
                              const t = data.templates.find((x) => x.key === key);
                              if (!t) return null;
                              const short = t.title.split('·').pop()?.trim() ?? t.title;
                              const preview = t.body.replace(/\{\{1\}\}/g, chatSel.name?.split(/\s+/)[0] || 'there');
                              return (
                                <button
                                  key={key}
                                  className="chipbtn"
                                  title={preview}
                                  disabled={acted.has(key + chatSel.id)}
                                  onClick={() => once(key + chatSel.id, async () => {
                                    if (!confirm(`Send this to ${chatSel.name ?? phoneOf(chatSel.waId)} now?\n\n${preview}`)) return;
                                    const r = await act({ action: 'send_followup', customerId: chatSel.id, id: key });
                                    say(r?.ok ? 'Follow-up sent ✓' : `❌ ${r?.error ?? (r?.blocked?.length ? r.blocked.join(', ') : 'not sent')}`);
                                    loadChat(chatSel.id); refresh();
                                  })}
                                >{short}</button>
                              );
                            })}
                          </>
                        );
                      })()}
                    </div>
                    <div className="msgs" ref={msgsRef}>
                      {(() => {
                        const visible = [...chatMsgs].filter((m) => m.status !== 'DISCARDED' && m.status !== 'BLOCKED')
                          // A draft awaiting approval always renders at the BOTTOM,
                          // after every real message, so it can never appear stranded
                          // in the middle of the thread when the customer sent more
                          // messages after it was drafted. Stable sort keeps normal
                          // messages in their time order.
                          .sort((a, b) => (a.status === 'PENDING_APPROVAL' ? 1 : 0) - (b.status === 'PENDING_APPROVAL' ? 1 : 0));

                        // WhatsApp-real: a reaction is a heart/thumbs-up ON another
                        // message, not a message of its own. Match it to the bubble
                        // it landed on via Meta's provider id, so it renders as a
                        // small badge on that exact bubble instead of a floating
                        // line unattached to anything.
                        const reactionByTargetProviderId = new Map<string, MessageRow>();
                        for (const m of visible) {
                          const to = m.meta?.reaction?.to;
                          if (to) reactionByTargetProviderId.set(to, m);
                        }
                        const matchedReactionIds = new Set<string>();
                        for (const m of visible) {
                          const pid = m.meta?.providerId;
                          const r = pid ? reactionByTargetProviderId.get(pid) : undefined;
                          if (r) matchedReactionIds.add(r.id);
                        }

                        const out: JSX.Element[] = [];
                        let lastDay = '';
                        for (const m of visible) {
                          const dayKey = melDayKey(m.createdAt);
                          if (dayKey !== lastDay) {
                            lastDay = dayKey;
                            out.push(<div key={`day-${dayKey}`} className="daysep"><span>{melDayLabel(m.createdAt)}</span></div>);
                          }

                          if (m.status === 'PENDING_APPROVAL') {
                            out.push(
                              <div key={m.id} className="msg out" style={{ opacity: 0.85, border: '1px dashed rgba(122,99,232,.6)' }}>
                                {m.body}
                                <div className="mt"><span className="ai">✎ awaiting your approval</span></div>
                                <div className="abtns" style={{ marginTop: 8 }}>
                                  <button className="btn approve" disabled={acted.has(m.id)} onClick={() => once(m.id, async () => { const r = await act({ action: 'approve_message', id: m.id }); say(r?.ok ? 'Approved & sent ✓' : (r?.error ? `❌ Not sent: ${r.error}` : r?.blocked?.length ? `❌ Blocked: ${r.blocked.join(', ')}` : 'Draft blocked: situation changed')); loadChat(chatSel.id); refresh(); })}>✓ Approve</button>
                                  <button className="btn ghost" disabled={acted.has(m.id)} onClick={() => once(m.id, async () => { await act({ action: 'discard_message', id: m.id }); say('Draft discarded'); loadChat(chatSel.id); refresh(); })}>✕ Discard</button>
                                </div>
                              </div>,
                            );
                            continue;
                          }
                          if (m.meta?.reaction) {
                            // Attached to its target bubble below — skip the
                            // standalone line. Only an orphaned reaction (no
                            // matching provider id, e.g. older data from before
                            // provider ids were recorded) still falls back to a
                            // quiet line so nothing silently disappears.
                            if (matchedReactionIds.has(m.id)) continue;
                            out.push(
                              <div key={m.id} className="sysline" style={{ fontSize: 15 }}>
                                {m.meta.reaction.emoji ? `${m.meta.reaction.emoji}  reacted to your message` : 'removed their reaction'}
                              </div>,
                            );
                            continue;
                          }
                          const reactionHere = m.meta?.providerId ? reactionByTargetProviderId.get(m.meta.providerId) : undefined;
                          out.push(
                            <div key={m.id} className={`msg ${m.direction === 'IN' ? 'in' : 'out'}`}>
                              {reactionHere?.meta?.reaction?.emoji && (
                                <span className="msgreact" title="Reacted to this message">{reactionHere.meta.reaction.emoji}</span>
                              )}
                              {m.meta?.media && <Attachment media={m.meta.media} />}
                              {/* With the attachment itself on screen, the stored
                                  "📷 [Photo]" placeholder is noise — the caption
                                  rides along with the attachment. */}
                              {m.meta?.media ? null : m.body}
                              <div className="mt">{m.author === 'AI' && <span className="ai">{ASSISTANT_NAME}</span>}{m.author === 'HUMAN' && <span className="ai" style={{ color: 'var(--sig)' }}>you</span>}{new Date(m.createdAt).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', timeZone: 'Australia/Melbourne' })} {m.direction === 'OUT' && (m.status === 'FAILED' ? <span style={{ color: 'var(--crit)', fontWeight: 600 }}>⚠ not delivered</span> : m.status === 'QUEUED' ? '⏳' : '✓✓')}</div>
                            </div>,
                          );
                        }
                        return out;
                      })()}
                      {chatMsgs.length === 0 && <div className="sysline">No messages stored for this customer yet</div>}
                    </div>
                    <div className="composer">
                      {/* WhatsApp-style compose box: multi-line, grows with the
                          text, keeps line breaks (so a quick-fill template or a
                          typed paragraph is never flattened into one blob).
                          Enter sends, Shift+Enter adds a new line. */}
                      <textarea
                        placeholder={`Reply as yourself (pauses ${ASSISTANT_NAME} for this chat)…`}
                        value={composer}
                        rows={1}
                        onChange={(e) => { setComposer(e.target.value); const el = e.target as HTMLTextAreaElement; el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 140) + 'px'; }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                            e.preventDefault();
                            sendManual(chatSel.id, composer);
                            setComposer('');
                            (e.target as HTMLTextAreaElement).style.height = 'auto';
                          }
                        }} />
                      <button className="send" onClick={() => { sendManual(chatSel.id, composer); setComposer(''); }}>➤</button>
                    </div>
                  </>
                ) : <div className="sysline" style={{ margin: 20 }}>Select a conversation</div>}
              </div>
            </div>
          </section>
        )}


        {view === 'tasks' && (
          <section className="view active">
            <h2 className="vt">Tasks</h2>
            <div className="vsub">Everything that needs your attention, in one place.</div>

            {/* This was a separate Outbox tab. It counted the drafts awaiting
                approval PLUS the subset of these same tasks whose reason was a
                blocked or failed send, so those items were listed twice with two
                badges and there was no single answer to "what is left for me".
                The drafts moved here; the blocked ones were already here. */}
            {/* Jo, 26 Aug: "lose the label, keep the number" — he watches this
                go 0 -> 1 -> 2 and the six words in front of it were noise on a
                screen he reads twenty times a day. The words survive as the
                accessible name and the hover title, where they cost nothing.
                27 Aug: the ✎ mark that stood in for the label went too — it
                marked nothing the badge does not already say, and next to a
                bare count it read as an edit affordance that is not there. */}
            <div className="secthead">
              <span
                className={`pcount ${pendingDrafts.length ? 'on' : ''}`}
                title={`${pendingDrafts.length} ${pendingDrafts.length === 1 ? 'draft is' : 'drafts are'} awaiting your approval`}
                aria-label={`${pendingDrafts.length} ${pendingDrafts.length === 1 ? 'draft' : 'drafts'} awaiting your approval`}
              >{pendingDrafts.length}</span>
            </div>
            {pendingDrafts.map((m) => {
              const c = custById(m.customerId);
              return (
                <div key={m.id} className="obcard">
                  <div className="obhead">
                    {/* The number, always. It used to fall back to the WhatsApp profile
                        name whenever the customer was not in the loaded list, which
                        is how "holly brazier" ended up as a card heading — a name
                        that is not unique, not searchable, and not how anything else
                        here identifies anyone. */}
                    <span className="obwho">{(() => { const w = c?.waId ?? m.waId; return w ? phoneOf(w) : 'Customer'; })()}</span>
                    {c && <span className="cstate" style={{ ['--sc' as string]: stageColorOf(c.state) }}>{stageLabelOf(c.state)}</span>}
                    <span className="obtime">{timeAgo(m.createdAt)} ago</span>
                  </div>
                  <div className="obbody">{m.body}</div>
                  <div className="obbtns">
                    <button className="btn approve" disabled={acted.has(m.id)} onClick={() => once(m.id, async () => { const r = await act({ action: 'approve_message', id: m.id }); say(r?.ok ? 'Approved & sent ✓' : (r?.error ? `❌ Not sent: ${r.error}` : r?.blocked?.length ? `❌ Blocked: ${r.blocked.join(', ')}` : 'Draft blocked: situation changed')); refresh(); })}>✓ Approve & send</button>
                    <button className="btn ghost" disabled={acted.has(m.id)} onClick={() => once(m.id, async () => { await act({ action: 'discard_message', id: m.id }); say('Draft discarded'); refresh(); })}>✕ Discard</button>
                    <button className="btn ghost" onClick={() => { setView('chats'); openChat(m.customerId); }}>Open chat →</button>
                  </div>
                </div>
              );
            })}

            {openTasks.length > 0 && pendingDrafts.length > 0 && (
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink2)', margin: '18px 0 8px', letterSpacing: '.02em' }}>
                ⚠ Needs a decision ({openTasks.length})
              </div>
            )}
            {openTasks.map((t) => {
              const col = t.severity === 'URGENT' ? 'var(--crit)' : 'var(--warn)';
              // No icon: the severity chip already carries the colour and the
              // word, so an emoji next to it said the same thing twice.
              const draft = taskDrafts[t.id] ?? t.suggestedReply ?? '';
              return (
                <div key={t.id} id={'task-' + t.id} className="task" style={{ ['--tc' as string]: col, ...(focusTaskId === t.id ? { outline: '2px solid var(--brand1)', outlineOffset: '2px' } : {}) }}>
                  <div className="tbody">
                    {/* Identity first and small: severity, who, when. The X sits
                        opposite it so a task you do not want can go in one click. */}
                    <div className="trow">
                      <span className="tsev">{t.severity}</span>
                      {/* Show the WhatsApp number (formatted per country, like the
                          chat) rather than the profile name. */}
                      <span className="tmeta">{(() => { const c = custById(t.customerId); const w = c?.waId ?? t.waId; return w ? phoneOf(w) : 'System'; })()} · {timeAgo(t.createdAt)} ago</span>
                      <button className="tdismiss" title="Dismiss, I am not answering this"
                        onClick={async () => { await act({ action: 'resolve_task', id: t.id }); say('Dismissed'); refresh(); }}>✕</button>
                    </div>
                    {/* One line. You are scanning for what this person wants, not
                        reading an essay; the full text is on hover. */}
                    <div className="ttitle" title={t.reason}>{shortReason(t.reason)}</div>
                    {t.context && <div className="tctx">&quot;{t.context}&quot;</div>}
                    {t.customerId && (
                      <div className="taskreply">
                        <div className="mlabel" style={{ margin: '10px 0 5px' }}>Suggested answer</div>
                        <textarea className="edit" style={{ minHeight: 64 }} value={draft}
                          onChange={(e) => setTaskDrafts((d) => ({ ...d, [t.id]: e.target.value }))} />
                      </div>
                    )}
                    <div className="tbtns">
                      {t.customerId && <button className="btn take" disabled={acted.has(t.id) || !draft.trim()} onClick={() => once(t.id, async () => { const r = await act({ action: 'send_task_reply', id: t.id, body: draft }); say(r?.ok ? 'Reply sent & task resolved ✓' : `❌ Not sent: ${r?.error ?? r?.message ?? 'WhatsApp rejected it'}`); refresh(); })}>➤ Send Reply</button>}
                      {t.customerId && <button className="btn ghost" onClick={async () => { setView('chats'); openChat(t.customerId!); await act({ action: 'resolve_task', id: t.id }); refresh(); }}>Open Chat</button>}
                      {!t.customerId && <button className="btn ghost" onClick={async () => { await act({ action: 'resolve_task', id: t.id }); say('Marked resolved ✓'); refresh(); }}>Mark Resolved</button>}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {view === 'library' && (
          <section className="view active">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <h2 className="vt">Message Library</h2>
                <div className="vsub">Every automated message lives here. Tap to edit.</div>
              </div>
              <button className="btn save" onClick={() => setNewTpl({ title: '', category: 'Custom', body: '' })}>+ New Message</button>
            </div>
            {/* The old crude "recurring unanswered question" suggestions box
                was removed: the daily Library-suggestions digest (8am
                Melbourne) does this properly now — it checks the actual
                Library on every customer message answered, not just repeated
                escalations, and produces a real polished draft via the
                mining model instead of a bracketed placeholder. Its output
                lands directly below as ordinary Learned Answer drafts. */}
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <div className="libcat">{cat}<span className="n">{items.length}</span></div>
                <div className="libgrid">
                  {items.map((t) => (
                    <div key={t.id} className="tpl" onClick={() => { setTpl(t); setTplText(t.body); }}>
                      <span className="pencil">✎</span>
                      <div className="tn">{t.title}{t.requiresMeta && <span className="chip" style={{ fontSize: 9 }} title="Requires Meta template approval">META ✓</span>}</div>
                      <div className="tv">{t.body}</div>
                      <div className="tf"><span className="edited">● live</span><span>v{t.versions} · {timeAgo(t.updatedAt)} ago</span></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Learned Answers: everything Will has picked up from real
                conversations and approved into the Knowledge Base. This used to
                live ONLY on the Learning tab, invisible from here even though it
                is exactly as "automated message" as anything above — Will reads
                from it live, the same as the approved templates. Every entry
                shown here, active or still a draft, is editable in place. */}
            <div className="libcat">Learned Answers<span className="n">{knowledge.active.length + knowledge.drafts.length}</span></div>
            {knowledge.active.length === 0 && knowledge.drafts.length === 0 && (
              <div className="sysline" style={{ margin: '6px 0 14px' }}>Nothing learned yet. Answers Will picks up from real conversations will show up here.</div>
            )}
            <div className="libgrid">
              {knowledge.active.map((k) => (
                <div key={k.id} className="tpl" onClick={() => { setKnow(k); setKnowText(k.answer); }}>
                  <span className="pencil">✎</span>
                  <div className="tn">{k.intent || k.question}</div>
                  <div className="tv">{k.answer}</div>
                  <div className="tf"><span className="edited">● live</span><span>{k.source === 'manual' ? 'added by you' : 'learned'}</span></div>
                </div>
              ))}
              {knowledge.drafts.map((k) => (
                <div key={k.id} className="tpl" onClick={() => { setKnow(k); setKnowText(k.answer); }}>
                  <span className="pencil">✎</span>
                  <div className="tn">{k.intent || k.question}</div>
                  <div className="tv">{k.answer}</div>
                  <div className="tf"><span className="edited" style={{ background: 'var(--warn)' }}>● pending approval</span></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Everyone who is scheduled to receive a follow-up, any flow, soonest
            first. This replaced the "Regenerate report" button: that button
            rebuilt a static analysis, while what is actually useful before a
            message goes out is knowing WHO is about to get one. The list keeps
            itself current (20s while this view is open) and each row opens that
            customer's chat, which is what you want next. */}
        {view === 'followups' && (
          <section className="view active">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <h2 className="vt">Scheduled Follow-ups</h2>
                <div className="vsub">
                  {/* The count leads, in bold, because it is the fact Jo scans
                      for — how many are about to go out. It is rendered only
                      once the list has loaded, so the line never flashes a
                      stale or zero number while the fetch is in flight. */}
                  {followups && followups.length > 0 && (
                    <strong style={{ color: 'var(--ink)', fontWeight: 650 }}>({followups.length}) </strong>
                  )}
                  Everyone is queued for a nudge.
                </div>
              </div>
            </div>

            {followups === null && <div className="sysline" style={{ margin: '20px 0' }}>Loading the queue…</div>}
            {followups !== null && followups.length === 0 && (
              <div className="sysline" style={{ margin: '20px 0' }}>
                Nobody is scheduled for a follow-up right now. Nudges are armed automatically when a customer goes quiet at a stage that has a cadence.
              </div>
            )}

            <div className="rowlist">
              {(followups ?? []).map((f) => {
                const flowLabel = f.flow ? FLOW_LABELS[f.flow] ?? f.flow : 'Follow-up';
                const stageColor = stageColorOf(f.state);
                return (
                  <div
                    key={f.jobId}
                    className="rowcard"
                    style={{ ['--gc' as string]: stageColor }}
                    title={`Open the chat with ${phoneOf(f.waId)}`}
                    onClick={() => { setView('chats'); openChat(f.customerId); }}
                  >
                    <div className="rc-main">
                      <div className="rc-top">
                        <span className="cname">{phoneOf(f.waId)}</span>
                      </div>
                      {/* Jo, 27 Aug: "add what you are actually going to send me
                          in the nudge." The row used to name the Library entry,
                          which tells you where the message lives but not what it
                          says — so checking a queue of 22 meant opening 22
                          entries. This is the delivered text, {{1}} already
                          replaced by the greeting name the scheduler will use,
                          so what is on screen is what lands on their phone. The
                          Library title moved to the hover, where it is still
                          there when you need to go and edit the entry. */}
                      <div
                        className="fu-body"
                        title={f.templateTitle ?? f.templateKey ?? undefined}
                      >{f.body ?? 'This message is no longer in the Library — nothing will be sent.'}</div>
                    </div>
                    {/* Out of .rc-top and into its own column. As a direct child
                        of the row card (align-items:center) it sits on the row's
                        centre line rather than riding on the first line of a
                        text block that is now several lines tall. */}
                    <span className="chip fu-flow">{flowLabel} · #{f.seq + 1}</span>
                    <div className="rc-side">
                      {/* The stage pill was removed here on Jo's instruction,
                          27 Aug. It repeated the flow chip next to it — a
                          "Before payment" nudge is by definition queued for a
                          lead — so it was a second colour saying the first
                          one's news. The stage still drives the row's left
                          border colour (--gc), which is where it earns its
                          keep. */}
                      <span className="fu-when">
                        <b>{untilLabel(f.runAt)}</b>
                        <small>{sendAtLabel(f.runAt)}</small>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {view === 'insights' && (
          <section className="view active">
            <h2 className="vt">System &amp; Costs</h2>
            <div className="vsub">Live from the system.</div>
            <div className="igrid">
              {/* ────────────────────────────────────────────────────────────
                  "Why Will Handed Chats To You" was removed here on 27 Aug,
                  on Jo's instruction.

                  It counted the reasons Will gave up and asked for a person,
                  most common first, and said what would move each number. The
                  counts were real and the remedies were honest. It went for a
                  simpler reason: the Decision Log already lists every one of
                  those handoffs individually, with the same remedy attached
                  (handoff-reasons.ts, one classifier, still the only one), and
                  a per-customer row you can act on beats an aggregate you
                  cannot. This card was the same information with the customer
                  taken out of it.

                  handoff-reasons.ts is NOT dead: the Decision Log is its other
                  and now only caller.
                  ──────────────────────────────────────────────────────────── */}

              {/* ────────────────────────────────────────────────────────────
                  "Deep Conversation Analysis" was removed here on 27 Aug.

                  It was not redundant — it was hollow. The card advertised
                  "phrasing that converts vs loses, tone per language, the exact
                  message where each customer dropped, objection win rates,
                  suggested new templates", and none of it was ever implemented:
                  /api/will/report returns `qualitative: null` whenever an API
                  key IS configured (route.ts:92, "wired on demand"), and a
                  "connect a key" note when it is not. There was no code path
                  that produced the analysis in either case. The old "Regenerate
                  Report" button re-fetched the same quantitative numbers and
                  still got null back.

                  It also carried a five-row preview of scheduled follow-ups
                  under a heading about conversation analysis — two unrelated
                  things in one box, and the preview is now its own Follow-ups
                  page with the full list.

                  What the card promised does now exist, properly scoped: Lost
                  Leads reads each non-converting conversation through Claude and
                  reports why it failed and what would have changed it.

                  /api/will/report itself is NOT removed — the funnel, the
                  variant tests, the conversion rate and the handoff reasons on
                  this same screen all still read it.
                  ──────────────────────────────────────────────────────────── */}

              {/* ────────────────────────────────────────────────────────────
                  System & Costs, 26 Aug.

                  Removed on Jo's instruction: the Customers row (already the
                  first KPI on the pipeline) and the Open tasks row (already the
                  sidebar badge, the bell badge, and the whole Tasks view).

                  Added: what Claude has actually cost, and what is actually
                  broken. Jo's test for the fault list is that he can screenshot
                  this card and whoever reads it knows what to do — so each
                  fault carries the component, the provider's own error text,
                  when it last happened, how many times, what it means, and the
                  next action. Full width for that reason.
                  ──────────────────────────────────────────────────────────── */}
              <div className="panel syspanel">
                <div className="costrow"><span>Brain ({ASSISTANT_NAME})</span><b>{health?.usingMock ? 'mock (no API key)' : 'Claude API'}</b></div>
                <div className="costrow"><span>Auto-resolved by {ASSISTANT_NAME}</span><b>{(() => { const total = data.customers.length; if (!total) return '—'; const escalatedIds = new Set(data.tasks.filter((t) => t.customerId).map((t) => t.customerId)); const never = total - escalatedIds.size; return Math.round((never / total) * 100) + '%'; })()}</b></div>
                <div className="costrow"><span>Messages in library</span><b>{data.templates.length}</b></div>

                {/* Jo, 27 Aug: the money sits with the other headline facts,
                    directly under the Library count — not two headings further
                    down. It is the number he actually came to this panel for,
                    and it was below the fold of his own screenshot.

                    THE FLAG IS NOT DECORATION. There is no billing feed wired
                    into this system. The only record of paid usage is the daily
                    counter migration 029 added, and it counts DECISIONS, not
                    dollars — so this is decisions × an assumed rate
                    (ASSUMED_USD_PER_DECISION in lib/will/system-report.ts) and
                    it says so on the row, in the caveat under it, and in the
                    hover. A dollar figure on a dashboard gets quoted; this one
                    must never be quoted as a bill. */}
                {system?.usage && (
                  <>
                    <div className="costrow">
                      <span>Spend <span className="estflag">estimate only</span></span>
                      <b title="Not a bill — counted decisions times an assumed per-decision rate. The real number is in the Anthropic console.">
                        {system.usage.callsTotal === 0 ? '—' : `≈ US$${system.usage.estimatedUsd.toFixed(2)}`}
                      </b>
                    </div>
                    {/* The long "not a bill" paragraph was removed here on
                        27 Aug. The caveat itself is NOT optional — a dollar
                        figure on a dashboard gets quoted, and this one is
                        counted decisions times an assumed rate, not a bill. It
                        survives where it cannot be skimmed past: the ESTIMATE
                        ONLY flag on the row, and the full explanation on the
                        number's hover. What went was six lines of small grey
                        text under a single number. */}
                  </>
                )}

                {/* The "Claude usage" rows — decisions today, decisions counted
                    all time — were removed here on 27 Aug, on Jo's instruction.
                    They were the working of the estimate above rather than a
                    fact he acts on: he wants to know roughly what it is costing,
                    and "374 decisions over 8 days" is not that. The counters
                    themselves are untouched — ai-budget.ts still counts every
                    paid decision and still stops Will at the daily cap, and the
                    estimate above is still computed from them. This dropped the
                    display, not the accounting. */}

                {/* ── What is broken ── */}
                <div className="syshead">System faults</div>
                {(() => {
                  // Two sources, deliberately. The health checks say what is
                  // failing RIGHT NOW (they re-probe every 45s); will_audit says
                  // what has failed and how often, which a live probe cannot
                  // know. `lastPersistError` is not used by either: it is a
                  // per-instance module variable, so it reports whatever one
                  // serverless instance happened to see.
                  const CHECK_INFO: Record<string, { name: string; meaning: string; action: string }> = {
                    store: {
                      name: 'Database (Supabase)',
                      meaning: 'The last write to the database failed. Customers, messages and tasks may not be saving.',
                      action: 'Check the Supabase project is up and the service-role key is still valid, then reload this page.',
                    },
                    schema: {
                      name: 'Database schema (migrations)',
                      meaning: 'The database is missing columns or tables this code writes to. Brand-new customers are being dropped as they arrive.',
                      action: 'Run the pending files in supabase/migrations, oldest first. This has already cost 105 real leads once.',
                    },
                    guard: {
                      name: 'Policy guard',
                      meaning: 'The guard failed its own self-test: it did not block a message it is built to block. Nothing is checking what Will says.',
                      action: `Press Pause ${ASSISTANT_NAME} in the header, then get the guard green before resuming.`,
                    },
                    engine: {
                      name: `Brain (${ASSISTANT_NAME})`,
                      meaning: `${ASSISTANT_NAME} has no Claude key, so every reply is coming from the built-in mock brain instead — a short list of fixed answers, not a model reading the conversation. Customers are still getting replies, which is exactly what makes this easy to miss.`,
                      action: 'Set ANTHROPIC_API_KEY in the Vercel project settings and redeploy. If it WAS set and this has just appeared, the key has expired or been revoked — check the Anthropic console.',
                    },
                    scheduler: {
                      name: 'Scheduler',
                      meaning: 'The job queue could not be read, so follow-ups and the nightly check are not running.',
                      action: 'Same database as the row above — fix that first, this usually clears with it.',
                    },
                    cron: {
                      name: 'Scheduler cron',
                      meaning: 'The cron cannot authorise itself to /api/will/tick, so nothing scheduled ever runs: no follow-ups, no auto-close, no nightly consistency check.',
                      action: 'Set CRON_SECRET in the Vercel project settings and redeploy.',
                    },
                    whatsapp: {
                      name: 'WhatsApp connection',
                      meaning: 'Will is not properly connected to WhatsApp — messages are not being sent, not being received, or both.',
                      action: 'Open the WhatsApp pill in the header (or /crm/whatsapp/connect) and reconnect. The exact fault is in the error line above.',
                    },
                  };
                  const entries = Object.entries(health?.checks ?? {});
                  const live = entries
                    .filter(([, v]) => !v.ok)
                    .map(([k, v]) => ({ key: k, info: CHECK_INFO[k], detail: v.detail }))
                    .filter((x) => !!x.info);
                  const past = system?.faults ?? [];
                  if (!health && system === null) return <div className="mini" style={{ marginTop: 0 }}>Checking…</div>;
                  if (live.length === 0 && past.length === 0) {
                    // "Nothing is failing" is only worth anything if it says
                    // WHAT it checked. Jo, 27 Aug: "it should genuinely reflect
                    // if there is a fault — everything, every connection." It
                    // does, and always did: every one of these is a real probe
                    // (/api/will/health actually calls Meta, actually reads the
                    // database, actually runs a known-bad message through the
                    // guard), re-run every 45 seconds. But an all-clear with no
                    // list behind it is indistinguishable from an all-clear that
                    // checked nothing — which is exactly the failure this panel
                    // exists because of: 105 leads were lost while every dot on
                    // this dashboard stayed green. So the green state now shows
                    // its working.
                    return (
                      <>
                        <div className="mini" style={{ marginTop: 0 }}>
                          Nothing is failing, and nothing has failed in the last {system?.auditRowsRead ?? 0} recorded actions.
                        </div>
                        <div className="okchecks">
                          {entries.map(([k, v]) => (
                            <span key={k} className="okcheck" title={v.detail}>
                              ✓ {CHECK_INFO[k]?.name ?? k}
                            </span>
                          ))}
                        </div>
                        <div className="mini">Each one is a live probe, re-run every 45 seconds. the database is read, Meta is asked whether the number really works, and a known bad message is put through the guard to confirm it still blocks.</div>
                      </>
                    );
                  }
                  return (
                    <>
                      {live.map((f) => (
                        <div key={f.key} className="fault now">
                          <div className="fault-top">
                            <span className="fault-sev">FAILING NOW</span>
                            <span className="fault-comp">{f.info.name}</span>
                          </div>
                          <div className="fault-err">{f.detail}</div>
                          <div className="fault-mean">{f.info.meaning}</div>
                          <div className="fault-act"><b>Do this:</b> {f.info.action}</div>
                        </div>
                      ))}
                      {past.map((f) => (
                        <div key={f.key} className={`fault ${f.severity}`}>
                          <div className="fault-top">
                            <span className="fault-sev">{f.severity === 'critical' ? 'CUSTOMER AFFECTED' : 'WARNING'}</span>
                            <span className="fault-comp">{f.component}</span>
                            <span className="fault-n">×{f.count}</span>
                            <span className="fault-when" title={new Date(f.lastAt).toLocaleString('en-AU', { timeZone: MEL_TZ })}>
                              last {timeAgo(f.lastAt)} ago
                            </span>
                          </div>
                          <div className="fault-err">{f.error}</div>
                          <div className="fault-mean">{f.meaning}</div>
                          <div className="fault-act"><b>Do this:</b> {f.action}</div>
                        </div>
                      ))}
                      {past.length > 0 && (
                        <div className="mini">
                          Counts are within the last {system?.auditRowsRead ?? 0} recorded actions
                          {system && system.auditRowsRead >= system.faultWindow ? ' (the window this card reads)' : ''}, newest first.
                          Times are Melbourne.
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </section>
        )}

        {view === 'learning' && (
          <section className="view active">
            <h2 className="vt">Learning</h2>
            <div className="vsub">{ASSISTANT_NAME} improves from every conversation. Approve what works, and watch it get better over time.</div>

            {/* "Download every conversation" (transcript/JSON export) and the
                monthly "what customers wrote" email were removed per the
                owner's request — replaced by the daily Library-suggestions
                digest (scheduler.ts's DAILY_DIGEST job), which already does
                the analysis automatically instead of a manual download. */}

            <div className="panel" style={{ marginBottom: 12 }}>
              <h3>Your Goal: the best version of {ASSISTANT_NAME}</h3>
              <div className="psub">{ASSISTANT_NAME} keeps testing and improving until every lead converts.</div>
              {/* Jo, 27 Aug: the "12% → 100% · your target · fixed" pair and the
                  "88 points to go" line were both removed. All three said the
                  same thing three ways — the headline rate, the constant it is
                  measured against, and the subtraction between them — and none
                  of it was anything he could act on. The month-by-month bars
                  directly below survive untouched on his instruction: that is
                  the part that actually shows movement. */}

              {/* Month by month, so July can be compared with August. Every bar
                  is recomputed from the state history on each load — there is no
                  running number being reset on the 1st, which is why a past
                  month can never silently change or be lost.
                  A month's number is: of the leads that FIRST appeared that
                  month, how many ever went on to pay. Paying in a later month
                  still counts for the month they arrived in. */}
              <div className="monthhist">
                {/* Jo, 27 Aug: the question IS the heading. "Month by month"
                    described the shape of the table, which the table was
                    already showing; the question it answers was in the small
                    grey text on the right, where headings do not live. They
                    swapped, and the description went. */}
                <div className="mhhead">
                  <span>How many leads ended up paying?</span>
                </div>
                {monthly === null && <div className="mini">Loading the history…</div>}
                {monthly !== null && monthly.every((m) => m.leads === 0) && (
                  <div className="mini">No leads recorded in the last 12 months yet.</div>
                )}
                {monthly !== null && monthly.some((m) => m.leads > 0) && (
                  <div className="mhrows">
                    {monthly.map((m) => (
                      <div key={m.month} className={`mhrow ${m.leads === 0 ? 'empty' : ''}`}>
                        <span className="mhlabel">{m.label}</span>
                        <span className="mhbar"><span className="mhfill" style={{ width: `${Math.min(100, m.rate)}%` }} /></span>
                        <span className="mhrate">{m.leads === 0 ? '·' : `${m.rate}%`}</span>
                        <span className="mhcount">{m.leads === 0 ? 'no leads' : `${m.paid}/${m.leads}`}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="igrid">
              {/* The old "Suggestions to Approve" panel (recurring-escalation
                  scan) was removed here too — same reason as the Library tab:
                  the daily digest + Knowledge Base panel below now cover this
                  properly, on every answered message rather than only
                  repeated escalations. */}
              {/* KEPT, deliberately, 26 Aug. Jo asked whether the daily email
                  makes this card redundant. It does not: the 8am email is a
                  read-only copy of the drafts mined from yesterday, and a mined
                  entry stays status='draft' until a person approves it here.
                  retrieveKnowledge() only ever reads 'active' rows, so an
                  un-approved draft is invisible to Will — removing the approve
                  queue would leave the library permanently frozen at whatever
                  was already active. The subtitle now says so, so the question
                  answers itself next time. */}
              {/* ────────────────────────────────────────────────────────────
                  The "Knowledge Base" card was removed on 27 Aug at Jo's
                  instruction, after he was told what it costs.

                  What it was: the approve queue. A draft mined overnight is
                  invisible to the engine (knowledge.ts reads status='active'
                  only); approving it here was what made Will allowed to say it.

                  What still works, untouched:
                    - the 49 already-active answers. Will keeps using them.
                    - the 8am email. It is built from mineKnowledge() in
                      daily-digest.ts, which is unrelated to this card and
                      still runs, so the email keeps arriving with the same
                      content.
                    - the Library's "Learned Answers" section, which lists the
                      active answers and can still approve/edit/delete.

                  What is gone: this was the primary place to promote a draft.
                  The Library section remains as the other one. And note that
                  `action: 'add'` in /api/will/knowledge — which creates a new
                  answer from scratch — has NO button anywhere in the UI, so
                  writing an answer by hand is still not possible from the app.
                  ──────────────────────────────────────────────────────────── */}

              {/* ────────────────────────────────────────────────────────────
                  Decision Log, rebuilt 26 Aug around the question Jo actually
                  asks it.

                  It used to be the raw audit feed: "Owner · task resolved",
                  "Channel · inbound received", one line per thing that
                  happened. That is an engineer's log.

                  Rebuilt again 27 Aug, to Jo's own spec. He said the panel
                  answers one question — "why couldn't Will solve this himself?"
                  — and needs the WhatsApp number and two plain sentences, and
                  nothing else:

                      The customer wrote "…" and because <reason>, Will passed
                      it to you.
                      To stop this happening again: <what to do>

                  So what went: the severity pill (URGENT/REVIEW told him
                  nothing he could act on), "What Will wanted" (the draft is one
                  click away in Tasks, where it can actually be sent), and the
                  raw reason string underneath the plain one, which was the
                  engineer's log creeping back in a smaller font.

                  What the customer wrote comes from the task's own `context`,
                  which is exactly that text — captured when the handoff
                  happened, and merged when a burst of messages folds into one
                  task (service.ts, raiseOrUpdateTask). Never re-derived, never
                  guessed.

                  The "because" and the "to stop this" clauses come from
                  lib/will/handoff-reasons.ts, which is now written to produce
                  those two strings and nothing else. One classifier: a second
                  one here would have drifted from it inside a week.

                  ── CORRECTION, same day ──────────────────────────────────
                  Dropping the raw reason line went one step too far, and Jo
                  found it by asking a fair question: "if I send you this card,
                  will you know what went wrong?" From the card as it stood:
                  no.

                  The reason is that the classifier only recognises the twelve
                  reasons the SYSTEM writes. The commonest handoff by far is
                  not one of those — it is Will choosing `human_task` and
                  writing its own headline (engine.ts:150), which the model is
                  asked to make 5-8 readable words: "Asking if DASP is
                  included", "Confused about myGov login". Those never match a
                  pattern, so every one of them fell to the generic fallback
                  and the card said "Will had no approved answer for what they
                  asked" — a guess, sometimes wrong (a complex return is not an
                  unanswered question), and it threw away the single most
                  informative field on the row: Will's own account of why it
                  gave up, written at the moment it gave up.

                  So the fallback branch now prints THAT, labelled as Will's
                  own words rather than dressed up as the dashboard's. This is
                  not the engineer's log returning: the raw string in that case
                  IS plain English, because a model was asked for plain
                  English. Where the classifier does recognise the reason, the
                  clause it wrote still wins, because it is better.

                  The quote was cut at 58 characters too, which on a message
                  like "I was on a Working Holiday Maker visa from July 2025
                  until…" removes the question and keeps the preamble. It now
                  clamps by LINES in CSS, so short messages show whole and long
                  ones still cannot run away with the row.
                  ──────────────────────────────────────────────────────────── */}
              <div className="panel">
                {/* The HANDOFFS badge was removed here on 27 Aug. It counted
                    nothing, changed nothing and reflected no state — a static
                    string in warn orange, which is the colour this dashboard
                    uses for an actual warning (REVIEW tasks, warning-level
                    faults). It said "this panel lists handoffs" in the alarm
                    colour, next to a heading that already says so. */}
                <h3>Decision Log</h3>
                {/* Jo, 27 Aug: the standing subtitle and the empty state said
                    the same thing twice, once above every card and once in
                    place of them. They merged into the empty state, which is
                    the only moment the explanation is needed — when there are
                    cards, the cards are the explanation. */}

                {/* Clearing the backlog. Two clicks rather than a dialog: a
                    browser confirm() freezes the whole extension bridge, and a
                    button that changes into its own confirmation cannot be
                    clicked through by accident either.

                    IT SAYS WHAT IT REALLY DOES. These cards are the SAME rows as
                    the Tasks tab — one handoff, one item, and resolving it here
                    resolves it there. Hiding that would mean Jo clears the log
                    and silently empties his own to-do list. */}
                {(() => {
                  const open = data.tasks.filter((t) => t.status === 'OPEN');
                  if (open.length === 0) return null;
                  return (
                    <div className="hoff-clear">
                      <button
                        type="button"
                        className="hoff-open"
                        onClick={async () => {
                          if (!clearArmed) { setClearArmed(true); return; }
                          setClearArmed(false);
                          await Promise.all(open.map((t) => act({ action: 'resolve_task', id: t.id })));
                          say(`Cleared ${open.length}`);
                          refresh();
                        }}
                      >{clearArmed ? `Yes — clear all ${open.length}` : `Clear the ${open.length} showing`}</button>
                      {clearArmed && (
                        <>
                          <button type="button" className="hoff-open" onClick={() => setClearArmed(false)}>Cancel</button>
                          <span className="mini" style={{ margin: 0 }}>This also clears them from Tasks — they are the same items.</span>
                        </>
                      )}
                    </div>
                  );
                })()}
                {(() => {
                  // OPEN only. Jo, 27 Aug: "I click Resolved and it's gone."
                  // A resolved handoff is a thing that has been dealt with, and
                  // leaving it greyed out on the panel meant the log was 276
                  // rows of history with the handful that still matter buried
                  // inside it. It is not deleted — the row stays in the task
                  // table and the count still feeds the reports; it just stops
                  // being on the screen whose whole job is "what is left".
                  const handoffs = data.tasks
                    .filter((t) => t.status === 'OPEN')
                    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
                  const SHOWN = 25;
                  if (handoffs.length === 0) {
                    return <div className="mini">Nothing waiting. When {ASSISTANT_NAME} can&rsquo;t finish something, a card appears with everything needed to understand why. Screenshot it, send it over, and mark it Resolved.</div>;
                  }
                  return (
                    <>
                      {handoffs.slice(0, SHOWN).map((t) => {
                        const c = custById(t.customerId);
                        const e = explainHandoffReason(t.reason);
                        // EVERY message in the burst, not just the last one.
                        // A burst folds into one task joined by "---", and the
                        // question is as often in the second message as the
                        // first ("I was on a WHM visa from July 2025…" / "…so
                        // can I still claim the tax-free threshold?").
                        const wrote = (t.context ?? '')
                          .split(/\n?---\n?/)
                          .map((x) => x.trim())
                          .filter(Boolean);
                        // An unclassified reason means Will wrote it itself —
                        // the 5-8 word headline the model is asked for. Plain
                        // English already, and the only account of why THIS
                        // handoff happened, so it is quoted rather than
                        // paraphrased into the classifier's generic guess.
                        const willsOwnWords = e.kind === 'other' && t.reason.trim()
                          ? t.reason.trim().replace(/[.\s]+$/, '')
                          : null;
                        return (
                          <div key={t.id} className="hoff" style={{ ['--tc' as string]: t.severity === 'URGENT' ? 'var(--crit)' : 'var(--warn)' }}>
                            <div className="hoff-top">
                              {/* Jo's rule everywhere in this dashboard: the
                                  WhatsApp number is the identity, the profile
                                  name is only a hint beside it. */}
                              <span className="hoff-who">{(() => { const w = c?.waId ?? t.waId; return w ? phoneOf(w) : 'System — no customer'; })()}</span>
                              {c?.name && <span className="hoff-name">{c.name}</span>}
                              {/* Stage and language: two words that change what
                                  the right fix is. The same question from a
                                  lead and from someone who has already paid are
                                  different problems, and a German message that
                                  reached a person may have reached one because
                                  the guard cannot read German. */}
                              {c && <span className="hoff-meta">{stageLabelOf(c.state)}{c.lang ? ` · ${c.lang}` : ''}</span>}
                              <span className="hoff-when" title={new Date(t.createdAt).toLocaleString('en-AU', { timeZone: MEL_TZ })}>
                                {new Date(t.createdAt).toLocaleString('en-AU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: MEL_TZ })}
                              </span>
                            </div>

                            {wrote.length > 0 && (
                              <div className="hoff-block">
                                <div className="hoff-k">What arrived</div>
                                {wrote.map((line, i) => {
                                  // A stand-in the webhook wrote is described as
                                  // an event; only the customer's own words are
                                  // put in quotation marks. Quoting our own
                                  // "[Message — open WhatsApp to view]" back as
                                  // theirs was both false and, on the one
                                  // handoff that means "there is nothing to
                                  // read", actively misleading.
                                  const asEvent = describeSystemPlaceholder(line);
                                  if (asEvent) {
                                    const caption = captionAfterPlaceholder(line);
                                    return (
                                      <div key={i} className="hoff-event">
                                        {asEvent}. {ASSISTANT_NAME} reads text, so there was nothing here for him to work with — open WhatsApp to see it.
                                        {/* A caption IS the customer's own words,
                                            so it is quoted even though the thing
                                            in front of it is not. */}
                                        {caption && <span className="hoff-quote-inline"> They added: &ldquo;{caption}&rdquo;</span>}
                                      </div>
                                    );
                                  }
                                  return <div key={i} className="hoff-quote">&ldquo;{line}&rdquo;</div>;
                                })}
                              </div>
                            )}

                            <div className="hoff-block">
                              <div className="hoff-k">Why {ASSISTANT_NAME} stopped</div>
                              <div className="hoff-v">
                                {willsOwnWords
                                  ? <>{ASSISTANT_NAME}&apos;s own words: <span className="hoff-quote-inline">&ldquo;{willsOwnWords}&rdquo;</span></>
                                  : e.because.charAt(0).toUpperCase() + e.because.slice(1)}
                              </div>
                              {/* The raw reason, always, and this is the line
                                  that makes a screenshot of this card diagnosable.
                                  It carries the exact rule codes on a guard block
                                  — FORBIDDEN_AMOUNT:50.00, MYGOV_TROUBLESHOOTING —
                                  which is the difference between "the guard fired"
                                  and knowing WHICH pattern fired and whether it was
                                  right to. It reads as machine text because it is;
                                  it is small, last, and labelled as the technical
                                  detail rather than dressed up as prose. */}
                              <div className="hoff-raw" title={t.reason}>{t.reason}</div>
                            </div>

                            {/* What Will wanted to send. On a guard block this
                                IS the evidence: the rule refused this exact
                                text, so whether the rule was too broad can only
                                be judged by reading it. */}
                            {t.suggestedReply?.trim() && (
                              <div className="hoff-block">
                                <div className="hoff-k">What {ASSISTANT_NAME} wanted to send</div>
                                <div className="hoff-quote">&ldquo;{t.suggestedReply.trim()}&rdquo;</div>
                              </div>
                            )}

                            <div className="hoff-prevent"><b>To stop this happening again:</b> {e.prevent}</div>

                            <div className="hoff-actions">
                              <button
                                className="hoff-open hoff-done-btn"
                                onClick={async () => { await act({ action: 'resolve_task', id: t.id }); say('Resolved'); refresh(); }}
                              >✓ Resolved</button>
                              {t.customerId && (
                                <button className="hoff-open" onClick={() => { setView('chats'); openChat(t.customerId!); }}>
                                  Open this chat →
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {handoffs.length > SHOWN && (
                        <div className="mini">Showing the {SHOWN} most recent of {handoffs.length} handoffs.</div>
                      )}
                    </>
                  );
                })()}

                {/* ──────────────────────────────────────────────────────
                    The raw system feed was removed here on 27 Aug, on Jo's
                    instruction ("no need for this one either").

                    It was the original Decision Log: one line per action —
                    "Owner · task resolved", "Channel · inbound received" —
                    with the guard verdict and the learned answers attached.
                    That is an engineer's log, and it read like one. The
                    handoffs above answer the question he actually opens this
                    panel with, per customer, in words.

                    The audit rows themselves are UNTOUCHED: store.audit() still
                    writes every action, /api/will/activity still serves them,
                    and nightly maintenance still ages them out at 90 days. This
                    removed the screen, not the record — if a "why did Will say
                    THAT" investigation ever needs it, the data is all there.
                    ────────────────────────────────────────────────────── */}
              </div>
            </div>
          </section>
        )}

        {/* ────────────────────────────────────────────────────────────────
            LOST LEADS — the post-mortem report.

            Every lead that did not become a paying client, with an honest
            assessment of why and what should have been done differently.

            THIS IS FOR JO'S EYES ONLY. There is no send button, no draft, no
            "message them" action anywhere in this view, and the API route
            behind it is read-only. Nothing here ever reaches a customer.

            The individual cards are anecdotes. The panel at the top — the
            categories ranked by how often they happen — is the finding, which
            is why it sits above the list and not below it.
            ──────────────────────────────────────────────────────────────── */}
        {view === 'lost' && (
          <section className="view active">
            <h2 className="vt">Lost Leads</h2>
            <div className="vsub">
              Every lead that did not become a paying client, read back and assessed. Written for you only — nothing on this page is ever sent to a customer.
            </div>

            {lost === null && <div className="sysline" style={{ margin: '20px 0' }}>Reading the report…</div>}

            {lost && (
              <>
                <div className="kpis">
                  <div className="kpi"><div className="kl">Lost leads</div><div className="kv">{lost.counts.lost}</div><div className="kd">by the definition below</div></div>
                  <div className="kpi"><div className="kl">Assessed</div><div className="kv">{lost.counts.analysed}</div><div className="kd">{lost.counts.pending > 0 ? `${lost.counts.pending} waiting for tonight` : 'all of them'}</div></div>
                  <div className="kpi"><div className="kl">Still winnable</div><div className="kv">{lost.counts.recoverable}</div><div className="kd">with something specific to do</div></div>
                  <div className="kpi"><div className="kl">On us</div><div className="kv">{lost.counts.ourFault}</div><div className="kd">the rest were never going to convert</div></div>
                </div>

                {/* The aggregate. Eleven leads in one bucket is a thing to fix;
                    eleven separate stories are not. */}
                <div className="panel" style={{ marginBottom: 10 }}>
                  <h3>Why they go, most common first</h3>
                  <div className="psub">
                    Counted across the {lost.counts.analysed} lead{lost.counts.analysed === 1 ? '' : 's'} assessed so far. This is the part worth acting on.
                  </div>
                  {lost.categories.length === 0 && (
                    <div className="mini" style={{ marginTop: 0 }}>
                      Nothing assessed yet. The report fills in after tonight&apos;s run.
                    </div>
                  )}
                  {lost.categories.map((c) => (
                    <div key={c.category} className="qitem qitem-why">
                      <span className="qn">×{c.n}</span>
                      <span className="qwrap">
                        <span className="qlabel">{c.label}</span>
                        <span className="qwhy">
                          {c.share}% of everything assessed
                          {c.ourFault > 0 && ` · ${c.ourFault} we could have handled better`}
                          {c.recoverable > 0 && ` · ${c.recoverable} still worth a try`}
                        </span>
                      </span>
                    </div>
                  ))}
                  <div className="sugg">
                    <b>Read this honestly</b>
                    A lead that was never going to convert is recorded as exactly that. If a category says nobody did anything wrong, nobody did — the assessment is asked for the truth, not for a culprit, because a report that always finds fault is one you stop reading.
                  </div>
                </div>

                {/* What "lost" means, in the same words the code uses. It is
                    sent by the API rather than written here twice, so the screen
                    and the definition can never drift apart. */}
                <div className="panel" style={{ marginBottom: 10 }}>
                  <h3>What counts as lost</h3>
                  <div className="psub" style={{ marginBottom: 6 }}>Deliberately conservative: a lead who is still deciding must never appear here.</div>
                  <div className="mini" style={{ marginTop: 0, lineHeight: 1.55 }}>{lost.definition.text}</div>
                  <div className="costrow" style={{ marginTop: 8 }}>
                    <span>Assessed automatically each night, at 4am</span>
                    <b>
                      {lost.lastRun
                        ? `last run ${new Date(lost.lastRun.ranAt).toLocaleString('en-AU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Australia/Melbourne' })}`
                        : 'not run yet'}
                    </b>
                  </div>
                  {lost.lastRun?.budgetExhausted && (
                    <div className="mini" style={{ color: 'var(--warn)' }}>
                      The last run stopped early because the daily AI budget was spent, with {lost.lastRun.remaining} lead{lost.lastRun.remaining === 1 ? '' : 's'} still to assess. It picks up where it left off tonight — nothing was spent past the cap.
                    </div>
                  )}
                  {lost.counts.failed > 0 && (
                    <div className="mini">
                      {lost.counts.failed} lead{lost.counts.failed === 1 ? '' : 's'} could not be assessed. They are shown below with the reason rather than quietly left out.
                    </div>
                  )}
                </div>

                {lost.rows.length === 0 && (
                  <div className="sysline" style={{ margin: '20px 0' }}>
                    No lost leads right now. Everyone who has not paid is still inside the window where they might.
                  </div>
                )}

                <div className="rowlist">
                  {lost.rows.map((r) => {
                    const open = lostOpen === r.customerId;
                    const a = r.analysis;
                    const color = stageColorOf(r.state);
                    return (
                      <div key={r.customerId}>
                        <div
                          className="rowcard"
                          style={{ ['--gc' as string]: color }}
                          title={open ? 'Hide the assessment' : 'Read the assessment'}
                          onClick={() => setLostOpen(open ? null : r.customerId)}
                        >
                          <div className="rc-main">
                            <div className="rc-top">
                              <span className="cname">{r.flag} {phoneOf(r.waId)}</span>
                              {r.triggerLabel && <span className="chip">{r.triggerLabel}</span>}
                              {a && (
                                <span className="cstate" style={{ ['--sc' as string]: RECOVER_TEXT[a.recoverable].color }}>
                                  {RECOVER_TEXT[a.recoverable].label}
                                </span>
                              )}
                            </div>
                            <div className="rc-msg">
                              {a ? a.reason
                                : r.failure ? `Could not be assessed: ${r.failure.error ?? 'unknown reason'}`
                                : 'Waiting to be assessed tonight'}
                            </div>
                          </div>
                          <div className="rc-side">
                            <span className="stagepill" style={{ ['--pc' as string]: color }}>{a ? a.categoryLabel : r.stateLabel}</span>
                            <span className="rc-time">{r.quietDays}d</span>
                          </div>
                        </div>

                        {open && (
                          <div className="panel" style={{ margin: '6px 0 2px', borderRadius: 10 }}>
                            <div className="costrow"><span>Stage when it stopped</span><b>{r.stateLabel}</b></div>
                            <div className="costrow"><span>Why this counts as lost</span><b>{r.lostBecause}</b></div>
                            {a?.hoursPriceToSilence != null && (
                              <div className="costrow">
                                <span>Between the price and their last word</span>
                                <b>{a.hoursPriceToSilence < 1 ? 'under an hour' : a.hoursPriceToSilence < 48 ? `${Math.round(a.hoursPriceToSilence)} hours` : `${Math.round(a.hoursPriceToSilence / 24)} days`}</b>
                              </div>
                            )}
                            {a ? (
                              <>
                                <div className="syshead">Why it did not convert</div>
                                <div className="mini" style={{ marginTop: 0, lineHeight: 1.55, color: 'var(--ink2)' }}>{a.reason}</div>
                                {a.evidenceQuote && <div className="tctx">&ldquo;{a.evidenceQuote}&rdquo;</div>}

                                <div className="syshead">What should have been done differently</div>
                                <div className="mini" style={{ marginTop: 0, lineHeight: 1.55, color: 'var(--ink2)' }}>{a.shouldHaveDone}</div>
                                <div className="costrow" style={{ marginTop: 6 }}>
                                  <span>Verdict</span>
                                  <b style={{ color: FAULT_TEXT[a.fault].color }}>{FAULT_TEXT[a.fault].label}</b>
                                </div>

                                {a.recoveryAction && (
                                  <div className="sugg">
                                    <b>{a.recoverable === 'YES' ? 'Worth doing' : 'Long shot, but'}</b>
                                    {a.recoveryAction}
                                  </div>
                                )}
                                <div className="mini">
                                  Assessed {new Date(a.analysedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', timeZone: 'Australia/Melbourne' })} · confidence {Math.round(a.confidence * 100)}%. A judgement from the conversation, not a fact — open the chat and read it yourself before acting on anything here.
                                </div>
                              </>
                            ) : r.failure ? (
                              <div className="mini" style={{ marginTop: 0 }}>
                                Could not be assessed after {r.failure.attempts} attempt{r.failure.attempts === 1 ? '' : 's'}: {r.failure.error ?? 'unknown reason'}.
                              </div>
                            ) : (
                              <div className="mini" style={{ marginTop: 0 }}>
                                Not assessed yet. The nightly run works through the newest losses first.
                              </div>
                            )}
                            <div className="tbtns">
                              <button className="btn ghost" onClick={() => { setView('chats'); openChat(r.customerId); }}>Read the conversation →</button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        )}

      </main>

      <div className={`drawer ${drawer ? 'open' : ''}`}>
        {drawer && (() => {
          const closedState = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(drawer.state);
          const now = closedState ? -1 : journeyIdx[drawer.state] ?? 0;
          const nextJob = upcoming.find((x) => x.customerId === drawer.id);
          const secs = nextJob ? Math.max(0, Math.round((new Date(nextJob.runAt).getTime() - Date.now()) / 1000)) : null;
          return (
            <>
              <div className="dh">
                <div className="cav">{avatarFor(drawer.name)}</div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: 15 }}>{phoneOf(drawer.waId)}</b>
                  <div style={{ marginTop: 3 }}><span className="cstate" style={{ ['--sc' as string]: stageColorOf(drawer.state) }}>{stageLabelOf(drawer.state)}</span></div>
                </div>
                <button className="x" onClick={() => setDrawerId(null)}>✕</button>
              </div>
              <div className="dbody">
                <div className="field"><span className="fk">Income type</span><span className="fvv">{incLabel(drawer.income)}</span></div>
                <div className="field"><span className="fk">Fee</span><span className="fvv">{feeOf(drawer.income) ?? '·'}</span></div>
                <div className="field"><span className="fk">Payment</span><span className="fvv">{drawer.paid ? 'Paid ✓' : 'Pending'}</span></div>
                <div className="field"><span className="fk">Form</span><span className="fvv">{drawer.formComplete ? 'Complete ✓' : 'Not received'}</span></div>
                <div className="field"><span className="fk">{ASSISTANT_NAME}</span><span className="fvv">{drawer.aiPaused ? 'Paused ✋' : 'Active'}</span></div>
                <div className="field"><span className="fk">Time in stage</span><span className="fvv">{timeAgo(drawer.stateChangedAt)}</span></div>
                {nextJob && <div className="field"><span className="fk">Next follow-up</span><span className="fvv">{nextJob.kind === 'AUTO_CLOSE' ? 'auto-close' : `#${(nextJob.payload.seq ?? 0) + 1}`} in {secs}s</span></div>}
                <div className="mlabel">Quick reply (sends now, pauses {ASSISTANT_NAME})</div>
                <div className="composer" style={{ padding: '6px 0', borderTop: 'none', background: 'transparent' }}>
                  <input placeholder="Type and press Enter…" value={drawerReply}
                    onChange={(e) => setDrawerReply(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { sendManual(drawer.id, drawerReply); setDrawerReply(''); } }} />
                  <button className="send" onClick={() => { sendManual(drawer.id, drawerReply); setDrawerReply(''); }}>➤</button>
                </div>
                <div className="mlabel">Journey</div>
                <div className="timeline">
                  {journey.map((s, i) => (
                    <div key={s} className={`tl ${now >= 0 && i < now ? 'done' : now >= 0 && i === now ? 'now' : ''}`}>
                      <div className="tdot" />
                      <div className="tinfo"><b>{stageLabelOf(s)}</b><span>{now < 0 ? 'closed' : i < now ? '✓ done' : i === now ? 'current stage' : 'upcoming'}</span></div>
                    </div>
                  ))}
                </div>
                <div className="dbtns">
                  <button className="btn take" onClick={() => { setView('chats'); openChat(drawer.id); setDrawerId(null); }}>💬 Open Chat</button>
                  <button className="btn ghost" onClick={async () => { await act({ action: 'toggle_ai', id: drawer.id, value: drawer.aiPaused }); say(drawer.aiPaused ? `${ASSISTANT_NAME} resumed` : `${ASSISTANT_NAME} paused, you have the wheel`); refresh(); }}>✋ {drawer.aiPaused ? `Resume ${ASSISTANT_NAME}` : 'Take Over'}</button>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      <div className={`overlay ${tpl ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setTpl(null); }}>
        {tpl && (
          <div className="modal">
            <div className="mh"><b>{tpl.title}</b><button className="x" onClick={() => setTpl(null)}>✕</button></div>
            <div className="mlabel">Message text</div>
            <textarea className="edit" value={tplText} onChange={(e) => setTplText(e.target.value)} />
            <div className="mlabel">How the customer sees it</div>
            <div className="wapreview"><div className="msg out" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{tplText}</div></div>
            <div className="mfoot">
              <span className="vhist" style={{ cursor: 'pointer', color: 'var(--crit)' }} onClick={async () => { if (confirm('Delete this message?')) { await act({ action: 'delete_template', id: tpl.id }); say('Message deleted'); setTpl(null); refresh(); } }}>🗑 Delete</span>
              <button className="btn ghost" onClick={() => setTpl(null)}>Cancel</button>
              <button className="btn save" onClick={async () => {
                const r = await act({ action: 'update_template', id: tpl.id, body: tplText });
                if (r.blocked) { say('Blocked: ' + r.blocked.join(', ')); return; }
                say('Saved, live for all new conversations ✓'); setTpl(null); refresh();
              }}>Save & Go Live</button>
            </div>
          </div>
        )}
      </div>

      {/* Editing a Learned Answer from the Library. Separate store from
          templates (Knowledge Base, not the templates table), so it calls
          /api/will/knowledge directly rather than the `act` template actions. */}
      <div className={`overlay ${know ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setKnow(null); }}>
        {know && (
          <div className="modal">
            <div className="mh"><b>{know.intent || know.question}</b><button className="x" onClick={() => setKnow(null)}>✕</button></div>
            <div className="mlabel">Customer question</div>
            <div className="wapreview"><div className="msg in" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{know.question}</div></div>
            <div className="mlabel">Answer text</div>
            <textarea className="edit" value={knowText} onChange={(e) => setKnowText(e.target.value)} />
            <div className="mlabel">How the customer sees it</div>
            <div className="wapreview"><div className="msg out" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{knowText}</div></div>
            <div className="mfoot">
              <span className="vhist" style={{ cursor: 'pointer', color: 'var(--crit)' }} onClick={async () => {
                if (!confirm('Delete this learned answer?')) return;
                await fetch('/api/will/knowledge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'delete', id: know.id }) });
                say('Learned answer deleted'); setKnow(null); loadKnowledge(); refresh();
              }}>🗑 Delete</span>
              <button className="btn ghost" onClick={() => setKnow(null)}>Cancel</button>
              {knowledge.drafts.some((d) => d.id === know.id) && (
                <button className="btn approve" onClick={async () => {
                  if (knowText !== know.answer) await fetch('/api/will/knowledge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'edit', id: know.id, answer: knowText }) });
                  await fetch('/api/will/knowledge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'approve', id: know.id }) });
                  say('Learned ✓'); setKnow(null); loadKnowledge(); refresh();
                }}>✓ Approve & Go Live</button>
              )}
              <button className="btn save" onClick={async () => {
                await fetch('/api/will/knowledge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'edit', id: know.id, answer: knowText }) });
                say('Saved, live for all new conversations ✓'); setKnow(null); loadKnowledge(); refresh();
              }}>Save & Go Live</button>
            </div>
          </div>
        )}
      </div>


      <div className={`overlay ${newTpl ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setNewTpl(null); }}>
        {newTpl && (
          <div className="modal">
            <div className="mh"><b>New Message</b><button className="x" onClick={() => setNewTpl(null)}>✕</button></div>
            <div className="mlabel">Title</div>
            <input className="edit" style={{ minHeight: 0, padding: 10 }} value={newTpl.title} onChange={(e) => setNewTpl({ ...newTpl, title: e.target.value })} placeholder="e.g. Payment methods answer" />
            <div className="mlabel">Category</div>
            <input className="edit" style={{ minHeight: 0, padding: 10 }} value={newTpl.category} onChange={(e) => setNewTpl({ ...newTpl, category: e.target.value })} placeholder="e.g. FAQ · Operational" />
            <div className="mlabel">Message text</div>
            <textarea className="edit" value={newTpl.body} onChange={(e) => setNewTpl({ ...newTpl, body: e.target.value })} placeholder="Write the message exactly as the customer should see it…" />
            <div className="mlabel">How the customer sees it</div>
            <div className="wapreview"><div className="msg out" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{newTpl.body || ' '}</div></div>
            <div className="mfoot">
              <button className="btn ghost" style={{ marginLeft: 'auto' }} onClick={() => setNewTpl(null)}>Cancel</button>
              <button className="btn save" onClick={async () => {
                if (!newTpl.body.trim()) { say('Write the message first'); return; }
                const r = await act({ action: 'add_template', title: newTpl.title, category: newTpl.category, body: newTpl.body });
                if (r.blocked) { say('Blocked: ' + r.blocked.join(', ')); return; }
                say('New message added ✓'); setNewTpl(null); refresh();
              }}>Save Message</button>
            </div>
          </div>
        )}
      </div>

      <div className={`overlay ${estimateFor ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setEstimateFor(null); }}>
        {estimateFor && (() => {
          const parsed = parseFloat(estimateAmt.replace(/[^0-9.]/g, ''));
          const amountValid = Number.isFinite(parsed) && parsed > 0;
          let linkValid = false;
          try { const u = new URL(estimateLink.trim()); linkValid = u.protocol === 'http:' || u.protocol === 'https:'; } catch { /* invalid */ }
          // The preview reads the SAME Library entry the server sends, so an
          // edit made in the Library shows up here instead of the two drifting
          // apart. The literal is only the fallback for a Library that has not
          // loaded yet, and is the exact text the server falls back to too.
          const estimateTpl = data.templates.find((t) => t.key === 'estimate_invoice')?.body
            ?? `Your estimated tax refund is {{AMOUNT}}.\nI'll send it for final review, then to you for signature.\nHere is your invoice: {{INVOICE_LINK}}`;
          const preview = amountValid
            ? estimateTpl
              .replaceAll('{{AMOUNT}}', `$${parsed.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
              .replaceAll('{{INVOICE_LINK}}', estimateLink.trim() || '…')
            : '';
          return (
            <div className="modal">
              <div className="mh"><b>Send Estimate + Invoice {phoneOf(estimateFor.waId)}</b><button className="x" onClick={() => setEstimateFor(null)}>✕</button></div>
              <div className="mlabel">Estimated refund (AUD)</div>
              <input className="edit" style={{ minHeight: 0, padding: 10 }} inputMode="decimal" value={estimateAmt}
                onChange={(e) => setEstimateAmt(e.target.value)} placeholder="e.g. 3004" />
              <div className="mlabel">Invoice link</div>
              <input className="edit" style={{ minHeight: 0, padding: 10 }} value={estimateLink}
                onChange={(e) => setEstimateLink(e.target.value)} placeholder="https://…" />
              {preview && (
                <>
                  <div className="mlabel">How the customer sees it</div>
                  <div className="wapreview"><div className="msg out" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{preview}</div></div>
                </>
              )}
              <div className="mfoot">
                <button className="btn ghost" onClick={() => setEstimateFor(null)}>Cancel</button>
                <button
                  className="btn save"
                  disabled={!amountValid || !linkValid}
                  onClick={async () => {
                    const r = await act({ action: 'send_estimate', customerId: estimateFor.id, amountCents: Math.round(parsed * 100), invoiceLink: estimateLink.trim() });
                    if (!r?.ok) { say(`❌ ${r?.error ?? 'could not send'}`); return; }
                    say('Estimate sent ✓'); setEstimateFor(null);
                    loadChat(estimateFor.id); refresh();
                  }}
                >Send</button>
              </div>
            </div>
          );
        })()}
      </div>

      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </>
  );
}
