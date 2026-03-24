'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type TaxYear = '2019-20'|'2020-21'|'2021-22'|'2022-23'|'2023-24'|'2024-25'
type StatusFilter = 'all'|'pending'|'handled'
type Client = {
  id:string; fullName:string; dob:string; whatsapp:string
  email:string; country:string; taxYear:TaxYear; submittedAt:string; handled:boolean
}

const TAX_YEARS:TaxYear[] = ['2024-25','2023-24','2022-23','2021-22','2020-21','2019-20']
const FLAGS:Record<string,string> = {
  France:'🇫🇷',Italy:'🇮🇹',Germany:'🇩🇪',UK:'🇬🇧',Ireland:'🇮🇪',Spain:'🇪🇸',
  Netherlands:'🇳🇱',Belgium:'🇧🇪',Denmark:'🇩🇰',Sweden:'🇸🇪',Norway:'🇳🇴',
  Canada:'🇨🇦',Taiwan:'🇹🇼',Japan:'🇯🇵','South Korea':'🇰🇷','Hong Kong':'🇭🇰',
}

export default function DashboardClient() {
  const router = useRouter()
  const [clients, setClients]           = useState<Client[]>([])
  const [loading, setLoading]           = useState(true)
  const [yearFilter, setYearFilter]     = useState<TaxYear|'all'>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [search, setSearch]             = useState('')
  const [markingId, setMarkingId]       = useState<string|null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newClient, setNewClient]       = useState({ fullName:'', whatsapp:'', country:'', taxYear:'2023-24' as TaxYear })
  const [addingSaving, setAddingSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/crm/clients?showHandled=true')
    const data = await res.json()
    if (data.ok) setClients(data.clients)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function markHandled(id:string) {
    setMarkingId(id)
    await fetch(`/api/crm/clients/${id}`,{
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({action:'handle'}),
    })
    await load()
    setMarkingId(null)
  }

  async function addClient(e:React.FormEvent) {
    e.preventDefault()
    setAddingSaving(true)
    await fetch('/api/crm/clients',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        ...newClient,
        email:'', address:'', tfn:'', bankDetails:'', primaryJob:'',
        marital:'', taxStatus:'Working Holiday Maker', howHeard:'', auPhone:'',
        submittedAt: new Date().toISOString(),
        files:{bankStatement:null,selfiePassport:null,invoices:null},
      }),
    })
    setNewClient({fullName:'',whatsapp:'',country:'',taxYear:'2023-24'})
    setShowAddModal(false)
    setAddingSaving(false)
    await load()
  }

  async function lockAndExit() {
    await fetch('/api/crm/logout',{method:'POST'})
    window.location.replace('/crm')
  }

  const allPending   = clients.filter(c => !c.handled)
  const allCompleted = clients.filter(c =>  c.handled)
  const taxYearsUsed = [...new Set(clients.map(c => c.taxYear))].length

  const visible = clients
    .filter(c => yearFilter === 'all' || c.taxYear === yearFilter)
    .filter(c => statusFilter === 'all' ? true : statusFilter === 'pending' ? !c.handled : c.handled)
    .filter(c => !search || c.fullName.toLowerCase().includes(search.toLowerCase()) || c.country?.toLowerCase().includes(search.toLowerCase()))

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
    const i = name.charCodeAt(0) % AVATAR_COLORS.length
    return AVATAR_COLORS[i]
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',system-ui,sans-serif;background:#f0f4f1;}
        .db-wrap{min-height:100vh;background:#f0f4f1;font-family:'DM Sans',system-ui,sans-serif;}
        .db-topbar{background:#0E5C42;padding:0 24px;height:58px;display:flex;align-items:center;justify-content:space-between;}
        .db-topbar-left{display:flex;align-items:center;gap:12px;}
        .db-topbar-icon{width:34px;height:34px;border-radius:9px;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;}
        .db-topbar-title{font-size:16px;font-weight:600;color:#fff;letter-spacing:-0.2px;}
        .db-topbar-right{display:flex;align-items:center;gap:10px;}
        .db-pending-badge{background:#f59e0b;color:#78350f;border-radius:20px;padding:4px 12px;font-size:12px;font-weight:600;}
        .db-lock-btn{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:10px;padding:7px 14px;font-size:13px;font-weight:500;color:#fff;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;}
        .db-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:20px 24px 0;}
        .db-stat{background:#fff;border-radius:14px;padding:18px 20px;border:1px solid #e4ede8;}
        .db-stat-num{font-size:28px;font-weight:600;color:#0a1410;letter-spacing:-0.5px;margin-bottom:4px;}
        .db-stat-num.amber{color:#d97706;}
        .db-stat-num.green{color:#0E5C42;}
        .db-stat-label{font-size:12px;color:#7a8a82;}
        .db-section-hdr{padding:20px 24px 12px;display:flex;align-items:center;justify-content:space-between;}
        .db-section-title{font-size:17px;font-weight:600;color:#0a1410;letter-spacing:-0.2px;}
        .db-add-btn{display:flex;align-items:center;gap:7px;background:#0E5C42;border:none;border-radius:11px;padding:9px 16px;font-size:13px;font-weight:600;color:#fff;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;}
        .db-filters{padding:0 24px 16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;}
        .db-sel{padding:9px 14px;border:1px solid #d8e4dc;border-radius:10px;font-size:13px;background:#fff;outline:none;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;color:#333;}
        .db-search-wrap{position:relative;flex:1;min-width:180px;}
        .db-search-ico{position:absolute;left:11px;top:50%;transform:translateY(-50%);pointer-events:none;}
        .db-search-inp{width:100%;padding:9px 12px 9px 34px;border:1px solid #d8e4dc;border-radius:10px;font-size:13px;background:#fff;outline:none;font-family:'DM Sans',system-ui,sans-serif;color:#0a1410;box-sizing:border-box;}
        .db-table-wrap{padding:0 24px 24px;}
        .db-table{width:100%;border-collapse:separate;border-spacing:0;background:#fff;border-radius:16px;border:1px solid #e4ede8;overflow:hidden;}
        .db-th{padding:11px 16px;font-size:11px;font-weight:600;color:#7a8a82;text-align:left;background:#f7fbf9;border-bottom:1px solid #e4ede8;text-transform:uppercase;letter-spacing:0.5px;}
        .db-th:first-child{padding-left:20px;}
        .db-td{padding:13px 16px;border-bottom:1px solid #f0f4f1;vertical-align:middle;}
        .db-td:last-child{border-bottom:none;}
        .db-tr:last-child .db-td{border-bottom:none;}
        .db-client-cell{display:flex;align-items:center;gap:11px;}
        .db-av{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;}
        .db-cname{font-size:13px;font-weight:500;color:#0a1410;}
        .db-cdate{font-size:11px;color:#aabab2;margin-top:1px;}
        .db-year{font-size:12px;font-weight:500;color:#0E5C42;background:#e8f5f0;border-radius:6px;padding:3px 8px;display:inline-block;}
        .db-status-p{display:inline-flex;align-items:center;gap:5px;background:#fffbeb;color:#b45309;border:1px solid #fde68a;border-radius:20px;padding:3px 10px;font-size:11px;font-weight:600;}
        .db-status-d{display:inline-flex;align-items:center;gap:5px;background:#ecfdf5;color:#059669;border:1px solid #a7f3d0;border-radius:20px;padding:3px 10px;font-size:11px;font-weight:600;}
        .db-status-dot{width:6px;height:6px;border-radius:50%;}
        .db-act-open{padding:6px 12px;background:#f0f4f1;border:1px solid #d8e4dc;border-radius:8px;font-size:11px;font-weight:600;color:#333;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;margin-right:6px;}
        .db-act-done{padding:6px 12px;background:#0E5C42;border:none;border-radius:8px;font-size:11px;font-weight:600;color:#fff;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;}
        .db-act-done:disabled{opacity:0.45;cursor:not-allowed;}
        .db-empty{padding:60px;text-align:center;color:#aabab2;font-size:14px;}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:999;}
        .modal-box{background:#fff;border-radius:22px;padding:32px 28px;width:100%;max-width:400px;}
        .modal-title{font-size:18px;font-weight:600;color:#0a1410;margin-bottom:6px;}
        .modal-sub{font-size:13px;color:#7a8a82;margin-bottom:22px;}
        .modal-field{display:flex;flex-direction:column;gap:5px;margin-bottom:14px;}
        .modal-label{font-size:12px;font-weight:500;color:#555;}
        .modal-input{border:1.5px solid #e4ede8;border-radius:11px;padding:11px 14px;font-size:14px;font-family:'DM Sans',system-ui,sans-serif;background:#f7fbf9;color:#0a1410;outline:none;}
        .modal-input:focus{border-color:#0E5C42;}
        .modal-footer{display:flex;gap:9px;margin-top:6px;}
        .modal-cancel{flex:1;padding:11px;border:1px solid #e4ede8;border-radius:11px;font-size:14px;font-weight:500;cursor:pointer;background:#fff;font-family:'DM Sans',system-ui,sans-serif;color:#333;}
        .modal-save{flex:2;padding:11px;border:none;border-radius:11px;font-size:14px;font-weight:600;cursor:pointer;background:#0E5C42;color:#fff;font-family:'DM Sans',system-ui,sans-serif;}
        .modal-save:disabled{opacity:0.5;cursor:not-allowed;}
      `}</style>

      <div className="db-wrap">
        <div className="db-topbar">
          <div className="db-topbar-left">
            <div className="db-topbar-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M12 12L2 7M12 12l10-5M12 12v10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="db-topbar-title">WHV Tax CRM</span>
          </div>
          <div className="db-topbar-right">
            {allPending.length > 0 && <span className="db-pending-badge">{allPending.length} Pending</span>}
            <button className="db-lock-btn" onClick={lockAndExit}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="11" rx="2.5" stroke="white" strokeWidth="1.8"/>
                <path d="M8 11V7.5a4 4 0 018 0V11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Lock &amp; Exit
            </button>
          </div>
        </div>

        <div className="db-stats">
          <div className="db-stat"><div className="db-stat-num">{clients.length}</div><div className="db-stat-label">Total Clients</div></div>
          <div className="db-stat"><div className="db-stat-num amber">{allPending.length}</div><div className="db-stat-label">Pending Action</div></div>
          <div className="db-stat"><div className="db-stat-num green">{allCompleted.length}</div><div className="db-stat-label">Completed</div></div>
          <div className="db-stat"><div className="db-stat-num">{taxYearsUsed}</div><div className="db-stat-label">Tax Years</div></div>
        </div>

        <div className="db-section-hdr">
          <h1 className="db-section-title">Tax Return Clients</h1>
          <button className="db-add-btn" onClick={()=>setShowAddModal(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            + Add Client
          </button>
        </div>

        <div className="db-filters">
          <select className="db-sel" value={yearFilter} onChange={e=>setYearFilter(e.target.value as TaxYear|'all')}>
            <option value="all">All Years</option>
            {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
          </select>
          <select className="db-sel" value={statusFilter} onChange={e=>setStatusFilter(e.target.value as StatusFilter)}>
            <option value="all">All Clients</option>
            <option value="pending">Pending</option>
            <option value="handled">Completed</option>
          </select>
          <div className="db-search-wrap">
            <svg className="db-search-ico" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#aabab2" strokeWidth="1.8"/>
              <path d="M21 21l-4.35-4.35" stroke="#aabab2" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input className="db-search-inp" placeholder="Search by name..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
        </div>

        <div className="db-table-wrap">
          {loading ? (
            <div className="db-empty">Loading clients…</div>
          ) : visible.length === 0 ? (
            <div className="db-empty">No clients found.</div>
          ) : (
            <table className="db-table">
              <thead>
                <tr>
                  <th className="db-th" style={{paddingLeft:20}}>Client</th>
                  <th className="db-th">Country</th>
                  <th className="db-th">Tax Year</th>
                  <th className="db-th">WhatsApp</th>
                  <th className="db-th">Status</th>
                  <th className="db-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(c => {
                  const [bg, fg] = avatarColor(c.fullName)
                  return (
                    <tr key={c.id} className="db-tr">
                      <td className="db-td" style={{paddingLeft:20}}>
                        <div className="db-client-cell">
                          <div className="db-av" style={{background:bg,color:fg}}>{initials(c.fullName)}</div>
                          <div>
                            <div className="db-cname">{c.fullName}</div>
                            <div className="db-cdate">{fmtDate(c.submittedAt)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="db-td" style={{fontSize:13,color:'#333'}}>{FLAGS[c.country]??'🌍'} {c.country||'—'}</td>
                      <td className="db-td"><span className="db-year">{c.taxYear}</span></td>
                      <td className="db-td" style={{fontSize:12,color:'#333',direction:'ltr'}}>{c.whatsapp||'—'}</td>
                      <td className="db-td">
                        {c.handled
                          ? <span className="db-status-d"><span className="db-status-dot" style={{background:'#059669'}}/>Completed</span>
                          : <span className="db-status-p"><span className="db-status-dot" style={{background:'#d97706'}}/>Pending</span>
                        }
                      </td>
                      <td className="db-td">
                        <button className="db-act-open" onClick={()=>router.push(`/crm/client/${c.id}`)}>Open file</button>
                        {!c.handled && (
                          <button className="db-act-done" disabled={markingId===c.id} onClick={()=>markHandled(c.id)}>
                            {markingId===c.id?'…':'✓ Done'}
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={e=>{ if(e.target===e.currentTarget) setShowAddModal(false) }}>
          <div className="modal-box">
            <div className="modal-title">Add new client</div>
            <div className="modal-sub">Manually add a client to the CRM</div>
            <form onSubmit={addClient}>
              <div className="modal-field">
                <label className="modal-label">Full name *</label>
                <input className="modal-input" placeholder="e.g. Sophie Lambert" required value={newClient.fullName} onChange={e=>setNewClient({...newClient,fullName:e.target.value})}/>
              </div>
              <div className="modal-field">
                <label className="modal-label">WhatsApp</label>
                <input className="modal-input" placeholder="+33612345678" value={newClient.whatsapp} onChange={e=>setNewClient({...newClient,whatsapp:e.target.value})} style={{direction:'ltr'}}/>
              </div>
              <div className="modal-field">
                <label className="modal-label">Country</label>
                <input className="modal-input" placeholder="e.g. France" value={newClient.country} onChange={e=>setNewClient({...newClient,country:e.target.value})}/>
              </div>
              <div className="modal-field">
                <label className="modal-label">Tax year</label>
                <select className="modal-input" value={newClient.taxYear} onChange={e=>setNewClient({...newClient,taxYear:e.target.value as TaxYear})}>
                  {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="modal-cancel" onClick={()=>setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="modal-save" disabled={addingSaving||!newClient.fullName}>
                  {addingSaving?'Adding…':'Add client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
