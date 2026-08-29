/**
 * The shared occupation-expenses template (/expenses/<job> in all three
 * languages).
 *
 * WHY THIS EXISTS (29 Aug). Seven jobs times three languages meant the same
 * ~390 lines of schema builders, style tokens and section renderers pasted 21
 * times, drifting freely. Verified before extraction: the 21 render sections
 * were line-identical apart from translated comments and one real difference,
 * the Japanese hero (no italic, no space joiner - Japanese has neither).
 *
 * Each page file keeps what is genuinely its own: metadata, and the translated
 * content constants (UI, CRUMBS, HERO, SECTIONS, FAQS, GUIDES, SERVICES). This
 * file owns everything the pages share: the JSON-LD builders, the tokens, and
 * the section renderers for every Section kind. Byte-compared against the
 * pre-refactor HTML of all 21 pages.
 */
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/(site)/HomeWa'

/* ── Content types ─────────────────────────────────────────────────────── */

export type Section =
  | { kind: 'answer'; h2: string; paras: string[] }
  | { kind: 'items'; h2: string; intro: string; items: { t: string; d: string }[] }
  | { kind: 'traps'; h2: string; intro: string; wrong: { t: string; d: string }[]; missed: { t: string; d: string }[] }
  | { kind: 'numbered'; h2: string; intro: string; steps: string[]; note?: string }
  | { kind: 'tables'; h2: string; intro: string; tables: { label: string; rows: string[][] }[]; note?: string }
  | { kind: 'occupations'; h2: string; intro: string; jobs: { href: string; title: string; line: string }[] }
  | { kind: 'note'; label: string; title: string; body: string }

export interface JobExpensesUi {
  ctaLabel: string
  ctaSub: string
  guaranteeHeading: string
  guaranteeBody: string
  faqHeading: string
  guidesHeading: string
  otherJobs: string
  servicesLabel: string
  wrongLabel: string
  missedLabel: string
  disclaimer: string
  hubHref: string
}

export interface MygovUi {
  kicker: string
  h2lead: string
  h2accent: string
  lede: string
  colLeft: string
  colRight: string
  close: string
}

export interface JobExpensesContent {
  lang: 'en' | 'de' | 'ja'
  /** The page's own path, e.g. '/de/expenses/hospitality'. */
  path: string
  articleHeadline: string
  articleDescription: string
  inLanguage: string
  WA: string
  UI: JobExpensesUi
  crumbs: { name: string; item: string }[]
  hero: { kicker: string; h1lead: string; h1accent: string; lede: string }
  sections: Section[]
  faqs: { question: string; answer: string }[]
  guides: { href: string; label: string; desc: string }[]
  services: { href: string; label: string }[]
  /** The hub (/expenses) only: the myGov comparison block, rendered between
   *  the hero and the body sections. Job pages leave it out. */
  mygov?: { ui: MygovUi; rows: { mygov: string; us: string }[] }
  /** The "see the other jobs" link under GUIDES. On by default; the hub
   *  passes false because it IS the page that link points at. */
  hubLink?: boolean
}

/* Tokens kept local so this template does not depend on shared CSS being
   finished. Identical in all 21 original files. */
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

function Cta({ c, position }: { c: JobExpensesContent; position: 'hero' | 'inline' | 'section' }) {
  return (
    <div style={{ margin: '18px 0 0' }}>
      <WaLink
        href={c.WA}
        position={position}
        topic="expenses"
        lang={c.lang}
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
        {c.UI.ctaLabel}
      </WaLink>
      <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: MUTED, margin: '10px 0 0', textAlign: 'center' }}>
        {c.UI.ctaSub}
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

