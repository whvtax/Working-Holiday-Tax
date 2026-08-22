'use client';
// Live dashboard. Two assistant modes (Approval / Autopilot), real health
// checks, quick replies everywhere, suggested answers on every task,
// one-click service templates, deep report.
import { useCallback, useEffect, useRef, useState } from 'react';
import { STAGE_GROUPS, STATE_LABELS, CustomerState } from '@/lib/will/state-machine';
import type { CustomerRow, MessageRow, TaskRow, TemplateRow, JobRow } from '@/lib/will/store';
import { ASSISTANT_NAME } from '@/lib/will/config';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Simulator from './Simulator';

type View = 'pipeline' | 'chats' | 'outbox' | 'tasks' | 'library' | 'insights' | 'learning' | 'simulator';

interface StateData {
  customers: CustomerRow[];
  tasks: TaskRow[];
  templates: TemplateRow[];
  pending: (MessageRow & { customerName: string | null })[];
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
  insights: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg>,
  simulator: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>,
  learning: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  outbox: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
};
const BELL = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>;
// WhatsApp-style default avatar. Meta's Cloud API does not expose a customer's
// profile photo (privacy), so every contact gets this neutral silhouette —
// exactly like a WhatsApp chat with no picture set.
const AVATAR = (
  <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
    <circle cx="20" cy="20" r="20" fill="#d7dbe0" />
    <circle cx="20" cy="16" r="7" fill="#fff" />
    <path d="M7 35c1.5-7 6.8-10 13-10s11.5 3 13 10z" fill="#fff" />
  </svg>
);

