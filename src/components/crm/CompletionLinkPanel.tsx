'use client'

/**
 * CompletionLinkPanel
 * -------------------
 * Shown on a task that came from form 1 and is still waiting for form 2.
 *
 * Issues the personal link, shows it for copying into WhatsApp, and can revoke
 * it. Issuing again always replaces the previous link rather than adding a
 * second live one.
 *
 * A suggested message is offered alongside the link, because pasting a bare URL
 * into WhatsApp gets a much worse response than a line of context.
 */

import { useEffect, useState } from 'react'

const MESSAGE = (firstName: string, url: string) =>
  `Hey${firstName ? ` ${firstName}` : ''}! I've gone through your details and it looks like you may be due a refund. ` +
  `To work out exactly how much, I just need a few last things. Takes about 2 minutes: ${url}`

export function CompletionLinkPanel({ taskId, firstName }: { taskId: string; firstName?: string }) {
  const [url, setUrl] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState<'link' | 'message' | ''>('')
  const [error, setError] = useState('')

  // A link may already be live from an earlier visit to this task. Load it, or
  // "create" would issue a second token and quietly break the one already sent.
  useEffect(() => {
    let cancelled = false
    fetch(`/api/crm/completion-link?taskId=${encodeURIComponent(taskId)}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(d => {
        if (cancelled || !d?.ok || !d.url) return
        setUrl(d.url)
        setExpiresAt(d.expiresAt ?? '')
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [taskId])

  const call = async (action: 'issue' | 'revoke') => {
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/crm/completion-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, action }),
      })
      const d = await res.json()
      if (!d?.ok) throw new Error('failed')
      if (action === 'revoke') { setUrl(''); setExpiresAt('') }
      else { setUrl(d.url); setExpiresAt(d.expiresAt) }
    } catch {
      setError('Could not update the link. Try again.')
    } finally {
      setBusy(false)
    }
  }

  const copy = async (what: 'link' | 'message') => {
    const text = what === 'link' ? url : MESSAGE(firstName ?? '', url)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(what)
      setTimeout(() => setCopied(''), 2000)
    } catch {
      setError('Could not copy. Select the text and copy manually.')
    }
  }

  return (
    <div style={{
      background: '#F5F9F7', border: '1.5px solid #D4EAE2', borderRadius: 12,
      padding: '12px 14px', margin: '12px 0',
    }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0B5240', marginBottom: 4 }}>
        Completion link
      </div>
      <div style={{ fontSize: 11, color: '#587066', lineHeight: 1.5, marginBottom: 10 }}>
        {url
          ? `Valid until ${new Date(expiresAt).toLocaleDateString('en-AU')}. Single use — it stops working once they submit.`
          : 'Form 1 is in. Issue a link so they can complete the rest.'}
      </div>

      {url && (
        <div style={{
          background: '#fff', border: '1px solid #D4EAE2', borderRadius: 8,
          padding: '8px 10px', fontSize: 11, color: '#1A2822',
          wordBreak: 'break-all', marginBottom: 10, fontFamily: 'ui-monospace, monospace',
        }}>{url}</div>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {!url && (
          <button type="button" onClick={() => call('issue')} disabled={busy} style={btn(true, busy)}>
            {busy ? 'Creating…' : 'Create link'}
          </button>
        )}
        {url && (
          <>
            <button type="button" onClick={() => copy('message')} style={btn(true, false)}>
              {copied === 'message' ? 'Copied' : 'Copy message'}
            </button>
            <button type="button" onClick={() => copy('link')} style={btn(false, false)}>
              {copied === 'link' ? 'Copied' : 'Copy link only'}
            </button>
            <button type="button" onClick={() => call('issue')} disabled={busy} style={btn(false, busy)}>
              New link
            </button>
            <button type="button" onClick={() => call('revoke')} disabled={busy} style={btn(false, busy)}>
              Revoke
            </button>
          </>
        )}
      </div>

      {error && <div style={{ fontSize: 11, color: '#DC2626', marginTop: 8 }}>{error}</div>}
    </div>
  )
}

function btn(primary: boolean, busy: boolean): React.CSSProperties {
  return {
    height: 32, padding: '0 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
    fontFamily: 'inherit', cursor: busy ? 'wait' : 'pointer',
    background: primary ? '#0B5240' : '#fff',
    color: primary ? '#fff' : '#587066',
    border: primary ? 'none' : '1.5px solid #D4EAE2',
    opacity: busy ? 0.6 : 1,
  }
}

export default CompletionLinkPanel
