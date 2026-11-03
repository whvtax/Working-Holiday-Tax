import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { ImageSlot } from '@/components/wht/ImageSlot'
import { Compare, Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'

// ─── METADATA ───────────────────────────────────────────────────────────
// 用語はサイト全体と同じ「タックスリターン」で統一。料金は一切出さない。
export const metadata: Metadata = {
  // absolute, because a layout's title template applies to its child segments
  // and not to its own page, so this one route would otherwise keep the Latin
  // suffix every other Japanese page has dropped.
  title: { absolute: 'オーストラリア タックスリターン 還付金｜ワーホリ専門' },
  description:
    'ワーキングホリデー（417・462ビザ）専門のタックスリターン。居住区分、すべての雇用主、メディケア税の免除、控除を確認してから提出します。',
  keywords: [
    'オーストラリア タックスリターン 還付金',
    'オーストラリア タックスリターン',
    'ワーキングホリデー タックスリターン 還付',
    'ワーホリ タックスリターン 還付金',
    'ワーホリ タックスリターン',
    'ワーホリ 還付金',
    'オーストラリア 税金 還付 ワーホリ',
    'オーストラリア 税金 戻ってくる',
    'ワーホリ 還付金 いくら',
    'バックパッカー 税還付 オーストラリア',
    '417ビザ タックスリターン 還付',
    '462ビザ タックスリターン 還付',
    'WHV 還付金 オーストラリア',
    'オーストラリア タックスリターン 日本語',
    'オーストラリア タックスリターン やり方',
    'オーストラリア タックスリターン 期限',
    'ワーホリ 帰国後 タックスリターン 還付',
    'ワーホリ 帰国後 タックスリターン',
    'オーストラリア 税務上の居住者 ワーホリ',
    'オーストラリア ワーホリ タックスリターン',
    'ワーホリ 税金 オーストラリア',
    'TFN 申請 オーストラリア',
    'TFN 申請 ワーホリ',
    'ABN 登録 ワーホリ',
    'スーパーアニュエーション 返金',
    'スーパーアニュエーション 帰国後',
    'DASP 申請',
    'DASP 申請 日本',
    '417ビザ 税金',
    '462ビザ 税金',
    'メディケア税 免除',
    'ワーホリ 帰国後 税金',
    '日豪租税条約 ワーホリ',
    'Notice of Assessment 日本語',
    'タックスリターン 必要書類 ワーホリ',
    'PAYG Summary 見方',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja`,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      ...newLocaleLanguages('/'),
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: ['en_AU', 'de_DE'],
    url: `${SITE_URL}/ja`,
    siteName: 'Working Holiday Tax',
    title: 'オーストラリア タックスリターン 還付金｜ワーホリ専門',
    description: '送信ボタンは誰でも押せます。大事なのはその前です。居住区分、すべての雇用主、メディケア税の免除、実際の仕事に対応する控除を確認したうえで提出します。',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'オーストラリア タックスリターン 還付金｜ワーホリ（417・462ビザ）専門',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'オーストラリア タックスリターン 還付金｜ワーホリ専門',
    description: 'ワーホリ専門のタックスリターン。居住区分、メディケア税の免除、控除まで確認してから提出します。帰国後でも対応。',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** 2026年8月22日承認。書き換え不可。 */
const FIGURES = [
  {
    figure: '45%',
    body: 'TFNが雇用主に届く前の週は最高税率で源泉徴収。申請しない限り戻りません。',
  },
  {
    figure: '$18,200',
    body: '税務上の居住区分です。ご本人のその年の事情によって決まり、金額への影響も人によって異なります。',
  },
  {
    figure: '2%',
    body: '本来は払う必要がなかったかもしれないメディケア税です。証明書があれば外せることがありますが、申請する人はほとんどいません。',
  },
]

const ANALYSIS = [
  {
    n: '01',
    title: '税務上の居住区分',
    body: '多くの人がチェックひとつで済ませる項目です。居住区分は高等裁判所のAddy判決でも争われた判断であり、申告の中でも重要な部分です。結論は人によって異なります。',
  },
  {
    n: '02',
    title: 'すべての雇用主と、すべての週',
    body: 'ワーホリの1年は複雑です。複数の雇用主、遅れた支払い、忘れていた仕事。記憶ではなくATOの記録と照らして組み立て直します。',
  },
  {
    n: '03',
    title: '該当する場合はメディケア税',
    body: '2%のメディケア税は、納める義務がなくても自動的に引かれます。納めなくてよかった年かどうかを見極め、免除の手続きまで行うのが当社の仕事です。',
  },
  {
    n: '04',
    title: '実際にした仕事に対応する控除',
    body: 'ファームとカフェとデリバリーでは、認められる経費が違います。仕事の中身を伺い、該当するものだけを正確に申請します。',
  },
  {
    n: '05',
    title: 'そして提出',
    body: '登録タックスエージェントが確認・承認したうえでATOに提出します。金額を決めるのは、その前の4つです。',
  },
]

const COMPARISON = [
  { mygov: '源泉徴収された税率がそのまま入力されます',                 us: 'それがその年の事情に合っているかを確認します' },
  { mygov: 'メディケア税の免除については何も出てきません',   us: '対象であれば申請をサポートします' },
  { mygov: '控除欄は空白のまま',                             us: 'あなたの仕事で何が申請できるかを把握しています' },
  { mygov: 'アカウントと有効な電話番号が必要です',       us: 'myGovのアカウントも電話番号も不要です。ATOとは当社がやり取りします' },
]

const SERVICES = [
  { n: '01', href: '/ja/tfn',            title: 'TFN申請',         desc: '最初の給与より前に取得し、最高税率を避けます。' },
  { n: '02', href: '/ja/abn',            title: 'ABN登録',         desc: '個人事業主として働くための登録。税金の注意点も先にお伝えします。' },
  { n: '03', href: '/ja/tax-return',     title: 'タックスリターン', desc: '上記の確認をすべて行い、ATOへ提出します。' },
  { n: '04', href: '/ja/superannuation', title: 'スーパー受取',     desc: '全ファンドを探し、帰国時にDASPを申請します。' },
  { n: '05', href: '/ja/medicare',       title: 'メディケア税免除', desc: '条件を満たす年は、免除証明書を申請します。' },
]

const GUIDES = [
  { href: '/ja/blog/diy-tax-return-vs-tax-agent-working-holiday', title: '自分で申告するか、依頼するか', desc: 'それぞれ実際に何を失うのかを、正直に書いています。' },
  { href: '/ja/blog/tax-residency-working-holiday-makers',        title: '税務上の居住者かどうか',       desc: 'ワーホリの申告で重要な判断のひとつです。' },
  { href: '/ja/blog/medicare-levy-working-holiday-makers',        title: 'メディケア税の免除',           desc: '2%が引かれる仕組みと、免除の考え方です。' },
  { href: '/ja/blog/tax-deductions-working-holiday-makers',       title: '何が控除できるのか',           desc: '一般論ではなく、仕事の種類ごとの控除です。' },
]

const FAQS = [
  {
    question: 'オーストラリアのタックスリターンの還付額は何で決まりますか？',
    answer: '大きく4つで決まります。その年の税務上の居住区分、TFNが雇用主に届く前に45%で源泉徴収された期間があるかどうか、メディケアの対象外なのに2%のメディケア税が引かれていたかどうか、そして実際にした仕事に対応する控除です。\n\nまったく同じ金額を稼いだ2人でも、この4つによって還付額は大きく変わります。',
  },
  {
    question: 'myGovで自分で申告することはできますか？',
    answer: 'できます。提出自体は簡単な部分です。ただし画面は、あなたがその年に税務上の居住者だったのか、雇用主が誤った税率で源泉徴収していたのか、メディケア税の免除証明書の対象になるのか、あなたの仕事で何が控除できるのかまでは教えてくれません。\n\n金額を決めるのは、この4つの判断です。',
  },
  {
    question: 'サービスの料金はいくらですか？',
    answer: '料金は定額制で、還付金に対する歩合ではありません。\n\n作業を始める前にWhatsAppで料金をご確認いただき、お支払いは前払いです。お支払い後に詳しい質問票をお送りし、作業を開始します。当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。',
  },
  {
    question: 'ワーキングホリデーメーカーの税率はいくらですか？',
    answer: 'ワーキングホリデーメーカー向けには専用の税率表がありますが、実際にどの税率が適用されるかは、その年の居住区分を含むご本人の事情によって決まり、最終的な判断はATOが行います。当社が1年の実態を確認します。\n\n雇用主にTFNを提出していない場合は最高税率で源泉徴収されるため、これがワーホリ参加者に還付が生じる代表的な理由の一つです。',
  },
  {
    question: '帰国後でもタックスリターンの申請はできますか？',
    answer: 'はい。日本をはじめ多くの国から、帰国して何年も経ってからタックスリターンとスーパーアニュエーション（DASP）を申請する方に対応しています。手続きはすべてオンラインです。\n\n1点だけ先に知っておいてください。ATOはタックスリターンの還付金をオーストラリアの銀行口座にしか支払えませんが、スーパー（DASP）は海外の口座で受け取れます。オーストラリアの口座をすでに解約している場合は、進める順番が変わるので早めにお知らせください。',
  },
  {
    question: 'どのくらいで返信がありますか？',
    answer: '営業時間内（月曜から金曜、オーストラリア東部時間の9時から18時）であれば、通常1時間以内に返信します。営業時間外の場合は翌朝にご連絡します。まず質問だけでも問題ありませんし、日本語で対応します。',
  },
  {
    question: 'タックスリターンだけのサービスですか？',
    answer: 'いいえ。TFN申請、ABN登録、スーパーアニュエーション（DASP）の申請、メディケア税の免除証明書も扱っており、417・462ビザで必要になる手続きはひととおりカバーしています。',
  },
]

const WA_TAX_RETURN = waUrl({ topic: 'tax-return', lang: 'ja' })

export default async function JapaneseHomePage() {

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/#webpage`,
    url: `${SITE_URL}/ja`,
    name: 'オーストラリア タックスリターン 還付金｜ワーホリ専門',
    description: '417・462ビザ専門。税務上の居住区分、すべての雇用主、メディケア税の免除、実際の仕事に対応する控除を確認したうえでATOに提出します。',
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
  }

  // The business is one Organization (@id /#business), declared in the root
  // layout's graph. This block re-declared the same @id as a LocalBusiness,
  // which handed search engines two different types for one entity. It held
  // no data the graph lacks (its rating was removed on 28 Aug), so it is gone.
  const serviceLd = null as Record<string, unknown> | null

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    inLanguage: 'ja',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    ],
  }

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService', 'AccountingService'],
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    telephone: '+61424513998',
    image: `${SITE_URL}/og-image.png`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    description: 'ワーキングホリデー（ビザサブクラス417・462）の税金だけを扱う税務サービス。お客様ご自身の言語で対応します。',
    foundingDate: '2020',
    knowsLanguage: ['en', 'de', 'ja'],
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: {
      '@type': 'Audience',
      name: 'オーストラリアのワーキングホリデービザ保持者（サブクラス417・462）',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ワーキングホリデーメーカー向け税務サービス',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'TFN（タックスファイルナンバー）取得代行', description: 'ワーキングホリデーメーカーのためのTFN取得申請。', url: `${SITE_URL}/ja/tfn` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ABN（事業者番号）登録代行', description: '個人事業主としてのABN登録。', url: `${SITE_URL}/ja/abn` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'タックスリターン代行', description: '居住区分、雇用主、メディケア税、控除を確認したうえでATOへ提出。', url: `${SITE_URL}/ja/tax-return` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'スーパーアニュエーション返金（DASP）申請', description: '帰国後のスーパーアニュエーション（DASP）申請代行。', url: `${SITE_URL}/ja/superannuation` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'メディケア税免除（Medicare Levy Exemption）申請', description: 'ワーキングホリデーメーカー向けメディケア税免除証明書の申請。', url: `${SITE_URL}/ja/medicare` } },
      ],
    },
    knowsAbout: [
      'オーストラリア税法',
      'ワーキングホリデーの税務上の居住区分',
      '日豪租税条約の無差別条項',
      'ワーキングホリデービザ サブクラス417',
      'ワーキングホリデービザ サブクラス462',
      'タックスファイルナンバー（TFN）',
      'オーストラリアビジネスナンバー（ABN）',
      'スーパーアニュエーション・DASP',
      'メディケア税免除',
      'PAYG源泉徴収',
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      {serviceLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      <div className={blocks.underHeader}>
      <Hero
        title={
          <>
            <span className={blocks.kicker}>オーストラリアのタックスリターン｜ワーホリ417・462ビザ専門</span>
            送信ボタンは誰でも押せます。大事なのは<Mark>その前です。</Mark>
          </>
        }
        media={<ImageSlot id="IMG-W01" className={heroStyles.media} subject="Backpacker on a working holiday in Australia, at work on a farm or in a cafe" alt="オーストラリアでワーキングホリデー中に働くバックパッカー" tone="a" priority />}
      >
        <Lead>還付額は、送信する前の確認で決まります。どれも自動では反映されません。</Lead>
        <WaButton href={WA_TAX_RETURN} position="hero" topic="tax-return" lang="ja">WhatsAppで相談する</WaButton>
        <p className={heroStyles.note}>約1時間で返信します。</p>
        <GoogleRating variant="pill" lang="ja" />
      </Hero>
      </div>

      <Section eyebrow="みんなが聞くこと" title="myGovは間違った申告も、正しい申告と同じように受け付けます。" titleId="mygov-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          居住者だったのか、メディケア税があなたの負担だったのか、その職種で何が控除できるのか。画面上でそれを確かめる人は誰もいません。
        </p>
        <Compare rows={COMPARISON.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="myGovの場合" rightLabel="当社の場合" />
        <p className={blocks.statement}>
          myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA_TAX_RETURN} position="section" topic="tax-return" lang="ja" size="md">WhatsAppで相談する</WaButton>
          <p className={blocks.small}>約1時間で返信します。</p>
        </div>
      </Section>

      <Section tone="pale" width="wide" title="タックスリターンの還付額は何で決まりますか？" titleId="figures-title">
        <p className={`${blocks.text} ${blocks.muted}`}>多くの場合、次の3つです。</p>
        <Figures items={FIGURES} />
      </Section>

      <Section tone="amber" title="当社の保証" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。
        </p>
        <p className={blocks.text}>料金は定額で、戻ってくる金額に対する歩合ではありません。</p>
      </Section>

      <Section id="how-it-works" eyebrow="実際の作業" title="すべてのタックスリターンで確認していること" titleId="analysis-title">
        <p className={`${blocks.text} ${blocks.muted}`}>5つのうち4つは、タックスリターンに何かを入力する前に終わっています。</p>
        <Steps items={ANALYSIS} />
      </Section>

      <Section tone="pale" title="あなたの1年はどちらでしたか？" titleId="year-title">
        <p className={`${blocks.text} ${blocks.muted}`}>申告の中身が変わります。当てはまる方をお選びください。</p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>TFNのみ</h3>
            <p className={blocks.text}>どの仕事も給与を通して支払われ、明細ごとに税金が引かれていました。</p>
            <WaButton href={waUrl({ topic: 'tax-return', lang: 'ja', tier: 'tfn' })} position="inline" topic="tax-return" lang="ja" tier="tfn" size="md" fill>こちらでした</WaButton>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>TFNとABN</h3>
            <p className={blocks.text}>収入の一部がABN宛てで、そこからは何も源泉徴収されていません。</p>
            <WaButton href={waUrl({ topic: 'abn', lang: 'ja', tier: 'tfn-abn' })} position="inline" topic="abn" lang="ja" tier="tfn-abn" size="md" fill>こちらでした</WaButton>
          </div>
        </div>
        <p className={blocks.small}>
          どちらか分からない場合は{' '}
          <WaLink href={waUrl({ topic: 'general', lang: 'ja', tier: 'unsure' })} position="inline" topic="general" lang="ja" tier="unsure" className={blocks.textLink}>
            どんな仕事だったか教えてください
          </WaLink>
        </p>
      </Section>

      <Section eyebrow="サポート内容" title="最初の給与明細から、帰国後の手続きまで" titleId="services-title">
        <LinkRows items={SERVICES.map(s => ({ href: s.href, eyebrow: s.n, title: s.title, desc: s.desc, cta: '詳しく見る →' }))} />
      </Section>

      <ImageSlot id="IMG-W02" subject="Backpackers on a working holiday, a wide Australian scene (farm, beach town or city street)" alt="オーストラリアでワーキングホリデー中のバックパッカーたち" tone="b" className={blocks.band} />

      <Section tone="pale" title="ワーキングホリデーの税金だけを扱っています。" titleId="trust-title">
        <p className={blocks.text}>
          作成するタックスリターンはすべて417・462ビザの方のもので、登録タックスエージェントが確認・承認したうえでATOに提出されます。
        </p>
        <GoogleReviewsServer lang="ja" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>当社からmyGovのログイン情報をお尋ねすることは絶対にありません。</strong>
          尋ねてくる相手がいれば、それは当社ではありません。
        </p>
      </Section>

      <Section title="相談の前によく聞かれること" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
        <p className={blocks.small}>
          ここにない質問は{' '}
          <Link href="/ja/contact" className={blocks.textLink}>お問い合わせ</Link>
          からどうぞ。
        </p>
      </Section>

      <Section tone="pale" eyebrow="ガイド" title="先に全部読んでおきたい方へ" titleId="guides-title">
        <p className={`${blocks.text} ${blocks.muted}`}>ご連絡いただくために、情報を小出しにすることはありません。</p>
        <LinkRows items={GUIDES} />
        <p>
          <Link href="/ja/blog" className={blocks.textLink}>ガイド一覧 →</Link>
        </p>
      </Section>

      <Section tone="forest" title="1年間の状況を教えてください" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          どこで働いたか、だいたいの時期、ABNで請求したことがあるかどうか。それだけあれば、今の状況をお伝えできます。
        </p>
        <WaButton href={WA_TAX_RETURN} position="footer" topic="tax-return" lang="ja" tone="light">WhatsAppで相談する</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>約1時間で返信します。</p>
      </Section>

      <MobileCta href={WA_TAX_RETURN} lang="ja" topic="tax-return" />
    </>
  )
}
