'use client'
import React from 'react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { LeadsTab } from '@/components/crm/LeadsTab'
import { CrmSide, crmNav, NavIcons } from '@/components/crm/Shell'
import { canonicalCountry, canonicalSource, groupByCanonical } from '@/lib/normalise-labels'

// 'lead' is retained ONLY so records created by the old two-stage intake still
// render. Nothing creates a 'lead' task any more: there is one intake now, the
// full /tax-form.
type TaskType = 'tax-return'|'super'|'tfn'|'abn'|'lead'
type TaxReturn     = { year:string; refundAmount:number; type:'refund'|'owed'; completedAt:string }
type SuperReturn   = { year:string; amount:number; completedAt:string }
type ServiceRecord = { done:boolean; completedAt:string; notes:string }
type Task = {
  id:string; clientId:string; clientName:string; taskType:TaskType
  whatsapp:string; email:string; country:string; dob:string; taxYear:string
  submittedAt:string; done:boolean; address:string; tfn:string; bankDetails:string
  primaryJob:string; marital:string; taxStatus:string; howHeard:string; auPhone:string; notes:string
  fileUrls:string[]
  reviewStatus?: 'pending'|'approved'|'rejected'
  reviewerNote?: string
}
type Client = {
  id:string; fullName:string; dob:string; whatsapp:string; email:string
  country:string; howHeard:string; notes:string; createdAt:string
  taxReturns:TaxReturn[]; superReturns:SuperReturn[]
  tfnService:ServiceRecord; abnService:ServiceRecord
  archived?: boolean
  yearlyCheckins?: Record<string, boolean>
  referred_by?: string | null
}
type View = 'tasks'|'clients'|'client-detail'|'archive'|'leads'

const CY = new Date().getFullYear()
// Current AU tax year start (Jul-Jun cycle)
const CURRENT_TAX_START = new Date().getMonth() >= 6 ? CY : CY - 1
// 5 years back + current + 5 years forward = 11 years total
const TAX_YEARS = Array.from({length:11},(_,i)=>{
  const y = CURRENT_TAX_START - 5 + i
  return `${y}-${String(y+1).slice(2)}`
})
const TASK_LABELS: Record<TaskType,string> = {
  'tax-return':'Tax Return','super':'Super Refund','tfn':'TFN Application','abn':'ABN Application','lead':'Lead'
}
// Design-system tokens, not raw colours: each value is handed to `--tc` on a
// .tsev badge, which mixes its own tint and text colour out of that one value.
// 'abn' keeps a distinct amber (--sales) so it does not collapse into 'lead'
// (--warn); they used to be two slightly different oranges.
const TASK_COLORS: Record<TaskType,string> = {
  'tax-return':'var(--brand1)','super':'var(--brand1)','tfn':'var(--brand1)','abn':'var(--sales)','lead':'var(--warn)'
}

// Robust copy that works even where navigator.clipboard is missing, blocked, or
// rejects (older browsers, non-HTTPS, permission policies). The old code called
// navigator.clipboard.writeText(...).then(...) with no fallback and no .catch,
// so on those setups the button silently did nothing — that was "the problem".
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch { /* fall through to the legacy method */ }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '-1000px'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    ta.setSelectionRange(0, text.length)
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation()
        const ok = await copyText(text)
        if (ok) {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }
      }}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: copied ? 'var(--good)' : 'var(--ink3)', padding: '2px 3px',
        borderRadius: 4, display: 'flex', alignItems: 'center',
        flexShrink: 0, lineHeight: 1, transition: 'color 0.2s',
      }}
      title="Copy"
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      {copied
        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      }
    </button>
  )
}

// Wrapper around fetch that aborts after `timeoutMs` (default 30s). Prevents the
// UI from hanging forever if the server stops responding. Failure surfaces as a
// regular network error to the existing try/catch.
async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 30_000): Promise<Response> {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: ctrl.signal })
  } finally {
    clearTimeout(id)
  }
}

// ── Client status (Active / Filed / Needs Super) ──────────────────────────
// Stored in notes as: `📋 Status: filed-this-year:2025-26` or `📋 Status: needs-super:2025-26`
// The `:YYYY-YY` suffix is the AU tax year when the status was set; on 1 July of
// the next tax year, the status auto-resets to Active because the stored year
// no longer matches the current tax year.
type ClientStatus = 'active' | 'filed' | 'needs-super'

function getCurrentAuTaxYear(): string {
  const sydney = new Date(new Date().toLocaleString('en-US', { timeZone: 'Australia/Sydney' }))
  const y = sydney.getFullYear()
  return sydney.getMonth() >= 6 ? `${y}-${String(y + 1).slice(2)}` : `${y - 1}-${String(y).slice(2)}`
}

function getClientStatus(notes: string): ClientStatus {
  if (!notes) return 'active'
  const m = notes.match(/📋 Status: (filed-this-year|needs-super):(\d{4}-\d{2})/)
  if (!m) return 'active'
  const [, kind, year] = m
  // Auto-reset on new AU tax year (1 July): stale entries become Active
  if (year !== getCurrentAuTaxYear()) return 'active'
  return kind === 'filed-this-year' ? 'filed' : 'needs-super'
}

function setClientStatusInNotes(notes: string, status: ClientStatus): string {
  // Remove any existing status marker (from any year) then append new one if not Active
  const cleaned = (notes || '').split(' | ').filter(p => !p.match(/^📋 Status:/)).join(' | ').trim()
  if (status === 'active') return cleaned
  const tag = status === 'filed' ? 'filed-this-year' : 'needs-super'
  const marker = `📋 Status: ${tag}:${getCurrentAuTaxYear()}`
  return cleaned ? `${cleaned} | ${marker}` : marker
}

const STATUS_META: Record<ClientStatus, { label: string; bg: string; fg: string; border: string; emoji: string }> = {
  'active':      { label: 'Active',      bg: 'var(--surface2)', fg: 'var(--brand1)', border: 'var(--line2)', emoji: '🔵' },
  'filed':       { label: 'Filed',       bg: 'color-mix(in srgb, var(--good) 10%, transparent)', fg: 'var(--good)', border: 'color-mix(in srgb, var(--good) 35%, transparent)', emoji: '🟢' },
  'needs-super': { label: 'Needs Super', bg: 'color-mix(in srgb, var(--warn) 12%, transparent)', fg: 'var(--warn)', border: 'color-mix(in srgb, var(--warn) 35%, transparent)', emoji: '🟡' },
}


// ── WhatsApp Quick Send ──────────────────────────────────────────────────
const WA_TEMPLATES = [
  { id: 'received', icon: '📨', label: 'Received', text: (n:string) => `Hi ${n}! Just letting you know I received your form and started processing it. I'll get back to you soon with updates 👍` },
  { id: 'docs', icon: '📋', label: 'Docs submitted', text: (n:string) => `Hi ${n}! Your documents have been submitted to the ATO ✅ I'll let you know once they're processed.` },
  { id: 'refund', icon: '💰', label: 'Refund processed', text: (n:string) => `Great news ${n}! Your refund has been processed and should arrive in your bank account within 1-2 weeks 🎉` },
  { id: 'followup', icon: '🔔', label: 'Yearly follow-up', text: (n:string) => `Hi ${n}! Hope you're well. Just a reminder - it's tax season again. If you'd like to file this year's return, send me a message and I'll send you the link 🙂` },
  { id: 'super', icon: '💼', label: 'Super reminder', text: (n:string) => `Hi ${n}! Are you planning to leave Australia soon? You may be eligible to claim back your superannuation. Let me know if you'd like help with this!` },
]

function WhatsAppQuick({ name, whatsapp }: { name: string; whatsapp: string }) {
  const [open, setOpen] = React.useState(false)
  const firstName = (name||'').split(' ')[0] || 'there'
  if (!whatsapp) return null
  const sanitized = whatsapp.replace(/[^0-9+]/g, '')
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
        className="btn"
        // #25D366 is WhatsApp's own brand green and stays literal: this button
        // opens wa.me, so it is that product's colour, not ours.
        style={{ background: '#25D366', color: '#fff' }}
        title="Send WhatsApp message"
        aria-label={`Send WhatsApp message to ${name || 'client'}`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.546 4.122 1.588 5.905L.057 23.813a.5.5 0 00.63.63l5.908-1.531A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.555 9.555 0 01-4.87-1.336l-.35-.208-3.624.94.96-3.524-.228-.363A9.6 9.6 0 0112 2.4c5.295 0 9.6 4.305 9.6 9.6S17.295 21.6 12 21.6z"/></svg>
        WhatsApp
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 100 }}/>
          <div className="card fadein" style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 101, minWidth: 260, padding: 6 }}>
            <div className="mlabel" style={{ margin: '4px 10px 6px' }}>Quick Templates</div>
            {WA_TEMPLATES.map(t => (
              <a key={t.id}
                href={`https://wa.me/${sanitized}?text=${encodeURIComponent(t.text(firstName))}`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 7, textDecoration: 'none', color: 'var(--ink)', fontSize: 12, transition: 'background 0.1s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: 14 }}>{t.icon}</span>
                <span style={{ fontWeight: 500 }}>{t.label}</span>
              </a>
            ))}
            <div style={{ borderTop: '1px solid var(--line)', marginTop: 4, paddingTop: 4 }}>
              <a href={`https://wa.me/${sanitized}`} target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 7, textDecoration: 'none', color: 'var(--brand1)', fontSize: 12, fontWeight: 600 }}>
                ✏️ Open empty chat
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}


function CopyFieldBtn({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={async () => { const ok = await copyText(text); if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500) } }}
      className={`btn ${copied ? 'flash' : 'quiet'}`}
      title={`Copy ${text}`}
    >
      {copied
        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      }
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

/**
 * One checkbox row inside a DropBtn filter menu.
 *
 * The same six lines of markup were spelled out six times over (tax year, how
 * heard and country, once for Clients and again for Archive). There is no class
 * for this shape in crm-design.css, so the geometry stays inline — but now in
 * one place instead of six.
 */
function FilterOpt({ label, count, checked, onToggle }: {
  label: string; count: number; checked: boolean; onToggle: () => void
}) {
  return (
    <label style={{display:'flex',alignItems:'center',gap:8,padding:'5px 2px',cursor:'pointer'}}>
      <input type="checkbox" checked={checked} onChange={onToggle} style={{width:14,height:14,accentColor:'var(--brand1)'}}/>
      <span style={{fontSize:13,flex:1}}>{label}</span>
      <span style={{fontSize:11,color:'var(--ink3)'}}>{count}</span>
    </label>
  )
}

/**
 * A KPI tile with a money figure on the left and a client count on the right:
 * the three tiles in the Clients summary bar were the same twelve lines three
 * times over. Green on the numbers is deliberate — it is the one place money is
 * the subject, so it keeps --brand1 rather than the default ink of .kv.
 */
function MoneyTile({ label, value, sub, count }: {
  label: string; value: string; sub: string; count: number
}) {
  return (
    <div className="kpi" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
      <div>
        <div className="kl">{label}</div>
        <div className="kv" style={{color:'var(--brand1)'}}>{value}</div>
      </div>
      <div style={{textAlign:'right' as const}}>
        <div className="kd">{sub}</div>
        <div className="kv" style={{fontSize:14,color:'var(--brand1)'}}>{count}<span className="kd" style={{marginLeft:3}}>clients</span></div>
      </div>
    </div>
  )
}

/** "No data yet" placeholder inside a DropBtn filter menu. */
function FilterEmpty() {
  return <div style={{fontSize:12,color:'var(--ink3)',padding:'4px 2px'}}>No data yet</div>
}


