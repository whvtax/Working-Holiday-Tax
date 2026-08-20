'use client';
// Simulator: Jo chats as the customer against the real pipeline.
// Everything persists: the simulated customer moves through the real
// Pipeline, Tasks and Chats screens.
import { useEffect, useRef, useState } from 'react';
import { CustomerState, STATE_LABELS, STAGE_GROUPS } from '@/lib/will/state-machine';
import { ASSISTANT_NAME } from '@/lib/will/config';

type Mode = 'SUPERVISED' | 'FULL_AUTO';

interface SimEvent {
  kind: 'customer' | 'ai' | 'pending' | 'sys' | 'task' | 'guard';
  text: string;
  meta?: string;
  msgId?: string;
}

export default function Simulator({ mode, say, onDataChange }: { mode: Mode; say: (m: string) => void; onDataChange: () => void }) {
  const [state, setState] = useState<CustomerState>('NEW_LEAD');
  const [paid, setPaid] = useState(false);
  const [events, setEvents] = useState<SimEvent[]>([
    { kind: 'sys', text: 'Simulator started. You are the customer. State: New Lead' },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [usingMock, setUsingMock] = useState<boolean | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const generation = useRef(0);

  // On mount: sync with the persisted simulator customer (view switches unmount us).
  useEffect(() => {
    fetch('/api/will/state').then((r) => r.json()).then((d) => {
      const sim = d.customers?.find((c: { waId: string }) => c.waId === 'simulator');
      if (sim) {
        setState(sim.state);
        setPaid(sim.paid);
        setEvents([{ kind: 'sys', text: `Simulator resumed. State: ${STATE_LABELS[sim.state as CustomerState]}` }]);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [events]);

  const stageColor = (s: CustomerState) =>
    STAGE_GROUPS.find((g) => (g.states as readonly CustomerState[]).includes(s))?.color ?? '#7a8494';

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const gen = generation.current;
    setInput('');
    setBusy(true);
    setEvents((e) => [...e, { kind: 'customer', text }]);
    try {
      const res = await fetch('/api/will/simulate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, mode }),
      });
      const data = await res.json();
      if (gen !== generation.current) { setBusy(false); return; } // reset happened mid-flight
      setUsingMock(data.usingMock);
      const o = data.outcome;
      const prev = state;
      const next: CustomerState = data.customer.state;
      if (next !== prev) {
        setState(next);
        setPaid(data.customer.paid);
        setEvents((e) => [...e, { kind: 'sys', text: `State changed: ${STATE_LABELS[prev]} → ${STATE_LABELS[next]}` }]);
      }
      if (o.invalidTransition) {
        setEvents((e) => [...e, { kind: 'guard', text: 'State machine rejected an invalid transition proposed by the model' }]);
      }
      if (o.guardViolations?.length) {
        setEvents((e) => [...e, { kind: 'guard', text: `Policy Guard blocked the reply: ${o.guardViolations.join(', ')}` }]);
      }
      if (o.kind === 'human_task') {
        setEvents((e) => [...e, { kind: 'task', text: o.task?.reason ?? 'Human task created', meta: o.task?.severity }]);
      }
      if (o.kind === 'pending_approval' && o.replyText) {
        setEvents((e) => [...e, { kind: 'pending', text: o.replyText, msgId: data.pendingMessageId }]);
      }
      if (o.kind === 'sent' && o.replyText) {
        setEvents((e) => [...e, { kind: 'ai', text: o.replyText }]);
      }
      onDataChange();
    } catch {
      setEvents((e) => [...e, { kind: 'guard', text: 'Engine call failed (see server logs)' }]);
    }
    setBusy(false);
  };

  const approve = async (i: number, msgId?: string) => {
    if (busy) return;
    if (msgId) {
      await fetch('/api/will/actions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'approve_message', id: msgId }),
      });
    }
    setEvents((e) => e.map((ev, j) => (j === i ? { ...ev, kind: 'ai' } : ev)));
    say('Approved & sent ✓');
    onDataChange();
  };

  const reset = async () => {
    if (busy) return;
    generation.current++;
    await fetch('/api/will/actions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'reset_simulator' }),
    });
    setState('NEW_LEAD');
    setPaid(false);
    setEvents([{ kind: 'sys', text: 'Simulator reset. State: New Lead' }]);
    onDataChange();
  };

  return (
    <section className="view active">
      <h2 className="vt">Simulator</h2>
      <div className="vsub">
        Chat with {ASSISTANT_NAME} as if you were a customer. Same engine, same Policy Guard, and it moves through the real pipeline.
        {usingMock && <span className="chip" style={{ marginLeft: 8, color: 'var(--warn)' }}>MOCK MODE, no API key yet</span>}
      </div>

      <div className="simwrap">
        <div className="simhead">
          <span className="cstate" style={{ ['--sc' as string]: stageColor(state) }}>{STATE_LABELS[state]}</span>
          <span className="simmeta">Paid: {paid ? 'yes' : 'no'} · Mode: {mode}</span>
          <button className="btn ghost" style={{ marginLeft: 'auto' }} onClick={reset}>↺ Reset</button>
        </div>
        <div className="msgs" ref={boxRef} style={{ minHeight: 340 }}>
          {events.map((ev, i) => {
            if (ev.kind === 'sys') return <div key={i} className="sysline">⚡ {ev.text}</div>;
            if (ev.kind === 'guard') return <div key={i} className="guardline">🛡 {ev.text}</div>;
            if (ev.kind === 'task') return <div key={i} className="taskline">🚨 Human Task ({ev.meta}): {ev.text}</div>;
            if (ev.kind === 'pending')
              return (
                <div key={i} className="msg out msg-new" style={{ opacity: 0.85, border: '1px dashed rgba(122,99,232,.6)' }}>
                  {ev.text}
                  <div className="mt"><span className="ai">✎ awaiting your approval</span></div>
                  <div className="abtns" style={{ marginTop: 8 }}>
                    <button className="btn approve" onClick={() => approve(i, ev.msgId)}>✓ Approve</button>
                  </div>
                </div>
              );
            return (
              <div key={i} className={`msg ${ev.kind === 'customer' ? 'in' : 'out'} msg-new`}>
                {ev.text}
                <div className="mt">{ev.kind === 'ai' && <span className="ai">{ASSISTANT_NAME}</span>}</div>
              </div>
            );
          })}
          {busy && <div className="sysline">{ASSISTANT_NAME} is thinking…</div>}
        </div>
        <div className="composer">
          <input
            placeholder="Type as the customer…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && send()}
          />
          <button className="send" onClick={send} disabled={busy}>➤</button>
        </div>
      </div>
    </section>
  );
}
