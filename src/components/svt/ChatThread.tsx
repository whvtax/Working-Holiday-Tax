'use client'

import { useReveal } from './useReveal'
import styles from './ChatThread.module.css'

export interface ChatStep {
  text: string
  /** 'them' = the customer (right, white); 'us' = the reply (left, ink). */
  from: 'them' | 'us'
}

/** Ordered steps drawn as a WhatsApp-like thread. It is an ordered list, so
 *  the sequence is read out in order. */
export function ChatThread({ steps, label }: { steps: readonly ChatStep[]; label: string }) {
  const ref = useReveal<HTMLOListElement>()
  return (
    <ol ref={ref} className={styles.thread} aria-label={label}>
      {steps.map((s, i) => (
        <li key={s.text} className={[styles.bubble, styles[s.from]].join(' ')} style={{ '--i': i } as React.CSSProperties}>{s.text}</li>
      ))}
    </ol>
  )
}
