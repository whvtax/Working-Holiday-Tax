'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const SERVICES = [
  { value: 'general',     label: 'General question' },
  { value: 'tfn',         label: 'TFN application' },
  { value: 'tax-return',  label: 'Tax return' },
  { value: 'super',       label: 'Super withdrawal' },
  { value: 'abn',         label: 'ABN registration' },
  { value: 'medicare',    label: 'Medicare levy' },
]

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/contact-form', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        if (data.error === 'rate_limited') {
          setErrorMsg('Too many requests. Please wait a moment and try again.')
        } else if (data.error === 'invalid_email') {
          setErrorMsg('Please enter a valid email address.')
        } else if (data.error === 'missing_fields') {
          setErrorMsg('Please fill in your name, email, and message.')
        } else {
          setErrorMsg('Something went wrong. Please try WhatsApp instead.')
        }
        setStatus('error')
        return
      }

      setStatus('success')
      // Reset form
      e.currentTarget.reset()
    } catch (err) {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form-success">
        <div className="contact-form-success-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="#EAF6F1" stroke="#2FA880" strokeWidth="1.5"/>
            <path d="M10 16l4 4 8-8" stroke="#0B5240" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-serif" style={{ fontSize: '22px', fontWeight: 700, color: '#0B5240', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Message sent
        </h3>
        <p style={{ fontSize: '14px', color: '#587066', lineHeight: 1.7, marginBottom: '16px' }}>
          We will get back to you within an hour during business hours, or first thing the next morning.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="contact-form-reset-btn"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>

      {/* Full Name */}
      <div className="contact-form-row">
        <label htmlFor="contact-name" className="contact-form-label">
          Your name <span style={{ color: '#C47E10' }}>*</span>
        </label>
        <input
          id="contact-name"
          name="fullName"
          type="text"
          required
          maxLength={80}
          autoComplete="name"
          placeholder="Jane Smith"
          className="contact-form-input"
        />
      </div>

      {/* Email */}
      <div className="contact-form-row">
        <label htmlFor="contact-email" className="contact-form-label">
          Email <span style={{ color: '#C47E10' }}>*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={120}
          autoComplete="email"
          placeholder="you@example.com"
          className="contact-form-input"
        />
      </div>

      {/* WhatsApp (optional) */}
      <div className="contact-form-row">
        <label htmlFor="contact-whatsapp" className="contact-form-label">
          WhatsApp <span style={{ color: '#8AADA3', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          id="contact-whatsapp"
          name="whatsapp"
          type="tel"
          maxLength={30}
          autoComplete="tel"
          placeholder="+61 4XX XXX XXX"
          className="contact-form-input"
        />
      </div>

      {/* Service interest */}
      <div className="contact-form-row">
        <label htmlFor="contact-service" className="contact-form-label">
          What is your question about?
        </label>
        <select
          id="contact-service"
          name="service"
          defaultValue="general"
          className="contact-form-input contact-form-select"
        >
          {SERVICES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="contact-form-row">
        <label htmlFor="contact-message" className="contact-form-label">
          Your message <span style={{ color: '#C47E10' }}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={2000}
          rows={5}
          placeholder="Tell us about your situation, what you've done so far, and how we can help."
          className="contact-form-input contact-form-textarea"
        />
      </div>

      {/* Error message */}
      {status === 'error' && errorMsg && (
        <div className="contact-form-error" role="alert">
          {errorMsg}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="contact-form-submit"
      >
        {status === 'submitting' ? (
          <>
            <span className="contact-form-spinner" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>Send message →</>
        )}
      </button>

      {/* Privacy notice */}
      <p className="contact-form-privacy">
        By sending this message, you agree to our <a href="/privacy" style={{ color: '#0B5240', fontWeight: 500, textDecoration: 'underline' }}>privacy policy</a>. We never share your information.
      </p>
    </form>
  )
}
