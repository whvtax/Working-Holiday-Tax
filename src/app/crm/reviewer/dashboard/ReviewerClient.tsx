'use client'
import React, { useState, useEffect, useCallback } from 'react'

type ReviewStatus = 'pending' | 'approved' | 'rejected'

type Task = {
  id: string; clientName: string; taskType: string; submittedAt: string
  whatsapp: string; email: string; country: string; dob: string; taxYear: string
  address: string; tfn: string; bankDetails: string; primaryJob: string
  marital: string; taxStatus: string; notes: string; fileUrls: string[]
  done: boolean; reviewStatus: ReviewStatus; reviewerNote: string
  auPhone?: string; reviewedAt?: string
}

const G = '#0B5240'

const TYPE_LABEL: Record<string, string> = {
  'tax-return': 'Tax Return',
  'super': 'Super Refund',
  'tfn': 'TFN Application',
  'abn': 'ABN Application',
}

function parseNotes(notes: string) {
  if (!notes) return { declarations: [], extras: [] }
  const parts = notes.split(' | ').map((s: string) => s.trim()).filter(Boolean)
  const declarations: string[] = []
  const extras: string[] = []
  for (const p of parts) {
    if (p.startsWith('→') || p.startsWith('✓') || p.match(/^I (confirm|declare|have read)/)) {
      declarations.push(p.replace(/^→\s*/, '').replace(/^✓\s*/, ''))
    } else {
      extras.push(p)
    }
  }
  return { declarations, extras }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E2EDE8', borderRadius: 12, overflow: 'hidden', marginBottom: 10 }}>
      <div style={{ padding: '8px 16px', background: '#F0F7F4', borderBottom: '1px solid #E2EDE8' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{title}</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

function Row({ label, value, copy }: { label: string; value?: string | null; copy?: boolean }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 16px', borderBottom: '1px solid #F4FAF7' }}>
      <span style={{ fontSize: 11, color: '#8DA89A', width: 120, flexShrink: 0, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 13, color: '#1A2822', lineHeight: 1.5, flex: 1, wordBreak: 'break-word', direction: 'ltr' }}>{value}</span>
      {copy && <CopyBtn text={value} />}
    </div>
  )
}

function DeclRow({ text }: { text: string }) {
  const clean = text.replace(/^[→✓]\s*/, '')
  return (
    <div style={{ display: 'flex', gap: 10, padding: '12px 16px', borderBottom: '1px solid #F4FAF7', alignItems: 'flex-start' }}>
      <div style={{ width: 22, height: 22, borderRadius: 6, background: '#0B5240', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
        <svg width={11} height={11} viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <span style={{ fontSize: 13, color: '#1A2822', lineHeight: 1.55, fontWeight: 500 }}>{clean}</span>
    </div>
  )
}


function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }}
      style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: copied ? '#EAF6F1' : '#f4f9f6', border: `1px solid ${copied ? '#6EE7B7' : '#D4EAE2'}`, borderRadius: 6, cursor: 'pointer', color: copied ? '#059669' : '#587066', fontSize: 11, fontWeight: 600, fontFamily: 'inherit', flexShrink: 0, transition: 'all 0.15s', whiteSpace: 'nowrap' as const }}
      title="Copy"
    >
      {copied
        ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      }
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function Countdown({ seconds, onDone }: { seconds: number; onDone: () => void }) {
  const onDoneRef = React.useRef(onDone)
  onDoneRef.current = onDone
  useEffect(() => {
    const t = setTimeout(() => onDoneRef.current(), seconds * 1000)
    return () => clearTimeout(t)
  }, [])
  return null
}

// Returns ms remaining until 48h after reviewedAt (negative = already elapsed)
function msUntil48h(reviewedAt?: string): number {
  if (!reviewedAt) return Infinity
  const reviewed = new Date(reviewedAt).getTime()
  if (isNaN(reviewed)) return Infinity
  const expire = reviewed + 48 * 60 * 60 * 1000
  return expire - Date.now()
}

