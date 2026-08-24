'use client'
import type { FormLang } from '@/lib/formStrings'

/**
 * Language toggle shown at the top of each form.
 *
 * Three quiet text links rather than a pill bar with flags. The flags were the
 * loudest thing on the screen - four extra colours competing with the headline
 * and the trust marks - and the pill was wide enough to wrap onto two lines on
 * a narrow phone. This version is one line at any width.
 *
 * Only the interface language changes; data submitted to the CRM stays in
 * whatever the client typed.
 */

const OPTIONS: { code: FormLang; label: string; full: string }[] = [
  { code: 'en', label: 'EN',   full: 'English' },
  { code: 'de', label: 'DE',   full: 'Deutsch' },
  { code: 'ja', label: '日本語', full: '日本語' },
]

export function FormLanguageToggle({ lang, onChange }: { lang: FormLang; onChange: (l: FormLang) => void }) {
  return (
    <div className="flang">
      <style>{styles}</style>
      {OPTIONS.map(o => (
        <button
          key={o.code}
          type="button"
          onClick={() => onChange(o.code)}
          className={`flang-btn${lang === o.code ? ' is-active' : ''}`}
          aria-pressed={lang === o.code}
          aria-label={o.full}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

const styles = `
  .flang { display: flex; justify-content: center; gap: 10px; margin-bottom: 14px; }
  /* Padding keeps a ~40px tap target even though the text is small. */
  /* #9DB5AC is 2.18:1 on white and was retired from the palette for exactly
     this reason. The inactive languages are the control's only affordance, so
     they read at subtle #587066, 5.35:1, and the active one stays forest. */
  .flang-btn { padding: 9px 10px; font-size: 12px; font-weight: 600; font-family: inherit; letter-spacing: .04em; color: #587066; background: none; border: none; border-bottom: 2px solid transparent; border-radius: 0; cursor: pointer; transition: color .15s, border-color .15s; }
  .flang-btn:hover { color: #0B5240; }
  .flang-btn.is-active { color: #0B5240; border-bottom-color: #0B5240; }
`
