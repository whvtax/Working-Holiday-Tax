'use client';
// The Atlas command centre page body. Shows the 24-hour summary, the globe in
// the middle, the six modules around it and one status dot. Every figure comes
// from the server through `view`; nothing here invents a number.
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import type { AtlasModule, AtlasTile, AtlasView, PanelItem } from '@/lib/atlas/atlas-view';
import Globe from './Globe';
import AtlasPanel from './AtlasPanel';
import AtlasChatDialog from './AtlasChatDialog';
import styles from './atlas.module.css';

// Jo, 18 Nov: CRM opposite Accounting, Will opposite Mia, Social Media (WHT) opposite Social Media (SVT).
const LEFT: AtlasModule['key'][] = ['crm', 'will', 'social_wht'];
const RIGHT: AtlasModule['key'][] = ['accounts', 'mia', 'social_svt'];
const SLOT: Record<AtlasModule['key'], string> = {
  crm: styles.p1,
  will: styles.p2,
  social_wht: styles.p3,
  accounts: styles.p4,
  mia: styles.p5,
  social_svt: styles.p6,
};
const COLOUR: Record<AtlasModule['key'], string> = {
  crm: 'var(--crm)',
  will: 'var(--will)',
  accounts: 'var(--acc)',
  mia: 'var(--mia)',
  social_wht: 'var(--ig)',
  social_svt: 'var(--tt)',
};
const GLOBE_RADIUS = 104; // globe is 208px wide (was 260px) // the connectors start just outside the globe
const GAP = 14; // gap at each end of a connector
const CONTROL_Y = 184; // Control pill centre below the middle (.p7 in atlas.module.css: top 148 + half of 72)

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
    </div>
  );
}

function ModulePill({
  mod,
  slot,
  setRef,
  onOpen,
}: {
  mod: AtlasModule;
  slot: string;
  setRef: (key: AtlasModule['key'], el: HTMLElement | null) => void;
  onOpen: (key: AtlasModule['key']) => void;
}) {
  const classes = [styles.mod, styles.modButton, slot];
  if (!mod.connected) classes.push(styles.off);
  if (mod.attention) classes.push(styles.alert); // red text only, the card stays white
  return (
    <button
      type="button"
      className={classes.join(' ')}
      ref={(el) => setRef(mod.key, el)}
      onClick={() => onOpen(mod.key)}
      aria-haspopup="dialog"
    >
      <b>
        <span className={styles.dot} style={{ background: COLOUR[mod.key] }} />
        {mod.name}
      </b>
      <small>{mod.line}</small>
    </button>
  );
}

