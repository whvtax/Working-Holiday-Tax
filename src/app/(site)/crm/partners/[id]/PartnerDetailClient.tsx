'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { CrmSide, crmNav, NavIcons } from '@/components/crm/Shell'

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

/** No standalone monospace utility exists in crm-design.css — only table.tbl td.mono. */
const MONO: React.CSSProperties = { fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace' }

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 30_000): Promise<Response> {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: ctrl.signal })
  } finally {
    clearTimeout(id)
  }
}

function fmtDate(iso: string | null) {
  if (!iso) return '-'
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
    <div className="crm-scope">
      <CrmSide items={crmNav()} activeKey="partners" />

      <main>
        <div className="phead">
          <div className="hrow">
            <a href="/crm/partners" className="btn quiet">
              {NavIcons.back}
              Back to Partners
            </a>
            {partner && (
              <>
                <div>
                  <h1 className="vt">{partner.name}</h1>
                  {/* .vsub's 15px bottom margin is for the top of a view; the header
                      row spaces itself, so it is zeroed here. */}
                  <div className="vsub" style={{marginBottom:0,display:'flex',gap:14,flexWrap:'wrap'}}>
                    {partner.email && <span>✉️ {partner.email}</span>}
                    <span>Code: <span style={{...MONO,color:'var(--ink)'}}>{partner.code}</span></span>
                    <span>Partner since {fmtDate(partner.createdAt)}</span>
                  </div>
                </div>
                <div className="hspacer" />
                <button className={`btn ${copied ? 'quiet' : 'take'}`} onClick={copyLink}>
                  {copied ? '✓ Copied!' : '🔗 Copy Referral Link'}
                </button>
                {/* Outline-destructive: crm-design.css only has the filled .btn.danger,
                    which is too loud beside the primary action in the header. */}
                <button className="btn quiet" style={{color:'var(--crit)'}} onClick={()=>setShowDeleteConfirm(true)}>
                  🗑️ Delete Partner
                </button>
              </>
            )}
          </div>
        </div>

        <div className="pbody">
          {loading ? (
            <div className="empty">Loading…</div>
          ) : error ? (
            <div className="card">
              <div className="empty">
                <div className="eh" style={{color:'var(--crit)'}}>⚠️ Couldn&apos;t load partner</div>
                <div style={{marginBottom:16}}>{error}</div>
                <button className="btn take" onClick={load}>Retry</button>
              </div>
            </div>
          ) : !partner ? null : (
            <>
              {showDeleteConfirm && (
                <div className="overlay" onClick={()=>!deleting && setShowDeleteConfirm(false)}>
                  <div className="modal" onClick={e=>e.stopPropagation()}>
                    <div className="mh"><b>Delete {partner.name}?</b></div>
                    <div className="msub">
                      Their referral link (<span style={MONO}>?ref={partner.code}</span>) will stop working, and the payment history above will be gone.
                    </div>
                    <div className="msub" style={{marginTop:0}}>
                      The {clients.length} referred client{clients.length===1?'':'s'} themselves are <strong>not</strong> deleted. They just won&apos;t show &quot;referred by&quot; this partner anymore.
                    </div>
                    <div className="mfoot">
                      <button className="btn quiet lg" onClick={()=>setShowDeleteConfirm(false)} disabled={deleting}>
                        Cancel
                      </button>
                      <button className="btn danger lg" onClick={deletePartner} disabled={deleting}>
                        {deleting ? 'Deleting…' : 'Delete Partner'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="kpis">
                {[
                  {label:'Total referrals', value:clients.length, color:'var(--brand1)', icon:'🔗'},
                  {label:'Qualified', value:qualifiedClients.length, color:'var(--onb)', icon:'✓'},
                  {label:'Commission owed', value:`$${unpaidQualified.length*20}`, color:'var(--crit)', icon:'⏳'},
                  {label:'Total paid to date', value:`$${paidHistory.length*20}`, color:'var(--rev)', icon:'💰'},
                ].map(stat=>(
                  <div key={stat.label} className="kpi">
                    <div className="kl" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:6}}>
                      <span style={{color:stat.color}}>{stat.label}</span>
                      <span style={{fontSize:12,opacity:0.65}}>{stat.icon}</span>
                    </div>
                    <div className="kv" style={{color:stat.color}}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="card" style={{marginBottom:16}}>
                <div className="sechead">Referred clients</div>
                {clients.length === 0 ? (
                  <div className="empty">No one has been referred by this partner yet.</div>
                ) : (
                  <div className="tblwrap">
                    <table className="tbl" style={{minWidth:600}}>
                      <thead>
                        <tr>
                          {['Client','Referred on','Status','Commission'].map(h=>(
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map(c => (
                          <tr key={c.id}>
                            <td style={{fontWeight:500}}>{c.fullName}</td>
                            <td className="muted">{fmtDate(c.createdAt)}</td>
                            <td>
                              {!c.qualified ? (
                                <span className="chip warn">⏳ Pending</span>
                              ) : c.commissionPaidAt ? (
                                <span className="chip good">✓ Paid</span>
                              ) : (
                                <span className="chip crit">Qualified, unpaid</span>
                              )}
                            </td>
                            {!c.qualified ? (
                              <td className="muted">-</td>
                            ) : c.commissionPaidAt ? (
                              <td><button className="btn quiet" onClick={()=>togglePaid(c.id, false)}>↺ Undo</button></td>
                            ) : (
                              <td><button className="btn take" onClick={()=>togglePaid(c.id, true)}>✓ Mark paid ($20)</button></td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="card">
                <div className="sechead">Payment history</div>
                {paidHistory.length === 0 ? (
                  <div className="empty">No commission payments recorded yet.</div>
                ) : (
                  <div className="tblwrap">
                    <table className="tbl" style={{minWidth:500}}>
                      <thead>
                        <tr>
                          {['Date paid','Client','Amount'].map(h=>(
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paidHistory.map(c => (
                          <tr key={c.id}>
                            <td className="muted">{fmtDate(c.commissionPaidAt)}</td>
                            <td style={{fontWeight:500}}>{c.fullName}</td>
                            <td className="num" style={{fontWeight:600,color:'var(--brand1)'}}>$20</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
