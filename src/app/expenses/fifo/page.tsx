import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": { absolute: "FIFO Tax Deductions Australia: PPE, Tickets, Zone Offset" },
  "description": "What FIFO and camp workers can claim on an Australian tax return: PPE and tools, ticket renewals, medicals and the work share of a phone.",
  "keywords": [
    "FIFO tax deductions",
    "fly in fly out tax Australia",
    "zone tax offset FIFO",
    "FIFO camp accommodation tax",
    "high risk work licence tax deduction",
    "FIFO PPE tax deduction",
    "backpacker FIFO job tax",
    "remote site worker tax deductions"
  ],
  "alternates": {
    "canonical": "/expenses/fifo",
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
    "locale": "en_AU",
    "url": `${SITE_URL}/expenses/fifo`,
    "siteName": "Working Holiday Tax",
    "title": "FIFO Tax Deductions Australia: PPE, Tickets, Zone Offset",
    "description": "Camp food and the drive to the airport are not deductible. The Zone Tax Offset is probably not yours either. Here is what is."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "FIFO Tax Deductions Australia: PPE, Tickets, Zone Offset",
    "description": "Camp food and the drive to the airport are not deductible. The Zone Tax Offset is probably not yours either. Here is what is."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "FIFO and camp work" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "A refund smaller than our fee means we refund the difference. You are never out of pocket.",
  "guaranteeBody": "417 and 462 visas are the only tax work we take, so the zone offset, the residency position and the super sitting in three funds all get looked at together. Reviewed and signed off by a registered tax agent before lodgement.",
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
    "name": "FIFO",
    "item": "/expenses/fifo"
  }
]

