/**
 * Canonical labels — grouping the free-text answers clients type.
 *
 * The point of these is that the CRM filters stop listing eighteen spellings of
 * ChatGPT as eighteen categories. The tests below are the actual values seen in
 * the live database.
 */

import { canonicalCountry, canonicalSource, groupByCanonical } from '@/lib/normalise-labels'

describe('canonicalCountry', () => {
  it('collapses the case variants sitting in the database', () => {
    for (const v of ['Japan', 'JAPAN', 'japan', ' japan ']) {
      expect(canonicalCountry(v)).toBe('Japan')
    }
    for (const v of ['United Kingdom', 'United kingdom', 'united kingdom', 'UK', 'England']) {
      expect(canonicalCountry(v)).toBe('United Kingdom')
    }
  })

  it('maps names clients write in their own language', () => {
    expect(canonicalCountry('Deutschland')).toBe('Germany')
    expect(canonicalCountry('Australien')).toBe('Australia')
    expect(canonicalCountry('Türkiye')).toBe('Turkey')
  })

  it('keeps an unrecognised country rather than discarding it', () => {
    // Losing real data would be worse than an extra row in the filter.
    expect(canonicalCountry('Kazakhstan')).toBe('Kazakhstan')
  })

  it('handles empty input', () => {
    expect(canonicalCountry('')).toBe('')
    expect(canonicalCountry(null)).toBe('')
    expect(canonicalCountry(undefined)).toBe('')
  })
})

describe('canonicalSource', () => {
  it('collapses every ChatGPT spelling found in the data', () => {
    const seen = ['AI', 'Chat GBT', 'Chat GPT', 'Chat gbt', 'ChatGP', 'ChatGPT', 'Chatgpt', 'chat gpt']
    for (const v of seen) expect(canonicalSource(v)).toBe('ChatGPT / AI')
  })

  it('groups Instagram and TikTok variants', () => {
    expect(canonicalSource('Insta')).toBe('Instagram')
    expect(canonicalSource('Instagram')).toBe('Instagram')
    expect(canonicalSource('Instagram (Graciejayneadventures)')).toBe('Instagram')
    expect(canonicalSource('Tik Tok')).toBe('TikTok')
    expect(canonicalSource('Tik tok')).toBe('TikTok')
    expect(canonicalSource('tiktok')).toBe('TikTok')
  })

  it('fixes the common misspelling of friend', () => {
    expect(canonicalSource('Freind')).toBe('Friend')
    expect(canonicalSource('Friend')).toBe('Friend')
  })

  it('groups internet and online as one thing', () => {
    expect(canonicalSource('Internet')).toBe('Online search')
    expect(canonicalSource('Online')).toBe('Online search')
  })

  it('groups the travel-agency referrals, however the agency is written', () => {
    for (const v of ['Travel Agent', 'ultimate travel', 'Ultimate travel',
                     'Ultimate Travel', 'Ultimate travel partnership']) {
      expect(canonicalSource(v)).toBe('Travel agent')
    }
  })

  it('separates WhatsApp groups from one-to-one WhatsApp', () => {
    expect(canonicalSource('Whats app')).toBe('WhatsApp')
    expect(canonicalSource('WhatsApp')).toBe('WhatsApp')
    expect(canonicalSource('Whatsapp Group')).toBe('WhatsApp group')
    expect(canonicalSource('WhatsApp Travel Group (Admin Balou referred)')).toBe('WhatsApp group')
  })

  it('recognises a returning client', () => {
    expect(canonicalSource('previous experience')).toBe('Returning client')
  })

  it('treats a website mention as an online search', () => {
    expect(canonicalSource('Web site')).toBe('Online search')
  })

  it('keeps an answer it does not recognise', () => {
    expect(canonicalSource('Saw the van in Bondi')).toBe('Saw the van in Bondi')
  })
})

describe('groupByCanonical', () => {
  it('counts each bucket and puts the biggest first', () => {
    const rows = ['Japan', 'japan', 'JAPAN', 'Germany', 'Deutschland', 'Kazakhstan']
    expect(groupByCanonical(rows, canonicalCountry)).toEqual([
      { label: 'Japan', count: 3 },
      { label: 'Germany', count: 2 },
      { label: 'Kazakhstan', count: 1 },
    ])
  })

  it('skips blanks instead of creating an empty category', () => {
    expect(groupByCanonical(['', null, undefined, 'Japan'], canonicalCountry))
      .toEqual([{ label: 'Japan', count: 1 }])
  })

  it('turns the live "how heard" mess into a short list', () => {
    const live = ['AI','Chat GBT','Chat GPT','Chat gbt','ChatGP','ChatGPT','Chatgpt',
                  'Freind','Friend','Google','Insta','Instagram','Internet','Online',
                  'Partner','Tik Tok','Tik tok']
    const grouped = groupByCanonical(live, canonicalSource)
    // 17 raw values, and none of the buckets is a duplicate of another.
    expect(grouped.length).toBeLessThan(live.length)
    expect(new Set(grouped.map(g => g.label)).size).toBe(grouped.length)
    expect(grouped.find(g => g.label === 'ChatGPT / AI')?.count).toBe(7)
  })

  it('cuts the second round of live values from 18 categories to 11', () => {
    const live = ['TikTok','Friend','Instagram','ChatGPT / AI','Google','Online search','Partner',
      'previous experience','Travel Agent','ultimate travel','Ultimate travel','Ultimate Travel',
      'Ultimate travel partnership','Web site','Whats app','WhatsApp','Whatsapp Group',
      'WhatsApp Travel Group (Admin Balou referred)']
    const grouped = groupByCanonical(live, canonicalSource)
    expect(grouped).toHaveLength(11)
    expect(grouped.find(g => g.label === 'Travel agent')?.count).toBe(5)
    expect(grouped.find(g => g.label === 'WhatsApp group')?.count).toBe(2)
  })
})
