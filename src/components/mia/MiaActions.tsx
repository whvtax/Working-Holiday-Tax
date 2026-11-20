'use client';
// Mia customer actions: expense PDF (same CRM endpoint, works for any customer id)
// and a message. Message is saved as not_sent until the SVT number is live.
import { useState } from 'react';

export default function MiaActions({ customerId }: { customerId: string }) {
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const send = async () => {
    try {
      const r = await fetch('/api/mia/send', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ customerId, body: msg }) });
      const d = await r.json().catch(() => ({ ok: false, error: 'bad_response' }));
      setStatus(d.ok ? 'Saved. Not sent: the SVT number is not live yet.' : `Error: ${d.error}`);
      if (d.ok) setMsg('');
    } catch {
      setStatus('Error: network');
    }
  };

  const [formUrl, setFormUrl] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<string | null>(null);

  // Builds the signed SVT intake link for this customer. The link is shown here only;
  // it is not stored in the browser.
  const getFormLink = async () => {
    setFormStatus(null);
    try {
      const r = await fetch('/api/mia/form-link', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ customerId }) });
      const d = await r.json().catch(() => ({ ok: false, error: 'bad_response' }));
      if (d.ok && typeof d.url === 'string') setFormUrl(d.url);
      else setFormStatus(`Error: ${d.error ?? 'unknown'}`);
    } catch {
      setFormStatus('Error: network');
    }
  };

  const copyFormUrl = async () => {
    if (!formUrl) return;
    try {
      await navigator.clipboard.writeText(formUrl);
      setFormStatus('Copied.');
    } catch {
      setFormStatus('Copy failed. Select the link and copy it by hand.');
    }
  };

  return (
    <div style={{ padding: 12, borderTop: '1px solid #eee' }}>
      <div style={{ marginBottom: 8 }}>
        <button onClick={getFormLink}>Get intake form link</button>
        {formUrl && (
          <div style={{ marginTop: 6 }}>
            <input readOnly value={formUrl} onFocus={(e) => e.currentTarget.select()} style={{ width: '100%' }} />
            <button onClick={copyFormUrl}>Copy link</button>
          </div>
        )}
        {formStatus && <div><small>{formStatus}</small></div>}
      </div>
      <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} style={{ width: '100%' }} placeholder="Message" />
      <button onClick={send} disabled={!msg.trim()}>Save message</button>
      {status && <div><small>{status}</small></div>}
    </div>
  );
}