function TaskCard({
  task, expanded, onToggle, onSetStatus, acting,
  setViewUrl, notes, setNotes, savingNote, onSaveNote,
}: {
  task: Task; expanded: boolean; onToggle: () => void
  onSetStatus: (id: string, s: ReviewStatus) => void; acting: string | null
  setViewUrl: (u: string | null) => void
  notes: Record<string, string>; setNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>
  savingNote: string | null; onSaveNote: (id: string, note: string) => void
}) {
  const [hiding, setHiding] = useState(false)
  const [hidden, setHidden] = useState(false)
  const isDone = task.reviewStatus === 'approved' || task.reviewStatus === 'rejected'

  const handleDone = useCallback(() => {
    setHiding(true)
    setTimeout(() => setHidden(true), 600)
  }, [])

  // On mount: if 48h already elapsed hide immediately, else schedule timer
  useEffect(() => {
    if (!isDone) return
    const ms = msUntil48h(task.reviewedAt)
    if (ms <= 0) { setHidden(true); return }
    const t = setTimeout(() => handleDone(), ms)
    return () => clearTimeout(t)
  }, [isDone, task.reviewedAt, handleDone])

  if (hidden) return null

  const { declarations, extras } = parseNotes(task.notes)

  const statusMap: Record<string, { bg: string; color: string; label: string }> = {
    pending:  { bg: '#FFF8EC', color: '#B45309', label: 'Pending' },
    approved: { bg: '#EAF6F1', color: '#059669', label: 'Approved' },
    rejected: { bg: '#FEF2F2', color: '#DC2626', label: 'Rejected' },
  }
  const statusInfo = statusMap[task.reviewStatus] || statusMap['pending']

  return (
    <div style={{
      background: '#fff', border: '1.5px solid #E2EDE8', borderRadius: 16,
      marginBottom: 12, overflow: 'hidden',
      opacity: hiding ? 0 : 1,
      transform: hiding ? 'translateY(-10px) scale(0.97)' : 'none',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      {/* Header — not clickable once decided */}
      <div
        onClick={isDone ? undefined : onToggle}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', cursor: isDone ? 'default' : 'pointer',
          background: '#fff',
          opacity: isDone ? 0.7 : 1,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#0D1B17' }}>{task.clientName || '—'}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: '#EAF6F1', color: G }}>{TYPE_LABEL[task.taskType] || task.taskType}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: statusInfo.bg, color: statusInfo.color }}>{statusInfo.label}</span>
          </div>
          <div style={{ fontSize: 11, color: '#8DA89A' }}>
            {[task.country, task.taxYear, task.submittedAt ? `Submitted ${new Date(task.submittedAt).toLocaleString('en-AU',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Australia/Sydney'}) + ' AEST'}` : ''].filter(Boolean).join(' · ')}
          </div>
        </div>
        {!isDone && (
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '0.2s', flexShrink: 0, marginLeft: 12 }}>
            <path d="M6 9l6 6 6-6" stroke="#8DA89A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Body — only show if pending and expanded */}
      {!isDone && expanded && (
        <div style={{ padding: 14, background: '#F4F9F6' }}>

          {/* ── Per-form-type display ── */}
          {task.taskType === 'tax-return' && (() => {
            const parts = (task.notes || '').split(' | ')
            const getNote = (prefix: string) => task.notes.match(new RegExp(prefix + ': ([^|]+)'))?.[1]?.trim() || ''
            const taxStatusVal = parts.find((p: string) => p.startsWith('→ Australian') || p.startsWith('→ Working') || p.startsWith('→ resident') || p.startsWith('→ whm'))?.replace('→ ', '') || task.taxStatus || '—'
            const declaredVal = parts.find((p: string) => p.startsWith('→ ✓ I declare that all') || p.startsWith('→ ✓ Yes') || p.startsWith('→ ✓ I agree'))?.replace('→ ✓ ', '') || '—'
            const incomeDecl  = parts.find((p: string) => p.startsWith('→ ✓ I declare under my full legal'))?.replace('→ ✓ ', '') || ''
            const abnVal = getNote('ABN') || ''
            const abnNumber = getNote('ABN Number') || ''
            const abnIncome = getNote('ABN Income') || ''
            const bkParts = (task.bankDetails || '').split(' | ')
            const bankName    = bkParts.find(p => p.startsWith('Bank:'))?.replace('Bank: ', '') || task.bankDetails || ''
            const bankHolder  = bkParts.find(p => p.startsWith('Name:'))?.replace('Name: ', '') || ''
            const bankAccount = bkParts.find(p => p.startsWith('Account:'))?.replace('Account: ', '') || ''
            const bankBsb     = bkParts.find(p => p.startsWith('BSB:'))?.replace('BSB: ', '') || ''
            return (<>
              <Section title="Personal details">
                <Row label="Full name" value={task.clientName} />
                <Row label="Date of birth" value={task.dob} />
                <Row label="Home country" value={task.country} />
                <Row label="Marital status" value={task.marital} />
              </Section>
              <Section title="Contact details">
                <Row label="WhatsApp" value={task.whatsapp} />
                <Row label="AU Phone" value={task.auPhone} />
                <Row label="Email" value={task.email} />
                <Row label="Address" value={task.address} />
              </Section>
              <Section title="Tax & employment">
                <Row label="Tax File Number" value={task.tfn} />
                <Row label="Tax year" value={task.taxYear} />
                <Row label="Primary job" value={task.primaryJob} />
                <Row label="Tax residency" value={taxStatusVal} />
              </Section>
              <Section title="ABN">
                <Row label="Has ABN" value={abnVal === 'Yes' ? 'Yes ✓' : abnVal === 'No' ? 'No' : 'Not specified'} />
                {abnVal === 'Yes' && <Row label="ABN number" value={abnNumber || 'Not provided'} copy />}
                {abnVal === 'Yes' && <Row label="ABN income" value={abnIncome || 'Not provided'} copy />}
              </Section>
              <Section title="Bank account">
                <Row label="Bank name" value={bankName} copy />
                <Row label="Account holder" value={bankHolder} copy />
                <Row label="Account number" value={bankAccount} copy />
                <Row label="BSB" value={bankBsb} copy />
              </Section>
              <Section title="Declarations">
                {declaredVal !== '—' && <DeclRow text={declaredVal} />}
                {incomeDecl && <DeclRow text={incomeDecl} />}
              </Section>
            </>)
          })()}

          {task.taskType === 'tfn' && (() => {
            const passportNo = task.notes.match(/Passport No: ([^|]+)/)?.[1]?.trim() || ''
            const gender = task.notes.match(/Gender: ([^|]+)/)?.[1]?.trim() || ''
            return (<>
              <Section title="Personal details">
                <Row label="Full name" value={task.clientName} />
                <Row label="Date of birth" value={task.dob} />
                <Row label="Country of passport" value={task.country} />
                <Row label="Passport number" value={passportNo} />
                <Row label="Gender" value={gender} />
                <Row label="Marital status" value={task.marital} />
              </Section>
              <Section title="Contact details">
                <Row label="WhatsApp" value={task.whatsapp} />
                <Row label="AU Phone" value={task.auPhone} />
                <Row label="Email" value={task.email} />
                <Row label="Address" value={task.address} />
              </Section>
              <Section title="Declarations">
                {declarations.map((d: string, i: number) => <DeclRow key={i} text={d} />)}
              </Section>
            </>)
          })()}

          {task.taskType === 'abn' && (() => {
            const gender = task.notes.match(/Gender: ([^|]+)/)?.[1]?.trim() || ''
            return (<>
              <Section title="Personal details">
                <Row label="Full name" value={task.clientName} />
                <Row label="Date of birth" value={task.dob} />
                <Row label="Country" value={task.country} />
                <Row label="Gender" value={gender} />
                <Row label="Marital status" value={task.marital} />
              </Section>
              <Section title="Contact details">
                <Row label="WhatsApp" value={task.whatsapp} />
                <Row label="AU Phone" value={task.auPhone} />
                <Row label="Email" value={task.email} />
                <Row label="Address" value={task.address} />
              </Section>
              <Section title="Business details">
                <Row label="TFN" value={task.tfn} />
                <Row label="Business activity" value={task.primaryJob} />
              </Section>
              <Section title="Declarations">
                {declarations.map((d: string, i: number) => <DeclRow key={i} text={d} />)}
              </Section>
            </>)
          })()}

          {task.taskType === 'super' && (() => {
            const passportNo = task.notes.match(/Passport No: ([^|]+)/)?.[1]?.trim() || ''
            const superFunds = task.notes.match(/Super Funds: ([^|]+)/)?.[1]?.trim() || ''
            const homeAddr   = task.notes.match(/Home Country Address: ([^|]+)/)?.[1]?.trim() || ''
            const bkParts = (task.bankDetails || '').split(' | ')
            const bankName    = bkParts.find(p => p.startsWith('Bank:'))?.replace('Bank: ', '') || task.bankDetails || ''
            const bankHolder  = bkParts.find(p => p.startsWith('Name:'))?.replace('Name: ', '') || ''
            const bankAccount = bkParts.find(p => p.startsWith('Account:'))?.replace('Account: ', '') || ''
            const bankBsb     = bkParts.find(p => p.startsWith('BSB:'))?.replace('BSB: ', '') || ''
            return (<>
              <Section title="Personal details">
                <Row label="Full name" value={task.clientName} />
                <Row label="Date of birth" value={task.dob} />
                <Row label="Country (passport)" value={task.country} />
                <Row label="Passport number" value={passportNo} />
              </Section>
              <Section title="Contact details">
                <Row label="WhatsApp" value={task.whatsapp} />
                <Row label="Email" value={task.email} />
                <Row label="Address" value={task.address} />
                <Row label="Home country address" value={homeAddr} />
              </Section>
              <Section title="Super & tax details">
                <Row label="TFN" value={task.tfn} />
                <Row label="Super fund(s)" value={superFunds} />
              </Section>
              <Section title="Bank account">
                <Row label="Bank name" value={bankName} copy />
                <Row label="Account holder" value={bankHolder} copy />
                <Row label="Account number" value={bankAccount} copy />
                <Row label="BSB" value={bankBsb} copy />
              </Section>
              <Section title="Declarations">
                {declarations.map((d: string, i: number) => <DeclRow key={i} text={d} />)}
              </Section>
            </>)
          })()}

          {task.fileUrls?.length > 0 && (
            <Section title={`Documents uploaded (${task.fileUrls.length})`}>
              {task.fileUrls.map((url, i) => {
                const raw = url.split('/').pop() ?? `file-${i + 1}`
                const name = decodeURIComponent(raw).replace(/^\d+_[a-z0-9]+_/i, '').slice(0, 60)
                const isPdf = url.toLowerCase().includes('.pdf')
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: i < task.fileUrls.length - 1 ? '1px solid #F4FAF7' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
                      <span style={{ width: 32, height: 32, borderRadius: 8, background: isPdf ? '#FEF2F2' : '#EAF6F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{isPdf ? '📄' : '🖼️'}</span>
                      <span style={{ fontSize: 12, color: '#1A2822', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i + 1}. {name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginLeft: 12, flexShrink: 0 }}>
                      <button onClick={() => setViewUrl(url)} style={{ height: 30, padding: '0 12px', borderRadius: 100, border: '1.5px solid #D4EAE2', background: '#fff', color: G, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>View</button>

                    </div>
                  </div>
                )
              })}
            </Section>
          )}

          {/* Note to admin */}
          <div style={{ background: '#fff', border: '1px solid #E2EDE8', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ padding: '8px 16px', background: '#F0F7F4', borderBottom: '1px solid #E2EDE8' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Note to admin</span>
            </div>
            <div style={{ padding: 12, display: 'flex', gap: 8 }}>
              <textarea
                value={notes[task.id] || ''}
                onChange={e => setNotes(p => ({ ...p, [task.id]: e.target.value }))}
                placeholder="Leave a note for the admin..."
                rows={2}
                style={{ flex: 1, border: '1.5px solid #D4EAE2', borderRadius: 10, padding: '8px 12px', fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none', color: '#1A2822' }}
              />
              <button
                onClick={() => onSaveNote(task.id, notes[task.id] || '')}
                disabled={savingNote === task.id}
                style={{ height: 38, padding: '0 14px', background: '#EAF6F1', color: G, border: '1px solid #C8EAE0', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-end', opacity: savingNote === task.id ? 0.6 : 1 }}
              >
                {savingNote === task.id ? '...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          {task.reviewStatus === 'pending' && (
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 2 }}>
              <button
                onClick={() => onSetStatus(task.id, 'rejected')}
                disabled={acting === task.id}
                style={{ height: 38, padding: '0 20px', borderRadius: 100, border: '1.5px solid #FECACA', background: '#fff', color: '#DC2626', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.15s', opacity: acting === task.id ? 0.6 : 1 }}
              >
                <svg width={14} height={14} viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/></svg>
                Reject
              </button>
              <button
                onClick={() => onSetStatus(task.id, 'approved')}
                disabled={acting === task.id}
                style={{ height: 38, padding: '0 20px', borderRadius: 100, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 1px 8px rgba(11,82,64,0.20)', transition: 'opacity 0.15s', opacity: acting === task.id ? 0.6 : 1 }}
              >
                <svg width={14} height={14} viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Approve
              </button>
            </div>
          )}

          {task.reviewStatus !== 'pending' && !isDone && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 2 }}>
              <button onClick={() => onSetStatus(task.id, 'pending')} style={{ height: 34, padding: '0 16px', borderRadius: 100, border: '1.5px solid #D4EAE2', background: '#fff', color: '#8DA89A', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                ↩ Reset decision
              </button>

            </div>
          )}
        </div>
      )}


    </div>
  )
}

export default function ReviewerClient() {
  const [tasks, setTasks]           = useState<Task[]>([])
  const [loading, setLoading]       = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [notes, setNotes]           = useState<Record<string, string>>({})
  const [savingNote, setSavingNote] = useState<string | null>(null)
  const [expanded, setExpanded]     = useState<string | null>(null)

  const [acting, setActing]         = useState<string | null>(null)
  const [viewUrl, setViewUrl]       = useState<string | null>(null)

  const loadTasks = useCallback(async () => {
    try {
      const r = await fetch('/api/crm/tasks', { cache: 'no-store' })
      const d = await r.json()
      if (d.ok) {
        const active = d.tasks.filter((t: Task) => !t.done)
        setTasks(active)
        // Initialise textarea with existing reviewer note (do not overwrite user's live edits)
        setNotes(prev => {
          const updated = { ...prev }
          active.forEach((t: Task) => {
            if (!(t.id in updated) && t.reviewerNote) {
              updated[t.id] = t.reviewerNote
            }
          })
          return updated
        })
        setNewTaskCount(0)
        prevCountRef.current = active.filter((t: Task) => t.reviewStatus === 'pending').length
      }
    } catch {}
    setLoading(false)
  }, [])

  const [newTaskCount, setNewTaskCount] = useState(0)
  const prevCountRef = React.useRef(0)

  useEffect(() => { loadTasks() }, [loadTasks])

  // Auto-poll every 20s — full sync, keeps multiple reviewers in sync
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const r = await fetch('/api/crm/tasks', { cache: 'no-store' })
        const d = await r.json()
        if (d.ok) {
          const active = d.tasks.filter((t: Task) => !t.done)
          const pendingCount = active.filter((t: Task) => t.reviewStatus === 'pending').length
          // Show badge if new tasks arrived
          if (pendingCount > prevCountRef.current && prevCountRef.current > 0) {
            setNewTaskCount(pendingCount - prevCountRef.current)
          }
          prevCountRef.current = pendingCount
          // Merge: keep local status changes, add new tasks from server
          setTasks(prev => {
            const localById = new Map(prev.map(t => [t.id, t]))
            return active.map((t: Task) => {
              const local = localById.get(t.id)
              // Prefer local reviewStatus if it's more recent (not pending)
              if (local && local.reviewStatus !== 'pending') return { ...t, reviewStatus: local.reviewStatus }
              return t
            })
          })
        }
      } catch {}
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  async function setStatus(taskId: string, status: ReviewStatus) {
    setActing(taskId)
    // Close card immediately
    setExpanded(null)
    // Optimistic update — move to bottom of list
    setTasks(prev => {
      const updated = prev.map(t => t.id === taskId ? { ...t, reviewStatus: status } : t)
      const decided = updated.find(t => t.id === taskId)!
      const rest = updated.filter(t => t.id !== taskId)
      return [...rest, decided]
    })
    setActing(null)
    // Fire API in background
    fetch('/api/crm/review', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, status }),
    }).catch(console.error)
  }

  async function saveNote(taskId: string, note: string) {
    setSavingNote(taskId)
    fetch('/api/crm/review', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, note }),
    }).catch(console.error).finally(() => setSavingNote(null))
  }

  async function logout() {
    await fetch('/api/crm/reviewer-logout', { method: 'POST' })
    window.location.href = '/crm/reviewer'
  }

  const counts = { pending: tasks.filter(t => t.reviewStatus === 'pending').length }
  const filtered = [...tasks].sort((a, b) => {
    const statusOrder = { pending: 0, approved: 1, rejected: 1 }
    const statusDiff = (statusOrder[a.reviewStatus] ?? 0) - (statusOrder[b.reviewStatus] ?? 0)
    if (statusDiff !== 0) return statusDiff
    // Pending: oldest first. Decided: newest first (most recently decided at top of decided section)
    const dir = a.reviewStatus === 'pending' ? 1 : -1
    return dir * (new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F4F9F6', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif' }}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} .grain{display:none!important}`}</style>
      <style>{`
        .rv-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 20px; height: 54px; }
        .rv-btns { display: flex; gap: 8px; }
        .rv-btns button { min-width: 90px; }
        @media (max-width: 600px) {
          .rv-nav { flex-direction: column; height: auto; padding: 12px 16px 0; align-items: stretch; }
          .rv-btns { padding-bottom: 12px; }
          .rv-btns button { flex: 1; min-width: 0; }
        }
      `}</style>
      <div style={{ background: G }} className="rv-nav">
        {/* Logo + title */}
        <button
          onClick={() => { setExpanded(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '8px 0' }}
        >
          <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, overflow: 'hidden' }}>
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
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: '-0.2px', lineHeight: 1.2 }}>Review Portal</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Working Holiday Tax</div>
          </div>
          {newTaskCount > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 20, height: 20, borderRadius: 100, background: '#F59E0B', color: '#fff', fontSize: 10, fontWeight: 800, padding: '0 5px', marginLeft: 4 }}>
              +{newTaskCount}
            </span>
          )}
        </button>
        {/* Buttons */}
        <div className="rv-btns">
          <button
            onClick={async () => { setRefreshing(true); await loadTasks(); setRefreshing(false) }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 34, padding: '0 14px', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: refreshing ? 'default' : 'pointer', fontFamily: 'inherit' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ animation: refreshing ? 'spin 0.7s linear infinite' : 'none', flexShrink: 0 }}>
              <path d="M23 4v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
          <button
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 34, padding: '0 14px', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ marginBottom: 20 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', height: 34, padding: '0 16px', borderRadius: 100, background: G, color: '#fff', fontSize: 12, fontWeight: 600 }}>
            Pending ({counts.pending})
          </span>
        </div>

        {loading
          ? <p style={{ textAlign: 'center', padding: '60px 20px', color: '#8DA89A', fontSize: 14 }}>Loading...</p>
          : filtered.length === 0
          ? <p style={{ textAlign: 'center', padding: '60px 20px', color: '#8DA89A', fontSize: 14 }}>No tasks found.</p>
          : filtered.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              expanded={expanded === task.id}
              onToggle={() => setExpanded(expanded === task.id ? null : task.id)}
              onSetStatus={setStatus}
              acting={acting}
              notes={notes}
              setNotes={setNotes}
              savingNote={savingNote}
              onSaveNote={saveNote}
              setViewUrl={setViewUrl}

            />
          ))
        }
      </div>

      {viewUrl && (
        <div onClick={() => setViewUrl(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #EAF6F1' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0D1B17' }}>Document Preview</span>
              <button onClick={() => setViewUrl(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#587066', lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', minHeight: 400 }}>
              {viewUrl.toLowerCase().includes('.pdf')
                ? <iframe src={viewUrl} style={{ width: '100%', height: '80vh', border: 'none' }} title="Document" />
                : <img src={viewUrl} alt="Document" style={{ width: '100%', height: 'auto', display: 'block' }} />
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
