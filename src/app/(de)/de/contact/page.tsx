import type { Metadata } from 'next'
import Link from 'next/link'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/(site)/HomeWa'
import { waUrl } from '@/lib/wa'
import { WA_NUMBER, EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kontakt: es antwortet ein Mensch',
  description: 'Schreib uns auf WhatsApp. Es antwortet ein echter Mensch, meist in etwa einer Stunde. Kein myGov, kein australischer Ausweis, keine Payslips nötig.',
  keywords: [
    'Kontakt Working Holiday Tax',
    'Backpacker Steuer Hilfe',
    'Working Holiday Steuer Hilfe Deutsch',
    'Working Holiday Visum Hilfe',
    'TFN Hilfe Deutsch',
    'Steuerrückerstattung Australien Hilfe',
    'Steuererklärung Australien Hilfe Deutsch',
    'WhatsApp Hilfe australische Steuer',
    'Steuerrückerstattung Australien aus Deutschland',
    'Super Auszahlung Australien Hilfe Deutsch',
    'Working Holiday Maker Hilfe Deutschland',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/contact`,
    languages: {
      'en-AU': `${SITE_URL}/contact`,
      'de': `${SITE_URL}/de/contact`,
      'ja': `${SITE_URL}/ja/contact`,
      'x-default': `${SITE_URL}/contact`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'Kontakt: Working Holiday Tax',
    description: 'WhatsApp ist der schnellste Weg zu uns. Es antwortet ein echter Mensch, während der Geschäftszeiten meist in etwa einer Stunde.',
    url: `${SITE_URL}/de/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'de_DE',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Kontakt: Working Holiday Tax',
    description: 'Schreib uns auf WhatsApp. Es antwortet ein echter Mensch, meist in etwa einer Stunde.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'contact', lang: 'de' })

/** Die vier Dinge, die Leute davon abhalten, die Nachricht abzuschicken. */
const blockers: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: 'Könnt ihr mir helfen, wenn ich Australien schon verlassen habe?',
    a: 'Ja, und ein großer Teil unserer Arbeit ist genau das. Eine Erklärung für ein abgeschlossenes Jahr lässt sich von überall einreichen, und Superannuation kannst du erst beantragen, nachdem du ausgereist und dein Visum abgelaufen ist.\n\nEins vorweg: Das ATO kann eine Steuerrückerstattung nur auf ein australisches Bankkonto zahlen, deine Super dagegen auch ins Ausland. Sag uns also Bescheid, wenn dein australisches Konto schon zu ist.',
  },
  {
    q: 'Brauche ich ein myGov-Konto?',
    a: 'Nein. Du musst dich nie bei myGov einloggen, keinen australischen Ausweis verknüpfen und nicht herausfinden, welches Formular welches ist. Wir haben direkt mit dem ATO zu tun.\n\nWenn du es schon versucht hast und bei der Identitätsprüfung hängen geblieben bist, ändert das nichts.',
  },
  {
    q: 'Brauche ich meine Payslips?',
    a: 'Nein, und du musst vor der Nachricht nichts zusammensuchen. Was deine Arbeitgeber einbehalten und gemeldet haben, sehen wir über das ATO, wenn du also gar nichts mehr hast, schreib uns trotzdem.',
    link: { href: '/de/about', label: 'Warum wir bei den ATO-Daten anfangen' },
  },
  {
    q: 'Ist das hier seriös?',
    a: 'Deine Steuererklärung wird von einem registrierten Steuerberater geprüft und freigegeben, bevor sie beim ATO eingereicht wird. Die Bedingungen, denen du zustimmen würdest, stehen vollständig in unserer Mandantenvereinbarung, und die Bewertungen in unserem Google-Profil stammen von Working Holiday Makern, mit denen wir tatsächlich gearbeitet haben.',
    link: { href: '/de/client-agreement', label: 'Mandantenvereinbarung lesen' },
  },
]

