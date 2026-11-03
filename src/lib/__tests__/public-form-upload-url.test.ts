/**
 * An anonymous tax-form submission may only reference objects that the public
 * upload endpoint creates for the host's own brand. The wider
 * isValidSupabaseStorageUrl accepts any object in the private uploads bucket
 * (other customers' passports and bank statements included).
 */
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://abc.supabase.co'
import { isPublicFormUploadUrl, STORAGE_BUCKETS } from '@/lib/supabase'

const base = `https://abc.supabase.co/storage/v1/object/public/${STORAGE_BUCKETS.uploads}`

describe('isPublicFormUploadUrl', () => {
  it('accepts what the public upload endpoint returns, per brand', () => {
    expect(isPublicFormUploadUrl(`${base}/tax-form/bank/1730000000000_ab12cd34_statement.pdf`, 'wht')).toBe(true)
    expect(isPublicFormUploadUrl(`${base}/svt/tax-form/invoices/1730000000000_ab12cd34_x.jpg`, 'svt')).toBe(true)
  })
  it('keeps legitimate file names that contain two dots', () => {
    expect(isPublicFormUploadUrl(`${base}/tax-form/invoices/1_ab12cd34_IMG..1.jpg`, 'wht')).toBe(true)
  })
  it('refuses another customer\'s document in the same bucket', () => {
    for (const p of ['tfn-form/CLT-1/1_a_passport.jpg', 'abn-form/CLT-1/x.jpg', 'super-form/CLT-1/x.jpg', 'will-media/x.jpg']) {
      expect(isPublicFormUploadUrl(`${base}/${p}`, 'wht')).toBe(false)
    }
  })
  it('keeps the brands apart', () => {
    expect(isPublicFormUploadUrl(`${base}/svt/tax-form/invoices/x.jpg`, 'wht')).toBe(false)
    expect(isPublicFormUploadUrl(`${base}/tax-form/invoices/x.jpg`, 'svt')).toBe(false)
  })
  it('refuses traversal out of the folder, encoded or not', () => {
    for (const p of ['tax-form/../tfn-form/CLT-1/x.jpg', 'tax-form/%2e%2e/tfn-form/CLT-1/x.jpg', 'tax-form/%2E%2E/tfn-form/x.jpg', 'tax-form/./x.jpg', 'tax-form%2f..%2ftfn-form/x.jpg']) {
      expect(isPublicFormUploadUrl(`${base}/${p}`, 'wht')).toBe(false)
    }
  })
  it('refuses signed, other-host, http, query and fragment forms', () => {
    expect(isPublicFormUploadUrl(`https://abc.supabase.co/storage/v1/object/sign/${STORAGE_BUCKETS.uploads}/tax-form/x.jpg?token=t`, 'wht')).toBe(false)
    expect(isPublicFormUploadUrl(`https://evil.example/storage/v1/object/public/${STORAGE_BUCKETS.uploads}/tax-form/x.jpg`, 'wht')).toBe(false)
    expect(isPublicFormUploadUrl(`http://abc.supabase.co/storage/v1/object/public/${STORAGE_BUCKETS.uploads}/tax-form/x.jpg`, 'wht')).toBe(false)
    expect(isPublicFormUploadUrl(`${base}/tax-form/x.jpg?download=1`, 'wht')).toBe(false)
    expect(isPublicFormUploadUrl(`${base}/tax-form/x.jpg#a`, 'wht')).toBe(false)
    expect(isPublicFormUploadUrl('not a url', 'wht')).toBe(false)
  })
})
