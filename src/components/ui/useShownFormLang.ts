'use client'
import { useEffect, useState } from 'react'
import type { AnyFormLang } from '@/lib/formStrings'
import { getPickedFormLang, resolveStartLang } from '@/lib/form-lang'
import { getTaxFormHandoff } from '@/lib/tax-form-handoff'
import { useDocumentLang } from '@/components/ui/useDocumentLang'

/**
 * The language the residency step shows (decision 017).
 *
 * `routeLang` is the locale of the path the page lives on. The step shows, in
 * order: the language the form was left in (the hand-off), the language picked
 * by hand in this tab, then the starting-language order (path locale, `?lang=`,
 * browser language, English). Read after mount, because none of it exists on
 * the server; the first paint is the path's language.
 */
export function useShownFormLang(routeLang: AnyFormLang): AnyFormLang {
  const [shown, setShown] = useState<AnyFormLang>(routeLang)
  useEffect(() => {
    let queryLang: string | null = null
    try { queryLang = new URLSearchParams(window.location.search).get('lang') } catch {}
    setShown(
      getTaxFormHandoff()?.lang
      ?? getPickedFormLang()
      ?? resolveStartLang({
        pathLang: routeLang === 'en' ? null : routeLang,
        queryLang,
        browserLang: typeof navigator !== 'undefined' ? navigator.language : null,
      }),
    )
  }, [routeLang])
  useDocumentLang(shown, routeLang)
  return shown
}
