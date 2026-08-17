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
  const [busy, setBusy] = useState('')

  const load = async () => {
    try {
      const res = await fetch('/api/crm/leads', { cache: 'no-store' })
      const d = await res.json()
      if (!d?.ok) {
        setLeads([])
        setError(d?.error === 'table_missing'
          ? 'The leads table does not exist yet. Run migrations 016 to 020 in Supabase, then reload.'
          : `Could not load the list. ${d?.detail ?? ''}`.trim())
        return
      }
      setLeads(d.leads)
    } catch {
      setLeads([])
      setError('Could not reach the server. Check your connection and reload.')
    }
  }
  useEffect(() => { void load() }, [])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return (leads ?? [])
      // Unsubscribed people are never listed: showing them only invites
      // mailing someone who asked not to be mailed.
      .filter(l => !l.unsubscribed)
      .filter(l => !q || l.fullName.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.whatsapp.includes(q))
  }, [leads, search])

  /**
   * Marks someone unsubscribed. The row leaves the list immediately, since
   * unsubscribed people are never shown; the row itself stays in the database
   * so a later submission can't quietly re-add them.
   *
   * Re-adding is deliberately not offered here - putting someone back on a
   * mailing list they asked to leave shouldn't be one stray click away. It can
   * be done in Supabase if it was a genuine mistake:
   *   update crm_leads set unsubscribed = false where email = '...';
   */
  const removeLead = async (lead: Lead) => {
    setBusy(lead.email)
    try {
      const res = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: lead.email, unsubscribed: true }),
      })
      const d = await res.json()
      if (!d?.ok) throw new Error()
      setLeads(prev => (prev ?? []).map(l =>
        l.email === lead.email ? { ...l, unsubscribed: true } : l,
      ))
    } catch {
      setError('Could not remove that person.')
    } finally {
      setBusy('')
    }
  }

  const activeCount = (leads ?? []).filter(l => !l.unsubscribed).length

  return (
    // Same structure as the Clients and Archive tabs: a flex column that
    // doesn't scroll, a fixed header, and only the list scrolling below it.
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ padding: '26px 26px 8px', flexShrink: 0 }}>
      {/* Header and search styled to match the Clients and Archive tabs
          exactly: same title, same count chip, same 38px search field, same
          outlined export button. */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0a1410', letterSpacing: '-0.5px', margin: 0 }}>Leads</h1>
          <span style={{ background: '#e8f5f0', color: '#0E5C42', borderRadius: 20, padding: '3px 11px', fontSize: 12, fontWeight: 600 }}>
            {leads === null ? '…' : `${activeCount} total`}
          </span>
        </div>
        <a
          href="/api/crm/leads?csv=1"
          title="Download as CSV (opens in Excel)"
          style={{
            padding: '8px 14px', fontSize: 13, background: '#fff', color: '#0E5C42',
            border: '1.5px solid #d4eae2', borderRadius: 9, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex',
            alignItems: 'center', gap: 6, textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Export CSV
        </a>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 3, minWidth: 200 }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
               width="13" height="13" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#aabab2" strokeWidth="1.8"/>
            <path d="M21 21l-4.35-4.35" stroke="#aabab2" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            style={{ width: '100%', height: '38px', padding: '0 12px 0 32px', border: '1px solid #d8e4dc',
                     borderRadius: 9, fontSize: 13, background: '#fff', outline: 'none',
                     fontFamily: 'inherit', color: '#0a1410', boxSizing: 'border-box' }}
            placeholder="Search by name, WhatsApp or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

        {error && <p style={{ fontSize: 12.5, color: '#DC2626', marginBottom: 12 }}>{error}</p>}
      </div>

      {/* Only this part scrolls. */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 26px 32px' }}>
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
            alignItems: 'center',
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
                onClick={() => void removeLead(l)}
                disabled={busy === l.email}
                style={{
                  fontSize: 11, fontWeight: 600, fontFamily: 'inherit', padding: '4px 10px',
                  borderRadius: 100, cursor: 'pointer',
                  background: '#fff', color: '#8AADA3',
                  border: '1px solid #D4EAE2',
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default LeadsTab
