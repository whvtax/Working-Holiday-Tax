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
  const ctaIsExternal = !cta?.href  // no href = WhatsApp = external
  return (
    <section className="page-header grid-bg relative overflow-hidden bg-ink-2">
      <div className="absolute pointer-events-none" style={{ top:'-30%', right:'-10%', width:'65%', paddingBottom:'65%', borderRadius:'50%', background:'radial-gradient(circle,rgba(11,82,64,.7) 0%,transparent 68%)' }} aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14 relative z-10">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-white/30 mb-5 reveal">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/15" aria-hidden="true">/</span>}
                {b.href
                  ? <Link href={b.href} className="hover:text-white/60 transition-colors">{b.label}</Link>
                  : <span aria-current="page">{b.label}</span>
                }
              </span>
            ))}
          </nav>
        )}
        <div className="inline-flex items-center gap-2 bg-forest-300/10 border border-forest-300/22 rounded-full px-3.5 py-1.5 mb-6 reveal delay-1">
          <span className="w-[6px] h-[6px] rounded-full bg-forest-300" aria-hidden="true" />
          <span className="text-[10.5px] font-medium tracking-[0.1em] uppercase text-forest-300">{kicker}</span>
        </div>
        <h1 className="font-serif font-black text-white tracking-[-2px] leading-[1] mb-5 reveal delay-2" style={{ fontSize: 'clamp(38px,7vw,72px)' }}>
          {title}
          {titleEm && <><br /><em className="not-italic font-normal text-white/50">{titleEm}</em></>}
        </h1>
        <p className="text-[17px] font-light text-white/48 leading-[1.7] max-w-[500px] mb-9 reveal delay-3">{sub}</p>
        {cta && (
          <div className="reveal delay-4">
            <a
              href={cta.href ?? WA_URL}
              target={ctaIsExternal ? '_blank' : '_self'}
              rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 h-[52px] px-8 bg-amber text-ink-2 rounded-full text-[14px] font-semibold shadow-[0_4px_20px_rgba(233,160,32,0.3)] transition-all hover:bg-amber-300 hover:text-white hover:-translate-y-0.5"
            >
              {cta.label} →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
