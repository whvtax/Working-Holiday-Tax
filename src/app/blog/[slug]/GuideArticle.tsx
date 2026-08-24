'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import MobileTOC from './MobileTOC'
import ReadingProgress from './ReadingProgress'
import { trackEvent } from './../analytics'
import { waUrl, type WaTopic } from '@/lib/wa'
import { trackGuideCta, trackWhatsApp } from '@/lib/analytics'

interface Guide {
  slug: string
  title: string
  description: string
  body: string
  date: string
  readTime: number
  category: string
}

type Locale = 'en' | 'de' | 'ja'

// Localized UI strings for the article component
const ARTICLE_UI = {
  en: {
    quickAnswerLabel: 'Quick answer',
    onThisPage: 'On this page',
    shareThisArticle: 'Share this article:',
    shareCopy: 'Copy link',
    shareCopied: '✓ Copied!',
    shareWhatsApp: 'Share on WhatsApp',
    backToBlog: 'Back to Blog',
    tocAriaLabel: 'Table of contents',
  },
  de: {
    quickAnswerLabel: 'Schnelle Antwort',
    onThisPage: 'Inhaltsverzeichnis',
    shareThisArticle: 'Diesen Artikel teilen:',
    shareCopy: 'Link kopieren',
    shareCopied: '✓ Kopiert!',
    shareWhatsApp: 'Per WhatsApp teilen',
    backToBlog: 'Zurück zum Blog',
    tocAriaLabel: 'Inhaltsverzeichnis',
  },
  ja: {
    quickAnswerLabel: '結論',
    onThisPage: '目次',
    shareThisArticle: 'この記事をシェア：',
    shareCopy: 'リンクをコピー',
    shareCopied: '✓ コピーしました！',
    shareWhatsApp: 'WhatsAppでシェア',
    backToBlog: 'ブログ一覧へ戻る',
    tocAriaLabel: '目次',
  },
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/* ── The one in body CTA ──────────────────────────────────────────────────
   A reader who is already convinced should not have to reach the end of a
   2,000 word guide to act. So there is exactly one offer inside the body,
   placed at the close of the third section, and none anywhere else.

   One, not two. More than one and the article stops reading like a guide and
   starts reading like a funnel, which costs the trust the guide just earned,
   and that trust is the only reason the guide converts at all.

   It sits at the END of the third section rather than directly under the
   third H2 on purpose: the paragraph immediately after a question heading is
   what search and AI engines lift as the answer to that question, and it must
   not be an advert.                                                        */

const INLINE_CTA_TOPIC: Record<string, WaTopic> = {
  'TFN': 'tfn',
  'ABN': 'abn',
  'Tax Return': 'tax-return',
  'Super': 'super',
  'Medicare & Other': 'medicare',
  'Work Rights': 'guide',
}

interface InlineCopy { body: string; cta: string }

const INLINE_CTA_COPY: Record<Locale, Record<string, InlineCopy>> = {
  en: {
    'TFN': {
      body: 'Want to know what this leaves you with? Tell us where you worked and what came off your pay, and we will tell you what your year actually looks like.',
      cta: 'Ask us on WhatsApp',
    },
    'ABN': {
      body: 'If you invoiced under an ABN as well as working on a TFN, that split is what decides your return. Send us what you did and we will work out where you stand.',
      cta: 'Ask us on WhatsApp',
    },
    'Tax Return': {
      body: 'If you would rather not work this out on your own, tell us about the year you had and we will tell you what it means for your return.',
      cta: 'Message us on WhatsApp',
    },
    'Super': {
      body: 'If you would rather we found every fund sitting under your TFN and lodged the claim once, send us your details.',
      cta: 'Ask about your super',
    },
    'Medicare & Other': {
      body: 'Not sure whether the exemption applies to you? Tell us which passport you hold and whether you ever enrolled, and we will check it.',
      cta: 'Ask us on WhatsApp',
    },
    'Work Rights': {
      body: 'If any of this touched your pay or your hours, it usually shows up in your tax return as well. We are on WhatsApp if you want to ask.',
      cta: 'Ask us a question',
    },
  },
  de: {
    'TFN': {
      body: 'Du willst wissen, was das für dich bedeutet? Sag uns, wo du gearbeitet hast und was von deinem Lohn abgezogen wurde, und wir sagen dir, wie dein Jahr wirklich aussieht.',
      cta: 'Frag uns auf WhatsApp',
    },
    'ABN': {
      body: 'Wenn du neben der TFN auch über eine ABN abgerechnet hast, entscheidet genau diese Aufteilung über deine Steuererklärung. Schick uns, was du gemacht hast.',
      cta: 'Frag uns auf WhatsApp',
    },
    'Tax Return': {
      body: 'Wenn du das nicht selbst durchrechnen willst: Erzähl uns von deinem Jahr und wir sagen dir, was es für deine Steuererklärung bedeutet.',
      cta: 'Schreib uns auf WhatsApp',
    },
    'Super': {
      body: 'Wenn wir alle Fonds unter deiner TFN finden und den Antrag einmal richtig stellen sollen, schick uns deine Daten.',
      cta: 'Frag zu deiner Super',
    },
    'Medicare & Other': {
      body: 'Nicht sicher, ob die Befreiung für dich gilt? Sag uns, welchen Pass du hast und ob du jemals angemeldet warst, und wir prüfen es.',
      cta: 'Frag uns auf WhatsApp',
    },
    'Work Rights': {
      body: 'Wenn davon etwas deinen Lohn oder deine Stunden betrifft, taucht es meistens auch in deiner Steuererklärung auf. Wir sind auf WhatsApp.',
      cta: 'Stell uns eine Frage',
    },
  },
  ja: {
    'TFN': {
      body: 'これが自分にとって何を意味するか知りたい場合は、どこで働いたか、給与から何が引かれていたかを教えてください。あなたの1年が実際どうなっているかお伝えします。',
      cta: 'WhatsAppで相談する',
    },
    'ABN': {
      body: 'TFNでの就労に加えてABNでも請求していた場合、その切り分けが申告内容を左右します。何をしたか送ってください。',
      cta: 'WhatsAppで相談する',
    },
    'Tax Return': {
      body: '自分で計算したくない場合は、あなたの1年の内容を送ってください。申告にとって何を意味するかお伝えします。',
      cta: 'WhatsAppで相談する',
    },
    'Super': {
      body: 'TFNからすべてのファンドを探して一度で申請してほしい場合は、詳細を送ってください。',
      cta: 'スーパーについて相談する',
    },
    'Medicare & Other': {
      body: '免除の対象かどうか分からない場合は、お持ちのパスポートと、メディケアに登録したことがあるかを教えてください。こちらで確認します。',
      cta: 'WhatsAppで相談する',
    },
    'Work Rights': {
      body: '給与や労働時間に関わることは、たいていタックスリターンにも表れます。質問があればWhatsAppでどうぞ。',
      cta: '質問する',
    },
  },
}

function InlineGuideCta({ guide, locale }: { guide: Guide; locale: Locale }) {
  const copy =
    INLINE_CTA_COPY[locale]?.[guide.category] ??
    INLINE_CTA_COPY[locale]?.['Tax Return'] ??
    INLINE_CTA_COPY.en['Tax Return']
  const topic = INLINE_CTA_TOPIC[guide.category] ?? 'guide'
  const href = waUrl({ topic, lang: locale, detail: guide.title })

  const onTap = () => {
    try { navigator.vibrate?.(10) } catch { /* unsupported, which is fine */ }
    trackGuideCta({ slug: guide.slug, category: guide.category, lang: locale, position: 'guide-inline' })
    trackWhatsApp({ position: 'guide-inline', topic, lang: locale })
  }

  return (
    <aside className="guide-inline-cta">
      <p>{copy.body}</p>
      {/* Layout only. Colour, size and underline come from .guide-inline-cta a
          in the stylesheet; this just gives the link a 44px tap target. */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onTap}
        style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px' }}
      >
        {copy.cta} →
      </a>
    </aside>
  )
}

/**
 * Shortens the first paragraph of the article for the Quick Answer block.
 * Aims for 2-3 sentences or ~280 chars to keep it scannable and Featured-Snippet-friendly.
 */
function shortenQuickAnswer(text: string): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= 280) return cleaned

  // Try to cut at the end of a sentence
  const sentences = cleaned.match(/[^.!?]+[.!?]+/g) || [cleaned]
  let result = ''
  for (const s of sentences) {
    if ((result + s).length > 280) break
    result += s
  }
  return result.trim() || cleaned.slice(0, 277).trim() + '…'
}

