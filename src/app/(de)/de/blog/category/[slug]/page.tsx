import { SITE_URL } from '@/lib/constants'
import { catLabelDe } from '@/lib/category-labels'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryColor } from '@/app/(site)/blog/data'
import CategoryHero from '@/app/(site)/blog/[slug]/CategoryHero'
import { getGermanGuides, deCategoryMeta, getGermanCategoryMeta } from '../../data'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return deCategoryMeta.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = getGermanCategoryMeta(params.slug)
  if (!meta) return {}
  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      'Working Holiday Tax Australien',
      meta.category,
      'Working Holiday Visum',
      '417 Visum',
      '462 Visum',
      'WHM Steuer',
    ],
    alternates: {
      canonical: `${SITE_URL}/de/blog/category/${meta.slug}`,
      languages: {
        // EN uses a different slug for the Medicare category (medicare-and-other)
        'en-AU': `${SITE_URL}/blog/category/${meta.slug === 'medicare' ? 'medicare-and-other' : meta.slug}`,
        'de': `${SITE_URL}/de/blog/category/${meta.slug}`,
        // Japanese was missing here, which made the set non reciprocal
        'ja': `${SITE_URL}/ja/blog/category/${meta.slug}`,
        'x-default': `${SITE_URL}/blog/category/${meta.slug === 'medicare' ? 'medicare-and-other' : meta.slug}`,
      },
    },
    openGraph: {
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/de/blog/category/${meta.slug}`,
      siteName: 'Working Holiday Tax',
      locale: 'de_DE',
      type: 'website',
    },
    twitter: {
      images: [`${SITE_URL}/og-image.png`],
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
  }
}

/* ── The category introduction ────────────────────────────────────────────
   Same rewrite as the English category pages. A category page is the natural
   hub for its cluster and these were one sentence of throat clearing above a
   grid of cards. Two paragraphs per category that stand on their own: what
   the category covers, and who it is for, ending on what decides the answer
   rather than on how to do it yourself. Then one link to the service page
   that owns the cluster, which the localised category meta never carried.

   The copy lives here rather than in data.ts because another rewrite owns
   that file.                                                               */

interface CategoryIntro {
  paragraphs: string[]
  service: { path: string; label: string } | null
}

const CATEGORY_INTRO: Record<string, CategoryIntro> = {
  'tfn': {
    paragraphs: [
      'Die Tax File Number ist die Nummer, mit der die australische Steuerbehörde ATO dich identifiziert. Für die Nummer selbst fällt keine Behördengebühr an. Teuer sind die Wochen ohne sie, in denen 45 % statt 15 % einbehalten werden. Diese Ratgeber behandeln den Antrag selbst, das Arbeiten in der Wartezeit, Verzögerungen über die 28 Tage hinaus, verlorene Nummern, Ausweisdokumente und die Frage, ob ein zweites Visum eine neue Nummer braucht.',
      'Sie sind für jemanden geschrieben, der gerade angekommen ist, oder der einen Job angefangen hat und feststellt, dass 45 Prozent statt 15 Prozent vom Lohn abgehen. An der TFN selbst wird fast nie Geld gewonnen oder verloren.',
      'Entscheidend sind das Tax File Number Declaration Formular, das dir dein Arbeitgeber in der ersten Woche gibt, das 28 Tage Fenster, das mit deiner ersten Schicht beginnt und nicht mit dem Antrag, und ob dieser Arbeitgeber beim ATO als Working Holiday Maker Arbeitgeber registriert ist.',
    ],
    service: { path: '/de/tfn', label: 'Was wir bei TFN und Erklärungsformular übernehmen' },
  },
  'abn': {
    paragraphs: [
      'Eine Australian Business Number ist die Nummer, unter der du Rechnungen stellst, wenn ein Betrieb dich als Auftragnehmer bezahlt statt dich anzustellen. Diese Ratgeber behandeln Anmeldung und Abmeldung, GST und die Umsatzgrenze von 75.000 Dollar, Rechnungspflichten, Betriebsausgaben, Fahrtenbücher und wie Rechnungseinkommen neben Lohn in derselben Steuererklärung steht.',
      'Sie sind für alle, die von einer Farm, einer Lieferplattform oder einem Gastrobetrieb aufgefordert wurden, eine ABN zu holen, und für alle, die schon eine haben und nicht sicher sind, was sich dadurch ändert. Zwei Punkte tragen fast alles.',
      'Von einer ABN-Zahlung wird nichts einbehalten und es wird keine Super gezahlt, die Steuer kommt also am Jahresende auf einen Schlag statt nach und nach. Und eingestuft wird nach dem tatsächlichen Ablauf der Arbeit, nicht nach dem Wort auf dem Vertrag. Deshalb ist der Wechsel von der Gehaltsliste zur Rechnungsstellung bei gleicher Arbeit, gleichen Stunden und gleicher Weisung das Erste, was du hier lesen solltest.',
    ],
    service: { path: '/de/abn', label: 'Was wir machen, wenn du über eine ABN abgerechnet hast' },
  },
  'tax-return': {
    paragraphs: [
      'Das australische Steuerjahr läuft vom 1. Juli bis zum 30. Juni, und wer in diesem Zeitraum Einkommen hatte, gibt eine Steuererklärung ab. Diese Ratgeber behandeln Fristen und Strafen, Abzüge und Belege, den steuerlichen Wohnsitz, nachträgliche Korrekturen, die Abgabe nach der Heimreise und das, was die Höhe der Rückerstattung tatsächlich bestimmt.',
      'Das ist die Kategorie für jemanden, der entscheidet, ob er selbst einreicht oder es abgibt. Dein steuerlicher Wohnsitz, der von deinen eigenen Umständen abhängt und ordentlich geprüft werden muss. Die Wochen mit 45 Prozent Einbehalt, bevor die TFN bei der Lohnbuchhaltung war. Die Medicare Frage. Und die Abzüge, die zu deiner tatsächlichen Arbeit gehören. Nichts davon lässt sich in einer Tabelle nachschlagen.',
    ],
    service: { path: '/de/tax-return', label: 'Was wir bei jeder Steuererklärung durchgehen' },
  },
  'super': {
    paragraphs: [
      'Superannuation ist Geld, das dein Arbeitgeber zusätzlich zum Lohn in einen Rentenfonds einzahlt, ab dem 1. Juli 2026 mit 12 Prozent. Wenn du Australien endgültig verlässt, kannst du es über den Departing Australia Superannuation Payment zurückholen. Diese Ratgeber behandeln, wie Super entsteht, wie du den Stand prüfst, wie du verlorene Fonds findest, den DASP Ablauf, die nötigen Unterlagen und die Besteuerung der Auszahlung.',
      'Sie sind für alle am Ende einer Working Holiday, und besonders für alle, die bei mehreren Arbeitgebern gejobbt haben und vermuten, dass das Geld auf mehreren Konten liegt.',
      'Zwei Dinge entscheiden über Betrag und Dauer. Ob vor dem Antrag jedes Konto unter deiner TFN gefunden wurde, denn ein Antrag leert nur die Fonds, die du nennst. Und wann der Antrag im Verhältnis zum Ablauf deines Visums gestellt wird. Die Auszahlung selbst wird bei Working Holiday Makern mit 65 Prozent besteuert. Das ist gesetzlich festgelegt und nicht gestaltbar.',
    ],
    service: { path: '/de/superannuation', label: 'Was wir vor deiner Abreise mit deiner Super machen' },
  },
  'work-rights': {
    paragraphs: [
      'Working Holiday Maker haben in Australien dieselben Rechte am Arbeitsplatz wie alle anderen. Mindestlohn, Zuschläge, Pausen, Urlaub, kurzfristig abgesagte Schichten und Kündigung sind von der Fair Work Commission und vom Award deiner Branche geregelt. Diese Ratgeber behandeln, was dir zusteht, wie du einen Payslip liest, was du tust, wenn die Zahlen nicht stimmen, und welche Zertifikate manche Jobs verlangen.',
      'Sie sind für jemanden mitten in der Saison geschrieben, nicht am Ende. Das meiste hier ist keine Steuerfrage.',
      'Es steht auf dieser Seite, weil dasselbe Jahr zweimal auftaucht: Ein Arbeitgeber, der zu wenig gezahlt hat, bar gezahlt hat oder keine Super abgeführt hat, ist auch ein Arbeitgeber, dessen Einkommensmeldung nicht zu dem passt, was du tatsächlich bekommen hast, und das kommt bei der Steuererklärung wieder hoch.',
    ],
    service: { path: '/de/tax-return', label: 'Was wir bei jeder Steuererklärung durchgehen' },
  },
  'medicare-and-other': {
    paragraphs: [
      'Die Medicare Levy ist eine Abgabe von 2 Prozent auf das zu versteuernde Einkommen und wird standardmäßig abgezogen. Die meisten Inhaber von 417- und 462-Visa haben keinen Anspruch auf Medicare und hätten sie nie zahlen müssen. Diese Ratgeber behandeln, wer anspruchsberechtigt ist und wer nicht, die Länder mit Gesundheitsabkommen, wie die Befreiung beantragt wird, Krankenversicherung während des Aufenthalts und die übrigen Verwaltungsfragen.',
      'Bei 25.000 Dollar Einkommen sind das 500 Dollar. Die Befreiung gibt es nicht automatisch, und das ATO wendet sie nicht von sich aus an.',
      'Sie muss in der Erklärung geltend gemacht werden, und dafür brauchst du ein Medicare Entitlement Statement von Services Australia, das beantragt werden muss und in der Regel Wochen dauert. Ob die Befreiung für dich überhaupt in Frage kommt, entscheidet dein Pass.',
    ],
    service: { path: '/de/medicare', label: 'Was wir bei der Medicare Levy machen' },
  },
}

export default function GermanCategoryPage({ params }: Props) {
  const meta = getGermanCategoryMeta(params.slug)
  if (!meta) notFound()

  const allGuides = getGermanGuides()
  const articles = allGuides.filter(g => g.category === meta.category)
  const colors = getCategoryColor(meta.category)
  const intro = CATEGORY_INTRO[meta.slug]

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/de/blog/category/${meta.slug}`,
    inLanguage: 'de',
    isPartOf: { '@type': 'WebSite', name: 'Working Holiday Tax', url: `${SITE_URL}` },
    about: { '@type': 'Thing', name: meta.category },
    audience: { '@type': 'Audience', name: 'Working Holiday Visuminhaber in Australien (Subclass 417 und 462)' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/de/blog/${g.slug}`,
        name: g.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/de/blog` },
      { '@type': 'ListItem', position: 3, name: meta.category, item: `${SITE_URL}/de/blog/category/${meta.slug}` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'de',
    mainEntity: meta.faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '68px' }}>

        <section style={{ background: colors.bg }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 48px' }}>

            <nav aria-label="Brotkrümelnavigation" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4C6459', marginBottom: '16px' }}>
              <Link href="/de" style={{ color: 'inherit', textDecoration: 'none' }}>Startseite</Link>
              <span aria-hidden="true">/</span>
              <Link href="/de/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" style={{ color: colors.text }}>{catLabelDe(meta.category)}</span>
            </nav>

            <div className="inline-flex items-center gap-2" style={{ marginBottom: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.text, display: 'inline-block' }} aria-hidden="true" />
              <span style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: colors.text, textTransform: 'uppercase', fontWeight: 600 }}>
                {articles.length} {articles.length === 1 ? 'Artikel' : 'Artikel'}
              </span>
            </div>

            <h1 className="font-serif font-black" style={{ fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#080F0D', marginBottom: '12px', maxWidth: '720px' }}>
              {meta.title}
            </h1>

            <p style={{ fontSize: 'clamp(16px, 1.3vw, 17px)', lineHeight: 1.65, color: '#2A3C34', maxWidth: '640px', fontWeight: 400, marginBottom: '24px' }}>
              {meta.intro}
            </p>

            {meta.relatedServicePath && (
              <Link
                href={meta.relatedServicePath}
                className="topic-pill"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '100px', background: '#0B5240', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}
              >
                {meta.relatedServiceLabel} →
              </Link>
            )}

          </div>
        </section>

        {/* What this category covers, and who it is for */}
        {intro && (
          <section style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px 8px' }}>
            <h2 className="font-serif" style={{ fontSize: 'clamp(21px, 2.4vw, 26px)', fontWeight: 700, color: '#0B5240', letterSpacing: '-0.022em', lineHeight: 1.25, marginBottom: '16px' }}>
              Was diese Kategorie abdeckt und für wen sie ist
            </h2>
            {intro.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: '15.5px', color: '#2A3C34', lineHeight: 1.8, fontWeight: 400, marginBottom: '1rem', maxWidth: '68ch' }}>
                {p}
              </p>
            ))}
            {intro.service && (
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, fontWeight: 400, marginBottom: 0 }}>
                <Link
                  href={intro.service.path}
                  style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {intro.service.label}
                </Link>
              </p>
            )}
          </section>
        )}

        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 24px' }}>

          <h2 className="font-serif" style={{ fontSize: '20px', fontWeight: 700, color: '#080F0D', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Alle {catLabelDe(meta.category)}-Artikel ({articles.length})
          </h2>

          <div className="category-grid">
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/de/blog/${article.slug}`}
                className="category-card"
                style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0', background: '#fff', textDecoration: 'none', borderRadius: '16px', border: '1px solid #E2EFE9' }}
              >
                <div className="blog-card-hero" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
                  <CategoryHero category={article.category} title={article.title} slug={article.slug} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px 22px 22px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '13px',
                      padding: '4px 11px',
                      borderRadius: '100px',
                      background: colors.bg,
                      color: colors.text,
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      border: `1px solid ${colors.border}`,
                    }}>
                      {catLabelDe(article.category)}
                    </span>
                    <span style={{ color: '#CDE3DB' }}>·</span>
                    <span style={{ fontSize: '13px', color: '#4C6459' }}>{article.readTime} Min. Lesezeit</span>
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', lineHeight: 1.35, letterSpacing: '-0.015em', margin: 0 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#4C6459', lineHeight: 1.65, margin: 0, fontWeight: 400, flex: 1 }}>
                    {article.description}
                  </p>
                  <span style={{ fontSize: '14px', color: '#0B5240', fontWeight: 600, marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Mehr lesen <span className="read-arrow">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 20px 60px', borderTop: '1px solid #E2EFE9', marginTop: '48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '10.5px', fontWeight: 700, color: colors.text, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Häufige Fragen
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 700, color: '#0B5240', marginBottom: '0', letterSpacing: '-0.025em' }}>
              Häufig gestellte Fragen
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {meta.faq.map((f, i) => (
              <details key={i} className="faq-item" style={{ borderBottom: '1px solid #E2EFE9', padding: '16px 0', cursor: 'pointer' }}>
                <summary className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', letterSpacing: '-0.015em', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span style={{ flexShrink: 0, color: colors.text, fontSize: '20px', fontWeight: 300, lineHeight: 1 }}>+</span>
                </summary>
                {f.answer.split('\n\n').map((para, j) => (
                  <p key={j} style={{ fontSize: '15px', color: '#2A3C34', lineHeight: 1.75, fontWeight: 400, marginTop: '12px', marginBottom: 0 }}>
                    {para}
                  </p>
                ))}
              </details>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px 80px' }}>
          <h2 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', marginBottom: '16px', letterSpacing: '-0.015em' }}>
            Andere Kategorien
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {deCategoryMeta
              .filter(c => c.slug !== meta.slug)
              .map(c => {
                const cColors = getCategoryColor(c.category)
                return (
                  <Link
                    key={c.slug}
                    href={`/de/blog/category/${c.slug}`}
                    className="topic-pill"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '100px',
                      border: `1px solid ${cColors.border}`,
                      background: cColors.bg,
                      fontSize: '13px',
                      color: cColors.text,
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {catLabelDe(c.category)}
                  </Link>
                )
              })}
            <Link
              href="/de/blog"
              className="topic-pill"
              style={{ padding: '8px 16px', borderRadius: '100px', border: '1px solid #0B5240', background: '#0B5240', fontSize: '13px', color: '#fff', textDecoration: 'none', fontWeight: 600 }}
            >
              Alle Artikel →
            </Link>
          </div>
        </section>

      </main>
      <MobileCta href={waUrl({ topic: "guide", lang: "de" })} lang="de" topic="guide" />
    </>
  )
}
