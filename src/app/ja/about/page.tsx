import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { WA_URL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: '当社について - 運営者情報 | Working Holiday Tax',
  description: '当社のお客様はただ一種類、417・462ビザのワーキングホリデーメーカーだけです。タックスリターン、TFN、スーパー（DASP）、ABN - 素早い返信、完全オンライン、あなたの言語で対応します。',
  keywords: [
    'ワーホリ 税金 専門 オーストラリア',
    'バックパッカー 税金 サポート',
    'Working Holiday Tax とは',
    'Working Holiday Tax 怪しい',
    'Working Holiday Tax 口コミ',
    'ワーホリ 税金 専門家 417 462',
    'ワーキングホリデービザ 税金 相談',
    'バックパッカー タックスリターン 日本語',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'de': `${SITE_URL}/de/about`,
      'ja': `${SITE_URL}/ja/about`,
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'Working Holiday Taxについて - 運営者情報',
    description: 'お客様はワーキングホリデーメーカーだけ。複数の雇用主、ホステルの住所、年度途中の帰国 - ワーホリの1年をよく知るチームが、素早くお答えします。',
    url: `${SITE_URL}/ja/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'ja_JP',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Working Holiday Taxについて - 運営者情報',
    description: 'お客様はワーキングホリデーメーカーだけ。素早い返信、完全オンライン、あなたの言語で。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: '普通の会計士と何が違うのですか？',
    answer: '一般の会計士がワーキングホリデーメーカーを担当するのは年に数回程度です。当社はそれ以外を扱いません。417・462ビザの税率表、出国後のDASPスーパー請求、パスポートによって変わるメディケア免除、1年で3つの州・4つの雇用主 - これらは当社にとって「調べなければならない特殊ケース」ではなく、毎日の仕事そのものです。この専門特化こそが、速さと正確さの理由です。',
  },
  {
    question: '実際、どのくらい早く返信してもらえますか？',
    answer: 'WhatsAppでメッセージを送っていただければ、営業時間内なら通常1時間以内に、実在のスタッフが返信します。コールセンターも、チケット待ちの列も、「5〜7営業日お待ちください」もありません。確認が必要な場合は、そのこともすぐにお伝えします。',
  },
  {
    question: 'ワーホリの1年がどんなものか、本当に理解していますか？',
    answer: 'はい - それだけを扱っているからです。ホステルの郵送先住所、何かおかしいファームの給与明細、申告方法に迷う現金払いの数週間、最後の給与明細をもらわずに辞めた仕事、会計年度の途中での帰国。あなたのワーホリの1年がどんな形でも、当社はほぼ確実に同じケースを扱ったことがあります。',
  },
  {
    question: 'オーストラリアに滞在中の方だけが対象ですか？',
    answer: 'いいえ。当社が行う業務の多く、特にスーパーアニュエーション（DASP）請求や過年度分のタックスリターンは、すでにオーストラリアを離れて帰国された後に発生しています。書類のアップロード、本人確認と署名の電子手続き、還付金のオーストラリアまたは海外の銀行口座への振込まで、すべてオンラインで完結します。',
  },
  {
    question: '対応している言語は何ですか？',
    answer: 'サイトは英語・ドイツ語・日本語で運営していますが、サポートはそれに限りません。あなたが一番使いやすい言語でご連絡ください。その言語で対応します。オーストラリアの税金を初めて知る方に分かりやすく説明することが当社の仕事の中心です - どの言語でも。',
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
                バックパッカーのために。それ以外はやらないチームです。
              </h1>

              <p className="about-lead font-semibold text-ink"
                style={{ fontSize: 'clamp(14px,1.5vw,17px)', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.4 }}>
                Working Holiday Taxのお客様はただ一種類、417または462のワーキングホリデービザ保持者だけです。タックスリターン、TFN、ABN、スーパー、メディケア - それが仕事のすべて。だからこそ速く、正確なのです。
              </p>

              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.65, color: 'rgba(10,15,13,0.58)', maxWidth: '46ch' }}>
                WhatsAppでメッセージを送れば、実在のスタッフが返信します - 営業時間内なら通常1時間以内。オーストラリア滞在中でも、帰国後でも。
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

      {/* ── TRUST SIGNALS STRIP ───────────────────────────────────────────── */}
      <section className="bg-white" style={{ borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-5 lg:py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { stat: <GoogleRating variant="number" lang="ja" />, label: 'Google評価' },
              { stat: <GoogleRating variant="count" lang="ja" />, label: ' ' },
              { stat: '2020', label: '運営開始' },
              { stat: '全言語', label: 'あなたの言語でサポート' },
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
        </div>
      </section>

      {/* ── ワーホリの1年を理解しています ─────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[720px] mx-auto">
            <span className="section-label">選ばれる理由</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,32px)', lineHeight: 1.12, letterSpacing: '-0.025em', margin: '10px 0 18px' }}>
              ワーホリの1年を理解しています
            </h2>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              ワーキングホリデーの1年は、普通の納税者の1年とはまったく違います - 当社はそれを前提に仕事をしています。3つの州にまたがる4つの雇用主。何かがおかしいファームの給与明細。郵送先はホステル。最後の給与明細をもらえないまま辞めた仕事。会計年度の途中での帰国。これらは当社にとって「特殊なケース」ではなく、ごく普通の毎日です。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              417・462の案件だけを扱っているため、あなたの状況を二度説明する必要はありません。どのファーム雇用主が間違った税率で源泉徴収しがちか、どのスーパーファンドが認証コピーを求めるか、あなたのパスポートでメディケア免除がいくらの価値になるか、海外から申告すると何が変わるか - すべて把握しています。情報を一度送っていただければ、あとは当社が動きます。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              そしてスピードもバックパッカー仕様です。すべてオンライン、窓口はWhatsApp、返信するのは実在のスタッフ - 営業時間内なら通常1時間以内。オフィスへの来訪も、電話の自動音声も、帰国便が近づく中で1週間返事を待つこともありません。
            </p>
          </div>
        </div>
      </section>

      {/* ── なぜワーホリ専門か ────────────────────────────────────────────── */}
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
