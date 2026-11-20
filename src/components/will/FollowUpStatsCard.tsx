'use client';
// Follow-up results (Jo, 18 Nov): how many leads paid after each pre-payment
// follow-up, so in a few months it is clear which to keep, change or remove.
import { useEffect, useState } from 'react';
import type { FollowUpStepStats } from '@/lib/will/followup-stats';

const LABELS: Record<string, string> = {
  fu_pre_24h: 'Follow-up 1 (no bank details yet)',
  fu_price_sent: 'Follow-up 2 (has the bank details)',
  fu_pre_3d: 'Follow-up 3 (last, before closing)',
};

export default function FollowUpStatsCard({ brand }: { brand?: 'wht' | 'svt' } = {}) {
  const [steps, setSteps] = useState<FollowUpStepStats[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    void (async () => {
      try {
        const r = await fetch(`/api/will/followup-stats${brand ? `?brand=${brand}` : ''}`, { cache: 'no-store' });
        const j = await r.json();
        if (!r.ok || !j.ok) { setError('Could not load the follow-up results.'); return; }
        setSteps(j.steps);
      } catch { setError('Could not load the follow-up results.'); }
    })();
  }, [brand]);
  return (
    <div className="panel" style={{ marginBottom: 12 }}>
      <div className="libcat" style={{ marginTop: 0 }}>Follow-ups before payment</div>
      <div className="vsub">Of the leads who got each follow-up, how many paid afterwards.</div>
      {error && <div className="vsub" role="alert" style={{ color: 'var(--red, #b00020)' }}>{error}</div>}
      {steps && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
          <thead>
            <tr><th style={{ textAlign: 'left' }}></th><th style={{ textAlign: 'right' }}>Got it</th><th style={{ textAlign: 'right' }}>Paid after</th><th style={{ textAlign: 'right' }}>Rate</th><th style={{ textAlign: 'right' }}>Last nudge before paying</th></tr>
          </thead>
          <tbody>
            {steps.map((s) => (
              <tr key={s.step}>
                <td>{LABELS[s.step] ?? s.step}</td>
                <td style={{ textAlign: 'right' }}>{s.got}</td>
                <td style={{ textAlign: 'right' }}>{s.paidAfter}</td>
                <td style={{ textAlign: 'right' }}>{s.rate == null ? 'No data yet' : `${s.rate}%`}</td>
                <td style={{ textAlign: 'right' }}>{s.lastNudge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="vsub" style={{ marginTop: 8 }}>Last 12 months. &quot;Last nudge before paying&quot; counts the people for whom this was the most recent follow-up when they paid.</div>
    </div>
  );
}
