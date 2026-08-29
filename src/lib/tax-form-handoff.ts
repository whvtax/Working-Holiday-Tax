/**
 * Hand-off between the tax form and the tax-residency page.
 *
 * The residency declaration - and the Submit button - now live at the bottom of
 * /tax-residency, so a fully filled form has to survive the trip from
 * /tax-form to /tax-residency and back.
 *
 * This is deliberately a plain in-memory module singleton rather than
 * sessionStorage:
 *
 *  1. File objects (bank statement, selfie) can't be serialised, and losing
 *     the uploads on the round-trip was the whole problem to solve.
 *  2. The TFN must never touch browser storage - TFN + identity details
 *     together are an identity-theft kit. In memory it lives exactly as long
 *     as the tab's JS heap does.
 *
 * The trade-off is that this only survives *client-side* navigation, so both
 * legs of the trip must use next/navigation's router (or <Link>), never
 * window.location. A hard refresh drops it, which the residency page handles
 * by simply not rendering the declaration block (it's a public SEO page and
 * must look normal to visitors arriving from search).
 */

import type { FormLang } from '@/lib/formStrings'
import type { TaxFormPayload } from '@/lib/submit-tax-form'

export type TaxFormHandoff = {
  lang: FormLang
  /** Where to send the client back to (locale-aware). */
  formUrl: string
  /**
   * Endpoint the residency step submits to. Omitted by the original /tax-form
   * flow, which posts to /api/tax-form; the two-stage flow sets it to
   * /api/complete/<token> so the answers merge into the existing task.
   */
  submitUrl?: string
  payload: TaxFormPayload
  /** Previews so the form can redraw its upload thumbnails on the way back. */
  previews: {
    bankStatement: string | null
    selfiePassport: string | null
    /** One per invoice, in the same order, null for a PDF. Carried across the
     *  trip to the residency page so the thumbnails redraw on the way back. */
    invoices?: (string | null)[]
  }
  createdAt: number
}

const MAX_AGE_MS = 2 * 60 * 60 * 1000 // 2h, same window as the old snapshot

let handoff: TaxFormHandoff | null = null
let submittedFirstName: string | null = null

export function setTaxFormHandoff(h: Omit<TaxFormHandoff, 'createdAt'>): void {
  handoff = { ...h, createdAt: Date.now() }
}

export function getTaxFormHandoff(): TaxFormHandoff | null {
  if (!handoff) return null
  if (Date.now() - handoff.createdAt > MAX_AGE_MS) {
    handoff = null
    return null
  }
  return handoff
}

export function clearTaxFormHandoff(): void {
  handoff = null
}

/**
 * Called on the residency page after a successful submit; the form picks this
 * up when the client is routed back and shows the success screen.
 */
export function markTaxFormSubmitted(firstName: string): void {
  submittedFirstName = firstName
  handoff = null
}

/** Reads and clears the submitted flag - safe to call on every form mount. */
export function takeTaxFormSubmitted(): string | null {
  const name = submittedFirstName
  submittedFirstName = null
  return name
}
