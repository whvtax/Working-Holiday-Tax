/**
 * The tax return form's words in nine languages (decision 017).
 *
 * English, German and Japanese live in `formStrings.ts`, as before. Spanish,
 * French, Italian, Portuguese, Chinese and Vietnamese live here, one file per
 * language, each typed as a full `LocaleBlock` so a missing key does not
 * compile. `formString` is the one lookup every part of the flow uses:
 *
 *   the language's own block  ->  formStrings[key][lang]  ->  English
 *
 * A missing key is English, never an empty string.
 */
import { formStrings, type AnyFormLang, type ExtraFormLang, type FormStringKey } from '@/lib/formStrings'
import { es } from './es'
import { fr } from './fr'
import { it } from './it'
import { pt } from './pt'
import { zh } from './zh'
import { vi } from './vi'

/** Every key the tax return flow shows (form, residency submit, upload and
 *  server errors, thank-you screen). A test reads the flow's source files and
 *  fails when one of them uses a key that is not listed here. */
export const TAX_FORM_KEYS = [
  'addMoreFiles', 'addressShort', 'auPhone', 'bankStatementHint', 'bankStatements', 'checkFields',
  'checkResidency', 'checkResidencyNote', 'continueButton', 'declaration', 'dob', 'email',
  'englishOnlyNotice', 'etaLabel', 'expensesQuestion', 'fieldIsRequired', 'fileErrorGeneric',
  'fileErrorPrefix', 'filePreviewAlt', 'fileTooLarge', 'fixBeforeSubmit', 'givenNames', 'hasMedicare',
  'hasOtherIncome', 'homeCountry', 'howHeard', 'invalidAuPhone', 'invalidDob', 'invalidEmail',
  'invalidPhone', 'invalidTfn', 'invoicesHint', 'invoicesLabel', 'invoicesRequired', 'langPicker',
  'lastName', 'linkUsedBody', 'linkUsedTitle', 'marital', 'married', 'msgWhatsApp', 'mustAgree', 'no',
  'otherIncomePh', 'otherIncomeWhat', 'phAddress', 'phCountry', 'phEmail', 'phGiven', 'phHowHeard',
  'phJob', 'phLast', 'phWaNumber', 'primaryJob', 'refPrefix', 'registeredAgentNo', 'required',
  'sectionDeclaration', 'selfieHint', 'selfieWithPassport', 'single', 'somethingWrong', 'stepReceived',
  'stepRefund', 'stepWhatsApp', 'submitTax', 'submitting', 'successNextLead', 'tapToAddFiles',
  'tapToChoose', 'tfn', 'thankYou', 'timeEstimate', 'titleTax', 'titleTaxStep2', 'titleTaxSub',
  'tooMany', 'unknownError', 'uploadBankStatement', 'uploadFailedFile', 'uploadFailedRequired',
  'uploadInvoices', 'uploadSelfie', 'waHint', 'waPrefill', 'whatsapp', 'yes',
] as const satisfies readonly FormStringKey[]

export type TaxFormKey = (typeof TAX_FORM_KEYS)[number]

/** One language's words for the whole flow. */
export type LocaleBlock = Readonly<Record<TaxFormKey, string>>

export const FORM_LOCALE_BLOCKS: Readonly<Record<ExtraFormLang, LocaleBlock>> = { es, fr, it, pt, zh, vi }

/** A form string in any of the nine languages. Never empty for a known key. */
export function formString(key: FormStringKey, lang: AnyFormLang): string {
  const block = (FORM_LOCALE_BLOCKS as Partial<Record<AnyFormLang, Partial<Record<string, string>>>>)[lang]
  const own = block?.[key]
  if (own) return own
  const entry = formStrings[key] as Readonly<Record<string, string>> | undefined
  return entry?.[lang] || entry?.en || ''
}
