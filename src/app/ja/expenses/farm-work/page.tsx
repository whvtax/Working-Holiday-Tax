import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "ファームとフルーツピッキングの経費控除",
  "description": "ファームやフルーツピッキングで働く人が控除できるもの。日焼け止め、収穫用具、安全靴、ブロック間の移動。認められない控除も解説します。",
  "keywords": [
    "ファーム 税金 控除 オーストラリア",
    "フルーツピッキング タックスリターン",
    "ワーホリ ファーム 経費",
    "日焼け止め 控除 ATO",
    "ファーム間 移動 控除",
    "出来高払い 税金 オーストラリア",
    "セカンドビザ ファーム 税金",
    "季節労働 控除 オーストラリア"
  ],
  "alternates": {
    "canonical": "/ja/expenses/farm-work",
    "languages": {
      "en-AU": "/expenses/farm-work",
      "de": "/de/expenses/farm-work",
      "ja": "/ja/expenses/farm-work",
      "x-default": "/expenses/farm-work"
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
    "url": `${SITE_URL}/ja/expenses/farm-work`,
    "siteName": "Working Holiday Tax",
    "title": "ファームとフルーツピッキングの経費控除",
    "description": "日焼け止めは控除できます。ジーンズとホステルの宿泊費はできません。"
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "ファームとフルーツピッキングの経費控除",
    "description": "日焼け止めは控除できます。ジーンズとホステルの宿泊費はできません。"
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

const WA = waUrl({ topic: 'expenses', lang: "ja", detail: "ファームとフルーツピッキング" })

const UI = {
  "ctaLabel": "WhatsAppで相談する",
  "ctaSub": "約1時間で返信します。",
  "guaranteeHeading": "還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。",
  "guaranteeBody": "短いファーム仕事がいくつも並ぶ1年を1つの申告にまとめるのは、ここでは毎週の作業です。扱うのは417・462ビザの方だけ。申告書は、ATOへ提出する前に登録税理士が確認して承認します。",
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
    "name": "ファーム",
    "item": "/ja/expenses/farm-work"
  }
]

const HERO = {
  "kicker": "ファーム、果樹園、パッキングシェッド",
  "h1lead": "日焼け止めは控除できます。",
  "h1accent": "ジーンズは最初から対象外です。",
  "lede": "収穫、剪定、パッキングで控除できるのは6項目ほどです。それより効くのは、シーズン中の短い仕事を1つ残らず申告に載せることです。"
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
    "h2": "フルーツピッカーやファームワーカーは何を控除できますか？",
    "paras": [
      "控除できるのは、屋外作業のための日焼け対策、保護用の手袋と靴、自費で買った収穫用具、そして同じ勤務日に2つのファームやブロックの間を移動した分の交通費です。いずれも自分で支払い、払い戻しを受けておらず、記録があることが条件です。",
      "日焼け止めはオーストラリアではほとんどの人にとって私的な支出です。あなたの場合に控除できるのは、仕事が何時間も直射日光の下に置くからで、ATOはそれを業務上の曝露として扱います。"
    ]
  },
  {
    "kind": "items",
    "h2": "この仕事に固有の控除",
    "intro": "どれにも条件が付いていて、その条件が、指摘されたときに控除が残るかどうかを決めます。",
    "items": [
      {
        "t": "日焼け対策：日焼け止め、つばの広い帽子、サングラス",
        "d": "仕事で日光にさらされる場合に控除できます。収穫、剪定、摘果、開放型シェッドでのパッキングが該当します。仕事で使った分だけを申告してください。"
      },
      {
        "t": "保護用の手袋、長靴、安全靴",
        "d": "ピッキング用手袋、雨用の長靴、シェッド作業用の安全靴。仕事が生む具体的な危険から身を守るから認められます。とげ、樹液、薬剤、落下するクレートなどです。単に丈夫なだけの普通の靴は対象になりません。"
      },
      {
        "t": "自費で買った収穫用具",
        "d": "剪定ばさみ、収穫ばさみ、ピッキングバッグやバケツハーネス、ヘッドライト、膝当て。1点300ドル以下なら購入年に全額控除できます。300ドルを超える場合も控除できますが、耐用年数にわたって配分します。"
      },
      {
        "t": "同じ日のファーム間、ブロック間の移動",
        "d": "勤務が始まったあとに別の農園、ブロック、シェッドへ移動する分は控除できます。キロメートル単価方式か運転日誌で計算します。その日最初の移動は含まれません。"
      },
      {
        "t": "本当に機能のある保護衣類",
        "d": "雨天作業用のレインウェア、散布作業用の耐薬品ツナギ、パッキングシェッドの防塵マスク。判断基準は、仕事があなたに与える何かからその品物が守ってくれるかどうかです。暖かいだけのネルシャツは基準を満たしません。"
      },
      {
        "t": "携帯電話の仕事使用分",
        "d": "金額は小さいものの、コントラクターからシフト時間を受け取るなど、自分の携帯を仕事で使っているなら控除できます。全額ではなく、合理的な根拠に基づく仕事使用割合を申告します。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "1シーズンから何を残しておきますか？",
    "paras": [
      "3つがそろわなければ控除になりません。自分のお金だったこと、返してもらっていないこと、申告する収入を得るために使ったことです。シーズン中なら、日焼け止めを買ったロードハウスの領収書、手袋や剪定ばさみの控え、ブロック間を動かされたときの日付と距離のメモです。",
      "領収書、請求書、銀行明細、スマホの写真のいずれでも、金額、日付、支払先、内容が分かれば足り、5年間は保管が必要です。その年の仕事関連の控除が合計300ドル以下なら、書面の証拠は不要です。1点を一度に償却するか耐用年数で配分するかを決める300ドルとは、別のルールです。"
    ]
  },
  {
    "kind": "traps",
    "h2": "ファームで働く人がよく間違えることは？",
    "intro": "まず、毎年多くの季節労働者が申告していて、説明できないもの。次に、誰も教えてくれないまま置き去りになっているお金です。",
    "wrong": [
      {
        "t": "仕事で駄目になった普段着",
        "d": "ジーンズ、Tシャツ、ネルシャツ、朝5時スタート用のパーカー。ATOが見るのは意図ではなく品物であり、普段着は果汁のシミでどれだけ早く駄目になっても私的な支出です。"
      },
      {
        "t": "ホステルの宿泊費とデポジット",
        "d": "シーズン中どこで寝ていたかは生活費であって仕事の費用ではありません。半径50キロで唯一の宿でも、ファームが手配したものでも同じです。"
      },
      {
        "t": "日中の食事や飲み物",
        "d": "ファームでの昼食も、他の場所での昼食と同じです。食事が控除になるのは、雇用主の指示で自宅を離れて宿泊を伴う移動をした狭い場合だけで、収穫シーズンは通常あてはまりません。"
      },
      {
        "t": "ホステルからファームへの移動",
        "d": "それは通勤であり、未舗装路を50キロ走ろうと歩こうと変わりません。控除できるのは、その日の勤務が始まったあとの現場間の移動だけです。"
      },
      {
        "t": "その地域までの移動費",
        "d": "バンダバーグ、ミルドゥラ、タリーへ仕事を探しに行く飛行機代や運転は、仕事のある場所に自分を置くための費用です。そこから収入を得る費用とは違います。"
      }
    ],
    "missed": [
      {
        "t": "日焼け止め、帽子、サングラス",
        "d": "ファーム作業で最も見落とされる控除です。ロードハウスで買った19ドルの日焼け止めの領収書を取っておく人はほとんどいませんが、1シーズン分では小さくない金額になります。"
      },
      {
        "t": "手袋を1組ずつ",
        "d": "ピッキング用手袋は消耗品です。1シーズンに6組買えば控除対象の購入が6回あるということで、1回ではありません。それぞれが個別に300ドルの基準で判定されます。"
      },
      {
        "t": "同じ日のブロック間の移動",
        "d": "大きな農園やクルーを動かすコントラクターではよくあることですが、移動という感覚がないためほとんど申告されません。日付と距離をその都度メモしておいてください。"
      },
      {
        "t": "完全に忘れられた3週間のファーム仕事",
        "d": "急いで支払われた短期の仕事、ときにコントラクター経由の仕事は申告から抜けやすく、収入の漏れは控除の取りこぼしより深刻です。"
      },
      {
        "t": "未登録の雇用主による15%超の源泉徴収",
        "d": "ワーキングホリデーメーカーの雇用主としてATOに登録している農園は、最初の1ドルから15%で源泉徴収します。未登録なら30%超で始まる非居住者の税率で徴収する義務があります。差額は申告して初めて戻ります。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "シーズンの組み立て方で変わるのはどこですか？",
    "paras": [
      "移動が通勤ではなく巡回勤務にあたるかどうかは、事実認定の問題です。コントラクターに3つの農園を回され拠点がない人と、11週間同じ果樹園に通った人とでは立場が違います。現場がどれだけ変わったか、移動が仕事として求められていたか、そもそも固定の職場があったかで決まります。",
      "より大きいのは税務上の居住区分です。高等裁判所のAddy判決が示すとおり、ここに大きな金額がかかることがあります。ご本人の状況によって決まるため、当社は1年の実態を確認してからでなければ立場を決めません。",
      "ファーム作業はセカンドビザにも関わりますが、その部分は税ではなく移民の話です。どの産業、どの郵便番号、どの期間が算入されるかはDepartment of Home Affairsが定めており、これまでに何度も変わっているので、ある仕事が算入されると当てにする前に、最新の公式情報を確認するか登録移民エージェントに相談してください。"
    ]
  }
]

const FAQS = [
  {
    "question": "日焼け止めと帽子を本当に控除できますか？",
    "answer": "はい。仕事で日光にさらされる場合は控除でき、ファーム作業は通常それにあたります。ATOが屋外作業者の日焼け対策を仕事の費用として認めるのは、その曝露が仕事から生じているからです。\n\n領収書を保管し、仕事で使った分だけを申告してください。"
  },
  {
    "question": "今年は3つのファームで働きました。申告も3回ですか？",
    "answer": "いいえ。申告は7月1日から6月30日までの年度全体をカバーする1回だけで、ファーム、コントラクター、派遣会社がいくつあっても同じです。各雇用主が給与と源泉徴収額を別々にATOへ報告し、すべてが1つの申告にまとまります。\n\n短期の仕事が続いたシーズンで怖いのは1社の抜けです。"
  },
  {
    "question": "出来高払いだと税金は変わりますか？",
    "answer": "いいえ。出来高払いも給与で、ビン単位、バケツ単位、トレー単位、キロ単位のどれで計算されても同じです。雇用主は合計を報告し、時給と同じように源泉徴収します。\n\n出来高払いで変わるのは記録の取り方で、日ごとに変動する支払いは後からインカムステートメントと突き合わせにくくなります。"
  },
  {
    "question": "毎朝ファームへ行くガソリン代は控除できますか？",
    "answer": "できません。その日最初の移動、つまり住んでいる場所から最初のファームまでは通常の通勤で、距離に関係なく控除できません。\n\n控除できるのは、勤務が始まったあとのファーム間、ブロック間、シェッド間の移動で、キロメートル単価方式か運転日誌で計算します。"
  },
  {
    "question": "ファームからペイスリップをもらっていません。",
    "answer": "たいていは問題ありません。ほとんどの雇用主はSingle Touch Payrollを通じて給与をATOに報告するので、ペイスリップを受け取っていなくてもインカムステートメントとして表示されます。\n\nそれでも、どのファームで、いつ、いくらだったかを自分でメモしておくと役に立ちます。"
  }
]

const GUIDES = [
  {
    "href": "/ja/blog/piece-rates-farm-work-working-holiday",
    "label": "ファームの出来高払いと最低ライン",
    "desc": "ビン単位の計算と、それでも満たすべき水準。"
  },
  {
    "href": "/ja/blog/fruit-picking-jobs-working-holiday-australia",
    "label": "オーストラリアのファームジョブ",
    "desc": "地域とシーズン、受ける前に確認したいこと。"
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
  headline: "ファームとフルーツピッキングの経費控除",
  description: "日焼け止めは控除できます。ジーンズとホステルの宿泊費はできません。",
  url: `${SITE_URL}/ja/expenses/farm-work`,
  inLanguage: "ja-JP",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/expenses/farm-work#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/expenses/farm-work`,
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
