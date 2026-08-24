import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "清掃の経費控除：道具、洗濯、現場間の移動",
  "description": "清掃で働く人が控除できるもの。道具と洗剤、保護具、ATOの単価による制服の洗濯、そしてほとんど誰も申告しない現場間の移動。",
  "keywords": [
    "清掃 税金 控除 オーストラリア",
    "クリーナー 経費 ワーホリ",
    "清掃道具 控除 ATO",
    "清掃 現場間 移動 控除",
    "制服 洗濯 控除 ATO",
    "ワーホリ 清掃 税金",
    "Airtasker 清掃 税金",
    "オフィス清掃 控除"
  ],
  "alternates": {
    "canonical": "/ja/expenses/cleaners",
    "languages": {
      "en-AU": "/expenses/cleaners",
      "de": "/de/expenses/cleaners",
      "ja": "/ja/expenses/cleaners",
      "x-default": "/expenses/cleaners"
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
    "url": `${SITE_URL}/ja/expenses/cleaners`,
    "siteName": "Working Holiday Tax",
    "title": "清掃の経費控除：道具、洗濯、現場間の移動",
    "description": "家と家の間の移動が清掃の申告で最大の控除になりやすく、しかもほぼ誰も申告していません。"
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "清掃の経費控除：道具、洗濯、現場間の移動",
    "description": "家と家の間の移動が清掃の申告で最大の控除になりやすく、しかもほぼ誰も申告していません。"
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

const WA = waUrl({ topic: 'expenses', lang: "ja", detail: "清掃の仕事" })

const UI = {
  "ctaLabel": "WhatsAppで相談する",
  "ctaSub": "約1時間で返信します。",
  "guaranteeHeading": "還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。",
  "guaranteeBody": "清掃のタックスリターンは毎週この机に届きます。しかもそのすべてが417・462ビザの方のものです。申告書は、ATOへ提出する前に登録税理士が確認して承認します。",
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
    "name": "清掃",
    "item": "/ja/expenses/cleaners"
  }
]

const HERO = {
  "kicker": "住宅、オフィス、退去清掃、アプリ経由の仕事",
  "h1lead": "家と家の間の移動が控除です。",
  "h1accent": "ほぼ誰も申告していません。",
  "lede": "洗剤、手袋、ATOの単価による制服の洗濯もリストに入ります。道具代は思ったより早くたまります。"
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
    "h2": "清掃で働く人は何を控除できますか？",
    "paras": [
      "控除できるのは、自費で買った道具と洗剤、手袋、エプロン、保護メガネ、安全靴などの保護具、必須制服や保護衣類の洗濯、そして同じ日に1件の清掃から次の清掃へ移動した分です。顧客や雇用主が支給したもの、払い戻したものは対象外です。",
      "清掃が特殊なのは、仕事そのものが移動することです。1日に3軒回れば控除できる移動が2区間あり、1年で見れば申告のなかで最大の項目になるのが普通です。"
    ]
  },
  {
    "kind": "items",
    "h2": "この仕事に固有の控除",
    "intro": "清掃道具の多くは300ドルをかなり下回るので、ゆっくり償却するのではなく購入年に全額控除できます。",
    "items": [
      {
        "t": "清掃現場間の移動",
        "d": "勤務が始まったあと、1軒の家やオフィスから次へ移動する分は通勤ではなく職場間の移動なので控除できます。キロメートル単価方式か運転日誌で計算します。その日最初の移動と最後の帰宅は私的なままです。"
      },
      {
        "t": "道具と洗剤",
        "d": "モップ、バケツ、絞り器、スクレーパー、替刃、クロス、洗剤、消耗品など自分で買うもの。1点300ドル以下なら購入年に全額控除します。合計300ドル以上のスターターセットとして買った場合は1つの資産として扱われ、個々の品が300ドル未満でも耐用年数にわたって配分します。"
      },
      {
        "t": "300ドル以上の大きな機材",
        "d": "業務用掃除機、ポリッシャー、高圧洗浄機。こちらも控除できますが、一度にではなく耐用年数にわたって配分します。"
      },
      {
        "t": "保護具",
        "d": "手袋、エプロン、強い薬剤や粉じんを扱う仕事のための保護メガネやフェイスシールド、現場清掃や業務清掃のための安全靴。仕事の危険から守るから認められるのであって、たまたま仕事中に身につけているからではありません。"
      },
      {
        "t": "控除できる仕事着の洗濯",
        "d": "必須制服や本物の保護衣類の洗濯はATOの単価で控除できます。仕事着だけなら1回1ドル、私服と一緒なら1回50セントです。年間の洗濯控除が150ドルを超えたら、概算ではなく簡単な記録を付けてください。"
      },
      {
        "t": "携帯電話の仕事使用分",
        "d": "予約を受ける、アプリを使う、鍵や入室について顧客とやり取りする人には現実的な控除です。契約全体ではなく、合理的な根拠に基づく仕事使用割合を申告します。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "清掃では何を残しておきますか？",
    "paras": [
      "どの控除も3つのテストを通ります。自分で支払ったこと、誰からも払い戻されていないこと、申告する収入を得るために使ったことです。清掃なら、洗剤と道具の領収書と、移動した日付、住所、距離の記録です。",
      "領収書、請求書、銀行明細、スマホの写真のいずれでも、金額、日付、支払先、内容が分かれば足ります。5年間は保管してください。その年の仕事関連の控除が合計300ドル以下なら、書面の証拠は不要です。掃除機1台をどう償却するかを決める300ドルとは、別のルールです。"
    ]
  },
  {
    "kind": "tables",
    "h2": "車の経費はどう計算しますか？",
    "intro": "方法は2つ、1台につき年に1つだけです。清掃で対象になるのは現場と現場の間の区間で、自宅から1軒目までは入りません。",
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
    "note": "1日に3、4軒回れば5,000kmは多くの人が思うより早く超えます。そこを過ぎると通常は運転日誌のほうが大きくなります。定額ではなく、ガソリン、保険、登録費用、整備、減価償却、車のローン利息まで拾えるからです。"
  },
  {
    "kind": "traps",
    "h2": "清掃で働く人がよく間違えることは？",
    "intro": "誤った申告は衣類とその日最初の移動に集中します。取りこぼしはほぼすべて移動です。",
    "wrong": [
      {
        "t": "無地の黒いパンツと無地のポロシャツ",
        "d": "顧客やエージェンシーが色を指定していても、普段着は私的なままです。誰かが求めたからといって制服にはなりませんし、漂白剤で駄目になったからといって控除にもなりません。"
      },
      {
        "t": "その日最初と最後の移動",
        "d": "自宅から最初の現場まで、最後の現場から自宅までは通常の通勤です。控除できるのは間の区間だけです。ただし、仕事に不可欠で本当にかさばり、どの現場にも安全に保管できない機材を運んでいる場合の例外はあります。"
      },
      {
        "t": "顧客が用意する洗剤や機材",
        "d": "清掃先の家の流しの下に洗剤が置いてある場合や、会社が機材を支給している場合、あなたの負担は残っていません。払い戻しを受けたものも同じです。"
      },
      {
        "t": "ABNがあれば何でも経費だと考えること",
        "d": "ABNがあっても私的な支出が経費になるわけではありません。携帯、車、衣類は引き続き按分され、私的な部分は引き続き除かれます。"
      },
      {
        "t": "現金の仕事は申告しなくてよいと考えること",
        "d": "清掃の収入は、銀行振込でもアプリの入金でも封筒でも収入です。外しても見えなくなるわけではなく、申告が間違いになるだけです。"
      }
    ],
    "missed": [
      {
        "t": "現場と現場の間の移動",
        "d": "清掃で働く人は1日に3、4か所を回るのに、業務移動という感覚がないため1件も申告しないことがよくあります。日付、住所、距離をその都度メモしておけば、申告のなかで最大の控除になります。"
      },
      {
        "t": "洗剤やクロスを1回ずつ",
        "d": "消耗品は絶えず買うのに、ほとんど領収書が残りません。スマホのアルバムに写真をためておくだけで十分で、1年分では実際の金額になります。"
      },
      {
        "t": "公表された単価での洗濯",
        "d": "保護衣類と必須制服の洗濯は1回1ドルまたは50セントで控除できます。そもそも単価があること自体、あまり知られていません。"
      },
      {
        "t": "始める準備として買った機材",
        "d": "ABNを登録して顧客を探し始めた頃に買った機材や洗剤は、最初の請求書が後になっても通常は控除できます。購入と最初の仕事の間隔が空くと弱くなるので、日付を残しておいてください。"
      },
      {
        "t": "清掃会社による誤った税率での源泉徴収",
        "d": "会社があなたのTax File Number Declarationを受け取っていない、またはワーキングホリデーメーカーの雇用主として登録していない場合、15%よりはるかに多く引かれています。それは申告して初めて戻ります。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "誰の清掃をするかで何が変わりますか？",
    "paras": [
      "最初の分かれ道は、個人事業主か被雇用者かです。ここから先のすべてが変わります。個人宅の清掃、退去清掃、Airtaskerのようなアプリ経由の仕事はABNの収入です。料金を自分で決め、請求書を出し、源泉徴収もスーパーもありません。清掃会社に現場とシフトを割り当てられるならTFNでの雇用で、源泉徴収があり、スーパーも上乗せされます。1年で両方やるのは普通のことで、どちらも1つの申告に入ります。",
      "会社があなたのシフトを組み、作業を管理し、洗剤も支給しているのにABNを求めてくる場合、それは請負の看板をつけた雇用かもしれません。書類を受け入れる前に確認する価値があります。",
      "個人事業主の場合、GSTが義務になるのは清掃の売上が年75,000ドルを超えてからで、パートタイムではまず届きません。その下にあるのが税務上の居住区分で、控除リスト全体より価値があります。イギリス、ドイツ、日本のパスポート保持者で税務上オーストラリア居住者だった人は、Addy判決のもとで満額の非課税枠を受けられる可能性があります。"
    ]
  }
]

const FAQS = [
  {
    "question": "清掃現場の間の移動は控除できますか？",
    "answer": "はい。同じ日に1件の清掃から次の清掃へ移動する分は通勤ではなく職場間の移動なので、キロメートル単価方式か運転日誌で控除できます。控除できないのは、自宅から最初の現場までと、最後の現場から自宅までです。日付、住所、走行距離をその都度メモしておけば、どちらの方式でも使えます。"
  },
  {
    "question": "どんな道具や洗剤を控除できますか？",
    "answer": "自分で買って払い戻しを受けていないものはすべてです。判断の基準は、その品物にあなたのお金が出ているかどうかで、顧客の家に置いてある洗剤も、会社が支給した機材も含まれません。スーパーでまとめ買いした場合は、レシートのうち清掃用に買った品だけが対象になります。"
  },
  {
    "question": "制服と洗濯代は控除できますか？",
    "answer": "雇用主や顧客が支給しない指定制服と、手袋、エプロン、保護メガネ、安全靴のような本物の安全機能がある保護具は控除できます。無地の黒いパンツや無地のポロシャツは、清掃のためだけに持っていても控除できません。控除できる仕事着の洗濯は、仕事着だけなら1回1ドル、私服と一緒なら1回50セントで、年間150ドルを超えたら簡単な記録が必要です。"
  },
  {
    "question": "ABNの清掃業者はGST登録が必要ですか？",
    "answer": "清掃の売上が年75,000ドルを超えたときだけです。これは清掃に固有のルールではなく個人事業主全般の基準で、パートタイム、個人宅、アプリ経由で清掃している人のほとんどは届きません。基準未満なら、GSTの行を入れずに請求すれば十分です。"
  },
  {
    "question": "私は個人事業主ですか、被雇用者ですか？",
    "answer": "どちらもあり得ますし、1年で両方という方も多くいます。決め手は仕事の呼び名ではなく、相手があなたの働き方をどこまで決めているかです。料金も、行く時間も、進め方も自分で決めているなら個人事業主です。契約書や求人の文面をお送りいただければ、どちらに当たるかをお伝えします。"
  }
]

const GUIDES = [
  {
    "href": "/ja/blog/abn-deductions-business-expenses",
    "label": "ABNで働くときの経費",
    "desc": "個人事業主が落とせるものと、その境界線。"
  },
  {
    "href": "/ja/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "300ドル以下の道具は全額即時控除",
    "desc": "1点ずつ判定される理由と、セット購入で変わる点。"
  },
  {
    "href": "/ja/blog/tax-deductions-working-holiday-makers",
    "label": "ワーキングホリデーの控除リスト",
    "desc": "すべてのカテゴリーと、ATOが認めないもの。"
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
  headline: "清掃の経費控除：道具、洗濯、現場間の移動",
  description: "家と家の間の移動が清掃の申告で最大の控除になりやすく、しかもほぼ誰も申告していません。",
  url: `${SITE_URL}/ja/expenses/cleaners`,
  inLanguage: "ja-JP",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/expenses/cleaners#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/expenses/cleaners`,
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
