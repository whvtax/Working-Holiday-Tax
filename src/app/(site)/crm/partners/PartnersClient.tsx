'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { CrmSide, crmNav, NavIcons } from '@/components/crm/Shell'

type Partner = {
  id: string; name: string; email: string; code: string; createdAt: string
  totalReferrals: number; paidReferrals: number; commission: number
  totalPaidHistorically: number
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

function CopyLinkBtn({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const link = `https://workingholidaytax.com.au/tax-form?ref=${code}`
  return (
    <button
      className={`btn ${copied ? 'take' : 'quiet'}`}
      onClick={() => navigator.clipboard.writeText(link).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })}
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
    <div className="crm-scope">
      <CrmSide items={crmNav()} activeKey="partners" />

      <main>
        <div className="phead">
          <div className="hrow">
            <div>
              <h1 className="vt">Partners</h1>
              {/* .vsub carries a 15px bottom margin for use at the top of a view;
                  in the header row the flex gap already spaces it. */}
              <div className="vsub" style={{ marginBottom: 0 }}>Referral links and commission tracking</div>
            </div>
            <div className="hspacer" />
            <div className="hrow" style={{ gap: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--ink3)' }}>From:</span>
              <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={{ width: 'auto' }}/>
              <span style={{ fontSize: 11, color: 'var(--ink3)' }}>To:</span>
              <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} style={{ width: 'auto' }}/>
            </div>
            <button className="btn quiet" onClick={exportCsv}>
              Export CSV
            </button>
            <button className="btn take" onClick={()=>setShowAdd(true)}>
              + Add Partner
            </button>
          </div>
        </div>

        <div className="pbody">
          <div className="kpis">
            {[
              {label:'Total partners', value:partners.length, icon:'🔗'},
              {label:'Total paid referrals', value:partners.reduce((s,p)=>s+p.paidReferrals,0), icon:'👤'},
              {label:'Commission owed', value:`$${partners.reduce((s,p)=>s+p.commission,0)}`, icon:'💰'},
            ].map(stat=>(
              <div key={stat.label} className="kpi">
                <div className="kl" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:6}}>
                  <span>{stat.label}</span>
                  <span style={{fontSize:12,opacity:0.4}}>{stat.icon}</span>
                </div>
                <div className="kv">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="hrow" style={{marginBottom:13}}>
            <div className="ptabs" style={{marginBottom:0,paddingBottom:0}}>
              {(['all','unpaid','paid'] as const).map(f=>(
                <button key={f} onClick={()=>setFilter(f)} className={`ptab${filter===f?' active':''}`}>
                  {f.charAt(0).toUpperCase()+f.slice(1)}
                </button>
              ))}
            </div>
            <div className="search" style={{width:220}}>
              <span className="search-ic">{NavIcons.search}</span>
              <input
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="Search by partner name…"
              />
            </div>
          </div>

          {loading ? (
            <div className="empty">Loading…</div>
          ) : error ? (
            <div className="card">
              <div className="empty">
                <div className="eh" style={{color:'var(--crit)'}}>⚠️ Couldn&apos;t load partners</div>
                <div style={{marginBottom:10}}>{error}</div>
                <div style={{fontSize:11,marginBottom:16}}>If this mentions a missing column, run the SQL migrations (003 and 004) in Supabase, then retry.</div>
                <button className="btn take" onClick={load}>Retry</button>
              </div>
            </div>
          ) : partners.length === 0 ? (
            <div className="card">
              <div className="empty">No partners yet. Add your first partner above.</div>
            </div>
          ) : (
            <div className="card">
              <div className="tblwrap">
                <table className="tbl" style={{minWidth:760}}>
                  <thead>
                    <tr>
                      {['Partner','Email','Code','Referral Link','Referrals','Paid clients','Commission',''].map(h=>(
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visiblePartners.map(p => (
                      <tr key={p.id} className="clickable" onClick={()=>{ window.location.href = `/crm/partners/${p.id}` }}>
                        <td className="link">{p.name}</td>
                        <td className="muted">{p.email || '-'}</td>
                        <td className="mono">{p.code}</td>
                        <td onClick={e=>e.stopPropagation()}><CopyLinkBtn code={p.code} /></td>
                        <td className="num">{p.totalReferrals}</td>
                        <td className="num">{p.paidReferrals}</td>
                        <td className="num" style={{fontWeight:600,color:p.commission>0?'var(--crit)':'var(--brand1)'}}>${p.commission}</td>
                        <td className="muted">View →</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {showAdd && (
        <div className="overlay" onClick={()=>{setShowAdd(false);setNewName('');setNewEmail('')}}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="mh"><b>Add Partner</b></div>
            <div className="msub">A unique referral link will be generated automatically.</div>
            <input
              autoFocus
              placeholder="Partner name (e.g. Backpacker Co)"
              value={newName}
              onChange={e=>setNewName(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter') addPartner() }}
              style={{marginBottom:10}}
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={newEmail}
              onChange={e=>setNewEmail(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter') addPartner() }}
            />
            <div className="mfoot">
              <button className="btn quiet lg" onClick={()=>{setShowAdd(false);setNewName('');setNewEmail('')}}>
                Cancel
              </button>
              <button className="btn take lg" onClick={addPartner} disabled={!newName.trim()}>
                Create Partner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
