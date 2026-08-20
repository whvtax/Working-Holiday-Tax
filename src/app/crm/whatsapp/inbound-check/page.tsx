'use client';
// "Why didn't that message arrive?" — a one-screen answer.
//
// Inbound drops messages in five different places on purpose, and all five look
// identical from the CRM: nothing shows up. This page names the one that fired.
import { useCallback, useEffect, useState } from 'react';

interface Report {
  ok: boolean;
  config: {
    phoneNumberId: string | null;
    phoneNumberIdSource: string;
    envPhoneNumberId: string | null;
    appSecretSet: boolean;
    verifyTokenSet: boolean;
    sendTokenSet: boolean;
    cutoffIso: string | null;
    cutoffInFuture: boolean;
  };
  blockTable: { ok: boolean; detail: string };
  counts: Record<string, number>;
  recent: { id: string; action: string; at: string; detail: unknown }[];
  findings: string[];
  nextSteps: string[];
}

const card: React.CSSProperties = {
  border: '1px solid #e5e7eb', borderRadius: 12, padding: 18, marginTop: 14, background: '#fff',
};

function Dot({ ok }: { ok: boolean }) {
  return <span style={{ color: ok ? '#0a7d3c' : '#c0202a', fontWeight: 700 }}>{ok ? '●' : '●'}</span>;
}

export default function InboundCheck() {
  const [data, setData] = useState<Report | null>(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [number, setNumber] = useState('');

  const load = useCallback(async (n?: string) => {
    setBusy(true); setErr('');
    try {
      const q = n && n.replace(/\D/g, '') ? `?number=${encodeURIComponent(n.replace(/\D/g, ''))}` : '';
      const res = await fetch(`/api/will/whatsapp/inbound-check${q}`, { cache: 'no-store' });
      const d = await res.json();
      if (!d.ok) { setErr(d.error || 'failed'); setData(null); } else setData(d);
    } catch (e) {
      setErr((e as Error).message);
    } finally { setBusy(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div style={{ maxWidth: 820, margin: '40px auto', padding: 24, fontFamily: 'system-ui, sans-serif', color: '#1f2328' }}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Inbound check</h1>
      <p style={{ color: '#5c6572', fontSize: 14, marginTop: 0 }}>
        Why a WhatsApp message did or did not reach Will.
      </p>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <input value={number} onChange={(e) => setNumber(e.target.value)}
          placeholder="Check a specific number (optional), e.g. 61424513998"
          style={{ flex: 1, padding: 9, border: '1px solid #d1d5db', borderRadius: 7, fontSize: 13 }} />
        <button onClick={() => load(number)} disabled={busy}
          style={{ background: '#0E5C42', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          {busy ? 'Checking…' : 'Check'}
        </button>
      </div>

      {err && <div style={{ ...card, borderColor: '#f3c2c2', background: 'rgba(208,59,59,.06)' }}>{err}</div>}

      {data && (
        <>
          <div style={card}>
            <h2 style={{ fontSize: 15, margin: '0 0 10px' }}>What we found</h2>
            {data.findings.length === 0
              ? <p style={{ margin: 0, color: '#5c6572' }}>Nothing recorded yet.</p>
              : <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {data.findings.map((f, i) => <li key={i} style={{ margin: '6px 0', fontSize: 14 }}>{f}</li>)}
                </ul>}
          </div>

          <div style={{ ...card, borderColor: '#0E5C42' }}>
            <h2 style={{ fontSize: 15, margin: '0 0 10px' }}>What to do</h2>
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              {data.nextSteps.map((s, i) => <li key={i} style={{ margin: '6px 0', fontSize: 14 }}>{s}</li>)}
            </ol>
          </div>

          <div style={card}>
            <h2 style={{ fontSize: 15, margin: '0 0 10px' }}>Configuration</h2>
            <table style={{ width: '100%', fontSize: 13.5, borderCollapse: 'collapse' }}>
              <tbody>
                <tr><td style={{ padding: '5px 0' }}>App secret (inbound)</td><td><Dot ok={data.config.appSecretSet} /> {data.config.appSecretSet ? 'set' : 'MISSING — all inbound is rejected'}</td></tr>
                <tr><td style={{ padding: '5px 0' }}>Verify token</td><td><Dot ok={data.config.verifyTokenSet} /> {data.config.verifyTokenSet ? 'set' : 'missing'}</td></tr>
                <tr><td style={{ padding: '5px 0' }}>Send token (outbound)</td><td><Dot ok={data.config.sendTokenSet} /> {data.config.sendTokenSet ? 'set' : 'not set — Will cannot send yet'}</td></tr>
                <tr><td style={{ padding: '5px 0' }}>Phone number id in use</td><td>{data.config.phoneNumberId ?? '—'} <span style={{ color: '#5c6572' }}>({data.config.phoneNumberIdSource})</span></td></tr>
                <tr><td style={{ padding: '5px 0' }}>Fresh-start cutoff</td><td>{data.config.cutoffIso ?? 'none'} {data.config.cutoffInFuture && <strong style={{ color: '#c0202a' }}>— in the future, dropping everything</strong>}</td></tr>
                <tr><td style={{ padding: '5px 0' }}>Returning-contact table</td><td><Dot ok={data.blockTable.ok} /> {data.blockTable.detail}</td></tr>
              </tbody>
            </table>
          </div>

          <div style={card}>
            <h2 style={{ fontSize: 15, margin: '0 0 10px' }}>Recent inbound events</h2>
            {data.recent.length === 0
              ? <p style={{ margin: 0, color: '#5c6572', fontSize: 14 }}>
                  Nothing yet. Send a WhatsApp message to the business number and press Check.
                </p>
              : <div style={{ maxHeight: 340, overflow: 'auto' }}>
                  {data.recent.map((r) => (
                    <div key={r.id} style={{ borderBottom: '1px solid #f0f2f5', padding: '8px 0', fontSize: 12.5 }}>
                      <div><strong>{r.action}</strong> <span style={{ color: '#5c6572' }}>{r.at}</span></div>
                      <pre style={{ margin: '4px 0 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#5c6572', fontSize: 11.5 }}>
                        {JSON.stringify(r.detail)}
                      </pre>
                    </div>
                  ))}
                </div>}
          </div>
        </>
      )}
    </div>
  );
}
