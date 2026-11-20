/**
 * Which language the tax form opens in, and the language the customer picked
 * (decision 017). Pure functions plus one in-memory value; no browser storage
 * is touched here (the form component keeps its own copy for a hard refresh).
 */
import { FORM_LANGS, isFormLang, type AnyFormLang } from '@/lib/formStrings'

/** Each language written in its own language, in the order the picker lists them. No flags. */
export const FORM_LANG_NAMES: Readonly<Record<AnyFormLang, string>> = {
  en: 'English',
  de: 'Deutsch',
  ja: '日本語',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
  zh: '中文',
  vi: 'Tiếng Việt',
}

/** BCP 47 tag for `lang` attributes on the page and on each picker row. */
export const FORM_LANG_HTML: Readonly<Record<AnyFormLang, string>> = {
  en: 'en-AU', de: 'de', ja: 'ja', es: 'es', fr: 'fr', it: 'it', pt: 'pt-BR', zh: 'zh-Hans', vi: 'vi',
}

/** "de-AT" -> de, "pt-BR" -> pt, "zh-TW" -> zh, "nl" -> null. */
export function formLangFromTag(tag: string | null | undefined): AnyFormLang | null {
  const base = (tag ?? '').trim().toLowerCase().split(/[-_]/)[0]
  return isFormLang(base) ? base : null
}

/**
 * The starting language, in this order:
 *   (a) the locale in the URL path, when there is one (/de/start, SVT /zh/...);
 *   (b) a valid `lang` query parameter;
 *   (c) the browser language, when it is one of the nine;
 *   (d) English.
 * Anything that is not one of the nine is skipped, never guessed.
 */
export function resolveStartLang(input: {
  pathLang?: string | null
  queryLang?: string | null
  browserLang?: string | null
}): AnyFormLang {
  if (isFormLang(input.pathLang)) return input.pathLang
  const q = (input.queryLang ?? '').trim().toLowerCase()
  if (isFormLang(q)) return q
  return formLangFromTag(input.browserLang) ?? 'en'
}

/** The first path segment when it is one of the eight locale prefixes
 *  ("/de/start" -> de). English has no prefix, so "/start" -> null. */
export function pathLocale(pathname: string | null | undefined): AnyFormLang | null {
  const seg = (pathname ?? '').split('/').filter(Boolean)[0] ?? ''
  return seg !== 'en' && isFormLang(seg) ? seg : null
}

// The language the customer picked by hand. In memory, like the form hand-off:
// it has to survive the trip form -> residency step -> form (thank-you screen),
// all client-side navigations inside one tab.
let picked: AnyFormLang | null = null

export function setPickedFormLang(lang: AnyFormLang): void {
  picked = lang
}

export function getPickedFormLang(): AnyFormLang | null {
  return picked
}

/** For tests. */
export function clearPickedFormLang(): void {
  picked = null
}

export { FORM_LANGS }
