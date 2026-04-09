'use client'
import React, { useState, useEffect, useCallback } from 'react'

type Task = {
  id: string; clientName: string; taskType: string; submittedAt: string
  whatsapp: string; email: string; country: string; dob: string; taxYear: string
  address: string; tfn: string; bankDetails: string; primaryJob: string
  marital: string; taxStatus: string; notes: string; fileUrls: string[]
  reviewStatus: 'pending' | 'approved' | 'rejected'
}

const G = '#0B5240'
const S: Record<string, React.CSSProperties> = {
  shell: { minHeight:'100vh', background:'#F4F9F6', fontFamily:'"DM Sans",system-ui,sans-serif' },
  nav:   { background:'#0B5240', padding:'0 20px', height:54, display:'flex', alignItems:'center', justifyContent:'space-between' },
  logo:  { color:'#fff', fontWeight:700, fontSize:14, letterSpacing:'-0.02em' },
  badge: { background:'rgba(255,255,255,0.15)', color:'#fff', fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:100, letterSpacing:'0.05em' },
  main:  { maxWidth:900, margin:'0 auto', padding:'24px 16px' },
  card:  { background:'#fff', border:'1px solid #E2EDE8', borderRadius:16, marginBottom:12, overflow:'hidden' },
  cardHead: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', cursor:'pointer' },
  name:  { fontWeight:700, fontSize:15, color:'#0D1B17', letterSpacing:'-0.02em' },
  meta:  { fontSize:11, color:'#8DA89A', marginTop:2 },
  body:  { padding:'0 18px 18px', borderTop:'1px solid #EAF6F1' },
  row:   { display:'flex', gap:8, padding:'8px 0', borderBottom:'1px solid #F0F7F4' },
  lbl:   { fontSize:11, fontWeight:600, color:'#8DA89A', width:140, flexShrink:0, textTransform:'uppercase', letterSpacing:'0.04em', paddingTop:2 },
  val:   { fontSize:12.5, color:'#1A2822', lineHeight:1.6, flex:1 },
  actions: { display:'flex', gap:10, padding:'14px 18px', background:'#F9FCFA', borderTop:'1px solid #EAF6F1', justifyContent:'flex-end' },
  btnApprove: { display:'flex', alignItems:'center', gap:6, height:40, padding:'0 20px', background:'#0B5240', color:'#fff', border:'none', borderRadius:100, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' },
  btnReject:  { display:'flex', alignItems:'center', gap:6, height:40, padding:'0 20px', background:'#FEF2F2', color:'#DC2626', border:'1.5px solid #FECACA', borderRadius:100, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' },
  btnLogout:  { background:'rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.7)', border:'none', borderRadius:100, padding:'6px 14px', fontSize:12, cursor:'pointer', fontFamily:'inherit' },
  statusBadge: (s: string) => ({
    fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:100, letterSpacing:'0.05em',
    background: s==='approved'?'#EAF6F1': s==='rejected'?'#FEF2F2':'#FFF8EC',
    color: s==='approved'?'#065F46': s==='rejected'?'#DC2626':'#B45309',
  }),
  fileLink: { fontSize:12, color:G, textDecoration:'underline', textUnderlineOffset:3, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:4 },
  empty: { textAlign:'center', padding:'60px 20px', color:'#8DA89A', fontSize:14 },
}

const TYPE_LABEL: Record<string,string> = {
  'tax-return':'Tax Return','super':'Super Refund','tfn':'TFN Application','abn':'ABN Application'
}

export default function ReviewerClient() {
  const [tasks, setTasks]         = useState<Task[]>([])
  const [loading, setLoading]     = useState(true)
  const [expanded, setExpanded]   = useState<string|null>(null)
  const [filter, setFilter]       = useState<'pending'|'approved'|'rejected'|'all'>('pending')
  const [acting, setActing]       = useState<string|null>(null)
  const [viewUrl, setViewUrl]     = useState<string|null>(null)
  const [hiddenTasks, setHiddenTasks] = useState<Set<string>>(new Set())

  const loadTasks = useCallback(async () => {
    try {
      const r = await fetch('/api/crm/tasks', { cache:'no-store' })
      const d = await r.json()
      if (d.ok) setTasks(d.tasks.filter((t: Task) => !t.done))
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { loadTasks() }, [loadTasks])

  async function setStatus(taskId: string, status: 'approved'|'rejected') {
    setActing(taskId)
    await fetch('/api/crm/review', {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ taskId, status })
    })
    setTasks(prev => prev.map(t => t.id===taskId ? {...t, reviewStatus:status} : t))
    setActing(null)
    setExpanded(null)
    // Hide from reviewer after 5 minutes
    setTimeout(() => {
      setHiddenTasks(prev => new Set([...prev, taskId]))
    }, 5 * 60 * 1000)
  }

  async function logout() {
    await fetch('/api/crm/reviewer-logout', { method:'POST' })
    window.location.href = '/crm/reviewer'
  }

  const filtered = tasks.filter(t => !hiddenTasks.has(t.id) && (filter==='all' || t.reviewStatus===filter))
  const visible = tasks.filter(t => !hiddenTasks.has(t.id))
  const counts = { pending: visible.filter(t=>t.reviewStatus==='pending').length, approved: visible.filter(t=>t.reviewStatus==='approved').length, rejected: visible.filter(t=>t.reviewStatus==='rejected').length }

  return (
    <div style={S.shell}>
      <div style={S.nav}>
        <div style={S.logo}>Working Holiday Tax · Review Portal</div>
        <button style={S.btnLogout} onClick={logout}>Sign out</button>
      </div>

      <div style={S.main}>
        {/* Filter tabs */}
        <div style={{display:'flex',gap:8,marginBottom:20}}>
          {(['pending','approved','rejected','all'] as const).map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{
              height:34, padding:'0 14px', border:'1.5px solid', borderRadius:100, fontSize:12, fontWeight:600,
              cursor:'pointer', fontFamily:'inherit',
              borderColor: filter===f?G:'#D4EAE2',
              background: filter===f?G:'#fff',
              color: filter===f?'#fff':'#587066',
            }}>
              {f==='pending'?`Pending (${counts.pending})`:f==='approved'?`Approved (${counts.approved})`:f==='rejected'?`Rejected (${counts.rejected})`:'All'}
            </button>
          ))}
        </div>

        {loading ? <p style={S.empty}>Loading...</p> :
         filtered.length===0 ? <p style={S.empty}>No {filter==='all'?'':''+filter} tasks.</p> :
         filtered.map(task => (
          <div key={task.id} style={S.card}>
            {/* Card header */}
            <div style={S.cardHead} onClick={()=>setExpanded(expanded===task.id?null:task.id)}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={S.name}>{task.clientName}</span>
                  <span style={{fontSize:11,background:'#EAF6F1',color:G,padding:'2px 8px',borderRadius:100,fontWeight:600}}>{TYPE_LABEL[task.taskType]||task.taskType}</span>
                  <span style={S.statusBadge(task.reviewStatus) as React.CSSProperties}>
                    {task.reviewStatus==='approved'?'✓ Approved':task.reviewStatus==='rejected'?'✗ Rejected':'⏳ Pending'}
                  </span>
                </div>
                <div style={S.meta}>{task.country} · {task.taxYear} · Submitted {new Date(task.submittedAt).toLocaleDateString('en-AU')}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{transform:expanded===task.id?'rotate(180deg)':'none',transition:'0.2s',flexShrink:0}}>
                <path d="M6 9l6 6 6-6" stroke="#8DA89A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Expanded details */}
            {expanded===task.id && (<>
              <div style={S.body}>
                {[
                  ['WhatsApp', task.whatsapp],
                  ['Email', task.email],
                  ['Date of Birth', task.dob],
                  ['Address', task.address],
                  ['TFN', task.tfn],
                  ['Bank Details', task.bankDetails],
                  ['Primary Job', task.primaryJob],
                  ['Marital Status', task.marital],
                  ['Tax Status', task.taxStatus],
                  ['Notes / Declarations', task.notes],
                ].filter(([,v])=>v).map(([l,v])=>(
                  <div key={l} style={S.row}>
                    <span style={S.lbl}>{l}</span>
                    <span style={S.val}>{v}</span>
                  </div>
                ))}

                {/* Files */}
                {task.fileUrls?.length > 0 && (
                  <div style={{...S.row, flexDirection:'column', gap:6}}>
                    <span style={S.lbl}>Documents</span>
                    <div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:4}}>
                      {task.fileUrls.map((url,i)=>{
                        const name = decodeURIComponent(url.split('/').pop()??`file-${i+1}`).replace(/^\d+_[a-z0-9]+_/,'').slice(0,40)
                        const isPdf = url.toLowerCase().endsWith('.pdf')
                        return (
                          <button key={i} onClick={()=>setViewUrl(url)}
                            style={{display:'inline-flex',alignItems:'center',gap:6,height:30,padding:'0 12px',background:'#EAF6F1',color:'#0B5240',border:'1px solid #C8EAE0',borderRadius:100,fontSize:12,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>
                            {isPdf?'📄':'🖼️'} {name.slice(0,28)} &nbsp;·&nbsp; View
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              {task.reviewStatus === 'pending' && (
                <div style={S.actions}>
                  <button style={S.btnReject} onClick={()=>setStatus(task.id,'rejected')} disabled={acting===task.id}>
                    ✗ Reject
                  </button>
                  <button style={S.btnApprove} onClick={()=>setStatus(task.id,'approved')} disabled={acting===task.id}>
                    ✓ Approve
                  </button>
                </div>
              )}
              {task.reviewStatus !== 'pending' && (
                <div style={S.actions}>
                  <button style={{...S.btnReject, opacity:0.6}} onClick={()=>setStatus(task.id,'pending')} disabled={acting===task.id}>
                    ↩ Reset to pending
                  </button>
                </div>
              )}
            </>)}
          </div>
        ))}
      </div>
    </div>

    {/* File viewer modal */}
    {viewUrl && (
      <div onClick={()=>setViewUrl(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
        <div onClick={e=>e.stopPropagation()} style={{background:'#fff',borderRadius:16,overflow:'hidden',maxWidth:'90vw',maxHeight:'90vh',display:'flex',flexDirection:'column',width:'100%'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderBottom:'1px solid #EAF6F1'}}>
            <span style={{fontSize:13,fontWeight:600,color:'#0D1B17'}}>Document Preview</span>
            <button onClick={()=>setViewUrl(null)} style={{background:'none',border:'none',cursor:'pointer',fontSize:20,color:'#587066',lineHeight:1}}>✕</button>
          </div>
          <div style={{flex:1,overflow:'auto',minHeight:400}}>
            {viewUrl.toLowerCase().endsWith('.pdf')
              ? <iframe src={viewUrl} style={{width:'100%',height:'80vh',border:'none'}} title="Document" />
              : <img src={viewUrl} alt="Document" style={{width:'100%',height:'auto',display:'block'}} />
            }
          </div>
        </div>
      </div>
    )}
  )
}
