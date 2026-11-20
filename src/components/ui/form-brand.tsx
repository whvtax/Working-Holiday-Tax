'use client'
/**
 * One tax form for both brands (Jo, 27 Oct: "the same system, only the
 * colours differ"). The form, the residency step and the declaration read
 * everything brand-specific from here: the WhatsApp number,
 * the page paths, the seal image, the review badge and the extra words for
 * Chinese and Vietnamese. Each brand's pages wrap the form in a provider, so
 * no brand's number, name or links are ever bundled into the other's pages.
 * Colours come from CSS variables (--f-brand, --f-ink, --f-bg, --f-tint,
 * --f-line, --f-muted, --f-brand-rgb) with WHT's palette as the fallback.
 */
import { createContext, useContext } from 'react'
import type { AnyFormLang, FormStringKey } from '@/lib/formStrings'
import { formString } from '@/lib/form-i18n'

export type FormPage = 'tax-form' | 'tax-residency' | 'expenses' | 'client-agreement' | 'privacy'

/** Kept as a name for the keys that used to be written inline in the form;
 *  they are ordinary form string keys now (decision 017). */
export type FormExtraKey = Extract<FormStringKey, 'waHint' | 'expensesQuestion' | 'declaration' | 'mustAgree' | 'phGiven' | 'phLast' | 'phAddress' | 'phJob'>

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
  url: (lang: AnyFormLang, page: FormPage) => string
  sealSrc: string
  /** Trust badge shown next to the seal (WHT: Google reviews). */
  reviews?: (lang: AnyFormLang) => React.ReactNode
  /** Social links on the success screen. */
  socials?: React.ReactNode
  /** The brand's own words, where they differ from the shared ones (the
   *  student brand's Chinese and Vietnamese). They win over the shared tables. */
  text?: Partial<Record<AnyFormLang, Partial<Record<FormStringKey, string>>>>
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

/** A form string in any of the nine languages: the brand's own words first,
 *  then the shared lookup (`formString`: the language's block, formStrings,
 *  English). A missing key is English, never an empty string. */
export function formText(brand: Pick<FormBrand, 'text'>, key: FormStringKey, lang: AnyFormLang): string {
  return brand.text?.[lang]?.[key] || formString(key, lang)
}
