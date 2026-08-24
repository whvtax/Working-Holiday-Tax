import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": { absolute: "Labour Hire and Warehouse Tax Deductions Australia" },
  "description": "What labourers placed by staffing agencies can claim: protective gear per host site, ticket renewals, tools, and travel between sites in the same day.",
  "keywords": [
    "labour hire tax deductions",
    "warehouse job tax deductions Australia",
    "labour hire agency tax working holiday",
    "staffing agency tax deductions Australia",
    "general labourer tax deductions Australia",
    "travel between job sites deduction ATO",
    "forklift licence tax deductible",
    "backpacker warehouse job tax"
  ],
  "alternates": {
    "canonical": "/expenses/labouring",
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
    "locale": "en_AU",
    "url": `${SITE_URL}/expenses/labouring`,
    "siteName": "Working Holiday Tax",
    "title": "Labour Hire and Warehouse Tax Deductions Australia",
    "description": "Two agencies is two income statements. Two sites in one day is a deduction almost nobody claims."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Labour Hire and Warehouse Tax Deductions Australia",
    "description": "Two agencies is two income statements. Two sites in one day is a deduction almost nobody claims."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "Labour hire and warehouse work" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "If the fee ends up above the refund, the difference comes back to you.",
  "guaranteeBody": "Pulling four agencies and a forgotten single shift into one return is ordinary work here, and every client is on a 417 or a 462. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
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
    "name": "Labour hire",
    "item": "/expenses/labouring"
  }
]

