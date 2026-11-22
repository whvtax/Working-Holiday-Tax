'use client'
// The Log tab (Jo, Nov 22): the whole audit trail, newest first. Every line can be opened to see its full detail.
import { useState } from 'react'
import type { AuditRow } from '@/lib/ella/store'
import s from './ella.module.css'

export function EllaLog({ rows }: { rows: AuditRow[] }) {
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const shown = needle ? rows.filter(r => `${r.action} ${r.actor} ${JSON.stringify(r.detail)}`.toLowerCase().includes(needle)) : rows
  return (
    <section className={s.card}>
      <div className={s.cardHead}>
        <div>
          <h2>Log</h2>
          <p>Every action, tick, step and studio stage, newest first. Open a line to see all of its detail. Keys and tokens are never written here.</p>
        </div>
      </div>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter by action, production or any text" aria-label="Filter the log" style={{ width: '100%', padding: '8px 10px', margin: '8px 0', borderRadius: 8, border: '1px solid #d1d5db' }} />
      <p className={s.tileSub}>{shown.length} of {rows.length} lines (the latest {rows.length})</p>
      <div>
        {shown.map(r => (
          <details key={r.id} style={{ borderBottom: '1px solid #e5e7eb', padding: '6px 0' }}>
            <summary>
              <span>{new Date(r.at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</span>{' · '}
              <strong>{r.action}</strong>{' · '}{r.actor}
            </summary>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, margin: '6px 0 0' }}>{JSON.stringify(r.detail, null, 2)}</pre>
          </details>
        ))}
      </div>
    </section>
  )
}
