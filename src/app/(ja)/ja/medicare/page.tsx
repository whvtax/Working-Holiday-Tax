import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

/*
 * Japanese mirror of the tightened Medicare page. What it owns is the exemption
 * certificate: the levy comes off by default, an agreement country removes the
 * entitlement to claim it back, and the exemption needs a statement almost
 * nobody applies for. Japan has no agreement, which is the whole point here.
 */

const WA = waUrl({ topic: 'medicare', lang: 'ja' })

export const metadata: Metadata = {
  title: { absolute: '417・462ビザのメディケア税免除｜2%を取り戻す' },
  description:
    'メディケア税（課税所得の2%）は既定で差し引かれますが、ワーホリの多くは支払う義務がありません。誰が免除対象か、必要な証明書は何か。',
  keywords: [
    'メディケア レビー 免除',
    'メディケア 税 免除 ワーホリ',
    'メディケア レビー 免除 バックパッカー',
    'メディケア レビー 免除証明書',
    'Medicare Entitlement Statement 日本語',
    'メディケア 417ビザ',
    'メディケア 462ビザ',
    '日豪 社会保険協定',
    'RHCA オーストラリア 日本語',
    'メディケア 税 タックスリターン',
    'メディケア 免除 還付金',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/medicare`,
    languages: {
      'en-AU': `${SITE_URL}/medicare`,
      'de': `${SITE_URL}/de/medicare`,
      'ja': `${SITE_URL}/ja/medicare`,
      'x-default': `${SITE_URL}/medicare`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-medicare.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/medicare`,
    siteName: 'Working Holiday Tax',
    title: '417・462ビザのメディケア税免除｜2%を取り戻す',
    description: '2%は既定で差し引かれます。誰が免除対象か、免除に必要な証明書は何か。',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-medicare.png`],
    card: 'summary_large_image',
    title: 'ワーホリのメディケア税免除',
    description: '2%は既定で差し引かれます。誰が免除対象か、何が必要か。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const RHCA = [
  'イギリス', 'アイルランド', 'ニュージーランド', 'イタリア',
  'スウェーデン', 'オランダ', 'ベルギー', 'フィンランド',
  'ノルウェー', 'マルタ', 'スロベニア',
]

/**
 * 誰もが抱えたまま来る反論を、メディケア税に即して答える。
 *
 * トップページの表の写しにはしない。各行はこの2%についてのみ書いた。既定で課され、
 * 決め手はビザではなくパスポートであり、外すには別途申請する証明書が要る。
 * myGovを批判してはいない。提出の部分が問題なのではない。
 */
const MYGOV = [
  {
    mygov: 'メディケア税は税額の確定時に加算されます。最初に気づくのは、思ったより少ない還付金です。',
    us: '申告を出す前にそこを確定させます。通知が届いてからではありません。',
  },
  {
    mygov: '決め手がビザではなくパスポートであることは、画面のどこにも書かれていません。',
    us: 'あなたの国とオーストラリアに相互医療協定があるかどうかがすべてで、最初にそこを伺います。',
  },
  {
    mygov: '免除にはMedicare Entitlement Statementが必要で、それは申告からではなく別の窓口で申請します。',
    us: '証明書の申請をサポートし、結果を待ち、正しい年度で免除が反映されるようにします。',
  },
  {
    mygov: '証明書があってもなくても、免除の入力欄はそこにあります。',
    us: '裏づけがある場合にのみ申請します。問われたときに根拠となるのはその書類です。',
  },
]

// Accordionは回答の空行を段落の区切りとして扱う。長い回答にだけ入れている。
// faqSchemaは元の文字列をそのまま使うので、構造化データは変わらない。
const faqs = [
  {
    question: 'メディケア税の免除はいくらになりますか。',
    answer:
      'メディケア税は課税所得の2%です。収入25,000ドルなら約500ドル、50,000ドルなら約1,000ドルになります。毎週の給与から引かれるのではなくタックスリターンの査定時に精算されるため、そこで免除を申請することがお金を取り戻す方法になります。',
  },
  {
    question: '417・462ビザなら誰でも免除されますか。',
    answer:
      '多くは対象ですが全員ではありません。決め手はビザではなくパスポートで、イギリス、アイルランド、イタリアを含む相互医療協定11か国の国籍であれば通常メディケアの対象となり、その対象であること自体が免除を外します。\n\n日本は協定を結んでいないため、日本のワーキングホリデーメーカーは通常、免除を申請できます。',
  },
  {
    question: 'Medicare Entitlement Statementとは何ですか。必要ですか。',
    answer:
      'Medicare Entitlement Statementは、指定した期間にメディケアの対象ではなかったことをServices Australiaが証明する書類です。免除の根拠となる証拠であり、ATOから提示を求められることがあるため、この書類の手配もタックスリターンの一部として当社が対応します。',
  },
  {
    question: '1年のうち一部の期間だけ免除を受けられますか。',
    answer:
      'できますし、ワーキングホリデーの方の多くはそれが正しい答えになります。免除は日数で計算されるため、11月に入国した場合は、メディケアの対象でなかった日数だけが免除されます。\n\n一部しか当てはまらないのに1年分を申請するのは、後からタックスリターンの修正につながる典型的な誤りです。',
  },
  {
    question: '旅行保険や民間の医療保険に入っていると扱いは変わりますか。',
    answer:
      '変わりません。メディケア税で問われるのは公的制度の対象資格であり、保険に入っているかどうかではないため、旅行保険も民間医療保険も影響しません。\n\n民間の入院保険が関係するのはMedicare Levy Surchargeという別の課税で、高所得の場合に適用され、ワーキングホリデーではほとんど関係しません。',
  },
  {
    question: '年の途中ですでに差し引かれていた場合はどうなりますか。',
    answer:
      '失われるものはありません。メディケア税はタックスリターンの査定時に計算されるもので、給与支払いのたびに徴収されるものではないため、年間に差し引かれていたのは一般的な源泉徴収です。正当な免除を申請すれば、査定からメディケア税が外れます。\n\n免除を入れずに提出した過去の年度も、対象であれば通常は修正申告できます。',
  },
]

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
    { '@type': 'ListItem', position: 2, name: 'メディケア', item: `${SITE_URL}/ja/medicare` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/ja/medicare#service`,
  name: 'メディケア税免除の申請代行',
  serviceType: 'Medicare Levy Exemption',
  description:
    'メディケアの対象外である417・462ビザ保持者向けに、Medicare Entitlement Statementの取得を含め、タックスリターンの一部としてメディケア税免除を申請します。',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 / 462) メディケア対象外の方' },
  inLanguage: 'ja',
  url: `${SITE_URL}/ja/medicare`,
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/medicare#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/medicare`,
}

