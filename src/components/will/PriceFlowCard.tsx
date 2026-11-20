'use client';
// The price message A/B card (Jo, 18 Nov): which version leads to more payments,
// and the switch between them. Lives in System & Costs.
import { useCallback, useEffect, useState } from 'react';
import type { PriceFlowStats } from '@/lib/will/price-flow-stats';

type Setting = 'old' | 'new' | 'split';
const LABELS: Record<Setting, string> = { old: 'A for everyone', new: 'B for everyone', split: 'Half and half' };

export default function PriceFlowCard({ act }: { act: (body: Record<string, unknown>) => Promise<{ ok?: boolean; error?: string }> }) {
  const [setting, setSetting] = useState<Setting | null>(null);
  const [stats, setStats] = useState<PriceFlowStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/will/price-flow', { cache: 'no-store' });
      const j = await r.json();
      if (!r.ok || !j.ok) { setError('Could not load the A/B result.'); return; }
      setSetting(j.setting); setStats(j.stats); setError(null);
    } catch { setError('Could not load the A/B result.'); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const choose = async (next: Setting) => {
    if (saving || next === setting) return;
    setSaving(true);
    const r = await act({ action: 'set_price_flow', mode: next });
    setSaving(false);
    if (r?.ok) { setSetting(next); setError(null); } else setError(r?.error ?? 'The setting was not saved.');
  };

  const cell = (v: number | null, suffix = '') => (v == null ? 'No data yet' : `${v}${suffix}`);

  return (
    <div className="panel" style={{ marginBottom: 12 }}>
      <div className="libcat" style={{ marginTop: 0 }}>Price message A/B</div>
      <div className="vsub">A is one message with the bank details. B explains the steps first and sends the bank details after a yes.</div>
      {error && <div className="vsub" role="alert" style={{ color: 'var(--red, #b00020)' }}>{error}</div>}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '10px 0' }} role="radiogroup" aria-label="Which version customers get">
        {(Object.keys(LABELS) as Setting[]).map((s) => (
          <button key={s} role="radio" aria-checked={setting === s} disabled={saving} className={`chip ${setting === s ? 'active' : ''}`}
            onClick={() => void choose(s)} style={{ cursor: 'pointer' }}>{LABELS[s]}</button>
        ))}
      </div>
      {stats && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr><th style={{ textAlign: 'left' }}></th><th style={{ textAlign: 'right' }}>A, one message</th><th style={{ textAlign: 'right' }}>B, two messages</th></tr>
          </thead>
          <tbody>
            <tr><td>Got the price</td><td style={{ textAlign: 'right' }}>{stats.a.sent}</td><td style={{ textAlign: 'right' }}>{stats.b.sent}</td></tr>
            <tr><td>Paid</td><td style={{ textAlign: 'right' }}>{stats.a.paid}</td><td style={{ textAlign: 'right' }}>{stats.b.paid}</td></tr>
            <tr><td>Conversion</td><td style={{ textAlign: 'right' }}>{cell(stats.a.rate, '%')}</td><td style={{ textAlign: 'right' }}>{cell(stats.b.rate, '%')}</td></tr>
          </tbody>
        </table>
      )}
      {stats && !stats.enough && (
        <div className="vsub" style={{ marginTop: 8 }}>Too few customers to compare yet. Wait for at least {stats.minPerSide} on each side before choosing a winner.</div>
      )}
      <div className="vsub" style={{ marginTop: 4 }}>Counts customers whose first price message is in the latest 5,000 log rows.</div>
    </div>
  );
}
