import { SVT_LIVE_LOCALES } from '@/lib/svt/pages'
import { UI, localePath, type SvtLocale } from '@/lib/svt/i18n'
import styles from './LanguageSwitch.module.css'

/** Links to the SAME page in each language. `path` is the language-free path
 *  of the current page ('/' or '/medicare'). */
/** `compact`: a quiet row of text links (article pages, decision 005). */
export function LanguageSwitch({ current, path = '/', compact = false, only }: { current: SvtLocale; path?: string; compact?: boolean; only?: readonly SvtLocale[] }) {
  const live = only ? SVT_LIVE_LOCALES.filter(l => only.includes(l.code)) : SVT_LIVE_LOCALES
  if (live.length < 2) return null
  return (
    <nav aria-label={UI[current].languageAria}>
      <ul className={compact ? styles.compact : styles.switch}>
        {live.map(l => (
          <li key={l.code}>
            <a href={localePath(l.code, path)} lang={l.lang} hrefLang={l.lang} aria-current={l.code === current ? 'page' : undefined}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
