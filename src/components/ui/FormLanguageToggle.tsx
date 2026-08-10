'use client'
import type { FormLang } from '@/lib/formStrings'

/**
 * Language toggle pill shown at the top of each form.
 * Always shows all three languages: English / Deutsch / 日本語
 * Data submitted to CRM always stays in the language the user typed (English).
 * The labels/instructions UI is what changes based on selection.
 */
export function FormLanguageToggle({ lang, onChange }: { lang: FormLang; onChange: (l: FormLang) => void }) {
  // Shared button style generator
  const btnStyle = (active: boolean) => ({
    // ≥40px tall tap target on touch devices
    padding: '10px 16px',
    fontSize: '12px',
    fontWeight: active ? 700 : 500,
    background: active ? '#fff' : 'transparent',
    color: active ? '#0B5240' : '#587066',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: active ? '0 1px 3px rgba(11,82,64,0.12)' : 'none',
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    gap: '6px',
    transition: 'all .15s',
  })

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '14px',
      gap: '4px',
      background: '#EAF6F1',
      borderRadius: '100px',
      padding: '4px',
      width: 'fit-content',
      marginLeft: 'auto',
      marginRight: 'auto',
      flexWrap: 'wrap',
    }}>
      {/* English */}
      <button type="button" onClick={() => onChange('en')} style={btnStyle(lang === 'en')} aria-pressed={lang === 'en'}>
        <svg width="14" height="10" viewBox="0 0 60 42" aria-hidden="true">
          <clipPath id="flt-uk"><rect width="60" height="42" rx="2"/></clipPath>
          <g clipPath="url(#flt-uk)">
            <rect width="60" height="42" fill="#012169"/>
            <path d="M0,0 L60,42 M60,0 L0,42" stroke="#fff" strokeWidth="6"/>
            <path d="M30,0 v42 M0,21 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v42 M0,21 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
        English
      </button>

      {/* Deutsch */}
      <button type="button" onClick={() => onChange('de')} style={btnStyle(lang === 'de')} aria-pressed={lang === 'de'}>
        <svg width="14" height="10" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '1px' }}>
          <rect width="60" height="14" y="0"  fill="#000"/>
          <rect width="60" height="14" y="14" fill="#DD0000"/>
          <rect width="60" height="14" y="28" fill="#FFCE00"/>
        </svg>
        Deutsch
      </button>

      {/* 日本語 */}
      <button type="button" onClick={() => onChange('ja')} style={btnStyle(lang === 'ja')} aria-pressed={lang === 'ja'}>
        <svg width="14" height="10" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '1px' }}>
          <rect width="60" height="42" fill="#fff"/>
          <circle cx="30" cy="21" r="12" fill="#BC002D"/>
        </svg>
        日本語
      </button>
    </div>
  )
}
