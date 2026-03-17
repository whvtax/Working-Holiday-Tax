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
    <section className={`relative overflow-hidden bg-forest-500 py-28 grid-bg ${clipTop ? 'clip-diagonal' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="text-center max-w-xl mx-auto relative z-10 reveal">
          <span className="section-label light center mb-4 block">{eyebrow}</span>
          <h2 className="font-serif font-black text-white tracking-[-1.2px] leading-[1.08] mt-3 mb-4" style={{ fontSize: 'clamp(28px,5vw,48px)' }}>
            {heading}
            {headingEm && <><br /><em className="not-italic font-normal text-white/50">{headingEm}</em></>}
          </h2>
          <p className="text-[15px] font-light text-white/45 leading-[1.75] mb-9">{sub}</p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-[58px] px-8 bg-amber text-ink-2 rounded-full text-[15px] font-semibold shadow-[0_4px_20px_rgba(233,160,32,0.3)] transition-all hover:bg-amber-300 hover:text-white hover:-translate-y-0.5">
              {primaryLabel} →
            </a>
            {secondaryLabel && (
              <Link href={secondaryHref}
                className="inline-flex items-center justify-center gap-2 h-[58px] px-8 bg-transparent text-white/65 border border-white/15 rounded-full text-[15px] font-normal transition-all hover:bg-white/7 hover:border-white/32 hover:text-white hover:-translate-y-0.5">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
