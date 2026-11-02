# 013 French, Italian and Spanish locales for Working Holiday Tax

Status: proposed (Jo asked for French first, Spanish after, 2 Nov 2026).

## Why

France is the 2nd largest 417 market: 23,628 grants in the six months to 31 Dec 2025 (Home Affairs working holiday report). Spanish speakers (Spain, Argentina, Chile, Uruguay) are 462 holders, about 7,700 grants in the same period, so Spanish comes second. Existing French competitors sell communities and PDFs; none was found that pairs a registered-agent sign-off with the "refund covers the fee" guarantee. Not verified: what competitors do behind their pages.

## Decisions

1. One site, one domain, language folders: `/fr` now, `/es` later. No new domains. hreflang by language (`fr`, `es`), not by country.
2. Each language gets its own route group like de and ja: `src/app/(fr)/layout.tsx` plus `src/app/(fr)/fr/...`, with `RootDocument lang="fr"`.
3. Copy is rewritten natively from the English page and the site facts, never translated line by line and never from the German or Japanese pages. Source of truth for facts: the English pages, `src/lib/constants.ts` and the English blog.
4. Spanish will be one neutral Latin-American-friendly Spanish (tuteo, no vos, no vosotros, no local slang), reviewed by native readers from Spain and from Argentina or Chile.
5. Language switcher shows the language name (Francais, Espanol), not flags.

## Phase 1 scope (French)

- Pages (22): home, tfn, abn, tax-return, superannuation, medicare, calculator, contact, about, expenses index and the 7 job pages, blog index and category pages, plus the first guides chosen by search demand (about 12). Remaining guides later.
- One custom page for the French market: a flagship "tax return Australie PVT" page (what the French search is, what it costs, how it works), built only from site facts. French-specific questions go into FAQs: "does this replace my French tax return" (no, a separate matter, we only handle Australian tax), 417 for France.
- Not in phase 1: Client Agreement and Privacy in French (legal accuracy needs a legal review; the French pages link to the English versions with a clear label), the tax form UI strings (`formStrings.ts`), the 142-guide blog backlog.
- Will already detects and answers French in chat; the Meta template map and its tests still treat French as English-template, to be changed together with the French site work.

## Rules (all content)

- CLAUDE.md applies in full: never "we are a registered tax agent" (use "operates under the supervision of a registered tax agent" and "Reviewed and signed off by a registered tax agent before it is lodged with the ATO"), never promise a refund, never mention AI or bots, no em or en dash, fees $220 TFN and $385 with ABN (incl. GST), the guarantee wording unchanged in meaning, no mention of the other brand.
- No claims about French tax law or French authorities beyond "separate matter, ask the French tax office".
- Prices stay in AUD.

## Review pipeline (per page group)

1. Native French writer (Parisian, 25 years old reads it) rewrites.
2. Native-speaker reviewer: naturalness, register (vous or tu decision, one for the whole site), idioms, typography (non-breaking space before : ; ! ? and guillemets).
3. Devil's advocate: misleading claims, refund implications, unsupported statements.
4. Compliance reviewer against CLAUDE.md wording rules.
5. SEO and answer-engine reviewer: real French search phrasing, titles, meta, FAQ and JSON-LD.
6. A fix agent applies the reports, then tsc, eslint, jest, Playwright screenshots at 390, 768 and 1440.

## Risks

- About 35 hardcoded spots enumerate locales (Nav, Footer, LanguageSwitcher, Analytics, LangSync, MobileLanguageBanner, PublicShellClient, robots, sitemap, JSON-LD in RootDocument, llms.txt). TypeScript flags most.
- Will tests assert that French gets the English Meta template; they must change together with any template work.
- Register choice (tu or vous) must be decided once; default `vous`, matching the professional tone of the site.

## Update 2 Nov 2026 (evening): Italian added, all three in one overnight run

Jo decided: ship fr, it and es together with the new design, plus en, de and ja, as one final zip.
- Italy: 11,514 grants of 417 in the six months to 31 Dec 2025 (3rd largest, above Germany). Italian-language competition for WHM tax returns was not found in two quick searches (weak evidence).
- Registers: French `vous`; Italian `tu`; Spanish `tu` (tuteo), one neutral Spanish for Spain, Argentina, Chile and Uruguay. Native reviewers may flag a register problem; the lead decides.
- Scope for each language (Jo, 2 Nov: all the blog posts): 22 pages, ALL 142 guides rewritten natively from the English guides (about 426 guides in total), one custom flagship page. Legal pages stay English (linked, labelled in the page language). Form stays English.
- Quality gate: pages and the highest-demand guides are written and reviewed first, so a shippable zip exists early. A guide is listed in the sitemap, blog index and hreflang only after it passes native, compliance and devil's advocate review. Guides that do not pass in time are left out of the zip and listed in the report, never shipped unreviewed.
- Guide files are written in chunks (one file per batch of guides) so many agents can work in parallel without editing the same file; a loader merges the chunks.
- Nothing is pushed. Sitemap lists a language page only once it is in that language's allowlist (FR_PAGES, IT_PAGES, ES_PAGES), added by the lead after review.
