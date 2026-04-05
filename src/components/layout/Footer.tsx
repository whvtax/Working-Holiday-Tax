'use client'
import Link from 'next/link'
import { WA_URL, EMAIL } from '@/lib/constants'

const linkCls = "block mb-2.5 transition-colors hover-forest"
const linkStyle = { fontSize: '12.5px', color: '#587066' }

export function Footer() {
  return (
    <footer style={{ background: '#ffffff', borderTop: '1px solid #E2EFE9' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-7 sm:pt-10 pb-5 sm:pb-6">

        {/* Main columns */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-6 md:gap-8 mb-6 md:mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="16" height="16" rx="4" stroke="#0B5240" strokeWidth="1.4"/>
                <rect x="12" y="12" width="16" height="16" rx="4" fill="#0B5240"/>
                <line x1="2" y1="2" x2="12" y2="12" stroke="#E9A020" strokeWidth="1.0" strokeLinecap="round" opacity="0.7"/>
                <circle cx="2" cy="2" r="1.4" fill="#E9A020" opacity="0.7"/>
                <path d="M20 14.5 L24 16 L24 19.5 Q24 23 20 24.5 Q16 23 16 19.5 L16 16 Z" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1.0" strokeLinejoin="round"/>
                <polyline points="18,19.5 19.8,21.5 22.5,18" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-serif font-bold text-ink" style={{ fontSize: '13.5px' }}>Working Holiday Tax</span>
            </div>
            <p className="font-light leading-[1.65] mb-4" style={{ fontSize: '12px', color: '#587066', maxWidth: '200px' }}>
              Tax help in Australia for Working Holiday maker.
            </p>
            {/* Mini CTA */}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover-forest-light"
              style={{ fontSize: '12px', color: '#0B5240' }}>
              Ask us anything
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>

            {/* Partner badges - 3 circles, no background */}
            <div className="flex items-center gap-2.5 mt-5">

              {/* Xero */}
              <a href="https://www.xero.com" target="_blank" rel="noopener noreferrer"
                aria-label="Xero"
                className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
                style={{ width: '36px', height: '36px', border: '1.5px solid #C8EAE0' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm5 12.5l-2.9-2.5 2.9-2.5a.5.5 0 10-.65-.76L13.5 11.2l-2.85-2.46a.5.5 0 10-.65.76L12.9 12l-2.9 2.5a.5.5 0 10.65.76L13.5 12.8l2.85 2.46a.5.5 0 10.65-.76z" fill="#13B5EA"/>
                </svg>
              </a>

              {/* Security / SSL */}
              <div className="flex items-center justify-center rounded-full"
                style={{ width: '36px', height: '36px', border: '1.5px solid #C8EAE0' }}
                title="Secure & encrypted">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M8 1L2 3.5V8c0 3.5 2.5 6.7 6 7.5 3.5-.8 6-4 6-7.5V3.5L8 1z" fill="#EAF6F1" stroke="#0B5240" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M5.5 8.5l2 2 3-3" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* TPB - Tax Practitioners Board */}
              <a href="https://www.tpb.gov.au" target="_blank" rel="noopener noreferrer"
                aria-label="Registered Tax Practitioners Board"
                className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70 overflow-hidden"
                style={{ width: '36px', height: '36px', border: '1.5px solid #C8EAE0' }}>
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
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={linkCls} style={linkStyle}>Message us</a>
            <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className={linkCls} style={linkStyle}>TikTok</a>
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
