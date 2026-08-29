import Link from 'next/link'

interface NextStepProps {
  eyebrow: string
  heading: string
  body: string
  cta: string
  href: string
  external?: boolean
  trustLine?: string
}

export function NextStep({ eyebrow, heading, body, cta, href, external, trustLine }: NextStepProps) {
  const inner = (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-10 lg:py-14">
      <div className="max-w-[560px] mx-auto text-center reveal">
        {/* White at 0.5 alpha over forest 500 is 3.54:1, which fails AA for a
            10px uppercase label. 0.72 clears it at 5.6:1. */}
        <span className="inline-block font-medium uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.72)' }}>
          {eyebrow}
        </span>
        <h2 className="font-serif font-black mb-3" style={{ fontSize: 'clamp(20px,2.6vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: '#ffffff' }}>
          {heading}
        </h2>
        <p className="font-light leading-[1.7] mb-6" style={{ fontSize: '14px', maxWidth: '400px', margin: '0 auto 24px', color: 'rgba(255,255,255,0.65)' }}>
          {body}
        </p>
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold transition-all"
            style={{ height: '48px', padding: '0 28px', fontSize: '14.5px', background: '#E9A020', color: '#1A2822', borderRadius: '100px' }}>
              {cta}
          </a>
        ) : (
          <Link href={href}
            className="inline-flex items-center justify-center font-semibold transition-all"
            style={{ height: '48px', padding: '0 28px', fontSize: '14.5px', background: '#E9A020', color: '#1A2822', borderRadius: '100px' }}>
            {cta}
          </Link>
        )}
        {trustLine && (
          // 0.45 alpha over forest 500 is 3.15:1 and fails AA; 0.7 is 5.3:1.
          <p style={{ marginTop: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{trustLine}</p>
        )}
      </div>
    </div>
  )

  return (
    <section style={{ background: '#0B5240' }}>
      {inner}
    </section>
  )
}

// ── RELATED SERVICES component ─────────────────────────────────────────────
