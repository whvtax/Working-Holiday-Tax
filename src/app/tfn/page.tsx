import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'TFN Application for Working Holiday Visa Holders',
  description: 'Get your Tax File Number sorted fast. Apply correctly the first time with step-by-step guidance from a registered tax agent.',
}

const faqs = [
  { question:'Can I start work before I receive my TFN?', answer:'Yes. You can start working, but you must provide your TFN within 28 days. Until then, your employer may withhold tax at a higher rate.' },
  { question:'Where will my TFN be sent?', answer:'Your TFN is sent by post to your Australian address. Make sure you use an address where you can receive mail.' },
  { question:'Can I get a TFN on a tourist visa?', answer:'No. You need a valid work visa, such as a Working Holiday visa 417 or 462.' },
  { question:'What if I lose my TFN?', answer:'You can find your TFN in previous tax returns, request it from the ATO, or ask your tax agent.' },
  { question:'What is a TFN Declaration Form?', answer:'A form you complete when starting a job. It tells your employer how much tax to withhold from your pay.' },
]

const STEPS = [
  { n:'1', title:'Tell us about your situation', body:'Share your visa details so we can guide you correctly.' },
  { n:'2', title:'Send your details in minutes',  body:'Passport and basic info - quick and simple.' },
  { n:'3', title:'We handle everything for you',  body:'We prepare and submit your TFN correctly.' },
  { n:'4', title:'Receive your TFN',             body:'You receive your TFN by post or phone within a week.' },
]

const TESTIMONIALS = [
  { name:"Liam O'Brien", from:'Ireland · WHV 417', quote:'I had multiple employers and no idea what to do. They guided me through everything and made the process simple.', amount:'$3,200', initials:'L', bgColor:'#DBEAFE', textColor:'#1E40AF' },
  { name:'Emma T.', from:'United Kingdom · WHV 417', quote:'Got my TFN sorted in just two days, and everything was handled clearly from start to finish. No stress, just a smooth and easy process.', amount:'$2,450', initials:'E', bgColor:'#FCE7F3', textColor:'#9D174D' },
]

const IconStar  = () => (<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)
const CheckIcon = () => (<svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)

export default function TFNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">TFN Application</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                TFN Application
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize:'clamp(24px,3.2vw,44px)',
                lineHeight:1.06,
                letterSpacing:'-0.03em',
                marginBottom:'10px',
              }}>
              {/* Desktop: locked 2 lines — nowrap per line */}
              <span className="hidden lg:block">
                <span style={{ display:'block', whiteSpace:'nowrap' }}>Get your TFN sorted quickly &amp;</span>
                <span style={{ display:'block', whiteSpace:'nowrap', color:'#0B5240' }}>start working sooner</span>
              </span>
              {/* Mobile: natural wrap */}
              <span className="lg:hidden">Get your TFN sorted quickly and start working sooner</span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              We make sure your TFN is done correctly the first time.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              
              Without a TFN, you may be taxed at a higher rate.
            
            </p>

            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1' }}>
                Apply for a TFN →
              </a>
              <a href="#how-to-apply"
                className="hidden lg:inline-flex btn-ghost-dark justify-center"
                style={{ height:'54px', padding:'0 24px', fontSize:'15px', flex:'1' }}>
                See how it works →
              </a>
            </div>

            <div className="flex flex-col items-start gap-y-2 lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['1,200+ backpackers helped','4.9★ from 300+ reviews','Registered Australian tax agent','Most replies within 1 hour'].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── URGENCY ───────────────────────────────────────────────────────── */}
      {/*
        Mobile:  py-10, heading on 2 balanced lines, clear CTA spacing
        Desktop: py-16, narrower text block, premium spacing
      */}
            {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#ffffff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            <div className="text-center">
              <span className="section-label center">Questions</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(17px,2.04vw,26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                TFN questions, answered.
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'13.5px', lineHeight:1.7, marginBottom:'24px' }}>
                Have a question? Message us on WhatsApp.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height:'48px', padding:'0 28px', fontSize:'14px', width:'100%', maxWidth:'220px' }}>
                Get help now →
              </a>
            </div>

            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>


      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="Already have your TFN?"
        body="If you're working as a contractor or freelancer, you may also need an ABN to invoice correctly"
        cta="Check your ABN eligibility →"
        href="/abn"
      />
    </>
  )
}
