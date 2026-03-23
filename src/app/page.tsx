import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Working Holiday Tax - Australian Tax Help for WHV Holders',
  description: 'TFN, tax return, super and ABN for Working Holiday Visa holders in Australia. Clear process, personal support, professional oversight.',
}

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
    <path d="M3.5 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
  </svg>
)

const SERVICES = [
  { n: '01', href: '/tfn',            title: 'TFN Application',  desc: 'Apply for your Tax File Number. Set it up correctly before you start working.' },
  { n: '02', href: '/tax-return',     title: 'Tax Return',        desc: 'Lodge your tax return. Done properly with guidance and support.' },
  { n: '03', href: '/superannuation', title: 'Superannuation',    desc: 'Access your superannuation. For when you leave Australia.' },
  { n: '04', href: '/abn',            title: 'ABN Registration',  desc: 'Register for an ABN. If you plan to work as self-employed.' },
]

const STEPS = [
  { n: '1', title: 'Tell us your details',      body: 'Quick form with basic information.' },
  { n: '2', title: 'We review your case',       body: 'Checked with professional oversight.' },
  { n: '3', title: 'We prepare everything',     body: 'Handled clearly and correctly.' },
  { n: '4', title: "You're all set",            body: 'We guide you until completion.' },
]

const TESTIMONIALS = [
  { name: 'Liam', from: 'UK',      quote: 'Super easy process. Everything was explained clearly and handled quickly.' },
  { name: 'Emma', from: 'Ireland', quote: 'They helped me understand what I needed and guided me step by step.' },
  { name: 'Max',  from: 'Germany', quote: 'Fast, clear and professional. I felt confident the whole time.' },
]

const STATS = [
  { n: '4.9★', l: 'Average rating' },
  { n: '1,200+', l: 'Travellers helped' },
  { n: '< 24h', l: 'Response time' },
  { n: '100%', l: 'Online process' },
]

const WHY_CARDS = [
  { title: 'Built for working holiday travellers', body: 'We work with people like you every day and understand the process.' },
  { title: 'Prepared with professional oversight', body: 'Your information is handled with guidance from a registered tax professional.' },
  { title: 'Simple and clear process', body: 'No confusion, no unnecessary steps, everything explained clearly.' },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-14 pb-14 md:pt-20 md:pb-20 text-center">

          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(11,82,64,0.65)' }}>
              Working Holiday Visa Specialist
            </span>
          </div>

          <h1 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '20px', maxWidth: '18ch' }}>
            Australian tax for working holiday makers,{' '}
            <span style={{ color: '#0B5240' }}>done properly.</span>
          </h1>

          <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '46ch', margin: '0 auto 32px', fontWeight: 300 }}>
            We help you handle TFN, tax return and super with personal guidance and professional oversight.
          </p>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '54px', padding: '0 40px', fontSize: '16px', borderRadius: '100px', maxWidth: '340px', margin: '0 auto 16px' }}>
            Start your tax process →
          </a>

          <p style={{ fontSize: '13px', color: 'rgba(10,15,13,0.4)', marginTop: '8px' }}>
            Trusted by working holiday travellers across Australia
          </p>
        </div>
      </section>

      {/* ── TFN STRIP ────────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 text-center">
          <p className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '8px' }}>
            Don&apos;t have a TFN yet?
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '42ch', margin: '0 auto 20px', lineHeight: 1.65, fontWeight: 300 }}>
            You may be taxed at a higher rate until it&apos;s set up. We can help you get it sorted correctly.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold w-full sm:w-auto"
            style={{ height: '48px', padding: '0 28px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '220px', margin: '0 auto' }}>
            Get your TFN →
          </a>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
          <span className="section-label center">Why us</span>
          <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', maxWidth: '28ch', marginTop: '10px', marginBottom: '48px' }}>
            Built for people like you.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" style={{ marginBottom: '36px' }}>
            {WHY_CARDS.map((card, i) => (
              <div key={i} className="flex flex-col text-left rounded-2xl bg-white"
                style={{ padding: '24px', border: '1px solid #E2EFE9', height: '100%' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px', lineHeight: 1.3 }}>{card.title}</h3>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.65 }}>{card.body}</p>
              </div>
            ))}
          </div>

          <a href="#how-it-works" className="btn-ghost-dark inline-flex" style={{ height: '44px', padding: '0 24px', fontSize: '13.5px' }}>
            See how it works →
          </a>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">Client stories</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              What travellers say.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ alignItems: 'stretch' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)', height: '100%' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '14px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="font-light text-body flex-1" style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ paddingTop: '14px', borderTop: '1px solid #E2EFE9' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13px' }}>{t.name}</p>
                  <p className="text-subtle" style={{ fontSize: '12px', marginTop: '2px' }}>{t.from}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #E2EFE9' }}>
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-serif font-black text-forest-500" style={{ fontSize: 'clamp(20px, 2.8vw, 26px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</p>
                <p className="text-subtle" style={{ fontSize: '12px', marginTop: '4px' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              4 simple steps.
            </h2>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom: '48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ background: '#0B5240', fontSize: '13px', marginBottom: '16px', boxShadow: '0 0 0 4px #fff, 0 0 0 5px #C8EAE0' }}>{s.n}</div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize: '13.5px', marginBottom: '6px' }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col" style={{ gap: '0', marginBottom: '32px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: '#0B5240', fontSize: '12px' }}>{s.n}</div>
                  {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2"
                    style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '220px', margin: '0 auto' }}>
              Start now →
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">What we help with</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Everything you need, in one place.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ alignItems: 'stretch' }}>
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)', height: '100%' }}>
                <span className="font-medium uppercase text-subtle" style={{ fontSize: '10px', letterSpacing: '0.1em', marginBottom: '12px' }}>{s.n}</span>
                <h3 className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px', lineHeight: 1.3 }}>{s.title}</h3>
                <p className="font-light text-muted flex-1" style={{ fontSize: '13px', lineHeight: 1.65, marginBottom: '16px' }}>{s.desc}</p>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3" style={{ fontSize: '12.5px' }}>
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#1A5C44', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '22ch' }}>
            Get your Australian tax sorted, the right way.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '42ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            Clear process, personal support, and guidance every step of the way.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '54px', padding: '0 40px', fontSize: '15px', maxWidth: '300px', margin: '0 auto' }}>
            Start your tax process →
          </a>
        </div>
      </section>
    </>
  )
}
