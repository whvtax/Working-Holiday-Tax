'use client';
// Mia chat list: Mia's own customers, newest activity first, with load-more.
import { useEffect, useState } from 'react';
import MiaActions from './MiaActions';
import MiaExpensePdf from './MiaExpensePdf';

interface MiaChat { id: string; name: string | null; wa_id: string; state: string; last_customer_msg_at: string | null; source: string | null }

export default function MiaChats() {
  const [chats, setChats] = useState<MiaChat[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const load = (offset: number) =>
    fetch(`/api/mia/chats?offset=${offset}&limit=50`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.ok) return setError(d.error ?? 'error');
        setChats((prev) => (offset === 0 ? d.customers : [...prev, ...d.customers]));
        setHasMore(d.hasMore);
      })
      .catch(() => setError('network'));

  useEffect(() => { load(0); }, []);

  if (error) return <div style={{ padding: 24 }}>Mia chats: could not load ({error}).</div>;

  return (
    <div style={{ padding: 24 }}>
      {chats.map((c) => (
        <div key={c.id} onClick={() => setSelected(c.id)} style={{ padding: 10, borderBottom: '1px solid #eee', cursor: 'pointer', background: selected === c.id ? '#fbf3f7' : undefined }}>
          <div>{c.name ?? c.wa_id}</div>
          <small>{c.state}{c.source ? ` · ${c.source}` : ''}</small>
        </div>
      ))}
      {hasMore && <button onClick={() => load(chats.length)}>Load more</button>}
      {selected && <><MiaActions key={selected} customerId={selected} /><MiaExpensePdf key={`pdf-${selected}`} customerId={selected} /></>}
    </div>
  );
}
