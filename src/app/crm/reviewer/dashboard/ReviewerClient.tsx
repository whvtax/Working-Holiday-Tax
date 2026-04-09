'use client'
import React, { useState, useEffect, useCallback } from 'react'

type ReviewStatus = 'pending' | 'approved' | 'rejected'

type Task = {
  id: string; clientName: string; taskType: string; submittedAt: string
  whatsapp: string; email: string; country: string; dob: string; taxYear: string
  address: string; tfn: string; bankDetails: string; primaryJob: string
  marital: string; taxStatus: string; notes: string; fileUrls: string[]
  reviewStatus: ReviewStatus; reviewerNote: string
  auPhone?: string
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

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '9px 16px', borderBottom: '1px solid #F4FAF7' }}>
      <span style={{ fontSize: 11, color: '#8DA89A', width: 120, flexShrink: 0, paddingTop: 1, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 13, color: '#1A2822', lineHeight: 1.5, flex: 1, wordBreak: 'break-word' }}>{value}</span>
    </div>
  )
}

function DeclRow({ text }: { text: string }) {
  const clean = text.replace(/^[→✓]\s*/, '')
  return (
    <div style={{ display: 'flex', gap: 10, padding: '9px 16px', borderBottom: '1px solid #F4FAF7', alignItems: 'flex-start' }}>
      <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#EAF6F1', color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
      <span style={{ fontSize: 13, color: '#1A2822', lineHeight: 1.5 }}>{clean}</span>
    </div>
  )
}

function Countdown({ seconds, onDone }: { seconds: number; onDone: () => void }) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    if (left <= 0) { onDone(); return }
    const t = setTimeout(() => setLeft(l => l - 1), 1000)
    return () => clearTimeout(t)
  }, [left, onDone])
  const pct = ((seconds - left) / seconds) * 100
  const r = 14, circ = 2 * Math.PI * r
  const mins = Math.floor(left / 60)
  const secs = left % 60
  const timeStr = mins > 0 ? `${mins}:${String(secs).padStart(2, '0')}` : `${secs}s`
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', background: '#F9FCFA', borderTop: '1px solid #EAF6F1' }}>
      <svg width={36} height={36} viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
        <circle cx={18} cy={18} r={r} fill="none" stroke="#E2EDE8" strokeWidth={3} />
        <circle cx={18} cy={18} r={r} fill="none" stroke={G} strokeWidth={3}
          strokeDasharray={circ}
          strokeDashoffset={circ - (circ * pct / 100)}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s linear' }}
        />
        <text x={18} y={22} textAnchor="middle" fontSize={9} fontWeight={700} fill={G}>{timeStr}</text>
      </svg>
      <div>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#1A2822' }}>Task will disappear in {timeStr}</p>
        <p style={{ margin: '2px 0 0', fontSize: 11, color: '#8DA89A' }}>Details are saved in the admin dashboard</p>
      </div>
    </div>
  )
}

