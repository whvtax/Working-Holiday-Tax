import { isNdaCountry, languageForCountry } from '@/lib/nda-countries'

describe('languageForCountry', () => {
  it('maps German home countries to German, in any spelling', () => {
    for (const c of ['Germany', 'germany', 'Deutschland', 'ドイツ', 'Allemagne']) {
      expect(languageForCountry(c)).toBe('de')
    }
  })

  it('maps Japanese home countries to Japanese, in any spelling', () => {
    for (const c of ['Japan', 'japan', '日本', 'Nippon']) {
      expect(languageForCountry(c)).toBe('ja')
    }
  })

  it('maps Chile to Spanish, in any spelling', () => {
    for (const c of ['Chile', 'chile', 'チリ']) {
      expect(languageForCountry(c)).toBe('es')
    }
  })

  it('falls back to English for every other country and for empty input', () => {
    for (const c of ['United Kingdom', 'France', 'Israel', 'Norway', '', null, undefined]) {
      expect(languageForCountry(c)).toBe('en')
    }
  })

  it('does not misfire "german" inside a longer word', () => {
    // Guards the \b word boundaries: "Germanic" / "Ukraine" must not match.
    expect(languageForCountry('Ukraine')).toBe('en')
  })

  it('is independent of the NDA list (Japan is NDA, but so is UK -> still English)', () => {
    expect(isNdaCountry('United Kingdom')).toBe(true)
    expect(languageForCountry('United Kingdom')).toBe('en')
  })
})
