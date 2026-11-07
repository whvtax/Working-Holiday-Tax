# SVT fix brief (Student Visa Tax), one bucket

Repository `/home/claude/v3/whvtax-FINAL58`. `...` = `/tmp/claude-0/-home-claude/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/scratchpad`.
Audit findings: `.../plan/round4/svt-{pages-en,pages-zh,pages-vi,guides-en,guides-zh,guides-vi,technical,strategy}.json`.
Read the SVT rules in `.../plan/round4/SVT_BRIEF.md` and the repo's `CLAUDE.md`; they apply in full.
Other agents edit other files at the same time (including the other brand's files): never edit outside your ownership.
Do not commit, build or start servers.

## Buckets and ownership
- `svt-core`: `src/app/(svt)/**`, `src/lib/svt/**` EXCEPT `src/lib/svt/content/{guides-*,blog-*}.ts` and
  `src/lib/svt/content/long/**`. Includes home-en.ts, jsonld.ts, i18n/strings, sitemap/robots/llms routes for SVT, and the
  new hub structure. Do NOT edit `config/brand-routing.js`, shared WHT components, or `src/lib/svt/brand-public.ts` (the
  WhatsApp number is pending from the owner).
- `svt-guides-en`: `src/lib/svt/content/guides-en.ts`, `blog-en.ts`, `long/en/**`.
- `svt-guides-zh`: `src/lib/svt/content/guides-zh.ts`, `blog-zh.ts`, `long/zh/**`, and `guides-i18n.ts`, `blog-i18n.ts`.
- `svt-guides-vi`: `src/lib/svt/content/guides-vi.ts`, `blog-vi.ts`, `long/vi/**` (if a vi fix is in guides-i18n.ts or
  blog-i18n.ts, hand it off).
- zh/vi home pages, `src/app/(svt-zh)`, `src/app/(svt-vi)`, `home-zh.ts`, `home-vi.ts`: a later wave. Do not edit now.

## Decisions by the lead
- P0 first: every sentence that says or implies SVT lodges, talks to the ATO as the agent, or decides residency
  ("we lodge for you", "我们替你提交", "我们直接和 ATO 对接", "Chúng tôi làm việc trực tiếp với ATO", "ask us" right after the
  agent-program paragraph): reword with the approved wording ("operates under the supervision of a registered tax agent";
  "Reviewed and signed off by a registered tax agent before it is lodged with the ATO", existing zh/vi versions) or "we
  prepare / we check". Residency stays "may be" / "usually"; the decision is the ATO's.
- Do NOT remove or change the TPB symbol or the WhatsApp number (owner decision pending); log them.
- No 301 redirects, merges or slug changes. Resolve competing pages by differentiating intent and cross-linking.
- svt-core may create ONE new TFN hub page in English (route consistent with the existing SVT routing and sitemap,
  following how existing service pages such as /superannuation or /abn-delivery are built) and strengthen /superannuation
  (answer-first, the queried phrase "tax on departing Australia superannuation payment", rates with sources, 28 days from a
  completed application, steps, FAQ) and the home page answer block. The zh/vi versions follow in the next wave: leave
  hreflang only for languages that exist.
- Facts: official sources only (ato.gov.au, homeaffairs.gov.au, servicesaustralia.gov.au, fairwork.gov.au). DASP for
  students (non-WHM): taxed element 35%, untaxed 45%, tax-free 0%; WHM rate 65% of the taxable component only. 2026-27
  resident rates: verify on ato.gov.au before stating (Stage 3 changes); if you cannot verify, remove the wrong claim
  rather than invent. The 31 October 2026 deadline has passed: past tense, late lodgement still possible.
- Medicare levy exemption: depends on entitlement to Medicare (Medicare Entitlement Statement), not on holding OSHC.
- Links: the long articles should link to the four service pages (tax return home/pricing, superannuation, abn page, TFN
  hub once it exists) naturally, varied wording, not pasted.
- Writing: native zh (Simplified) and vi; sentence case headings; no dashes of any kind (including the Chinese ——);
  never mention the other brand; never mention AI or bots; fees $220 / $385 only where fees already appear.

## Verify
`npx tsc --noEmit -p .`; `npx jest src/lib/svt src/lib/__tests__/brand-routing-26oct.test.ts` (and any test that
imports your files). Grep your files for U+2013, U+2014, U+2015 and "——".
Log: `.../plan/round4/svtfix-<bucket>.md`. Reply in 4 lines.
