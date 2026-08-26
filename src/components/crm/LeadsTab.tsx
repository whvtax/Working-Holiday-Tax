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
 *
 * This is a fragment rendered inside the dashboard's main column, so it renders
 * no scope wrapper, no rail and no <main> of its own — only the head/body pair.
 */

import { useEffect, useMemo, useState } from 'react'
import { NavIcons } from './Shell'

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
      <div className="phead">
        <div className="hrow">
          <h1 className="vt">Leads</h1>
          <span className="chip">{leads === null ? '…' : `${activeCount} total`}</span>
          <div className="hspacer" />
          <a className="btn quiet" href="/api/crm/leads?csv=1" title="Download as CSV (opens in Excel)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Export CSV
          </a>
        </div>

        <div className="search" style={{ maxWidth: 340, marginTop: 8 }}>
          <span className="search-ic">{NavIcons.search}</span>
          <input
            placeholder="Search by name, WhatsApp or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {error && <p style={{ fontSize: 11.5, color: 'var(--crit)', marginTop: 8 }}>{error}</p>}
      </div>

      {/* Only this part scrolls. */}
      <div className="pbody">
        <div className="card">
          <div className="tblwrap">
            <table className="tbl">
              <thead>
                <tr>
                  {['Name', 'Email', 'WhatsApp', 'Source', ''].map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 && leads !== null && (
                  <tr>
                    <td colSpan={5} style={{ padding: 0 }}>
                      <div className="empty">
                        {search ? 'Nobody matches that search.' : 'Nobody on the list yet.'}
                      </div>
                    </td>
                  </tr>
                )}

                {visible.map(l => (
                  <tr key={l.email}>
                    <td style={{ fontWeight: 600 }}>{l.fullName || '—'}</td>
                    <td style={{ direction: 'ltr' }}>{l.email}</td>
                    <td className="num" style={{ direction: 'ltr', whiteSpace: 'nowrap' }}>{l.whatsapp || '—'}</td>
                    <td className="muted">{SOURCE_LABELS[l.source] ?? l.source}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn quiet"
                        onClick={() => void removeLead(l)}
                        disabled={busy === l.email}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadsTab
