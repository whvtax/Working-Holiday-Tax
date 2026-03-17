'use client'
import Link from 'next/link'
import { WA_URL, EMAIL } from '@/lib/constants'

const linkCls = "block mb-3 transition-colors"
const linkStyle = { fontSize: '13px', color: '#587066' }
const onEnter = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = '#0B5240')
const onLeave = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = '#587066')

export function Footer() {
  return (
    <footer style={{ background: '#ffffff', borderTop: '1px solid #E2EFE9' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14 pt-14 pb-8">

        {/* Main columns */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 md:gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="28" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="16" height="16" rx="4" stroke="#0B5240" strokeWidth="1.4"/>
                <rect x="12" y="12" width="16" height="16" rx="4" fill="#0B5240"/>
                <line x1="2" y1="2" x2="12" y2="12" stroke="#E9A020" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="2" cy="2" r="2" fill="#E9A020"/>
              </svg>
              <span className="font-serif font-bold text-ink" style={{ fontSize: '15px' }}>Working Holiday Tax</span>
            </div>
            <p className="font-light leading-[1.75]" style={{ fontSize: '13px', color: '#587066', maxWidth: '220px' }}>
              Australian tax specialists for Working Holiday Visa holders.
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Services links">
            <p className="font-medium tracking-[0.1em] uppercase mb-4" style={{ fontSize: '10px', color: '#8AADA3' }}>Services</p>
            <Link href="/tfn"          className={linkCls} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>TFN Application</Link>
            <Link href="/abn"          className={linkCls} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>ABN Registration</Link>
            <Link href="/tax-return"   className={linkCls} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>Tax Return</Link>
            <Link href="/superannuation" className={linkCls} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>Superannuation</Link>
          </nav>

          {/* Contact */}
          <nav aria-label="Contact links">
            <p className="font-medium tracking-[0.1em] uppercase mb-4" style={{ fontSize: '10px', color: '#8AADA3' }}>Contact</p>
            <a href={`mailto:${EMAIL}`} className={linkCls} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>Email</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={linkCls} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>WhatsApp</a>
            <a href="https://tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className={linkCls} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>TikTok</a>
            <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className={linkCls} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>Instagram</a>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal links">
            <p className="font-medium tracking-[0.1em] uppercase mb-4" style={{ fontSize: '10px', color: '#8AADA3' }}>Legal</p>
            <Link href="/client-agreement" className={linkCls} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>Client Agreement</Link>
            <Link href="/privacy"          className={linkCls} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>Privacy Policy</Link>
          </nav>
        </div>

        {/* Copyright — centered */}
        <div style={{ borderTop: '1px solid #E2EFE9', paddingTop: '24px' }}>
          <p className="text-center" style={{ fontSize: '12px', color: '#8AADA3' }} suppressHydrationWarning>
            © {new Date().getFullYear()} Working Holiday Tax. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
