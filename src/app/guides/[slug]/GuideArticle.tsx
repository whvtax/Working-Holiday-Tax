'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

interface Guide {
  slug: string
  title: string
  description: string
  body: string
  date: string
  readTime: number
  ctaHeading: string
  ctaBody: string
  ctaLabel: string
}

interface NextGuide {
  slug: string
  title: string
  description: string
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function parseBody(body: string) {
  const lines = body.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let i = 0

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
          style={{ fontSize: 'clamp(17px, 2.5vw, 19px)', fontWeight: 700, color: '#0B5240', marginTop: '2rem', marginBottom: '0.65rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}
        >
          {text}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className="font-serif"
          style={{ fontSize: '15px', fontWeight: 700, color: '#1A2822', marginTop: '1.5rem', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}
        >
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.length > 0) {
      const withLinks = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_: string, text: string, href: string) =>
        `<a href="${href}" style="color:#0B5240;text-decoration:none;border-bottom:1px solid #C8EAE0;">${text}</a>`
      )
      elements.push(
        <p
          key={key++}
          style={{ fontSize: '14.5px', color: '#2A3C34', lineHeight: 1.85, marginBottom: '0.9rem', fontWeight: 300 }}
          dangerouslySetInnerHTML={{ __html: withLinks }}
        />
      )
    }
    i++
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

export default function GuideArticle({ guide, nextGuide }: { guide: Guide; nextGuide: NextGuide | null }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const articleRef = useRef<HTMLDivElement>(null)
  const headings = getHeadings(guide.body)
  const readTime = calcReadTime(guide.body)

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      setScrollProgress(Math.min(100, (scrolled / total) * 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(guide.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`

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

      <div ref={articleRef}>
        {/* Table of Contents */}
        {headings.length >= 3 && (
          <div style={{
            background: '#F7F9F8', border: '1px solid #E2EFE9',
            borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '2rem',
          }}>
            <p style={{ fontSize: '10.5px', fontWeight: 600, color: '#8AADA3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
              In this guide
            </p>
            <ol style={{ margin: 0, padding: '0 0 0 1.1rem' }}>
              {headings.map(h => (
                <li key={h.id} style={{ marginBottom: '4px' }}>
                  <a
                    href={`#${h.id}`}
                    style={{ fontSize: '13px', color: '#0B5240', textDecoration: 'none', fontWeight: 400, lineHeight: 1.5 }}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Body */}
        <div style={{ marginBottom: '2.5rem' }}>{parseBody(guide.body)}</div>

        {/* Share */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11.5px', color: '#8AADA3', fontWeight: 500 }}>Share this guide:</span>
          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '100px',
              border: '1px solid #E2EFE9', background: 'transparent',
              fontSize: '12px', color: '#587066', cursor: 'pointer', fontWeight: 500,
            }}
          >
            {copied ? '✓ Copied!' : '🔗 Copy link'}
          </button>
          <a
            href={waShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '100px',
              border: '1px solid #E2EFE9', background: 'transparent',
              fontSize: '12px', color: '#587066', textDecoration: 'none', fontWeight: 500,
            }}
          >
            💬 WhatsApp
          </a>
        </div>

        {/* CTA */}
        <div style={{ background: '#0B5240', borderRadius: '16px', padding: '1.5rem 1.75rem' }}>
          <p style={{ fontSize: '10.5px', fontWeight: 600, color: '#2FA880', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
            Need help?
          </p>
          <h3 className="font-serif" style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {guide.ctaHeading}
          </h3>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '1.25rem', fontWeight: 300 }}>
            {guide.ctaBody}
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            {guide.ctaLabel} →
          </a>
        </div>

        {/* Next Guide */}
        {nextGuide && (
          <Link href={`/guides/${nextGuide.slug}`} style={{ display: 'block', textDecoration: 'none', marginTop: '2rem' }}>
            <div style={{ border: '1px solid #E2EFE9', borderRadius: '16px', padding: '1.25rem 1.5rem', cursor: 'pointer' }}>
              <p style={{ fontSize: '10.5px', fontWeight: 600, color: '#2FA880', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Keep reading →
              </p>
              <h4 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', marginBottom: '6px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                {nextGuide.title}
              </h4>
              <p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
                {nextGuide.description}
              </p>
            </div>
          </Link>
        )}

        {/* Back */}
        <div style={{ marginTop: '2rem', paddingBottom: '1rem' }}>
          <Link href="/guides" style={{ fontSize: '13px', color: '#0B5240', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            ← Back to all guides
          </Link>
        </div>
      </div>
    </>
  )
}
