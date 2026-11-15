'use client';
// The Atlas question box (decision 016). Sends one question to /api/atlas/ask
// and shows the answer under the pill. Answers come only from the CRM data.
import { useState, type FormEvent } from 'react';
import styles from './atlas.module.css';

const ERRORS: Record<string, string> = {
  unauthorized: 'Your CRM session has ended. Log in again.',
  not_configured: 'Atlas is not set up on this server yet.',
  bad_question: 'Type a question first (500 characters at most).',
  unavailable: 'Atlas could not answer just now. Try again.',
  empty: 'Atlas returned nothing. Try asking in a different way.',
};

export default function AtlasAsk() {
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function ask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = question.trim();
    if (!q || busy) return;
    setBusy(true);
    setError(null);
    setAnswer(null);
    try {
      const res = await fetch('/api/atlas/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; answer?: string; error?: string };
      if (res.ok && data.ok && typeof data.answer === 'string') {
        setAnswer(data.answer);
      } else {
        setError(ERRORS[data.error ?? ''] ?? ERRORS.unavailable);
      }
    } catch {
      setError(ERRORS.unavailable);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.ask}>
      <form onSubmit={ask} role="search">
        <label className={styles.search}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e737e" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            aria-label="Ask Atlas about your data"
            placeholder="Ask Atlas about your data"
            value={question}
            maxLength={500}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={busy}
          />
        </label>
      </form>

      {busy && <p className={styles.askNote} role="status">Checking the data</p>}
      {error && <p className={styles.askError} role="alert">{error}</p>}
      {answer && (
        <section className={styles.answer} aria-label="Atlas answer">
          <p>{answer}</p>
          <span className={styles.askNote}>Answers use the last 24 hours of CRM data only.</span>
        </section>
      )}
    </div>
  );
}
