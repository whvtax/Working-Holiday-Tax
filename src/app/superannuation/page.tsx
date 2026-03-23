import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Super Withdrawal DASP — Claim Your 12% Back | Working Holiday Tax',
  description: 'Your employer paid 12% of every wage into super. Claim it back after you leave Australia via the DASP process. WHV specialists handle it for you.',
}

const faqs = [
  { question: 'When can I claim my super?', answer: 'Once you have left Australia and your visa has expired or been cancelled. You must be outside Australia at the time of the DASP application.' },
  { question: 'How much tax is deducted from a DASP withdrawal?', answer: 'Super withdrawals for Working Holiday visa holders are taxed at 65% by the ATO. This means you receive 35% of the balance. We are transparent about this upfront — it is still money that belongs to you and would otherwise sit unclaimed.' },
  { question: 'I left Australia years ago — can I still claim?', answer: 'Yes. There is no time limit to claim your super. Even if the balance was transferred to the ATO as unclaimed money, you can still apply. The longer you wait, the harder it can be to track your fund details.' },
  { question: 'I worked for multiple employers — do I have multiple super accounts?', answer: 'Likely yes. Each employer may have used a different fund. We locate all your accounts, including any transferred to the ATO, and consolidate the claim.' },
  { question: 'Do I receive super if I worked under an ABN?', answer: 'Generally no. Super is paid by employers on wages. If you were paid as a contractor under an ABN, clients are not required to pay super on your invoices.' },
  { question: 'How long does the DASP process take?', answer: 'We submit your claim promptly after receiving your documents. ATO processing typically takes 2–6 weeks after submission. We track it and keep you updated.' },
]

const STEPS = [
  { n: '1', title: 'Message us on WhatsApp', body: 'Tell us your visa subclass and when you left Australia.' },
  { n: '2', title: 'We locate your funds', body: 'We find all your super accounts, including any held by the ATO.' },
  { n: '3', title: 'We prepare and submit', body: 'DASP claim submitted correctly — your bank details included.' },
  { n: '4', title: 'Payment to your account', body: 'ATO pays directly to your overseas bank account.' },
]

const IconStar  = () => <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>
const TickIcon  = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>

