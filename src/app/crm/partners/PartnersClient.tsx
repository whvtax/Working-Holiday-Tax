'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

type Partner = {
  id: string; name: string; email: string; code: string; createdAt: string
  totalReferrals: number; paidReferrals: number; commission: number
  totalPaidHistorically: number
}

const S = {
  shell: { display:'flex', height:'100vh', overflow:'hidden', fontFamily:'"DM Sans",system-ui,sans-serif' } as React.CSSProperties,
  sb: { width:260, background:'#ffffff', display:'flex', flexDirection:'column' as const, flexShrink:0, position:'fixed' as const, top:0, left:0, height:'100vh', borderRight:'1px solid #e4ede8', overflowY:'auto' as const, zIndex:50 },
  sbLogoRow: { display:'flex', alignItems:'center', gap:12, padding:'22px 16px 16px' },
  sbTitle: { fontSize:14, fontWeight:700, color:'#0a1410', letterSpacing:'-0.2px' },
  sbSub: { fontSize:11, color:'#7a8a82', marginTop:2 },
  sbDiv: { height:1, background:'#edf3ef', margin:'4px 16px 10px' },
  sbNav: { display:'flex', flexDirection:'column' as const, gap:4, padding:'0 10px' },
  sbBtn: { display:'flex', alignItems:'center', gap:11, padding:'11px 13px', borderRadius:9, fontSize:13, fontWeight:500, color:'#587066', cursor:'pointer', border:'none', background:'none', fontFamily:'inherit', width:'100%', textDecoration:'none' as const },
  sbBtnOn: { background:'#0E5C42', color:'#fff', fontWeight:600 },
  main: { flex:1, background:'#f0f4f1', marginLeft:260, height:'100vh', overflowY:'auto' as const },
  page: { padding:'26px 26px 40px' },
  pgTitle: { fontSize:21, fontWeight:700, color:'#0a1410', marginBottom:2, letterSpacing:'-0.5px' },
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
    <Link href={href} style={{...S.sbBtn, ...(active ? S.sbBtnOn : {})}}>
      {icon}{label}
    </Link>
  )
}

function CopyLinkBtn({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const link = `https://workingholidaytax.com.au/tax-form?ref=${code}`
  return (
    <button
      onClick={() => navigator.clipboard.writeText(link).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })}
      style={{display:'inline-flex',alignItems:'center',gap:4,padding:'4px 10px',background:copied?'#e8f5f0':'#f7fbf9',border:`1px solid ${copied?'#b0d8c8':'#e4ede8'}`,borderRadius:7,fontSize:11,color:copied?'#0E5C42':'#7a8a82',cursor:'pointer',fontFamily:'inherit',fontWeight:500}}
    >
      {copied ? '✓ Copied!' : '🔗 Copy Link'}
    </button>
  )
}

