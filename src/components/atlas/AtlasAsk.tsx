'use client';
// Chat with Atlas (decision 016), laid out like the big chat apps: messages
// flow down, your words sit in a bubble, Atlas writes plain text, the box grows
// as you type. The conversation lives only in this page; the server keeps nothing.
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import styles from './atlas.module.css';

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

const MAX_CHARS = 1000;

type Turn = { role: 'user' | 'assistant'; text: string };

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
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; answer?: string; error?: string };
      if (res.ok && data.ok && typeof data.answer === 'string') {
        const reply = data.answer;
        setTurns((t) => [...t, { role: 'user', text: clean }, { role: 'assistant', text: reply }]);
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
          <span className={styles.chatTitle}>Atlas</span>
          {turns.length > 0 && (
            <button type="button" className={styles.clear} onClick={clear} disabled={busy}>New chat</button>
          )}
        </div>

        <div className={styles.log} ref={logRef} role="log" aria-live="polite">
          {empty && (
            <div className={styles.hero}>
              <p className={styles.heroTitle}>What do you want to know?</p>
              <p className={styles.heroSub}>Ask about customers, messages and tasks. Atlas reads the CRM and Will data.</p>
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
