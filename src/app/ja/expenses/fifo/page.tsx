import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "FIFOの経費控除：保護具、資格、Zone Offset",
  "description": "FIFOやキャンプで働く人が控除できるもの。保護具と道具、資格の更新、メディカル、携帯の仕事使用分。Zone Tax Offsetは基本的に対象外です。",
  "keywords": [
    "FIFO 税金 控除 オーストラリア",
    "フライインフライアウト 税金",
    "Zone Tax Offset FIFO",
    "FIFO キャンプ 宿泊 税金",
    "High Risk Work Licence 控除",
    "FIFO 保護具 控除",
    "ワーホリ FIFO 税金",
    "鉱山 仕事 控除 オーストラリア"
  ],
  "alternates": {
    "canonical": "/ja/expenses/fifo",
    "languages": {
      "en-AU": "/expenses/fifo",
      "de": "/de/expenses/fifo",
      "ja": "/ja/expenses/fifo",
      "x-default": "/expenses/fifo"
    }
  },
  "openGraph": {
    "images": [
      {
        "url": `${SITE_URL}/og-image.png`,
        "width": 1200,
        "height": 630,
        "alt": "Working Holiday Tax"
      }
    ],
    "type": "website",
    "locale": "ja_JP",
    "url": `${SITE_URL}/ja/expenses/fifo`,
    "siteName": "Working Holiday Tax",
    "title": "FIFOの経費控除：保護具、資格、Zone Offset",
    "description": "キャンプの食事も空港までの運転も控除できません。Zone Tax Offsetもおそらく対象外です。"
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "FIFOの経費控除：保護具、資格、Zone Offset",
    "description": "キャンプの食事も空港までの運転も控除できません。Zone Tax Offsetもおそらく対象外です。"
  },
  "robots": {
    "index": true,
    "follow": true,
    "googleBot": {
      "index": true,
      "follow": true,
      "max-snippet": -1,
      "max-image-preview": "large"
    }
  }
}

const WA = waUrl({ topic: 'expenses', lang: "ja", detail: "FIFOとキャンプの仕事" })

const UI = {
  "ctaLabel": "WhatsAppで相談する",
  "ctaSub": "約1時間で返信します。",
  "guaranteeHeading": "料金を下回る還付なら、差額は返金します。お客様の持ち出しはありません。",
  "guaranteeBody": "扱うのは417・462ビザだけなので、Zone Offset、居住区分、3つのファンドに散ったスーパーをまとめて見ます。申告書は当社のチームが作成し、提出の前に登録税理士が確認して承認します。",
  "faqHeading": "よくある質問",
  "guidesHeading": "次に読むと役に立つガイド",
  "otherJobs": "別の仕事の場合は、職種別の一覧へ。",
  "servicesLabel": "サイト内の関連ページ",
  "wrongLabel": "控除できないのに申告されがちなもの",
  "missedLabel": "控除できるのに申告されないもの",
  "disclaimer": "これは一般的な情報であり、個別の税務アドバイスではありません。何を控除できるかは、雇用主、手元の記録、実際の働き方によって変わります。当社にご依頼いただいた場合は、あなたの状況を一つずつ確認し、控除できるものはすべて申告し、できないものは申告しません。",
  "hubHref": "/ja/expenses"
}

const CRUMBS = [
  {
    "name": "ホーム",
    "item": "/ja"
  },
  {
    "name": "控除",
    "item": "/ja/expenses"
  },
  {
    "name": "FIFO",
    "item": "/ja/expenses/fifo"
  }
]

const HERO = {
  "kicker": "ローター、キャンプ、遠隔地の現場",
  "h1lead": "Zone Tax Offsetはおそらく対象外です。",
  "h1accent": "対象になるのはこちらです。",
  "lede": "キャンプの部屋も、メスホールの食事も、現場へのフライトも会社の費用です。あなたに残るのは保護具、資格の更新、メディカル、そして携帯です。"
}

type Section =
  | { kind: 'answer'; h2: string; paras: string[] }
  | { kind: 'items'; h2: string; intro: string; items: { t: string; d: string }[] }
  | { kind: 'traps'; h2: string; intro: string; wrong: { t: string; d: string }[]; missed: { t: string; d: string }[] }
  | { kind: 'numbered'; h2: string; intro: string; steps: string[]; note?: string }
  | { kind: 'tables'; h2: string; intro: string; tables: { label: string; rows: string[][] }[]; note?: string }
  | { kind: 'occupations'; h2: string; intro: string; jobs: { href: string; title: string; line: string }[] }
  | { kind: 'note'; label: string; title: string; body: string }

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "FIFOで働く人は何を控除できますか？",
    "paras": [
      "控除できるのは、自費で買った保護具とその洗濯、道具と機材、すでに持っている資格やライセンスの更新、雇用主が求めるメディカルや薬物アルコール検査で自費だったもの、携帯とインターネットの仕事使用分、そして今の仕事に関係する研修です。",
      "そのリストに入らないのが、FIFOを高くつくものに見せているすべてです。キャンプの部屋もメスホールの食事も会社が手配して支払っており、現場までのフライトもたいていそうです。控除は自分の財布から出たお金しか戻せないので、キャンプ生活の費用が高いこと自体は申告に何も乗せません。"
    ]
  },
  {
    "kind": "items",
    "h2": "この仕事に固有の控除",
    "intro": "ここにあるものすべてに同じ条件が付きます。自分で払ったこと、そして会社の支給品ではないことです。",
    "items": [
      {
        "t": "自費で買った保護具と、その洗濯",
        "d": "ツナギ、安全靴、手袋、保護ゴーグル、防音保護具、マスク。現場の具体的な危険から身を守るため控除できます。控除できる保護衣類の洗濯もATOの単価で申告でき、仕事着だけなら1回1ドル、私服と一緒なら50セントです。"
      },
      {
        "t": "道具と機材",
        "d": "仕事のために買い、会社の支給品ではないもの。1点300ドル以下なら購入年に全額控除し、それを超えるなら耐用年数にわたって配分します。合計300ドル以上の工具セットは1つの資産です。"
      },
      {
        "t": "持っている資格やライセンスの更新",
        "d": "High Risk Work Licence、Working at Heightsの資格、フォークリフト資格。すでにその役割で働いていれば更新は控除できます。最初の取得は、最初のホワイトカードや最初の運転免許と同じ理由で控除できません。"
      },
      {
        "t": "雇用主が求めるメディカルと検査",
        "d": "多くの現場が就業条件として事前メディカルと薬物アルコール検査を求めます。すでに就いている役割のために雇用主が求め、あなたが自費で払った場合、その費用は控除できます。"
      },
      {
        "t": "携帯とインターネットの仕事使用分",
        "d": "ローターの確認、タイムシートの提出、必須のオンライン導入教育や再教育。全額ではなく、公正で正直な根拠に基づく仕事使用割合を申告します。"
      },
      {
        "t": "今の仕事に関係する研修",
        "d": "今の技能や資格を維持する短期の講座やユニットは控除でき、雇用主の指示で拠点を離れて受講する場合は移動と宿泊も対象です。役割に就く資格を得るための最初の入門資格は対象外です。"
      }
    ]
  },
  {
    "kind": "note",
    "label": "FIFO最大の誤解",
    "title": "ゾーンで働くことと、ゾーンに住むことは別です。",
    "body": "2015年の法改正以降、Zone Tax Offsetはローターがどこへ連れて行くかではなく、通常の居住地がどこかで決まります。通常の居住地そのものが、指定された遠隔地ゾーン内に年間183日を超えて所在している必要があります。スイングの合間にパース、ブリスベン、ダーウィンに住みながらゾーン内へ飛んで働く形は、年の大半を現場で過ごしていてもこの条件を満たしません。キャンプは一時的でローターに結びついているため、通常の居住地にはあたりません。FIFOのローターで働くワーキングホリデーメーカーのほとんどにとって、このオフセットは該当しません。申告書に書き込まれてから気づくより、先に知っておくほうが安全です。"
  },
  {
    "kind": "answer",
    "h2": "FIFOの控除には何の裏づけが要りますか？",
    "paras": [
      "控除は3つの問いを通ります。自分で払ったか。払い戻されなかったか。申告する収入を得るために使ったか。ローター勤務なら、支給されなかった安全靴の領収書、メディカルの請求書、そして携帯の仕事使用割合の根拠になる明細です。",
      "必要なのは金額、日付、支払先、内容で、領収書でも請求書でも銀行明細でもレジで撮った写真でも構いません。5年間は保管してください。その年の仕事関連の控除が合計300ドル以下なら書面の証拠は不要ですが、金額の根拠は説明できる必要があります。工具を一度に償却するか耐用年数で配分するかを決める300ドルとは、別のルールです。"
    ]
  },
  {
    "kind": "traps",
    "h2": "FIFOで働く人がよく間違えることは？",
    "intro": "このサイトのどの職種より、自信たっぷりに繰り返される誤情報が多い分野です。以下は毎年申告されていて、通らないものです。",
    "wrong": [
      {
        "t": "Zone Tax Offset",
        "d": "FIFOで働く人が権利もないのに最も多く申告するものです。決め手は飛んで行く先ではなく通常どこに住んでいるかで、キャンプは住んでいることになりません。"
      },
      {
        "t": "キャンプの宿泊と食事",
        "d": "部屋もメスホールも雇用主が手配して支払っており、本当に遠隔地の現場では通常、会社側の非課税のフリンジベネフィットとして扱われ、あなたの収入にはなりません。いずれにせよ支払っていないので、控除するものがありません。"
      },
      {
        "t": "スイング前の空港までの運転",
        "d": "それは通常の通勤です。フライトがどれだけ早くても、空港がどれだけ遠くても変わりません。かさばる道具の狭い例外はありますが、かさばるものがないか安全に置ける場所があるキャンプサービス職では、まず当てはまりません。"
      },
      {
        "t": "仕事のためのパースやブリスベンへの引越し",
        "d": "FIFOの仕事に就くために行った引越しの航空券、荷物の輸送、一時的な宿泊は私的な移転費用です。収入を得られる状態に自分を置くことは、収入を得ることとは違います。"
      },
      {
        "t": "最初のHigh Risk Work Licence",
        "d": "雇ってもらうために払った資格は私的な費用です。その資格ですでに働いている状態での更新は控除できます。"
      }
    ],
    "missed": [
      {
        "t": "自費で買った保護具と、その洗濯",
        "d": "支給を待たずに自分で安全靴や手袋を買う人は多いのに、装備も、公表単価での洗濯も申告されないままになっています。"
      },
      {
        "t": "自費で払ったメディカルと薬物アルコール検査",
        "d": "すでに就いている役割のために雇用主が求めているなら控除できます。支出ではなく通過儀礼のように感じられるため、ほとんど申告されません。"
      },
      {
        "t": "スイング中の携帯とインターネットの仕事使用分",
        "d": "ローター、タイムシート、必須の導入教育はすべて個人の端末で行われます。金額は控えめでも、まったく正当な控除です。"
      },
      {
        "t": "長いローターの1年での資格更新",
        "d": "スイングの合間に払ったHigh Risk Work LicenceやWorking at Heightsの更新は、年度末には見失いやすいものです。"
      },
      {
        "t": "複数の基金に残されたスーパーアニュエーション",
        "d": "FIFOは賃金が高いぶん、スーパーの残高も他のワーホリの仕事より大きくなります。出国してもそのまま残るので、ビザが失効したあとにDASPとして請求する必要があります。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "FIFOで結論が開いたままなのはどこですか？",
    "paras": [
      "Zone Tax Offsetは不可能ではなく、たいてい当てはまらないだけです。ワーキングホリデー中の拠点が指定ゾーン内にあった場合、たとえば大都市ではなく遠隔地の町の賃貸に住んでいた場合は、この問いは現実のものになります。通常どこに住み、どれだけの期間、そこに何を置いていたかで決まります。",
      "かさばる道具の例外は、キャンプサービス職より、自前の工具セットを持って飛ぶ職人にとって重要です。何を運んだか、現場がどんな保管を用意していたかで決まり、確認される控除なので事実を説明できるようにしておいてください。",
      "FIFOの申告で最大の問いは税務上の居住区分です。金額が大きいからです。長いスイング、その合間の固定した拠点、年単位の滞在という形は、イギリス、ドイツ、日本のパスポート保持者が税務上オーストラリア居住者だった場合にAddy判決が最も当てはまりやすいパターンです。その年の実態に対する判断なので、きちんと見てもらう価値があります。"
    ]
  }
]

const FAQS = [
  {
    "question": "FIFOで働くとZone Tax Offsetをもらえますか？",
    "answer": "たいていもらえません。これがFIFOの税金で最大の誤解です。2015年の法改正以降、条件は物理的にどこで働くかではなく、通常の居住地が指定された遠隔地ゾーン内に年間183日を超えて所在していることです。スイングの合間に大都市に住みながらゾーン内の現場へ飛ぶ形はこの条件を満たしませんし、キャンプの宿泊は一時的でローターに結びついているため通常の居住地とは扱われません。"
  },
  {
    "question": "キャンプの宿泊や食事は控除できますか？",
    "answer": "できません。控除は自分の財布から出たお金しか戻せません。現場での部屋も食事も雇用主が手配して支払っているため、あなたの側に支出が存在しないからです。給与の額も、キャンプの環境がどうかも、この結論を変えません。"
  },
  {
    "question": "スイング前の空港までの運転は控除できますか？",
    "answer": "ほぼすべての場合できません。自宅から出発する空港までの移動は、他の人が職場へ向かうのと同じ通常の私的な通勤で、フライトがどれだけ早くても変わりません。本当にかさばる必要不可欠な道具を運ばなければならず、職場に安全に保管できない場合の狭い例外はありますが、キャンプサービス職ではまず当てはまりません。"
  },
  {
    "question": "High Risk Work Licenceは控除できますか？",
    "answer": "すでに持っているライセンスの更新は控除できます。最初の取得は控除できません。それはその役割に就く資格を得るための費用で、すでに就いている仕事をするための費用ではないからです。ATOが建設のホワイトカードや最初の運転免許に適用しているのと同じ、最初の取得と更新の区別です。"
  },
  {
    "question": "ローター中の携帯とインターネットは何を控除できますか？",
    "answer": "仕事使用分です。自分の携帯やインターネットをローターの確認、タイムシートの提出、必須のオンライン導入教育や研修に使っているなら、その割合は控除できます。割合には公正で正直な見積もりが必要です。他のことにも使っている端末で全額を申告しても通りません。"
  }
]

const GUIDES = [
  {
    "href": "/ja/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "300ドル以下の道具は全額即時控除",
    "desc": "1点ずつ判定される理由と、セット購入で変わる点。"
  },
  {
    "href": "/ja/blog/1000-dollar-instant-deduction-rule-2026",
    "label": "2026年7月1日からの1,000ドル定額控除",
    "desc": "領収書なしの定額か、実費か。選べるのは片方だけ。"
  },
  {
    "href": "/ja/superannuation",
    "label": "出国時のスーパーアニュエーション請求",
    "desc": "DASPの仕組みと、そこから引かれる税。"
  }
]

const SERVICES = [
  {
    "href": "/ja/tax-return",
    "label": "タックスリターン"
  },
  {
    "href": "/ja/superannuation",
    "label": "スーパーアニュエーション"
  },
  {
    "href": "/ja/blog/tax-residency-working-holiday-makers",
    "label": "税務上の居住区分"
  }
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: CRUMBS.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: b.name,
    item: `${SITE_URL}${b.item === '/' ? '' : b.item}`,
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "FIFOの経費控除：保護具、資格、Zone Offset",
  description: "キャンプの食事も空港までの運転も控除できません。Zone Tax Offsetもおそらく対象外です。",
  url: `${SITE_URL}/ja/expenses/fifo`,
  inLanguage: "ja-JP",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/expenses/fifo#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/expenses/fifo`,
}

/* Tokens kept local so this page does not depend on shared CSS being finished. */
const INK = '#080F0D'
const BODY = '#2A3C34'
const MUTED = '#4C6459'
const FOREST = '#0B5240'
const HAIR = '#E2EFE9'
const SUNKEN = '#F5F9F7'
const WARN = '#B54708'

const wrap: React.CSSProperties = { maxWidth: '720px', margin: '0 auto', padding: '0 20px' }
const h2s: React.CSSProperties = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: 'clamp(23px, 5.6vw, 30px)',
  lineHeight: 1.22,
  letterSpacing: '-0.02em',
  fontWeight: 700,
  color: INK,
  margin: '0 0 14px',
}
const h3s: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: 1.35,
  fontWeight: 700,
  color: INK,
  margin: '0 0 6px',
}
const ps: React.CSSProperties = { fontSize: '15px', lineHeight: 1.62, color: BODY, margin: '0 0 14px' }
const secLight: React.CSSProperties = { background: '#fff', padding: '34px 0' }
const secSunk: React.CSSProperties = { background: SUNKEN, padding: '34px 0' }
const kickerS: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: FOREST,
  margin: '0 0 10px',
}

