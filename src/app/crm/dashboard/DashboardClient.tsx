'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type TaxYear = '2020-21'|'2021-22'|'2022-23'|'2023-24'|'2024-25'|'2025-26'|'2026-27'|'2027-28'|'2028-29'|'2029-30'
type StatusFilter = 'all'|'pending'|'handled'
type View = 'dashboard'|'clients'

type Client = {
  id:string; fullName:string; dob:string; whatsapp:string; email:string
  country:string; taxYear:TaxYear; submittedAt:string; handled:boolean
}

// Current year + 5 forward, 3 back
function getTaxYears(): TaxYear[] {
  const currentYear = new Date().getFullYear()
  const years: TaxYear[] = []
  for (let y = currentYear - 3; y <= currentYear + 5; y++) {
    years.push(`${y}-${String(y+1).slice(2)}` as TaxYear)
  }
  return years.reverse()
}
const TAX_YEARS = getTaxYears()

export default function DashboardClient() {
  const router = useRouter()
  const [view, setView]                 = useState<View>('dashboard')
  const [clients, setClients]           = useState<Client[]>([])
  const [loading, setLoading]           = useState(true)
  const [yearFilter, setYearFilter]     = useState<TaxYear|'all'>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [search, setSearch]             = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteId, setShowDeleteId] = useState<string|null>(null)
  const [newClient, setNewClient]       = useState({ fullName:'', whatsapp:'', email:'', country:'', taxYear:'2024-25' as TaxYear })
  const [addingSaving, setAddingSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/crm/clients?showHandled=true')
    const data = await res.json()
    if (data.ok) setClients(data.clients)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function addClient(e:React.FormEvent) {
    e.preventDefault()
    setAddingSaving(true)
    await fetch('/api/crm/clients',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        ...newClient,
        address:'', tfn:'', bankDetails:'', primaryJob:'',
        marital:'', taxStatus:'Working Holiday Maker', howHeard:'', auPhone:'',
        notes: '',
        submittedAt: new Date().toISOString(),
        files:{bankStatement:null,selfiePassport:null,invoices:null},
      }),
    })
    setNewClient({fullName:'',whatsapp:'',email:'',country:'',taxYear:'2024-25'})
    setShowAddModal(false)
    setAddingSaving(false)
    await load()
  }

  async function deleteClient(id:string) {
    await fetch(`/api/crm/clients/${id}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({action:'delete'}),
    })
    setShowDeleteId(null)
    await load()
  }

  async function lockAndExit() {
    await fetch('/api/crm/logout',{method:'POST'})
    window.location.replace('/crm')
  }

  const allPending   = clients.filter(c => !c.handled)
  const allCompleted = clients.filter(c =>  c.handled)

  const visible = clients
    .filter(c => yearFilter === 'all' || c.taxYear === yearFilter)
    .filter(c => statusFilter === 'all' ? true : statusFilter === 'pending' ? !c.handled : c.handled)
    .filter(c => !search || c.fullName.toLowerCase().includes(search.toLowerCase()) || c.country?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()))

  function fmtDate(iso:string) {
    return new Date(iso).toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'})
  }
  function initials(name:string) {
    return name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()
  }
  const AVATAR_COLORS = [
    ['#e8f5f0','#0E5C42'],['#eef3fb','#2563eb'],['#fef3e8','#c2410c'],
    ['#f3eefe','#7c3aed'],['#fef0f0','#dc2626'],['#f0fdf4','#16a34a'],
  ]
  function avatarColor(name:string) {
    return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
  }

  // Tasks for dashboard
  const tasks = [
    ...allPending.map(c => ({ id:c.id, type:'pending' as const, client:c.fullName, desc:`Tax return pending — ${c.taxYear}`, date:fmtDate(c.submittedAt) })),
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f0f4f1;font-family:'DM Sans',system-ui,sans-serif;}
        .wrap{min-height:100vh;background:#f0f4f1;font-family:'DM Sans',system-ui,sans-serif;}

        /* topbar */
        .topbar{background:#0E5C42;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between;}
        .tb-left{display:flex;align-items:center;gap:20px;}
        .tb-logo{display:flex;align-items:center;gap:10px;}
        .tb-icon{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;}
        .tb-title{font-size:15px;font-weight:600;color:#fff;}
        .tb-nav{display:flex;gap:4px;}
        .tb-nav-btn{padding:6px 14px;border-radius:8px;border:none;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
        .tb-nav-btn.on{background:rgba(255,255,255,0.2);color:#fff;}
        .tb-nav-btn.off{background:transparent;color:rgba(255,255,255,0.6);}
        .tb-right{display:flex;align-items:center;gap:10px;}
        .tb-count{font-size:12px;color:rgba(255,255,255,0.55);background:rgba(255,255,255,0.1);border-radius:20px;padding:3px 10px;}
        .tb-lock{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:9px;padding:6px 13px;font-size:12px;font-weight:500;color:#fff;cursor:pointer;font-family:inherit;}

        /* dashboard view */
        .db-page{padding:24px;}
        .db-pending-hdr{font-size:16px;font-weight:600;color:#0a1410;margin-bottom:14px;}
        .db-task-list{display:flex;flex-direction:column;gap:8px;margin-bottom:32px;}
        .db-task{background:#fff;border-radius:12px;padding:14px 18px;border:1px solid #e4ede8;display:flex;align-items:center;gap:14px;}
        .db-task-dot{width:8px;height:8px;border-radius:50%;background:#f59e0b;flex-shrink:0;}
        .db-task-dot.done{background:#059669;}
        .db-task-body{flex:1;}
        .db-task-name{font-size:13px;font-weight:500;color:#0a1410;margin-bottom:2px;}
        .db-task-desc{font-size:12px;color:#7a8a82;}
        .db-task-date{font-size:11px;color:#aabab2;white-space:nowrap;}
        .db-task-open{padding:5px 12px;background:#f0f4f1;border:1px solid #d8e4dc;border-radius:7px;font-size:11px;font-weight:600;color:#333;cursor:pointer;font-family:inherit;}
        .db-empty-tasks{background:#fff;border-radius:12px;padding:40px;text-align:center;color:#aabab2;font-size:14px;border:1px solid #e4ede8;}

        /* clients view */
        .cl-page{padding:20px 24px 24px;}
        .cl-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
        .cl-title{font-size:16px;font-weight:600;color:#0a1410;}
        .cl-add-btn{display:flex;align-items:center;gap:6px;background:#0E5C42;border:none;border-radius:10px;padding:8px 16px;font-size:13px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit;}
        .cl-filters{display:flex;gap:8px;margin-bottom:14px;align-items:center;flex-wrap:wrap;}
        .cl-sel{padding:8px 12px;border:1px solid #d8e4dc;border-radius:9px;font-size:13px;background:#fff;outline:none;cursor:pointer;font-family:inherit;color:#333;}
        .cl-search{position:relative;flex:1;min-width:200px;}
        .cl-search-ico{position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none;}
        .cl-search-inp{width:100%;padding:8px 12px 8px 32px;border:1px solid #d8e4dc;border-radius:9px;font-size:13px;background:#fff;outline:none;font-family:inherit;color:#0a1410;box-sizing:border-box;}
        .cl-search-inp::placeholder{color:#aabab2;}

        /* table */
        .tbl-wrap{background:#fff;border-radius:14px;border:1px solid #e4ede8;overflow:hidden;}
        .tbl{width:100%;border-collapse:collapse;}
        .th{padding:10px 16px;font-size:10px;font-weight:600;color:#7a8a82;text-align:left;background:#f7fbf9;border-bottom:1px solid #e4ede8;text-transform:uppercase;letter-spacing:0.5px;}
        .th:first-child{padding-left:20px;}
        .td{padding:12px 16px;border-bottom:1px solid #f0f4f1;vertical-align:middle;font-size:13px;color:#333;}
        .td:first-child{padding-left:20px;}
        tr:last-child .td{border-bottom:none;}
        .client-cell{display:flex;align-items:center;gap:10px;}
        .av{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;}
        .cname{font-size:13px;font-weight:500;color:#0a1410;}
        .cdate{font-size:11px;color:#aabab2;margin-top:1px;}
        .yr-badge{font-size:11px;font-weight:500;color:#0E5C42;background:#e8f5f0;border-radius:5px;padding:2px 8px;display:inline-block;}
        .sp{display:inline-flex;align-items:center;gap:4px;background:#fffbeb;color:#b45309;border:1px solid #fde68a;border-radius:20px;padding:2px 9px;font-size:11px;font-weight:600;}
        .sd{display:inline-flex;align-items:center;gap:4px;background:#ecfdf5;color:#059669;border:1px solid #a7f3d0;border-radius:20px;padding:2px 9px;font-size:11px;font-weight:600;}
        .sdot{width:5px;height:5px;border-radius:50%;}
        .act-open{padding:5px 10px;background:#f0f4f1;border:1px solid #d8e4dc;border-radius:7px;font-size:11px;font-weight:600;color:#333;cursor:pointer;font-family:inherit;margin-right:5px;}
        .act-del{padding:5px 10px;background:#fff;border:1px solid #fca5a5;border-radius:7px;font-size:11px;font-weight:600;color:#c0392b;cursor:pointer;font-family:inherit;}
        .tbl-empty{padding:50px;text-align:center;color:#aabab2;font-size:14px;}

        /* modal */
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:999;}
        .modal{background:#fff;border-radius:20px;padding:28px;width:100%;max-width:400px;box-shadow:0 20px 60px rgba(0,0,0,0.18);}
        .modal-title{font-size:17px;font-weight:600;color:#0a1410;margin-bottom:5px;}
        .modal-sub{font-size:13px;color:#7a8a82;margin-bottom:20px;}
        .mfield{display:flex;flex-direction:column;gap:4px;margin-bottom:12px;}
        .mlabel{font-size:12px;font-weight:500;color:#555;}
        .minput{border:1.5px solid #e4ede8;border-radius:10px;padding:10px 13px;font-size:13px;font-family:inherit;background:#f7fbf9;color:#0a1410;outline:none;}
        .minput:focus{border-color:#0E5C42;background:#edf7f2;}
        .mfooter{display:flex;gap:8px;margin-top:4px;}
        .mcancel{flex:1;padding:10px;border:1px solid #e4ede8;border-radius:10px;font-size:13px;font-weight:500;cursor:pointer;background:#fff;font-family:inherit;color:#333;}
        .msave{flex:2;padding:10px;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;background:#0E5C42;color:#fff;font-family:inherit;}
        .msave:disabled{opacity:0.5;cursor:not-allowed;}
        .mdel{flex:2;padding:10px;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;background:#c0392b;color:#fff;font-family:inherit;}
        .del-modal-icon{font-size:32px;text-align:center;margin-bottom:10px;}
      `}</style>

      <div className="wrap">
        {/* Topbar */}
        <div className="topbar">
          <div className="tb-left">
            <div className="tb-logo">
              <div className="tb-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
                  <path d="M12 12L2 7M12 12l10-5M12 12v10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="tb-title">WHV Tax CRM</span>
            </div>
            <div className="tb-nav">
              <button className={`tb-nav-btn ${view==='dashboard'?'on':'off'}`} onClick={()=>setView('dashboard')}>Dashboard</button>
              <button className={`tb-nav-btn ${view==='clients'?'on':'off'}`} onClick={()=>setView('clients')}>Clients</button>
            </div>
          </div>
          <div className="tb-right">
            <span className="tb-count">{clients.length} clients</span>
            <button className="tb-lock" onClick={lockAndExit}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="11" rx="2.5" stroke="white" strokeWidth="1.8"/>
                <path d="M8 11V7.5a4 4 0 018 0V11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Lock &amp; Exit
            </button>
          </div>
        </div>

        {/* Dashboard View */}
        {view === 'dashboard' && (
          <div className="db-page">
            <div className="db-pending-hdr">
              📋 Pending tasks — {allPending.length} client{allPending.length!==1?'s':''} awaiting action
            </div>
            {tasks.length === 0 ? (
              <div className="db-empty-tasks">🎉 All done — no pending tasks!</div>
            ) : (
              <div className="db-task-list">
                {tasks.map(t => (
                  <div key={t.id} className="db-task">
                    <div className="db-task-dot"/>
                    <div className="db-task-body">
                      <div className="db-task-name">{t.client}</div>
                      <div className="db-task-desc">{t.desc}</div>
                    </div>
                    <div className="db-task-date">{t.date}</div>
                    <button className="db-task-open" onClick={()=>router.push(`/crm/client/${t.id}`)}>Open file →</button>
                  </div>
                ))}
              </div>
            )}

            {allCompleted.length > 0 && (
              <>
                <div className="db-pending-hdr" style={{color:'#059669'}}>✓ Completed — {allCompleted.length}</div>
                <div className="db-task-list">
                  {allCompleted.map(c => (
                    <div key={c.id} className="db-task" style={{opacity:0.6}}>
                      <div className="db-task-dot done"/>
                      <div className="db-task-body">
                        <div className="db-task-name">{c.fullName}</div>
                        <div className="db-task-desc">Tax return completed — {c.taxYear}</div>
                      </div>
                      <div className="db-task-date">{fmtDate(c.submittedAt)}</div>
                      <button className="db-task-open" onClick={()=>router.push(`/crm/client/${c.id}`)}>Open file →</button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Clients View */}
        {view === 'clients' && (
          <div className="cl-page">
            <div className="cl-hdr">
              <span className="cl-title">All Clients</span>
              <button className="cl-add-btn" onClick={()=>setShowAddModal(true)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                + Add Client
              </button>
            </div>

            <div className="cl-filters">
              <select className="cl-sel" value={yearFilter} onChange={e=>setYearFilter(e.target.value as TaxYear|'all')}>
                <option value="all">All Years</option>
                {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
              </select>
              <select className="cl-sel" value={statusFilter} onChange={e=>setStatusFilter(e.target.value as StatusFilter)}>
                <option value="all">All Clients</option>
                <option value="pending">Pending</option>
                <option value="handled">Completed</option>
              </select>
              <div className="cl-search">
                <svg className="cl-search-ico" width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#aabab2" strokeWidth="1.8"/>
                  <path d="M21 21l-4.35-4.35" stroke="#aabab2" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <input className="cl-search-inp" placeholder="Search by name, country or email…" value={search} onChange={e=>setSearch(e.target.value)}/>
              </div>
            </div>

            <div className="tbl-wrap">
              {loading ? (
                <div className="tbl-empty">Loading…</div>
              ) : visible.length === 0 ? (
                <div className="tbl-empty">No clients found.</div>
              ) : (
                <table className="tbl">
                  <thead>
                    <tr>
                      <th className="th">Client</th>
                      <th className="th">Country</th>
                      <th className="th">Tax Year</th>
                      <th className="th">WhatsApp</th>
                      <th className="th">Email</th>
                      <th className="th">Status</th>
                      <th className="th">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map(c => {
                      const [bg, fg] = avatarColor(c.fullName)
                      return (
                        <tr key={c.id}>
                          <td className="td">
                            <div className="client-cell">
                              <div className="av" style={{background:bg,color:fg}}>{initials(c.fullName)}</div>
                              <div>
                                <div className="cname">{c.fullName}</div>
                                <div className="cdate">{fmtDate(c.submittedAt)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="td">{c.country||'—'}</td>
                          <td className="td"><span className="yr-badge">{c.taxYear}</span></td>
                          <td className="td" style={{direction:'ltr',fontSize:12}}>{c.whatsapp||'—'}</td>
                          <td className="td" style={{fontSize:12,color:'#555'}}>{c.email||'—'}</td>
                          <td className="td">
                            {c.handled
                              ? <span className="sd"><span className="sdot" style={{background:'#059669'}}/>Completed</span>
                              : <span className="sp"><span className="sdot" style={{background:'#d97706'}}/>Pending</span>
                            }
                          </td>
                          <td className="td">
                            <button className="act-open" onClick={()=>router.push(`/crm/client/${c.id}`)}>Open file</button>
                            <button className="act-del" onClick={()=>setShowDeleteId(c.id)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="overlay" onClick={e=>{ if(e.target===e.currentTarget) setShowAddModal(false) }}>
          <div className="modal">
            <div className="modal-title">Add new client</div>
            <div className="modal-sub">Manually add a client to the CRM</div>
            <form onSubmit={addClient}>
              <div className="mfield"><label className="mlabel">Full name *</label>
                <input className="minput" placeholder="e.g. Sophie Lambert" required value={newClient.fullName} onChange={e=>setNewClient({...newClient,fullName:e.target.value})}/>
              </div>
              <div className="mfield"><label className="mlabel">Email</label>
                <input className="minput" placeholder="sophie@email.com" type="email" value={newClient.email} onChange={e=>setNewClient({...newClient,email:e.target.value})} style={{direction:'ltr'}}/>
              </div>
              <div className="mfield"><label className="mlabel">WhatsApp</label>
                <input className="minput" placeholder="+33612345678" value={newClient.whatsapp} onChange={e=>setNewClient({...newClient,whatsapp:e.target.value})} style={{direction:'ltr'}}/>
              </div>
              <div className="mfield"><label className="mlabel">Country</label>
                <input className="minput" placeholder="e.g. France" value={newClient.country} onChange={e=>setNewClient({...newClient,country:e.target.value})}/>
              </div>
              <div className="mfield"><label className="mlabel">Tax year</label>
                <select className="minput" value={newClient.taxYear} onChange={e=>setNewClient({...newClient,taxYear:e.target.value as TaxYear})}>
                  {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="mfooter">
                <button type="button" className="mcancel" onClick={()=>setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="msave" disabled={addingSaving||!newClient.fullName}>{addingSaving?'Adding…':'Add client'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteId && (
        <div className="overlay" onClick={e=>{ if(e.target===e.currentTarget) setShowDeleteId(null) }}>
          <div className="modal" style={{maxWidth:340,textAlign:'center'}}>
            <div className="del-modal-icon">🗑️</div>
            <div className="modal-title">Delete client?</div>
            <div className="modal-sub" style={{marginBottom:20}}>This will permanently remove this client and all their details from the CRM.</div>
            <div className="mfooter">
              <button className="mcancel" onClick={()=>setShowDeleteId(null)}>Cancel</button>
              <button className="mdel" onClick={()=>deleteClient(showDeleteId)}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
