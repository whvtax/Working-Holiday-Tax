'use client'
import Link from 'next/link'
import { WA_URL, EMAIL } from '@/lib/constants'

const linkCls = "block mb-2.5 transition-colors hover-forest"
const linkStyle = { fontSize: '12.5px', color: '#587066' }

export function Footer() {
  return (
    <footer style={{ background: '#ffffff', borderTop: '1px solid #E2EFE9' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14 pt-7 sm:pt-10 pb-5 sm:pb-6">

        {/* Main columns */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-6 md:gap-8 mb-6 md:mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="16" height="16" rx="4" stroke="#0B5240" strokeWidth="1.4"/>
                <rect x="12" y="12" width="16" height="16" rx="4" fill="#0B5240"/>
                <line x1="2" y1="2" x2="12" y2="12" stroke="#E9A020" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="2" cy="2" r="2" fill="#E9A020"/>
              </svg>
              <span className="font-serif font-bold text-ink" style={{ fontSize: '13.5px' }}>Working Holiday Tax</span>
            </div>
            <p className="font-light leading-[1.65] mb-4" style={{ fontSize: '12px', color: '#587066', maxWidth: '200px' }}>
              Tax help in Australia for Working Holiday travellers.
            </p>
            {/* Mini CTA */}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover-forest-light"
              style={{ fontSize: '12px', color: '#0B5240' }}>
              Ask us anything →
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>

            {/* Partner logos */}
            <div className="flex items-center gap-3 mt-5">
              {/* Xero */}
              <a href="https://www.xero.com" target="_blank" rel="noopener noreferrer"
                aria-label="Xero"
                className="flex items-center justify-center rounded-lg transition-opacity hover:opacity-80"
                style={{ width: '52px', height: '32px', background: '#f5f9f7', border: '1px solid #E2EFE9' }}>
                <svg viewBox="0 0 40 14" width="36" height="13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7 0a7 7 0 100 14A7 7 0 007 0zm3.54 9.47L8.47 7.4l2.06-2.07a.5.5 0 10-.7-.7L7.76 6.69 5.7 4.63a.5.5 0 10-.71.7L7.05 7.4l-2.07 2.07a.5.5 0 10.71.7l2.07-2.06 2.07 2.06a.5.5 0 10.71-.7zM16.5 9.5V4.52a.5.5 0 011 0v.28a2.48 2.48 0 011.93-.9 2.53 2.53 0 012.52 2.52V9.5a.5.5 0 01-1 0V6.42a1.53 1.53 0 00-1.52-1.52 1.53 1.53 0 00-1.52 1.52V9.5a.5.5 0 01-1 0zm8.04-3.24a2.26 2.26 0 012.21-1.9 2.24 2.24 0 012.2 1.9H24.54zm5.42.73c0-.12 0-.24-.02-.36a3.24 3.24 0 00-3.19-2.75 3.24 3.24 0 100 6.48 3.23 3.23 0 002.86-1.73.5.5 0 10-.88-.47 2.24 2.24 0 01-1.98 1.2 2.24 2.24 0 01-2.2-1.87H29.5a.5.5 0 00.5-.5zm3.53 3.01a.5.5 0 01-.5-.5V4.52a.5.5 0 011 0v.42a2.74 2.74 0 011.88-.94.5.5 0 010 1 1.76 1.76 0 00-1.75 1.74V9.5a.5.5 0 01-.63.5z" fill="#13B5EA"/>
                </svg>
              </a>

              {/* TPB — Tax Practitioners Board */}
              <a href="https://www.tpb.gov.au" target="_blank" rel="noopener noreferrer"
                aria-label="Registered Tax Practitioners Board"
                className="flex items-center justify-center rounded-lg transition-opacity hover:opacity-80"
                style={{ width: '32px', height: '32px', background: '#f5f9f7', border: '1px solid #E2EFE9', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/tpb-logo.svg" alt="Tax Practitioners Board" width={22} height={22} style={{ objectFit: 'contain' }} />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services links">
            <p className="font-semibold tracking-[0.12em] uppercase mb-3" style={{ fontSize: '9.5px', color: '#587066' }}>Services</p>
            <Link href="/tfn"           className={linkCls} style={linkStyle}>TFN application</Link>
            <Link href="/abn"           className={linkCls} style={linkStyle}>ABN registration</Link>
            <Link href="/tax-return"    className={linkCls} style={linkStyle}>Tax return</Link>
            <Link href="/superannuation" className={linkCls} style={linkStyle}>Super withdrawal</Link>
          </nav>

          {/* Contact */}
          <nav aria-label="Contact links">
            <p className="font-semibold tracking-[0.12em] uppercase mb-3" style={{ fontSize: '9.5px', color: '#587066' }}>Contact</p>
            <a href={`mailto:${EMAIL}`} className={linkCls} style={linkStyle}>Email</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={linkCls} style={linkStyle}>WhatsApp</a>
            <a href="https://tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className={linkCls} style={linkStyle}>TikTok</a>
            <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className={linkCls} style={linkStyle}>Instagram</a>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal links">
            <p className="font-semibold tracking-[0.12em] uppercase mb-3" style={{ fontSize: '9.5px', color: '#587066' }}>Legal</p>
            <Link href="/client-agreement" className={linkCls} style={linkStyle}>Client Agreement</Link>
            <Link href="/privacy"          className={linkCls} style={linkStyle}>Privacy Policy</Link>
          </nav>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid #E2EFE9', paddingTop: '18px' }}>
          <p className="text-center" style={{ fontSize: '11.5px', color: '#8AADA3' }} suppressHydrationWarning>
            © {new Date().getFullYear()} Working Holiday Tax. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
