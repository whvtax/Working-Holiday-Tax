import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import BackButton from './BackButton'

export const metadata: Metadata = {
  title: '税務上の居住区分｜ワーキングホリデー オーストラリア',
  description: 'オーストラリアの税務居住区分（NDA国を含む）と、ビザの種類（417/462）が税率にどう影響するかを解説。日本人ワーホリも該当する可能性があります。',
  keywords: [
    '税務 居住 オーストラリア',
    'ワーキングホリデー 税務居住',
    '417ビザ 税務居住',
    '462ビザ 税務居住',
    'WHM 税務居住',
    'NDA国 オーストラリア 税金',
    'オーストラリア 税務居住者 税率',
    'WHV 非居住者 税金',
    '日本 ワーホリ 税務居住',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/tax-residency`,
    languages: {
      'en-AU': `${SITE_URL}/tax-residency`,
      'de': `${SITE_URL}/de/tax-residency`,
      'ja': `${SITE_URL}/ja/tax-residency`,
      'x-default': `${SITE_URL}/tax-residency`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/tax-residency`,
    siteName: 'Working Holiday Tax',
    title: '税務上の居住区分｜ワーキングホリデー オーストラリア',
    description: '税務居住区分と、ビザの種類が税率に与える影響を理解しましょう。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: '税務上の居住区分｜ワーキングホリデー オーストラリア',
    description: '税務居住区分と、ビザの種類が税率に与える影響について。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WHV_ROWS = [
  ['$0 - $45,000',         '15%'],
  ['$45,001 - $135,000',   '$6,750 + 30%'],
  ['$135,001 - $190,000',  '$33,750 + 37%'],
  ['$190,001+',            '$54,100 + 45%'],
]

const RESIDENT_ROWS = [
  ['$0 - $18,200',         '0%'],
  ['$18,201 - $45,000',    '16%'],
  ['$45,001 - $135,000',   '$4,288 + 30%'],
  ['$135,001 - $190,000',  '$31,288 + 37%'],
  ['$190,001+',            '$51,638 + 45%'],
]

const NDA_COUNTRIES = ['イギリス', 'ドイツ', '日本', 'チリ', 'フィンランド', 'イスラエル', 'ノルウェー', 'トルコ']

const CONDITIONS = [
  'NDA国のパスポートを所持していること：',
  '通常の居住地がオーストラリアにあること。',
  'オーストラリアに居住する意思があること。',
  '税年度内に合計183日以上オーストラリアに滞在すること。',
]

const FAQS = [
  {
    question: '税務上の居住区分とは何ですか？',
    answer: '税務上の居住区分は、オーストラリアでの所得にどの税率が適用されるかを決定します。3つのカテゴリーがあります：非居住者、ワーキングホリデーメーカー（417/462ビザ）、オーストラリア税務居住者。それぞれ異なる税率と控除額が適用されます。',
  },
  {
    question: '日本人ですが、税務居住者として扱われる可能性はありますか？',
    answer: 'はい。日本はNDA国に含まれているため、居住条件（オーストラリアでの実際の居住、滞在183日以上など）を満たせば、税務居住者として扱われる可能性があります。これにより、年間で大幅な税金節約につながる可能性があります。詳しくはご相談ください。',
  },
  {
    question: '学生ビザ（500）保持者の場合はどうなりますか？',
    answer: '学生ビザ（500）保持者は通常、オーストラリア税務居住者として扱われます。つまり、$18,200の非課税枠と低い限界税率が適用されます。',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'ja',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: '税務上の居住区分', item: `${SITE_URL}/ja/tax-residency` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'オーストラリアのワーキングホリデービザ保持者向け税務居住区分',
  description: 'オーストラリアの税務居住区分と、ビザの状態が税率に与える影響を解説。',
  url: `${SITE_URL}/ja/tax-residency`,
  inLanguage: 'ja',
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

function TaxTable({ label, rows, highlight }: { label: string; rows: string[][]; highlight?: boolean }) {
  return (
    <div className="taxres-table-card" style={highlight ? { borderColor: '#0B5240', boxShadow: '0 8px 20px -8px rgba(11, 82, 64, 0.18)' } : {}}>
      <h3 className="taxres-table-title">
        {label}
      </h3>
      <table className="taxres-table">
        <thead>
          <tr>
            <th>課税所得</th>
            <th>その所得にかかる税</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function JapaneseTaxResidencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-8 pb-6 lg:pt-12 lg:pb-10">

            {/* Breadcrumbs */}
            <nav aria-label="パンくずリスト" className="mb-5 lg:mb-6">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li>
                  <Link href="/ja" style={{ color: '#587066' }}>ホーム</Link>
                </li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>税務上の居住区分</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: '14px', maxWidth: '24ch' }}>
                <span style={{ color: '#0B5240' }}>税務上の居住区分</span>を理解しよう
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.7, color: '#0B5240', maxWidth: '40ch' }}>
                ワーキングホリデービザでも、<strong>税務上</strong>はオーストラリアの居住者になれる可能性があります。これは「オーストラリア人になる」という意味ではありません。
              </p>
            </div>
          </div>
        </section>

        {/* ── TAX TABLES COMPARISON ─────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '50px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">

            <div className="taxres-savings-box" style={{ marginBottom: '24px', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div>
                <p className="taxres-savings-heading">節約の可能性</p>
                <p className="taxres-savings-body">
                  オーストラリア税務居住者として分類された場合、$45,000の所得で最大<strong>$2,462の還付</strong>を受けられます。タックスリターン時に、対象資格を確認します。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <TaxTable label="ワーキングホリデーメーカー（417/462）" rows={WHV_ROWS} />
              <TaxTable label="オーストラリア税務居住者" rows={RESIDENT_ROWS} highlight />
            </div>
          </div>
        </section>

        {/* ── RESIDENCY CONDITIONS ──────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">

            <div className="text-center mb-8">
              <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
                居住者の分類
              </p>
              <h2 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: '10px', maxWidth: '30ch' }}>
                <strong>税務上</strong>のオーストラリア居住者になれますか？
              </h2>
              <p className="font-light mx-auto" style={{ fontSize: '14.5px', color: '#587066', lineHeight: 1.75, maxWidth: '54ch' }}>
                ワーキングホリデービザ保持者は、以下のすべての条件を満たす場合、オーストラリア税務居住者として分類される可能性があります：
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="flex flex-col gap-3 mb-6">
                {CONDITIONS.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">
                      {i === 0 ? `${c}${NDA_COUNTRIES.join('、')}。` : c}
                    </p>
                  </div>
                ))}
              </div>

              <div className="taxres-notes">
                <p>📅 オーストラリアの税年度は<strong>7月1日から6月30日</strong>までです。</p>
                <p>🎓 学生ビザ（500）保持者は通常、税務居住者として扱われます。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BACK TO FORM (above questions) ─────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
          <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <BackButton />
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
                よくある質問
              </p>
              <h2 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                税務居住に関するご質問
              </h2>
            </div>

            <div className="flex flex-col" style={{ gap: '4px' }}>
              {FAQS.map((f, i) => (
                <details key={i} name="ja-taxres-faq" className="contact-faq-item">
                  <summary className="contact-faq-summary">
                    <span style={{ flex: 1 }}>{f.question}</span>
                    <span className="contact-faq-plus" aria-hidden="true">+</span>
                  </summary>
                  <p className="contact-faq-answer">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── BACK TO FORM ─────────────────────────────────────────────────── */}
        <section style={{ background: '#0B5240', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[640px] mx-auto px-5 md:px-8 lg:px-12 text-center reveal">
            <p className="font-light mx-auto" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: '20px', maxWidth: '44ch' }}>
              税務居住について理解できたら、タックスリターンフォームの記入を続けましょう。
            </p>
            <BackButton />
          </div>
        </section>

      </main>
    </>
  )
}
