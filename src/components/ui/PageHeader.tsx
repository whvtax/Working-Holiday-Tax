import React from 'react'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

interface BC { label: string; href?: string }
interface Props {
  kicker?: string
  title: string
  titleEm?: string
  sub: React.ReactNode
  breadcrumbs?: BC[]
  cta?: { label: string; href?: string }
}

export function PageHeader({ kicker = 'Service guide', title, titleEm, sub, breadcrumbs, cta }: Props) {
  const ctaIsExternal = !cta?.href
  return (
    <section className="relative overflow-hidden pt-[68px] bg-white" style={{ borderBottom: '1px solid #DCE0DE' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-10 lg:py-14 relative z-10">
        {breadcrumbs && (
          // rgba(10,15,13,0.35) on white measures about 2.3:1 and fails WCAG
          // AA. #525A57 is the palette's caption colour, 6.41:1, and keeps the
          // same quiet grey green.
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] mb-8" style={{ color: '#525A57' }}>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" style={{ color: '#DCE0DE' }}>/</span>}
                {b.href
                  ? <Link href={b.href} className="transition-colors hover:text-forest-500">{b.label}</Link>
                  : <span aria-current="page">{b.label}</span>
                }
              </span>
            ))}
          </nav>
        )}
        <div className="max-w-[720px]">
          <p className="mb-4 font-mono uppercase" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', color: '#0B5240' }}>{kicker}</p>
          <h1 className="font-serif font-bold text-ink mb-4" style={{ fontSize: 'clamp(30px,5vw,48px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {title}
            {titleEm && <><br /><span style={{ color: '#0B5240' }}>{titleEm}</span></>}
          </h1>
          {/* rgba(10,15,13,0.55) on white is 4.48:1, just under the 4.5 AA
              minimum for 14px text. #525A57 clears it at 6.41:1. */}
          <p className="leading-[1.6] mb-7" style={{ fontSize: '17px', color: '#3F4A45', maxWidth: '560px' }}>{sub}</p>
          {cta && (
            <a
              href={cta.href ?? WA_URL}
              target={ctaIsExternal ? '_blank' : '_self'}
              rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
              className="btn-primary"
              style={{ height: '52px', padding: '0 26px', fontSize: '16px' }}
            >
              {cta.label}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
