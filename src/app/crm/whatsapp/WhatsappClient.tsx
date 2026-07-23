'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'

type Stage =
  | 'opening_sent' | 'pitch_sent' | 'reminder_1_sent' | 'reminder_2_sent'
  | 'form_completed' | 'abn_pending' | 'ready' | 'not_relevant' | 'urgent'

type Conversation = {
  id: string; phone: string; firstName: string; language: string
  stage: Stage; hasAbn: boolean | null; residencyCheckResult: string | null
  needsHuman: boolean; escalationReason: string | null
  lastInboundAt: string; lastOutboundAt: string | null
  crmTaskId: string | null; createdAt: string
  manualLabel: string | null
  unread: boolean
}

// Manual labels — completely separate from the automated stage pipeline
// above. Pure sorting tool for the tax agent, mirrors the labels already
// used in the WhatsApp Business App. No bot logic touches these. Add more
// here any time — no migration needed, the column is free text.
const MANUAL_LABELS: { key: string; label: string; color: string }[] = [
  { key: 'medicare',           label: 'Medicare',          color: '#0891b2' },
  { key: 'signature_payment',  label: 'Signature & Payment', color: '#b45309' },
  { key: 'done_2026',          label: 'Done 2026',          color: '#4d7c0f' },
]

// Groups the raw DB stages into the tabs the role doc describes:
// New client → Reminder 1 → Reminder 2 → (ABN pending) → Ready / Not Relevant / Urgent
type Tab = 'new' | 'reminder1' | 'reminder2' | 'abn' | 'ready' | 'urgent' | 'not_relevant'

const TAB_LABELS: Record<Tab, string> = {
  new:          'New',
  reminder1:    'Reminder 1 Sent',
  reminder2:    'Reminder 2 Sent',
  abn:          'ABN Pending',
  ready:        'Ready',
  urgent:       'Urgent',
  not_relevant: 'Not Relevant',
}

const TAB_COLORS: Record<Tab, string> = {
  new:          '#0E5C42',
  reminder1:    '#d97706',
  reminder2:    '#c2410c',
  abn:          '#7c3aed',
  ready:        '#059669',
  urgent:       '#dc2626',
  not_relevant: '#7a8a82',
}

function tabForStage(stage: Stage): Tab {
  switch (stage) {
    case 'opening_sent':
    case 'pitch_sent':          return 'new'
    case 'reminder_1_sent':     return 'reminder1'
    case 'reminder_2_sent':     return 'reminder2'
    case 'abn_pending':
    case 'form_completed':      return 'abn'
    case 'ready':                return 'ready'
    case 'urgent':                return 'urgent'
    case 'not_relevant':          return 'not_relevant'
    default:                      return 'new'
  }
}

// Mirrors CANONICAL_STAGE_FOR_TAB on the server (api/crm/whatsapp/stage) —
// used only for optimistic UI updates right after a manual drag-and-drop
// move, before the server's response comes back.
const CANONICAL_STAGE_FOR_TAB: Record<Tab, Stage> = {
  new:          'pitch_sent',
  reminder1:    'reminder_1_sent',
  reminder2:    'reminder_2_sent',
  abn:          'abn_pending',
  ready:        'ready',
  urgent:       'urgent',
  not_relevant: 'not_relevant',
}

const S = {
  shell: { display:'flex', height:'100vh', overflow:'hidden', fontFamily:'"DM Sans",system-ui,sans-serif' } as React.CSSProperties,
  sb: { width:260, background:'linear-gradient(180deg,#0E5C42 0%,#0a4a35 100%)', display:'flex', flexDirection:'column' as const, flexShrink:0, position:'fixed' as const, top:0, left:0, height:'100vh', overflowY:'auto' as const, zIndex:50 },
  sbLogoRow: { display:'flex', alignItems:'center', gap:12, padding:'22px 16px 16px' },
  sbTitle: { fontSize:14, fontWeight:700, color:'#fff', letterSpacing:'-0.2px' },
  sbSub: { fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:2 },
  sbDiv: { height:1, background:'rgba(255,255,255,0.1)', margin:'4px 16px 10px' },
  sbNav: { display:'flex', flexDirection:'column' as const, gap:4, padding:'0 10px' },
  sbBtn: { display:'flex', alignItems:'center', gap:11, padding:'11px 13px', borderRadius:9, fontSize:13, fontWeight:500, color:'rgba(255,255,255,0.65)', cursor:'pointer', border:'none', background:'none', fontFamily:'inherit', width:'100%', textDecoration:'none' as const },
  sbBtnOn: { background:'rgba(255,255,255,0.18)', color:'#fff', fontWeight:600 },
  main: { flex:1, background:'#f0f4f1', marginLeft:260, height:'100vh', overflowY:'auto' as const },
  page: { padding:'26px 26px 40px' },
  pgTitle: { fontSize:22, fontWeight:700, color:'#0a1410', marginBottom:2, letterSpacing:'-0.5px' },
  card: { background:'#fff', borderRadius:14, border:'1px solid #e4ede8' },
  tabRow: { display:'flex', gap:8, flexWrap:'wrap' as const, marginBottom:18 },
}

function NavLink({ href, label, icon, active }: { href: string; label: string; icon: React.ReactNode; active: boolean }) {
  return (
    <a href={href} style={{...S.sbBtn, ...(active ? S.sbBtnOn : {})}}>
      {icon}{label}
    </a>
  )
}