const H2: React.CSSProperties = {
  fontSize: 'clamp(20px,2.5vw,29px)',
  lineHeight: 1.3,
  letterSpacing: '-0.015em',
  // 20〜29pxの明朝見出しの下に12pxは詰まりすぎ。ページのH2はすべてこの
  // オブジェクトを通るので、余白は一度で入る。
  marginBottom: '16px',
  scrollMarginTop: '84px',
}
const BODY: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.85,
  color: '#2A3C34',
  marginBottom: '14px',
}

export default function JapaneseMedicarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="パンくずリスト" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '13px', color: '#4C6459' }}>
            <Link href="/ja" className="transition-colors hover:text-forest-500">ホーム</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">メディケア</span>
          </nav>

          <div className="max-w-[680px] mx-auto">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                メディケア税
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(26px,3.2vw,42px)', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              そもそも払う義務のなかった2%
            </h1>

            <p className="hero-sub font-semibold text-ink"
              style={{ fontSize: 'clamp(16px,1.6vw,18px)', lineHeight: 1.6, marginBottom: '12px' }}>
              決めるのはビザではなくパスポートです。ほとんど誰も申請しない証明書で外せます。
            </p>

            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '22px', maxWidth: '480px' }}>
              <WaLink href={WA} position="hero" topic="medicare" lang="ja"
                className="btn-primary inline-flex justify-center"
                style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                自分の状況を確認する
              </WaLink>
              <a href="#who-is-exempt"
                className="inline-flex btn-ghost-dark justify-center items-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                免除の対象者を見る
              </a>
            </div>

            <p style={{ fontSize: '13px', color: '#4C6459' }}>
              返信は約1時間以内。
            </p>
          </div>
        </div>
      </section>

      {/* ── 反論への回答、メディケア税に即して ─────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              自分でやる場合
            </p>

            <h2 className="font-serif font-black text-ink" style={H2}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>そもそもあなたの負担だったのか。</span>
              <span style={{ display: 'block' }}>誰も確かめないまま、myGovは2%を加算します。</span>
            </h2>

            <p style={{ ...BODY, color: '#4C6459', maxWidth: '42ch', marginBottom: '20px' }}>
              課税所得の2%、25,000ドル稼いだ年なら約500ドルです。給与明細には出てきません。
            </p>

            {/* 2つのラベルは以前8つのセルすべてに出ていた。スマートフォンでは行が
                縦に積まれるため、同じ言葉が画面を8回下りてくる。ラベルは最初の行に
                だけ出す。デスクトップでは列見出し、スマートフォンでは凡例として
                読め、以降は背景色と「当社の場合」側の太さが区別を担う。表の文言は
                変えていない。 */}
            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '13px 16px', background: '#FFFFFF' }}>
                    {i === 0 && (
                      <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                        myGovの場合
                      </p>
                    )}
                    <p style={{ ...BODY, marginBottom: 0, overflowWrap: 'break-word' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '13px 16px', background: '#F2FAF7' }}>
                    {i === 0 && (
                      <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                        当社の場合
                      </p>
                    )}
                    <p style={{ ...BODY, color: '#080F0D', fontWeight: 500, marginBottom: 0, overflowWrap: 'break-word' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif" style={{ fontSize: '17px', lineHeight: 1.75, color: '#0B5240', marginTop: '22px', maxWidth: '36ch', fontWeight: 700 }}>
              myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。
            </p>
          </div>
        </div>
      </section>

      {/* ── 自分でやると何が起きるか ───────────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={H2}>
              なぜ査定にメディケア税が載っているのですか。
            </h2>
            {/* 「メディケア税はATOが査定する際に加算される」はすぐ上の表の
                1行目そのものだった。 */}
            <p style={BODY}>
              それが既定だからです。免除を申請しない限りそのまま残り、手続きのどこにも、メディケアの対象だったかどうかを尋ねる項目はありません。その結果、一度も使えない制度に1年分の所得の2%を払うことになりがちです。
            </p>
            <p style={BODY}>
              もう一方の誤りが、裏づけとなる書類がないまま免除にチェックを入れてしまうケースです。その根拠はServices Australiaが発行するMedicare Entitlement Statementで、ATOとは別の役所への申請になります。これがないまま申請すると、問われたときに説明できない申告が残ります。
            </p>
          </div>
        </div>
      </section>

      {/* ── 決め手 ─────────────────────────────────────────────────────────── */}
      <section id="who-is-exempt" className="py-8 lg:py-11" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={H2}>
              メディケア税の免除対象になるのは誰ですか。
            </h2>
            {/* 5文で1段落は390pxでは壁になる。論の切れ目、つまり「何が決めるか」と
                「どちら側が誰か」の境目で割った。 */}
            <p style={BODY}>
              メディケアの対象ではなかった方が原則として免除されます。ワーキングホリデービザの場合、それを決めるのはパスポートです。オーストラリアは11か国と相互医療協定を結んでいます。
            </p>
            <p style={BODY}>
              協定国の国籍の方は滞在中メディケアの対象となるのが一般的で、登録していなくても、その対象であること自体が免除を外します。判定は利用実績ではなく対象資格です。それ以外の国、日本も含めて、通常は対象外であり、該当する日数について免除を申請できます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[880px] mx-auto" style={{ marginTop: '20px' }}>
            <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '8px' }}>
                協定国の出身の場合
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#2A3C34', marginBottom: '12px' }}>
                原則としてメディケアの対象となるため、通常は免除されません。正しく処理し、年の一部で状況が違っていなかったかを確認します。
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#4C6459' }}>
                {RHCA.join(' · ')}
              </p>
            </div>
            <div className="rounded-2xl" style={{ padding: '20px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '8px' }}>
                それ以外の国の出身の場合
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#2A3C34', marginBottom: '12px' }}>
                通常はメディケアの対象外のため、免除の対象になります。日本もドイツもこちらに入ります。
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#4C6459' }}>
                免除は年単位の可否ではなく、日数で計算されます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 当社がすること ─────────────────────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={H2}>
              免除のために当社は何をしますか。
            </h2>
            <p style={BODY}>
              メディケアの対象だったかどうか、そして年のどの期間が対象外だったかを確認します。
            </p>

            <div className="rounded-2xl" style={{ padding: '20px', background: '#F5F9F7', border: '1.5px solid #C8EAE0', margin: '20px 0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.7, marginBottom: '8px' }}>
                還付金が当社の料金を下回った場合は、差額を返金します。逆に納税が必要になった場合、料金は当社の確認作業の費用となり、返金はできません。
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#4C6459' }}>
                ATOへ提出する前に、登録税理士が確認して承認します。
              </p>
            </div>

            <WaLink href={WA} position="section" topic="medicare" lang="ja"
              className="btn-primary flex justify-center"
              style={{ minHeight: '54px', width: '100%', maxWidth: '360px', fontSize: '15px', borderRadius: '100px' }}>
              WhatsAppで相談する
            </WaLink>
            <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '10px' }}>
              返信は約1時間以内。
            </p>
          </div>
        </div>
      </section>

      {/* ── 動画 ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ ...H2, maxWidth: '24ch' }}>
              2分でわかるメディケア税免除
            </h2>
            <div className="rounded-2xl overflow-hidden mx-auto w-full" style={{ marginTop: '18px' }}>
              <div className="block sm:hidden" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="メディケア税免除の説明"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
              <div className="hidden sm:block" style={{ aspectRatio: '16/9', maxWidth: '720px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="メディケア税免除の説明"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '18px' }}>
              メディケア税と免除についてよくある質問
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── 関連記事 ───────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '16px' }}>
            メディケアと医療保険をさらに詳しく
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/ja/blog/medicare-levy-working-holiday-makers', label: 'ワーホリのメディケア税免除について' },
              { href: '/ja/blog/countries-with-medicare-agreement-australia', label: 'オーストラリアと医療協定がある国はどこか' },
              { href: '/ja/blog/what-is-medicare-working-holiday-makers', label: 'メディケアとは何か、誰が対象になるのか' },
              { href: '/ja/blog/private-health-insurance-working-holiday-australia', label: '民間医療保険はメディケア税に影響するか' },
              { href: '/ja/blog/emergency-medical-care-working-holiday-no-medicare', label: 'メディケアなしで医療を受けるとどうなるか' },
              { href: '/ja/blog/uk-medicare-reciprocal-agreement-australia', label: 'イギリスの協定と、申告への影響' },
            ].map(g => (
              <Link key={g.href} href={g.href}
                className="block rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '16px', fontSize: '14px', lineHeight: 1.7, color: '#080F0D', minHeight: '44px' }}>
                {g.label}
              </Link>
            ))}
          </div>
        </div>
        </div>
      </section>

      <NextStep
        eyebrow="次のステップ"
        heading="免除は申告の1行であって、全部ではありません"
        body="居住区分と控除のほうが金額への影響は大きく、この3つはまとめて確認します。"
        cta="タックスリターンの進め方を見る"
        href="/ja/tax-return"
      />

      <MobileCta href={WA} lang="ja" topic="medicare" />
    </>
  )
}
