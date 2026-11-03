/** Round 2: the multipart path used by the TFN / ABN / super forms (uploadFile), same attacks. */
const stored: { path: string; type: string }[] = []
jest.mock('@/lib/supabase', () => ({
  STORAGE_BUCKETS: { uploads: 'uploads' },
  assertUploadsBucketPrivate: jest.fn().mockResolvedValue(undefined),
  getSupabase: () => ({ storage: { from: () => ({
    upload: (path: string, _b: ArrayBuffer, o: { contentType: string }) => { stored.push({ path, type: o.contentType }); return Promise.resolve({ error: null }) },
    getPublicUrl: (path: string) => ({ data: { publicUrl: `https://x.supabase.co/storage/v1/object/public/uploads/${path}` } }),
  }) } }),
}))
import { uploadFile, UploadValidationError } from '@/lib/upload'

const b = (...a: (number | string)[]) => new Uint8Array(a.flatMap((x) => typeof x === 'string' ? [...Buffer.from(x, 'latin1')] : [x]))
const file = (data: Uint8Array | string, type: string, name = 'a.jpg') => new File([data as BlobPart], name, { type })
const JPEG = b(0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0)
beforeEach(() => { stored.length = 0 })

it.each([
  ['svg', '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"/>', 'image/svg+xml'],
  ['svg as png', '<svg xmlns="http://www.w3.org/2000/svg"/>', 'image/png'],
  ['html as jpeg', '<!doctype html><script>1</script>', 'image/jpeg'],
  ['mp4 as heic', b(0, 0, 0, 0x18, 'ftyp', 'isom', 0, 0, 0, 0), 'image/heic'],
  ['mp4 as heif', b(0, 0, 0, 0x18, 'ftyp', 'mp42', 0, 0, 0, 0), 'image/heif'],
  ['png as pdf', b(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a), 'application/pdf'],
])('%s is refused with a customer-safe validation error', async (_n, data, type) => {
  await expect(uploadFile(file(data, type), 'tfn-form/CLT-x')).rejects.toBeInstanceOf(UploadValidationError)
  expect(stored).toHaveLength(0)
})

it('a genuine HEIC (heic and mif1 brands) is accepted', async () => {
  await uploadFile(file(b(0, 0, 0, 0x18, 'ftyp', 'heic', 0, 0, 0, 0), 'image/heic', 'a.heic'), 'tfn-form/CLT-x')
  await uploadFile(file(b(0, 0, 0, 0x18, 'ftyp', 'mif1', 0, 0, 0, 0), 'image/heif', 'a.heif'), 'tfn-form/CLT-x')
  expect(stored).toHaveLength(2)
})

it.each(['../../../x.jpg', '..\\..\\x.jpg', 'a/b.jpg', 'x.jpg\u0000.php', '....jpg', '%2e%2e%2fx.jpg'])('file name %j stays inside the folder', async (name) => {
  await uploadFile(file(JPEG, 'image/jpeg', name), 'tfn-form/CLT-x')
  const p = stored[0].path
  expect(p).toMatch(/^tfn-form\/CLT-x\/\d+_[0-9a-f]{8}_[A-Za-z0-9._%-]{0,80}$/)
  expect(p).not.toMatch(/\.\.|\\|\u0000/)
})
