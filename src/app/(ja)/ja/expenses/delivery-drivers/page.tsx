import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/(site)/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "デリバリーの経費控除：車、携帯、GST",
  "description": "Uber Eats、DoorDash、Menulogなどの配達員が控除できるもの。車や自転車の維持費、携帯の仕事使用分、バッグや装備。",
  "keywords": [
    "デリバリー 税金 控除 オーストラリア",
    "Uber Eats 税金 ワーホリ",
    "DoorDash 税金 オーストラリア",
    "フードデリバリー 経費 控除",
    "キロメートル単価 配達",
    "デリバリー ABN ワーホリ",
    "GST ライドシェア オーストラリア",
    "自転車 配達 控除"
  ],
  "alternates": {
    "canonical": "/ja/expenses/delivery-drivers",
    "languages": {
      "en-AU": "/expenses/delivery-drivers",
      "de": "/de/expenses/delivery-drivers",
      "ja": "/ja/expenses/delivery-drivers",
      "x-default": "/expenses/delivery-drivers"
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
    "url": `${SITE_URL}/ja/expenses/delivery-drivers`,
    "siteName": "Working Holiday Tax",
    "title": "デリバリーの経費控除：車、携帯、GST",
    "description": "走行距離と携帯の仕事使用分がすべてです。罰金と私的な区間は最初から対象外です。"
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "デリバリーの経費控除：車、携帯、GST",
    "description": "走行距離と携帯の仕事使用分がすべてです。罰金と私的な区間は最初から対象外です。"
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

const WA = waUrl({ topic: 'expenses', lang: "ja", detail: "デリバリーとライドシェア" })

const UI = {
  "ctaLabel": "WhatsAppで相談する",
  "ctaSub": "約1時間で返信します。",
  "guaranteeHeading": "還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。",
  "guaranteeBody": "417・462ビザのプラットフォーム配達員は、当社の仕事の大きな部分を占めます。だから運転日誌の選択とGSTの線引きは、申告書を書き始める前に片づきます。申告書は、ATOへ提出する前に登録税理士が確認して承認します。",
  "faqHeading": "よくある質問",
  "guidesHeading": "次に読むと役に立つガイド",
  "otherJobs": "別の仕事の場合は、職種別の一覧へ。",
  "servicesLabel": "サイト内の関連ページ",
  "wrongLabel": "控除できないのに申告されがちなもの",
  "missedLabel": "控除できるのに申告されないもの",
  "disclaimer": "これは一般的な情報であり、個別の税務アドバイスではありません。何を控除できるかは、雇用主、手元の記録、実際の働き方によって変わります。当社にご依頼いただいた場合は、あなたの状況を一つずつ確認します。",
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
    "name": "デリバリー",
    "item": "/ja/expenses/delivery-drivers"
  }
]

const HERO = {
  "kicker": "Uber Eats、DoorDash、Menulog、Amazon Flex",
  "h1lead": "走行距離が控除の中心です。",
  "h1accent": "他はほとんど小さな額です。",
  "lede": "キロメートル単価か運転日誌か。1台につき年に1つだけ選べます。ここを間違えるのが、この仕事でいちばん高くつくミスです。"
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
    "h2": "デリバリーの配達員は何を控除できますか？",
    "paras": [
      "控除できるのは、車、自転車、スクーターの維持費の仕事使用分、携帯とデータ通信の仕事使用分、勤務中に払った駐車料金、食品を運べる状態に保つための清掃、そして保温バッグ、スマホホルダー、ヘルメット、高視認性ウェアなど仕事のために買った装備です。私的な部分は除きます。",
      "金額のほとんどは車両にあります。安定して走る配達員は他のワーホリの仕事では生じない距離を走り、2つの計算方法の差は1年で見れば他のすべての控除を合わせたより大きくなることも珍しくありません。"
    ]
  },
  {
    "kind": "items",
    "h2": "この仕事に固有の控除",
    "intro": "ここにあるものはすべて按分します。仕事使用分だけを控除し、その割合には合理的な根拠が必要です。",
    "items": [
      {
        "t": "車の維持費",
        "d": "キロメートル単価方式か運転日誌で計算します。下の表で比較しています。運転日誌なら実際の維持費を仕事使用割合で拾え、キロメートル単価方式はそれらをまとめた定額です。"
      },
      {
        "t": "自転車、電動アシスト自転車、スクーターの費用",
        "d": "維持、修理、点検の費用を仕事使用分だけ控除でき、ヘルメット、高視認性ウェア、ライトも対象です。自転車やスクーターは税務上「車」ではないのでキロメートル単価方式は使えず、実費を按分して申告します。"
      },
      {
        "t": "携帯とデータの仕事使用分",
        "d": "仕事全体がアプリで動くので、配達アプリ、ナビ、注文の連絡に使った割合は本物の控除です。代表的な期間をとって正直に割合を出してください。"
      },
      {
        "t": "勤務中に払った駐車料金",
        "d": "注文の袋詰めを待つ間のショッピングセンターの5ドルは控除できます。罰金は理由を問わず控除できません。"
      },
      {
        "t": "仕事のために買った装備",
        "d": "保温デリバリーバッグ、スマホホルダー、充電器、自転車の鍵、レインウェア、ヘッドライト。1点300ドル以下なら購入年に全額控除できます。"
      },
      {
        "t": "仕事のための車両の清掃",
        "d": "食品を運べる状態に車を保つこと、自転車を走れる状態に保つことは、仕事使用分だけ控除できます。"
      }
    ]
  },
  {
    "kind": "tables",
    "h2": "車の経費はどう計算しますか？",
    "intro": "どちらの方法でも対象は仕事の走行だけです。シフトで店に入る配達員の場合、自宅から店までは入りません。",
    "tables": [
      {
        "label": "キロメートル単価方式",
        "rows": [
          [
            "2024-25年度と2025-26年度",
            "1kmあたり88セント"
          ],
          [
            "2026-27年度以降",
            "1kmあたり91セント"
          ],
          [
            "上限",
            "1台につき年5,000km"
          ],
          [
            "領収書",
            "不要。ただし走行距離の根拠は示す必要があります"
          ]
        ]
      },
      {
        "label": "運転日誌方式",
        "rows": [
          [
            "仕組み",
            "実際の維持費すべてに仕事使用の割合を掛けて控除します"
          ],
          [
            "記録期間",
            "連続12週間、5年間有効"
          ],
          [
            "上限",
            "なし。実際の仕事使用割合に従います"
          ],
          [
            "領収書",
            "控除するすべての支出に必要です"
          ]
        ]
      }
    ],
    "note": "毎日走る配達員なら、5,000kmは数か月で超えます。そこから先は通常、運転日誌のほうが大きくなります。ガソリン、保険、登録費用、整備、減価償却、ローン利息を、定額ではなく仕事使用割合で拾えるからです。"
  },
  {
    "kind": "answer",
    "h2": "配達員は何を提示できる必要がありますか？",
    "paras": [
      "どの控除も3つのテストを通ります。自分で支払ったこと、払い戻されていないこと、申告する収入を得るために使ったことです。配達なら、運転日誌か走行距離の記録、仕事使用割合の裏づけになる携帯の請求書、装備の領収書です。",
      "領収書、請求書、銀行明細、スマホの写真のいずれでも、金額、日付、支払先、内容が分かれば足り、5年間は保管が必要です。その年の仕事関連の控除が合計300ドル以下なら、書面の証拠は不要です。1点を一度に償却するか耐用年数で配分するかを決める300ドルとは、別のルールです。"
    ]
  },
  {
    "kind": "note",
    "label": "意外と知られていない点",
    "title": "フードデリバリーと乗客輸送は、GSTでは別物です。",
    "body": "食品や荷物の配達だけなら、GST登録が義務になるのは年間売上が75,000ドルを超えてからで、そこまで届く配達員はほとんどいません。ところが有料の乗客を1人でも乗せた瞬間、この基準は消えます。\n\nライドソーシングは売上に関係なく最初の1回からGST登録が必要で、Business Activity Statementの提出も伴います。平日にUber Eatsを走り、金曜の夜に乗客を乗せている人は、知らないうちにこの線を越えています。"
  },
  {
    "kind": "traps",
    "h2": "デリバリーの配達員がよく間違えることは？",
    "intro": "金額が大きいぶん、過大な申告もどの職種より大きくなります。取りこぼしも同じです。",
    "wrong": [
      {
        "t": "携帯代の全額",
        "d": "私生活にも使う契約の100%を申告するのは説明がつきませんし、ATOは申告全体の様子と照らし合わせて確認できます。"
      },
      {
        "t": "罰金",
        "d": "注文を3階まで運んでいる間に切られた駐車違反も控除できません。スピード違反も、受け渡しの時間がどれだけ厳しくても同じです。"
      },
      {
        "t": "勤務中に買った食事",
        "d": "配達の合間の自分の夕食は私的な支出です。"
      },
      {
        "t": "アプリを開いている間のすべての距離",
        "d": "アプリが動いていたからといって、私的な区間が業務移動になるわけではありません。受け渡しに向かう途中の用事は控除から外れますし、シフト制の被雇用者なら店までの通常の通勤も外れます。"
      },
      {
        "t": "少額のプラットフォーム収入をまるごと除外する",
        "d": "Uber、DoorDashなどはシェアリングエコノミー報告制度のもとで配達員の収入をATOに報告しています。収入はすでに見えているので、週末の数百ドルを外しても節税にはならず、不一致になるだけです。"
      }
    ],
    "missed": [
      {
        "t": "明らかに有利だったのに使わなかった運転日誌",
        "d": "キロメートル単価方式は5,000kmで頭打ちです。安定して走る配達員は簡単に超え、超えた分は単純に失われます。12週間の記録は一度取れば5年間有効です。"
      },
      {
        "t": "利息、保険、登録費用、減価償却",
        "d": "これらは運転日誌方式でしか使えず、たいていこれが逆転の理由になります。簡単だからとキロメートル単価方式を選び、もう一方だといくらだったかを知らないままの人が多くいます。"
      },
      {
        "t": "保温バッグとスマホホルダー",
        "d": "小さく、当たり前で、完全に控除できるのに、領収書ごと捨てられています。自転車のヘルメット、ライト、レインウェアも同じです。"
      },
      {
        "t": "初回配達より前に発生した費用",
        "d": "ABNを登録してプラットフォームに登録した頃、始めるための準備として買った装備は通常控除できます。購入と開始の間隔が問われるので、日付を残しておいてください。"
      },
      {
        "t": "請求されると思い込んで申告ごと諦めるABN配達員",
        "d": "プラットフォームの支払いからは源泉徴収されないので、お金がそのまま入り、納税に身構えることになります。その収入に対する控除こそがそれを小さくするのに、最も多く抜け落ちるのがそれです。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "ルールではなく走り方で決まるのはどこですか？",
    "paras": [
      "Uber Eats、DoorDash、Menulog、Amazon Flexは配達員を個人事業主として契約します。ABNが必要で、源泉徴収もスーパーもありません。1軒のピザ店のシフトに入り、ペイスリップをもらっているならTFNでの雇用です。1軒の店がシフトを決め、作業を管理し、自転車まで貸しているのにABNを求めてくるなら、偽装雇用かもしれません。",
      "控除できる走行がどこから始まるかは、そこから決まります。被雇用者なら店までの通勤は私的で、店と受け渡し先の間だけが対象です。ABNなら走行そのものが仕事です。",
      "税務上の居住区分は、そもそも利益がどう課税されるかを決めます。イギリス、ドイツ、日本のパスポート保持者で税務上オーストラリア居住者だった人は、Addy判決のもとで満額の非課税枠を受けられる可能性があります。ご本人の状況によって決まるため、きちんと確認する必要があります。"
    ]
  }
]

const FAQS = [
  {
    "question": "Uber EatsやDoorDashにABNは必要ですか？",
    "answer": "はい。これらのプラットフォームは配達員を被雇用者ではなく個人事業主として契約するため、報酬を受け取る前にABNが必要です。\n\nABNはTFNの代わりにはなりません。支払いからは何も源泉徴収されないため収入がそのまま入り、その税金は申告時に精算します。"
  },
  {
    "question": "車の経費はどちらの方法を使うべきですか？",
    "answer": "走行距離と車の維持費によります。キロメートル単価方式は領収書が不要な代わりに年5,000kmで頭打ちになり、それを超えた分は失われます。\n\n運転日誌方式には上限がなく、ガソリン、保険、登録費用、整備、減価償却、ローン利息を仕事使用割合で拾えますが、連続12週間の記録とすべての支出の領収書が必要です。"
  },
  {
    "question": "携帯代は控除できますか？",
    "answer": "携帯とデータ通信の仕事使用割合、つまり配達アプリ、ナビ、仕事の連絡に実際に使った分を控除できます。\n\n日常生活にも使っている場合、全額を控除することはできません。割合には合理的な根拠と、それを裏づけるものが必要です。"
  },
  {
    "question": "GSTの登録は必要ですか？",
    "answer": "配達だけをしているうちは、売上が年75,000ドルに届くまで登録義務はありません。\n\nただし有料の乗客を1人でも運んだなら、その時点から登録が必要で、四半期ごとのBAS提出も付いてきます。"
  },
  {
    "question": "車ではなく自転車です。何か控除できますか？",
    "answer": "はい。自転車や電動キックボードは税務上「車」ではないのでキロメートル単価方式は使えませんが、維持、修理、点検の費用の仕事使用分と、ヘルメット、ライト、高視認性ウェアなどの安全装備は控除できます。\n\n配達と私的利用を合理的に按分し、領収書を保管してください。"
  }
]

const GUIDES = [
  {
    "href": "/ja/blog/uber-doordash-rideshare-abn-working-holiday",
    "label": "Uber、DoorDashとABN",
    "desc": "なぜABNが必要で、取得後に何が変わるのか。"
  },
  {
    "href": "/ja/blog/bicycle-motorcycle-vehicle-deductions-working-holiday",
    "label": "自転車、バイク、車の控除",
    "desc": "乗り物ごとの扱いと、向いている計算方法。"
  },
  {
    "href": "/ja/blog/uber-eats-delivery-rider-working-holiday-australia",
    "label": "ワーホリのデリバリー配達",
    "desc": "経費を引いたあと、実際にいくら残るのか。"
  }
]

const SERVICES = [
  {
    "href": "/ja/abn",
    "label": "ABN"
  },
  {
    "href": "/ja/tfn",
    "label": "TFN"
  },
  {
    "href": "/ja/tax-return",
    "label": "タックスリターン"
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
  headline: "デリバリーの経費控除：車、携帯、GST",
  description: "走行距離と携帯の仕事使用分がすべてです。罰金と私的な区間は最初から対象外です。",
  url: `${SITE_URL}/ja/expenses/delivery-drivers`,
  inLanguage: "ja-JP",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/expenses/delivery-drivers#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/expenses/delivery-drivers`,
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
  margin: '0 0 16px',
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
                  {s.body.split('\n\n').map((para, j, arr) => (
                    <p key={j} style={{ ...ps, margin: j === arr.length - 1 ? 0 : ps.margin }}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* GUARANTEE + CTA */}
        <section style={{ background: '#0B5240', padding: '38px 0' }}>
          <div style={wrap}>
            <h2 style={{ ...h2s, color: '#fff', marginBottom: '16px' }}>{UI.guaranteeHeading}</h2>
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
                {/* 空行で分割し、長い回答を2段落に。faqSchema は元の文字列を
                    使うため、構造化データは変わらない。 */}
                {f.answer.split('\n\n').map((para, j, arr) => (
                  <p key={j} style={{ ...ps, margin: j === arr.length - 1 ? 0 : ps.margin }}>{para}</p>
                ))}
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