function TaskCard({
  task, expanded, onToggle, onSetStatus, acting,
  setViewUrl, notes, setNotes, savingNote, onSaveNote,
}: {
  task: Task; expanded: boolean; onToggle: () => void
  onSetStatus: (id: string, s: ReviewStatus) => void; acting: string | null
  setViewUrl: (u: string | null) => void
  notes: Record<string, string>; setNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>
  savingNote: string | null; onSaveNote: (id: string) => void
}) {
  const [hiding, setHiding] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const isDone = task.reviewStatus === 'approved' || task.reviewStatus === 'rejected'

  useEffect(() => {
    if (isDone && !hiding && !hidden && !showCountdown) {
      setShowCountdown(true)
    }
  }, [task.reviewStatus])

  const handleDone = useCallback(() => {
    setHiding(true)
    setTimeout(() => setHidden(true), 500)
  }, [])

  if (hidden) return null

  const { declarations, extras } = parseNotes(task.notes)

  const statusInfo = {
    pending:  { bg: '#FFF8EC', color: '#B45309', label: '⏳ Pending' },
    approved: { bg: '#EAF6F1', color: '#059669', label: '✓ Approved' },
    rejected: { bg: '#FEF2F2', color: '#DC2626', label: '✗ Rejected' },
  }[task.reviewStatus] ?? { bg: '#FFF8EC', color: '#B45309', label: '⏳ Pending' }

  return (
    <div style={{
      background: '#fff', border: '1.5px solid #E2EDE8', borderRadius: 16,
      marginBottom: 12, overflow: 'hidden',
      opacity: hiding ? 0 : 1,
      transform: hiding ? 'translateY(-10px) scale(0.97)' : 'none',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      {/* Header */}
      <div onClick={onToggle} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px', cursor: 'pointer',
        background: expanded ? '#F9FCFA' : '#fff',
        borderBottom: expanded ? '1.5px solid #E2EDE8' : 'none',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#0D1B17' }}>{task.clientName || '—'}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: '#EAF6F1', color: G }}>{TYPE_LABEL[task.taskType] || task.taskType}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: statusInfo.bg, color: statusInfo.color }}>{statusInfo.label}</span>
          </div>
          <div style={{ fontSize: 11, color: '#8DA89A' }}>
            {[task.country, task.taxYear, task.submittedAt ? `Submitted ${new Date(task.submittedAt).toLocaleDateString('en-AU')}` : ''].filter(Boolean).join(' · ')}
          </div>
        </div>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '0.2s', flexShrink: 0, marginLeft: 12 }}>
          <path d="M6 9l6 6 6-6" stroke="#8DA89A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Body */}
      {expanded && (
        <div style={{ padding: 14, background: '#F4F9F6' }}>

          <Section title="Personal details">
            <Row label="Full name" value={task.clientName} />
            <Row label="Date of birth" value={task.dob} />
            <Row label="Country" value={task.country} />
            <Row label="Marital" value={task.marital} />
            <Row label="Tax status" value={task.taxStatus} />
          </Section>

          <Section title="Contact details">
            <Row label="WhatsApp" value={task.whatsapp} />
            <Row label="AU Phone" value={task.auPhone} />
            <Row label="Email" value={task.email} />
            <Row label="Address" value={task.address} />
          </Section>

          {(task.tfn || task.bankDetails || task.primaryJob) && (
            <Section title="Financial details">
              <Row label="TFN" value={task.tfn} />
              <Row label="Bank details" value={task.bankDetails} />
              <Row label="Primary job" value={task.primaryJob} />
              {task.taxYear && <Row label="Tax year" value={task.taxYear} />}
            </Section>
          )}

          {extras.length > 0 && (
            <Section title="Additional info">
              {extras.map((line, i) => {
                const ci = line.indexOf(':')
                return ci > 0
                  ? <Row key={i} label={line.slice(0, ci).trim()} value={line.slice(ci + 1).trim()} />
                  : <Row key={i} label="—" value={line} />
              })}
            </Section>
          )}

          {declarations.length > 0 && (
            <Section title="Declarations">
              {declarations.map((d, i) => <DeclRow key={i} text={d} />)}
            </Section>
          )}

          {task.fileUrls?.length > 0 && (
            <Section title="Documents uploaded">
              {task.fileUrls.map((url, i) => {
                const raw = url.split('/').pop() ?? `file-${i + 1}`
                const name = decodeURIComponent(raw).replace(/^\d+_[a-z0-9]+_/i, '').slice(0, 50)
                const isPdf = url.toLowerCase().includes('.pdf')
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: i < task.fileUrls.length - 1 ? '1px solid #F4FAF7' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <span style={{ width: 32, height: 32, borderRadius: 8, background: isPdf ? '#FEF2F2' : '#EAF6F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{isPdf ? '📄' : '🖼️'}</span>
                      <span style={{ fontSize: 12, color: '#1A2822', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                    </div>
                    <button onClick={() => setViewUrl(url)} style={{ height: 32, padding: '0 16px', borderRadius: 100, border: '1.5px solid #D4EAE2', background: '#fff', color: G, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, marginLeft: 12 }}>View</button>
                  </div>
                )
              })}
            </Section>
          )}

          {/* Note box */}
          <div style={{ background: '#fff', border: '1px solid #E2EDE8', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ padding: '8px 16px', background: '#F0F7F4', borderBottom: '1px solid #E2EDE8' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Note to admin</span>
            </div>
            <div style={{ padding: 12, display: 'flex', gap: 8 }}>
              <textarea
                value={notes[task.id] || ''}
                onChange={e => setNotes(p => ({ ...p, [task.id]: e.target.value }))}
                placeholder="Leave a note for the admin..."
                rows={2}
                style={{ flex: 1, border: '1.5px solid #D4EAE2', borderRadius: 10, padding: '8px 12px', fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none', color: '#1A2822', direction: 'rtl' }}
              />
              <button onClick={() => onSaveNote(task.id)} disabled={savingNote === task.id} style={{ height: 38, padding: '0 14px', background: '#EAF6F1', color: G, border: '1px solid #C8EAE0', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-end', opacity: savingNote === task.id ? 0.6 : 1 }}>
                {savingNote === task.id ? '...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          {task.reviewStatus === 'pending' && (
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => onSetStatus(task.id, 'rejected')}
                disabled={acting === task.id}
                style={{ flex: 1, height: 54, borderRadius: 14, border: '2px solid #FECACA', background: '#fff', color: '#DC2626', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background 0.15s' }}
              >
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#DC2626', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900 }}>✗</span>
                Reject
              </button>
              <button
                onClick={() => onSetStatus(task.id, 'approved')}
                disabled={acting === task.id}
                style={{ flex: 1, height: 54, borderRadius: 14, border: 'none', background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 2px 14px rgba(11,82,64,0.28)', transition: 'opacity 0.15s' }}
              >
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900 }}>✓</span>
                Approve
              </button>
            </div>
          )}

          {task.reviewStatus !== 'pending' && !showCountdown && (
            <button onClick={() => onSetStatus(task.id, 'pending')} style={{ width: '100%', height: 42, borderRadius: 12, border: '1.5px solid #D4EAE2', background: '#fff', color: '#587066', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              ↩ Reset decision
            </button>
          )}
        </div>
      )}

      {/* Countdown bar */}
      {showCountdown && isDone && (
        <Countdown seconds={300} onDone={handleDone} />
      )}
    </div>
  )
}

export default function ReviewerClient() {
  const [tasks, setTasks]           = useState<Task[]>([])
  const [loading, setLoading]       = useState(true)
  const [expanded, setExpanded]     = useState<string | null>(null)
  const [filter, setFilter]         = useState<ReviewStatus | 'all'>('pending')
  const [acting, setActing]         = useState<string | null>(null)
  const [viewUrl, setViewUrl]       = useState<string | null>(null)
  const [notes, setNotes]           = useState<Record<string, string>>({})
  const [savingNote, setSavingNote] = useState<string | null>(null)

  const loadTasks = useCallback(async () => {
    try {
      const r = await fetch('/api/crm/tasks', { cache: 'no-store' })
      const d = await r.json()
      if (d.ok) {
        const active = d.tasks.filter((t: Task) => !t.done)
        setTasks(active)
        const init: Record<string, string> = {}
        active.forEach((t: Task) => { init[t.id] = t.reviewerNote || '' })
        setNotes(init)
      }
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { loadTasks() }, [loadTasks])

  async function setStatus(taskId: string, status: ReviewStatus) {
    setActing(taskId)
    await fetch('/api/crm/review', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, status }),
    })
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, reviewStatus: status } : t))
    setActing(null)
  }

  async function saveNote(taskId: string) {
    setSavingNote(taskId)
    await fetch('/api/crm/review', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, note: notes[taskId] || '' }),
    })
    setSavingNote(null)
  }

  async function logout() {
    await fetch('/api/crm/reviewer-logout', { method: 'POST' })
    window.location.href = '/crm/reviewer'
  }

  const counts = {
    pending:  tasks.filter(t => t.reviewStatus === 'pending').length,
    approved: tasks.filter(t => t.reviewStatus === 'approved').length,
    rejected: tasks.filter(t => t.reviewStatus === 'rejected').length,
  }
  const filtered = tasks.filter(t => filter === 'all' || t.reviewStatus === filter)

  return (
    <div style={{ minHeight: '100vh', background: '#F4F9F6', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif' }}>
      <div style={{ background: G, padding: '0 20px', height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Working Holiday Tax · Review Portal</span>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: 100, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Sign out</button>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(['pending', 'approved', 'rejected', 'all'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ height: 34, padding: '0 14px', border: '1.5px solid', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', borderColor: filter === f ? G : '#D4EAE2', background: filter === f ? G : '#fff', color: filter === f ? '#fff' : '#587066' }}>
              {f === 'pending' ? `Pending (${counts.pending})` : f === 'approved' ? `Approved (${counts.approved})` : f === 'rejected' ? `Rejected (${counts.rejected})` : 'All'}
            </button>
          ))}
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
              setViewUrl={setViewUrl}
              notes={notes}
              setNotes={setNotes}
              savingNote={savingNote}
              onSaveNote={saveNote}
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