export default function AtlasCentre({ view, updatedAt }: { view: AtlasView; updatedAt?: string }) {
  const stageRef = useRef<HTMLElement>(null);
  const modRefs = useRef<Partial<Record<AtlasModule["key"], HTMLElement | null>>>({});
  const [segments, setSegments] = useState<Segment[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [tipOpen, setTipOpen] = useState(false);
  const [openKey, setOpenKey] = useState<AtlasModule['key'] | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const pageRef = useRef<HTMLElement>(null);

  const setRef = useCallback((key: AtlasModule["key"], el: HTMLElement | null) => {
    modRefs.current[key] = el;
  }, []);

  // Connectors are drawn from the fixed layout in atlas.module.css, so they
  // need no DOM measuring and cannot drift when the screen is scaled.
  // Pill centres sit 170px from the middle column edge and -96 / 0 / +96px
  // from the middle row (tops 118 / 214 / 310, height 72, stage height 500).
  const measure = useCallback(() => {
    const st = stageRef.current;
    if (!st) return;
    const W = st.clientWidth;
    const H = st.clientHeight;
    if (W <= 0) return;
    const cx = W / 2;
    const cy = H / 2;
    const ROW_Y: Record<AtlasModule['key'], number> = {
      crm: -96, will: 0, social_wht: 96,
      accounts: -96, mia: 0, social_svt: 96,
    };
    const next: Segment[] = [];
    for (const mod of view.modules) {
      const onLeft = LEFT.includes(mod.key);
      const mx = cx + (onLeft ? -170 : 170);
      const my = cy + ROW_Y[mod.key];
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
    // Control, straight under the globe (pill centre 184px below the middle).
    next.push({ x1: cx, y1: cy + GLOBE_RADIUS + GAP, x2: cx, y2: cy + CONTROL_Y - 36 - GAP / 2 });
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

  // Jo, 20 Nov: no pop-up. Every module opens its own page directly (CRM, Will,
  // Mia, Ella, and the pages of the modules not connected yet).
  const openPanel = useCallback((key: AtlasModule['key']) => {
    // Constant destinations only (security test FE2-04): never a URL from data.
    const HREF: Record<AtlasModule['key'], string> = {
      crm: '/crm', will: '/will', mia: '/mia',
      accounts: '/atlas/accounts', social_wht: '/atlas/social_wht', social_svt: '/atlas/social_svt',
    };
    if (HREF[key]) {
      window.location.assign(HREF[key] ?? '/atlas');
      return;
    }
    triggerRef.current = document.activeElement as HTMLElement | null;
    setOpenKey(key);
  }, []);
  const [chatOpen, setChatOpen] = useState(false);
  const closeChat = useCallback(() => setChatOpen(false), []);

  const closePanel = useCallback(() => {
    setOpenKey(null);
    triggerRef.current?.focus();
  }, []);
  const openModule = view.modules.find((m) => m.key === openKey) ?? null;
  const panelItems: PanelItem[] | null =
    openKey === 'crm' ? view.panels.crm : openKey === 'will' ? view.panels.will : null;

  // Same logout the CRM uses (DashboardClient): end this browser's session, then go to the login.
  async function lockAndExit() {
    await fetch('/api/crm/logout', { method: 'POST' }).catch(() => undefined);
    window.location.replace('/login');
  }

  const attention = view.reasons.length > 0;
  const dotLabel = attention ? `Attention: ${view.reasons.join('; ')}` : 'All connected modules are fine';
  const dotFill = attention ? 'var(--red)' : 'var(--lime)';
  const leftMods = view.modules.filter((m) => LEFT.includes(m.key));
  const rightMods = view.modules.filter((m) => RIGHT.includes(m.key));

  return (
    <div className={styles.frame}>
    <main ref={pageRef} className={styles.page}>
      <div className={styles.dailyTop}>
        <h1>Last 24 hours</h1>
        {updatedAt ? <p>Updated {updatedAt}</p> : null}
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

        <div
          className={styles.globe}
          data-no-lift=""
          role="button"
          tabIndex={0}
          aria-label="Open Atlas chat"
          onClick={() => setChatOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setChatOpen(true);
            }
          }}
        >
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
          <ModulePill key={m.key} mod={m} slot={SLOT[m.key]} setRef={setRef} onOpen={openPanel} />
        ))}
        {rightMods.map((m) => (
          <ModulePill key={m.key} mod={m} slot={SLOT[m.key]} setRef={setRef} onOpen={openPanel} />
        ))}

        {/* Control (Jo, 20 Nov): the seventh module, under the globe and wired to
            it like the other six. Tasks, reports, Library and System for Will and Mia. */}
        <a href="/control" className={`${styles.mod} ${styles.modButton} ${styles.p7}`}>
          <b>
            <span className={styles.dot} style={{ background: 'var(--ink)' }} />
            Control
          </b>
          <small>Tasks, reports, Library and System</small>
        </a>
      </section>

      {chatOpen && <AtlasChatDialog onClose={closeChat} />}

      {openModule && (
        <AtlasPanel
          name={openModule.name}
          items={panelItems}
          href={openModule.href}
          note={openKey === 'will' ? 'No open tasks right now.' : undefined}
          onClose={closePanel}
        />
      )}

      <div className={styles.footer}>
        <button type="button" className={styles.lock} onClick={lockAndExit}>
          {'Lock & Exit'}
        </button>
      </div>
    </main>
    </div>
  );
}
