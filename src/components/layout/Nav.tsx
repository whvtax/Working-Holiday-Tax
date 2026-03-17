'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_LINKS, WA_URL } from '@/lib/constants'

const Logo = () => (
  <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <rect x="2" y="2" width="19" height="19" rx="4.5" stroke="#0B5240" strokeWidth="2"/>
      <rect x="13" y="13" width="19" height="19" rx="4.5" fill="#0B5240"/>
      <line x1="2" y1="2" x2="13" y2="13" stroke="#E9A020" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="2" cy="2" r="2.2" fill="#E9A020"/>
    </svg>
    <span className="font-serif text-[15.5px] font-bold text-ink tracking-[-0.3px] whitespace-nowrap">Working Holiday Tax</span>
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-canvas/92 backdrop-blur-2xl border-b border-border/55' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="h-[68px] flex items-center justify-between gap-5">
            <Logo />
            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map(l => {
                const active = pathname === l.href
                return (
                  <Link key={l.href} href={l.href}
                    className={`relative text-[13px] transition-colors after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-px after:bg-forest-500 after:origin-left after:transition-transform after:duration-300 ${active ? 'text-forest-500 after:scale-x-100' : 'text-muted hover:text-forest-500 after:scale-x-0 hover:after:scale-x-100'}`}>
                    {l.label}
                  </Link>
                )
              })}
            </div>
            {/* Desktop CTA */}
            <div className="hidden lg:flex">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="h-[42px] px-5 bg-forest-500 text-white rounded-full text-[13px] font-semibold shadow-[0_2px_12px_rgba(11,82,64,0.18)] transition-all hover:bg-forest-400 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(11,82,64,0.28)] flex items-center whitespace-nowrap">
                Check my tax — free
              </a>
            </div>
            {/* Hamburger */}
            <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}
              className="flex flex-col justify-center gap-[5.5px] w-10 h-10 bg-transparent border-none p-2 lg:hidden">
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-300 w-5 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-200 w-5 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] bg-ink rounded-sm transition-all duration-300 ${open ? 'w-5 -translate-y-[7px] -rotate-45' : 'w-3.5'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8 pb-12 overflow-y-auto transition-transform duration-500 ease-spring ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {NAV_LINKS.map(l => (
          <Link key={l.href} href={l.href} onClick={close}
            className="block font-serif text-[28px] font-bold text-ink py-4 border-b border-border transition-all hover:text-forest-500 hover:pl-2">
            {l.label}
          </Link>
        ))}
        <div className="mt-9">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" onClick={close}
            className="flex items-center justify-center h-[58px] bg-amber text-ink-2 rounded-full text-[15px] font-semibold shadow-[0_4px_20px_rgba(233,160,32,0.3)] transition-all hover:bg-amber-300 hover:text-white">
            Check my tax — free →
          </a>
        </div>
      </div>
    </>
  )
}
