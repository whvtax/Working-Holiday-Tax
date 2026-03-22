import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

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
]

export default function MedicarePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white hero-min">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 pt-10 pb-10 lg:pt-16 lg:pb-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Medicare</span>
          </nav>

          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Guide</span>
            </div>

            <h1 className="font-serif font-black text-ink mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.06, letterSpacing: '-0.03em' }}>
              Medicare in Australia for WHV
              <br /><span style={{ color: '#0B5240' }}>what you need to know.</span>
            </h1>

            <p className="font-light leading-[1.8] mb-8" style={{ fontSize: '16px', color: 'rgba(10,15,13,0.6)', maxWidth: '500px' }}>
              Not everyone is eligible. We help you understand where you stand.
            </p>

            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex mb-5"
              style={{ height: '52px', padding: '0 36px', fontSize: '16px', borderRadius: '14px' }}>
              Check your eligibility
            </a>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['1,200+ travellers helped', 'ATO compliant', 'Response within 1 hour'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize: '12.5px', color: 'rgba(10,15,13,0.45)' }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                    <path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NOT SURE? — MAIN ENTRY POINT ──────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-8 lg:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className="font-serif font-black text-white mb-1.5" style={{ fontSize: 'clamp(18px,2.5vw,28px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Not sure about your Medicare status?
              </p>
              <p className="font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>
                We determine your eligibility and apply the correct treatment when we prepare your tax return.
              </p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 font-semibold transition-all"
              style={{ height: '48px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px' }}>
              Check your eligibility →
            </a>
          </div>
        </div>
      </section>

      {/* ── SIMPLE DECISION ───────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mb-10 reveal">
            <span className="section-label">Your two scenarios</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,34px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              You either pay the Medicare levy<br />
              <em className="not-italic font-normal text-forest-400">or you may be exempt.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '14px' }}>
              Medicare is Australia&apos;s public health system. Eligibility depends on your visa type and country of origin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 reveal delay-1">
            <div className="bg-white rounded-2xl p-6" style={{ border: '1.5px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: '#EAF6F1' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#0B5240" strokeWidth="1.4"/>
                  <path d="M7 10l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[15px] font-bold text-ink mb-2">From an RHCA country</p>
              <p className="text-[13px] font-light text-muted leading-[1.7] mb-3">
                If you have Medicare, provide your details or a copy of your Medicare card. This allows us to apply it correctly to your tax return.
              </p>
              <p className="text-[11.5px] font-medium text-forest-500">You may access limited Medicare services</p>
            </div>

            <div className="bg-white rounded-2xl p-6" style={{ border: '1.5px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: '#FFFCF5' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#C47E10" strokeWidth="1.4"/>
                  <path d="M10 6v5M10 13.5v.5" stroke="#C47E10" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[15px] font-bold text-ink mb-2">From a non-RHCA country</p>
              <p className="text-[13px] font-light text-muted leading-[1.7] mb-3">
                If you are not eligible for Medicare, you will need to provide proof of a Medicare levy exemption. If it is not approved, the 2% levy may apply.
              </p>
              <p className="text-[11.5px] font-medium" style={{ color: '#C47E10' }}>You may apply for a Medicare levy exemption</p>
            </div>
          </div>

          <div className="text-center reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
              Check your eligibility
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mb-10 reveal">
            <span className="section-label">What we do for you</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,34px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              We handle it as part<br />
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
              <div key={i} className="rounded-2xl p-6" style={{ background: '#EEF7F2', border: '1px solid #C8EAE0' }}>
                <p className="text-[14px] font-semibold text-ink mb-2" style={{ letterSpacing: '-0.01em' }}>{item.title}</p>
                <p className="text-[13px] font-light text-muted leading-[1.7]">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap gap-4 reveal delay-2">
            {[
              'Handled under a registered tax agent',
              'Fully ATO compliant',
              'Accountable for every service',
            ].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0', fontSize: '12.5px', color: '#0B5240', fontWeight: 500 }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                  <path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ── CROSS LINK ────────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9', background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="font-light text-muted" style={{ fontSize: '13.5px' }}>
            Your Medicare status affects your tax return. We handle both together.
          </p>
          <a href="/tax-return" className="inline-flex items-center gap-1.5 font-semibold whitespace-nowrap transition-colors hover-forest-light flex-shrink-0" style={{ fontSize: '13px', color: '#0B5240' }}>
            Lodge your tax return →
          </a>
        </div>
      </div>

      {/* ── MEDICARE LEVY EXEMPTION + VIDEO ───────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl reveal">
            <span className="section-label">Medicare levy exemption</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Medicare levy exemption.
            </h2>
            <p className="font-light text-muted leading-[1.7] mb-8" style={{ fontSize: '14px', maxWidth: '520px' }}>
              If you are not from a country eligible for Medicare, you will need a Medicare levy exemption before lodging your tax return.
            </p>
            <div className="reveal delay-1 rounded-2xl flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px]"
              style={{ background: '#ffffff', border: '1.5px solid #C8EAE0', width: '100%', maxWidth: '640px' }}>
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
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
            <div className="reveal">
              <span className="section-label">What is Medicare?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
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

            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Administered by',  body: 'Services Australia, on behalf of the Australian Government.' },
                { title: 'What it covers',   body: 'GP visits, public hospital treatment, and some specialist and diagnostic services for eligible individuals.' },
                { title: 'Medicare levy',    body: '2% of your taxable income. Applies only to those eligible for Medicare.' },
                { title: 'If not eligible',  body: 'You may be able to apply for a Medicare levy exemption when lodging your tax return.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl px-4 py-3.5" style={{ border: '1px solid #C8EAE0', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                  <p className="text-[13px] font-semibold text-ink mb-1">{c.title}</p>
                  <p className="text-[13px] font-light text-muted leading-[1.65]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RHCA countries */}
          <div className="mt-12 reveal delay-1">
            <p className="text-[13px] font-semibold text-ink mb-4" style={{ letterSpacing: '-0.01em' }}>Countries with a Reciprocal Health Care Agreement (RHCA):</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {rhca.map((country, i) => (
                <div key={i} className="rounded-lg px-3 py-2 text-[12.5px] font-medium text-forest-500" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                  {country}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON CONFUSION ─────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">Common confusion</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Questions we hear all the time.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto reveal delay-1">
            {[
              { q: '"Do I need to sign up for Medicare?"', a: 'Only if you are from an RHCA country and want to use your entitlements. Otherwise, no action is needed — just claim the exemption on your tax return.' },
              { q: '"Why is Medicare levy showing on my tax bill?"', a: 'If Medicare levy was not exempted during the year, it may appear when you lodge. We sort this out as part of preparing your return.' },
              { q: '"I don\'t use Medicare — why am I being charged?"', a: 'Without a levy exemption on file, the ATO may calculate it automatically. Claiming the exemption on your tax return corrects this.' },
              { q: '"Does my travel insurance replace Medicare?"', a: 'Travel insurance and Medicare are separate. If you are not eligible for Medicare, travel insurance is the main way to cover medical costs in Australia.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5" style={{ border: '1px solid #C8EAE0', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                <p className="text-[13.5px] font-semibold text-ink mb-2 italic">{item.q}</p>
                <p className="text-[13px] font-light text-muted leading-[1.7]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-16 items-start">
            <div className="reveal">
              <span className="section-label">Questions</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
                Medicare questions, answered.
              </h2>
              <p className="font-light text-muted leading-[1.65] mb-6" style={{ fontSize: '13.5px' }}>
                Still unsure? Ask our tax experts.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex"
                style={{ height: '48px', padding: '0 22px', fontSize: '14px' }}>
                Get help now →
              </a>
            </div>
            <div className="reveal delay-1 max-w-[680px]">
              <Accordion items={faqs} />
            </div>
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
      <RelatedServices items={[
        { label: 'Tax Return',        desc: 'Lodge your return and claim your refund', href: '/tax-return' },
        { label: 'Super Withdrawal',  desc: 'Claim your super when you leave', href: '/superannuation' },
        { label: 'TFN Application',   desc: 'Required to work in Australia', href: '/tfn' },
      ]} />

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Not sure?"

        heading="Not sure about your Medicare status?"
        headingEm=""
        sub="We determine your eligibility as part of your tax return and apply the correct treatment."
        primaryLabel="Check your eligibility"
      />
    </>
  )
}
