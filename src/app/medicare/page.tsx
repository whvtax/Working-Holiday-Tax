import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
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
    answer: 'If you are not eligible for Medicare — which applies to most Working Holiday Visa holders — you can apply to have the Medicare levy waived when you lodge your tax return. We handle this as part of our tax return service.',
  },
  {
    question: 'I am from the UK. Am I eligible for Medicare?',
    answer: 'The UK has a Reciprocal Health Care Agreement with Australia. This means UK citizens on certain visas may access some Medicare services. However, coverage is limited and a Medicare card is not always issued automatically. We recommend confirming your status when you arrive.',
  },
  {
    question: 'If I am not eligible for Medicare, do I still pay the levy?',
    answer: 'Not if you apply for an exemption. If you are not eligible for Medicare, you should claim a Medicare levy exemption on your tax return — which means you will not be charged.',
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
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Medicare</span>
          </nav>
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.16em' }}>Guide</span>
            </div>
            <h1 className="font-serif font-black text-ink mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Medicare in Australia —<br /><span style={{ color: '#0B5240' }}>what you need to know.</span>
            </h1>
            <p className="font-semibold text-ink mb-3" style={{ fontSize: '16px', letterSpacing: '-0.01em' }}>
              Not everyone is eligible. We help you understand where you stand.
            </p>
            <p className="font-light leading-[1.75] mb-8 mx-auto" style={{ fontSize: '15px', color: 'rgba(10,15,13,0.55)', maxWidth: '440px' }}>
              Medicare is Australia&apos;s public health system. Whether it applies to you depends on your visa type and country of origin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}>
                Ask us on WhatsApp
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            <p className="text-[11.5px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Under the supervision of a registered tax agent approved by the ATO
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS MEDICARE ─────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
            <div className="reveal">
              <span className="section-label">What is Medicare?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Australia&apos;s public<br /><em className="not-italic font-normal text-forest-400">health system.</em>
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>Medicare is Australia&apos;s publicly funded healthcare system. It gives eligible residents access to free or subsidised medical services — including visits to a GP, treatment at public hospitals, and some specialist appointments.</p>
                <p>Medicare is funded partly through a Medicare levy — a tax of 2% of your taxable income, collected when you lodge your tax return. Not everyone is required to pay it.</p>
              </div>
              <div className="info-block">
                <p>Most Working Holiday Visa holders are not eligible for Medicare and are therefore entitled to apply for a Medicare levy exemption — which means the 2% charge does not apply to you.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Administered by',   body: 'Services Australia, on behalf of the Australian Government.' },
                { title: 'What it covers',    body: 'GP visits, public hospital treatment, and some specialist and diagnostic services for eligible people.' },
                { title: 'The Medicare levy', body: '2% of your taxable income. Only paid by people who are eligible for Medicare.' },
                { title: 'If not eligible',   body: 'You can apply for a Medicare levy exemption when lodging your tax return. This means you will not be charged the levy.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl px-5 py-4" style={{ border: '1px solid #C8EAE0', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                  <p className="text-[13.5px] font-semibold text-ink mb-1">{c.title}</p>
                  <p className="text-[13px] font-light text-muted leading-[1.7]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IS ELIGIBLE ──────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            <div className="reveal">
              <span className="section-label">Eligibility</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(20px,2.8vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Who can access<br /><em className="not-italic font-normal text-forest-400">Medicare?</em>
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>Medicare is available to Australian citizens and permanent residents. Temporary visa holders are generally not eligible — unless their country has a Reciprocal Health Care Agreement (RHCA) with Australia.</p>
                <p>An RHCA means that citizens of that country may access limited Medicare services while in Australia on a temporary visa. Coverage varies between agreements.</p>
              </div>
              <div className="mt-6">
                <p className="text-[13px] font-semibold text-ink mb-3" style={{ letterSpacing: '-0.01em' }}>Countries with an RHCA:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {rhca.map((country, i) => (
                    <div key={i} className="rounded-lg px-3 py-2 text-[12.5px] font-medium text-forest-500" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal delay-1">
              <span className="section-label">Working Holiday Visa holders</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(20px,2.8vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                What this means<br /><em className="not-italic font-normal text-forest-400">for you.</em>
              </h2>
              <div className="space-y-0">
                {[
                  {
                    label: 'From an RHCA country',
                    body: 'You may be eligible for limited Medicare access. Check with Services Australia when you arrive to confirm your entitlements under your country\'s agreement.',
                  },
                  {
                    label: 'From a non-RHCA country',
                    body: 'You are not eligible for Medicare. When you lodge your tax return, you can claim a Medicare levy exemption so the 2% levy is not applied to your income.',
                  },
                  {
                    label: 'Not sure?',
                    body: 'We can help you determine your status and apply the correct treatment when we prepare your tax return.',
                  },
                ].map((item, i) => (
                  <div key={i} className="py-5" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[14px] font-semibold text-ink mb-1.5" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON CONFUSION ─────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-10 reveal">
            <span className="section-label center">Common confusion</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Questions we hear<br /><em className="not-italic font-normal text-forest-400">all the time.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto reveal delay-1">
            {[
              {
                q: '"Do I need to sign up for Medicare?"',
                a: 'Only if you are from an RHCA country and want to use your entitlements. Otherwise, no action is needed — just claim the exemption on your tax return.',
              },
              {
                q: '"Why is Medicare levy showing on my tax bill?"',
                a: 'If Medicare levy was not exempted during the year, it may appear when you lodge. We sort this out as part of preparing your return.',
              },
              {
                q: '"I don\'t use Medicare — why am I being charged?"',
                a: 'Without a levy exemption on file, the ATO may calculate it automatically. Claiming the exemption on your tax return corrects this.',
              },
              {
                q: '"Does my travel insurance replace Medicare?"',
                a: 'Travel insurance and Medicare are separate. If you are not eligible for Medicare, travel insurance is the main way to cover medical costs in Australia.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6" style={{ border: '1px solid #C8EAE0', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
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
          <div className="max-w-2xl mb-10 reveal">
            <span className="section-label">Common questions</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-1" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Medicare questions, answered.
            </h2>
          </div>
          <div className="max-w-2xl reveal delay-1">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Not sure?"
        heading="Not sure about your"
        headingEm="Medicare status?"
        sub="We determine your Medicare eligibility as part of your tax return and apply the correct treatment automatically."
        primaryLabel="Ask us on WhatsApp - free"
      />
    </>
  )
}
