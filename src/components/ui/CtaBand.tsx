import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

interface Props {
  eyebrow?: string
  heading: string
  headingEm?: string
  sub: string
  primaryLabel?: string
  secondaryLabel?: string
  secondaryHref?: string
  clipTop?: boolean
}

export function CtaBand({ eyebrow = 'Ready?', heading, headingEm, sub, primaryLabel = 'Check my tax — free', secondaryLabel, secondaryHref = '/calculator', clipTop = false }: Props) {
  return (
    <section className={`relative overflow-hidden bg-forest-500 py-32 grid-bg ${clipTop ? 'clip-diagonal' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="text-center max-w-2xl mx-auto relative z-10 reveal">
          <span className="section-label light center mb-5 block">{eyebrow}</span>
          <h2 className="font-serif font-black text-white mb-5" style={{ fontSize: 'clamp(32px,5vw,52px)', lineHeight: 1.06, letterSpacing: '-0.035em' }}>
            {heading}
            {headingEm && <><br /><em className="not-italic font-normal" style={{ color: 'rgba(255,255,255,0.42)' }}>{headingEm}</em></>}
          </h2>
          <p className="text-[16px] font-light leading-[1.75] mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>{sub}</p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px' }}>
              {primaryLabel}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            {secondaryLabel && (
              <Link href={secondaryHref} className="btn-ghost-light" style={{ height: '52px' }}>
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
