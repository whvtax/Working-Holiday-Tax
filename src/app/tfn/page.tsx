import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'TFN Application — Without One You Pay 47% Tax | Working Holiday Tax',
  description: 'Without a TFN your employer withholds 47% tax from every payslip. Get your Tax File Number sorted before your first shift. WHV specialists.',
}

const faqs = [
  { question: 'Can I start work before I receive my TFN?', answer: 'Yes, but your employer must withhold 47% tax until your TFN is on file — compared to the 15% WHM rate you should be paying. You can recover the difference in your tax return, but it is better to get it sorted before you start.' },
  { question: 'How long does a TFN application take?', answer: 'Most TFN applications are confirmed within 1–5 business days. We will let you know as soon as it arrives.' },
  { question: 'Where will my TFN be sent?', answer: 'Your TFN is sent by post to your Australian address, and you may also receive it by phone or online. Make sure you use an address where you can receive mail while you are in Australia.' },
  { question: 'Can I get a TFN on a tourist visa?', answer: 'No. You need a valid work visa — Working Holiday subclass 417 or 462 — to apply for a TFN.' },
  { question: 'I already started work without a TFN. Can I fix this?', answer: 'Yes. Submit your TFN to your employer as soon as you have it — they will apply the correct rate going forward. The tax you overpaid while you had no TFN can be recovered through your tax return at the end of the financial year.' },
]

const STEPS = [
  { n: '1', title: 'Message us on WhatsApp',  body: 'Tell us your visa subclass and when you start work.' },
  { n: '2', title: 'Send your details',        body: 'Passport and Australian address. Takes 5 minutes.' },
  { n: '3', title: 'We submit the application', body: 'Reviewed and submitted correctly under registered oversight.' },
  { n: '4', title: 'TFN confirmed',            body: 'We notify you as soon as it arrives — usually within days.' },
]

const IconStar  = () => <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>
const CrossIcon = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/></svg>
const TickIcon  = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>

export default function TFNPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-10 pb-12 lg:pt-14 lg:pb-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">TFN Application</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" stroke="#DC2626" strokeWidth="1.2"/><path d="M6 3.5v3M6 8.5v.3" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#991B1B' }}>No TFN = 47% tax withheld from every payslip</span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Without a TFN, your employer takes 47% of every payslip.{' '}
              <span style={{ color: '#0B5240' }}>Sort it before your first shift.</span>
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '44ch', marginBottom: '12px', fontWeight: 300 }}>
              The correct tax rate for Working Holiday visa holders is 15%. We handle your TFN application so the right rate applies from day one.
            </p>
            <p style={{ fontSize: '13.5px', color: '#0B5240', fontWeight: 500, marginBottom: '28px' }}>
              Already started work without one? We can still fix it through your tax return.
            </p>

            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex justify-center w-full sm:w-auto"
              style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '280px' }}>
              Get my TFN sorted →
            </a>

            <div className="flex flex-wrap gap-x-4 gap-y-2" style={{ marginTop: '18px' }}>
              {['1,200+ WHV travellers helped', 'TPB registered oversight', '< 24h response'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.45)' }}>
                  <TickIcon />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COST OF NO TFN STRIP ─────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { stat: '47%', label: 'Tax withheld without a TFN', detail: 'Required by law until your TFN is on file with your employer.' },
              { stat: '15%', label: 'Correct WHM tax rate', detail: 'What you should be paying on a 417 or 462 visa on the first $45,000.' },
              { stat: '32%', label: 'Extra taken per payslip', detail: 'The difference between what you pay and what you should — recoverable in a tax return.' },
            ].map((item, i) => (
              <div key={i}>
                <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '6px' }}>{item.stat}</p>
                <p className="font-semibold text-white" style={{ fontSize: '13px', marginBottom: '5px' }}>{item.label}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, maxWidth: '22ch', margin: '0 auto' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">Why not apply through the ATO directly?</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
              You can — but mistakes cause rejections and delays.
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '15px', lineHeight: 1.65, maxWidth: '48ch' }}>
              Wrong visa type, incorrect details, or a mismatch with your passport — any of these delays your TFN and keeps you on 47% tax longer. We check everything before submission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '36px', alignItems: 'stretch' }}>
            {[
              { title: 'No mistakes, no rejection', body: 'We verify your details match the ATO requirements before submitting. Rejections and re-submissions add days.' },
              { title: 'Correct rate from day one', body: 'Once filed, your employer applies 15% — not 47%. Every shift without it costs you the difference.' },
              { title: 'No ATO portal or myGov needed', body: 'You send us your passport details and address. We handle the submission. No accounts required.' },
              { title: 'Confirmed in 1–5 business days', body: 'Most TFNs arrive within a few days. We notify you immediately and tell you what to do next.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)', height: '100%' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</p>
                <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '280px', margin: '0 auto' }}>
              Get my TFN sorted →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto" style={{ alignItems: 'stretch' }}>
            {[
              { tag: 'sorted before first shift', quote: "Got my TFN sorted before I started at the farm. Never had to worry about the wrong rate — it was 15% from day one.", name: "Liam", from: "UK · WHV 417", initials: "L", bg: "#DBEAFE", fg: "#1E40AF" },
              { tag: 'fixed wrong rate after the fact', quote: "I worked 3 months without a TFN. They sorted the TFN and then fixed the overpaid tax in my return. Got it all back.", name: "Emma", from: "Ireland · WHV 417", initials: "E", bg: "#FCE7F3", fg: "#9D174D" },
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

      {/* ── COMPARISON ───────────────────────────────────────────────────── */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="rounded-2xl" style={{ padding: '24px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>Apply yourself via ATO</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Must create a myGov account + verify identity', 'Easy to select wrong visa type — causes rejection', 'No one to check details before you submit', 'Delays keep you on 47% tax longer'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5"><CrossIcon /><p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item}</p></div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl" style={{ padding: '24px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>Use our service</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {['No myGov, no ATO portal — just WhatsApp', 'We confirm your visa type and match your passport', 'Every detail verified before submission', 'Get to 15% tax as fast as possible'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5"><TickIcon /><p className="font-semibold text-ink" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item}</p></div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full justify-center" style={{ height: '48px', fontSize: '14px' }}>
                Get my TFN sorted →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-to-apply" style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              One message. TFN sorted.
            </h2>
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
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '240px', margin: '0 auto' }}>
              Get my TFN sorted →
            </a>
            <p style={{ marginTop: '9px', fontSize: '12px', color: '#8AADA3' }}>Free to start · No commitment</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '12px' }}>
                TFN questions, answered.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.65, marginBottom: '24px' }}>
                Have a different question? Message us — we reply within 24 hours.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}>
                Ask us on WhatsApp →
              </a>
            </div>
            <div style={{ alignSelf: 'start' }}><Accordion items={faqs} /></div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#0B5240', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '22ch' }}>
            Every shift without a TFN costs you 32% extra. Sort it today.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '40ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            One WhatsApp message. No accounts, no ATO portal, no waiting in queues.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '54px', padding: '0 44px', fontSize: '16px', maxWidth: '280px', margin: '0 auto' }}>
            Get my TFN sorted →
          </a>
        </div>
      </section>

      <NextStep eyebrow="What's next?" heading="Already have your TFN?" body="If you worked in Australia this year, you may be owed a tax refund. A return corrects any overpaid tax and can be lodged from anywhere in the world." cta="Check my tax refund →" href="/tax-return" />
    </>
  )
}
