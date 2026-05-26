'use client'
import type { FormLang } from '@/lib/formStrings'

/**
 * Language toggle pill shown at the top of each form.
 * Default: EN. Clicking switches labels/instructions to DE or JA.
 * Data submitted to CRM always stays in the language the user typed.
 *
 * Behavior:
 * - If current is 'ja' or set was 'ja' → shows EN + 日本語 toggle
 * - Otherwise → shows EN + Deutsch toggle
 */
export function FormLanguageToggle({ lang, onChange }: { lang: FormLang; onChange: (l: FormLang) => void }) {
  // Determine the "other" language based on current
  const otherLang: 'de' | 'ja' = lang === 'ja' ? 'ja' : 'de'
  const otherLabel = otherLang === 'ja' ? '日本語' : 'Deutsch'

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
    }}>
      <button
        type="button"
        onClick={() => onChange('en')}
        style={{
          padding: '6px 16px',
          fontSize: '12px',
          fontWeight: lang === 'en' ? 700 : 500,
          background: lang === 'en' ? '#fff' : 'transparent',
          color: lang === 'en' ? '#0B5240' : '#587066',
          border: 'none',
          borderRadius: '100px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: lang === 'en' ? '0 1px 3px rgba(11,82,64,0.12)' : 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all .15s',
        }}>
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
      <button
        type="button"
        onClick={() => onChange(otherLang)}
        style={{
          padding: '6px 16px',
          fontSize: '12px',
          fontWeight: lang === otherLang ? 700 : 500,
          background: lang === otherLang ? '#fff' : 'transparent',
          color: lang === otherLang ? '#0B5240' : '#587066',
          border: 'none',
          borderRadius: '100px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: lang === otherLang ? '0 1px 3px rgba(11,82,64,0.12)' : 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all .15s',
        }}>
        {otherLang === 'ja' ? (
          <svg width="14" height="10" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '1px' }}>
            <rect width="60" height="42" fill="#fff"/>
            <circle cx="30" cy="21" r="12" fill="#BC002D"/>
          </svg>
        ) : (
          <svg width="14" height="10" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '1px' }}>
            <rect width="60" height="14" y="0"  fill="#000"/>
            <rect width="60" height="14" y="14" fill="#DD0000"/>
            <rect width="60" height="14" y="28" fill="#FFCE00"/>
          </svg>
        )}
        {otherLabel}
      </button>
    </div>
  )
}