export default function SuperannuationPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-10 pb-12 lg:pt-14 lg:pb-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Superannuation</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0B5240' }}>Your employer paid 12% of every wage into a super fund</span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Your employer paid 12% of your wages into super.{' '}
              <span style={{ color: '#0B5240' }}>That money is yours. We claim it back.</span>
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '46ch', marginBottom: '12px', fontWeight: 300 }}>
              The DASP (Departing Australia Superannuation Payment) lets Working Holiday travellers withdraw their super after leaving. Most travellers never claim it — because they don&apos;t know how or where their fund is. We handle the entire process.
            </p>

            <div className="rounded-xl" style={{ padding: '12px 16px', background: '#FDF0D5', border: '1px solid #F0D99A', marginBottom: '26px', maxWidth: '44ch' }}>
              <p style={{ fontSize: '13.5px', color: '#92600A', lineHeight: 1.6 }}>
                <strong>Note:</strong> DASP withdrawals are taxed at 65% by the ATO. You receive 35% of the balance — but it is your money and would otherwise sit unclaimed permanently.
              </p>
            </div>

            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex justify-center w-full sm:w-auto"
              style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '300px', marginBottom: '16px' }}>
              Check how much super I can claim →
            </a>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {['Works after you have left Australia', '1,200+ WHV travellers helped', 'TPB registered oversight'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.45)' }}>
                  <TickIcon />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUPER HOOK STRIP ─────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 text-center">
          <p className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '8px' }}>
            Most travellers leave Australia without claiming their super.
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '50ch', margin: '0 auto 20px', lineHeight: 1.65, fontWeight: 300 }}>
            If you earned $30,000 on a Working Holiday visa, your employer paid approximately $3,600 into a super fund. At 35% after tax, that is still over $1,200 you can receive. Most people never claim it.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold w-full sm:w-auto"
            style={{ height: '48px', padding: '0 28px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '280px', margin: '0 auto' }}>
            Check my super eligibility →
          </a>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '36px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', maxWidth: '28ch' }}>
              The DASP process is complex. We handle all of it.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '36px', alignItems: 'stretch' }}>
            {[
              { title: 'We find all your super accounts', body: 'Multiple employers = multiple funds. We locate all of them, including any transferred to the ATO as unclaimed money.' },
              { title: 'We prepare and submit the DASP', body: 'The Departing Australia Superannuation Payment form is complex. We handle it correctly with your Australian bank details if applicable.' },
              { title: 'Paid to your overseas bank account', body: 'Once approved, the ATO pays directly to the bank account you nominate. No Australian account required.' },
              { title: 'Works after you have already left', body: 'DASP is only available after your visa expires. We handle it from wherever you are in the world — fully online.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)', height: '100%' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</p>
                <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '300px', margin: '0 auto' }}>
              Check how much super I can claim →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto" style={{ alignItems: 'stretch' }}>
            {[
              { tag: 'claimed from Germany', quote: "Already back in Germany when I realised I never claimed super. Messaged on WhatsApp, sent my passport and bank details, and it was done. Never had to log in to anything Australian.", name: "Max", from: "Germany · WHV 417", initials: "M", bg: "#D1FAE5", fg: "#065F46" },
              { tag: '4 employers · found all funds', quote: "Had 4 different jobs and had no idea I had multiple super accounts. They found all of them and submitted a single consolidated claim. Would never have figured that out myself.", name: "Liam", from: "Ireland · WHV 417", initials: "L", bg: "#DBEAFE", fg: "#1E40AF" },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding: '22px', border: '1px solid #E2EFE9', boxShadow: '0 2px 12px rgba(11,82,64,.06)', height: '100%' }}>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0', marginBottom: '12px', width: 'fit-content' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#0B5240' }}>{t.tag}</p>
                </div>
                <div className="flex gap-0.5" style={{ marginBottom: '10px' }}>{Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}</div>
                <p className="font-light text-body flex-1" style={{ fontSize: '14px', lineHeight: 1.75, marginBottom: '16px' }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2.5" style={{ paddingTop: '12px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{ width: '32px', height: '32px', fontSize: '11px', background: t.bg, color: t.fg }}>{t.initials}</div>
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '12px' }}>{t.name}</p>
                    <p className="text-subtle" style={{ fontSize: '11px', marginTop: '2px' }}>{t.from}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY ──────────────────────────────────────────────────── */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '20px' }}>When you can claim.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { t: 'You have left Australia', d: 'You must be outside Australia at the time of the DASP application.' },
                  { t: 'Your visa has expired or been cancelled', d: 'The ATO verifies this automatically when you submit the claim.' },
                  { t: 'Your employment has ended', d: 'The most recent super contributions from your last employer should have been received by the fund.' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '3px' }}>{item.t}</p>
                    <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.6 }}>{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '20px' }}>What you&apos;ll need to send us.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Passport details', 'Tax File Number (if available)', 'Super fund details (if you have them)', 'Bank account for payment — overseas is fine'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <TickIcon />
                    <p className="font-light text-body" style={{ fontSize: '14px', lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
              <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.6, marginTop: '16px' }}>
                Don&apos;t have your fund details? We look them up using your TFN and employment history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>One message. Super claim submitted.</h2>
          </div>
          <div className="hidden lg:block" style={{ marginBottom: '48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: '#0B5240', fontSize: '13px', marginBottom: '16px', boxShadow: '0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>{s.n}</div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize: '13.5px', marginBottom: '6px' }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '32px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#0B5240', fontSize: '12px' }}>{s.n}</div>
                  {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2" style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '320px', margin: '0 auto' }}>
              Check how much super I can claim →
            </a>
            <p style={{ marginTop: '9px', fontSize: '12px', color: '#8AADA3' }}>Free first conversation · No commitment</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '12px' }}>Super questions, answered.</h2>
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
          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '24ch' }}>
            12% of your wages is sitting in a fund. Claim it before it disappears.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '44ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            Unclaimed super is eventually transferred to the ATO. It can still be claimed — but the longer you wait, the harder it becomes to track.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '54px', padding: '0 44px', fontSize: '16px', maxWidth: '320px', margin: '0 auto' }}>
            Check how much super I can claim →
          </a>
        </div>
      </section>

      <NextStep eyebrow="Also need this?" heading="Check your Medicare status before you go." body="Depending on your country, you may be eligible for a Medicare levy exemption — which reduces what you owe in your tax return." cta="Check Medicare eligibility →" href="/medicare" />
    </>
  )
}
