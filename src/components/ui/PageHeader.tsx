import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

interface BC { label: string; href?: string }
interface Props {
  kicker?: string
  title: string
  titleEm?: string
  sub: string
  breadcrumbs?: BC[]
  cta?: { label: string; href?: string }
}

export function PageHeader({ kicker = 'Service guide', title, titleEm, sub, breadcrumbs, cta }: Props) {
  const ctaIsExternal = !cta?.href
  return (
    <section className="page-header grid-bg relative overflow-hidden bg-ink-2">
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: '-30%', right: '-10%', width: '65%', paddingBottom: '65%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(11,82,64,.65) 0%,transparent 68%)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14 relative z-10">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-6 reveal" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.14)' }}>/</span>}
                {b.href
                  ? <Link href={b.href} className="transition-colors hover:text-white/60">{b.label}</Link>
                  : <span aria-current="page">{b.label}</span>
                }
              </span>
            ))}
          </nav>
        )}
        <div className="inline-flex items-center gap-2.5 mb-7 reveal delay-1">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-300" aria-hidden="true" />
          <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-forest-300">{kicker}</span>
        </div>
        <h1 className="font-serif font-black text-white mb-5 reveal delay-2" style={{ fontSize: 'clamp(38px,6.5vw,68px)', lineHeight: 1, letterSpacing: '-0.04em' }}>
          {title}
          {titleEm && <><br /><em className="not-italic font-normal" style={{ color: 'rgba(255,255,255,0.42)' }}>{titleEm}</em></>}
        </h1>
        <p className="font-light leading-[1.7] mb-9 reveal delay-3" style={{ fontSize: '17px', color: 'rgba(255,255,255,0.48)', maxWidth: '480px' }}>{sub}</p>
        {cta && (
          <div className="reveal delay-4">
            <a
              href={cta.href ?? WA_URL}
              target={ctaIsExternal ? '_blank' : '_self'}
              rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
              className="btn-primary"
              style={{ height: '52px' }}
            >
              {cta.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