function timeAgo(iso: string | null): string {
  if (!iso) return '—'
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

/**
 * Urgency indicator: a client is "waiting on us" whenever their most recent
 * inbound message is newer than our most recent outbound one (or we've
 * never replied at all). Returns null when we're not the one holding
 * things up — most recently sent message was ours. Thresholds are a
 * starting point, not a business rule from anywhere else in the app;
 * adjust freely.
 */
function waitingBadge(c: Conversation): { label: string; level: 'ok' | 'warn' | 'critical' } | null {
  const inboundMs = new Date(c.lastInboundAt).getTime()
  const outboundMs = c.lastOutboundAt ? new Date(c.lastOutboundAt).getTime() : -Infinity
  if (inboundMs <= outboundMs) return null // we already replied more recently — not waiting on us

  const elapsedMs = Date.now() - inboundMs
  const mins = Math.floor(elapsedMs / 60_000)
  if (mins < 30) return null // don't clutter the board over something a minute old

  const hrs = Math.floor(mins / 60)
  const label = hrs < 1 ? `${mins}m` : hrs < 24 ? `${hrs}h` : `${Math.floor(hrs / 24)}d`
  const level: 'ok' | 'warn' | 'critical' = hrs >= 24 ? 'critical' : hrs >= 2 ? 'warn' : 'ok'
  return { label, level }
}

const WAITING_COLORS: Record<'ok' | 'warn' | 'critical', { bg: string; fg: string }> = {
  ok:       { bg: '#eef3f0', fg: '#7a8a82' },
  warn:     { bg: '#fef3c7', fg: '#b45309' },
  critical: { bg: '#fee2e2', fg: '#dc2626' },
}

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 30_000): Promise<Response> {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), timeoutMs)
  try { return await fetch(url, { ...init, signal: ctrl.signal }) } finally { clearTimeout(id) }
}

function ReplyBox({ conversationId, onSent }: { conversationId: string; onSent: () => void }) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [err, setErr] = useState('')

  async function send() {
    if (!text.trim() || sending) return
    setSending(true)
    setErr('')
    try {
      const r = await fetchWithTimeout('/api/crm/whatsapp/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, answerText: text.trim() }),
      })
      const d = await r.json()
      if (!d.ok) { setErr(d.error || 'Failed to send'); return }
      setText('')
      onSent()
    } catch (e) {
      console.error('[ReplyBox.send]', e)
      setErr('Network error sending reply.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{marginTop:8, paddingTop:10, borderTop:'1px dashed #f0d4d0'}} onClick={e => e.stopPropagation()}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type the real answer to send back to the client…"
        rows={2}
        style={{width:'100%', fontSize:12.5, fontFamily:'inherit', padding:'8px 10px', borderRadius:8, border:'1px solid #e4ede8', resize:'vertical' as const}}
      />
      <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', marginTop:6}}>
        <button
          onClick={send}
          disabled={sending || !text.trim()}
          style={{
            padding:'6px 14px', borderRadius:7, border:'none', fontSize:12, fontWeight:600, fontFamily:'inherit',
            background: sending || !text.trim() ? '#cde3db' : '#0E5C42', color:'#fff', cursor: sending ? 'default' : 'pointer',
          }}
        >
          {sending ? 'Sending…' : 'Send & Resolve'}
        </button>
      </div>
      {err && <div style={{fontSize:11, color:'#dc2626', marginTop:4}}>{err}</div>}
    </div>
  )
}

type PendingItem = {
  id: number; conversationId: string; phone: string; firstName: string
  proposedText: string; scriptKey: string | null; createdAt: string
}

