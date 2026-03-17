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

// ── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
 return (
 <section className="relative overflow-hidden pt-[68px] flex flex-col" style={{
 background: '#ffffff',
 }}>

 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 w-full flex items-center py-10 lg:py-14 relative z-10">

 {/* ── Left copy ── */}
 <div className="max-w-[600px]">

 {/* Eyebrow */}
 <div className="inline-flex items-center gap-3 mb-6">
 <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
 <span className="font-medium uppercase text-forest-500" style={{ fontSize: '11.5px', letterSpacing: '0.18em' }}>Working Holiday Visa Specialist</span>
 </div>

 {/* Headline - nowrap on line 1 prevents wrapping */}
 <h1 className="font-serif font-black text-ink mb-5" style={{
 fontSize: 'clamp(20px, 2.8vw, 36px)',
 lineHeight: 1.25,
 letterSpacing: '-0.025em',
 }}>
 <span className="block whitespace-nowrap">Have questions about tax in Australia?</span>
 <span className="block" style={{ color: '#0B5240' }}>We&apos;ve got you covered.</span>
 </h1>

 {/* Sub */}
 <p className="font-light leading-[1.7] mb-9" style={{ fontSize: '15px', color: 'rgba(10,15,13,0.58)', maxWidth: '420px' }}>
 From your first TFN application to your final super withdrawal - we guide Working Holiday Visa travellers through every step of tax in Australia.
 </p>

 {/* CTAs */}
 <div className="flex flex-col sm:flex-row gap-3 items-start mb-5">
 <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}>
 Ask us anything - free
 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
 </a>
 <Link href="#how-it-works" className="btn-ghost-dark" style={{ height: '48px', padding: '0 20px', fontSize: '14px' }}>
 How it works
 </Link>
 </div>

 {/* Trust line */}
 <p className="text-[11.5px] leading-[1.6]" style={{ color: 'rgba(10,15,13,0.45)' }}>
 Under the supervision of a registered tax agent approved by the ATO
 </p>
 </div>


 </div>

 {/* Trust cards - no divider line */}
 <div className="relative z-10">
 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 pb-8">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { n: '4.9★', l: 'Google rating' },
 { n: '1,200+', l: 'WHV clients helped' },
 { n: '<1 hr', l: 'WhatsApp response' },
 { n: '100%', l: 'Online service' },
 ].map((c, i) => (
 <div key={i} className="rounded-2xl text-center py-4 px-3 transition-shadow" style={{
 background: '#ffffff',
 border: '1.5px solid #C8EAE0',
 }}>
 <p className="font-serif font-black text-forest-500 mb-1.5" style={{ fontSize: 'clamp(22px,3vw,28px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{c.n}</p>
 <p className="font-light" style={{ fontSize: '11.5px', color: 'rgba(10,15,13,0.62)', lineHeight: 1.4 }}>{c.l}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>
 )
}

// ── TRUST ──────────────────────────────────────────────────────────────────
function Trust() {
 const items = [
 {
 title: 'We know WHV tax inside out',
 body: 'Working Holiday tax is all we do. Multiple employers, ABN income, super withdrawals, NDA residency - we handle it all without needing to look anything up.',
 },
 {
 title: 'Registered. Licensed. Accountable.',
 body: 'Supervised by a registered tax agent (The Accounting Academy Pty Ltd, TPB #26233096). Your return is lodged under a real licence - not a workaround.',
 },
 {
 title: 'Real people, fast answers',
 body: 'Message us on WhatsApp and get a real human reply within minutes. Seven days a week, wherever you are in the world.',
 },
 {
 title: 'We make the confusing stuff simple',
 body: 'Australian tax can be overwhelming if you\'ve never dealt with it before. We explain everything clearly, guide you step by step, and handle all the paperwork.',
 },
 ]

 return (
 <section className="py-20 lg:py-28 bg-white">
 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
 <div className="max-w-3xl mx-auto text-center mb-12 reveal">
 <span className="section-label center">Why travellers trust us</span>
 <h2 className="section-h2">Tax specialists who<br /><em>understand your situation.</em></h2>
 <p className="body-lg">We work exclusively with Working Holiday Visa holders. We know the rules, we know the edge cases, and we know what travellers like you actually need.</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 reveal delay-2">
 {items.map((item, i) => (
 <div key={i} className="pt-6 border-t border-border">
 <div className="w-8 h-px bg-amber mb-6" aria-hidden="true" />
 <h3 className="text-[15px] font-semibold text-ink mb-3" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
 <p className="text-[13.5px] font-light text-muted leading-[1.7]">{item.body}</p>
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
 desc: 'We walk you through the official ATO process so you get your TFN right the first time.',
 },
 {
 n: '02', href: '/tax-return', icon: <IconLock />,
 title: 'Tax Return',
 desc: 'We prepare and lodge your return, claim every deduction you\'re entitled to, and get your money back fast.',
 },
 {
 n: '03', href: '/superannuation', icon: <IconClock />,
 title: 'Super Withdrawal',
 desc: 'We manage your entire DASP application so you can claim back the super your employer paid.',
 },
 {
 n: '04', href: '/abn', icon: <IconPlus />,
 title: 'ABN Registration',
 desc: 'We register your ABN and make sure you\'re set up to invoice correctly from day one.',
 },
]

function Services() {
 return (
 <section className="pt-8 pb-12 lg:pt-10 lg:pb-16" style={{ background: '#EEF7F2' }}>
 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
 <div className="max-w-2xl mx-auto text-center mb-6 reveal">
 <span className="section-label center">What we help with</span>
 <h2 className="font-serif font-black text-ink mt-1.5 mb-2" style={{ fontSize: 'clamp(19px, 2.6vw, 30px)', lineHeight: 1.12, letterSpacing: '-0.025em' }}>
 Everything WHV travellers<br /><em className="not-italic font-normal text-forest-400">need for tax in Australia.</em>
 </h2>
 <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '13.5px' }}>We cover the full tax journey - from the day you arrive to the day you leave.</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 reveal delay-2">
 {SERVICES.map((s) => (
 <Link key={s.href} href={s.href}
 className="group bg-white rounded-2xl p-4 flex flex-col transition-all hover:shadow-md" style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
 <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-subtle mb-4">{s.n}</span>
 <span className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white mb-3">
 {s.icon}
 </span>
 <h3 className="text-[14px] font-semibold text-ink mb-2" style={{ letterSpacing: '-0.01em' }}>{s.title}</h3>
 <p className="text-[13px] font-light text-muted leading-[1.7] flex-1 mb-4">{s.desc}</p>
 <span className="flex items-center gap-1.5 text-[12px] font-medium text-forest-600 transition-all group-hover:gap-3 group-hover:underline">
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

// ── PROCESS ────────────────────────────────────────────────────────────────
const STEPS = [
 { n: '1', title: 'Message us on WhatsApp', body: 'Tell us what you need - a TFN, a tax return, super, or just a question. We\'ll explain your situation clearly and tell you exactly what to do next.' },
 { n: '2', title: 'Send us your documents', body: 'We give you a simple checklist. Upload what you have - no scanning, no office visit, no paperwork.' },
 { n: '3', title: 'We handle everything', body: 'We prepare, review and submit on your behalf. You don\'t need to understand the ATO system - that\'s our job.' },
 { n: '4', title: 'Done. Money back.', body: 'Tax returns are typically processed within 7 - 14 days. Super withdrawals take a little longer, but we keep you updated throughout.' },
]

function Process() {
 return (
 <section id="how-it-works" className="py-16 lg:py-24 bg-white">
 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

 {/* Heading - top, centered */}
 <div className="max-w-2xl mx-auto text-center mb-14 reveal">
 <span className="section-label center">How it works</span>
 <h2 className="section-h2">Simple. Guided.<br /><em>No jargon.</em></h2>
 <p className="body-lg">You don&apos;t need to understand Australian tax. We do - and we&apos;ll guide you through every step.</p>
 </div>

 {/* 4 steps - horizontal row on desktop */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 reveal delay-1">
 {STEPS.map((s, i) => (
 <div key={i} className="flex flex-col px-6 py-8 lg:py-0"
 style={{ borderLeft: i > 0 ? '1px solid #E2EFE9' : 'none', borderTop: '1px solid #E2EFE9' }}>
 <span className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-forest-500 mb-5 flex-shrink-0" style={{ background: '#EAF6F1' }}>
 {s.n}
 </span>
 <p className="text-[15px] font-semibold text-ink mb-2" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
 <p className="text-[13.5px] font-light text-muted leading-[1.7]">{s.body}</p>
 </div>
 ))}
 </div>

 {/* Free to start note */}
 <p className="text-center text-[13px] mt-10 reveal delay-2" style={{ color: '#2FA880' }}>
 <span className="font-semibold" style={{ color: '#0B5240' }}>Free to start.</span> We only charge once your work is ready to submit - and we tell you the fee upfront.
 </p>

 </div>
 </section>
 )
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────
const TESTIMONIALS = [
 {
 name: "Liam O'Brien",
 from: 'Ireland · WHV 417',
 quote: 'I was stressed about my super - four months, three different employers. They walked me through everything and I got it all back. Couldn\'t have done it without them.',
 amount: '$3,200',
 featured: true,
 },
 {
 name: 'Emma T.',
 from: 'United Kingdom · WHV 417',
 quote: 'Got my TFN sorted in two days and they handled my entire tax return when I left. No stress at all - just money back in my account.',
 amount: '$2,450',
 featured: false,
 },
 {
 name: 'Max Fischer',
 from: 'Germany · WHV 417',
 quote: 'Fast, clear, and genuinely helpful. They explained everything I didn\'t understand about Australian tax and got my super back after I left.',
 amount: '$4,100',
 featured: false,
 },
]

function Testimonials() {
 return (
 <section className="py-20 lg:py-28" style={{ background: '#F7FBF9' }}>
 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

 {/* Heading - button sits below, not floated right */}
 <div className="text-center mb-12 reveal">
 <span className="section-label center">Client stories</span>
 <h2 className="section-h2 mb-5">Travellers we&apos;ve helped.</h2>
 <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark inline-flex">
 Talk to us →
 </a>
 </div>

 {/* Cards - all uniform: white bg, same shadow, same padding */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal delay-1">
 {TESTIMONIALS.map((t, i) => (
 <div key={i}
 className="bg-white rounded-2xl p-8 flex flex-col"
 style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)' }}>
 <div className="flex gap-0.5 mb-5">
 {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
 </div>
 <p className="text-[15px] font-light text-body leading-[1.8] flex-1 mb-5">
 &ldquo;{t.quote}&rdquo;
 </p>
 <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #E2EFE9' }}>
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-[11px] font-bold flex-shrink-0 text-forest-500">
 {t.name[0]}
 </div>
 <div>
 <p className="text-[12.5px] font-semibold text-ink">{t.name}</p>
 <p className="text-[11.5px] text-subtle">{t.from}</p>
 </div>
 </div>
 <span className="font-serif font-black text-[19px] text-forest-500" style={{ letterSpacing: '-0.03em' }}>
 {t.amount}
 </span>
 </div>
 </div>
 ))}
 </div>

 {/* Stats strip - tighter gap to cards */}
 <div className="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-center gap-8 reveal delay-3" style={{ borderTop: '1px solid #E2EFE9' }}>
 <div className="text-center">
 <p className="font-serif font-black text-forest-500 text-[28px]" style={{ letterSpacing: '-0.03em' }}>5.0</p>
 <div className="flex gap-0.5 justify-center mt-1">
 {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
 </div>
 <p className="text-[12px] text-subtle mt-1">Average rating</p>
 </div>
 <div className="hidden sm:block w-px h-10 bg-border" aria-hidden="true" />
 <div className="text-center">
 <p className="font-serif font-black text-forest-500 text-[28px]" style={{ letterSpacing: '-0.03em' }}>1,200+</p>
 <p className="text-[12px] text-subtle mt-1">WHV holders helped</p>
 </div>
 <div className="hidden sm:block w-px h-10 bg-border" aria-hidden="true" />
 <div className="text-center">
 <p className="font-serif font-black text-forest-500 text-[28px]" style={{ letterSpacing: '-0.03em' }}>$2.4M+</p>
 <p className="text-[12px] text-subtle mt-1">Tax sorted for clients</p>
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
 <Trust />
 <Process />
 <Testimonials />
 <CtaBand
 eyebrow="Need help?"
 heading="Need help with tax"
 headingEm="in Australia?"
 sub="Ask us anything - free. Whether it's a TFN, a tax return, your super, or just a question you don't know who else to ask."
 primaryLabel="Talk to us on WhatsApp"
 clipTop
 />
 </>
 )
}
