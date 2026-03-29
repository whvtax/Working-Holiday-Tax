'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type TaskType = 'tax-return'|'super'|'tfn'|'abn'
type TaxReturn     = { year:string; refundAmount:number; type:'refund'|'owed'; completedAt:string }
type SuperReturn   = { year:string; amount:number; completedAt:string }
type ServiceRecord = { done:boolean; completedAt:string; notes:string }
type Task = {
  id:string; clientId:string; clientName:string; taskType:TaskType
  whatsapp:string; email:string; country:string; dob:string; taxYear:string
  submittedAt:string; done:boolean; address:string; tfn:string; bankDetails:string
  primaryJob:string; marital:string; taxStatus:string; howHeard:string; auPhone:string; notes:string
  fileUrls:string[]
}
type Client = {
  id:string; fullName:string; dob:string; whatsapp:string; email:string
  country:string; howHeard:string; notes:string; createdAt:string
  taxReturns:TaxReturn[]; superReturns:SuperReturn[]
  tfnService:ServiceRecord; abnService:ServiceRecord
}
type View = 'tasks'|'clients'|'client-detail'

const CY = new Date().getFullYear()
const TAX_YEARS = Array.from({length:8},(_,i)=>`${CY-1+i}-${String(CY+i).slice(2)}`)
const TASK_LABELS: Record<TaskType,string> = {
  'tax-return':'Tax Return','super':'Super Refund','tfn':'TFN Application','abn':'ABN Application'
}
const TASK_COLORS: Record<TaskType,string> = {
  'tax-return':'#0E5C42','super':'#2563eb','tfn':'#7c3aed','abn':'#c2410c'
}

