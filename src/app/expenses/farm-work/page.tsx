import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "Farm Work Tax Deductions in Australia",
  "description": "What farm hands and fruit pickers can claim on an Australian tax return: sun protection, picking gear, boots and travel between blocks.",
  "keywords": [
    "farm work tax deductions",
    "fruit picking tax deductions Australia",
    "fruit picker tax return",
    "backpacker farm work tax",
    "seasonal worker deductions ATO",
    "travel between farms tax deduction",
    "piece rate tax Australia",
    "417 second year farm work tax"
  ],
  "alternates": {
    "canonical": "/expenses/farm-work",
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
    "locale": "en_AU",
    "url": `${SITE_URL}/expenses/farm-work`,
    "siteName": "Working Holiday Tax",
    "title": "Farm Work Tax Deductions in Australia",
    "description": "Sun protection and travel between blocks are deductible. Your jeans and your hostel rent are not. What farm work actually claims."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Farm Work Tax Deductions in Australia",
    "description": "Sun protection and travel between blocks are deductible. Your jeans and your hostel rent are not. What farm work actually claims."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "Farm work and fruit picking" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "If the refund comes to less than our fee, the difference goes back to you.",
  "guaranteeBody": "A season of short farm jobs, several contractors and one return is a thing we untangle every week, for people on 417 and 462 visas and nobody else. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
  "faqHeading": "Questions people ask about this",
  "guidesHeading": "Worth reading next",
  "otherJobs": "A different job? Every occupation is here.",
  "servicesLabel": "Elsewhere on the site",
  "wrongLabel": "Claimed, and it should not have been",
  "missedLabel": "Not claimed, and it should have been",
  "disclaimer": "This is general information, not personal tax advice. What you can claim depends on your own employers, your own records, and how you actually worked. When you lodge with us we go through your situation line by line, so you claim everything you are entitled to and nothing you are not.",
  "hubHref": "/expenses"
}

const CRUMBS = [
  {
    "name": "Home",
    "item": "/"
  },
  {
    "name": "Deductions",
    "item": "/expenses"
  },
  {
    "name": "Farm work",
    "item": "/expenses/farm-work"
  }
]

