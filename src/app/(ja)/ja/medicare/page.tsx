import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Compare, Steps, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'

/*
 * Japanese mirror of the tightened Medicare page. What it owns is the exemption
 * certificate: the levy comes off by default, an agreement country removes the
 * entitlement to claim it back, and the exemption needs a statement almost
 * nobody applies for. Japan has no agreement, which is the whole point here.
 */

const WA = waUrl({ topic: 'medicare', lang: 'ja' })

export const metadata: Metadata = {
  title: { absolute: 'メディケア免除申請のやり方｜ワーホリ417・462ビザの2%' },
  description:
    'メディケア税（課税所得の2%）は自動的に加算されますが、ワーホリは払う義務がない場合があります。メディケア免除申請の対象者、必要な証明書、タックスリターンでのやり方を解説。',
  keywords: [
    'メディケア免除申請 オーストラリア',
    'メディケア 免除申請 やり方',
    'タックスリターン メディケア免除',
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
      ...newLocaleLanguages('/medicare'),
      'x-default': `${SITE_URL}/medicare`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-medicare.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/medicare`,
    siteName: 'Working Holiday Tax',
    title: 'メディケア免除申請のやり方｜ワーホリ417・462ビザの2%',
    description: '2%は自動的に差し引かれます。誰が免除対象か、免除に必要な証明書は何か。',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-medicare.png`],
    card: 'summary_large_image',
    title: 'ワーホリのメディケア免除申請',
    description: '2%は自動的に差し引かれます。誰が免除対象か、何が必要か。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

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
    mygov: '決め手がビザだけではないことは、画面のどこにも書かれていません。',
    us: 'メディケアの対象かどうかは個々の事情で変わるため、最初に確認します。',
  },
  {
    mygov: '免除には別途証明書が必要で、申告の画面からは用意できません。',
    us: '証明書の申請をサポートし、結果を待ち、正しい年度で免除が反映されるようにします。',
  },
  {
    mygov: '証明書があってもなくても、免除の入力欄はそこにあります。',
    us: '裏づけがある場合にのみ申請します。問われたときに根拠となるのはその書類です。',
  },
]

/** メディケア免除申請の手順。どれもATOとServices Australiaの公開情報にもとづく。 */
const HOW_TO_APPLY = [
  {
    n: '01',
    title: 'メディケアの対象外だったかを確認する',
    body: '決め手はビザではなく、メディケアの対象資格です。日本はオーストラリアと相互医療協定を結んでいないため、日本のパスポートの方は一般的に対象外ですが、年の途中で事情が変わっていないかも確認します。',
  },
  {
    n: '02',
    title: 'Medicare Entitlement Statementを申請する',
    body: 'メディケアの対象ではなかったことを証明する書類で、Services Australiaに会計年度ごとに申請します。届くまで数週間かかることがあるため、申告の直前ではなく早めに手配します。',
  },
  {
    n: '03',
    title: 'タックスリターンのメディケア税の欄で免除を申告する',
    body: 'myTaxでは「Medicare levy reduction or exemption」の項目で、メディケアの対象ではなかった区分を選び、免除を受ける日数を入力します。免除は日数で計算されるため、対象外だった期間だけを申告します。',
  },
  {
    n: '04',
    title: '証明書が届いてから提出し、保管しておく',
    body: 'ATOは、証明書が届いてから申告書を提出するよう案内しています。提出後に提示を求められることがあるため、証明書は手元に残しておきます。',
  },
]

