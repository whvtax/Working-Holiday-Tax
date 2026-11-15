'use client';
// Chat with Atlas (decision 016). The conversation lives only in this page;
// the server keeps nothing between requests.
import { useEffect, useRef, useState, type FormEvent } from 'react';
import styles from './atlas.module.css';

const ERRORS: Record<string, string> = {
  unauthorized: 'Your CRM session has ended. Log in again.',
  not_configured: 'Atlas is not set up on this server yet.',
  bad_question: 'Type a message first (1000 characters at most).',
  unavailable: 'Atlas could not answer just now. Try again.',
  empty: 'Atlas returned nothing. Try saying it another way.',
};

const MAX_CHARS = 1000;

type Turn = { role: 'user' | 'assistant'; text: string };

export default function AtlasAsk() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view inside the chat, without scrolling the page.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [turns, busy]);

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = message.trim();
    if (!text || busy) return;
    const history = turns.map(({ role, text: t }) => ({ role, content: t }));
    setError(null);
    setBusy(true);
    setMessage('');
    try {
      const res = await fetch('/api/atlas/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, history }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; answer?: string; error?: string };
      if (res.ok && data.ok && typeof data.answer === 'string') {
        const reply = data.answer;
        setTurns((t) => [...t, { role: 'user', text }, { role: 'assistant', text: reply }]);
      } else {
        setError(ERRORS[data.error ?? ''] ?? ERRORS.unavailable);
        setMessage(text);
      }
    } catch {
      setError(ERRORS.unavailable);
      setMessage(text);
    } finally {
      setBusy(false);
    }
  }

  function clear() {
    setTurns([]);
    setError(null);
  }

  return (
    <div className={styles.ask}>
      <section className={styles.chatCard} aria-label="Chat with Atlas">
        <div className={styles.chatHead}>
          <span className={styles.chatTitle}>Atlas</span>
          <span className={styles.askNote}>Knows the last 24 hours of CRM data</span>
          {turns.length > 0 && (
            <button type="button" className={styles.clear} onClick={clear} disabled={busy}>Clear chat</button>
          )}
        </div>

        <div className={styles.log} ref={logRef} role="log" aria-live="polite">
          {turns.length === 0 && !busy && (
            <p className={styles.atlas}>Hi. Ask me anything about the CRM today, or talk through what you see.</p>
          )}
          {turns.map((t, i) => (
            <p key={i} className={t.role === 'user' ? styles.you : styles.atlas}>{t.text}</p>
          ))}
          {busy && <p className={styles.atlas} role="status">Thinking</p>}
        </div>

        <form onSubmit={send} className={styles.composer}>
          <input
            type="text"
            aria-label="Message Atlas"
            placeholder="Message Atlas"
            value={message}
            maxLength={MAX_CHARS}
            onChange={(e) => setMessage(e.target.value)}
            disabled={busy}
          />
          <button type="submit" className={styles.send} disabled={busy || !message.trim()} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
      </section>
      {error && <p className={styles.askError} role="alert">{error}</p>}
    </div>
  );
}
