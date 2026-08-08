import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { WA_URL, SITE_URL, AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

export const metadata: Metadata = {
  title: '当社について - 運営者情報 | Working Holiday Tax',
  description: `Working Holiday Taxは、${AGENT_NAME}（ABN ${AGENT_ABN}）によるサービスです。417・462ビザ保持者向けのTFN申請、タックスリターン、スーパーアニュエーション（DASP）、ABN関連業務は、すべて登録税理士（TAN ${AGENT_TPB}）の監督のもとで行われます。当社について、そして私たちの働き方をご紹介します。`,
  keywords: [
    'ワーホリ 税理士 オーストラリア',
    '登録税理士 オーストラリア バックパッカー',
    'Working Holiday Tax とは',
    'The Accounting Academy Pty Ltd',
    'Working Holiday Tax 怪しい',
    'Working Holiday Tax 口コミ',
    'ワーキングホリデービザ 税理士 オーストラリア',
    'TPB登録 税理士 バックパッカー',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'ja': `${SITE_URL}/ja/about`,
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'Working Holiday Taxについて - 運営者情報',
    description: `${AGENT_NAME}によるサービスです。業務はすべて、オーストラリアの登録税理士（TAN ${AGENT_TPB}）の監督のもとで行われ、ワーキングホリデービザの税務を専門としています。`,
    url: `${SITE_URL}/ja/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'ja_JP',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Working Holiday Taxについて - 運営者情報',
    description: `${AGENT_NAME}によるサービスです。業務はすべて、オーストラリアの登録税理士の監督のもとで行われ、ワーキングホリデービザの税務を専門としています。`,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Working Holiday Taxを運営しているのは誰ですか？',
    answer: `Working Holiday Taxは、${AGENT_NAME}（ABN ${AGENT_ABN}）によるサービスです。当サイトを通じて行われるタックスリターンの提出、アドバイス、DASP（スーパーアニュエーション）請求はすべて、登録税理士（Tax Agent Number ${AGENT_TPB}）の監督のもとで作成・提出されます。この登録内容は、Tax Practitioners Boardの公的登録簿（tpb.gov.au）でご確認いただけます。`,
  },
  {
    question: '登録税理士が私のタックスリターンを監督しますか？',
    answer: `はい。Working Holiday Taxを通じて提出されるすべての申告は、${AGENT_NAME}によるTax Practitioners Boardへの登録（TAN ${AGENT_TPB}）の監督のもとで作成・提出されます。登録税理士はTax Agent Services Act 2009およびTPBの行動規範に拘束され、専門職賠償責任保険にも加入しています。これは、無登録の「還付金シミュレーター」サイトにはない特徴です。`,
  },
  {
    question: '一般的な税務ではなく、ワーキングホリデーメーカーに特化しているのはなぜですか？',
    answer: 'ワーキングホリデービザの税務は、通常のオーストラリアのタックスリターンとは本質的に異なります。417・462ビザ特有の税率表、出国後に行うDASP（スーパーアニュエーション払い戻し）の手続き、国籍と社会保険協定によって適用が変わるメディケア・レヴィ免除、そして複数の雇用主や州にまたがるカジュアル・季節労働の収入など、独自の論点が数多くあります。当社はこのビザカテゴリーとその課題だけに焦点を当ててサービスを設計しており、通常の申告を単純に縮小したものとしては扱っていません。',
  },
  {
    question: 'オーストラリアに滞在中の方だけが対象ですか？',
    answer: 'いいえ。当社が行う業務の多く、特にスーパーアニュエーション（DASP）請求や過年度分のタックスリターンは、すでにオーストラリアを離れて帰国された後に発生しています。書類のアップロード、本人確認と署名の電子手続き、還付金のオーストラリアまたは海外の銀行口座への振込まで、すべてオンラインで完結します。',
  },
  {
    question: '対応している言語は何ですか？',
    answer: '英語・ドイツ語・日本語の3言語に対応しており、サイト全体だけでなく、直接のやり取りでも同じ言語でご対応します。単なる機械翻訳のページではありません。これら以外の言語を母語とする方でも、英語で問題なく対応いたします。オーストラリアの税務の仕組みを初めて知る方への説明にも慣れています。',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/ja/about#webpage`,
  url: `${SITE_URL}/ja/about`,
  name: 'Working Holiday Taxについて',
  inLanguage: 'ja',
  mainEntity: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.about-lead'] },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'ja',
  mainEntity: faqs.map(f => ({
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
    { '@type': 'ListItem', position: 2, name: '当社について', item: `${SITE_URL}/ja/about` },
  ],
}

export default function JapaneseAboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="パンくずリスト" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/ja" className="transition-colors hover:text-forest-500">ホーム</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">当社について</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 lg:items-center">
            <div className="max-w-[560px] lg:max-w-[700px]">
              <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
                <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                  当社について
                </span>
              </div>

              <h1 className="font-serif font-black text-ink"
                style={{ fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '10px' }}>
                たったひとつのビザに特化し、登録税理士の監督のもとで運営しています。
              </h1>

              <p className="about-lead font-semibold text-ink"
                style={{ fontSize: 'clamp(14px,1.5vw,17px)', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.4 }}>
                Working Holiday Taxは、{AGENT_NAME}（ABN {AGENT_ABN}）によるサービスです。すべての申告、請求、アドバイスは、登録税理士（Tax Agent Number {AGENT_TPB}）の監督のもとで作成されます。
              </p>

              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.65, color: 'rgba(10,15,13,0.58)', maxWidth: '46ch' }}>
                当社が扱うのは一つだけです。サブクラス417または462のワーキングホリデービザ保持者を対象とした、税金、TFN、ABN、スーパー、メディケアに関するご相談です。オーストラリア滞在中の方はもちろん、すでに帰国された方にも対応しています。
              </p>

              <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4" style={{ marginTop: '24px', marginBottom: '20px', maxWidth: '480px' }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex justify-center"
                  style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                  お気軽にご相談ください →
                </a>
                <Link href="/ja/contact" className="inline-flex btn-ghost-dark justify-center"
                  style={{ height: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                  お問い合わせ →
                </Link>
              </div>
            </div>

            <div className="max-w-[280px] mx-auto w-full lg:max-w-none">
              <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '532/745', border: '1.5px solid #E2EFE9', boxShadow: '0 20px 40px -20px rgba(11,82,64,0.25)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/about/team-office.jpg" alt="協力して働く若いプロフェッショナルたち" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS STRIP (all independently verifiable, no invented stats) ── */}
      <section className="bg-white" style={{ borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-5 lg:py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { stat: <GoogleRating variant="number" lang="ja" />, label: 'Google評価' },
              { stat: <GoogleRating variant="count" lang="ja" />, label: ' ' },
              { stat: '2020', label: '運営開始' },
              { stat: '3', label: '対応言語：日本語・英語・ドイツ語' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-serif" style={{ fontSize: 'clamp(20px, 3.4vw, 26px)', fontWeight: 800, color: '#0B5240', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '4px' }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: '11px', color: '#587066', letterSpacing: '0.02em' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center" style={{ fontSize: '11.5px', color: 'rgba(10,15,13,0.4)', marginTop: '14px' }}>
            業務はすべて登録税理士の監督のもとで行われており、その登録内容はTax Practitioners Boardの公的登録簿{' '}
            <a href="https://www.tpb.gov.au/public-register" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>tpb.gov.au</a>{' '}
            でご確認いただけます。
          </p>
        </div>
      </section>

      {/* ── WHAT "REGISTERED TAX AGENT" ACTUALLY MEANS ─────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[720px] mx-auto">
            <span className="section-label">なぜ重要なのか</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,32px)', lineHeight: 1.12, letterSpacing: '-0.025em', margin: '10px 0 18px' }}>
              「登録税理士」が本当に意味すること
            </h2>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              オーストラリアでは、Tax Practitioners Board（TPB）に登録された税理士だけが、報酬を得て他人のタックスリターンを作成・提出することを法律上認められています。登録には、関連する資格・実務経験、継続的な適格性審査（fit-and-proper-person test）、専門職賠償責任保険への加入、そしてTax Agent Services Act 2009に基づくTPBの行動規範の遵守が求められ、違反があれば登録の停止または取り消しもあり得ます。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              バックパッカー向けの「即時還付金シミュレーター」サイトの多くは、実際には登録税理士ではありません。あなたの情報を他社へ渡すだけのリード獲得フォームであったり、TPBの監督の外で活動する無登録の申告代行業者であったりします。Working Holiday Taxは、{AGENT_NAME}のTPB登録（TAN {AGENT_TPB}）のもとで運営されており、サイトを通じて行われるすべての申告、DASP請求、アドバイスは、その登録のもとで作成・提出されます。見えないところで外部に丸投げすることはありません。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              だからといって、他社より大きな還付金を得られるという意味ではありません。正当な税理士であれば誰も、それを約束することはできませんし、当社も約束しません。意味するのは、申告が正しく作成されること、アドバイスが実在する規制機関に対して説明責任を負っていること、そして万が一問題が生じた場合に相談できる先があるということです。
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY ONE VISA CATEGORY ────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '32px' }}>
            <span className="section-label center">専門分野</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px' }}>
              ワーキングホリデーメーカーだけに特化する理由
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-5xl mx-auto">
            {[
              { t: '独自の税率表', d: '417・462ビザ向けの税率表は、45,000ドルまで1ドル目から15%が適用される仕組みで、一般的な税務ソフトが前提とする居住者向けの税率表とは異なります。' },
              { t: '出国後のDASP', d: 'スーパーアニュエーションは、オーストラリアを出国しビザが失効した後にのみ利用できる特定の手続き（DASP）を通じて払い戻しを請求します。一般的な会計士がこれを扱うことはほとんどありません。' },
              { t: '国籍で変わるメディケア', d: 'メディケア・レヴィ免除が適用されるかどうかは、パスポート（国籍）とオーストラリアの社会保険協定によって決まります。一般的なチェックリストでは見落とされやすいポイントです。' },
              { t: '季節労働・複数雇用主の収入', d: 'ファーム、飲食業、配達の仕事など、1年の間に複数の州・雇用主にまたがる収入がある場合、そのすべてを正しく突き合わせて申告する必要があります。' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F7FBF9', border: '1.5px solid #E2EFE9' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px' }}>{c.t}</p>
                <p className="font-light" style={{ fontSize: '12.5px', color: 'rgba(10,15,13,0.6)', lineHeight: 1.7 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">実際の声</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              ワーホリ参加者からのお声
            </h2>
          </div>
          <GoogleReviews lang="ja" />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
            <div className="text-center">
              <span className="section-label center">よくあるご質問</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                当社についてのご質問
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                他にご質問があれば、お気軽に直接メッセージをお送りください。
              </p>
            </div>
            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="準備ができたら"
        heading="受け取れる金額を確認しましょう"
        body="無料の計算ツールをお試しいただくか、直接メッセージをお送りください。あなたの状況に何が当てはまるか具体的にご案内します。"
        cta="計算ツールを試す →"
        href="/ja/calculator"
      />

      <MobileCta href={WA_URL} lang="ja" />
    </>
  )
}
