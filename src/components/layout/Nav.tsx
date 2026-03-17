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
                    onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = '#0B5240' }}
                    onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = '#587066' }}>
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
                Check my tax — free
              </a>
            </div>

            <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open ? 'true' : 'false'}
              className="flex flex-col justify-center gap-[5px] w-10 h-10 bg-transparent border-none p-2 lg:hidden">
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-300 w-5 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-200 w-5 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-300 ${open ? 'w-5 -translate-y-[6.5px] -rotate-45' : 'w-3.5'}`} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8 pb-12 overflow-y-auto transition-transform duration-500 ease-spring ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {NAV_LINKS.map(l => (
          <Link key={l.href} href={l.href} onClick={close}
            className="block font-serif text-[26px] font-bold text-ink py-4 transition-colors hover:text-forest-500"
            style={{ borderBottom: '1px solid #E2EFE9' }}>
            {l.label}
          </Link>
        ))}
        <div className="mt-8">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" onClick={close} className="btn-primary w-full justify-center" style={{ height: '56px', borderRadius: '14px' }}>
            Check my tax — free →
          </a>
        </div>
      </div>
    </>
  )
}
