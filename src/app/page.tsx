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
  <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
  </svg>
)

// ── 1. HERO ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden pt-[68px] bg-white hero-section">
      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 pt-8 pb-8 lg:pt-16 lg:pb-14 text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
          <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(11,82,64,0.65)' }}>
            Working Holiday Visa Specialist
          </span>
        </div>

        {/* Headline — 2–3 clean lines, balanced */}
        <h1 className="font-serif font-black text-ink mx-auto" style={{
          fontSize: 'clamp(26px,3.8vw,46px)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          maxWidth: '18ch',
          marginBottom: '12px',
          textWrap: 'balance',
        }}>
          Confused about tax in Australia?{' '}
          <span style={{ color: '#0B5240' }}>We&apos;ve got you covered.</span>
        </h1>

        {/* Subtext */}
        <p className="font-light mx-auto" style={{
          fontSize: '15px',
          lineHeight: 1.65,
          color: 'rgba(10,15,13,0.55)',
          maxWidth: '28ch',
          marginBottom: '24px',
          textWrap: 'balance',
        }}>
          TFN, ABN, Tax Return &amp; Super - we handle everything for you.
        </p>

        {/* Single CTA */}
        <div style={{ marginBottom: '16px' }}>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex"
            style={{ height: '52px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '300px', width: '100%' }}>
            Get help with your tax
          </a>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          {[
            { n: '4.9★', l: 'Google rating' },
            { n: '1,200+', l: 'clients helped' },
            { n: '<1 hr', l: 'response time' },
          ].map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1" style={{ fontSize: '11.5px', color: 'rgba(10,15,13,0.4)' }}>
              {i > 0 && <span className="hidden sm:inline" style={{ marginRight: '4px', color: 'rgba(10,15,13,0.15)' }}>•</span>}
              <span className="font-semibold" style={{ color: 'rgba(10,15,13,0.6)' }}>{c.n}</span>
              <span>{c.l}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 2. URGENCY STRIP ────────────────────────────────────────────────────────
function Urgency() {
  return (
    <section style={{ background: '#0B5240' }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 py-7 lg:py-10 text-center">
        <p className="font-serif font-black text-white mx-auto" style={{
          fontSize: 'clamp(18px,2.6vw,28px)',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          maxWidth: '24ch',
          marginBottom: '8px',
          textWrap: 'balance',
        }}>
          Without a TFN, 47% tax is withheld from every payslip.
        </p>
        <p className="font-light mx-auto" style={{
          fontSize: '13.5px',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '28ch',
          marginBottom: '20px',
        }}>
          Most backpackers overpay tax in Australia - we make sure you don&apos;t.
        </p>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold transition-all"
          style={{ height: '48px', padding: '0 28px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '300px', width: '100%', justifyContent: 'center' }}>
          Get your TFN sorted now
        </a>
      </div>
    </section>
  )
}

// ── 3. SOLUTION / WHY US ─────────────────────────────────────────────────────
function Solution() {
  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 text-center">
        <span className="section-label center">Why us</span>
        <h2 className="font-serif font-black text-ink mx-auto" style={{
          fontSize: 'clamp(22px,3vw,38px)',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          maxWidth: '22ch',
          marginTop: '8px',
          marginBottom: '12px',
          textWrap: 'balance',
        }}>
          Built for Working Holiday travellers.{' '}
          <em className="not-italic font-normal text-forest-400">We understand exactly what you need.</em>
        </h2>
        <p className="font-light text-muted mx-auto" style={{ fontSize: '14px', lineHeight: 1.65, maxWidth: '30ch', marginBottom: '40px' }}>
          We work with Working Holiday travellers every day, so we know what works.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 reveal" style={{ marginBottom: '40px' }}>
          {[
            { title: 'WHV tax specialists',       body: 'Working Holiday tax is all we do. We handle complex situations every day.' },
            { title: 'Registered. Compliant.',    body: 'Handled under a registered tax agent. Fully compliant and ATO-approved.' },
            { title: 'Real people, fast answers', body: 'Real people who respond quickly. We guide you through the whole process.' },
            { title: 'We make it simple',         body: 'No forms, no stress, no confusion. We handle it and keep you updated.' },
          ].map((item, i) => (
            <div key={i} className="pt-5 border-t border-border text-left">
              <h3 className="text-[13.5px] font-semibold text-ink mb-1.5">{item.title}</h3>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '28ch' }}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* Single CTA — no repeat of hero */}
        <Link href="#how-it-works"
          className="btn-ghost-dark inline-flex"
          style={{ height: '44px', padding: '0 24px', fontSize: '13.5px' }}>
          See how it works
        </Link>
      </div>
    </section>
  )
}

// ── 4. SOCIAL PROOF ─────────────────────────────────────────────────────────
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

function SocialProof() {
  return (
    <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="text-center reveal" style={{ marginBottom: '32px' }}>
          <span className="section-label center">Client stories</span>
          <h2 className="font-serif font-black text-ink mx-auto" style={{
            fontSize: 'clamp(20px,2.8vw,34px)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            maxWidth: '24ch',
            marginTop: '8px',
            textWrap: 'balance',
          }}>
            Real experiences from backpackers like you.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal delay-1">
          {TESTIMONIALS.map((t, i) => (
            <div key={i}
              className="bg-white rounded-2xl flex flex-col"
              style={{ padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)' }}>
              <div className="flex gap-0.5" style={{ marginBottom: '12px' }}>
                {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
              </div>
              <p className="text-[13px] font-light text-body leading-[1.75] flex-1" style={{ marginBottom: '16px' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between" style={{ paddingTop: '14px', borderTop: '1px solid #E2EFE9' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                    style={{ background: t.bgColor, color: t.textColor }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-ink leading-tight">{t.name}</p>
                    <p className="text-[11px] text-subtle leading-tight" style={{ marginTop: '2px' }}>{t.from}</p>
                  </div>
                </div>
                <span className="font-serif font-black text-forest-500 flex-shrink-0" style={{ fontSize: '17px', letterSpacing: '-0.03em' }}>
                  {t.amount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats — tighter, more visual weight */}
        <div className="reveal delay-2" style={{ marginTop: '32px', paddingTop: '28px', borderTop: '1px solid #E2EFE9' }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { n: '4.9★',   l: 'Google rating' },
              { n: '1,200+', l: 'WHV clients helped' },
              { n: '<1 hr',  l: 'Response time' },
              { n: '100%',   l: 'Online service' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-serif font-black text-forest-500" style={{ fontSize: 'clamp(20px,3vw,26px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</p>
                <p className="text-[11.5px] text-subtle" style={{ marginTop: '4px' }}>{s.l}</p>
              </div>
            ))}
          </div>
          <p className="text-center" style={{ marginTop: '16px', fontSize: '11px', color: 'rgba(10,15,13,0.3)', letterSpacing: '0.02em' }}>
            Thousands of dollars returned to travellers every year.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── 5. HOW IT WORKS ─────────────────────────────────────────────────────────
const STEPS = [
  { n: '1', title: 'Tell us what you need.',  body: 'TFN, ABN, tax return or super. Share your situation and get clear guidance.' },
  { n: '2', title: 'Send your details.',       body: 'Follow a simple checklist and upload your personal details easily.' },
  { n: '3', title: 'We manage your tax.',      body: 'We prepare and lodge your return correctly with no confusion or delays.' },
  { n: '4', title: 'Get your refund.',         body: 'Most returns are processed within 7 to 14 days and you stay updated.' },
]

function Process() {
  return (
    <section id="how-it-works" className="py-10 lg:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="text-center reveal" style={{ marginBottom: '48px' }}>
          <span className="section-label center">How it works</span>
          <h2 className="font-serif font-black text-ink mx-auto" style={{
            fontSize: 'clamp(22px,3vw,38px)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            maxWidth: '22ch',
            marginTop: '8px',
            marginBottom: '10px',
            textWrap: 'balance',
          }}>
            4 simple steps.{' '}
            <em className="not-italic font-normal text-forest-400">We take care of it for you.</em>
          </h2>
          <p className="font-light text-muted" style={{ fontSize: '14px' }}>
            You send us your details and we take care of the rest.
          </p>
        </div>

        <div className="reveal delay-1">
          {/* Desktop */}
          <div className="hidden lg:block">
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{
                background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)',
              }} aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0" style={{ background: '#0B5240', marginBottom: '16px', boxShadow: '0 0 0 4px #fff, 0 0 0 5px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="text-[13.5px] font-semibold text-ink text-center" style={{ marginBottom: '6px' }}>{s.title}</p>
                  <p className="text-[12px] font-light text-muted leading-[1.65] text-center">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile — tighter vertical rhythm */}
          <div className="lg:hidden flex flex-col" style={{ gap: '0' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0" style={{ background: '#0B5240' }}>{s.n}</div>
                  {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2" style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="text-[13.5px] font-semibold text-ink" style={{ marginBottom: '4px' }}>{s.title}</p>
                  <p className="text-[12.5px] font-light text-muted leading-[1.65]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center reveal delay-2" style={{ marginTop: '40px' }}>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex"
            style={{ height: '52px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', maxWidth: '300px', width: '100%' }}>
            Get help with your tax
          </a>
          <p style={{ marginTop: '10px', fontSize: '12px', color: '#2FA880' }}>
            Free to start&nbsp;•&nbsp;No upfront fees&nbsp;•&nbsp;Personal support throughout
          </p>
        </div>
      </div>
    </section>
  )
}

// ── 6. SERVICES ─────────────────────────────────────────────────────────────
const SERVICES = [
  { n: '01', href: '/tfn',           icon: <IconDoc />,   title: 'TFN Application',  desc: 'Start working at the correct tax rate from day one. We handle your TFN application properly the first time.' },
  { n: '02', href: '/tax-return',    icon: <IconLock />,  title: 'Tax Return',        desc: 'Get your tax refund fast and stress free. We handle everything with the ATO for you.' },
  { n: '03', href: '/superannuation', icon: <IconClock />, title: 'Super Withdrawal', desc: 'Claim your super back when you leave Australia. We handle the full process for you.' },
  { n: '04', href: '/abn',           icon: <IconPlus />,  title: 'ABN Registration',  desc: 'Set up your ABN so you can work and invoice properly. We handle everything for you.' },
]

function Services() {
  return (
    <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="text-center reveal" style={{ marginBottom: '32px' }}>
          <span className="section-label center">What we help with</span>
          <h2 className="font-serif font-black text-ink mx-auto" style={{
            fontSize: 'clamp(22px,3vw,38px)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            maxWidth: '22ch',
            marginTop: '8px',
            marginBottom: '10px',
            textWrap: 'balance',
          }}>
            Everything you need to sort your tax in Australia.
          </h2>
          <p className="font-light text-muted" style={{ fontSize: '14px' }}>
            From your first job to your final refund, we take care of it for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 reveal delay-1">
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href}
              className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
              style={{ padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
              <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-subtle" style={{ marginBottom: '10px' }}>{s.n}</span>
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0" style={{ marginBottom: '12px' }}>
                {s.icon}
              </span>
              <h3 className="text-[13.5px] font-semibold text-ink" style={{ marginBottom: '6px' }}>{s.title}</h3>
              <p className="text-[12px] font-light text-muted leading-[1.65] flex-1" style={{ marginBottom: '14px' }}>{s.desc}</p>
              <span className="flex items-center gap-1.5 text-[12px] font-medium text-forest-600 transition-all group-hover:gap-3">
                Learn more
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <Urgency />
      <Solution />
      <SocialProof />
      <Process />
      <Services />
      <CtaBand
        eyebrow="Start here"
        heading="Get your tax done right."
        headingEm="From anywhere in Australia or overseas."
        sub={<>TFN, tax return, super, and ABN handled for Working Holiday travellers.<br />Start with a free check.</>}
        primaryLabel="Get help with your tax"
        clipTop
      />
    </>
  )
}