export function JobExpensesPage({ content: c }: { content: JobExpensesContent }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: c.crumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.item === '/' ? '' : b.item}`,
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.articleHeadline,
    description: c.articleDescription,
    url: `${SITE_URL}${c.path}`,
    inLanguage: c.inLanguage,
    // @id-linked to the site-wide #business node so these merge into one
    // publisher entity rather than resolving to a second, thinner one (29 Aug).
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: SITE_URL,
    },
    // These job-by-job deduction guides are the highest commercial-intent
    // informational pages on the site and were the only long-form content with
    // no reviewer link. Points at the supervising registered tax agent as a
    // separate, deliberately-unnamed node, exactly like the blog guides; the
    // business is never described as a registered tax agent itself.
    reviewedBy: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#supervising-agent`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
    },
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${c.path}#webpage`,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
    url: `${SITE_URL}${c.path}`,
  }

  // Japanese has neither italics nor inter-word spaces, so its hero accent
  // drops both, and its myGov closing line runs smaller with looser leading.
  // German compounds need hyphenation in the narrow myGov cells. These are
  // writing-system facts, not design drift.
  const cjkHero = c.lang === 'ja'
  const cellWrap: React.CSSProperties = c.lang === 'de'
    ? { overflowWrap: 'break-word', hyphens: 'auto' }
    : { overflowWrap: 'break-word' }
  const mygovClose: React.CSSProperties = c.lang === 'ja'
    ? { fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '17px', lineHeight: 1.75, fontWeight: 700, color: FOREST, margin: '22px 0 0' }
    : { fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '18px', lineHeight: 1.45, fontWeight: 700, color: FOREST, margin: '22px 0 0' }

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
                {c.crumbs.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {i > 0 && <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>}
                    {i === c.crumbs.length - 1 ? (
                      <span aria-current="page" style={{ color: FOREST, fontWeight: 500 }}>{b.name}</span>
                    ) : (
                      <Link href={b.item} style={{ color: MUTED, minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>{b.name}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <p style={kickerS}>{c.hero.kicker}</p>
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
              {c.hero.h1lead}{cjkHero ? null : ' '}
              <span style={cjkHero ? { color: FOREST } : { color: FOREST, fontStyle: 'italic' }}>{c.hero.h1accent}</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: '16.5px', lineHeight: 1.6, color: BODY, margin: 0 }}>
              {c.hero.lede}
            </p>
            <Cta c={c} position="hero" />
          </div>
        </section>

        {/* THE OBJECTION, ANSWERED ABOUT DEDUCTIONS (hub only) */}
        {c.mygov && (() => { const mg = c.mygov; return (
          <section style={secSunk}>
            <div style={wrap}>
              <p style={kickerS}>{mg.ui.kicker}</p>
              <h2 style={h2s}>
                <span style={{ display: 'block', color: BODY, fontWeight: 400 }}>{mg.ui.h2lead}</span>
                <span style={{ display: 'block' }}>{mg.ui.h2accent}</span>
              </h2>
              <p style={{ ...ps, color: MUTED, marginBottom: '20px' }}>{mg.ui.lede}</p>

              <div style={{ background: '#fff', border: '1px solid #CDE3DB', borderRadius: '14px', overflow: 'hidden' }}>
                {mg.rows.map((row, i) => (
                  <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : `1px solid ${HAIR}` }}>
                    <div style={{ padding: '13px 16px' }}>
                      {/* Both labels used to print on all eight cells. On a phone
                          the rows stack, so that was the same two words marching
                          down the screen eight times. They print once, on the first
                          row: column headings on desktop, the key on mobile. */}
                      {i === 0 && (
                        <p style={{ fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: MUTED, margin: '0 0 5px' }}>
                          {mg.ui.colLeft}
                        </p>
                      )}
                      <p style={{ ...ps, margin: 0, ...cellWrap }}>{row.mygov}</p>
                    </div>
                    <div className="border-t md:border-t-0 md:border-l" style={{ padding: '13px 16px', background: '#F2FAF7', borderColor: HAIR }}>
                      {i === 0 && (
                        <p style={{ fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: FOREST, margin: '0 0 5px' }}>
                          {mg.ui.colRight}
                        </p>
                      )}
                      <p style={{ ...ps, margin: 0, color: INK, fontWeight: 500, ...cellWrap }}>{row.us}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p style={mygovClose}>
                {mg.ui.close}
              </p>
            </div>
          </section>
        ) })()}

        {/* BODY SECTIONS */}
        {c.sections.map((s, i) => (
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
                  <Bullets label={c.UI.wrongLabel} colour={WARN} items={s.wrong} />
                  <Bullets label={c.UI.missedLabel} colour={FOREST} items={s.missed} />
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
            <h2 style={{ ...h2s, color: '#fff', marginBottom: '16px' }}>{c.UI.guaranteeHeading}</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.62, color: 'rgba(255,255,255,0.78)', margin: 0 }}>
              {c.UI.guaranteeBody}
            </p>
            <div style={{ marginTop: '18px' }}>
              <WaLink
                href={c.WA}
                position="section"
                topic="expenses"
                lang={c.lang}
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
                {c.UI.ctaLabel}
              </WaLink>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)', margin: '10px 0 0', textAlign: 'center' }}>
                {c.UI.ctaSub}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={secLight}>
          <div style={wrap}>
            <h2 style={h2s}>{c.UI.faqHeading}</h2>
            {c.faqs.map((f, i) => (
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
            <h2 style={h2s}>{c.UI.guidesHeading}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {c.guides.map((g, i) => (
                <Link key={i} href={g.href} style={{ display: 'block', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '15px 16px', textDecoration: 'none', minHeight: '44px' }}>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: FOREST, marginBottom: '3px' }}>{g.label}</span>
                  <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.5, color: BODY }}>{g.desc}</span>
                </Link>
              ))}
            </div>

            <p style={{ ...kickerS, marginTop: '24px' }}>{c.UI.servicesLabel}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {c.services.map((s, i) => (
                <Link key={i} href={s.href} style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '0 16px', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '999px', fontSize: '15px', fontWeight: 600, color: FOREST, textDecoration: 'none' }}>
                  {s.label}
                </Link>
              ))}
            </div>
            {c.hubLink !== false && (
              <p style={{ ...ps, marginTop: '18px', marginBottom: 0 }}>
                <Link href={c.UI.hubHref} style={{ color: FOREST, textDecoration: 'underline' }}>{c.UI.otherJobs}</Link>
              </p>
            )}
          </div>
        </section>

        {/* DISCLAIMER */}
        <section style={{ ...secLight, paddingBottom: '52px' }}>
          <div style={wrap}>
            <p style={{ fontSize: '13.5px', lineHeight: 1.62, color: MUTED, margin: 0 }}>{c.UI.disclaimer}</p>
          </div>
        </section>

      </main>

      <MobileCta href={c.WA} lang={c.lang} topic="expenses" />
    </>
  )
}
