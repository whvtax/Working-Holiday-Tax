import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Medicare in Australia for Working Holiday Visa Holders',
  description: 'Understand Medicare eligibility and the Medicare levy as a Working Holiday Visa holder in Australia.',
}

const rhca = [
  'United Kingdom', 'New Zealand', 'Ireland', 'Sweden',
  'Netherlands', 'Finland', 'Belgium', 'Italy',
  'Malta', 'Norway', 'Slovenia',
]

const faqs = [
  {
    question: 'Do I need to register for Medicare?',
    answer: 'Only if you are from a country with a Reciprocal Health Care Agreement (RHCA) with Australia. If you are not eligible, you do not need to register and should apply for a Medicare levy exemption when lodging your tax return.',
  },
  {
    question: 'What is the Medicare levy exemption?',
    answer: 'If you are not eligible for Medicare - which applies to most Working Holiday Visa holders - you can apply to have the Medicare levy waived when you lodge your tax return. We handle this as part of our tax return service.',
  },
  {
    question: 'I am from the UK. Am I eligible for Medicare?',
    answer: 'The UK has a Reciprocal Health Care Agreement with Australia. This means UK citizens on certain visas may access some Medicare services. However, coverage is limited and a Medicare card is not always issued automatically. We recommend confirming your status when you arrive.',
  },
  {
    question: 'If I am not eligible for Medicare, do I still pay the levy?',
    answer: 'Not if you apply for an exemption. If you are not eligible for Medicare, you should claim a Medicare levy exemption on your tax return - which means you will not be charged.',
  },
  {
    question: 'What is private health insurance and do I need it?',
    answer: 'Private health insurance covers medical costs not covered by Medicare. If you are not eligible for Medicare, you may want to consider private health cover depending on your situation. This is separate from the Medicare levy.',
  },
  {
    question: 'Does my Working Holiday visa affect my Medicare eligibility?',
    answer: 'Yes. Most Working Holiday visa holders are not eligible for Medicare unless they are from a country with a Reciprocal Health Care Agreement. If you are not eligible, we apply a Medicare levy exemption as part of your tax return.',
  },
]

