'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type Task = {
  id:string; clientId:string; clientName:string; whatsapp:string; email:string
  country:string; dob:string; taxYear:string; submittedAt:string; done:boolean
  address:string; tfn:string; bankDetails:string; primaryJob:string
  marital:string; taxStatus:string; howHeard:string; auPhone:string; notes:string
}
type Client = {
  id:string; fullName:string; dob:string; whatsapp:string; email:string
  country:string; taxReturns:{year:string;refundAmount:number;completedAt:string}[]
  createdAt:string
}
type View = 'dashboard'|'clients'|'client-detail'

export default function DashboardClient() {
  const router = useRouter()
  const [view, setView]                 = useState<View>('dashboard')
  const [tasks, setTasks]               = useState<Task[]>([])
  const [clients, setClients]           = useState<Client[]>([])
  const [activeTask, setActiveTask]     = useState<Task|null>(null)
  const [activeClient, setActiveClient] = useState<Client|null>(null)
  const [search, setSearch]             = useState('')
  const [taskNotes, setTaskNotes]       = useState('')
  const [notesSaved, setNotesSaved]     = useState(false)
  const [loading, setLoading]           = useState(true)
  // tax return form
  const [showAddReturn, setShowAddReturn] = useState(false)
  const [newYear, setNewYear]           = useState('')
  const [newRefund, setNewRefund]       = useState('')
  const [confirmComplete, setConfirmComplete] = useState<string|null>(null)
  const [confirmDeleteClient, setConfirmDeleteClient] = useState<string|null>(null)

  const loadTasks = useCallback(async () => {
    const res = await fetch('/api/crm/tasks')
    const d   = await res.json()
    if (d.ok) setTasks(d.tasks)
  }, [])

  const loadClients = useCallback(async () => {
    const res = await fetch('/api/crm/clients')
    const d   = await res.json()
    if (d.ok) setClients(d.clients)
  }, [])

  useEffect(() => {
    Promise.all([loadTasks(), loadClients()]).finally(() => setLoading(false))
  }, [loadTasks, loadClients])

  async function lockAndExit() {
    await fetch('/api/crm/logout', { method:'POST' })
    window.location.replace('/crm')
  }

  async function saveNotes() {
    if (!activeTask) return
    await fetch(`/api/crm/tasks/${activeTask.id}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ action:'notes', notes:taskNotes }),
    })
    setNotesSaved(true)
    setTimeout(() => setNotesSaved(false), 2000)
  }

  async function markDone(taskId: string) {
    await fetch(`/api/crm/tasks/${taskId}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ action:'done' }),
    })
    await loadTasks()
    if (activeTask?.id === taskId) setActiveTask(prev => prev ? {...prev, done:true} : null)
  }

  async function completeTask(taskId: string) {
    await fetch(`/api/crm/tasks/${taskId}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ action:'complete' }),
    })
    setActiveTask(null)
    setConfirmComplete(null)
    await Promise.all([loadTasks(), loadClients()])
  }

  async function addTaxReturn() {
    if (!activeClient || !newYear || !newRefund) return
    await fetch(`/api/crm/clients/${activeClient.id}/tax-returns`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ year:newYear, refundAmount:parseFloat(newRefund) }),
    })
    setNewYear(''); setNewRefund(''); setShowAddReturn(false)
    const res = await fetch(`/api/crm/clients/${activeClient.id}`)
    const d   = await res.json()
    if (d.ok) setActiveClient(d.client)
    await loadClients()
  }

  async function removeTaxReturn(year: string) {
    if (!activeClient) return
    await fetch(`/api/crm/clients/${activeClient.id}/tax-returns`, {
      method:'DELETE', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ year }),
    })
    const res = await fetch(`/api/crm/clients/${activeClient.id}`)
    const d   = await res.json()
    if (d.ok) setActiveClient(d.client)
    await loadClients()
  }

  async function deleteClient(clientId: string) {
    await fetch(`/api/crm/clients/${clientId}`, { method:'DELETE' })
    setConfirmDeleteClient(null)
    setActiveClient(null)
    setView('clients')
    await loadClients()
  }

  function fmtDate(iso:string) {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'})
  }
  function fmtCurrency(n:number) {
    return new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(n)
  }

  const pendingTasks = tasks.filter(t => !t.done)
  const doneTasks    = tasks.filter(t =>  t.done)

  const visibleClients = clients.filter(c =>
    !search ||
    c.fullName.toLowerCase().includes(search.toLowerCase()) ||
    c.country?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.whatsapp?.includes(search)
  )

  const totalRefunds = clients.reduce((sum, c) =>
    sum + c.taxReturns.reduce((s, r) => s + r.refundAmount, 0), 0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f0f4f1;font-family:'DM Sans',system-ui,sans-serif;}
        .shell{display:flex;min-height:100vh;font-family:'DM Sans',system-ui,sans-serif;}

        /* ── Sidebar ── */
        .sidebar{width:216px;background:#0E5C42;display:flex;flex-direction:column;justify-content:space-between;flex-shrink:0;position:sticky;top:0;height:100vh;}
        .sb-logo{display:flex;align-items:center;gap:11px;padding:22px 18px 16px;}
        .sb-logo-icon{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .sb-logo-title{font-size:14px;font-weight:600;color:#fff;}
        .sb-logo-sub{font-size:10px;color:rgba(255,255,255,0.4);margin-top:1px;}
        .sb-divider{height:1px;background:rgba(255,255,255,0.1);margin:0 14px 10px;}
        .sb-nav{display:flex;flex-direction:column;gap:2px;padding:0 8px;}
        .sb-item{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;font-size:13px;font-weight:500;color:rgba(255,255,255,0.55);cursor:pointer;border:none;background:none;font-family:inherit;width:100%;transition:all 0.15s;}
        .sb-item:hover{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.85);}
        .sb-item.active{background:rgba(255,255,255,0.16);color:#fff;font-weight:600;}
        .sb-badge{margin-left:auto;background:#f59e0b;color:#78350f;border-radius:20px;padding:1px 7px;font-size:10px;font-weight:700;}
        .sb-bottom{padding:10px 8px 18px;}
        .sb-count{font-size:11px;color:rgba(255,255,255,0.3);text-align:center;padding:6px 0 8px;}
        .sb-lock{display:flex;align-items:center;gap:8px;padding:9px 11px;border-radius:9px;background:rgba(255,255,255,0.07);border:none;color:rgba(255,255,255,0.5);font-size:12px;cursor:pointer;font-family:inherit;width:100%;transition:all 0.15s;}
        .sb-lock:hover{background:rgba(255,255,255,0.13);color:#fff;}

        /* ── Main ── */
        .main{flex:1;background:#f0f4f1;overflow-y:auto;min-height:100vh;}
        .page{padding:28px;}
        .page-title{font-size:20px;font-weight:600;color:#0a1410;margin-bottom:2px;letter-spacing:-0.3px;}
        .page-sub{font-size:13px;color:#7a8a82;margin-bottom:22px;}

        /* ── Task list ── */
        .section-hdr{font-size:12px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;display:flex;align-items:center;gap:8px;}
        .task-list{display:flex;flex-direction:column;gap:7px;margin-bottom:24px;}
        .task-card{background:#fff;border-radius:13px;padding:16px 18px;border:1px solid #e4ede8;display:flex;align-items:center;gap:14px;cursor:pointer;transition:border-color 0.15s,box-shadow 0.15s;}
        .task-card:hover{border-color:#b0d8c8;box-shadow:0 2px 10px rgba(14,92,66,0.06);}
        .task-card.active-card{border-color:#0E5C42;box-shadow:0 2px 12px rgba(14,92,66,0.12);}
        .task-dot{width:9px;height:9px;border-radius:50%;background:#f59e0b;flex-shrink:0;}
        .task-dot.done{background:#059669;}
        .task-info{flex:1;}
        .task-name{font-size:14px;font-weight:600;color:#0a1410;margin-bottom:2px;}
        .task-meta{font-size:12px;color:#7a8a82;}
        .task-date{font-size:11px;color:#aabab2;white-space:nowrap;}
        .task-open-btn{padding:6px 12px;background:#f0f4f1;border:1px solid #d8e4dc;border-radius:7px;font-size:11px;font-weight:600;color:#333;cursor:pointer;font-family:inherit;white-space:nowrap;}
        .empty-tasks{background:#fff;border-radius:13px;padding:44px;text-align:center;color:#aabab2;font-size:14px;border:1px solid #e4ede8;}

        /* ── Task detail panel ── */
        .split{display:grid;grid-template-columns:1fr 380px;gap:20px;align-items:start;}
        .task-panel{background:#fff;border-radius:16px;border:1px solid #e4ede8;overflow:hidden;position:sticky;top:20px;}
        .panel-hdr{padding:16px 20px;border-bottom:1px solid #f0f4f1;display:flex;align-items:center;justify-content:space-between;}
        .panel-title{font-size:14px;font-weight:600;color:#0a1410;}
        .panel-close{background:none;border:none;font-size:18px;color:#aabab2;cursor:pointer;padding:0;line-height:1;}
        .panel-body{padding:16px 20px;}
        .detail-row{display:flex;padding:7px 0;border-bottom:1px solid #f7f7f7;gap:10px;}
        .detail-row:last-child{border-bottom:none;}
        .detail-lbl{font-size:11px;color:#aabab2;font-weight:500;min-width:90px;flex-shrink:0;}
        .detail-val{font-size:12px;color:#0a1410;flex:1;direction:ltr;text-align:right;}
        .detail-val.normal{direction:unset;text-align:left;}
        .panel-notes{margin-top:12px;}
        .notes-lbl{font-size:11px;font-weight:600;color:#555;margin-bottom:6px;}
        .notes-ta{width:100%;border:1.5px solid #e4ede8;border-radius:9px;padding:10px 12px;font-size:12px;font-family:inherit;background:#f7fbf9;color:#0a1410;outline:none;resize:vertical;min-height:80px;line-height:1.55;}
        .notes-ta:focus{border-color:#0E5C42;background:#edf7f2;}
        .panel-actions{padding:14px 20px;border-top:1px solid #f0f4f1;display:flex;gap:8px;}
        .btn-done{flex:1;padding:9px;border:none;border-radius:9px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;background:#0E5C42;color:#fff;}
        .btn-done:disabled{opacity:0.5;cursor:not-allowed;}
        .btn-complete{flex:1;padding:9px;border:1px solid #fca5a5;border-radius:9px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;background:#fff;color:#c0392b;}
        .btn-notes-save{padding:6px 12px;border:none;border-radius:7px;font-size:11px;font-weight:600;background:#0E5C42;color:#fff;cursor:pointer;font-family:inherit;}
        .btn-notes-save:disabled{opacity:0.4;cursor:not-allowed;}
        .notes-saved{font-size:11px;color:#059669;font-weight:500;}

        /* ── Clients table ── */
        .cl-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
        .cl-title-text{font-size:20px;font-weight:600;color:#0a1410;letter-spacing:-0.3px;}
        .search-wrap{position:relative;}
        .search-ico{position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none;}
        .search-inp{padding:8px 12px 8px 32px;border:1px solid #d8e4dc;border-radius:9px;font-size:13px;background:#fff;outline:none;font-family:inherit;color:#0a1410;width:260px;}
        .search-inp::placeholder{color:#aabab2;}
        .tbl-wrap{background:#fff;border-radius:14px;border:1px solid #e4ede8;overflow:hidden;}
        .tbl{width:100%;border-collapse:collapse;}
        .th{padding:10px 16px;font-size:10px;font-weight:600;color:#7a8a82;text-align:left;background:#f7fbf9;border-bottom:1px solid #e4ede8;text-transform:uppercase;letter-spacing:0.5px;}
        .th:first-child{padding-left:20px;}
        .td{padding:13px 16px;border-bottom:1px solid #f0f4f1;font-size:13px;color:#333;vertical-align:middle;}
        .td:first-child{padding-left:20px;}
        tr:last-child .td{border-bottom:none;}
        .cl-row{cursor:pointer;transition:background 0.12s;}
        .cl-row:hover .td{background:#fafcfb;}
        .cl-name{font-size:13px;font-weight:500;color:#0a1410;}
        .cl-sub{font-size:11px;color:#aabab2;margin-top:1px;}
        .av{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;}
        .cl-cell{display:flex;align-items:center;gap:10px;}
        .returns-badge{font-size:11px;font-weight:600;color:#0E5C42;background:#e8f5f0;border-radius:6px;padding:2px 8px;}
        .btn-view{padding:5px 12px;background:#f0f4f1;border:1px solid #d8e4dc;border-radius:7px;font-size:11px;font-weight:600;color:#333;cursor:pointer;font-family:inherit;}
        .tbl-empty{padding:50px;text-align:center;color:#aabab2;font-size:14px;}

        /* ── Client detail ── */
        .back-btn{display:flex;align-items:center;gap:6px;background:none;border:none;font-size:13px;color:#0E5C42;cursor:pointer;font-family:inherit;font-weight:500;margin-bottom:20px;padding:0;}
        .client-card{background:#fff;border-radius:16px;padding:22px 24px;border:1px solid #e4ede8;margin-bottom:16px;}
        .client-hdr{display:flex;align-items:center;gap:16px;margin-bottom:16px;}
        .client-av{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#0E5C42,#1a9a6a);color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;flex-shrink:0;}
        .client-name{font-size:20px;font-weight:600;color:#0a1410;letter-spacing:-0.3px;}
        .client-meta{font-size:13px;color:#7a8a82;margin-top:3px;}
        .client-details{display:grid;grid-template-columns:1fr 1fr;gap:0;}
        .cd-row{display:flex;padding:8px 0;border-bottom:1px solid #f5f5f5;gap:12px;}
        .cd-row:last-child{border-bottom:none;}
        .cd-lbl{font-size:11px;color:#aabab2;font-weight:500;min-width:110px;}
        .cd-val{font-size:13px;color:#0a1410;}
        .returns-section{background:#fff;border-radius:16px;padding:20px 24px;border:1px solid #e4ede8;margin-bottom:16px;}
        .returns-title{font-size:14px;font-weight:600;color:#0a1410;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;}
        .add-return-btn{display:flex;align-items:center;gap:5px;padding:6px 12px;background:#0E5C42;border:none;border-radius:8px;font-size:11px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit;}
        .return-row{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#f7fbf9;border-radius:9px;margin-bottom:7px;border:1px solid #e4ede8;}
        .return-year{font-size:13px;font-weight:600;color:#0E5C42;}
        .return-amount{font-size:14px;font-weight:600;color:#0a1410;}
        .return-date{font-size:11px;color:#aabab2;}
        .return-del{background:none;border:none;color:#fca5a5;cursor:pointer;font-size:16px;padding:0 4px;line-height:1;}
        .return-del:hover{color:#c0392b;}
        .total-row{display:flex;justify-content:space-between;padding:12px 14px;background:#e8f5f0;border-radius:9px;border:1px solid #b0d8c8;}
        .total-lbl{font-size:13px;font-weight:600;color:#0E5C42;}
        .total-val{font-size:15px;font-weight:700;color:#0E5C42;}
        .no-returns{font-size:13px;color:#aabab2;text-align:center;padding:20px 0;}
        .add-return-form{background:#f7fbf9;border-radius:10px;padding:14px;border:1px solid #e4ede8;margin-top:10px;display:flex;gap:8px;align-items:flex-end;}
        .ar-field{display:flex;flex-direction:column;gap:4px;flex:1;}
        .ar-label{font-size:11px;font-weight:500;color:#555;}
        .ar-input{border:1.5px solid #e4ede8;border-radius:8px;padding:8px 10px;font-size:13px;font-family:inherit;background:#fff;color:#0a1410;outline:none;}
        .ar-input:focus{border-color:#0E5C42;}
        .ar-save{padding:8px 14px;border:none;border-radius:8px;background:#0E5C42;color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;}
        .ar-cancel{padding:8px 10px;border:1px solid #e4ede8;border-radius:8px;background:#fff;color:#333;font-size:12px;cursor:pointer;font-family:inherit;}
        .danger-section{background:#fff;border-radius:16px;padding:16px 24px;border:1px dashed #fca5a5;}
        .danger-title{font-size:12px;font-weight:600;color:#c0392b;margin-bottom:5px;}
        .danger-text{font-size:12px;color:#7a8a82;margin-bottom:10px;}
        .danger-btn{padding:7px 14px;border:1px solid #fca5a5;border-radius:8px;background:#fff;color:#c0392b;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;}

        /* ── Modals ── */
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:999;}
        .modal{background:#fff;border-radius:20px;padding:28px;width:100%;max-width:360px;text-align:center;}
        .modal-icon{font-size:34px;margin-bottom:10px;}
        .modal-title{font-size:16px;font-weight:600;color:#0a1410;margin-bottom:6px;}
        .modal-text{font-size:13px;color:#7a8a82;line-height:1.6;margin-bottom:18px;}
        .modal-btns{display:flex;gap:8px;justify-content:center;}
        .modal-cancel{padding:9px 18px;border-radius:9px;border:1px solid #e4ede8;background:#fff;font-size:13px;cursor:pointer;font-family:inherit;}
        .modal-confirm-red{padding:9px 18px;border-radius:9px;border:none;background:#c0392b;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;}
        .modal-confirm-green{padding:9px 18px;border-radius:9px;border:none;background:#0E5C42;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;}
      `}</style>

      <div className="shell">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <div className="sb-logo">
              <div className="sb-logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
                  <path d="M12 12L2 7M12 12l10-5M12 12v10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="sb-logo-title">WHV Tax CRM</div>
                <div className="sb-logo-sub">Admin Portal</div>
              </div>
            </div>
            <div className="sb-divider"/>
            <nav className="sb-nav">
              <button className={`sb-item ${view==='dashboard'?'active':''}`} onClick={()=>{setView('dashboard');setActiveTask(null)}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg>
                Tasks
                {pendingTasks.length > 0 && <span className="sb-badge">{pendingTasks.length}</span>}
              </button>
              <button className={`sb-item ${view==='clients'||view==='client-detail'?'active':''}`} onClick={()=>{setView('clients');setActiveTask(null);setActiveClient(null)}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Clients
                <span style={{marginLeft:'auto',fontSize:10,color:'rgba(255,255,255,0.35)'}}>{clients.length}</span>
              </button>
            </nav>
          </div>
          <div className="sb-bottom">
            <button className="sb-lock" onClick={lockAndExit}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="M8 11V7.5a4 4 0 018 0V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              Lock &amp; Exit
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="main">

          {/* ── DASHBOARD / TASKS ── */}
          {view === 'dashboard' && (
            <div className="page">
              <div className="page-title">Tasks</div>
              <div className="page-sub">Tax return submissions awaiting processing</div>

              <div className={activeTask ? 'split' : ''}>
                <div>
                  {/* Pending */}
                  <div className="section-hdr">
                    <span style={{color:'#d97706'}}>●</span> Pending — {pendingTasks.length}
                  </div>
                  {pendingTasks.length === 0 ? (
                    <div className="empty-tasks">🎉 No pending tasks — all clear!</div>
                  ) : (
                    <div className="task-list">
                      {pendingTasks.map(t => (
                        <div key={t.id} className={`task-card ${activeTask?.id===t.id?'active-card':''}`}
                          onClick={()=>{ setActiveTask(t); setTaskNotes(t.notes) }}>
                          <div className="task-dot"/>
                          <div className="task-info">
                            <div className="task-name">{t.clientName}</div>
                            <div className="task-meta">{t.country} · Tax year {t.taxYear}</div>
                          </div>
                          <div className="task-date">{fmtDate(t.submittedAt)}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Done */}
                  {doneTasks.length > 0 && (
                    <>
                      <div className="section-hdr" style={{marginTop:8}}>
                        <span style={{color:'#059669'}}>●</span> Done — {doneTasks.length}
                      </div>
                      <div className="task-list">
                        {doneTasks.map(t => (
                          <div key={t.id} className={`task-card ${activeTask?.id===t.id?'active-card':''}`}
                            onClick={()=>{ setActiveTask(t); setTaskNotes(t.notes) }}
                            style={{opacity:0.65}}>
                            <div className="task-dot done"/>
                            <div className="task-info">
                              <div className="task-name">{t.clientName}</div>
                              <div className="task-meta">{t.country} · Tax year {t.taxYear}</div>
                            </div>
                            <div className="task-date">{fmtDate(t.submittedAt)}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Task detail panel */}
                {activeTask && (
                  <div className="task-panel">
                    <div className="panel-hdr">
                      <div className="panel-title">{activeTask.clientName}</div>
                      <button className="panel-close" onClick={()=>setActiveTask(null)}>×</button>
                    </div>
                    <div className="panel-body">
                      <div className="detail-row"><span className="detail-lbl">Country</span><span className="detail-val normal">{activeTask.country||'—'}</span></div>
                      <div className="detail-row"><span className="detail-lbl">Date of birth</span><span className="detail-val">{activeTask.dob||'—'}</span></div>
                      <div className="detail-row"><span className="detail-lbl">WhatsApp</span><span className="detail-val">{activeTask.whatsapp||'—'}</span></div>
                      <div className="detail-row"><span className="detail-lbl">Email</span><span className="detail-val">{activeTask.email||'—'}</span></div>
                      <div className="detail-row"><span className="detail-lbl">AU Phone</span><span className="detail-val">{activeTask.auPhone||'—'}</span></div>
                      <div className="detail-row"><span className="detail-lbl">Address</span><span className="detail-val normal">{activeTask.address||'—'}</span></div>
                      <div className="detail-row"><span className="detail-lbl">TFN</span><span className="detail-val">{activeTask.tfn||'—'}</span></div>
                      <div className="detail-row"><span className="detail-lbl">Bank details</span><span className="detail-val">{activeTask.bankDetails||'—'}</span></div>
                      <div className="detail-row"><span className="detail-lbl">Employer</span><span className="detail-val normal">{activeTask.primaryJob||'—'}</span></div>
                      <div className="detail-row"><span className="detail-lbl">Tax year</span><span className="detail-val normal">{activeTask.taxYear}</span></div>
                      <div className="detail-row"><span className="detail-lbl">Marital</span><span className="detail-val normal">{activeTask.marital||'—'}</span></div>
                      <div className="detail-row"><span className="detail-lbl">Tax status</span><span className="detail-val normal">{activeTask.taxStatus||'—'}</span></div>

                      <div className="panel-notes">
                        <div className="notes-lbl">Notes</div>
                        <textarea className="notes-ta" value={taskNotes}
                          onChange={e=>{setTaskNotes(e.target.value);setNotesSaved(false)}}
                          placeholder="Add notes about this return..."/>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:6}}>
                          {notesSaved ? <span className="notes-saved">✓ Saved</span> : <span/>}
                          <button className="btn-notes-save"
                            disabled={taskNotes === activeTask.notes}
                            onClick={saveNotes}>Save notes</button>
                        </div>
                      </div>
                    </div>
                    <div className="panel-actions">
                      {!activeTask.done && (
                        <button className="btn-done" onClick={()=>markDone(activeTask.id)}>✓ Mark done</button>
                      )}
                      <button className="btn-complete" onClick={()=>setConfirmComplete(activeTask.id)}>
                        🗑️ Complete &amp; archive
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── CLIENTS LIST ── */}
          {view === 'clients' && (
            <div className="page">
              <div className="cl-hdr">
                <div className="cl-title-text">Clients</div>
                <div className="search-wrap">
                  <svg className="search-ico" width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#aabab2" strokeWidth="1.8"/>
                    <path d="M21 21l-4.35-4.35" stroke="#aabab2" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <input className="search-inp" placeholder="Search by name, email, country…"
                    value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
              </div>

              {clients.length === 0 ? (
                <div style={{background:'#fff',borderRadius:14,padding:48,textAlign:'center',color:'#aabab2',fontSize:14,border:'1px solid #e4ede8'}}>
                  No archived clients yet. Complete tasks to move clients here.
                </div>
              ) : (
                <div className="tbl-wrap">
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th className="th">Client</th>
                        <th className="th">Country</th>
                        <th className="th">WhatsApp</th>
                        <th className="th">Email</th>
                        <th className="th">Returns</th>
                        <th className="th"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleClients.map(c => {
                        const initials = c.fullName.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase()
                        const colors = [['#e8f5f0','#0E5C42'],['#eef3fb','#2563eb'],['#fef3e8','#c2410c'],['#f3eefe','#7c3aed']]
                        const [bg,fg] = colors[c.fullName.charCodeAt(0)%colors.length]
                        return (
                          <tr key={c.id} className="cl-row" onClick={()=>{ setActiveClient(c); setView('client-detail') }}>
                            <td className="td">
                              <div className="cl-cell">
                                <div className="av" style={{background:bg,color:fg}}>{initials}</div>
                                <div>
                                  <div className="cl-name">{c.fullName}</div>
                                  <div className="cl-sub">{fmtDate(c.createdAt)}</div>
                                </div>
                              </div>
                            </td>
                            <td className="td">{c.country||'—'}</td>
                            <td className="td" style={{direction:'ltr',fontSize:12}}>{c.whatsapp||'—'}</td>
                            <td className="td" style={{fontSize:12}}>{c.email||'—'}</td>
                            <td className="td">
                              <span className="returns-badge">{c.taxReturns.length} return{c.taxReturns.length!==1?'s':''}</span>
                            </td>
                            <td className="td">
                              <button className="btn-view" onClick={e=>{e.stopPropagation();setActiveClient(c);setView('client-detail')}}>View →</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── CLIENT DETAIL ── */}
          {view === 'client-detail' && activeClient && (
            <div className="page">
              <button className="back-btn" onClick={()=>setView('clients')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Back to Clients
              </button>

              {/* Profile */}
              <div className="client-card">
                <div className="client-hdr">
                  <div className="client-av">
                    {activeClient.fullName.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div className="client-name">{activeClient.fullName}</div>
                    <div className="client-meta">{activeClient.country} · Client since {fmtDate(activeClient.createdAt)}</div>
                  </div>
                </div>
                <div className="client-details">
                  <div className="cd-row"><span className="cd-lbl">Date of birth</span><span className="cd-val">{activeClient.dob||'—'}</span></div>
                  <div className="cd-row"><span className="cd-lbl">WhatsApp</span><span className="cd-val" style={{direction:'ltr'}}>{activeClient.whatsapp||'—'}</span></div>
                  <div className="cd-row"><span className="cd-lbl">Email</span><span className="cd-val">{activeClient.email||'—'}</span></div>
                  <div className="cd-row"><span className="cd-lbl">Country</span><span className="cd-val">{activeClient.country||'—'}</span></div>
                </div>
              </div>

              {/* Tax returns */}
              <div className="returns-section">
                <div className="returns-title">
                  Tax Returns History
                  <button className="add-return-btn" onClick={()=>setShowAddReturn(v=>!v)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    Add year
                  </button>
                </div>

                {showAddReturn && (
                  <div className="add-return-form">
                    <div className="ar-field">
                      <label className="ar-label">Tax year</label>
                      <input className="ar-input" placeholder="e.g. 2023-24" value={newYear} onChange={e=>setNewYear(e.target.value)}/>
                    </div>
                    <div className="ar-field">
                      <label className="ar-label">Refund (AUD)</label>
                      <input className="ar-input" type="number" placeholder="e.g. 2500" value={newRefund} onChange={e=>setNewRefund(e.target.value)}/>
                    </div>
                    <button className="ar-save" onClick={addTaxReturn}>Save</button>
                    <button className="ar-cancel" onClick={()=>{setShowAddReturn(false);setNewYear('');setNewRefund('')}}>✕</button>
                  </div>
                )}

                {activeClient.taxReturns.length === 0 ? (
                  <div className="no-returns">No tax returns recorded yet. Add one above.</div>
                ) : (
                  <>
                    {[...activeClient.taxReturns].sort((a,b)=>b.year.localeCompare(a.year)).map(r => (
                      <div key={r.year} className="return-row">
                        <div>
                          <div className="return-year">{r.year}</div>
                          <div className="return-date">{fmtDate(r.completedAt)}</div>
                        </div>
                        <div style={{display:'flex',alignItems:'center',gap:12}}>
                          <div className="return-amount">{fmtCurrency(r.refundAmount)}</div>
                          <button className="return-del" onClick={()=>removeTaxReturn(r.year)} title="Remove">×</button>
                        </div>
                      </div>
                    ))}
                    <div className="total-row">
                      <span className="total-lbl">Total refunds</span>
                      <span className="total-val">{fmtCurrency(activeClient.taxReturns.reduce((s,r)=>s+r.refundAmount,0))}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Danger */}
              <div className="danger-section">
                <div className="danger-title">⚠️ Delete client</div>
                <div className="danger-text">Permanently removes this client and all their tax return history.</div>
                <button className="danger-btn" onClick={()=>setConfirmDeleteClient(activeClient.id)}>Delete client</button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Confirm complete task modal */}
      {confirmComplete && (
        <div className="overlay" onClick={e=>{ if(e.target===e.currentTarget) setConfirmComplete(null) }}>
          <div className="modal">
            <div className="modal-icon">📦</div>
            <div className="modal-title">Complete &amp; archive?</div>
            <div className="modal-text">
              All sensitive details (TFN, bank, address) will be deleted.<br/>
              The client will move to the Clients tab with their basic info only.
            </div>
            <div className="modal-btns">
              <button className="modal-cancel" onClick={()=>setConfirmComplete(null)}>Cancel</button>
              <button className="modal-confirm-green" onClick={()=>completeTask(confirmComplete)}>Yes, archive</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete client */}
      {confirmDeleteClient && (
        <div className="overlay" onClick={e=>{ if(e.target===e.currentTarget) setConfirmDeleteClient(null) }}>
          <div className="modal">
            <div className="modal-icon">🗑️</div>
            <div className="modal-title">Delete client?</div>
            <div className="modal-text">This permanently deletes the client and all their tax return history.</div>
            <div className="modal-btns">
              <button className="modal-cancel" onClick={()=>setConfirmDeleteClient(null)}>Cancel</button>
              <button className="modal-confirm-red" onClick={()=>deleteClient(confirmDeleteClient)}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