function PendingApprovalPanel() {
  const [items, setItems] = useState<PendingItem[]>([])
  const [shadowMode, setShadowMode] = useState(true)
  const [loading, setLoading] = useState(true)
  const [drafts, setDrafts] = useState<Record<number, string>>({})
  const [busyId, setBusyId] = useState<number | null>(null)
  const [togglingMode, setTogglingMode] = useState(false)

  const load = useCallback(async () => {
    try {
      const r = await fetchWithTimeout('/api/crm/whatsapp/pending', { cache: 'no-store' })
      const d = await r.json()
      if (d.ok) { setItems(d.items); setShadowMode(d.shadowMode) }
    } catch (e) {
      console.error('[PendingApprovalPanel.load]', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])
  useEffect(() => { const t = setInterval(load, 20_000); return () => clearInterval(t) }, [load])

  async function respond(id: number, action: 'approve' | 'reject') {
    setBusyId(id)
    try {
      const r = await fetchWithTimeout('/api/crm/whatsapp/pending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, editedText: drafts[id] }),
      })
      const d = await r.json()
      if (d.ok) { setItems(prev => prev.filter(i => i.id !== id)); load() }
    } catch (e) {
      console.error('[PendingApprovalPanel.respond]', e)
    } finally {
      setBusyId(null)
    }
  }

  async function toggleShadowMode() {
    setTogglingMode(true)
    try {
      const r = await fetchWithTimeout('/api/crm/whatsapp/shadow-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !shadowMode }),
      })
      const d = await r.json()
      if (d.ok) setShadowMode(d.shadowMode)
    } catch (e) {
      console.error('[PendingApprovalPanel.toggleShadowMode]', e)
    } finally {
      setTogglingMode(false)
    }
  }

  if (loading) return null

  return (
    <div style={{...S.card, marginBottom:18, borderColor: shadowMode ? '#f0d99a' : '#cde3db'}}>
      <div style={{padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom: items.length ? '1px solid #f0f4f1' : 'none'}}>
        <div>
          <div style={{fontSize:13.5, fontWeight:700, color:'#0a1410'}}>
            {shadowMode ? '🛡️ Shadow Mode: ON' : '⚡ Shadow Mode: OFF'}
          </div>
          <div style={{fontSize:11.5, color:'#7a8a82', marginTop:2}}>
            {shadowMode
              ? 'Every automated reply waits for your approval below before it sends.'
              : 'Automated replies send themselves — no approval needed.'}
            {items.length > 0 && ` · ${items.length} waiting for review`}
          </div>
        </div>
        <button
          onClick={toggleShadowMode}
          disabled={togglingMode}
          style={{
            padding:'8px 16px', borderRadius:8, border:'none', fontSize:12, fontWeight:600, fontFamily:'inherit', cursor: togglingMode ? 'default' : 'pointer',
            background: shadowMode ? '#0E5C42' : '#fff7e8', color: shadowMode ? '#fff' : '#7a5a10',
            ...(shadowMode ? {} : { border: '1px solid #f0d99a' }),
          }}
        >
          {togglingMode ? '…' : shadowMode ? 'Turn Off (go live)' : 'Turn On (require approval)'}
        </button>
      </div>

      {items.map(item => (
        <div key={item.id} style={{padding:'14px 18px', borderBottom:'1px solid #f0f4f1'}}>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:11.5, color:'#7a8a82', marginBottom:6}}>
            <span>{item.firstName || 'Unknown'} · {item.phone}{item.scriptKey ? ` · ${item.scriptKey}` : ''}</span>
            <span>{timeAgo(item.createdAt)}</span>
          </div>
          <textarea
            defaultValue={item.proposedText}
            onChange={e => setDrafts(prev => ({ ...prev, [item.id]: e.target.value }))}
            rows={3}
            style={{width:'100%', fontSize:12.5, fontFamily:'inherit', padding:'8px 10px', borderRadius:8, border:'1px solid #e4ede8', resize:'vertical' as const}}
          />
          <div style={{display:'flex', gap:8, marginTop:8, justifyContent:'flex-end'}}>
            <button
              onClick={() => respond(item.id, 'reject')}
              disabled={busyId === item.id}
              style={{padding:'6px 14px', borderRadius:7, border:'1px solid #f3b7b0', background:'#fff', color:'#dc2626', fontSize:12, fontWeight:600, fontFamily:'inherit', cursor: busyId === item.id ? 'default' : 'pointer'}}
            >
              Reject
            </button>
            <button
              onClick={() => respond(item.id, 'approve')}
              disabled={busyId === item.id}
              style={{padding:'6px 14px', borderRadius:7, border:'none', background:'#0E5C42', color:'#fff', fontSize:12, fontWeight:600, fontFamily:'inherit', cursor: busyId === item.id ? 'default' : 'pointer'}}
            >
              {busyId === item.id ? 'Sending…' : 'Approve & Send'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

type ScriptStat = {
  scriptKey: string; approvedUnedited: number; approvedEdited: number
  rejected: number; total: number; readinessScore: number
}

function readinessLabel(score: number, total: number): { text: string; color: string } {
  if (total < 5) return { text: 'Not enough data yet', color: '#7a8a82' }
  if (score >= 0.9) return { text: 'Looks ready to graduate', color: '#059669' }
  if (score >= 0.6) return { text: 'Getting there', color: '#d97706' }
  return { text: 'Still needs work', color: '#dc2626' }
}

function ReadinessStatsPanel() {
  const [stats, setStats] = useState<ScriptStat[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const r = await fetchWithTimeout('/api/crm/whatsapp/stats', { cache: 'no-store' })
        const d = await r.json()
        if (d.ok) setStats(d.stats)
      } catch (e) {
        console.error('[ReadinessStatsPanel]', e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading || stats.length === 0) return null

  return (
    <div style={{...S.card, marginBottom:18}}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{width:'100%', padding:'12px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit'}}
      >
        <span style={{fontSize:13, fontWeight:700, color:'#0a1410'}}>📊 Script Readiness ({stats.length} scripts tracked)</span>
        <span style={{fontSize:12, color:'#7a8a82'}}>{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && (
        <div style={{padding:'0 18px 14px'}}>
          <p style={{fontSize:11.5, color:'#7a8a82', marginBottom:10}}>
            How often each script gets approved untouched vs edited or rejected — this is what tells you which
            scripts are ready to run without approval, and which still need work.
          </p>
          {stats.map(s => {
            const label = readinessLabel(s.readinessScore, s.total)
            return (
              <div key={s.scriptKey} style={{padding:'8px 0', borderBottom:'1px solid #f0f4f1'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{fontSize:12, fontWeight:600, color:'#0a1410', fontFamily:'Consolas,monospace'}}>{s.scriptKey}</span>
                  <span style={{fontSize:11, fontWeight:600, color:label.color}}>{label.text}</span>
                </div>
                <div style={{fontSize:11, color:'#7a8a82', marginTop:2}}>
                  ✓ {s.approvedUnedited} sent as-is · ✎ {s.approvedEdited} edited · ✕ {s.rejected} rejected
                  {' '}({Math.round(s.readinessScore * 100)}% approved untouched)
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function LabelPicker({ conversationId, currentLabel, onChanged }: { conversationId: string; currentLabel: string | null; onChanged: () => void }) {
  const [saving, setSaving] = useState(false)

  async function setLabel(newLabel: string | null) {
    setSaving(true)
    try {
      const r = await fetchWithTimeout('/api/crm/whatsapp/label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, label: newLabel }),
      })
      const d = await r.json()
      if (d.ok) onChanged()
    } catch (e) {
      console.error('[LabelPicker.setLabel]', e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <select
      value={currentLabel ?? ''}
      disabled={saving}
      onChange={e => setLabel(e.target.value || null)}
      onClick={e => e.stopPropagation()}
      style={{
        fontSize:11, fontFamily:'inherit', padding:'4px 8px', borderRadius:6,
        border:'1px solid #e4ede8', background:'#fff', color:'#4a5a52', cursor: saving ? 'default' : 'pointer',
      }}
    >
      <option value="">Move to…</option>
      {MANUAL_LABELS.map(l => (
        <option key={l.key} value={l.key}>{l.label}</option>
      ))}
    </select>
  )
}

type ThreadMessage = {
  id: number; direction: 'inbound' | 'outbound'; body: string
  scriptKey: string | null; createdAt: string
}

// Manual, human-only override — works from ANY stage (new, reminders,
// abn_pending, ready, urgent, even already not_relevant), regardless of
// what the automated pipeline is doing with this conversation. A simple
// confirm() guards against accidental clicks, since this pulls the
// conversation out of the active flow immediately.
function NotRelevantButton({ conversationId, currentStage, onChanged }: { conversationId: string; currentStage: Stage; onChanged: () => void }) {
  const [saving, setSaving] = useState(false)
  if (currentStage === 'not_relevant') return null

  async function markNotRelevant() {
    if (!window.confirm('Mark this conversation as Not Relevant? This overrides whatever stage it\'s currently in.')) return
    setSaving(true)
    try {
      const r = await fetchWithTimeout('/api/crm/whatsapp/mark-not-relevant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId }),
      })
      const d = await r.json()
      if (d.ok) onChanged()
    } catch (e) {
      console.error('[NotRelevantButton.markNotRelevant]', e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <button
      onClick={e => { e.stopPropagation(); markNotRelevant() }}
      disabled={saving}
      style={{
        fontSize:11, fontFamily:'inherit', padding:'4px 9px', borderRadius:6,
        border:'1px solid #f3d0d0', background:'#fff', color:'#b91c1c', cursor: saving ? 'default' : 'pointer', fontWeight:600,
      }}
    >
      {saving ? '…' : 'Not Relevant'}
    </button>
  )
}

// Detects the special media-message format the webhook logs (see
// route.ts): "[📷 Image] https://... — "caption"" or "[📎 Document] https://...".
function parseMediaMessage(body: string): { label: string; url: string; caption: string } | null {
  const match = body.match(/^\[(📷 Image|📎 Document)\]\s+(\S+)(?:\s+—\s+"([^"]*)")?/)
  if (!match) return null
  return { label: match[1], url: match[2], caption: match[3] || '' }
}

function formatThreadTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-AU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function ThreadModal({ conversationId, name, phone, stage, onClose, onChanged }: { conversationId: string; name: string; phone: string; stage: Stage; onClose: () => void; onChanged: () => void }) {
  const [messages, setMessages] = useState<ThreadMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [replyText, setReplyText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const load = useCallback(async () => {
    try {
      const r = await fetchWithTimeout(`/api/crm/whatsapp/messages?conversationId=${encodeURIComponent(conversationId)}`, { cache: 'no-store' })
      const d = await r.json()
      if (d.ok) setMessages(d.messages)
      else setError(d.error || 'Failed to load messages')
    } catch (e) {
      console.error('[ThreadModal.load]', e)
      setError('Network error loading messages.')
    } finally {
      setLoading(false)
    }
  }, [conversationId])

  useEffect(() => { load() }, [load])
  // Live refresh: poll for new messages every 4s while this thread is open,
  // so incoming client messages appear without closing/reopening the modal.
  useEffect(() => {
    const t = setInterval(load, 4_000)
    return () => clearInterval(t)
  }, [load])
  useEffect(() => { bottomRef.current?.scrollIntoView({ block: 'end' }) }, [messages])

  async function send() {
    if (!replyText.trim() || sending) return
    setSending(true)
    try {
      const r = await fetchWithTimeout('/api/crm/whatsapp/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, answerText: replyText.trim() }),
      })
      const d = await r.json()
      if (d.ok) { setReplyText(''); load() }
      else setError(d.error || 'Failed to send')
    } catch (e) {
      console.error('[ThreadModal.send]', e)
      setError('Network error sending reply.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{position:'fixed', inset:0, background:'rgba(10,20,16,0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:20}}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{background:'#f0f4f1', borderRadius:16, width:'100%', maxWidth:560, height:'85vh', display:'flex', flexDirection:'column' as const, overflow:'hidden'}}>
        <div style={{background:'#0E5C42', padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0}}>
          <div>
            <div style={{color:'#fff', fontSize:14.5, fontWeight:700}}>{name || 'Unknown'}</div>
            <div style={{color:'rgba(255,255,255,0.7)', fontSize:11.5}}>{phone}</div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            {stage !== 'not_relevant' && (
              <NotRelevantButton conversationId={conversationId} currentStage={stage} onChanged={() => { onChanged(); onClose() }} />
            )}
            <button onClick={onClose} style={{background:'none', border:'none', color:'#fff', fontSize:20, cursor:'pointer', lineHeight:1, padding:4}}>✕</button>
          </div>
        </div>

        <div style={{flex:1, overflowY:'auto' as const, padding:'16px 18px', display:'flex', flexDirection:'column' as const, gap:10}}>
          {loading && <div style={{textAlign:'center' as const, color:'#7a8a82', fontSize:13, marginTop:20}}>Loading…</div>}
          {error && <div style={{textAlign:'center' as const, color:'#dc2626', fontSize:13}}>{error}</div>}
          {!loading && !error && messages.length === 0 && (
            <div style={{textAlign:'center' as const, color:'#aabab2', fontSize:13, marginTop:20}}>No messages yet.</div>
          )}
          {messages.map(m => {
            const media = parseMediaMessage(m.body)
            const isOut = m.direction === 'outbound'
            return (
              <div key={m.id} style={{alignSelf: isOut ? 'flex-end' : 'flex-start', maxWidth:'78%'}}>
                <div style={{
                  background: isOut ? '#0E5C42' : '#fff', color: isOut ? '#fff' : '#0a1410',
                  border: isOut ? 'none' : '1px solid #e4ede8', borderRadius:12,
                  padding:'9px 12px', fontSize:13, lineHeight:1.5, whiteSpace:'pre-wrap' as const, wordBreak:'break-word' as const,
                }}>
                  {media ? (
                    <>
                      <a href={media.url} target="_blank" rel="noopener noreferrer" style={{color: isOut ? '#fff' : '#0E5C42', fontWeight:600, textDecoration:'underline'}}>
                        {media.label} — open file
                      </a>
                      {media.caption && <div style={{marginTop:4, opacity:0.85}}>&ldquo;{media.caption}&rdquo;</div>}
                    </>
                  ) : m.body}
                </div>
                <div style={{fontSize:10, color:'#9aada3', marginTop:3, textAlign: isOut ? 'right' as const : 'left' as const}}>
                  {formatThreadTime(m.createdAt)}
                  {m.scriptKey && ` · ${m.scriptKey}`}
                </div>
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>

        <div style={{borderTop:'1px solid #e4ede8', background:'#fff', padding:'12px 16px', flexShrink:0}}>
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Type a reply…"
            rows={2}
            style={{width:'100%', fontSize:13, fontFamily:'inherit', padding:'8px 10px', borderRadius:8, border:'1px solid #e4ede8', resize:'vertical' as const, boxSizing:'border-box' as const}}
          />
          <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', marginTop:6}}>
            <button
              onClick={send}
              disabled={sending || !replyText.trim()}
              style={{padding:'7px 16px', borderRadius:7, border:'none', fontSize:12.5, fontWeight:600, fontFamily:'inherit', background: sending || !replyText.trim() ? '#cde3db' : '#0E5C42', color:'#fff', cursor: sending ? 'default' : 'pointer'}}
            >
              {sending ? 'Sending…' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WhatsappClient() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('new')
  const [manualFilter, setManualFilter] = useState<string | null>(null)
  const [openThread, setOpenThread] = useState<{ id: string; name: string; phone: string; stage: Stage } | null>(null)
  const [phoneSearch, setPhoneSearch] = useState('')
  const [dragOverTab, setDragOverTab] = useState<Tab | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [listTruncated, setListTruncated] = useState(false)
  const hasLoadedOnce = useRef(false)

  const load = useCallback(async () => {
    // Only the very first load shows the full-page spinner — the 15s
    // background refresh should never make the whole board flash/reset,
    // it just quietly updates in place.
    if (!hasLoadedOnce.current) setLoading(true)
    setError('')
    try {
      const r = await fetchWithTimeout('/api/crm/whatsapp', { cache: 'no-store' })
      const d = await r.json()
      if (d.ok) {
        setConversations(d.conversations)
        setListTruncated(Boolean(d.truncated))
      } else {
        setError(d.error || `Failed to load WhatsApp leads (HTTP ${r.status})`)
      }
    } catch (e) {
      console.error('[WhatsappClient.load]', e)
      setError('Network error loading WhatsApp leads. Check your connection and try again.')
    } finally {
      hasLoadedOnce.current = true
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])
  // Light auto-refresh so the board feels live without a full websocket setup.
  useEffect(() => { const t = setInterval(load, 15_000); return () => clearInterval(t) }, [load])

  // Manual pipeline override: the tax agent dragging a lead onto a stage
  // in the pipeline bar. Independent of whatever the automated flow thinks
  // — the agent's call always wins, immediately, no confirmation needed
  // (mirrors how a physical kanban board works).
  async function moveConversationToTab(conversationId: string, tab: Tab) {
    // Optimistic UI: reflect the move immediately rather than waiting on
    // the round-trip, then reconcile with the server's response.
    setConversations(prev => prev.map(c =>
      c.id === conversationId ? { ...c, stage: CANONICAL_STAGE_FOR_TAB[tab] } : c
    ))
    try {
      const r = await fetchWithTimeout('/api/crm/whatsapp/stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, tab }),
      })
      const d = await r.json()
      if (!d.ok) { console.error('[moveConversationToTab]', d.error); load() } // reconcile on failure
    } catch (e) {
      console.error('[moveConversationToTab]', e)
      load() // reconcile on network error
    }
  }

  // Bulk actions: apply a single-item action to every currently-selected
  // conversation. Deliberately reuses the same single-conversation
  // endpoints (stage move, label) rather than adding new bulk-specific
  // API routes — at real-world selection sizes (tens of conversations,
  // not thousands at once) a handful of parallel requests is simpler and
  // lower-risk than a new server code path, and the UX is identical.
  async function bulkMoveToTab(tab: Tab) {
    const ids = Array.from(selectedIds)
    if (!ids.length) return
    setConversations(prev => prev.map(c => ids.includes(c.id) ? { ...c, stage: CANONICAL_STAGE_FOR_TAB[tab] } : c))
    setSelectedIds(new Set())
    await Promise.all(ids.map(id =>
      fetchWithTimeout('/api/crm/whatsapp/stage', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: id, tab }),
      }).catch(e => console.error('[bulkMoveToTab]', id, e))
    ))
    load()
  }

  async function bulkApplyLabel(labelKey: string | null) {
    const ids = Array.from(selectedIds)
    if (!ids.length) return
    setSelectedIds(new Set())
    await Promise.all(ids.map(id =>
      fetchWithTimeout('/api/crm/whatsapp/label', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: id, label: labelKey }),
      }).catch(e => console.error('[bulkApplyLabel]', id, e))
    ))
    load()
  }

  function toggleSelected(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const counts: Record<Tab, number> = { new:0, reminder1:0, reminder2:0, abn:0, ready:0, urgent:0, not_relevant:0 }
  for (const c of conversations) counts[tabForStage(c.stage)]++

  const manualCounts: Record<string, number> = {}
  for (const l of MANUAL_LABELS) manualCounts[l.key] = 0
  for (const c of conversations) if (c.manualLabel && manualCounts[c.manualLabel] !== undefined) manualCounts[c.manualLabel]++

  const normalizedSearch = phoneSearch.replace(/[^\d]/g, '')
  const searchText = phoneSearch.trim().toLowerCase()

  const visible = conversations
    .filter(c => {
      if (searchText) {
        const phoneMatch = normalizedSearch && c.phone.replace(/[^\d]/g, '').includes(normalizedSearch)
        const nameMatch = c.firstName && c.firstName.toLowerCase().includes(searchText)
        return Boolean(phoneMatch || nameMatch)
      }
      return manualFilter ? c.manualLabel === manualFilter : tabForStage(c.stage) === tab
    })
    .sort((a, b) => {
      // Unread leads always float above ones you've already opened —
      // opening a conversation sinks it to the end of the queue.
      if (a.unread !== b.unread) return a.unread ? -1 : 1
      return new Date(b.lastInboundAt).getTime() - new Date(a.lastInboundAt).getTime()
    })

  return (
    <div style={S.shell}>
      <style>{`
        @keyframes waUnreadPulse {
          0%   { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); }
          70%  { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
      `}</style>
      <aside style={S.sb}>
        <div style={S.sbLogoRow}>
          <div style={{width:34,height:34,borderRadius:9,flexShrink:0,overflow:'hidden'}}>
            <svg width="34" height="34" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="100" fill="#0B5240"/>
              <g transform="translate(100,100) scale(3.57) translate(-17,-17)">
                <rect x="2" y="2" width="19" height="19" rx="4.5" stroke="#5BB88A" strokeWidth="2" fill="none"/>
                <rect x="13" y="13" width="19" height="19" rx="4.5" fill="white"/>
                <line x1="2" y1="2" x2="13" y2="13" stroke="#E9A020" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="2" cy="2" r="1.8" fill="#E9A020"/>
                <path d="M22.5 16.5L27.3 18.7L27.3 23.5Q27.3 27.3 22.5 29.3Q17.7 27.3 17.7 23.5L17.7 18.7Z" fill="rgba(11,82,64,0.12)" stroke="#0B5240" strokeWidth="1.3" strokeLinejoin="round"/>
                <polyline points="20.4,23 22.2,25 25,21.5" fill="none" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
          </div>
          <div>
            <div style={S.sbTitle}>Working Holiday Tax</div>
            <div style={S.sbSub}>Admin Console</div>
          </div>
        </div>
        <div style={S.sbDiv}/>
        <nav style={S.sbNav}>
          <NavLink href="/crm/dashboard" label="Tasks" active={false}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg>}/>
          <NavLink href="/crm/dashboard" label="Clients" active={false}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/></svg>}/>
          <NavLink href="/crm/dashboard" label="Archive" active={false}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 8v13H3V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 3H1v5h22V3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}/>
          <NavLink href="/crm/partners" label="Partners" active={false}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}/>
          <NavLink href="/crm/whatsapp" label="WhatsApp Leads" active={true}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}/>
        </nav>
      </aside>

      <main style={S.main}>
        <div style={S.page}>
          <div style={{marginBottom:16}}>
            <h1 style={S.pgTitle}>WhatsApp Leads</h1>
            <p style={{fontSize:13, color:'#7a8a82', marginTop:2}}>
              Everyone who's messaged on WhatsApp, before they become a client task.
            </p>
          </div>

          <div style={{position:'relative', marginBottom:16, maxWidth:360}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none'}}>
              <circle cx="11" cy="11" r="7" stroke="#9aada3" strokeWidth="2"/>
              <path d="M21 21l-4.3-4.3" stroke="#9aada3" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              inputMode="tel"
              value={phoneSearch}
              onChange={e => setPhoneSearch(e.target.value)}
              placeholder="Search by name or WhatsApp number…"
              style={{
                width:'100%', boxSizing:'border-box' as const, padding:'9px 34px 9px 34px', borderRadius:9,
                border:'1.5px solid #e4ede8', fontSize:13, fontFamily:'inherit', background:'#fff', color:'#0a1410',
              }}
            />
            {phoneSearch && (
              <button
                onClick={() => setPhoneSearch('')}
                aria-label="Clear search"
                style={{
                  position:'absolute', right:8, top:'50%', transform:'translateY(-50%)',
                  background:'none', border:'none', cursor:'pointer', color:'#9aada3', fontSize:15, padding:4, lineHeight:1,
                }}
              >✕</button>
            )}
          </div>

          {listTruncated && (
            <div style={{padding:'10px 14px', borderRadius:9, background:'#fef3c7', color:'#92400e', fontSize:12.5, fontWeight:600, marginBottom:14}}>
              ⚠ Showing the 3,000 most recent leads only — you have more than that in total. Time to add real pagination; let your developer know.
            </div>
          )}

          <PendingApprovalPanel />
          <ReadinessStatsPanel />

          <div style={{fontSize:11, fontWeight:700, color:'#9aada3', textTransform:'uppercase' as const, letterSpacing:'0.05em', marginBottom:6}}>
            Pipeline <span style={{fontWeight:500, textTransform:'none' as const, letterSpacing:'normal', color:'#aabab2'}}>— click to filter, or drag a lead onto a stage to move it manually</span>
          </div>
          <div style={{display:'flex', alignItems:'center', overflowX:'auto' as const, padding:'6px 2px 14px', marginBottom:4}}>
            {(Object.keys(TAB_LABELS) as Tab[]).map((t, i) => (
              <React.Fragment key={t}>
                {i > 0 && (
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{flexShrink:0, margin:'0 2px'}}>
                    <path d="M1 7h16M12 2l6 5-6 5" stroke="#d5e0da" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                <button
                  onClick={() => { setTab(t); setManualFilter(null) }}
                  onDragOver={e => { e.preventDefault(); if (dragOverTab !== t) setDragOverTab(t) }}
                  onDragLeave={() => setDragOverTab(prev => prev === t ? null : prev)}
                  onDrop={e => {
                    e.preventDefault()
                    setDragOverTab(null)
                    const id = e.dataTransfer.getData('text/plain')
                    if (id) moveConversationToTab(id, t)
                  }}
                  style={{
                    display:'flex', flexDirection:'column' as const, alignItems:'center', gap:5, padding:'6px 10px',
                    borderRadius:10, cursor:'pointer', fontFamily:'inherit', flexShrink:0, minWidth:74,
                    border: dragOverTab===t ? `1.5px dashed ${TAB_COLORS[t]}` : '1.5px solid transparent',
                    background: dragOverTab===t ? `${TAB_COLORS[t]}12` : 'transparent',
                  }}>
                  <span style={{
                    width:34, height:34, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:13.5, fontWeight:700,
                    background: !manualFilter && tab===t ? TAB_COLORS[t] : `${TAB_COLORS[t]}18`,
                    color: !manualFilter && tab===t ? '#fff' : TAB_COLORS[t],
                  }}>{counts[t]}</span>
                  <span style={{
                    fontSize:11, fontWeight: !manualFilter && tab===t ? 700 : 500, textAlign:'center' as const, lineHeight:1.2,
                    color: !manualFilter && tab===t ? TAB_COLORS[t] : '#7a8a82',
                  }}>{TAB_LABELS[t]}</span>
                </button>
              </React.Fragment>
            ))}
          </div>

          <div style={{fontSize:11, fontWeight:700, color:'#9aada3', textTransform:'uppercase' as const, letterSpacing:'0.05em', marginBottom:6}}>Manual Labels</div>
          <div style={S.tabRow}>
            {MANUAL_LABELS.map(l => (
              <button key={l.key} onClick={() => setManualFilter(l.key)}
                style={{
                  display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:9,
                  fontSize:12.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
                  border: manualFilter===l.key ? `1.5px solid ${l.color}` : '1.5px solid #e4ede8',
                  background: manualFilter===l.key ? `${l.color}12` : '#fff',
                  color: manualFilter===l.key ? l.color : '#4a5a52',
                }}>
                {l.label}
                <span style={{
                  background: manualFilter===l.key ? l.color : '#eef3f0', color: manualFilter===l.key ? '#fff' : '#7a8a82',
                  borderRadius: 999, fontSize:10.5, fontWeight:700, padding:'1px 7px', minWidth:18, textAlign:'center' as const,
                }}>{manualCounts[l.key] ?? 0}</span>
              </button>
            ))}
          </div>

          <div style={S.card}>
            {selectedIds.size > 0 && (
              <div style={{
                display:'flex', alignItems:'center', gap:10, padding:'10px 18px',
                background:'#0E5C4208', borderBottom:'1px solid #e4ede8', flexWrap:'wrap' as const,
              }}>
                <span style={{fontSize:12.5, fontWeight:700, color:'#0E5C42'}}>{selectedIds.size} selected</span>
                <select
                  defaultValue=""
                  onChange={e => { if (e.target.value) bulkMoveToTab(e.target.value as Tab); e.target.value = '' }}
                  style={{fontSize:12, fontFamily:'inherit', padding:'5px 8px', borderRadius:6, border:'1px solid #d5e0da', color:'#4a5a52', background:'#fff'}}
                >
                  <option value="" disabled>Move to…</option>
                  {(Object.keys(TAB_LABELS) as Tab[]).map(t => <option key={t} value={t}>{TAB_LABELS[t]}</option>)}
                </select>
                <select
                  defaultValue=""
                  onChange={e => { bulkApplyLabel(e.target.value === '__clear__' ? null : e.target.value || null); e.target.value = '' }}
                  style={{fontSize:12, fontFamily:'inherit', padding:'5px 8px', borderRadius:6, border:'1px solid #d5e0da', color:'#4a5a52', background:'#fff'}}
                >
                  <option value="" disabled>Apply label…</option>
                  {MANUAL_LABELS.map(l => <option key={l.key} value={l.key}>{l.label}</option>)}
                  <option value="__clear__">— Clear label —</option>
                </select>
                <button
                  onClick={() => setSelectedIds(new Set())}
                  style={{marginLeft:'auto', fontSize:12, color:'#7a8a82', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit'}}
                >Clear selection</button>
              </div>
            )}
            {!loading && !error && visible.length > 0 && (
              <div style={{display:'flex', alignItems:'center', gap:8, padding:'8px 18px', borderBottom:'1px solid #f0f4f1'}}>
                <input
                  type="checkbox"
                  checked={visible.every(c => selectedIds.has(c.id))}
                  onChange={e => setSelectedIds(e.target.checked ? new Set(visible.map(c => c.id)) : new Set())}
                />
                <span style={{fontSize:11, color:'#9aada3'}}>Select all ({visible.length})</span>
              </div>
            )}
            {loading && <div style={{padding:40, textAlign:'center' as const, color:'#7a8a82', fontSize:13}}>Loading…</div>}
            {error && <div style={{padding:40, textAlign:'center' as const, color:'#dc2626', fontSize:13}}>{error}</div>}
            {!loading && !error && visible.length === 0 && (
              <div style={{padding:40, textAlign:'center' as const, color:'#aabab2', fontSize:13}}>
                {searchText
                  ? <>No leads match &ldquo;{phoneSearch}&rdquo;.</>
                  : <>Nobody in &ldquo;{manualFilter ? MANUAL_LABELS.find(l => l.key === manualFilter)?.label : TAB_LABELS[tab]}&rdquo; right now.</>
                }
              </div>
            )}
            {!loading && !error && visible.map(c => {
              const badge = waitingBadge(c)
              return (
              <div key={c.id}
                draggable
                onDragStart={e => { e.dataTransfer.setData('text/plain', c.id); e.dataTransfer.effectAllowed = 'move' }}
                style={{
                  padding:'14px 18px', borderBottom:'1px solid #f0f4f1', cursor:'pointer',
                  background: selectedIds.has(c.id) ? '#0E5C4208' : 'transparent',
                }} onClick={() => setOpenThread({ id: c.id, name: c.firstName, phone: c.phone, stage: c.stage })}>
                <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12}}>
                  <div style={{display:'flex', alignItems:'flex-start', gap:10, minWidth:0}}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(c.id)}
                      onClick={e => e.stopPropagation()}
                      onChange={() => toggleSelected(c.id)}
                      style={{marginTop:3, flexShrink:0, cursor:'pointer'}}
                    />
                    <div style={{minWidth:0}}>
                      <div style={{fontSize:13.5, fontWeight:600, color:'#0a1410', display:'flex', alignItems:'center', gap:7}}>
                        {c.unread && (
                          <span
                            title="Unread"
                            style={{
                              width:9, height:9, borderRadius:'50%', background:'#22c55e', flexShrink:0,
                              animation:'waUnreadPulse 1.6s infinite',
                            }}
                          />
                        )}
                        {c.firstName || 'Unknown name'}
                        {c.language === 'ja' && <span style={{marginLeft:6, fontSize:10, color:'#7a8a82', fontWeight:500}}>🇯🇵 JA</span>}
                        {c.language === 'de' && <span style={{marginLeft:6, fontSize:10, color:'#7a8a82', fontWeight:500}}>🇩🇪 DE</span>}
                      </div>
                      <div style={{fontSize:11.5, color:'#7a8a82', marginTop:2}}>{c.phone}</div>
                      {c.needsHuman && c.escalationReason && (
                        <div style={{fontSize:11.5, color:'#dc2626', marginTop:4, fontWeight:500}}>⚠ {c.escalationReason}</div>
                      )}
                      {c.hasAbn && (
                        <span style={{display:'inline-block', marginTop:4, fontSize:10, fontWeight:600, color:'#7c3aed', background:'#f3ebfd', padding:'2px 7px', borderRadius:5}}>ABN</span>
                      )}
                      {c.manualLabel && (
                        <span style={{display:'inline-block', marginTop:4, marginLeft: c.hasAbn ? 6 : 0, fontSize:10, fontWeight:600, color:'#4a5a52', background:'#eef3f0', padding:'2px 7px', borderRadius:5}}>
                          {MANUAL_LABELS.find(l => l.key === c.manualLabel)?.label ?? c.manualLabel}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{textAlign:'right' as const, flexShrink:0, display:'flex', flexDirection:'column' as const, alignItems:'flex-end', gap:6}}>
                    <div style={{display:'flex', alignItems:'center', gap:6}}>
                      {badge && (
                        <span
                          title="Time waiting on a reply from us"
                          style={{
                            fontSize:10.5, fontWeight:700, padding:'2px 7px', borderRadius:5,
                            background: WAITING_COLORS[badge.level].bg, color: WAITING_COLORS[badge.level].fg,
                          }}
                        >⏱ {badge.label}</span>
                      )}
                      <div style={{fontSize:11.5, color:'#4a5a52', fontWeight:500}}>{timeAgo(c.lastInboundAt)}</div>
                    </div>
                    {c.crmTaskId && (
                      <a href={`/crm/dashboard`} onClick={e => e.stopPropagation()} style={{fontSize:10.5, color:'#0E5C42', fontWeight:600}}>View task →</a>
                    )}
                    <div style={{display:'flex', gap:6}}>
                      <NotRelevantButton conversationId={c.id} currentStage={c.stage} onChanged={load} />
                      <LabelPicker conversationId={c.id} currentLabel={c.manualLabel} onChanged={load} />
                    </div>
                  </div>
                </div>
                {!manualFilter && tab === 'urgent' && c.needsHuman && (
                  <ReplyBox conversationId={c.id} onSent={load} />
                )}
              </div>
              )
            })}
          </div>
        </div>
      </main>

      {openThread && (
        <ThreadModal
          conversationId={openThread.id}
          name={openThread.name}
          phone={openThread.phone}
          stage={openThread.stage}
          onClose={() => { setOpenThread(null); load() }}
          onChanged={load}
        />
      )}
    </div>
  )
}
