import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "派遣と倉庫の経費控除：保護具、資格、移動",
  "description": "人材派遣で働く人が控除できるもの。派遣先ごとの保護具、資格の更新、道具、同じ日に2現場を移動した分。複数のエージェンシーの影響も解説します。",
  "keywords": [
    "派遣 税金 控除 オーストラリア",
    "倉庫 仕事 控除 オーストラリア",
    "レイバーハイヤー 税金 ワーホリ",
    "現場間 移動 控除 ATO",
    "フォークリフト 資格 控除",
    "ワーホリ 倉庫 税金",
    "複数 雇用主 タックスリターン",
    "イベント設営 仕事 税金"
  ],
  "alternates": {
    "canonical": "/ja/expenses/labouring",
    "languages": {
      "en-AU": "/expenses/labouring",
      "de": "/de/expenses/labouring",
      "ja": "/ja/expenses/labouring",
      "x-default": "/expenses/labouring"
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
    "url": `${SITE_URL}/ja/expenses/labouring`,
    "siteName": "Working Holiday Tax",
    "title": "派遣と倉庫の経費控除：保護具、資格、移動",
    "description": "2社に登録すればインカムステートメントも2通。1日に2現場ならそれは控除です。"
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "派遣と倉庫の経費控除：保護具、資格、移動",
    "description": "2社に登録すればインカムステートメントも2通。1日に2現場ならそれは控除です。"
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

const WA = waUrl({ topic: 'expenses', lang: "ja", detail: "派遣と倉庫の仕事" })

const UI = {
  "ctaLabel": "WhatsAppで相談する",
  "ctaSub": "約1時間で返信します。",
  "guaranteeHeading": "料金が還付金を超えた場合、その差額は返金します。",
  "guaranteeBody": "4社のエージェンシーと、忘れられた1日だけのシフトを1つの申告にまとめるのは、ここでは普通の仕事です。お客様は全員417・462ビザの方。申告書は当社のチームが作成し、ATOへ提出する前に登録税理士が確認して承認します。",
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
    "name": "派遣",
    "item": "/ja/expenses/labouring"
  }
]

const HERO = {
  "kicker": "倉庫、引越し、造園、イベント",
  "h1lead": "2社に登録すればステートメントも2通。",
  "h1accent": "2現場ならそれは控除です。",
  "lede": "エージェンシー1社の抜けは、なくした領収書より高くつきます。1つの申告に全社を載せる必要があります。"
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
    "h2": "エージェンシー経由で働く人は何を控除できますか？",
    "paras": [
      "控除できるのは、派遣先が求めた保護具、すでに持っている操作資格の更新、自費で買った道具、同じ日に2つの現場を移動した分、そして携帯電話の仕事使用分です。何が控除できるかは、エージェンシーの契約書の職種名ではなく、その日にやった仕事で決まります。",
      "そこが派遣の特徴です。冷蔵倉庫で1週間、造園クルーで1週間、週末はイベントの撤収となれば、必要な費用は3種類生じます。控除は1つの職種名ではなく、実際の作業に従います。"
    ]
  },
  {
    "kind": "items",
    "h2": "この仕事に固有の控除",
    "intro": "どれも派遣先に従います。エージェンシーがあなたを何と呼んだかではなく、現場が何を求めたかで考えてください。",
    "items": [
      {
        "t": "同じ日に2つの現場を移動した分",
        "d": "午前に倉庫、午後に別の現場という移動は職場間の移動で控除できます。拠点がなく週のなかで現場が変わるほど、より多くを申告できる根拠が強くなります。自宅からの最初の移動は通勤のままです。"
      },
      {
        "t": "派遣先が求めた保護具",
        "d": "安全靴、手袋、高視認性ウェア、保護メガネ、防音保護具、耐切創アームカバー。その現場の明確な危険から身を守るもので、自分で支払った場合に控除できます。"
      },
      {
        "t": "フォークリフトや高所作業車などの資格更新",
        "d": "すでに持っていて仕事で使っている資格の更新は控除できます。最初の取得は控除できません。それは派遣される資格を得るための費用で、仕事をするための費用ではないからです。最初の運転免許や最初のホワイトカードと同じ考え方です。"
      },
      {
        "t": "自費で買った道具",
        "d": "基本的な道具の持参を求める派遣先もあります。自分で買って払い戻しを受けていないものは控除でき、300ドル以下なら購入年に全額、それを超えるなら耐用年数にわたって配分します。"
      },
      {
        "t": "低温や天候に対応する保護衣類",
        "d": "冷蔵、冷凍倉庫のための防寒ジャケット、屋外の造園作業のためのレインウェア。仕事が置く状況から身を守るものなので、普段着ではなく保護衣類として扱われます。"
      },
      {
        "t": "携帯電話の仕事使用分",
        "d": "エージェンシーは連絡で動きます。朝6時のシフト案内、現場の住所、タイムシート。自分の携帯を使っているなら、契約の仕事使用割合は本物の控除です。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "派遣先をまたいで何を残しておきますか？",
    "paras": [
      "1つの控除に3つのテストです。自分で支払ったこと、払い戻されていないこと、申告する収入を得るために使ったこと。派遣なら、自費で買った安全靴や手袋の領収書、資格更新の控え、そして移動した日付、現場、距離のメモです。",
      "記録は領収書でも請求書でも銀行明細でもスマホの写真でもよく、金額、日付、支払先、内容が分かれば足ります。5年間は保管してください。その年の仕事関連の控除が合計300ドル以下なら書面の証拠は不要ですが、金額の根拠は説明できる必要があります。装備を一度に償却するか耐用年数で配分するかを決める300ドルとは、別のルールです。"
    ]
  },
  {
    "kind": "traps",
    "h2": "派遣で働く人がよく間違えることは？",
    "intro": "誤った申告はたいてい衣類と通勤です。取りこぼしはほぼすべて雇用主の数に関するもので、派遣が静かに損をするのはそこです。",
    "wrong": [
      {
        "t": "保護機能のない作業ズボンや靴",
        "d": "無地の作業ズボン、Tシャツ、丈夫なだけの普通の靴。普段着は、どれだけ重労働でも、どれだけ早くすり減っても私的なままです。"
      },
      {
        "t": "1つの決まった現場への通勤",
        "d": "エージェンシーが2か月間同じ倉庫に派遣しているなら、そこへの運転は通常の通勤であって巡回勤務ではありません。控除できるようにするのは職場間の移動であって、エージェンシーが送ったという事実ではありません。"
      },
      {
        "t": "エージェンシーが支給した装備",
        "d": "多くのエージェンシーは高視認性ウェアを、ときには安全靴も支給します。支給されたもの、払い戻されたものに、あなたの負担は残っていません。"
      },
      {
        "t": "最初の資格を仕事の費用として扱うこと",
        "d": "エージェンシーに紹介してもらうために取ったフォークリフト資格は、資格取得の費用であって仕事の費用ではありません。派遣されてからの更新は控除できます。"
      },
      {
        "t": "エージェンシーが税金を処理してくれたと思い込むこと",
        "d": "エージェンシーは源泉徴収し、給与を報告します。あなたの申告はしませんし、控除も申告しませんし、他の2社があなたの情報を正しく登録したかも確認しません。"
      }
    ],
    "missed": [
      {
        "t": "忘れられたエージェンシーのインカムステートメント",
        "d": "派遣で最も典型的な失敗です。3月にあるエージェンシーで3週間、6月に別の州で1シフト。それらが抜けたまま申告されます。後で修正が必要になるため、控除の取りこぼしより深刻です。"
      },
      {
        "t": "1日に2現場を移動した分",
        "d": "クルーを動かすエージェンシーではよくあることですが、移動を決めたのが自分ではないため、ほとんど申告されません。それでも職場間の移動として控除できます。"
      },
      {
        "t": "派遣の合間に自分で買った安全靴や手袋",
        "d": "次の仕事を受けるために買った装備は急いで支払われ、領収書が残りません。300ドル以下なら1点ごとに購入年の全額控除になります。"
      },
      {
        "t": "現金で払った資格の更新",
        "d": "フォークリフトや高所作業車の更新は安いため7月には忘れがちですが、その資格ですでに働いているなら控除できます。"
      },
      {
        "t": "誤った税率で徴収された期間",
        "d": "Tax File Number Declarationをまだ処理していない新しいエージェンシーや、ワーキングホリデーメーカーの雇用主として登録していないエージェンシーは、15%を大きく上回る額を徴収します。それはすべてのエージェンシーをまとめた申告でのみ戻ります。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "1年の回り方で決まるのはどこですか？",
    "paras": [
      "どれだけ巡回的な働き方だったかが、移動のどこまでを控除できるかを決めます。ルールではなく事実認定です。現場がどれだけ変わったか、いつも戻る拠点があったか、エージェンシーが移動を求めていたか、1週間がどう組まれていたか。同じエージェンシーの2人でも控除額は大きく変わり、日付、現場、距離のメモが強い主張を裏づけます。",
      "エージェンシーはそれぞれ別の雇用主なので、Tax File Number Declarationも源泉徴収の関係もインカムステートメントも別々になります。ワーキングホリデーメーカーなら非課税枠の質問の正しい答えはどこでも「いいえ」なので、二重に非課税枠を使う典型的な問題は通常起きません。起きるのは、誤った税率の適用と、申告から抜ける雇用主です。",
      "その下にあるのが税務上の居住区分で、このページのすべての控除より価値があります。イギリス、ドイツ、日本のパスポート保持者で税務上オーストラリア居住者だった人は、Addy判決のもとで満額の非課税枠を受けられる可能性があります。1つの都市にとどまり、地元のエージェンシーで長く働く形は、この問いが現実になるパターンです。"
    ]
  }
]

const FAQS = [
  {
    "question": "3社のエージェンシーに登録しています。税金は変わりますか？",
    "answer": "エージェンシーはそれぞれ法的に別の雇用主なので、各社でTax File Number Declarationを書き、年度末には各社からインカムステートメントを受け取ります。それらはすべて1つの申告に入ります。ワーキングホリデーメーカーの賃金は非課税枠ではなくワーキングホリデーメーカーの税率で課税されるため、複数社で危ないのは税率ではなく、どこか1社が抜けることです。"
  },
  {
    "question": "別々の現場の間の移動は控除できますか？",
    "answer": "たいていできます。午前に倉庫、午後に別の現場のように、2つ以上の別々の作業場所の間を移動する分は控除でき、自宅から1つの決まった職場への通常の移動とは扱いが違います。どこまでが対象になるかは、その働き方がどれだけ巡回的かによるので、日付、現場、距離をメモしておいてください。"
  },
  {
    "question": "税務上、派遣と建設は何が違いますか？",
    "answer": "判定基準は同じで、項目が違います。建設現場ではたいていホワイトカードと現場用の保護具が必要ですが、一般的な派遣は倉庫、引越し、造園、生産ライン、イベントまで幅広く、必要な装備は派遣先によって決まり、ホワイトカードが不要なことも多くあります。派遣先が建設現場中心なら、建設のページでホワイトカードの費用や現場用装備をより詳しく扱っています。"
  },
  {
    "question": "フォークリフトの資格は控除できますか？",
    "answer": "更新なら控除でき、初回の取得なら控除できません。境目は、その資格ですでに働いていたかどうかです。派遣に応募するために取った段階では、まだ仕事の費用になっていません。高所作業車の資格、ホワイトカード、運転免許にも同じ境目が当てはまります。"
  },
  {
    "question": "数シフトしか働いていません。それでも申告する意味はありますか？",
    "answer": "たいていあります。自分で支払い、払い戻しを受けていないことが条件です。数シフトでも安全靴、手袋、資格の更新、現場間の移動といった費用は生じますし、控除は課税対象になる収入を減らします。判定基準はシフトの数で変わりません。仕事に関係し、払い戻しがなく、記録を示せることです。"
  }
]

const GUIDES = [
  {
    "href": "/ja/blog/labour-hire-agencies-working-holiday-australia",
    "label": "人材派遣会社の仕組み",
    "desc": "派遣されたとき、雇用主は誰になるのか。"
  },
  {
    "href": "/ja/blog/white-card-australia-working-holiday",
    "label": "ホワイトカードと、その費用",
    "desc": "取得方法と、最初の1枚が控除にならない理由。"
  },
  {
    "href": "/ja/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "300ドル以下の道具は全額即時控除",
    "desc": "1点ずつ判定される理由と、セット購入で変わる点。"
  }
]

const SERVICES = [
  {
    "href": "/ja/tax-return",
    "label": "タックスリターン"
  },
  {
    "href": "/ja/tfn",
    "label": "TFN"
  },
  {
    "href": "/ja/superannuation",
    "label": "スーパーアニュエーション"
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
  headline: "派遣と倉庫の経費控除：保護具、資格、移動",
  description: "2社に登録すればインカムステートメントも2通。1日に2現場ならそれは控除です。",
  url: `${SITE_URL}/ja/expenses/labouring`,
  inLanguage: "ja-JP",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/expenses/labouring#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/expenses/labouring`,
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
