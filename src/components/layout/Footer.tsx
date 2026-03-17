'use client'
import Link from 'next/link'
import { WA_URL, EMAIL, PHONE_DISPLAY, AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

const cols = [
  { title: 'Services', links: [{ l: 'TFN Application', href: '/tfn' }, { l: 'Tax Return', href: '/tax-return' }, { l: 'Superannuation', href: '/superannuation' }, { l: 'ABN Registration', href: '/abn' }, { l: 'Medicare', href: '/medicare' }] },
  { title: 'Tools',    links: [{ l: 'Tax Calculator', href: '/calculator' }, { l: 'Tax Rates', href: '/tax-return#rates' }, { l: 'Deductions', href: '/tax-return#deductions' }, { l: 'Residency', href: '/tax-return#residency' }, { l: 'Super Guide', href: '/superannuation#guide' }] },
  { title: 'Legal',    links: [{ l: 'Client Agreement', href: '/client-agreement' }, { l: 'Privacy Policy', href: '/privacy' }, { l: 'Contact', href: '/contact' }] },
]

export function Footer() {
  return (
    <footer style={{ background: '#ffffff', borderTop: '1px solid #E2EFE9' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-14 md:gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <svg width="28" height="28" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="16" height="16" rx="4" stroke="#0B5240" strokeWidth="1.4"/>
                <rect x="12" y="12" width="16" height="16" rx="4" fill="#0B5240"/>
                <line x1="2" y1="2" x2="12" y2="12" stroke="#E9A020" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="2" cy="2" r="2" fill="#E9A020"/>
              </svg>
              <span className="font-serif font-bold text-ink" style={{ fontSize: '15px' }}>Working Holiday Tax</span>
            </div>
            <p className="font-light leading-[1.75] mb-6" style={{ fontSize: '13px', color: '#587066', maxWidth: '220px' }}>
              Australian tax specialists for Working Holiday Visa holders.
            </p>
            <div className="space-y-2.5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors" style={{ fontSize: '13px', color: '#587066' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#0B5240'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#587066'}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" stroke="#CDE3DB" strokeWidth=".8"/></svg>
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 transition-colors" style={{ fontSize: '13px', color: '#587066' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#0B5240'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#587066'}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><rect x=".5" y="2" width="12" height="9" rx="1.5" stroke="#CDE3DB" strokeWidth=".8"/></svg>
                {EMAIL}
              </a>
            </div>
          </div>

          {cols.map(col => (
            <nav key={col.title} aria-label={`${col.title} links`}>
              <p className="font-medium tracking-[0.1em] uppercase mb-5" style={{ fontSize: '10px', color: '#8AADA3' }}>{col.title}</p>
              {col.links.map(lk => (
                <Link key={lk.href} href={lk.href} className="block mb-3 transition-colors" style={{ fontSize: '13px', color: '#587066' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#0B5240'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#587066'}>
                  {lk.l}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2" style={{ borderTop: '1px solid #E2EFE9', paddingTop: '28px' }}>
          <p style={{ fontSize: '12px', color: '#8AADA3' }} suppressHydrationWarning>
            © {new Date().getFullYear()} Working Holiday Tax. All rights reserved.
          </p>
          <span className="inline-flex items-center gap-2" style={{ fontSize: '11px', color: '#8AADA3' }}>
            <span className="w-1 h-1 rounded-full bg-forest-300" aria-hidden="true" />
            Supervised by {AGENT_NAME} · ABN {AGENT_ABN} · TPB #{AGENT_TPB}
          </span>
        </div>
      </div>
    </footer>
  )
}
