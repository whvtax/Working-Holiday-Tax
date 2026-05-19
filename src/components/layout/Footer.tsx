'use client'
import Link from 'next/link'
import { WA_URL, EMAIL } from '@/lib/constants'

export function Footer() {
  return (
    <footer role="contentinfo" style={{ background: '#0B5240' }}>

      {/* ─── Main footer section ─ light grey background ──────────────────── */}
      <div style={{ background: '#F5F9F7', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-10 sm:pb-12">

          {/* Main grid - 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 md:gap-10 mb-10">

            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="26" height="26" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="16" height="16" rx="4" stroke="#0B5240" strokeWidth="1.4"/>
                  <rect x="12" y="12" width="16" height="16" rx="4" fill="#0B5240"/>
                  <line x1="2" y1="2" x2="12" y2="12" stroke="#E9A020" strokeWidth="1.0" strokeLinecap="round" opacity="0.7"/>
                  <circle cx="2" cy="2" r="1.4" fill="#E9A020" opacity="0.7"/>
                  <path d="M20 14.5 L24 16 L24 19.5 Q24 23 20 24.5 Q16 23 16 19.5 L16 16 Z" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1.0" strokeLinejoin="round"/>
                  <polyline points="18,19.5 19.8,21.5 22.5,18" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-serif font-bold text-ink" style={{ fontSize: '15px' }}>Working Holiday Tax</span>
              </div>

              {/* Strong tagline */}
              <p className="font-serif" style={{ fontSize: '17px', color: '#0B5240', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px', letterSpacing: '-0.02em' }}>
                Australian tax, sorted.
              </p>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.7, marginBottom: '18px', maxWidth: '280px' }}>
                We handle TFN, tax returns, super withdrawal and ABN for working holiday makers in Australia.
              </p>

              {/* Mini CTA */}
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="font-medium"
                style={{ fontSize: '13px', color: '#0B5240', fontWeight: 600, marginBottom: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                Ask us anything
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>

              {/* Partner badges */}
              <div className="flex items-center gap-2.5 mt-6">
                <a href="https://www.xero.com" target="_blank" rel="noopener noreferrer"
                  aria-label="Xero partner"
                  className="footer-social-icon flex items-center justify-center rounded-full"
                  style={{ width: '38px', height: '38px', border: '1.5px solid #C8EAE0', background: '#fff' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm5 12.5l-2.9-2.5 2.9-2.5a.5.5 0 10-.65-.76L13.5 11.2l-2.85-2.46a.5.5 0 10-.65.76L12.9 12l-2.9 2.5a.5.5 0 10.65.76L13.5 12.8l2.85 2.46a.5.5 0 10.65-.76z" fill="#13B5EA"/>
                  </svg>
                </a>
                <div className="flex items-center justify-center rounded-full"
                  style={{ width: '38px', height: '38px', border: '1.5px solid #C8EAE0', background: '#fff' }}
                  title="Secure & encrypted">
                  <svg width="17" height="19" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8 1L2 3.5V8c0 3.5 2.5 6.7 6 7.5 3.5-.8 6-4 6-7.5V3.5L8 1z" fill="#EAF6F1" stroke="#0B5240" strokeWidth="1.2" strokeLinejoin="round"/>
                    <path d="M5.5 8.5l2 2 3-3" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <a href="https://www.tpb.gov.au" target="_blank" rel="noopener noreferrer"
                  aria-label="Registered Tax Practitioners Board"
                  className="footer-social-icon flex items-center justify-center rounded-full overflow-hidden"
                  style={{ width: '38px', height: '38px', border: '1.5px solid #C8EAE0', background: '#fff' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/tpb-logo.svg" alt="Tax Practitioners Board" width={23} height={23} style={{ objectFit: 'contain' }} />
                </a>
              </div>
            </div>

            {/* Services column */}
            <nav aria-label="Services links">
              <p className="font-semibold uppercase mb-3.5" style={{ fontSize: '10.5px', color: '#0B5240', letterSpacing: '0.14em' }}>Services</p>
              <Link href="/tfn"            className="footer-link">TFN Application</Link>
              <Link href="/abn"            className="footer-link">ABN Registration</Link>
              <Link href="/tax-return"     className="footer-link">Tax Return</Link>
              <Link href="/superannuation" className="footer-link">Super Withdrawal</Link>
              <Link href="/medicare"       className="footer-link">Medicare</Link>
            </nav>

            {/* Learn column */}
            <nav aria-label="Resources links">
              <p className="font-semibold uppercase mb-3.5" style={{ fontSize: '10.5px', color: '#0B5240', letterSpacing: '0.14em' }}>Learn</p>
              <Link href="/blog"                       className="footer-link">Blog</Link>
              <Link href="/blog/category/tfn"          className="footer-link">TFN Articles</Link>
              <Link href="/blog/category/tax-return"   className="footer-link">Tax Return Articles</Link>
              <Link href="/blog/category/super"        className="footer-link">Super Articles</Link>
              <Link href="/blog/category/work-rights"  className="footer-link">Work Rights</Link>
            </nav>

            {/* Connect column */}
            <nav aria-label="Contact and social links">
              <p className="font-semibold uppercase mb-3.5" style={{ fontSize: '10.5px', color: '#0B5240', letterSpacing: '0.14em' }}>Connect</p>
              <a href="https://www.facebook.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a>
              <a href={`mailto:${EMAIL}`}     className="footer-link">Email</a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="footer-link">WhatsApp</a>
              <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className="footer-link">TikTok</a>
              <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
            </nav>
          </div>
        </div>
      </div>

      {/* ─── Bottom bar - DARK GREEN brand layer ──────────────────────────── */}
      <div style={{ background: '#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-center md:text-left">

            {/* Left: Brand name + copyright */}
            <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)' }} suppressHydrationWarning>
              <span>© {new Date().getFullYear()} Working Holiday Tax. All rights reserved.</span>
            </div>

            {/* Right: Legal links */}
            <div className="flex items-center justify-center md:justify-end gap-4 md:gap-5 flex-wrap" style={{ fontSize: '11.5px' }}>
              <Link href="/client-agreement" className="footer-link-dark">Terms of Service</Link>
              <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
              <Link href="/privacy"          className="footer-link-dark">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