// Accordionは回答の空行を段落の区切りとして扱う。長い回答にだけ入れている。
// faqSchemaは元の文字列をそのまま使うので、構造化データは変わらない。
const faqs = [
  {
    question: 'メディケア税の免除はいくらになりますか？',
    answer:
      'メディケア税は課税所得の2%です。収入40,000ドルなら約800ドル、50,000ドルなら約1,000ドルになります。毎週の給与から引かれるのではなくタックスリターンの査定時に精算されるため、そこで免除を申請する形になります。',
  },
  {
    question: '417・462ビザなら誰でも免除されますか？',
    answer:
      '全員ではありません。決め手はビザではなく、メディケアの対象資格があったかどうかです。ご本人の事情によって異なり、最終的な判断はATOが行います。メディケアの対象と判断される場合は免除の対象外となり、対象外と判断される場合に免除を申請できることがあります。当社が確認します。',
  },
  {
    question: 'Medicare Entitlement Statementとは何ですか？必要ですか？',
    answer:
      'Medicare Entitlement Statementは、指定した期間にメディケアの対象ではなかったことをServices Australiaが証明する書類です。免除の根拠となる証拠であり、ATOから提示を求められることがあるため、この書類の手配もタックスリターンの一部として当社が対応します。',
  },
  {
    question: '1年のうち一部の期間だけ免除を受けられますか？',
    answer:
      'できますし、ワーキングホリデーの方の多くはそれが正しい答えになります。免除は日数で計算されるため、11月に入国した場合は、メディケアの対象でなかった日数だけが免除されます。\n\n一部しか当てはまらないのに1年分を申請するのは、後からタックスリターンの修正につながる典型的な誤りです。',
  },
  {
    question: '旅行保険や民間の医療保険に入っていると扱いは変わりますか？',
    answer:
      '変わりません。メディケア税で問われるのは公的制度の対象資格であり、保険に入っているかどうかではないため、旅行保険も民間医療保険も影響しません。\n\n民間の入院保険が関係するのはMedicare Levy Surchargeという別の課税で、高所得の場合に適用され、ワーキングホリデーではほとんど関係しません。',
  },
  {
    question: '年の途中ですでに差し引かれていた場合はどうなりますか？',
    answer:
      'メディケア税はタックスリターンの査定時に計算されるもので、給与支払いのたびに徴収されるものではありません。年間に差し引かれていたのは一般的な源泉徴収です。免除の対象になる場合は、免除を申請することで査定からメディケア税が外れます。\n\n免除を入れずに提出した過去の年度も、対象であれば通常は修正申告できます。',
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

const GUIDES = [
  { href: '/ja/blog/medicare-levy-working-holiday-makers', label: 'メディケア税とは何か、ワーホリにどう関わるか' },
  { href: '/ja/blog/countries-with-medicare-agreement-australia', label: 'オーストラリアと医療協定がある国はどこか' },
  { href: '/ja/blog/what-is-medicare-working-holiday-makers', label: 'メディケアとは何か、誰が対象になるのか' },
  { href: '/ja/blog/private-health-insurance-working-holiday-australia', label: '民間医療保険はメディケア税に影響するか' },
  { href: '/ja/blog/emergency-medical-care-working-holiday-no-medicare', label: 'メディケアなしで医療を受けるとどうなるか' },
  { href: '/ja/blog/uk-medicare-reciprocal-agreement-australia', label: 'イギリスの協定と、申告への影響' },
]

export default function JapaneseMedicarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div className={blocks.underHeader}>
        <Crumb home="ホーム" current="メディケア" label="パンくずリスト" />
        <Hero
          title={<><span className={blocks.kicker}>メディケア免除申請｜ワーホリ417・462ビザ</span><Mark>そもそも払う義務がなかったかもしれない</Mark>2%</>}
        >
          <div className="hero-sub">
            <Lead>
              ワーホリはタックスリターンでメディケア税の免除を申請できる場合があり、メディケアの対象でなかった期間について、Medicare Entitlement Statementを添えて申告します。決めるのはビザだけではなく、ご本人の事情です。
            </Lead>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="medicare" lang="ja">自分の状況を確認する</WaButton>
            <a href="#who-is-exempt" className={coreBlocks.hint}>免除の対象者を見る</a>
          </div>
          <p className={heroStyles.note}>返信は約1時間以内。</p>
        </Hero>
      </div>

      <PhotoFrame page="medicare" locale="ja" />

      {/* ── DER EINWAND, KONKRET ZUR LEVY ──────────────────────────────────── */}
      <Section
        eyebrow="自分でやる場合"
        title={<>そもそもあなたの負担だったのか。誰も確かめないまま、<Mark>myGovは2%を加算します。</Mark></>}
        titleId="objection-title"
      >
        <p className={`${blocks.text} ${blocks.muted}`}>
          課税所得の2%、40,000ドル稼いだ年なら約800ドルです。給与明細には出てきません。
        </p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="myGovの場合" rightLabel="当社の場合" />
        <p className={blocks.statement}>
          myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。
        </p>
      </Section>

      {/* ── WAS ALLEIN SCHIEFGEHT ──────────────────────────────────────────── */}
      <Section tone="pale" title="なぜ査定にメディケア税が載っているのですか。" titleId="why-title">
        <p className={blocks.text}>
          それが初期設定だからです。免除を申請しない限りそのまま残り、手続きのどこにも、メディケアの対象だったかどうかを尋ねる項目はありません。その結果、一度も使えない制度に1年分の所得の2%を払うことになりがちです。
        </p>
        <p className={blocks.text}>
          もう一方の誤りが、裏づけとなる書類がないまま免除にチェックを入れてしまうケースです。その根拠はMedicare Entitlement Statementという書類で、当社が手配します。これがないまま申請すると、問われたときに説明できない申告が残ります。
        </p>
      </Section>

      {/* ── DER ENTSCHEIDENDE PUNKT ────────────────────────────────────────── */}
      <Section id="who-is-exempt" title="メディケア税の免除対象になるのは誰ですか。" titleId="exempt-title">
        <p className={blocks.text}>
          メディケアの対象ではなかった方が原則として免除されます。対象かどうかは、パスポートなどご本人の事情によって異なり、当社が確認します。
        </p>
        <p className={blocks.text}>
          日本はオーストラリアと相互医療協定（RHCA）を結んでいないため、日本のパスポートの方は一般的にメディケアの対象外です。詳しくは
          <Link href="/ja/blog/countries-with-medicare-agreement-australia" className={blocks.textLink}>協定国の一覧</Link>
          をご覧ください。
        </p>
        <p className={blocks.text}>
          判定は利用実績ではなく対象資格で、日数で計算されます。年の一部だけ状況が違う場合もあるため、当社が1年の実態を確認します。
        </p>
        <div className={blocks.cards}>
          <div className={`${blocks.palePanel} ${blocks.stack}`}>
            <h3 className={blocks.cardTitle}>対象と判断される場合</h3>
            <p className={blocks.text}>
              メディケアの対象と判断される場合、通常は免除されません。正しく処理し、年の一部で状況が違っていなかったかを確認します。
            </p>
          </div>
          <div className={`${blocks.palePanel} ${blocks.stack}`}>
            <h3 className={blocks.cardTitle}>対象外と判断される場合</h3>
            <p className={blocks.text}>
              メディケアの対象外と判断される場合、免除の対象になることがあります。
            </p>
            <p className={blocks.small}>免除は年単位の可否ではなく、日数で計算されます。</p>
          </div>
        </div>
      </Section>

      {/* ── HOW TO APPLY (search wording: メディケア免除申請 やり方) ─────────── */}
      <Section tone="pale" eyebrow="やり方" title="メディケア免除申請のやり方（4ステップ）" titleId="how-title">
        <p className={blocks.text}>
          メディケア税の免除は、単独の申請ではなくタックスリターンの中で申請します。その前に、裏づけとなる証明書をServices Australiaから取り寄せておく必要があります。
        </p>
        <Steps items={HOW_TO_APPLY} />
        <p className={`${blocks.small} ${blocks.muted}`}>
          出典：オーストラリア税務局（ATO）myTaxの手引き「Medicare levy reduction or exemption」、Services Australia「Medicare Entitlement Statement」。2026年11月確認。
        </p>
      </Section>

      {/* ── WAS WIR TUN (the one key promise, amber band) ──────────────────── */}
      <Section tone="amber" title="免除のために当社は何をしますか。" titleId="do-title">
        <p className={blocks.text}>メディケアの対象だったかどうか、そして年のどの期間が対象外だったかを確認します。</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。この保証の対象は、TFN所得のあるタックスリターンに限られます。
        </p>
        <p className={blocks.text}>ATOへ提出する前に、登録タックスエージェントが確認して承認します。</p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="medicare" lang="ja" size="md">WhatsAppで相談する</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>返信は約1時間以内。</p>
        </div>
      </Section>

      {/* ── VIDEO ──────────────────────────────────────────────────────────── */}
      <Section tone="pale" title="2分でわかるメディケア税免除" titleId="video-title">
        <div className={coreBlocks.video}>
          <div className="block sm:hidden" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto' }}>
            <iframe loading="lazy"
              src="https://www.youtube-nocookie.com/embed/oj7ZSOHAxJk"
              title="メディケア税免除の説明"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
          <div className="hidden sm:block" style={{ aspectRatio: '16/9', maxWidth: '720px', margin: '0 auto' }}>
            <iframe loading="lazy"
              src="https://www.youtube-nocookie.com/embed/oj7ZSOHAxJk"
              title="メディケア税免除の説明"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </Section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <Section title="メディケア税と免除についてよくある質問" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqSchema above uses the raw string. */}
        <Accordion items={faqs} />
      </Section>

      {/* ── RATGEBER ───────────────────────────────────────────────────────── */}
      <Section tone="pale" title="メディケアと医療保険をさらに詳しく" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="次のステップ" title="免除は申告の1行であって、全部ではありません" titleId="next-title">
        <p className={blocks.text}>居住区分と控除も申告の内容に関わるため、この3つはまとめて確認します。</p>
        <LinkButton href="/ja/tax-return">タックスリターンの進め方を見る</LinkButton>
      </Section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <Section tone="forest" title="自分の状況を確認する" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>決めるのはビザだけではなく、ご本人の事情です。</p>
        <WaButton href={WA} position="footer" topic="medicare" lang="ja" tone="light">WhatsAppで相談する</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>返信は約1時間以内。</p>
      </Section>

      <MobileCta href={WA} lang="ja" topic="medicare" />
    </>
  )
}
