'use client';
// Mia pipeline screen: stage columns, customers in each stage, source shown per customer.
import { useEffect, useState } from 'react';
import { STAGE_GROUPS, STATE_LABELS, type CustomerState } from '@/lib/will/state-machine';

const ALL_STATES = STAGE_GROUPS.flatMap((g) => g.states) as readonly CustomerState[];

interface MiaCustomer { id: string; name: string | null; wa_id: string; state: string; paid: boolean; source: string | null; source_detail: string | null }
interface Group { id: string; label: string; customers: MiaCustomer[] }

export default function MiaPipeline() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/mia/pipeline')
      .then((r) => r.json())
      .then((d) => (d.ok ? setGroups(d.groups) : setError(d.error ?? 'error')))
      .catch(() => setError('network'));
  }, []);

  const [moveError, setMoveError] = useState<string | null>(null);

  const reload = () =>
    fetch('/api/mia/pipeline').then((r) => r.json()).then((d) => (d.ok ? setGroups(d.groups) : setError(d.error ?? 'error'))).catch(() => setError('network'));

  const move = async (customerId: string, toState: string) => {
    setMoveError(null);
    try {
      const r = await fetch('/api/mia/move', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ customerId, toState }) });
      const d = await r.json().catch(() => ({ ok: false }));
      if (!d.ok) return setMoveError('Could not move this customer. Nothing changed.');
      await reload();
    } catch {
      setMoveError('Network error. Nothing changed.');
    }
  };

  if (error) return <div style={{ padding: 24 }}>Mia: could not load ({error}).</div>;

  return (
    <div style={{ padding: 24 }}>
    {moveError && <div role="alert" style={{ marginBottom: 12 }}>{moveError}</div>}
    <div style={{ display: 'flex', gap: 16, overflowX: 'auto' }}>
      {groups.map((g) => (
        <div key={g.id} style={{ minWidth: 240, border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
          <strong>{g.label}</strong> <span>({g.customers.length})</span>
          {g.customers.map((c) => (
            <div key={c.id} style={{ marginTop: 8, padding: 8, background: '#fbf3f7', borderRadius: 6 }}>
              <div>{c.name ?? c.wa_id}</div>
              <small>{c.source ? `${c.source}${c.source_detail ? ` · ${c.source_detail}` : ''}` : 'source not recorded'}</small>
              <select value={c.state} onChange={(e) => move(c.id, e.target.value)} style={{ marginTop: 4 }}>
                {ALL_STATES.map((st) => <option key={st} value={st}>{STATE_LABELS[st]}</option>)}
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
}