const timeAgo = (iso: string | null) => {
  if (!iso) return '·';
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m`;
  if (s < 86400) return `${Math.round(s / 3600)}h`;
  return `${Math.round(s / 86400)}d`;
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

const QUICK_TEMPLATES = ['req_abn', 'req_expenses', 'req_doc', 'medicare', 'payment_received'];

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
  const [suggestions, setSuggestions] = useState<Array<{ id: string; title: string; detail: string; proposedBody: string; occurrences: number }>>([]);
  type Knw = { id: string; intent: string; question: string; answer: string; source: string };
  const [knowledge, setKnowledge] = useState<{ drafts: Knw[]; active: Knw[] }>({ drafts: [], active: [] });
  const loadKnowledge = useCallback(async () => {
    try { const r = await fetch('/api/will/knowledge').then((x) => x.json()); if (r.ok) setKnowledge({ drafts: r.drafts ?? [], active: r.active ?? [] }); } catch { /* */ }
  }, []);
  type Audit = { id: string; actor: string; action: string; detail: unknown; at: string };
  const [activity, setActivity] = useState<Audit[]>([]);
  const loadActivity = useCallback(async () => {
    try { const r = await fetch('/api/will/audit?limit=60').then((x) => x.json()); if (r.ok) setActivity(r.rows ?? []); } catch { /* */ }
  }, []);
  const [sugDrafts, setSugDrafts] = useState<Record<string, string>>({});
  const [knwDrafts, setKnwDrafts] = useState<Record<string, string>>({});
  const [variantB, setVariantB] = useState<string>('');
  const [goalInput, setGoalInput] = useState<string>('50');
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
  useEffect(() => { if (view === 'chats' && chatSelId) loadChat(chatSelId); /* eslint-disable-next-line */ }, [data]);
  useEffect(() => { if ((view === 'insights' || view === 'learning') && !report) fetch('/api/will/report').then((r) => r.json()).then((rp) => { setReport(rp); if (rp.goal != null) setGoalInput(String(rp.goal)); }).catch(() => {}); }, [view, report]);
  useEffect(() => { if (view === 'learning') { loadKnowledge(); loadActivity(); } }, [view, loadKnowledge, loadActivity]);

  // Update-on-change: instead of refetching everything on a fixed timer, poll a
  // tiny change-token and only pull the heavy /state + /suggestions payloads when
  // something actually changed. Cuts server load to near-zero while idle.
  useEffect(() => {
    let stop = false;
    let lastToken = '';
    const hidden = () => typeof document !== 'undefined' && document.hidden;

    const refetchHeavy = async () => {
      const [h, sug] = await Promise.all([
        fetch('/api/will/health').then((r) => r.json()).catch(() => null),
        fetch('/api/will/suggestions').then((r) => r.json()).catch(() => null),
      ]);
      if (stop) return;
      if (h) setHealth(h);
      if (sug) setSuggestions(sug.suggestions ?? []);
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
  // ── Outbox: everything that has NOT gone to the customer and is waiting on you.
  // One place instead of hunting through every chat. Three kinds:
  //   1. drafts awaiting your approval (Will's proposals)
  //   2. messages that could not be sent (WhatsApp/Meta rejected them)
  //   3. drafts the guard blocked before they could go out
  const pendingDrafts = data.pending;
  const notSentTasks = openTasks.filter((t) => /send failed|blocked reply|invalid before approval|is stale|draft is stale|policy guard/i.test(t.reason));
  const outboxCount = pendingDrafts.length + notSentTasks.length;
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
  // worth a personal nudge in a few weeks.
  const quietLeads = data.customers.filter((c) =>
    c.lastMessageDirection === 'OUT' && !c.optedOut &&
    ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING', 'WENT_COLD'].includes(c.state));
  const isStuck = (c: CustomerRow) => Date.now() - new Date(c.stateChangedAt).getTime() > 24 * 3600e3 &&
    !['COMPLETED', 'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT', 'UNDER_REVIEW', 'FINAL_REVIEW'].includes(c.state);
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
    .sort((a, b) => ((b.lastMessageAt ?? b.lastCustomerMsgAt) ?? '').localeCompare((a.lastMessageAt ?? a.lastCustomerMsgAt) ?? ''))
    .slice(0, 30);

  const stageColorOf = (s: CustomerState) => STAGE_GROUPS.find((sg) => (sg.states as readonly CustomerState[]).includes(s))?.color ?? '#7a8494';
  const journey: CustomerState[] = ['NEW_LEAD', 'PRICE_SENT', 'PAID', 'FORM_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'SIGNATURE_PENDING', 'LODGED', 'COMPLETED'];
  const journeyIdx: Partial<Record<CustomerState, number>> = { NEW_LEAD: 0, QUALIFIED: 0, PRICE_SENT: 1, PAYMENT_PENDING: 1, PAID: 2, FORM_PENDING: 2, FORM_COMPLETE: 3, DOCUMENTS_COMPLETE: 3, UNDER_REVIEW: 4, ESTIMATE_READY: 5, FINAL_REVIEW: 5, SIGNATURE_PENDING: 6, SIGNED: 6, LODGED: 7, COMPLETED: 8 };

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
        {(['pipeline', 'chats', 'outbox', 'tasks', 'library', 'insights', 'learning', 'simulator'] as View[]).map((v) => (
          <button key={v} className={`ni ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>
            <span className="ic">{ICONS[v]}</span>
            <span className="nl">{v[0].toUpperCase() + v.slice(1)}</span>
            {v === 'outbox' && outboxCount > 0 && <span className="nbadge" style={{ background: 'var(--warn)' }}>{outboxCount}</span>}
            {v === 'tasks' && openTasks.length > 0 && <span className="nbadge">{openTasks.length}</span>}
            {v === 'learning' && suggestions.length > 0 && <span className="nbadge" style={{ background: 'var(--brand2)' }}>{suggestions.length}</span>}
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
                          <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(() => { const c = custById(t.customerId); return c ? phoneOf(c.waId) : (t.customerName ?? 'System'); })()}</span>
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
                <div className="kl">Worth a Nudge</div><div className="kv">{quietLeads.length}</div><div className="kd">we spoke last, no reply, never said no</div>
              </div>
              <div className="kpi clickable" title="See completed customers" onClick={() => { setView('pipeline'); setGroup('done'); }}><div className="kl">Completed</div><div className="kv">{countFor(['COMPLETED'])}</div><div className="kd up">all-time</div></div>
            </div>

            <div className="pstrip">
              <div className="pstitle">My Customers Pipeline</div>
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
                    {c.aiPaused && <span className="chip">✋ manual</span>}
                    {isStuck(c) && <span className="chip stuck">⚠ stuck</span>}
                    {feeOf(c.income) && <span className="chip price">{feeOf(c.income)}</span>}
                    <span className="stagepill" style={{ ['--pc' as string]: g.color }}>{STATE_LABELS[c.state]}</span>
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
                <div className="search"><input placeholder="Search customers & messages…" value={searchQ} onChange={(e) => setSearchQ(e.target.value)} /></div>
                {/* Filter chips (owner's choice): just the four that matter, so
                    they fit with no sideways scroll — All (default), Unread, and
                    the two action stages Estimate and Signature. */}
                <div className="chatfilter">
                  <button className={`cfchip ${chatFilter === 'all' ? 'on' : ''}`} onClick={() => setChatFilter('all')}>All</button>
                  <button className={`cfchip ${chatFilter === 'unread' ? 'on' : ''}`} onClick={() => setChatFilter('unread')}>Unread</button>
                  {STAGE_GROUPS.filter((sg) => sg.id === 'estimate' || sg.id === 'sig').map((sg) => (
                    <button key={sg.id} className={`cfchip ${chatFilter === sg.id ? 'on' : ''}`} style={{ ['--pc' as string]: sg.color }} onClick={() => setChatFilter(sg.id)}>{sg.label}</button>
                  ))}
                </div>
                {chatList.map((c) => (
                  <div key={c.id} className={`citem ${chatSelId === c.id ? 'sel' : ''} ${c.unreadCount > 0 ? 'hasunread' : ''}`} onClick={() => openChat(c.id)}>
                    <div className="cav">{AVATAR}</div>
                    <div className="cinfo">
                      <div className="cn"><b>{phoneOf(c.waId)}</b><time>{timeAgo(c.lastCustomerMsgAt)}</time></div>
                      <div className="cm">{c.lastMessagePreview}</div>
                    </div>
                    {c.unreadCount > 0
                      ? <span className="unreadbadge" title={`${c.unreadCount} unread`}>{c.unreadCount > 99 ? '99+' : c.unreadCount}</span>
                      : <span className="cstate" style={{ ['--sc' as string]: stageColorOf(c.state) }}>{STATE_LABELS[c.state]}</span>}
                  </div>
                ))}
              </div>
              <div className="chatpane">
                {chatSel ? (
                  <>
                    <div className="chathead">
                      <div className="cav">{AVATAR}</div>
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
                              {STATE_LABELS[chatSel.state]} <span className="cstate-caret">▾</span>
                            </button>
                            {stageMenuOpen && (
                              <>
                                <div className="stagemenu-backdrop" onClick={() => setStageMenuOpen(false)} />
                                <div className="stagemenu">
                                  {STAGE_GROUPS.flatMap((g) => (g.states as readonly CustomerState[]).map((s) => ({ s, color: g.color }))).map(({ s, color }) => (
                                    <button
                                      key={s}
                                      type="button"
                                      className={`stagemenu-item${s === chatSel.state ? ' is-current' : ''}`}
                                      onClick={async () => {
                                        setStageMenuOpen(false);
                                        if (s === chatSel.state) return;
                                        const r = await act({ action: 'set_state', customerId: chatSel.id, state: s, force: true });
                                        say(r?.ok ? `Moved to ${STATE_LABELS[s]}` : `❌ ${r?.error ?? 'could not move'}`);
                                        loadChat(chatSel.id); refresh();
                                      }}
                                    >
                                      <span className="stagemenu-dot" style={{ background: color }} />
                                      <span className="stagemenu-lbl">{STATE_LABELS[s]}</span>
                                      {s === chatSel.state && <span className="stagemenu-check">✓</span>}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                          {[feeOf(chatSel.income), chatSel.paid ? 'paid ✓' : null].filter(Boolean).length > 0 && (
                            <span style={{ fontSize: 10.5, color: 'var(--ink3)' }}>{[feeOf(chatSel.income), chatSel.paid ? 'paid ✓' : null].filter(Boolean).join(' · ')}</span>
                          )}
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
                    </div>
                    {/* Quick send: numbered buttons instead of long labels, so the
                        row never overflows and needs no sideways scroll. Hover a
                        number to see the full text (native tooltip). Clicking a
                        number does NOT send — it drops the text into the compose
                        box so you can read it, edit it, and send it yourself. */}
                    <div className="tplchips">
                      <span className="tplchips-label">Quick fill:</span>
                      {QUICK_TEMPLATES.map((key, i) => {
                        const t = data.templates.find((x) => x.key === key);
                        if (!t) return null;
                        const label = t.title.replace(/ \(.*\)/, '');
                        return <button key={key} className="chipbtn qsnum" title={label} aria-label={label} onClick={() => { setComposer(t.body); say(`Loaded: ${label} — edit and send`); }}>{i + 1}</button>;
                      })}
                    </div>
                    <div className="msgs" ref={msgsRef}>
                      {[...chatMsgs].filter((m) => m.status !== 'DISCARDED' && m.status !== 'BLOCKED')
                        // A draft awaiting approval always renders at the BOTTOM,
                        // after every real message, so it can never appear stranded
                        // in the middle of the thread when the customer sent more
                        // messages after it was drafted. Stable sort keeps normal
                        // messages in their time order.
                        .sort((a, b) => (a.status === 'PENDING_APPROVAL' ? 1 : 0) - (b.status === 'PENDING_APPROVAL' ? 1 : 0))
                        .map((m) => {
                        if (m.status === 'PENDING_APPROVAL') {
                          return (
                            <div key={m.id} className="msg out" style={{ opacity: 0.85, border: '1px dashed rgba(122,99,232,.6)' }}>
                              {m.body}
                              <div className="mt"><span className="ai">✎ awaiting your approval</span></div>
                              <div className="abtns" style={{ marginTop: 8 }}>
                                <button className="btn approve" disabled={acted.has(m.id)} onClick={() => once(m.id, async () => { const r = await act({ action: 'approve_message', id: m.id }); say(r?.ok ? 'Approved & sent ✓' : (r?.error ? `❌ Not sent: ${r.error}` : 'Draft blocked: situation changed')); loadChat(chatSel.id); refresh(); })}>✓ Approve</button>
                                <button className="btn ghost" disabled={acted.has(m.id)} onClick={() => once(m.id, async () => { await act({ action: 'discard_message', id: m.id }); say('Draft discarded'); loadChat(chatSel.id); refresh(); })}>✕ Discard</button>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={m.id} className={`msg ${m.direction === 'IN' ? 'in' : 'out'}`}>
                            {m.body}
                            <div className="mt">{m.author === 'AI' && <span className="ai">{ASSISTANT_NAME}</span>}{m.author === 'HUMAN' && <span className="ai" style={{ color: 'var(--sig)' }}>you</span>}{new Date(m.createdAt).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', timeZone: 'Australia/Melbourne' })} {m.direction === 'OUT' && (m.status === 'FAILED' ? <span style={{ color: 'var(--crit)', fontWeight: 600 }}>⚠ not delivered</span> : m.status === 'QUEUED' ? '⏳' : '✓✓')}</div>
                          </div>
                        );
                      })}
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

        {view === 'outbox' && (
          <section className="view active">
            <h2 className="vt">Outbox</h2>
            <div className="vsub">Everything that has NOT gone to the customer and is waiting on you.</div>

            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink2)', margin: '10px 0 8px', letterSpacing: '.02em' }}>
              ✎ Awaiting your approval ({pendingDrafts.length})
            </div>
            {pendingDrafts.length === 0 && <div className="sysline" style={{ margin: '6px 0 14px' }}>Nothing waiting for approval 🎉</div>}
            {pendingDrafts.map((m) => {
              const c = custById(m.customerId);
              return (
                <div key={m.id} className="obcard">
                  <div className="obhead">
                    <span className="obwho">{c ? phoneOf(c.waId) : (m.customerName ?? 'Customer')}</span>
                    {c && <span className="cstate" style={{ ['--sc' as string]: stageColorOf(c.state) }}>{STATE_LABELS[c.state]}</span>}
                    <span className="obtime">{timeAgo(m.createdAt)} ago</span>
                  </div>
                  <div className="obbody">{m.body}</div>
                  <div className="obbtns">
                    <button className="btn approve" disabled={acted.has(m.id)} onClick={() => once(m.id, async () => { const r = await act({ action: 'approve_message', id: m.id }); say(r?.ok ? 'Approved & sent ✓' : (r?.error ? `❌ Not sent: ${r.error}` : 'Draft blocked: situation changed')); refresh(); })}>✓ Approve & send</button>
                    <button className="btn ghost" disabled={acted.has(m.id)} onClick={() => once(m.id, async () => { await act({ action: 'discard_message', id: m.id }); say('Draft discarded'); refresh(); })}>✕ Discard</button>
                    <button className="btn ghost" onClick={() => { setView('chats'); openChat(m.customerId); }}>Open chat →</button>
                  </div>
                </div>
              );
            })}

            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink2)', margin: '18px 0 8px', letterSpacing: '.02em' }}>
              ⚠ Didn&apos;t send ({notSentTasks.length})
            </div>
            {notSentTasks.length === 0 && <div className="sysline" style={{ margin: '6px 0' }}>Nothing failed or blocked 🎉</div>}
            {notSentTasks.map((t) => {
              const c = custById(t.customerId);
              return (
                <div key={t.id} className="obcard" style={{ ['--tc' as string]: 'var(--crit)' }}>
                  <div className="obhead">
                    <span className="obwho">{c ? phoneOf(c.waId) : (t.customerName ?? 'Customer')}</span>
                    <span className="tsev" style={{ color: 'var(--crit)' }}>{t.severity}</span>
                    <span className="obtime">{timeAgo(t.createdAt)} ago</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--crit)', margin: '2px 0 6px', fontWeight: 600 }}>{t.reason}</div>
                  {t.suggestedReply && <div className="obbody">{t.suggestedReply}</div>}
                  <div className="obbtns">
                    {t.customerId && <button className="btn ghost" onClick={() => { setView('chats'); openChat(t.customerId!); }}>Open chat →</button>}
                    <button className="btn ghost" onClick={async () => { await act({ action: 'resolve_task', id: t.id }); say('Marked done'); refresh(); }}>Mark done</button>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {view === 'tasks' && (
          <section className="view active">
            <h2 className="vt">Human Tasks</h2>
            <div className="vsub">{ASSISTANT_NAME} drafted a suggested answer for each one.</div>
            {openTasks.length === 0 && <div className="sysline" style={{ margin: '18px 0' }}>No open tasks. {ASSISTANT_NAME} has everything under control 🎉</div>}
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
                      <span className="tmeta">{(() => { const c = custById(t.customerId); return c ? phoneOf(c.waId) : (t.customerName ?? 'System'); })()} · {timeAgo(t.createdAt)} ago</span>
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
                <div className="vsub">Every automated message lives here. Tap to edit, changes go live instantly, with version history.</div>
              </div>
              <button className="btn save" onClick={() => setNewTpl({ title: '', category: 'Custom', body: '' })}>+ New Message</button>
            </div>
            {suggestions.length > 0 && (
              <div className="sugbox">
                <div className="sugbox-h">💡 {ASSISTANT_NAME} noticed {suggestions.length} recurring question{suggestions.length > 1 ? 's' : ''} with no answer yet</div>
                {suggestions.map((s) => (
                  <div key={s.id} className="sugcard">
                    <div className="sugq">Customers keep asking (×{s.occurrences}): “{s.detail}”</div>
                    <div className="mlabel" style={{ margin: '6px 0 4px' }}>{ASSISTANT_NAME}&apos;s proposed answer, edit then approve</div>
                    <textarea className="edit" style={{ minHeight: 60 }} value={sugDrafts[s.id] ?? s.proposedBody} onChange={(e) => setSugDrafts((d2) => ({ ...d2, [s.id]: e.target.value }))} />
                    <div className="tbtns">
                      <button className="btn approve" onClick={async () => { const r = await act({ action: 'approve_suggestion', id: s.id, body: sugDrafts[s.id] ?? s.proposedBody }); if (r.blocked) { say('Blocked: ' + r.blocked.join(', ')); return; } say('Added to library ✓'); refresh(); }}>✓ Approve & Add</button>
                      <button className="btn ghost" onClick={async () => { await act({ action: 'dismiss_suggestion', id: s.id }); say('Dismissed'); refresh(); }}>✕ Dismiss</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <div className="libcat">{cat}<span className="n">{items.length}</span></div>
                <div className="libgrid">
                  {items.map((t) => (
                    <div key={t.id} className="tpl" onClick={() => { setTpl(t); setTplText(t.body); setVariantB(t.variantB ?? ''); }}>
                      <span className="pencil">✎</span>
                      <div className="tn">{t.title}{t.requiresMeta && <span className="chip" style={{ fontSize: 9 }} title="Requires Meta template approval">META ✓</span>}</div>
                      <div className="tv">{t.body}</div>
                      <div className="tf"><span className="edited">● live</span><span>v{t.versions} · {timeAgo(t.updatedAt)} ago</span></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {view === 'insights' && (
          <section className="view active">
            <h2 className="vt">Insights</h2>
            <div className="vsub">Every conversation is raw material: what converts, what loses customers, what to fix. Each problem comes with a suggested fix.</div>
            <div className="igrid">
              <div className="panel">
                <h3>Sales Funnel</h3>
                <div className="psub">Where customers are, and where they drop</div>
                {(report?.funnel ?? []).map((f, i, arr) => {
                  const max = Math.max(1, arr[0]?.n ?? 1);
                  return <div key={f.label} className="frow"><span className="fl">{f.label}</span><div className="fbar"><div className="fill" style={{ ['--fc' as string]: ['#86b6ef', '#5598e7', '#3987e5', '#2a78d6', '#1c5cab'][i], width: `${(f.n / max) * 100}%` }} /></div><span className="fv">{f.n}</span></div>;
                })}
                {report && report.closed.total > 0 && <div className="mini">Biggest risk point: <b style={{ color: 'var(--warn)' }}>{report.closed.coldAfterPrice} went cold after the price message</b></div>}
                <div className="sugg"><b>Suggested fix</b>Lead with the guarantee before the number, and A/B the day-3 follow-up wording in the Library.</div>
              </div>

              <div className="panel">
                <h3>What {ASSISTANT_NAME} Escalated <span className="cstate" style={{ ['--sc' as string]: 'var(--warn)' }}>LIVE</span></h3>
                <div className="psub">Recurring reasons, each one is a template you could add</div>
                {(report?.tasks.topReasons ?? []).map(([r, n]) => (
                  <div key={r} className="qitem"><span className="qn">×{n}</span>{r}</div>
                ))}
                {(!report || report.tasks.topReasons.length === 0) && <div className="mini">Nothing escalated yet</div>}
                <div className="sugg"><b>Suggested fix</b>Any reason appearing twice or more deserves an approved answer in the Library, then {ASSISTANT_NAME} resolves it alone.</div>
              </div>

              <div className="panel">
                <h3>Problems → Solutions</h3>
                <div className="psub">Auto-detected from the full communication history</div>
                {(report?.insights ?? []).map((ins, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{ins.problem}</div>
                    <div className="mini" style={{ marginTop: 2 }}>{ins.evidence}</div>
                    <div className="sugg" style={{ marginTop: 5 }}><b>Suggested fix</b>{ins.solution}</div>
                  </div>
                ))}
              </div>

              <div className="panel">
                <h3>Deep Conversation Analysis</h3>
                <div className="psub">Phrasing, tone, abandon points, per language</div>
                {report?.qualitative ? (
                  <div className="mini" style={{ lineHeight: 1.6 }}>{report.qualitative.note}</div>
                ) : (
                  <div className="mini">Runs through Claude over the full history: phrasing that converts vs loses, tone per language, the exact message where each customer dropped, objection win rates, suggested new templates.</div>
                )}
                <div style={{ marginTop: 8 }}>
                  {upcoming.length > 0 && <div className="psub" style={{ marginBottom: 4 }}>Scheduled follow-ups</div>}
                  {upcoming.slice(0, 5).map((j) => {
                    const c = data.customers.find((x) => x.id === j.customerId);
                    const secs = Math.max(0, Math.round((new Date(j.runAt).getTime() - Date.now()) / 1000));
                    return <div key={j.id} className="costrow"><span>{c?.flag} {c ? phoneOf(c.waId) : '?'} · {j.kind === 'AUTO_CLOSE' ? 'auto-close' : j.payload.templateKey}</span><b>in {secs < 90 ? secs + 's' : Math.round(secs / 60) + 'm'}</b></div>;
                  })}
                </div>
                <button className="genbtn" onClick={() => { setReport(null); say('Report refreshed'); }}>↻ Regenerate Report</button>
              </div>

              <div className="panel">
                <h3>System &amp; Costs</h3>
                <div className="psub">Live from the system</div>
                <div className="costrow"><span>Brain ({ASSISTANT_NAME})</span><b>{health?.usingMock ? 'mock (no API key)' : 'Claude API'}</b></div>
                <div className="costrow"><span>Customers</span><b>{data.customers.length}</b></div>
                <div className="costrow"><span>Auto-resolved by {ASSISTANT_NAME}</span><b>{(() => { const t = data.tasks.length, done = data.tasks.filter((x) => x.status === 'RESOLVED').length; const total = data.customers.length; return total ? Math.round(((total - openTasks.length) / total) * 100) + '%' : '100%'; })()}</b></div>
                <div className="costrow"><span>Open tasks</span><b>{openTasks.length}</b></div>
                <div className="costrow"><span>Messages in library</span><b>{data.templates.length}</b></div>
                <div className="costrow"><span>A/B tests running</span><b>{data.templates.filter((t) => t.variantB).length}</b></div>
                <div className="costrow"><span>Policy Guard</span><b style={{ color: health?.checks?.guard?.ok ? 'var(--good)' : 'var(--crit)' }}>{health?.checks?.guard?.ok ? '✓ passing' : 'check'}</b></div>
                <div className="costrow"><span>Nightly checks</span><b style={{ color: 'var(--good)' }}>✓ scheduled</b></div>
              </div>
            </div>
          </section>
        )}

        {view === 'learning' && (
          <section className="view active">
            <h2 className="vt">Learning</h2>
            <div className="vsub">{ASSISTANT_NAME} improves from every conversation. Approve what works, and watch it get better over time.</div>

            <div className="panel" style={{ marginBottom: 12 }}>
              <h3>Your Goal: the best version of {ASSISTANT_NAME}</h3>
              <div className="psub">Set the lead-to-paid conversion you are aiming for. {ASSISTANT_NAME} keeps testing and improving until it holds there.</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
                <div>
                  <div style={{ fontSize: 30, fontWeight: 700 }}>{report?.leadToPaid ?? 0}%</div>
                  <div className="mini">current lead → paid</div>
                </div>
                <div style={{ fontSize: 22, color: 'var(--ink3)' }}>→</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="number" className="edit" style={{ minHeight: 0, padding: '6px 8px', width: 70, fontSize: 20, fontWeight: 700 }}
                      value={goalInput} onChange={(e) => setGoalInput(e.target.value)} />
                    <span style={{ fontSize: 20, fontWeight: 700 }}>%</span>
                    <button className="btn save" onClick={async () => { await act({ action: 'set_goal', goal: Number(goalInput) }); say('Goal set ✓'); setReport(null); }}>Set</button>
                  </div>
                  <div className="mini">your target</div>
                </div>
                <div style={{ flex: 1 }} />
                {report?.goal != null && (
                  <div style={{ textAlign: 'right' }}>
                    {report.leadToPaid >= report.goal
                      ? <div style={{ color: 'var(--good)', fontWeight: 700, fontSize: 15 }}>🎉 Goal reached. This is {ASSISTANT_NAME}&apos;s best version so far.</div>
                      : <div className="mini">{report.goal - report.leadToPaid} points to go. {ASSISTANT_NAME} is still learning.</div>}
                  </div>
                )}
              </div>
            </div>

            <div className="igrid">
              <div className="panel">
                <h3>Suggestions to Approve {suggestions.length > 0 && <span className="cstate" style={{ ['--sc' as string]: 'var(--brand2)' }}>{suggestions.length}</span>}</h3>
                <div className="psub">Recurring questions {ASSISTANT_NAME} could not answer. Approve to teach it.</div>
                {suggestions.length === 0 && <div className="mini">Nothing pending. {ASSISTANT_NAME} is handling everything it has seen.</div>}
                {suggestions.map((s) => (
                  <div key={s.id} className="sugcard" style={{ marginTop: 8 }}>
                    <div className="sugq">×{s.occurrences} · “{s.detail}”</div>
                    <textarea className="edit" style={{ minHeight: 54, marginTop: 6 }} value={sugDrafts[s.id] ?? s.proposedBody} onChange={(e) => setSugDrafts((d2) => ({ ...d2, [s.id]: e.target.value }))} />
                    <div className="tbtns">
                      <button className="btn approve" onClick={async () => { const r = await act({ action: 'approve_suggestion', id: s.id, body: sugDrafts[s.id] ?? s.proposedBody }); if (r.blocked) { say('Blocked'); return; } say('Learned ✓'); refresh(); }}>✓ Approve</button>
                      <button className="btn ghost" onClick={async () => { await act({ action: 'dismiss_suggestion', id: s.id }); refresh(); }}>Dismiss</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="panel">
                <h3>Knowledge Base {knowledge.drafts.length > 0 && <span className="cstate" style={{ ['--sc' as string]: 'var(--brand2)' }}>{knowledge.drafts.length} to review</span>}</h3>
                <div className="psub">What {ASSISTANT_NAME} has learned from your real conversations. Approve a draft and {ASSISTANT_NAME} starts using it. Active answers: {knowledge.active.length}.</div>
                <div style={{ marginTop: 8 }}>
                  <button className="btn ghost" onClick={async () => {
                    const r = await fetch('/api/will/knowledge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'import_starter' }) }).then((x) => x.json()).catch(() => null);
                    if (r?.ok) say(`Starter pack loaded: ${r.imported} added${r.skipped ? `, ${r.skipped} already there` : ''} ✓`);
                    else say('Could not load the starter pack');
                    loadKnowledge();
                  }}>Load starter pack (31 answers)</button>
                </div>
                {knowledge.drafts.length === 0 && knowledge.active.length === 0 && (
                  <div className="mini">Nothing yet. Load the starter pack above, or send your real conversations to teach {ASSISTANT_NAME} how your best answers sound.</div>
                )}
                {knowledge.drafts.map((k) => (
                  <div key={k.id} className="sugcard" style={{ marginTop: 8 }}>
                    <div className="sugq">Q: {k.question}</div>
                    <textarea className="edit" style={{ minHeight: 64, marginTop: 6 }} value={knwDrafts[k.id] ?? k.answer} onChange={(e) => setKnwDrafts((d2) => ({ ...d2, [k.id]: e.target.value }))} />
                    <div className="tbtns">
                      <button className="btn approve" onClick={async () => {
                        const body = knwDrafts[k.id] ?? k.answer;
                        if (body !== k.answer) await fetch('/api/will/knowledge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'edit', id: k.id, answer: body }) });
                        await fetch('/api/will/knowledge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'approve', id: k.id }) });
                        say('Learned ✓'); loadKnowledge();
                      }}>✓ Approve</button>
                      <button className="btn ghost" onClick={async () => { await fetch('/api/will/knowledge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'dismiss', id: k.id }) }); loadKnowledge(); }}>Dismiss</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="panel">
                <h3>Decision Log</h3>
                <div className="psub">The most recent things {ASSISTANT_NAME} and you did, with the reasoning attached, so you can see why, not just what. Newest first.</div>
                {activity.length === 0 && <div className="mini">No activity yet. Once {ASSISTANT_NAME} starts handling messages, every decision shows here.</div>}
                {activity.map((a) => {
                  const d = (a.detail ?? {}) as { action?: string; knowledgeUsed?: string[]; guard?: { blocked?: boolean; violations?: string[] }; preview?: string | null; newState?: string | null };
                  const label = a.action === 'decision'
                    ? (d.action === 'sent' ? 'Sent a reply' : d.action === 'pending_approval' ? 'Drafted for approval' : d.action === 'human_task' ? 'Handed to you' : d.action || 'Decision')
                    : a.action.replace(/_/g, ' ');
                  const blocked = d.guard?.blocked;
                  return (
                    <div key={a.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--line)', fontSize: 12.5 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontWeight: 600 }}>
                          <span style={{ color: 'var(--ink3)', fontWeight: 500, textTransform: 'capitalize' }}>{a.actor}</span> · {label}
                          {blocked && <span className="cstate" style={{ ['--sc' as string]: 'var(--crit)', marginLeft: 6 }}>guard blocked</span>}
                        </span>
                        <span style={{ color: 'var(--ink3)', whiteSpace: 'nowrap' }}>{new Date(a.at).toLocaleString('en-AU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Australia/Melbourne' })}</span>
                      </div>
                      {d.preview && <div style={{ color: 'var(--ink2)', marginTop: 3 }}>&ldquo;{d.preview}&rdquo;</div>}
                      {d.knowledgeUsed && d.knowledgeUsed.length > 0 && <div className="mini" style={{ marginTop: 2 }}>Used: {d.knowledgeUsed.join(', ')}</div>}
                      {blocked && d.guard?.violations && <div className="mini" style={{ marginTop: 2, color: 'var(--crit)' }}>{d.guard.violations.join(', ')}</div>}
                    </div>
                  );
                })}
              </div>

              <div className="panel">
                <h3>A/B Tests Running</h3>
                <div className="psub">{ASSISTANT_NAME} sends A or B at random and measures which converts. Edit variants in the Library.</div>
                {(!report || report.variantTests.length === 0) && <div className="mini">No tests running. Open any message in the Library and add a Variant B to start one.</div>}
                {report?.variantTests.map((v, i) => (
                  <div key={i} style={{ marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--line)' }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{v.title}</div>
                    <div className="frow"><span className="fl">A</span><div className="fbar"><div className="fill" style={{ ['--fc' as string]: '#3987e5', width: `${(v.a.rate ?? 0) * 100}%` }} /></div><span className="fv">{v.a.rate != null ? Math.round(v.a.rate * 100) + '%' : '·'}</span></div>
                    <div className="frow"><span className="fl">B</span><div className="fbar"><div className="fill" style={{ ['--fc' as string]: '#eb6834', width: `${(v.b.rate ?? 0) * 100}%` }} /></div><span className="fv">{v.b.rate != null ? Math.round(v.b.rate * 100) + '%' : '·'}</span></div>
                    <div className="mini">{v.a.sent + v.b.sent} sent · {v.enoughData ? (v.winner === 'tie' ? 'tied' : v.winner + ' is winning') : 'gathering data (needs 20+ each)'}</div>
                  </div>
                ))}
              </div>

              <div className="panel">
                <h3>Problems → Solutions</h3>
                <div className="psub">Auto-detected from the full communication history</div>
                {(report?.insights ?? []).map((ins, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{ins.problem}</div>
                    <div className="sugg" style={{ marginTop: 5 }}><b>Suggested fix</b>{ins.solution}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {view === 'simulator' && <Simulator mode={mode} say={say} onDataChange={refresh} />}
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
                <div className="cav">{AVATAR}</div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: 15 }}>{phoneOf(drawer.waId)}</b>
                  <div style={{ marginTop: 3 }}><span className="cstate" style={{ ['--sc' as string]: stageColorOf(drawer.state) }}>{STATE_LABELS[drawer.state]}</span></div>
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
                      <div className="tinfo"><b>{STATE_LABELS[s]}</b><span>{now < 0 ? 'closed' : i < now ? '✓ done' : i === now ? 'current stage' : 'upcoming'}</span></div>
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
            <div className="mlabel">Live preview: how the customer sees it</div>
            <div className="wapreview"><div className="msg out" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{tplText}</div></div>
            <div className="abtest">
              <div className="mlabel" style={{ marginTop: 14 }}>A/B test (optional)</div>
              <div className="psub" style={{ marginBottom: 6 }}>{ASSISTANT_NAME} sends A or B at random and tracks which converts better. Leave empty for no test.</div>
              {(() => {
                const sA = tpl.sentA ?? 0, cA = tpl.convA ?? 0, sB = tpl.sentB ?? 0, cB = tpl.convB ?? 0;
                const rA = sA ? Math.round((cA / sA) * 100) : null, rB = sB ? Math.round((cB / sB) * 100) : null;
                return (
                  <div className="abstats">
                    <span>A: {sA} sent{rA !== null ? ` · ${rA}% advanced` : ''}</span>
                    {tpl.variantB && <span>B: {sB} sent{rB !== null ? ` · ${rB}% advanced` : ''}{rA !== null && rB !== null ? (rB > rA ? ' · B winning' : rA > rB ? ' · A winning' : '') : ''}</span>}
                  </div>
                );
              })()}
              <textarea className="edit" style={{ minHeight: 70, marginTop: 6 }} value={variantB} onChange={(e) => setVariantB(e.target.value)} placeholder="Variant B wording to test against the main message…" />
              <button className="btn ghost" style={{ marginTop: 6 }} onClick={async () => { await act({ action: 'set_variant_b', id: tpl.id, body: variantB }); say(variantB.trim() ? 'A/B test running ✓' : 'A/B test stopped'); refresh(); }}>{variantB.trim() ? 'Save & Run A/B' : 'Stop A/B test'}</button>
            </div>
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
            <div className="mlabel">Live preview: how the customer sees it</div>
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

      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </>
  );
}
