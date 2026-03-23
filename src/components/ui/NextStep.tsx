import Link from 'next/link'

interface NextStepProps {
  eyebrow: string
  heading: string
  body: string
  cta: string
  href: string
  external?: boolean
}

export function NextStep({ eyebrow, heading, body, cta, href, external }: NextStepProps) {
  const inner = (
    <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 lg:py-14">
      <div className="max-w-[560px] mx-auto text-center reveal">
        <span className="inline-block font-medium uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.5)' }}>
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
interface RelatedItem { label: string; desc: string; href: string }

export function RelatedServices({ items }: { items: RelatedItem[] }) {
  return (
    <section className="py-8 lg:py-10 bg-white" style={{ borderTop: '1px solid #E2EFE9' }}>
      <div className="max-w-[1100px] mx-auto px-5 md:px-8">
        <p className="font-medium uppercase mb-4" style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'rgba(11,82,64,0.5)' }}>
          Related services
        </p>
        <div className="flex flex-wrap gap-3">
          {items.map((item, i) => (
            <Link key={i} href={item.href}
              className="flex-1 min-w-[160px] rounded-xl px-4 py-3 transition-all hover:shadow-md group"
              style={{ background: '#ffffff', border: '1.5px solid #E2EFE9', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
              <p className="text-[13px] font-semibold text-ink mb-0.5 group-hover:text-forest-500 transition-colors">{item.label}</p>
              <p className="text-[11.5px] font-light text-muted">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
