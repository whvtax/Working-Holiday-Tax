'use client';
// The Atlas command centre page body. Shows the 24-hour summary, the globe in
// the middle, the six modules around it and one status dot. Every figure comes
// from the server through `view`; nothing here invents a number.
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { AtlasModule, AtlasTile, AtlasView } from '@/lib/atlas/atlas-view';
import Globe from './Globe';
import styles from './atlas.module.css';

const LEFT: AtlasModule['key'][] = ['crm', 'accounts', 'instagram'];
const RIGHT: AtlasModule['key'][] = ['will', 'mia', 'tiktok'];
const SLOT: Record<AtlasModule['key'], string> = {
  crm: styles.p1,
  accounts: styles.p2,
  instagram: styles.p3,
  will: styles.p4,
  mia: styles.p5,
  tiktok: styles.p6,
};
const COLOUR: Record<AtlasModule['key'], string> = {
  crm: 'var(--crm)',
  will: 'var(--will)',
  accounts: 'var(--acc)',
  mia: 'var(--mia)',
  instagram: 'var(--ig)',
  tiktok: 'var(--tt)',
};
const GLOBE_RADIUS = 128; // the connectors start just outside the globe
const GAP = 14; // gap at each end of a connector

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function Tile({ tile }: { tile: AtlasTile }) {
  const missing = tile.value === null;
  return (
    <div className={styles.tile}>
      <span className={styles.tileKey}>{tile.label}</span>
      {missing ? (
        <span className={styles.tileValueMissing}>Not connected yet</span>
      ) : (
        <span className={`${styles.tileValue} ${tile.attention ? styles.tileValueAttn : ''}`}>
          {tile.value}
        </span>
      )}
      {!missing && <span className={styles.tileSub}>{tile.sub}</span>}
    </div>
  );
}

function ModulePill({
  mod,
  slot,
  setRef,
}: {
  mod: AtlasModule;
  slot: string;
  setRef: (key: AtlasModule['key'], el: HTMLDivElement | null) => void;
}) {
  const classes = [styles.mod, slot];
  if (!mod.connected) classes.push(styles.off);
  if (mod.attention) classes.push(styles.alert);
  return (
    <div className={classes.join(' ')} ref={(el) => setRef(mod.key, el)}>
      <b>
        <span className={styles.dot} style={{ background: COLOUR[mod.key] }} />
        {mod.name}
      </b>
      <small>{mod.line}</small>
    </div>
  );
}

export default function AtlasCentre({ view }: { view: AtlasView }) {
  const stageRef = useRef<HTMLElement>(null);
  const modRefs = useRef<Partial<Record<AtlasModule['key'], HTMLDivElement | null>>>({});
  const [segments, setSegments] = useState<Segment[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [tipOpen, setTipOpen] = useState(false);

  const setRef = useCallback((key: AtlasModule['key'], el: HTMLDivElement | null) => {
    modRefs.current[key] = el;
  }, []);

  const measure = useCallback(() => {
    const st = stageRef.current;
    if (!st) return;
    const W = st.clientWidth;
    const H = st.clientHeight;
    if (W <= 0) return;
    const sr = st.getBoundingClientRect();
    const cx = W / 2;
    const cy = H / 2;
    const next: Segment[] = [];
    for (const mod of view.modules) {
      const el = modRefs.current[mod.key];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const onLeft = r.left - sr.left < W / 2;
      const mx = onLeft ? r.right - sr.left : r.left - sr.left;
      const my = r.top - sr.top + r.height / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      next.push({
        x1: cx + ux * (GLOBE_RADIUS + GAP),
        y1: cy + uy * (GLOBE_RADIUS + GAP),
        x2: mx - ux * GAP,
        y2: my - uy * GAP,
      });
    }
    setSize({ w: W, h: H });
    setSegments(next);
  }, [view.modules]);

  useLayoutEffect(() => {
    measure();
    const st = stageRef.current;
    if (!st || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(st);
    window.addEventListener('load', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', measure);
    };
  }, [measure]);

  const attention = view.reasons.length > 0;
  const dotLabel = attention ? `Attention: ${view.reasons.join('; ')}` : 'All connected modules are fine';
  const dotFill = attention ? 'var(--red)' : 'var(--lime)';
  const leftMods = view.modules.filter((m) => LEFT.includes(m.key));
  const rightMods = view.modules.filter((m) => RIGHT.includes(m.key));

  return (
    <main className={styles.page}>
      <label className={styles.search}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e737e" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input type="search" aria-label="Search across all systems" placeholder="Search across all systems" />
      </label>

      <div className={styles.dailyTop}>
        <h1>Last 24 hours</h1>
        <p>Read only</p>
      </div>
      <section className={styles.daily} aria-label="Last 24 hours">
        <div className={styles.dailyGrid}>
          {view.tiles.map((tile) => (
            <Tile key={tile.key} tile={tile} />
          ))}
        </div>
      </section>

      <section className={styles.stage} ref={stageRef} aria-label="Atlas and modules">
        <svg className={styles.lines} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
          <g stroke="#12161f" strokeOpacity={0.38} strokeWidth={1.25} strokeDasharray="3 5" strokeLinecap="round" fill="none">
            {segments.map((s, i) => (
              <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
            ))}
          </g>
        </svg>

        <div className={styles.globe}>
          <Globe />
          <svg className={styles.overlay} viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="116" fill="none" stroke="#12161f" strokeWidth={1} opacity={0.25} />
            <g className={styles.dotPulse}>
              <circle
                className={styles.statusDot}
                cx="163"
                cy="85"
                r="4.5"
                fill={dotFill}
                stroke="#12161f"
                strokeOpacity={0.6}
                strokeWidth={1.5}
                tabIndex={0}
                role="img"
                aria-label={dotLabel}
                aria-describedby="atlas-status-tip"
                onMouseEnter={() => setTipOpen(true)}
                onMouseLeave={() => setTipOpen(false)}
                onFocus={() => setTipOpen(true)}
                onBlur={() => setTipOpen(false)}
              />
            </g>
          </svg>
          <div id="atlas-status-tip" role="tooltip" className={`${styles.tip} ${tipOpen ? styles.show : ''}`}>
            <b>Atlas status</b>
            {attention ? (
              view.reasons.map((r) => (
                <span key={r} className={styles.tipAttn}>
                  Attention: {r}
                </span>
              ))
            ) : (
              <span>All connected modules are fine</span>
            )}
          </div>
        </div>

        {leftMods.map((m) => (
          <ModulePill key={m.key} mod={m} slot={SLOT[m.key]} setRef={setRef} />
        ))}
        {rightMods.map((m) => (
          <ModulePill key={m.key} mod={m} slot={SLOT[m.key]} setRef={setRef} />
        ))}
      </section>
    </main>
  );
}
