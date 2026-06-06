import Link from 'next/link'
import type { ReactNode } from 'react'
import { WA_URL } from '@/lib/constants'

interface Props {
  eyebrow?: string
  heading: string
  headingEm?: string
  sub: ReactNode
  primaryLabel?: string
  secondaryLabel?: string
  secondaryHref?: string
  clipTop?: boolean
  trustLine?: string
}

export function CtaBand({ eyebrow = 'Ready?', heading, headingEm, sub, primaryLabel = 'Free Eligibility Check', secondaryLabel, secondaryHref = '/calculator', clipTop = false, trustLine }: Props) {
  return (
    <section className="relative overflow-hidden grid-bg py-10 sm:py-14" style={{ background: '#1A5C44' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="text-center max-w-xl mx-auto px-1 relative z-10 reveal">
          <span className="section-label light center mb-3 block">{eyebrow}</span>
          <h2 className="font-serif font-black text-white mb-2" style={{
            fontSize: 'clamp(22px, 3.2vw, 36px)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
          }}>
            {heading}
            {headingEm && headingEm.length > 0 && <><br /><em className="not-italic font-normal" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '92%' }}>{headingEm}</em></>}
          </h2>
          <p className="font-light leading-[1.65] mb-5" style={{
            fontSize: '13.5px',
            color: 'rgba(255,255,255,0.65)',
          }}>{sub}</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-center mb-4">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
              height: '50px',
              padding: '0 28px',
              fontSize: '14px',
            }}>
              {primaryLabel} →
            </a>
            {secondaryLabel && (
              <Link href={secondaryHref} className="btn-ghost-light" style={{ height: '46px' }}>
                {secondaryLabel}
              </Link>
            )}
          </div>
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em' }}>
            {trustLine ?? <>Response within 1 hour</>}
          </p>
        </div>
      </div>
    </section>
  )
}
