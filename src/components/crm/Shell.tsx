'use client'
// ============================================================================
// The admin shell: one side rail, one logo, one set of nav icons, shared by
// every CRM screen.
//
// It used to be copy-pasted into DashboardClient, PartnersClient and
// PartnerDetailClient — three copies of the same logo SVG and the same six
// nav entries, already drifting apart (260px here, 245px there; "Will" missing
// its icon in one of them). Now there is one copy and it matches Will's rail
// exactly, because both read the same tokens out of crm-design.css.
// ============================================================================
import React from 'react'
import Link from 'next/link'

export type NavItem = {
  key: string
  label: string
  icon: React.ReactNode
  /** Shown as a red pill on the right of the row. 0 / undefined hides it. */
  badge?: number
  /** A route. Use this OR onClick, not both. */
  href?: string
  onClick?: () => void
}

// ── Icons ────────────────────────────────────────────────────────────────────
// 14px line icons, 1.8 stroke — the same weight Will uses in its rail.
const ic = (d: React.ReactNode) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">{d}</svg>
)

export const NavIcons = {
  tasks: ic(<>
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
  </>),
  clients: ic(<>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </>),
  archive: ic(<>
    <path d="M21 8v13H3V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 3H1v5h22V3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </>),
  leads: ic(<>
    <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </>),
  partners: ic(<>
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </>),
  will: ic(<>
    <path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.6 1.4c.1.2 0 .4-.1.5l-.4.5c-.1.1-.2.3 0 .5.3.6.9 1.2 1.6 1.6.2.1.4.1.5 0l.5-.5c.1-.2.3-.2.5-.1l1.4.7c.3.1.4.3.4.5s0 .8-.3 1.1c-.3.3-.9.6-1.4.6-1 0-2.6-.6-3.8-1.9-1.3-1.2-1.9-2.8-1.9-3.8 0-.4.1-.8.3-1.1z" fill="currentColor"/>
  </>),
  lock: ic(<>
    <rect x="5" y="11" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M8 11V7.5a4 4 0 018 0V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </>),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  refresh: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M23 4v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  back: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

/** The company mark, at Will's 30px rail size. */
export function CrmLogoMark() {
  return (
    <span className="smark">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Working Holiday Tax">
        <circle cx="100" cy="100" r="100" fill="#0B5240"/>
        <g transform="translate(100,100) scale(3.57) translate(-17,-17)">
          <rect x="2" y="2" width="19" height="19" rx="4.5" stroke="#5BB88A" strokeWidth="2" fill="none"/>
          <rect x="13" y="13" width="19" height="19" rx="4.5" fill="white"/>
          <line x1="2" y1="2" x2="13" y2="13" stroke="#E9A020" strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="2" cy="2" r="1.8" fill="#E9A020"/>
          <path d="M22.5 16.5L27.3 18.7L27.3 23.5Q27.3 27.3 22.5 29.3Q17.7 27.3 17.7 23.5L17.7 18.7Z" fill="rgba(11,82,64,0.12)" stroke="#0B5240" strokeWidth="1.3" strokeLinejoin="round"/>
          <polyline points="20.4,23 22.2,25 25,21.5" fill="none" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    </span>
  )
}

/** One rail row. Renders as a Link when it has an href, a button otherwise. */
function Row({ item, active }: { item: NavItem; active: boolean }) {
  const cls = `ni${active ? ' active' : ''}`
  const inner = (
    <>
      <span className="ic">{item.icon}</span>
      <span className="nl">{item.label}</span>
      {!!item.badge && item.badge > 0 && <span className="nbadge">{item.badge > 99 ? '99+' : item.badge}</span>}
    </>
  )
  if (item.href) {
    return <Link href={item.href} className={cls} aria-current={active ? 'page' : undefined} title={item.label}>{inner}</Link>
  }
  return (
    <button type="button" className={cls} onClick={item.onClick} aria-current={active ? 'page' : undefined} title={item.label}>
      {inner}
    </button>
  )
}

/**
 * The side rail. `activeKey` decides which row is filled green.
 * `onLock` renders the Lock & Exit button at the bottom; omit it to hide.
 */
export function CrmSide({ items, activeKey, onLock }: {
  items: NavItem[]
  activeKey?: string
  onLock?: () => void
}) {
  return (
    <aside className="side">
      <div className="slogo">
        <CrmLogoMark />
        <div className="sname">Working Holiday Tax<small>ADMIN</small></div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {items.map(it => <Row key={it.key} item={it} active={it.key === activeKey} />)}
      </nav>
      {onLock && (
        <div className="sfoot">
          <button type="button" className="btn ghost" onClick={onLock} title="Lock & Exit">
            <span className="ic">{NavIcons.lock}</span><span className="nl">Lock &amp; Exit</span>
          </button>
        </div>
      )}
    </aside>
  )
}

/**
 * Builds the six standard rail entries. Screens that navigate by route pass
 * hrefs (the default); the dashboard, which switches views in local state,
 * passes `on` handlers so the same rows change view instead of reloading.
 */
export function crmNav(opts: {
  badges?: Partial<Record<'tasks' | 'clients' | 'archive' | 'leads', number>>
  on?: Partial<Record<'tasks' | 'clients' | 'archive' | 'leads', () => void>>
} = {}): NavItem[] {
  const { badges = {}, on = {} } = opts
  const local = (key: 'tasks' | 'clients' | 'archive' | 'leads', label: string, icon: React.ReactNode): NavItem =>
    on[key]
      ? { key, label, icon, badge: badges[key], onClick: on[key] }
      : { key, label, icon, badge: badges[key], href: `/crm/dashboard?view=${key}` }
  return [
    local('tasks', 'Tasks', NavIcons.tasks),
    local('clients', 'Clients', NavIcons.clients),
    local('archive', 'Archive', NavIcons.archive),
    local('leads', 'Leads', NavIcons.leads),
    { key: 'partners', label: 'Partners', icon: NavIcons.partners, href: '/crm/partners' },
    { key: 'will', label: 'Will', icon: NavIcons.will, href: '/crm/whatsapp' },
  ]
}
