import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Working Holiday Tax - Australian Tax Help for WHV Holders',
  description: 'TFN, tax return, super withdrawal and ABN for Working Holiday Visa holders in Australia. Registered tax agent. Ask us anything - free.',
}

// ── ICONS ──────────────────────────────────────────────────────────────────
const IconDoc = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="6" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="6" y1="13.5" x2="9" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="6" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M6.5 6V5a3.5 3.5 0 017 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M7.5 11l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10 6.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)
const IconPlus = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10 6.5v7M7 10h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)
const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
  </svg>
)
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
    <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden pt-[68px] bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 pt-12 pb-10 lg:pt-20 lg:pb-16">
        <div className="max-w-[600px]">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Working Holiday Visa Specialist</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-black text-ink mb-5" style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
          }}>
            Confused about tax in Australia?{' '}
            <span style={{ color: '#0B5240' }}>We&apos;ve got you covered.</span>
          </h1>

          {/* Sub */}
          <p className="font-light leading-[1.8] mb-8" style={{ fontSize: '16px', color: 'rgba(10,15,13,0.6)', maxWidth: '480px' }}>
            TFN, ABN, Tax Return &amp; Super - we handle everything for you, so you don&apos;t have to stress about paperwork.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-6">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
              Get help with your tax
            </a>
            <Link href="#how-it-works"
              className="btn-ghost-dark"
              style={{ height: '52px', padding: '0 24px', fontSize: '15px' }}>
              How it works
            </Link>
          </div>

          {/* Trust badges inline */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              '1,200+ travellers helped',
              'Registered tax agent',
              'ATO compliant',
              'Response within 1 hour',
            ].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.5)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="5.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                  <path d="M3.5 6l2 2 3-3" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Money signal — urgency strip */}
      <div style={{ background: '#F4F9F6', borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-3">
          <p className="font-light" style={{ fontSize: '12.5px', color: 'rgba(10,15,13,0.5)', fontStyle: 'italic' }}>
            Most backpackers overpay tax in Australia — we make sure you don&apos;t.
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { n: '4.9★',   l: 'Google rating' },
            { n: '1,200+', l: 'WHV clients helped' },
            { n: '<1 hr',  l: 'Response time' },
            { n: '100%',   l: 'Online service' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl text-center py-3.5 px-2" style={{
              background: '#ffffff',
              border: '1.5px solid #C8EAE0',
            }}>
              <p className="font-serif font-black text-forest-500 mb-1" style={{ fontSize: 'clamp(18px,2.2vw,22px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{c.n}</p>
              <p className="font-light" style={{ fontSize: '11px', color: 'rgba(10,15,13,0.55)', lineHeight: 1.35 }}>{c.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SERVICES ───────────────────────────────────────────────────────────────
const SERVICES = [
  {
    n: '01', href: '/tfn', icon: <IconDoc />,
    title: 'TFN Application',
    desc: 'Start working at the correct tax rate from day one. We handle your TFN application properly the first time.',
  },
  {
    n: '02', href: '/tax-return', icon: <IconLock />,
    title: 'Tax Return',
    desc: 'Get your tax refund fast and stress free. We handle everything with the ATO for you.',
  },
  {
    n: '03', href: '/superannuation', icon: <IconClock />,
    title: 'Super Withdrawal',
    desc: 'Claim your super back when you leave Australia. We handle the full process for you.',
  },
  {
    n: '04', href: '/abn', icon: <IconPlus />,
    title: 'ABN Registration',
    desc: 'Set up your ABN so you can work and invoice properly. We handle everything for you from day one.',
  },
]

function Services() {
  return (
    <section className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="max-w-xl mx-auto text-center mb-10 reveal">
          <span className="section-label center">What we help with</span>
          <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,34px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
            Everything you need to sort your tax<br />
            <em className="not-italic font-normal text-forest-400">in Australia without the stress.</em>
          </h2>
          <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '14px' }}>
            From your first job to your final refund, we take care of it for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal delay-2">
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href}
              className="group bg-white rounded-2xl p-5 flex flex-col transition-all hover:shadow-lg"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
              <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-subtle mb-3">{s.n}</span>
              <span className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0">
                {s.icon}
              </span>
              <h3 className="text-[14px] font-semibold text-ink mb-2" style={{ letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p className="text-[13px] font-light text-muted leading-[1.7] flex-1 mb-4">{s.desc}</p>
              <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-forest-600 transition-all group-hover:gap-3">
                Learn more
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Mid-page CTA */}
        <div className="text-center mt-10 reveal delay-3">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
            Get help with your tax
          </a>
        </div>
      </div>
    </section>
  )
}

// ── TRUST ──────────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  {
    title: 'WHV tax specialists',
    body: 'Working Holiday tax is all we do. We handle complex situations every day.',
  },
  {
    title: 'Registered. Compliant. Accountable.',
    body: 'Handled under a registered tax agent. Fully compliant and accountable for every service.',
  },
  {
    title: 'Real people, fast answers',
    body: 'Real people who respond quickly. We guide you through the whole process.',
  },
  {
    title: 'We make it simple',
    body: 'No forms, no stress, no confusion. We handle the process and keep you updated.',
  },
]

function Trust() {
  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="max-w-xl mx-auto text-center mb-10 reveal">
          <span className="section-label center">Why travellers trust us</span>
          <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,34px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
            Built for Working Holiday travellers.{' '}
            <em className="not-italic font-normal text-forest-400">We understand exactly what you need.</em>
          </h2>
          <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '14px' }}>
            We work with Working Holiday travellers every day, so we know what works and what doesn&apos;t.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 reveal delay-2">
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="pt-5 border-t border-border text-center">
              <h3 className="text-[14px] font-semibold text-ink mb-2" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
              <p className="text-[13px] font-light text-muted leading-[1.7]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PROCESS ────────────────────────────────────────────────────────────────
