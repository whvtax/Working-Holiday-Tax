'use client'
import type { FormLang } from '@/lib/formStrings'

/**
 * Language toggle pill shown at the top of each form.
 * Default: EN. Clicking switches labels/instructions to DE.
 * Data submitted to CRM always stays in the language the user typed.
 */
export function FormLanguageToggle({ lang, onChange }: { lang: FormLang; onChange: (l: FormLang) => void }) {
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
        onClick={() => onChange('de')}
        style={{
          padding: '6px 16px',
          fontSize: '12px',
          fontWeight: lang === 'de' ? 700 : 500,
          background: lang === 'de' ? '#fff' : 'transparent',
          color: lang === 'de' ? '#0B5240' : '#587066',
          border: 'none',
          borderRadius: '100px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: lang === 'de' ? '0 1px 3px rgba(11,82,64,0.12)' : 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all .15s',
        }}>
        <svg width="14" height="10" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '1px' }}>
          <rect width="60" height="14" y="0"  fill="#000"/>
          <rect width="60" height="14" y="14" fill="#DD0000"/>
          <rect width="60" height="14" y="28" fill="#FFCE00"/>
        </svg>
        Deutsch
      </button>
    </div>
  )
}
