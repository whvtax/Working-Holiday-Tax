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
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="2" width="18" height="18" rx="3" stroke="#0B5240" strokeWidth="1.5"/>
    <line x1="6" y1="8" x2="16" y2="8" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="6" y1="11" x2="13" y2="11" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="6" y1="14" x2="10" y2="14" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)
const IconLock = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="6" width="18" height="13" rx="2.5" stroke="#0B5240" strokeWidth="1.5"/>
    <path d="M7 6V5a4 4 0 018 0v1" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 12l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="8" stroke="#0B5240" strokeWidth="1.5"/>
    <path d="M11 7v4.5l3 1.8" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)
const IconPlus = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="2" width="18" height="18" rx="3" stroke="#0B5240" strokeWidth="1.5"/>
    <path d="M11 7v8M7.5 11h7" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 13 13">
    <path d="M6.5 1l1.45 2.93 3.23.47-2.34 2.27.56 3.22L6.5 8.4l-2.9 1.5.56-3.22L1.82 4.4l3.23-.47z" fill="#E9A020"/>
  </svg>
)

// ── SECTION LABEL ──────────────────────────────────────────────────────────
const Label = ({ children, light = false }: { children: string; light?: boolean }) => (
  <span className={`section-label${light ? ' light' : ''}`}>{children}</span>
)

// ── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-ink-2 overflow-hidden pt-[68px] min-h-svh flex flex-col">
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none grid-bg" />
      {/* Glow */}
      <div className="absolute pointer-events-none" style={{ top:'-25%', right:'-15%', width:'75%', paddingBottom:'75%', borderRadius:'50%', background:'radial-gradient(circle,rgba(11,82,64,.6) 0%,transparent 68%)' }} />

      <div className="flex-1 max-w-7xl mx-auto px-6 md:px-12 lg:px-14 w-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-center py-14 lg:py-24 relative z-10">
        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-forest-300/10 border border-forest-300/22 rounded-full px-3 py-1.5 mb-8">
            <span className="w-[7px] h-[7px] rounded-full bg-forest-300 animate-pulse-dot" />
            <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-forest-300">Registered tax agent · Australia</span>
          </div>
          <h1 className="font-serif font-black text-white leading-[.96] tracking-[-2.8px] mb-6" style={{ fontSize:'clamp(48px,9.5vw,90px)' }}>
            Your
            <span className="relative inline-block"> tax,
              <span className="absolute bottom-1 left-0 right-0 h-[3.5px] bg-amber rounded-sm" />
            </span>
            <span className="block italic font-normal text-white/50 tracking-[-1.8px]">handled</span>
            <span className="block">completely.</span>
          </h1>
          <p className="text-[16px] font-light text-white/48 leading-[1.75] max-w-[440px] mb-11">
            TFN, tax return, super and ABN for Working Holiday Visa holders — done online, done right, and done without the stress.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start mb-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 h-[58px] px-8 bg-amber text-ink-2 rounded-full text-[15px] font-semibold shadow-[0_4px_20px_rgba(233,160,32,.3)] transition-all hover:bg-amber-300 hover:text-white hover:-translate-y-0.5">
              Check my tax — free →
            </a>
            <Link href="/calculator"
              className="inline-flex items-center gap-2.5 h-[58px] px-8 bg-transparent text-white/65 border border-white/15 rounded-full text-[15px] font-normal transition-all hover:bg-white/7 hover:border-white/32 hover:text-white hover:-translate-y-0.5">
              Estimate my refund
            </Link>
          </div>
          <p className="text-[11.5px] text-white/25 tracking-[0.04em]">No commitment · Free eligibility check · 100% online</p>
        </div>

        {/* Refund card */}
        <div className="flex justify-center lg:justify-end items-end lg:items-center pt-10 lg:pt-0 lg:pr-8">
          <div className="relative w-full max-w-[368px]">
            <div className="bg-white/[0.055] border border-white/10 rounded-[22px] p-7 backdrop-blur-xl animate-card-float">
              <p className="text-[10px] font-medium tracking-[0.13em] uppercase text-white/35 mb-2">Estimated refund</p>
              <p className="font-serif font-black text-white text-[52px] tracking-[-2.2px] leading-none mb-1.5">$2,840</p>
              <p className="text-[12px] text-white/38 mb-5">Emma T. · United Kingdom · WHV 417</p>
              <div className="mb-2">
                <div className="flex justify-between text-[11px] text-white/32 mb-1.5"><span>Tax withheld</span><span>$7,200</span></div>
                <div className="h-[3px] bg-white/8 rounded-sm overflow-hidden"><div className="h-full w-full bg-forest-300/55 rounded-sm" /></div>
              </div>
              <div className="mb-0">
                <div className="flex justify-between text-[11px] text-white/32 mb-1.5"><span>Tax owing</span><span>$4,360</span></div>
                <div className="h-[3px] bg-white/8 rounded-sm overflow-hidden"><div className="h-full w-[61%] bg-amber rounded-sm" /></div>
              </div>
              <div className="h-px bg-white/7 my-4" />
              <div className="flex justify-between items-center mb-3">
                <span className="text-[12px] text-white/35">Deductions claimed</span>
                <span className="text-[12px] font-semibold text-white/68">$1,840</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-white/35">Status</span>
                <span className="inline-flex items-center gap-1.5 bg-forest-300/14 border border-forest-300/28 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-forest-300">
                  <span className="w-[5px] h-[5px] rounded-full bg-forest-300" />Approved
                </span>
              </div>
            </div>
            {/* Chips */}
            <div className="absolute -top-4 -right-2 lg:-right-5 bg-white/[0.065] border border-white/11 rounded-[14px] px-4 py-3 backdrop-blur-xl animate-chip-float">
              <p className="text-[9.5px] text-white/33 tracking-[0.06em] uppercase mb-0.5">Avg. processing</p>
              <p className="font-serif font-black text-white text-[20px] tracking-[-0.5px]">9 days</p>
              <p className="text-[10px] text-white/33 mt-0.5">from lodgement</p>
            </div>
            <div className="absolute -bottom-3 -left-2 lg:-left-5 bg-white/[0.065] border border-white/11 rounded-[14px] px-4 py-3 backdrop-blur-xl animate-chip-float-2">
              <p className="text-[9.5px] text-white/33 tracking-[0.06em] uppercase mb-0.5">Super returned</p>
              <p className="font-serif font-black text-white text-[20px] tracking-[-0.5px]">$4,100</p>
              <p className="text-[10px] text-white/33 mt-0.5">Max · Germany</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-white/[0.055]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14 py-7">
          <div className="grid grid-cols-3">
            {[{n:'$2.4M+',l:'Refunds processed'},{n:'1,200+',l:'WHV holders helped'},{n:'5.0 ★',l:'Client satisfaction'}].map((s,i) => (
              <div key={i} className="text-center relative">
                {i > 0 && <span className="absolute left-0 top-[10%] bottom-[10%] w-px bg-white/7" />}
                <span className="block font-serif font-black text-white tracking-[-0.8px] mb-1" style={{ fontSize:'clamp(22px,4vw,30px)' }}>{s.n}</span>
                <span className="block text-[11px] text-white/30 tracking-[0.05em]">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── MARQUEE ────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['Registered Tax Agent','ATO Approved','Xero Certified Partner','WHV 417 & 462','100% Online','Reply in Minutes','7 Days a Week','TPB #26233096','No Office Visit','Free Eligibility Check']
  const doubled = [...items, ...items]
  return (
    <div className="bg-forest-500 overflow-hidden border-b border-white/6" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3.5 px-9 py-4 text-[12px] font-medium tracking-[0.08em] uppercase text-white/45">
            <span className="w-1 h-1 rounded-full bg-amber flex-shrink-0" />
            {i % 2 === 1 ? <strong className="text-white/88 font-semibold">{item}</strong> : item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── SERVICES ───────────────────────────────────────────────────────────────
const SERVICES = [
  { n:'01', href:'/tfn',            icon:<IconDoc />,   title:'TFN Application',   desc:'Your Tax File Number, sorted before your first payslip. We guide you through the official ATO process — correctly, the first time.' },
  { n:'02', href:'/tax-return',     icon:<IconLock />,  title:'Tax Return',         desc:'We prepare, review and lodge your return — maximising every deduction, ensuring full compliance, and getting your refund back fast.' },
  { n:'03', href:'/superannuation', icon:<IconClock />, title:'Superannuation',     desc:"Claim your super back after leaving Australia. We manage the entire DASP process so every dollar of your contributions comes home with you." },
  { n:'04', href:'/abn',            icon:<IconPlus />,  title:'ABN Registration',   desc:"Working as a sole trader? We register your ABN and set you up to invoice clients correctly from day one — no paperwork, no confusion." },
]

function Services() {
  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="mb-18 reveal">
          <Label>Everything you need</Label>
          <h2 className="section-h2">One place for your<br /><em>entire</em> Australian tax.</h2>
          <p className="text-[16px] font-light text-muted leading-[1.75] max-w-[520px]">From the moment you land to the day you leave — and every tax obligation in between.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-[20px] overflow-hidden border border-border reveal delay-2">
          {SERVICES.map(s => (
            <Link key={s.href} href={s.href}
              className="group bg-white p-9 flex flex-col relative overflow-hidden transition-colors hover:bg-forest-50 border-b-[2.5px] border-b-transparent hover:border-b-amber">
              <span className="text-[11px] font-medium text-subtle tracking-[0.1em] mb-5">{s.n}</span>
              <span className="w-[46px] h-[46px] rounded-[12px] bg-forest-100 flex items-center justify-center mb-5 transition-colors group-hover:bg-forest-500 [&_svg_path]:transition-[stroke] [&_svg_rect]:transition-[stroke] [&_svg_circle]:transition-[stroke] [&_svg_line]:transition-[stroke] group-hover:[&_svg_path]:stroke-white group-hover:[&_svg_rect]:stroke-white group-hover:[&_svg_circle]:stroke-white group-hover:[&_svg_line]:stroke-white">
                {s.icon}
              </span>
              <h3 className="text-[16px] font-semibold text-ink tracking-[-0.2px] mb-2.5">{s.title}</h3>
              <p className="text-[13.5px] font-light text-muted leading-[1.7] flex-1 mb-7">{s.desc}</p>
              <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-forest-500 transition-all group-hover:gap-3">
                Learn more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
  { title:'WHV specialists — not generalists',   body:"We only work with Working Holiday Makers. Multiple employers, ABN income, NDA residency, DASP — we know every edge case without needing to look it up.", icon:<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.5 3.1 3.4.5-2.47 2.4.59 3.42L9 9.85 6.98 11l.58-3.42L5.1 5.6l3.4-.5z" stroke="#0B5240" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
  { title:'Registered and fully accountable',    body:'Supervised by a registered tax agent (The Accounting Academy Pty Ltd, TPB #26233096). Your return is lodged under a real licence — not a workaround.', icon:<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="3" stroke="#0B5240" strokeWidth="1.3"/><path d="M5.5 9l3 3 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title:'Fast, human and always available',    body:'Real people on WhatsApp — no ticket queues, no chatbots. Most questions answered within minutes, seven days a week, from anywhere in the world.', icon:<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#0B5240" strokeWidth="1.3"/><path d="M9 5.5v4.5l2.5 2.5" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/></svg> },
]

function Why() {
  return (
    <section className="py-28 lg:py-36 bg-forest-100" style={{ clipPath:'polygon(0 3%,100% 0,100% 100%,0 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div className="reveal-left">
            <Label>Why Working Holiday Tax</Label>
            <h2 className="section-h2">Built for backpackers.<br /><em>Backed by experts.</em></h2>
            <p className="text-[16px] font-light text-muted leading-[1.75] max-w-[520px]">Every agent knows the ATO rules. Very few know what it means to be 23, in Mildura, with three employers and a flight home in six weeks.</p>
            <div className="mt-12 flex flex-col">
              {FEATURES.map((f, i) => (
                <div key={i} className="group flex gap-5 py-6 border-b border-border last:border-none transition-all hover:pl-1.5">
                  <div className="w-[42px] h-[42px] rounded-[11px] bg-white border border-border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all group-hover:bg-forest-500 group-hover:border-forest-500 [&_svg_path]:transition-[stroke] [&_svg_rect]:transition-[stroke] [&_svg_circle]:transition-[stroke] group-hover:[&_svg_path]:stroke-white group-hover:[&_svg_rect]:stroke-white group-hover:[&_svg_circle]:stroke-white">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-ink mb-1.5 tracking-[-0.1px]">{f.title}</p>
                    <p className="text-[13.5px] font-light text-muted leading-[1.7]">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — refund card */}
          <div className="relative reveal-right">
            <div className="hidden lg:block absolute top-7 -right-6 bg-forest-500 text-white rounded-[16px] px-5 py-3.5 animate-fp-float z-10">
              <p className="text-[10px] text-white/42 tracking-[0.06em] uppercase mb-0.5">Avg. processing</p>
              <p className="text-[20px] font-bold text-white tracking-[-0.5px]">9 days</p>
              <p className="text-[10.5px] text-white/38 mt-0.5">from lodgement to refund</p>
            </div>
            <div className="hidden lg:block absolute bottom-7 -left-6 bg-forest-500 text-white rounded-[16px] px-5 py-3.5 animate-fp-float-2 z-10">
              <p className="text-[10px] text-white/42 tracking-[0.06em] uppercase mb-0.5">Clients served</p>
              <p className="text-[20px] font-bold text-white tracking-[-0.5px]">1,200+</p>
              <p className="text-[10.5px] text-white/38 mt-0.5">Working Holiday Makers</p>
            </div>
            <div className="bg-white border border-border rounded-[22px] p-8 relative">
              <div className="absolute top-8 right-8 inline-flex items-center gap-1.5 bg-forest-100 border border-forest-200 rounded-full px-3 py-1">
                <span className="w-[5px] h-[5px] rounded-full bg-forest-400" />
                <span className="text-[11px] font-semibold text-forest-500">Approved</span>
              </div>
              <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-subtle mb-2.5">Tax refund breakdown</p>
              <p className="font-serif font-black text-forest-500 text-[58px] tracking-[-2.5px] leading-none mb-1.5">$2,450</p>
              <p className="text-[13px] text-muted mb-8">2023–24 financial year · WHV 417</p>
              <div className="mb-2">
                <div className="flex justify-between text-[11px] text-subtle mb-1.5"><span>Tax withheld</span><span>$7,200</span></div>
                <div className="h-[3.5px] bg-border rounded-sm overflow-hidden"><div className="h-full w-full bg-forest-500 rounded-sm" /></div>
              </div>
              <div className="mb-7">
                <div className="flex justify-between text-[11px] text-subtle mb-1.5"><span>Tax owed</span><span>$4,750</span></div>
                <div className="h-[3.5px] bg-border rounded-sm overflow-hidden"><div className="h-full w-[66%] bg-amber rounded-sm" /></div>
              </div>
              {[{l:'Total income',v:'$31,600',em:false},{l:'Work deductions',v:'$1,840',em:false},{l:'Medicare levy',v:'Exempt',em:true}].map((row,i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-border2 last:border-b-0">
                  <span className="text-[13px] text-muted">{row.l}</span>
                  <span className={`text-[13px] font-semibold ${row.em ? 'text-forest-400':'text-ink'}`}>{row.v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 mt-2 border-t border-border">
                <span className="text-[13px] font-semibold text-ink">Refund</span>
                <span className="font-serif font-black text-forest-500 text-[22px] tracking-[-0.6px]">$2,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PROCESS ────────────────────────────────────────────────────────────────
const STEPS = [
  { n:'1', title:'Message us on WhatsApp',            body:"Start with a free eligibility check. Tell us your visa type, income, and what you need — and we'll tell you exactly what you're entitled to." },
  { n:'2', title:'Send us your documents',             body:'We send a clear checklist. Upload your payment summaries and any receipts — no scanning, no office visit, no forms to fill out yourself.' },
  { n:'3', title:'We prepare and lodge your return',   body:"Our team prepares, reviews, and lodges your return with the ATO — maximising your deductions and ensuring full compliance before submission." },
  { n:'4', title:'Your refund arrives',                body:'The ATO deposits your refund directly to your account. Most clients receive it within 7–14 days — wherever in the world you are by then.' },
]

function Process() {
  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-24 lg:self-start reveal-left">
            <Label>The process</Label>
            <h2 className="section-h2">Simple from<br />start to<br /><em>refund.</em></h2>
            <p className="text-[16px] font-light text-muted leading-[1.75] mb-10">Four steps. You send us your documents, we handle everything else, the money arrives in your account.</p>
            <div className="bg-forest-100 border border-forest-200 rounded-[14px] p-6 flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-[8px] bg-forest-500 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 14A6 6 0 108 2a6 6 0 000 12z" stroke="rgba(255,255,255,.6)" strokeWidth=".8"/><path d="M8 7v5M8 5.5v.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </div>
              <p className="text-[13px] text-forest-400 leading-[1.65]">
                <strong className="font-semibold text-forest-500 block mb-0.5">Free to start.</strong>
                Your eligibility check costs nothing. We only charge once your return is ready to lodge — and we tell you the fee upfront.
              </p>
            </div>
          </div>
          <div className="flex flex-col reveal-right">
            {STEPS.map((s,i) => (
              <div key={i} className="group flex gap-6 py-8 border-b border-border last:border-none transition-all hover:pl-2">
                <div className="w-[38px] h-[38px] rounded-full bg-forest-100 border border-border flex items-center justify-center text-[13px] font-bold text-forest-500 flex-shrink-0 mt-0.5 transition-all group-hover:bg-forest-500 group-hover:border-forest-500 group-hover:text-white">{s.n}</div>
                <div>
                  <p className="text-[15.5px] font-semibold text-ink mb-1.5 tracking-[-0.15px]">{s.title}</p>
                  <p className="text-[13.5px] font-light text-muted leading-[1.7]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CALCULATOR TEASER ──────────────────────────────────────────────────────
function CalcTeaser() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden clip-diagonal" style={{ background:'#1A2822', backgroundImage:'linear-gradient(rgba(255,255,255,.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.016) 1px,transparent 1px)', backgroundSize:'64px 64px' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="reveal-left">
            <Label light>Tax calculator</Label>
            <h2 className="font-serif font-black text-white tracking-[-1.2px] leading-[1.06] mt-3 mb-4" style={{ fontSize:'clamp(32px,5vw,52px)' }}>
              See what you&apos;re owed<br />before we start.
            </h2>
            <p className="text-[15.5px] font-light text-white/42 leading-[1.75] max-w-[400px] mb-10">Enter your details for an instant estimate. Real numbers — no commitment, no contact details required.</p>
            <Link href="/calculator" className="inline-flex items-center gap-2.5 h-[52px] px-7 bg-amber text-ink-2 rounded-full text-[14px] font-semibold shadow-[0_4px_20px_rgba(233,160,32,.28)] transition-all hover:bg-amber-300 hover:text-white hover:-translate-y-0.5">
              Open calculator →
            </Link>
          </div>
          <div className="reveal-right">
            <div className="bg-white/[0.04] border border-white/9 rounded-[22px] p-8 space-y-5">
              {['Total income (AUD)','Tax withheld (AUD)','Tax residency status'].map((label, i) => (
                <div key={i}>
                  <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/36 mb-2">{label}</p>
                  <div className="h-[54px] bg-white/6 border border-white/1 rounded-[12px] px-4 flex items-center text-white/20 text-[15px]">
                    {i === 0 ? 'e.g. 30,000' : i === 1 ? 'e.g. 4,500' : 'Select status'}
                  </div>
                </div>
              ))}
              <Link href="/calculator" className="w-full h-[58px] bg-amber text-ink-2 rounded-full text-[15px] font-semibold flex items-center justify-center shadow-[0_4px_20px_rgba(233,160,32,.22)] transition-all hover:bg-amber-300 hover:text-white">
                Calculate my refund
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name:'Emma T.',           from:'United Kingdom · WHV 417', quote:'"Super easy. Got my TFN in two days and they handled my entire return. No stress — just a refund in my account."', amount:'$2,450', featured:false },
  { name:"Liam O'Brien",      from:'Ireland · WHV 417',        quote:'"I was stressed about my super — four months, three employers. They walked me through everything and I got it all back."', amount:'$3,200', featured:true  },
  { name:'Max Fischer',       from:'Germany · WHV 417',        quote:'"Got my super back after leaving — $4,100. They handled everything and kept me updated the whole time."', amount:'$4,100', featured:false },
  { name:'Noah van der Berg', from:'Netherlands · WHV 462',    quote:'"Fast replies, clear explanations, and I saved more than expected. Will recommend to every backpacker I meet."', amount:'$3,450', featured:false },
]

function Stars() {
  return (
    <div className="flex gap-[3px]">
      {Array.from({length:5}).map((_,i) => <IconStar key={i} />)}
    </div>
  )
}

function Testimonials() {
  return (
    <section className="py-28 lg:py-36 bg-canvas overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="flex justify-between items-end flex-wrap gap-5 mb-16 reveal">
          <div>
            <Label>Client stories</Label>
            <h2 className="section-h2 mb-0">What backpackers<br />say about us.</h2>
          </div>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-[52px] px-7 border-[1.5px] border-border text-forest-500 rounded-full text-[14px] font-medium transition-all hover:border-forest-500 hover:bg-forest-100 hover:-translate-y-0.5">
            Get your refund →
          </a>
        </div>

        {/* Cards — scrollable on mobile, grid on desktop */}
        <div className="-mx-6 md:-mx-12 lg:mx-0 overflow-x-auto scrollbar-none pb-1">
          <div className="flex lg:grid lg:grid-cols-3 gap-4 px-6 md:px-12 lg:px-0 w-max lg:w-full reveal delay-1">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`w-[300px] lg:w-auto flex-shrink-0 rounded-[20px] p-7 flex flex-col border transition-all hover:-translate-y-1 ${t.featured ? 'bg-forest-500 border-forest-500' : 'bg-white border-border hover:border-forest-300'}`}>
                <Stars />
                <p className={`font-serif text-[15px] italic leading-[1.7] flex-1 mt-4 mb-5 ${t.featured ? 'text-white/82':'text-ink'}`}>{t.quote}</p>
                <span className={`inline-block font-serif font-black text-[26px] tracking-[-0.8px] border-b-[2.5px] border-amber pb-0.5 mb-5 ${t.featured ? 'text-white':'text-forest-500'}`}>{t.amount}</span>
                <div className={`flex items-center gap-2.5 pt-5 border-t ${t.featured ? 'border-white/10':'border-border'}`}>
                  <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${t.featured ? 'bg-white/10 text-white':'bg-forest-100 border border-border text-forest-500'}`}>{t.name[0]}</div>
                  <div>
                    <p className={`text-[12.5px] font-semibold ${t.featured ? 'text-white':'text-ink'}`}>{t.name}</p>
                    <p className={`text-[11.5px] ${t.featured ? 'text-white/38':'text-subtle'}`}>{t.from}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Proof card */}
            <div className="w-[300px] lg:w-auto flex-shrink-0 bg-forest-100 border border-forest-200 rounded-[20px] p-7 flex flex-col justify-between">
              <div>
                <p className="font-serif font-black text-forest-500 text-[56px] tracking-[-2px] leading-none mb-1.5">5.0</p>
                <p className="text-[13px] text-muted mb-6">Average client rating</p>
                <Stars />
                <p className="text-[11.5px] text-subtle mt-1.5">Across 1,200+ WHV holders</p>
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 h-[52px] px-7 bg-amber text-ink-2 rounded-full text-[14px] font-semibold shadow-[0_4px_20px_rgba(233,160,32,.28)] transition-all hover:bg-amber-300 hover:text-white hover:-translate-y-0.5">
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
      <Marquee />
      <Services />
      <Why />
      <Process />
      <CalcTeaser />
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
