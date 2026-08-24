import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '../../HomeWa'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

/*
 * Japanese mirror of the rebuilt superannuation answer hub. Same structure as
 * /superannuation: every H2 is a question, answered immediately in a complete
 * paragraph, sales layer underneath the answer rather than instead of it.
 * Community terminology kept: スーパー受取, タックスリターン.
 */

const WA = waUrl({ topic: 'super', lang: 'ja' })

export const metadata: Metadata = {
  title: { absolute: 'オーストラリアのスーパーを帰国後に受け取る方法（DASP）' },
  description:
    '417・462ビザで働いた方は、帰国後にDASPでスーパーを受け取れます。対象条件、65%の税率、必要書類、かかる期間まで日本語で解説。',
  keywords: [
    'スーパー 返金 オーストラリア',
    'スーパーアニュエーション 返金',
    'スーパー受取 申請方法',
    'スーパー 帰国後 返金',
    'DASP 申請',
    'DASP 還付',
    'ワーキングホリデー スーパー 返金',
    '417ビザ スーパー 返金',
    '462ビザ スーパー 返金',
    'バックパッカー スーパー 返金',
    'オーストラリア 帰国 スーパー',
    'スーパー いくら戻る',
    'スーパーアニュエーション 日本の口座',
    'Departing Australia Superannuation Payment 日本語',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/superannuation`,
    languages: {
      'en-AU': `${SITE_URL}/superannuation`,
      'de': `${SITE_URL}/de/superannuation`,
      'ja': `${SITE_URL}/ja/superannuation`,
      'x-default': `${SITE_URL}/superannuation`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'オーストラリアのスーパーを帰国後に受け取る方法（DASP）',
    description: '対象条件、65%課税後の受取額、必要書類、かかる期間を日本語で解説します。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'オーストラリアのスーパーを帰国後に受け取る方法（DASP）',
    description: '対象条件、65%の税率、必要書類、期間、複数ファンドの探し方。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}


/**
 * 誰もが抱えたまま来る反論を、スーパーに即して答える。
 *
 * このページでこの議論を扱うのはここだけになった。同じ内容を繰り返していた
 * 最終セクションの2列リストは削除し、FAQでも言い直さないようにしている。
 * 各行はDASPの話に限定した。申請は1つずつしか扱えず、しかも自分で名前を
 * 挙げられるファンドだけが対象になる。ATOの仕組みが悪いとは書いていない。
 * 役割が違うだけである。
 */
const MYGOV = [
  {
    mygov: '申請はファンドを1つずつ扱い、しかもあなたが把握しているものだけが対象です。',
    us: 'タックスファイルナンバーに紐づく口座をすべて探します。雇用主が断りなく開設した口座も含みます。',
  },
  {
    mygov: '残高がすでにファンドを離れ、未請求スーパーとしてATOに移っていても、そのことは分かりません。',
    us: 'ビザ失効から半年ほどでそこへ移るため、当社はATO側も確認します。',
  },
  {
    mygov: '申請はビザの記録と照合され、失効していないビザがあるとその時点で止まります。',
    us: '3つの条件を先に確認するので、まだ支払われない申請に何週間もかける必要がありません。',
  },
  {
    mygov: 'スーパーとタックスリターンは別々の申請で、両者が自動でつながることはありません。',
    us: '金額が大きいのはたいていタックスリターンの側です。両方を扱うので、どちらも取り残されません。',
  },
]

const faqs = [
  {
    question: 'スーパーの申請は自分でできますか。',
    answer:
      'できますし、申請自体は無料です。ファンドが1つで書類がそろっていれば、ご自身で進めるのが合理的だとお伝えします。難しくなるのは、スーパーが複数のファンドに分かれている場合、認証済みコピーを海外から求められる場合、そしてビザがまだ失効していない場合です。お預かりするのはその部分です。',
  },
  {
    question: 'ABN（事業者番号）で働いていた場合もスーパーはもらえますか。',
    answer:
      '基本的にはもらえません。スーパーアニュエーションの拠出は雇用主の義務で、PAYG雇用に紐づくため、ABNで請求した仕事には通常適用されません。ただし実態が従業員に近い働き方だった場合は、権利が認められることがあります。確認する価値はあります。',
  },
  {
    question: 'DASPによるスーパー受取とタックスリターンの還付金は同じものですか。',
    answer:
      '別のものです。タックスリターンの還付金は、源泉徴収と実際の税額との差額で、申告後にATOから支払われます。DASPは雇用主が給与とは別に積み立てた老後資金の払い出しで、スーパーファンドから支払われます。多くの方は両方を受け取れ、申請もそれぞれ別です。',
  },
  {
    question: 'スーパーを受け取るのにTFN（納税者番号）は必要ですか。',
    answer:
      'TFNが分からなくても、氏名や生年月日、パスポート情報で本人確認できることが多く、申請自体は止まりません。ただしATOはTFNですべてのスーパー口座を紐づけているため、忘れている口座を確実に見つける唯一の手段はTFNです。紛失した場合も再確認できます。',
  },
  {
    question: 'なぜワーキングホリデーは65%で、他のビザは35%なのですか。',
    answer:
      '65%は、417・462ビザを一度でも保持した人に法律で定められた税率です。ワーキングホリデービザを持ったことがない一時滞在者には、課税済み部分に35%が適用されます。最後のビザではなく、ビザの履歴で決まる仕組みです。',
  },
  {
    question: '雇用主がスーパーを一度も払っていなかった場合はどうなりますか。',
    answer:
      '受け取れるのは実際にファンドへ入金された分だけです。雇用主が拠出していなかった場合は、未払いのスーパーアニュエーション・ギャランティーとしてATOが調査し回収できることがあります。DASPとは別の手続きで時間もかかるため、受け取り前のご相談が安全です。',
  },
  {
    question: 'スーパーを受け取ると、タックスリターンや将来のビザに影響しますか。',
    answer:
      'どちらにも影響しません。DASPの税金は支払い前に差し引かれる最終的な課税で、タックスリターンに記載する必要はなく、後のビザ申請が受け取りの有無で判断されるものでもありません。影響はスーパー口座が閉鎖されることだけで、再び働く場合は新しいファンドで積み立てが始まります。',
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
    { '@type': 'ListItem', position: 2, name: 'スーパー受取', item: `${SITE_URL}/ja/superannuation` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/ja/superannuation#service`,
  name: 'スーパー受取（DASP）代行サービス',
  serviceType: 'Departing Australia Superannuation Payment 申請',
  description:
    '417・462ビザ保持者のスーパー受取（DASP）代行。TFNに紐づくすべてのファンドの調査から、日本またはオーストラリアの口座への入金までを日本語で対応します。',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 / 462) 帰国済みの方' },
  inLanguage: 'ja',
  url: `${SITE_URL}/ja/superannuation`,
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/superannuation#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/superannuation`,
}

