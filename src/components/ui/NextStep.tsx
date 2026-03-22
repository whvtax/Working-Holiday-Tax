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
    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-10 lg:py-14">
      <div className="max-w-[560px] mx-auto text-center reveal">
        <span className="inline-block font-medium uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.5)' }}>
          {eyebrow}
        </span>
        <h2 className="font-serif font-black text-ink mb-3" style={{ fontSize: 'clamp(20px,2.6vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
          {heading}
        </h2>
        <p className="font-light text-muted leading-[1.7] mb-6" style={{ fontSize: '14px', maxWidth: '400px', margin: '0 auto 24px' }}>
          {body}
        </p>
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex"
            style={{ height: '48px', padding: '0 28px', fontSize: '14.5px' }}>
            {cta}
          </a>
        ) : (
          <Link href={href}
            className="btn-primary inline-flex"
            style={{ height: '48px', padding: '0 28px', fontSize: '14.5px' }}>
            {cta}
          </Link>
        )}
      </div>
    </div>
  )

  return (
    <section style={{ background: '#F4F9F6', borderTop: '1px solid #E2EFE9' }}>
      {inner}
    </section>
  )
}

// ── RELATED SERVICES component ─────────────────────────────────────────────
interface RelatedItem { label: string; desc: string; href: string }

export function RelatedServices({ items }: { items: RelatedItem[] }) {
  return (
    <section className="py-8 lg:py-10 bg-white" style={{ borderTop: '1px solid #E2EFE9' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <p className="font-medium uppercase mb-4" style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'rgba(11,82,64,0.5)' }}>
          Related services
        </p>
        <div className="flex flex-wrap gap-3">
          {items.map((item, i) => (
            <Link key={i} href={item.href}
              className="flex-1 min-w-[140px] rounded-xl px-4 py-3 transition-all hover:shadow-md group"
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