const HERO = {
  "kicker": "Warehouses, removals, landscaping, events",
  "h1lead": "Two agencies is two income statements.",
  "h1accent": "Two sites is a deduction.",
  "lede": "A forgotten agency costs more than any missing receipt, and one return has to carry every one of them."
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
    "h2": "What can a labourer placed by an agency claim on tax?",
    "paras": [
      "A labour hire worker can claim protective gear required by the host role, renewals of an operating ticket they already hold, tools bought out of their own pocket, the travel between two worksites in the same day, and the work related share of a phone. What is claimable follows the job you were actually doing that day, not the job title on the agency contract.",
      "That last point is what makes labour hire different. A week in a chilled warehouse, a week on a landscaping crew and a weekend on an event bump out create three different sets of costs, and the deduction follows the actual work rather than a single occupation label."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "Each of these follows the host role. Ask what the site required, not what the agency called you.",
    "items": [
      {
        "t": "Travel between two sites in the same day",
        "d": "One warehouse in the morning and a different site in the afternoon is travel between workplaces and is deductible. The more itinerant the pattern, with no fixed base and the site changing through the week, the stronger the case for claiming more of it. The first trip from home is still a commute."
      },
      {
        "t": "Protective gear the host site required",
        "d": "Steel capped boots, gloves, hi vis, safety glasses, hearing protection, a cut resistant sleeve. Deductible where the item protects you from an identifiable risk on that particular job and you paid for it yourself."
      },
      {
        "t": "Renewing a forklift, EWP or other operating ticket",
        "d": "Renewing a ticket you already hold and use for the work is deductible. The first one is not, on the same principle that keeps a first drivers licence or a first White Card private."
      },
      {
        "t": "Tools and equipment you bought yourself",
        "d": "Some placements expect you to bring your own basics. Anything you bought and were not reimbursed for is deductible: $300 or less claimed in full in the year of purchase, more than that claimed across the effective life of the item."
      },
      {
        "t": "Cold storage and weather specific protective clothing",
        "d": "A freezer jacket for chilled or frozen warehouse work, wet weather gear for outdoor landscaping. These qualify as protective rather than conventional clothing because they exist to protect you from a condition the work puts you in."
      },
      {
        "t": "The work share of your phone",
        "d": "Agencies run on messages: shift offers at six in the morning, site addresses, timesheets. The work related percentage of your plan is a genuine deduction where you use your own phone for it."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What do you need to keep across placements?",
    "paras": [
      "One claim, three tests: you paid, nobody reimbursed you, and it was spent earning the income you are declaring. Across placements that means receipts for the boots and gloves you bought yourself, the ticket renewal, and a note of dates, sites and distances behind the travel.",
      "The record can be a receipt, an invoice, a bank statement or a phone photo, as long as it shows the amount, the date, the supplier and the item, and you hold it for five years. Work claims of $300 or less for the whole year need no written evidence, though you still have to explain how you got to the total. The $300 there is not the $300 that decides whether a piece of gear is written off at once or over its life."
    ]
  },
  {
    "kind": "traps",
    "h2": "What do labour hire workers get wrong?",
    "intro": "The wrong claims are mostly clothing and commuting. The missed ones are almost all about the number of employers, which is where labour hire quietly loses people money.",
    "wrong": [
      {
        "t": "Work pants and boots with no protective feature",
        "d": "Plain work trousers, a t-shirt, ordinary boots that are simply sturdy. Conventional clothing is private however heavy the work is and however fast it wears out."
      },
      {
        "t": "The commute to a single regular site",
        "d": "If an agency places you at the same warehouse for two months, the drive there is ordinary commuting, not itinerant travel. What makes travel deductible is moving between workplaces, not the fact that an agency sent you."
      },
      {
        "t": "Gear the agency issued",
        "d": "Most agencies supply hi vis and sometimes boots. If it was issued to you or reimbursed, there is no cost left to claim."
      },
      {
        "t": "A first ticket, treated as a work cost",
        "d": "The forklift licence you paid for so an agency would put you forward is a cost of becoming eligible, not a cost of the work. Renewals once you are placed are deductible."
      },
      {
        "t": "Assuming the agency has dealt with your tax",
        "d": "An agency withholds tax and reports your wages. It does not lodge your return, it does not claim your deductions, and it does not check whether the other two agencies got your details right."
      }
    ],
    "missed": [
      {
        "t": "An income statement from a forgotten agency",
        "d": "The classic labour hire mistake. Three weeks with an agency in March, one shift in a different state in June, and the return goes in without them. This is worse than a missed deduction, because it means an amendment later."
      },
      {
        "t": "Travel between two sites in one day",
        "d": "Very common with agencies moving a crew, and almost never claimed because the movement was a decision somebody else made. It is still deductible travel between workplaces."
      },
      {
        "t": "Boots and gloves bought yourself between placements",
        "d": "Gear bought so you could take the next job tends to be paid for in a hurry and never receipted. Each item under $300 is a full deduction in the year you bought it."
      },
      {
        "t": "A ticket renewal paid in cash",
        "d": "Forklift and EWP renewals are cheap enough to forget by July, and deductible once you are already working with the ticket."
      },
      {
        "t": "Weeks withheld at the wrong rate",
        "d": "A new agency that has not processed your Tax File Number Declaration, or is not registered with the ATO as an employer of working holiday makers, withholds well above 15 per cent. It comes back on the return that brings every agency together, and only there."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Which parts turn on how your year ran?",
    "paras": [
      "How itinerant the work was decides how much travel is deductible, and it is a question of fact rather than a rule. How often the site changed, whether one base kept pulling you back, whether the agency required the movement, and how the week was structured all feed in. Two people at the same agency can end up with very different travel claims, and a note of dates, sites and distances is what makes the stronger case provable.",
      "Every agency is a separate employer with its own Tax File Number Declaration, its own withholding relationship and its own income statement. As a working holiday maker the tax free threshold answer is no at every one of them, so claiming a threshold twice rarely bites. A rate applied wrongly, or an employer missing from the return, does.",
      "Residency sits under all of it. British, German and Japanese passport holders who were residents of Australia for tax purposes can carry the full tax free threshold under the Addy decision, worth more than every deduction on this page. One city and local agencies for a long stretch is the pattern that makes it a live question."
    ]
  }
]

const FAQS = [
  {
    "question": "I am registered with three agencies. Does that change my tax?",
    "answer": "Each agency is legally a separate employer, so you complete a separate Tax File Number Declaration with each and receive a separate income statement from each at the end of the year. All of them go into one return. As a working holiday maker your wages are taxed at the working holiday maker rate rather than against a tax free threshold, so the real risk with several agencies is not the rate, it is one of them being left out."
  },
  {
    "question": "Can I claim travel between different job sites?",
    "answer": "Usually yes. Travel between two or more separate work locations, for example a warehouse in the morning and a different site in the afternoon, is deductible in a way your ordinary trip from home to a single regular workplace is not. How much of your travel qualifies depends on how itinerant the pattern is, so keep a note of the dates, the sites and the distances."
  },
  {
    "question": "How is labouring different from construction for tax?",
    "answer": "The tests are identical, the items are not. Building site work usually requires a White Card and standard site PPE, while general labour hire covers warehouses, removals, landscaping, production lines and events, where the required gear follows the host role and a White Card is often not needed at all. If your placements are specifically on building sites, the construction page goes further into White Card costs and site gear."
  },
  {
    "question": "Can I claim a forklift licence?",
    "answer": "You can claim renewing one you already hold and use for the work. Getting the ticket in the first place is not deductible, because the ATO treats qualifying for work as a private cost rather than a cost of the work itself. An EWP ticket, a White Card and a drivers licence all fall the same way."
  },
  {
    "question": "I only did a handful of shifts. Is it worth claiming anything?",
    "answer": "Usually yes, provided you paid for the things yourself and were not reimbursed. Even a few shifts can involve boots, gloves, a ticket renewal or travel between sites, and every dollar of deduction reduces the income the tax is calculated on. The test does not change with the number of shifts: work related, unreimbursed, and something you can show a record for."
  }
]

const GUIDES = [
  {
    "href": "/blog/labour-hire-agencies-working-holiday-australia",
    "label": "Labour hire agencies and how they work",
    "desc": "Who your employer actually is when an agency places you."
  },
  {
    "href": "/blog/white-card-australia-working-holiday",
    "label": "The White Card, and what it costs you",
    "desc": "How to get one, and why the first one is not a deduction."
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
    "href": "/superannuation",
    "label": "Superannuation"
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
  headline: "Labour Hire and Warehouse Tax Deductions Australia",
  description: "Two agencies is two income statements. Two sites in one day is a deduction almost nobody claims.",
  url: `${SITE_URL}/expenses/labouring`,
  inLanguage: "en-AU",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/expenses/labouring#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/expenses/labouring`,
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
