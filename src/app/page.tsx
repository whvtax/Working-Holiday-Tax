import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Working Holiday Tax — Australian Tax for WHV Holders',
  description: 'Tax return, TFN, super and ABN for Working Holiday Visa holders in Australia. Registered tax agent. Free eligibility check.',
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

// ── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-ink-2 overflow-hidden pt-[68px] min-h-svh flex flex-col">
      <div className="absolute inset-0 pointer-events-none grid-bg" aria-hidden="true" />
      {/* Glow — larger, more dramatic */}
      <div className="absolute pointer-events-none" aria-hidden="true" style={{
        top: '-30%', right: '-20%', width: '80%', paddingBottom: '80%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(11,82,64,.65) 0%, rgba(11,82,64,.15) 45%, transparent 70%)',
      }} />
      {/* Second glow bottom-left */}
      <div className="absolute pointer-events-none" aria-hidden="true" style={{
        bottom: '-20%', left: '-10%', width: '50%', paddingBottom: '50%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(11,82,64,.25) 0%, transparent 65%)',
      }} />

      <div className="flex-1 max-w-7xl mx-auto px-6 md:px-12 lg:px-14 w-full grid grid-cols-1 items-center py-20 lg:py-32 relative z-10">

        {/* ── Left copy ── */}
        <div className="max-w-[640px]">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-300 animate-pulse-dot" aria-hidden="true" />
            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-forest-300">Working Holiday Visa Specialist</span>
          </div>

          {/* H1 — dramatic, clean hierarchy */}
          <h1 className="font-serif font-black text-white mb-7" style={{
            fontSize: 'clamp(52px, 8.5vw, 88px)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
          }}>
            <span className="block">Your tax,</span>
            <span className="block italic font-normal" style={{ color: 'rgba(255,255,255,0.38)' }}>handled</span>
            <span className="block">completely.</span>
          </h1>

          {/* Sub — one sentence, much cleaner */}
          <p className="text-[17px] font-light leading-[1.7] mb-10" style={{ color: 'rgba(255,255,255,0.52)', maxWidth: '420px' }}>
            TFN, tax return, super and ABN for Working Holiday Visa holders. Done online. Done right.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 items-start mb-8">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '56px', padding: '0 32px', fontSize: '15px' }}>
              Check my tax — free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="/calculator" className="btn-ghost-light" style={{ height: '56px', padding: '0 28px', fontSize: '15px' }}>
              Estimate my refund
            </a>
          </div>

          <p className="text-[12px] tracking-[0.04em]" style={{ color: 'rgba(255,255,255,0.22)' }}>
            Free eligibility check · No commitment · 100% online
          </p>
        </div>

      </div>

      {/* Stats bar — simpler, more spacious */}
      <div className="relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14 py-8">
          <div className="grid grid-cols-3 gap-0">
            {[
              { n: '$2.4M+', l: 'Refunds processed' },
              { n: '1,200+', l: 'WHV holders helped' },
              { n: '5.0 ★',  l: 'Client satisfaction' },
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                {i > 0 && <span className="absolute left-0 top-[15%] bottom-[15%] w-px" style={{ background: 'rgba(255,255,255,0.06)' }} aria-hidden="true" />}
                <span className="block font-serif font-black text-white mb-1" style={{ fontSize: 'clamp(20px,3.5vw,28px)', letterSpacing: '-0.03em' }}>{s.n}</span>
                <span className="block text-[11px] tracking-[0.04em]" style={{ color: 'rgba(255,255,255,0.28)' }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


// ── SERVICES ───────────────────────────────────────────────────────────────
const SERVICES = [
  { n: '01', href: '/tfn',            icon: <IconDoc />,   title: 'TFN Application',  desc: 'Sorted before your first payslip. We guide you through the official ATO process — correctly, the first time.' },
  { n: '02', href: '/tax-return',     icon: <IconLock />,  title: 'Tax Return',        desc: 'We prepare, review and lodge your return, maximising every legal deduction and getting your refund back fast.' },
  { n: '03', href: '/superannuation', icon: <IconClock />, title: 'Superannuation',    desc: 'Claim your super after leaving Australia. We manage the entire DASP process so every dollar comes home with you.' },
  { n: '04', href: '/abn',            icon: <IconPlus />,  title: 'ABN Registration',  desc: 'Working as a sole trader? We register your ABN and set you up to invoice correctly from day one.' },
]

function Services() {
  return (
    <section className="py-32 lg:py-44 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="mb-20 reveal">
          <span className="section-label">Everything you need</span>
          <h2 className="section-h2">One place for your<br /><em>entire</em> Australian tax.</h2>
          <p className="body-lg max-w-[480px]">From the moment you land to the day you leave — every obligation covered.</p>
        </div>

        {/* Service grid — borderless, open, airy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 reveal delay-2" style={{ borderTop: '1px solid #E2EFE9' }}>
          {SERVICES.map((s, idx) => (
            <Link key={s.href} href={s.href}
              className="group py-10 pr-8 flex flex-col transition-all"
              style={{
                borderRight: idx < 3 ? '1px solid #E2EFE9' : 'none',
                paddingLeft: idx === 0 ? 0 : '2rem',
              }}>
              <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-subtle mb-8">{s.n}</span>
              <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 text-forest-500 transition-all bg-forest-50 group-hover:bg-forest-500 group-hover:text-white">
                {s.icon}
              </span>
              <h3 className="font-sans text-[15px] font-semibold text-ink mb-3" style={{ letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p className="text-[13.5px] font-light text-muted leading-[1.7] flex-1 mb-6">{s.desc}</p>
              <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-forest-500 transition-all group-hover:gap-3">
                Learn more
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── WHY ────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    title: 'WHV specialists — not generalists',
    body: 'We only work with Working Holiday Makers. Multiple employers, ABN income, NDA residency, DASP — we know every edge case without needing to look it up.',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5l1.3 2.6 2.9.4-2.1 2 .5 2.9L8 7.9l-2.6 1.5.5-2.9-2.1-2 2.9-.4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
  },
  {
    title: 'Registered and fully accountable',
    body: 'Supervised by a registered tax agent (The Accounting Academy Pty Ltd, TPB #26233096). Your return is lodged under a real licence — not a workaround.',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 8l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    title: 'Fast, human and always available',
    body: 'Real people on WhatsApp — no ticket queues, no chatbots. Most questions answered within minutes, seven days a week, from anywhere in the world.',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  },
]

function Why() {
  return (
    <section className="py-32 lg:py-44 clip-diagonal-sm" style={{ background: '#EEF7F2' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="grid grid-cols-1 gap-0">

          {/* Left */}
          <div className="reveal-left">
            <span className="section-label">Why Working Holiday Tax</span>
            <h2 className="section-h2">Built for backpackers.<br /><em>Backed by experts.</em></h2>
            <p className="body-lg max-w-[580px] mb-14">
              Every agent knows the ATO rules. Very few know what it means to be 23, in Mildura, with three employers and a flight home in six weeks.
            </p>

            <div className="space-y-0">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex gap-5 py-7" style={{ borderTop: '1px solid #D8EDE6' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-forest-500" style={{ background: 'white', border: '1px solid #D8EDE6' }}>
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-[14.5px] font-semibold text-ink mb-1.5" style={{ letterSpacing: '-0.01em' }}>{f.title}</p>
                    <p className="text-[13.5px] font-light text-muted leading-[1.7]">{f.body}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #D8EDE6' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── PROCESS ────────────────────────────────────────────────────────────────
const STEPS = [
  { n: '1', title: 'Message us on WhatsApp',          body: "Start with a free eligibility check. Tell us your visa type, income, and what you need — we'll tell you exactly what you're entitled to." },
  { n: '2', title: 'Send us your documents',           body: 'We send a clear checklist. Upload your payment summaries and any receipts — no scanning, no office visit required.' },
  { n: '3', title: 'We prepare and lodge your return', body: 'Our team prepares, reviews and lodges your return with the ATO, maximising your deductions and ensuring full compliance.' },
  { n: '4', title: 'Your refund arrives',              body: 'The ATO deposits your refund directly to your account. Most clients receive it within 7–14 days of lodgement.' },
]

function Process() {
  return (
    <section className="py-32 lg:py-44 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16 lg:gap-28">

          <div className="lg:sticky lg:top-24 lg:self-start reveal-left">
            <span className="section-label">How it works</span>
            <h2 className="section-h2">Simple from start<br />to <em>refund.</em></h2>
            <p className="body-lg mb-10">Four steps. You send the documents, we handle everything else.</p>
            {/* No box — just a clean inline note */}
            <p className="text-[13.5px] text-forest-400 leading-[1.7]">
              <span className="font-semibold text-forest-500">Free to start.</span> Your eligibility check costs nothing. We only charge once your return is ready to lodge.
            </p>
          </div>

          <div className="flex flex-col reveal-right">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-7 py-9" style={{ borderTop: i === 0 ? '1px solid #E2EFE9' : '1px solid #E2EFE9', borderBottom: i === STEPS.length - 1 ? '1px solid #E2EFE9' : 'none' }}>
                <div className="flex-shrink-0 mt-0.5">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-forest-500" style={{ background: '#F0F9F5' }}>
                    {s.n}
                  </span>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-ink mb-2" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                  <p className="text-[14px] font-light text-muted leading-[1.7]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


// ── TESTIMONIALS ───────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Emma T.',          from: 'United Kingdom · WHV 417', quote: 'Super easy. Got my TFN in two days and they handled my entire return. No stress — just a refund in my account.',          amount: '$2,450', featured: false },
  { name: "Liam O'Brien",     from: 'Ireland · WHV 417',        quote: 'I was stressed about my super — four months, three employers. They walked me through everything and I got it all back.',    amount: '$3,200', featured: true  },
  { name: 'Max Fischer',      from: 'Germany · WHV 417',        quote: 'Got my super back after leaving — $4,100. They handled everything and kept me updated the whole time.',                     amount: '$4,100', featured: false },
  { name: 'Noah van der Berg', from: 'Netherlands · WHV 462',   quote: 'Fast replies, clear explanations, and I saved more than expected. Will recommend to every backpacker I meet.',              amount: '$3,450', featured: false },
]

function Testimonials() {
  return (
    <section className="py-32 lg:py-44 overflow-hidden" style={{ background: '#F7FBF9' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="flex justify-between items-end flex-wrap gap-5 mb-16 reveal">
          <div>
            <span className="section-label">Client stories</span>
            <h2 className="section-h2 mb-0">What our clients say.</h2>
          </div>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark">
            Get your refund →
          </a>
        </div>

        <div className="-mx-6 md:-mx-12 lg:mx-0 overflow-x-auto scrollbar-none pb-2">
          <div className="flex lg:grid lg:grid-cols-3 gap-5 px-6 md:px-12 lg:px-0 w-max lg:w-full reveal delay-1">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`w-[300px] lg:w-auto flex-shrink-0 rounded-2xl p-7 flex flex-col transition-all hover:-translate-y-0.5 ${t.featured ? 'bg-forest-500' : 'bg-white'}`}
                style={t.featured ? {} : { boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 16px rgba(11,82,64,.05)' }}>
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                {/* Quote — no quotation marks, cleaner */}
                <p className={`text-[15px] font-light leading-[1.75] flex-1 mb-5 ${t.featured ? 'text-white/80' : 'text-body'}`}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Amount — prominent */}
                <p className={`font-serif font-black mb-5 ${t.featured ? 'text-white' : 'text-forest-500'}`} style={{ fontSize: '26px', letterSpacing: '-0.03em', borderBottom: '2px solid #E9A020', paddingBottom: '4px', display: 'inline-block' }}>
                  {t.amount}
                </p>
                <div className={`flex items-center gap-3 pt-5 ${t.featured ? 'border-white/10' : 'border-border'}`} style={{ borderTop: `1px solid ${t.featured ? 'rgba(255,255,255,0.1)' : '#E2EFE9'}` }}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${t.featured ? 'bg-white/10 text-white' : 'bg-forest-100 text-forest-500'}`}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className={`text-[12.5px] font-semibold ${t.featured ? 'text-white' : 'text-ink'}`}>{t.name}</p>
                    <p className={`text-[11.5px] ${t.featured ? 'text-white/38' : 'text-subtle'}`}>{t.from}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Proof card — clean, no border clutter */}
            <div className="w-[300px] lg:w-auto flex-shrink-0 rounded-2xl p-7 flex flex-col justify-between" style={{ background: '#F0F9F5' }}>
              <div>
                <p className="font-serif font-black text-forest-500 mb-1" style={{ fontSize: '52px', lineHeight: 1, letterSpacing: '-0.04em' }}>5.0</p>
                <p className="text-[13px] text-muted mb-5">Average rating</p>
                <div className="flex gap-0.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="text-[12px] text-subtle">1,200+ WHV holders</p>
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8" style={{ height: '48px', display: 'inline-flex' }}>
                Start for free →
              </a>
            </div>
          </div>
        </div>
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
      <Why />
      <Process />
      <Testimonials />
      <CtaBand
        eyebrow="Ready to start?"
        heading="Your refund is"
        headingEm="waiting for you."
        sub="Most clients recover more than they expect. Start with a free eligibility check — no documents needed yet, no commitment required."
        primaryLabel="Check my tax — it's free"
        secondaryLabel="Estimate first"
        secondaryHref="/calculator"
        clipTop
      />
    </>
  )
}