/*
 * DASPの請求が何から成り、どの順で進むのかを説明する構造化データ。ランディング
 * ページではなく情報源として読まれるためのもの。
 * 意図的に「手順書」にはしていない。以前の版は「必要な情報をそろえる」「各ファンド
 * へ申請する」と並べていたが、それは当社が受任している作業そのものの手引きであり、
 * 検索エンジンはこの種のデータをステップバイステップとして表示する。
 */
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  inLanguage: 'ja',
  name: 'スーパー（DASP）の請求はどう進むのか',
  description:
    '417・462ビザのワーキングホリデーメーカーのDASP請求が何から成るのか。対象条件から入金まで。',
  step: [
    { name: '対象条件が確認される', text: 'ビザが失効または取り消されており、かつオーストラリアを出国していること。両方が同時に満たされている必要があり、その前に出した請求はもっとも多い無駄な申請です。' },
    { name: 'すべてのファンドが特定される', text: '雇用先が複数あった1年は、たいていファンドも複数になります。すでにファンドからATOへ移管された未請求残高も含みます。請求は、向けた先の資金にしか届きません。' },
    { name: '各請求が準備され、証拠がそろえられる', text: '残高のあるファンドごとに、それぞれの本人確認・認証基準に沿って個別に請求します。あるファンドが受け付けた書類を、次のファンドが受け付けるとは限りません。' },
    { name: '源泉徴収が行われる', text: 'ワーキングホリデーメーカーのDASPは課税対象部分に65%が課されます。誰が請求しても、ファンドが差し引いてATOへ納付します。' },
    { name: '残高が支払われる', text: '残りの残高が支払われます。タックスリターンの還付と違い、海外の銀行口座で受け取れます。' },
  ].map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
}

