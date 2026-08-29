/**
 * Tax-form submission.
 *
 * Extracted out of FormClient because the actual submit now happens on the
 * tax-residency page: the client fills the form, is sent to the residency
 * explainer, declares their status at the bottom of it, and submits from
 * there. Both the payload and this function travel across that navigation
 * (see tax-form-handoff.ts), so the logic has to live outside the component.
 */

import { compressImage, MAX_UPLOAD_BYTES } from '@/lib/compress-image'
import { formStrings, type FormLang } from '@/lib/formStrings'

export type TaxFormPayload = {
  waNumber: string
  auPhone: string
  fullName: string
  lastName: string
  address: string
  email: string
  country: string
  dob: string
  marital: 'Single' | 'Married' | ''
  hasMedicare: 'yes' | 'no' | ''
  tfn: string
  primaryJob: string
  hasExpenses: 'yes' | 'no' | ''
  taxYears: string[]
  howHeard: string
  refCode: string
  declared: 'yes' | 'no' | ''
  bankStatement: File | null
  selfiePassport: File | null
  /**
   * Work-related expense invoices, when the customer said they have expenses.
   *
   * Capped at MAX_INVOICES by the picker. Unlike the two identity documents
   * these are OPTIONAL and NON-BLOCKING: see uploadInvoices below.
   */
  invoices: File[]
}

/** Jo, 28 Aug. Ten is plenty for a working holiday and keeps the upload inside
 *  the rate limit with its retries: 2 identity documents + 10 invoices is 12
 *  files, 36 requests worst case, against a ceiling of 100. */
export const MAX_INVOICES = 10

export type SubmitResult = { ok: true } | { ok: false; error: string }

/**
 * Uploads one file and returns its stored URL, or null after 3 failed attempts.
 * `onError` reports a human-readable reason for the final failure.
 */
type UploadKind = 'bank' | 'selfie' | 'invoice'

async function uploadOne(
  file: File,
  t: (k: keyof typeof formStrings) => string,
  onError: (msg: string) => void,
  kind: UploadKind = 'invoice',
): Promise<string | null> {
  let f = await compressImage(file)
  if (f.size > MAX_UPLOAD_BYTES) {
    onError(t('fileTooLarge'))
    return null
  }

  const attempt = async () => {
    // Normalize content-type for upload. Some browsers/file-pickers (esp. on
    // Android, e.g. picking a PDF from Google Drive/Downloads) report an empty
    // or generic 'application/octet-stream' MIME type. Defaulting that straight
    // to 'image/jpeg' would make a real PDF bank statement be declared as a
    // JPEG - the server's magic-byte check then correctly rejects it. Fall back
    // to the file extension instead so PDFs are labelled correctly.
    let contentType = f.type
    if (!contentType || contentType === 'application/octet-stream') {
      const name = f.name.toLowerCase()
      if (name.endsWith('.pdf'))            contentType = 'application/pdf'
      else if (name.endsWith('.png'))       contentType = 'image/png'
      else if (name.endsWith('.webp'))      contentType = 'image/webp'
      else if (name.endsWith('.gif'))       contentType = 'image/gif'
      else if (name.endsWith('.heic'))      contentType = 'image/heic'
      else if (name.endsWith('.heif'))      contentType = 'image/heif'
      else                                   contentType = 'image/jpeg' // .jpg/.jpeg + unknown
    }
    // iOS sends HEIC photos with a .heic/.heif type even after our client-side
    // JPEG re-encode normally converts them; if compression didn't run (e.g.
    // decode unsupported), send the true bytes but declare them as jpeg since
    // the server accepts HEIC signatures under an image/jpeg label.
    if (contentType === 'image/heic' || contentType === 'image/heif') contentType = 'image/jpeg'

    const r = await fetch(
      `/api/tax-form/upload?kind=${kind}&filename=${encodeURIComponent(f.name)}`,
      { method: 'POST', body: f, headers: { 'Content-Type': contentType } },
    )
    const data = await r.json().catch(() => ({}))
    if (!r.ok) throw new Error(data?.error || String(r.status))
    return data
  }

  for (let i = 0; i < 3; i++) {
    try {
      const res = await attempt()
      return res?.url ?? null
    } catch (e) {
      console.error('[uploadOne]', f.name, 'attempt', i + 1, 'error:', e)
      if (i === 2) {
        onError(`Upload failed for "${f.name}": ${e instanceof Error ? e.message : 'Unknown error'}`)
        return null
      }
      await new Promise(r => setTimeout(r, 800 * (i + 1)))
    }
  }
  return null
}