export default function DashboardClient() {
  const [view, setView]           = useState<View>('tasks')
  const [archivedClients, setArchivedClients] = useState<Client[]>([])
  const [referralPartners, setReferralPartners] = useState<{id:string;name:string}[]>([])
  const [checkinYear, setCheckinYear] = useState(() => {
    // Auto-select current AU tax year (Jul-Jun cycle)
    const now = new Date()
    const y = now.getFullYear()
    return now.getMonth() >= 6 ? `${y}-${String(y+1).slice(2)}` : `${y-1}-${String(y).slice(2)}`
  })
  const [checkinFilter, setCheckinFilter] = useState<'all'|'done'|'pending'>('all')
  // Dismissed birthday reminders - persisted so 'Done' survives reloads (keyed per client+occurrence)
  const [dismissedBdays, setDismissedBdays] = useState<Set<string>>(new Set())
  useEffect(() => {
    try { setDismissedBdays(new Set(JSON.parse(localStorage.getItem('whv_dismissed_bdays') || '[]'))) } catch { /* ignore */ }
  }, [])
  const dismissBday = useCallback((bkey: string) => {
    setDismissedBdays(prev => {
      const next = new Set(prev); next.add(bkey)
      try { localStorage.setItem('whv_dismissed_bdays', JSON.stringify([...next])) } catch {}
      return next
    })
  }, [])
  const [taskView, setTaskView]   = useState<'list'|'detail'>('list')
  const [tasks, setTasks]         = useState<Task[]>([])
  const [clients, setClients]     = useState<Client[]>([])
  const [activeTask, setActiveTask] = useState<Task|null>(null)
  const [activeClient, setActiveClient] = useState<Client|null>(null)
  // The Internal notes panel was removed from the client view. This state and
  // the auto-save below are left in place and are now inert: taskNotes is only
  // ever loaded from the stored value, so it never differs and never saves.
  // Kept rather than deleted so the panel can be restored in one edit.
  const [taskNotes, setTaskNotes] = useState('')
  const [notesSaved, setNotesSaved] = useState(false)
  const [clientNotes, setClientNotes] = useState('')
  const [clientNotesSaved, setClientNotesSaved] = useState(false)
  const [search, setSearch]       = useState('')
  const [globalSearch, setGlobalSearch] = useState('')
  const [yearFilter, setYearFilter] = useState<Set<string>>(new Set())
  const [howHeardFilter, setHowHeardFilter] = useState<Set<string>>(new Set())
  const [superFilter, setSuperFilter] = useState<'all'|'no-super'>('all')
  const [noReturnFilter, setNoReturnFilter] = useState<'all'|'didnt-return'>('all')
  const [countryFilter, setCountryFilter] = useState<Set<string>>(new Set())
  const [statusFilter, setStatusFilter] = useState<Set<ClientStatus>>(new Set())
  const [archiveSearch, setArchiveSearch] = useState('')
  const [taskSearch, setTaskSearch] = useState('')
  const [taskTileFilter, setTaskTileFilter] = useState<'all'|'ready'|'done'>('all')
  // Remembers which task card was last opened + the list's scroll position, so
  // going back from a client's detail view returns to the same spot instead of
  // jumping back to the top of the list.
  const [lastViewedTaskId, setLastViewedTaskId] = useState<string|null>(null)
  const tasksScrollRef = React.useRef<HTMLDivElement|null>(null)
  const tasksScrollPosRef = React.useRef(0)
  const [openDropdown, setOpenDropdown] = useState<string|null>(null)
  const [archiveYearFilter, setArchiveYearFilter] = useState<Set<string>>(new Set())
  const [archiveHowHeardFilter, setArchiveHowHeardFilter] = useState<Set<string>>(new Set())
  const [archiveCountryFilter, setArchiveCountryFilter] = useState<Set<string>>(new Set())
  const [loading, setLoading]     = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [newClientsCount, setNewClientsCount] = useState(0)
  const prevClientsCountRef = React.useRef(0)
  const [newArchiveCount, setNewArchiveCount] = useState(0)
  const prevArchiveCountRef = React.useRef(0)
  const prevPendingTasksRef = React.useRef(0)
  const [previewUrl, setPreviewUrl] = useState<string|null>(null)
  // Fetch the file as a blob and render via object URL. This avoids the site's
  // global X-Frame-Options: DENY / CSP frame-ancestors 'none' (which blocked the
  // old <iframe src="/api/crm/file..."> with "refused to connect"), and reliably
  // carries the CRM session cookie. blob: object URLs aren't subject to those
  // framing headers, so PDFs render inline; images render in an <img>.
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string|null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewError, setPreviewError]     = useState(false)
  useEffect(() => {
    if (!previewUrl) { setPreviewBlobUrl(null); setPreviewError(false); setPreviewLoading(false); return }
    let cancelled = false
    let objUrl: string | null = null
    setPreviewLoading(true); setPreviewError(false); setPreviewBlobUrl(null)
    fetch(previewUrl)
      .then(async r => {
        if (!r.ok) throw new Error(`status ${r.status}`)
        const blob = await r.blob()
        objUrl = URL.createObjectURL(blob)
        if (!cancelled) { setPreviewBlobUrl(objUrl); setPreviewLoading(false) }
      })
      .catch(() => { if (!cancelled) { setPreviewError(true); setPreviewLoading(false) } })
    return () => { cancelled = true; if (objUrl) URL.revokeObjectURL(objUrl) }
  }, [previewUrl])
  const [showAddModal, setShowAddModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string|null>(null)
  const [confirmDeleteClient, setConfirmDeleteClient] = useState<string|null>(null)
  const [confirmPermDelete, setConfirmPermDelete] = useState<string|null>(null)
  const [editingNoteId, setEditingNoteId] = useState<string|null>(null)
  const [permDeleteText, setPermDeleteText] = useState('')
  const [confirmArchive, setConfirmArchive] = useState<string|null>(null)

  // Reused AudioContext for the new-task notification beep.
  // Creating a new context per beep leaks resources - browsers cap at ~6 concurrent
  // contexts, after which subsequent creations fail silently.
  const audioCtxRef = React.useRef<AudioContext | null>(null)
  useEffect(() => {
    return () => {
      // Close the shared context on unmount to release audio hardware promptly
      audioCtxRef.current?.close().catch(() => {})
      audioCtxRef.current = null
    }
  }, [])

  // Pagination
  const PAGE_SIZE = 200  // Increased from 100 to reduce round-trips
  const [tasksTotal, setTasksTotal]     = useState(0)
  const [clientsTotal, setClientsTotal] = useState(0)
  const [tasksLoadingMore, setTasksLoadingMore]     = useState(false)
  const [clientsLoadingMore, setClientsLoadingMore] = useState(false)

  // Dashboard stats - computed server-side, scales to 10k+ clients
  type Stats = {
    totalActiveClients: number; totalArchivedClients: number
    totalTasksPending: number; totalTasksDone: number
    seasonClientsCount: number; lastYearClientsCount: number
    returnedThisYearCount: number; totalRefundsThisYear: number
    eligibleSuperCount: number; noSuperCount: number
    followUpCount: number
    currentTaxYear: string; lastTaxYear: string
  }
  const [stats, setStats] = useState<Stats|null>(null)
  const [captureRefund, setCaptureRefund] = useState<{taskId:string;taskType:string;taxYear:string;clientId:string}|null>(null)
  const [captureRefundAmt, setCaptureRefundAmt] = useState('')
  const [captureRefundType, setCaptureRefundType] = useState<'refund'|'owed'>('refund')
  const [captureSuperAmt, setCaptureSuperAmt] = useState('')
  const [confirmComplete, setConfirmComplete] = useState<string|null>(null)
  const [showAddTax, setShowAddTax]     = useState(false)
  const [showAddSuper, setShowAddSuper] = useState(false)
  const [newTaxYear, setNewTaxYear]     = useState('')
  const [newTaxAmt, setNewTaxAmt]       = useState('')
  const [newTaxType, setNewTaxType]     = useState<'refund'|'owed'>('refund')
  const [newSuperYear, setNewSuperYear] = useState('')
  const [newSuperAmt, setNewSuperAmt]   = useState('')
  const _currentTaxYear = (() => {
    const now = new Date()
    const y = now.getFullYear()
    return now.getMonth() >= 6 ? `${y}-${String(y+1).slice(2)}` : `${y-1}-${String(y).slice(2)}`
  })()
  const [newClient, setNewClient]       = useState({fullName:'',whatsapp:'',email:'',country:'',dob:'',taxYear:_currentTaxYear as string})

  // Server-side client search (for 5k+ clients where local filter isn't enough)
  const [searchResults, setSearchResults] = useState<Client[]|null>(null)
  const [searchingServer, setSearchingServer] = useState(false)
  // Same, but for archive view (which can grow to 500k+)
  const [archiveSearchResults, setArchiveSearchResults] = useState<Client[]|null>(null)

  const loadTasks   = useCallback(async()=>{
    try {
      const r=await fetchWithTimeout(`/api/crm/tasks?limit=${PAGE_SIZE}&offset=0`,{cache:'no-store'})
      if(r.status===401){ window.location.replace('/crm'); return }
      const d=await r.json()
      if(d.ok) { setTasks(d.tasks); setTasksTotal(d.total ?? d.tasks.length) }
    } catch(e){ console.error('[loadTasks]',e) }
  },[])

  const loadMoreTasks = useCallback(async()=>{
    setTasksLoadingMore(true)
    try {
      const r=await fetchWithTimeout(`/api/crm/tasks?limit=${PAGE_SIZE}&offset=${tasks.length}`,{cache:'no-store'})
      const d=await r.json()
      if(d.ok) { setTasks(prev=>[...prev,...d.tasks]); setTasksTotal(d.total ?? 0) }
    } catch(e){ console.error('[loadMoreTasks]',e) }
    finally { setTasksLoadingMore(false) }
  },[tasks.length])

  const loadClients = useCallback(async()=>{
    try {
      const r=await fetchWithTimeout(`/api/crm/clients?limit=${PAGE_SIZE}&offset=0`,{cache:'no-store'})
      if(r.status===401){ window.location.replace('/crm'); return }
      const d=await r.json()
      if(d.ok) {
        const newCount = d.total ?? d.clients.length
        if (prevClientsCountRef.current > 0 && newCount > prevClientsCountRef.current) {
          setNewClientsCount(n => n + (newCount - prevClientsCountRef.current))
        }
        prevClientsCountRef.current = newCount
        setClients(d.clients)
        setClientsTotal(d.total ?? d.clients.length)
      }
    } catch(e){ console.error('[loadClients]',e) }
  },[])

  const loadMoreClients = useCallback(async()=>{
    setClientsLoadingMore(true)
    try {
      const r=await fetchWithTimeout(`/api/crm/clients?limit=${PAGE_SIZE}&offset=${clients.length}`,{cache:'no-store'})
      const d=await r.json()
      if(d.ok) { setClients(prev=>[...prev,...d.clients]); setClientsTotal(d.total ?? 0) }
    } catch(e){ console.error('[loadMoreClients]',e) }
    finally { setClientsLoadingMore(false) }
  },[clients.length])

  const [archivedLoaded, setArchivedLoaded] = useState(false)
  const loadArchived = useCallback(async()=>{
    try {
      const r=await fetchWithTimeout(`/api/crm/clients?archived=true&limit=${PAGE_SIZE}&offset=0`,{cache:'no-store'})
      const d=await r.json()
      if(d.ok) {
        const newCount = d.clients.length
        if (prevArchiveCountRef.current > 0 && newCount > prevArchiveCountRef.current) {
          setNewArchiveCount(n => n + (newCount - prevArchiveCountRef.current))
        }
        prevArchiveCountRef.current = newCount
        setArchivedClients(d.clients)
      }
    } catch(e){ console.error('[loadArchived]',e) }
  },[])

  // Load server-computed dashboard stats (scales to 10k+ clients)
  const loadStats = useCallback(async(opts?: { force?: boolean })=>{
    try {
      const url = opts?.force ? '/api/crm/stats?refresh=1' : '/api/crm/stats'
      const r = await fetchWithTimeout(url, { cache: 'no-store' })
      if (r.status === 401) { window.location.replace('/crm'); return }
      const d = await r.json()
      if (d.ok && d.stats) setStats(d.stats as Stats)
    } catch(e){ console.error('[loadStats]', e) }
  },[])

  useEffect(()=>{ Promise.all([loadTasks(),loadClients(),loadStats({force:true}),loadReferralPartners()]).finally(()=>setLoading(false)) },[loadTasks,loadClients,loadStats])

  // Auto-refresh: poll a cheap change-token every 20s and only reload the heavy
  // task/client/stats payloads when something actually changed. On any error we
  // reload anyway, so this is never staler than the old unconditional poll.
  useEffect(()=>{
    let last = ''
    // Skip entirely while the tab is hidden. Without this an ops console left
    // open overnight polled ~4,300 times and ran ~26,000 Supabase queries (two
    // full-table exact counts per poll) with nobody watching. The Will
    // dashboard already guards its timers this way; this one was missed.
    const hidden = () => typeof document !== 'undefined' && document.visibilityState === 'hidden'
    // A cycle awaits up to four fetches with a 30s timeout each, i.e. longer
    // than the 20s interval. Without this flag iterations overlap and both
    // write the shared `last` token, producing duplicate heavy reloads.
    let inFlight = false
    const id = setInterval(async ()=>{
      if (hidden() || inFlight) return
      inFlight = true
      try {
        let changed = true
        try {
          const v = await fetch('/api/crm/version',{cache:'no-store'}).then(r=>r.json())
          if (v && typeof v.token === 'string' && v.token !== '') {
            changed = v.token !== last
            last = v.token
          }
        } catch { changed = true }
        if (changed) await Promise.all([loadTasks(), loadClients(), loadArchived(), loadStats()])
      } finally { inFlight = false }
    }, 20_000)
    return ()=> clearInterval(id)
  },[loadTasks, loadClients, loadArchived, loadStats])

  // Sync taskNotes when activeTask updates from auto-refresh (e.g. reviewer added a note)
  useEffect(()=>{
    if (activeTask) {
      // Find the live task from tasks array to get latest notes
      const live = tasks.find(t => t.id === activeTask.id)
      if (live) setTaskNotes(extractUserNotes(live.notes))
    }
  }, [activeTask?.id, tasks]) // eslint-disable-line react-hooks/exhaustive-deps

  // Server-side search: only triggers if we have more clients than loaded
  // AND the local results look incomplete. Keeps small DBs snappy, scales to 5k+.
  useEffect(() => {
    const query = (search.trim() || globalSearch.trim())
    // Skip if search is empty or if we already have all clients loaded
    if (query.length < 2 || clients.length >= clientsTotal) {
      setSearchResults(null)
      return
    }
    // Debounce: wait 350ms after last keystroke
    setSearchingServer(true)
    const handle = setTimeout(async () => {
      try {
        const r = await fetch(`/api/crm/clients/search?q=${encodeURIComponent(query)}&limit=100`, { cache: 'no-store' })
        const d = await r.json()
        if (d.ok && Array.isArray(d.clients)) setSearchResults(d.clients as Client[])
      } catch (e) { console.error('[search]', e) }
      finally { setSearchingServer(false) }
    }, 350)
    return () => { clearTimeout(handle); setSearchingServer(false) }
  }, [search, globalSearch, clients.length, clientsTotal])

  // Server-side search for archived clients (archive can grow to 500k+)
  useEffect(() => {
    const query = archiveSearch.trim()
    if (query.length < 2) { setArchiveSearchResults(null); return }
    const handle = setTimeout(async () => {
      try {
        const r = await fetch(`/api/crm/clients/search?q=${encodeURIComponent(query)}&archived=true&limit=100`, { cache: 'no-store' })
        const d = await r.json()
        if (d.ok && Array.isArray(d.clients)) setArchiveSearchResults(d.clients as Client[])
      } catch (e) { console.error('[archive-search]', e) }
    }, 350)
    return () => clearTimeout(handle)
  }, [archiveSearch])

  // Update browser tab title with pending count (so you see updates even when tab is in background)
  useEffect(() => {
    const pending = tasks.filter(t => !t.done).length
    if (typeof document !== 'undefined') {
      document.title = pending > 0 ? `(${pending}) WHV Tax CRM` : 'WHV Tax CRM'
    }
    // Play notification sound when new task arrives (not on initial load)
    if (prevPendingTasksRef.current > 0 && pending > prevPendingTasksRef.current) {
      try {
        // Web Audio API beep - works without external file.
        // Reuse one AudioContext for all beeps (creating a new one per beep leaks).
        if (!audioCtxRef.current) {
          const Ctor = window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext
          if (Ctor) audioCtxRef.current = new Ctor()
        }
        const ctx = audioCtxRef.current
        if (ctx) {
          // Auto-resume if suspended (browsers suspend contexts after long idle)
          if (ctx.state === 'suspended') ctx.resume().catch(() => {})
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain); gain.connect(ctx.destination)
          osc.frequency.value = 880  // A5 note
          gain.gain.setValueAtTime(0.15, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
          osc.start(); osc.stop(ctx.currentTime + 0.3)
        }
      } catch {/* sound failed, ignore */}
    }
    prevPendingTasksRef.current = pending
  }, [tasks])

  // Autosave task notes after 1.5s of inactivity
  useEffect(() => {
    if (!activeTask) return
    const current = extractUserNotes(activeTask.notes)
    if (taskNotes === current) return
    const timer = setTimeout(() => { saveTaskNotes() }, 1500)
    return () => clearTimeout(timer)
  }, [taskNotes, activeTask?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Autosave client notes after 1.5s of inactivity
  useEffect(() => {
    if (!activeClient) return
    if (clientNotes === (activeClient.notes || '')) return
    const timer = setTimeout(() => { saveClientNotes() }, 1500)
    return () => clearTimeout(timer)
  }, [clientNotes, activeClient?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const openArchive = useCallback(()=>{ setView('archive'); setNewArchiveCount(0); if(!archivedLoaded){ loadArchived(); setArchivedLoaded(true) } },[archivedLoaded,loadArchived])

  async function lockAndExit() { await fetch('/api/crm/logout',{method:'POST'}); window.location.replace('/crm') }

  const loadReferralPartners = async () => {
    try {
      const r = await fetchWithTimeout('/api/crm/partners', { cache: 'no-store' })
      const d = await r.json()
      if (d.ok) setReferralPartners(d.partners.map((p: {id:string;name:string}) => ({ id: p.id, name: p.name })))
    } catch (e) { console.error('[loadReferralPartners]', e) }
  }

  async function updateClientStatus(clientId: string, status: ClientStatus) {
    const client = clients.find(c => c.id === clientId)
    if (!client) return
    const newNotes = setClientStatusInNotes(client.notes || '', status)
    // Optimistic update
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, notes: newNotes } : c))
    if (activeClient?.id === clientId) {
      setActiveClient({ ...activeClient, notes: newNotes })
    }
    try {
      await fetch(`/api/crm/clients/${clientId}/notes`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: newNotes }),
      })
    } catch (err) {
      console.error('[updateClientStatus]', err)
    }
  }

  async function archiveClient(id: string) {
    setClients(prev => prev.filter(c => c.id !== id))
    await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'archive'})})
    // Trigger archive badge - client moved to archive
    setNewArchiveCount(n => n + 1)
    await Promise.all([loadClients(), loadArchived()])
    setActiveClient(null)
    setView('clients')
    setConfirmArchive(null)
  }
  async function unarchiveClient(id: string) {
      setArchivedClients(prev => prev.filter(c => c.id !== id))
    await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'unarchive'})})
    await Promise.all([loadClients(), loadArchived()])
  }
  async function toggleCheckin(clientId: string, year: string, current: boolean) {
      setClients(prev => prev.map(c => c.id===clientId ? {...c, yearlyCheckins:{...c.yearlyCheckins,[year]:!current}} : c))
    await fetch(`/api/crm/clients/${clientId}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'checkin',year,done:!current})})
  }

  // ── "In progress" flag ────────────────────────────────────────────────
  // Lets the admin mark a lead as "currently working on it" (e.g. waiting on a
  // missing document from the client) so it drops to the bottom of the pending
  // queue and they can move on to the next lead without losing their place.
  const isTaskInProgress = (notes: string) => (notes || '').includes('🔶 In Progress')

  async function toggleInProgress(task: Task) {
    const inProgress = isTaskInProgress(task.notes)
    const parts = (task.notes || '').split(' | ').filter(p => p !== '🔶 In Progress')
    if (!inProgress) parts.push('🔶 In Progress')
    const newNotes = parts.join(' | ').trim()
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, notes: newNotes } : t))
    if (activeTask?.id === task.id) setActiveTask(prev => prev ? { ...prev, notes: newNotes } : prev)
    try {
      await fetch(`/api/crm/tasks/${task.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'notes',notes:newNotes})})
    } catch (err) {
      console.error('[toggleInProgress]', err)
    }
  }

  // Staff-only scratch note on a lead - a quick "waiting on X" / "call back re: Y"
  // reminder that lives only while the lead is pending. It's cleared automatically
  // the moment the lead is marked Done (see markTaskDone), so there's never any
  // stale internal note lingering on a finished client.
  async function saveReviewerNote(taskId: string, note: string) {
    const trimmed = note.trim()
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, reviewerNote: trimmed } : t))
    if (activeTask?.id === taskId) setActiveTask(prev => prev ? { ...prev, reviewerNote: trimmed } : prev)
    setEditingNoteId(null)
    try {
      await fetch(`/api/crm/tasks/${taskId}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'reviewerNote',reviewerNote:trimmed})})
    } catch (err) {
      console.error('[saveReviewerNote]', err)
    }
  }

  async function markDone(id:string) {
    const prevTasks = tasks
    setTasks(prev => prev.map(t => t.id===id ? {...t, done:true, tfn:'', bankDetails:'', address:'', primaryJob:'', marital:'', auPhone:'', fileUrls:[], reviewerNote:''} : t))
    setConfirmComplete(null)
    setActiveTask(null)
    setTaskView('list')
    try {
      const res = await fetch(`/api/crm/tasks/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'done'})})
      if (!res.ok) throw new Error('server_error')
    } catch (err) {
      console.error('[markDone]', err)
      // Restore state on failure so admin knows it didn't save
      setTasks(prevTasks)
      alert('Failed to mark as done. Please try again.')
    }
  }

  async function transferToClients(task: Task) {
    setTasks(prev => prev.filter(t => t.id !== task.id))
    setActiveTask(null); setTaskView('list')
    await fetch(`/api/crm/tasks/${task.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete'})})
    // Trigger badge explicitly - user is on Tasks tab, client was added to Clients
    setNewClientsCount(n => n + 1)
    await Promise.all([loadClients(), loadArchived()])
  }

  async function deleteTaskPermanently(id: string) {
    setConfirmPermDelete(null)
    setTasks(prev => prev.filter(t => t.id !== id))
    setActiveTask(null); setTaskView('list')
    await fetch(`/api/crm/tasks/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete_permanent'})})
  }

  async function saveTaskNotes() {
    if(!activeTask) return
    // Preserve structured data (passport, declarations etc.) AND reviewer notes
    const allParts = (activeTask.notes||'').split(' | ')
    // Keep ALL structured form data AND reviewer notes (with 📝 prefix)
    const structuredParts = allParts.filter(p =>
      p.match(/^(Passport No:|Super Funds:|Super Fund Name:|Super Member Number:|Super Opening Date:|Home Country Address:|Gender:|ABN:|ABN Number:|ABN Income:|ABN Work:|Expenses:|💼 TFN Invoices|🏢 ABN Invoices|→|I confirm|I declare|I have read|Working Holiday)/i)
      || p.startsWith('📝 ')
      || p === '🔄 Returning client'
      || p === '🔶 In Progress'
    )
    // taskNotes is the admin's own notes (stripped of 📝 prefix when loaded)
    const merged = taskNotes.trim()
      ? [...structuredParts, taskNotes.trim()].join(' | ')
      : structuredParts.join(' | ')
    await fetch(`/api/crm/tasks/${activeTask.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'notes',notes:merged})})
    setNotesSaved(true); setTimeout(()=>setNotesSaved(false),2500)
  }

  async function deleteTask(id:string, refundData?:{amount:number;type:'refund'|'owed';superAmount:number;year:string;clientId:string}) {
    // If refund data provided, save to client timeline first
    if (refundData && refundData.clientId && refundData.year) {
      if (refundData.amount > 0) {
        await fetch(`/api/crm/clients/${refundData.clientId}/tax-returns`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({year: refundData.year, refundAmount: refundData.amount, type: refundData.type})
        })
      }
      if (refundData.superAmount > 0) {
        await fetch(`/api/crm/clients/${refundData.clientId}/tax-returns`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({year: refundData.year, superAmount: refundData.superAmount, isSuper: true, refundAmount: 0, type: 'refund'})
        })
      }
    }
    await fetch(`/api/crm/tasks/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete'})})
    setActiveTask(null); setTaskView('list'); setConfirmDelete(null); setCaptureRefund(null)
    setCaptureRefundAmt(''); setCaptureSuperAmt(''); setCaptureRefundType('refund')
    await Promise.all([loadTasks(),loadClients(),loadArchived()])
  }

  async function saveClientNotes() {
    if(!activeClient) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'notes',notes:clientNotes})})
    setClientNotesSaved(true); setTimeout(()=>setClientNotesSaved(false),2500)
  }

  async function addTaxReturn() {
    if(!activeClient) return
    // Allow $0 (e.g. tax return submitted with no refund). Year must be present
    // and amount must be a valid non-negative number.
    if (!newTaxYear) { alert('Please select a tax year.'); return }
    const amt = parseFloat(newTaxAmt)
    if (!Number.isFinite(amt) || amt < 0) { alert('Please enter a valid amount (0 or more).'); return }
    if (amt > 1_000_000) { alert('Amount cannot exceed $1,000,000.'); return }
    try {
      const res = await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'add-tax',data:{year:newTaxYear,refundAmount:amt,type:newTaxType,completedAt:new Date().toISOString()}})})
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(`Failed to save: ${data.error || res.statusText || 'Unknown error'}`)
        return
      }
      setNewTaxYear(''); setNewTaxAmt(''); setNewTaxType('refund'); setShowAddTax(false)
      refreshClient()
    } catch (err) {
      alert('Network error. Please try again.')
      console.error('[addTaxReturn]', err)
    }
  }

  async function removeTaxReturn(year:string) {
    if(!activeClient) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'remove-tax',year})})
    refreshClient()
  }

  async function addSuperReturn() {
    if(!activeClient) return
    if (!newSuperYear) { alert('Please select a tax year.'); return }
    const amt = parseFloat(newSuperAmt)
    if (!Number.isFinite(amt) || amt < 0) { alert('Please enter a valid amount (0 or more).'); return }
    if (amt > 1_000_000) { alert('Amount cannot exceed $1,000,000.'); return }
    try {
      const res = await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'add-super',data:{year:newSuperYear,amount:amt,completedAt:new Date().toISOString()}})})
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(`Failed to save: ${data.error || res.statusText || 'Unknown error'}`)
        return
      }
      setNewSuperYear(''); setNewSuperAmt(''); setShowAddSuper(false)
      refreshClient()
    } catch (err) {
      alert('Network error. Please try again.')
      console.error('[addSuperReturn]', err)
    }
  }

  async function removeSuperReturn(year:string) {
    if(!activeClient) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'remove-super',year})})
    refreshClient()
  }

  async function refreshClient() {
    if(!activeClient) return
    const r=await fetch(`/api/crm/clients/${activeClient.id}`)
    const d=await r.json()
    if(d.ok){ setActiveClient(d.client); await loadClients() }
  }

  async function deleteClient(id:string) {
    setArchivedClients(prev => prev.filter(c => c.id !== id))
    setActiveClient(null); setView('archive'); setConfirmDeleteClient(null)
    await fetch(`/api/crm/clients/${id}`,{method:'DELETE'})
    await loadClients()
  }

  async function addClient(e:React.FormEvent) {
    e.preventDefault()
    await fetch('/api/crm/tasks',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        clientName:newClient.fullName, taskType:'tax-return',
        whatsapp:newClient.whatsapp, email:newClient.email, country:newClient.country,
        dob:newClient.dob, taxYear:newClient.taxYear, submittedAt:new Date().toISOString(),
        address:'',tfn:'',bankDetails:'',primaryJob:'',marital:'',taxStatus:'Working Holiday Maker',
        howHeard:'',auPhone:'',notes:'',fileUrls:[],
      })})
    setNewClient({fullName:'',whatsapp:'',email:'',country:'',dob:'',taxYear:_currentTaxYear})
    setShowAddModal(false); await loadTasks()
  }

  const fmtDate = (iso:string) => iso ? new Date(iso).toLocaleString('en-AU',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Australia/Sydney'}) + ' AEST/AEDT' : '-'
  // Formats a date of birth string to DD/MM/YYYY, regardless of whether it was stored as
  // an ISO date (YYYY-MM-DD, from the <input type="date"> forms) or already DD/MM/YYYY.
  const fmtDob = (dob:string) => {
    if (!dob) return dob
    const iso = dob.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`
    const dmy = dob.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
    if (dmy) return `${dmy[1].padStart(2,'0')}/${dmy[2].padStart(2,'0')}/${dmy[3]}`
    return dob
  }

  // Strip structured form data from notes - return only the user-written portion
  const extractUserNotes = (raw:string) => {
    if (!raw) return ''
    const parts = raw.split(' | ')
    const userParts = parts
      .filter(p =>
        // Strip ALL auto-generated form data - only keep human-written admin notes
        !p.match(/^(Passport No:|Super Funds:|Super Fund Name:|Super Member Number:|Super Opening Date:|Home Country Address:|Gender:|ABN:|ABN Number:|ABN Income:|ABN Work:|Expenses:|💼 TFN Invoices|🏢 ABN Invoices|→|I confirm|I declare|I have read|Working Holiday)/i)
        && !p.startsWith('📝 ')
        && p !== '🔄 Returning client'
      )
    return userParts.join(' | ').trim()
  }

  // The only place in this file that still writes literal colours, on purpose.
  // What follows is not CRM interface: it builds a complete standalone HTML
  // document, hands it to the browser as a Blob download, and that file is
  // opened and printed OUTSIDE the app — where .crm-scope, and therefore every
  // design token, does not exist. `var(--brand1)` there resolves to nothing and
  // the printout comes out colourless, so this document carries its own palette.
  // Nothing below styles anything the admin sees on screen.
  const downloadTaskPdf = (task: Task) => {
    const G = '#0B5240'
    const GL = '#EAF6F1'
    const esc = (s: string) => (s||'-').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;')

    const sec = (title: string) =>
      `<div style="font-size:11px;font-weight:700;color:${G};text-transform:uppercase;letter-spacing:0.06em;margin:22px 0 12px;border-bottom:1.5px solid ${GL};padding-bottom:8px">${title}</div>`

    const field = (label: string, value: string) =>
      `<div style="margin-bottom:14px">` +
      `<div style="font-size:13px;font-weight:600;color:#1A2822;margin-bottom:6px">${esc(label)}<span style="color:${G};margin-left:3px">*</span></div>` +
      `<div style="width:100%;padding:12px 14px;font-size:14px;color:#080F0D;background:#F5F9F7;border:1.5px solid #D4EAE2;border-radius:12px;min-height:44px;word-break:break-word">${esc(value)}</div>` +
      `</div>`

    const radioField = (label: string, selected: string, options: string[]) =>
      `<div style="margin-bottom:14px">` +
      `<div style="font-size:13px;font-weight:600;color:#1A2822;margin-bottom:10px">${esc(label)}<span style="color:${G};margin-left:3px">*</span></div>` +
      `<div style="display:flex;flex-wrap:wrap;gap:8px">` +
      options.map(opt => {
        const active = opt === selected
        return `<div style="display:inline-flex;align-items:center;padding:9px 18px;border-radius:100px;border:1.5px solid ${active?G:'#D4EAE2'};font-size:13px;font-weight:${active?'600':'500'};color:${active?'#fff':'#587066'};background:${active?G:'#F5F9F7'}">${esc(opt)}</div>`
      }).join('') +
      `</div></div>`

    const declBox = (text: string, checkLabel: string, checked: boolean) =>
      `<div style="background:#F5F9F7;border:1.5px solid #D4EAE2;border-radius:14px;padding:16px;margin-bottom:10px">` +
      (text ? `<p style="font-size:12px;color:#587066;line-height:1.7;margin-bottom:12px">${esc(text)}</p>` : '') +
      `<div style="display:flex;align-items:flex-start;gap:10px">` +
      `<div style="width:20px;height:20px;border-radius:6px;border:2px solid ${checked?G:'#D4EAE2'};background:${checked?G:'#fff'};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">` +
      (checked ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '') +
      `</div>` +
      `<span style="font-size:13px;color:#1A2822;font-weight:500;line-height:1.5">${esc(checkLabel)}</span>` +
      `</div></div>`

    const fileItem = (url: string, i: number) => {
      let name = url.split('/').pop() ?? `file-${i+1}`
      try { name = decodeURIComponent(name) } catch {}
      name = name.replace(/^\d+_/,'').slice(0,80)
      const isPdf = url.toLowerCase().endsWith('.pdf')
      const proxyUrl = `/api/crm/file?url=${encodeURIComponent(url)}`
      return `<div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:#F5F9F7;border:1.5px solid #D4EAE2;border-radius:12px;margin-bottom:8px">` +
        `<span style="font-size:20px">${isPdf?'📄':'🖼️'}</span>` +
        `<span style="font-size:13px;color:#080F0D;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(name)}</span>` +
        `<a href="${esc(proxyUrl)}" style="font-size:11px;color:${G};background:${GL};border:1px solid #C8EAE0;border-radius:6px;padding:3px 10px;text-decoration:none;font-weight:600;white-space:nowrap">View ↗</a>` +
        `</div>`
    }

    const notes = task.notes || ''
    const parts = notes.split(' | ')
    const getNote = (prefix: string) => notes.match(new RegExp(prefix + ': ([^|]+)'))?.[1]?.trim() || '-'
    const findDecl = (prefixes: string[]) => {
      const hit = parts.find(p => prefixes.some(px => p.startsWith(px)))
      return hit ? hit.replace('→ ','') : '-'
    }

    const titles: Record<string,string> = {
      'tfn':'TFN Application','abn':'ABN Application',
      'super':'Superannuation Refund','tax-return':'Tax Return Form',
      'lead':'Tax Return Form (incomplete)'
    }

    let formBody = ''

    if (task.taskType === 'tfn') {
      const passport = getNote('Passport No')
      const gender   = getNote('Gender')
      const decl1Val = findDecl(['→ ✓ I confirm I am currently','→ ✓ I confirm this','→ ✓ I confirm'])
      const decl2Val = findDecl(['→ ✓ I have read','→ ✓ I agree'])

      formBody =
        sec('Personal details')
        + field('First name (including middle name)', task.clientName.split(' ').slice(0,-1).join(' ') || task.clientName)
        + field('Last name', task.clientName.split(' ').pop() || '')
        + field('Country of passport', task.country)
        + field('Passport number', passport)
        + field('Email address', task.email)
        + field('Date of birth', fmtDob(task.dob))
        + field('WhatsApp Number', task.whatsapp)
        + field('Australian phone number', task.auPhone)
        + radioField('Gender as shown in passport', gender, ['Female','Male'])
        + radioField('Marital status', task.marital, ['Single','Married'])
        + field('Full Australian address (state, city, street, number, postcode)', task.address)
        + sec('Documents')
        + ((task.fileUrls??[]).length > 0
          ? (task.fileUrls??[]).map(fileItem).join('')
          : `<p style="font-size:12px;color:#aabab2">No files uploaded</p>`)
        + sec('Declaration')
        + declBox(
            '',
            decl1Val !== '-' ? decl1Val.replace('✓ ','') : 'I confirm that I am currently in Australia on my first visit, have never changed my name or gender, do not own any assets in Australia, and have not been issued a TFN.',
            decl1Val !== '-'
          )
        + declBox(
            '',
            'I have read and accept the Client Agreement & Privacy Policy',
            decl2Val !== '-'
          )
        + sec('How did you hear about us?')
        + field('How did you hear about us?', task.howHeard)
    }

    else if (task.taskType === 'abn') {
      const gender   = getNote('Gender')
      const decl1Val = findDecl(['→ ✓ I declare that I do not own','→ ✓ I confirm'])
      const decl2Val = findDecl(['→ ✓ I have read','→ ✓ I agree'])

      formBody =
        sec('Personal details')
        + field('First name (including middle name)', task.clientName.split(' ').slice(0,-1).join(' ') || task.clientName)
        + field('Last name', task.clientName.split(' ').pop() || '')
        + field('Date of birth', fmtDob(task.dob))
        + radioField('Gender as shown in passport', gender, ['Female','Male'])
        + field('Country of passport', task.country)
        + field('WhatsApp Number', task.whatsapp)
        + field('Australian phone number', task.auPhone)
        + field('Email address', task.email)
        + field('Full Australian address (state, city, street, number, postcode)', task.address)
        + field('TFN (Tax File Number)', task.tfn)
        + field('Brief description of business activity', task.primaryJob)
        + sec('Documents')
        + ((task.fileUrls??[]).length > 0
          ? (task.fileUrls??[]).map(fileItem).join('')
          : `<p style="font-size:12px;color:#aabab2">No files uploaded</p>`)
        + sec('Declaration')
        + declBox(
            '',
            decl1Val !== '-' ? decl1Val.replace('→ ✓ ','') : 'I declare that I do not own any assets in Australia and have never been issued an ABN. I intend to establish a business as a sole trader, where I will be the sole owner, with operations based in Australia.',
            decl1Val !== '-'
          )
        + declBox(
            '',
            'I have read and accept the Client Agreement & Privacy Policy',
            decl2Val !== '-'
          )
        + sec('How did you hear about us?')
        + field('How did you hear about us?', task.howHeard)
    }

    else if (task.taskType === 'super') {
      const passport    = getNote('Passport No')
      const superFundName = getNote('Super Fund Name') || getNote('Super Funds')
      const superMemberNumber = getNote('Super Member Number')
      const superOpeningDate = getNote('Super Opening Date')
      const homeAddress = getNote('Home Country Address')
      const declVal     = findDecl(['→ ✓ I have read','→ ✓ I agree','→ ✓'])

      formBody =
        sec('Personal details')
        + field('First name (including middle name)', task.clientName.split(' ').slice(0,-1).join(' ') || task.clientName)
        + field('Last name', task.clientName.split(' ').pop() || '')
        + field('Date of birth', fmtDob(task.dob))
        + field('Passport number', passport)
        + field('Country that issued the passport (with visa attached)', task.country)
        + sec('Contact details')
        + field('WhatsApp Number', task.whatsapp)
        + field('Email address', task.email)
        + field('Full Australian address (state, city, street, number, postcode)', task.address)
        + field('Full home country address', homeAddress)
        + sec('Tax & super fund details')
        + field('TFN (Tax File Number)', task.tfn)
        + field('Super fund name', superFundName)
        + field('Member number', superMemberNumber)
        + field('Account opening date', superOpeningDate)
        + sec('Documents')
        + ((task.fileUrls??[]).length > 0
          ? (task.fileUrls??[]).map(fileItem).join('')
          : `<p style="font-size:12px;color:#aabab2">No files uploaded</p>`)
        + sec('Declaration')
        + declBox(
            '',
            'I have read and accept the Client Agreement & Privacy Policy',
            declVal !== '-'
          )
        + sec('How did you hear about us?')
        + field('How did you hear about us?', task.howHeard)
    }

    else if (task.taskType === 'tax-return' || task.taskType === 'lead') {
      const normStatus = (v: string) => {
        if (v === 'resident' || v === '→ resident') return 'Australian resident for tax purposes'
        if (v === 'whm' || v === '→ whm') return 'Working holiday maker for tax purposes'
        return v.replace('→ ','')
      }
      const rawStatus   = parts.find(p => p.startsWith('→ Australian') || p.startsWith('→ Working') || p.startsWith('→ resident') || p.startsWith('→ whm'))?.replace('→ ','') || task.taxStatus || '-'
      const taxStatus   = normStatus(rawStatus)
      const declaredVal = findDecl(['→ ✓ I declare that all','→ ✓ Yes','→ ✗ No','→ ✓ I agree','→ Yes'])

      formBody =
        sec('Contact details')
        + field('WhatsApp Number', task.whatsapp)
        + field('Australian Phone Number', task.auPhone)
        + field('Full Name (including middle name)', task.clientName)
        + field('Email Address', task.email)
        + field('Full Address in Australia', task.address)
        + sec('Personal information')
        + field('Home Country', task.country)
        + field('Date of Birth', fmtDob(task.dob))
        + radioField('Marital Status', task.marital, ['Single','Married'])
        + sec('Tax information')
        + field('Tax File Number (TFN)', task.tfn)
        + field('Tax Year', task.taxYear)
        + field('Primary job in the past year', task.primaryJob)
        + sec('Work-related expenses')
        + (() => {
            const expVal = (task.notes||'').match(/Expenses: ([^|]+)/)?.[1]?.trim()||''
            return radioField('Did you have work-related expenses?', expVal || '', ['Yes','No'])
          })()
        + (() => {
            // Parse and display TFN/ABN invoices stored in notes by the tax-form route.
            // Format: "💼 TFN Invoices (N): $TOTAL - $AMT DESC; $AMT DESC; ..."
            const notes = task.notes || ''
            const tfnMatch = notes.match(/💼 TFN Invoices \(\d+\): \$[\d.]+ - ([^|]+)/)
            const abnMatch = notes.match(/🏢 ABN Invoices \(\d+\): \$[\d.]+ - ([^|]+)/)
            if (!tfnMatch && !abnMatch) return ''
            const renderList = (raw: string) => raw.trim().split(';').map(s => s.trim()).filter(Boolean)
              .map(line => `<div style="padding:8px 12px;background:#F5F9F7;border:1px solid #D4EAE2;border-radius:8px;margin-bottom:6px;font-size:12px;color:#1A2822">${esc(line)}</div>`)
              .join('')
            let out = ''
            if (tfnMatch) {
              out += `<div style="font-size:12px;font-weight:600;color:${G};margin:14px 0 8px">💼 TFN work-related expenses</div>`
              out += renderList(tfnMatch[1])
            }
            if (abnMatch) {
              out += `<div style="font-size:12px;font-weight:600;color:${G};margin:14px 0 8px">🏢 ABN business expenses</div>`
              out += renderList(abnMatch[1])
            }
            return out
          })()
        + sec('Documents')
        + ((task.fileUrls??[]).length > 0
          ? (task.fileUrls??[]).map(fileItem).join('')
          : `<p style="font-size:12px;color:#aabab2">No files uploaded</p>`)
        + sec('Declaration')
        + `<div style="font-size:12px;color:#587066;margin-bottom:6px">Tax residency status:</div>`
        + `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;border:1.5px solid ${G};background:#EAF6F1;margin-bottom:10px">` +
          `<div style="width:16px;height:16px;border-radius:50%;background:${G};flex-shrink:0"></div>` +
          `<span style="font-size:13px;font-weight:600;color:${G}">${esc(taxStatus||'-')}</span>` +
          `</div>`
        + declBox('', declaredVal !== '-' ? (declaredVal.replace('✓ ','').replace('→ ','') || 'I declare that all information provided is true and accurate.') : '-', declaredVal !== '-')
        + sec('How did you hear about us?')
        + field('How did you hear about us?', task.howHeard)
    }

    const html =
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>` +
      `<meta name="viewport" content="width=device-width,initial-scale=1"/>` +
      `<title>${esc(titles[task.taskType]??task.taskType)} - ${esc(task.clientName)}</title>` +
      `<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;background:#fff;color:#0a1410;padding:32px 28px;max-width:520px;margin:0 auto}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.no-print{display:none!important}}</style>` +
      `</head><body>` +

      `<div style="text-align:center;margin-bottom:28px;padding-bottom:20px;border-bottom:2px solid ${GL}">` +
      `<div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:14px">` +
      `<svg width="36" height="36" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">` +
      `<rect x="2" y="2" width="19" height="19" rx="4.5" stroke="#0B5240" stroke-width="2"/>` +
      `<rect x="13" y="13" width="19" height="19" rx="4.5" fill="#0B5240"/>` +
      `<line x1="2" y1="2" x2="13" y2="13" stroke="#E9A020" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>` +
      `<circle cx="2" cy="2" r="1.6" fill="#E9A020" opacity="0.7"/>` +
      `<path d="M22.5 17 L27 19 L27 23.5 Q27 27 22.5 29 Q18 27 18 23.5 L18 19 Z" fill="rgba(255,255,255,0.1)" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>` +
      `<polyline points="20.4,23 22.2,25 25,21.5" fill="none" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>` +
      `</svg>` +
      `<span style="font-family:Georgia,serif;font-size:20px;font-weight:800;color:#080F0D;letter-spacing:-0.02em">Working Holiday Tax</span>` +
      `</div>` +
      `<h1 style="font-size:24px;font-weight:800;color:#080F0D;letter-spacing:-0.02em;margin-bottom:6px">${esc(titles[task.taskType]??task.taskType)}</h1>` +
      `<p style="font-size:12px;color:#6b7f76">Submitted: ${task.submittedAt ? new Date(task.submittedAt).toLocaleString('en-AU',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Australia/Sydney'})+' AEST/AEDT' : '-'}</p>` +
      `</div>` +

      formBody +

      `<div style="margin-top:32px;padding-top:12px;border-top:1px solid #e8f0eb;display:flex;justify-content:space-between">` +
      `<div style="font-size:10px;color:#aabab2">Generated ${new Date().toLocaleString('en-AU',{timeZone:'Australia/Sydney'})} AEST/AEDT</div>` +
      `<div style="font-size:10px;color:#aabab2">Working Holiday Tax · workingholidaytax.com.au</div>` +
      `</div>` +

      `<script class="no-print">window.onload=function(){window.print()}<\/script>` +
      `</body></html>`

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    // Build filename: ClientName_TaskType_Date.html (e.g., "John_Doe_Tax_Return_2026-05-20.html")
    // Allow Unicode letters (Hebrew, Spanish accents, etc) - only strip filesystem-unsafe chars
    let safeName = (task.clientName || 'form').trim().replace(/\s+/g, '_').replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    if (!safeName || safeName === '_') safeName = 'client'
    const typeLabels: Record<string, string> = {
      'tfn': 'TFN_Application',
      'abn': 'ABN_Application',
      'tax-return': 'Tax_Return',
      'super': 'Superannuation_Refund',
      'lead': 'Tax_Return_Incomplete',
    }
    const typeLabel = typeLabels[task.taskType] || task.taskType
    const dateStr = new Date().toISOString().slice(0, 10)
    a.download = `${safeName}_${typeLabel}_${dateStr}.html`
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }

  const fmtCur    = (n:number)   => new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(n)
  const initials  = (name:string) => name.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase()
  // Displays a stored "First Middle... Last" name as "Last, First Middle..." for consistent CRM display
  const displayName = (name:string) => {
    const parts = (name||'').trim().split(/\s+/).filter(Boolean)
    if (parts.length < 2) return name
    const last = parts[parts.length-1]
    const rest = parts.slice(0,-1).join(' ')
    return `${last}, ${rest}`
  }
  // Groups digits into blocks of 3 for readability (TFN), preserving a leading "+"
  const groupDigits = (val:string) => {
    if (!val) return val
    const hasPlus = val.trim().startsWith('+')
    const digits = val.replace(/\D/g,'')
    if (!digits) return val
    const groups = digits.match(/.{1,3}/g)?.join(' ') || digits
    return hasPlus ? `+${groups}` : groups
  }
  // Formats phone numbers the way they actually appear in WhatsApp/real life, using each
  // country's own convention (e.g. +44 7432 131956, +49 163 1762085, +353 85 729 7457).
  // NANP numbers (+1, US/Canada) are a special case: WhatsApp shows them as
  // "+1 (XXX) XXX-XXXX" rather than the plain international grouping.
  const formatPhoneNumber = (val:string) => {
    if (!val) return val
    let cleaned = val.trim()
    if (!cleaned) return val

    // "00" is the common international dialing prefix used outside the NANP
    // (North America) - treat it the same as a leading "+".
    if (/^00\d/.test(cleaned)) cleaned = `+${cleaned.slice(2)}`

    const applyFormat = (p: ReturnType<typeof parsePhoneNumberFromString>) =>
      p!.countryCallingCode === '1' ? `+1 ${p!.formatNational()}` : p!.formatInternational()

    if (cleaned.startsWith('+')) {
      const p = parsePhoneNumberFromString(cleaned)
      if (p) return applyFormat(p)
    } else {
      const digits = cleaned.replace(/\D/g, '')
      // Looks like a local AU number (starts with a trunk "0")
      if (digits.startsWith('0')) {
        const p = parsePhoneNumberFromString(digits, 'AU')
        if (p && p.isValid()) return p.formatNational()
      }
      // No "+" and no leading "0" - people often type/paste the number with
      // the country code but forget the "+" (e.g. "61491570156"). Try
      // treating the digits as an international number with an implied "+".
      if (digits.length >= 8) {
        const p = parsePhoneNumberFromString(`+${digits}`)
        if (p && p.isValid()) return applyFormat(p)
      }
      // Last resort AU parse without requiring strict validity, in case it's
      // a slightly malformed but clearly AU-shaped number.
      if (digits.startsWith('0')) {
        const p = parsePhoneNumberFromString(digits, 'AU')
        if (p) return p.formatNational()
      }
    }

    // Nothing parsed - fall back to plain 3-digit grouping so it's at least readable
    const hasPlus = cleaned.startsWith('+')
    const digits = cleaned.replace(/\D/g, '')
    const groups = digits.match(/.{1,3}/g)?.join(' ') || digits
    return hasPlus ? `+${groups}` : groups
  }
  // Six [background, foreground] token pairs. The count matters: avColor picks
  // by `name.charCodeAt(0) % avatarColors.length`, so keeping six entries keeps
  // every existing client on exactly the colour they had before.
  const avatarColors = [
    ['color-mix(in srgb, var(--brand1) 12%, transparent)','var(--brand1)'],
    ['color-mix(in srgb, var(--brand1) 12%, transparent)','var(--brand1)'],
    ['color-mix(in srgb, var(--sales) 14%, transparent)','var(--sales)'],
    ['var(--surface2)','var(--brand1)'],
    ['color-mix(in srgb, var(--crit) 12%, transparent)','var(--crit)'],
    ['color-mix(in srgb, var(--good) 12%, transparent)','var(--good)'],
  ]
  const avColor   = (name:string) => avatarColors[name.charCodeAt(0)%avatarColors.length]

  // Restore the task list's scroll position after returning from a task's detail view.
  useEffect(()=>{
    if (view==='tasks' && taskView==='list' && tasksScrollRef.current) {
      tasksScrollRef.current.scrollTop = tasksScrollPosRef.current
    }
  }, [view, taskView])

  // A task matches the search box if the query appears in the client's name,
  // email, or WhatsApp number (case-insensitive; phone numbers are matched
  // ignoring spaces/dashes so "0412 345 678" and "0412-345-678" both work).
  const taskMatchesSearch = (t: Task, q: string) => {
    if (!q) return true
    const digits = q.replace(/[\s-]/g, '')
    return (
      t.clientName.toLowerCase().includes(q) ||
      (t.email || '').toLowerCase().includes(q) ||
      (digits && (t.whatsapp || '').replace(/[\s-]/g, '').includes(digits))
    )
  }

  const pendingTasks   = useMemo(()=>{
    const q = taskSearch.trim().toLowerCase()
    const base = tasks.filter(t=>!t.done).sort((a,b)=>{
      // Leads marked "In Progress" (waiting on the client) drop to the bottom
      // of the queue so the admin can keep working through the rest first.
      const aIP = isTaskInProgress(a.notes) ? 1 : 0
      const bIP = isTaskInProgress(b.notes) ? 1 : 0
      if (aIP !== bIP) return aIP - bIP
      return new Date(b.submittedAt).getTime()-new Date(a.submittedAt).getTime()
    })
    return q ? base.filter(t=>taskMatchesSearch(t, q)) : base
  }, [tasks, taskSearch])
  const doneTasks      = useMemo(()=>{
    const q = taskSearch.trim().toLowerCase()
    const base = tasks.filter(t=>t.done).sort((a,b)=>new Date(b.submittedAt).getTime()-new Date(a.submittedAt).getTime())
    return q ? base.filter(t=>taskMatchesSearch(t, q)) : base
  }, [tasks, taskSearch])
  const visibleClients = useMemo(()=>{
    // If user is searching and we have server-side results (more clients than loaded),
    // use the merged set so they can find clients beyond the first page.
    const sourceClients = (search.trim().length >= 2 && searchResults && clients.length < clientsTotal)
      ? (() => {
          const seen = new Set(clients.map(c => c.id))
          return [...clients, ...searchResults.filter(c => !seen.has(c.id))]
        })()
      : clients
    return sourceClients.filter(c=>{
    const q = search.trim().toLowerCase()
    const qDigits = q.replace(/[\s-]/g, '')
    const ms = !q
      || c.fullName.toLowerCase().includes(q)
      || displayName(c.fullName).toLowerCase().includes(q)
      || (c.email || '').toLowerCase().includes(q)
      || (qDigits && (c.whatsapp || '').replace(/[\s-]/g, '').includes(qDigits))
    const my = yearFilter.size===0 || c.taxReturns.some(r=>yearFilter.has(r.year)) || c.superReturns.some(r=>yearFilter.has(r.year))
    const checkinDone = c.yearlyCheckins?.[checkinYear] ?? false
    const mc = checkinFilter==='all' || (checkinFilter==='done' && checkinDone) || (checkinFilter==='pending' && !checkinDone)
    const mh = howHeardFilter.size===0 || howHeardFilter.has(canonicalSource(c.howHeard) || 'Unknown')
    const mcountry = countryFilter.size===0 || countryFilter.has(canonicalCountry(c.country))
    // Super filter: no-super = clients with tax returns but no super refund
    const msuper = superFilter==='all' || (superFilter==='no-super' && c.taxReturns.length > 0 && c.superReturns.length === 0)
    // No-return filter: clients who had tax return last year but didn't return this year
    const now = new Date()
    const yy = now.getFullYear()
    const thisYearStr = now.getMonth() >= 6 ? `${yy}-${String(yy+1).slice(2)}` : `${yy-1}-${String(yy).slice(2)}`
    const lastYearStr = (() => { const s = parseInt(thisYearStr.split('-')[0], 10) - 1; return `${s}-${String(s+1).slice(2)}` })()
    const hadLastYear = c.taxReturns.some(r => r.year === lastYearStr)
    const hasThisYear = c.taxReturns.some(r => r.year === thisYearStr)
    const mNoReturn = noReturnFilter==='all' || (noReturnFilter==='didnt-return' && hadLastYear && !hasThisYear)
    const mStatus = statusFilter.size===0 || statusFilter.has(getClientStatus(c.notes || ''))
    return ms && my && mc && mh && mcountry && msuper && mNoReturn && mStatus
  }).sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime())
  }, [clients, clientsTotal, searchResults, search, yearFilter, checkinYear, checkinFilter, howHeardFilter, countryFilter, superFilter, noReturnFilter, statusFilter])
  const DropBtn = ({id,label,icon,active,onClear,children}:{id:string;label:string;icon:React.ReactNode;active:boolean;onClear:()=>void;children:React.ReactNode}) => {
    const isOpen = openDropdown === id
    return (
      <div style={{flexShrink:0,position:'relative'}}>
        <button
          onClick={()=>setOpenDropdown(isOpen?null:id)}
          className={`ptab${active?' active':''}`}>
          {icon}
          {label}

          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{marginLeft:2,opacity:.5,transform:isOpen?'rotate(180deg)':'rotate(0deg)',transition:'transform 0.15s'}}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        {isOpen && <>
          <div style={{position:'fixed',inset:0,zIndex:98}} onClick={()=>setOpenDropdown(null)}/>
          <div className="card" style={{position:'absolute',top:'calc(100% + 6px)',left:0,zIndex:99,padding:'10px 12px',minWidth:200,display:'flex',flexDirection:'column' as const,maxHeight:'min(380px, 60vh)',overflow:'visible'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8,paddingBottom:6,borderBottom:'1px solid var(--line)',flexShrink:0}}>
              <span className="mlabel" style={{margin:0}}>{label}</span>
              {active && <button className="btn sm quiet" onClick={e=>{e.stopPropagation();onClear()}}>Clear</button>}
            </div>
            {/* Only the options scroll: the title and Clear stay reachable
                however long the list gets. Without the cap a long country list
                runs off the bottom of the screen with no way to reach it. */}
            <div style={{overflowY:'auto',minHeight:0,marginRight:-6,paddingRight:6}}>
              {children}
            </div>
          </div>
        </>}
      </div>
    )
  }

  const globalResults = useMemo(()=>{
    const q = globalSearch.trim()
    if (q.length <= 1) return null
    const qLower = q.toLowerCase()
    const qDigits = q.replace(/[\s-]/g, '')
    // Merge local clients with any server-side search results
    const sourceClients = (searchResults && clients.length < clientsTotal)
      ? (() => {
          const seen = new Set(clients.map(c => c.id))
          return [...clients, ...searchResults.filter(c => !seen.has(c.id))]
        })()
      : clients
    return {
      tasks: tasks.filter(t=>
        t.clientName.toLowerCase().includes(qLower) ||
        displayName(t.clientName).toLowerCase().includes(qLower) ||
        (t.email || '').toLowerCase().includes(qLower) ||
        (qDigits && (t.whatsapp || '').replace(/[\s-]/g, '').includes(qDigits))
      ).slice(0,5),
      clients: sourceClients.filter(c=>
        c.fullName.toLowerCase().includes(qLower) ||
        displayName(c.fullName).toLowerCase().includes(qLower) ||
        (c.email || '').toLowerCase().includes(qLower) ||
        (qDigits && (c.whatsapp || '').replace(/[\s-]/g, '').includes(qDigits))
      ).slice(0,5),
    }
  }, [globalSearch, tasks, clients, clientsTotal, searchResults])

  const howHeardStats = useMemo(()=>clients.reduce((acc:Record<string,number>,c)=>{ const k=c.howHeard||'Unknown'; acc[k]=(acc[k]||0)+1; return acc },{}), [clients])
  const archiveHowHeardStats = useMemo(()=>archivedClients.reduce((acc:Record<string,number>,c)=>{ const k=c.howHeard||'Unknown'; acc[k]=(acc[k]||0)+1; return acc },{}), [archivedClients])
  const visibleArchived = useMemo(()=>{
    // Merge with server-side search results if user is searching
    const source = (archiveSearch.trim().length >= 2 && archiveSearchResults)
      ? (() => {
          const seen = new Set(archivedClients.map(c => c.id))
          return [...archivedClients, ...archiveSearchResults.filter(c => !seen.has(c.id))]
        })()
      : archivedClients
    return source.filter(c=>{
    const aq = archiveSearch.trim().toLowerCase()
    const aqDigits = aq.replace(/[\s-]/g, '')
    const ms = !aq
      || c.fullName.toLowerCase().includes(aq)
      || (c.email || '').toLowerCase().includes(aq)
      || (aqDigits && (c.whatsapp || '').replace(/[\s-]/g, '').includes(aqDigits))
    const my = archiveYearFilter.size===0 || c.taxReturns?.some(r=>archiveYearFilter.has(r.year)) || c.superReturns?.some(r=>archiveYearFilter.has(r.year))
    const mh = archiveHowHeardFilter.size===0 || archiveHowHeardFilter.has(c.howHeard||'Unknown')
    const mc = archiveCountryFilter.size===0 || archiveCountryFilter.has(c.country||'')
    return ms && my && mh && mc
  })
  }, [archivedClients, archiveSearchResults, archiveSearch, archiveYearFilter, archiveHowHeardFilter, archiveCountryFilter])


  return (
    // .crm-scope owns the font, the background, the height and the --crm-fit
    // zoom for the whole admin. Nothing here sets any of those: that is the
    // point — the CRM and Will now read one stylesheet, so they cannot drift.
    <div className="crm-scope">
      <CrmSide
        items={crmNav({
          badges: { tasks: pendingTasks.length, clients: newClientsCount, archive: newArchiveCount },
          on: {
            tasks:   ()=>{ setView('tasks');setTaskView('list');setActiveTask(null);setActiveClient(null) },
            clients: ()=>{ setView('clients');setTaskView('list');setActiveTask(null);setActiveClient(null);setNewClientsCount(0) },
            archive: openArchive,
            leads:   ()=>{ setView('leads');setTaskView('list');setActiveTask(null);setActiveClient(null) },
          },
        })}
        activeKey={view}
        onLock={lockAndExit}
      />

      <main>

          {/* ── TASK LIST ── */}
          {view==='tasks' && taskView==='list' && (
            <div className="view" style={{display:'flex',flexDirection:'column',flex:1,minHeight:0,overflow:'hidden'}}>
              <div className="phead">
              <div className="hrow">
                <h1 className="vt">Tasks</h1>
                <div className="hspacer" />
                <button
                  className="btn quiet"
                  onClick={async()=>{setRefreshing(true);await Promise.all([loadTasks(),loadClients(),loadStats({force:true})]);setRefreshing(false)}}
                  style={{cursor:refreshing?'default':'pointer'}}
                >
                  {/* The icon turns while the fetch is in flight — the only
                      signal that Refresh did anything on an already-fresh list. */}
                  <span className={refreshing ? 'ic spinning' : 'ic'}>{NavIcons.refresh}</span>
                  Refresh
                </button>
              </div>
              {/* Title and actions only. The tiles, the birthday panel and the
                  search box used to live up here too, which made the header
                  four times the height of Will's; they scroll with the content
                  now, which is where Will keeps its equivalents. */}
              </div>

              <div
                className="pbody"
                ref={tasksScrollRef}
                onScroll={e=>{ tasksScrollPosRef.current = (e.target as HTMLDivElement).scrollTop }}
              >

              {/* Season stats */}
              {(()=>{
                // Use server-computed stats for accurate values at any scale.
                // Falls back to local computation only on first render before stats load.
                const allClients = clients.filter(c => !c.archived)

                // "Ready to go": pending tasks with no note and not flagged
                // In Progress - genuinely untouched, ready to pick up.
                // "In Process": pending tasks that DO have a note or ARE
                // flagged In Progress - someone's already partway through them.
                const readyToGoCount = pendingTasks.filter(t => !isTaskInProgress(t.notes) && !(t.reviewerNote && t.reviewerNote.trim())).length
                const inProcessCount = pendingTasks.filter(t => isTaskInProgress(t.notes) || (t.reviewerNote && t.reviewerNote.trim())).length

                const doneCount = Math.max(stats?.totalTasksDone ?? 0, doneTasks.length)
                // Always show stats - even if no tasks yet (provides motivation + overview)
                const totalClients = Math.max(stats?.totalActiveClients ?? 0, allClients.length)
                return (<>
                  <div className="kpis" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
                    {[
                      {key:'ready',label:'Ready to go',value:readyToGoCount,onClick:()=>{ setView('tasks'); setTaskView('list'); setTaskTileFilter(f=>f==='ready'?'all':'ready') }},
                      {key:'done',label:'Done',value:doneCount,onClick:()=>{ setView('tasks'); setTaskView('list'); setTaskTileFilter(f=>f==='done'?'all':'done') }},
                      {key:'clients',label:'Clients',value:totalClients,onClick:()=>{ setView('clients') }},
                    ].map(stat=>{
                      const active = (stat.key==='ready'&&taskTileFilter==='ready')||(stat.key==='done'&&taskTileFilter==='done')
                      return (
                      <div key={stat.label} className={`kpi clickable${active?' on':''}`} onClick={stat.onClick} role="button">
                        <div className="kl">{stat.label}</div>
                        <div className="kv">{stat.value}</div>
                      </div>
                    )})}
                  </div>
                </>)
              })()}

              {/* Birthday Reminders - clients with birthdays in next 7 days */}
              {(()=>{
                const today = new Date()
                // Normalize to start of day to avoid timezone issues
                today.setHours(0, 0, 0, 0)
                const upcoming = clients.map(c => {
                  if (!c.dob) return null
                  const parts = c.dob.includes('/') ? c.dob.split('/') : c.dob.split('-')
                  if (parts.length !== 3) return null
                  let day, month
                  if (c.dob.includes('/')) { day = parseInt(parts[0], 10); month = parseInt(parts[1], 10) }
                  else { day = parseInt(parts[2], 10); month = parseInt(parts[1], 10) }
                  if (!day || !month || month < 1 || month > 12 || day < 1 || day > 31) return null
                  const thisYear = today.getFullYear()
                  let bday = new Date(thisYear, month-1, day)
                  bday.setHours(0, 0, 0, 0)
                  // If birthday already passed this year (more than 1 day ago), move to next year
                  const daysSincePassed = Math.floor((today.getTime() - bday.getTime()) / 86400000)
                  if (daysSincePassed > 1) {
                    bday = new Date(thisYear+1, month-1, day)
                    bday.setHours(0, 0, 0, 0)
                  }
                  const days = Math.round((bday.getTime() - today.getTime()) / 86400000)
                  if (days < -1 || days > 7) return null
                  const bkey = `${c.id}:${bday.getFullYear()}-${month}-${day}`
                  if (dismissedBdays.has(bkey)) return null
                  return { client: c, days, bkey }
                }).filter((x): x is {client: Client, days: number, bkey: string} => x !== null)
                  .sort((a,b) => a.days - b.days)
                if (upcoming.length === 0) return null
                const fmtDays = (d:number) => d===0 ? 'today! 🎉' : d===1 ? 'tomorrow' : d===-1 ? 'yesterday' : `in ${d} days`
                return (
                  <div className="panel" style={{marginBottom:12,display:'flex',alignItems:'flex-start',gap:12}}>
                    <div style={{fontSize:21,flexShrink:0}}>🎂</div>
                    <div style={{flex:1,minWidth:0}}>
                      <h3>{upcoming.length} birthday{upcoming.length!==1?'s':''} this week</h3>
                      <div style={{display:'flex',flexDirection:'column' as const,gap:6,marginTop:8}}>
                        {upcoming.map(({client:c,days,bkey})=>{
                          const sanitized = (c.whatsapp||'').replace(/[^0-9+]/g,'')
                          const firstName = c.fullName.split(' ')[0] || 'there'
                          const msg = `Happy birthday ${firstName}! 🎉🎂 Wishing you an amazing year ahead - Working Holiday Tax`
                          return (
                            <div key={c.id} style={{display:'flex',alignItems:'center',gap:8,background:'var(--surface2)',padding:'6px 10px',borderRadius:8}}>
                              <span className="cname" style={{flex:1,minWidth:0,overflow:'hidden',textOverflow:'ellipsis' as const,whiteSpace:'nowrap' as const}}>{displayName(c.fullName)}</span>
                              <span className="chip">{fmtDays(days)}</span>
                              {sanitized && (
                                <a className="btn sm" href={`https://wa.me/${sanitized}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer"
                                  // #25D366 is WhatsApp's own brand green and stays literal:
                                  // this link opens wa.me, so it wears that product's colour.
                                  style={{background:'#25D366',color:'#fff',textDecoration:'none'}}>
                                  🎁 Send wish
                                </a>
                              )}
                              <button type="button" className="btn quiet sm" onClick={()=>dismissBday(bkey)} title="Mark as done - dismiss this reminder">
                                ✓ Done
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Name search */}
              <div className="search" style={{maxWidth:'35%',marginBottom:12}}>
                <span className="search-ic">{NavIcons.search}</span>
                <input
                  placeholder="Search by name, email, or WhatsApp…"
                  value={taskSearch}
                  onChange={e=>setTaskSearch(e.target.value)}
                />
                {taskSearch && (
                  <button onClick={()=>setTaskSearch('')} style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--ink3)',fontSize:16,padding:'4px 8px'}}>×</button>
                )}
              </div>


              {taskTileFilter!=='all' && (
                <div className="hrow" style={{marginBottom:10}}>
                  <span style={{fontSize:12,color:'var(--ink2)',fontWeight:600}}>Showing: {taskTileFilter==='ready'?'Ready to go':'Done'}</span>
                  <button className="btn quiet sm" onClick={()=>setTaskTileFilter('all')}>Show all ×</button>
                </div>
              )}
              {taskTileFilter!=='done' && (() => {
                const shownPending = taskTileFilter==='ready'
                  ? pendingTasks.filter(t=>!isTaskInProgress(t.notes) && !(t.reviewerNote && t.reviewerNote.trim()))
                  : pendingTasks
                return shownPending.length>0 && <>
                {shownPending.map(t=>{
                  const isWhv = t.taskType === 'tax-return' && (t.notes||'').includes('Working holiday maker')
                  const isMarried = (t.marital||'').toLowerCase() === 'married'
                  const isReturning = (t.notes||'').includes('🔄 Returning client')
                  const inProgress = isTaskInProgress(t.notes)
                  const wasLastViewed = t.id === lastViewedTaskId
                  // `wasLastViewed` no longer draws a border. A permanent ring
                  // around the row you happened to open last competes with the
                  // row the mouse is actually on, and it never goes away. It
                  // shows as a soft tint instead, and the BORDER follows the
                  // pointer — see .task:hover in crm-design.css.
                  return (
                  <div key={t.id} className={`task${wasLastViewed?' seen':''}`} style={{alignItems:'center',cursor:'pointer', ...(inProgress?{background:'var(--surface2)'}:{})}} onClick={()=>{setLastViewedTaskId(t.id);setActiveTask(t);setTaskNotes(extractUserNotes(t.notes));setTaskView('detail')}}>
                    <button
                      onClick={e=>{e.stopPropagation();toggleInProgress(t)}}
                      title={inProgress ? 'Remove "In Progress" mark' : 'Mark "In Progress" - moves to the bottom of the queue'}
                      aria-label={inProgress ? 'Unmark in progress' : 'Mark in progress'}
                      style={{width:16,height:16,borderRadius:5,border:`1.5px solid ${inProgress?'var(--good)':'var(--line2)'}`,background:inProgress?'var(--good)':'var(--surface)',flexShrink:0,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',padding:0}}
                    >
                      {inProgress && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--surface)'}}><polyline points="20 6 9 17 4 12"/></svg>}
                    </button>
                    <div style={{width:9,height:9,borderRadius:'50%',background:'var(--warn)',flexShrink:0}}/>
                    <div className="tbody">
                      <div className="trow" style={{flexWrap:'wrap',gap:4}}>
                        <span className="ttitle">{displayName(t.clientName)}</span>
                        <CopyBtn text={displayName(t.clientName)}/>
                        {isReturning && (
                          <span className="chip good" title="This client has been with you before">
                            🔄 Returning
                          </span>
                        )}
                        {inProgress && (
                          <span className="chip good" title="In progress - waiting on the client">
                            🔶 In Progress
                          </span>
                        )}
                      </div>
                      {t.whatsapp && (
                        <div className="rc-sub" style={{color:'var(--ink2)',direction:'ltr' as const,justifyContent:'flex-start',gap:3}}>
                          <span>{formatPhoneNumber(t.whatsapp)}</span>
                          <CopyBtn text={t.whatsapp}/>
                        </div>
                      )}
                      <div className="rc-sub">
                        <span>{t.country} · <span className="tsev" style={{['--tc' as string]:TASK_COLORS[t.taskType]}}>{TASK_LABELS[t.taskType]}</span></span>
                        {isWhv && (
                          <span className="chip warn" title="Client filled as Working Holiday Visa - verify residency status">
                            ⚠️ WHV - Verify Residency
                          </span>
                        )}
                        {isMarried && (
                          <span className="chip" style={{color:'var(--brand2)',background:'color-mix(in srgb, var(--brand2) 10%, transparent)'}} title="Client marked as Married - may affect tax processing">
                            💑 Married - Verify
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{flex:'0 1 220px',minWidth:0}} onClick={e=>e.stopPropagation()}>
                      {editingNoteId === t.id ? (
                        <input
                          autoFocus
                          defaultValue={t.reviewerNote || ''}
                          placeholder="Add a note…"
                          onBlur={e=>saveReviewerNote(t.id, e.target.value)}
                          onKeyDown={e=>{
                            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
                            if (e.key === 'Escape') setEditingNoteId(null)
                          }}
                          style={{fontSize:11.5,padding:'5px 9px',borderRadius:7}}
                        />
                      ) : t.reviewerNote ? (
                        <button
                          onClick={()=>setEditingNoteId(t.id)}
                          title="Click to edit note"
                          className="btn quiet sm"
                          style={{width:'100%',display:'block',textAlign:'left',color:'var(--warn)',borderColor:'color-mix(in srgb, var(--warn) 35%, transparent)',background:'color-mix(in srgb, var(--warn) 8%, var(--surface))',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}
                        >
                          📝 {t.reviewerNote}
                        </button>
                      ) : (
                        <button
                          onClick={()=>setEditingNoteId(t.id)}
                          title="Add a note (only visible while this lead is pending)"
                          className="btn quiet sm"
                          style={{borderStyle:'dashed',background:'transparent',color:'var(--ink3)'}}
                        >
                          + Note
                        </button>
                      )}
                    </div>
                    <div className="rc-side">
                      <div className="rc-time" style={{whiteSpace:'nowrap',minWidth:0}}>{fmtDate(t.submittedAt)}</div>
                      <button onClick={e=>{e.stopPropagation();setConfirmPermDelete(t.id)}} className="btn quiet danger sm" title="Delete lead permanently" aria-label={`Delete lead for ${t.clientName}`}>🗑️</button>
                    </div>
                  </div>
                )})}
              </>})()}

              {taskTileFilter!=='ready' && doneTasks.length>0 && <>
                <div className="mlabel" style={{display:'flex',alignItems:'center',gap:6}}>
                  <span style={{color:'var(--good)',fontSize:8}}>●</span> Done - {doneTasks.length}
                </div>
                {doneTasks.map(t=>{
                  const isWhv = t.taskType === 'tax-return' && (t.notes||'').includes('Working holiday maker')
                  const isMarried = (t.marital||'').toLowerCase() === 'married'
                  return (
                  <div key={t.id} className="task" style={{alignItems:'center',opacity:0.82,cursor:'default'}}>
                    <div className="pulsing" style={{width:9,height:9,borderRadius:'50%',background:'var(--good)',flexShrink:0}}/>
                    <div className="tbody">
                      <div className="trow" style={{gap:4}}>
                        <span className="ttitle">{displayName(t.clientName)}</span>
                        <CopyBtn text={displayName(t.clientName)}/>
                      </div>
                      {t.whatsapp && (
                        <div className="rc-sub" style={{color:'var(--ink2)',direction:'ltr' as const,justifyContent:'flex-start',gap:3}}>
                          <span>{formatPhoneNumber(t.whatsapp)}</span>
                          <CopyBtn text={t.whatsapp}/>
                        </div>
                      )}
                      <div className="rc-sub">
                        <span>{t.country} · <span className="tsev" style={{['--tc' as string]:TASK_COLORS[t.taskType]}}>{TASK_LABELS[t.taskType]}</span></span>
                        {isWhv && (
                          <span className="chip warn" title="Client filled as Working Holiday Visa">
                            ⚠️ WHV
                          </span>
                        )}
                        {isMarried && (
                          <span className="chip" style={{color:'var(--brand2)',background:'color-mix(in srgb, var(--brand2) 10%, transparent)'}} title="Client marked as Married">
                            💑 Married
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="rc-side">
                      <div className="rc-time" style={{whiteSpace:'nowrap',minWidth:0}}>{fmtDate(t.submittedAt)}</div>
                    </div>
                    <div className="tbtns" style={{marginTop:0,gap:6}}>
                      <button onClick={e=>{e.stopPropagation();transferToClients(t)}} className="btn quiet sm">👤 Clients</button>
                      <button onClick={e=>{e.stopPropagation();setConfirmPermDelete(t.id)}} className="btn quiet danger sm">🗑️ Delete</button>
                    </div>
                  </div>
                )})}
              </>}

              {tasks.length===0 && <div className="card"><div className="empty">No tasks yet.</div></div>}

              {tasks.length < tasksTotal && (
                <div style={{textAlign:'center',padding:'16px 0'}}>
                  <button
                    onClick={loadMoreTasks}
                    disabled={tasksLoadingMore}
                    className="btn quiet lg"
                  >
                    {tasksLoadingMore ? 'Loading…' : `Load more (${tasks.length} of ${tasksTotal})`}
                  </button>
                </div>
              )}
              </div>{/* end scrollable list */}
            </div>
          )}

          {/* ── TASK DETAIL ── */}
          {view==='tasks' && taskView==='detail' && activeTask && (
            <div className="view" style={{display:'flex',flexDirection:'column',flex:1,minHeight:0,overflow:'hidden'}}>
              <div className="phead">
              <button className="btn quiet sm" onClick={()=>setTaskView('list')}>
                {NavIcons.back}
                Back to Tasks
              </button>
              </div>

              <div className="pbody">

              {/* ── DONE: locked view - only name + 2 actions ── */}
              {activeTask.done && (
                <div className="card" style={{padding:'32px 28px',textAlign:'center' as const}}>
                  <div className="avatar lg" style={{width:64,height:64,borderRadius:18,fontSize:21,margin:'0 auto 16px',background:'color-mix(in srgb, var(--good) 15%, transparent)',border:'2px solid color-mix(in srgb, var(--good) 40%, transparent)',color:'var(--good)'}}>✓</div>
                  <h2 className="vt">{displayName(activeTask.clientName)}</h2>
                  <div className="vsub" style={{marginBottom:10}}>{TASK_LABELS[activeTask.taskType]} · {activeTask.taxYear}</div>
                  <div style={{marginBottom:24}}><span className="chip good">✓ Completed - sensitive data cleared</span></div>
                  <div className="panel" style={{marginBottom:20,textAlign:'left',fontSize:11,color:'var(--ink3)'}}>
                    <div style={{fontWeight:600,color:'var(--brand1)',marginBottom:4}}>📋 What you have:</div>
                    <div>• Name, DOB, Email, WhatsApp, Country</div>
                    <div>• Submission timestamp</div>
                    <div style={{fontWeight:600,color:'var(--crit)',marginTop:6,marginBottom:4}}>🔒 What was wiped:</div>
                    <div>• TFN, Bank details, Address</div>
                    <div>• Passport, Job info, Uploaded files</div>
                  </div>
                  <div style={{display:'flex',gap:10}}>
                    <button className="btn take lg" style={{flex:1,justifyContent:'center'}} onClick={()=>transferToClients(activeTask)}>
                      👤 Move to Clients
                    </button>
                    <button className="btn quiet danger lg" style={{flex:1,justifyContent:'center'}} onClick={()=>setConfirmPermDelete(activeTask.id)}>
                      🗑️ Delete forever
                    </button>
                  </div>
                  <div style={{fontSize:11,color:'var(--ink3)',textAlign:'center',marginTop:12}}>Move creates a client card for tracking. Delete removes everything permanently.</div>
                </div>
              )}

              {/* ── PENDING: full detail view ── */}
              {!activeTask.done && (<>
              {/* WHV Alert Banner - shown when client filled as Working Holiday Visa */}
              {(()=>{
                const isWhv = activeTask.taskType === 'tax-return' && (activeTask.notes||'').includes('Working holiday maker')
                if (!isWhv) return null
                return (
                  <div className="panel" style={{borderLeft:'4px solid var(--warn)',padding:'8px 14px',marginBottom:14,display:'flex',alignItems:'center',gap:8,background:'color-mix(in srgb, var(--warn) 8%, var(--surface))'}}>
                    <span style={{fontSize:14,flexShrink:0}}>⚠️</span>
                    <span style={{fontSize:13,fontWeight:600,color:'var(--warn)'}}>WHV - Verify Tax Residency</span>
                  </div>
                )
              })()}
              {/* Married Alert Banner */}
              {(activeTask.marital||'').toLowerCase() === 'married' && (
                <div className="panel" style={{borderLeft:'4px solid var(--brand2)',padding:'8px 14px',marginBottom:14,display:'flex',alignItems:'center',gap:8,background:'color-mix(in srgb, var(--brand2) 7%, var(--surface))'}}>
                  <span style={{fontSize:14,flexShrink:0}}>💑</span>
                  <span style={{fontSize:13,fontWeight:600,color:'var(--brand2)'}}>Married - Verify Status</span>
                </div>
              )}
              <div className="card" style={{padding:'18px 20px',marginBottom:14,display:'flex',alignItems:'center',gap:14}}>
                <div className="avatar lg" style={{width:50,height:50,borderRadius:14,background:TASK_COLORS[activeTask.taskType],color:'var(--surface)',fontSize:16,fontWeight:700}}>{initials(activeTask.clientName)}</div>
                <div style={{flex:1}}>
                  <h2 className="vt">{displayName(activeTask.clientName)}</h2>
                  {(()=>{
                    const existing = clients.find(c=>c.id===activeTask.clientId)
                    if (!existing || existing.taxReturns.length===0) return null
                    const lastTax = [...existing.taxReturns].sort((a,b)=>b.year.localeCompare(a.year))[0]
                    const lastSuper = existing.superReturns.length>0
                      ? [...existing.superReturns].sort((a,b)=>b.year.localeCompare(a.year))[0]
                      : null
                    return (
                      <div style={{marginTop:4}}>
                        <span className="chip warn">
                          <span>⚠️</span>
                          Returning client - last: {lastTax.year}
                          {lastTax.refundAmount>0 ? ` · ${fmtCur(lastTax.refundAmount)} refund` : ''}
                          {lastSuper ? ` · Super ${lastSuper.year}` : ''}
                        </span>
                      </div>
                    )
                  })()}
                  <div className="rc-sub" style={{gap:8}}>
                    <span>{activeTask.country}</span>
                    <span className="tsev" style={{['--tc' as string]:TASK_COLORS[activeTask.taskType]}}>{TASK_LABELS[activeTask.taskType]}</span>
                    <span>{activeTask.taxYear}</span>
                    <span>· Submitted {fmtDate(activeTask.submittedAt)}</span>
                    {(activeTask.notes||'').includes('🔄 Returning client') && (
                      <span className="cstate">🔄 Returning client</span>
                    )}
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <WhatsAppQuick name={activeTask.clientName} whatsapp={activeTask.whatsapp}/>
                  {activeTask.done
                    ? <span className="chip good">✓ Done</span>
                    : <span className="chip warn">⏳ Pending</span>
                  }
                </div>
              </div>

              {/* 4 sections - adapted per taskType */}
              <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:12,marginBottom:12}}>



                {/* ── Panel 1: Personal details ── */}
                <div className="card">
                  <div className="sechead"><span>Personal details</span></div>
                  {(()=>{
                    const notes = activeTask.notes||''
                    const nameParts = activeTask.clientName.trim().split(' ')
                    const firstName = nameParts.slice(0,-1).join(' ') || activeTask.clientName
                    const lastName  = nameParts.length > 1 ? (nameParts[nameParts.length-1]) : ''
                    const base:[string,string][] = [
                      ['Full name', firstName],
                      ['Last name', lastName],
                      ['Date of birth', fmtDob(activeTask.dob)],
                    ]
                    if (activeTask.taskType==='tfn') {
                      const passport = notes.match(/Passport No: ([^|]+)/)?.[1]?.trim()||'-'
                      const gender   = notes.match(/Gender: ([^|]+)/)?.[1]?.trim()||'-'
                      return [...base,['Country of passport',activeTask.country],['Passport No 🔒',passport],['Gender',gender],['Marital',activeTask.marital]] as [string,string][]
                    }
                    if (activeTask.taskType==='super') {
                      const passport = notes.match(/Passport No: ([^|]+)/)?.[1]?.trim()||'-'
                      return [...base,['Country (passport)',activeTask.country],['Passport No 🔒',passport]] as [string,string][]
                    }
                    if (activeTask.taskType==='abn') {
                      const gender = notes.match(/Gender: ([^|]+)/)?.[1]?.trim()||'-'
                      return [...base,['Country',activeTask.country],['Gender',gender],['Marital',activeTask.marital]] as [string,string][]
                    }
                    return [...base,['Country',activeTask.country],['Marital',activeTask.marital]] as [string,string][]
                  })().map(([l,v])=>(
                    <div key={l} className="frow"><span className="fk">{l}</span><span className="fv">{v||'-'}</span>{v&&v!=='-'&&<CopyBtn text={v}/>}</div>
                  ))}
                </div>

                {/* ── Panel 2: Contact details ── */}
                <div className="card">
                  <div className="sechead"><span>Contact details</span></div>
                  {(()=>{
                    const rows:[string,string][] = [['WhatsApp',activeTask.whatsapp],['AU Phone',activeTask.auPhone],['Email',activeTask.email],['Address',activeTask.address]]
                    if (activeTask.taskType==='super') {
                      const homeAddr = (activeTask.notes||'').match(/Home Country Address: ([^|]+)/)?.[1]?.trim()||''
                      if (homeAddr) rows.push(['Home country address',homeAddr])
                    }
                    return rows
                  })().map(([l,v])=>(
                    <div key={l} className="frow"><span className="fk">{l}</span><span className="fv" style={{direction:'ltr',textAlign:'right'}}>{(l==='WhatsApp'||l==='AU Phone') ? formatPhoneNumber(v)||'-' : (v||'-')}</span>{v&&v!=='-'&&<CopyBtn text={v}/>}</div>
                  ))}
                </div>

                {/* ── Panel 3: Form-specific details ── */}
                <div className="card">
                  {/* Leads carry the same fields, just partly filled: gating this on
                      'tax-return' alone hid the TFN, Medicare and expenses that form 1
                      already collected. */}
                  {(activeTask.taskType==='tax-return' || activeTask.taskType==='lead') && <>
                    <div className="sechead"><span>Tax &amp; employment</span></div>
                    {([['TFN 🔒',activeTask.tfn],['Employer',activeTask.primaryJob],['Tax status',activeTask.taxStatus]] as [string,string][]).map(([l,v])=>(
                      <div key={l} className="frow"><span className="fk">{l}</span><span className={`fv${l.startsWith('TFN')?' mono':''}`} style={{direction:'ltr',textAlign:'right'}}>{l.startsWith('TFN') ? groupDigits(v)||'-' : (v||'-')}</span>{v&&v!=='-'&&<CopyBtn text={v}/>}</div>
                    ))}
                    {(()=>{
                      const medicareVal = (activeTask.notes||'').match(/Medicare: ([^|]+)/)?.[1]?.trim()||''
                      if (!medicareVal) return null
                      return (
                        <div className="frow"><span className="fk">Medicare</span><span className="fv" style={{color:medicareVal==='Yes'?'var(--brand1)':'var(--crit)',fontWeight:600,textAlign:'right'}}>{medicareVal==='Yes'?'Yes ✓':'No'}</span></div>
                      )
                    })()}
                    {(()=>{
                      const expVal = (activeTask.notes||'').match(/Expenses: ([^|]+)/)?.[1]?.trim()||''
                      if (!expVal) return null
                      return (
                        <div className="frow" style={{background: expVal==='Yes'?'color-mix(in srgb, var(--warn) 8%, transparent)':'var(--surface2)',borderTop:'1px solid var(--line)'}}>
                          <span className="fk" style={{fontWeight:700}}>📎 Work expenses</span>
                          <span className="fv" style={{color:expVal==='Yes'?'var(--warn)':'var(--brand1)',fontWeight:600}}>{expVal==='Yes'?'Yes - needs receipts':'No'}</span>
                        </div>
                      )
                    })()}
                  </>}
                  {activeTask.taskType==='super' && <>
                    <div className="sechead"><span>Super details</span></div>
                    {(()=>{
                      const notes = activeTask.notes||''
                      const sfName = notes.match(/Super Fund Name: ([^|]+)/)?.[1]?.trim()
                        || notes.match(/Super Funds: ([^|]+)/)?.[1]?.trim() || '-'
                      const sfMember = notes.match(/Super Member Number: ([^|]+)/)?.[1]?.trim() || '-'
                      const sfDate = notes.match(/Super Opening Date: ([^|]+)/)?.[1]?.trim() || '-'
                      return([
                        ['TFN 🔒',activeTask.tfn],
                        ['Super fund name',sfName],
                        ['Member number',sfMember],
                        ['Account opening date',sfDate],
                      ] as [string,string][])
                    })().map(([l,v])=>(
                      <div key={l} className="frow"><span className="fk">{l}</span><span className={`fv${l.startsWith('TFN')?' mono':''}`} style={{direction:'ltr',textAlign:'right'}}>{l.startsWith('TFN') ? groupDigits(v)||'-' : (v||'-')}</span>{v&&v!=='-'&&<CopyBtn text={v}/>}</div>
                    ))}
                  </>}
                  {activeTask.taskType==='tfn' && <>
                    <div className="sechead"><span>Tax details</span></div>
                    {([['TFN (if existing) 🔒',activeTask.tfn],['How heard',activeTask.howHeard]] as [string,string][]).map(([l,v])=>(
                      <div key={l} className="frow"><span className="fk">{l}</span><span className={`fv${l.startsWith('TFN')?' mono':''}`} style={{direction:'ltr',textAlign:'right'}}>{l.startsWith('TFN') ? groupDigits(v)||'-' : (v||'-')}</span>{v&&v!=='-'&&<CopyBtn text={v}/>}</div>
                    ))}
                  </>}
                  {activeTask.taskType==='abn' && <>
                    <div className="sechead"><span>Business details</span></div>
                    {([['TFN 🔒',activeTask.tfn],['Business activity',activeTask.primaryJob],['How heard',activeTask.howHeard]] as [string,string][]).map(([l,v])=>(
                      <div key={l} className="frow"><span className="fk">{l}</span><span className={`fv${l.startsWith('TFN')?' mono':''}`} style={{direction:'ltr',textAlign:'right'}}>{l.startsWith('TFN') ? groupDigits(v)||'-' : (v||'-')}</span>{v&&v!=='-'&&<CopyBtn text={v}/>}</div>
                    ))}
                  </>}
                </div>
                <div className="card">
                  <div className="sechead"><span>Documents uploaded {(activeTask.fileUrls ?? []).length > 0 ? `(${(activeTask.fileUrls ?? []).length})` : ''}</span></div>
                  {(activeTask.fileUrls ?? []).length === 0 ? (
                    <div className="empty" style={{padding:'14px 0'}}>No files uploaded</div>
                  ) : (activeTask.fileUrls ?? []).map((url, i) => {
                    const rawName = url.split('/').pop() ?? `file-${i+1}`
                    let name = rawName
                    try { name = decodeURIComponent(rawName) } catch { name = rawName }
                    name = name.replace(/^\d+_/, '').replace(/[/\\<>:"'|?*]/g, '_').slice(0, 100)
                    const isPdf = url.toLowerCase().endsWith('.pdf')
                    const proxyUrl = `/api/crm/file?url=${encodeURIComponent(url)}`
                    return (
                      <div key={url} className="frow" style={{justifyContent:'space-between'}}>
                        <span style={{fontSize:12,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'60%'}}>{isPdf ? '📄' : '🖼️'} {name}</span>
                        <div style={{display:'flex',gap:6}}>
                          <button onClick={()=>setPreviewUrl(proxyUrl)} className="btn quiet sm">View</button>
                          <button onClick={async()=>{
                            try {
                              const res = await fetch(proxyUrl)
                              const blob = await res.blob()
                              const a = document.createElement('a')
                              a.href = URL.createObjectURL(blob)
                              a.download = name
                              a.click()
                              // Defer revoke so the download can complete
                              const href = a.href
                              setTimeout(() => URL.revokeObjectURL(href), 5000)
                            } catch { window.open(proxyUrl,'_blank') }
                          }} className="btn take sm">Download ↓</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* The Declaration and Internal notes panels used to sit here.
                  Removed at the owner's request: the declarations are already
                  captured on the submission itself and the notes were unused.
                  Nothing was dropped from the data, only from this view. */}

              </>) /* end !activeTask.done */}
              </div>{/* end scrollable body */}

              {/* Actions — see .pfoot: this row is pinned to the bottom of the
                  column rather than sitting at the end of the scroll, so
                  finishing a task never costs a scroll first. */}
              {!activeTask.done && (
              <div className="pfoot">
                <button className="btn quiet lg" style={{flex:1,justifyContent:'center'}} onClick={()=>downloadTaskPdf(activeTask)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  Download PDF
                </button>
                <button className="btn ghost lg" style={{flex:1,justifyContent:'center'}} onClick={()=>markDone(activeTask.id)}>✓ Mark as done</button>
                <button
                  className="btn quiet danger lg"
                  onClick={()=>setConfirmPermDelete(activeTask.id)}
                  title="Delete this lead - useful if client filled the form incorrectly (e.g. marked as WHV when actually a Resident). You can then send them a new link manually.">
                  🗑️ Delete lead
                </button>
              </div>
              )}
            </div>
          )}

          {/* ── LEADS (mailing list) ── */}
          {view==='leads' && <LeadsTab />}

          {/* ── CLIENTS LIST ── */}

          {view==='clients' && !activeClient && (
            <div className="view" style={{display:'flex',flexDirection:'column',flex:1,minHeight:0,overflow:'hidden'}}>
              <div className="phead">
              <div className="hrow">
                  <h1 className="vt">Clients</h1>
                  <span className="chip">{visibleClients.length}{clients.length!==visibleClients.length?` of ${clients.length}`:''} total</span>
                  {(()=>{
                    const tot = visibleClients.reduce((sum,c)=>{
                      const tr = yearFilter.size===0?c.taxReturns:c.taxReturns.filter(r=>yearFilter.has(r.year))
                      const sr = yearFilter.size===0?c.superReturns:c.superReturns.filter(r=>yearFilter.has(r.year))
                      return sum
                        + tr.filter(r=>r.type==='refund').reduce((s,r)=>s+r.refundAmount,0)
                        - tr.filter(r=>r.type==='owed').reduce((s,r)=>s+r.refundAmount,0)
                        + sr.reduce((s,r)=>s+r.amount,0)
                    },0)
                    return <span className="chip">{fmtCur(tot)} returned</span>
                  })()}
                <div className="hspacer" />
                  {noReturnFilter==='didnt-return' && (
                    <button className="btn quiet sm" onClick={()=>setNoReturnFilter('all')} style={{color:'var(--warn)',borderColor:'color-mix(in srgb, var(--warn) 35%, transparent)'}}>
                      <span>🔁 Didn&apos;t return filter</span>
                      <span style={{fontWeight:700,lineHeight:1}}>×</span>
                    </button>
                  )}
                  {superFilter==='no-super' && (
                    <button className="btn quiet sm" onClick={()=>setSuperFilter('all')} style={{color:'var(--brand1)',borderColor:'color-mix(in srgb, var(--brand1) 35%, transparent)'}}>
                      <span>💼 No Super filter</span>
                      <span style={{fontWeight:700,lineHeight:1}}>×</span>
                    </button>
                  )}
                  <div className="hrow" style={{gap:6}}>
                    <span style={{fontSize:11,color:'var(--ink3)',fontWeight:500}}>✓ Year:</span>
                    <select value={checkinYear} onChange={e=>setCheckinYear(e.target.value)} style={{width:'auto'}}>
                      {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <button
                    className="btn quiet"
                    onClick={()=>{
                      const headers = ['Name','DOB','Country','WhatsApp','Email','Source','Created','Last Tax Year','Total Refunds','Total Super','TFN','ABN','Notes']
                      const rows = visibleClients.map(c=>{
                        const lastTax = c.taxReturns?.length ? [...c.taxReturns].sort((a,b)=>b.year.localeCompare(a.year))[0] : null
                        const totalRefunds = c.taxReturns.filter(r=>r.type==='refund').reduce((s,r)=>s+r.refundAmount,0)
                        const totalSuper = c.superReturns.reduce((s,r)=>s+r.amount,0)
                        return [
                          c.fullName, c.dob, c.country, c.whatsapp, c.email, c.howHeard,
                          c.createdAt?.slice(0,10), lastTax?.year||'',
                          totalRefunds||'', totalSuper||'',
                          c.tfnService?.done?'✓':'', c.abnService?.done?'✓':'',
                          (c.notes||'').replace(/[\r\n]+/g,' ').slice(0,200)
                        ].map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')
                      })
                      const csv = [headers.join(','), ...rows].join('\n')
                      const blob = new Blob(['\ufeff'+csv], {type:'text/csv;charset=utf-8'})
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `whvtax-clients-${new Date().toISOString().slice(0,10)}.csv`
                      a.click()
                      // Defer revoke so the browser has time to start the download
                      // (revoking too quickly can abort the download on some browsers).
                      setTimeout(() => URL.revokeObjectURL(url), 5000)
                    }}
                    title="Download as CSV (opens in Excel)">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    Export CSV
                  </button>
                  <button className="btn take" onClick={()=>setShowAddModal(true)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    Add Client
                  </button>
              </div>

              {/* Filters row. This stays in .phead rather than moving into
                  .pbody with the rest of the content: each DropBtn opens an
                  absolutely-positioned menu, and .pbody is a scroll container
                  (overflow-y:auto), which would clip the menu and scroll it
                  away from its button. Two rows — identity then controls — is
                  also exactly the shape of Will's header. */}
              <div className="hrow" style={{gap:8,marginTop:8}}>
                <div className="search" style={{flex:3,minWidth:200}}>
                  <span className="search-ic">{NavIcons.search}</span>
                  <input placeholder="Search by name, WhatsApp or email…" value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
                <DropBtn id="cl-year" label={yearFilter.size===0?'All tax years':`${yearFilter.size} year${yearFilter.size>1?'s':''}`} active={yearFilter.size>0} onClear={()=>setYearFilter(new Set())}
                  icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                  {TAX_YEARS.slice().reverse().map(y=>{const checked=yearFilter.has(y);const cnt=clients.filter(c=>c.taxReturns.some(r=>r.year===y)||c.superReturns.some(r=>r.year===y)).length;return(
                    <FilterOpt key={y} label={y} count={cnt} checked={checked} onToggle={()=>{const s=new Set(yearFilter);checked?s.delete(y):s.add(y);setYearFilter(s)}}/>
                  )})}
                </DropBtn>
                {<DropBtn id="cl-hh" label="How heard" active={howHeardFilter.size>0} onClear={()=>setHowHeardFilter(new Set())}
                    icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    {/* Grouped by canonical label: eighteen spellings of ChatGPT
                        become one entry. See lib/normalise-labels.ts. */}
                    {groupByCanonical(clients.map(c=>c.howHeard), canonicalSource).map(({label,count})=>{const checked=howHeardFilter.has(label);return(
                      <FilterOpt key={label} label={label} count={count} checked={checked} onToggle={()=>{const s=new Set(howHeardFilter);checked?s.delete(label):s.add(label);setHowHeardFilter(s)}}/>
                    )})}
                    {groupByCanonical(clients.map(c=>c.howHeard), canonicalSource).length===0 && <FilterEmpty/>}
                  </DropBtn>}
                {<DropBtn id="cl-country" label="Country" active={countryFilter.size>0} onClear={()=>setCountryFilter(new Set())}
                    icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    {groupByCanonical(clients.map(c=>c.country), canonicalCountry).map(({label,count})=>{const checked=countryFilter.has(label);return(
                      <FilterOpt key={label} label={label} count={count} checked={checked} onToggle={()=>{const s=new Set(countryFilter);checked?s.delete(label):s.add(label);setCountryFilter(s)}}/>
                    )})}
                    {groupByCanonical(clients.map(c=>c.country), canonicalCountry).length===0 && <FilterEmpty/>}
                  </DropBtn>}

                {(howHeardFilter.size>0||countryFilter.size>0||yearFilter.size>0||search||statusFilter.size>0) && (
                  <button className="btn quiet danger" onClick={()=>{setHowHeardFilter(new Set());setCountryFilter(new Set());setYearFilter(new Set());setSearch('');setStatusFilter(new Set())}}>
                    ✕ Clear
                  </button>
                )}
              </div>
              </div>{/* end fixed header */}
              <div className="pbody">
              {/* ── Refund summary bar (reactive to all filters) ── */}
              {visibleClients.length>0 && (()=>{
                const totalTaxRefund = visibleClients.reduce((sum,c)=>{
                  const filtered = yearFilter.size===0
                    ? c.taxReturns
                    : c.taxReturns.filter(r=>yearFilter.has(r.year))
                  return sum + filtered.filter(r=>r.type==='refund').reduce((s,r)=>s+r.refundAmount,0)
                    - filtered.filter(r=>r.type==='owed').reduce((s,r)=>s+r.refundAmount,0)
                },0)
                const totalSuper = visibleClients.reduce((sum,c)=>{
                  const filtered = yearFilter.size===0
                    ? c.superReturns
                    : c.superReturns.filter(r=>yearFilter.has(r.year))
                  return sum + filtered.reduce((s,r)=>s+r.amount,0)
                },0)
                const clientsWithRefund = visibleClients.filter(c=>{
                  const f = yearFilter.size===0 ? c.taxReturns : c.taxReturns.filter(r=>yearFilter.has(r.year))
                  return f.length>0
                }).length
                const clientsWithSuper = visibleClients.filter(c=>{
                  const f = yearFilter.size===0 ? c.superReturns : c.superReturns.filter(r=>yearFilter.has(r.year))
                  return f.length>0
                }).length
                if (totalTaxRefund===0 && totalSuper===0) return null
                const yearLabel = yearFilter.size===0 ? '' : ` · ${Array.from(yearFilter).sort().join(', ')}`
                return (
                  <div className="kpis" style={{gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:10}}>
                    {totalTaxRefund!==0 && (
                      <MoneyTile label={`💰 Tax Refunds${yearLabel}`} value={fmtCur(totalTaxRefund)} sub="across" count={clientsWithRefund}/>
                    )}
                    {totalSuper>0 && (
                      <MoneyTile label={`🏦 Super Refunded${yearLabel}`} value={fmtCur(totalSuper)} sub="across" count={clientsWithSuper}/>
                    )}
                    {totalTaxRefund!==0 && totalSuper>0 && (
                      <MoneyTile label={`✨ Combined${yearLabel}`} value={fmtCur(totalTaxRefund+totalSuper)} sub="showing" count={visibleClients.length}/>
                    )}
                  </div>
                )
              })()}

              {/* Table */}
              {visibleClients.length===0 ? (
                <div className="card"><div className="empty">No clients yet.</div></div>
              ) : (
                <div className="card">
                  <div className="tblwrap">
                  <table className="tbl">
                    <thead>
                      <tr>
                        {['Name','WhatsApp','Email','Country','Source','Last refund'].map(h=>(
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleClients.map(cl=>{
                        const [bg,fg]=avColor(cl.fullName)
                        return (
                          <tr key={cl.id} className="clickable" onClick={()=>{setActiveClient(cl);setClientNotes(cl.notes||'');setView('clients')}}>
                            <td>
                              <div style={{display:'flex',alignItems:'center',gap:9}}>
                                <div className="avatar" style={{width:32,height:32,borderRadius:9,background:bg,color:fg,fontSize:11,fontWeight:700}}>{initials(cl.fullName)}</div>
                                <div style={{fontWeight:500,whiteSpace:'nowrap' as const}}>{displayName(cl.fullName)}</div>
                              </div>
                            </td>
                            <td className="num" style={{direction:'ltr',whiteSpace:'nowrap' as const}}>
                              <div style={{display:'flex',alignItems:'center',gap:6,whiteSpace:'nowrap' as const}}>
                                {cl.whatsapp && (
                                  <a href={`https://wa.me/${cl.whatsapp.replace(/[^0-9+]/g,'')}`} target="_blank" rel="noopener noreferrer"
                                    onClick={e=>e.stopPropagation()}
                                    // #25D366 is WhatsApp's own brand green and stays
                                    // literal: this link opens wa.me.
                                    style={{flexShrink:0,color:'#25D366',display:'flex',alignItems:'center'}} title="Open WhatsApp">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.546 4.122 1.588 5.905L.057 23.813a.5.5 0 00.63.63l5.908-1.531A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.555 9.555 0 01-4.87-1.336l-.35-.208-3.624.94.96-3.524-.228-.363A9.6 9.6 0 0112 2.4c5.295 0 9.6 4.305 9.6 9.6S17.295 21.6 12 21.6z"/></svg>
                                  </a>
                                )}
                                <span style={{whiteSpace:'nowrap' as const}}>{formatPhoneNumber(cl.whatsapp)||"-"}</span>
                              </div>
                            </td>
                            <td className="muted">{cl.email||'-'}</td>
                            <td style={{whiteSpace:'nowrap' as const}}>{cl.country||'-'}</td>
                            <td className="muted">
                              {(()=>{
                                const src = (cl.howHeard||'').trim()
                                if (!src) return <span style={{color:'var(--ink3)'}}>-</span>
                                const lower = src.toLowerCase()
                                const isSocial = /tiktok|instagram|facebook|google|youtube|twitter|x\.com|linkedin|snapchat|reddit/i.test(lower)
                                const isReferral = !isSocial && src.length > 1
                                return (
                                  <div style={{display:'flex',alignItems:'center',gap:5}}>
                                    {isReferral && <span style={{fontSize:10}} title="Referral - someone referred this client">👤</span>}
                                    <span style={{color:isReferral?'var(--brand2)':'var(--ink3)',fontWeight:isReferral?600:400}}>{src}</span>
                                  </div>
                                )
                              })()}
                            </td>
                            <td className="num">
                              {(()=>{
                                const lastTax = cl.taxReturns?.length
                                  ? [...cl.taxReturns].sort((a,b)=>b.year.localeCompare(a.year))[0]
                                  : null
                                if (!lastTax) return <span style={{color:'var(--ink3)'}}>-</span>
                                return (
                                  <div>
                                    <div style={{fontWeight:600,color:'var(--brand1)',whiteSpace:'nowrap' as const}}>{lastTax.year}</div>
                                    <div style={{fontSize:11,color:'var(--ink3)'}}>{fmtCur(lastTax.refundAmount)}</div>
                                  </div>
                                )
                              })()}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}

              {clients.length < clientsTotal && (
                <div style={{textAlign:'center',padding:'16px 0'}}>
                  <button
                    onClick={loadMoreClients}
                    disabled={clientsLoadingMore}
                    className="btn quiet lg"
                  >
                    {clientsLoadingMore ? 'Loading…' : `Load more (${clients.length} of ${clientsTotal})`}
                  </button>
                </div>
              )}
              </div>{/* end scroll */}
            </div>
          )}

          {/* ── ARCHIVE ── */}
          {view==='archive' && (
            <div className="view" style={{display:'flex',flexDirection:'column',flex:1,minHeight:0,overflow:'hidden'}}>
              <div className="phead">
              {/* Header */}
              <div className="hrow">
                  <h1 className="vt">📦 Archive</h1>
                  <span className="chip">
                    {visibleArchived.length}{archivedClients.length!==visibleArchived.length?` of ${archivedClients.length}`:''} clients
                  </span>
                  {(()=>{
                    const tot = visibleArchived.reduce((sum,c)=>{
                      return sum
                        + c.taxReturns.filter(r=>r.type==='refund').reduce((s,r)=>s+r.refundAmount,0)
                        - c.taxReturns.filter(r=>r.type==='owed').reduce((s,r)=>s+r.refundAmount,0)
                        + c.superReturns.reduce((s,r)=>s+r.amount,0)
                    },0)
                    return <span className="chip">{fmtCur(tot)} historical</span>
                  })()}
              </div>
              {/* Filters row — kept in .phead for the same reason as Clients:
                  the DropBtn menus are absolutely positioned and .pbody clips. */}
              <div className="hrow" style={{gap:8,marginTop:8}}>
                <div className="search" style={{flex:3,minWidth:200}}>
                  <span className="search-ic">{NavIcons.search}</span>
                  <input placeholder="Search by name, WhatsApp or email…" value={archiveSearch} onChange={e=>setArchiveSearch(e.target.value)}/>
                </div>
                <DropBtn id="ar-year" label={archiveYearFilter.size===0?'All tax years':`${archiveYearFilter.size} year${archiveYearFilter.size>1?'s':''}`} active={archiveYearFilter.size>0} onClear={()=>setArchiveYearFilter(new Set())}
                  icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                  {TAX_YEARS.slice().reverse().map(y=>{const checked=archiveYearFilter.has(y);const cnt=archivedClients.filter(c=>c.taxReturns?.some(r=>r.year===y)||c.superReturns?.some(r=>r.year===y)).length;return(
                    <FilterOpt key={y} label={y} count={cnt} checked={checked} onToggle={()=>{const s=new Set(archiveYearFilter);checked?s.delete(y):s.add(y);setArchiveYearFilter(s)}}/>
                  )})}
                </DropBtn>
                {<DropBtn id="ar-hh" label="How heard" active={archiveHowHeardFilter.size>0} onClear={()=>setArchiveHowHeardFilter(new Set())}
                    icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    {Object.keys(archiveHowHeardStats).sort().map(src=>{const checked=archiveHowHeardFilter.has(src);return(
                      <FilterOpt key={src} label={src} count={archiveHowHeardStats[src]} checked={checked} onToggle={()=>{const s=new Set(archiveHowHeardFilter);checked?s.delete(src):s.add(src);setArchiveHowHeardFilter(s)}}/>
                    )})}
                    {Object.keys(archiveHowHeardStats).length===0 && <FilterEmpty/>}
                  </DropBtn>}
                {<DropBtn id="ar-country" label="Country" active={archiveCountryFilter.size>0} onClear={()=>setArchiveCountryFilter(new Set())}
                    icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    {Array.from(new Set(archivedClients.map(c=>c.country||'').filter(Boolean))).sort().map(ctry=>{const checked=archiveCountryFilter.has(ctry);const cnt=archivedClients.filter(cl=>cl.country===ctry).length;return(
                      <FilterOpt key={ctry} label={ctry} count={cnt} checked={checked} onToggle={()=>{const s=new Set(archiveCountryFilter);checked?s.delete(ctry):s.add(ctry);setArchiveCountryFilter(s)}}/>
                    )})}
                    {Array.from(new Set(archivedClients.map(c=>c.country||'').filter(Boolean))).length===0 && <FilterEmpty/>}
                  </DropBtn>}
                {(archiveHowHeardFilter.size>0||archiveCountryFilter.size>0||archiveYearFilter.size>0||archiveSearch) && (
                  <button className="btn quiet danger" onClick={()=>{setArchiveHowHeardFilter(new Set());setArchiveCountryFilter(new Set());setArchiveYearFilter(new Set());setArchiveSearch('')}}>
                    ✕ Clear
                  </button>
                )}
              </div>
              </div>{/* end fixed header */}
              <div className="pbody">
              {/* Table */}
              {visibleArchived.length===0?(
                <div className="card"><div className="empty">{archivedClients.length===0?'No archived clients yet.':'No clients match the current filters.'}</div></div>
              ):(
                <div className="card">
                  <div className="tblwrap">
                  <table className="tbl">
                    <thead><tr>
                      {['Name','WhatsApp','Email','Country','Last refund',''].map(h=>(
                        <th key={h}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {visibleArchived.map(cl=>{
                        const [bg,fg]=avColor(cl.fullName)
                        const lastTax = cl.taxReturns?.length ? [...cl.taxReturns].sort((a,b)=>b.year.localeCompare(a.year))[0] : null
                        return(
                          <tr key={cl.id}>
                            <td>
                              <div style={{display:'flex',alignItems:'center',gap:9}}>
                                <div className="avatar" style={{width:32,height:32,borderRadius:9,background:bg,color:fg,fontSize:11,fontWeight:700}}>{initials(cl.fullName)}</div>
                                <div style={{fontWeight:500,color:'var(--ink3)',whiteSpace:'nowrap' as const}}>{displayName(cl.fullName)}</div>
                              </div>
                            </td>
                            <td className="num" style={{direction:'ltr',whiteSpace:'nowrap'}}>
                              {cl.whatsapp
                                ? <a href={`https://wa.me/${cl.whatsapp.replace(/[^0-9+]/g,'')}`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{color:'var(--brand1)',textDecoration:'none',whiteSpace:'nowrap'}}>{formatPhoneNumber(cl.whatsapp)}</a>
                                : '-'}
                            </td>
                            <td className="muted">{cl.email||'-'}</td>
                            <td className="muted" style={{whiteSpace:'nowrap' as const}}>{cl.country||'-'}</td>
                            <td className="num">
                              {lastTax
                                ? <div><div style={{fontWeight:600,color:'var(--brand1)'}}>{lastTax.year}</div><div style={{fontSize:11,color:'var(--ink3)'}}>{fmtCur(lastTax.refundAmount)}</div></div>
                                : <span style={{color:'var(--ink3)'}}>-</span>}
                            </td>
                            <td>
                              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                                <button className="btn quiet sm" onClick={()=>unarchiveClient(cl.id)}>↩ Restore</button>
                                <button className="btn quiet danger sm" title="Delete permanently" onClick={()=>setConfirmDeleteClient(cl.id)}>
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}
              </div>{/* end scroll */}
            </div>
          )}

          {/* ── CLIENT DETAIL ── */}
          {view==='clients' && activeClient && (
            <div className="view" style={{display:'flex',flexDirection:'column',flex:1,minHeight:0,overflow:'hidden'}}>
              <div className="phead">
              <button className="btn quiet sm" onClick={()=>setActiveClient(null)}>
                {NavIcons.back}
                Back to Clients
              </button>
              </div>

              <div className="pbody">

              {/* Profile */}
              <div className="card" style={{padding:'20px 22px',marginBottom:14}}>
                <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16}}>
                  <div className="avatar lg" style={{width:56,height:56,borderRadius:16,background:'var(--brand1)',color:'var(--surface)',fontSize:17,fontWeight:700}}>{initials(activeClient.fullName)}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap' as const}}>
                      <h2 className="vt">{displayName(activeClient.fullName)}</h2>
                    </div>
                    <div className="vsub" style={{marginTop:4,marginBottom:0}}>{activeClient.country} · Client since {fmtDate(activeClient.createdAt)}</div>
                  </div>
                  <WhatsAppQuick name={activeClient.fullName} whatsapp={activeClient.whatsapp}/>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',columnGap:24,rowGap:0}}>
                  {[['Date of birth',fmtDob(activeClient.dob)],['WhatsApp',activeClient.whatsapp],['Email',activeClient.email],['Country',activeClient.country],['How they heard',activeClient.howHeard]].map(([l,v])=>(
                    <div key={l} className="frow" style={{padding:'8px 0'}}>
                      <span className="fk">{l}</span>
                      <span className="fv">{l==='WhatsApp' ? formatPhoneNumber(v)||'-' : (v||'-')}</span>
                      {v && v!=='-' && <CopyBtn text={v}/>}
                    </div>
                  ))}
                  {/* Referred by - optional partner assignment */}
                  <div className="frow" style={{padding:'8px 0'}}>
                    <span className="fk">🔗 Referred by</span>
                    <select
                      value={activeClient.referred_by ?? ''}
                      onChange={async e => {
                        const val = e.target.value || null
                        setActiveClient(prev => prev ? {...prev, referred_by: val} : prev)
                        await fetch(`/api/crm/clients/${activeClient.id}/referral`, {
                          method: 'PATCH',
                          headers: {'Content-Type': 'application/json'},
                          body: JSON.stringify({ partnerId: val })
                        })
                      }}
                      style={{flex:1,padding:'5px 8px',fontSize:12,cursor:'pointer'}}
                    >
                      <option value="">- None -</option>
                      {referralPartners.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Stats Summary */}
              {(()=>{
                const totalTaxRefunds = activeClient.taxReturns.filter((r:TaxReturn)=>r.type==='refund').reduce((s:number,r:TaxReturn)=>s+r.refundAmount,0)
                const totalSuperRefunds = activeClient.superReturns.reduce((s:number,r:SuperReturn)=>s+r.amount,0)
                const totalReturns = activeClient.taxReturns.length
                const totalSuper = activeClient.superReturns.length
                const tfnDone = activeClient.tfnService?.done
                const abnDone = activeClient.abnService?.done
                if (totalReturns===0 && totalSuper===0 && !tfnDone && !abnDone) return null
                return (
                  <div className="kpis" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
                    <div className="kpi">
                      <div className="kl">💵 Total Refunds</div>
                      <div className="kv" style={{color:'var(--good)'}}>{fmtCur(totalTaxRefunds)}</div>
                      <div className="kd">{totalReturns} return{totalReturns!==1?'s':''}</div>
                    </div>
                    <div className="kpi">
                      <div className="kl">💰 Super Total</div>
                      <div className="kv" style={{color:'var(--brand1)'}}>{fmtCur(totalSuperRefunds)}</div>
                      <div className="kd">{totalSuper} withdrawal{totalSuper!==1?'s':''}</div>
                    </div>
                    <div className="kpi">
                      <div className="kl">🆔 TFN</div>
                      <div className="kv" style={{color:tfnDone?'var(--good)':'var(--ink3)'}}>{tfnDone?'✓ Done':'-'}</div>
                    </div>
                    <div className="kpi">
                      <div className="kl">🏢 ABN</div>
                      <div className="kv" style={{color:abnDone?'var(--good)':'var(--ink3)'}}>{abnDone?'✓ Done':'-'}</div>
                    </div>
                  </div>
                )
              })()}

              {/* 1+2. Unified Year Timeline */}
              <div className="card" style={{marginBottom:12}}>
                <div className="sechead">
                  <span>📅 History by Year</span>
                  <div style={{display:'flex',gap:6}}>
                    <button className="btn take sm" onClick={()=>setShowAddTax(v=>!v)}>+ Tax Return</button>
                    <button className="btn take sm" onClick={()=>setShowAddSuper(v=>!v)}>+ Super</button>
                  </div>
                </div>
                <div style={{padding:'12px 14px'}}>
                  {showAddTax && (
                    <div className="panel" style={{marginBottom:10,display:'flex',gap:8,alignItems:'flex-end',flexWrap:'wrap' as const}}>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:100}}>
                        <label className="mlabel" style={{display:'block',margin:'0 0 4px'}}>Tax year</label>
                        <select style={{padding:'7px 10px',cursor:'pointer'}} value={newTaxYear} onChange={e=>setNewTaxYear(e.target.value)}>
                          <option value="">Select year…</option>
                          {TAX_YEARS.slice().reverse().map(y=><option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:4,minWidth:130}}>
                        <label className="mlabel" style={{display:'block',margin:'0 0 4px'}}>Type</label>
                        <div style={{display:'flex',gap:4}}>
                          <button onClick={()=>setNewTaxType('refund')} className={`btn sm ${newTaxType==='refund'?'take':'quiet'}`} style={{flex:1,justifyContent:'center'}}>Refund</button>
                          <button onClick={()=>setNewTaxType('owed')} className={`btn sm ${newTaxType==='owed'?'danger':'quiet'}`} style={{flex:1,justifyContent:'center'}}>Tax owed</button>
                        </div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:110}}>
                        <label className="mlabel" style={{display:'block',margin:'0 0 4px'}}>Amount (AUD)</label>
                        <input style={{padding:'7px 10px'}} type="number" placeholder="e.g. 2500" value={newTaxAmt} onChange={e=>setNewTaxAmt(e.target.value)}/>
                      </div>
                      <button className="btn take sm" onClick={addTaxReturn}>Save</button>
                      <button className="btn quiet sm" onClick={()=>setShowAddTax(false)}>✕</button>
                    </div>
                  )}
                  {showAddSuper && (
                    <div className="panel" style={{marginBottom:10,display:'flex',gap:8,alignItems:'flex-end',flexWrap:'wrap' as const}}>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:100}}>
                        <label className="mlabel" style={{display:'block',margin:'0 0 4px'}}>Tax year</label>
                        <select style={{padding:'7px 10px',cursor:'pointer'}} value={newSuperYear} onChange={e=>setNewSuperYear(e.target.value)}>
                          <option value="">Select year…</option>
                          {TAX_YEARS.slice().reverse().map(y=><option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:110}}>
                        <label className="mlabel" style={{display:'block',margin:'0 0 4px'}}>Amount received (AUD)</label>
                        <input style={{padding:'7px 10px'}} type="number" placeholder="e.g. 4200" value={newSuperAmt} onChange={e=>setNewSuperAmt(e.target.value)}/>
                      </div>
                      <button className="btn take sm" onClick={addSuperReturn}>Save</button>
                      <button className="btn quiet sm" onClick={()=>setShowAddSuper(false)}>✕</button>
                    </div>
                  )}
                  {(()=>{
                    const allYears = Array.from(new Set([
                      ...activeClient.taxReturns.map((r:TaxReturn)=>r.year),
                      ...activeClient.superReturns.map((r:SuperReturn)=>r.year),
                      ...TAX_YEARS,
                    ])).sort((a:string,b:string)=>b.localeCompare(a))
                    const relevantYears = allYears.filter((y:string)=>{
                      // Only show years that have at least one non-zero entry. A year with
                      // only $0 super or $0 tax is effectively empty and clutters the view.
                      const tax = activeClient.taxReturns.find((r:TaxReturn)=>r.year===y)
                      const sup = activeClient.superReturns.find((r:SuperReturn)=>r.year===y)
                      const hasTax = !!tax && tax.refundAmount > 0
                      const hasSuper = !!sup && sup.amount > 0
                      return hasTax || hasSuper
                    })
                    if (relevantYears.length===0) return <div className="empty" style={{padding:'16px 0'}}>No history yet.</div>
                    return relevantYears.map((year:string)=>{
                      const tax = activeClient.taxReturns.find((r:TaxReturn)=>r.year===year)
                      const sup = activeClient.superReturns.find((r:SuperReturn)=>r.year===year)
                      const hasAny = tax || sup
                      return (
                        <div key={year} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'10px 0',borderBottom:'1px solid var(--line)'}}>
                          <div style={{minWidth:64,paddingTop:2}}>
                            <div style={{fontSize:12,fontWeight:700,color:hasAny?'var(--ink)':'var(--ink3)'}}>{year}</div>
                          </div>
                          <div style={{flex:1,display:'flex',flexWrap:'wrap' as const,gap:6}}>
                            {tax ? (
                              <div style={{display:'flex',alignItems:'center',gap:6,borderRadius:8,padding:'4px 10px',background:tax.type==='owed'?'color-mix(in srgb, var(--crit) 8%, transparent)':'color-mix(in srgb, var(--brand1) 8%, transparent)',border:`1px solid ${tax.type==='owed'?'color-mix(in srgb, var(--crit) 35%, transparent)':'color-mix(in srgb, var(--brand1) 30%, transparent)'}`}}>
                                <span style={{fontSize:11,fontWeight:700,color:tax.type==='owed'?'var(--crit)':'var(--brand1)'}}>💰 Tax {tax.type==='owed'?'owed':'refund'}</span>
                                <span style={{fontSize:12,fontWeight:600,color:tax.type==='owed'?'var(--crit)':'var(--ink)'}}>{tax.type==='owed'?'-':''}{fmtCur(tax.refundAmount)}</span>
                                <button style={{background:'none',border:'none',color:'var(--crit)',cursor:'pointer',fontSize:14,padding:'0',lineHeight:1}} onClick={()=>removeTaxReturn(year)}>×</button>
                              </div>
                            ) : (
                              <div style={{display:'flex',alignItems:'center',gap:4,background:'var(--surface2)',border:'1px dashed var(--line2)',borderRadius:8,padding:'4px 10px'}}>
                                <span style={{fontSize:11,color:'var(--ink3)'}}>💰 No tax return</span>
                              </div>
                            )}
                            {sup && (
                              <div style={{display:'flex',alignItems:'center',gap:6,background:'var(--surface2)',border:'1px solid var(--line2)',borderRadius:8,padding:'4px 10px'}}>
                                <span style={{fontSize:11,fontWeight:700,color:'var(--brand1)'}}>🏦 Super</span>
                                <span style={{fontSize:12,fontWeight:600,color:'var(--ink)'}}>{fmtCur(sup.amount)}</span>
                                <button style={{background:'none',border:'none',color:'var(--crit)',cursor:'pointer',fontSize:14,padding:'0',lineHeight:1}} onClick={()=>removeSuperReturn(year)}>×</button>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })
                  })()}
                  {(activeClient.taxReturns.length>0||activeClient.superReturns.length>0) && (
                    <div style={{display:'flex',gap:12,marginTop:10,paddingTop:8,borderTop:'1px solid var(--line2)'}}>
                      {activeClient.taxReturns.length>0 && (
                        <div className="kpi" style={{flex:1,textAlign:'center' as const}}>
                          <div className="kl">Total tax refunds</div>
                          <div className="kv" style={{color:'var(--brand1)'}}>{fmtCur(activeClient.taxReturns.reduce((s:number,r:TaxReturn)=>s+(r.type==='owed'?-r.refundAmount:r.refundAmount),0))}</div>
                        </div>
                      )}
                      {activeClient.superReturns.length>0 && (
                        <div className="kpi" style={{flex:1,textAlign:'center' as const}}>
                          <div className="kl">Total super refunded</div>
                          <div className="kv" style={{color:'var(--brand1)'}}>{fmtCur(activeClient.superReturns.reduce((s:number,r:SuperReturn)=>s+r.amount,0))}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Move to archive */}
              <div className="panel">
                <div style={{display:'flex',alignItems:'flex-start',gap:14}}>
                  <div className="avatar" style={{width:36,height:36,borderRadius:10,background:'var(--surface)',border:'1px solid var(--line2)',fontSize:17}}>📦</div>
                  <div style={{flex:1}}>
                    <h3>Client left Australia?</h3>
                    <div className="psub">Move them to Archive when they have completed all services (Tax Returns, Super Refund). You can always restore them later.</div>
                    <button className="btn take" onClick={()=>setConfirmArchive(activeClient.id)}>
                      📦 Move to Archive
                    </button>
                  </div>
                </div>
              </div>
              </div>{/* end scroll */}
            </div>
          )}

        </main>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)setShowAddModal(false)}}>
          <div className="modal">
            <div className="mh"><b>Add new client task</b></div>
            <div className="msub">Creates a new task in the Tasks tab</div>
            <form onSubmit={addClient}>
              {[['Full name *','text','e.g. John Smith','fullName'],['WhatsApp','text','+61412345678','whatsapp'],['Email','email','john@email.com','email'],['Country','text','e.g. Australia','country'],['Date of birth','date','','dob']].map(([l,t,p,k])=>(
                <div key={k} style={{marginBottom:10}}>
                  <label className="mlabel" style={{display:'block',margin:'0 0 4px'}}>{l}</label>
                  <input type={t} placeholder={p} value={(newClient as Record<string,string>)[k]} onChange={e=>setNewClient({...newClient,[k]:e.target.value})} required={k==='fullName'}/>
                </div>
              ))}
              <div style={{marginBottom:10}}>
                <label className="mlabel" style={{display:'block',margin:'0 0 4px'}}>Tax year</label>
                <select value={newClient.taxYear} onChange={e=>setNewClient({...newClient,taxYear:e.target.value})}>
                  {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="mfoot">
                <button type="button" className="btn quiet lg" onClick={()=>setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn take lg">Add client</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* ── Complete task confirmation modal ──────────────────────────── */}


      {captureRefund && (
        <div className="overlay" onClick={e=>{if(e.target===e.currentTarget){setCaptureRefund(null)}}}>
          <div className="modal">
            <div style={{fontSize:21,marginBottom:8,textAlign:'center'}}>💰</div>
            <div className="mh"><b>Record refund before archiving</b></div>
            <div className="msub" style={{textAlign:'center'}}>
              Add the amounts to this client&apos;s history.<br/>You can skip fields if not applicable.
            </div>
            {(captureRefund.taskType==='tax-return' || captureRefund.taskType==='super' || true) && (
              <div style={{marginBottom:14}}>
                <div className="mlabel" style={{margin:'0 0 8px'}}>
                  💰 Tax Return {captureRefund.taxYear && `(${captureRefund.taxYear})`}
                </div>
                <div style={{display:'flex',gap:8,marginBottom:6}}>
                  <button onClick={()=>setCaptureRefundType('refund')} className={`btn ${captureRefundType==='refund'?'take':'quiet'}`} style={{flex:1,justifyContent:'center'}}>Refund</button>
                  <button onClick={()=>setCaptureRefundType('owed')} className={`btn ${captureRefundType==='owed'?'danger':'quiet'}`} style={{flex:1,justifyContent:'center'}}>Tax owed</button>
                </div>
                <input
                  type="number" placeholder="Amount in AUD (leave blank if none)"
                  value={captureRefundAmt} onChange={e=>setCaptureRefundAmt(e.target.value)}
                />
              </div>
            )}
            <div style={{marginBottom:20}}>
              <div className="mlabel" style={{margin:'0 0 8px'}}>🏦 Super refund (if applicable)</div>
              <input
                type="number" placeholder="Super amount in AUD (leave blank if none)"
                value={captureSuperAmt} onChange={e=>setCaptureSuperAmt(e.target.value)}
              />
            </div>
            <div style={{fontSize:11,color:'var(--ink3)',textAlign:'center',marginBottom:16}}>
              After saving, all sensitive data (TFN, bank, address) will be deleted.
            </div>
            <div className="mfoot">
              <button className="btn quiet lg" onClick={()=>setCaptureRefund(null)}>Cancel</button>
              <button className="btn take lg"
                onClick={()=>deleteTask(captureRefund.taskId,{
                  amount: parseFloat(captureRefundAmt)||0,
                  type: captureRefundType,
                  superAmount: parseFloat(captureSuperAmt)||0,
                  year: captureRefund.taxYear,
                  clientId: captureRefund.clientId,
                })}>
                ✓ Save &amp; archive
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmDelete && (
        <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)setConfirmDelete(null)}}>
          <div className="modal" style={{maxWidth:360,textAlign:'center'}}>
            <div style={{fontSize:21,marginBottom:10}}>🗑️</div>
            <div className="mh"><b>Delete &amp; archive?</b></div>
            <div className="msub">All sensitive data (TFN, bank, address, documents) will be deleted.<br/>The client will be moved to the Clients tab with basic info only.</div>
            <div className="mfoot">
              <button className="btn quiet lg" onClick={()=>setConfirmDelete(null)}>Cancel</button>
              <button className="btn danger lg" onClick={()=>deleteTask(confirmDelete)}>Yes, delete &amp; archive</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm transfer to clients */}


      {/* Confirm permanent delete */}
      {confirmPermDelete && (
        <div className="overlay" onClick={e=>{if(e.target===e.currentTarget){setConfirmPermDelete(null);setPermDeleteText('')}}}>
          <div className="modal" style={{maxWidth:360,textAlign:'center'}}>
            <div style={{fontSize:21,marginBottom:10}}>⚠️</div>
            <div className="mh"><b>Delete permanently?</b></div>
            <div className="msub">
              All data will be deleted with <strong>no client card created</strong>. This cannot be undone.
            </div>
            <div style={{fontSize:12,color:'var(--ink3)',marginBottom:6,textAlign:'left'}}>Type <strong>DELETE</strong> to confirm:</div>
            <input
              autoFocus
              value={permDeleteText}
              onChange={e=>setPermDeleteText(e.target.value)}
              placeholder="DELETE"
              style={{marginBottom:18}}
            />
            <div className="mfoot">
              <button className="btn quiet lg" onClick={()=>{setConfirmPermDelete(null);setPermDeleteText('')}}>Cancel</button>
              <button
                className="btn danger lg"
                style={{cursor: permDeleteText.trim().toUpperCase()==='DELETE'?'pointer':'not-allowed'}}
                disabled={permDeleteText.trim().toUpperCase()!=='DELETE'}
                onClick={()=>{deleteTaskPermanently(confirmPermDelete);setPermDeleteText('')}}>Yes, delete permanently</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm archive client */}
      {confirmArchive && (
        <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)setConfirmArchive(null)}}>
          <div className="modal" style={{maxWidth:360,textAlign:'center'}}>
            <div style={{fontSize:21,marginBottom:10}}>📦</div>
            <div className="mh"><b>Client removed from ATO portal?</b></div>
            <div className="msub">The client will move to Archive. You can restore them anytime.</div>
            <div className="mfoot">
              <button className="btn quiet lg" onClick={()=>setConfirmArchive(null)}>Cancel</button>
              <button className="btn take lg" onClick={()=>archiveClient(confirmArchive)}>Yes, archive</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete client */}
      {confirmDeleteClient && (
        <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)setConfirmDeleteClient(null)}}>
          <div className="modal" style={{maxWidth:340,textAlign:'center'}}>
            <div style={{fontSize:21,marginBottom:10}}>🗑️</div>
            <div className="mh"><b>Delete client?</b></div>
            <div className="msub">This permanently removes the client and all their history.</div>
            <div className="mfoot">
              <button className="btn quiet lg" onClick={()=>setConfirmDeleteClient(null)}>Cancel</button>
              <button className="btn danger lg" onClick={()=>deleteClient(confirmDeleteClient)}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── File preview modal ── */}
      {previewUrl && (
        <div className="overlay" onClick={()=>setPreviewUrl(null)} style={{padding:24}}>
          <div className="modal wide" onClick={e=>e.stopPropagation()} style={{padding:0,width:'50vw',maxHeight:'70vh',display:'flex',flexDirection:'column',overflow:'hidden'}}>
            <div className="sechead">
              <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'80%',textTransform:'none',fontSize:12,letterSpacing:0,color:'var(--ink)'}}>{previewUrl.split('/').pop()?.replace(/^\d+_/,'') ?? 'File'}</span>
              <div style={{display:'flex',gap:8,flexShrink:0}}>
                <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="btn quiet sm" style={{textDecoration:'none'}}>Open ↗</a>
                <button onClick={()=>setPreviewUrl(null)} className="btn ghost sm">✕</button>
              </div>
            </div>
            <div style={{flex:1,overflow:'auto',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)',minHeight:200}}>
              {(()=>{
                // Detect file type from the original Supabase URL (before the proxy wrapper)
                const origUrl = previewUrl.startsWith('/api/crm/file?url=')
                  ? (() => { try { return decodeURIComponent(previewUrl.slice('/api/crm/file?url='.length)) } catch { return previewUrl } })()
                  : previewUrl
                const isPdf = origUrl.toLowerCase().includes('.pdf')

                if (previewLoading) {
                  return <div className="empty">Loading preview…</div>
                }
                if (previewError || !previewBlobUrl) {
                  return (
                    <div className="empty">
                      <div style={{fontSize:21,marginBottom:12}}>⚠️</div>
                      <div className="eh">Couldn&apos;t load this file.</div>
                      <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={{color:'var(--brand1)',fontSize:13,fontWeight:600}}>Open in new tab ↗</a>
                    </div>
                  )
                }
                // PDFs render in an iframe; everything else is an image. HEIC/HEIF
                // is transcoded to JPEG by the /api/crm/file route, so the blob is
                // always a browser-renderable format here.
                if (isPdf) return <iframe src={previewBlobUrl} style={{width:'100%',height:'60vh',border:'none'}} title="PDF preview"/>
                return <img src={previewBlobUrl} alt="preview" style={{maxWidth:'100%',maxHeight:'60vh',objectFit:'contain'}} onError={()=>setPreviewError(true)}/>
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