const H2: React.CSSProperties = {
  fontSize: 'clamp(20px,2.5vw,29px)',
  lineHeight: 1.3,
  letterSpacing: '-0.015em',
  marginBottom: '12px',
  scrollMarginTop: '84px',
}
const BODY: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.85,
  color: '#2A3C34',
  marginBottom: '14px',
}

function Answer({
  id, heading, children, tint = false,
}: { id: string; heading: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className="py-8 lg:py-11" style={{ background: tint ? '#F5F9F7' : '#fff' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-serif font-black text-ink" style={H2}>{heading}</h2>
          {children}
        </div>
      </div>
    </section>
  )
}

export default function JapaneseSuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="パンくずリスト" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '13px', color: '#4C6459' }}>
            <Link href="/ja" className="transition-colors hover:text-forest-500">ホーム</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">スーパー受取</span>
          </nav>

          <div className="max-w-[680px] mx-auto">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                スーパー受取 &middot; DASP
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(26px,3.2vw,42px)', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              オーストラリアを離れた後にスーパーを受け取る方法
            </h1>

            <p className="hero-sub font-semibold text-ink"
              style={{ fontSize: 'clamp(16px,1.6vw,18px)', lineHeight: 1.6, marginBottom: '12px' }}>
              給与から引かれたお金ではなく、雇用主が上乗せで積み立てたお金です。いまもオーストラリアに残っています。
            </p>

            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '22px', maxWidth: '480px' }}>
              <WaLink href={WA} position="hero" topic="super" lang="ja"
                className="btn-primary inline-flex justify-center"
                style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                スーパーについて相談する
              </WaLink>
              <a href="#who-can-claim"
                className="inline-flex btn-ghost-dark justify-center items-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                対象条件から読む
              </a>
            </div>

            <p style={{ fontSize: '13px', color: '#4C6459' }}>
              返信は約1時間以内。
            </p>
          </div>
        </div>
      </section>

      {/* ── 反論への回答、スーパーに即して ─────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              自分でやる場合
            </p>

            <h2 className="font-serif font-black text-ink" style={H2}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>申請画面のファンド欄は1つ。</span>
              <span style={{ display: 'block' }}>カジュアルの仕事が4つなら、口座も4つです。</span>
            </h2>

            <p style={{ ...BODY, color: '#4C6459', maxWidth: '42ch', marginBottom: '20px' }}>
              そのうち2つは、あなたが選ばないまま開設されたものです。画面のどこにも、その存在は出てきません。
            </p>

            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                      ATOの申請画面
                    </p>
                    <p style={{ ...BODY, marginBottom: 0, overflowWrap: 'break-word' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '15px 18px', background: '#F2FAF7' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                      当社の場合
                    </p>
                    <p style={{ ...BODY, color: '#080F0D', fontWeight: 500, marginBottom: 0, overflowWrap: 'break-word' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif" style={{ fontSize: '17px', lineHeight: 1.75, color: '#0B5240', marginTop: '22px', maxWidth: '36ch', fontWeight: 700 }}>
              myGovへのログインもID連携も不要です。ATOとは当社が直接やり取りします。
            </p>
          </div>
        </div>
      </section>

      <Answer id="who-can-claim" heading="DASPでスーパーを受け取れるのは誰ですか。">
        <p style={BODY}>
          一時滞在ビザで働き、そのビザが失効または取り消され、かつ恒久的に出国した方がDASPを申請できます。3つとも同時に必要です。417・462ビザの方は対象で、他の一時滞在ビザの方も多くは対象です。オーストラリアとニュージーランドの国民、永住者は申請できません。
        </p>
        <p style={BODY}>
          ビザの状況は申請時に内務省（Department of Home Affairs）の記録と照合されるため、別途証明を用意する必要はありません。ブリッジングビザで滞在中の場合や、有効なビザでまだ国内にいる場合は、状況が変わるまでは申請できません。
        </p>
      </Answer>

      <Answer id="how-much" heading="スーパーは実際にいくら戻ってきますか。" tint>
        <p style={BODY}>
          ワーキングホリデーメーカーの場合、DASPの課税対象部分に65%の源泉徴収がかかり、手元に届くのは1ドルにつき約35セントです。残高10,000ドルなら受取額は約3,500ドルです。この税率は法律で定められており、代理人でも待つことでも下げられません。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ margin: '20px 0 14px' }}>
          {[
            { bal: '$3,000', net: '$1,050', note: '数か月のカジュアル勤務' },
            { bal: '$6,000', net: '$2,100', note: 'フルタイムで約半年' },
            { bal: '$10,000', net: '$3,500', note: 'ワーホリ1年分' },
          ].map((r, i) => (
            <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #E2EFE9', textAlign: 'center' }}>
              <p className="font-medium" style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4C6459', marginBottom: '6px' }}>
                スーパー残高
              </p>
              <p className="font-semibold text-ink" style={{ fontSize: '17px', marginBottom: '10px' }}>{r.bal}</p>
              <p className="font-serif font-black" style={{ fontSize: 'clamp(26px,3vw,33px)', color: '#0B5240', lineHeight: 1, marginBottom: '8px' }}>
                {r.net}
              </p>
              <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.7 }}>
                受取額 &middot; {r.note}
              </p>
            </div>
          ))}
        </div>

        <p style={{ ...BODY, fontSize: '13px', color: '#4C6459' }}>
          ATOが定める65%のDASP源泉徴収後の金額で、残高がすべて課税済み拠出である場合の例です。一部のファンドが保有する未課税部分にはより高い税率が適用されます。見積もりではなく目安としてご覧ください。
        </p>
      </Answer>

      <Answer id="documents" heading="DASP申請にはどの書類が必要ですか。">
        <p style={BODY}>
          パスポート、オーストラリアのTFN、ビザ情報、各スーパーファンドの名称と会員番号、入金先の銀行口座情報が必要です。口座はオーストラリアでも日本でも構いません。会員番号が分からなくても、通常はTFNと生年月日でファンド側が照合できます。
        </p>
        <p style={BODY}>
          申請が止まりやすいのは認証（certification）です。残高が5,000ドル以上のファンドでは、パスポートとビザの認証済みコピーを求められるのが一般的で、日本からの手配には時間がかかります。先に整えておくことが、申請を止めないための要点です。
        </p>
      </Answer>

      <Answer id="how-long" heading="DASPの入金までどのくらいかかりますか。" tint>
        <p style={BODY}>
          通常、申請が承認されてから28日以内に入金されます。この28日は、ファンドまたはATOが必要なものをすべて受け取った時点から数え始めます。書類の不備や住所の不一致があると、28日が始まる前に何週間も止まることがあります。
        </p>
        <p style={BODY}>
          お金が複数のファンドに分かれている場合、全体の速さは一番遅いファンドに合わせられます。各ファンドがそれぞれ審査し、それぞれ送金するためです。すでにATOへ移管された残高はATOへ申請する形になり、期間の目安は同じです。
        </p>
      </Answer>

      <Answer id="find-your-fund" heading="どのスーパーファンドだったか分からない場合は。">
        <p style={BODY}>
          それが普通の状態で、問題にはなりません。雇用主が拠出したファンドはすべてTFNに紐づいているため、雇用主名もファンド名も会員番号も思い出せなくても、TFNから口座をたどれます。ファンドがすでにATOへ引き渡した残高も、同じ検索で見つかります。
        </p>
        <p style={BODY}>
          自動ではないのは申請そのものです。口座が見つかっても申請したことにはならず、ファンドごとに書類をそろえた個別の申請が必要になります。見落とされるのはたいてい、スーパーが何かを知る前に始めた最初の仕事です。
        </p>
      </Answer>

      <Answer id="from-overseas" heading="日本に帰国した後でも申請できますか。" tint>
        <p style={BODY}>
          できますし、むしろ帰国後でなければ申請できません。DASPはオーストラリアを完全に出国した後にしか行えない手続きで、すべての申請は国外からのものです。手続きは書類のやり取りで完結し、日本から進められます。
        </p>
        <p style={BODY}>
          DASPは日本の口座でも受け取れますが、海外口座への電子送金に対応していないファンドでは小切手が郵送され、入金と換金に時間がかかります。また、受け取った金額の日本側での扱いは日本の税制の問題ですので、日本の税理士にご確認ください。
        </p>
      </Answer>

      <Answer id="dasp-vs-leaving" heading="今受け取るか、オーストラリアに残しておくか。">
        <p style={BODY}>
          ワーキングホリデーの方のほとんどは、受け取るほうが有利です。残した残高には新しい拠出が入らない一方、手数料と保険料が引かれ続けます。ビザ失効と出国からおよそ6か月後には、未請求の残額はファンドからATOへ移管され、手数料がない代わりに運用もされません。
        </p>
        <p style={BODY}>
          残す理由は限られます。オーストラリアに戻って定住して働く予定がある場合だけで、そのときは口座に再び拠出が入るからです。待っても65%は下がりませんし、残高も増えません。
          <Link href="/ja/blog/dasp-vs-leaving-super-in-australia-pros-cons" className="font-semibold"
            style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            詳しい比較はこちら
          </Link>
          。
        </p>
      </Answer>

      <Answer id="while-in-australia" heading="オーストラリア滞在中にスーパーを受け取れますか。" tint>
        <p style={BODY}>
          受け取れません。有効なビザで国内にいる間、スーパーはロックされており、生活が苦しいといった理由での早期引き出しもできません。完全に出国していること、そしてビザが失効または取り消されていること、この2つが同時に必要です。
        </p>
        <p style={BODY}>
          ビザの期限よりかなり早く帰国する場合、残りの期間を待つ必要はありません。出国後は、残りのビザを失効まで置いておく代わりに、内務省へ取り消しを申請することができ、通常はそのぶん申請の時期が早まります。
        </p>
      </Answer>

      <Answer id="never-claimed" heading="スーパーを受け取らないままだとどうなりますか。">
        <p style={BODY}>
          なくなるわけではなく、期限もありません。ビザ失効と出国からおよそ6か月後、未請求の残高はファンドからATOへ移管されます。そこでは名義のまま手数料もかからず、請求できる状態が続きます。数年後の申請でも税率は同じ65%です。
        </p>
        <p style={BODY}>
          失われるのは、移管されるまでの数か月に口座管理手数料と保険料が残高から引いた分です。残高が小さいほど割合として重く、これは後から誰にも取り戻せません。早めに申請する理由はここにあります。
        </p>
      </Answer>

      <Answer id="with-us" heading="自分で申請するか、当社に任せるか。" tint>
        <p style={BODY}>
          ご自身で進めることもできます。そのときお預けいただくことになるのは、タックスファイルナンバーに紐づく全口座の調査（ATOが保有している分も含みます）、日本から手配する認証済みコピー、ファンドごとに分かれた個別の申請、そして返答が止まったファンドへの催促です。
        </p>

        <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #C8EAE0', margin: '22px 0 20px' }}>
          <p className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.7, marginBottom: '8px' }}>
            還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#4C6459' }}>
            ATOへ提出する前に、登録タックスエージェントが確認・承認します。
          </p>
        </div>

        <WaLink href={WA} position="section" topic="super" lang="ja"
          className="btn-primary flex justify-center"
          style={{ minHeight: '54px', width: '100%', maxWidth: '360px', fontSize: '15px', borderRadius: '100px' }}>
          WhatsAppで相談する
        </WaLink>
        <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '10px' }}>
          返信は約1時間以内。
        </p>
      </Answer>

      <section className="py-10 lg:py-14" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '18px' }}>
              スーパー受取についてのその他の質問
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '16px' }}>
            申請の一部をさらに詳しく
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/ja/blog/how-long-does-dasp-take', label: 'DASP申請にかかる期間を段階ごとに' },
              { href: '/ja/blog/dasp-documents-required', label: 'DASP申請に必要な書類の一覧' },
              { href: '/ja/blog/dasp-tax-rate-65-percent-explained', label: 'なぜDASPは65%課税なのか、手元に残る額は' },
              { href: '/ja/blog/dasp-rejected-what-to-do', label: 'DASP申請が却下されたときの対処' },
              { href: '/ja/blog/super-multiple-funds-consolidation', label: 'スーパーが複数のファンドに分かれている場合' },
              { href: '/ja/blog/dasp-vs-leaving-super-in-australia-pros-cons', label: '今受け取るか据え置くか、比較して考える' },
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
        heading="2%のメディケア税も、ほとんど誰も取り戻していません"
        body="417・462ビザの多くは、そもそも支払う義務がありません。ほとんど誰も申請しない証明書で外せます。"
        cta="メディケア税免除について読む"
        href="/ja/medicare"
      />

      <MobileCta href={WA} lang="ja" topic="super" />
    </>
  )
}