export default function PartnersClient() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all'|'unpaid'|'paid'>('all')
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const r = await fetchWithTimeout('/api/crm/partners', { cache: 'no-store' })
      const d = await r.json()
      if (d.ok) setPartners(d.partners)
      else setError(d.error || `Failed to load partners (HTTP ${r.status})`)
    } catch (e) {
      console.error('[PartnersClient.load]', e)
      setError('Network error loading partners. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function addPartner() {
    if (!newName.trim()) return
    try {
      const r = await fetch('/api/crm/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim(), email: newEmail.trim() }),
      })
      const d = await r.json()
      if (d.ok) { setNewName(''); setNewEmail(''); setShowAdd(false); load() }
    } catch (e) { console.error('[addPartner]', e) }
  }

  function exportCsv() {
    const fromTs = dateFrom ? new Date(dateFrom).getTime() : 0
    const toTs = dateTo ? new Date(dateTo + 'T23:59:59').getTime() : Infinity
    const filtered = partners.filter(p => {
      if (filter === 'unpaid' && p.commission === 0) return false
      if (filter === 'paid' && p.commission > 0) return false
      const created = new Date(p.createdAt).getTime()
      if (fromTs && created < fromTs) return false
      if (toTs !== Infinity && created > toTs) return false
      return true
    })
    const headers = ['Partner', 'Email', 'Code', 'Total Referrals', 'Paid Clients', 'Commission Owed ($)', 'Total Paid Historically ($)']
    const rows = filtered.map(p => [p.name, p.email, p.code, p.totalReferrals, p.paidReferrals, p.commission, p.totalPaidHistorically*20].map(v => `"${v}"`).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `partners-report-${dateFrom || 'all'}-to-${dateTo || 'now'}.csv`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }

  const visiblePartners = partners.filter(p => {
    if (filter === 'unpaid' && p.commission === 0) return false
    if (filter === 'paid' && p.commission > 0) return false
    if (search.trim() && !p.name.toLowerCase().includes(search.trim().toLowerCase())) return false
    return true
  })

  return (
    <div style={S.shell}>
      <style>{`
        :root{--ease-out:cubic-bezier(0.23,1,0.32,1)}
        button, [role="button"], a{transition:transform 140ms var(--ease-out), background-color 150ms var(--ease-out), color 150ms var(--ease-out), border-color 150ms var(--ease-out), box-shadow 160ms var(--ease-out)}
        button:not(:disabled):active, [role="button"]:active{transform:scale(0.97)}
        @media (hover:hover) and (pointer:fine){ [data-card-hover]:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(11,82,64,0.08)} }
        @media (prefers-reduced-motion: reduce){ *{transition-duration:0.01ms!important} button:active{transform:none} }
      `}</style>
      <aside style={S.sb}>
        <div style={S.sbLogoRow}>
          <div style={{width:34,height:34,borderRadius:9,flexShrink:0,overflow:'hidden'}}>
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
          <div>
            <div style={S.sbTitle}>Working Holiday Tax</div>
            <div style={S.sbSub}>Admin</div>
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
          <NavLink href="/crm/dashboard" label="Leads" active={false}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}/>
          <NavLink href="/crm/partners" label="Partners" active={true}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}/>
          <NavLink href="/crm/whatsapp" label="Will" active={false}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}/>
        </nav>
      </aside>

      <main style={S.main}>
        <div style={S.page}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16,flexWrap:'wrap' as const,gap:10}}>
            <div>
              <h1 style={S.pgTitle}>Partners</h1>
              <div style={{fontSize:12,color:'#7a8a82',marginTop:2}}>Referral links and commission tracking</div>
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap' as const}}>
              <div style={{display:'flex',alignItems:'center',gap:6,background:'#f7fbf9',border:'1px solid #d8e4dc',borderRadius:9,padding:'6px 10px'}}>
                <span style={{fontSize:11,color:'#7a8a82'}}>From:</span>
                <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={{border:'none',background:'none',fontSize:12,color:'#0a1410',outline:'none',fontFamily:'inherit'}}/>
                <span style={{fontSize:11,color:'#7a8a82'}}>To:</span>
                <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} style={{border:'none',background:'none',fontSize:12,color:'#0a1410',outline:'none',fontFamily:'inherit'}}/>
              </div>
              <button onClick={exportCsv} style={{padding:'8px 14px',background:'#fff',border:'1.5px solid #d8e4dc',borderRadius:9,fontSize:13,fontWeight:600,color:'#0a1410',cursor:'pointer',fontFamily:'inherit'}}>
                Export CSV
              </button>
              <button onClick={()=>setShowAdd(true)} style={{padding:'8px 14px',background:'#0E5C42',border:'none',borderRadius:9,fontSize:13,fontWeight:600,color:'#fff',cursor:'pointer',fontFamily:'inherit'}}>
                + Add Partner
              </button>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:16}}>
            {[
              {label:'Total partners', value:partners.length, icon:'🔗'},
              {label:'Total paid referrals', value:partners.reduce((s,p)=>s+p.paidReferrals,0), icon:'👤'},
              {label:'Commission owed', value:`$${partners.reduce((s,p)=>s+p.commission,0)}`, icon:'💰'},
            ].map(stat=>(
              <div key={stat.label} data-card-hover style={{background:'#fff',border:'1px solid #e4ede8',borderRadius:12,padding:'14px 16px',boxShadow:'0 1px 2px rgba(11,82,64,0.03)'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
                  <div style={{fontSize:10.5,fontWeight:600,color:'#7a8a82',textTransform:'uppercase' as const,letterSpacing:'0.06em'}}>{stat.label}</div>
                  <div style={{fontSize:13,opacity:0.4}}>{stat.icon}</div>
                </div>
                <div style={{fontSize:21,fontWeight:700,color:'#0a1410',letterSpacing:'-0.5px',fontVariantNumeric:'tabular-nums' as const}}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{display:'flex',gap:10,marginBottom:14,alignItems:'center',flexWrap:'wrap' as const}}>
            <div style={{display:'flex',gap:6}}>
              {(['all','unpaid','paid'] as const).map(f=>(
                <button key={f} onClick={()=>setFilter(f)}
                  style={{padding:'6px 14px',borderRadius:99,border:'none',background:filter===f?'#0E5C42':'#fff',color:filter===f?'#fff':'#7a8a82',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit',boxShadow:filter===f?'none':'inset 0 0 0 1px #e4ede8'}}>
                  {f.charAt(0).toUpperCase()+f.slice(1)}
                </button>
              ))}
            </div>
            <div style={{position:'relative',width:220}}>
              <svg style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}} width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#aabab2" strokeWidth="1.8"/><path d="M21 21l-4.35-4.35" stroke="#aabab2" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <input
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="Search by partner name…"
                style={{width:'100%',padding:'7px 10px 7px 30px',border:'1px solid #e4ede8',borderRadius:99,fontSize:12,color:'#0a1410',outline:'none',fontFamily:'inherit',boxSizing:'border-box' as const,background:'#fff'}}
              />
            </div>
          </div>

          {loading ? (
            <div style={{padding:48,textAlign:'center',color:'#aabab2'}}>Loading…</div>
          ) : error ? (
            <div style={{...S.card,padding:32,textAlign:'center' as const}}>
              <div style={{fontSize:13,fontWeight:600,color:'#c0392b',marginBottom:8}}>⚠️ Couldn&apos;t load partners</div>
              <div style={{fontSize:12,color:'#7a8a82',marginBottom:16}}>{error}</div>
              <div style={{fontSize:11,color:'#aabab2',marginBottom:16}}>If this mentions a missing column, run the SQL migrations (003 and 004) in Supabase, then retry.</div>
              <button onClick={load} style={{padding:'8px 16px',background:'#0E5C42',border:'none',borderRadius:9,fontSize:12,fontWeight:600,color:'#fff',cursor:'pointer',fontFamily:'inherit'}}>Retry</button>
            </div>
          ) : partners.length === 0 ? (
            <div style={{...S.card,padding:48,textAlign:'center' as const,color:'#aabab2',fontSize:14}}>No partners yet. Add your first partner above.</div>
          ) : (
            <div style={{...S.card,overflowX:'auto' as const}}>
              <table style={{width:'100%',borderCollapse:'collapse',minWidth:760}}>
                <thead>
                  <tr>
                    {['Partner','Email','Code','Referral Link','Referrals','Paid clients','Commission',''].map(h=>(
                      <th key={h} style={{padding:'9px 14px',fontSize:10,fontWeight:600,color:'#7a8a82',textAlign:'left',background:'#f7fbf9',borderBottom:'1px solid #e4ede8',textTransform:'uppercase' as const,letterSpacing:'0.4px'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visiblePartners.map(p => (
                    <tr key={p.id} style={{cursor:'pointer'}} onClick={()=>{ window.location.href = `/crm/partners/${p.id}` }}>
                      <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontWeight:500,fontSize:13,color:'#0E5C42',textDecoration:'underline'}}>{p.name}</td>
                      <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontSize:12,color:'#7a8a82'}}>{p.email || '-'}</td>
                      <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontSize:11,fontFamily:'monospace',color:'#7a8a82'}}>{p.code}</td>
                      <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1'}} onClick={e=>e.stopPropagation()}><CopyLinkBtn code={p.code} /></td>
                      <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontSize:13,color:'#0a1410'}}>{p.totalReferrals}</td>
                      <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontSize:13,color:'#0a1410'}}>{p.paidReferrals}</td>
                      <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontSize:13,fontWeight:600,color:p.commission>0?'#c0392b':'#0E5C42'}}>${p.commission}</td>
                      <td style={{padding:'12px 14px',borderBottom:'1px solid #f0f4f1',fontSize:12,color:'#aabab2'}}>View →</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showAdd && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={()=>{setShowAdd(false);setNewName('');setNewEmail('')}}>
          <div style={{background:'#fff',borderRadius:16,padding:28,width:360,boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}
            onClick={e=>e.stopPropagation()}>
            <h2 style={{fontSize:17,fontWeight:700,color:'#0a1410',marginBottom:6}}>Add Partner</h2>
            <p style={{fontSize:13,color:'#7a8a82',marginBottom:20}}>A unique referral link will be generated automatically.</p>
            <input
              autoFocus
              placeholder="Partner name (e.g. Backpacker Co)"
              value={newName}
              onChange={e=>setNewName(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter') addPartner() }}
              style={{width:'100%',border:'1.5px solid #d8e4dc',borderRadius:9,padding:'10px 12px',fontSize:14,fontFamily:'inherit',outline:'none',boxSizing:'border-box' as const,marginBottom:10}}
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={newEmail}
              onChange={e=>setNewEmail(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter') addPartner() }}
              style={{width:'100%',border:'1.5px solid #d8e4dc',borderRadius:9,padding:'10px 12px',fontSize:14,fontFamily:'inherit',outline:'none',boxSizing:'border-box' as const,marginBottom:16}}
            />
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button onClick={()=>{setShowAdd(false);setNewName('');setNewEmail('')}}
                style={{padding:'9px 18px',border:'1.5px solid #d8e4dc',borderRadius:9,background:'#fff',fontSize:13,fontWeight:600,color:'#4a5568',cursor:'pointer',fontFamily:'inherit'}}>
                Cancel
              </button>
              <button onClick={addPartner} disabled={!newName.trim()}
                style={{padding:'9px 18px',border:'none',borderRadius:9,background:newName.trim()?'#0E5C42':'#d1d5d3',fontSize:13,fontWeight:600,color:'#fff',cursor:newName.trim()?'pointer':'default',fontFamily:'inherit'}}>
                Create Partner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