export default function DashboardClient() {
  const router = useRouter()
  const [view, setView]           = useState<View>('tasks')
  const [taskView, setTaskView]   = useState<'list'|'detail'>('list')
  const [tasks, setTasks]         = useState<Task[]>([])
  const [clients, setClients]     = useState<Client[]>([])
  const [activeTask, setActiveTask] = useState<Task|null>(null)
  const [activeClient, setActiveClient] = useState<Client|null>(null)
  const [taskNotes, setTaskNotes] = useState('')
  const [notesSaved, setNotesSaved] = useState(false)
  const [clientNotes, setClientNotes] = useState('')
  const [clientNotesSaved, setClientNotesSaved] = useState(false)
  const [search, setSearch]       = useState('')
  const [yearFilter, setYearFilter] = useState('all')
  const [loading, setLoading]     = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string|null>(null)
  const [confirmDeleteClient, setConfirmDeleteClient] = useState<string|null>(null)
  // Add forms
  const [showAddTax, setShowAddTax]     = useState(false)
  const [showAddSuper, setShowAddSuper] = useState(false)
  const [newTaxYear, setNewTaxYear]     = useState('')
  const [newTaxAmt, setNewTaxAmt]       = useState('')
  const [newTaxType, setNewTaxType]     = useState<'refund'|'owed'>('refund')
  const [newSuperYear, setNewSuperYear] = useState('')
  const [newSuperAmt, setNewSuperAmt]   = useState('')
  const [newClient, setNewClient]       = useState({fullName:'',whatsapp:'',email:'',country:'',dob:'',taxYear:'2024-25' as string})

  const loadTasks   = useCallback(async()=>{
    try {
      const r=await fetch('/api/crm/tasks')
      if(r.status===401){ window.location.replace('/crm'); return }
      const d=await r.json(); if(d.ok) setTasks(d.tasks)
    } catch(e){ console.error('[loadTasks]',e) }
  },[])
  const loadClients = useCallback(async()=>{
    try {
      const r=await fetch('/api/crm/clients')
      if(r.status===401){ window.location.replace('/crm'); return }
      const d=await r.json(); if(d.ok) setClients(d.clients)
    } catch(e){ console.error('[loadClients]',e) }
  },[])

  useEffect(()=>{ Promise.all([loadTasks(),loadClients()]).finally(()=>setLoading(false)) },[loadTasks,loadClients])

  async function lockAndExit() { await fetch('/api/crm/logout',{method:'POST'}); window.location.replace('/crm') }

  async function markDone(id:string) {
    await fetch(`/api/crm/tasks/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'done'})})
    await loadTasks()
    if(activeTask?.id===id) setActiveTask(prev=>prev?{...prev,done:true}:null)
  }

  async function saveTaskNotes() {
    if(!activeTask) return
    await fetch(`/api/crm/tasks/${activeTask.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'notes',notes:taskNotes})})
    setNotesSaved(true); setTimeout(()=>setNotesSaved(false),2500)
  }

  async function deleteTask(id:string) {
    await fetch(`/api/crm/tasks/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete'})})
    setActiveTask(null); setTaskView('list'); setConfirmDelete(null)
    await Promise.all([loadTasks(),loadClients()])
  }

  async function saveClientNotes() {
    if(!activeClient) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'notes',notes:clientNotes})})
    setClientNotesSaved(true); setTimeout(()=>setClientNotesSaved(false),2500)
  }

  async function addTaxReturn() {
    if(!activeClient||!newTaxYear||!newTaxAmt) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({action:'add-tax',data:{year:newTaxYear,refundAmount:parseFloat(newTaxAmt),type:newTaxType,completedAt:new Date().toISOString()}})})
    setNewTaxYear(''); setNewTaxAmt(''); setNewTaxType('refund'); setShowAddTax(false)
    refreshClient()
  }

  async function removeTaxReturn(year:string) {
    if(!activeClient) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'remove-tax',year})})
    refreshClient()
  }

  async function addSuperReturn() {
    if(!activeClient||!newSuperYear||!newSuperAmt) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({action:'add-super',data:{year:newSuperYear,amount:parseFloat(newSuperAmt),completedAt:new Date().toISOString()}})})
    setNewSuperYear(''); setNewSuperAmt(''); setShowAddSuper(false)
    refreshClient()
  }

  async function removeSuperReturn(year:string) {
    if(!activeClient) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'remove-super',year})})
    refreshClient()
  }

  async function toggleService(service:'tfn'|'abn', current:ServiceRecord) {
    if(!activeClient) return
    const updated = { ...current, done:!current.done, completedAt:!current.done?new Date().toISOString():'' }
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({action:'service',service,data:updated})})
    refreshClient()
  }

  async function refreshClient() {
    if(!activeClient) return
    const r=await fetch(`/api/crm/clients/${activeClient.id}`)
    const d=await r.json()
    if(d.ok){ setActiveClient(d.client); await loadClients() }
  }

  async function deleteClient(id:string) {
    await fetch(`/api/crm/clients/${id}`,{method:'DELETE'})
    setActiveClient(null); setView('clients'); setConfirmDeleteClient(null)
    await loadClients()
  }

  async function addClient(e:React.FormEvent) {
    e.preventDefault()
    // Add as a task for now
    await fetch('/api/crm/tasks',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        clientName:newClient.fullName, taskType:'tax-return',
        whatsapp:newClient.whatsapp, email:newClient.email, country:newClient.country,
        dob:newClient.dob, taxYear:newClient.taxYear, submittedAt:new Date().toISOString(),
        address:'',tfn:'',bankDetails:'',primaryJob:'',marital:'',taxStatus:'Working Holiday Maker',
        howHeard:'',auPhone:'',notes:'',fileUrls:[],
      })})
    setNewClient({fullName:'',whatsapp:'',email:'',country:'',dob:'',taxYear:'2024-25'})
    setShowAddModal(false); await loadTasks()
  }

  const fmtDate   = (iso:string) => iso ? new Date(iso).toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'}) : '—'
  const fmtCur    = (n:number)   => new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(n)
  const initials  = (name:string) => name.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase()
  const avatarColors = [['#e8f5f0','#0E5C42'],['#eef3fb','#2563eb'],['#fef3e8','#c2410c'],['#f3eefe','#7c3aed'],['#fef0f0','#dc2626'],['#f0fdf4','#16a34a']]
  const avColor   = (name:string) => avatarColors[name.charCodeAt(0)%avatarColors.length]

  const pendingTasks = tasks.filter(t=>!t.done)
  const doneTasks    = tasks.filter(t=>t.done)
  const visibleClients = clients.filter(c=>{
    const ms = !search || c.fullName.toLowerCase().includes(search.toLowerCase()) || c.email?.includes(search) || c.whatsapp?.includes(search)
    const my = yearFilter==='all' || c.taxReturns.some(r=>r.year===yearFilter) || c.superReturns.some(r=>r.year===yearFilter)
    return ms && my
  })
  const howHeardStats = clients.reduce((acc:Record<string,number>,c)=>{ const k=c.howHeard||'Unknown'; acc[k]=(acc[k]||0)+1; return acc },{})

  const S: Record<string,React.CSSProperties> = {
    shell:{display:'flex',minHeight:'100vh',fontFamily:'"DM Sans",system-ui,sans-serif'},
    sb:{width:212,background:'#0E5C42',display:'flex',flexDirection:'column',justifyContent:'space-between',flexShrink:0,position:'sticky',top:0,height:'100vh'},
    sbLogo:{display:'flex',alignItems:'center',gap:10,padding:'18px 14px 14px'},
    sbIcon:{width:34,height:34,borderRadius:9,background:'rgba(255,255,255,0.14)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0},
    sbTitle:{fontSize:13,fontWeight:600,color:'#fff'},
    sbSub:{fontSize:10,color:'rgba(255,255,255,0.38)',marginTop:1},
    sbDiv:{height:1,background:'rgba(255,255,255,0.1)',margin:'0 12px 8px'},
    sbNav:{display:'flex',flexDirection:'column',gap:2,padding:'0 7px'},
    sbBtn:{display:'flex',alignItems:'center',gap:9,padding:'9px 11px',borderRadius:8,fontSize:12,fontWeight:500,color:'rgba(255,255,255,0.5)',cursor:'pointer',border:'none',background:'none',fontFamily:'inherit',width:'100%',transition:'all 0.15s'},
    sbBtnOn:{background:'rgba(255,255,255,0.16)',color:'#fff',fontWeight:600},
    sbBadge:{marginLeft:'auto',background:'#f59e0b',color:'#78350f',borderRadius:20,padding:'1px 6px',fontSize:10,fontWeight:700},
    sbLock:{display:'flex',alignItems:'center',gap:7,padding:'9px 11px 16px',fontSize:11,color:'rgba(255,255,255,0.4)',cursor:'pointer',border:'none',background:'none',fontFamily:'inherit',width:'100%'},
    main:{flex:1,background:'#f0f4f1',overflowY:'auto'},
    page:{padding:'26px 26px 32px'},
    pgTitle:{fontSize:19,fontWeight:600,color:'#0a1410',marginBottom:2,letterSpacing:'-0.3px'},
    pgSub:{fontSize:12,color:'#7a8a82',marginBottom:18},
    card:{background:'#fff',borderRadius:13,border:'1px solid #e4ede8'},
    secHead:{fontSize:11,fontWeight:700,color:'#0E5C42',padding:'10px 16px',background:'#f7fbf9',borderBottom:'1px solid #edf3ef',borderRadius:'13px 13px 0 0',display:'flex',alignItems:'center',justifyContent:'space-between'},
    row:{display:'flex',padding:'8px 16px',borderBottom:'1px solid #f8f8f8',gap:10,alignItems:'center'},
    lbl:{fontSize:11,color:'#aabab2',fontWeight:500,minWidth:110,flexShrink:0},
    val:{fontSize:12,color:'#0a1410',flex:1},
    taskCard:{background:'#fff',borderRadius:12,padding:'12px 14px',border:'1px solid #e4ede8',display:'flex',alignItems:'center',gap:11,cursor:'pointer',transition:'border-color 0.15s,box-shadow 0.15s',marginBottom:6},
    returnRow:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 13px',background:'#f7fbf9',borderRadius:9,marginBottom:6,border:'1px solid #e4ede8'},
    totalRow:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 13px',background:'#e8f5f0',borderRadius:9,border:'1px solid #b0d8c8'},
    addForm:{background:'#f7fbf9',borderRadius:10,padding:'12px',border:'1px solid #e4ede8',marginTop:8,display:'flex',gap:8,alignItems:'flex-end',flexWrap:'wrap' as const},
    addBtn:{display:'flex',alignItems:'center',gap:5,padding:'5px 11px',background:'#0E5C42',border:'none',borderRadius:7,fontSize:11,fontWeight:600,color:'#fff',cursor:'pointer',fontFamily:'inherit'},
    backBtn:{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',fontSize:12,color:'#0E5C42',cursor:'pointer',fontFamily:'inherit',fontWeight:500,marginBottom:18,padding:0},
    checkRow:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px'},
    checkbox:{width:20,height:20,borderRadius:6,border:'2px solid',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0},
    overlay:{position:'fixed' as const,inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:999},
    modal:{background:'#fff',borderRadius:20,padding:'28px',width:'100%',maxWidth:400},
    mTitle:{fontSize:17,fontWeight:600,color:'#0a1410',marginBottom:5},
    mSub:{fontSize:13,color:'#7a8a82',marginBottom:18},
    mInput:{border:'1.5px solid #e4ede8',borderRadius:10,padding:'10px 12px',fontSize:13,fontFamily:'inherit',background:'#f7fbf9',color:'#0a1410',outline:'none',width:'100%',boxSizing:'border-box' as const},
    mFooter:{display:'flex',gap:8,marginTop:12},
    mCancel:{flex:1,padding:10,border:'1px solid #e4ede8',borderRadius:10,fontSize:13,cursor:'pointer',background:'#fff',fontFamily:'inherit',color:'#333'},
    mSave:{flex:2,padding:10,border:'none',borderRadius:10,fontSize:13,fontWeight:600,cursor:'pointer',background:'#0E5C42',color:'#fff',fontFamily:'inherit'},
    mDel:{flex:2,padding:10,border:'none',borderRadius:10,fontSize:13,fontWeight:600,cursor:'pointer',background:'#c0392b',color:'#fff',fontFamily:'inherit'},
  }

  const SbButton = ({v,label,icon,badge}:{v:View,label:string,icon:React.ReactNode,badge?:number})=>(
    <button style={{...S.sbBtn,...(view===v?S.sbBtnOn:{})}} onClick={()=>{setView(v);setTaskView('list');setActiveTask(null);setActiveClient(null)}}>
      {icon}{label}
      {badge!=null && badge>0 && <span style={S.sbBadge}>{badge}</span>}
    </button>
  )

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} body{background:#f0f4f1;font-family:"DM Sans",system-ui,sans-serif;}`}</style>

      <div style={S.shell}>
        {/* Sidebar */}
        <aside style={S.sb}>
          <div>
            <div style={S.sbLogo}>
              <div style={S.sbIcon}><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 12L2 7M12 12l10-5M12 12v10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg></div>
              <div><div style={S.sbTitle}>WHV Tax CRM</div><div style={S.sbSub}>Admin Portal</div></div>
            </div>
            <div style={S.sbDiv}/>
            <nav style={S.sbNav}>
              <SbButton v="tasks" label="Tasks" badge={pendingTasks.length}
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg>}/>
              <SbButton v="clients" label="Clients"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}/>
            </nav>
          </div>
          <button style={S.sbLock} onClick={lockAndExit}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="M8 11V7.5a4 4 0 018 0V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            Lock &amp; Exit
          </button>
        </aside>

        <main style={S.main}>

          {/* ── TASK LIST ── */}
          {view==='tasks' && taskView==='list' && (
            <div style={S.page}>
              <div style={S.pgTitle}>Tasks</div>
              <div style={S.pgSub}>Tax return submissions awaiting processing</div>

              {pendingTasks.length>0 && <>
                <div style={{fontSize:11,fontWeight:600,color:'#7a8a82',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
                  <span style={{color:'#d97706',fontSize:8}}>●</span> Pending — {pendingTasks.length}
                </div>
                {pendingTasks.map(t=>(
                  <div key={t.id} style={{...S.taskCard}} onClick={()=>{setActiveTask(t);setTaskNotes(t.notes);setTaskView('detail')}}>
                    <div style={{width:9,height:9,borderRadius:'50%',background:'#f59e0b',flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:500,color:'#0a1410',marginBottom:2}}>{t.clientName}</div>
                      <div style={{fontSize:11,color:'#7a8a82'}}>{t.country} · <span style={{background:TASK_COLORS[t.taskType]+'22',color:TASK_COLORS[t.taskType],borderRadius:5,padding:'1px 6px',fontSize:10,fontWeight:700}}>{TASK_LABELS[t.taskType]}</span></div>
                    </div>
                    <div style={{fontSize:11,color:'#aabab2'}}>{fmtDate(t.submittedAt)}</div>
                  </div>
                ))}
              </>}

              {doneTasks.length>0 && <>
                <div style={{fontSize:11,fontWeight:600,color:'#7a8a82',textTransform:'uppercase',letterSpacing:'0.5px',margin:'14px 0 8px',display:'flex',alignItems:'center',gap:6}}>
                  <span style={{color:'#059669',fontSize:8}}>●</span> Done — {doneTasks.length}
                </div>
                {doneTasks.map(t=>(
                  <div key={t.id} style={{...S.taskCard,opacity:0.65}} onClick={()=>{setActiveTask(t);setTaskNotes(t.notes);setTaskView('detail')}}>
                    <div style={{width:9,height:9,borderRadius:'50%',background:'#059669',flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:500,color:'#0a1410',marginBottom:2}}>{t.clientName}</div>
                      <div style={{fontSize:11,color:'#7a8a82'}}>{t.country} · <span style={{background:TASK_COLORS[t.taskType]+'22',color:TASK_COLORS[t.taskType],borderRadius:5,padding:'1px 6px',fontSize:10,fontWeight:700}}>{TASK_LABELS[t.taskType]}</span></div>
                    </div>
                    <div style={{fontSize:11,color:'#aabab2',marginRight:8}}>{fmtDate(t.submittedAt)}</div>
                    <button onClick={e=>{e.stopPropagation();setConfirmDelete(t.id)}} style={{padding:'4px 10px',background:'#fff',border:'1px solid #fca5a5',borderRadius:7,fontSize:11,fontWeight:600,color:'#c0392b',cursor:'pointer',fontFamily:'inherit'}}>Delete</button>
                  </div>
                ))}
              </>}

              {tasks.length===0 && <div style={{background:'#fff',borderRadius:13,padding:48,textAlign:'center',color:'#aabab2',fontSize:14,border:'1px solid #e4ede8'}}>No tasks yet.</div>}
            </div>
          )}

          {/* ── TASK DETAIL ── */}
          {view==='tasks' && taskView==='detail' && activeTask && (
            <div style={S.page}>
              <button style={S.backBtn} onClick={()=>setTaskView('list')}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Back to Tasks
              </button>

              {/* Header */}
              <div style={{...S.card,padding:'18px 20px',marginBottom:14,display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:50,height:50,borderRadius:14,background:TASK_COLORS[activeTask.taskType],color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,flexShrink:0}}>{initials(activeTask.clientName)}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:18,fontWeight:600,color:'#0a1410',letterSpacing:'-0.2px'}}>{activeTask.clientName}</div>
                  <div style={{fontSize:12,color:'#7a8a82',marginTop:3,display:'flex',alignItems:'center',gap:8}}>
                    <span>{activeTask.country}</span>
                    <span style={{background:TASK_COLORS[activeTask.taskType]+'22',color:TASK_COLORS[activeTask.taskType],borderRadius:5,padding:'1px 8px',fontSize:11,fontWeight:700}}>{TASK_LABELS[activeTask.taskType]}</span>
                    <span>{activeTask.taxYear}</span>
                    <span>· Submitted {fmtDate(activeTask.submittedAt)}</span>
                  </div>
                </div>
                {activeTask.done
                  ? <span style={{background:'#ecfdf5',color:'#059669',border:'1px solid #a7f3d0',borderRadius:8,padding:'4px 12px',fontSize:12,fontWeight:600}}>✓ Done</span>
                  : <span style={{background:'#fffbeb',color:'#b45309',border:'1px solid #fde68a',borderRadius:8,padding:'4px 12px',fontSize:12,fontWeight:600}}>⏳ Pending</span>
                }
              </div>

              {/* 4 sections */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
                <div style={S.card}>
                  <div style={S.secHead}><span>Personal details</span></div>
                  {[['Full name',activeTask.clientName],['Date of birth',activeTask.dob],['Country',activeTask.country],['Marital',activeTask.marital]].map(([l,v])=>(
                    <div key={l} style={S.row}><span style={S.lbl}>{l}</span><span style={S.val}>{v||'—'}</span></div>
                  ))}
                </div>
                <div style={S.card}>
                  <div style={S.secHead}><span>Contact details</span></div>
                  {[['WhatsApp',activeTask.whatsapp],['AU Phone',activeTask.auPhone],['Email',activeTask.email],['Address',activeTask.address]].map(([l,v])=>(
                    <div key={l} style={S.row}><span style={S.lbl}>{l}</span><span style={{...S.val,direction:'ltr',textAlign:'right'}}>{v||'—'}</span></div>
                  ))}
                </div>
                <div style={S.card}>
                  <div style={S.secHead}><span>Tax & employment</span></div>
                  {[['TFN 🔒',activeTask.tfn],['Bank 🔒',activeTask.bankDetails],['Employer',activeTask.primaryJob],['Tax status',activeTask.taxStatus]].map(([l,v])=>(
                    <div key={l} style={S.row}><span style={S.lbl}>{l}</span><span style={{...S.val,direction:'ltr',textAlign:'right'}}>{v||'—'}</span></div>
                  ))}
                </div>
                <div style={S.card}>
                  <div style={S.secHead}><span>Documents uploaded</span></div>
                  {(activeTask.fileUrls ?? []).length === 0 ? (
                    <div style={{fontSize:12,color:'#aabab2',padding:'8px 0'}}>No files uploaded</div>
                  ) : (activeTask.fileUrls ?? []).map((url, i) => {
                    const rawName = url.split('/').pop() ?? `file-${i+1}`
                    let name = rawName
                    try { name = decodeURIComponent(rawName) } catch { name = rawName }
                    name = name.replace(/^\d+_/, '').replace(/[/\\<>:"'|?*]/g, '_').slice(0, 100)
                    const isPdf = url.toLowerCase().endsWith('.pdf')
                    return (
                      <div key={url} style={{...S.row,justifyContent:'space-between',alignItems:'center'}}>
                        <span style={{fontSize:12,color:'#0a1410',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'60%'}}>{isPdf ? '📄' : '🖼️'} {name}</span>
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:'#0E5C42',background:'#eaf6f1',border:'1px solid #c8eadf',borderRadius:6,padding:'2px 9px',textDecoration:'none',fontWeight:600,whiteSpace:'nowrap'}}>View ↗</a>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Notes */}
              <div style={{...S.card,padding:'14px 16px',marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:600,color:'#0a1410',marginBottom:8}}>Internal notes</div>
                <textarea style={{width:'100%',border:'1.5px solid #e4ede8',borderRadius:9,padding:'9px 11px',fontSize:12,fontFamily:'inherit',background:'#f7fbf9',color:'#0a1410',outline:'none',resize:'vertical',minHeight:72,lineHeight:1.55,boxSizing:'border-box'}}
                  placeholder="Add notes..." value={taskNotes} onChange={e=>{setTaskNotes(e.target.value);setNotesSaved(false)}}/>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:6}}>
                  {notesSaved?<span style={{fontSize:11,color:'#059669',fontWeight:500}}>✓ Saved</span>:<span/>}
                  <button style={{padding:'5px 13px',border:'none',borderRadius:7,background:'#0E5C42',color:'#fff',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit',opacity:taskNotes===activeTask.notes?0.4:1}} disabled={taskNotes===activeTask.notes} onClick={saveTaskNotes}>Save notes</button>
                </div>
              </div>

              {/* Actions */}
              <div style={{display:'flex',gap:10}}>
                {!activeTask.done && <button style={{flex:1,padding:'12px',border:'none',borderRadius:11,fontSize:14,fontWeight:600,background:'#0E5C42',color:'#fff',cursor:'pointer',fontFamily:'inherit'}} onClick={()=>markDone(activeTask.id)}>✓ Mark as done</button>}
                <button style={{flex:1,padding:'12px',border:'1px solid #fca5a5',borderRadius:11,fontSize:14,fontWeight:600,background:'#fff',color:'#c0392b',cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setConfirmDelete(activeTask.id)}>🗑️ Delete &amp; archive client</button>
              </div>
              <div style={{fontSize:11,color:'#aabab2',textAlign:'center',marginTop:8}}>Deleting removes all sensitive data and creates/updates the client card</div>
            </div>
          )}

          {/* ── CLIENTS LIST ── */}
          {view==='clients' && !activeClient && (
            <div style={S.page}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,gap:12}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={S.pgTitle}>Clients</div>
                  <span style={{background:'#e8f5f0',color:'#0E5C42',borderRadius:20,padding:'3px 11px',fontSize:12,fontWeight:600}}>{visibleClients.length} {yearFilter!=='all'?`in ${yearFilter}`:'total'}</span>
                </div>
                <button style={{...S.addBtn,padding:'8px 14px',fontSize:13}} onClick={()=>setShowAddModal(true)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                  Add Client
                </button>
              </div>

              {/* Filters */}
              <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
                <div style={{position:'relative',flex:2,minWidth:220}}>
                  <svg style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}} width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#aabab2" strokeWidth="1.8"/><path d="M21 21l-4.35-4.35" stroke="#aabab2" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <input style={{width:'100%',padding:'8px 12px 8px 32px',border:'1px solid #d8e4dc',borderRadius:9,fontSize:13,background:'#fff',outline:'none',fontFamily:'inherit',color:'#0a1410',boxSizing:'border-box'}} placeholder="Search by name, WhatsApp or email…" value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
                <select value={yearFilter} onChange={e=>setYearFilter(e.target.value)} style={{padding:'8px 14px',border:'1px solid #d8e4dc',borderRadius:9,fontSize:13,background:'#fff',outline:'none',color:'#333',cursor:'pointer',fontFamily:'inherit',flexShrink:0}}>
                  <option value="all">All tax years</option>
                  {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* How they heard */}
              {clients.length>0 && (
                <div style={{...S.card,padding:'14px 18px',marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:600,color:'#0a1410',marginBottom:10,display:'flex',alignItems:'center',gap:7}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="#0E5C42" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    How clients heard about us
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                    {Object.entries(howHeardStats).sort((a,b)=>b[1]-a[1]).map(([src,cnt])=>(
                      <div key={src} style={{display:'flex',alignItems:'center',gap:7,background:'#f7fbf9',border:'1px solid #e4ede8',borderRadius:8,padding:'6px 12px'}}>
                        <span style={{fontSize:12,fontWeight:500,color:'#0a1410'}}>{src}</span>
                        <span style={{background:'#0E5C42',color:'#fff',borderRadius:20,padding:'1px 7px',fontSize:11,fontWeight:700}}>{cnt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Table */}
              {visibleClients.length===0 ? (
                <div style={{...S.card,padding:48,textAlign:'center',color:'#aabab2',fontSize:14}}>No clients yet.</div>
              ) : (
                <div style={S.card}>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead>
                      <tr>
                        {['Name','Country','Date of birth','WhatsApp','Email',''].map(h=>(
                          <th key={h} style={{padding:'9px 14px',fontSize:10,fontWeight:600,color:'#7a8a82',textAlign:'left',background:'#f7fbf9',borderBottom:'1px solid #e4ede8',textTransform:'uppercase',letterSpacing:'0.4px',...(h===''?{paddingLeft:0}:{})}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleClients.map(cl=>{
                        const [bg,fg]=avColor(cl.fullName)
                        return (
                          <tr key={cl.id} style={{cursor:'pointer'}} onClick={()=>{setActiveClient(cl);setClientNotes(cl.notes||'');setView('clients')}}>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1'}}>
                              <div style={{display:'flex',alignItems:'center',gap:9}}>
                                <div style={{width:32,height:32,borderRadius:9,background:bg,color:fg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flexShrink:0}}>{initials(cl.fullName)}</div>
                                <div style={{fontSize:12,fontWeight:500,color:'#0a1410'}}>{cl.fullName}</div>
                              </div>
                            </td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:12,color:'#333'}}>{cl.country||'—'}</td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:12,color:'#555'}}>{cl.dob||'—'}</td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:11,color:'#333',direction:'ltr'}}>{cl.whatsapp||'—'}</td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:11,color:'#555'}}>{cl.email||'—'}</td>
                            <td style={{padding:'11px 10px',borderBottom:'1px solid #f0f4f1'}}>
                              <button style={{padding:'4px 10px',background:'#f0f4f1',border:'1px solid #d8e4dc',borderRadius:7,fontSize:11,fontWeight:600,color:'#333',cursor:'pointer',fontFamily:'inherit'}} onClick={e=>{e.stopPropagation();setActiveClient(cl);setClientNotes(cl.notes||'')}}>View →</button>
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
          {view==='clients' && activeClient && (
            <div style={S.page}>
              <button style={S.backBtn} onClick={()=>setActiveClient(null)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Back to Clients
              </button>

              {/* Profile */}
              <div style={{...S.card,padding:'18px 20px',marginBottom:14}}>
                <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:14}}>
                  <div style={{width:50,height:50,borderRadius:14,background:'linear-gradient(135deg,#0E5C42,#1a9a6a)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,fontWeight:700,flexShrink:0}}>{initials(activeClient.fullName)}</div>
                  <div>
                    <div style={{fontSize:18,fontWeight:600,color:'#0a1410',letterSpacing:'-0.2px'}}>{activeClient.fullName}</div>
                    <div style={{fontSize:12,color:'#7a8a82',marginTop:3}}>{activeClient.country} · Client since {fmtDate(activeClient.createdAt)}</div>
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0}}>
                  {[['Date of birth',activeClient.dob],['WhatsApp',activeClient.whatsapp],['Email',activeClient.email],['Country',activeClient.country],['How they heard',activeClient.howHeard]].map(([l,v])=>(
                    <div key={l} style={{display:'flex',padding:'7px 0',borderBottom:'1px solid #f5f5f5',gap:12}}>
                      <span style={{fontSize:11,color:'#aabab2',fontWeight:500,minWidth:120}}>{l}</span>
                      <span style={{fontSize:12,color:'#0a1410'}}>{v||'—'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1. Tax Returns */}
              <div style={{...S.card,marginBottom:12}}>
                <div style={S.secHead}>
                  <span>💰 Tax Returns</span>
                  <button style={S.addBtn} onClick={()=>setShowAddTax(v=>!v)}>+ Add year</button>
                </div>
                <div style={{padding:'12px 14px'}}>
                  {showAddTax && (
                    <div style={S.addForm}>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:100}}>
                        <label style={{fontSize:11,fontWeight:500,color:'#555'}}>Tax year</label>
                        <input style={{...S.mInput,padding:'7px 10px'}} placeholder="e.g. 2023-24" value={newTaxYear} onChange={e=>setNewTaxYear(e.target.value)}/>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:4,minWidth:130}}>
                        <label style={{fontSize:11,fontWeight:500,color:'#555'}}>Type</label>
                        <div style={{display:'flex',border:'1.5px solid #e4ede8',borderRadius:8,overflow:'hidden',background:'#fff'}}>
                          <button onClick={()=>setNewTaxType('refund')} style={{flex:1,padding:'7px 8px',border:'none',background:newTaxType==='refund'?'#0E5C42':'#fff',color:newTaxType==='refund'?'#fff':'#555',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Refund</button>
                          <button onClick={()=>setNewTaxType('owed')} style={{flex:1,padding:'7px 8px',border:'none',background:newTaxType==='owed'?'#c0392b':'#fff',color:newTaxType==='owed'?'#fff':'#555',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Tax owed</button>
                        </div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:110}}>
                        <label style={{fontSize:11,fontWeight:500,color:'#555'}}>Amount (AUD)</label>
                        <input style={{...S.mInput,padding:'7px 10px'}} type="number" placeholder="e.g. 2500" value={newTaxAmt} onChange={e=>setNewTaxAmt(e.target.value)}/>
                      </div>
                      <button style={{...S.addBtn,padding:'7px 13px'}} onClick={addTaxReturn}>Save</button>
                      <button style={{padding:'7px 10px',border:'1px solid #e4ede8',borderRadius:8,background:'#fff',color:'#333',fontSize:12,cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setShowAddTax(false)}>✕</button>
                    </div>
                  )}
                  {activeClient.taxReturns.length===0 && !showAddTax && <div style={{fontSize:13,color:'#aabab2',textAlign:'center',padding:'16px 0'}}>No tax returns recorded yet.</div>}
                  {[...activeClient.taxReturns].sort((a,b)=>b.year.localeCompare(a.year)).map(r=>(
                    <div key={r.year} style={{...S.returnRow,background:r.type==='owed'?'#fff8f7':'#f7fbf9',borderColor:r.type==='owed'?'#fca5a5':'#e4ede8',marginTop:showAddTax?8:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:9}}>
                        <div>
                          <div style={{fontSize:12,fontWeight:600,color:r.type==='owed'?'#c0392b':'#0E5C42'}}>{r.year}</div>
                          <div style={{fontSize:10,color:'#aabab2'}}>{fmtDate(r.completedAt)}</div>
                        </div>
                        <span style={{background:r.type==='owed'?'#fef0f0':'#e8f5f0',color:r.type==='owed'?'#c0392b':'#0E5C42',border:`1px solid ${r.type==='owed'?'#fca5a5':'#b0d8c8'}`,borderRadius:5,padding:'1px 7px',fontSize:10,fontWeight:700}}>{r.type==='owed'?'Tax owed':'Refund'}</span>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <span style={{fontSize:13,fontWeight:600,color:r.type==='owed'?'#c0392b':'#0a1410'}}>{r.type==='owed'?'-':''}{fmtCur(r.refundAmount)}</span>
                        <button style={{background:'none',border:'none',color:'#fca5a5',cursor:'pointer',fontSize:16,padding:'0 2px',lineHeight:1}} onClick={()=>removeTaxReturn(r.year)}>×</button>
                      </div>
                    </div>
                  ))}
                  {activeClient.taxReturns.length>0 && (
                    <div style={{...S.totalRow,marginTop:8}}>
                      <span style={{fontSize:12,fontWeight:600,color:'#0E5C42'}}>Total refunds</span>
                      <span style={{fontSize:14,fontWeight:700,color:'#0E5C42'}}>{fmtCur(activeClient.taxReturns.reduce((s,r)=>s+(r.type==='owed'?-r.refundAmount:r.refundAmount),0))}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Super Returns */}
              <div style={{...S.card,marginBottom:12}}>
                <div style={S.secHead}>
                  <span>🏦 Superannuation Refund</span>
                  <button style={S.addBtn} onClick={()=>setShowAddSuper(v=>!v)}>+ Add year</button>
                </div>
                <div style={{padding:'12px 14px'}}>
                  {showAddSuper && (
                    <div style={S.addForm}>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:100}}>
                        <label style={{fontSize:11,fontWeight:500,color:'#555'}}>Tax year</label>
                        <input style={{...S.mInput,padding:'7px 10px'}} placeholder="e.g. 2023-24" value={newSuperYear} onChange={e=>setNewSuperYear(e.target.value)}/>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:110}}>
                        <label style={{fontSize:11,fontWeight:500,color:'#555'}}>Amount received (AUD)</label>
                        <input style={{...S.mInput,padding:'7px 10px'}} type="number" placeholder="e.g. 4200" value={newSuperAmt} onChange={e=>setNewSuperAmt(e.target.value)}/>
                      </div>
                      <button style={{...S.addBtn,padding:'7px 13px'}} onClick={addSuperReturn}>Save</button>
                      <button style={{padding:'7px 10px',border:'1px solid #e4ede8',borderRadius:8,background:'#fff',color:'#333',fontSize:12,cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setShowAddSuper(false)}>✕</button>
                    </div>
                  )}
                  {activeClient.superReturns.length===0 && !showAddSuper && <div style={{fontSize:13,color:'#aabab2',textAlign:'center',padding:'16px 0'}}>No superannuation refunds recorded yet.</div>}
                  {[...activeClient.superReturns].sort((a,b)=>b.year.localeCompare(a.year)).map(r=>(
                    <div key={r.year} style={{...S.returnRow,marginTop:showAddSuper?8:0}}>
                      <div><div style={{fontSize:12,fontWeight:600,color:'#2563eb'}}>{r.year}</div><div style={{fontSize:10,color:'#aabab2'}}>{fmtDate(r.completedAt)}</div></div>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <span style={{fontSize:13,fontWeight:600,color:'#0a1410'}}>{fmtCur(r.amount)}</span>
                        <button style={{background:'none',border:'none',color:'#fca5a5',cursor:'pointer',fontSize:16,padding:'0 2px',lineHeight:1}} onClick={()=>removeSuperReturn(r.year)}>×</button>
                      </div>
                    </div>
                  ))}
                  {activeClient.superReturns.length>0 && (
                    <div style={{...S.totalRow,marginTop:8,background:'#eff6ff',borderColor:'#bfdbfe'}}>
                      <span style={{fontSize:12,fontWeight:600,color:'#2563eb'}}>Total super refunded</span>
                      <span style={{fontSize:14,fontWeight:700,color:'#2563eb'}}>{fmtCur(activeClient.superReturns.reduce((s,r)=>s+r.amount,0))}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. TFN + 4. ABN side by side */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
                {/* TFN */}
                <div style={S.card}>
                  <div style={S.secHead}><span>📋 TFN Application</span></div>
                  <div style={S.checkRow}>
                    <div>
                      <div style={{fontSize:13,fontWeight:500,color:'#0a1410'}}>Applied for TFN</div>
                      <div style={{fontSize:11,color:'#aabab2',marginTop:2}}>
                        {activeClient.tfnService.done ? `Done · ${fmtDate(activeClient.tfnService.completedAt)}` : 'Not yet done'}
                      </div>
                    </div>
                    <div
                      style={{...S.checkbox,borderColor:activeClient.tfnService.done?'#0E5C42':'#d8e4dc',background:activeClient.tfnService.done?'#0E5C42':'#fff'}}
                      onClick={()=>toggleService('tfn',activeClient.tfnService)}>
                      {activeClient.tfnService.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </div>
                </div>

                {/* ABN */}
                <div style={S.card}>
                  <div style={S.secHead}><span>🏢 ABN Application</span></div>
                  <div style={S.checkRow}>
                    <div>
                      <div style={{fontSize:13,fontWeight:500,color:'#0a1410'}}>Applied for ABN</div>
                      <div style={{fontSize:11,color:'#aabab2',marginTop:2}}>
                        {activeClient.abnService.done ? `Done · ${fmtDate(activeClient.abnService.completedAt)}` : 'Not yet done'}
                      </div>
                    </div>
                    <div
                      style={{...S.checkbox,borderColor:activeClient.abnService.done?'#0E5C42':'#d8e4dc',background:activeClient.abnService.done?'#0E5C42':'#fff'}}
                      onClick={()=>toggleService('abn',activeClient.abnService)}>
                      {activeClient.abnService.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div style={{...S.card,padding:'14px 16px',marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:600,color:'#0a1410',marginBottom:8,display:'flex',alignItems:'center',gap:7}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#0E5C42" strokeWidth="1.8"/><path d="M8 13h8M8 17h5" stroke="#0E5C42" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  Internal notes
                </div>
                <textarea style={{width:'100%',border:'1.5px solid #e4ede8',borderRadius:9,padding:'9px 11px',fontSize:12,fontFamily:'inherit',background:'#f7fbf9',color:'#0a1410',outline:'none',resize:'vertical',minHeight:72,lineHeight:1.55,boxSizing:'border-box'}}
                  placeholder="Notes about this client..." value={clientNotes} onChange={e=>{setClientNotes(e.target.value);setClientNotesSaved(false)}}/>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:6}}>
                  {clientNotesSaved?<span style={{fontSize:11,color:'#059669',fontWeight:500}}>✓ Saved</span>:<span style={{fontSize:11,color:'#aabab2'}}>Only visible to you</span>}
                  <button style={{padding:'5px 13px',border:'none',borderRadius:7,background:'#0E5C42',color:'#fff',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit',opacity:clientNotes===(activeClient.notes||'')?0.4:1}} disabled={clientNotes===(activeClient.notes||'')} onClick={saveClientNotes}>Save notes</button>
                </div>
              </div>

              {/* Danger */}
              <div style={{background:'#fff',borderRadius:13,padding:'14px 18px',border:'1px dashed #fca5a5'}}>
                <div style={{fontSize:12,fontWeight:600,color:'#c0392b',marginBottom:4}}>⚠️ Delete client</div>
                <div style={{fontSize:12,color:'#7a8a82',marginBottom:10}}>Permanently removes this client and all their history.</div>
                <button style={{padding:'7px 14px',border:'1px solid #fca5a5',borderRadius:8,background:'#fff',color:'#c0392b',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setConfirmDeleteClient(activeClient.id)}>Delete client</button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div style={S.overlay} onClick={e=>{if(e.target===e.currentTarget)setShowAddModal(false)}}>
          <div style={S.modal}>
            <div style={S.mTitle}>Add new client task</div>
            <div style={S.mSub}>Creates a new task in the Tasks tab</div>
            <form onSubmit={addClient}>
              {[['Full name *','text','e.g. Sophie Lambert','fullName'],['WhatsApp','text','+33612345678','whatsapp'],['Email','email','sophie@email.com','email'],['Country','text','e.g. France','country'],['Date of birth','date','','dob']].map(([l,t,p,k])=>(
                <div key={k} style={{marginBottom:10}}>
                  <label style={{fontSize:12,fontWeight:500,color:'#555',display:'block',marginBottom:4}}>{l}</label>
                  <input type={t} style={S.mInput} placeholder={p} value={(newClient as Record<string,string>)[k]} onChange={e=>setNewClient({...newClient,[k]:e.target.value})} required={k==='fullName'}/>
                </div>
              ))}
              <div style={{marginBottom:10}}>
                <label style={{fontSize:12,fontWeight:500,color:'#555',display:'block',marginBottom:4}}>Tax year</label>
                <select style={S.mInput} value={newClient.taxYear} onChange={e=>setNewClient({...newClient,taxYear:e.target.value})}>
                  {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div style={S.mFooter}>
                <button type="button" style={S.mCancel} onClick={()=>setShowAddModal(false)}>Cancel</button>
                <button type="submit" style={S.mSave}>Add client</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm delete task */}
      {confirmDelete && (
        <div style={S.overlay} onClick={e=>{if(e.target===e.currentTarget)setConfirmDelete(null)}}>
          <div style={{...S.modal,maxWidth:360,textAlign:'center'}}>
            <div style={{fontSize:34,marginBottom:10}}>🗑️</div>
            <div style={S.mTitle}>Delete &amp; archive?</div>
            <div style={{fontSize:13,color:'#7a8a82',lineHeight:1.6,marginBottom:18}}>All sensitive data (TFN, bank, address, documents) will be deleted.<br/>The client will be moved to the Clients tab with basic info only.</div>
            <div style={S.mFooter}>
              <button style={S.mCancel} onClick={()=>setConfirmDelete(null)}>Cancel</button>
              <button style={S.mDel} onClick={()=>deleteTask(confirmDelete)}>Yes, delete &amp; archive</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete client */}
      {confirmDeleteClient && (
        <div style={S.overlay} onClick={e=>{if(e.target===e.currentTarget)setConfirmDeleteClient(null)}}>
          <div style={{...S.modal,maxWidth:340,textAlign:'center'}}>
            <div style={{fontSize:34,marginBottom:10}}>🗑️</div>
            <div style={S.mTitle}>Delete client?</div>
            <div style={{fontSize:13,color:'#7a8a82',marginBottom:18}}>This permanently removes the client and all their history.</div>
            <div style={S.mFooter}>
              <button style={S.mCancel} onClick={()=>setConfirmDeleteClient(null)}>Cancel</button>
              <button style={S.mDel} onClick={()=>deleteClient(confirmDeleteClient)}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
