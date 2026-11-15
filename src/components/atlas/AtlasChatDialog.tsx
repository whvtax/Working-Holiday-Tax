'use client';
// The Atlas chat, opened by clicking the globe. A floating dialog over the
// screen, rendered into document.body, so the page layout never moves.
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import AtlasAsk from './AtlasAsk';
import styles from './atlas.module.css';

export default function AtlasChatDialog({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="atlas-chat-title"
        className={`${styles.panel} ${styles.chatPanel}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.panelHead}>
          <h2 id="atlas-chat-title">Atlas</h2>
          <button ref={closeRef} type="button" className={styles.panelClose} onClick={onClose} aria-label="Close chat">
            Close
          </button>
        </div>
        <AtlasAsk />
      </div>
    </div>,
    document.body,
  );
}
