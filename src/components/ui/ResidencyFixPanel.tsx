'use client'

/**
 * The residency correction link (Jo, 3 Nov). Shown on the tax-residency page ONLY
 * when it is opened with a valid one-time correction link (?k=). It lets the
 * customer answer that one question again. Nothing else on their record is
 * reachable from here, and without the link the page looks exactly as before.
 * The questionnaire components are not touched: this sits beside them.
 */

import { useEffect, useState } from 'react'

type State = 'checking' | 'none' | 'ok' | 'used' | 'saving' | 'done'

export default function ResidencyFixPanel() {
  const [state, setState] = useState<State>('checking')
  const [token, setToken] = useState('')
  const [pick, setPick] = useState<'resident' | 'whm' | ''>('')
  const [error, setError] = useState('')

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get('k') ?? ''
    if (!k) { setState('none'); return }
    setToken(k)
    let alive = true
    fetch(`/api/tax-form/link?k=${encodeURIComponent(k)}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((j: { state?: string; purpose?: string }) => {
        if (!alive) return
        if (j.purpose !== 'fix') setState('none')
        else setState(j.state === 'ok' ? 'ok' : j.state === 'used' ? 'used' : 'none')
      })
      .catch(() => alive && setState('none'))
    return () => { alive = false }
  }, [])

  if (state === 'checking' || state === 'none') return null

  const submit = async () => {
    if (!pick) { setError('Please choose one option to continue.'); return }
    setError('')
    setState('saving')
    try {
      const res = await fetch('/api/tax-form/fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ k: token, status: pick }),
      })
      const j = await res.json().catch(() => ({})) as { ok?: boolean; error?: string }
      if (res.ok && j.ok) { setState('done'); return }
      if (j.error === 'link_used') { setState('used'); return }
      setError('Something went wrong. Please message us on WhatsApp and we will fix it for you.')
      setState('ok')
    } catch {
      setError('Something went wrong. Please message us on WhatsApp and we will fix it for you.')
      setState('ok')
    }
  }

  const box: React.CSSProperties = { maxWidth: 560, margin: '24px auto', width: 'calc(100% - 32px)', padding: '20px', border: '1px solid #d9dee5', borderRadius: 8, background: '#fff' }
  const opt = (active: boolean): React.CSSProperties => ({
    display: 'block', width: '100%', textAlign: 'left', padding: '14px 16px', marginTop: 10, borderRadius: 8,
    border: `2px solid ${active ? '#0f6e56' : '#d9dee5'}`, background: active ? '#eef8f4' : '#fff', cursor: 'pointer', fontSize: 16,
  })

  if (state === 'done') {
    return <div style={box} role="status"><strong>Thank you, your answer has been updated.</strong><p style={{ marginTop: 8 }}>You do not need to do anything else. Our team will take it from here.</p></div>
  }
  if (state === 'used') {
    return <div style={box} role="status"><strong>This link has already been used.</strong><p style={{ marginTop: 8 }}>If something still needs changing, message us on WhatsApp and we will help.</p></div>
  }
  return (
    <div style={box}>
      <strong>Update your answer</strong>
      <p style={{ marginTop: 8 }}>Please choose the option that best describes you. Our team reviews it as part of preparing your return, and the ATO makes the final decision.</p>
      <button type="button" style={opt(pick === 'resident')} onClick={() => { setPick('resident'); setError('') }} aria-pressed={pick === 'resident'}>Australian tax resident</button>
      <button type="button" style={opt(pick === 'whm')} onClick={() => { setPick('whm'); setError('') }} aria-pressed={pick === 'whm'}>Working holiday maker</button>
      {error && <p role="alert" style={{ color: '#b42318', marginTop: 10 }}>{error}</p>}
      <button type="button" onClick={submit} disabled={state === 'saving'}
        style={{ marginTop: 16, padding: '12px 20px', borderRadius: 8, border: 0, background: '#0f6e56', color: '#fff', fontSize: 16, cursor: 'pointer' }}>
        {state === 'saving' ? 'Saving...' : 'Save my answer'}
      </button>
    </div>
  )
}