const HERO = {
  "kicker": "Farm work, orchards and packing sheds",
  "h1lead": "Sunscreen is a deduction.",
  "h1accent": "Your jeans never were.",
  "lede": "The claim list for picking, pruning and packing runs to about six items. Getting every short job of the season onto one return matters more than any of them."
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
    "h2": "What can a fruit picker or farm hand claim on tax?",
    "paras": [
      "A farm worker can claim sun protection used for outdoor work, protective gloves and boots, picking tools and equipment bought out of their own pocket, and the travel between two farms or blocks in the same working day. Everything on that list has to have been paid for by you, not reimbursed, and backed by a record.",
      "Farm work earns those claims because of what the work physically is. Sunscreen is a private expense for almost everyone in Australia. It is deductible for you because the job puts you under direct sun for hours at a time, day after day, and the ATO recognises that as a work related exposure rather than a lifestyle choice."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "Each of these has a condition attached. The condition is not decoration, it is what makes the claim survive a question about it.",
    "items": [
      {
        "t": "Sun protection: sunscreen, a wide brim hat, sunglasses",
        "d": "Deductible where the work exposes you to the sun, which covers picking, pruning, thinning, and packing in an open sided shed. It is the outdoor exposure that earns it. Buying sunscreen for a weekend at the beach is not part of the claim, and you should only claim the share you used for work."
      },
      {
        "t": "Protective gloves, gumboots and safety boots",
        "d": "Picking gloves, wet weather boots, steel caps for shed work. These qualify because they protect you from a specific hazard the job creates: thorns, sap, chemicals, mud, dropped crates, uneven ground. Ordinary boots that simply happen to be sturdy do not qualify."
      },
      {
        "t": "Picking tools and equipment you bought yourself",
        "d": "Secateurs, snips, a picking bag or bucket harness, a head torch for early starts, knee pads. Each item costing $300 or less is claimed in full in the year you bought it. Above $300 you still claim it, but across the effective life of the item rather than in one go."
      },
      {
        "t": "Travel between farms or blocks on the same day",
        "d": "Moving from one property, block or shed to another once your working day has started is deductible travel, because farm work often has no single fixed workplace. It is worked out with the cents per kilometre method or a logbook. The first trip of the day, from wherever you are staying to the first farm, is not part of it."
      },
      {
        "t": "Protective clothing with a genuine function",
        "d": "Wet weather gear for working in rain, chemical resistant overalls for spraying, a dust mask in a packing shed. The test is whether the item protects you from something the work does to you. A flannel shirt that keeps you warm does not pass it."
      },
      {
        "t": "The work share of your phone",
        "d": "Small, but real if you use your own phone for the job, for example to receive shift times from a contractor or to log bins picked in an app. You claim the work related percentage on a fair basis, not the whole bill."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What do you have to keep from a season?",
    "paras": [
      "Nothing is deductible unless three things hold: the money was yours, nobody gave it back, and it was spent earning the income on the return. In a season that is the roadhouse receipt for the sunscreen, the docket for the gloves and the secateurs, and a note of dates and kilometres whenever a contractor moved you between blocks.",
      "A receipt, an invoice or a bank statement carrying the amount, the date, the supplier and the item all count, and a phone photo is enough. Keep it for five years. If your work claims for the whole year add up to $300 or less, no written evidence is needed, though you still have to show how you reached the number. Not the same $300 that decides whether a single item is written off at once or over its life."
    ]
  },
  {
    "kind": "traps",
    "h2": "What do farm workers get wrong?",
    "intro": "First, claims seasonal workers make every year and cannot support. Then money left on the table because nobody said it was there.",
    "wrong": [
      {
        "t": "Ordinary clothes destroyed by the job",
        "d": "Jeans, t-shirts, a flannel, a jumper for a five in the morning start. It feels unreasonable, because the work ruins them and you would not have bought them otherwise. The ATO tests the item, not the intention, and normal clothing is private however quickly the fruit stains kill it."
      },
      {
        "t": "Hostel rent and the working hostel bond",
        "d": "Where you slept during the season is a living expense, not a work expense, even when the hostel is the only accommodation for fifty kilometres and even when the farm arranged it. Living somewhere is not a cost of earning income."
      },
      {
        "t": "Food and drink during the day",
        "d": "Lunch on a farm is the same as lunch anywhere else. Meals only become deductible in the narrow case of travel your employer requires that keeps you away from home overnight, and picking season does not usually meet that."
      },
      {
        "t": "The drive from the hostel to the farm",
        "d": "That is a commute, and it stays a commute whether you drive fifty kilometres of dirt road or walk. Only the movement between work sites once the day has started is claimable."
      },
      {
        "t": "Getting yourself to the region in the first place",
        "d": "The flight or drive to Bundaberg, Mildura or Tully to look for work is the cost of putting yourself where the job is, which is not the same as a cost of earning income from it."
      }
    ],
    "missed": [
      {
        "t": "The sunscreen, the hat and the sunglasses",
        "d": "This is the single most commonly missed claim in farm work, and the one people are most clearly entitled to. Almost nobody keeps a receipt for a $19 bottle of sunscreen bought at a roadhouse, and across a season it is not a small number."
      },
      {
        "t": "Every pair of gloves, one at a time",
        "d": "Picking gloves are consumable. Buying six pairs across a season is six deductible purchases, not one, and each is tested against $300 on its own."
      },
      {
        "t": "Travel between blocks in the same day",
        "d": "Very common on larger properties and with contractors who move a crew around, and almost never claimed because it does not feel like a trip. Note the date and the kilometres as you go and it is a straightforward claim."
      },
      {
        "t": "A three week farm job that was forgotten entirely",
        "d": "The most expensive mistake on this page is not a deduction at all. A short stint, paid in a hurry, sometimes by a labour hire contractor, is easy to leave off a return, and leaving income off is worse than missing a deduction."
      },
      {
        "t": "Tax withheld above 15 per cent by an unregistered employer",
        "d": "An employer registered with the ATO as an employer of working holiday makers withholds 15 per cent from your first dollar. One that is not registered has to withhold at the foreign resident rate, which starts above 30 per cent. The difference comes back when the return is lodged, and only then."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What turns on how your season was structured?",
    "paras": [
      "Itinerant work or commuting is a question of fact, and it is worth real money. Sent between three properties by a contractor with no single base is a different position from driving to the same orchard for eleven weeks. How often the site changed, whether the job required the travel, and whether you had a fixed workplace at all decide it.",
      "Residency is bigger. It is a judgement, not a formula, the ATO sees it argued wrongly in both directions, and the Addy case in the High Court shows how much can hang on it. It is worth more than every receipt on this page, and we take a position on it only after going through your year.",
      "Farm work also feeds a further visa, and that part is immigration rather than tax. Which industries, postcodes and dates count is set by the Department of Home Affairs and has changed more than once, so check the current official guidance or a registered migration agent before you rely on a job counting. Either way the income still has to be reported correctly."
    ]
  }
]

const FAQS = [
  {
    "question": "Can I really claim sunscreen and a hat?",
    "answer": "Yes, where the work puts you in the sun, and farm work usually does. The ATO accepts sun protection as a work expense for outdoor workers because the exposure comes from the job rather than from your own choices. Keep the receipts, claim only the portion you used for work, and be ready to say what the work was."
  },
  {
    "question": "I worked on three farms this year. Is that three tax returns?",
    "answer": "No. One return covers the whole financial year from 1 July to 30 June, no matter how many farms, contractors or labour hire companies paid you. Every employer reports your wages and the tax they withheld to the ATO separately and it all lands in the one return. The risk with a season of short jobs is a forgotten one, which is worth checking before anything is lodged."
  },
  {
    "question": "Does being paid per bin change my tax?",
    "answer": "No. Piece rate pay is wages, whether it is worked out per bin, per bucket, per tray or per kilo. Your employer reports the total and withholds tax on it the same way as an hourly rate, and it goes into your income like any other pay. What piece rate work does change is your record keeping, because pay that swings day to day is harder to check against an income statement later."
  },
  {
    "question": "Can I claim the fuel driving to the farm every morning?",
    "answer": "No. The first trip of the day, from wherever you are living to the first farm you work at, is ordinary commuting and is not deductible, however far it is. What is deductible is travel between farms, blocks or sheds once your working day has already started, worked out with the cents per kilometre method or a logbook."
  },
  {
    "question": "What if the farm never gave me payslips?",
    "answer": "Usually not a problem. Most employers report your pay to the ATO through Single Touch Payroll, so it appears as an income statement whether or not you ever received a payslip. It still helps to keep your own note of which farm, which dates and roughly what you were paid, particularly across a season with several short jobs, so there is something to check the official figures against."
  }
]

const GUIDES = [
  {
    "href": "/blog/piece-rates-farm-work-working-holiday",
    "label": "Piece rates on farm work, and the floor underneath them",
    "desc": "How per bin pay works and what it still has to add up to."
  },
  {
    "href": "/blog/fruit-picking-jobs-working-holiday-australia",
    "label": "Fruit picking work in Australia",
    "desc": "Regions, seasons and what to check before you take the job."
  },
  {
    "href": "/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "The $300 instant deduction for tools and gear",
    "desc": "Why each item is tested on its own, and what a set does to the answer."
  }
]

const SERVICES = [
  {
    "href": "/tax-return",
    "label": "Tax return"
  },
  {
    "href": "/tfn",
    "label": "TFN"
  },
  {
    "href": "/blog/tax-residency-working-holiday-makers",
    "label": "Tax residency"
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
  headline: "Farm Work Tax Deductions in Australia",
  description: "Sun protection and travel between blocks are deductible. Your jeans and your hostel rent are not. What farm work actually claims.",
  url: `${SITE_URL}/expenses/farm-work`,
  inLanguage: "en-AU",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/expenses/farm-work#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/expenses/farm-work`,
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
        lang={"en"}
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
              {HERO.h1lead}{' '}
              <span style={{ color: FOREST, fontStyle: 'italic' }}>{HERO.h1accent}</span>
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
                lang={"en"}
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

      <MobileCta href={WA} lang={"en"} topic="expenses" />
    </>
  )
}
