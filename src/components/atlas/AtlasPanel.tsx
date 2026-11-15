'use client';
// A floating panel over the Atlas screen. Opened by clicking a module.
// Rendered into document.body so the scaled screen never moves it.
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { PanelItem } from '@/lib/atlas/atlas-view';
import styles from './atlas.module.css';

export default function AtlasPanel({
  name,
  items,
  href,
  note,
  onClose,
}: {
  name: string;
  /** null for a module that is not built yet. */
  items: PanelItem[] | null;
  href: string | null;
  note?: string;
  onClose: () => void;
}) {
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
        aria-labelledby="atlas-panel-title"
        className={styles.panel}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.panelHead}>
          <h2 id="atlas-panel-title">{name}</h2>
          <button ref={closeRef} type="button" className={styles.panelClose} onClick={onClose} aria-label="Close">
            Close
          </button>
        </div>

        {items === null ? (
          <p className={styles.panelEmpty}>Not connected yet</p>
        ) : items.length === 0 ? (
          <p className={styles.panelEmpty}>{note ?? 'Nothing open right now.'}</p>
        ) : (
          <ul className={styles.panelList}>
            {items.map((it) => (
              <li key={it.id} className={styles.panelItem}>
                <span className={styles.panelTitle}>{it.title}</span>
                <span className={styles.panelDetail}>{it.detail}</span>
              </li>
            ))}
          </ul>
        )}

        {href && (
          <a className={styles.panelOpen} href={href}>
            {`Open ${name}`}
          </a>
        )}
      </div>
    </div>,
    document.body,
  );
}
