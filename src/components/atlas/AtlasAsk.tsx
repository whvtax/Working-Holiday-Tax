'use client';
// Chat with Atlas (decision 016), laid out like the big chat apps: messages
// flow down, your words sit in a bubble, Atlas writes plain text, the box grows
// as you type. The conversation lives only in this page; the server keeps nothing.
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import styles from './atlas.module.css';
import type { AtlasProposal } from '@/lib/atlas/actions';

const ERRORS: Record<string, string> = {
  unauthorized: 'Your CRM session has ended. Log in again.',
  not_configured: 'Atlas is not set up on this server yet.',
  bad_question: 'Type a message first (1000 characters at most).',
  unavailable: 'Atlas could not answer just now. Try again.',
  empty: 'Atlas returned nothing. Try saying it another way.',
};

const SUGGESTIONS = [
  'Who is waiting for a reply?',
  'Which customers paid but have not lodged?',
  'Show me the open tasks',
];


type Pending = { proposal: AtlasProposal; status: 'waiting' | 'running' | 'done' | 'rejected' | 'failed'; error?: string };
type Turn = { role: 'user' | 'assistant'; text: string; pending?: Pending[] };

const MAX_CHARS = 1000;

export default function AtlasAsk() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLTextAreaElement>(null);

  // Keep the newest message in view inside the chat, without scrolling the page.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [turns, busy]);

  // The box grows with the text, up to a limit, like the big chat apps.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    box.style.height = 'auto';
    box.style.height = `${Math.min(box.scrollHeight, 160)}px`;
  }, [message]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    const history = turns.map(({ role, text: t }) => ({ role, content: t }));
    setError(null);
    setBusy(true);
    setMessage('');
    try {
      const res = await fetch('/api/atlas/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: clean, history }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; answer?: string; error?: string; proposals?: AtlasProposal[] };
      if (res.ok && data.ok && typeof data.answer === 'string') {
        const reply = data.answer;
        const pending: Pending[] = (data.proposals ?? []).map((p) => ({ proposal: p, status: 'waiting' }));
        setTurns((t) => [...t, { role: 'user', text: clean }, { role: 'assistant', text: reply, pending }]);
      } else {
        setError(ERRORS[data.error ?? ''] ?? ERRORS.unavailable);
        setMessage(clean);
      }
    } catch {
      setError(ERRORS.unavailable);
      setMessage(clean);
    } finally {
      setBusy(false);
    }
  }

  // Runs one approved proposal, then shows the result on its card.
  async function approve(turnIndex: number, pendingIndex: number) {
    const item = turns[turnIndex]?.pending?.[pendingIndex];
    if (!item || item.status !== 'waiting') return;
    setPendingStatus(turnIndex, pendingIndex, { status: 'running' });
    try {
      const res = await fetch('/api/atlas/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal: item.proposal }),
      });
      if (res.ok) setPendingStatus(turnIndex, pendingIndex, { status: 'done' });
      else setPendingStatus(turnIndex, pendingIndex, { status: 'failed', error: 'It did not go through. Check the CRM before trying again.' });
    } catch {
      setPendingStatus(turnIndex, pendingIndex, { status: 'failed', error: ERRORS.unavailable });
    }
  }

  function reject(turnIndex: number, pendingIndex: number) {
    setPendingStatus(turnIndex, pendingIndex, { status: 'rejected' });
  }

  function setPendingStatus(turnIndex: number, pendingIndex: number, patch: Partial<Pending>) {
    setTurns((all) =>
      all.map((t, i) =>
        i !== turnIndex || !t.pending
          ? t
          : { ...t, pending: t.pending.map((p, j) => (j === pendingIndex ? { ...p, ...patch } : p)) },
      ),
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void send(message);
  }

  // Enter sends, Shift+Enter starts a new line.
  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void send(message);
    }
  }

  function clear() {
    setTurns([]);
    setError(null);
  }

  const empty = turns.length === 0 && !busy;

  return (
    <div className={styles.ask}>
      <section className={styles.chatCard} aria-label="Chat with Atlas">
        <div className={styles.chatHead}>
          {turns.length > 0 && (
            <button type="button" className={styles.clear} onClick={clear} disabled={busy}>New chat</button>
          )}
        </div>

        <div className={styles.log} ref={logRef} role="log" aria-live="polite">
          {empty && (
            <div className={styles.hero}>
              <p className={styles.heroTitle}>What do you want to know?</p>
              <p className={styles.heroSub}>Ask about customers, messages and tasks.</p>
              <div className={styles.suggestions}>
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className={styles.suggestion} onClick={() => void send(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {turns.map((t, i) => (
            <div key={i} className={t.role === 'user' ? styles.rowYou : styles.rowAtlas}>
              <p dir="auto" className={t.role === 'user' ? styles.you : styles.atlas}>{t.text}</p>
              {t.pending?.map((item, j) => (
                <div key={j} className={styles.proposal} role="group" aria-label="Proposed change">
                  <p dir="auto" className={styles.proposalText}>{item.proposal.summary}</p>
                  {item.proposal.kind === 'send_reply' && <p dir="auto" className={styles.proposalNote}>Message that will be sent, word for word: {item.proposal.body}</p>}
                  {item.proposal.kind === 'set_state' && <p className={styles.proposalNote}>Stage will change to: {item.proposal.state}</p>}
                  {item.proposal.kind === 'resolve_task' && <p className={styles.proposalNote}>The task will be closed.</p>}
                  {item.status === 'waiting' && (
                    <div className={styles.proposalActions}>
                      <button type="button" className={styles.approve} onClick={() => void approve(i, j)}>Approve</button>
                      <button type="button" className={styles.reject} onClick={() => reject(i, j)}>Not now</button>
                    </div>
                  )}
                  {item.status === 'running' && <p className={styles.proposalNote}>Running</p>}
                  {item.status === 'done' && <p className={styles.proposalNote}>Done</p>}
                  {item.status === 'rejected' && <p className={styles.proposalNote}>Not run</p>}
                  {item.status === 'failed' && <p className={styles.proposalError} role="alert">{item.error}</p>}
                </div>
              ))}
            </div>
          ))}
          {busy && (
            <div className={styles.rowAtlas}>
              <p className={styles.typing} role="status" aria-label="Atlas is typing">
                <span /><span /><span />
              </p>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className={styles.composer}>
          <textarea
            ref={boxRef}
            dir="auto"
            rows={1}
            aria-label="Message Atlas"
            placeholder="Message Atlas"
            value={message}
            maxLength={MAX_CHARS}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onKey}
            disabled={busy}
          />
          <button type="submit" className={styles.send} disabled={busy || !message.trim()} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
        <p className={styles.askNote}>Atlas can make mistakes. Check important details in the CRM.</p>
      </section>
      {error && <p className={styles.askError} role="alert">{error}</p>}
    </div>
  );
}
