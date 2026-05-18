'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from './../analytics'

/**
 * "Was this article helpful?" feedback widget.
 * Uses an in-memory store; selection persists for the page session.
 * Designed to give the user a small interaction point at the end of the article
 * without distracting from the content.
 */
export default function HelpfulWidget({ articleSlug }: { articleSlug: string }) {
  const [response, setResponse] = useState<'yes' | 'no' | null>(null)
  const [showThanks, setShowThanks] = useState(false)

  // Reset when navigating to a different article
  useEffect(() => {
    setResponse(null)
    setShowThanks(false)
  }, [articleSlug])

  const handleClick = (value: 'yes' | 'no') => {
    setResponse(value)
    setShowThanks(true)
    trackEvent('blog_helpful_feedback', { article_slug: articleSlug, response: value })
  }

  return (
    <div className="helpful-widget">
      {!showThanks ? (
        <>
          <p style={{ fontSize: '13.5px', color: '#587066', marginBottom: '12px', fontWeight: 500 }}>
            Was this article helpful?
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => handleClick('yes')}
              className="helpful-btn"
              aria-label="Yes, this article was helpful"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              Yes
            </button>
            <button
              onClick={() => handleClick('no')}
              className="helpful-btn"
              aria-label="No, this article was not helpful"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
              </svg>
              No
            </button>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#0B5240', fontWeight: 500 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2FA880" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>
            Thanks for your feedback! {response === 'no' && (
              <>Need more help? <a href="/contact" style={{ color: '#0B5240', fontWeight: 600, borderBottom: '1px solid #C8EAE0', textDecoration: 'none' }}>Get in touch</a>.</>
            )}
          </span>
        </div>
      )}
    </div>
  )
}
