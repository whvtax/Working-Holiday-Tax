'use client'
import React, { useState, useEffect, useCallback } from 'react'

type ReviewStatus = 'pending' | 'approved' | 'rejected'

type Task = {
  id: string; clientName: string; taskType: string; submittedAt: string
  whatsapp: string; email: string; country: string; dob: string; taxYear: string
  address: string; tfn: string; bankDetails: string; primaryJob: string
  marital: string; taxStatus: string; notes: string; fileUrls: string[]
  reviewStatus: ReviewStatus; reviewerNote: string
}

const G = '#0B5240'

const TYPE_LABEL: Record<string, string> = {
  'tax-return': 'Tax Return',
  'super': 'Super Refund',
  'tfn': 'TFN Application',
  'abn': 'ABN Application',
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  const styles: Record<ReviewStatus, { bg: string; color: string; label: string }> = {
    pending:  { bg: '#FFF8EC', color: '#B45309', label: '⏳ Pending' },
    approved: { bg: '#EAF6F1', color: '#065F46', label: '✓ Approved' },
    rejected: { bg: '#FEF2F2', color: '#DC2626', label: '✗ Rejected' },
  }
  const s = styles[status] ?? styles.pending
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: s.bg, color: s.color, letterSpacing: '0.04em' }}>
      {s.label}
    </span>
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
        const pending = d.tasks.filter((t: Task) => !t.done)
        setTasks(pending)
        const init: Record<string, string> = {}
        pending.forEach((t: Task) => { init[t.id] = t.reviewerNote || '' })
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
    setExpanded(null)
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

  const navStyle: React.CSSProperties = { background: G, padding: '0 20px', height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
  const mainStyle: React.CSSProperties = { maxWidth: 900, margin: '0 auto', padding: '24px 16px' }
  const cardStyle: React.CSSProperties = { background: '#fff', border: '1px solid #E2EDE8', borderRadius: 16, marginBottom: 12, overflow: 'hidden' }
  const cardHeadStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }
  const bodyStyle: React.CSSProperties = { padding: '0 16px 16px', borderTop: '1px solid #EAF6F1' }
  const rowStyle: React.CSSProperties = { display: 'flex', gap: 8, padding: '7px 0', borderBottom: '1px solid #F0F7F4' }
  const lblStyle: React.CSSProperties = { fontSize: 10, fontWeight: 600, color: '#8DA89A', width: 130, flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: 2 }
  const valStyle: React.CSSProperties = { fontSize: 12, color: '#1A2822', lineHeight: 1.6, flex: 1 }
  const actionsStyle: React.CSSProperties = { display: 'flex', gap: 10, padding: '12px 16px', background: '#F9FCFA', borderTop: '1px solid #EAF6F1', justifyContent: 'flex-end' }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F9F6', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif' }}>

      {/* Nav */}
      <div style={navStyle}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Working Holiday Tax · Review Portal</span>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: 100, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
          Sign out
        </button>
      </div>

      <div style={mainStyle}>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(['pending', 'approved', 'rejected', 'all'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              height: 34, padding: '0 14px', border: '1.5px solid', borderRadius: 100,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              borderColor: filter === f ? G : '#D4EAE2',
              background: filter === f ? G : '#fff',
              color: filter === f ? '#fff' : '#587066',
            }}>
              {f === 'pending' ? `Pending (${counts.pending})`
                : f === 'approved' ? `Approved (${counts.approved})`
                : f === 'rejected' ? `Rejected (${counts.rejected})`
                : 'All'}
            </button>
          ))}
        </div>

        {/* Tasks */}
        {loading
          ? <p style={{ textAlign: 'center', padding: '60px 20px', color: '#8DA89A', fontSize: 14 }}>Loading...</p>
          : filtered.length === 0
          ? <p style={{ textAlign: 'center', padding: '60px 20px', color: '#8DA89A', fontSize: 14 }}>No tasks found.</p>
          : filtered.map(task => (
            <div key={task.id} style={cardStyle}>

              {/* Card header */}
              <div style={cardHeadStyle} onClick={() => setExpanded(expanded === task.id ? null : task.id)}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#0D1B17' }}>{task.clientName}</span>
                    <span style={{ fontSize: 10, background: '#EAF6F1', color: G, padding: '2px 8px', borderRadius: 100, fontWeight: 600 }}>
                      {TYPE_LABEL[task.taskType] || task.taskType}
                    </span>
                    <StatusBadge status={task.reviewStatus} />
                  </div>
                  <div style={{ fontSize: 11, color: '#8DA89A' }}>
                    {task.country} · {task.taxYear} · Submitted {new Date(task.submittedAt).toLocaleDateString('en-AU')}
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  style={{ transform: expanded === task.id ? 'rotate(180deg)' : 'none', transition: '0.2s', flexShrink: 0 }}>
                  <path d="M6 9l6 6 6-6" stroke="#8DA89A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Expanded */}
              {expanded === task.id && (
                <>
                  <div style={bodyStyle}>
                    {([
                      ['WhatsApp', task.whatsapp],
                      ['Email', task.email],
                      ['Date of Birth', task.dob],
                      ['Address', task.address],
                      ['TFN', task.tfn],
                      ['Bank details', task.bankDetails],
                      ['Primary job', task.primaryJob],
                      ['Marital status', task.marital],
                      ['Tax status', task.taxStatus],
                      ['Notes / Declarations', task.notes],
                    ] as [string, string][]).filter(([, v]) => v).map(([l, v]) => (
                      <div key={l} style={rowStyle}>
                        <span style={lblStyle}>{l}</span>
                        <span style={valStyle}>{v}</span>
                      </div>
                    ))}

                    {/* Files */}
                    {task.fileUrls?.length > 0 && (
                      <div style={{ ...rowStyle, flexDirection: 'column', gap: 6 }}>
                        <span style={lblStyle}>Documents</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                          {task.fileUrls.map((url, i) => {
                            const raw = url.split('/').pop() ?? `file-${i + 1}`
                            const name = decodeURIComponent(raw).replace(/^\d+_[a-z0-9]+_/, '').slice(0, 30)
                            const isPdf = url.toLowerCase().endsWith('.pdf')
                            return (
                              <button key={i} onClick={() => setViewUrl(url)} style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                height: 30, padding: '0 12px',
                                background: '#EAF6F1', color: G,
                                border: '1px solid #C8EAE0', borderRadius: 100,
                                fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                              }}>
                                {isPdf ? '📄' : '🖼️'} {name} · View
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reviewer note */}
                  <div style={{ padding: '12px 16px', borderTop: '1px solid #EAF6F1', background: '#FAFCFB' }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#8DA89A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
                      Note to admin
                    </p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <textarea
                        value={notes[task.id] || ''}
                        onChange={e => setNotes(p => ({ ...p, [task.id]: e.target.value }))}
                        placeholder="Leave a note for the admin..."
                        rows={2}
                        style={{ flex: 1, border: '1.5px solid #D4EAE2', borderRadius: 10, padding: '8px 12px', fontSize: 12, fontFamily: 'inherit', resize: 'vertical', outline: 'none', color: '#1A2822' }}
                      />
                      <button
                        onClick={() => saveNote(task.id)}
                        disabled={savingNote === task.id}
                        style={{ height: 36, padding: '0 14px', background: '#EAF6F1', color: G, border: '1px solid #C8EAE0', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-end', opacity: savingNote === task.id ? 0.6 : 1 }}>
                        {savingNote === task.id ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={actionsStyle}>
                    {task.reviewStatus !== 'pending' && (
                      <button onClick={() => setStatus(task.id, 'pending')} disabled={acting === task.id}
                        style={{ height: 38, padding: '0 16px', background: '#F9FCFA', color: '#587066', border: '1.5px solid #D4EAE2', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                        ↩ Reset
                      </button>
                    )}
                    {task.reviewStatus === 'pending' && (
                      <button onClick={() => setStatus(task.id, 'rejected')} disabled={acting === task.id}
                        style={{ height: 38, padding: '0 18px', background: '#FEF2F2', color: '#DC2626', border: '1.5px solid #FECACA', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                        ✗ Reject
                      </button>
                    )}
                    {task.reviewStatus === 'pending' && (
                      <button onClick={() => setStatus(task.id, 'approved')} disabled={acting === task.id}
                        style={{ height: 38, padding: '0 18px', background: G, color: '#fff', border: 'none', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                        ✓ Approve
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        }
      </div>

      {/* File viewer modal */}
      {viewUrl && (
        <div onClick={() => setViewUrl(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #EAF6F1' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0D1B17' }}>Document Preview</span>
              <button onClick={() => setViewUrl(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#587066', lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', minHeight: 400 }}>
              {viewUrl.toLowerCase().endsWith('.pdf')
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
