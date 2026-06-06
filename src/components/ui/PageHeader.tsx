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
    <section className="relative overflow-hidden pt-[68px] bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-9 lg:py-12 relative z-10">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'rgba(10,15,13,0.35)' }}>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>}
                {b.href
                  ? <Link href={b.href} className="transition-colors hover:text-forest-500">{b.label}</Link>
                  : <span aria-current="page">{b.label}</span>
                }
              </span>
            ))}
          </nav>
        )}
        <div className="max-w-[640px]">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>{kicker}</span>
          </div>
          <h1 className="font-serif font-black text-ink mb-3" style={{ fontSize: 'clamp(22px,3.5vw,38px)', lineHeight: 1.06, letterSpacing: '-0.025em' }}>
            {title}
            {titleEm && <><br /><span style={{ color: '#0B5240' }}>{titleEm}</span></>}
          </h1>
          <p className="font-light leading-[1.7] mb-7" style={{ fontSize: '14px', color: 'rgba(10,15,13,0.55)', maxWidth: '480px' }}>{sub}</p>
          {cta && (
            <a
              href={cta.href ?? WA_URL}
              target={ctaIsExternal ? '_blank' : '_self'}
              rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
              className="btn-primary"
              style={{ height: '46px', padding: '0 22px', fontSize: '13.5px' }}
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