function Cta({ position }: { position: 'hero' | 'inline' | 'section' }) {
  return (
    <div style={{ margin: '18px 0 0' }}>
      <WaLink
        href={WA}
        position={position}
        topic="expenses"
        lang={"ja"}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '52px',
          padding: '0 28px',
          background: FOREST,
          color: '#fff',
          borderRadius: '999px',
          fontSize: '16px',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        {UI.ctaLabel}
      </WaLink>
      <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: MUTED, margin: '10px 0 0', textAlign: 'center' }}>
        {UI.ctaSub}
      </p>
    </div>
  )
}

function Bullets({ label, colour, items }: { label: string; colour: string; items: { t: string; d: string }[] }) {
  return (
    <div style={{ marginTop: '22px' }}>
      <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: colour, margin: '0 0 12px' }}>
        {label}
      </p>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: '13px 0' }}>
          <p style={h3s}>{it.t}</p>
          <p style={{ ...ps, margin: 0 }}>{it.d}</p>
        </div>
      ))}
    </div>
  )
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main style={{ background: '#fff' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(160deg,#fff 0%,#F2FAF7 100%)', paddingTop: '68px' }}>
          <div style={{ ...wrap, paddingTop: '18px', paddingBottom: '34px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '18px' }}>
              <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', margin: 0, padding: 0, fontSize: '13px', color: MUTED }}>
                {CRUMBS.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {i > 0 && <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>}
                    {i === CRUMBS.length - 1 ? (
                      <span aria-current="page" style={{ color: FOREST, fontWeight: 500 }}>{b.name}</span>
                    ) : (
                      <Link href={b.item} style={{ color: MUTED, minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>{b.name}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <p style={kickerS}>{HERO.kicker}</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(30px, 8.2vw, 46px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                fontWeight: 700,
                color: INK,
                margin: '0 0 14px',
              }}
            >
              {HERO.h1lead}
              <span style={{ color: FOREST }}>{HERO.h1accent}</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: '16.5px', lineHeight: 1.6, color: BODY, margin: 0 }}>
              {HERO.lede}
            </p>
            <Cta position="hero" />
          </div>
        </section>

        {/* BODY SECTIONS */}
        {SECTIONS.map((s, i) => (
          <section key={i} style={i % 2 === 0 ? secLight : secSunk}>
            <div style={wrap}>
              {s.kind === 'answer' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  {s.paras.map((p, j) => (
                    <p key={j} style={{ ...ps, margin: j === s.paras.length - 1 ? 0 : ps.margin }}>{p}</p>
                  ))}
                </>
              )}

              {s.kind === 'items' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  {s.items.map((it, j) => (
                    <div key={j} style={{ borderTop: `1px solid ${HAIR}`, padding: '15px 0' }}>
                      <p style={h3s}>{it.t}</p>
                      <p style={{ ...ps, margin: 0 }}>{it.d}</p>
                    </div>
                  ))}
                </>
              )}

              {s.kind === 'traps' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={{ ...ps, margin: 0 }}>{s.intro}</p>
                  <Bullets label={UI.wrongLabel} colour={WARN} items={s.wrong} />
                  <Bullets label={UI.missedLabel} colour={FOREST} items={s.missed} />
                </>
              )}

              {s.kind === 'numbered' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {s.steps.map((t, j) => (
                      <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '14px 16px' }}>
                        <span aria-hidden="true" style={{ flex: '0 0 26px', width: '26px', height: '26px', borderRadius: '999px', background: FOREST, color: '#fff', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{j + 1}</span>
                        <span style={{ fontSize: '15px', lineHeight: 1.55, color: BODY }}>{t}</span>
                      </li>
                    ))}
                  </ol>
                  {s.note && <p style={{ ...ps, marginTop: '16px', marginBottom: 0 }}>{s.note}</p>}
                </>
              )}

              {s.kind === 'tables' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {s.tables.map((t, j) => (
                      <div key={j} style={{ background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '14px', overflow: 'hidden' }}>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: FOREST, margin: 0, padding: '13px 16px', borderBottom: `1px solid ${HAIR}` }}>{t.label}</p>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                              {t.rows.map((r, k) => (
                                <tr key={k} style={{ borderTop: k ? `1px solid ${HAIR}` : 'none' }}>
                                  <th scope="row" style={{ textAlign: 'left', fontSize: '13.5px', fontWeight: 600, color: INK, padding: '11px 16px', width: '46%' }}>{r[0]}</th>
                                  <td style={{ fontSize: '13.5px', color: BODY, padding: '11px 16px' }}>{r[1]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                  {s.note && <p style={{ ...ps, marginTop: '16px', marginBottom: 0 }}>{s.note}</p>}
                </>
              )}

              {s.kind === 'occupations' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {s.jobs.map((jb, j) => (
                      <Link key={j} href={jb.href} style={{ display: 'block', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '15px 16px', textDecoration: 'none', minHeight: '44px' }}>
                        <span style={{ display: 'block', fontSize: '16px', fontWeight: 700, color: FOREST, marginBottom: '4px' }}>{jb.title}</span>
                        <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.5, color: BODY }}>{jb.line}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {s.kind === 'note' && (
                <div style={{ background: '#FDF0D5', border: '1px solid #F9D88A', borderLeft: '4px solid #E9A020', borderRadius: '12px', padding: '18px 18px' }}>
                  <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: WARN, margin: '0 0 8px' }}>{s.label}</p>
                  <p style={{ ...h3s, marginBottom: '8px' }}>{s.title}</p>
                  <p style={{ ...ps, margin: 0 }}>{s.body}</p>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* GUARANTEE + CTA */}
        <section style={{ background: '#0B5240', padding: '38px 0' }}>
          <div style={wrap}>
            <h2 style={{ ...h2s, color: '#fff', marginBottom: '12px' }}>{UI.guaranteeHeading}</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.62, color: 'rgba(255,255,255,0.78)', margin: 0 }}>
              {UI.guaranteeBody}
            </p>
            <div style={{ marginTop: '18px' }}>
              <WaLink
                href={WA}
                position="section"
                topic="expenses"
                lang={"ja"}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '52px',
                  padding: '0 28px',
                  background: '#E9A020',
                  color: '#1A2822',
                  borderRadius: '999px',
                  fontSize: '16px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {UI.ctaLabel}
              </WaLink>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)', margin: '10px 0 0', textAlign: 'center' }}>
                {UI.ctaSub}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={secLight}>
          <div style={wrap}>
            <h2 style={h2s}>{UI.faqHeading}</h2>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: '16px 0' }}>
                <h3 style={{ ...h3s, marginBottom: '8px' }}>{f.question}</h3>
                <p style={{ ...ps, margin: 0 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GUIDES */}
        <section style={secSunk}>
          <div style={wrap}>
            <h2 style={h2s}>{UI.guidesHeading}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {GUIDES.map((g, i) => (
                <Link key={i} href={g.href} style={{ display: 'block', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '15px 16px', textDecoration: 'none', minHeight: '44px' }}>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: FOREST, marginBottom: '3px' }}>{g.label}</span>
                  <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.5, color: BODY }}>{g.desc}</span>
                </Link>
              ))}
            </div>

            <p style={{ ...kickerS, marginTop: '24px' }}>{UI.servicesLabel}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SERVICES.map((s, i) => (
                <Link key={i} href={s.href} style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '0 16px', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '999px', fontSize: '15px', fontWeight: 600, color: FOREST, textDecoration: 'none' }}>
                  {s.label}
                </Link>
              ))}
            </div>
            <p style={{ ...ps, marginTop: '18px', marginBottom: 0 }}>
              <Link href={UI.hubHref} style={{ color: FOREST, textDecoration: 'underline' }}>{UI.otherJobs}</Link>
            </p>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section style={{ ...secLight, paddingBottom: '52px' }}>
          <div style={wrap}>
            <p style={{ fontSize: '13.5px', lineHeight: 1.62, color: MUTED, margin: 0 }}>{UI.disclaimer}</p>
          </div>
        </section>

      </main>

      <MobileCta href={WA} lang={"ja"} topic="expenses" />
    </>
  )
}
