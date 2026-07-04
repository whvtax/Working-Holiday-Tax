'use client'
import React, { useState, useEffect, useCallback } from 'react'

type ReferredClient = {
  id: string
  fullName: string
  createdAt: string
  qualified: boolean
  commissionPaidAt: string | null
}

type PartnerInfo = {
  id: string; name: string; email: string; code: string; createdAt: string
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
  card: { background:'#fff', borderRadius:14, border:'1px solid #e4ede8' },
}

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 30_000): Promise<Response> {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: ctrl.signal })
  } finally {
    clearTimeout(id)
  }
}

function NavLink({ href, label, icon, active }: { href: string; label: string; icon: React.ReactNode; active: boolean }) {
  return (
    <a href={href} style={{...S.sbBtn, ...(active ? S.sbBtnOn : {})}}>
      {icon}{label}
    </a>
  )
}

function fmtDate(iso: string | null) {
  if (!iso) return '—'
  try { return new Date(iso).toLocaleDateString('en-AU', { day:'2-digit', month:'short', year:'numeric' }) } catch { return iso }
}

export default function PartnerDetailClient({ partnerId }: { partnerId: string }) {
  const [partner, setPartner] = useState<PartnerInfo | null>(null)
  const [clients, setClients] = useState<ReferredClient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const r = await fetchWithTimeout(`/api/crm/partners/${partnerId}`, { cache: 'no-store' })
      const d = await r.json()
      if (d.ok) { setPartner(d.partner); setClients(d.referredClients) }
      else setError(d.error || `Failed to load partner (HTTP ${r.status})`)
    } catch (e) {
      console.error('[PartnerDetailClient.load]', e)
      setError('Network error loading partner. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [partnerId])

  useEffect(() => { load() }, [load])

  async function togglePaid(clientId: string, paid: boolean) {
    try {
      const r = await fetch(`/api/crm/clients/${clientId}/referral-payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paid }),
      })
      const d = await r.json()
      if (d.ok) load()
    } catch (e) { console.error('[togglePaid]', e) }
  }

  function copyLink() {
    if (!partner) return
    const link = `https://workingholidaytax.com.au/tax-form?ref=${partner.code}`
    navigator.clipboard.writeText(link).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  }

  async function deletePartner() {
    if (!partner) return
    setDeleting(true)
    try {
      const r = await fetch(`/api/crm/partners/${partner.id}`, { method: 'DELETE' })
      const d = await r.json()
      if (d.ok) {
        window.location.href = '/crm/partners'
      } else {
        setDeleting(false)
        setShowDeleteConfirm(false)
        setError(d.error || 'Failed to delete partner')
      }
    } catch (e) {
      console.error('[deletePartner]', e)
      setDeleting(false)
      setShowDeleteConfirm(false)
      setError('Network error deleting partner. Check your connection and try again.')
    }
  }

  const qualifiedClients = clients.filter(c => c.qualified)
  const unpaidQualified = qualifiedClients.filter(c => !c.commissionPaidAt)
  const paidHistory = qualifiedClients
    .filter(c => c.commissionPaidAt)
    .sort((a, b) => new Date(b.commissionPaidAt!).getTime() - new Date(a.commissionPaidAt!).getTime())

  return (
    <div style={S.shell}>
      <aside style={S.sb}>
        <div style={S.sbLogoRow}>
          <div style={{width:34,height:34,borderRadius:9,flexShrink:0,overflow:'hidden'}}>
            <svg width="34" height="34" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="100" fill="#0B5240"/>
              <g transform="translate(100,100) scale(3.57) translate(-17,-17)">
                <rect x="2" y="2" width="19" height="19" rx="4.5" stroke="#5BB88A" strokeWidth="2" fill="none"/>
                <rect x="13" y="13" width="19" height="19" rx="4.5" fill="white"/>
              </g>
            </svg>
          </div>
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
          <NavLink href="/crm/dashboard" label="Archive" active={false}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 8v13H3V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 3H1v5h22V3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}/>
          <NavLink href="/crm/partners" label="Partners" active={true}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}/>
        </nav>
      </aside>

      <main style={S.main}>
        <div style={S.page}>
          <a href="/crm/partners" style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:13,color:'#0E5C42',fontWeight:600,textDecoration:'none',marginBottom:16}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Partners
          </a>

          {loading ? (
            <div style={{padding:48,textAlign:'center',color:'#aabab2'}}>Loading…</div>
          ) : error ? (
            <div style={{...S.card,padding:32,textAlign:'center' as const}}>
              <div style={{fontSize:13,fontWeight:600,color:'#c0392b',marginBottom:8}}>⚠️ Couldn&apos;t load partner</div>
              <div style={{fontSize:12,color:'#7a8a82',marginBottom:16}}>{error}</div>
              <button onClick={load} style={{padding:'8px 16px',background:'#0E5C42',border:'none',borderRadius:9,fontSize:12,fontWeight:600,color:'#fff',cursor:'pointer',fontFamily:'inherit'}}>Retry</button>
            </div>
          ) : !partner ? null : (
            <>
              <div style={{...S.card,padding:'20px 22px',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:14}}>
                <div>
                  <h1 style={{fontSize:22,fontWeight:700,color:'#0a1410',marginBottom:4,letterSpacing:'-0.5px'}}>{partner.name}</h1>
                  <div style={{fontSize:12,color:'#7a8a82',display:'flex',gap:14,flexWrap:'wrap' as const}}>
                    {partner.email && <span>✉️ {partner.email}</span>}
                    <span>Code: <span style={{fontFamily:'monospace',color:'#0a1410'}}>{partner.code}</span></span>
                    <span>Partner since {fmtDate(partner.createdAt)}</span>
                  </div>
                </div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap' as const}}>
                  <button onClick={copyLink} style={{padding:'9px 16px',background:copied?'#e8f5f0':'#0E5C42',border:'none',borderRadius:9,fontSize:13,fontWeight:600,color:copied?'#0E5C42':'#fff',cursor:'pointer',fontFamily:'inherit'}}>
                    {copied ? '✓ Copied!' : '🔗 Copy Referral Link'}
                  </button>
                  <button onClick={()=>setShowDeleteConfirm(true)} style={{padding:'9px 16px',background:'#fff',border:'1.5px solid #fca5a5',borderRadius:9,fontSize:13,fontWeight:600,color:'#c0392b',cursor:'pointer',fontFamily:'inherit'}}>
                    🗑️ Delete Partner
                  </button>
                </div>
              </div>

              {showDeleteConfirm && (
                <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}}
                  onClick={()=>!deleting && setShowDeleteConfirm(false)}>
                  <div style={{background:'#fff',borderRadius:16,padding:28,width:380,boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}
                    onClick={e=>e.stopPropagation()}>
                    <h2 style={{fontSize:17,fontWeight:700,color:'#0a1410',marginBottom:6}}>Delete {partner.name}?</h2>
                    <p style={{fontSize:13,color:'#7a8a82',marginBottom:8,lineHeight:1.5}}>
                      Their referral link (<span style={{fontFamily:'monospace'}}>?ref={partner.code}</span>) will stop working, and the payment history above will be gone.
                    </p>
                    <p style={{fontSize:13,color:'#7a8a82',marginBottom:20,lineHeight:1.5}}>
                      The {clients.length} referred client{clients.length===1?'':'s'} themselves are <strong>not</strong> deleted. They just won&apos;t show &quot;referred by&quot; this partner anymore.
                    </p>
                    <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                      <button onClick={()=>setShowDeleteConfirm(false)} disabled={deleting}
                        style={{padding:'9px 18px',border:'1.5px solid #d8e4dc',borderRadius:9,background:'#fff',fontSize:13,fontWeight:600,color:'#4a5568',cursor:'pointer',fontFamily:'inherit'}}>
                        Cancel
                      </button>
                      <button onClick={deletePartner} disabled={deleting}
                        style={{padding:'9px 18px',border:'none',borderRadius:9,background:'#c0392b',fontSize:13,fontWeight:600,color:'#fff',cursor:deleting?'default':'pointer',fontFamily:'inherit',opacity:deleting?0.7:1}}>
                        {deleting ? 'Deleting…' : 'Delete Partner'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:20}}>
                {[
                  {label:'Total referrals', value:clients.length, color:'#0E5C42', bg:'#e8f5f0', border:'#a7d8c4', icon:'🔗'},
                  {label:'Qualified', value:qualifiedClients.length, color:'#1d4ed8', bg:'#eff6ff', border:'#bfdbfe', icon:'✓'},
                  {label:'Commission owed', value:`$${unpaidQualified.length*20}`, color:'#c0392b', bg:'#fef2f2', border:'#fecaca', icon:'⏳'},
                  {label:'Total paid to date', value:`$${paidHistory.length*20}`, color:'#7c3aed', bg:'#f5f3ff', border:'#ddd6fe', icon:'💰'},
                ].map(stat=>(
                  <div key={stat.label} style={{background:stat.bg,border:`1px solid ${stat.border}`,borderRadius:11,padding:'14px 16px'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
                      <div style={{fontSize:11,fontWeight:700,color:stat.color,textTransform:'uppercase' as const,letterSpacing:'0.08em'}}>{stat.label}</div>
                      <div style={{fontSize:14,opacity:0.65}}>{stat.icon}</div>
                    </div>
                    <div style={{fontSize:24,fontWeight:700,color:stat.color,letterSpacing:'-0.5px'}}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div style={{fontSize:13,fontWeight:700,color:'#0a1410',marginBottom:10}}>Referred clients</div>
              {clients.length === 0 ? (
                <div style={{...S.card,padding:40,textAlign:'center' as const,color:'#aabab2',fontSize:14,marginBottom:24}}>
                  No one has been referred by this partner yet.
                </div>
              ) : (
                <div style={{...S.card,overflowX:'auto' as const,marginBottom:24}}>
                  <table style={{width:'100%',borderCollapse:'collapse',minWidth:600}}>
                    <thead>
                      <tr>
                        {['Client','Referred on','Status','Commission'].map(h=>(
                          <th key={h} style={{padding:'9px 14px',fontSize:10,fontWeight:600,color:'#7a8a82',textAlign:'left',background:'#f7fbf9',borderBottom:'1px solid #e4ede8',textTransform:'uppercase' as const,letterSpacing:'0.4px'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map(c => (
                        <tr key={c.id}>
                          <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontWeight:500,fontSize:13,color:'#0a1410'}}>{c.fullName}</td>
                          <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontSize:12,color:'#7a8a82'}}>{fmtDate(c.createdAt)}</td>
                          <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1'}}>
                            {!c.qualified ? (
                              <span style={{fontSize:11,fontWeight:600,color:'#d97706',background:'#fffbeb',border:'1px solid #fde68a',borderRadius:8,padding:'3px 9px'}}>⏳ Pending</span>
                            ) : c.commissionPaidAt ? (
                              <span style={{fontSize:11,fontWeight:600,color:'#059669',background:'#ecfdf5',border:'1px solid #a7f3d0',borderRadius:8,padding:'3px 9px'}}>✓ Paid</span>
                            ) : (
                              <span style={{fontSize:11,fontWeight:600,color:'#c0392b',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,padding:'3px 9px'}}>Qualified, unpaid</span>
                            )}
                          </td>
                          <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1'}}>
                            {!c.qualified ? (
                              <span style={{fontSize:11,color:'#aabab2'}}>—</span>
                            ) : c.commissionPaidAt ? (
                              <button onClick={()=>togglePaid(c.id, false)} style={{padding:'6px 12px',background:'#fff',border:'1px solid #d8e4dc',borderRadius:8,fontSize:11,fontWeight:600,color:'#7a8a82',cursor:'pointer',fontFamily:'inherit'}}>↺ Undo</button>
                            ) : (
                              <button onClick={()=>togglePaid(c.id, true)} style={{padding:'6px 12px',background:'#0E5C42',border:'none',borderRadius:8,fontSize:11,fontWeight:600,color:'#fff',cursor:'pointer',fontFamily:'inherit'}}>✓ Mark paid ($20)</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div style={{fontSize:13,fontWeight:700,color:'#0a1410',marginBottom:10}}>Payment history</div>
              {paidHistory.length === 0 ? (
                <div style={{...S.card,padding:40,textAlign:'center' as const,color:'#aabab2',fontSize:14}}>
                  No commission payments recorded yet.
                </div>
              ) : (
                <div style={{...S.card,overflowX:'auto' as const}}>
                  <table style={{width:'100%',borderCollapse:'collapse',minWidth:500}}>
                    <thead>
                      <tr>
                        {['Date paid','Client','Amount'].map(h=>(
                          <th key={h} style={{padding:'9px 14px',fontSize:10,fontWeight:600,color:'#7a8a82',textAlign:'left',background:'#f7fbf9',borderBottom:'1px solid #e4ede8',textTransform:'uppercase' as const,letterSpacing:'0.4px'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paidHistory.map(c => (
                        <tr key={c.id}>
                          <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontSize:12,color:'#7a8a82'}}>{fmtDate(c.commissionPaidAt)}</td>
                          <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontWeight:500,fontSize:13,color:'#0a1410'}}>{c.fullName}</td>
                          <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontSize:13,fontWeight:600,color:'#0E5C42'}}>$20</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
