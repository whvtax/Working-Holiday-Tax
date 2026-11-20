# 017 The tax return form in nine languages, for both brands

Status: approved by Jo (18 Nov 2026). Built, not deployed. Nothing is pushed.

## What

The tax return form (both steps, the tax residency step, the stepper, upload and validation errors, the thank-you screen) is shown in en, de, ja, es, fr, it, pt, zh and vi on Working Holiday Tax and on Student Visa Tax. Before this the WHT form had en, de, ja and the SVT form had en, zh, vi.

## Why

Will already answers customers in these languages, then sent them to a form in English. The form is where people stop. A customer who reads the form in their own language makes fewer mistakes on the residency declaration, which is the one answer on the form with real tax consequences.

## Decisions

1. One lookup for every word. `formText(brand, key, lang)` in `src/lib/form-i18n` resolves in this order: the brand's own words (SVT Chinese and Vietnamese, the student residency step), the language block, `formStrings` (en, de, ja), English. A missing key is English, never an empty string. The inline `lang === 'de' ? ... : ...` branches in `FormClient.tsx` are gone.
2. One file per new language (`src/lib/form-i18n/es.ts`, `fr.ts`, `it.ts`, `pt.ts`, `zh.ts`, `vi.ts`), typed so a missing key does not compile. Each carries the header "written by an agent, not checked by a native speaker (18 Nov 2026)". Registers: de du, es tú, fr tu, it tu, pt Brazilian (você), ja です/ます, zh Simplified, vi neutral polite. Australian terms stay in English (TFN, ABN, Medicare, myGov, ATO, BSB, PAYG, superannuation).
3. Starting language, in this order: (a) the locale in the URL path (`/de/start`, SVT `/zh/...`), (b) a valid `?lang=` parameter, (c) `navigator.language` when it is one of the nine, (d) English. `resolveStartLang` in `src/lib/form-lang.ts` is the single place this is decided. A language the customer picks by hand in the picker wins over all four for the rest of that tab session.
4. The picker changes the words, not the address. The residency step opens under the same locale path as the form page the customer is on, and shows the language carried in the form hand-off. Reason: every locale has its own root layout, and moving between two root layouts is a full page load, which would drop the in-memory hand-off (the uploaded files and the TFN, which never touch browser storage).
5. Locale pages. WHT gets `/es`, `/fr`, `/it`, `/pt`, `/zh`, `/vi` + `/start` and the residency step, built like `/de/start`. `pt`, `zh`, `vi` get their own route groups (root layout only for `<html lang>`); they hold nothing but the two form pages. SVT gets `/de`, `/ja`, `/es`, `/fr`, `/it`, `/pt` + its form slug, placed inside the English SVT shell, because SVT has a header and footer only in en, zh, vi. All form pages stay `noindex`; no hreflang is added for the new pages; they are not in the sitemap.
6. The personal link token (`?k=`) works on every locale path: `FORM_LINK_ANY_BRAND` and `CURRENT_FORM_LINK` accept all eight prefixes (pt added), and the new paths are on the "never send this URL to Google Analytics" lists of both brands.
7. Data to the owner stays English. Option values (Single, Married, Yes, No, the residency status, the declaration sentence) are the same English strings in every display language; only labels are translated.
8. Free text typed in another language gets an English line for the owner. Fields: main job, other income, how did you hear about us, home country. On the server (`src/lib/form-translate.ts`, called by `/api/tax-form`): skip text that already looks English (cheap check, no model call), pass the rest through `redactSensitive` (TFN-like and long digit runs, emails), one small call through the existing `anthropicMessages` transport with a hard 5 second timeout. The original is stored unchanged; the English is added to the task notes as "Occupation (translated): ...". FAIL-SAFE: no key, a timeout, an error or an odd answer means no extra note and the form saves exactly as before.
9. The "please type your answers in English" notice is kept and translated; it is shown on step 1 when the form is not in English.

10. French uses tu in the whole form flow, like Will's French messages. The French residency step, written earlier with vous and never linked from a page, was changed to tu so the flow has one voice. The French marketing site stays vous (decision 013).
11. The working holiday maker warning keeps Jo's rule of 3 Sep for the English, German and Japanese forms (shown in the language of the home country). In the six new languages it is shown in the language on screen.
12. New data flow, for Jo to confirm: the four free-text answers above (after redaction) reach the model provider when they are not English. Names, addresses, TFN, phone, email, date of birth and documents are never sent. Will already sends customer messages to the same provider (decision 004).

## Alternatives considered

- One merged table with nine languages per key. Rejected: a language written in one sitting, in one file, keeps one voice; and the type check per file is simpler.
- Navigating to the picked language's own URL. Rejected: full page load between root layouts loses the form (decision 4).
- Translating in the browser. Rejected: the key would be in client code.

## Not verified

- No native speaker has read the new text. es, fr, it, pt, zh, vi and the new de and ja lines were written by an agent.
- `next build` was not run (fonts cannot be fetched in this environment), so the new route groups are checked by tsc and by tests that read the files, not by a build.
- No browser check: the picker was not seen on a real phone, and Playwright was not run.
- The translation call was tested with the model mocked, never against the live API.
- The WHT site font may not carry Vietnamese or Chinese glyphs; the browser falls back to a system font.
