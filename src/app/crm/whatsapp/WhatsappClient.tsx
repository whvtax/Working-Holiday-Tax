'use client'
import React, { useState, useEffect, useCallback } from 'react'

type Stage =
  | 'opening_sent' | 'pitch_sent' | 'reminder_1_sent' | 'reminder_2_sent'
  | 'form_completed' | 'abn_pending' | 'ready' | 'not_relevant' | 'urgent'

type Conversation = {
  id: string; phone: string; firstName: string; language: string
  stage: Stage; hasAbn: boolean | null; residencyCheckResult: string | null
  needsHuman: boolean; escalationReason: string | null
  lastInboundAt: string; lastOutboundAt: string | null
  crmTaskId: string | null; createdAt: string
}

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

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 30_000): Promise<Response> {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), timeoutMs)
  try { return await fetch(url, { ...init, signal: ctrl.signal }) } finally { clearTimeout(id) }
}

export default function WhatsappClient() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('new')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const r = await fetchWithTimeout('/api/crm/whatsapp', { cache: 'no-store' })
      const d = await r.json()
      if (d.ok) setConversations(d.conversations)
      else setError(d.error || `Failed to load WhatsApp leads (HTTP ${r.status})`)
    } catch (e) {
      console.error('[WhatsappClient.load]', e)
      setError('Network error loading WhatsApp leads. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])
  // Light auto-refresh so the board feels live without a full websocket setup.
  useEffect(() => { const t = setInterval(load, 60_000); return () => clearInterval(t) }, [load])

  const counts: Record<Tab, number> = { new:0, reminder1:0, reminder2:0, abn:0, ready:0, urgent:0, not_relevant:0 }
  for (const c of conversations) counts[tabForStage(c.stage)]++

  const visible = conversations
    .filter(c => tabForStage(c.stage) === tab)
    .sort((a, b) => new Date(b.lastInboundAt).getTime() - new Date(a.lastInboundAt).getTime())

  return (
    <div style={S.shell}>
      <aside style={S.sb}>
        <div style={S.sbLogoRow}>
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
          <NavLink href="/crm/whatsapp" label="WhatsApp Leads" active={true}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20.5 3.5a10.5 10.5 0 00-17.9 10.9L2 21l6.8-.6A10.5 10.5 0 1020.5 3.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>}/>
          <NavLink href="/crm/partners" label="Partners" active={false}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}/>
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

          <div style={S.tabRow}>
            {(Object.keys(TAB_LABELS) as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:9,
                  fontSize:12.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
                  border: tab===t ? `1.5px solid ${TAB_COLORS[t]}` : '1.5px solid #e4ede8',
                  background: tab===t ? `${TAB_COLORS[t]}12` : '#fff',
                  color: tab===t ? TAB_COLORS[t] : '#4a5a52',
                }}>
                {TAB_LABELS[t]}
                <span style={{
                  background: tab===t ? TAB_COLORS[t] : '#eef3f0', color: tab===t ? '#fff' : '#7a8a82',
                  borderRadius: 999, fontSize:10.5, fontWeight:700, padding:'1px 7px', minWidth:18, textAlign:'center' as const,
                }}>{counts[t]}</span>
              </button>
            ))}
          </div>

          <div style={S.card}>
            {loading && <div style={{padding:40, textAlign:'center' as const, color:'#7a8a82', fontSize:13}}>Loading…</div>}
            {error && <div style={{padding:40, textAlign:'center' as const, color:'#dc2626', fontSize:13}}>{error}</div>}
            {!loading && !error && visible.length === 0 && (
              <div style={{padding:40, textAlign:'center' as const, color:'#aabab2', fontSize:13}}>
                Nobody in &ldquo;{TAB_LABELS[tab]}&rdquo; right now.
              </div>
            )}
            {!loading && !error && visible.map(c => (
              <div key={c.id} style={{
                padding:'14px 18px', borderBottom:'1px solid #f0f4f1',
                display:'flex', alignItems:'center', justifyContent:'space-between', gap:12,
              }}>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:13.5, fontWeight:600, color:'#0a1410'}}>
                    {c.firstName || 'Unknown name'}
                    {c.language === 'ja' && <span style={{marginLeft:6, fontSize:10, color:'#7a8a82', fontWeight:500}}>🇯🇵 JA</span>}
                  </div>
                  <div style={{fontSize:11.5, color:'#7a8a82', marginTop:2}}>{c.phone}</div>
                  {c.needsHuman && c.escalationReason && (
                    <div style={{fontSize:11.5, color:'#dc2626', marginTop:4, fontWeight:500}}>⚠ {c.escalationReason}</div>
                  )}
                  {c.hasAbn && (
                    <span style={{display:'inline-block', marginTop:4, fontSize:10, fontWeight:600, color:'#7c3aed', background:'#f3ebfd', padding:'2px 7px', borderRadius:5}}>ABN</span>
                  )}
                </div>
                <div style={{textAlign:'right' as const, flexShrink:0}}>
                  <div style={{fontSize:11.5, color:'#4a5a52', fontWeight:500}}>{timeAgo(c.lastInboundAt)}</div>
                  {c.crmTaskId && (
                    <a href={`/crm/dashboard`} style={{fontSize:10.5, color:'#0E5C42', fontWeight:600}}>View task →</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
