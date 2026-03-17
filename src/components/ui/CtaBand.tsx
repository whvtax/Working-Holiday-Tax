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

export function CtaBand({ eyebrow = 'Ready?', heading, headingEm, sub, primaryLabel = 'Free Eligibility Check', secondaryLabel, secondaryHref = '/calculator', clipTop = false }: Props) {
  return (
    <section className="relative overflow-hidden grid-bg"
      style={{ background: '#1A5C44', paddingTop: '48px', paddingBottom: '56px' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="text-center max-w-xl mx-auto relative z-10 reveal">
          <span className="section-label light center mb-3 block">{eyebrow}</span>
          <h2 className="font-serif font-black text-white mb-2" style={{
            fontSize: 'clamp(22px, 3.2vw, 36px)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
          }}>
            {heading}
            {headingEm && <><br /><em className="not-italic font-normal" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '92%' }}>{headingEm}</em></>}
          </h2>
          <p className="font-light leading-[1.65] mb-5" style={{
            fontSize: '13.5px',
            color: 'rgba(255,255,255,0.65)',
          }}>{sub}</p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-4">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
              height: '46px',
              padding: '0 26px',
              fontSize: '14px',
            }}>
              {primaryLabel}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            {secondaryLabel && (
              <Link href={secondaryHref} className="btn-ghost-light" style={{ height: '46px' }}>
                {secondaryLabel}
              </Link>
            )}
          </div>
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em' }}>
            Free to start&nbsp;•&nbsp;1,200+ travellers helped&nbsp;•&nbsp;Response in under 1 hour
          </p>
        </div>
      </div>
    </section>
  )
}
