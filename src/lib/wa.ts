import { WA_NUMBER } from './constants'

export type WaLang = 'en' | 'de' | 'ja'

/**
 * Every WhatsApp link on the marketing site goes through here.
 *
 * Before this existed there were roughly 110 bare wa.me links, none of which
 * carried any context. The customer arrived in the chat as an anonymous "hi",
 * and the first two messages were spent working out what they had even been
 * reading. The prefill fixes that: the opening message names the topic, and
 * where the page knows it, the tier the visitor picked.
 *
 * Nothing here is a promise and nothing quotes a price. The prefill is written
 * as the customer, in the customer's own language, because that is who sends it.
 */

/** Where on the site the customer tapped. Keep these stable, they end up in GA4. */
export type WaTopic =
  | 'general'
  | 'tax-return'
  | 'tfn'
  | 'abn'
  | 'super'
  | 'medicare'
  | 'residency'
  | 'calculator'
  | 'expenses'
  | 'guide'
  | 'uk'
  | 'contact'

type Phrases = Record<WaTopic, string>

const EN: Phrases = {
  general:     'Hi, I found you through your website and I would like to ask about my Australian tax.',
  'tax-return':'Hi, I would like to ask about my Australian tax return.',
  tfn:         'Hi, I would like to ask about getting a TFN.',
  abn:         'Hi, I would like to ask about my ABN and how it affects my tax.',
  super:       'Hi, I would like to ask about claiming my superannuation back.',
  medicare:    'Hi, I would like to ask about the Medicare levy exemption.',
  residency:   'Hi, I would like to ask about my tax residency.',
  calculator:  'Hi, I used the calculator on your site and I would like to check my situation.',
  expenses:    'Hi, I would like to ask what I can claim for the work I did.',
  guide:       'Hi, I was reading one of your guides and I have a question about my own situation.',
  uk:          'Hi, I am from the UK and I would like to ask about my Australian tax.',
  contact:     'Hi, I would like to ask a question about my Australian tax.',
}

const DE: Phrases = {
  general:     'Hallo, ich habe euch über eure Website gefunden und habe eine Frage zu meiner australischen Steuer.',
  'tax-return':'Hallo, ich habe eine Frage zu meiner australischen Steuererklärung.',
  tfn:         'Hallo, ich habe eine Frage zur TFN.',
  abn:         'Hallo, ich habe eine Frage zu meiner ABN und wie sie sich auf meine Steuer auswirkt.',
  super:       'Hallo, ich habe eine Frage dazu, wie ich meine Superannuation zurückbekomme.',
  medicare:    'Hallo, ich habe eine Frage zur Befreiung von der Medicare Levy.',
  residency:   'Hallo, ich habe eine Frage zu meinem steuerlichen Wohnsitz.',
  calculator:  'Hallo, ich habe euren Rechner benutzt und würde gerne meine Situation prüfen lassen.',
  expenses:    'Hallo, ich habe eine Frage dazu, was ich für meine Arbeit absetzen kann.',
  guide:       'Hallo, ich habe einen eurer Ratgeber gelesen und habe eine Frage zu meiner eigenen Situation.',
  uk:          'Hallo, ich habe eine Frage zu meiner australischen Steuer.',
  contact:     'Hallo, ich habe eine Frage zu meiner australischen Steuer.',
}

const JA: Phrases = {
  general:     'こんにちは。ウェブサイトを見ました。オーストラリアの税金について相談したいです。',
  'tax-return':'こんにちは。タックスリターンについて相談したいです。',
  tfn:         'こんにちは。TFNの取得について相談したいです。',
  abn:         'こんにちは。ABNと税金への影響について相談したいです。',
  super:       'こんにちは。スーパーアニュエーションの受け取りについて相談したいです。',
  medicare:    'こんにちは。メディケア税の免除について相談したいです。',
  residency:   'こんにちは。税務上の居住区分について相談したいです。',
  calculator:  'こんにちは。サイトの計算ツールを使いました。自分の状況を確認したいです。',
  expenses:    'こんにちは。自分の仕事で何が控除できるのか相談したいです。',
  guide:       'こんにちは。ガイド記事を読みました。自分の状況について質問があります。',
  uk:          'こんにちは。オーストラリアの税金について相談したいです。',
  contact:     'こんにちは。オーストラリアの税金について相談したいです。',
}

const PHRASES: Record<WaLang, Phrases> = { en: EN, de: DE, ja: JA }

/** The two service levels, used to qualify before the chat starts. */
export type WaTier = 'tfn' | 'tfn-abn' | 'unsure'

const TIER: Record<WaLang, Record<WaTier, string>> = {
  en: {
    'tfn':     ' I worked for employers on a TFN.',
    'tfn-abn': ' I worked on a TFN and also invoiced under an ABN.',
    'unsure':  ' I am not sure which of the two applies to me.',
  },
  de: {
    'tfn':     ' Ich habe als Angestellter mit einer TFN gearbeitet.',
    'tfn-abn': ' Ich habe mit einer TFN gearbeitet und zusätzlich über eine ABN abgerechnet.',
    'unsure':  ' Ich bin nicht sicher, was auf mich zutrifft.',
  },
  ja: {
    'tfn':     ' TFNで雇用されて働いていました。',
    'tfn-abn': ' TFNで働き、ABNでも請求していました。',
    'unsure':  ' どちらに当てはまるか分かりません。',
  },
}

export interface WaOptions {
  /** What the visitor was reading. Defaults to a neutral opener. */
  topic?: WaTopic
  /** Page language. Defaults to English. */
  lang?: WaLang
  /** Which service level the visitor identified with, when the page asked. */
  tier?: WaTier
  /** Free text appended verbatim, e.g. a guide title. Kept short. */
  detail?: string
}

/**
 * Build a wa.me link carrying a prefilled opening message.
 *
 * Returns the bare number link if anything is missing, so a bad call can never
 * break the only conversion action on the site.
 */
export function waUrl(opts: WaOptions = {}): string {
  const base = `https://wa.me/${WA_NUMBER}`
  try {
    const lang: WaLang = opts.lang && PHRASES[opts.lang] ? opts.lang : 'en'
    const topic: WaTopic = opts.topic && PHRASES[lang][opts.topic] ? opts.topic : 'general'

    let text = PHRASES[lang][topic]
    if (opts.tier && TIER[lang][opts.tier]) text += TIER[lang][opts.tier]
    if (opts.detail) text += ` (${opts.detail.slice(0, 120)})`

    return `${base}?text=${encodeURIComponent(text)}`
  } catch {
    return base
  }
}