const FAQS = [
  {
    question: 'Wie schnell antwortet ihr?',
    answer: 'Während der Geschäftszeiten, Montag bis Freitag von 9 bis 18 Uhr AEST oder AEDT, antworten wir meist in etwa einer Stunde. Außerhalb dieser Zeiten melden wir uns am nächsten Werktagmorgen. Muss deine Frage erst geprüft werden, sagen wir dir das sofort.',
  },
  {
    question: 'Kostet es etwas, eine Frage zu stellen?',
    answer: 'Fragen kostet nichts, und du kannst so viel fragen wie du willst, bevor du dich entscheidest. Der Service hat ein pauschales Honorar, niemals einen Prozentsatz deiner Rückerstattung, bestätigt per WhatsApp, bevor die Arbeit beginnt.',
  },
  {
    question: 'In welcher Sprache bekomme ich eine Antwort?',
    answer: 'In der, in der du uns schreibst. Deutsch, Englisch oder die Sprache, in der du deine Situation am besten erklären kannst, und genau so kommt die Antwort zurück.',
  },
  {
    question: 'Muss ich sofort Unterlagen schicken?',
    answer: 'Nein. Schick erst mal nur die Frage und sonst nichts. Wir beantworten sie, und wenn sich Arbeit lohnt, sagen wir dir vorher, welche und was sie kostet.\n\nUnterlagen kommen später, und dann sagen wir dir genau, welche und wie du sie sicher schickst.',
  },
  {
    question: 'Was ist, wenn ich keine Rückerstattung bekomme?',
    answer: 'Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf. Nicht jedes Working-Holiday-Jahr führt zu einer Rückerstattung, und wenn deines vermutlich keine bringt, sagen wir dir das früh, statt den Auftrag anzunehmen und zu hoffen.',
  },
  {
    question: 'Könnt ihr mir aus Deutschland, Österreich oder der Schweiz helfen?',
    answer: 'Ja, und von dort schreiben uns die meisten deutschsprachigen Kunden, sobald sie wieder zu Hause sind. Eine australische Steuererklärung, ein Superannuation-Antrag und alles, was beim ATO noch offen ist, lässt sich aus einem anderen Land erledigen, vollständig online.',
  },
]

const contactPageLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/de/contact#webpage`,
  url: `${SITE_URL}/de/contact`,
  name: 'Kontakt: Working Holiday Tax',
  description: 'Schreib uns auf WhatsApp. Es antwortet ein echter Mensch, während der Geschäftszeiten meist in etwa einer Stunde.',
  inLanguage: 'de',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.contact-lead'] },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    email: EMAIL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: `+${WA_NUMBER}`,
        email: EMAIL,
        areaServed: 'AU',
        availableLanguage: ['de', 'en', 'ja'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Kontakt', item: `${SITE_URL}/de/contact` },
  ],
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'de',
  mainEntity: [...blockers.map(b => ({ question: b.q, answer: b.a })), ...FAQS.map(f => ({ question: f.question, answer: f.answer }))]
    .map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
}

const answerStyle = { fontSize: '15px', lineHeight: 1.7, color: '#2A3C34', fontWeight: 300 } as const

