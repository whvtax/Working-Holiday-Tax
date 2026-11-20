/**
 * The small code changes from the German and Japanese form reviews (18 Nov),
 * see docs/engineering/form-i18n-review/de.md and ja.md.
 */
import { formStrings, thankYouHeading, requiredSep, refSuffix, firstNameOf } from '@/lib/formStrings'
import { DE_RES, JA_RES } from '@/components/svt/form-residency-copy'

describe('thank-you heading without a name', () => {
  it('German drops the name instead of "Vielen Dank, du!"', () => {
    expect(thankYouHeading('de', 'Vielen Dank', formStrings.thereName.de, false)).toBe('Vielen Dank!')
    expect(thankYouHeading('de', 'Vielen Dank', 'Anna')).toBe('Vielen Dank, Anna!')
  })
  it('Japanese drops お客様 and keeps さん for a real name', () => {
    expect(thankYouHeading('ja', 'ありがとうございます', formStrings.thereName.ja, false)).toBe('ありがとうございます！')
    expect(thankYouHeading('ja', 'ありがとうございます', 'Taro', true)).toBe('ありがとうございます、Taroさん！')
  })
  it('English drops the name too (Jo, 18 Nov)', () => {
    expect(thankYouHeading('en', 'Thank you', 'there', false)).toBe('Thank you!')
    expect(thankYouHeading('es', 'Gracias', '', false)).toBe('¡Gracias!') // Jo, 18 Nov: no name, never "there"
  })
})

describe('firstNameOf', () => {
  it('ignores leading and repeated spaces', () => {
    expect(firstNameOf('  Taro  Yamada')).toBe('Taro')
    expect(firstNameOf('Anna Maria Mueller')).toBe('Anna')
    expect(firstNameOf('   ')).toBe('')
  })
})

describe('German "required" list', () => {
  it('renders "label: Pflichtfeld"', () => {
    const line = `${formStrings.hasMedicare.de}${requiredSep('de')}${formStrings.fieldIsRequired.de}`
    expect(line).toBe('Hast du Zugang zu Medicare in Australien?: Pflichtfeld')
    expect(`${formStrings.whatsapp.de}${requiredSep('de')}${formStrings.fieldIsRequired.de}`)
      .toBe('Die WhatsApp-Nummer, mit der du uns geschrieben hast: Pflichtfeld')
    expect(requiredSep('en')).toBe(' ')
    expect(requiredSep('ja')).toBe('')
  })
})

describe('error reference', () => {
  it('uses full-width brackets and a colon in Japanese', () => {
    expect(refSuffix('ja', formStrings.refPrefix.ja, 'AB12CD')).toBe('（参照番号：AB12CD）')
  })
  it('keeps the English and German shape', () => {
    expect(refSuffix('en', formStrings.refPrefix.en, 'AB12CD')).toBe(' (reference AB12CD)')
    expect(refSuffix('de', formStrings.refPrefix.de, 'AB12CD')).toBe(' (Referenz AB12CD)')
    expect(refSuffix('ja', formStrings.refPrefix.ja, '')).toBe('')
  })
})

describe('legal declarations stay faithful', () => {
  it('Japanese ABN declaration has sole owner and establish', () => {
    expect(formStrings.declABN.ja).toContain('唯一の所有者')
    expect(formStrings.declABN.ja).toContain('始める')
  })
  it('German consent lines include "read" and an object', () => {
    expect(formStrings.acceptTerms.de).toBe('Gelesen und akzeptiert:')
    expect(formStrings.and.de).toBe('und')
    expect(formStrings.declaration.de).toContain('gelesen und stimme ihnen zu')
  })
})

describe('residency term', () => {
  it('the quoted option matches the radio label (de, ja)', () => {
    expect(DE_RES.quizIntro).toContain(`„${DE_RES.residentLabel}“`)
    expect(JA_RES.quizIntro).toContain(`「${JA_RES.residentLabel}」`)
  })
})
