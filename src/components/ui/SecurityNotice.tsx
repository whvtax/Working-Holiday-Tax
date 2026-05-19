'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'security-notice-dismissed'
const AUTO_DISMISS_MS = 4000

export function SecurityNotice() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Show only once per session
    if (typeof window === 'undefined') return
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return
    } catch { /* ignore */ }

    // Show after a brief delay so it doesn't compete with page load
    const showTimer = setTimeout(() => setVisible(true), 1500)
    // Auto-dismiss
    const hideTimer = setTimeout(() => handleClose(), 1500 + AUTO_DISMISS_MS)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
  }

  if (!mounted) return null

  return (
    <div
      role="alert"
      aria-live="polite"
      className="security-notice"
      data-visible={visible}
    >
      <div className="security-notice-inner">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
          <path d="M12 2L3 7v5c0 5 3.5 9 9 10 5.5-1 9-5 9-10V7l-9-5z" stroke="#0B5240" strokeWidth="1.6" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke="#0B5240" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="security-notice-text">
          A registered tax agent will never ask for your <strong>myGov login details</strong>.
        </p>
        <button
          type="button"
          onClick={handleClose}
          className="security-notice-close"
          aria-label="Dismiss notice"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
