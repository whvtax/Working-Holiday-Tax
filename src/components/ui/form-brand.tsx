'use client'
/**
 * One tax form for both brands (Jo, 27 Oct: "the same system, only the
 * colours differ"). The form, the residency step and the declaration read
 * everything brand-specific from here: the WhatsApp number, the languages,
 * the page paths, the seal image, the review badge and the extra words for
 * Chinese and Vietnamese. Each brand's pages wrap the form in a provider, so
 * no brand's number, name or links are ever bundled into the other's pages.
 * Colours come from CSS variables (--f-brand, --f-ink, --f-bg, --f-tint,
 * --f-line, --f-muted, --f-brand-rgb) with WHT's palette as the fallback.
 */
import { createContext, useContext } from 'react'
import type { AnyFormLang, FormStringKey } from '@/lib/formStrings'

export type FormPage = 'tax-form' | 'tax-residency' | 'expenses' | 'client-agreement' | 'privacy'

/** Words that are written inline in the form for en/de/ja. */
export type FormExtraKey =
  | 'waHint' | 'expensesBefore' | 'expensesLink' | 'expensesAfter'
  | 'declBefore' | 'declCA' | 'declAnd' | 'declPP' | 'declAfter' | 'mustAgree'
  | 'phGiven' | 'phLast' | 'phAddress' | 'phJob'

/** The residency step and declaration words a brand may replace. */
export interface ResidencyCopy {
  titleLead: string; titleAccent: string; titleTail: string; intro: string; introEmph: string
  quizIntro: string; questions: readonly string[]; sessionLost: string; sessionLostCta: string
  declIntro: string; residentLabel: string; otherLabel: string; pickOne: string; secure: string
  confirmLead: string; confirmYes: string; confirmNo: string
}

export interface FormBrand {
  id: 'wht' | 'svt'
  /** wa.me digits. */
  waNumber: string
  langs: ReadonlyArray<{ code: AnyFormLang; label: string; full: string }>
  url: (lang: AnyFormLang, page: FormPage) => string
  sealSrc: string
  /** Trust badge shown next to the seal (WHT: Google reviews). */
  reviews?: (lang: AnyFormLang) => React.ReactNode
  /** Social links on the success screen. */
  socials?: React.ReactNode
  /** Words for languages formStrings does not carry (zh, vi). */
  text?: Partial<Record<AnyFormLang, Partial<Record<FormStringKey | FormExtraKey, string>>>>
  /** A brand whose second residency status is not the WHT one. */
  residency?: { status: 'foreign'; copy: Partial<Record<AnyFormLang, ResidencyCopy>> }
}

const FormBrandContext = createContext<FormBrand | null>(null)

export function FormBrandProvider({ brand, children }: { brand: FormBrand; children: React.ReactNode }) {
  return <FormBrandContext.Provider value={brand}>{children}</FormBrandContext.Provider>
}

export function useFormBrand(): FormBrand {
  const b = useContext(FormBrandContext)
  if (!b) throw new Error('Tax form rendered without a FormBrandProvider')
  return b
}

/** A form string in any language: the brand's own words first (zh, vi),
 *  then formStrings, then English. */
export function formText(brand: FormBrand, strings: Record<string, Record<string, string>>, key: FormStringKey | FormExtraKey, lang: AnyFormLang): string {
  const own = brand.text?.[lang]?.[key]
  if (own) return own
  const entry = strings[key] as Record<string, string> | undefined
  return entry?.[lang] ?? entry?.en ?? ''
}
