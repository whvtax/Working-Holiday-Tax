'use client'
import { useEffect } from 'react'
import type { AnyFormLang } from '@/lib/formStrings'
import { FORM_LANG_HTML } from '@/lib/form-lang'

/**
 * Keeps `<html lang>` honest when the form is shown in a language other than
 * the one its path was built for (the picker changes the words, not the
 * address; decision 017). Screen readers pick their voice from this attribute.
 * The page's own value is put back when the form unmounts or returns to it.
 */
export function useDocumentLang(lang: AnyFormLang, routeLang: AnyFormLang): void {
  useEffect(() => {
    if (lang === routeLang || typeof document === 'undefined') return
    const el = document.documentElement
    const before = el.getAttribute('lang')
    el.setAttribute('lang', FORM_LANG_HTML[lang])
    return () => {
      if (before === null) el.removeAttribute('lang')
      else el.setAttribute('lang', before)
    }
  }, [lang, routeLang])
}
