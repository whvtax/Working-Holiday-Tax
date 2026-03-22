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
      <line x1="2" y1="2" x2="13" y2="13" stroke="#E9A020" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="2" cy="2" r="2.2" fill="#E9A020"/>
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
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
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

            <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}
              className="flex flex-col justify-center gap-[5px] w-10 h-10 bg-transparent border-none p-2 lg:hidden">
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-300 w-5 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-200 w-5 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-300 ${open ? 'w-5 -translate-y-[6.5px] -rotate-45' : 'w-3.5'}`} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-white flex flex-col pt-[76px] px-5 pb-8 overflow-y-auto transition-transform duration-400 ease-spring ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {NAV_LINKS.map(l => (
          <Link key={l.href} href={l.href} onClick={close}
            className="block font-sans text-[15px] font-medium text-ink py-3 transition-colors hover:text-forest-500"
            style={{ borderBottom: '1px solid #F0F5F2', letterSpacing: '-0.01em' }}>
            {l.label}
          </Link>
        ))}
        <div className="mt-6">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" onClick={close} className="btn-primary w-full justify-center" style={{ height: '46px', borderRadius: '100px', fontSize: '14px' }}>
            Free Eligibility Check →
          </a>
        </div>

        {/* Partner logos — mobile menu */}
        <div className="flex items-center gap-3 mt-6 pt-5" style={{ borderTop: '1px solid #F0F5F2' }}>
          <div className="flex items-center justify-center rounded-lg" style={{ width: '56px', height: '32px', background: '#f5f9f7', border: '1px solid #E2EFE9' }}>
            <svg viewBox="0 0 40 14" width="38" height="13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Xero" role="img">
              <path d="M7 0a7 7 0 100 14A7 7 0 007 0zm3.54 9.47L8.47 7.4l2.06-2.07a.5.5 0 10-.7-.7L7.76 6.69 5.7 4.63a.5.5 0 10-.71.7L7.05 7.4l-2.07 2.07a.5.5 0 10.71.7l2.07-2.06 2.07 2.06a.5.5 0 10.71-.7zM16.5 9.5V4.52a.5.5 0 011 0v.28a2.48 2.48 0 011.93-.9 2.53 2.53 0 012.52 2.52V9.5a.5.5 0 01-1 0V6.42a1.53 1.53 0 00-1.52-1.52 1.53 1.53 0 00-1.52 1.52V9.5a.5.5 0 01-1 0zm8.04-3.24a2.26 2.26 0 012.21-1.9 2.24 2.24 0 012.2 1.9H24.54zm5.42.73c0-.12 0-.24-.02-.36a3.24 3.24 0 00-3.19-2.75 3.24 3.24 0 100 6.48 3.23 3.23 0 002.86-1.73.5.5 0 10-.88-.47 2.24 2.24 0 01-1.98 1.2 2.24 2.24 0 01-2.2-1.87H29.5a.5.5 0 00.5-.5zm3.53 3.01a.5.5 0 01-.5-.5V4.52a.5.5 0 011 0v.42a2.74 2.74 0 011.88-.94.5.5 0 010 1 1.76 1.76 0 00-1.75 1.74V9.5a.5.5 0 01-.63.5z" fill="#13B5EA"/>
            </svg>
          </div>
          <div className="flex items-center justify-center rounded-lg overflow-hidden" style={{ width: '32px', height: '32px', background: '#f5f9f7', border: '1px solid #E2EFE9' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/tpb-logo.svg" alt="Tax Practitioners Board" width={22} height={22} style={{ objectFit: 'contain' }} />
          </div>
          <span className="font-light" style={{ fontSize: '11px', color: 'rgba(10,15,13,0.4)' }}>Registered tax agent</span>
        </div>
      </div>
    </>
  )
}
