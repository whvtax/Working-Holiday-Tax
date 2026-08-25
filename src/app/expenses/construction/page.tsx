import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": { absolute: "Construction Tax Deductions Australia: Tools, PPE, Ute" },
  "description": "What construction workers on a working holiday visa can claim: tools under and over $300, PPE and hi vis, White Card renewals and sun protection.",
  "keywords": [
    "construction worker tax deductions",
    "tradie tax deductions Australia",
    "White Card tax deductible",
    "tools tax deduction ATO",
    "PPE tax deduction construction",
    "backpacker construction tax return",
    "417 visa construction tax deductions",
    "ute tax deduction logbook"
  ],
  "alternates": {
    "canonical": "/expenses/construction",
    "languages": {
      "en-AU": "/expenses/construction",
      "de": "/de/expenses/construction",
      "ja": "/ja/expenses/construction",
      "x-default": "/expenses/construction"
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
    "url": `${SITE_URL}/expenses/construction`,
    "siteName": "Working Holiday Tax",
    "title": "Construction Tax Deductions Australia: Tools, PPE, Ute",
    "description": "Your tools, your PPE and your White Card renewal are deductible. Your first White Card and your ripped jeans are not."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Construction Tax Deductions Australia: Tools, PPE, Ute",
    "description": "Your tools, your PPE and your White Card renewal are deductible. Your first White Card and your ripped jeans are not."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "Construction and site work" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "If your refund is less than our fee, we refund the difference, so you are never out of pocket.",
  "guaranteeBody": "Site returns, ticket renewals and the ute argument are a weekly job here, and every client is on a 417 or a 462. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
  "faqHeading": "Questions people ask about this",
  "guidesHeading": "Worth reading next",
  "otherJobs": "A different job? Every occupation is here.",
  "servicesLabel": "Elsewhere on the site",
  "wrongLabel": "Claimed, and it should not have been",
  "missedLabel": "Not claimed, and it should have been",
  "disclaimer": "This is general information, not personal tax advice. What you can claim depends on your own employers, your own records, and how you actually worked. When you lodge with us we go through your situation line by line.",
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
    "name": "Construction",
    "item": "/expenses/construction"
  }
]

