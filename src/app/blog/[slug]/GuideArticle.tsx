'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import MobileTOC from './MobileTOC'
import ReadingProgress from './ReadingProgress'
import { trackEvent } from './../analytics'

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
    shareWhatsApp: 'WhatsApp',
    backToBlog: 'Back to Blog',
    tocAriaLabel: 'Table of contents',
  },
  de: {
    quickAnswerLabel: 'Schnelle Antwort',
    onThisPage: 'Inhaltsverzeichnis',
    shareThisArticle: 'Diesen Artikel teilen:',
    shareCopy: 'Link kopieren',
    shareCopied: '✓ Kopiert!',
    shareWhatsApp: 'WhatsApp',
    backToBlog: 'Zurück zum Blog',
    tocAriaLabel: 'Inhaltsverzeichnis',
  },
  ja: {
    quickAnswerLabel: '結論',
    onThisPage: '目次',
    shareThisArticle: 'この記事をシェア：',
    shareCopy: 'リンクをコピー',
    shareCopied: '✓ コピーしました！',
    shareWhatsApp: 'WhatsApp',
    backToBlog: 'ブログ一覧へ戻る',
    tocAriaLabel: '目次',
  },
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
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

function parseBody(body: string, locale: Locale = 'en') {
  const lines = body.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let i = 0
  let isFirstParagraph = true
  const ui = ARTICLE_UI[locale]

  const renderInline = (raw: string) => {
    return raw
      .replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:600;color:#0B5240;">$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_: string, text: string, href: string) =>
        `<a href="${href}" style="color:#0B5240;text-decoration:none;border-bottom:1px solid #C8EAE0;font-weight:500;">${text}</a>`
      )
  }

  while (i < lines.length) {
    const line = lines[i].trim()

    if (line.startsWith('## ')) {
      const text = line.replace('## ', '')
      const id = slugify(text)
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
              style={{ fontSize: '15.5px', color: '#2A3C34', lineHeight: 1.85, marginBottom: '0.4rem', fontWeight: 300 }}
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
              style={{ fontSize: '15.5px', color: '#2A3C34', lineHeight: 1.85, marginBottom: '0.4rem', fontWeight: 300 }}
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
            style={{ fontSize: '15.5px', color: '#2A3C34', lineHeight: 1.85, marginBottom: '1rem', fontWeight: 300 }}
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
      {/* Progress Bar */}
      <div style={{
        position: 'fixed', top: '68px', left: 0, right: 0, height: '3px',
        background: '#E2EFE9', zIndex: 50,
      }}>
        <div style={{
          height: '100%', background: '#E9A020',
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
          <div style={{ marginBottom: '2.5rem' }}>{parseBody(guide.body, locale)}</div>

          {/* Share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11.5px', color: '#8AADA3', fontWeight: 500 }}>{ui.shareThisArticle}</span>
            <button
              onClick={handleCopy}
              className="share-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '100px',
                border: '1px solid #E2EFE9', background: 'transparent',
                fontSize: '12px', color: '#587066', cursor: 'pointer', fontWeight: 500,
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
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '100px',
                border: '1px solid #E2EFE9', background: 'transparent',
                fontSize: '12px', color: '#587066', textDecoration: 'none', fontWeight: 500,
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
            <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#2FA880', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
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