export default function GermanContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-5 pb-9 lg:pt-12 lg:pb-12">

          <nav aria-label="Brotkrümelnavigation" className="mb-5 lg:mb-6">
            <ol className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459' }}>
              <li><Link href="/de" className="contact-breadcrumb-link">Startseite</Link></li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Kontakt</li>
            </ol>
          </nav>

          <div className="max-w-[560px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-3 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                Kontakt
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(26px,5vw,42px)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Schreib uns auf WhatsApp
            </h1>

            <p className="contact-lead mx-auto"
              style={{ fontSize: 'clamp(16px,1.4vw,17px)', lineHeight: 1.6, color: '#2A3C34', maxWidth: '44ch', marginBottom: '22px' }}>
              Ein echter Mensch liest deine Nachricht und antwortet, während der Geschäftszeiten meist in etwa einer Stunde.
            </p>

            <WaLink href={WA} position="hero" topic="contact" lang="de"
              className="btn-primary w-full sm:w-auto inline-flex justify-center"
              style={{ minHeight: '56px', padding: '0 34px', fontSize: '16px', borderRadius: '100px', minWidth: '270px' }}>
              WhatsApp öffnen →
            </WaLink>

            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              Montag bis Freitag, 9 bis 18 Uhr
            </p>
          </div>
        </div>
      </section>

      {/* ── DIE VIER FRAGEN VOR DER NACHRICHT ───────────────────────────── */}
      <section className="py-11 lg:py-16" style={{ background: '#F5F9F7', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <span className="section-label">Bevor du fragst</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 20px' }}>
              Die vier Dinge, die alle zuerst prüfen
            </h2>

            <div className="flex flex-col" style={{ gap: '12px' }}>
              {blockers.map((b, i) => (
                <div key={i} className="rounded-2xl" style={{ padding: '18px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
                  <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', lineHeight: 1.35, letterSpacing: '-0.015em', marginBottom: '8px' }}>
                    {b.q}
                  </h3>
                  {b.a.split('\n\n').map((para, j, all) => (
                    <p key={j} style={{ ...answerStyle, marginBottom: j === all.length - 1 ? 0 : '10px' }}>{para}</p>
                  ))}
                  {b.link && (
                    <Link href={b.link.href}
                      style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', fontSize: '14.5px', fontWeight: 500, color: '#0B5240', textDecoration: 'underline' }}>
                      {b.link.label} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ANDERE WEGE, BEWUSST ZWEITRANGIG ────────────────────────────── */}
      <section className="py-11 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[560px] mx-auto">
            <span className="section-label">Andere Wege</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 16px' }}>
              Falls WhatsApp für dich nicht passt
            </h2>
            <p style={{ ...answerStyle, marginBottom: '20px' }}>
              E-Mail geht auch, die Social-Media-Kanäle ebenfalls, beides ist nur langsamer.
            </p>

            <address style={{ fontStyle: 'normal' }}>
              <a href={`mailto:${EMAIL}?subject=Steuerfrage%20von%20der%20Website`} className="contact-option-card">
                <div className="contact-option-icon" style={{ background: '#fff', border: '1px solid #E2EFE9' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="#0B5240" strokeWidth="1.8" />
                    <path d="M2.5 6.5L12 13.5l9.5-7" stroke="#0B5240" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <p className="contact-option-label">E-Mail</p>
                  <p className="contact-option-detail" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{EMAIL}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="contact-option-arrow">
                  <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <div className="grid grid-cols-2 gap-3" style={{ marginTop: '12px' }}>
                <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className="contact-option-card-small">
                  <div className="contact-option-icon-small" style={{ background: 'linear-gradient(45deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)', border: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <span className="contact-option-label-small">Instagram</span>
                </a>
                <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className="contact-option-card-small">
                  <div className="contact-option-icon-small" style={{ background: '#010101', border: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z" fill="white" />
                    </svg>
                  </div>
                  <span className="contact-option-label-small">TikTok</span>
                </a>
              </div>
            </address>

            <div className="contact-hours-block">
              <p className="contact-hours-title">
                <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5" style={{ background: '#2FA880' }} aria-hidden="true" />
                Geschäftszeiten
              </p>
              <p className="contact-hours-detail" style={{ fontSize: '14px', color: '#4C6459' }}>
                Montag bis Freitag, 9 bis 18 Uhr
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-7">
            <span className="section-label center">Häufige Fragen</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Alles andere, was gefragt wird
            </h2>
          </div>

          <div className="flex flex-col" style={{ gap: '6px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="contact-faq" className="contact-faq-item" style={{ background: '#fff' }}>
                <summary className="contact-faq-summary" style={{ minHeight: '44px' }}>
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                {f.answer.split('\n\n').map((para, j) => (
                  <p key={j} className="contact-faq-answer" style={{ fontSize: '15px' }}>{para}</p>
                ))}
              </details>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ── ABSCHLUSS-CTA ───────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240', paddingTop: '48px', paddingBottom: '56px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[520px] mx-auto text-center">
            <p className="font-medium uppercase" style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', marginBottom: '12px' }}>
              Wann immer du so weit bist
            </p>
            <h2 className="font-serif font-black text-white" style={{ fontSize: 'clamp(21px,2.8vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '12px' }}>
              Schick einfach die Frage. Mehr ist der erste Schritt nicht.
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '24px', fontWeight: 300 }}>
              Wo du gearbeitet hast, ungefähr wann, und ob du Australien schon verlassen hast. Das reicht uns, um dir zu sagen, was sich zu verfolgen lohnt.
            </p>
            <WaLink href={WA} position="footer" topic="contact" lang="de"
              className="btn-primary w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', minWidth: '260px' }}>
              Schreib uns auf WhatsApp →
            </WaLink>
          </div>
        </div>
      </section>

      <MobileCta href={WA} lang="de" topic="contact" />
    </>
  )
}
