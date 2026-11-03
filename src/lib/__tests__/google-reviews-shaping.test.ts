/** Round 2: third-party review data is bounded and shaped before it is cached or rendered. */
import { fetchGoogleData, httpsUrlOrEmpty } from '@/lib/googleReviewsServer'

const reply = (body: unknown) => jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => body } as Response)
afterEach(() => jest.restoreAllMocks())

it('keeps only https URLs and bounds sizes', async () => {
  const many = Array.from({ length: 500 }, (_, i) => ({ reviewId: `r${i}`, reviewer: { profilePhotoUrl: 'https://lh3.googleusercontent.com/a', displayName: 'N'.repeat(500), isAnonymous: false }, starRating: 99, comment: 'c'.repeat(100000), createTime: 'x'.repeat(100), updateTime: null }))
  many[0].reviewer.profilePhotoUrl = 'javascript:alert(1)'
  many[1].reviewer.profilePhotoUrl = 'data:image/svg+xml,<svg onload=1>'
  many[2].reviewer.profilePhotoUrl = 'http://tracker.example/p.gif'
  reply({ averageRating: 5, totalReviewCount: 500, profileUrl: 'javascript:alert(1)', reviews: many })
  const d = (await fetchGoogleData())!
  expect(d.reviews).toHaveLength(100)
  expect(d.profileUrl).toBe('')
  expect(d.reviews.slice(0, 3).map((r) => r.reviewer.profilePhotoUrl)).toEqual(['', '', ''])
  expect(d.reviews[3].reviewer.profilePhotoUrl).toBe('https://lh3.googleusercontent.com/a')
  expect(d.reviews[3].comment.length).toBe(4000)
  expect(d.reviews[3].reviewer.displayName.length).toBe(120)
  expect(d.reviews[3].starRating).toBe(5)
})
it('script-looking review text is passed as plain text (React escapes it), not interpreted', async () => {
  reply({ averageRating: 5, totalReviewCount: 1, profileUrl: 'https://g.page/x', reviews: [{ reviewId: 'a', reviewer: { displayName: '</script><script>alert(1)</script>' }, starRating: 5, comment: '"><img src=x onerror=alert(1)>' }] })
  const d = (await fetchGoogleData())!
  expect(d.reviews[0].comment).toBe('"><img src=x onerror=alert(1)>')
  expect(JSON.stringify(d)).toContain('alert(1)') // data, rendered only through JSX text nodes
})
it('garbage shapes do not throw', async () => {
  reply({ reviews: [null, 1, 'x', {}] })
  expect((await fetchGoogleData())!.reviews).toHaveLength(4)
  reply(null); expect(await fetchGoogleData()).toBeNull()
  expect(httpsUrlOrEmpty(42)).toBe('')
})
