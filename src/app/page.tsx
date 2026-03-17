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

 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 w-full flex items-center py-7 lg:py-10 relative z-10">

 {/* ── Left copy ── */}
 <div className="max-w-[580px]">

 {/* Eyebrow */}
 <div className="inline-flex items-center gap-2.5 mb-4">
 <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
 <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Working Holiday Visa Specialist</span>
 </div>

 {/* Headline */}
 <h1 className="font-serif font-black text-ink mb-3" style={{
 fontSize: 'clamp(18px, 2.3vw, 30px)',
 lineHeight: 1.15,
 letterSpacing: '-0.025em',
 }}>
 <span className="block whitespace-nowrap">Have questions about tax in Australia?</span>
 <span className="block" style={{ color: '#0B5240' }}>We&apos;ve got you covered.</span>
 </h1>

 {/* Sub */}
 <p className="font-light leading-[1.65] mb-6" style={{ fontSize: '13.5px', color: 'rgba(10,15,13,0.55)', maxWidth: '400px' }}>
 We help Working Holiday Visa travellers handle tax correctly - from TFN to final super withdrawal.
 </p>

 {/* CTAs */}
 <div className="flex flex-col sm:flex-row gap-2.5 items-start mb-4">
 <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '44px', padding: '0 22px', fontSize: '13.5px' }}>
 Ask us anything - free
 <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
 </a>
 <Link href="#how-it-works" className="btn-ghost-dark" style={{ height: '44px', padding: '0 18px', fontSize: '13.5px' }}>
 How it works
 </Link>
 </div>

 {/* Trust line */}
 <p className="text-[10.5px] leading-[1.5]" style={{ color: 'rgba(10,15,13,0.38)' }}>
 Under the supervision of a registered tax agent approved by the ATO
 </p>
 </div>

 </div>

 {/* Trust cards — pulled up, tighter */}
 <div className="relative z-10">
 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 pb-6">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 {[
 { n: '4.9★', l: 'Google rating' },
 { n: '1,200+', l: 'WHV clients helped' },
 { n: '<1 hr', l: 'WhatsApp response' },
 { n: '100%', l: 'Online service' },
 ].map((c, i) => (
 <div key={i} className="rounded-xl text-center py-3 px-3 transition-shadow" style={{
 background: '#ffffff',
 border: '1.5px solid #C8EAE0',
 }}>
 <p className="font-serif font-black text-forest-500 mb-1" style={{ fontSize: 'clamp(18px,2.4vw,22px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{c.n}</p>
 <p className="font-light" style={{ fontSize: '11px', color: 'rgba(10,15,13,0.58)', lineHeight: 1.35 }}>{c.l}</p>
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
 body: 'We handle multiple employers, ABN income, super withdrawals, and residency cases every day.',
 },
 {
 title: 'Registered. Licensed. Accountable.',
 body: 'Your return is prepared under a registered tax agent - no shortcuts.',
 },
 {
 title: 'Real people, fast answers',
 body: 'Message us on WhatsApp and get a real response - usually within minutes.',
 },
 {
 title: 'We make it simple',
 body: 'We explain everything clearly and handle the process from start to finish.',
 },
 ]

 return (
 <section className="py-10 lg:py-13 bg-white">
 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
 <div className="max-w-2xl mx-auto text-center mb-5 reveal">
          <span className="section-label center">Why travellers trust us</span>
          <h2 className="font-serif font-black text-ink mt-1 mb-1.5" style={{ fontSize: 'clamp(16px,2.1vw,25px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>Tax specialists who<br /><em className="not-italic font-normal text-forest-400" style={{ fontSize: '92%' }}>understand your situation.</em></h2>
          <p className="font-light text-muted leading-[1.65]" style={{ fontSize: '12.5px' }}>We work exclusively with Working Holiday Visa holders - so we already understand your situation.</p>
        </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 reveal delay-2">
 {items.map((item, i) => (
 <div key={i} className="pt-4 border-t border-border">
              <h3 className="text-[13px] font-semibold text-ink mb-1.5" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
 <p className="text-[12px] font-light text-muted leading-[1.65]">{item.body}</p>
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
 desc: 'Apply for your TFN correctly the first time. We guide you through the official ATO process.',
 },
 {
 n: '02', href: '/tax-return', icon: <IconLock />,
 title: 'Tax Return',
 desc: 'We prepare and lodge your tax return so you receive everything you\'re entitled to - without the stress.',
 },
 {
 n: '03', href: '/superannuation', icon: <IconClock />,
 title: 'Super Withdrawal',
 desc: 'We manage your DASP application so you can claim your super after leaving Australia.',
 },
 {
 n: '04', href: '/abn', icon: <IconPlus />,
 title: 'ABN Registration',
 desc: 'We register your ABN and make sure you\'re set up correctly from day one.',
 },
]

function Services() {
 return (
 <section className="pt-7 pb-10 lg:pt-9 lg:pb-12" style={{ background: '#EEF7F2' }}>
 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
 <div className="max-w-2xl mx-auto text-center mb-4 reveal">
 <span className="section-label center">What we help with</span>
 <h2 className="font-serif font-black text-ink mt-1 mb-1.5" style={{ fontSize: 'clamp(16px, 2.1vw, 25px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
 Everything WHV travellers<br /><em className="not-italic font-normal text-forest-400" style={{ fontSize: '92%' }}>need for tax in Australia.</em>
 </h2>
 <p className="font-light text-muted leading-[1.65]" style={{ fontSize: '12.5px' }}>We cover the full tax journey - from the day you arrive to the day you leave.</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 reveal delay-2">
 {SERVICES.map((s) => (
 <Link key={s.href} href={s.href}
 className="group bg-white rounded-2xl p-3 flex flex-col transition-all hover:shadow-md" style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
 <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-subtle mb-3">{s.n}</span>
 <span className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white">
 {s.icon}
 </span>
 <h3 className="text-[13px] font-semibold text-ink mb-1" style={{ letterSpacing: '-0.01em' }}>{s.title}</h3>
 <p className="text-[12px] font-light text-muted leading-[1.65] flex-1 mb-3">{s.desc}</p>
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
 { n: '1', title: 'Message us on WhatsApp', body: "Tell us what you need - TFN, tax return, super, or just a question. We'll explain your situation clearly." },
 { n: '2', title: 'Send your documents',     body: 'We give you a simple checklist. Upload what you have - no scanning, no office visits.' },
 { n: '3', title: 'We handle everything',    body: "We prepare, review, and submit everything for you. You don't need to deal with the ATO." },
 { n: '4', title: 'Done. Money back.',       body: 'Most tax returns are processed within 7-14 days. We keep you updated along the way.' },
]

function Process() {
 return (
 <section id="how-it-works" className="py-10 lg:py-14 bg-white">
 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

 {/* Heading */}
 <div className="max-w-2xl mx-auto text-center mb-7 reveal">
          <span className="section-label center">How it works</span>
          <h2 className="font-serif font-black text-ink mt-1 mb-1.5" style={{ fontSize: 'clamp(16px,2.1vw,25px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>Simple. Guided.<br /><em className="not-italic font-normal text-forest-400" style={{ fontSize: '92%' }}>No jargon.</em></h2>
          <p className="font-light text-muted leading-[1.65]" style={{ fontSize: '12.5px' }}>You don&apos;t need to understand Australian tax. We do - and we&apos;ll guide you through every step.</p>
        </div>

 {/* Timeline — desktop: horizontal connector line + circles */}
 <div className="reveal delay-1">

   {/* Desktop layout */}
   <div className="hidden lg:block">
     {/* Connector line behind the circles */}
     <div className="relative flex items-start">
       {/* The line sits at the vertical centre of the circles (circle h=32px, top-0) */}
       <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{
         background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)',
         zIndex: 0,
       }} aria-hidden="true" />

       {STEPS.map((s, i) => (
         <div key={i} className="flex-1 flex flex-col items-center px-4" style={{ zIndex: 1 }}>
           {/* Circle on the line */}
           <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white mb-4 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 3px #EEF7F2, 0 0 0 4px #C8EAE0' }}>
             {s.n}
           </div>
           <p className="text-[14px] font-semibold text-ink mb-1.5 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
           <p className="text-[13px] font-light text-muted leading-[1.7] text-center">{s.body}</p>
         </div>
       ))}
     </div>
   </div>

   {/* Mobile layout — vertical stack */}
   <div className="lg:hidden flex flex-col">
     {STEPS.map((s, i) => (
       <div key={i} className="flex gap-4 pb-7">
         <div className="flex flex-col items-center flex-shrink-0">
           <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ background: '#0B5240' }}>
             {s.n}
           </div>
           {i < STEPS.length - 1 && (
             <div className="flex-1 w-px mt-2 min-h-[32px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />
           )}
         </div>
         <div className="pt-1 pb-2">
           <p className="text-[14px] font-semibold text-ink mb-1.5" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
           <p className="text-[13px] font-light text-muted leading-[1.7]">{s.body}</p>
         </div>
       </div>
     ))}
   </div>
 </div>

 {/* Free to start note */}
 <p className="text-center text-[12px] mt-5 reveal delay-2" style={{ color: '#2FA880' }}>
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
 <section className="py-10 lg:py-14" style={{ background: '#F4F9F6' }}>
 <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

 {/* Heading */}
 <div className="text-center mb-5 reveal">
   <span className="section-label center">Client stories</span>
   <h2 className="font-serif font-black text-ink mt-1 mb-3" style={{ fontSize: 'clamp(16px,2.1vw,25px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>Travellers we&apos;ve helped.</h2>
   <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark inline-flex" style={{ height: '36px', padding: '0 16px', fontSize: '12.5px' }}>
     Check your eligibility →
   </a>
 </div>

 {/* Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 reveal delay-1">
   {TESTIMONIALS.map((t, i) => (
     <div key={i}
       className="bg-white rounded-2xl p-5 flex flex-col"
       style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)' }}>
       <div className="flex gap-0.5 mb-3">
         {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
       </div>
       <p className="text-[13px] font-light text-body leading-[1.7] flex-1 mb-3">
         &ldquo;{t.quote}&rdquo;
       </p>
       <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #E2EFE9' }}>
         <div className="flex items-center gap-2.5">
           <div className="w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center text-[10px] font-bold flex-shrink-0 text-forest-500">
             {t.name[0]}
           </div>
           <div>
             <p className="text-[11.5px] font-semibold text-ink">{t.name}</p>
             <p className="text-[10.5px] text-subtle">{t.from}</p>
           </div>
         </div>
         <span className="font-serif font-black text-[15px] text-forest-500" style={{ letterSpacing: '-0.03em' }}>
           {t.amount}
         </span>
       </div>
     </div>
   ))}
 </div>

 {/* Stats strip */}
 <div className="mt-4 pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 reveal delay-3" style={{ borderTop: '1px solid #E2EFE9' }}>
   <div className="text-center">
     <p className="font-serif font-black text-forest-500" style={{ fontSize: '20px', letterSpacing: '-0.03em', lineHeight: 1 }}>4.9★</p>
     <p className="text-[11.5px] text-subtle mt-1">Google rating</p>
   </div>
   <div className="hidden sm:block w-px h-8 bg-border" aria-hidden="true" />
   <div className="text-center">
     <p className="font-serif font-black text-forest-500" style={{ fontSize: '20px', letterSpacing: '-0.03em', lineHeight: 1 }}>1,200+</p>
     <p className="text-[11.5px] text-subtle mt-1">WHV clients helped</p>
   </div>
   <div className="hidden sm:block w-px h-8 bg-border" aria-hidden="true" />
   <div className="text-center">
     <p className="font-serif font-black text-forest-500" style={{ fontSize: '20px', letterSpacing: '-0.03em', lineHeight: 1 }}>&lt;1 hr</p>
     <p className="text-[11.5px] text-subtle mt-1">WhatsApp response</p>
   </div>
   <div className="hidden sm:block w-px h-8 bg-border" aria-hidden="true" />
   <div className="text-center">
     <p className="font-serif font-black text-forest-500" style={{ fontSize: '20px', letterSpacing: '-0.03em', lineHeight: 1 }}>100%</p>
     <p className="text-[11.5px] text-subtle mt-1">Online service</p>
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
 sub="Get clear answers and start your tax process today - we handle everything for you."
 primaryLabel="Get started on WhatsApp"
 clipTop
 />
 </>
 )
}
