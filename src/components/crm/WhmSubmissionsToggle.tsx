'use client'

/**
 * WhmSubmissionsToggle
 * --------------------
 * The override for the working-holiday-maker block.
 *
 * Normally OFF: a client who declares themselves a WHM for tax purposes gets
 * an explanation screen instead of lodging, because with the correct 15% paid
 * and no significant expenses there is no refund to claim.
 *
 * For the rare client where that isn't true, flip this ON, let them submit,
 * then flip it OFF. The form reads the switch at the moment Submit is
 * pressed, so it applies immediately without them reloading anything.
 *
 * Deliberately noisy when ON: this is a temporary state that costs money if
 * it's forgotten, so it shows an amber banner rather than a quiet checkbox.
 */

import { useEffect, useState } from 'react'

export function WhmSubmissionsToggle() {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const res = await fetch('/api/crm/settings', { cache: 'no-store' })
      const data = await res.json()
      if (data?.ok) setAllowed(data.allowWhmSubmissions === true)
      else setError('Could not read the setting')
    } catch {
      setError('Could not read the setting')
    }
  }

  useEffect(() => { void load() }, [])

  const flip = async () => {
    if (allowed === null || saving) return
    const next = !allowed
    setSaving(true)
    setError('')
    // Optimistic: the switch should feel instant, and a failure re-reads below.
    setAllowed(next)
    try {
      const res = await fetch('/api/crm/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allowWhmSubmissions: next }),
      })
      const data = await res.json()
      if (!data?.ok) throw new Error('save failed')
      setAllowed(data.allowWhmSubmissions === true)
    } catch {
      setError('Could not save. Try again.')
      void load()
    } finally {
      setSaving(false)
    }
  }

  if (allowed === null && !error) return null

  return (
    <div style={{
      background: allowed ? '#FEF3C7' : '#F5F9F7',
      border: `1.5px solid ${allowed ? '#F59E0B' : '#D4EAE2'}`,
      borderRadius: 12,
      padding: '10px 12px',
      margin: '0 0 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <button
        type="button"
        onClick={flip}
        disabled={saving}
        aria-pressed={allowed === true}
        aria-label="Allow working holiday maker submissions"
        style={{
          width: 42, height: 24, borderRadius: 100, flexShrink: 0,
          background: allowed ? '#0B5240' : '#C8DAD3',
          border: 'none', cursor: saving ? 'wait' : 'pointer',
          position: 'relative', transition: 'background .15s', padding: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: 3, left: allowed ? 21 : 3,
          width: 18, height: 18, borderRadius: '50%', background: '#fff',
          transition: 'left .15s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }} />
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: allowed ? '#92400E' : '#1A2822' }}>
          {allowed ? 'WHM submissions are OPEN' : 'WHM submissions blocked'}
        </div>
        <div style={{ fontSize: 11, color: allowed ? '#92400E' : '#587066', lineHeight: 1.4 }}>
          {allowed
            ? 'Anyone declaring WHM can lodge right now. Switch this off once they have.'
            : 'WHM clients see the no-refund explanation instead of lodging.'}
        </div>
        {error && <div style={{ fontSize: 11, color: '#DC2626', marginTop: 3 }}>{error}</div>}
      </div>
    </div>
  )
}

export default WhmSubmissionsToggle
