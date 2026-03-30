'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_LINKS, WA_URL } from '@/lib/constants'

const Logo = () => (
  <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
    <svg width="32" height="32" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="19" height="19" rx="4.5" stroke="#0B5240" strokeWidth="2"/>
      <rect x="13" y="13" width="19" height="19" rx="4.5" fill="#0B5240"/>
      <line x1="2" y1="2" x2="13" y2="13" stroke="#E9A020" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <circle cx="2" cy="2" r="1.6" fill="#E9A020" opacity="0.7"/>
      <path d="M22.5 17 L27 19 L27 23.5 Q27 27 22.5 29 Q18 27 18 23.5 L18 19 Z" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M20.4 23 L22.2 25 L25 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="font-serif text-[15px] font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>Working Holiday Tax</span>
  </Link>
)

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
  const close = () => setOpen(false)

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-canvas/92 backdrop-blur-2xl' : ''}`}
        style={scrolled ? { borderBottom: '1px solid rgba(205,227,219,0.45)' } : {}}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="h-[68px] flex items-center justify-between gap-5">
            <Logo />

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(l => {
                const active = pathname === l.href
                return (
                  <Link key={l.href} href={l.href}
                    className="relative text-[13.5px] transition-colors"
                    style={{ color: active ? '#0B5240' : '#587066' }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#0B5240' }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#587066' }}>
                    {l.label}
                    {active && <span className="absolute -bottom-[22px] left-0 right-0 h-[2px] bg-forest-500" />}
                  </Link>
                )
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-white transition-all"
                style={{ height: '40px', padding: '0 18px', background: '#0B5240', borderRadius: '100px', fontSize: '13px', boxShadow: '0 1px 2px rgba(0,0,0,.06), 0 2px 8px rgba(11,82,64,0.18)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#16775C' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0B5240' }}>
                Free Eligibility Check
              </a>
            </div>

            <button type="button" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}
              className="flex flex-col justify-center gap-[5px] w-10 h-10 bg-transparent border-none p-2 lg:hidden">
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-300 w-5 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-200 w-5 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-300 ${open ? 'w-5 -translate-y-[6.5px] -rotate-45' : 'w-3.5'}`} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-white flex flex-col pt-[80px] px-5 pb-8 overflow-y-auto transition-transform duration-400 ease-spring ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {NAV_LINKS.map(l => (
          <Link key={l.href} href={l.href} onClick={close}
            className="block font-sans text-[17px] font-medium text-ink py-4 transition-colors hover:text-forest-500"
            style={{ borderBottom: '1px solid #F0F5F2', letterSpacing: '-0.01em' }}>
            {l.label}
          </Link>
        ))}
        <div className="mt-6">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" onClick={close} className="btn-primary w-full justify-center" style={{ height: '54px', borderRadius: '100px', fontSize: '15px' }}>
              Free Eligibility Check →
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-3 mt-5 pb-2">
          {/* Xero */}
          <a href="https://www.xero.com" target="_blank" rel="noopener noreferrer"
            aria-label="Xero"
            className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
            style={{ width: '40px', height: '40px', border: '1.5px solid #C8EAE0' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm5 12.5l-2.9-2.5 2.9-2.5a.5.5 0 10-.65-.76L13.5 11.2l-2.85-2.46a.5.5 0 10-.65.76L12.9 12l-2.9 2.5a.5.5 0 10.65.76L13.5 12.8l2.85 2.46a.5.5 0 10.65-.76z" fill="#13B5EA"/>
            </svg>
          </a>

          {/* Security / SSL */}
          <div className="flex items-center justify-center rounded-full"
            style={{ width: '40px', height: '40px', border: '1.5px solid #C8EAE0' }}
            title="Secure & encrypted">
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M8 1L2 3.5V8c0 3.5 2.5 6.7 6 7.5 3.5-.8 6-4 6-7.5V3.5L8 1z" fill="#EAF6F1" stroke="#0B5240" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M5.5 8.5l2 2 3-3" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* TPB */}
          <a href="https://www.tpb.gov.au" target="_blank" rel="noopener noreferrer"
            aria-label="Registered Tax Practitioners Board"
            className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70 overflow-hidden"
            style={{ width: '40px', height: '40px', border: '1.5px solid #C8EAE0' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/tpb-logo.svg" alt="Tax Practitioners Board" width={24} height={24} style={{ objectFit: 'contain' }} />
          </a>
        </div>

      </div>
    </>
  )
}
