import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Medicare Levy Exemption for Working Holiday Visa Holders | Working Holiday Tax',
  description: 'Most WHV holders are exempt from the 2% Medicare levy — but only if you claim it. Without the exemption, the ATO charges it automatically.',
}

const RHCA_COUNTRIES = ['United Kingdom', 'Ireland', 'New Zealand', 'Netherlands', 'Sweden', 'Finland', 'Belgium', 'Italy', 'Malta', 'Norway', 'Slovenia']

const faqs = [
  { question: 'Do I automatically get the Medicare levy exemption?', answer: 'No. You must claim it when you lodge your tax return. If you do not claim it, the ATO calculates and charges the 2% levy automatically. We apply the exemption as part of every tax return we prepare.' },
  { question: 'I am from the UK. Am I eligible for Medicare?', answer: 'The UK has a Reciprocal Health Care Agreement with Australia, which means UK citizens may access some Medicare services. However, coverage is limited. We review your individual situation and apply the correct treatment in your return.' },
  { question: 'I already lodged my return without claiming the exemption. Can it be fixed?', answer: 'Yes. You can amend a previously lodged tax return to add the Medicare levy exemption. Contact us and we can advise on whether an amendment applies to your situation.' },
  { question: 'What is the Reciprocal Health Care Agreement?', answer: 'A RHCA is a bilateral agreement between Australia and certain countries that gives residents limited access to Medicare services while visiting. If your country has an RHCA with Australia, you may be eligible for some Medicare services on your Working Holiday visa.' },
  { question: 'Does the Medicare levy affect my tax refund?', answer: 'Yes. If you are not eligible for Medicare and did not claim the exemption, the ATO adds 2% of your taxable income to what you owe. For someone who earned $28,000, that is $560 extra. Claiming the exemption removes this charge completely.' },
]

const TickIcon = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>

export default function MedicarePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-10 pb-12 lg:pt-14 lg:pb-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Medicare</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: '#FDF0D5', border: '1px solid #F0D99A' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" stroke="#C47E10" strokeWidth="1.2"/><path d="M6 3.5v3M6 8.5v.3" stroke="#C47E10" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#92600A' }}>Without the exemption, the ATO charges the 2% levy automatically</span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Most working holiday travellers don&apos;t owe the Medicare levy.{' '}
              <span style={{ color: '#0B5240' }}>But you have to claim the exemption — or the ATO charges it anyway.</span>
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '46ch', marginBottom: '16px', fontWeight: 300 }}>
              The Medicare levy is 2% of your taxable income. Most WHV holders are exempt — but only if they claim it in their tax return. We apply the correct treatment automatically for every return we prepare.
            </p>

            <div className="rounded-xl" style={{ padding: '12px 16px', background: '#EAF6F1', border: '1px solid #C8EAE0', marginBottom: '26px', maxWidth: '44ch' }}>
              <p style={{ fontSize: '13.5px', color: '#0B5240', lineHeight: 1.6 }}>
                <strong>Medicare is part of your tax return — not a separate process.</strong> If you need help with the exemption, it is included in our tax return service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3" style={{ marginBottom: '16px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center w-full sm:w-auto"
                style={{ height: '52px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', maxWidth: '300px' }}>
                Sort my Medicare exemption →
              </a>
              <Link href="/tax-return" className="btn-ghost-dark inline-flex justify-center w-full sm:w-auto"
                style={{ height: '52px', padding: '0 24px', fontSize: '14px', maxWidth: '220px' }}>
                See tax return →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOT SURE STRIP ────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10">
          <div className="max-w-2xl">
            <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '8px' }}>
              Not sure which country you&apos;re from? Check the list.
            </p>
            <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: '14px' }}>
              Countries with a Reciprocal Health Care Agreement with Australia:
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginBottom: '20px' }}>
              {RHCA_COUNTRIES.map((c, i) => (
                <span key={i} style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.15)' }}>{c}</span>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
              If your country is not on this list, you are almost certainly exempt from the Medicare levy.
            </p>
          </div>
        </div>
      </section>

      {/* ── TWO SCENARIOS ─────────────────────────────────────────────────── */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '36px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', maxWidth: '28ch' }}>
              Your country determines your Medicare status.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto" style={{ marginBottom: '32px' }}>
            <div className="rounded-2xl" style={{ padding: '24px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>From a RHCA country (UK, Ireland, NL etc.)</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['May access limited Medicare services on a WHV', 'Medicare card is not always issued automatically', 'Levy treatment depends on your individual situation', 'We confirm and apply correctly in your return'].map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5"><TickIcon /><p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6 }}>{t}</p></div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl" style={{ padding: '24px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>From any other country</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {['Not eligible for Medicare services', 'Exempt from the 2% Medicare levy', 'Must claim the exemption in your tax return', 'Without it, ATO charges the levy automatically'].map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5"><TickIcon /><p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6 }}>{t}</p></div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full justify-center" style={{ height: '46px', fontSize: '13.5px' }}>
                Claim my exemption →
              </a>
            </div>
          </div>

          <div className="rounded-2xl text-center max-w-2xl mx-auto" style={{ padding: '20px 24px', background: '#fff', border: '1px solid #C8EAE0' }}>
            <p style={{ fontSize: '14px', color: '#587066', lineHeight: 1.65 }}>
              <strong className="text-ink">Medicare is handled as part of your tax return.</strong> You do not need to apply for or register anything separately. Just tell us your country and we apply the correct treatment.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ─────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '36px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', maxWidth: '26ch' }}>
              We handle Medicare as part of your tax return.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { title: 'We confirm your eligibility', body: 'We check your country of origin and visa type to determine exactly what applies to you.' },
              { title: 'We apply the correct treatment', body: 'Exemption or levy — whichever is correct for your situation is applied in your return before lodgement.' },
              { title: 'You avoid paying extra tax', body: 'Without the exemption, a $28,000 income means $560 extra in tax. We make sure that does not happen if you are not eligible.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '22px', background: '#F7FCF9', border: '1px solid #C8EAE0' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px' }}>{item.title}</p>
                <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '12px' }}>Medicare questions, answered.</h2>
              <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.65, marginBottom: '24px' }}>Different question? Message us on WhatsApp — we reply within 24 hours.</p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}>Ask us on WhatsApp →</a>
            </div>
            <div style={{ alignSelf: 'start' }}><Accordion items={faqs} /></div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#0B5240', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '26ch' }}>
            The exemption saves you 2% of your entire taxable income. Claim it.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '44ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            We handle Medicare as part of your tax return — no separate step required.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '54px', padding: '0 44px', fontSize: '16px', maxWidth: '320px', margin: '0 auto' }}>
            Sort my Medicare exemption →
          </a>
        </div>
      </section>

      <NextStep eyebrow="Ready to lodge?" heading="Medicare exemption is included in your tax return." body="You do not need to handle Medicare separately. Start your tax return and we apply the correct Medicare treatment as part of it." cta="Start my tax return →" href="/tax-return" />
    </>
  )
}
