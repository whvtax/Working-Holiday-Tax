/**
 * The review carousel must put real reviews into the server-rendered HTML when
 * it is given data (AI crawlers do not run JS), and must render nothing at all
 * when it is not, so a failed fetch can never show an empty or invented block.
 */
import { renderToString } from 'react-dom/server'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import type { GoogleData } from '@/lib/googleSummary'

const data: GoogleData = {
  rating: 5,
  count: 1,
  profileUrl: '',
  reviews: [{
    reviewId: 'r1',
    reviewer: { profilePhotoUrl: '', displayName: 'Test Reviewer', isAnonymous: false },
    starRating: 5,
    comment: 'A real review comment used only in this test.',
    createTime: '2026-09-01T00:00:00Z',
    updateTime: null,
  }],
}

describe('GoogleReviews server rendering', () => {
  it('renders review text into static HTML when initial data is provided', () => {
    const html = renderToString(<GoogleReviews lang="en" initial={data} />)
    expect(html).toContain('A real review comment used only in this test.')
    expect(html).toContain('Test Reviewer')
  })
  it('renders nothing without data', () => {
    expect(renderToString(<GoogleReviews lang="en" />)).toBe('')
  })
})