const STEPS = [
  { n: '1', title: 'Tell us what you need.',  body: 'TFN, ABN, tax return or super. Share your situation and get clear guidance.' },
  { n: '2', title: 'Send your details.',       body: 'Follow a simple checklist and upload your personal details easily.' },
  { n: '3', title: 'We manage your tax.',      body: 'We prepare and lodge your return correctly with no confusion or delays.' },
  { n: '4', title: 'Get your refund.',         body: 'Most returns are processed within 7 to 14 days and you stay updated throughout.' },
]

function Process() {
  return (
    <section id="how-it-works" className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

        <div className="max-w-xl mx-auto text-center mb-12 reveal">
          <span className="section-label center">How it works</span>
          <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,34px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
            How it works in 4 simple steps.{' '}
            <em className="not-italic font-normal text-forest-400">We take care of it for you.</em>
          </h2>
          <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '14px' }}>
            You send us your details and we take care of the rest.
          </p>
        </div>

        <div className="reveal delay-1">
          {/* Desktop */}
          <div className="hidden lg:block">
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{
                background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)',
                zIndex: 0,
              }} aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="text-[14px] font-semibold text-ink mb-2 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                  <p className="text-[12.5px] font-light text-muted leading-[1.7] text-center">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col gap-1">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4 pb-6">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ background: '#0B5240' }}>
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 w-px mt-2 min-h-[32px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />
                  )}
                </div>
                <div className="pt-1">
                  <p className="text-[14px] font-semibold text-ink mb-1" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                  <p className="text-[13px] font-light text-muted leading-[1.7]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10 reveal delay-2">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
            Get help with your tax
          </a>
          <p className="mt-3 text-[12px]" style={{ color: '#2FA880' }}>
            Free to start&nbsp;•&nbsp;No upfront fees&nbsp;•&nbsp;Personal support throughout
          </p>
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Liam O'Brien",
    from: 'Ireland · WHV 417',
    quote: 'I was stressed about my super - four months, three different employers. They guided me through everything and helped me get it all back.',
    amount: '$3,200',
    initials: 'L',
    bgColor: '#DBEAFE',
    textColor: '#1E40AF',
  },
  {
    name: 'Emma T.',
    from: 'United Kingdom · WHV 417',
    quote: 'Got my TFN sorted in two days, and they handled my entire tax return when I left. No stress, just money back in my account.',
    amount: '$2,450',
    initials: 'E',
    bgColor: '#FCE7F3',
    textColor: '#9D174D',
  },
  {
    name: 'Max Fischer',
    from: 'Germany · WHV 417',
    quote: 'Fast, clear, and genuinely helpful. They explained everything simply and helped me get my super back after I left.',
    amount: '$4,100',
    initials: 'M',
    bgColor: '#D1FAE5',
    textColor: '#065F46',
  },
]

function Testimonials() {
  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

        <div className="text-center mb-10 reveal">
          <span className="section-label center">Client stories</span>
          <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,34px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
            Real experiences from backpackers like you.
          </h2>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-ghost-dark inline-flex"
            style={{ height: '40px', padding: '0 20px', fontSize: '13.5px' }}>
            Check if you are eligible →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal delay-1" style={{ alignItems: 'stretch' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i}
              className="bg-white rounded-2xl p-6 flex flex-col"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 24px rgba(11,82,64,.07)', border: '1px solid #E2EFE9' }}>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
              </div>
              <p className="text-[13.5px] font-light text-body leading-[1.8] flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #E2EFE9' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0"
                    style={{ background: t.bgColor, color: t.textColor }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[12.5px] font-semibold text-ink leading-tight">{t.name}</p>
                    <p className="text-[11.5px] text-subtle leading-tight mt-0.5">{t.from}</p>
                  </div>
                </div>
                <span className="font-serif font-black text-forest-500 flex-shrink-0 ml-2" style={{ fontSize: '17px', letterSpacing: '-0.03em' }}>
                  {t.amount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mt-8 pt-8 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-5 sm:gap-8 reveal delay-3" style={{ borderTop: '1px solid #E2EFE9' }}>
          {[
            { n: '4.9★',   l: 'Google rating' },
            { n: '1,200+', l: 'WHV clients helped' },
            { n: '<1 hr',  l: 'Response time' },
            { n: '100%',   l: 'Online service' },
          ].map((s, i) => (
            <div key={i} className="contents">
              {i > 0 && <div className="hidden sm:block w-px h-8 bg-border" aria-hidden="true" />}
              <div className="text-center">
                <p className="font-serif font-black text-forest-500" style={{ fontSize: '20px', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</p>
                <p className="text-[11.5px] text-subtle mt-1">{s.l}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-5 reveal delay-4" style={{ fontSize: '11.5px', color: 'rgba(10,15,13,0.32)', letterSpacing: '0.02em' }}>
          Thousands of dollars returned to travellers every year.
        </p>

      </div>
    </section>
  )
}

// ── PAGE ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Trust />
      <Process />
      <Testimonials />
      <CtaBand
        eyebrow="Start here"
        heading="Get your tax done right."
        headingEm="From anywhere in Australia or overseas."
        sub={<>TFN, tax return, super, and ABN handled for Working Holiday travellers.<br />Start with a free check.</>}
        primaryLabel="Check what you need →"
        clipTop
      />
    </>
  )
}