const HERO = {
  "kicker": "Rosters, camps and remote sites",
  "h1lead": "The Zone Tax Offset is probably not yours.",
  "h1accent": "Here is what is.",
  "lede": "The camp room, the mess and the flight are the company's costs, not yours. What is left to you is PPE, ticket renewals, medicals and a phone."
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
    "h2": "What can a FIFO worker claim on tax?",
    "paras": [
      "A FIFO worker can claim PPE and protective clothing bought out of their own pocket and the laundering of it, tools and equipment, renewals of a ticket or licence they already hold, employer required medicals and drug and alcohol testing they paid for themselves, the work related share of a phone and internet, and training that relates to the job they already do.",
      "What is not on that list is everything that makes FIFO feel expensive. Your room in camp and your meals in the mess are booked and paid for by the company, and the flight to site usually is too. A deduction only ever gives back money that left your own pocket, so the fact that camp is costly does not put anything on your return."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "Everything here has the same condition attached: you paid for it, and stores did not issue it.",
    "items": [
      {
        "t": "PPE you bought yourself, and washing it",
        "d": "Overalls, coveralls, steel capped boots, gloves, safety goggles, hearing protection, masks. Deductible because they protect you from a specific risk on site. Laundering deductible protective clothing is claimable at the ATO rate, $1 a load for work only loads or 50 cents mixed with everything else."
      },
      {
        "t": "Tools and equipment",
        "d": "Anything you bought for the job that stores did not issue. Each item costing $300 or less is claimed in full in the year of purchase, and anything above that is claimed across the effective life of the item. A tool kit bought as a set for $300 or more is one asset."
      },
      {
        "t": "Renewing a ticket or licence you hold",
        "d": "A High Risk Work Licence, a Working at Heights ticket, a forklift ticket. Renewals are deductible once you are already working in the role. The first one is not, on the same basis as a first White Card or a first drivers licence."
      },
      {
        "t": "Employer required medicals and testing",
        "d": "Many sites require a pre start medical and drug and alcohol testing as a condition of working. Where your employer requires it for a role you already hold and you paid for it yourself, the cost is deductible."
      },
      {
        "t": "The work share of your phone and internet",
        "d": "Checking a roster, submitting timesheets, completing mandatory online inductions and refresher modules. Claim the work related percentage on a fair, honest basis rather than the whole bill."
      },
      {
        "t": "Training that relates to the work you already do",
        "d": "A short course or unit that keeps a current skill or ticket alive is deductible, and so is the travel and accommodation where your employer requires you to attend away from your base. A first entry level certificate taken to become eligible for a role is not."
      }
    ]
  },
  {
    "kind": "note",
    "label": "The biggest FIFO tax myth",
    "title": "Working in a zone is not the same as living in one.",
    "body": "Since a change in the law in 2015, the Zone Tax Offset depends on where your normal residence is, not on where your roster takes you. Your normal residence has to itself be inside a specified remote zone for more than 183 days of the income year. Flying in to work inside a zone while you live in Perth, Brisbane or Darwin between swings does not meet that test, even if you spend most of the year physically on site. Camp is not your normal residence, because it is temporary and tied to the roster. For most working holiday makers on a FIFO roster the offset does not apply, and better to know that before it lands on a return."
  },
  {
    "kind": "answer",
    "h2": "What has to sit behind a FIFO claim?",
    "paras": [
      "A claim survives three questions. Did you pay for it? Were you paid back? Was it spent earning the income you are declaring? On a roster that is the receipt for the boots stores did not issue, the invoice for the medical, and the bill sitting behind your phone percentage.",
      "Proof means the amount, the date, the supplier and the item, on a receipt, an invoice, a bank statement or a photo taken at the counter. It has to last five years. Come in at $300 or less of work claims for the year and no written evidence is required, but you still have to be able to say where the number came from. A separate rule from the $300 that decides whether a tool is written off at once or across its life."
    ]
  },
  {
    "kind": "traps",
    "h2": "What do FIFO workers get wrong?",
    "intro": "This trade has more confidently repeated misinformation than any other on the site. The claims below get made every year and do not hold.",
    "wrong": [
      {
        "t": "The Zone Tax Offset",
        "d": "The single most commonly claimed thing a FIFO worker is not entitled to. It turns on where you normally live, not where you fly to, and camp does not count as living there."
      },
      {
        "t": "Camp accommodation and meals",
        "d": "Your employer books and pays for the room and the mess, and at genuinely remote sites that is usually an exempt fringe benefit to them rather than income to you. Either way you never paid, so there is nothing to deduct."
      },
      {
        "t": "The drive to the airport before a swing",
        "d": "That is ordinary commuting, however early the flight and however far you live from the terminal. The narrow bulky tools exception exists but rarely applies to a camp services role, where there is either nothing bulky or somewhere secure to leave it."
      },
      {
        "t": "Relocating to Perth or Brisbane for the work",
        "d": "Flights, freight and temporary accommodation for a move you made in order to take up FIFO work are private relocation costs. Moving yourself into a position to earn income is not the same as earning it."
      },
      {
        "t": "A first High Risk Work Licence",
        "d": "The ticket you paid for so you could be hired is a private cost. Renewing it while you are already working with it is deductible."
      }
    ],
    "missed": [
      {
        "t": "PPE bought out of pocket, and the laundry on it",
        "d": "Plenty of workers buy their own boots or gloves rather than wait for stores, then never claim either the gear or the cost of washing it at the published rate."
      },
      {
        "t": "Medicals and drug and alcohol testing you paid for",
        "d": "Deductible where the employer requires it for a role you already hold, and almost never claimed, because it feels like a hurdle rather than an expense."
      },
      {
        "t": "The work share of phone and internet on swing",
        "d": "Rosters, timesheets and mandatory inductions all run through a personal device. It is a modest claim and a completely legitimate one."
      },
      {
        "t": "Ticket renewals across a long roster year",
        "d": "A High Risk Work Licence or Working at Heights renewal paid for between swings is easy to lose track of by the end of the year."
      },
      {
        "t": "Superannuation left behind in several funds",
        "d": "FIFO pays well, which means the super balance is larger than in most backpacker work. It sits there when you leave and it has to be claimed as a Departing Australia Superannuation Payment once your visa has ceased."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What is left open on a FIFO file?",
    "paras": [
      "The Zone Tax Offset is usually wrong rather than impossible. If your home base during the working holiday sat inside a specified zone, a rental in a remote town rather than a capital city, the question is live. Where you normally lived, for how long, and what you kept there decide it.",
      "The bulky tools exception matters more to a tradesperson flying in with a personal kit than to a camp services role. What you carried and what the site offered for storage settle it, and it is a claim that gets tested, so be able to describe the facts.",
      "Residency is the largest question on a FIFO file, because the sums are larger. Long swings, a fixed base between them and a stay measured in years is the profile where the Addy decision most often applies to a British, German or Japanese passport holder who was a resident of Australia for tax purposes. A judgement about your year, and one to have somebody look at properly."
    ]
  }
]

const FAQS = [
  {
    "question": "Do FIFO workers get the Zone Tax Offset?",
    "answer": "Usually not, and this is the biggest misconception in FIFO tax. Since a 2015 change in the law, qualifying depends on your normal residence being located inside a specified remote zone for more than 183 days of the year, not on where you physically work. Flying in to a site inside a zone while living in a capital city between swings does not meet that test, and camp accommodation is not treated as your normal residence because it is temporary and tied to the roster."
  },
  {
    "question": "Can I claim my camp accommodation or meals?",
    "answer": "No. Your room and your meals on site are arranged and paid for by your employer, and at genuinely remote sites that is usually treated as an exempt fringe benefit to them. Because you never personally paid for the room or the food, there is no expense of yours to deduct. A deduction can only give back money that left your own pocket."
  },
  {
    "question": "Can I claim the drive to the airport before my swing?",
    "answer": "No, in almost every case. The trip from home to the airport you fly out of is ordinary private commuting, the same as anyone else driving to work, however early the flight is. There is a narrow exception where you must carry genuinely bulky and essential tools with nowhere secure to store them at work, but that rarely applies to a camp services role."
  },
  {
    "question": "Can I claim my High Risk Work Licence?",
    "answer": "You can claim renewing one you already hold. You cannot claim getting it for the first time, because that cost is what made you eligible for the role rather than a cost of doing a job you already had. It is the same first versus renewal distinction the ATO applies to a construction White Card and to a first drivers licence."
  },
  {
    "question": "What can I claim on phone and internet while on roster?",
    "answer": "The work related portion. If you use your own phone or internet for the job, checking your roster, submitting timesheets, or completing mandatory online inductions and training, that share of the bill is deductible. You need a fair and honest estimate of the percentage, because claiming a full bill on a device you also use for everything else will not stand up."
  }
]

const GUIDES = [
  {
    "href": "/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "The $300 instant deduction for tools and gear",
    "desc": "Why each item is tested on its own, and what a set does to the answer."
  },
  {
    "href": "/blog/1000-dollar-instant-deduction-rule-2026",
    "label": "The $1,000 instant deduction from 1 July 2026",
    "desc": "A flat claim with no receipts, or your actual costs. You only get one."
  },
  {
    "href": "/superannuation",
    "label": "Claiming your super when you leave Australia",
    "desc": "How DASP works, and what is withheld from it."
  }
]

const SERVICES = [
  {
    "href": "/tax-return",
    "label": "Tax return"
  },
  {
    "href": "/superannuation",
    "label": "Superannuation"
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
  headline: "FIFO Tax Deductions Australia: PPE, Tickets, Zone Offset",
  description: "Camp food and the drive to the airport are not deductible. The Zone Tax Offset is probably not yours either. Here is what is.",
  url: `${SITE_URL}/expenses/fifo`,
  inLanguage: "en-AU",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/expenses/fifo#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/expenses/fifo`,
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
