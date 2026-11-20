'use client';
// Mia status bar: its own Pause (affects only Mia).
import { useEffect, useState } from 'react';

export default function MiaStatusBar() {
  const [paused, setPaused] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/mia/status').then((r) => r.json()).then((d) => (d.ok ? setPaused(d.paused) : setError(d.error ?? 'error'))).catch(() => setError('network'));
  }, []);

  const toggle = async () => {
    if (paused === null) return;
    try {
      const r = await fetch('/api/mia/status', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ paused: !paused }) });
      const d = await r.json();
      if (d.ok) setPaused(d.paused); else setError(d.error ?? 'error');
    } catch { setError('the change was not confirmed. Reload to see the real state'); }
  };

  if (error) return <div style={{ padding: 12 }}>Mia status: {error}</div>;

  return (
    <div style={{ padding: 12, display: 'flex', gap: 16, alignItems: 'center', borderBottom: '1px solid #ddd' }}>
      <strong>Mia</strong>
      <span>{paused === null ? '…' : paused ? 'Paused' : 'Running'}</span>
      <button onClick={toggle} disabled={paused === null}>{paused ? 'Resume Mia' : 'Pause Mia'}</button>
    </div>
  );
}