function parseBody(body: string, locale: Locale = 'en', inlineCta?: React.ReactNode) {
  const lines = body.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let i = 0
  let isFirstParagraph = true
  const ui = ARTICLE_UI[locale]

  // The in body CTA goes in at the close of the third section, which is the
  // moment the fourth H2 arrives. Guides with fewer than four H2s never reach
  // that point and correctly get no in body CTA at all: on a short guide the
  // end of guide block is already within reach.
  const totalH2 = lines.filter(l => l.trim().startsWith('## ')).length
  const ctaBeforeH2 = inlineCta && totalH2 >= 4 ? 4 : 0
  let h2Seen = 0

  const renderInline = (raw: string) => {
    return raw
      .replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:600;color:#0B5240;">$1</strong>')
      // A real underline, not a 1px #C8EAE0 bottom border at 1.18:1 against
      // white. The border did not read as a link at all, which is the only
      // thing an inline link has to do.
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_: string, text: string, href: string) =>
        `<a href="${href}" style="color:#0B5240;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;font-weight:600;padding:2px 0;">${text}</a>`
      )
  }

  while (i < lines.length) {
    const line = lines[i].trim()

    if (line.startsWith('## ')) {
      const text = line.replace('## ', '')
      const id = slugify(text)
      h2Seen++
      if (ctaBeforeH2 && h2Seen === ctaBeforeH2) {
        elements.push(<div key={key++}>{inlineCta}</div>)
      }
      elements.push(
        <h2
          key={key++}
          id={id}
          className="font-serif"
          style={{ fontSize: 'clamp(20px, 2.6vw, 24px)', fontWeight: 700, color: '#0B5240', marginTop: '2.5rem', marginBottom: '0.75rem', letterSpacing: '-0.022em', lineHeight: 1.25, scrollMarginTop: '90px' }}
        >
          {text}
        </h2>
      )
      i++
      isFirstParagraph = false
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className="font-serif"
          style={{ fontSize: '17px', fontWeight: 700, color: '#1A2822', marginTop: '1.5rem', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}
        >
          {line.replace('### ', '')}
        </h3>
      )
      i++
    } else if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().substring(2))
        i++
      }
      elements.push(
        <ul
          key={key++}
          style={{ marginBottom: '1.1rem', paddingLeft: '1.4rem', listStyleType: 'disc' }}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              style={{ fontSize: '15.5px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '0.45rem', fontWeight: 400 }}
              dangerouslySetInnerHTML={{ __html: renderInline(item) }}
            />
          ))}
        </ul>
      )
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol
          key={key++}
          style={{ marginBottom: '1.1rem', paddingLeft: '1.4rem', listStyleType: 'decimal' }}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              style={{ fontSize: '15.5px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '0.45rem', fontWeight: 400 }}
              dangerouslySetInnerHTML={{ __html: renderInline(item) }}
            />
          ))}
        </ol>
      )
    } else if (line.length > 0) {
      if (isFirstParagraph) {
        // Quick Answer block - shortened to 2-3 sentences for AI snippets and quick scanning.
        const quickAnswerText = shortenQuickAnswer(line)
        elements.push(
          <div
            key={key++}
            style={{
              background: 'linear-gradient(135deg, #EAF6F1 0%, #F7F9F8 100%)',
              borderLeft: '4px solid #2FA880',
              borderRadius: '12px',
              padding: '18px 22px',
              marginBottom: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2FA880' }} aria-hidden="true" />
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {ui.quickAnswerLabel}
              </span>
            </div>
            <p
              className="quick-answer"
              style={{ fontSize: '16px', color: '#1A2822', lineHeight: 1.65, margin: 0, fontWeight: 400 }}
              dangerouslySetInnerHTML={{ __html: renderInline(quickAnswerText) }}
            />
          </div>
        )
        isFirstParagraph = false
      } else {
        elements.push(
          <p
            key={key++}
            style={{ fontSize: '15.5px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '1rem', fontWeight: 400 }}
            dangerouslySetInnerHTML={{ __html: renderInline(line) }}
          />
        )
      }
      i++
    } else {
      i++
    }
  }
  return elements
}

function getHeadings(body: string) {
  return body.trim().split('\n')
    .filter(l => l.trim().startsWith('## '))
    .map(l => {
      const text = l.trim().replace('## ', '')
      return { text, id: slugify(text) }
    })
}

function calcReadTime(body: string) {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default function GuideArticle({ guide, locale = 'en' }: { guide: Guide; locale?: Locale }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [activeHeading, setActiveHeading] = useState<string>('')
  const articleRef = useRef<HTMLDivElement>(null)
  const headings = getHeadings(guide.body)
  const readTime = calcReadTime(guide.body)
  const ui = ARTICLE_UI[locale]

  // Page view tracking - fires once per article load
  useEffect(() => {
    trackEvent('blog_article_open', {
      article_slug: guide.slug,
      article_title: guide.title,
      category: guide.category,
      read_time: guide.readTime,
    })
  }, [guide.slug, guide.title, guide.category, guide.readTime])

  useEffect(() => {
    let rafId = 0
    let pending = false
    // Cache heading elements once instead of looking them up on every scroll tick.
    // For long articles with many H2s this avoids dozens of getElementById calls per frame.
    const headingEls = headings
      .map(h => ({ id: h.id, el: document.getElementById(h.id) }))
      .filter((h): h is { id: string; el: HTMLElement } => h.el !== null)

    const compute = () => {
      const el = articleRef.current
      if (!el) { pending = false; return }
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      setScrollProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)

      // Track active heading for TOC highlighting
      const markerY = 120
      let current = ''
      for (const h of headingEls) {
        if (h.el.getBoundingClientRect().top <= markerY) {
          current = h.id
        } else {
          break
        }
      }
      setActiveHeading(current)
      pending = false
    }
    const onScroll = () => {
      if (pending) return
      pending = true
      rafId = requestAnimationFrame(compute)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    compute()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [headings])

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackEvent('blog_share', { article_slug: guide.slug, method: 'copy_link' })
  }

  const handleWhatsAppShare = () => {
    trackEvent('blog_share', { article_slug: guide.slug, method: 'whatsapp' })
  }

  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(guide.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`

  const showToc = headings.length >= 3

  return (
    <>
      {/* Progress bar.
          It used to sit at z-index 50, the same layer as the nav, which put it
          on top of the sticky breadcrumb bar and painted out the breadcrumbs'
          first three pixels. It now sits below the nav and above the
          breadcrumbs, and the breadcrumbs start at 71px so the two no longer
          share the same three pixels at all. The fill is forest rather than
          amber: amber on #E2EFE9 measures 1.87:1 and is effectively invisible. */}
      <div style={{
        position: 'fixed', top: '68px', left: 0, right: 0, height: '3px',
        background: '#E2EFE9', zIndex: 45,
      }}>
        <div style={{
          height: '100%', background: '#0B5240',
          width: `${scrollProgress}%`,
          transition: 'width 0.1s linear',
        }} />
      </div>

      {/* Reading progress badge (floating bottom-left) */}
      <ReadingProgress readTime={readTime} locale={locale} />

      {/* Mobile TOC drawer (only renders FAB on mobile/tablet) */}
      <MobileTOC headings={headings} activeHeading={activeHeading} locale={locale} />

      <div ref={articleRef} className={`article-layout ${showToc ? 'with-toc' : ''}`}>

        {/* Main article column */}
        <div style={{ minWidth: 0 }}>

          {/* Body */}
          <div className="guide-body" style={{ marginBottom: '2.5rem' }}>
            {parseBody(guide.body, locale, <InlineGuideCta guide={guide} locale={locale} />)}
          </div>

          {/* Share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#587066', fontWeight: 500 }}>{ui.shareThisArticle}</span>
            <button
              onClick={handleCopy}
              className="share-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                minHeight: '44px', padding: '10px 18px', borderRadius: '100px',
                border: '1px solid #E2EFE9', background: 'transparent',
                fontSize: '13px', color: '#587066', cursor: 'pointer', fontWeight: 500,
              }}
            >
              {copied ? ui.shareCopied : ui.shareCopy}
            </button>
            <a
              href={waShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppShare}
              className="share-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                minHeight: '44px', padding: '10px 18px', borderRadius: '100px',
                border: '1px solid #E2EFE9', background: 'transparent',
                fontSize: '13px', color: '#587066', textDecoration: 'none', fontWeight: 500,
              }}
            >
              {ui.shareWhatsApp}
            </a>
          </div>

          {/* Back */}
          <div style={{ marginTop: '2.5rem', paddingBottom: '1rem' }}>
            <Link
              href={locale === 'de' ? '/de/blog' : locale === 'ja' ? '/ja/blog' : '/blog'}
              className="back-link"
              style={{
                fontSize: '13px',
                color: '#0B5240',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span className="back-arrow">←</span> {ui.backToBlog}
            </Link>
          </div>
        </div>

        {/* Desktop TOC sidebar */}
        {showToc && (
          <aside className="toc-sidebar" aria-label={ui.tocAriaLabel}>
            <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#16775C', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
              {ui.onThisPage}
            </p>
            <nav>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '2px solid #E2EFE9' }}>
                {headings.map(h => {
                  const isActive = activeHeading === h.id
                  return (
                    <li key={h.id} style={{ marginBottom: '2px' }}>
                      <a
                        href={`#${h.id}`}
                        className="toc-link"
                        style={{
                          display: 'block',
                          padding: '6px 0 6px 12px',
                          marginLeft: '-2px',
                          fontSize: '13px',
                          color: isActive ? '#0B5240' : '#587066',
                          textDecoration: 'none',
                          lineHeight: 1.45,
                          fontWeight: isActive ? 600 : 400,
                          borderLeft: `2px solid ${isActive ? '#0B5240' : 'transparent'}`,
                        }}
                      >
                        {h.text}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </>
  )
}