/** Server field names, as a person would recognise them on the form. Only the
 *  fields validateIntake can actually reject appear here. */
const FIELD_LABELS: Record<string, Record<FormLang, string>> = {
  email:     { en: 'email address',   de: 'E-Mail-Adresse',   ja: 'メールアドレス' },
  tfn:       { en: 'TFN',             de: 'TFN',              ja: 'TFN' },
  dob:       { en: 'date of birth',   de: 'Geburtsdatum',     ja: '生年月日' },
  taxYear:   { en: 'tax year',        de: 'Steuerjahr',       ja: '課税年度' },
  marital:   { en: 'marital status',  de: 'Familienstand',    ja: '婚姻状況' },
  taxStatus: { en: 'tax status',      de: 'Steuerstatus',     ja: '税務上の居住区分' },
  whatsapp:  { en: 'WhatsApp number', de: 'WhatsApp-Nummer',  ja: 'WhatsApp番号' },
  fullName:  { en: 'name',            de: 'Name',             ja: 'お名前' },
}

export async function submitTaxForm(
  p: TaxFormPayload,
  taxStatus: 'resident' | 'whm',
  lang: FormLang,
  /** Defaults to the original endpoint so /tax-form is unaffected. */
  endpoint: string = '/api/tax-form',
  /**
   * Called after each file finishes, so the button can say "3 of 12" instead
   * of a static label.
   *
   * WHY IT MATTERS. Uploads run one at a time with a 300ms gap and up to three
   * tries with backoff, so two identity documents plus ten receipts on hostel
   * wifi can sit behind an unchanging "Submitting..." for a minute. That reads
   * as a freeze at the exact moment of commitment, and the natural response is
   * to background the tab, which destroys the in-memory hand-off and loses the
   * whole form.
   */
  onProgress?: (done: number, total: number) => void,
): Promise<SubmitResult> {
  const t = (k: keyof typeof formStrings) => {
    const entry = formStrings[k] as Record<FormLang, string>
    return entry?.[lang] ?? entry?.en ?? ''
  }

  let uploadError = ''
  const noteError = (msg: string) => { if (!uploadError) uploadError = msg }

  // Upload bankStatement + selfiePassport sequentially to avoid rate-limiting
  const coreUploads: { label: string; kind: UploadKind; file: File }[] = []
  if (p.bankStatement)  coreUploads.push({ label: 'bankStatement',  kind: 'bank',   file: p.bankStatement })
  if (p.selfiePassport) coreUploads.push({ label: 'selfiePassport', kind: 'selfie', file: p.selfiePassport })

  const invoiceList = (p.invoices ?? []).slice(0, MAX_INVOICES)
  const totalFiles = coreUploads.length + invoiceList.length
  let doneFiles = 0
  const tick = () => { doneFiles += 1; onProgress?.(doneFiles, totalFiles) }

  const coreResults: (string | null)[] = []
  for (const { file: f, kind } of coreUploads) {
    coreResults.push(await uploadOne(f, t, noteError, kind))
    tick()
    await new Promise(r => setTimeout(r, 300))
  }

  if (coreResults.some(r => !r)) {
    return {
      ok: false,
      error: uploadError
        || 'Failed to upload required files. Please check your documents are images or PDFs under 10MB and try again.',
    }
  }

  const coreUrls: Record<string, string> = {}
  coreUploads.forEach(({ label }, i) => { if (coreResults[i]) coreUrls[label] = coreResults[i]! })

  // ── The expense invoices ─────────────────────────────────────────────────
  //
  // Same route, same retry, same 300ms spacing as the two documents above. The
  // spacing is not decoration: uploading these in parallel is what broke the
  // previous attempt at this feature, and the file-name collision fix in the
  // upload route is the scar it left behind.
  //
  // WHERE THEY DIFFER FROM THE IDENTITY DOCUMENTS, AND WHY IT MATTERS. A failed
  // bank statement aborts the submission, because without it there is no job to
  // do. A failed receipt must NOT: Jo, 28 Aug. Losing a whole form, with the
  // TFN and the address and the identity documents already uploaded, because
  // one blurry photo of a petrol receipt timed out on hostel wifi, is a lead
  // thrown away over something worth twenty dollars of deduction. So each
  // invoice is tried, and whatever failed is reported on the task instead, by
  // name, so the file can simply be asked for on WhatsApp.
  const invoiceUrls: string[] = []
  const invoiceFailures: string[] = []
  for (const f of invoiceList) {
    // Deliberately swallows the error text: noteError() feeds the message shown
    // when the submission ABORTS, and these never abort it.
    const url = await uploadOne(f, t, () => {}, 'invoice')
    if (url) invoiceUrls.push(url)
    else invoiceFailures.push(f.name)
    tick()
    await new Promise(r => setTimeout(r, 300))
  }

  // Build FormData (no file blobs - URLs only)
  const fd = new FormData()
  fd.append('waNumber',    p.waNumber)
  fd.append('auPhone',     p.auPhone)
  fd.append('fullName',    `${p.fullName} ${p.lastName}`.trim())
  fd.append('address',     p.address)
  fd.append('email',       p.email)
  fd.append('country',     p.country)
  fd.append('dob',         p.dob)
  fd.append('marital',     p.marital)
  fd.append('hasMedicare', p.hasMedicare === 'yes' ? 'Yes' : p.hasMedicare === 'no' ? 'No' : '')
  fd.append('tfn',         p.tfn)
  fd.append('primaryJob',  p.primaryJob)
  fd.append('hasExpenses', p.hasExpenses === 'yes' ? 'Yes' : p.hasExpenses === 'no' ? 'No' : '')
  fd.append('taxStatus',   taxStatus === 'resident' ? 'Australian resident for tax purposes' : taxStatus)
  fd.append('taxYear',     p.taxYears.join(', '))
  fd.append('howHeard',    p.howHeard)
  if (p.refCode) fd.append('refCode', p.refCode)
  // Must stay word-for-word identical to the on-screen wording - this string is
  // the record of what the client actually agreed to.
  fd.append('declared',    p.declared === 'yes'
    ? '✓ I\u2019ve read & agree to the Client Agreement & Privacy Policy.'
    : p.declared === 'no' ? '✗ No' : '')
  if (coreUrls['bankStatement'])  fd.append('bankStatementUrl',  coreUrls['bankStatement'])
  if (coreUrls['selfiePassport']) fd.append('selfiePassportUrl', coreUrls['selfiePassport'])

  // Everything that actually reached storage, in the order the CRM lists it:
  // the two identity documents first, then the receipts.
  const allFileUrls = [...Object.values(coreUrls), ...invoiceUrls]
  if (allFileUrls.length > 0) fd.append('invoiceUrls', JSON.stringify(allFileUrls))
  // Named so the task can say which receipt to ask for, rather than a count
  // that leaves the owner guessing which one is missing.
  if (invoiceFailures.length) fd.append('invoiceFailures', JSON.stringify(invoiceFailures))

  try {
    const res = await fetch(endpoint, { method: 'POST', body: fd })
    if (res.ok) return { ok: true }

    const data = await res.json().catch(() => ({}))
    if (res.status === 429) return { ok: false, error: t('tooMany') }
    if (data?.error === 'invalid_file') {
      return { ok: false, error: `${t('fileErrorPrefix')}${data.message || t('fileErrorGeneric')}` }
    }

    // ── Say WHICH field, when the server said which field ──────────────────
    //
    // The server has always answered a rejected submission with the exact list
    // of fields it did not accept, and this function has always thrown that
    // away and printed the same sentence as for a database outage. So somebody
    // whose date of birth was typed as 2205 instead of 2025 was told only that
    // something went wrong, could not tell what, and their most likely next
    // move was to fill the whole form in again and be refused again.
    if (data?.error === 'invalid_fields' && Array.isArray(data.fields) && data.fields.length) {
      const named = data.fields
        .map((f: { field?: string }) => FIELD_LABELS[String(f?.field ?? '')]?.[lang] ?? f?.field)
        .filter(Boolean)
        .join(', ')
      if (named) return { ok: false, error: `${t('checkFields')}${named}` }
    }
    if (data?.error === 'missing_required_fields') {
      return { ok: false, error: `${t('checkFields')}${FIELD_LABELS.fullName[lang]}, ${FIELD_LABELS.email[lang]}, ${FIELD_LABELS.whatsapp[lang]}` }
    }

    // Genuinely our end. The reference is the only thing that makes a
    // screenshot of this screen actionable, so it is shown rather than hidden.
    const ref = typeof data?.ref === 'string' ? data.ref : ''
    return { ok: false, error: t('somethingWrong') + (ref ? ` (${t('refPrefix')}${ref})` : '') }
  } catch {
    return { ok: false, error: t('somethingWrong') }
  }
}
