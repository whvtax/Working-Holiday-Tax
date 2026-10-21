import { detectAiSource } from '@/lib/analytics'

describe('detectAiSource', () => {
  it('reads ChatGPT from utm_source', () => expect(detectAiSource('', '?utm_source=chatgpt.com')).toBe('chatgpt'))
  it('reads Perplexity from the referrer', () => expect(detectAiSource('https://www.perplexity.ai/search?q=x', '')).toBe('perplexity'))
  it('reads Copilot and Gemini', () => {
    expect(detectAiSource('https://copilot.microsoft.com/', '')).toBe('copilot')
    expect(detectAiSource('https://gemini.google.com/app', '')).toBe('gemini')
  })
  it('ignores Google search and DuckDuckGo', () => {
    expect(detectAiSource('https://www.google.com/', '')).toBe('')
    expect(detectAiSource('https://duckduckgo.com/', '')).toBe('')
  })
  it('survives a malformed referrer', () => expect(detectAiSource('not a url', '')).toBe(''))
})
