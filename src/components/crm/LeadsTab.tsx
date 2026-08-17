'use client'

/**
 * Leads — the mailing list.
 *
 * Shows everyone who has ever submitted any form with an email address, whoever
 * they came in through and whatever later happened to their task. Rows here are
 * independent of crm_tasks: marking a task done, archiving it or deleting it
 * outright leaves this list untouched (see migration 016).
 *
 * Name and email only. No TFN, no documents, no tax details.
 */

import { useEffect, useMemo, useState } from 'react'

type Lead = {
  email: string
  fullName: string
  whatsapp: string
  source: string
  lang: string
  unsubscribed: boolean
  createdAt: string
}

const SOURCE_LABELS: Record<string, string> = {
  'tax-form': 'Original form',
  'start':    'Form 1',
  'complete': 'Form 2',
  'backfill': 'Existing record',
}

export function LeadsTab() {
  const [leads, setLeads] = useState<Lead[] | null>(null)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [hideUnsub, setHideUnsub] = useState(true)
  const [busy, setBusy] = useState('')

  const load = async () => {
    try {
      const res = await fetch('/api/crm/leads', { cache: 'no-store' })
      const d = await res.json()
      if (!d?.ok) throw new Error()
      setLeads(d.leads)
    } catch {
      setError('Could not load the list.')
    }
  }
  useEffect(() => { void load() }, [])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return (leads ?? [])
      .filter(l => !(hideUnsub && l.unsubscribed))
      .filter(l => !q || l.fullName.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.whatsapp.includes(q))
  }, [leads, search, hideUnsub])

  const toggleUnsub = async (lead: Lead) => {
    setBusy(lead.email)
    try {
      await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: lead.email, unsubscribed: !lead.unsubscribed }),
      })
      setLeads(prev => (prev ?? []).map(l =>
        l.email === lead.email ? { ...l, unsubscribed: !l.unsubscribed } : l,
      ))
    } catch {
      setError('Could not update that person.')
    } finally {
      setBusy('')
    }
  }

  const activeCount = (leads ?? []).filter(l => !l.unsubscribed).length

  return (
    <div style={{ padding: '0 26px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#080F0D', margin: 0 }}>Leads</h2>
        <span style={{ fontSize: 12.5, color: '#587066' }}>
          {leads === null ? 'Loading…' : `${activeCount} on the list`}
          {leads && leads.length !== activeCount && ` · ${leads.length - activeCount} unsubscribed`}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search name, email or number"
          style={{
            flex: '1 1 220px', minWidth: 0, height: 38, padding: '0 14px', fontSize: 13,
            fontFamily: 'inherit', background: '#F5F9F7', border: '1.5px solid #D4EAE2',
            borderRadius: 10, outline: 'none', color: '#080F0D',
          }}
        />
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: '#587066', cursor: 'pointer' }}>
          <input type="checkbox" checked={hideUnsub} onChange={e => setHideUnsub(e.target.checked)} />
          Hide unsubscribed
        </label>
        <a
          href="/api/crm/leads?csv=1"
          style={{
            height: 38, display: 'inline-flex', alignItems: 'center', padding: '0 18px',
            background: '#0B5240', color: '#fff', fontSize: 13, fontWeight: 600,
            borderRadius: 100, textDecoration: 'none',
          }}
        >
          ⬇ Download Excel (CSV)
        </a>
      </div>

      {error && <p style={{ fontSize: 12.5, color: '#DC2626', marginBottom: 12 }}>{error}</p>}

      <div style={{ border: '1.5px solid #E4EFEA', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.8fr 1.2fr 0.9fr 0.7fr', gap: 0,
                      background: '#F5F9F7', borderBottom: '1.5px solid #E4EFEA',
                      fontSize: 11, fontWeight: 700, color: '#587066', textTransform: 'uppercase', letterSpacing: '.05em' }}>
          {['Name', 'Email', 'WhatsApp', 'Source', ''].map((h, i) => (
            <div key={i} style={{ padding: '9px 12px' }}>{h}</div>
          ))}
        </div>

        {visible.length === 0 && leads !== null && (
          <div style={{ padding: '22px 12px', fontSize: 13, color: '#8AADA3', textAlign: 'center' }}>
            {search ? 'Nobody matches that search.' : 'Nobody on the list yet.'}
          </div>
        )}

        {visible.map(l => (
          <div key={l.email} style={{
            display: 'grid', gridTemplateColumns: '1.3fr 1.8fr 1.2fr 0.9fr 0.7fr', gap: 0,
            borderTop: '1px solid #EDF3F0', fontSize: 12.5, color: '#1A2822',
            alignItems: 'center', opacity: l.unsubscribed ? 0.5 : 1,
          }}>
            <div style={{ padding: '10px 12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {l.fullName || '—'}
            </div>
            <div style={{ padding: '10px 12px', overflow: 'hidden', textOverflow: 'ellipsis', direction: 'ltr' }}>
              {l.email}
            </div>
            <div style={{ padding: '10px 12px', color: '#587066', direction: 'ltr', whiteSpace: 'nowrap',
                          overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.whatsapp || '—'}</div>
            <div style={{ padding: '10px 12px', color: '#587066', fontSize: 11.5 }}>
              {SOURCE_LABELS[l.source] ?? l.source}
            </div>
            <div style={{ padding: '10px 12px', textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => void toggleUnsub(l)}
                disabled={busy === l.email}
                style={{
                  fontSize: 11, fontWeight: 600, fontFamily: 'inherit', padding: '4px 10px',
                  borderRadius: 100, cursor: 'pointer',
                  background: '#fff', color: l.unsubscribed ? '#0B5240' : '#8AADA3',
                  border: '1px solid #D4EAE2',
                }}
              >
                {l.unsubscribed ? 'Re-add' : 'Remove'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, color: '#9DB5AC', marginTop: 12, lineHeight: 1.6 }}>
        Everyone who submitted any form with an email address. Independent of tasks: marking done,
        archiving or deleting a task does not remove anyone from here. &ldquo;Remove&rdquo; marks the person
        unsubscribed but keeps the row, so a later submission cannot re-add them.
      </p>
    </div>
  )
}

export default LeadsTab