export default function MedicarePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white hero-min hero-section">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 pt-8 pb-6 lg:pt-14 lg:pb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Medicare</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Guide</span>
            </div>

                        <h1 className="font-serif font-black text-ink" style={{ fontSize:'clamp(24px,3.2vw,40px)', lineHeight:1.06, letterSpacing:'-0.03em', marginBottom:'14px' }}>
              Understand your Medicare status<br />
              <span style={{ color:'#0B5240' }}>before you lodge your return.</span>
            </h1>

            <p className="font-semibold text-ink" style={{ fontSize:'15px', letterSpacing:'-0.01em', marginBottom:'6px' }}>
              We determine your eligibility and apply the correct treatment.
            </p>

            <p className="font-light" style={{ fontSize:'14.5px', lineHeight:1.65, color:'rgba(10,15,13,0.6)', maxWidth:'44ch', marginBottom:'24px' }}>
              Not everyone is eligible. We help you understand where you stand.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-row gap-3 items-center" style={{ marginBottom:'20px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex"
                style={{ height:'52px', padding:'0 32px', fontSize:'15px', borderRadius:'100px' }}>
                Check your eligibility →
              </a>
              <a href="#how-it-works" className="btn-ghost-dark inline-flex" style={{ height:'52px', padding:'0 24px', fontSize:'15px' }}>
                How it works →
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-nowrap gap-x-4 overflow-x-auto">
              {['1,200+ travellers helped', 'Response within 1 hour', 'ATO compliant', 'By a registered tax agent'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)', whiteSpace:'nowrap' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NOT SURE? — MAIN ENTRY POINT ──────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-8 lg:py-10">
          <div style={{ maxWidth: '560px' }}>
            <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(18px,2.2vw,26px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '8px' }}>
              Not sure about your<br />Medicare status?
            </p>
            <p className="font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px', maxWidth: '38ch' }}>
              We determine your eligibility and apply the correct treatment when we prepare your tax return.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold"
              style={{ height: '46px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px' }}>
              Check your eligibility →
            </a>
          </div>
        </div>
      </section>

      {/* ── SIMPLE DECISION ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Your two scenarios</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '8px' }}>
              You either pay the Medicare levy<br />
              <em className="not-italic font-normal text-forest-400">or you may be exempt.</em>
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '36ch' }}>
              Medicare is Australia&apos;s public health system. Eligibility depends on your visa type and country of origin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 reveal delay-1">
            <div className="bg-white rounded-2xl" style={{ padding: '20px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ marginBottom: '12px', background: '#EAF6F1' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#0B5240" strokeWidth="1.4"/>
                  <path d="M7 10l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-bold text-ink" style={{ marginBottom: '6px' }}>From an RHCA country</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '28ch', marginBottom: '10px' }}>
                If you have Medicare, provide your details or a copy of your Medicare card. This allows us to apply it correctly to your tax return.
              </p>
              <p className="text-[11.5px] font-medium text-forest-500">You may access limited Medicare services</p>
            </div>

            <div className="bg-white rounded-2xl" style={{ padding: '20px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ marginBottom: '12px', background: '#FFFCF5' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#C47E10" strokeWidth="1.4"/>
                  <path d="M10 6v5M10 13.5v.5" stroke="#C47E10" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-bold text-ink" style={{ marginBottom: '6px' }}>From a non-RHCA country</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '28ch', marginBottom: '10px' }}>
                If you are not eligible for Medicare, you will need to provide proof of a Medicare levy exemption. If it is not approved, the 2% levy may apply.
              </p>
              <p className="text-[11.5px] font-medium" style={{ color: '#C47E10' }}>You may apply for a Medicare levy exemption</p>
            </div>
          </div>

          <div className="text-center reveal delay-2" style={{ marginTop: '24px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover-forest-light"
              style={{ fontSize: '13.5px', color: '#0B5240' }}>
              Not sure which applies to you? Ask us →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">What we do for you</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              We handle it as part{" "}
              <em className="not-italic font-normal text-forest-400">of your tax return.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 reveal delay-1">
            {[
              {
                title: 'We determine your eligibility',
                body: 'We check your visa type and country of origin to determine your Medicare status.',
              },
              {
                title: 'We apply the correct treatment',
                body: 'Whether you need the levy or an exemption, we handle it correctly in your tax return.',
              },
              {
                title: 'Avoid paying extra tax',
                body: 'Without the correct exemption, the 2% Medicare levy may be charged. We make sure that does not happen if you are not eligible.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#EEF7F2', border: '1px solid #C8EAE0' }}>
                <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '6px' }}>{item.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '26ch' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDICARE LEVY EXEMPTION + VIDEO ───────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center reveal">
            <span className="section-label center">Medicare levy exemption</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Medicare levy exemption.
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '32ch', marginBottom: '28px' }}>
              If you are not from a country eligible for Medicare, you will need a Medicare levy exemption before lodging your tax return.
            </p>
            <div className="reveal delay-1 rounded-2xl flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px] mx-auto"
              style={{ background: '#ffffff', border: '1px solid #C8EAE0', width: '100%', maxWidth: '640px' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                style={{ background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7 5.5l8 4.5-8 4.5V5.5z" fill="#0B5240" />
                </svg>
              </div>
              <p className="font-medium text-muted" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>Video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS MEDICARE (DETAIL) ─────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-start">
            <div className="reveal">
              <span className="section-label">What is Medicare?</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(15px, 1.87vw, 20px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '20ch', marginTop: '8px', marginBottom: '18px', textWrap: 'balance' }}>
                Australia&apos;s public<br />
                <em className="not-italic font-normal text-forest-400">health system.</em>
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>Medicare is Australia&apos;s publicly funded healthcare system. It provides access to subsidised medical services for eligible individuals. It is partly funded through the Medicare levy - a 2% charge on taxable income.</p>
                <p>Eligibility depends on your visa type and country of origin. Not everyone is required to pay the levy.</p>
                <p>Most Working Holiday visa holders are not eligible for Medicare and may be able to apply for a Medicare levy exemption.</p>
              </div>
              <div className="info-block">
                <p>Working Holiday visa holders can only access Medicare if they are from an eligible country with a Reciprocal Health Care Agreement (RHCA) with Australia.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 reveal delay-1" style={{ alignSelf: 'start' }}>
              {[
                { title: 'Administered by',  body: 'Services Australia, on behalf of the Australian Government.' },
                { title: 'What it covers',   body: 'GP visits, public hospital treatment, and some specialist and diagnostic services for eligible individuals.' },
                { title: 'Medicare levy',    body: '2% of your taxable income. Applies only to those eligible for Medicare.' },
                { title: 'If not eligible',  body: 'You may be able to apply for a Medicare levy exemption when lodging your tax return.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl" style={{ padding: '12px 16px', border: '1px solid #C8EAE0', boxShadow: '0 1px 2px rgba(0,0,0,.02)' }}>
                  <p className="text-[12.5px] font-semibold text-ink" style={{ marginBottom: '3px' }}>{c.title}</p>
                  <p className="text-[12px] font-light text-muted leading-[1.6]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON CONFUSION ─────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '28px' }}>
            <span className="section-label center">Common confusion</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(15px, 1.87vw, 20px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '24ch', marginTop: '8px', textWrap: 'balance' }}>
              Questions we hear all the time.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal delay-1">
            {[
              { q: '"Do I need to sign up for Medicare?"', a: 'Only if you are from an RHCA country and want to use your entitlements. Otherwise, no action is needed — just claim the exemption on your tax return.' },
              { q: '"Why is Medicare levy showing on my tax bill?"', a: 'If Medicare levy was not exempted during the year, it may appear when you lodge. We sort this out as part of preparing your return.' },
              { q: '"I don\'t use Medicare — why am I being charged?"', a: 'Without a levy exemption on file, the ATO may calculate it automatically. Claiming the exemption on your tax return corrects this.' },
              { q: '"Does my travel insurance replace Medicare?"', a: 'Travel insurance and Medicare are separate. If you are not eligible for Medicare, travel insurance is the main way to cover medical costs in Australia.' },
              { q: '"Does my Working Holiday visa affect my Medicare?"', a: 'Yes. Most WHV holders are not eligible unless from an RHCA country. We apply the correct exemption as part of your tax return.' },
              { q: '"Can I get a Medicare card on a Working Holiday visa?"', a: 'Only if you are from an RHCA country. If not, you are not entitled to a Medicare card and should apply for a levy exemption instead.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding: '16px', border: '1px solid #C8EAE0', boxShadow: '0 1px 2px rgba(0,0,0,.02)' }}>
                <p className="text-[13px] font-semibold text-ink italic" style={{ marginBottom: '6px' }}>{item.q}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="Ready to lodge your tax return?"
        body="We apply your Medicare status correctly when we prepare your return - so you are never overcharged."
        cta="Lodge your tax return →"
        href="/tax-return"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
    </>
  )
}
