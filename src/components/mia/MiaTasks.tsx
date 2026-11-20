'use client';
// Mia open tasks. Tasks handled in Will are already hidden by the API.
import { useEffect, useState } from 'react';

interface MiaTask { id: string; customer_id: string | null; kind: string; note: string | null; created_at: string }

export default function MiaTasks() {
  const [tasks, setTasks] = useState<MiaTask[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/mia/tasks')
      .then((r) => r.json())
      .then((d) => (d.ok ? setTasks(d.tasks) : setError(d.error ?? 'error')))
      .catch(() => setError('network'));
  }, []);

  if (error) return <div style={{ padding: 24 }}>Mia tasks: could not load ({error}).</div>;

  return (
    <div style={{ padding: 24 }}>
      <strong>Mia tasks ({tasks.length})</strong>
      {tasks.map((t) => (
        <div key={t.id} style={{ padding: 10, borderBottom: '1px solid #eee' }}>
          <div>{t.kind}</div>
          {t.note && <small>{t.note}</small>}
        </div>
      ))}
    </div>
  );
}