const HERO = {
  "kicker": "Sites, labouring and trades",
  "h1lead": "Your tools are deductible.",
  "h1accent": "Your first White Card is not.",
  "lede": "Site work carries the longest deduction list of any backpacker job. The ute is usually not on it."
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
    "h2": "What can a construction worker claim on tax?",
    "paras": [
      "A construction worker can claim tools and equipment bought out of their own pocket, protective clothing and PPE, sun protection for outdoor site work, renewals of a White Card or operating ticket they already hold, the work related share of a phone plan, and self education related to the trade they already work in. Anything the employer supplied or reimbursed is off the list.",
      "The list is long because the job creates specific costs. Steel caps protect you from a dropped brick, sunscreen from six hours on an unshaded slab. That is the connection the deduction test looks for."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "The dollar thresholds below are about timing, not eligibility. Crossing $300 does not remove a deduction, it spreads it.",
    "items": [
      {
        "t": "Tools and equipment under $300 each",
        "d": "A drill, a grinder, a nail gun, a level, a tool belt. Each item costing $300 or less is deducted in full in the year you buy it. The test is per item, so a year of small purchases builds a real claim from receipts most people bin."
      },
      {
        "t": "Tools and equipment of $300 or more",
        "d": "Still deductible, spread across the effective life of the item rather than claimed at once. A concrete mixer or a compound saw sits here. The trap is buying several tools together as a set costing $300 or more, because the set is one asset even where each piece alone would have been under the threshold."
      },
      {
        "t": "PPE and protective clothing",
        "d": "Hi vis shirts and vests, steel capped boots, safety glasses, a helmet, earmuffs, work gloves, a dust mask. The ATO test is not whether the item is useful on site, but whether it protects you from a specific risk of injury."
      },
      {
        "t": "Sun protection for outdoor work",
        "d": "Sunscreen, a wide brim hat and sunglasses are deductible where the site work is outdoors. On a summer slab this is a recurring cost almost nobody keeps a receipt for."
      },
      {
        "t": "Renewing a White Card or an operating ticket",
        "d": "Renewing a card or ticket you already hold is deductible. Your first White Card is not, because that cost made you eligible for construction work at all. The same split applies to a first forklift ticket, EWP ticket or heavy vehicle permit."
      },
      {
        "t": "The work share of your phone and internet",
        "d": "If you use your own phone to call a supervisor, check plans, or take shift messages, the work related percentage of the plan is deductible. Claiming the whole bill on a phone you also live on will not stand up."
      },
      {
        "t": "Training that relates to the trade you already work in",
        "d": "A course that upgrades a skill or ticket you use now is deductible. A course aimed at a different occupation is not, even when it is construction related, because it builds a new qualification rather than maintaining the one earning your income."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What has to sit behind a tool claim?",
    "paras": [
      "Every claim has to clear three tests. You paid for it, nobody reimbursed you, and it was spent earning the income you are declaring. On site that is the receipt for the drill, the boots and the ticket renewal.",
      "The record can be a receipt, an invoice, a bank statement or a phone photo carrying the amount, the date, the supplier and the item, kept five years. Where every work claim for the year totals $300 or less, no written evidence is required. That is a different $300 from the one deciding whether a saw is written off at once or across its life."
    ]
  },
  {
    "kind": "numbered",
    "h2": "When does the drive to site count?",
    "intro": "Home to a regular workplace is private travel, and a site is a workplace. One narrow exception exists, for bulky tools, and all three of these have to be true.",
    "steps": [
      "The tools are essential for the work you are doing that day.",
      "They are genuinely bulky: their size or weight is the reason a vehicle is needed, not convenience.",
      "There is nowhere secure to leave them at the site, so they have to travel home with you."
    ],
    "note": "If the site has a lockable shed, container or cage, or what you carry would fit in a normal bag, the trip stays an ordinary commute. If you do qualify, utes and panel vans with a carrying capacity of one tonne or more cannot use the cents per kilometre method, so a logbook is the only route for most who drive one."
  },
  {
    "kind": "traps",
    "h2": "What do construction workers get wrong?",
    "intro": "The wrong claims on a site return are usually clothing and the ute. The missed ones are receipts nobody kept for things that were plainly deductible.",
    "wrong": [
      {
        "t": "Ordinary clothes wrecked on site",
        "d": "Jeans, a t-shirt, a flannel, a hoodie. Normal wear and tear on conventional clothing is a private expense. The item has to protect you rather than merely survive the day."
      },
      {
        "t": "Your first White Card",
        "d": "The card you paid for before anyone would hire you is the cost of becoming eligible, which the ATO treats like a first drivers licence. Renewing it once you are working is deductible."
      },
      {
        "t": "The ute, as a matter of course",
        "d": "Owning a ute and driving it to site is not a deduction. All three bulky tool conditions above have to hold, and on most sites they do not, because there is somewhere to lock things up."
      },
      {
        "t": "Tools the employer supplied or paid for",
        "d": "If it came off the truck, out of the site container, or you were reimbursed for it, there is no cost left with you to claim."
      },
      {
        "t": "A course to get into a different trade",
        "d": "Study that would move you into a new occupation is not deductible, however clearly it is construction related."
      }
    ],
    "missed": [
      {
        "t": "The small tools, claimed one by one",
        "d": "People assume there is a threshold you have to reach before tools are worth claiming. There is not. Twelve purchases of $40 is $480 of deduction, and each is tested against $300 on its own."
      },
      {
        "t": "Anything over $300, written off entirely",
        "d": "People hear \"over $300\" and conclude the tool is not claimable. It is, across the effective life of the item. Dropping it loses the whole deduction rather than delaying part of it."
      },
      {
        "t": "Sunscreen and a hat on an outdoor site",
        "d": "Recognised for outdoor work and almost never claimed by tradesmen, who tend to think of sun protection as a farm thing. An unshaded slab in February is the same exposure."
      },
      {
        "t": "Laundering hi vis and protective gear",
        "d": "Washing deductible protective clothing is itself deductible at the ATO rate, $1 a load for work only loads or 50 cents mixed in with everything else. Past $150 for the year keep a simple diary."
      },
      {
        "t": "Ticket renewals paid for out of pocket",
        "d": "A White Card, a forklift ticket or an EWP renewal is easy to forget by July, especially when it was paid in cash on a Saturday course."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Which parts come down to your own facts?",
    "paras": [
      "The bulky tools exception, first. What you carry, what the site offers for storage, and whether the tools were essential that day settle it. Two labourers on the same crew can land differently.",
      "Residency is worth more than every tool on the list. British, German and Japanese passport holders who were residents of Australia for tax purposes can carry the full tax free threshold under the Addy decision. It depends on your own circumstances and has to be reviewed properly."
    ]
  }
]

const FAQS = [
  {
    "question": "Can I claim my first White Card?",
    "answer": "No. The ATO treats a first White Card like a first drivers licence, as the cost of becoming eligible for the work rather than a cost of doing it.\n\nOnce you are working and the card needs renewing, the renewal is deductible. The same applies to a first forklift ticket or heavy vehicle permit."
  },
  {
    "question": "What tools can I claim as a construction worker?",
    "answer": "Any tool or equipment you bought yourself for site work, as long as your employer did not supply it or pay you back.\n\nItems of $300 or less each are claimed in full in the year you buy them, items above that across the effective life of the item. Several tools bought together as a set costing $300 or more make one asset."
  },
  {
    "question": "Can I claim my ute for driving to site?",
    "answer": "Only in a narrow case. Driving from home to a regular workplace is private travel, and a building site is a workplace.\n\nThe trip is deductible only where the tools you carry are essential that day, genuinely bulky, and cannot be stored securely on site. Utes and panel vans carrying a tonne or more are excluded from the cents per kilometre method, so a logbook is the only way to claim them."
  },
  {
    "question": "Are steel caps and hi vis deductible?",
    "answer": "Yes. Steel capped boots, hi vis, safety glasses, helmets, earmuffs and work gloves are deductible because they protect you from a specific risk of injury, which is the test the ATO applies.\n\nSun protection for outdoor site work is claimable on the same basis, and so is laundering the protective gear."
  },
  {
    "question": "My clothes get destroyed on site. Why can I not claim them?",
    "answer": "Because the ATO tests the item rather than what happened to it. Jeans, a t-shirt or a flannel are conventional clothing, and wear and tear on them is private however fast the job ruins them.\n\nTo be deductible the item needs a genuine protective function, or has to be a compulsory branded uniform."
  }
]

const GUIDES = [
  {
    "href": "/blog/white-card-australia-working-holiday",
    "label": "The White Card, and what it costs you",
    "desc": "How to get one, and why the first one is not a deduction."
  },
  {
    "href": "/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "The $300 instant deduction for tools and gear",
    "desc": "Why each item is tested on its own, and what a set does to the answer."
  },
  {
    "href": "/blog/construction-laborer-working-holiday-australia",
    "label": "Construction labouring on a working holiday",
    "desc": "What the work pays and what a site expects you to turn up with."
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
  headline: "Construction Tax Deductions Australia: Tools, PPE, Ute",
  description: "Your tools, your PPE and your White Card renewal are deductible. Your first White Card and your ripped jeans are not.",
  url: `${SITE_URL}/expenses/construction`,
  inLanguage: "en-AU",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/expenses/construction#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/expenses/construction`,
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
                {/* Split on a blank line so a long answer reads as two short
                    paragraphs. faqSchema still uses the raw string. */}
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

      <MobileCta href={WA} lang={"en"} topic="expenses" />
    </>
  )
}
