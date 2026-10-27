import styles from './ChatThread.module.css'

export interface ChatStep {
  text: string
  /** 'them' = the customer (right, white); 'us' = the reply (left, ink). */
  from: 'them' | 'us'
}

/** Ordered steps drawn as a WhatsApp-like thread. It is an ordered list, so
 *  the sequence is read out in order. */
export function ChatThread({ steps, label }: { steps: readonly ChatStep[]; label: string }) {
  return (
    <ol className={styles.thread} aria-label={label}>
      {steps.map(s => (
        <li key={s.text} className={[styles.bubble, styles[s.from]].join(' ')}>{s.text}</li>
      ))}
    </ol>
  )
}
