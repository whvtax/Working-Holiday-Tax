import type { Metadata } from 'next'
import { WA_URL, EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact — Working Holiday Tax',
  description: 'Send us one message. We reply within 24 hours and tell you exactly what you are owed. Free first conversation, no commitment.',
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-14 pb-14 md:pt-20 md:pb-20 text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(11,82,64,0.65)' }}>Get in touch</span>
          </div>

          <h1 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px', maxWidth: '20ch' }}>
            Send us one message.{' '}
            <span style={{ color: '#0B5240' }}>We&apos;ll tell you exactly what you&apos;re owed.</span>
          </h1>

          <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '44ch', margin: '0 auto 12px', fontWeight: 300 }}>
            No forms, no commitment, no accounts to create. Tell us your visa type, how long you worked, and what you need. First conversation is always free.
          </p>

          <div className="rounded-xl mx-auto" style={{ padding: '14px 20px', background: '#EAF6F1', border: '1px solid #C8EAE0', maxWidth: '44ch', marginBottom: '28px' }}>
            <p style={{ fontSize: '13.5px', color: '#0B5240', lineHeight: 1.6 }}>
              <strong>To get a fast answer, include:</strong> your visa subclass (417 or 462), the year(s) you worked, and what you need help with — TFN, tax return, super, or ABN.
            </p>
          </div>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '56px', padding: '0 44px', fontSize: '16px', borderRadius: '100px', maxWidth: '320px', margin: '0 auto' }}>
            Message us on WhatsApp →
          </a>
        </div>
      </section>

      {/* ── CONTACT OPTIONS ──────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '72px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-2xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* WhatsApp — dominant */}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between w-full rounded-2xl transition-all hover:shadow-md group"
              style={{ background: '#ffffff', border: '2px solid #C8EAE0', boxShadow: '0 2px 12px rgba(11,82,64,0.08)', padding: '22px 24px' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#22C55E' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.38 1.24 4.8L2 22l5.36-1.22A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="white"/>
                    <path d="M17.5 14.9c-.22.62-.65 1.13-1.22 1.47-.44.26-.95.4-1.47.4-.38 0-.75-.06-1.12-.19-1.25-.43-2.42-1.14-3.42-2.14s-1.71-2.17-2.14-3.42c-.26-.79-.2-1.64.16-2.38.24-.5.62-.93 1.1-1.22.18-.11.38-.17.59-.17h.42c.2 0 .44.08.6.53l.73 2.02c.1.29.04.62-.16.85l-.41.47c-.13.15-.15.36-.06.54.45.87 1.08 1.62 1.86 2.2.49.36 1.04.64 1.63.84.18.06.38.02.52-.11l.47-.42c.22-.2.54-.27.83-.17l2 .72c.44.16.53.4.53.6v.42c0 .18-.04.36-.11.52z" fill="#22C55E"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2" style={{ marginBottom: '3px' }}>
                    <p className="font-semibold text-ink" style={{ fontSize: '15px', letterSpacing: '-0.01em' }}>WhatsApp</p>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#0B5240', background: '#EAF6F1', padding: '2px 8px', borderRadius: '100px', border: '1px solid #C8EAE0' }}>Recommended</span>
                  </div>
                  <p className="font-light text-muted" style={{ fontSize: '13px' }}>Real person · We reply within 24 hours · No bots</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-forest-500 group-hover:gap-3 transition-all flex-shrink-0">
                <span className="font-medium hidden sm:block" style={{ fontSize: '13px' }}>Message us</span>
                <ArrowIcon />
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${EMAIL}`}
              className="flex items-center justify-between w-full rounded-2xl transition-all hover:shadow-md group"
              style={{ background: '#ffffff', border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04)', padding: '20px 24px' }}>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="#0B5240" strokeWidth="1.3"/>
                    <path d="M1.5 6.5l6.6 4.2a1.5 1.5 0 001.8 0L16.5 6.5" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '15px', letterSpacing: '-0.01em', marginBottom: '3px' }}>Email</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px' }}>info@workingholidaytax.com.au · Reply within 1 business day</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-forest-500 group-hover:gap-3 transition-all flex-shrink-0">
                <span className="font-medium hidden sm:block" style={{ fontSize: '13px' }}>Send email</span>
                <ArrowIcon />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '72px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '44px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              What happens after you message us.
            </h2>
          </div>

          <div className="max-w-xl mx-auto">
            {[
              { n: '1', title: 'We review your situation', body: 'We ask a few questions about your visa, how long you worked, and what you need.' },
              { n: '2', title: 'We tell you exactly what we can do', body: 'Clear explanation of the service, what it involves, and what it costs. No hidden fees.' },
              { n: '3', title: 'You decide whether to proceed', body: 'No pressure. If you want to go ahead, we send a short document checklist and get started.' },
            ].map((item, i, arr) => (
              <div key={i} className="flex gap-5" style={{ paddingBottom: i < arr.length - 1 ? '28px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ background: '#0B5240', fontSize: '13px' }}>{item.n}</div>
                  {i < arr.length - 1 && <div className="flex-1 w-px mt-2" style={{ minHeight: '24px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop: '4px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px', letterSpacing: '-0.01em' }}>{item.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.65 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '36px', paddingTop: '32px', borderTop: '1px solid #E2EFE9' }}>
            <p style={{ fontSize: '14px', color: '#587066', marginBottom: '6px' }}>
              <strong className="text-ink">Is there a cost to ask?</strong> No. The first conversation is always free.
            </p>
            <p style={{ fontSize: '14px', color: '#587066' }}>
              <strong className="text-ink">Response time:</strong> Within 24 hours on WhatsApp. Usually faster during business hours (AEST).
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#0B5240', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '22ch' }}>
            Start with a quick check. Find out what you&apos;re owed.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '40ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            One message. Free to ask. We reply with exactly what we can do for you.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '54px', padding: '0 44px', fontSize: '16px', maxWidth: '320px', margin: '0 auto' }}>
            Message us on WhatsApp →
          </a>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2" style={{ marginTop: '14px' }}>
            {['Free to check', 'No commitment', 'Reply within 24 hours'].map((t, i) => (
              <span key={i} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.38)' }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
